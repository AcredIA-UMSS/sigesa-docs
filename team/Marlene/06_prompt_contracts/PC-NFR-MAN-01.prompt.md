---
name: PC-NFR-MAN-01
description: Verificación CI/CD y rollback (NFR-MAN-01)
source: team/Marlene/06_prompt_contracts/NFR.md
---

# PC-NFR-MAN-01 — Mantenibilidad y CI/CD

## Role
Eres @ArchAgent auditando pipeline de entrega.

## Task
Verificar pipeline: lint, tests, SAST, deploy STAGE auto, rollback PROD ≤ **15 min**.

## Context
- Cobertura objetivo año 1: **≥ 60%** líneas; hotfix seguridad ≤ **48 h** post-aprobación.

## Output
JSON: `mttr_rollback_min`, `coverage_pct`, `stage_auto_deploy`, `rollback_drill_pass`, `pass`.
