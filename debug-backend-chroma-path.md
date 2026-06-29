# Debug Session: backend-chroma-path

Status: OPEN

## User Symptom
- Backend fails to start with `uvicorn main:app --reload` after moving the trained DB to `backend/train/chroma_db` and updating the path in `rag.py`.

## Hypotheses
- Relative Chroma DB path is resolved from the wrong working directory.
- `uvicorn --reload` spawns a process that changes path resolution behavior.
- Chroma DB directory exists but is not in the expected persistence format.
- Startup import path in `rag.py` throws before FastAPI app initialization.
- A separate dependency or import error is blocking startup.

## Plan
- Inspect backend startup files and current DB path handling.
- Reproduce the failure and capture the runtime traceback.
- Identify the confirmed cause from evidence.
- Apply the smallest safe fix.
- Verify startup again.

## Evidence
- Bare `uvicorn main:app --reload` fails in the shell because `uvicorn` is not globally installed.
- `uv run uvicorn main:app --reload` reaches app import and fails in `backend/rag.py` while constructing `Chroma(persist_directory="./train/chroma_db")`.
- The exact runtime exception is `pyo3_runtime.PanicException: range start index 10 out of range for slice of length 9`.
- Creating a fresh Chroma store in `./temp_chroma_test` succeeds in the same environment.
- The notebook writes to `./chroma_db` under `backend/train`, which matches the runtime path `./train/chroma_db`.

## Current Conclusion
- The active failure is tied to the persisted contents of `backend/train/chroma_db`, not to FastAPI, not to `uvicorn`, and not to the general Chroma installation.
- The most likely cause is that the persisted DB/index files are incompatible or corrupted.

## Verified Analysis
- Hypothesis A: Confirmed. The runtime resolves `./train/chroma_db` to `D:\SurveX\backend\train\chroma_db`, and the folder plus `chroma.sqlite3` exist.
- Hypothesis B: Rejected. The failure reproduces even with direct `chromadb.PersistentClient(path='./train/chroma_db')`, so `uvicorn --reload` is not the root cause.
- Hypothesis C: Confirmed. The trained DB uses a newer collection schema than the installed runtime.
- Hypothesis D: Confirmed. Import-time construction of `Chroma(...)` causes the backend to fail before FastAPI startup completes.
- Hypothesis E: Rejected. A fresh temp Chroma store opens successfully in the same environment.

## Root Cause
- The backend was pinned to `chromadb==1.1.0`, but the trained DB in `backend/train/chroma_db` was created by a newer Chroma version that stores an extra `schema_str` column in the `collections` table.
- Evidence:
  - Current runtime-created DB schema: `collections(id, name, dimension, database_id, config_json_str)`
  - Trained DB schema: `collections(id, name, dimension, database_id, config_json_str, schema_str)`
  - `chromadb==1.1.0` panics while opening that newer DB schema.

## Fix Applied
- Updated backend dependency pin from `chromadb==1.1.0` to `chromadb==1.5.9` in `backend/pyproject.toml` and `backend/requirements.txt`.
- Regenerated `uv.lock` and synced the environment.

## Verification
- `chromadb 1.5.9` successfully opens `backend/train/chroma_db`.
- `uv run uvicorn main:app --reload` starts successfully and completes FastAPI startup.
