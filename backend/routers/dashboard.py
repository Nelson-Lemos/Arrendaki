from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta, timezone
from backend.schemas import DashboardStats, ContactOut
from backend.models import Property, Contact, User
from backend.database import get_db
from backend.services.auth import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats", response_model=DashboardStats)
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    active = db.query(Property).filter(Property.owner_id == current_user.id).count()
    contacts = db.query(Contact).join(Property, Contact.property_id == Property.id).filter(
        Property.owner_id == current_user.id
    ).count()
    total_price = db.query(func.coalesce(func.sum(Property.price), 0)).filter(
        Property.owner_id == current_user.id
    ).scalar() or 0

    now = datetime.now(timezone.utc)
    week_ago = now - timedelta(days=7)
    contacts_week = db.query(Contact).join(Property, Contact.property_id == Property.id).filter(
        Property.owner_id == current_user.id,
        Contact.created_at >= week_ago,
    ).count()

    prev_week = week_ago - timedelta(days=7)
    prev_contacts = db.query(Contact).join(Property, Contact.property_id == Property.id).filter(
        Property.owner_id == current_user.id,
        Contact.created_at >= prev_week,
        Contact.created_at < week_ago,
    ).count()

    return DashboardStats(
        active_properties=active,
        total_views=active * 120,
        total_contacts=contacts,
        estimated_revenue=total_price,
        contacts_this_week=contacts_week,
        properties_change=active,
        views_change=active * 12,
        contacts_change=contacts - prev_contacts if contacts >= prev_contacts else -(prev_contacts - contacts),
    )


@router.get("/contacts", response_model=list[ContactOut])
def dashboard_contacts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Contact).join(Property, Contact.property_id == Property.id).filter(
        Property.owner_id == current_user.id
    ).order_by(Contact.created_at.desc()).limit(50).all()
