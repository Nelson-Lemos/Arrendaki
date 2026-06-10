from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from ..schemas import PropertyOut
from ..models import Property
from ..database import get_db

router = APIRouter(prefix="/properties", tags=["properties"])


@router.get("", response_model=list[PropertyOut])
def list_properties(
    q: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    mode: Optional[str] = Query(None),
    price_min: Optional[float] = Query(None),
    price_max: Optional[float] = Query(None),
    municipio: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None),
    has_video: Optional[bool] = Query(None),
    is_new: Optional[bool] = Query(None),
    negotiable: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Property)
    if q:
        like = f"%{q}%"
        query = query.filter(
            Property.title.ilike(like)
            | Property.location.ilike(like)
            | Property.municipio.ilike(like)
        )
    if type:
        query = query.filter(Property.type == type)
    if mode:
        query = query.filter(Property.mode == mode)
    if price_min is not None:
        query = query.filter(Property.price >= price_min)
    if price_max is not None:
        query = query.filter(Property.price <= price_max)
    if municipio:
        query = query.filter(Property.municipio == municipio)
    if featured is not None:
        query = query.filter(Property.featured == featured)
    if has_video is not None:
        query = query.filter(Property.has_video == has_video)
    if is_new is not None:
        query = query.filter(Property.is_new == is_new)
    if negotiable is not None:
        query = query.filter(Property.negotiable == negotiable)
    return query.order_by(Property.featured.desc(), Property.created_at.desc()).all()


@router.get("/{property_id}", response_model=PropertyOut)
def get_property(property_id: int, db: Session = Depends(get_db)):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    return prop
