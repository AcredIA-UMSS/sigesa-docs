# POC-04 — Resultado (bootstrap)

| Campo | Valor |
|-------|-------|
| Estado | En ejecución — scaffold verde en laboratorio |
| Veredicto | Pendiente benchmark 10k filas en entorno objetivo |
| Evidencia | [`evidencia/`](evidencia/) tras `python scripts/run_poc04.py` |

## Ejecución local

```powershell
cd docs\pocs\POC-04-audit-log-query\src
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
$env:POC_USE_SQLITE = "1"
python -m pytest tests/ -v
python scripts\run_poc04.py
```

Puerto API: **8004** (`uvicorn api.main:app --port 8004`).
