"""
POC-04 SIGESA — consulta bitácora append-only (FSD-UC-017).
"""
from __future__ import annotations

import time

from fastapi import FastAPI, HTTPException, Query, Response
from pydantic import BaseModel, Field

from api.audit import MUTATION_FORBIDDEN, append_event, export_csv, query_logs, seed_synthetic
from api.db import db_conn, use_sqlite

app = FastAPI(title="SIGESA POC-04 Audit Log", version="0.1.0")


def init_schema(conn) -> None:
    if use_sqlite():
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc04_audit_log (
                id TEXT PRIMARY KEY,
                actor_id TEXT NOT NULL,
                action TEXT NOT NULL,
                entity_type TEXT NOT NULL,
                entity_id TEXT NOT NULL,
                detail_json TEXT NOT NULL,
                ip TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_poc04_audit_created_actor
            ON poc04_audit_log (created_at, actor_id)
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_poc04_audit_action
            ON poc04_audit_log (action)
            """
        )
    else:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc04_audit_log (
                id UUID PRIMARY KEY,
                actor_id VARCHAR(255) NOT NULL,
                action VARCHAR(64) NOT NULL,
                entity_type VARCHAR(64) NOT NULL,
                entity_id VARCHAR(64) NOT NULL,
                detail_json JSONB NOT NULL,
                ip VARCHAR(45) NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
            CREATE INDEX IF NOT EXISTS idx_poc04_audit_created_actor
            ON poc04_audit_log (created_at, actor_id);
            CREATE INDEX IF NOT EXISTS idx_poc04_audit_action
            ON poc04_audit_log (action);
            """
        )
    conn.commit()


@app.on_event("startup")
def startup() -> None:
    with db_conn() as conn:
        init_schema(conn)


class AuditEventBody(BaseModel):
    actor_id: str = Field(..., examples=["TEST_jd@example.invalid"])
    action: str
    entity_type: str = "TEST_INDICADOR"
    entity_id: str
    detail: dict | None = None
    ip: str = "127.0.0.1"


class SeedBody(BaseModel):
    count: int = Field(default=10_000, ge=100, le=50_000)


@app.post("/api/v1/audit/events")
def create_audit_event(body: AuditEventBody):
    with db_conn() as conn:
        log_id = append_event(
            conn,
            actor_id=body.actor_id,
            action=body.action,
            entity_type=body.entity_type,
            entity_id=body.entity_id,
            detail=body.detail,
            ip=body.ip,
        )
        conn.commit()
    return {"id": log_id}


@app.get("/api/v1/audit/logs")
def get_audit_logs(
    actor_id: str | None = None,
    action: str | None = None,
    date_from: str | None = Query(None, alias="from"),
    date_to: str | None = Query(None, alias="to"),
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
):
    t0 = time.perf_counter()
    with db_conn() as conn:
        rows, total = query_logs(
            conn,
            actor_id=actor_id,
            action=action,
            date_from=date_from,
            date_to=date_to,
            limit=limit,
            offset=offset,
        )
    elapsed_ms = (time.perf_counter() - t0) * 1000
    items = [
        {
            "id": str(r["id"]),
            "actorId": r["actor_id"],
            "action": r["action"],
            "entityType": r["entity_type"],
            "entityId": r["entity_id"],
            "ip": r["ip"],
            "createdAt": r["created_at"],
        }
        for r in rows
    ]
    return {
        "items": items,
        "total": total,
        "limit": limit,
        "offset": offset,
        "queryMs": round(elapsed_ms, 2),
    }


@app.get("/api/v1/audit/export.csv")
def export_audit_csv(
    actor_id: str | None = None,
    action: str | None = None,
    date_from: str | None = Query(None, alias="from"),
    date_to: str | None = Query(None, alias="to"),
):
    t0 = time.perf_counter()
    with db_conn() as conn:
        csv_body = export_csv(
            conn,
            actor_id=actor_id,
            action=action,
            date_from=date_from,
            date_to=date_to,
        )
    elapsed_ms = (time.perf_counter() - t0) * 1000
    return Response(
        content=csv_body,
        media_type="text/csv",
        headers={"X-Query-Ms": str(round(elapsed_ms, 2))},
    )


@app.api_route("/api/v1/audit/logs/{log_id}", methods=["PUT", "PATCH", "DELETE"])
@app.api_route("/api/v1/audit/events/{log_id}", methods=["PUT", "PATCH", "DELETE"])
def forbid_mutation(log_id: str):
    raise HTTPException(
        405,
        detail={"error": {"code": MUTATION_FORBIDDEN, "message": "Bitácora append-only"}},
    )


@app.post("/api/v1/test/seed")
def test_seed(body: SeedBody):
    with db_conn() as conn:
        n = seed_synthetic(conn, count=body.count)
    return {"seeded": n}


@app.post("/api/v1/test/reset")
def test_reset():
    with db_conn() as conn:
        init_schema(conn)
        conn.execute("DELETE FROM poc04_audit_log")
        conn.commit()
    return {"ok": True}


@app.get("/health")
def health():
    return {"status": "ok", "poc": "POC-04", "sqlite": use_sqlite()}
