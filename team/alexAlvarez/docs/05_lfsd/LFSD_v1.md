# LFSD — SIGESA v1.0

> **Lightweight Functional Specification Document** — modo compacto orientado a implementación y prompt-contratos IA. Complementa el FSD clásico descompuesto en [`../04_fsd/`](../04_fsd/).

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA — Sistema de automatización del ciclo de acreditación CEUB/ARCU-SUR (UMSS) |
| Grupo | `team/alexAlvarez` |
| Versión | **v1.0** |
| Fecha | 2026-05-17 |
| Autor | Alexander James Alvarez |
| Modo | **LFSD** + FSD clásico ([`../04_fsd/FSD.md`](../04_fsd/FSD.md)) |
| BRD | [`../01_brd/BRD.md`](../01_brd/BRD.md) |
| PRD | [`../03_prd/PRD.md`](../03_prd/PRD.md) |
| FSD detalle | [`../04_fsd/casos_uso.md`](../04_fsd/casos_uso.md) |
| Gherkin | [`../04_fsd/gherkin.md`](../04_fsd/gherkin.md) |
| API | [`../04_fsd/api_contracts.md`](../04_fsd/api_contracts.md) |
| NFR | [`../05_nfr/NFR_ISO25010.md`](../05_nfr/NFR_ISO25010.md) |
| Máquina de estados | [`../context/04_state_machine.md`](../context/04_state_machine.md) |
| Fase Spec Kit | Specify / Plan / Tasks (Implement pendiente) |

---

## 1. Objetivo LFSD

Derivar de PRD y FSD una especificación **ejecutable** para desarrollo y agentes IA: flujos críticos con **invariantes**, **failure modes** con códigos HTTP y **Gherkin mínimo** alineado a [`gherkin.md`](../04_fsd/gherkin.md).

**Módulos v1.0 cubiertos por este LFSD:**

| # | Módulo | LFSD | FSD-UC | Task |
|---|--------|------|--------|------|
| 1 | Autenticación y sesión UMSS | UC-L01 | FSD-UC-001 | T-001 |
| 2 | Plantillas y proceso CEUB/ARCU-SUR | UC-L02 | FSD-UC-003 | T-002 |
| 3 | Carga de Evidencia versionada | UC-L03 | FSD-UC-004 | T-003 |
| 4 | Subsanación append-only | UC-L04 | FSD-UC-006 | T-004 |
| 5 | Observación y rechazo [TD] | UC-L05 | FSD-UC-008 | T-005 |
| 6 | Aprobación y cierre de Fase | UC-L06 | FSD-UC-009, UC-010 | T-006 |
| 7 | Panel semáforo [JD] | UC-L07 | FSD-UC-013 | T-007 |

Los demás `FSD-UC-002`…`018` permanecen solo en FSD clásico hasta priorización de sprint.

---

## 2. Actores

| Actor | Tipo | Permisos clave |
|-------|------|----------------|
| [CC] | Humano | Carga/subsana **Evidencia** en su carrera |
| [TD] | Humano | Observa, aprueba/rechaza **Indicador**; cierra **Fase** |
| [JD] | Humano | Plantillas, procesos, panel, publicación |
| [P] | Humano | Solo lectura portal publicado |
| Sistema notificaciones | Sistema | Cola SMTP ≤ 15 min |
| Sistema auditoría | Sistema | `audit_log` append-only |

---

## 3. Casos de uso críticos

### UC-L01 — Autenticación y sesión

**FSD-UC:** `FSD-UC-001` · **PRD:** PRD-REQ-001, PRD-US-001 · **Reglas:** FSD-BR-12

**Precondiciones:**
1. Usuario en `app_user` con email `@umss.edu.bo` y estado `ACTIVO`.
2. Rol y `programScope` asignados.

