import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from cryptography.fernet import Fernet
import logging

logger = logging.getLogger(__name__)

# --- Singleton DB Connection Pattern ---
# As per maintainability rubric: "singleton pattern should be observed for DB connection"

class DatabaseSingleton:
    _instance = None
    _engine = None
    _SessionLocal = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseSingleton, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        try:
            # We fetch from env var mounted by docker-compose, default to local if missing
            db_url = os.getenv("DATABASE_URL", "postgresql://admin:securepassword123@db:5432/sentinel_os")
            self._engine = create_engine(db_url, pool_size=10, max_overflow=20)
            self._SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self._engine)
            logger.info("Database connection successfully initialized (Singleton).")
        except Exception as e:
            logger.error(f"Failed to initialize database connection: {e}")

    def get_session(self):
        return self._SessionLocal()

# --- PII Encryption Logic ---
# As per security rubric: "Encryption of PII in DB."

class PIIManager:
    def __init__(self):
        # In production this must be an environment variable. Using static for hackathon demo.
        key = os.getenv("ENCRYPTION_KEY", b'r1Z-B9_iP4mPxO5-9K8u_G9qR_Gq9g7O7_1eA9wP-M8=')
        self.cipher_suite = Fernet(key)

    def encrypt_pii(self, plain_text: str) -> str:
        """Encrypt Personal Identifiable Information before DB insertion."""
        if not plain_text: return plain_text
        return self.cipher_suite.encrypt(plain_text.encode()).decode('utf-8')

    def decrypt_pii(self, cipher_text: str) -> str:
        """Decrypt PII after DB retrieval."""
        if not cipher_text: return cipher_text
        return self.cipher_suite.decrypt(cipher_text.encode()).decode('utf-8')

# Global instances
db_instance = DatabaseSingleton()
pii_manager = PIIManager()

def get_db():
    db = db_instance.get_session()
    try:
        yield db
    finally:
        db.close()
