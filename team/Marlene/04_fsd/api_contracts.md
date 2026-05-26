# Contratos API REST — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Producto** | SIGESA — Sistema de Evaluación y Acreditación de Carreras |
| **Institución** | UMSS · DUEA |
| **Versión API** | `v1` |
| **Versión documento** | v1.0 |
| **Fecha** | 14/05/2026 |
| **FSD padre** | `team/Marlene/04_fsd/FSD.md` §18 |
| **Modelo de datos** | `team/Marlene/04_fsd/modelo_datos.md` |
| **Reglas de negocio** | `team/Marlene/04_fsd/reglas_negocio.md` |
| **Casos de uso** | `team/Marlene/04_fsd/casos_uso.md` |

---

## 1. Convenciones generales

### 1.1 Base URL y versionado

| Entorno | Base URL |
|---------|----------|
| Producción | `https://sigesa.umss.edu.bo/api/v1` |
| Staging | `https://sigesa-staging.umss.edu.bo/api/v1` |
| Local | `http://localhost:8080/api/v1` |

- Prefijo de versión en URI: **`/api/v1`**.
- Cambios incompatibles → nueva versión mayor (`v2`).

### 1.2 Autenticación

| Ruta | Auth |
|------|------|
| `POST /auth/login` | Ninguna |
| `GET /publico/**` | Ninguna (+ rate limit) |
| Resto | `Authorization: Bearer <JWT>` |

**JWT (claims mínimos):**

```json
{
  "sub": "<usuarioId>",
  "email": "coord@umss.edu.bo",
  "rol": "CC",
  "carreraIds": ["uuid"],
  "exp": 1715760000
}
```

| Rol | Alcance típico |
|-----|----------------|
| `CC` | Carreras asignadas en `carreraIds` |
| `TD` | Todas las carreras (revisión) |
| `JD` | Global + administración |

### 1.3 Cabeceras estándar

| Cabecera | Uso |
|----------|-----|
| `Authorization` | Bearer JWT |
| `Content-Type` | `application/json` salvo multipart |
| `Idempotency-Key` | UUID en `POST /documentos` (reintentos seguros) |
| `X-Request-Id` | Correlación cliente (eco en respuesta) |
| `Accept-Language` | `es` (default) |

**Respuesta exitosa:** incluir `X-Request-Id` en todas las respuestas.

### 1.4 Paginación (cursor)

Parámetros comunes: `cursor` (opaque string), `limit` (default 20, max 100).

```json
{
  "items": [],
  "nextCursor": "eyJpZCI6Li4ufQ==",
  "hasMore": true
}
```

### 1.5 Formato de error (RB-10)

