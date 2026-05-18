# Contratos API REST — SIGESA

| Metadato | Valor |
|----------|-------|
| **Versión API** | `v1` |
| **Base URL** | `https://sigesa.umss.edu.bo/api/v1` |
| **Fecha** | 14/05/2026 |

---

## Resumen

API **REST JSON** con autenticación **JWT** (`Bearer`), excepto `/auth/login` y `/publico/**`.

| Módulo | Endpoints clave |
|--------|-----------------|
| Identidad | `POST /auth/login`, `GET /auth/me` |
| Documental | `POST /documentos` (multipart) |
| Workflow | `PATCH /indicadores/{id}/decision`, `POST /subfases/{id}/avance` |
| Dashboard | `GET /dashboard/resumen` |
| Reportes | `POST /reportes/pdf`, `GET /reportes/jobs/{jobId}` |
| Búsqueda | `GET /busqueda/documentos` |
| Público | `GET /publico/carreras/{slugOrId}` |
| Auditoría | `GET /auditoria/eventos` |
| Procesos | `POST /procesos`, `GET /plantillas` |
| Ops | `GET /health/backups` |

Errores: envelope `{ error: { code, message, hint }, requestId }` con prefijo `SIGESA_*`.

**Documento completo:** [team/Marlene/04_fsd/api_contracts.md](../../team/Marlene/04_fsd/api_contracts.md)

**Relacionados:** [modelo_datos.md](../../team/Marlene/04_fsd/modelo_datos.md) · [reglas_negocio.md](../../team/Marlene/04_fsd/reglas_negocio.md)
