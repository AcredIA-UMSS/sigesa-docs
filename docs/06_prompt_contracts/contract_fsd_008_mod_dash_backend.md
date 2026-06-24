---
name: PC-MOD-DASH-01
description: Diseño e implementación backend MOD-DASH/MOD-REPORT (FSD-UC-011–014)
source: app/sigesa-backend/.cursor/prompts/reporting_dashboard.prompt.md
author: alexAlvarez
date: 2026-06-23
---

# PC-MOD-DASH-01 — Paneles operativos y reporting backend (FSD-UC-011–014)

Contrato de prompt para generar o actualizar el diseño técnico e implementación Java del módulo Dashboard/Reporting en `sigesa-backend`, con trazabilidad completa hacia FSD, ADR y AcredIA Design System.

## Trazabilidad

| Artefacto | Referencia |
|-----------|------------|
| PRD | PRD-REQ-011, PRD-REQ-012, PRD-REQ-014 |
| PRD-US | US-012, US-013, US-014, US-015, US-021 |
| FSD-UC | UC-011 (Dashboard [CC]), UC-012 (Bandeja [TD]), UC-013 (Semáforo [JD]), UC-014 (PDF ejecutivo) |
| Módulos | MOD-DASH, MOD-REPORT |
| ADR | ADR-0015 (sync/async), ADR-0007 (JWT/RBAC), ADR-0013 (S3 blobs) |
| Diseño técnico | `app/sigesa-backend/design_docs/design_dashboard.md` |
| UI (AcredIA DS) | `figma/annotations/prototipo/jd-admin-dashboard.annotations.md` |
| Diagramas | `docs/07_diagramas/seq-004-004-dashboard-semaforos.mmd`, `seq-004-004-dashboard-drilldown.mmd` |
| Tests | Cobertura ≥ 90 % JaCoCo en capa servicio (`agents.md`) |

```markdown
# Role
Eres un Senior Backend Architect SIGESA (Java 21 · Spring Boot · Spring Data JPA · PostgreSQL/H2).
Especialista en dashboards RBAC, agregaciones KPI, exportación async y trazabilidad documental UMSS.

# Task
Generar o actualizar el documento de diseño técnico y/o implementación del módulo Reporting/Dashboard
que cubra FSD-UC-011 a UC-014, siguiendo la plantilla de 14 secciones de design_phases.md y
base_design_system.md.

# Context
- Actores: [CC] dashboard carrera, [TD] bandeja auditoría, [JD] panel semáforo + reporte PDF.
- APIs canónicas (docs/04_fsd/api_contracts.md):
  - GET /dashboard/coordinator (API-DASH-01)
  - GET /dashboard/technician (API-DASH-02)
  - GET /dashboard/executive (API-DASH-03, fuera MVP front)
  - POST /reports/executive/pdf (API-REP-01)
- MVP runtime: docs/05_dti/api_contracts_mvp_runtime.md §4 (solo coordinator + technician).
- Implementación actual (sigesa-backend): GET /dashboard/kpis, GET /dashboard/data — documentar drift y plan de alineación.
- Reglas: FSD-BR-09 (aislamiento carrera), FSD-BR-14 (reporte solo [JD]).
- NFR: NFR-001 p95 < 3s dashboard; NFR-003 PDF P95 ≤ 5 min.
- Decisión arquitectónica: ADR-0015 — sync reads + async exports + Caffeine cache + S3 pre-signed URLs.
- UI: AcredIA Design System — tokens en figma/tokens/css-variables.css; frame JD en figma/frames/prototipo/jd-admin-dashboard.md.

# Reasoning
Pasos obligatorios (orden):
1. Verificar trazabilidad PRD → FSD-UC → API → diseño (matriz_trazabilidad.md).
2. Si design_dashboard.md existe: sección merge/diff; no sobrescribir sin confirmación.
3. Modelar dominio: ReportDefinition, ReportRun, FilterPayload, ReportMetric.
4. Definir DDL Postgres + índices; mapeo JPA con hibernate-types JSONB.
5. Especificar SecurityInjector (RBAC) antes de consultas.
6. Separar DashboardService (sync) de ReportService (async Virtual Threads).
7. Tabla API REST con curl/JSON; errores 403/422/202.
8. Plan de pruebas: unit ≥90%, @WebMvcTest, @DataJpaTest, Sad Paths RBAC.
9. Referenciar ADR-0015 y diagramas de secuencia existentes.
10. Registrar ejecución en PROMPT_MAPPING.md y team/alexAlvarez/log_interno.md.

# Stop condition
Detente cuando el output incluya:
- 14 secciones completas del diseño técnico.
- Tabla de trazabilidad FSD-UC ↔ endpoint ↔ actor ↔ test case (TC-09a/b/c, TC-11).
- Plan JaCoCo ≥ 90 % en DashboardServiceImpl.
- Referencias cruzadas a ADR-0015, api_contracts.md y AcredIA DS.
- QA checklist del prompt contract marcada.

# Output
Formato: Markdown (diseño) + opcional Java stubs.
Archivos destino:
- app/sigesa-backend/design_docs/design_dashboard.md (canónico)
- app/sigesa-backend/design_docs/sprint1/design_dashboard.md (copia sprint)
- app/sigesa-backend/.cursor/prompts/reporting_dashboard.prompt.md (contrato local)

JSON de validación (opcional post-generación):
{
  "status": "ok",
  "data": {
    "fsd_ucs_covered": ["FSD-UC-011", "FSD-UC-012", "FSD-UC-013", "FSD-UC-014"],
    "endpoints": [
      {"id": "API-DASH-01", "method": "GET", "path": "/dashboard/coordinator", "roles": ["CC"]},
      {"id": "API-DASH-02", "method": "GET", "path": "/dashboard/technician", "roles": ["TD"]},
      {"id": "API-DASH-03", "method": "GET", "path": "/dashboard/executive", "roles": ["JD"], "mvp": false},
      {"id": "API-REP-01", "method": "POST", "path": "/reports/executive/pdf", "roles": ["JD"]}
    ],
    "invariants": [
      "SecurityInjector muta FilterPayload antes de toda consulta.",
      "Lecturas dashboard no crean ReportRun.",
      "Export async responde 202 y persiste historial en report_run.",
      "DTOs en controllers; nunca entidades JPA expuestas.",
      "Evidence aprobada no se elimina físicamente (ADR-0001)."
    ],
    "failure_modes": [
      {"code": "DASH_SCOPE_VIOLATION", "condition": "[CC] solicita carrera ajena", "http": 403},
      {"code": "DASH_INVALID_FILTER", "condition": "careerId no existe en catálogo", "http": 422},
      {"code": "DASH_TIMEOUT", "condition": "p95 > 3000ms", "http": 504},
      {"code": "RPT_EXPORT_FAILED", "condition": "Worker Excel falla tras 3 reintentos", "http": 500}
    ],
    "test_cases": ["TC-09a", "TC-09b", "TC-09c", "TC-09", "TC-11"],
    "coverage_target": {"DashboardServiceImpl": 0.90, "ReportServiceImpl": 0.90}
  }
}
```

## QA Checklist

- [ ] 14 secciones alineadas a `design_phases.md`
- [ ] Trazabilidad PRD/FSD/API explícita
- [ ] ADR-0015 referenciado
- [ ] RBAC por endpoint documentado
- [ ] Plan pruebas ≥ 90 % JaCoCo
- [ ] AcredIA DS citado para contrato UI
- [ ] Entrada PROMPT_MAPPING creada