```json
{
  "error": {
    "code": "SIGESA_DOC_SIZE",
    "message": "El archivo supera el tamaño máximo permitido (50 MB).",
    "hint": "Comprima el PDF o divida anexos según guía DUEA.",
    "details": []
  },
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

| HTTP | Familia `code` | Ejemplos |
|------|----------------|----------|
| 400 | `SIGESA_VAL_*` | `SIGESA_VAL_BAD_REQUEST` |
| 401 | `SIGESA_AUTH_*` | `SIGESA_AUTH_INVALID`, `SIGESA_AUTH_EXPIRED` |
| 403 | `SIGESA_AUTH_DOMAIN`, `SIGESA_FORBIDDEN` | |
| 404 | `SIGESA_NOT_FOUND`, `SIGESA_PUBLIC_NOT_FOUND` | |
| 409 | `SIGESA_WF_*`, `SIGESA_PROC_*` | `SIGESA_WF_INCOMPLETE` |
| 413 | `SIGESA_DOC_SIZE` | |
| 415 | `SIGESA_DOC_MIME` | |
| 422 | `SIGESA_VAL_JUSTIFICATION_SHORT`, `SIGESA_NORM_*` | |
| 429 | `SIGESA_AUTH_LOCKED`, `SIGESA_RATE_LIMIT` | |
| 500 | `SIGESA_INTERNAL` | |
| 502 | `SIGESA_STORAGE_ERROR` | |
| 503 | `SIGESA_DB_UNAVAILABLE` | |

> **Nota:** códigos cortos del FSD (`DOC_SIZE`, `AUTH_INVALID`) se exponen con prefijo `SIGESA_` en producción para namespacing.

---

## 2. Catálogo de endpoints

| Método | Ruta | UC | Rol |
|--------|------|-----|-----|
| POST | `/auth/login` | UC-001 | — |
| GET | `/auth/me` | UC-001 | CC, TD, JD |
| GET | `/dashboard/resumen` | UC-004 | JD |
| POST | `/documentos` | UC-002 | CC |
| GET | `/documentos/{id}` | UC-002, UC-007 | CC, TD, JD |
| GET | `/indicadores/{id}` | UC-003 | CC, TD, JD |
| PATCH | `/indicadores/{id}/decision` | UC-003 | TD |
| POST | `/subfases/{id}/avance` | UC-003 | TD |
| POST | `/reportes/pdf` | UC-005 | JD |
| GET | `/reportes/jobs/{jobId}` | UC-005 | JD |
| GET | `/busqueda/documentos` | UC-007 | TD, JD |
| GET | `/publico/carreras/{slugOrId}` | UC-008 | — |
| GET | `/auditoria/eventos` | UC-009 | JD |
| GET | `/auditoria/eventos/export` | UC-009 | JD |
| POST | `/procesos` | UC-010 | JD |
| GET | `/procesos/{id}` | UC-010 | CC, TD, JD |
| GET | `/plantillas` | UC-010 | JD |
| GET | `/health/backups` | UC-011 | JD |
| POST | `/planes-mejora` | UC-012 | CC |
| PATCH | `/planes-mejora/{id}` | UC-012 | CC, TD |
| POST | `/catalogo/carreras` | — | JD |
| POST | `/catalogo/carreras/{id}/asignaciones` | UC-001 | JD |
| POST | `/publicacion/carreras/{id}` | UC-008 | JD |

---

## 3. Módulo Identidad — UC-001

### POST `/auth/login`

Autenticación con correo institucional.

| Aspecto | Valor |
|---------|-------|
| **RB** | RB-06 |
| **CN** | CN-04 (bloqueo intentos) |

**Request**

```json
{
  "email": "coord.test@umss.edu.bo",
  "password": "********"
}
```

**Response 200**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 28800,
  "tokenType": "Bearer",
  "usuario": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "email": "coord.test@umss.edu.bo",
    "rol": "CC",
    "carreraIds": ["22222222-2222-2222-2222-222222222222"]
  }
}
```

| HTTP | Código | Condición |
|------|--------|-----------|
| 401 | `SIGESA_AUTH_INVALID` | Credenciales incorrectas |
| 403 | `SIGESA_AUTH_DOMAIN` | Dominio ≠ `@umss.edu.bo` |
| 403 | `SIGESA_AUTH_INACTIVE` | Usuario inactivo |
| 429 | `SIGESA_AUTH_LOCKED` | 5 intentos / 15 min |

---

### GET `/auth/me`

Perfil del usuario autenticado.

**Response 200**

```json
{
  "id": "uuid",
  "email": "td.test@umss.edu.bo",
  "rol": "TD",
  "carreraIds": [],
  "activo": true
}
```

---

## 4. Módulo Documental — UC-002

### POST `/documentos`

Carga multipart de evidencia con versionado.

| Aspecto | Valor |
|---------|-------|
| **Content-Type** | `multipart/form-data` |
| **RB** | RB-02, RB-04, BR-015 |
| **CN** | CN-01, CN-02 |

**Campos form**

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| `archivo` | file | Sí |
| `indicadorId` | uuid | Sí |
| `descripcionCambio` | string | Sí (min 1) |

**Response 201**

```json
{
  "id": "f7c2b0a1-1234-5678-9abc-def012345678",
  "indicadorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "version": 2,
  "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "nombreArchivo": "malla.pdf",
  "mime": "application/pdf",
  "tamano": 2097152,
  "indicadorEstado": "EN_REVISION",
  "storageKey": "umss/2026/indicadores/a1b2.../v2/malla.pdf",
  "creadoEn": "2026-05-14T18:30:00Z"
}
```

| HTTP | Código |
|------|--------|
| 400 | `SIGESA_EVIDENCE_CRITERION_REQUIRED` (sin `indicadorId`) |
| 403 | `SIGESA_DOC_UNAUTHORIZED` |
| 413 | `SIGESA_DOC_SIZE` |
| 415 | `SIGESA_DOC_MIME` |
| 409 | `SIGESA_DOC_INDICATOR_CLOSED` |
| 502 | `SIGESA_STORAGE_ERROR` |

**Ejemplo HTTP**

```http
POST /api/v1/documentos HTTP/1.1
Host: sigesa.umss.edu.bo
Authorization: Bearer eyJhbGciOi...
Idempotency-Key: 7c9e6679-7425-40de-944b-e07fc1f90ae7
Content-Type: multipart/form-data; boundary=----sigesa

------sigesa
Content-Disposition: form-data; name="indicadorId"

a1b2c3d4-e5f6-7890-abcd-ef1234567890
------sigesa
Content-Disposition: form-data; name="descripcionCambio"

Actualización malla 2026 — TEST_evidencia
------sigesa
Content-Disposition: form-data; name="archivo"; filename="malla.pdf"
Content-Type: application/pdf

(binary)
------sigesa--
```

