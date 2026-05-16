# ADR-0001: Almacenamiento append-only para Evidencia

| Campo | Valor |
|-------|-------|
| Estado | **Propuesta** |
| Fecha | 2026-05-16 |
| Alcance | MOD-EVIDENCE, `evidence_version` |
| Trazabilidad | BRD-CST-01 · FSD-UC-005 · NFR-017 · ADR-0001 |

## Contexto

SIGESA debe cumplir auditoría CEUB/ARCU-SUR sin borrado físico de pruebas normativas aprobadas. Subsanación = nueva versión con `supersedes_id`.

## Decisión

- Tabla `evidence_version` solo INSERT desde rol aplicación; REVOKE DELETE.
- Blobs en almacenamiento objeto con versionado y cifrado AES-256 (NFR-007).
- API `DELETE /evidences/{id}` responde `409 EVIDENCE_IMMUTABLE` si aprobado.

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Trazabilidad forense para [TD]/auditores | Mayor uso de almacenamiento |
| Alineado a `ddl_sigesa_append_only.sql` | Migraciones de esquema más cuidadosas |

## Alternativas rechazadas

- Soft-delete (`is_deleted`): rechazado (BRD-CST-01, skill append-only).
- Sobrescribir blob in-place: rechazado.
