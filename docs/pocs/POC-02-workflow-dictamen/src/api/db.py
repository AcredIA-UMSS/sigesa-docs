"""Capa BD — PostgreSQL o SQLite local."""
from __future__ import annotations

import os
import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Generator

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://sigesa_poc:sigesa_poc_dev@localhost:5433/sigesa_poc",
)
SQLITE_PATH = os.getenv("POC_SQLITE_PATH", str(Path(__file__).resolve().parents[1] / "poc02_local.db"))


def use_sqlite() -> bool:
    return os.getenv("POC_USE_SQLITE", "").lower() in ("1", "true", "yes")


class SqliteConnection:
    def __init__(self, conn: sqlite3.Connection):
        self._conn = conn

    def execute(self, query: str, params: tuple = ()):
        q = query.replace("%s", "?")
        return SqliteCursor(self._conn.execute(q, params))

    def commit(self) -> None:
        self._conn.commit()

    def rollback(self) -> None:
        self._conn.rollback()


class SqliteCursor:
    def __init__(self, cur: sqlite3.Cursor):
        self._cur = cur

    def fetchone(self) -> dict[str, Any] | None:
        row = self._cur.fetchone()
        if row is None:
            return None
        cols = [d[0] for d in self._cur.description]
        return dict(zip(cols, row))

    def fetchall(self) -> list[dict[str, Any]]:
        rows = self._cur.fetchall()
        cols = [d[0] for d in self._cur.description]
        return [dict(zip(cols, r)) for r in rows]


@contextmanager
def db_conn() -> Generator[Any, None, None]:
    if use_sqlite():
        conn = sqlite3.connect(SQLITE_PATH)
        wrapper = SqliteConnection(conn)
        try:
            yield wrapper
        finally:
            conn.close()
    else:
        import psycopg
        from psycopg.rows import dict_row

        with psycopg.connect(DATABASE_URL, row_factory=dict_row) as conn:
            yield conn
