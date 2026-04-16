from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class SecureUser(Base):
    __tablename__ = "secure_users"

    id = Column(Integer, primary_key=True, index=True)
    operator_id = Column(String, unique=True, index=True)
    name = Column(String, index=True, nullable=True)
    encrypted_email = Column(String)
    hashed_password = Column(String)

class OperatorHistory(Base):
    __tablename__ = "operator_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("secure_users.id"), index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    log_tag = Column(String)
    log_type = Column(String)
    log_message = Column(String)

class FederatedIdentity(Base):
    __tablename__ = "federated_identities"

    id = Column(Integer, primary_key=True, index=True)
    google_subject_id = Column(String, unique=True, index=True)
    operator_id = Column(String, ForeignKey("secure_users.operator_id"))
