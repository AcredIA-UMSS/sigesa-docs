# ADR-0001: Almacenamiento append-only para Evidencia

| Campo | Valor |
|-------|-------|
| Estado | **Propuesta** |
| Fecha | 2026-05-16 |
| Alcance | MOD-EVIDENCE, `evidence_version` |
| Trazabilidad | BRD-CST-01 · FSD-UC-005 · NFR-017 |
| Relacionado | [ADR-0004](ADR-0004-evidence-blob-storage-docker.md) (ruta de blobs) · [ADR-0005](ADR-0005-audit-log-append-only-postgresql.md) |

## Contexto

SIGESA debe cumplir auditoría CEUB/ARCU-SUR sin borrado físico de pruebas normativas aprobadas. Subsanación = nueva versión con `supersedes_id`. La **ubicación física del archivo** se decide en ADR-0004; este ADR cubre el **modelo de versiones** y políticas de API.

## Decisión

- Tabla `evidence_version` solo INSERT desde rol aplicación; REVOKE DELETE.
- Cifrado en tránsito/reposo según NFR-007; hash SHA-256 por versión.
- API `DELETE /evidences/{id}` responde `409 EVIDENCE_IMMUTABLE` si aprobado.

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Trazabilidad forense para [TD]/auditores | Mayor uso de almacenamiento |
| Alineado a `ddl_sigesa_append_only.sql` | Migraciones de esquema más cuidadosas |

## Alternativas rechazadas

- Soft-delete (`is_deleted`): rechazado (BRD-CST-01, skill append-only).
- Sobrescribir blob in-place: rechazado.
