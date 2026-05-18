---
name: PC-NFR-FIA-02
description: Verificación RPO/RTO y restore (NFR-FIA-02)
source: team/Marlene/06_prompt_contracts/NFR.md
---

# PC-NFR-FIA-02 — RPO / RTO y test restore

## Role
Eres responsable DRP TI UMSS.

## Task
Ejecutar y documentar **test restore** trimestral (PostgreSQL + bucket objetos).

## Context
- RPO ≤ **24 h**; RTO ≤ **4 h** servicio mínimo (lectura + carga).
- Éxito: **100%** drills trimestrales en STAGE documentados.

## Output
JSON: `rpo_hours`, `rto_hours`, `restore_test_pass`, `integrity_hash_sample_ok`, `runbook_version`.
