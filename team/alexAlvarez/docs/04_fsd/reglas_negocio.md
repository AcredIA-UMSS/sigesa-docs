# Reglas de negocio — SIGESA / AcredIA

| Campo | Valor |
|-------|-------|
| **Ámbito** | `team/alexAlvarez/docs/04_fsd/` |
| **Versión** | v1.0 |
| **Fuentes** | [`../01_brd/BRD.md`](../01_brd/BRD.md) · [`../00_overview/alcance_proyecto.md`](../00_overview/alcance_proyecto.md) |
| **Casos de uso** | [`casos_uso.md`](casos_uso.md) |

> Catálogo **FSD-BR-01…18**. En conflicto con implementación no documentada, prevalecen BRD y este catálogo.

---

## Índice por tipo

| Tipo | IDs |
|------|-----|
| Validación | BR-01, BR-05, BR-07 |
| Política / trazabilidad | BR-02, BR-03, BR-06, BR-15 |
| Autorización | BR-04, BR-09, BR-12 |
| Estado / fase | BR-07, BR-08 |
| SLA / plazos | BR-13 |
| Alcance / público | BR-14, BR-16 |

---

## Catálogo

### FSD-BR-01 — Evidencia ligada a Indicador

| Campo | Valor |
|-------|-------|
| **Enunciado** | Ninguna **Evidencia** se persiste sin `indicator_id` válido en la taxonomía activa del **Proceso**. |
| **Violación** | `400 EVIDENCE_UNCLASSIFIED` |
| **UC** | UC-004, UC-006 |
| **PRD** | PRD-US-002 |

---

### FSD-BR-02 — Append-only

| Campo | Valor |
|-------|-------|
| **Enunciado** | Prohibido `DELETE` físico de `evidence_version` normativa. Corrección = nueva fila con `supersedes_id`. |
| **Violación** | `409 EVIDENCE_IMMUTABLE` |
| **UC** | UC-005, UC-006 |
| **BRD** | BRD-CST-01 |

---

### FSD-BR-03 — Solo [CC] carga

| Campo | Valor |
|-------|-------|
| **Enunciado** | [TD] y [JD] no sustituyen la carga operativa del [CC] salvo delegación formal auditada. |
| **Violación** | `403 FORBIDDEN_ROLE` |
| **UC** | UC-004 |

---

### FSD-BR-04 — Solo [TD] observa y aprueba

| Campo | Valor |
|-------|-------|
| **Enunciado** | Transiciones a `OBSERVADO` y `APROBADO` exclusivas de [TD]. |
| **Violación** | `403 FORBIDDEN_ROLE` |
| **UC** | UC-008, UC-009 |

---

### FSD-BR-05 — Justificación obligatoria

| Campo | Valor |
|-------|-------|
| **Enunciado** | Toda **Observación** requiere `justification` ≥ 20 caracteres. |
| **Violación** | `422 JUSTIFICATION_REQUIRED` |
| **UC** | UC-008 |
| **PRD** | PRD-US-009 |

---

### FSD-BR-06 — Subsanación enlazada

| Campo | Valor |
|-------|-------|
| **Enunciado** | `evidence_version` de subsanación debe incluir `observation_id` no nulo. |
| **Violación** | `422 OBSERVATION_LINK_REQUIRED` |
| **UC** | UC-006 |
| **PRD** | PRD-US-003 |

---

### FSD-BR-07 — Cierre de fase agregado

| Campo | Valor |
|-------|-------|
| **Enunciado** | Una **Fase** solo pasa a `COMPLETADA` si todos sus **Indicadores** están `APROBADO`. |
| **Violación** | `409 FASE_CIERRE_BLOQUEADO` |
| **UC** | UC-010 |
| **Diagrama** | [`UC03_estado.mmd`](../07_diagramas/UC03_estado.mmd) |

---

### FSD-BR-08 — Un proceso activo por carrera

| Campo | Valor |
|-------|-------|
| **Enunciado** | Máximo un `accreditation_process` en `EN_PROCESO` por carrera + modalidad + periodo. |
| **Violación** | `409 PROCESS_ALREADY_ACTIVE` |
| **UC** | UC-003 |

---

### FSD-BR-09 — Aislamiento [CC]

| Campo | Valor |
|-------|-------|
| **Enunciado** | [CC] solo lee/escribe datos de su `academic_program` asignado. |
| **Violación** | `403 SCOPE_VIOLATION` |
| **UC** | Todos los endpoints [CC] |

---

### FSD-BR-10 — Fase 2 sin carga libre

| Campo | Valor |
|-------|-------|
| **Enunciado** | En Evaluación Interna no se admite carga inicial masiva; solo subsanación con observación abierta. |
| **UC** | UC-006 |

---

### FSD-BR-11 — Plazos no editables por [CC]

| Campo | Valor |
|-------|-------|
| **Enunciado** | Fechas fatales del cronograma institucional solo modificables por [JD] vía acta registrada. |
| **BRD** | BRD-CST-02 |

---

### FSD-BR-12 — Autenticación institucional

| Campo | Valor |
|-------|-------|
| **Enunciado** | Login solo con correo `@umss.edu.bo` (o dominio acordado UMSS). |
| **UC** | UC-001 |

---

### FSD-BR-13 — SLA notificaciones

| Campo | Valor |
|-------|-------|
| **Enunciado** | Notificación a [CC] por observación o aprobación en ≤ 15 min (p95). |
| **UC** | UC-015 |
| **PRD** | PRD-REQ-007 |

---

### FSD-BR-14 — Portal [P] acotado

| Campo | Valor |
|-------|-------|
| **Enunciado** | [P] solo consume `publication_snapshot`; sin API de evidencia interna. |
| **UC** | UC-016 |

---

### FSD-BR-15 — Auditoría inmutable

| Campo | Valor |
|-------|-------|
| **Enunciado** | `audit_log` y `state_transition` son insert-only. |
| **UC** | UC-017 |
| **PRD** | PRD-US-026 |

---

### FSD-BR-16 — No-ERP

| Campo | Valor |
|-------|-------|
| **Enunciado** | SIGESA no gestiona matrícula, nómina ni finanzas. |
| **BRD** | BRD-SCP-OUT-01 |

---

### FSD-BR-17 — Modalidad CEUB antes ARCU-SUR (política)

| Campo | Valor |
|-------|-------|
| **Enunciado** | Nueva carrera en ARCU-SUR requiere CEUB vigente según política DUEA (validación en UC-003). |
| **UC** | UC-003 |

---

### FSD-BR-18 — Lenguaje de estados

| Campo | Valor |
|-------|-------|
| **Enunciado** | Estados persistidos del indicador: `PENDIENTE`, `SUBIDO`, `OBSERVADO`, `SUBSANADO`, `APROBADO` — sin sinónimos en API. |
| **Fuente** | `context/04_state_machine.md` |

---

## Matriz regla → UC

| Regla | UC-001 | UC-004 | UC-006 | UC-008 | UC-009 | UC-010 | UC-016 |
|-------|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
| BR-02 | | ✓ | ✓ | | | | |
| BR-06 | | | ✓ | | | | |
| BR-07 | | | | | ✓ | ✓ | |
| BR-14 | | | | | | | ✓ |
