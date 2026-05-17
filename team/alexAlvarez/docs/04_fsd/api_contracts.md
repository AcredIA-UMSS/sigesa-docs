# Contratos API — SIGESA

| Campo | Valor |
|-------|-------|
| **Ámbito** | `team/alexAlvarez/docs/04_fsd/` |
| **Versión** | v1.0 |
| **Base path** | `/api/v1` |
| **Reglas** | [`reglas_negocio.md`](reglas_negocio.md) |

> Contratos lógicos REST. El cliente **no** envía `estado` arbitrario; el backend aplica la máquina de estados (FSD-BR-18). Autenticación: JWT Bearer (sesión UMSS).

---

## 1. Convenciones

| Aspecto | Valor |
|---------|-------|
| Formato JSON | `application/json` |
| Upload | `multipart/form-data` en evidencias |
| Errores | `{ "code": "ERROR_CODE", "message": "...", "details": {} }` |
| Paginación | `?page=1&size=20` → `{ "items": [], "total": n }` |
| Idempotencia | Header `Idempotency-Key` en POST de carga |

### Códigos frecuentes

| HTTP | Código | Regla |
|------|--------|-------|
| 401 | `AUTH_REQUIRED` | Sin sesión |
| 403 | `FORBIDDEN_ROLE` | BR-03, BR-04, BR-09 |
| 409 | `EVIDENCE_IMMUTABLE` | BR-02 |
| 409 | `FASE_CIERRE_BLOQUEADO` | BR-07 |
| 422 | `JUSTIFICATION_REQUIRED` | BR-05 |
| 422 | `OBSERVATION_LINK_REQUIRED` | BR-06 |

---

## 2. Autenticación (MOD-AUTH)

### `POST /auth/login`

| | |
|---|---|
| **UC** | FSD-UC-001 |
| **Roles** | Público |
| **Body** | `{ "email": "coord@umss.edu.bo", "password": "***" }` |
| **200** | `{ "accessToken", "expiresIn": 28800, "role": "CC", "programScope": "uuid" }` |
| **401** | `AUTH_INVALID_CREDENTIALS` |

### `POST /admin/users` · `PATCH /admin/users/{id}/deactivate`

| | |
|---|---|
| **UC** | FSD-UC-002 |
| **Roles** | [JD] |

---

## 3. Procesos y plantillas (MOD-PROCESS)

### `POST /templates/{templateId}/activate`

| | |
|---|---|
| **UC** | FSD-UC-003 |
| **Roles** | [JD] |
| **200** | Plantilla activa para periodo |

### `POST /processes`

| | |
|---|---|
| **Body** | `{ "programId", "templateId", "gestion", "modality": "CEUB" }` |
| **201** | `{ "processId", "estado": "EN_PROCESO" }` |
| **409** | `PROCESS_ALREADY_ACTIVE` |

### `POST /phases/{phaseId}/close-request`

| | |
|---|---|
| **UC** | FSD-UC-010 |
| **Roles** | [TD] |
| **200** | Fase `COMPLETADA` |
| **409** | `FASE_CIERRE_BLOQUEADO` + lista indicadores pendientes |

---

## 4. Evidencias (MOD-EVIDENCE)

### `POST /evidences`

| | |
|---|---|
| **UC** | FSD-UC-004, UC-006 |
| **Roles** | [CC] |
| **Content-Type** | `multipart/form-data` |
| **Campos** | `indicatorId`, `file`, `title`, `description`, `observationId?` |
| **201** | `{ "evidenceId", "versionId", "versionNo", "contentHash" }` |
| **400** | `INVALID_MIME_TYPE` |
| **413** | `FILE_TOO_LARGE` |

### `GET /evidences/search`

| | |
|---|---|
| **UC** | FSD-UC-007 |
| **Query** | `phaseId`, `indicatorId`, `programId`, `q` |
| **Roles** | [CC] (scope carrera), [TD] (global) |
| **SLA** | p95 < 500 ms (PRD-NFR-001) |

### `GET /evidences/{evidenceId}/versions`

| | |
|---|---|
| **UC** | FSD-UC-005 |
| **200** | Array ordenado por `versionNo` con `supersedesId`, `observationId` |

### `DELETE /evidences/{id}`

| | |
|---|---|
| **Respuesta** | **405** o **409** `EVIDENCE_IMMUTABLE` siempre |

---

## 5. Indicadores y observaciones (MOD-AUDIT)

### `POST /indicators/{indicatorId}/observe`

| | |
|---|---|
| **UC** | FSD-UC-008 |
| **Roles** | [TD] |
| **Body** | `{ "justification": "texto min 20 chars", "evidenceVersionId" }` |
| **200** | `{ "observationId", "indicatorEstado": "OBSERVADO" }` |

### `POST /indicators/{indicatorId}/approve`

| | |
|---|---|
| **UC** | FSD-UC-009 |
| **Roles** | [TD] |
| **200** | `{ "indicatorEstado": "APROBADO", "phaseReadyToClose": boolean }` |

### `POST /indicators/bulk-approve`

| | |
|---|---|
| **UC** | FSD-UC-009 (lote) |
| **Body** | `{ "indicatorIds": ["uuid", ...] }` |
| **409** | Si alguno no elegible |

---

## 6. Portal público (MOD-PUBLIC)

### `GET /public/programs`

| | |
|---|---|
| **UC** | FSD-UC-016 |
| **Auth** | Ninguna |
| **200** | Solo campos de `publication_snapshot` |

### `GET /public/programs/{code}/certificate`

| | |
|---|---|
| **200** | Redirect o stream PDF firmado |
| **404** | Sin publicación |

---

## 7. Fragmento OpenAPI (esquema Error)

```yaml
openapi: 3.0.3
info:
  title: SIGESA API
  version: "1.0.0"
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    Error:
      type: object
      required: [code, message]
      properties:
        code: { type: string }
        message: { type: string }
        details: { type: object }
security:
  - bearerAuth: []
```

---

## 8. Trazabilidad endpoint → UC

| Endpoint | UC | PRD-US |
|----------|-----|--------|
| POST /evidences | UC-004, UC-006 | 002, 003 |
| POST /indicators/{id}/observe | UC-008 | 009 |
| POST /indicators/{id}/approve | UC-009 | 023 |
| POST /phases/{id}/close-request | UC-010 | 014 |
| GET /public/programs | UC-016 | 016, 017 |
