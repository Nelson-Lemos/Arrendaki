import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parent.parent / ".env"
print(f">>> .env path: {env_path}")
print(f">>> .env exists: {env_path.exists()}")

load_dotenv(dotenv_path=env_path)

print(f">>> DATABASE_URL loaded: {os.getenv('DATABASE_URL')}")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:root@localhost:3306/arrendaki?charset=utf8mb4",
)

SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key-mude-em-producao")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7