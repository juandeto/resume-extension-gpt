from fastapi import APIRouter, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routes.chatGPT import prefix_gpt

app = FastAPI(
            title="API_GPT",
            docs_url='/gptapi/docs',
            redoc_url='/gptapi/redoc',
            openapi_url='/gptapi/openapi.json'
)

prefix_router = APIRouter(prefix="/gptapi")

@prefix_router.get("/")
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
