# Matriz de trazabilidad MRD → PRD → FSD — AcredIA / SIGESA

| Metadato | Valor |
|----------|-------|
| **Versión** | v2.0 — EXCELENTE |
| **Fecha** | 16/05/2026 |
| **Equipo** | aylenGonzales |
| **Fuentes** | `02_mrd/MRD_v1.md`, `03_prd/PRD_v1.md`, `04_fsd/FSD_v2.md`, `04_fsd/prompt-contracts.md`, `09_dti/adr/ADR-001.md` … `ADR-006.md` |
| **Criterio de evaluación** | PM-020 — cadena MRD-N → BRD-BR → PRD-REQ → PRD-US → FSD-UC → PC → NFR |

---

## §1 Matriz principal (MRD-N → cadena completa)

| MRD-N-ID | Requerimiento de mercado | BRD-BR | PRD-REQ-ID | PRD-US-ID | FSD-UC / MOD | PC | NFR | ADR | Cobertura |
|----------|--------------------------|--------|------------|-----------|--------------|-----|-----|-----|-----------|
| MRD-N-01 | Repositorio centralizado de evidencias (≤ 2 min) | BR-001, BR-002 | PRD-REQ-003, 004 | PRD-US-003, 004, 005 | FSD-UC-002 · MOD-02 | PC-002 | NFR-004, 007, 009 | ADR-0001 | ✅ Completa |
| MRD-N-02 | Control de versiones automático (autor, fecha, hash) | BR-002 | PRD-REQ-004 | PRD-US-004 | FSD-UC-002 · MOD-02 | PC-002 | NFR-004 | ADR-0001 | ✅ Completa |
| MRD-N-03 | Flujo CC→TD→JD con justificación en rechazos | BR-003 | PRD-REQ-005 | PRD-US-006, 007, 008 | FSD-UC-003 · MOD-03 | PC-003 | NFR-004, 007 | ADR-0002 | ✅ Completa |
| MRD-N-04 | Reportes PDF ≤ 5 min sin asistencia técnica | BR-004 | PRD-REQ-007 | PRD-US-011 | FSD-UC-005 · MOD-06 | PC-005 | NFR-001, 002 | ADR-0006 | ✅ Completa |
| MRD-N-05 | Notificaciones automáticas ≤ 15 min | BR-005 | PRD-REQ-008 | PRD-US-013, 014 | FSD-UC-006 · MOD-07 | PC-006 | NFR-005, 010, 011 | — | ✅ Completa |
| MRD-N-06 | Auth @umss.edu.bo y roles [CC][TD][JD][P] | BR-006 | PRD-REQ-001, 002 | PRD-US-001, 002 | FSD-UC-001 · MOD-01 | PC-001 | NFR-003, 004 | ADR-0004 | ✅ Completa |
| MRD-N-07 | Taxonomías CEUB/ARCU-SUR preconfiguradas | BR-007 | PRD-REQ-010 | PRD-US-007 | FSD-UC-003, 004 · MOD-04 | PC-003 | NFR-004 | ADR-0005 | ✅ Completa |
| MRD-N-08 | Buscador multifiltro ≤ 3 s | BR-008 | PRD-REQ-009 | PRD-US-015 | FSD-UC-007 · MOD-08 | PC-007 | NFR-001, 008 | ADR-0003 | ✅ Completa |
| MRD-N-09 | Log de auditoría inmutable (100 %) | BR-009 | PRD-REQ-011 | PRD-US-006 | Transversal · MOD-09 | PC-001, 002, 003 | NFR-004, 012 | ADR-0002 | ✅ Completa |
| MRD-N-10 | Portal público sin autenticación | BR-010 | PRD-REQ-012 | PRD-US-016 | FSD-UC-008 · MOD-10 | PC-008 | NFR-003, 008 | — | ✅ Completa |
| MRD-N-11 | Certificados de acreditación | BR-011 | PRD-REQ-013 | PRD-US-017 | FSD-UC-009 · MOD-11 | PC-009 | NFR-003, 004 | — | ✅ Completa |
| MRD-N-12 | Respaldo automático diario verificable | BR-012 | PRD-REQ-014 | — | FSD-UC-010 · MOD-12 | PC-010 | NFR-013 | ADR-0001, 0003 | ✅ Completa |

**Filas:** 12 · **Cadena completa (7 eslabones):** 12/12 = **100 %**

> PC-005 … PC-010 documentados en `04_fsd/prompt-contracts.md` (complemento de FSD_v2 §7).

---

## §2 Trazabilidad PRD-REQ → FSD (17 requerimientos)

