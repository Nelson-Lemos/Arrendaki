from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from backend.schemas import PropertyOut, PropertyCreate
from backend.models import Property, Contact
from backend.database import get_db
from backend.services.auth import get_current_user
from backend.models import User

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


@router.get("/my", response_model=list[PropertyOut])
def my_properties(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Property).filter(Property.owner_id == current_user.id).order_by(Property.created_at.desc()).all()


@router.post("", response_model=PropertyOut)
def create_property(
    data: PropertyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    prop = Property(**data.model_dump(), owner_id=current_user.id)
    db.add(prop)
    db.commit()
    db.refresh(prop)
    return prop


@router.put("/{property_id}", response_model=PropertyOut)
def update_property(
    property_id: int,
    data: PropertyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    if prop.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Sem permissão para editar este imóvel")
    for key, val in data.model_dump(exclude_unset=True).items():
        setattr(prop, key, val)
    db.commit()
    db.refresh(prop)
    return prop


@router.delete("/{property_id}")
def delete_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    if prop.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Sem permissão para eliminar este imóvel")
    db.delete(prop)
    db.commit()
    return {"ok": True}


@router.get("/{property_id}", response_model=PropertyOut)
def get_property(property_id: int, db: Session = Depends(get_db)):
    prop = db.query(Property).filter(Property.id == property_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    return prop
