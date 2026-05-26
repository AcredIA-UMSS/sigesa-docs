# ADR-0004: Almacenamiento de blobs de Evidencia en volumen Docker local

| Campo | Valor |
|-------|-------|
| Estado | **Supersedido para cloud v1.0** |
| Fecha | 2026-05-16 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | MOD-EVIDENCE — capa de archivos |
| Fuente equipo | `team/aylenGonzales/09_dti/adr/ADR-001.md` |
| Relacionado | [ADR-0001](ADR-0001-append-only-evidence-storage.md) (metadatos/versiones) · [ADR-0013](ADR-0013-s3-evidence-blob-storage.md) · FSD-UC-004 · NFR-007 |

## Contexto

SIGESA almacena PDF/DOCX/XLSX como blobs de Evidence para acreditación CEUB/ARCU-SUR. Este ADR documenta la alternativa inicial con volumen Docker local. Para la arquitectura cloud distribuida v1.0 vigente, la decisión aplicable es [ADR-0013](ADR-0013-s3-evidence-blob-storage.md): S3 para blobs de Evidence.

## Decisión

- Decisión histórica supersedida: volumen Docker nombrado `evidencias_data` → `/data/evidencias/{proceso_id}/{fase_id}/{indicador_id}/{version}_{nombre}`.
- Campo `ruta_relativa` (o equivalente en `evidence_version`) en PostgreSQL; la API nunca expone el filesystem directamente.
- Hash **SHA-256** tras escritura en disco (alineado PC-004 / FSD-BR-01).
- Descarga solo vía API con JWT + RBAC (ADR-0007).

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| $0 OPEX v1.0; time-to-market Q4 2026 | Sin réplica geográfica automática |
| Migración a S3/MinIO en v2.0 cambiando solo adaptador de storage | Monitoreo de disco (alerta ~70 % ocupación) |

## Alternativas rechazadas

- **BYTEA en PostgreSQL**: anti-patrón para binarios grandes.
- **S3 cloud en v1.0**: costo y negociación TI retrasan piloto.

## Reversión / evolución

Señal de cambio: disco > 85 % antes de Q2 2027 o pérdida no recuperable → planificar **ADR futuro** S3-compatible manteniendo ADR-0001.
