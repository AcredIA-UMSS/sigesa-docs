# Catálogo de casos de prueba — NFR y sad paths

| Campo | Valor |
|-------|-------|
| **Versión** | v1.0 |
| **Fuente** | [`NFR_ISO25010.md`](NFR_ISO25010.md) · [`../04_fsd/gherkin.md`](../04_fsd/gherkin.md) |
| **Fecha** | 2026-05-17 |

## TC de rendimiento y operaciones

| TC ID | Tipo | NFR | PRD-US | FSD-UC | Descripción | Herramienta |
|-------|------|-----|--------|--------|-------------|-------------|
| TC-NFR-001 | Carga | NFR-001 | 001, 007 | UC-007 | `GET /evidences/search` p95 < 500 ms | k6 |
| TC-NFR-002 | UAT | NFR-002 | 001, 007 | UC-007 | Cronometría 10 tareas [TD] hasta abrir Evidencia | manual |
| TC-NFR-003 | E2E | NFR-003 | 021 | UC-014 | Reporte PDF P95 ≤ 5 min | Playwright + timer |
| TC-NFR-004 | Integración | NFR-004 | 005, 018, 019 | UC-015 | SLA cola `notification_outbox` ≤ 15 min | SQL + test |
| TC-NFR-005 | Monitor | NFR-005 | — | — | Uptime mensual horario extendido | Pingdom / TI |
| TC-NFR-008 | API | NFR-008 | 001 | UC-001 | Matriz endpoint × rol 403 | Supertest |
| TC-NFR-009 | Seguridad | NFR-009 | 012 | UC-011 | [CC] carrera A no lee carrera B | Supertest |
| TC-NFR-014 | CI | NFR-014 | Must (gherkin) | — | 100 % `@Tag("PRD-US-")` en tests Must | grep CI |

## TC sad path (dominio)

| TC ID | NFR | PRD-US | FSD-UC | Escenario | Resultado esperado |
|-------|-----|--------|--------|-----------|-------------------|
| TC-SAD-DELETE | NFR-017 | 003 | UC-006 | DELETE Evidencia aprobada | 409 `EVIDENCE_IMMUTABLE` + `audit_log` |
| TC-SAD-PHASE | NFR-018 | 014 | UC-010 | Cerrar Fase con pendientes | 409 `FASE_CIERRE_BLOQUEADO` |
| TC-SAD-JUST | NFR-018 | 009 | UC-008 | Rechazo sin justificación | 422 `JUSTIFICATION_REQUIRED` |
| TC-SAD-APPROVE | NFR-018 | 023 | UC-009 | [CC] intenta aprobar | 403 `FORBIDDEN_ROLE` |
| TC-SAD-AUTH | NFR-008 | 001 | UC-001 | Request sin JWT | 401 |
| TC-SAD-MIME | NFR-010 | 002 | UC-004 | Archivo tipo no permitido | 400 + mensaje accionable |

## Mapeo a tags Gherkin del equipo

| TC ID | Tag en `gherkin.md` |
|-------|---------------------|
| TC-SAD-DELETE | `@TC-SAD-DELETE` |
| TC-SAD-PHASE | `@TC-SAD-PHASE` |
| TC-SAD-JUST | `@TC-SAD-JUST` |
| TC-SAD-APPROVE | `@TC-SAD-APPROVE` |
| TC-SAD-AUTH | `@TC-SAD-AUTH` |
| TC-SAD-MIME | `@TC-SAD-MIME` |
