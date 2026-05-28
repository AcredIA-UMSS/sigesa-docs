"""Tests POC-03 — Transactional Outbox."""
import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

# DB aislada por archivo de test
os.environ["POC_USE_SQLITE"] = "1"
os.environ["POC_SQLITE_PATH"] = str(Path(__file__).resolve().parents[1] / "poc03_test.db")
if Path(os.environ["POC_SQLITE_PATH"]).exists():
    Path(os.environ["POC_SQLITE_PATH"]).unlink()

from api.main import app  # noqa: E402

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset():
    client.post("/api/v1/test/reset")
    yield
    client.post("/api/v1/test/reset")


def test_commit_encola_outbox():
    r = client.post(
        "/api/v1/domain/indicator-decision",
        json={
            "indicador_id": "TEST_IND-POC03-001",
            "accion": "APROBAR",
            "idempotency_key": "TEST_KEY_001",
        },
    )
    assert r.status_code == 200
    body = r.json()
    assert body["committed"] is True
    assert body["outboxEnqueued"] is True
    stats = client.get("/api/v1/outbox/stats").json()
    assert stats["pending"] == 1
    assert stats["domainDecisions"] == 1


def test_rollback_no_encola():
    r = client.post(
        "/api/v1/domain/indicator-decision",
        json={
            "indicador_id": "TEST_IND-POC03-002",
            "accion": "RECHAZAR",
            "idempotency_key": "TEST_KEY_ROLLBACK",
            "simulate_rollback": True,
        },
    )
    assert r.status_code == 200
    assert r.json()["outboxEnqueued"] is False
    stats = client.get("/api/v1/outbox/stats").json()
    assert stats["pending"] == 0
    assert stats["domainDecisions"] == 0


def test_worker_drain_sin_duplicados():
    key = "TEST_KEY_DRAIN"
    client.post(
        "/api/v1/domain/indicator-decision",
        json={
            "indicador_id": "TEST_IND-POC03-003",
            "accion": "APROBAR",
            "idempotency_key": key,
        },
    )
    d1 = client.post("/api/v1/worker/drain", json={"limit": 10}).json()
    d2 = client.post("/api/v1/worker/drain", json={"limit": 10}).json()
    d3 = client.post("/api/v1/worker/drain", json={"limit": 10}).json()
    assert d1["sinkDeliveries"] == 1
    assert d2["sinkDeliveries"] == 1
    assert d3["sinkDeliveries"] == 1
    stats = client.get("/api/v1/outbox/stats").json()
    assert stats["sent"] >= 1


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["poc"] == "POC-03"
