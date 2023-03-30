from pydantic import BaseModel
from typing import Optional
from enum import Enum

class FormatType(str, Enum):
    tweets = "tweets",
    paragraphs = "paragraphs",
    bullets = "bullets"

class Languages(str, Enum):
   default = "default",
   spanish = "spanish",
   english = "english",
   portuguese = "portuguese",
   french = "french"

class ResumeBody(BaseModel):
    key: Optional[str] = None
    text: str
    long: int = 3
    format: FormatType = "paragraphs"
    language: Languages = "spanish"
    explanation_type: bool = False

class ExplanationBody(BaseModel):
    key: Optional[str] = None
    text: str
    years: str
    language: Languages = "spanish"

