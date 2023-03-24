from pydantic import BaseModel
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

class AsFromType(str, Enum):
    defaut = "default",
    grandmother = "a grandfather or grandmother",
    kindergarden = "kindergarden teacher"

class ResumeBody(BaseModel):
    text: str
    long: int = 3
    format: FormatType = "paragraphs"
    language: Languages = "default"
    explanation_type: bool = False

class ExplanationBody(BaseModel):
    text: str
    years: str
    asFrom: AsFromType = "default"
    language: Languages = "default"

