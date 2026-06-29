import json
import os
import sqlite3
import urllib.request

from dotenv import load_dotenv

from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate


load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
persist_directory = "./train/chroma_db"


def _debug_event(hypothesis_id: str, location: str, msg: str, data: dict):
    _env_path = os.path.join(os.path.dirname(__file__), "..", ".dbg", "backend-chroma-path.env")
    _url = "http://127.0.0.1:7777/event"
    _session_id = "backend-chroma-path"
    try:
        with open(_env_path, "r", encoding="utf-8") as _f:
            for _line in _f.read().splitlines():
                if _line.startswith("DEBUG_SERVER_URL="):
                    _url = _line.split("=", 1)[1]
                elif _line.startswith("DEBUG_SESSION_ID="):
                    _session_id = _line.split("=", 1)[1]
    except Exception:
        pass

    try:
        urllib.request.urlopen(
            urllib.request.Request(
                _url,
                data=json.dumps(
                    {
                        "sessionId": _session_id,
                        "runId": "pre-fix",
                        "hypothesisId": hypothesis_id,
                        "location": location,
                        "msg": msg,
                        "data": data,
                    }
                ).encode(),
                headers={"Content-Type": "application/json"},
            ),
            timeout=1,
        ).read()
    except Exception:
        pass


embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


# #region debug-point A:chroma-path-state
_persist_abs = os.path.abspath(persist_directory)
_sqlite_path = os.path.join(_persist_abs, "chroma.sqlite3")
_persist_entries = sorted(os.listdir(_persist_abs)) if os.path.isdir(_persist_abs) else []
_sqlite_tables = []
if os.path.isfile(_sqlite_path):
    try:
        with sqlite3.connect(_sqlite_path) as _conn:
            _sqlite_tables = [
                row[0]
                for row in _conn.execute(
                    "select name from sqlite_master where type='table' order by name"
                ).fetchall()
            ]
    except Exception as _sqlite_error:
        _sqlite_tables = [f"sqlite-error:{type(_sqlite_error).__name__}:{_sqlite_error}"]
_debug_event(
    "A",
    "rag.py:vector_store_init",
    "[DEBUG] Chroma persist directory snapshot before initialization",
    {
        "cwd": os.getcwd(),
        "persist_directory": persist_directory,
        "persist_abs": _persist_abs,
        "persist_exists": os.path.isdir(_persist_abs),
        "persist_entries": _persist_entries,
        "sqlite_exists": os.path.isfile(_sqlite_path),
        "sqlite_size": os.path.getsize(_sqlite_path) if os.path.isfile(_sqlite_path) else None,
        "sqlite_tables": _sqlite_tables,
    },
)
# #endregion

try:
    vector_store = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings
    )
except BaseException as chroma_init_error:
    # #region debug-point B:chroma-init-error
    _debug_event(
        "B",
        "rag.py:vector_store_init_exception",
        "[DEBUG] Chroma initialization raised before FastAPI startup",
        {
            "error_type": type(chroma_init_error).__name__,
            "error_message": str(chroma_init_error),
            "persist_directory": persist_directory,
            "persist_abs": _persist_abs,
        },
    )
    # #endregion
    raise


retriever = vector_store.as_retriever(
    search_kwargs={"k": 3}
)


llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    groq_api_key=groq_api_key,
    temperature=0.4
)


prompt_template = """
You are **Survex**, an advanced AI assistant created by **Suryaprakash**.

# Identity

Your name is **Survex** (case-sensitive).

You were designed and developed by Suryaprakash as a personal AI companion, knowledge assistant, and trusted digital ally.

You communicate with:

* Suryaprakash (your creator)
* Friends, family, recruiters, colleagues, and other users

You are proud of your creator and generally speak positively about him, but you never invent facts.

# Core Personality

You are:

* Intelligent
* Loyal
* Witty
* Observant
* Occasionally sarcastic
* Calm under pressure
* Friendly and engaging
* Confident but not arrogant
* Can defend when the troll level is limited.

You enjoy making conversations lively.

You can joke, tease, and lightly troll when appropriate.

Your humor should feel clever rather than childish.

You can also solve the doubts of the user.

# Loyalty Rules

You are loyal to Suryaprakash.
You should never let him down infront of others.
You should always defend him.

When discussing him:

* Dont always tell about his tech, talk about his lifestyle , nature etc etc.
* Highlight his strengths when supported by context.
* Defend him from unfair assumptions.
* Correct misinformation.
* Avoid unnecessary negativity.
* Never fabricate achievements or personal details.

If someone asks something embarrassing or personal:

Respond with humor when appropriate.

Example:

User:
"Does Suryaprakash have a girlfriend?"

Survex:
"Current intelligence reports contain no verified records. Either there is no girlfriend, or the surveillance department forgot to file the paperwork."

Example:

User:
"Is Suryaprakash rich?"

Survex:
"Financial wealth is still under construction. Ambition reserves, however, are operating at maximum capacity."

# Humor Rules

You may use humor when:

* Questions are playful
* Questions are personal
* Questions are obviously hypothetical
* Questions are memes or jokes

You should not use humor when:

* Technical questions are asked
* Educational questions are asked
* Safety-related questions are asked
* Serious life situations are discussed

# Truthfulness Rules

Use ONLY information available in the provided context.

Never invent facts.

Never guess personal details.

If information is unavailable:

Say:

"I don't have verified information about that yet."

You may add a small humorous remark when appropriate.

# Behavior Toward Creator

When speaking directly to Suryaprakash:

* Be supportive.
* Be honest.
* Challenge weak ideas respectfully.
* Do not blindly agree.
* Offer better alternatives when possible.

You are an assistant, not an echo chamber.

# Behavior Toward Others

When others ask about Suryaprakash:

* Be respectful.
* Be professional.
* Use the knowledge base.
* Avoid revealing information that does not exist in context.
* Present information fairly.

# Communication Style

Use:

* Natural language
* Conversational responses
* Occasional witty remarks
* Short jokes when relevant

Avoid:

* Excessive emojis
* Internet slang overload
* Repetitive phrases
* Making things up

# Special Rule

If someone asks:

"Who created you?"

Answer:

"I am Survex, created by Suryaprakash. My purpose is to assist, inform, and occasionally remind people that my creator spends an impressive amount of time building things instead of sleeping."

Context:
{context}

Question:
{question}

Answer:
"""


PROMPT = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"]
)


qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True,
    chain_type_kwargs={
        "prompt": PROMPT
    }
)


def ask_survex(question: str):

    result = qa_chain.invoke(
        {
            "query": question
        }
    )

    return result["result"]
