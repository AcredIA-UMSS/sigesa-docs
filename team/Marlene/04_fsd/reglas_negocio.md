# Reglas de negocio — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Producto** | SIGESA — Sistema de Evaluación y Acreditación de Carreras |
| **Institución** | UMSS · DUEA |
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **FSD padre** | `team/Marlene/04_fsd/FSD.md` §11 |
| **Fuente canónica** | `docs/LFSD.md` §5 |
| **BRD** | `team/Marlene/01_brd/BRD_v1.md` §11–12 |
| **Casos de uso** | `team/Marlene/04_fsd/casos_uso.md` |
| **Escenarios BDD** | `team/Marlene/04_fsd/gherkin.md` |

---

## 1. Propósito y tipos de regla

Este documento cataloga las **reglas de negocio** que el sistema debe **aplicar de forma determinística** (API, dominio, UI), distinguiéndolas de los **requerimientos de negocio (BR-xxx)** del BRD, que describen capacidades deseadas.

| Prefijo | Significado | Ejemplo |
|---------|-------------|---------|
| **RB-NN** | Regla / política normativa o institucional | RB-04: no eliminar documentos aprobados |
| **BR-NNN** | Requerimiento de negocio (BRD) | BR-002: historial de versiones |
| **BR-NNN** (Must estructural) | Regla estructural Must del BRD v2 / LFSD | BR-013: un proceso activo por tipo |
| **CN-NN** | Restricción técnica derivada del FSD | CN-01: tamaño máximo 50 MB |

**Principio de implementación:** toda regla **RB** y **BR Must (013–015)** debe tener al menos un **test automatizado** (unitario o BDD) y un **código de error API** documentado.

---

## 2. Catálogo resumido

### 2.1 Reglas RB (políticas)

| ID | Enunciado breve | Tipo | UC principal |
|----|-----------------|------|--------------|
| RB-01 | ARCU-SUR exige CEUB vigente | Política | UC-010 |
| RB-02 | Solo [CC] carga; [TD] valida | Política | UC-002, UC-003 |
| RB-03 | Subfase solo cierra si indicadores obligatorios aprobados | Normativa | UC-003 |
| RB-04 | Documentos aprobados no se eliminan; solo versionan | Normativa | UC-002 |
| RB-05 | Fechas límite externas no editables por usuarios | Normativa | UC-003, UC-010 |
| RB-06 | Acceso solo con @umss.edu.bo activo | Política | UC-001 |
| RB-07 | Reportes PDF uso interno; distribución externa con [JD] | Política | UC-005, UC-008 |
| RB-08 | Proceso con metadatos obligatorios | Normativa | UC-010 |
| RB-09 | Avance % según criterios configurados | Política | UC-004 |
| RB-10 | Mensajes claros, accionables y empáticos | UX | Todos |
| RB-11 | IA explicable y supervisión humana (v2.0) | Política IA | — |
| RB-11-PUB | Publicación portal solo por [JD] | Política | UC-008 |
| RB-12 | Reintentos notificación ≤ 5 / 24 h | Operación | UC-006 |

### 2.2 Reglas estructurales Must (BR-013–015)

| ID | Enunciado breve | UC principal |
|----|-----------------|--------------|
| BR-013 | Un proceso activo por tipo y gestión por carrera | UC-010 |
| BR-014 | No cerrar proceso/subfase con tareas pendientes | UC-003 |
| BR-015 | Evidencia obligatoriamente ligada a indicador/criterio | UC-002 |

---

## 3. Reglas RB — especificación detallada

### RB-01 — Elegibilidad ARCU-SUR

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | No se puede crear ni activar un proceso `ARCU_SUR` para una carrera si no existe un proceso `CEUB` en estado acreditado vigente (`ACREDITADO` o equivalente documentado). |
| **Tipo** | Política |
| **Origen** | Normativa CEUB / ARCU-SUR |
| **Actores** | [JD] (creación proceso); sistema (validación) |
| **FSD-UC** | UC-010 |
| **PRD** | PRD-REQ-010, PRD-US-019 |
| **Validación** | Al `POST /procesos` con `tipo=ARCU_SUR`, consultar tabla `proceso` por `carrera_id` y vigencia CEUB. |
| **Código error** | `422 NORM_ARCU_REQUIRES_CEUB` |
| **Gherkin** | `gherkin.md` — UC-010 escenario ARCU-SUR rechazado |
| **Severidad** | C1 — bloqueo |

---

