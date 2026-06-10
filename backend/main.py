from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, properties, brokers
from .models import Base
from .database import engine, SessionLocal
from .seed import seed_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(properties.router)
app.include_router(brokers.router)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_data(db)
    finally:
        db.close()


@app.get("/health")
def health():
    return {"status": "ok", "app": "ArrendaKi"}