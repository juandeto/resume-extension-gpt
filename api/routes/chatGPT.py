from fastapi import APIRouter, FastAPI
import os
import openai
from enum import Enum

openai.api_key = "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"

prefix_gpt = APIRouter(prefix="/api")


class FormatType(str, Enum):
    tweets = "tweets",
    paragraphs = "paragraphs",
    bullets = "bullets"

@prefix_gpt.get("/resume")
async def get_resume(count: int = 3, format: FormatType = "paragraphs"):
    resume = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "user", "content": f"Resumime esta noticia https://www.lanacion.com.ar/politica/vialidad-cristina-kirchner-leyo-la-sentencia-en-su-casa-y-desde-su-entorno-afirmaron-que-no-hay-nid09032023/ en {count} {format}"},
            ]
        )
    return resume