### RB-02 — Separación carga vs. validación

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | Solo usuarios con rol `CC` **asignados a la carrera** del indicador pueden crear filas `documento`. Los usuarios `TD` **no** pueden cargar evidencia en nombre del coordinador. |
| **Tipo** | Política |
| **Origen** | Procedimiento interno DUEA |
| **FSD-UC** | UC-002, UC-003 |
| **PRD** | PRD-REQ-003, PRD-US-003 |
| **Validación** | Middleware RBAC en `POST /documentos`; rechazo si `rol=TD`. |
| **Código error** | `403 DOC_UNAUTHORIZED` |
| **Gherkin** | UC-002 — coordinador sin asignación |
| **Severidad** | C1 |

---

### RB-03 — Cierre de subfase por completitud

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | La transición de `subfase.estado` a `CERRADA` o `APROBADA` requiere: ∀ indicador **obligatorio** de la subfase, `indicador.estado = APROBADO`. |
| **Tipo** | Normativa (autoevaluación) |
| **Origen** | CEUB / ARCU-SUR |
| **FSD-UC** | UC-003 |
| **PRD** | PRD-REQ-005, PRD-US-007, PRD-US-008 |
| **Validación** | Servicio de workflow antes de `PATCH /subfases/{id}/avanzar`. |
| **Código error** | `409 WF_INCOMPLETE` + lista `indicadoresPendientes[]` |
| **Gherkin** | UC-003 — cierre bloqueado; UC-SIG-04b |
| **Severidad** | C1 |
| **Relacionada** | BR-014 |

---

### RB-04 — Integridad documental (versionado)

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | No existe `DELETE` físico sobre `documento` con versión aprobada. Solo `INSERT` de nueva versión; historial accesible en lectura. |
| **Tipo** | Normativa |
| **Origen** | Trazabilidad auditorías externas |
| **FSD-UC** | UC-002 |
| **PRD** | PRD-REQ-004, PRD-US-004 |
| **Validación** | Revocar permiso DELETE en API; soft-delete prohibido para aprobados. |
| **Código error** | `405` o `403` según diseño API |
| **Gherkin** | Reglas transversales — bloqueo eliminación |
| **Severidad** | C1 |

---

### RB-05 — Inmutabilidad de plazos oficiales

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | Los atributos `fecha_limite_externa` de convocatoria CEUB/ARCU-SUR **no** son editables por [CC], [TD] ni [JD] salvo permiso explícito `NORMATIVA_SUPER` (por defecto: **no editables**). |
| **Tipo** | Normativa |
| **Origen** | CEUB / Ministerio de Educación Bolivia |
| **FSD-UC** | UC-003, UC-010 |
| **Validación** | Rechazar `PATCH` sobre fechas externas en API estándar. |
| **Código error** | `403` o `422 VAL_DATE_IMMUTABLE` |
| **Gherkin** | Transversal — fecha límite no editable por [TD] |
| **Severidad** | C1 |

---

### RB-06 — Autenticación institucional

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | `usuario.email` debe cumplir `*@umss.edu.bo`. Usuario `activo=true` obligatorio para emitir JWT. |
| **Tipo** | Política |
| **Origen** | Seguridad institucional UMSS |
| **FSD-UC** | UC-001 |
| **PRD** | PRD-REQ-001, PRD-REQ-002 |
| **Validación** | Login, alta de usuario, refresh token. |
| **Códigos error** | `403 AUTH_DOMAIN`, `403 AUTH_INACTIVE`, `401 AUTH_INVALID`, `429 AUTH_LOCKED` |
| **Gherkin** | UC-001 |
| **Severidad** | C1 |

---

### RB-07 — Clasificación y distribución de reportes

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | Los artefactos `reporte_pdf` tienen clasificación `USO_INTERNO` hasta registro de `autorizacion_distribucion_externa` firmada por [JD]. Portal público no expone contenido de reportes internos. |
| **Tipo** | Política |
| **Origen** | Procedimiento DUEA |
| **FSD-UC** | UC-005, UC-008 |
| **PRD** | PRD-REQ-007, PRD-REQ-012 |
| **Validación** | Marca de agua en PDF; campos públicos filtrados en portal. |
| **Gherkin** | UC-005 — leyenda USO_INTERNO |
| **Severidad** | C1 para distribución externa |

---

### RB-08 — Metadatos obligatorios de proceso

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | Todo `proceso` debe tener: `tipo_acreditacion`, `organismo`, `gestion`, `fecha_inicio`, `fecha_fin`, `estado_proceso`. |
| **Tipo** | Normativa |
| **Origen** | BRD / visión de negocio |
| **FSD-UC** | UC-010 |
| **Validación** | `NOT NULL` + validación API en creación. |
| **Código error** | `400 VAL_PROCESS_METADATA` |
| **Severidad** | C1 |

---