**Flujo principal:**
1. Usuario envía email y contraseña a `POST /api/v1/auth/login`.
2. El sistema valida dominio institucional y credenciales (`LocalAuthAdapter` v1.0).
3. El sistema emite JWT (8 h) con `{ userId, role, programScope }`.
4. Redirección por rol: [CC] dashboard carrera; [TD] bandeja; [JD] panel.
5. Inserta evento `AUDIT_LOGIN` en bitácora.

**Invariantes:**
- Solo dominio `@umss.edu.bo`; mensaje genérico en fallo de credenciales.
- Tras 5 intentos fallidos: bloqueo 15 min (sin revelar qué campo falló).
- Operaciones sensibles exigen JWT válido en cada request.

**Failure modes:**

| Código | Trigger | Respuesta |
|--------|---------|-----------|
| `AUTH_INVALID_DOMAIN` | Email sin `@umss.edu.bo` | 401 |
| `AUTH_INVALID_CREDENTIALS` | Password incorrecto | 401 genérico |
| `AUTH_USER_INACTIVE` | Cuenta desactivada por [JD] | 403 |
| `AUTH_TOO_MANY_ATTEMPTS` | ≥ 5 fallos | 429 |
| `AUTH_REQUIRED` | Request sin token | 401 |

**Gherkin:** [`../04_fsd/gherkin.md`](../04_fsd/gherkin.md) `@PRD-US-001` · `@TC-SAD-AUTH`

---

### UC-L02 — Plantillas y Proceso

**FSD-UC:** `FSD-UC-003` · **PRD:** PRD-US-024 · **Diagrama:** [`UC03_secuencia.mmd`](../07_diagramas/UC03_secuencia.mmd)

**Precondiciones:** Plantilla CEUB o ARCU-SUR validada; actor [JD].

**Flujo principal:**
1. [JD] activa plantilla para periodo (`POST /templates/{id}/activate`).
2. [JD] crea proceso (`POST /processes`) para `academic_program`.
3. El sistema instancia **Fases** e **Indicadores**; proceso `EN_PROCESO`.
4. Notifica al [CC] de la carrera.

**Invariantes:**
- Un solo proceso activo por carrera + modalidad + gestión (FSD-BR-08).
- ARCU-SUR requiere CEUB vigente (FSD-BR-17).
- Proceso en curso no cambia de plantilla mid-flight.

**Failure modes:**

| Código | Trigger | Respuesta |
|--------|---------|-----------|
| `PROCESS_ALREADY_ACTIVE` | Duplicado activo | 409 |
| `FORBIDDEN_ROLE` | No [JD] | 403 |
| `TEMPLATE_NOT_ACTIVE` | Plantilla archivada | 422 |

---

### UC-L03 — Cargar Evidencia

**FSD-UC:** `FSD-UC-004` · **PRD:** PRD-US-002 · **Diagrama:** [`UC02_secuencia.mmd`](../07_diagramas/UC02_secuencia.mmd)

**Precondiciones:** [CC] autenticado; proceso activo; **Indicador** en `PENDIENTE` o subsanación permitida.

**Flujo principal:**
1. [CC] selecciona **Indicador** en árbol normativo (sin carga huérfana).
2. [CC] envía `multipart` con archivo (PDF, DOCX, XLSX, JPG, PNG; ≤ 50 MB).
3. El sistema valida alcance de carrera, calcula SHA-256, persiste blob + `evidence_version` v1.
4. Transición **Indicador** → `SUBIDO`; auditoría + notificación [TD].

**Invariantes:**
- Solo [CC] carga en su carrera (FSD-BR-09).
- **Evidencia** siempre ligada a **Indicador** (FSD-BR-01).
- Versionado incremental; sin sobrescritura in-place (FSD-BR-02).
- Barra de progreso si archivo > 5 MB (NFR-011).

**Failure modes:**

