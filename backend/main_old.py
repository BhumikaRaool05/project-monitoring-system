from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, Project


app = FastAPI(title="Project Monitoring API")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class ProjectCreate(BaseModel):
    name: str
    status: str = "Planning"


class ProjectUpdate(BaseModel):
    status: str


@app.get("/")
def home():
    return {"message": "Hello World"}


@app.get("/projects")
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()


@app.post("/projects")
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    risk = {"Planning": 8, "In Progress": 5, "Completed": 2}
    db_project = Project(
        name=project.name,
        status=project.status,
        risk_score=risk.get(project.status, 5),
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@app.put("/projects/{project_id}")
def update_project(project_id: int, update: ProjectUpdate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project.status = update.status
    risk = {"Planning": 8, "In Progress": 5, "Completed": 2}
    project.risk_score = risk.get(update.status, 5)
    db.commit()
    db.refresh(project)
    return project


@app.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}


@app.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return {
        "total": len(projects),
        "planning": len([p for p in projects if p.status == "Planning"]),
        "in_progress": len([p for p in projects if p.status == "In Progress"]),
        "completed": len([p for p in projects if p.status == "Completed"]),
    }