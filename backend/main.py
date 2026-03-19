from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import crud, models, schemas
from database import engine, get_db

# Veritabanı tablolarını otomatik oluşturur (Eğer PostgreSQL'de henüz yoksa (ilerde yapcaz zaten))
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API")

# CORS Ayarları (Güvenlik için)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Bunu ilerde, yayınladıktan sonra değiştireceğiz.
    allow_credentials=True,
    allow_methods=["*"], # Tüm metotlara izin verir
    allow_headers=["*"],
)

# Kök (Ana) Dizin - Tarayıcıdan direkt adrese girildiğinde karşılama mesajı verir
@app.get("/")
def read_root():
    return {"message": "Portfolio API'ye Hoş Geldiniz! API Test arayüzü için /docs adresine gidin."}

# 1. Tüm Projeleri Listele (GET)
@app.get("/projects/", response_model=List[schemas.ProjectResponse])
def read_projects(db: Session = Depends(get_db)):
    return crud.get_projects(db)

# 2. Yeni Proje Ekle (POST)
@app.post("/projects/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
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
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = crud.update_project(db, project_id=project_id, project=project)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    return db_project

# 5. Proje Sil (DELETE)
@app.delete("/projects/{project_id}", response_model=schemas.ProjectResponse)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.delete_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    return db_project