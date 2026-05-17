---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-014
domain: fsd-uc-acredia
---

## PC-014 — Bandeja técnico operativo DUEA (agrupa FSD-UC-EXT-002 — GAP-002a)

> **Estado**: borrador v0.1 — completar antes de implementación.

```markdown
# Role
Agente IA de contratos para bandejas de trabajo y RBAC acotado (técnico operativo).

# Task
Especificar FSD-UC-EXT-002: bandeja de evidencias pendientes y acciones documentales
permitidas al técnico operativo (PRD-US-018).

# Context
- Extiende UC-003 (evidencias) con vista filtrada por permisos rol Técnico Operativo
- BR-006, BR-012; NFR-003, NFR-004

# Stop condition
Output completo con ≥ 4 invariants y ≥ 4 failure modes + Gherkin PRD §5.7.1.
```

---

## Tabla de trazabilidad consolidada

| PC | FSD-UC canónico | Nombre | PRD-US | BRD-BR | NFR | Elementos completos |
|----|-----------------|--------|--------|--------|-----|---------------------|
| PC-001 | FSD-UC-001 | Autenticación y autorización por roles | PRD-US-001, PRD-US-003 | BR-004, BR-005, BR-011 | NFR-003, NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-002 | FSD-UC-002 | Creación y gestión de procesos | PRD-US-008, PRD-US-009 | BR-001, BR-002, BR-003, BR-012 | NFR-004, NFR-005 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-003 | FSD-UC-002 | Gestión de fases y cierre con pendientes | PRD-US-004, PRD-US-006 | BR-008, BR-009, BR-010 | NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-004 | FSD-UC-003 | Carga y versionado de evidencias | PRD-US-010, PRD-US-011 | BR-006, BR-007, BR-012 | NFR-001, NFR-003, NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-005 | FSD-UC-003 | Protección ante borrado destructivo | PRD-US-012 | BR-007, BR-011 | NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-006 | FSD-UC-004 | Flujo de observaciones DUEA ↔ carrera | PRD-US-013, PRD-US-014 | BR-008, BR-010, BR-011 | NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-007 | FSD-UC-005 | Panel semáforo por carrera/facultad | PRD-US-015 | BR-008 | NFR-001 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-008 | FSD-UC-006 | Alertas automáticas por plazos | PRD-US-016 | BR-009, BR-011 | NFR-005 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-009 | FSD-UC-007 | Reporte ejecutivo PDF ≤ 2 clics | PRD-US-017 | BR-008 | NFR-001, NFR-002, NFR-006 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-010 | FSD-UC-002 | Importación masiva de actividades | PRD-US-007 | BR-002, BR-012 | NFR-004, NFR-007 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-011 | FSD-UC-001 | Gestión de usuarios y asignación de roles | PRD-US-002 | BR-004, BR-005 | NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-012 | FSD-UC-EXT-004 | Acceso de evaluador externo con alcance mínimo | PRD-US-020 | BR-004, BR-005, BR-011 | NFR-003, NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-013 | FSD-UC-EXT-001 | Vista pública estado acreditación (borrador) | PRD-US-021 | PRD-REQ-012 | NFR-003, NFR-008 | Borrador GAP-001 |
| PC-014 | FSD-UC-EXT-002 | Bandeja técnico operativo (borrador) | PRD-US-018 | BR-006, BR-012 | NFR-004, NFR-007 | Borrador GAP-002a |

---

## Criterio de evaluación alcanzado

| Nivel | Criterio | ¿Cumplido? |
|-------|----------|------------|
| **EXCELENTE** | ≥ 10 contratos completos | ✅ 12 contratos (PC-001 a PC-012) — cobertura total de los 12 UCs |
| **EXCELENTE** | Los 6 elementos en cada contrato | ✅ Role · Task · Context · Reasoning · Stop condition · Output |
| **EXCELENTE** | Invariants verificables (mínimo 4 por contrato) | ✅ 48 invariants totales |
| **EXCELENTE** | Failure modes con código, condición y mensaje (mínimo 4 por contrato) | ✅ 57 failure modes totales |
| **EXCELENTE** | Gherkin verificable (Dado/Cuando/Entonces), 3 escenarios por contrato | ✅ 36 escenarios totales |
| **EXCELENTE** | Trazabilidad PC → FSD-UC → PRD-US → BRD-BR → NFR | ✅ Tabla consolidada con nombre por fila |
| **EXTRA** | 12 CU en `casos-de-uso.md` agrupados en 7 FSD-UC canónicos + 12 PC | ✅ Tabla consolidada alineada a DTI §2 |

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 12/05/2026 | AcredIA / @ArchAgent | Creación inicial — 10 prompt-contratos con 6 elementos + invariants + failure modes |
| v1.1 | 14/05/2026 | AcredIA / @ArchAgent | Corrección de numeración UC-010/UC-011; adición de PC-010 (Importación masiva), PC-011 (Gestión usuarios), PC-012 (Evaluador externo) para cobertura 1:1 con casos-de-uso.md |
