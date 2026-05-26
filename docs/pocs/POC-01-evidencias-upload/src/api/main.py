"""
POC-01 SIGESA — upload evidencias (FSD-UC-002).
Spike: validar → hash → S3 → BD transaccional + Idempotency-Key.
"""
from __future__ import annotations

import hashlib
import json
import uuid
from typing import Annotated

from fastapi import FastAPI, File, Form, Header, HTTPException, UploadFile
from fastapi.responses import JSONResponse

from api.db import db_conn, use_sqlite
from api import storage

MAX_BYTES = 52_428_800  # CN-01: 50 MB
ALLOWED_MIME = {
    "application/pdf": b"%PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": b"PK",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": b"PK",
}

TEST_INDICADOR_ID = "a1111111-1111-4111-8111-111111111101"

app = FastAPI(title="SIGESA POC-01 Upload", version="0.1.0")


def init_schema(conn) -> None:
    if use_sqlite():
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc01_indicador (
                id TEXT PRIMARY KEY,
                codigo TEXT NOT NULL,
                estado TEXT NOT NULL DEFAULT 'PENDIENTE'
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc01_documento (
                id TEXT PRIMARY KEY,
                indicador_id TEXT NOT NULL,
                version INTEGER NOT NULL,
                hash_sha256 TEXT NOT NULL,
                storage_key TEXT NOT NULL,
                nombre_archivo TEXT NOT NULL,
                mime TEXT NOT NULL,
                tamano INTEGER NOT NULL,
                descripcion_cambio TEXT NOT NULL,
                creado_en TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (indicador_id, version)
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc01_idempotency (
                idempotency_key TEXT PRIMARY KEY,
                response_json TEXT NOT NULL,
                creado_en TEXT DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
    else:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc01_indicador (
                id UUID PRIMARY KEY,
                codigo VARCHAR(32) NOT NULL,
                estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE'
            );
            CREATE TABLE IF NOT EXISTS poc01_documento (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                indicador_id UUID NOT NULL REFERENCES poc01_indicador(id),
                version INT NOT NULL,
                hash_sha256 CHAR(64) NOT NULL,
                storage_key TEXT NOT NULL,
                nombre_archivo VARCHAR(255) NOT NULL,
                mime VARCHAR(128) NOT NULL,
                tamano BIGINT NOT NULL,
                descripcion_cambio TEXT NOT NULL,
                creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                UNIQUE (indicador_id, version)
            );
            CREATE TABLE IF NOT EXISTS poc01_idempotency (
                idempotency_key UUID PRIMARY KEY,
                response_json JSONB NOT NULL,
                creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
            """
        )
    if use_sqlite():
        conn.execute(
            "INSERT OR IGNORE INTO poc01_indicador (id, codigo, estado) VALUES (%s, 'TEST_IND-POC01', 'PENDIENTE')",
            (TEST_INDICADOR_ID,),
        )
    else:
        conn.execute(
            """
            INSERT INTO poc01_indicador (id, codigo, estado)
            VALUES (%s, 'TEST_IND-POC01', 'PENDIENTE')
            ON CONFLICT (id) DO NOTHING
            """,
            (TEST_INDICADOR_ID,),
        )
    conn.commit()


@app.on_event("startup")
def startup() -> None:
    storage.ensure_bucket()
    with db_conn() as conn:
        init_schema(conn)


def detect_mime(content: bytes, declared: str | None) -> str:
    for mime, magic in ALLOWED_MIME.items():
        if content[: len(magic)] == magic:
            return mime
    if declared in ALLOWED_MIME:
        return declared
    raise HTTPException(
        status_code=415,
        detail={
            "error": {
                "code": "SIGESA_DOC_MIME",
                "message": "Formato no permitido. Use PDF, DOCX o XLSX.",
            }
        },
    )


def next_version(conn, indicador_id: str) -> int:
    row = conn.execute(
        "SELECT COALESCE(MAX(version), 0) + 1 AS v FROM poc01_documento WHERE indicador_id = %s",
        (indicador_id,),
    ).fetchone()
    return int(row["v"])


@app.post("/api/v1/documentos")
async def upload_documento(
    archivo: Annotated[UploadFile, File()],
    indicadorId: Annotated[str, Form()],
    descripcionCambio: Annotated[str, Form()],
    idempotency_key: Annotated[str | None, Header(alias="Idempotency-Key")] = None,
    x_request_id: Annotated[str | None, Header(alias="X-Request-Id")] = None,
):
    request_id = x_request_id or str(uuid.uuid4())
    key_uuid: str | None = None

    if not indicadorId or not descripcionCambio.strip():
        raise HTTPException(
            status_code=400,
            detail={
                "error": {
                    "code": "SIGESA_EVIDENCE_CRITERION_REQUIRED",
                    "message": "indicadorId y descripcionCambio son obligatorios.",
                }
            },
        )

    if idempotency_key:
        try:
            key_uuid = str(uuid.UUID(idempotency_key.strip()))
        except ValueError as exc:
            raise HTTPException(status_code=400, detail="Idempotency-Key inválido") from exc
        with db_conn() as conn:
            cached = conn.execute(
                "SELECT response_json FROM poc01_idempotency WHERE idempotency_key = %s",
                (key_uuid,),
            ).fetchone()
            if cached:
                raw = cached["response_json"]
                body = json.loads(raw) if isinstance(raw, str) else raw
                return JSONResponse(
                    status_code=201,
                    content=body,
                    headers={"X-Request-Id": request_id},
                )

    content = await archivo.read()
    if len(content) > MAX_BYTES:
        raise HTTPException(
            status_code=413,
            detail={
                "error": {
                    "code": "SIGESA_DOC_SIZE",
                    "message": "El archivo supera el tamaño máximo permitido (50 MB).",
                }
            },
        )

    mime = detect_mime(content, archivo.content_type)
    file_hash = hashlib.sha256(content).hexdigest()
    nombre = archivo.filename or "TEST_evidencia.pdf"

    with db_conn() as conn:
        ind = conn.execute(
            "SELECT id, estado FROM poc01_indicador WHERE id = %s",
            (indicadorId,),
        ).fetchone()
        if not ind:
            raise HTTPException(status_code=404, detail="Indicador TEST no encontrado")

        version = next_version(conn, indicadorId)
        doc_id = str(uuid.uuid4())
        storage_key = f"TEST_umss/{indicadorId}/v{version}/{nombre}"

        try:
            storage.put_object(storage_key, content, mime)
        except Exception as exc:
            raise HTTPException(
                status_code=502,
                detail={"error": {"code": "SIGESA_STORAGE_ERROR", "message": str(exc)}},
            ) from exc

        try:
            conn.execute(
                """
                INSERT INTO poc01_documento
                (id, indicador_id, version, hash_sha256, storage_key, nombre_archivo, mime, tamano, descripcion_cambio)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    doc_id,
                    indicadorId,
                    version,
                    file_hash,
                    storage_key,
                    nombre,
                    mime,
                    len(content),
                    descripcionCambio,
                ),
            )
            conn.execute(
                "UPDATE poc01_indicador SET estado = 'EN_REVISION' WHERE id = %s",
                (indicadorId,),
            )
            response_body = {
                "id": doc_id,
                "indicadorId": indicadorId,
                "version": version,
                "hash": file_hash,
                "nombreArchivo": nombre,
                "mime": mime,
                "tamano": len(content),
                "indicadorEstado": "EN_REVISION",
                "storageKey": storage_key,
            }
            if idempotency_key and key_uuid:
                conn.execute(
                    """
                    INSERT INTO poc01_idempotency (idempotency_key, response_json)
                    VALUES (%s, %s)
                    """,
                    (key_uuid, json.dumps(response_body)),
                )
            conn.commit()
        except Exception:
            conn.rollback()
            storage.delete_object(storage_key)
            raise

    return JSONResponse(
        status_code=201,
        content=response_body,
        headers={"X-Request-Id": request_id},
    )


@app.get("/health")
def health():
    return {
        "status": "ok",
        "poc": "POC-01",
        "sqlite": use_sqlite(),
        "local_storage": storage.use_local(),
    }
