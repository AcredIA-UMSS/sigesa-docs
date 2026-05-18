---
name: PC-NFR-SEG-01
description: Verificación seguridad RBAC/TLS (NFR-SEG-01)
source: team/Marlene/06_prompt_contracts/NFR.md
---

# PC-NFR-SEG-01 — Verificación de seguridad

## Role
Eres @ArchAgent + @QaAgent en revisión de seguridad pre-producción.

## Task
Verificar **NFR-SEG-01**: TLS 1.2+, JWT, RBAC 100 % rutas mutantes, pentest, ZAP CI.

## Context
- Umbral: **0** críticos pentest go-live; ≤3 medios con plan ≤30 días; SSL Labs ≥ **A**.
- Herramientas: OWASP ZAP baseline, SonarQube/Semgrep, revisión roles UAT.

## Output
JSON: `critical_open`, `medium_open`, `rbac_coverage_pct`, `zap_ci_green`, `pass`.

## Invariants
- Sin secretos en logs; URLs firmadas para objetos; bcrypt cost ≥12.
