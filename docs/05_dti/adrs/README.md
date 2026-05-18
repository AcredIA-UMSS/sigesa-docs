# Registro de decisiones arquitectónicas — carpeta DTI

| Campo | Valor |
|-------|-------|
| **Ubicación DTI** | `docs/05_dti/adrs/` (este directorio) |
| **Ubicación canónica repo** | `docs/adr/` (numeración `ADR-0001` … `ADR-0009`) |
| **Copias de trabajo equipo** | `team/aylenGonzales/09_dti/adr/ADR-001.md` … `ADR-006.md` |
| **Versión** | Dorada v1.0 — primera compilación |
| **Fecha** | 2026-05-17 |

> Los archivos `ADR_00N_*.md` de esta carpeta son la **vista DTI** (narrativa profunda para implementación). La numeración `ADR_00N` sigue el orden lógico del contrato [PC-SIG-13]; la columna **Canónico** es la fuente de verdad para trazabilidad en matriz y PR.

## Índice

| DTI (este directorio) | Canónico `docs/adr/` | Equipo AcredIA | Título | Estado |
|----------------------|----------------------|----------------|--------|--------|
| [ADR_001](ADR_001_append_only_evidencia.md) | [ADR-0001](../../adr/ADR-0001-append-only-evidence-storage.md) | — | Versionado append-only de Evidencia | Aceptada |
| [ADR_002](ADR_002_monolito_modular.md) | [ADR-0002](../../adr/ADR-0002-modular-monolith.md) | — | Monolito modular v1 | Aceptada |
| [ADR_003](ADR_003_adapter_autenticacion.md) | [ADR-0003](../../adr/ADR-0003-authentication-adapter.md) | — | Adapter auth local → LDAP | Aceptada |
| [ADR_004](ADR_004_almacenamiento_blobs_docker.md) | [ADR-0004](../../adr/ADR-0004-evidence-blob-storage-docker.md) | ADR-001 | Blobs en volumen Docker | Aceptada |
| [ADR_005](ADR_005_audit_log_postgresql.md) | [ADR-0005](../../adr/ADR-0005-audit-log-append-only-postgresql.md) | ADR-002 | Bitácora append-only PostgreSQL | Aceptada |
| [ADR_006](ADR_006_postgresql_16.md) | [ADR-0006](../../adr/ADR-0006-postgresql-16-primary-database.md) | ADR-003 | PostgreSQL 16 principal | Aceptada |
| [ADR_007](ADR_007_jwt_rbac.md) | [ADR-0007](../../adr/ADR-0007-jwt-rbac-authentication.md) | ADR-004 | JWT stateless + RBAC | Aceptada |
| [ADR_008](ADR_008_taxonomias_ceub_arcu.md) | [ADR-0008](../../adr/ADR-0008-taxonomies-ceub-arcu-sur-database.md) | ADR-005 | Taxonomías CEUB/ARCU-SUR en BD | Aceptada |
| [ADR_009](ADR_009_backend_nodejs_express.md) | [ADR-0009](../../adr/ADR-0009-backend-nodejs-express.md) | ADR-006 | Node.js 20 + Express 4 | Aceptada |

## Regla de edición

- **No** renumerar `docs/adr/ADR-000N` sin actualizar matriz en `docs/09_trazabilidad/`.
- Cambios materiales a ADR **Aceptada**: crear `ADR-0010+` en `docs/adr/` y documentar supersesión; luego sincronizar la copia DTI aquí.
- Fuentes de negocio: `docs/04_fsd/`, `docs/03_prd/PRD.md`, `context/03_domain_glossary.md`, máquina de estados en `team/alexAlvarez/docs/context/04_state_machine.md`.
