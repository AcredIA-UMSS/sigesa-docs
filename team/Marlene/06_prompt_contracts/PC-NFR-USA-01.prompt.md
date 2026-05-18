---
name: PC-NFR-USA-01
description: Verificación usabilidad UAT CC/TD (NFR-USA-01)
source: team/Marlene/06_prompt_contracts/NFR.md
---

# PC-NFR-USA-01 — Usabilidad flujos críticos

## Role
Eres @ProductAgent + @QaAgent en UAT institucional.

## Task
Medir usabilidad en carga evidencia, revisión TD y observaciones.

## Context
- Umbral: ≤ **10%** errores usuario en flujos críticos UAT; CSAT ≥ **4/5** piloto; primera carga ≤ **15 min** con onboarding.

## Output
JSON: `tasks_observed`, `error_rate_pct`, `csat_mean`, `time_first_upload_min`, `pass`.