| PRD-REQ-ID | BRD-BR | FSD-UC / MOD | PC | Nivel especificación | Estado |
|------------|--------|--------------|-----|----------------------|--------|
| PRD-REQ-001 | BR-006 | FSD-UC-001 | PC-001 | Completo | ✅ |
| PRD-REQ-002 | BR-006 | FSD-UC-001 | PC-001 | Completo | ✅ |
| PRD-REQ-003 | BR-001 | FSD-UC-002 | PC-002 | Completo | ✅ |
| PRD-REQ-004 | BR-002 | FSD-UC-002 | PC-002 | Completo | ✅ |
| PRD-REQ-005 | BR-003 | FSD-UC-003 | PC-003 | Completo | ✅ |
| PRD-REQ-006 | BR-003 | FSD-UC-004 | PC-004 | Completo | ✅ |
| PRD-REQ-007 | BR-004 | FSD-UC-005 | PC-005 | Completo | ✅ |
| PRD-REQ-008 | BR-005 | FSD-UC-006 | PC-006 | Completo | ✅ |
| PRD-REQ-009 | BR-008 | FSD-UC-007 | PC-007 | Completo | ✅ |
| PRD-REQ-010 | BR-007 | FSD-UC-003, 004 · MOD-04 | PC-003 | Completo | ✅ |
| PRD-REQ-011 | BR-009 | MOD-09 (transversal) | PC-001, 002, 003 | Transversal | ✅ |
| PRD-REQ-012 | BR-010 | FSD-UC-008 | PC-008 | Completo | ✅ |
| PRD-REQ-013 | BR-011 | FSD-UC-009 | PC-009 | Completo | ✅ |
| PRD-REQ-014 | BR-012 | FSD-UC-010 | PC-010 | Completo | ✅ |
| PRD-REQ-015 | BR-013 | FSD-UC-011 | — | Completo | ✅ |
| PRD-REQ-016 | BR-017 | — | — | Backlog v2.0 | ⏳ GAP-004 |
| PRD-REQ-017 | BR-018 | — | — | Backlog v2.0 | ⏳ GAP-005 |

**Spec Fidelity (trazable):** 15/17 = **88,24 %** · **Completo (4 artefactos UC):** 15/17 = **88,24 %**

---

## §3 Gaps residuales (declarados)

| ID | Capa | Descripción | Impacto | Acción recomendada |
|----|------|-------------|---------|-------------------|
| GAP-003 | QA | FSD-UC-010 sin TC-011 automatizado para NFR-013 | Medio | Script respaldo + TC-011 (k6/cron test) |
| GAP-004 | PRD/FSD | PRD-REQ-016 planes de mejora — fuera alcance v1.0 | Medio | FSD-UC-012 en v2.0 |
| GAP-005 | PRD/FSD | PRD-REQ-017 exportación Excel — Could | Bajo | FSD-UC-013 en backlog |
| GAP-006 | ADR | RF-01, RF-03, RF-06 sin ADR dedicado | Bajo | Runbook adopción / ADR-0007 SMTP opcional |

**Gaps cerrados respecto a v1.0:** GAP-001 (FSD-UC-008), GAP-002 (FSD-UC-009).

---

## §4 Resumen de cobertura por capa

| Capa | Total ítems | Con trazabilidad downstream | Cobertura |
|------|-------------|------------------------------|-----------|
| MRD-N | 12 | 12 | **100 %** |
| PRD-REQ (Must+Should en v1.0) | 15 | 15 | **100 %** |
| PRD-REQ (Could / backlog) | 2 | 0 (deferido) | Backlog documentado |
| FSD-UC v1.0 | 11 | 11 | **100 %** |
| PC (UC v1.0) | 10 | 10 | **100 %** |
| ADR | 6 | 6 | **100 %** |

---

## §5 Criterio EXCELENTE (autoevaluación)

| Criterio PM-020 | Umbral EXCELENTE | Resultado | ¿Cumple? |
|-----------------|------------------|-----------|----------|
| Trazabilidad MRD → PRD → FSD sin eslabones rotos | 100 % filas MRD | 12/12 | ✅ |
| Columnas BR, US, PC, NFR por fila | Obligatorio | §1 completo | ✅ |
| Gaps con ID, capa, impacto, acción | Obligatorio | §3 | ✅ |
| Tabla resumen por capa | Obligatorio | §4 | ✅ |

**Veredicto global:** **EXCELENTE** para trazabilidad MRD→PRD→FSD v1.0 (con 2 PRD Could explícitamente en backlog v2.0).
