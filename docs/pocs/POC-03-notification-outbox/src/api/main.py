"""
POC-03 SIGESA — Transactional Outbox para notificaciones (FSD-UC-015).
"""
from __future__ import annotations

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from api import smtp_sink
from api.db import db_conn, use_sqlite
from api.outbox import fetch_pending, mark_sent, record_decision

app = FastAPI(title="SIGESA POC-03 Notification Outbox", version="0.1.0")


def init_schema(conn) -> None:
    if use_sqlite():
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc03_domain_decision (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                indicador_id TEXT NOT NULL,
                accion TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc03_notification_outbox (
                id TEXT PRIMARY KEY,
                event_type TEXT NOT NULL,
                recipient TEXT NOT NULL,
                payload_json TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'PENDING',
                idempotency_key TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL,
                sent_at TEXT
            )
            """
        )
    else:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS poc03_domain_decision (
                id SERIAL PRIMARY KEY,
                indicador_id UUID NOT NULL,
                accion VARCHAR(16) NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
            CREATE TABLE IF NOT EXISTS poc03_notification_outbox (
                id UUID PRIMARY KEY,
                event_type VARCHAR(64) NOT NULL,
                recipient VARCHAR(255) NOT NULL,
                payload_json JSONB NOT NULL,
                status VARCHAR(16) NOT NULL DEFAULT 'PENDING',
                idempotency_key VARCHAR(64) NOT NULL UNIQUE,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                sent_at TIMESTAMPTZ
            );
            """
        )
    conn.commit()


@app.on_event("startup")
def startup() -> None:
    smtp_sink.reset_sink()
    with db_conn() as conn:
        init_schema(conn)


class DecisionBody(BaseModel):
    indicador_id: str = Field(..., examples=["TEST_IND-POC03-001"])
    accion: str = Field(..., pattern="^(APROBAR|RECHAZAR)$")
    recipient: str = Field(default="TEST_cc@example.invalid")
    idempotency_key: str | None = None
    simulate_rollback: bool = False


class DrainBody(BaseModel):
    limit: int = Field(default=50, ge=1, le=200)


@app.post("/api/v1/domain/indicator-decision")
def indicator_decision(body: DecisionBody):
    key = body.idempotency_key or f"TEST_{body.indicador_id}_{body.accion}"
    with db_conn() as conn:
        result = record_decision(
            conn,
            indicador_id=body.indicador_id,
            accion=body.accion,
            recipient=body.recipient,
            idempotency_key=key,
            simulate_rollback=body.simulate_rollback,
        )
    if not result["committed"]:
        return {"committed": False, "outboxEnqueued": False}
    return {
        "committed": True,
        "outboxEnqueued": True,
        "outboxId": result["outbox_id"],
        "idempotencyKey": key,
    }


@app.post("/api/v1/worker/drain")
def drain_worker(body: DrainBody):
    processed = 0
    skipped_duplicate = 0
    with db_conn() as conn:
        pending = fetch_pending(conn, limit=body.limit)
        for row in pending:
            delivered = smtp_sink.deliver(
                idempotency_key=row["idempotency_key"],
                recipient=row["recipient"],
                event_type=row["event_type"],
            )
            if delivered:
                mark_sent(conn, str(row["id"]))
                processed += 1
            else:
                mark_sent(conn, str(row["id"]))
                skipped_duplicate += 1
        conn.commit()
    return {
        "processed": processed,
        "skippedDuplicate": skipped_duplicate,
        "sinkDeliveries": smtp_sink.delivery_count(),
    }


@app.get("/api/v1/outbox/stats")
def outbox_stats():
    with db_conn() as conn:
        pending = conn.execute(
            "SELECT COUNT(*) AS c FROM poc03_notification_outbox WHERE status = %s",
            ("PENDING",),
        ).fetchone()
        sent = conn.execute(
            "SELECT COUNT(*) AS c FROM poc03_notification_outbox WHERE status = %s",
            ("SENT",),
        ).fetchone()
        domain = conn.execute(
            "SELECT COUNT(*) AS c FROM poc03_domain_decision",
        ).fetchone()
    return {
        "pending": pending["c"] if pending else 0,
        "sent": sent["c"] if sent else 0,
        "domainDecisions": domain["c"] if domain else 0,
        "sinkDeliveries": smtp_sink.delivery_count(),
    }


@app.post("/api/v1/test/reset")
def reset_test():
    smtp_sink.reset_sink()
    with db_conn() as conn:
        init_schema(conn)
        conn.execute("DELETE FROM poc03_notification_outbox")
        conn.execute("DELETE FROM poc03_domain_decision")
        conn.commit()
    return {"ok": True}


@app.get("/health")
def health():
    return {"status": "ok", "poc": "POC-03", "sqlite": use_sqlite()}
