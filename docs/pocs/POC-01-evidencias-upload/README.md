# POC-01: Pipeline de evidencias (upload + versionado + objeto)

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| ID | `POC-01-evidencias-upload` |
| Título | Upload multipart, SHA-256, MinIO, idempotencia |
| Grupo | AcredIA — SIGESA docs |
| Responsable(s) | Equipo módulo DTI |
| Fecha de inicio | 26/05/2026 |
| Fecha objetivo de cierre | 30/05/2026 |
| Estado | Completada |
| ADR relacionado | [ADR-0003](../../adr/ADR-0003-upload-idempotency-s3.md) |
| Trazabilidad | FSD-UC-002 · TC-04, TC-05 · NFR-006, NFR-009, NFR-013 · RB-04, BR-015, CN-01 |

---

## 1. Riesgo que mitiga

**RISK-02:** inconsistencia entre PostgreSQL y almacenamiento objeto; duplicación de `version` bajo reintento de red; pérdida de integridad sin hash SHA-256.

---

## 2. Hipótesis

> Creemos que un flujo **multipart → validación MIME/tamaño → SHA-256 → PUT MinIO → INSERT transaccional con UK `(indicador_id, version)` + `Idempotency-Key`** sostiene **reintentos sin versión duplicada** y **P95 de registro ≤ 3 s** para archivos de **5 MB** en red local Docker.

---

## 3. Criterio de éxito medible (SMART)

| Métrica | Umbral éxito | Umbral fracaso |
|---------|--------------|----------------|
| Reintentos idempotentes | 100% misma `version`/`documento_id` | Cualquier versión duplicada |
| Integridad hash BD = objeto | 0 mismatch | ≥ 1 mismatch |
| Latencia registro 5 MB (n≥30) | P95 ≤ 3 s | P95 > 5 s |
| Rechazo > 50 MB | HTTP 413 | Acepta archivo |

---

## 4. Alcance reducido

**Incluye:** `POST /api/v1/documentos`, tablas `indicador`/`documento`/`idempotency_keys`, bucket `test-sigesa-evidencias`, script `run_poc01.py`.

**Excluye:** UI React, antivirus, OCR, notificaciones SMTP.

**Duración máxima:** 4 días.

---

## 5. Diseño de la prueba

### 5.1 Stack

| Componente | Tecnología | Versión |
|------------|------------|---------|
| API | Python FastAPI | 0.115+ |
| BD | PostgreSQL | 16 |
| Objeto | MinIO (S3 API) | latest |
| Cliente carga | httpx | 0.27+ |

### 5.2 Arquitectura

```mermaid
flowchart LR
  Script[run_poc01.py] --> API[FastAPI :8001]
  API --> PG[(PostgreSQL)]
  API --> S3[MinIO]
```

### 5.3 Datos

- Origen: sintéticos `TEST_*`, dominio `example.invalid`.
- Archivos PDF generados en memoria (magic `%PDF`).

---

## 6. Entorno

- Local + Docker Compose en `docs/pocs/docker-compose.yml`.
- API: `http://127.0.0.1:8001`.

---

## 7. Ejecución

```powershell
cd docs\pocs
docker compose up -d
cd POC-01-evidencias-upload\src
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
$env:DATABASE_URL="postgresql://sigesa_poc:sigesa_poc_dev@localhost:5433/sigesa_poc"
python -m uvicorn api.main:app --port 8001
# Otra terminal:
python scripts\run_poc01.py
```

---

## 8. Resultados

Ver [`RESULTADO.md`](RESULTADO.md) y carpeta [`evidencia/`](evidencia/).
