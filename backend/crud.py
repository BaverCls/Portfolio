from sqlalchemy.orm import Session
import models
import schemas

# 1. Read
def get_projects(db: Session):
    
    return db.query(models.Project).all()

# 2. Create
def create_project(db: Session, project: schemas.ProjectCreate):
    # Pydantic şemasından (schemas) gelen veriyi, SQLAlchemy modeline (models) dönüştürüyoruz.
    db_project = models.Project(
        title=project.title,
        description=project.description,
        tech_stack=project.tech_stack,
        github_url=project.github_url,
        image_url=project.image_url
    )
    
    db.add(db_project)        
    db.commit()               
    db.refresh(db_project)    # Veritabanının oluşturduğu id bilgisini almak için nesneyi yeniler
    
    return db_project

# 3. Read (Tekil)
def get_project(db: Session, project_id: int):
    
    return db.query(models.Project).filter(models.Project.id == project_id).first()

# 4. Update 
def update_project(db: Session, project_id: int, project: schemas.ProjectCreate):
    db_project = get_project(db, project_id) 
    if db_project:
        db_project.title = project.title
        db_project.description = project.description
        db_project.tech_stack = project.tech_stack
        db_project.github_url = project.github_url
        db_project.image_url = project.image_url
        db.commit() 
        db.refresh(db_project)
    return db_project

# 5. Delete (Silme)
def delete_project(db: Session, project_id: int):
    db_project = get_project(db, project_id) 
    if db_project:
        db.delete(db_project) 
        db.commit() 
    return db_project


# --- CONTACT MESSAGES CRUD ---

def create_contact_message(db: Session, message: schemas.ContactMessageCreate):
    db_message = models.ContactMessage(
        name=message.name,
        email=message.email,
        message=message.message
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_contact_messages(db: Session):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()

# Mesaj Silme İşlemi
def delete_contact_message(db: Session, message_id: int):
    db_message = db.query(models.ContactMessage).filter(models.ContactMessage.id == message_id).first()
    if db_message:
        db.delete(db_message)
        db.commit()
    return db_message