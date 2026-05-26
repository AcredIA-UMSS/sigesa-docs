"""
POC-02 SIGESA — workflow dictamen y cierre subfase (FSD-UC-003).
"""
from __future__ import annotations

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from api.db import db_conn, use_sqlite
from api.workflow import (
    evaluar_cierre,
    nueva_version_tras_rechazo,
    validar_dictamen,
)

TEST_SUBFASE_ID = "b2222222-2222-4222-8222-222222222201"
TEST_PROCESO_ID = "c3333333-3333-4333-8333-333333333301"

app = FastAPI(title="SIGESA POC-02 Workflow", version="0.1.0")


def init_schema(conn) -> None:
    if use_sqlite():
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc02_proceso (
                id TEXT PRIMARY KEY,
                nombre TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc02_subfase (
                id TEXT PRIMARY KEY,
                proceso_id TEXT NOT NULL,
                codigo TEXT NOT NULL,
                estado TEXT NOT NULL DEFAULT 'ABIERTA'
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc02_indicador (
                id TEXT PRIMARY KEY,
                subfase_id TEXT NOT NULL,
                codigo TEXT NOT NULL,
                estado TEXT NOT NULL DEFAULT 'PENDIENTE',
                obligatorio INTEGER NOT NULL DEFAULT 1,
                lock_version INTEGER NOT NULL DEFAULT 0
            )
            """
        )
    else:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc02_proceso (
                id UUID PRIMARY KEY,
                nombre VARCHAR(128) NOT NULL
            );
            CREATE TABLE IF NOT EXISTS poc02_subfase (
                id UUID PRIMARY KEY,
                proceso_id UUID NOT NULL REFERENCES poc02_proceso(id),
                codigo VARCHAR(32) NOT NULL,
                estado VARCHAR(20) NOT NULL DEFAULT 'ABIERTA'
            );
            CREATE TABLE IF NOT EXISTS poc02_indicador (
                id UUID PRIMARY KEY,
                subfase_id UUID NOT NULL REFERENCES poc02_subfase(id),
                codigo VARCHAR(32) NOT NULL,
                estado VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE',
                obligatorio BOOLEAN NOT NULL DEFAULT TRUE,
                lock_version INT NOT NULL DEFAULT 0
            );
            """
        )
    ignore = "INSERT OR IGNORE" if use_sqlite() else "INSERT"
    suffix = "" if use_sqlite() else " ON CONFLICT DO NOTHING"
    conn.execute(
        f"{ignore} INTO poc02_proceso (id, nombre) VALUES (%s, 'TEST_Proceso_POC02'){suffix}",
        (TEST_PROCESO_ID,),
    )
    conn.execute(
        f"{ignore} INTO poc02_subfase (id, proceso_id, codigo, estado) VALUES (%s, %s, 'TEST_SUB-01', 'ABIERTA'){suffix}",
        (TEST_SUBFASE_ID, TEST_PROCESO_ID),
    )
    seeds = [
        ("d4444444-4444-4444-8444-444444444401", "TEST_IND-01"),
        ("d4444444-4444-4444-8444-444444444402", "TEST_IND-02"),
        ("d4444444-4444-4444-8444-444444444403", "TEST_IND-03"),
    ]
    for ind_id, codigo in seeds:
        if use_sqlite():
            conn.execute(
                "INSERT OR IGNORE INTO poc02_indicador (id, subfase_id, codigo, estado, obligatorio) VALUES (%s, %s, %s, 'PENDIENTE', 1)",
                (ind_id, TEST_SUBFASE_ID, codigo),
            )
        else:
            conn.execute(
                """
                INSERT INTO poc02_indicador (id, subfase_id, codigo, estado, obligatorio)
                VALUES (%s, %s, %s, 'PENDIENTE', TRUE)
                ON CONFLICT DO NOTHING
                """,
                (ind_id, TEST_SUBFASE_ID, codigo),
            )
    conn.commit()


@app.on_event("startup")
def startup() -> None:
    with db_conn() as conn:
        init_schema(conn)


class DecisionBody(BaseModel):
    accion: str
    justificacion: str | None = None


class AvanceBody(BaseModel):
    confirmar: bool = True


@app.post("/api/v1/indicadores/{indicador_id}/enviar-revision")
def enviar_revision(indicador_id: str):
    """Stub: [CC] carga evidencia → EN_REVISION (para tests)."""
    with db_conn() as conn:
        row = conn.execute(
            "SELECT estado FROM poc02_indicador WHERE id = %s",
            (indicador_id,),
        ).fetchone()
        if not row:
            raise HTTPException(404, "Indicador no encontrado")
        if row["estado"] not in ("PENDIENTE", "RECHAZADO"):
            raise HTTPException(
                409,
                detail={"error": {"code": "SIGESA_WF_INVALID_STATE"}},
            )
        conn.execute(
            "UPDATE poc02_indicador SET estado = 'EN_REVISION', lock_version = lock_version + 1 WHERE id = %s",
            (indicador_id,),
        )
        conn.commit()
    return {"indicadorId": indicador_id, "estado": "EN_REVISION"}


@app.patch("/api/v1/indicadores/{indicador_id}/decision")
def decision(indicador_id: str, body: DecisionBody):
    nuevo, err = validar_dictamen(
        _get_estado(indicador_id), body.accion, body.justificacion
    )
    if err:
        code = 422 if err == "SIGESA_VAL_JUSTIFICATION_SHORT" else 409
        raise HTTPException(code, detail={"error": {"code": err}})

    with db_conn() as conn:
        updated = conn.execute(
            """
            UPDATE poc02_indicador
            SET estado = %s, lock_version = lock_version + 1
            WHERE id = %s AND estado = 'EN_REVISION'
            RETURNING id, estado, lock_version
            """,
            (nuevo, indicador_id),
        ).fetchone()
        if not updated:
            raise HTTPException(
                409,
                detail={"error": {"code": "SIGESA_WF_CONFLICT"}},
            )
        conn.commit()
    return {
        "indicadorId": indicador_id,
        "estado": nuevo,
        "tecnicoId": "TEST_td@example.invalid",
    }


@app.post("/api/v1/indicadores/{indicador_id}/nueva-version")
def nueva_version(indicador_id: str):
    estado = _get_estado(indicador_id)
    nuevo, err = nueva_version_tras_rechazo(estado)
    if err:
        raise HTTPException(409, detail={"error": {"code": err}})
    with db_conn() as conn:
        conn.execute(
            "UPDATE poc02_indicador SET estado = %s, lock_version = lock_version + 1 WHERE id = %s",
            (nuevo, indicador_id),
        )
        conn.commit()
    return {"indicadorId": indicador_id, "estado": nuevo}


def _get_estado(indicador_id: str) -> str:
    with db_conn() as conn:
        row = conn.execute(
            "SELECT estado FROM poc02_indicador WHERE id = %s",
            (indicador_id,),
        ).fetchone()
    if not row:
        raise HTTPException(404, "Indicador no encontrado")
    return row["estado"]


@app.get("/api/v1/subfases/{subfase_id}/puede-cerrar")
def puede_cerrar(subfase_id: str):
    with db_conn() as conn:
        q = (
            "SELECT id, codigo, estado, obligatorio FROM poc02_indicador WHERE subfase_id = %s"
            if use_sqlite()
            else "SELECT id::text AS id, codigo, estado, obligatorio FROM poc02_indicador WHERE subfase_id = %s"
        )
        rows = conn.execute(q, (subfase_id,)).fetchall()
    if not rows:
        raise HTTPException(404, "Subfase sin indicadores")
    indicadores = [
        {
            "id": str(r["id"]),
            "codigo": r["codigo"],
            "estado": r["estado"],
            "obligatorio": bool(r["obligatorio"]),
        }
        for r in rows
    ]
    return evaluar_cierre(indicadores)


@app.post("/api/v1/subfases/{subfase_id}/avance")
def avanzar_subfase(subfase_id: str, body: AvanceBody):
    if not body.confirmar:
        raise HTTPException(400, "confirmar requerido")
    evaluacion = puede_cerrar(subfase_id)
    if not evaluacion["puede_cerrar"]:
        raise HTTPException(
            409,
            detail={
                "error": {
                    "code": "SIGESA_WF_INCOMPLETE",
                    "message": "No se puede cerrar la subfase: hay indicadores obligatorios pendientes.",
                },
                "indicadoresPendientes": evaluacion["indicadores_pendientes"],
                "motivos": evaluacion["motivos"],
            },
        )
    with db_conn() as conn:
        conn.execute(
            "UPDATE poc02_subfase SET estado = 'CERRADA' WHERE id = %s",
            (subfase_id,),
        )
        conn.commit()
    return {"subfaseId": subfase_id, "nuevoEstado": "CERRADA"}


@app.post("/api/v1/test/reset")
def reset_test_data():
    """Reinicia estados de indicadores TEST para repetir pruebas."""
    with db_conn() as conn:
        conn.execute(
            "UPDATE poc02_subfase SET estado = 'ABIERTA' WHERE id = %s",
            (TEST_SUBFASE_ID,),
        )
        conn.execute(
            """
            UPDATE poc02_indicador SET estado = 'PENDIENTE', lock_version = 0
            WHERE subfase_id = %s
            """,
            (TEST_SUBFASE_ID,),
        )
        conn.commit()
    return {"ok": True}


@app.get("/health")
def health():
    return {"status": "ok", "poc": "POC-02", "sqlite": use_sqlite()}