| Código | Trigger | Respuesta |
|--------|---------|-----------|
| `EVIDENCE_UNCLASSIFIED` | Sin indicadorId | 422 |
| `FORBIDDEN_ROLE` | [TD] sin delegación | 403 |
| `DOC_INVALID_FORMAT` | MIME no permitido | 400 |
| `DOC_FILE_TOO_LARGE` | > 50 MB | 422 |
| `DOC_STORAGE_ERROR` | Fallo volumen/blob | 503 |

**Gherkin:** `@PRD-US-002` · `@TC-SAD-MIME`

---

### UC-L04 — Subsanar Evidencia

**FSD-UC:** `FSD-UC-006` · **PRD:** PRD-US-003, 025 · **Diagrama:** [`UC01_secuencia.mmd`](../07_diagramas/UC01_secuencia.mmd)

**Precondiciones:** **Indicador** `OBSERVADO`; **Observación** abierta.

**Flujo principal:**
1. [CC] carga nueva versión (`POST /evidences/{id}/versions`) con `observationId`.
2. El sistema enlaza `supersedes_id` a versión anterior (append-only).
3. Transición → `SUBSANADO`; notifica [TD].

**Invariantes:**
- Versión n-1 permanece en historial (BRD-CST-01).
- `DELETE` sobre aprobado → siempre rechazado (NFR-017).

**Failure modes:**

| Código | Trigger | Respuesta |
|--------|---------|-----------|
| `EVIDENCE_IMMUTABLE` | DELETE o replace aprobado | 409 |
| `OBSERVATION_LINK_REQUIRED` | Subsanación sin observación | 422 |
| `OBSERVATION_CLOSED` | Plazo vencido | 409 |

**Gherkin:** `@PRD-US-003` · `@TC-SAD-DELETE`

---

### UC-L05 — Observación [TD]

**FSD-UC:** `FSD-UC-008` · **PRD:** PRD-US-009

**Flujo principal:**
1. [TD] revisa **Evidencia** e historial de versiones.
2. [TD] rechaza con justificación (`PATCH /indicators/{id}/reject`).
3. **Indicador** → `OBSERVADO`; notifica [CC] ≤ 15 min.

**Invariantes:**
- Justificación obligatoria ≥ 20 caracteres (FSD-BR-05).
- Solo [TD] registra observación formal (FSD-BR-04).

**Failure modes:**

| Código | Trigger | Respuesta |
|--------|---------|-----------|
| `JUSTIFICATION_REQUIRED` | Texto vacío o corto | 422 |
| `FORBIDDEN_ROLE` | [CC] intenta rechazar | 403 |
| `AUDIT_INVALID_STATE` | Indicador no `SUBIDO` | 422 |

**Gherkin:** `@PRD-US-009` · `@TC-SAD-JUST`

---

### UC-L06 — Aprobar Indicador y cerrar Fase

**FSD-UC:** `FSD-UC-009`, `FSD-UC-010` · **Diagramas:** [`UC01_estado.mmd`](../07_diagramas/UC01_estado.mmd), [`UC03_estado.mmd`](../07_diagramas/UC03_estado.mmd)

**Flujo aprobación:**
1. [TD] `PATCH /indicators/{id}/approve` cuando evidencia cumple.
2. **Indicador** → `APROBADO`.

**Flujo cierre fase:**
1. [TD] `PATCH /phases/{id}/close` solo si ∀ indicadores `APROBADO`.
2. **Fase** → `COMPLETADA`.

**Invariantes:**
- Cierre bloqueado si ∃ indicador ≠ `APROBADO` (FSD-BR-07).
- [CC] no puede aprobar (FSD-BR-03).

**Failure modes:**

| Código | Trigger | Respuesta |
|--------|---------|-----------|
| `FASE_CIERRE_BLOQUEADO` | Pendientes en fase | 409 + `pendingIndicators[]` |
| `FORBIDDEN_ROLE` | [CC] aprueba | 403 |

**Gherkin:** `@PRD-US-023` `@PRD-US-014` · `@TC-SAD-APPROVE` · `@TC-SAD-PHASE`

---

### UC-L07 — Panel semáforo [JD]

