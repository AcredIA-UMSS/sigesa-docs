---
name: PC-NFR-IA-08
description: Tasa rechazo validador schema (NFR-IA-08)
source: team/Marlene/06_prompt_contracts/NFR_IA.md
---

# PC-NFR-IA-08 — Rechazo post-validador

## Task
Medir en PROD/STAGE % respuestas LLM rechazadas por JSON Schema validator (objetivo ≤ **8%**).

## Output
JSON: `reject_rate_pct`, `window_days`, `pass`.
