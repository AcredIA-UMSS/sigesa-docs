# Registro de decisiones arquitectónicas (ADR) — SIGESA / AcredIA

| Campo | Valor |
|-------|-------|
| **Ubicación canónica** | `docs/adr/` (este directorio) |
| **Audiencia** | DTI, FSD, implementación, agentes IA |
| **Última actualización** | 2026-05-16 |

> **Regla:** las decisiones de arquitectura del producto viven aquí. Las carpetas `team/<equipo>/09_dti/adr/` son **copias de trabajo** del equipo; no introducen numeración distinta en el repo.

---

## Índice canónico

| ADR | Título | Estado | Relacionado |
|-----|--------|--------|-------------|
| [ADR-0001](ADR-0001-append-only-evidence-storage.md) | Versionado append-only de Evidencia | Propuesta | MOD-EVIDENCE · `ddl_sigesa_append_only.sql` |
| [ADR-0002](ADR-0002-modular-monolith.md) | Monolito modular v1 | Propuesta | `docs/04_fsd/FSD.md` §2.4 |
| [ADR-0003](ADR-0003-authentication-adapter.md) | Adapter auth local v1.0 → LDAP v1.1 | Aceptado | BRD Q-02 · FSD-UC-001 |
| [ADR-0004](ADR-0004-evidence-blob-storage-docker.md) | Blobs de evidencia en volumen Docker | Aceptado | Complementa ADR-0001 |
| [ADR-0005](ADR-0005-audit-log-append-only-postgresql.md) | Bitácora append-only en PostgreSQL | Aceptado | MOD-AUDIT · FSD-UC-017 |
| [ADR-0006](ADR-0006-postgresql-16-primary-database.md) | PostgreSQL 16 como BD principal | Aceptado | `docs/05_dti/modelo_datos.md` |
| [ADR-0007](ADR-0007-jwt-rbac-authentication.md) | JWT stateless + RBAC | Aceptado | Complementa ADR-0003 |
| [ADR-0008](ADR-0008-taxonomies-ceub-arcu-sur-database.md) | Taxonomías CEUB/ARCU-SUR en BD | Aceptado | FSD-UC-003 · MOD-PROCESS |
| [ADR-0009](ADR-0009-backend-nodejs-express.md) | Backend Node.js 20 + Express 4 | Aceptado | `docs/05_dti/DTI.md` (pendiente) |

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
| [`docs/04_fsd/FSD.md`](../04_fsd/FSD.md) | ADR-0001–0009 en plan técnico |
| [`docs/05_dti/modelo_datos.md`](../05_dti/modelo_datos.md) | ADR-0001, 0005, 0006 |
| [`docs/09_trazabilidad/matriz_trazabilidad.md`](../09_trazabilidad/matriz_trazabilidad.md) | §6 MOD × ADR |

---

## Registro de cambios

| Fecha | Cambio |
|-------|--------|
| 2026-05-16 | Consolidación: ADR-0004–0009 desde `team/aylenGonzales`; índice; eliminación de archivos duplicados sin extensión |