---

### GET `/documentos/{id}`

Metadatos y URL firmada temporal de descarga (no persistir URL larga en logs).

**Query:** `?disposition=inline|attachment`

**Response 200**

```json
{
  "id": "uuid",
  "version": 2,
  "indicadorId": "uuid",
  "hash": "sha256hex",
  "descripcion": "Actualización malla 2026",
  "estado": "EN_REVISION",
  "downloadUrl": "https://storage.../signed?...",
  "downloadUrlExpiresAt": "2026-05-14T19:00:00Z"
}
```

---

## 5. Módulo Workflow — UC-003

### GET `/indicadores/{id}`

Detalle con versiones de documento.

**Response 200**

```json
{
  "id": "uuid",
  "codigo": "IND-1.2",
  "nombre": "Malla curricular",
  "criterio": "Criterio CEUB ...",
  "estado": "EN_REVISION",
  "obligatorio": true,
  "subfaseId": "uuid",
  "documentos": [
    {
      "id": "uuid",
      "version": 2,
      "vigente": true,
      "creadoEn": "2026-05-14T18:30:00Z",
      "autorEmail": "coord@umss.edu.bo"
    }
  ],
  "justificacionRechazo": null
}
```

---

### PATCH `/indicadores/{id}/decision`

Dictamen [TD]: aprobar o rechazar.

| **RB** | RB-03, CN-03 |

**Request**

```json
{
  "accion": "RECHAZAR",
  "justificacion": "Falta firma del director en el documento presentado."
}
```

**Response 200**

```json
{
  "indicadorId": "uuid",
  "estado": "RECHAZADO",
  "actualizadoEn": "2026-05-14T19:15:00Z",
  "tecnicoId": "uuid"
}
```

| HTTP | Código |
|------|--------|
| 422 | `SIGESA_VAL_JUSTIFICATION_SHORT` |
| 409 | `SIGESA_WF_INVALID_STATE`, `SIGESA_WF_CONFLICT` |

---

### POST `/subfases/{id}/avance`

Cierre de subfase y habilitación de la siguiente.

**Request**

```json
{
  "confirmar": true
}
```

**Response 200**

```json
{
  "subfaseId": "uuid",
  "nuevoEstado": "CERRADA",
  "siguienteSubfaseId": "uuid-or-null"
}
```

**Response 409**

```json
{
  "error": {
    "code": "SIGESA_WF_INCOMPLETE",
    "message": "No se puede cerrar la subfase: hay indicadores obligatorios pendientes.",
    "hint": "Revise la lista indicadoresPendientes.",
    "details": []
  },
  "indicadoresPendientes": [
    { "id": "uuid", "codigo": "IND-2.1", "estado": "PENDIENTE" }
  ],
  "requestId": "..."
}
```

---

## 6. Módulo Dashboard — UC-004

### GET `/dashboard/resumen`

Agregados para [JD] con semáforos (RB-09).

**Query**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `facultadId` | uuid | Filtro facultad |
| `tipo` | string | `CEUB` \| `ARCU_SUR` |
| `gestion` | int | Año YYYY |
| `staleOk` | boolean | Aceptar cache con flag stale |

**Response 200**

```json
{
  "generadoEn": "2026-05-14T20:00:00Z",
  "stale": false,
  "items": [
    {
      "carreraId": "uuid",
      "nombre": "TEST_IngenieriaSistemas",
      "facultad": "Ciencias y Tecnología",
      "tipoAcreditacion": "CEUB",
      "gestion": 2026,
      "semaforo": "VERDE",
      "porcentajeAvance": 85.5,
      "alertas": [
        { "tipo": "PLAZO", "mensaje": "Subfase 3 vence en 5 días" }
      ]
    }
  ]
}
```

| Rol | Acceso |
|-----|--------|
| JD | Completo |
| TD | Could: vista filtrada (v1.1) |

---

## 7. Módulo Reportes — UC-005

### POST `/reportes/pdf`

Encola o genera PDF ejecutivo (RB-07).

**Request**

```json
{
  "alcance": "FACULTAD",
  "referenciaId": "11111111-1111-1111-1111-111111111111",
  "gestion": 2026
}
```

| `alcance` | `referenciaId` |
|-----------|----------------|
| `UNIVERSIDAD` | null |
| `FACULTAD` | uuid facultad |
| `CARRERA` | uuid carrera |

