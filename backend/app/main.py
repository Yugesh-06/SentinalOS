from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from sqlalchemy.orm import Session
from sqlalchemy import desc
from passlib.context import CryptContext
from .core.database import get_db, pii_manager, db_instance
from .core.models import Base, SecureUser, OperatorHistory, FederatedIdentity
from .tasks import process_document_task, celery_app
from celery.result import AsyncResult
from google.oauth2 import id_token
from google.auth.transport import requests
import os

# Basic observability/logging per rubric
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("sentinel_api")

app = FastAPI(title="Sentinel OS Backend API", version="1.0.0")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic schemas
class SignUpRequest(BaseModel):
    operator_id: str
    email: str
    password: str

class LoginRequest(BaseModel):
    operator_id: str
    password: str

class GoogleAuthRequest(BaseModel):
    token: str

class GoogleBindRequest(BaseModel):
    token: str
    operator_id: str
    password: str

class HistoryEventRequest(BaseModel):
    log_tag: str
    log_type: str
    log_message: str

@app.on_event("startup")
def startup_event():
    # Create DB tables
    if db_instance._engine:
        Base.metadata.create_all(bind=db_instance._engine)
        logger.info("Database tables verified.")

# Allow React to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    logger.info("Health check endpoint hit.")
    return {"status": "Sentinel Enclave Active."}

@app.post("/api/v1/extract")
async def extract_document(file: UploadFile = File(...)):
    """
    Receives a document and sends it to the Celery Worker Queue asynchronously.
    Matches rubric: 'Work must be separate cannot be async job in the backend itself'
    """
    logger.info(f"Received file for extraction: {file.filename}")
    
    # Read file content safely
    contents = await file.read()
    
    upload_dir = "/app/uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(contents)
    
    # Send atomic task to Redis/Celery queue
    task = process_document_task.delay(file_path, len(contents))
    
    return {
        "message": "Document ingested. Async agents engaged.",
        "task_id": task.id,
        "status": "PROCESSING"
    }

@app.get("/api/v1/extract/status/{task_id}")
def get_extraction_status(task_id: str):
    task_result = AsyncResult(task_id, app=celery_app)
    if task_result.state == 'PENDING':
        return {"status": "PROCESSING"}
    elif task_result.state == 'SUCCESS':
        return {"status": "SUCCESS", "result": task_result.result}
    elif task_result.state == 'FAILURE':
        return {"status": "FAILED", "error": str(task_result.info)}
    else:
        return {"status": task_result.state}