**FSD-UC:** `FSD-UC-013` · **PRD:** PRD-US-013, 015

**Flujo principal:**
1. [JD] abre panel global post-login.
2. El sistema calcula avance por carrera y asigna semáforo (verde / amarillo / rojo).
3. Filtros por facultad, modalidad, gestión.

**Invariantes:**
- Solo [JD] ve vista global consolidada.
- Consulta representativa ≤ 2 min E2E (NFR-002, BRD-KPI-01).

**Failure modes:**

| Código | Trigger | Respuesta |
|--------|---------|-----------|
| `DASH_UNAUTHORIZED` | Rol ≠ [JD] | 403 |
| `DASH_NO_DATA` | Sin procesos activos | 200 vacío + mensaje |
| `DASH_TIMEOUT` | p95 > umbral | degradación + alerta ops |

---

## 4. Reglas de negocio (LFSD — subset)

| ID | Regla | UC-L |
|----|-------|------|
| FSD-BR-01 | Evidencia ligada a Indicador | L03 |
| FSD-BR-02 | Append-only; sin DELETE aprobados | L03, L04 |
| FSD-BR-03 | Solo [TD] aprueba/rechaza | L05, L06 |
| FSD-BR-05 | Justificación obligatoria al rechazar | L05 |
| FSD-BR-06 | Subsanación enlaza Observación | L04 |
| FSD-BR-07 | Cierre Fase solo si todos APROBADO | L06 |
| FSD-BR-08 | Un proceso activo por carrera/modalidad | L02 |
| FSD-BR-09 | [CC] solo su carrera | L03 |
| FSD-BR-12 | Dominio @umss.edu.bo | L01 |

Catálogo completo: [`../04_fsd/reglas_negocio.md`](../04_fsd/reglas_negocio.md)

---

## 5. Modelo de datos core (resumen)

| Entidad | Atributos clave | Restricción |
|---------|-----------------|-------------|
| `app_user` | email, role, programScope | email `@umss.edu.bo` |
| `accreditation_process` | programId, templateId, estado | único activo |
| `indicator` | estado | máquina de estados |
| `evidence_version` | version, supersedes_id, content_sha256 | solo INSERT |
| `observation` | justification | ≥ 20 chars si rechazo |
| `audit_log` | action_code, payload | append-only |

Detalle: [`../04_fsd/modelo_datos.md`](../04_fsd/modelo_datos.md) · DDL [`../../../../docs/05_dti/ddl_sigesa_append_only.sql`](../../../../docs/05_dti/ddl_sigesa_append_only.sql)

---

## 6. Prompt-contratos (implementación IA)

| PC ID | UC-L | FSD-UC | Archivo detalle |
|-------|------|--------|-----------------|
| PC-L01 | UC-L01 | UC-001 | [`../04_fsd/gherkin.md`](../04_fsd/gherkin.md) |
| PC-L03 | UC-L03 | UC-004 | [`../04_fsd/api_contracts.md`](../04_fsd/api_contracts.md) § evidencias |
| PC-L04 | UC-L04 | UC-006 | Invariante append-only — NFR-017 |
| PC-L05 | UC-L05 | UC-008 | Endpoint semántico `reject` |
| PC-L06 | UC-L06 | UC-009, UC-010 | No PATCH genérico de estado |

**Plantilla PC (resumen):**

```markdown
# Role
Módulo SIGESA — dominio acreditación UMSS (CEUB/ARCU-SUR).

# Task
Implementar {FSD-UC-00N} respetando máquina de estados y RBAC.

# Context
- Actores: [CC], [TD], [JD] según UC.
- API base: /api/v1
- Reglas: FSD-BR-* citadas en LFSD §4.

# Stop condition
Abortar si la solución permite DELETE físico de Evidencia aprobada
o salto de estado no definido en 04_state_machine.md.

# Output
Handlers + tests con @Tag("FSD-UC-00N") @Tag("NFR-xxx")
```

