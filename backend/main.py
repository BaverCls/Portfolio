from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
import jwt
from datetime import datetime, timedelta, timezone
import os
import secrets
import smtplib
from email.message import EmailMessage

import crud, models, schemas
from database import engine, get_db

# Proje ilk çalıştığında, models.py'deki tablolari veritabanında oluşturur (eğer mevcut değillerse).
models.Base.metadata.create_all(bind=engine)

# Çalışma ortamını belirliyoruz (Varsayılan: development)
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# varsayılan Swagger URL'sini kapatıyoruz (kendi CDN'imizi eklemek için)
app = FastAPI(title="Portfolio API", docs_url=None, openapi_url=None if ENVIRONMENT == "production" else "/openapi.json")

# Frontend URL'sini .env dosyasından alıyoruz. 
# (Eğer .env'de yoksa varsayılan olarak localhost kullanır)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# CORS Ayarları (Güvenlik için)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"], # Sadece kullandığımız metotlara izin veriyoruz
    allow_headers=["Authorization", "Content-Type"], # Sadece kullandığımız başlıklara izin veriyoruz
)

# Kök (Ana) Dizin - Tarayıcıdan direkt adrese girildiğinde karşılama mesajı verir
@app.get("/")
def read_root():
    return {"message": "Portfolio API'ye Hoş Geldiniz! API Test arayüzü için /docs adresine gidin."}

# --- GÜVENLİK (JWT TOKEN) AYARLARI ---
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

if not all([SECRET_KEY, ADMIN_USERNAME, ADMIN_PASSWORD]):
    raise ValueError("KRİTİK GÜVENLİK HATASI: .env dosyasındaki şifreler (ADMIN_PASSWORD) veya gizli anahtar eksik!")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 2 # Bilet 2 saat geçerli

# --- E-POSTA AYARLARI ---
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SENDER_EMAIL = os.getenv("SENDER_EMAIL") # E-postayı gönderecek olan Gmail adresin
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD") # Gmail Uygulama Şifresi (Normal şifre değil)
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL") # Bildirimin geleceği adres (Kendi kişisel adresin olabilir)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_admin(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Giriş yapılamadı veya yetkiniz yok",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None or username != ADMIN_USERNAME:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    return username

@app.post("/login")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    is_username_correct = secrets.compare_digest(form_data.username, ADMIN_USERNAME)
    is_password_correct = secrets.compare_digest(form_data.password, ADMIN_PASSWORD)
    if not (is_username_correct and is_password_correct):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Hatalı kullanıcı adı veya şifre")
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    token = jwt.encode({"sub": form_data.username, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

# Türkiye'deki jsdelivr (CDN) engellemelerini aşmak için Swagger UI'ı Unpkg üzerinden yüklüyoruz
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    if ENVIRONMENT == "production":
        raise HTTPException(status_code=404, detail="Sayfa bulunamadı")
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Swagger UI",
        swagger_js_url="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js",
        swagger_css_url="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css",
    )

# 1. Tüm Projeleri Listele (GET)
@app.get("/projects/", response_model=List[schemas.ProjectResponse])
def read_projects(db: Session = Depends(get_db)):
    return crud.get_projects(db)

# 2. Yeni Proje Ekle (POST)
@app.post("/projects/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    return crud.create_project(db=db, project=project)

# 3. Tekil Proje Getir (GET)
@app.get("/projects/{project_id}", response_model=schemas.ProjectResponse)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    return db_project

# 4. Proje Güncelle (PUT)
@app.put("/projects/{project_id}", response_model=schemas.ProjectResponse)
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    db_project = crud.update_project(db, project_id=project_id, project=project)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    return db_project

# 5. Proje Sil (DELETE)
@app.delete("/projects/{project_id}", response_model=schemas.ProjectResponse)
def delete_project(project_id: int, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    db_project = crud.delete_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    return db_project

# --- CONTACT FORM ENDPOINTS ---

def send_email_notification(name: str, user_email: str, message: str):
    print("--- E-posta gönderme görevi başlatıldı. ---")
    if not all([SENDER_EMAIL, SENDER_PASSWORD, RECEIVER_EMAIL]):
        print("Uyarı: E-posta ayarları eksik olduğu için e-posta bildirimi gönderilemedi.")
        return
    try:
        msg = EmailMessage()
        msg.set_content(f"Sitenizden yeni bir iletişim mesajı aldınız!\n\nGönderen: {name}\nE-posta: {user_email}\n\nMesaj:\n{message}")
        msg['Subject'] = f"Portfolyo Yeni Mesaj: {name}"
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"E-posta gönderim hatası: {e}")

# 6. Yeni İletişim Mesajı Gönder (POST)
@app.post("/contact/", response_model=schemas.ContactMessageResponse)
def create_contact_message(message: schemas.ContactMessageCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    new_message = crud.create_contact_message(db=db, message=message)
    # Kullanıcıyı e-posta gitmesini bekletmemek için işlemi arka planda (Background) yapıyoruz
    background_tasks.add_task(send_email_notification, new_message.name, new_message.email, new_message.message)
    return new_message

# 7. Tüm İletişim Mesajlarını Listele (GET) - Sadece Yetkili
@app.get("/contact/", response_model=List[schemas.ContactMessageResponse])
def read_contact_messages(db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    return crud.get_contact_messages(db)

# 8. İletişim Mesajı Sil (DELETE) - Sadece Yetkili
@app.delete("/contact/{message_id}", response_model=schemas.ContactMessageResponse)
def delete_contact_message(message_id: int, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    db_message = crud.delete_contact_message(db, message_id=message_id)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Mesaj bulunamadı")
    return db_message