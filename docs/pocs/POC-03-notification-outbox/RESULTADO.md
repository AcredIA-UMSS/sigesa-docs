# POC-03 — Resultado (bootstrap)

| Campo | Valor |
|-------|-------|
| Estado | En ejecución — scaffold verde en laboratorio |
| Veredicto | Pendiente medición SMART completa (n≥50 escenarios) |
| Evidencia | [`evidencia/`](evidencia/) tras `python scripts/run_poc03.py` |

## Ejecución local

```powershell
cd docs\pocs\POC-03-notification-outbox\src
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
$env:POC_USE_SQLITE = "1"
python -m pytest tests/ -v
python scripts\run_poc03.py
```

Puerto API: **8003** (`uvicorn api.main:app --port 8003`).
