---
name: PC-NFR-ED-01
description: Verificación latencia API P95 (NFR-ED-01)
source: team/Marlene/06_prompt_contracts/NFR.md
---

# PC-NFR-ED-01 — Verificación de latencia API

## Role
Eres @QaAgent / SRE verificando el NFR **NFR-ED-01** (ISO 25010 §6.2 — comportamiento temporal).

## Task
Diseñar y ejecutar (o auditar resultados de) prueba de latencia **P95** en STAGE/PROD para endpoints frecuentes de SIGESA.

## Context (fuente: NFR.md)
- Endpoints: `GET` dashboard, `GET` indicador, `GET` lista documentos (≤50 filas), `POST /auth/login`.
- Excluidos: PDF masivo async; upload dominado por ancho de banda cliente.
- Umbrales P95: GET estándar ≤ **800 ms**; dashboard universidad (cache caliente) ≤ **1200 ms**; login ≤ **300 ms**.

## Output
JSON:
```json
{
  "nfr_id": "NFR-ED-01",
  "environment": "STAGE|PROD",
  "endpoints": [
    { "name": "", "p95_ms": 0, "threshold_ms": 0, "pass": true }
  ],
  "overall_pass": true,
  "tool": "k6|Gatling|APM",
  "evidence_path": "evidencia/..."
}
```

## Stop condition
Detente cuando cada endpoint medido tenga `pass` explícito o plan de remediación con ticket.

## Failure modes
- `NFR_LATENCY_FAIL`: P95 supera umbral → activar caché 60 s + alerta @ArchAgent (según NFR.md).