Contratos extendidos estilo AcredIA: [`../../aylenGonzales/05_lfsd/LFSD_v1_aylen.md`](../../aylenGonzales/05_lfsd/LFSD_v1_aylen.md) §6.

---

## 7. NFRs críticos (LFSD)

| ID | Umbral | UC-L | Verificación |
|----|--------|------|--------------|
| NFR-001 | API p95 < 500 ms | L07 | k6 |
| NFR-002 | Búsqueda E2E ≤ 2 min | L03 | UAT |
| NFR-004 | Notificación ≤ 15 min | L03, L05 | outbox |
| NFR-017 | DELETE bloqueado 100 % | L04 | TC-SAD-DELETE |
| NFR-018 | Transición ilegal bloqueada | L05, L06 | TC-SAD-* |

Detalle: [`../05_nfr/NFR_ISO25010.md`](../05_nfr/NFR_ISO25010.md)

---

## 8. Trazabilidad LFSD ↔ FSD ↔ PRD

| UC-L | FSD-UC | PRD-US | PRD-REQ | Gherkin | Diagrama |
|------|--------|--------|---------|---------|----------|
| UC-L01 | UC-001 | 001 | 001 | Sí | — |
| UC-L02 | UC-003 | 024 | — | Parcial | UC03_secuencia |
| UC-L03 | UC-004 | 002 | 002 | Sí | UC02_secuencia |
| UC-L04 | UC-006 | 003, 025 | 002 | Sí | UC01_secuencia |
| UC-L05 | UC-008 | 009 | 003 | Sí | UC02_secuencia |
| UC-L06 | UC-009, 010 | 023, 014 | — | Sí | UC01/UC03_estado |
| UC-L07 | UC-013 | 013, 015 | — | Pendiente | — |

---

## 9. Tasks ejecutables (Spec Kit)

| Task | Descripción | FSD-UC | Dependencias | Estado |
|------|-------------|--------|--------------|--------|
| T-001 | Auth JWT + dominio UMSS | UC-001 | — | Pendiente |
| T-002 | Plantillas + `POST /processes` | UC-003 | T-001 | Pendiente |
| T-003 | `POST /evidences` multipart + hash | UC-004 | T-001, T-002 | Pendiente |
| T-004 | `POST /evidences/{id}/versions` subsanación | UC-006 | T-003 | Pendiente |
| T-005 | `PATCH .../reject` + observación | UC-008 | T-003 | Pendiente |
| T-006 | Approve + `PATCH /phases/.../close` | UC-009, 010 | T-005 | Pendiente |
| T-007 | Panel semáforo [JD] | UC-013 | T-006 | Pendiente |
| T-008 | Búsqueda evidencias | UC-007 | T-003 | Pendiente |
| T-009 | Notificaciones outbox | UC-015 | T-005 | Pendiente |
| T-010 | PDF ejecutivo | UC-014 | T-007 | Pendiente |
| T-011 | Portal [P] | UC-016 | T-002 | Pendiente |
| T-012 | `audit_log` transversal | UC-017 | T-001 | Pendiente |

---

## 10. Riesgos top-4

| Riesgo | Prob. | Impacto | Mitigación |
|--------|-------|---------|------------|
| Canal paralelo (correo/WhatsApp) para evidencias | Alta | Alto | Política DUEA: SIGESA único canal válido |
| Fallo SMTP institucional | Media | Alto | Cola reintentos + alerta [JD] |
| Confusión Fase vs. Etapa en UI | Media | Medio | Glosario [`../04_fsd/glosario.md`](../04_fsd/glosario.md) |
| Implementación PATCH genérico de estado | Media | Alto | Solo endpoints semánticos (LFSD §3 UC-L06) |

---

## 11. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 2026-05-17 | LFSD inicial desde FSD v1.0 Alex; 7 UC críticos; mapeo FSD-UC; failure modes API; tasks T-001…012 |
