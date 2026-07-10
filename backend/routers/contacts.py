from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.schemas import ContactCreate
from backend.models import Contact, Property
from backend.database import get_db
from backend.services.auth import get_current_user, get_current_user_optional
from backend.models import User

router = APIRouter(prefix="/contacts", tags=["contacts"])


@router.post("")
def create_contact(
    data: ContactCreate,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
):
    contact = Contact(
        **data.model_dump(exclude_unset=True),
        user_id=current_user.id if current_user else None,
    )
    db.add(contact)

    if data.property_id:
        prop = db.query(Property).filter(Property.id == data.property_id).first()
        if prop:
            contact.broker_id = None if prop.mode == "direct" else prop.owner_id
            contact.mode = prop.mode

    db.commit()
    db.refresh(contact)
    return {"ok": True, "id": contact.id}