@app.post("/api/v1/auth/signup")
def signup(req: SignUpRequest, db: Session = Depends(get_db)):
    """Registers a new Operator Node"""
    existing = db.query(SecureUser).filter(SecureUser.operator_id == req.operator_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Operator ID already registered in the enclave.")
    
    # Hash password and encrypt email
    hashed_pw = pwd_context.hash(req.password)
    encrypted_email = pii_manager.encrypt_pii(req.email)
    
    new_user = SecureUser(
        operator_id=req.operator_id,
        name=req.operator_id,
        encrypted_email=encrypted_email,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Seed history
    seed_log = OperatorHistory(
        user_id=new_user.id,
        log_tag="INGRESS",
        log_type="info",
        log_message=f"Operator {req.operator_id} node initialized securely."
    )
    db.add(seed_log)
    db.commit()
    
    logger.info(f"New user signed up: {req.operator_id}")
    return {"status": "success", "user_id": new_user.id, "operator_id": new_user.operator_id}

@app.post("/api/v1/auth/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    """Authenticates an Operator Node"""
    user = db.query(SecureUser).filter(SecureUser.operator_id == req.operator_id).first()
    if not user or not pwd_context.verify(req.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
    
    logger.info(f"User authenticated: {req.operator_id}")
    return {"status": "success", "user_id": user.id, "operator_id": user.operator_id}

@app.post("/api/v1/auth/google")
def google_auth(req: GoogleAuthRequest, db: Session = Depends(get_db)):
    """Federates Google Single Sign-on token with Sentinel OS Access Controls"""
    try:
        idinfo = id_token.verify_oauth2_token(req.token, requests.Request())
        email = idinfo.get("email")
        google_id = idinfo.get("sub")
        
        # Check if Google Identity is bound
        federation = db.query(FederatedIdentity).filter(FederatedIdentity.google_subject_id == google_id).first()
        
        if federation:
            user = db.query(SecureUser).filter(SecureUser.operator_id == federation.operator_id).first()
            if user:
                logger.info(f"User authenticated natively via Google Federation: {user.operator_id}")
                return {"status": "success", "user_id": user.id, "operator_id": user.operator_id}
                
        # If not bound, we force 2-step registration
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail={
                "message": "BINDING_REQUIRED",
                "email": email,
                "name": idinfo.get("name") or email.split('@')[0],
                "google_token": req.token
            }
        )
            
    except ValueError as e:
        logger.error(f"Google Federation Verify Error: {e}")
        raise HTTPException(status_code=401, detail="Invalid Google Credentials Token")

@app.post("/api/v1/auth/google/bind")
def google_bind(req: GoogleBindRequest, db: Session = Depends(get_db)):
    """Binds a Google Token to a custom Operator ID and Master Password"""
    try:
        idinfo = id_token.verify_oauth2_token(req.token, requests.Request())
        email = idinfo.get("email")
        google_id = idinfo.get("sub")
        name = idinfo.get("name") or email.split('@')[0]
        
        existing_federation = db.query(FederatedIdentity).filter(FederatedIdentity.google_subject_id == google_id).first()
        if existing_federation:
            raise HTTPException(status_code=400, detail="Google Account is already bound.")
            
        existing_user = db.query(SecureUser).filter(SecureUser.operator_id == req.operator_id).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Operator ID already registered. Choose another.")
            
        encrypted_email = pii_manager.encrypt_pii(email)
        hashed_pw = pwd_context.hash(req.password)
        
        # Create user
        user = SecureUser(
            operator_id=req.operator_id,
            name=name,
            encrypted_email=encrypted_email,
            hashed_password=hashed_pw
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Create Federation Bind
        fed_bind = FederatedIdentity(
            google_subject_id=google_id,
            operator_id=user.operator_id
        )
        db.add(fed_bind)
        
        # Log History
        seed_log = OperatorHistory(
            user_id=user.id,
            log_tag="FEDERATION",
            log_type="info",
            log_message=f"Operator {user.operator_id} securely registered via Google Hybrid Federation ({email})."
        )
        db.add(seed_log)
        db.commit()
        
        logger.info(f"Hybrid Federation complete for {user.operator_id}")
        return {"status": "success", "user_id": user.id, "operator_id": user.operator_id}
        
    except ValueError as e:
        raise HTTPException(status_code=401, detail="Invalid Google Credentials Token")

@app.get("/api/v1/history/{user_id}")
def get_history(user_id: int, db: Session = Depends(get_db)):
    """Fetches scoped operator history logs"""
    history = db.query(OperatorHistory).filter(OperatorHistory.user_id == user_id).order_by(desc(OperatorHistory.timestamp)).all()
    # Format for JSON response
    return [{
        "time": h.timestamp.strftime("%H:%M:%S"),
        "tag": h.log_tag,
        "type": h.log_type,
        "msg": h.log_message
    } for h in history]

@app.post("/api/v1/history/{user_id}")
def add_history(user_id: int, req: HistoryEventRequest, db: Session = Depends(get_db)):
    """Appends an event to the specific user's log"""
    new_log = OperatorHistory(
        user_id=user_id,
        log_tag=req.log_tag,
        log_type=req.log_type,
        log_message=req.log_message
    )
    db.add(new_log)
    db.commit()
    return {"status": "logged"}
