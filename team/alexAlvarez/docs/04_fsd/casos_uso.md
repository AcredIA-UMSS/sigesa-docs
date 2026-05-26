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
| [FSD-UC-003](#fsd-uc-003) | Plantillas y Proceso CEUB/ARCU-SUR | [JD] | 024 | [UC-L02](../05_lfsd/LFSD_v1.md#uc-l02--plantillas-y-proceso) | [UC03](../07_diagramas/UC03_secuencia.mmd) |
| [FSD-UC-004](#fsd-uc-004) | Cargar Evidencia | [CC] | 002 | [UC-L03](../05_lfsd/LFSD_v1.md#uc-l03--cargar-evidencia) | [UC02](../07_diagramas/UC02_secuencia.mmd) |
| [FSD-UC-005](#fsd-uc-005) | Versionado append-only | [CC], [TD] | 010 | (en UC-L03/L04) | [UC02 estado](../07_diagramas/UC02_estado.mmd) |
| [FSD-UC-006](#fsd-uc-006) | Subsanar Evidencia | [CC] | 003, 025 | [UC-L04](../05_lfsd/LFSD_v1.md#uc-l04--subsanar-evidencia) | [UC01](../07_diagramas/UC01_secuencia.mmd) |
| [FSD-UC-007](#fsd-uc-007) | Buscar Evidencia | [CC], [TD] | 001, 007 | — | — |
| [FSD-UC-008](#fsd-uc-008) | Registrar Observación | [TD] | 009 | [UC-L05](../05_lfsd/LFSD_v1.md#uc-l05--observación-td) | [UC02](../07_diagramas/UC02_secuencia.mmd) |
| [FSD-UC-009](#fsd-uc-009) | Aprobar Indicador | [TD] | 023 | [UC-L06](../05_lfsd/LFSD_v1.md#uc-l06--aprobar-indicador-y-cerrar-fase) | [UC01 estado](../07_diagramas/UC01_estado.mmd) |
| [FSD-UC-010](#fsd-uc-010) | Avanzar / cerrar Fase | [TD] | 014, 023 | [UC-L06](../05_lfsd/LFSD_v1.md#uc-l06--aprobar-indicador-y-cerrar-fase) | [UC03](../07_diagramas/UC03_estado.mmd) |
| [FSD-UC-011](#fsd-uc-011) | Dashboard [CC] | [CC] | 004, 006, 025 | — | — |
| [FSD-UC-012](#fsd-uc-012) | Bandeja auditoría [TD] | [TD] | 007, 012 | — | — |
| [FSD-UC-013](#fsd-uc-013) | Panel ejecutivo [JD] | [JD] | 015, 020 | [UC-L07](../05_lfsd/LFSD_v1.md#uc-l07--panel-semáforo-jd) | — |
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
| **Reglas** | FSD-BR-08, FSD-BR-17 |
| **Diagrama** | [`UC03_secuencia.mmd`](../07_diagramas/UC03_secuencia.mmd) |

**Actor principal:** [JD]

**Precondiciones:** Plantilla normativa validada por comité DUEA.

**Flujo principal:**
1. [JD] activa plantilla CEUB o ARCU-SUR para el periodo.
2. El sistema fija taxonomía **Fase → Dimensión → Criterio → Indicador** en catálogo.
3. [JD] crea `accreditation_process` para una `academic_program`.
4. El sistema instancia fases e indicadores; estado proceso `EN_PROCESO`; Fase 1 `ABIERTA`.
5. Notifica al [CC] asignado.

**Flujos alternos:**
- **A1 — Proceso duplicado activo:** HTTP 409 `PROCESS_ALREADY_ACTIVE`.
- **A2 — Cambio de plantilla mid-proceso:** proceso en curso conserva plantilla de origen.

**Postcondiciones:** Un solo proceso activo por carrera + modalidad + periodo.

---

## FSD-UC-004 — Cargar Evidencia

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | BRD-SCP-IN-02 · PRD-US-002 |
| **Reglas** | FSD-BR-01, FSD-BR-03 |
| **Diagrama** | [`UC02_secuencia.mmd`](../07_diagramas/UC02_secuencia.mmd) |

**Actor principal:** [CC]

**Precondiciones:** [CC] autenticado; proceso activo; Fase permite carga; indicador en `PENDIENTE` o (Fase 2) subsanación vinculada.

**Flujo principal:**
1. [CC] selecciona **Indicador** en árbol normativo (no carga huérfana).
2. El sistema valida alcance: carrera del [CC] = carrera del proceso.
3. [CC] adjunta archivo (PDF, DOCX, XLSX, JPG, PNG; máx. 50 MB) y metadatos obligatorios.
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
| **Reglas** | FSD-BR-02, FSD-BR-06 |
| **Diagrama** | [`UC01_secuencia.mmd`](../07_diagramas/UC01_secuencia.mmd) |

**Actor principal:** [CC]

**Precondiciones:** Indicador `OBSERVADO`; observación `ABIERTA`; plazo fatal no vencido.

**Flujo principal:**
1. [CC] lee observación y plazo en dashboard.
2. [CC] carga archivo corregido con `observationId` obligatorio.
3. El sistema inserta `evidence_version` v2 con `supersedes_id` → v1; **no** elimina v1.
4. Indicador → `SUBSANADO`; observación → `REVISION_PENDIENTE`.
5. Notifica [TD] en ≤ 15 min.

**Postcondiciones:** Cadena auditable Observación → v1 → v2; turno de acción en [TD].

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
| **Diagrama** | [`UC03_estado.mmd`](../07_diagramas/UC03_estado.mmd) |

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
