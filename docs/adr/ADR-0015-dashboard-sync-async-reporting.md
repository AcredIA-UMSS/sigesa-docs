# ADR-0015: Dashboards síncronos y exportación asíncrona (MOD-DASH / MOD-REPORT)

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-06-23 |
| Autor | alexAlvarez (equipo SIGESA) |
| Alcance | MOD-DASH · MOD-REPORT · `com.umss.sigesa.reports` |
| Relacionado | [ADR-0007](ADR-0007-jwt-rbac-authentication.md) · [ADR-0013](ADR-0013-s3-evidence-blob-storage.md) · FSD-UC-011–014 |

## Contexto

SIGESA expone paneles operativos para tres actores normativos:

| Actor | UC | Ruta UI | API canónica |
|-------|-----|---------|--------------|
| [CC] | FSD-UC-011 | `/coordinator/dashboard` | `GET /dashboard/coordinator` |
| [TD] | FSD-UC-012 | `/technician/inbox` | `GET /dashboard/technician` |
| [JD] | FSD-UC-013 | `/executive/semaphore` | `GET /dashboard/executive` |

Además, [JD] genera reportes ejecutivos (FSD-UC-014) vía `POST /reports/executive/pdf` con SLA P95 ≤ 5 min (NFR-003).

Los dashboards requieren respuestas de baja latencia (NFR-001: p95 < 3 000 ms) para KPIs y tablas paginadas. Las exportaciones Excel/PDF pueden procesar miles de filas y no deben bloquear el hilo HTTP ni agotar memoria del servicio.

Restricciones de dominio:

- FSD-BR-09: [CC] solo ve datos de su carrera.
- FSD-BR-14: reportes ejecutivos solo con autorización [JD].
- ADR-0001: Evidence append-only; los reportes son lecturas sobre snapshots, nunca mutaciones destructivas.

## Decisión

Se adopta una **arquitectura híbrida sync/async** en el módulo `reports`:

### 1. Lecturas síncronas (dashboard)

- Endpoints de dashboard responden en el hilo HTTP sin crear `ReportRun`.
- KPIs cacheados en memoria (Caffeine, TTL ≤ 5 min) alineado a PC-007 semáforo.
- `SecurityInjector` muta `FilterPayload` antes de cualquier consulta según claims JWT/RBAC (ADR-0007).
- Rutas canónicas FSD: `/api/v1/dashboard/coordinator`, `/technician`, `/executive`.
- En MVP Java local, endpoints genéricos `/dashboard/kpis` y `/dashboard/data` actúan como capa de agregación hasta alinear contratos por rol.

### 2. Exportaciones asíncronas (reportes)

- `POST /api/v1/reports/{id}/export` crea `ReportRun` con estado `PROCESSING` y responde **202** + `runId`.
- Worker en Virtual Threads genera `.xlsx` por streaming (EasyExcel o POI SXSSF).
- Archivo subido a S3/MinIO (ADR-0013); `download_url` es pre-firmada con TTL corto.
- PDF ejecutivo (FSD-UC-014) sigue el mismo patrón de job async documentado en `contract_fsd_005_reporte_pdf.md`.

### 3. Persistencia de metadatos

- `report_definition`: catálogo versionado de reportes reutilizables (JSONB `filters_allowed`, `metrics`).
- `report_run`: historial append-only de ejecuciones con `params`, `result_metadata` y `download_url`.

### 4. Separación de paquetes

```
com.umss.sigesa.reports
├── service.DashboardService      (sync)
├── service.ReportService         (async)
└── config.SecurityInjector       (RBAC cross-cutting)
```

## Consecuencias

### Positivas

- UI responsiva: KPIs no compiten con exportaciones pesadas.
- Auditoría: cada export queda registrada en `report_run` con actor y filtros efectivos.
- Reutilización de S3/MinIO ya adoptado para Evidence (ADR-0013).
- Cobertura de pruebas ≥ 90 % en capa servicio (regla `agents.md` / JaCoCo).

### Negativas

- Dos superficies de API (sync dashboard vs async reports) aumentan documentación y tests.
- Cache de KPIs puede mostrar datos hasta 5 min desactualizados; invalidación explícita al cambiar estado de Indicador queda como mejora v1.1.
- Drift temporal entre rutas MVP (`/kpis`, `/data`) y contratos FSD por rol hasta completar alineación.

## Validación

- [CC] con JWT de carrera X no obtiene filas de carrera Y (403 o lista vacía filtrada).
- `GET /dashboard/coordinator` responde p95 < 3 000 ms con dataset representativo (NFR-001).
- `POST /reports/{id}/export` devuelve 202; polling `GET /reports/runs/{runId}` llega a `COMPLETED` con URL válida.
- Export no incluye columnas técnicas (`internal_id`, surrogate keys).
- JaCoCo ≥ 90 % en `DashboardServiceImpl` y `ReportServiceImpl`.

## Referencias

- [`docs/04_fsd/casos_uso.md`](../04_fsd/casos_uso.md) — FSD-UC-011–014
- [`docs/04_fsd/api_contracts.md`](../04_fsd/api_contracts.md) — MOD-DASH, MOD-REPORT
- [`docs/05_dti/api_contracts_mvp_runtime.md`](../05_dti/api_contracts_mvp_runtime.md) — API-DASH-01/02 MVP
- [`docs/09_trazabilidad/matriz_trazabilidad.md`](../09_trazabilidad/matriz_trazabilidad.md) — PRD-REQ-011/012/014
- [`app/sigesa-backend/design_docs/design_dashboard.md`](../../app/sigesa-backend/design_docs/design_dashboard.md) — diseño técnico v1.2
- [`docs/06_prompt_contracts/contract_fsd_008_mod_dash_backend.md`](../06_prompt_contracts/contract_fsd_008_mod_dash_backend.md) — PC-MOD-DASH-01
- [`figma/annotations/prototipo/jd-admin-dashboard.annotations.md`](../../figma/annotations/prototipo/jd-admin-dashboard.annotations.md) — AcredIA Design System [JD]
- [`docs/07_diagramas/seq-004-004-dashboard-semaforos.mmd`](../07_diagramas/seq-004-004-dashboard-semaforos.mmd)
