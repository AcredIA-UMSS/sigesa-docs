# ADR-0013: Almacenamiento S3 para blobs de Evidence

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-25 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | Evidence Service · BlobStoragePort · S3 |
| Supersede | [ADR-0004](ADR-0004-evidence-blob-storage-docker.md) para despliegue cloud v1.0 |
| Relacionado | [ADR-0001](ADR-0001-append-only-evidence-storage.md) · [ADR-0010](ADR-0010-event-driven-choreography.md) |

## Contexto

SIGESA v1.0 adopta arquitectura cloud distribuida. En ese contexto, almacenar blobs de Evidence en volumen Docker local deja de ser coherente con despliegue multi-servicio, respaldo administrado y escalamiento horizontal de Evidence Service.

La inmutabilidad normativa sigue definida por ADR-0001: una subsanación crea una nueva versión de Evidence y conserva las versiones previas. Este ADR decide el medio físico de almacenamiento de bytes.

## Decisión

Se adopta S3 como almacenamiento de blobs de Evidence para v1.0 cloud.

- Evidence Service escribe blobs en S3 mediante `BlobStoragePort`.
- PostgreSQL/RDS conserva metadatos append-only: `evidence`, `evidence_version`, `content_sha256`, `s3_key`, `supersedes_id`.
- La API nunca expone el bucket directamente; las descargas pasan por autorización JWT/RBAC o URLs firmadas de corta duración.
- S3 debe tener versioning y política de retención alineada a auditoría institucional.

## Consecuencias

### Positivas

- Evidence Service puede escalar horizontalmente sin compartir disco local.
- Los respaldos y la durabilidad del blob dejan de depender de un único volumen Docker.
- La migración de infraestructura no cambia el modelo append-only de Evidence.

### Negativas

- Introduce OPEX y gestión de IAM/bucket policies.
- Requiere runbooks de recuperación, lifecycle y alarmas de almacenamiento.

## Validación

- Cargar Evidence y verificar `content_sha256` contra el blob recuperado desde S3.
- Validar que una subsanación crea nueva `evidence_version` y nuevo `s3_key`, sin sobrescribir el blob anterior.
- Verificar que un actor sin permiso no puede descargar Evidence de otra carrera.

## Referencias

- [`docs/05_dti/hybrid_architecture.md`](../05_dti/hybrid_architecture.md)
- [`docs/05_dti/DTI.md`](../05_dti/DTI.md)
- [`docs/05_dti/api_contracts_cloud.md`](../05_dti/api_contracts_cloud.md)