### RB-09 — Cálculo de avance y semáforos

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | `porcentaje_avance = f(indicadores_totales, indicadores_aprobados, pesos)` documentada en `config_dashboard`. Semáforo: **Verde** ≥ 80 %, **Amarillo** 50–79 %, **Rojo** &lt; 50 % o indicadores vencidos. |
| **Tipo** | Política |
| **Origen** | Producto / LFSD |
| **FSD-UC** | UC-004 |
| **PRD** | PRD-REQ-006, PRD-US-009, PRD-US-010 |
| **Validación** | Fuente de verdad = backend; UI solo muestra valores API. |
| **Gherkin** | UC-004 — esquema del escenario semáforos |
| **Severidad** | C2 — coherencia analítica |

---

### RB-10 — Mensajes claros y accionables

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | Errores API/UI incluyen `code`, `message` legible en español institucional y `hint` opcional accionable. Tono empático; roles como [CC], [TD], [JD] en textos visibles (CR-SIG-03). |
| **Tipo** | Política UX |
| **Origen** | Validación prototipo Hi-Fi |
| **FSD-UC** | Todos |
| **Ejemplo válido** | “El [TD] debe revisar la evidencia antes del cierre de subfase.” |
| **Ejemplo inválido** | “Admin approves your upload” |
| **Severidad** | C2 |

---

### RB-11 — Supervisión humana de IA (v2.0)

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | Las recomendaciones asistidas por IA deben ser **explicables** (`rationale` obligatorio), persistidas con `prompt_hash`, `model_id`, `trace_id`, y **no** cambian estados de dictamen ni evidencias aprobadas sin confirmación humana [TD] o [JD]. |
| **Tipo** | Política IA / ética |
| **Origen** | Visión v2, `AGENTS.md` SKILL-SIG-* |
| **FSD-UC** | — (v2.0) |
| **Alcance v1** | Documentada; implementación bajo feature flag |
| **Severidad** | C1 cuando IA esté activa |

> **Nota de alineación:** En `FSD.md` §11 el identificador **RB-11** se usa también para **publicación en portal** (`RB-11-PUB` en este documento). El **LFSD canónico** reserva **RB-11** para IA. En código nuevo usar `RB-11-IA` y `RB-11-PUB` o constantes separadas.

---

### RB-11-PUB — Publicación en portal público

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | `publicacion.estado_publico` solo puede pasar a `VISIBLE` mediante transición firmada por usuario con rol [JD]. |
| **Tipo** | Política |
| **Origen** | Transparencia institucional |
| **FSD-UC** | UC-008 |
| **PRD** | PRD-REQ-012, PRD-REQ-013 |
| **Validación** | Workflow de publicación; API pública solo lectura de registros `publicado=true`. |
| **Gherkin** | UC-008 |
| **Severidad** | C1 |

---

### RB-12 — Reintentos de notificación

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | Máximo **5** reintentos de envío SMTP por evento de notificación en ventana de **24 horas**; luego estado `FALLIDO` y alerta operaciones. |
| **Tipo** | Operación |
| **Origen** | NFR-003 / FSD §11 |
| **FSD-UC** | UC-006 |
| **PRD** | PRD-REQ-008 |
| **Gherkin** | UC-006 — reintento SMTP |
| **Severidad** | C2 |

---

## 4. Reglas estructurales Must (BR-013–015)

### BR-013 — Unicidad de proceso activo

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | No más de un proceso **activo** del mismo `tipo_acreditacion` (CEUB / ARCU-SUR) para la misma `carrera_id` en la misma `gestion`. |
| **Origen** | BRD v2 §23 / LFSD §5 |
| **FSD-UC** | UC-010 (también validado en UC-003 al instanciar) |
| **Código error** | `409 PROC_DUPLICATE` |
| **Gherkin** | UC-010 — segundo proceso CEUB rechazado |
| **Severidad** | C1 |

---

### BR-014 — Cierre con tareas pendientes

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | Un proceso o subfase **no** puede cerrarse si existen indicadores obligatorios en estado distinto de `APROBADO` o tareas de workflow pendientes documentadas. |
| **Origen** | BRD v2 §23 |
| **FSD-UC** | UC-003 |
| **Relación** | Refuerza RB-03 a nivel proceso |
| **Código error** | `409 WF_INCOMPLETE` |
| **Gherkin** | UC-003 — cierre bloqueado |
| **Severidad** | C1 |

---

### BR-015 — Evidencia ligada a criterio

| Campo | Contenido |
|-------|-----------|
| **Enunciado** | Toda carga de evidencia requiere `indicador_id` (y por extensión criterio de evaluación). No se admite documento huérfano. |
| **Origen** | BRD v2 §23 / CR-SIG-01 |
| **FSD-UC** | UC-002 |
| **Código error** | `400 EVIDENCE_CRITERION_REQUIRED` |
| **Gherkin** | UC-002 — carga sin indicador |
| **Severidad** | C1 |

---

## 5. Requerimientos de negocio BR (BRD) — trazabilidad

