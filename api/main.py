from fastapi import APIRouter, FastAPI
from routes.chatGPT import prefix_gpt

app = FastAPI()

prefix_router = APIRouter(prefix="/api")

@prefix_router.get("/data")
def root():
    return {"message": "hello"}

app.include_router(prefix_router)
app.include_router(prefix_gpt)