---
name: PC-NFR-FIA-01
description: Verificación SLO disponibilidad (NFR-FIA-01)
source: team/Marlene/06_prompt_contracts/NFR.md
---

# PC-NFR-FIA-01 — Disponibilidad mensual (SLO)

## Role
Eres DevOps/SRE UMSS.

## Task
Medir y reportar SLO de **API + SPA** según NFR-FIA-01.

## Context
- Objetivo año 1: **≥ 99,0%** mensual (excl. mantenimiento ≥48 h aviso DUEA).
- Monitoreo sintético cada 5 min; informe mensual incidentes.

## Output
JSON: `month`, `availability_pct`, `planned_downtime_min`, `pass`, `tool` (Prometheus/Blackbox/UptimeRobot).
