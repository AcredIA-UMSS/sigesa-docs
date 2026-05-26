#!/usr/bin/env python3
"""Ejecuta pytest y guarda resumen en evidencia/."""
from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path

EVIDENCIA = Path(__file__).resolve().parents[2] / "evidencia"
SRC = Path(__file__).resolve().parents[1]


def main() -> int:
    os.environ.setdefault("POC_USE_SQLITE", "1")
    EVIDENCIA.mkdir(parents=True, exist_ok=True)
    proc = subprocess.run(
        [sys.executable, "-m", "pytest", "tests/", "-v", "--tb=short"],
        cwd=SRC,
        capture_output=True,
        text=True,
    )
    summary = {
        "exit_code": proc.returncode,
        "passed": proc.returncode == 0,
        "stdout_tail": proc.stdout[-4000:] if proc.stdout else "",
        "stderr_tail": proc.stderr[-2000:] if proc.stderr else "",
    }
    passed_count = proc.stdout.count(" PASSED") if proc.stdout else 0
    failed_count = proc.stdout.count(" FAILED") if proc.stdout else 0
    summary["passed_count"] = passed_count
    summary["failed_count"] = failed_count
    summary["verdict"] = "success" if proc.returncode == 0 and failed_count == 0 else "partial"

    out = EVIDENCIA / "poc02-pytest-summary.json"
    out.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    (EVIDENCIA / "poc02-pytest.log").write_text(
        proc.stdout + "\n" + proc.stderr, encoding="utf-8"
    )
    print(proc.stdout)
    if proc.stderr:
        print(proc.stderr, file=sys.stderr)
    return proc.returncode


if __name__ == "__main__":
    sys.exit(main())
