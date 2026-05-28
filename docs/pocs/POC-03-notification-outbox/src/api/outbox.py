"""Lógica Transactional Outbox — POC-03 (FSD-UC-015)."""
from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone
from typing import Any

from api.db import use_sqlite

STATUS_PENDING = "PENDING"
STATUS_SENT = "SENT"


def new_idempotency_key() -> str:
    return str(uuid.uuid4())


def enqueue_outbox(
    conn: Any,
    *,
    event_type: str,
    recipient: str,
    payload: dict[str, Any],
    idempotency_key: str,
) -> str:
    outbox_id = str(uuid.uuid4())
    payload_json = json.dumps(payload)
    if use_sqlite():
        conn.execute(
            """
            INSERT INTO poc03_notification_outbox
            (id, event_type, recipient, payload_json, status, idempotency_key, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            (
                outbox_id,
                event_type,
                recipient,
                payload_json,
                STATUS_PENDING,
                idempotency_key,
                datetime.now(timezone.utc).isoformat(),
            ),
        )
    else:
        conn.execute(
            """
            INSERT INTO poc03_notification_outbox
            (id, event_type, recipient, payload_json, status, idempotency_key)
            VALUES (%s, %s, %s, %s::jsonb, %s, %s)
            """,
            (
                outbox_id,
                event_type,
                recipient,
                payload_json,
                STATUS_PENDING,
                idempotency_key,
            ),
        )
    return outbox_id


def record_decision(
    conn: Any,
    *,
    indicador_id: str,
    accion: str,
    recipient: str,
    idempotency_key: str,
    simulate_rollback: bool = False,
) -> dict[str, Any]:
    """Transacción dominio + outbox; opcional rollback forzado."""
    if use_sqlite():
        conn.execute(
            """
            INSERT INTO poc03_domain_decision (indicador_id, accion, created_at)
            VALUES (%s, %s, %s)
            """,
            (indicador_id, accion, datetime.now(timezone.utc).isoformat()),
        )
    else:
        conn.execute(
            """
            INSERT INTO poc03_domain_decision (indicador_id, accion)
            VALUES (%s, %s)
            """,
            (indicador_id, accion),
        )

    outbox_id = enqueue_outbox(
        conn,
        event_type=f"INDICATOR_{accion}",
        recipient=recipient,
        payload={
            "indicadorId": indicador_id,
            "accion": accion,
            "domain": "example.invalid",
        },
        idempotency_key=idempotency_key,
    )

    if simulate_rollback:
        conn.rollback()
        return {"committed": False, "outbox_id": None}

    conn.commit()
    return {"committed": True, "outbox_id": outbox_id}


def fetch_pending(conn: Any, limit: int = 50) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT id, event_type, recipient, payload_json, idempotency_key, status
        FROM poc03_notification_outbox
        WHERE status = %s
        ORDER BY created_at ASC
        LIMIT %s
        """,
        (STATUS_PENDING, limit),
    ).fetchall()
    return rows


def mark_sent(conn: Any, outbox_id: str) -> None:
    if use_sqlite():
        conn.execute(
            """
            UPDATE poc03_notification_outbox
            SET status = %s, sent_at = %s
            WHERE id = %s
            """,
            (STATUS_SENT, datetime.now(timezone.utc).isoformat(), outbox_id),
        )
    else:
        conn.execute(
            """
            UPDATE poc03_notification_outbox
            SET status = %s, sent_at = NOW()
            WHERE id = %s
            """,
            (STATUS_SENT, outbox_id),
        )
