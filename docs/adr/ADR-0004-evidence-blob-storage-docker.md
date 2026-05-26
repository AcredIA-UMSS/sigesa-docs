# ADR-0004: Almacenamiento de blobs de Evidencia en volumen Docker local

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-16 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | MOD-EVIDENCE — capa de archivos |
| Fuente equipo | `team/aylenGonzales/09_dti/adr/ADR-001.md` |
| Relacionado | [ADR-0001](ADR-0001-append-only-evidence-storage.md) (metadatos/versiones) · FSD-UC-004 · NFR-007 |

## Contexto

SIGESA almacena PDF/DOCX/XLSX (hasta 5 MB por archivo, BRD Q-03) para acreditación CEUB/ARCU-SUR. El piloto UMSS requiere costo **$0** en v1.0 y despliegue Docker (FSD SA-05). La **inmutabilidad de versiones** se define en ADR-0001; este ADR define **dónde** persisten los bytes del archivo.

## Decisión

- Volumen Docker nombrado `evidencias_data` → `/data/evidencias/{proceso_id}/{fase_id}/{indicador_id}/{version}_{nombre}`.
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
