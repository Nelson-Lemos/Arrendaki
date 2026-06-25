from sqlalchemy import Column, Integer, String, Float, Boolean, JSON, Text, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime, timezone

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="tenant")  # tenant, owner, broker, company
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    favorites = relationship("Favorite", back_populates="user")


class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    municipio = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)
    beds = Column(Integer, default=0)
    baths = Column(Integer, default=0)
    area = Column(Integer, default=0)
    price = Column(Float, nullable=False)
    mode = Column(String(50), default="direct")  # direct, brokered
    featured = Column(Boolean, default=False)
    is_new = Column(Boolean, default=False)
    has_video = Column(Boolean, default=False)
    negotiable = Column(Boolean, default=False)
    desc = Column(Text, nullable=True)
    amenities = Column(JSON, nullable=True)
    color = Column(String(7), default="#c8a97e")
    image_url = Column(String(500), nullable=True)
    images = Column(JSON, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Broker(Base):
    __tablename__ = "brokers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    area = Column(String(255), nullable=False)
    rating = Column(Float, default=5.0)
    reviews = Column(Integer, default=0)
    deals = Column(Integer, default=0)
    experience = Column(Integer, default=0)
    avatar = Column(String(10), nullable=True)
    certified = Column(Boolean, default=False)
    speciality = Column(String(255), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)

    user = relationship("User", back_populates="favorites")
    property = relationship("Property")


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=True)
    broker_id = Column(Integer, ForeignKey("brokers.id"), nullable=True)
    mode = Column(String(50), nullable=False)  # direct, broker
    name = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    email = Column(String(255), nullable=True)
    message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
