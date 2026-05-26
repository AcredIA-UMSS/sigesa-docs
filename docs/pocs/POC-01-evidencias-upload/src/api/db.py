"""Capa BD — PostgreSQL (Docker) o SQLite local (POC sin Docker)."""
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
SQLITE_PATH = os.getenv("POC_SQLITE_PATH", str(Path(__file__).resolve().parents[1] / "poc01_local.db"))


def use_sqlite() -> bool:
    return os.getenv("POC_USE_SQLITE", "").lower() in ("1", "true", "yes")


class SqliteConnection:
    """Wrapper mínimo compatible con API usada en main.py."""

    def __init__(self, conn: sqlite3.Connection):
        self._conn = conn
        self.row_factory = None

    def execute(self, query: str, params: tuple = ()):
        q = query.replace("%s", "?")
        cur = self._conn.execute(q, params)
        return SqliteCursor(cur)

    def commit(self) -> None:
        self._conn.commit()

    def rollback(self) -> None:
        self._conn.rollback()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self._conn.close()


class SqliteCursor:
    def __init__(self, cur: sqlite3.Cursor):
        self._cur = cur

    def fetchone(self) -> dict[str, Any] | None:
        row = self._cur.fetchone()
        if row is None:
            return None
        cols = [d[0] for d in self._cur.description]
        return dict(zip(cols, row))


@contextmanager
def db_conn() -> Generator[Any, None, None]:
    if use_sqlite():
        conn = sqlite3.connect(SQLITE_PATH)
        conn.row_factory = sqlite3.Row
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