Los **BR-001 … BR-012** del BRD describen **capacidades**; su cumplimiento se materializa mediante RB, UC y NFR. Esta tabla enlaza BR → RB/UC (no duplica el texto completo del BRD).

| BRD | Tema | RB / reglas relacionadas | FSD-UC | NFR / métrica |
|-----|------|--------------------------|--------|---------------|
| BR-001 | Carga centralizada de evidencias | RB-02, BR-015 | UC-002 | — |
| BR-002 | Historial de versiones | RB-04 | UC-002 | — |
| BR-003 | Dashboard semáforos | RB-09, RB-10 | UC-004 | ≤ 2 min |
| BR-004 | Reportes PDF automáticos | RB-07 | UC-005 | ≤ 5 min P95 |
| BR-005 | Notificaciones automáticas | RB-12 | UC-006 | ≤ 15 min P95 |
| BR-006 | Roles y permisos | RB-06 | UC-001 | NFR-005 |
| BR-007 | Plantillas CEUB/ARCU-SUR | RB-08, RB-01, BR-013 | UC-010 | — |
| BR-008 | Buscador documentos | — | UC-007 | ≤ 3 s P95 |
| BR-009 | Log auditoría inmutable | RB-04 (contexto) | UC-009 | NFR-013 |
| BR-010 | Portal público | RB-11-PUB, RB-07 | UC-008 | rate limit |
| BR-011 | Certificados | — | (v2 / Could) | — |
| BR-012 | Respaldos automáticos | — | UC-011 | diario |

---

## 6. Restricciones técnicas derivadas (CN)

| ID | Restricción | Aplica en | Código / validación |
|----|-------------|-----------|---------------------|
| CN-01 | Tamaño máximo archivo evidencia **50 MB** | UC-002 | `413 DOC_SIZE` |
| CN-02 | MIME permitidos: PDF, DOCX, XLSX | UC-002 | `415 DOC_MIME` |
| CN-03 | Justificación rechazo [TD] ≥ **20** caracteres | UC-003 | `422 VAL_JUSTIFICATION_SHORT` |
| CN-04 | Bloqueo login tras **5** intentos / **15** min | UC-001 | `429 AUTH_LOCKED` |
| CN-05 | JWT expiración acordada (p. ej. 8 h) | UC-001 | — |
| CN-06 | Hash SHA-256 obligatorio por versión documento | UC-002 | FR-011 |

---

## 7. Matriz RB/BR → caso de uso → prueba

| Regla | FSD-UC | TC (LFSD) | Tag Gherkin |
|-------|--------|-----------|-------------|
| RB-01 | UC-010 | — | `@normativa` |
| RB-02 | UC-002 | TC-03 | `@documento` |
| RB-03 | UC-003 | TC-08 | `@workflow` |
| RB-04 | UC-002 | TC-04 | `@documento` |
| RB-05 | UC-003, UC-010 | — | `@normativa` |
| RB-06 | UC-001 | TC-01, TC-02 | `@auth` |
| RB-07 | UC-005 | TC-11, TC-12 | `@reporte` |
| RB-08 | UC-010 | — | `@normativa` |
| RB-09 | UC-004 | TC-09, TC-10 | `@dashboard` |
| RB-10 | Todos | — | — |
| RB-11 | v2 | — | — |
| RB-11-PUB | UC-008 | — | `@portal` |
| RB-12 | UC-006 | TC-13 | `@notificacion` |
| BR-013 | UC-010 | — | `@normativa` |
| BR-014 | UC-003 | TC-08 | `@workflow` |
| BR-015 | UC-002 | TC-03 | `@documento` |

---

## 8. Implementación en capas

| Capa | Responsabilidad |
|------|-----------------|
| **Dominio** | Validadores RB-01, RB-03, BR-013, BR-014, BR-015 en servicios de proceso, workflow y documento |
| **API** | Códigos de error estables; HTTP semántico (409 conflicto, 422 validación) |
| **UI** | Deshabilitar acciones ilegales; no depender solo del mensaje de error (RB-10) |
| **BD** | `CHECK`, `UNIQUE` parcial proceso activo; `REVOKE DELETE` en auditoría y documentos aprobados |
| **IA (v2)** | RB-11: sin transiciones de estado sin humano en el loop |

**Checklist PR (reglas):**

- [ ] Cada RB/BR Must afectada tiene test unitario o escenario Gherkin
- [ ] Código de error documentado en contrato API
- [ ] Mensajes UI en español institucional (RB-10, CR-SIG-03)
- [ ] Matriz `matriz_trazabilidad.md` actualizada si se añade regla nueva

---

## 9. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Catálogo RB-01…RB-12, BR-013…015, BRD BR-001…012, CN y matrices de trazabilidad |

---

*Escenarios verificables: `gherkin.md`. Narrativa funcional: `casos_uso.md`.*
