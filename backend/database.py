from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# .env dosyasındaki verileri okumamızı sağlar
load_dotenv()

# .env dosyasındaki DATABASE_URL 
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise ValueError("HATA: DATABASE_URL .env dosyasından okunamadı! Lütfen .env dosyanızı kontrol edin.")

# Veritabanı ile iletişimi sağlayan motor
engine = create_engine(DATABASE_URL)

# Veritabanı ile her işlem yaptığımızda bir oturum (session) açmamızı sağlar
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Modellerimizin (tablolarımızın) türeyeceği ana sınıf
Base = declarative_base()

# Veritabanı bağlantısını güvenli bir şekilde açıp kapatan yardımcı fonksiyon
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()