import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://neondb_owner:npg_iqxQstK59HPW@ep-cool-violet-ahafslci-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
)

SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key-mude-em-producao")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7