from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chatGPT import prefix_gpt

app = FastAPI()

prefix_router = APIRouter(prefix="/api")

@prefix_router.get("/data")
def root():
    return {"message": "hello"}

origins=["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)
app.include_router(prefix_router)
app.include_router(prefix_gpt)

