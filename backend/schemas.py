from pydantic import BaseModel
from typing import Optional

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