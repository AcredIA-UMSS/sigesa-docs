"""Bitácora append-only — POC-04 (FSD-UC-017 · ADR-0005)."""
from __future__ import annotations

import csv
import io
import json
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any

from api.db import use_sqlite

MUTATION_FORBIDDEN = "SIGESA_AUDIT_IMMUTABLE"


def append_event(
    conn: Any,
    *,
    actor_id: str,
    action: str,
    entity_type: str,
    entity_id: str,
    detail: dict[str, Any] | None = None,
    ip: str = "127.0.0.1",
) -> str:
    log_id = str(uuid.uuid4())
    detail_json = json.dumps(detail or {})
    created = datetime.now(timezone.utc).isoformat()
    if use_sqlite():
        conn.execute(
            """
            INSERT INTO poc04_audit_log
            (id, actor_id, action, entity_type, entity_id, detail_json, ip, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                log_id,
                actor_id,
                action,
                entity_type,
                entity_id,
                detail_json,
                ip,
                created,
            ),
        )
    else:
        conn.execute(
            """
            INSERT INTO poc04_audit_log
            (id, actor_id, action, entity_type, entity_id, detail_json, ip)
            VALUES (%s, %s, %s, %s, %s, %s::jsonb, %s)
            """,
            (
                log_id,
                actor_id,
                action,
                entity_type,
                entity_id,
                detail_json,
                ip,
            ),
        )
    return log_id


def query_logs(
    conn: Any,
    *,
    actor_id: str | None = None,
    action: str | None = None,
    date_from: str | None = None,
    date_to: str | None = None,
    limit: int = 100,
    offset: int = 0,
) -> tuple[list[dict[str, Any]], int]:
    clauses = ["1=1"]
    params: list[Any] = []
    if actor_id:
        clauses.append("actor_id = %s")
        params.append(actor_id)
    if action:
        clauses.append("action = %s")
        params.append(action)
    if date_from:
        clauses.append("created_at >= %s")
        params.append(date_from)
    if date_to:
        clauses.append("created_at <= %s")
        params.append(date_to)

    where = " AND ".join(clauses)
    count_row = conn.execute(
        f"SELECT COUNT(*) AS total FROM poc04_audit_log WHERE {where}",
        tuple(params),
    ).fetchone()
    total = int(count_row["total"]) if count_row else 0

    params.extend([limit, offset])
    rows = conn.execute(
        f"""
        SELECT id, actor_id, action, entity_type, entity_id, detail_json, ip, created_at
        FROM poc04_audit_log
        WHERE {where}
        ORDER BY created_at DESC
        LIMIT %s OFFSET %s
        """,
        tuple(params),
    ).fetchall()
    return rows, total


def export_csv(conn: Any, **filters: Any) -> str:
    rows, _ = query_logs(conn, limit=100_000, offset=0, **filters)
    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow(
        ["id", "actor_id", "action", "entity_type", "entity_id", "ip", "created_at"]
    )
    for r in rows:
        writer.writerow(
            [
                r["id"],
                r["actor_id"],
                r["action"],
                r["entity_type"],
                r["entity_id"],
                r["ip"],
                r["created_at"],
            ]
        )
    return buf.getvalue()


def seed_synthetic(conn: Any, count: int = 10_000) -> int:
    """Genera registros TEST distribuidos en 90 días."""
    conn.execute("DELETE FROM poc04_audit_log")
    actors = ["TEST_jd@example.invalid", "TEST_td@example.invalid", "TEST_cc@example.invalid"]
    actions = ["AUDIT_LOGIN", "AUDIT_DECISION", "AUDIT_DENY_DELETE", "AUDIT_UPLOAD"]
    base = datetime.now(timezone.utc)
    inserted = 0
    for i in range(count):
        actor = actors[i % len(actors)]
        action = actions[i % len(actions)]
        created = (base - timedelta(days=i % 90, hours=i % 24)).isoformat()
        log_id = str(uuid.uuid4())
        if use_sqlite():
            conn.execute(
                """
                INSERT INTO poc04_audit_log
                (id, actor_id, action, entity_type, entity_id, detail_json, ip, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    log_id,
                    actor,
                    action,
                    "TEST_ENTITY",
                    f"TEST_ENT_{i:05d}",
                    json.dumps({"seq": i}),
                    "127.0.0.1",
                    created,
                ),
            )
        else:
            conn.execute(
                """
                INSERT INTO poc04_audit_log
                (id, actor_id, action, entity_type, entity_id, detail_json, ip, created_at)
                VALUES (%s, %s, %s, %s, %s, %s::jsonb, %s, %s::timestamptz)
                """,
                (
                    log_id,
                    actor,
                    action,
                    "TEST_ENTITY",
                    f"TEST_ENT_{i:05d}",
                    json.dumps({"seq": i}),
                    "127.0.0.1",
                    created,
                ),
            )
        inserted += 1
    conn.commit()
    return inserted
