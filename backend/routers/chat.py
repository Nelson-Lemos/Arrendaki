import json
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect, status
from sqlalchemy.orm import Session, joinedload
from jose import JWTError, jwt
from backend.schemas import ChatRoomOut, ChatMessageOut, ChatMessageCreate, ChatRoomCreate
from backend.models import User, ChatRoom, ChatMessage, chat_participants
from backend.services.auth import get_current_user, SECRET_KEY, ALGORITHM
from backend.database import get_db

router = APIRouter(prefix="/chat", tags=["chat"])


# ─── Connection manager ────────────────────────────────────
class ConnectionManager:
    def __init__(self):
        self.active: dict[int, list[WebSocket]] = {}  # room_id -> [websockets]

    async def connect(self, room_id: int, ws: WebSocket):
        await ws.accept()
        if room_id not in self.active:
            self.active[room_id] = []
        self.active[room_id].append(ws)

    def disconnect(self, room_id: int, ws: WebSocket):
        if room_id in self.active:
            self.active[room_id] = [w for w in self.active[room_id] if w != ws]
            if not self.active[room_id]:
                del self.active[room_id]

    async def broadcast(self, room_id: int, message: dict, exclude: WebSocket | None = None):
        if room_id in self.active:
            data = json.dumps(message, default=str)
            for ws in self.active[room_id]:
                if ws != exclude:
                    try:
                        await ws.send_text(data)
                    except Exception:
                        pass


manager = ConnectionManager()


# ─── REST endpoints ────────────────────────────────────────
@router.get("/rooms", response_model=list[ChatRoomOut])
def list_rooms(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    rooms = (
        db.query(ChatRoom)
        .join(chat_participants)
        .filter(chat_participants.c.user_id == user.id)
        .options(joinedload(ChatRoom.participants), joinedload(ChatRoom.messages))
        .order_by(ChatRoom.created_at.desc())
        .all()
    )
    result = []
    for room in rooms:
        last_msg = room.messages[-1] if room.messages else None
        result.append(ChatRoomOut(
            id=room.id,
            property_id=room.property_id,
            participants=[{"id": u.id, "name": u.name} for u in room.participants],
            last_message=last_msg.message if last_msg else None,
            last_message_at=last_msg.created_at if last_msg else None,
            unread=0,
            created_at=room.created_at,
        ))
    return result


@router.post("/rooms", response_model=ChatRoomOut)
def create_room(
    data: ChatRoomCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    other = db.query(User).filter(User.id == data.participant_id).first()
    if not other:
        raise HTTPException(status_code=404, detail="User not found")

    existing = (
        db.query(ChatRoom)
        .join(chat_participants)
        .filter(
            chat_participants.c.user_id.in_([user.id, other.id]),
            ChatRoom.property_id == data.property_id,
        )
        .group_by(ChatRoom.id)
        .having(db.func.count(chat_participants.c.user_id) == 2)
        .first()
    )
    if existing:
        return ChatRoomOut(
            id=existing.id,
            property_id=existing.property_id,
            participants=[{"id": u.id, "name": u.name} for u in existing.participants],
            created_at=existing.created_at,
        )

    room = ChatRoom(property_id=data.property_id)
    room.participants = [user, other]
    db.add(room)
    db.commit()
    db.refresh(room)
    return ChatRoomOut(
        id=room.id,
        property_id=room.property_id,
        participants=[{"id": u.id, "name": u.name} for u in room.participants],
        created_at=room.created_at,
    )


@router.get("/rooms/{room_id}/messages", response_model=list[ChatMessageOut])
def get_messages(
    room_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    room = db.query(ChatRoom).filter(ChatRoom.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    is_member = db.query(chat_participants).filter(
        chat_participants.c.chat_room_id == room_id,
        chat_participants.c.user_id == user.id,
    ).first()
    if not is_member:
        raise HTTPException(status_code=403, detail="Not a participant")

    msgs = (
        db.query(ChatMessage)
        .filter(ChatMessage.room_id == room_id)
        .order_by(ChatMessage.created_at)
        .all()
    )
    return [
        ChatMessageOut(
            id=m.id,
            room_id=m.room_id,
            sender_id=m.sender_id,
            sender_name=m.sender.name if m.sender else "",
            message=m.message,
            created_at=m.created_at,
        )
        for m in msgs
    ]


# ─── WebSocket ─────────────────────────────────────────────
async def get_user_from_token(token: str, db: Session) -> User | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            return None
        return db.query(User).filter(User.id == user_id).first()
    except JWTError:
        return None


@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: int):
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=4001)
        return

    db = next(get_db())
    user = await get_user_from_token(token, db)
    if not user:
        await websocket.close(code=4001)
        return

    is_member = db.query(chat_participants).filter(
        chat_participants.c.chat_room_id == room_id,
        chat_participants.c.user_id == user.id,
    ).first()
    if not is_member:
        await websocket.close(code=4003)
        db.close()
        return

    await manager.connect(room_id, websocket)

    try:
        while True:
            raw = await websocket.receive_text()
            data = json.loads(raw)
            msg_type = data.get("type", "message")

            if msg_type == "message":
                content = data.get("message", "").strip()
                if not content:
                    continue

                msg = ChatMessage(
                    room_id=room_id,
                    sender_id=user.id,
                    message=content,
                )
                db.add(msg)
                db.commit()
                db.refresh(msg)

                payload = {
                    "type": "message",
                    "id": msg.id,
                    "room_id": room_id,
                    "sender_id": user.id,
                    "sender_name": user.name,
                    "message": content,
                    "created_at": msg.created_at.isoformat(),
                }
                await manager.broadcast(room_id, payload)

            elif msg_type == "typing":
                payload = {
                    "type": "typing",
                    "room_id": room_id,
                    "sender_id": user.id,
                    "sender_name": user.name,
                }
                await manager.broadcast(room_id, payload, exclude=websocket)

    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
    except Exception:
        manager.disconnect(room_id, websocket)
    finally:
        db.close()
