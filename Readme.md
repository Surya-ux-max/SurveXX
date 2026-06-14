# SURVEX - Built for Boss 'Suryaprakash S'
Backend file initialised with the simple starting data
# TO Start backend 
uv add -r requirements.txt or main users switch to virtual environment
uvicorn main:app --reload

# SURVEX JARVIS - Development Log

## Project Goal

Build a personal AI assistant similar to JARVIS that can answer questions about Suryaprakash using personal information stored in text files.

The assistant will:

* Answer questions about Suryaprakash
* Explain projects, skills, goals, and experiences
* Use Retrieval-Augmented Generation (RAG)
* Use Groq as the LLM provider
* Use ChromaDB as vector storage
* Eventually have a FastAPI backend and React frontend
* Be deployable using Docker

---

# Architecture

```text
TXT Files
     ↓
Text Loader
     ↓
Chunking
     ↓
Embeddings
     ↓
ChromaDB
     ↓
Retriever
     ↓
Groq LLM
     ↓
Answer
```

---

# Initial Folder Structure

```text
SURVEX/
│
├── backend/
│   ├── data/
│   │   └── info.txt
│   │
│   └── chroma_db/
│
├── train/
│   └── train.ipynb
│
└── README.md
```

---

# Knowledge Base Design

Initially:

```text
data/
└── info.txt
```

Future structure:

```text
data/
├── biography.txt
├── family.txt
├── education.txt
├── skills.txt
├── projects.txt
├── goals.txt
├── personality.txt
├── achievements.txt
└── memories.txt
```

---

# Technologies Selected

## LLM

Provider:

* Groq

Recommended Model:

* llama-3.3-70b-versatile

Alternative Models:

* llama-3.1-8b-instant
* deepseek-r1-distill-llama-70b

---

## Embeddings

Model:

```text
sentence-transformers/all-MiniLM-L6-v2
```

Advantages:

* Free
* Runs locally
* No API cost

---

## Vector Database

ChromaDB

Purpose:

* Store embeddings
* Perform semantic search
* Retrieve relevant chunks

---

# Training Pipeline

## Load Documents

```python
TextLoader()
```

Purpose:

* Read TXT files

---

## Chunk Documents

```python
RecursiveCharacterTextSplitter
```

Configuration:

```python
chunk_size=500
chunk_overlap=100
```

Purpose:

* Split large text into searchable chunks

---

## Create Embeddings

```python
HuggingFaceEmbeddings
```

Model:

```text
all-MiniLM-L6-v2
```

Purpose:

* Convert text into vectors

---

## Store Embeddings

```python
Chroma.from_documents()
```

Purpose:

* Persist vectors for retrieval

---

## Create Retriever

```python
retriever = db.as_retriever()
```

Purpose:

* Search knowledge base

---

## Connect Groq

```python
ChatGroq()
```

Purpose:

* Generate final answer

---

# Prompt Design

Prompt used:

```text
You are JARVIS.

Answer only from the provided context.

If information is unavailable, say:

"I don't have information about that yet."

Context:
{context}

Question:
{input}
```

Purpose:

* Reduce hallucinations
* Restrict answers to stored knowledge

---

# Major Issue Encountered

Dependency conflicts.

Installed versions included:

```text
langchain 0.3.26
langchain-core 1.4.2
langchain-community 0.3.27
langchain-groq 1.1.2
langchain-huggingface 1.2.2
```

Problem:

```text
LangChain 0.3 ecosystem
+
LangChain 1.x ecosystem
```

This caused:

```text
ModuleNotFoundError
No module named 'langchain_core.memory'
```

and

```text
No module named 'langchain_core.messages.block_translators.langchain_v0'
```

---

# Root Cause

Incompatible package versions.

Examples:

```text
langchain-groq 1.1.2
requires
langchain-core >=1.2.8
```

but project was using:

```text
langchain-core 0.3.68
```

---

# Decision

Create a completely fresh environment and restart development.

---

# Planned Clean Environment

```text
jarvis/
│
├── backend/
│   ├── data/
│   ├── chroma_db/
│   ├── app.py
│   └── .env
│
├── notebooks/
│   └── train.ipynb
│
├── frontend/
│
├── requirements.txt
│
└── README.md
```

---

# Development Roadmap

## Phase 1

* Setup environment
* Load TXT files
* Generate embeddings
* Store in ChromaDB
* Connect Groq
* Test RAG

## Phase 2

* FastAPI backend
* REST APIs
* Session management

## Phase 3

* React frontend
* Chat interface
* Message history

## Phase 4

* Voice input
* Voice output
* Personal memory updates

## Phase 5

* Docker
* VPS deployment
* HTTPS
* Production environment

---

# Current Status

Completed:

* Architecture planning
* Knowledge base design
* Groq selection
* ChromaDB selection
* RAG design

Pending:

* Clean environment setup
* Rebuild training pipeline
* Backend API development
* Frontend development
* Deployment

```
```
