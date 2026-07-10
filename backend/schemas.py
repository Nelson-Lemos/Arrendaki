from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ─── Auth ──────────────────────────────────────────────────────
class UserCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    password: str
    role: str = "tenant"


class UserLogin(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    role: str
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ─── Properties ────────────────────────────────────────────────
class Amenities(BaseModel):
    piscina: bool = False
    garagem: bool = False
    condominio: bool = False
    mobilado: bool = False
    jardim: bool = False
    ar_cond: bool = False
    gerador: bool = False
    cisterna: bool = False


class PropertyOut(BaseModel):
    id: int
    title: str
    location: str
    municipio: str
    type: str
    beds: int
    baths: int
    area: int
    price: float
    mode: str
    featured: bool
    is_new: bool
    has_video: bool
    negotiable: bool
    desc: Optional[str] = None
    amenities: Optional[Amenities] = None
    color: str
    image_url: Optional[str] = None
    images: Optional[list[str]] = None
    owner_id: Optional[int] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class PropertyCreate(BaseModel):
    title: str
    location: str
    municipio: str
    type: str
    beds: int = 0
    baths: int = 0
    area: int = 0
    price: float
    mode: str = "direct"
    featured: bool = False
    is_new: bool = False
    has_video: bool = False
    negotiable: bool = False
    desc: Optional[str] = None
    amenities: Optional[Amenities] = None
    color: str = "#c8a97e"
    image_url: Optional[str] = None
    images: Optional[list[str]] = None


# ─── Brokers ───────────────────────────────────────────────────
class BrokerOut(BaseModel):
    id: int
    name: str
    area: str
    rating: float
    reviews: int
    deals: int
    experience: int
    avatar: Optional[str] = None
    certified: bool
    speciality: Optional[str] = None
    user_id: Optional[int] = None

    model_config = {"from_attributes": True}


# ─── Favorites ─────────────────────────────────────────────────
class FavoriteOut(BaseModel):
    id: int
    user_id: int
    property_id: int

    model_config = {"from_attributes": True}


# ─── Contact ───────────────────────────────────────────────────
class ContactCreate(BaseModel):
    property_id: Optional[int] = None
    broker_id: Optional[int] = None
    mode: str = "direct"
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    message: Optional[str] = None


class ContactOut(BaseModel):
    id: int
    property_id: Optional[int] = None
    broker_id: Optional[int] = None
    mode: str
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    message: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class DashboardStats(BaseModel):
    active_properties: int = 0
    total_views: int = 0
    total_contacts: int = 0
    estimated_revenue: float = 0
    contacts_this_week: int = 0
    properties_change: int = 0
    views_change: int = 0
    contacts_change: int = 0


# ─── Chat ───────────────────────────────────────────────────
class ChatMessageCreate(BaseModel):
    message: str


class ChatMessageOut(BaseModel):
    id: int
    room_id: int
    sender_id: int
    sender_name: str = ""
    message: str
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ChatRoomCreate(BaseModel):
    property_id: Optional[int] = None
    participant_id: int


class ChatRoomOut(BaseModel):
    id: int
    property_id: Optional[int] = None
    participants: list[dict] = []
    last_message: Optional[str] = None
    last_message_at: Optional[datetime] = None
    unread: int = 0
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class WSMessage(BaseModel):
    type: str  # "message" | "typing" | "read"
    room_id: int
    sender_id: int
    sender_name: str = ""
    message: str = ""
