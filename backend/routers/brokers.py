from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.schemas import BrokerOut
from backend.models import Broker
from backend.database import get_db

router = APIRouter(prefix="/brokers", tags=["brokers"])


@router.get("", response_model=list[BrokerOut])
def list_brokers(db: Session = Depends(get_db)):
    return db.query(Broker).order_by(Broker.rating.desc()).all()


@router.get("/{broker_id}", response_model=BrokerOut)
def get_broker(broker_id: int, db: Session = Depends(get_db)):
    broker = db.query(Broker).filter(Broker.id == broker_id).first()
    if not broker:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Intermediário não encontrado")
    return broker
