#!/usr/bin/env python3
"""Ejecuta escenarios POC-01 y escribe evidencia en ../evidencia/."""
from __future__ import annotations

import json
import os
import statistics
import sys
import time
import uuid
from pathlib import Path

# Modo local sin Docker
os.environ.setdefault("POC_USE_SQLITE", "1")
os.environ.setdefault(
    "POC_LOCAL_STORAGE",
    str(Path(__file__).resolve().parents[2].parent / ".local-storage"),
)

EVIDENCIA_DIR = Path(__file__).resolve().parents[2] / "evidencia"
INDICADOR_ID = "a1111111-1111-4111-8111-111111111101"

# Importar app tras configurar entorno
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from fastapi.testclient import TestClient  # noqa: E402

from api.main import app  # noqa: E402


def make_pdf(size_bytes: int) -> bytes:
    header = b"%PDF-1.4\n"
    footer = b"\n%%EOF\n"
    body_len = max(0, size_bytes - len(header) - len(footer))
    return header + (b"0" * body_len) + footer


def upload(
    client: TestClient,
    content: bytes,
    filename: str,
    idem_key: str | None = None,
) -> tuple[int, dict, float]:
    files = {"archivo": (filename, content, "application/pdf")}
    data = {
        "indicadorId": INDICADOR_ID,
        "descripcionCambio": "TEST_carga POC-01 example.invalid",
    }
    headers = {"X-Request-Id": str(uuid.uuid4())}
    if idem_key:
        headers["Idempotency-Key"] = idem_key
    t0 = time.perf_counter()
    r = client.post("/api/v1/documentos", files=files, data=data, headers=headers)
    elapsed = time.perf_counter() - t0
    try:
        body = r.json()
    except Exception:
        body = {"raw": r.text}
    return r.status_code, body, elapsed


def main() -> int:
    EVIDENCIA_DIR.mkdir(parents=True, exist_ok=True)
    results: dict = {"scenarios": [], "metrics": {}, "mode": "local_sqlite"}

    with TestClient(app) as client:
        # 413 — archivo > 50 MB
        big = make_pdf(52_428_801)
        assert len(big) == 52_428_801
        code, body, _ = upload(client, big, "TEST_oversize.pdf")
        err = body.get("detail", {})
        if isinstance(err, dict):
            err_code = err.get("error", {}).get("code")
        else:
            err_code = None
        results["scenarios"].append(
            {
                "name": "reject_oversize",
                "pass": code == 413,
                "status": code,
                "code": err_code,
                "payload_bytes": len(big),
            }
        )

        # Idempotencia
        idem = str(uuid.uuid4())
        versions = []
        ids = []
        for i in range(3):
            content = make_pdf(1024)
            code, body, _ = upload(client, content, f"TEST_idem_{i}.pdf", idem_key=idem)
            if code == 201:
                versions.append(body.get("version"))
                ids.append(body.get("id"))
        results["scenarios"].append(
            {
                "name": "idempotency_retries",
                "pass": len(versions) == 3 and len(set(versions)) == 1 and len(set(ids)) == 1,
                "versions": versions,
                "documento_ids": ids,
            }
        )

        # Latencia 5 MB x 30
        latencies: list[float] = []
        for i in range(30):
            content = make_pdf(5 * 1024 * 1024)
            code, body, elapsed = upload(client, content, f"TEST_5mb_{i}.pdf")
            if code == 201:
                latencies.append(elapsed)
        if latencies:
            latencies.sort()
            p95_idx = max(0, int(len(latencies) * 0.95) - 1)
            p95 = latencies[p95_idx]
            results["metrics"]["latency_5mb"] = {
                "n": len(latencies),
                "p50_s": round(statistics.median(latencies), 3),
                "p95_s": round(p95, 3),
                "min_s": round(min(latencies), 3),
                "max_s": round(max(latencies), 3),
            }
            results["scenarios"].append(
                {
                    "name": "latency_p95_5mb",
                    "pass": p95 <= 3.0,
                    "p95_s": round(p95, 3),
                    "threshold_s": 3.0,
                }
            )

        code, last_body, _ = upload(client, make_pdf(4096), "TEST_hash_check.pdf")
        if code == 201:
            results["scenarios"].append(
                {
                    "name": "integrity_hash_recorded",
                    "pass": bool(
                        last_body.get("id")
                        and last_body.get("storageKey")
                        and last_body.get("hash")
                    ),
                    "hash": last_body.get("hash"),
                    "storageKey": last_body.get("storageKey"),
                }
            )

    all_pass = all(s.get("pass") for s in results["scenarios"])
    results["verdict"] = "success" if all_pass else "partial"
    out = EVIDENCIA_DIR / "poc01-run-summary.json"
    out.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(json.dumps(results, indent=2))
    return 0 if all_pass else 2


if __name__ == "__main__":
    sys.exit(main())
