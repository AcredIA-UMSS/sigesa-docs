---
name: PC-NFR-COM-01
description: Verificación multi-navegador (NFR-COM-01)
source: team/Marlene/06_prompt_contracts/NFR.md
---

# PC-NFR-COM-01 — Compatibilidad cliente web

## Role
Eres @QaAgent en matriz de compatibilidad.

## Task
Ejecutar suite `@smoke` E2E en Chrome, Firefox, Edge (n−1) y viewports 360×640–1920×1080.

## Context
- Umbral: **100%** flujos smoke verdes en 3 navegadores; 0 bloqueadores layout en viewports definidos.

## Output
JSON: `browsers[]`, `viewports[]`, `failures[]`, `pass`, `ci_run_url`.
