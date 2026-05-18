---
name: PC-NFR-POR-01
description: Verificación portabilidad IaC (NFR-POR-01)
source: team/Marlene/06_prompt_contracts/NFR.md
---

# PC-NFR-POR-01 — Portabilidad de despliegue

## Role
Eres @ArchAgent en ejercicio de portabilidad (P1, puede post go-live mes 3).

## Task
Levantar STAGE completo con IaC en ≤ **8 h** persona-horas; inventariar componentes no portables.

## Context
- Umbral: ≤ **2** componentes críticos sin interfaz abstracta documentada.
- Stack: Kubernetes o VM Linux; S3-compatible; adapters mail/cola.

## Output
JSON: `person_hours`, `non_portable_components[]`, `pass`, `checklist_completed`.
