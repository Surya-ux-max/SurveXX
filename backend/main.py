from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import ChatRequest
from rag import ask_survex


app = FastAPI(
    title="SurveX API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {
        "message": "SurveX Backend Running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    answer = ask_survex(
        request.message
    )

    return {
        "response": answer
    }