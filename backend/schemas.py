from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# 1. Clientdan (Frontend) yeni proje eklenirken gelecek verinin şeması
class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    tech_stack: Optional[str] = None
    github_url: Optional[str] = None
    image_url: Optional[str] = None

# 2. Veritabanından veriyi okuyup Frontend'e yollarken kullanacağımız şema
# ProjectCreate'teki tüm alanları miras alır, üstüne veritabanından gelen id yi ekler.
class ProjectResponse(ProjectCreate):
    id: int

    # Pydantic'in SQLAlchemy modeli (ORM nesnesi) okuyabilmesi için bu ayar şarttır. !!!
    model_config = {"from_attributes": True}


# 3. Clientdan (Frontend) iletişim formu doldurulduğunda gelecek verinin şeması
class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

# 4. Veritabanına kaydedilen mesajı döndürürken kullanacağımız şema
class ContactMessageResponse(ContactMessageCreate):
    id: int
    created_at: datetime
    
    model_config = {"from_attributes": True}