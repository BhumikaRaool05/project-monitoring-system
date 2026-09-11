from fastapi import FastAPI
from database import init_db

app = FastAPI(title="Project Monitoring API")


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def home():
    return {"message": "Hello World"}