**Response 202** (async)

```json
{
  "jobId": "uuid",
  "estado": "ENCOLADO",
  "estimadoSegundos": 120
}
```

**Response 200** (sync, volumen bajo)

```json
{
  "jobId": "uuid",
  "estado": "LISTO",
  "downloadUrl": "https://...",
  "clasificacion": "USO_INTERNO"
}
```

---

### GET `/reportes/jobs/{jobId}`

Estado del job y enlace de descarga cuando `LISTO`.

**Response 200**

```json
{
  "jobId": "uuid",
  "estado": "LISTO",
  "downloadUrl": "https://...",
  "downloadUrlExpiresAt": "2026-05-14T21:00:00Z",
  "clasificacion": "USO_INTERNO"
}
```

---

## 8. Módulo Búsqueda — UC-007

### GET `/busqueda/documentos`

**Query:** `q`, `facultadId`, `carreraId`, `gestion`, `cursor`, `limit`

**Response 200**

```json
{
  "items": [
    {
      "documentoId": "uuid",
      "indicadorId": "uuid",
      "carreraNombre": "TEST_CarreraA",
      "version": 1,
      "descripcion": "Evidencia inicial",
      "creadoEn": "2026-05-01T10:00:00Z"
    }
  ],
  "nextCursor": null,
  "hasMore": false
}
```

| HTTP | Código |
|------|--------|
| 400 | `SIGESA_SEARCH_BAD_QUERY` |

---

## 9. Módulo Público — UC-008

### GET `/publico/carreras/{slugOrId}`

Sin autenticación; rate limit por IP.

**Response 200**

```json
{
  "nombre": "TEST_CarreraPublica",
  "facultad": "Facultad de Ejemplo",
  "estadoAcreditacion": "ACREDITADA_CEUB",
  "vigenciaHasta": "2028-12-31",
  "textoResumen": "Carrera acreditada según resolución publicada por DUEA.",
  "ultimaActualizacion": "2026-05-01T00:00:00Z"
}
```

| HTTP | Código |
|------|--------|
| 404 | `SIGESA_PUBLIC_NOT_FOUND` |
| 429 | `SIGESA_RATE_LIMIT` |

---

### POST `/publicacion/carreras/{carreraId}`

Publicar o ocultar vista pública (RB-11-PUB). Solo [JD].

**Request**

```json
{
  "estadoVisible": "VISIBLE",
  "slug": "test-carrera-publica",
  "textoResumen": "Texto oficial UMSS",
  "vigenciaHasta": "2028-12-31"
}
```

**Response 200**

```json
{
  "carreraId": "uuid",
  "estadoVisible": "VISIBLE",
  "publicadoEn": "2026-05-14T12:00:00Z"
}
```

---

## 10. Módulo Auditoría — UC-009

### GET `/auditoria/eventos`

**Query:** `desde`, `hasta` (ISO date), `usuarioId`, `accion`, `cursor`, `limit`

**Response 200**

```json
{
  "items": [
    {
      "id": 10042,
      "usuarioId": "uuid",
      "accion": "CARGA",
      "entidadTipo": "DOCUMENTO",
      "entidadId": "uuid",
      "creadoEn": "2026-05-14T18:30:00Z",
      "metadatos": { "indicadorId": "uuid", "version": 2 }
    }
  ],
  "nextCursor": "...",
  "hasMore": true
}
```

---

### GET `/auditoria/eventos/export`

Export CSV; rango > 365 días → **202** con `jobId` async.

**Query:** mismos filtros + `formato=csv`

---

## 11. Módulo Procesos — UC-010

### GET `/plantillas`

Lista plantillas CEUB/ARCU-SUR vigentes.

**Query:** `tipo`, `vigente=true`

**Response 200**

```json
{
  "items": [
    {
      "id": "uuid",
      "tipoAcreditacion": "CEUB",
      "version": 3,
      "vigenteDesde": "2026-01-01"
    }
  ]
}
```

---

### POST `/procesos`

Crear proceso de acreditación (RB-01, RB-08, BR-013).

**Request**

```json
{
  "carreraId": "22222222-2222-2222-2222-222222222222",
  "tipoAcreditacion": "CEUB",
  "organismo": "CEUB",
  "gestion": 2026,
  "plantillaId": "uuid",
  "fechaInicio": "2026-03-01",
  "fechaFin": "2026-12-15",
  "fechaLimiteExterna": "2026-11-30",
  "tdReferenteId": "uuid"
}
```

**Response 201**

