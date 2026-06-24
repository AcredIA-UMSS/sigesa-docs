# Registro de decisiones arquitectónicas (ADR) — SIGESA / AcredIA

| Campo | Valor |
|-------|-------|
| **Ubicación canónica** | `docs/adr/` (este directorio) |
| **Audiencia** | DTI, FSD, implementación, agentes IA |
| **Última actualización** | 2026-06-23 |
| **DTI compilado** | [`docs/05_dti/DTI.md`](../05_dti/DTI.md) · ADRs narrativos en [`docs/05_dti/adrs/`](../05_dti/adrs/README.md) |

> **Regla:** las decisiones de arquitectura del producto viven aquí. Las carpetas `team/<equipo>/09_dti/adr/` son **copias de trabajo** del equipo; no introducen numeración distinta en el repo.

---

## Índice canónico

| ADR | Título | Estado | Relacionado |
|-----|--------|--------|-------------|
| [ADR-0001](ADR-0001-append-only-evidence-storage.md) | Versionado append-only de Evidence | Aceptado | MOD-EVIDENCE · `ddl_sigesa_append_only.sql` |
| [ADR-0002](ADR-0002-modular-monolith.md) | Monolito modular v1 | Supersedido parcial | ADR-0010 |
| [ADR-0003](ADR-0003-authentication-adapter.md) | Adapter auth local v1.0 → LDAP v1.1 | Aceptado | BRD Q-02 · FSD-UC-001 |
| [ADR-0004](ADR-0004-evidence-blob-storage-docker.md) | Blobs de Evidence en volumen Docker | Supersedido | ADR-0013 |
| [ADR-0005](ADR-0005-audit-log-append-only-postgresql.md) | Bitácora append-only en PostgreSQL | Aceptado | MOD-AUDIT · FSD-UC-017 |
| [ADR-0006](ADR-0006-postgresql-16-primary-database.md) | PostgreSQL 16 como BD principal | Aceptado | `docs/05_dti/modelo_datos.md` |
| [ADR-0007](ADR-0007-jwt-rbac-authentication.md) | JWT stateless + RBAC | Aceptado | Complementa ADR-0003 |
| [ADR-0008](ADR-0008-taxonomies-ceub-arcu-sur-database.md) | Taxonomías CEUB/ARCU-SUR en BD | Aceptado | FSD-UC-003 · MOD-PROCESS |
| [ADR-0009](ADR-0009-backend-nodejs-express.md) | Backend Node.js 20 + Express 4 | Aceptado | [`docs/05_dti/DTI.md`](../05_dti/DTI.md) |
| [ADR-0010](ADR-0010-event-driven-choreography.md) | Coreografía Event-Driven con AWS EventBridge | Aceptado | [`docs/05_dti/hybrid_architecture.md`](../05_dti/hybrid_architecture.md) |
| [ADR-0011](ADR-0011-sqs-fifo-phase-closure.md) | SQS FIFO para cierre concurrente de Phase | Aceptado | ADR-0010 · Máquina de estados |
| [ADR-0012](ADR-0012-indicator-state-history-append-only.md) | Historial append-only de estados de Indicator | Aceptado | ADR-0001 · ADR-0010 |
| [ADR-0013](ADR-0013-s3-evidence-blob-storage.md) | Almacenamiento S3 para blobs de Evidence | Aceptado | Supersede ADR-0004 para cloud v1.0 |
| [ADR-0014](ADR-0005-cloud-provider-y-estilo-de-despliegue.md) | Proveedor cloud AWS + estilo de despliegue (ECS Fargate / Compose) | Aceptado | Rúbrica curso: archivo `ADR-0005-cloud-provider-*`; slot numérico 0005 audit = bitácora |
| [ADR-0015](ADR-0015-dashboard-sync-async-reporting.md) | Dashboards síncronos y exportación asíncrona (MOD-DASH/MOD-REPORT) | Aceptado | FSD-UC-011–014 · ADR-0007 · ADR-0013 |

---

## Mapeo equipo → repo (evitar duplicar numeración)

| Copia equipo | Ruta | ADR canónico |
|--------------|------|--------------|
| AcredIA ADR-001 (blobs) | `team/aylenGonzales/09_dti/adr/ADR-001.md` | **ADR-0004** |
| AcredIA ADR-002 (audit log) | `team/aylenGonzales/09_dti/adr/ADR-002.md` | **ADR-0005** |
| AcredIA ADR-003 (PostgreSQL) | `team/aylenGonzales/09_dti/adr/ADR-003.md` | **ADR-0006** |
| AcredIA ADR-004 (JWT) | `team/aylenGonzales/09_dti/adr/ADR-004.md` | **ADR-0007** |
| AcredIA ADR-005 (taxonomías) | `team/aylenGonzales/09_dti/adr/ADR-005.md` | **ADR-0008** |
| AcredIA ADR-006 (Node/Express) | `team/aylenGonzales/09_dti/adr/ADR-006.md` | **ADR-0009** |
| BorisAngulo DTI | `team/borisAngulo/docs/09_dti/DTI_v1.md` | Referencia ADR-0001–0009 |

**Nota:** el número `ADR-00X` del equipo AcredIA **no coincide** con `ADR-000X` del repo en los tres primeros ítems (p. ej. equipo 002 = audit log = repo **0005**).

---

## Trazabilidad con `docs/`

| Documento | Uso de ADRs |
|-----------|-------------|
| [`docs/01_brd/BRD.md`](../01_brd/BRD.md) | Q-02 → ADR-0003 |
| [`docs/04_fsd/FSD.md`](../04_fsd/FSD.md) | ADR-0001–0013 en plan técnico |
| [`docs/05_dti/modelo_datos.md`](../05_dti/modelo_datos.md) | ADR-0001, 0005, 0006, 0012 |
| [`docs/05_dti/hybrid_architecture.md`](../05_dti/hybrid_architecture.md) | ADR-0010–0014 |
| [`docs/09_trazabilidad/matriz_trazabilidad.md`](../09_trazabilidad/matriz_trazabilidad.md) | §6 MOD × ADR |

---

## Registro de cambios

| Fecha | Cambio |
|-------|--------|
| 2026-05-16 | Consolidación: ADR-0004–0009 desde `team/aylenGonzales`; índice; eliminación de archivos duplicados sin extensión |
| 2026-05-25 | Promoción canónica ADR-0010–0012 para arquitectura cloud v1.0 |
| 2026-05-25 | ADR-0013 formaliza S3 como almacenamiento de blobs de Evidence para cloud v1.0 |
| 2026-05-28 | ADR-0014 (archivo rúbrica `ADR-0005-cloud-provider-y-estilo-de-despliegue.md`): AWS + ECS Fargate / Docker Compose |
| 2026-06-23 | ADR-0015: arquitectura híbrida sync/async para MOD-DASH y MOD-REPORT (FSD-UC-011–014) |
