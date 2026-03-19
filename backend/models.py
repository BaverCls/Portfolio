from sqlalchemy import Column, Integer, String, Text
from database import Base


class Project(Base):
    
    __tablename__ = "projects"

    # Columns and rows for project
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True, nullable=False)
    description = Column(Text, nullable=True)
    tech_stack = Column(String(200), nullable=True)
    github_url = Column(String(255), nullable=True)
    image_url = Column(String(500), nullable=True)