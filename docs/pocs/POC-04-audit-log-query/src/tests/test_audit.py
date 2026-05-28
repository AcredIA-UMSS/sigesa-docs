"""Tests POC-04 — bitácora append-only."""
import os
import statistics
import time
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

os.environ["POC_USE_SQLITE"] = "1"
os.environ["POC_SQLITE_PATH"] = str(Path(__file__).resolve().parents[1] / "poc04_test.db")
if Path(os.environ["POC_SQLITE_PATH"]).exists():
    Path(os.environ["POC_SQLITE_PATH"]).unlink()

from api.main import app  # noqa: E402

client = TestClient(app)

SEED_COUNT = 2000  # reducido para CI rápido; escalar a 10k en run_poc04


@pytest.fixture(scope="module", autouse=True)
def seed_data():
    client.post("/api/v1/test/reset")
    client.post("/api/v1/test/seed", json={"count": SEED_COUNT})
    yield
    client.post("/api/v1/test/reset")


def test_append_and_query():
    r = client.post(
        "/api/v1/audit/events",
        json={
            "actor_id": "TEST_jd@example.invalid",
            "action": "AUDIT_LOGIN",
            "entity_id": "TEST_ENT_NEW",
        },
    )
    assert r.status_code == 200
    q = client.get(
        "/api/v1/audit/logs",
        params={"actor_id": "TEST_jd@example.invalid", "action": "AUDIT_LOGIN", "limit": 5},
    )
    assert q.status_code == 200
    body = q.json()
    assert body["total"] >= 1
    assert len(body["items"]) >= 1


def test_forbid_delete():
    r = client.delete("/api/v1/audit/logs/00000000-0000-0000-0000-000000000001")
    assert r.status_code == 405
    assert r.json()["detail"]["error"]["code"] == "SIGESA_AUDIT_IMMUTABLE"


def test_export_csv():
    r = client.get("/api/v1/audit/export.csv", params={"action": "AUDIT_LOGIN"})
    assert r.status_code == 200
    assert "text/csv" in r.headers["content-type"]
    lines = r.text.strip().splitlines()
    assert len(lines) >= 2
    assert lines[0].startswith("id,actor_id")


def test_query_p95_under_threshold():
    samples = []
    for _ in range(30):
        t0 = time.perf_counter()
        resp = client.get(
            "/api/v1/audit/logs",
            params={
                "actor_id": "TEST_td@example.invalid",
                "action": "AUDIT_DECISION",
                "limit": 50,
            },
        )
        assert resp.status_code == 200
        samples.append((time.perf_counter() - t0) * 1000)
    p95 = statistics.quantiles(samples, n=20)[18]
    assert p95 < 800, f"P95={p95:.1f}ms supera umbral fracaso POC"


def test_health():
    r = client.get("/health")
    assert r.json()["poc"] == "POC-04"
