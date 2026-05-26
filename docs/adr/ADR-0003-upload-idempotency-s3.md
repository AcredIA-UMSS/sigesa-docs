# ADR‑0003: Upload de evidencias con idempotencia y validación previa a almacenamiento objeto

### Metadatos

| Campo | Valor |
|-------|-------|
| Número | `0003` |
| Título | Upload de evidencias con idempotencia y validación previa a S3 |
| Fecha | `26/05/2026` |
| Autor(es) | Equipo AcredIA — UMSS |
| Estado | **Aceptada** (validada por POC-01) |
| Alcance | Módulo documental / FSD-UC-002 |
| POC | [`docs/pocs/POC-01-evidencias-upload/`](../pocs/POC-01-evidencias-upload/) |

---

### 1. Contexto

FSD-UC-002 exige carga multipart de evidencias con versionado monotónico, hash SHA-256, almacenamiento objeto (S3-compatible) y reintentos seguros sin duplicar versión (cabecera `Idempotency-Key` en `api_contracts.md`).

**Fuerzas:** integridad BD↔objeto; límite CN-01 (50 MB); trazabilidad NFR-013.

**POC-01** validó idempotencia, rechazo 413, P95 local y registro de hash.

---

### 2. Alternativas consideradas

| Alternativa | Pros | Contras |
|-------------|------|---------|
| A. Subir primero a S3, luego validar | Simple | Objetos huérfanos si falla BD |
| B. Validar → S3 → INSERT + tabla idempotency | Sin versión duplicada; rollback borra objeto | Tabla auxiliar |
| C. Presigned URL directo al cliente | Menos carga API | Complejidad UX; validación tardía |

---

### 3. Decisión

> **Elegimos B:** validar MIME y tamaño en API, calcular SHA-256, escribir en S3/MinIO, luego INSERT transaccional con UK `(indicador_id, version)` y cache de respuesta por `Idempotency-Key`.

Orden obligatorio: **validar → hash → objeto → BD**. Si falla BD, eliminar objeto recién creado.

---

### 4. Consecuencias

- **Positivas:** Reintentos de red seguros; mensajes `SIGESA_DOC_SIZE` / `SIGESA_DOC_MIME` alineados RB-10.
- **Negativas:** Tabla `idempotency_keys` requiere retención/TTL; presigned URL queda para POC-01b si latencia campus lo exige.
- **Observables:** Métrica `sigesa_upload_duration_seconds`; alertas objetos huérfanos.

---

### 5. Referencias

- POC-01 [`RESULTADO.md`](../pocs/POC-01-evidencias-upload/RESULTADO.md)
- FSD-UC-002 · CN-01 · RB-04
