# ADR-0006: PostgreSQL 16 como base de datos principal

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-16 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | Persistencia global |
| Fuente equipo | `team/aylenGonzales/09_dti/adr/ADR-003.md` |
| Relacionado | [ADR-0005](ADR-0005-audit-log-append-only-postgresql.md) · `docs/05_dti/modelo_datos.md` · FSD-UC-007 (full-text) |

## Contexto

SIGESA requiere: integridad referencial proceso→fase→indicador→evidencia; **full-text** para búsqueda (NFR-001 / FSD-UC-007); **JSONB** para detalle de auditoría; **ACID** en carga de evidencia; **RBAC** para REVOKE en log; **$0** licencia; imagen Docker oficial.

## Decisión

- **PostgreSQL 16** como único motor relacional en v1.0.
- Índices **GIN** + `tsvector` para búsqueda documental.
- Migraciones versionadas (Flyway/Alembic según ADR-0009).
- Connection pooling (app o PgBouncer) cuando concurrentes &gt; ~100.

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Un motor para relacional + FTS + JSONB + RBAC | Vacuum/índices a cargo del equipo |
| `pg_dump` unifica respaldo con ADR-0005 | Búsqueda semántica (v2) puede requerir pgvector u otro servicio |

## Alternativas rechazadas

- MySQL/MariaDB: FTS y RBAC menos alineados al log inmutable.
- SQLite: concurrencia multi-usuario insuficiente.
- MongoDB: integridad jerárquica en aplicación.