```json
{
  "procesoId": "uuid",
  "estado": "EN_PROCESO",
  "fasesCreadas": 5,
  "indicadoresCreados": 42
}
```

| HTTP | Código |
|------|--------|
| 422 | `SIGESA_NORM_ARCU_REQUIRES_CEUB` |
| 409 | `SIGESA_PROC_DUPLICATE` |
| 400 | `SIGESA_VAL_PROCESS_METADATA` |

---

### GET `/procesos/{id}`

Árbol fases → subfases → indicadores (resumen estados).

---

## 12. Módulo Operaciones — UC-011

### GET `/health/backups`

**Response 200**

```json
{
  "ultimoDb": {
    "estado": "OK",
    "inicioEn": "2026-05-14T02:00:00Z",
    "finEn": "2026-05-14T02:12:00Z",
    "duracionSeg": 720
  },
  "ultimoObjetos": {
    "estado": "OK",
    "inicioEn": "2026-05-14T03:00:00Z",
    "finEn": "2026-05-14T03:45:00Z",
    "duracionSeg": 2700
  }
}
```

| Rol | Acceso |
|-----|--------|
| JD | Sí |
| Otros | 403 |

---

## 13. Módulo Plan de mejora — UC-012

### POST `/planes-mejora`

**Request**

```json
{
  "indicadorId": "uuid",
  "titulo": "Actualizar matriz de competencias TEST",
  "fechaObjetivo": "2026-08-01"
}
```

**Response 201**

```json
{
  "id": "uuid",
  "estado": "PROPUESTO",
  "indicadorId": "uuid"
}
```

---

### PATCH `/planes-mejora/{id}`

Transición de estado por [CC] o [TD].

**Request**

```json
{
  "estado": "CERRADO",
  "comentario": "Evidencia de cumplimiento adjunta."
}
```

| HTTP | Código |
|------|--------|
| 422 | `SIGESA_PLAN_CLOSE_WITHOUT_EVIDENCE` |

---

## 14. Módulo Catálogo — administración

### POST `/catalogo/carreras`

Alta carrera (JD). Ver `gherkin.md` UC-SIG-01.

**Request**

```json
{
  "facultadId": "11111111-1111-1111-1111-111111111111",
  "codigo": "TEST-INF-SIS",
  "nombre": "TEST_IngenieriaSistemas",
  "modalidad": "PRESENCIAL"
}
```

| HTTP | Código |
|------|--------|
| 409 | `SIGESA_CAT_DUPLICATE_CODE` |

---

### POST `/catalogo/carreras/{carreraId}/asignaciones`

Asignar [CC] a carrera.

**Request**

```json
{
  "usuarioId": "uuid",
  "email": "coord.test@umss.edu.bo"
}
```

---

## 15. Matriz endpoint → reglas → pruebas

| Endpoint | Reglas | TC / Gherkin |
|----------|--------|--------------|
| POST `/auth/login` | RB-06 | TC-01, TC-02 |
| POST `/documentos` | RB-02, RB-04, BR-015 | TC-03–05 |
| PATCH `/indicadores/.../decision` | RB-03 | TC-06, TC-07 |
| POST `/subfases/.../avance` | RB-03, BR-014 | TC-08 |
| GET `/dashboard/resumen` | RB-09 | TC-09, TC-10 |
| POST `/reportes/pdf` | RB-07 | TC-11, TC-12 |
| GET `/busqueda/documentos` | — | TC-14 |
| POST `/procesos` | RB-01, RB-08, BR-013 | UC-010 |
| GET `/publico/...` | RB-07, RB-11-PUB | UC-008 |

---

## 16. Seguridad transversal

| Control | Descripción |
|---------|-------------|
| TLS 1.2+ | Obligatorio en producción |
| Rate limit | Login: por IP+email; público: por IP |
| CORS | Orígenes UMSS en whitelist |
| Upload | Escaneo MIME + límite tamaño en gateway |
| Logs | Sin password, sin JWT completo, sin URL firmada larga |
| RBAC | Middleware por ruta según matriz §2 |

---

## 17. OpenAPI y evolución

| Artefacto | Ubicación sugerida |
|-----------|-------------------|
| OpenAPI 3.1 | `openapi/sigesa-v1.yaml` (generar desde este doc en implementación) |
| Postman | Colección exportada desde OpenAPI |
| Prompt contracts | `team/Marlene/06_prompt_contracts/prompt_contracts.md` |

**Registro de cambios**

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Contratos REST v1 unificados desde FSD §18 |

---

*Persistencia: `modelo_datos.md`. Comportamiento: `casos_uso.md`. Verificación: `gherkin.md`.*
