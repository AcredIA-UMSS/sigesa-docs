# ADR-0005: Log de auditoría append-only en PostgreSQL

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-16 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | MOD-AUDIT — transversal |
| Fuente equipo | `team/aylenGonzales/09_dti/adr/ADR-002.md` |
| Relacionado | [ADR-0006](ADR-0006-postgresql-16-primary-database.md) · FSD-UC-017 · PRD-REQ-018 · NFR-004 |

## Contexto

CEUB/ARCU-SUR exigen trazabilidad auditable de acciones (login, carga, aprobación, cierre de fase, reportes). RBN-07 / BR-011: ningún usuario puede alterar registros ya escritos. Volumen piloto estimado &lt; 1M filas/año.

## Decisión

- Tabla `audit_log` (o `LOG_AUDITORIA`) con columnas: `actor_id`, `action`, `entity_type`, `entity_id`, `detail` (JSONB), `ip`, `created_at`.
- Rol aplicación `sigesa_app`: **INSERT** únicamente; **REVOKE UPDATE, DELETE** sobre la tabla.
- Eventos críticos en la misma transacción de negocio o inmediatamente después con manejo de error.
- Respaldo incluido en `pg_dump` diario (MOD-OPS).

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Inmutabilidad demostrable con `\z` + permisos | Superusuario `postgres` comprometido = riesgo residual |
| Sin infra adicional (misma BD) | Retención &gt; 5 años puede requerir particionamiento v2 |

## Alternativas rechazadas

- **Log solo en archivos**: difícil correlación transaccional.
- **ELK/OpenTelemetry solo**: sobredimensionado para v1.0 piloto.

## Alineación FSD

`docs/04_fsd/FSD.md` §2.4.1 (`COMP-AUDIT-001`) y `casos_uso.md` CU-012 describen el comportamiento; este ADR fija la persistencia.
