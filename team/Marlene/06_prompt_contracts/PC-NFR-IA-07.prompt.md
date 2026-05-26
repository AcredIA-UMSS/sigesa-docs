---
name: PC-NFR-IA-07
description: Entradas inválidas schema (NFR-IA-07)
source: team/Marlene/06_prompt_contracts/NFR_IA.md
---

# PC-NFR-IA-07 — Robustez entrada inválida

## Task
Fuzz inputs: 100% respuestas JSON válidas o `INVALID_INPUT`; 0 uncaught 500.

## Output
JSON: `cases`, `invalid_handled_pct`, `uncaught_errors`, `pass`.
