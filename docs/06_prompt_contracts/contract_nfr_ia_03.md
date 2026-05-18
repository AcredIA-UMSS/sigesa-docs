---
name: PC-NFR-IA-03
description: Latencia orquestador LLM P95 (NFR-IA-03)
source: team/Marlene/06_prompt_contracts/NFR_IA.md
---

# PC-NFR-IA-03 — Latencia LLM P95

## Task
Medir E2E orquestador en STAGE: P95 ≤ **12 s** (≤4k tokens) o ≤ **45 s** (resumen 30k chunked).

## Output
JSON: `scenario`, `p95_ms`, `threshold_ms`, `pass`.
