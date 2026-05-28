# Casos de uso — SIGESA / AcredIA

| Campo | Valor |
|-------|-------|
| **Ámbito** | `team/alexAlvarez/docs/04_fsd/` |
| **Versión** | v1.0 |
| **Fecha** | 17/05/2026 |
| **Índice maestro** | [`FSD.md`](FSD.md) |
| **Gherkin** | [`gherkin.md`](gherkin.md) |
| **Diagramas** | [`../07_diagramas/`](../07_diagramas/) |
| **LFSD** | [`../05_lfsd/LFSD_v1.md`](../05_lfsd/LFSD_v1.md) (UC críticos con failure modes) |

> Especificación funcional verificable. Patrón: **El sistema debe…** en postcondiciones. Estados del **Indicador**: `PENDIENTE`, `SUBIDO`, `OBSERVADO`, `SUBSANADO`, `APROBADO`.

---

## Índice de casos de uso

| ID | Nombre | Actor | PRD-US | LFSD | Diagrama |
|----|--------|-------|--------|------|----------|
| [FSD-UC-001](#fsd-uc-001) | Autenticación y sesión | Todos | 001 | [UC-L01](../05_lfsd/LFSD_v1.md#uc-l01--autenticación-y-sesión) | — |
| [FSD-UC-002](#fsd-uc-002) | Gestión de usuarios | [JD] | 002 | — | — |
| [FSD-UC-003](#fsd-uc-003) | Plantillas y Proceso CEUB/ARCU-SUR | [JD] | 024 | [UC-L02](../05_lfsd/LFSD_v1.md#uc-l02--plantillas-y-proceso) | [UC03](../07_diagramas/seq-003-03-secuencia.mmd) |
| [FSD-UC-004](#fsd-uc-004) | Cargar Evidencia | [CC] | 002 | [UC-L03](../05_lfsd/LFSD_v1.md#uc-l03--cargar-evidencia) | [UC02](../07_diagramas/seq-002-02-secuencia.mmd) |
| [FSD-UC-005](#fsd-uc-005) | Versionado append-only | [CC], [TD] | 010 | (en UC-L03/L04) | [UC02 estado](../07_diagramas/state-002-02-estado.mmd) |
| [FSD-UC-006](#fsd-uc-006) | Subsanar Evidencia | [CC] | 003, 025 | [UC-L04](../05_lfsd/LFSD_v1.md#uc-l04--subsanar-evidencia) | [UC01](../07_diagramas/seq-001-01-secuencia.mmd) |
| [FSD-UC-007](#fsd-uc-007) | Buscar Evidencia | [CC], [TD] | 001, 007 | — | — |
| [FSD-UC-008](#fsd-uc-008) | Registrar Observación | [TD] | 009 | [UC-L05](../05_lfsd/LFSD_v1.md#uc-l05--observación-td) | [UC02](../07_diagramas/seq-002-02-secuencia.mmd) |
| [FSD-UC-009](#fsd-uc-009) | Aprobar Indicador | [TD] | 023 | [UC-L06](../05_lfsd/LFSD_v1.md#uc-l06--aprobar-indicador-y-cerrar-fase) | [UC01 estado](../07_diagramas/state-001-01-estado.mmd) |
| [FSD-UC-010](#fsd-uc-010) | Avanzar / cerrar Fase | [TD] | 014, 023 | [UC-L06](../05_lfsd/LFSD_v1.md#uc-l06--aprobar-indicador-y-cerrar-fase) | [UC03](../07_diagramas/state-003-03-estado.mmd) |
| [FSD-UC-011](#fsd-uc-011) | Dashboard [CC] | [CC] | 004, 006, 025 | — | `figma/screenshots/cc-coordinador-home.png` |
| [FSD-UC-012](#fsd-uc-012) | Bandeja auditoría [TD] | [TD] | 007, 012 | — | `figma/screenshots/td-bandeja-tareas.png` |
| [FSD-UC-013](#fsd-uc-013) | Panel ejecutivo [JD] | [JD] | 015, 020 | [UC-L07](../05_lfsd/LFSD_v1.md#uc-l07--panel-semáforo-jd) | `figma/screenshots/jd-admin-dashboard.png` |
| [FSD-UC-014](#fsd-uc-014) | Reporte ejecutivo PDF | [JD] | 021 | — | — |
| [FSD-UC-015](#fsd-uc-015) | Notificaciones | Sistema | 005, 018, 019 | — | — |
| [FSD-UC-016](#fsd-uc-016) | Portal público | [P] | 016, 017 | — | — |
| [FSD-UC-017](#fsd-uc-017) | Bitácora de auditoría | [TD], [JD] | 026 | — | — |

---

## FSD-UC-001 — Autenticación y sesión

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | BRD-CST-05 · PRD-REQ-001 · PRD-US-001 |
| **Reglas** | FSD-BR-12 |

**Actor principal:** Usuario interno ([CC], [TD], [JD])

**Precondiciones:** Cuenta en `app_user` con correo `@umss.edu.bo`; rol asignado; cuenta `ACTIVO`.

**Disparador:** Submit en `/login`.

**Flujo principal:**
1. El sistema valida formato de correo institucional.
2. El sistema verifica credenciales (hash bcrypt o adaptador LDAP v1.1).
3. El sistema emite JWT (8 h) en cookie HttpOnly con `{ userId, role, programScope }`.
4. Redirige: [CC] → dashboard carrera; [TD] → bandeja auditoría; [JD] → panel ejecutivo.
5. Registra `AUDIT_LOGIN` en bitácora.

**Flujos alternos:**
- **A1 — Credenciales inválidas:** HTTP 401 mensaje genérico; incrementa contador de fallos; bloqueo tras 5 intentos / 15 min.
- **A2 — Sin rol:** HTTP 403; notifica [JD].
- **E3 — Sin sesión en operación sensible:** HTTP 401; sin cambio de estado.

**Postcondiciones:** Sesión activa con RBAC aplicado en cada request subsiguiente.

---

## FSD-UC-003 — Plantillas y Proceso CEUB/ARCU-SUR

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | BRD-SCP-IN-01 · PRD-US-024 |
| **Reglas** | FSD-BR-08, FSD-BR-17, FSD-BR-19 |
| **Diagrama** | [`seq-003-03-secuencia.mmd`](../07_diagramas/seq-003-03-secuencia.mmd) |
| **Mockup** | `figma/screenshots/jd-admin-dashboard.png` (node `435:450`) |

**Actor principal:** [JD]

**Precondiciones:** Plantilla normativa validada por comité DUEA.

**Flujo principal:**
1. [JD] activa plantilla CEUB o ARCU-SUR para el periodo.
2. El sistema fija taxonomía **Fase → Dimensión → Criterio → Indicador** en catálogo.
3. [JD] crea `accreditation_process` para una `academic_program`, seleccionando los tipos de fase de evaluación:
   - **Fase 1 — Autoevaluación:** el [CC] recopila y carga Evidencias de forma masiva.
   - **Fase 2 — Evaluación Interna:** el [TD] audita; el [CC] subsana observaciones. Sin carga nueva masiva.
   - **Fase 3 — Evaluación Externa:** presentación de resultados a pares evaluadores externos, [JD] y stakeholders. Vista de solo lectura para actores internos.
4. El sistema instancia las tres fases e indicadores; estado del proceso → `ACTIVO` (UI muestra badge `"EN PROCESO"`); Fase 1 → `ABIERTA`.
5. Notifica al [CC] asignado.

**Flujos alternos:**
- **A1 — Proceso duplicado activo:** HTTP 409 `PROCESS_ALREADY_ACTIVE` (FSD-BR-08).
- **A2 — Cambio de plantilla mid-proceso:** proceso en curso conserva plantilla de origen.
- **A3 — Cierre anticipado por [JD] (soft delete):** [JD] selecciona "Eliminar proceso" (UI). El sistema muestra modal de confirmación con campo de motivo obligatorio. Al confirmar: proceso → `ANULADO`; todas las Evidencias y Observaciones permanecen auditables; se emite `AUDIT_PROCESS_CLOSED` en bitácora. Prohibido `DELETE` físico (FSD-BR-19). Solo aplicable a procesos en estado `ACTIVO`.

**Postcondiciones:** Un solo proceso activo por carrera + modalidad + periodo. Estados válidos del Proceso: `ACTIVO` → `ACREDITADO` / `RECHAZADO` / `VENCIDO` / `ANULADO`.

---

## FSD-UC-004 — Cargar Evidencia

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | BRD-SCP-IN-02 · PRD-US-002 |
| **Reglas** | FSD-BR-01, FSD-BR-03, FSD-BR-20 |
| **Diagrama** | [`seq-002-02-secuencia.mmd`](../07_diagramas/seq-002-02-secuencia.mmd) |
| **Mockup** | `figma/screenshots/cc-coordinador-home.png` (node `635:319`) — botón **"Subir Evidencia"** en lista de Indicadores |

**Actor principal:** [CC]

**Precondiciones:** [CC] autenticado; proceso `ACTIVO`; Fase 1 `ABIERTA`; indicador en `PENDIENTE`.

**Flujo principal:**
1. [CC] selecciona **Indicador** en árbol normativo (no carga huérfana).
2. El sistema valida alcance: carrera del [CC] = carrera del proceso.
3. [CC] pulsa **"Subir Evidencia"** (FSD-BR-20) y adjunta archivo (PDF, DOCX, XLSX, JPG, PNG; máx. 50 MB) con metadatos obligatorios.
4. El sistema calcula SHA-256, almacena blob, inserta `evidence` + `evidence_version` v1.
5. El sistema transiciona indicador a `SUBIDO`.
6. Registra auditoría y encola notificación a [TD].

**Flujos alternos:**
- **E1 — MIME no permitido:** HTTP 400.
- **E2 — Indicador ya APROBADO:** HTTP 403 sin nueva carga salvo política de reapertura [JD].
- **E3 — Storage no disponible:** HTTP 503; no confirma transacción.

**Postcondiciones:** Nueva versión persistida; historial append-only iniciado o extendido.

---

## FSD-UC-006 — Subsanar Evidencia

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | BRD-CST-01 · PRD-US-003, 025 |
| **Reglas** | FSD-BR-02, FSD-BR-06, FSD-BR-20 |
| **Diagrama** | [`seq-001-01-secuencia.mmd`](../07_diagramas/seq-001-01-secuencia.mmd) |
| **Mockup** | `figma/screenshots/td-bandeja-tareas.png` — sección "Observación (subsanación)" visible para [TD] |

**Actor principal:** [CC]

**Precondiciones:** Indicador `OBSERVADO`; observación `ABIERTA`; Fase 2 activa; plazo fatal no vencido.

**Flujo principal:**
1. [CC] lee el texto de la Observación y el plazo en su dashboard (sección "Observaciones y Seguimiento").
2. [CC] pulsa **"Subir Evidencia"** (FSD-BR-20) sobre el Indicador `OBSERVADO`, vinculando el `observationId` obligatorio.
3. El sistema inserta `evidence_version` v2 con `supersedes_id` → v1; **no** elimina v1 (FSD-BR-02).
4. Indicador → `SUBSANADO`; observación → `REVISION_PENDIENTE`.
5. Notifica [TD] en ≤ 15 min.

**Postcondiciones:** Cadena auditable Observación → v1 → v2; turno de acción en [TD]. En la Bandeja de Tareas del [TD] aparece la tarea con tipo "Observación (subsanación)".

---

## FSD-UC-008 — Registrar Observación

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-009 · BRD-SCP-IN-05 |
| **Reglas** | FSD-BR-04, FSD-BR-05 |

**Actor principal:** [TD]

**Precondiciones:** Indicador `SUBIDO` o `SUBSANADO`; evidencia visible.

**Flujo principal:**
1. [TD] revisa versión vigente y historial.
2. [TD] ingresa justificación (mín. 20 caracteres).
3. El sistema crea `observation` y cambia indicador a `OBSERVADO`.
4. Notifica [CC].

**Flujos alternos:**
- **E1 — Justificación vacía:** HTTP 422 `JUSTIFICATION_REQUIRED`.
- **E2 — Concurrencia:** HTTP 409 si otro [TD] ya resolvió el indicador.

---

## FSD-UC-009 — Aprobar Indicador

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-023 |
| **Reglas** | FSD-BR-04, FSD-BR-07 |

**Actor principal:** [TD]

**Flujo principal:**
1. [TD] confirma aprobación sobre evidencia en `SUBIDO` o `SUBSANADO`.
2. El sistema valida existencia de evidencia.
3. Indicador → `APROBADO`; cierra observación si aplica.
4. Evalúa agregación de fase (ver UC-010).

**Flujos alternos:**
- **E1 — Sin evidencia:** botón Aprobar deshabilitado; solo observar.

---

## FSD-UC-010 — Avanzar / cerrar Fase

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | BRD-CST-03 · PRD-US-014 |
| **Reglas** | FSD-BR-07 |
| **Diagrama** | [`state-003-03-estado.mmd`](../07_diagramas/state-003-03-estado.mmd) |

**Actor principal:** [TD] (solicitud); sistema (validación)

**Regla de oro:** `COUNT(indicadores) = COUNT(indicadores WHERE estado = 'APROBADO')` para la fase actual.

**Flujo principal:**
1. [TD] solicita cierre de fase.
2. El sistema evalúa agregación; si hay `PENDIENTE`, `SUBIDO`, `OBSERVADO` o `SUBSANADO` → HTTP 409 `FASE_CIERRE_BLOQUEADO`.
3. Si cumple: fase → `COMPLETADA`; abre siguiente fase según cronograma.

---

## FSD-UC-016 — Portal público

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-016, 017 |
| **Reglas** | FSD-BR-14 |

**Actor principal:** [P]

**Alcance:** Solo `publication_snapshot` publicado por [JD]. **Sin** acceso a `evidence_version` interna.

**Flujo principal:**
1. [P] busca carrera por nombre/código.
2. El sistema devuelve estado de acreditación y vigencia.
3. Si publicado, permite descarga de certificado firmado institucionalmente.

---

## Casos de uso heredados (detalle extendido)

El borrador monolítico con flujos paso a paso (UC-001 login, UC-002 carga, UC-003 auditoría legacy) permanece como referencia histórica en el historial Git del archivo `FSD.md` v0.1. La versión v1.0 descompuesta prioriza trazabilidad PRD ↔ diagramas ↔ reglas.

---

## Historial

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 17/05/2026 | Descomposición desde FSD monolítico; 17 UC indexados |
| v1.1 | 27/05/2026 | UC-003: flujo alterno cierre anticipado (A3 soft-delete → ANULADO); selección tipos de fase (Autoevaluación / Evaluación Interna / Evaluación Externa). UC-004/006: botón "Subir Evidencia" (FSD-BR-20). Mockups Figma enlazados en UC-011/012/013. |
