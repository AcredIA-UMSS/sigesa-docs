# Reglas de dominio — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Ubicación canónica** | `team/Marlene/rules/domain_rules.md` |
| **Audiencia** | Agentes IA (Cursor), desarrolladores, QA, arquitectos |
| **Fuentes normativas** | `docs/LFSD.md`, `04_fsd/reglas_negocio.md`, `04_fsd/glosario.md`, `AGENTS.md` §12 |
| **Implementación Cursor** | `.cursor/rules/*.mdc` (véase §8) |

---

## 1. Propósito y alcance

Este documento consolida las **reglas de dominio ejecutables por agentes y por código**: restricciones que un asistente de IA o un desarrollador **no debe violar** al proponer cambios en SIGESA.

| Documento | Rol |
|-----------|-----|
| **`reglas_negocio.md`** | Catálogo RB/BR con validación API, códigos de error y Gherkin |
| **`domain_rules.md` (este)** | Reglas para **IA + PR + código**; mapeo a Cursor Rules |
| **`coding_rules.md`** | Estándares técnicos (API, BD, tests, Git, React) |
| **`ai_rules.md`** | Operación agentes IA, skills, HITL, prompt contracts |
| **`glosario.md`** | Vocabulario aprobado (UI y conceptos) |
| **`AGENTS.md` §12** | Definición formal CR-SIG-01 … 04 |

**Principio:** si una regla de dominio contradice una sugerencia del agente, **gana la regla**; el agente debe detenerse y pedir aclaración humana.

---

## 2. Identificadores de reglas

| Prefijo | Uso en este archivo |
|---------|---------------------|
| **DR-01 … DR-07** | Reglas de dominio para ingeniería (este documento) |
| **CR-SIG-01 … 04** | Cursor Rules institucionales (`AGENTS.md`) — equivalentes DR |
| **RB / BR** | Reglas de negocio del producto — **no reimplementar** sin citar ID |

---

## 3. Reglas de dominio (DR)

### DR-01 — Evidencia ligada a indicador (CR-SIG-01)

| Campo | Contenido |
|-------|-----------|
| **ID Cursor** | `sigesa-criterio-evidencia` |
| **Regla de negocio** | BR-015, RB-04 |
| **FSD-UC** | UC-002, UC-003 |

**Regla exacta (obligatoria para agentes):**

Antes de proponer o fusionar cambios que afecten carga o visualización de evidencias, verificar en `docs/LFSD.md` y `04_fsd/modelo_datos.md` que:

1. Existe `indicador_id` obligatorio en todo `POST /documentos`.
2. No se introduce eliminación física de documentos en estado aprobado.
3. Los textos de UI usan los estados del LFSD: *Pendiente*, *En revisión*, *Aprobado*, *Rechazado* (API: `PENDIENTE`, `EN_REVISION`, `APROBADO`, `RECHAZADO`).

Si falta información, **detenerse** y solicitarla; no inventar IDs ni criterios normativos.

| Válido | Inválido |
|--------|----------|
| Validación `400` con `SIGESA_EVIDENCE_CRITERION_REQUIRED` y test TC-04 | `POST /documentos` sin `indicador_id` “para prototipo” |

---

### DR-02 — Trazabilidad en cambios (CR-SIG-02)

| Campo | Contenido |
|-------|-----------|
| **ID Cursor** | `sigesa-trazabilidad-ids` |
| **Artefacto** | `09_trazabilidad/matriz_trazabilidad.md` |

**Regla exacta:**

Toda descripción de cambio (PR, commit extendido, issue) debe incluir al menos:

- Un `PRD-REQ-xxx` **o** `FSD-UC-xxx` afectado, y
- El `TC-xx` actualizado o creado cuando el cambio toque lógica de negocio.

Si el agente no encuentra el ID, debe proponer actualización de `matriz_trazabilidad.md` en el mismo PR o **rechazar el alcance**.

| Válido | Inválido |
|--------|----------|
| “Ajuste rechazo TD — FSD-UC-003 — TC-07” | “fix dashboard” sin UC ni TC |

---

### DR-03 — Nomenclatura institucional (CR-SIG-03)

| Campo | Contenido |
|-------|-----------|
| **ID Cursor** | `sigesa-nomenclatura-umss` |
| **Glosario** | `04_fsd/glosario.md` §1–3 |
| **Regla de negocio** | RB-10 |

**Regla exacta:**

En textos de **UI**, documentación orientada a DUEA y **mensajes de error** visibles al usuario:

- Usar **DUEA**, **UMSS**, **CEUB**, **ARCU-SUR** como en LFSD §14.
- Referir actores como **[CC]**, **[TD]**, **[JD]**, **[P]** (corchetes).
- No usar en producción jerga anglosajera confusa: “Admin”, “Reviewer”, “Uploader”.

**En código backend/frontend (identificadores):**

| Concepto | Permitido en código | Texto UI (español) |
|----------|---------------------|-------------------|
| Documento probatorio | `documento`, `Evidence` (tipo/clase) | **Evidencia** |
| Contenedor temporal | `fase`, `subfase`, `Phase` (clase) | **Fase** / **Subfase** — no “Step” ni “Stage” |
| Proceso maestro | `proceso`, `AccreditationProcess` | **Proceso de acreditación** |
| Coordinador | `rol = CC`, `Coordinator` (enum interno) | **[CC]** Coordinador/a de carrera |
| Técnico DUEA | `rol = TD`, `Technician` | **[TD]** Técnico/a DUEA |
| Jefatura | `rol = JD` — **no** `Admin` en strings UI | **[JD]** Jefatura DUEA |

---

### DR-04 — Sin datos institucionales ficticios (CR-SIG-04)

| Campo | Contenido |
|-------|-----------|
| **ID Cursor** | `sigesa-no-datos-ficticios` |

**Regla exacta:**

Prohibido introducir datos de ejemplo interpretables como hechos reales UMSS (nombres de carrera, resoluciones CEUB, fechas de visita) salvo marcados `FICTIONAL_EXAMPLE` y aprobados por humano en el PR.

Para tests y seeds:

- Prefijo `TEST_` en nombres (p. ej. `TEST_IngenieriaFicticia`).
- Dominios `example.invalid`.
- Cronogramas: comentario `EJEMPLO ILUSTRATIVO` en `.mmd` (véase `07_diagramas/gantt-005-diagrama.mmd`).

---

### DR-05 — Máquina de estados indicador y subfase

| Campo | Contenido |
|-------|-----------|
| **Cursor ref** | `.cursor/rules/02_state_machine.mdc` |
| **Reglas de negocio** | RB-03, BR-014 |
| **Diagramas** | `07_diagramas/state-002-02-estado.mmd`, `state-003-03-estado.mmd` |

**Regla exacta:**

1. No implementar cierre de **subfase** sin validar ∀ indicadores obligatorios en `APROBADO` (`409 SIGESA_WF_INCOMPLETE`).
2. No permitir dictamen [TD] si indicador no está en `EN_REVISION` (`409 SIGESA_WF_INVALID_STATE`).
3. Rechazo [TD] exige justificación ≥ 20 caracteres (`422 SIGESA_VAL_JUSTIFICATION_SHORT`).
4. Transiciones permitidas de indicador — resumen:

```text
PENDIENTE → EN_REVISION     (carga [CC])
EN_REVISION → APROBADO|RECHAZADO  ([TD])
RECHAZADO → EN_REVISION     (nueva versión [CC])
APROBADO → EN_REVISION      (nueva versión [CC], política RB-04)
```

5. No atajos: `RECHAZADO` → `APROBADO` sin pasar por nueva evidencia en revisión.

---

### DR-06 — Evidencias append-only

| Campo | Contenido |
|-------|-----------|
| **Cursor ref** | `.cursor/rules/03_append_only_db.mdc` |
| **Regla de negocio** | RB-04 |
| **NFR** | NFR-013 |

**Regla exacta:**

1. **Prohibido** `DELETE` sobre filas `documento` aprobadas o con valor probatorio histórico.
2. **Prohibido** `UPDATE` destructivo que reemplace el binario de una versión ya auditada.
3. Corrección = `INSERT` con `version = MAX(version)+1` y nuevo `storage_key` / `hash_sha256`.
4. Repositorios y migraciones SQL generados por IA deben respetar `ON DELETE RESTRICT` en el núcleo acreditación.

---

### DR-07 — IA supervisada (RB-11)

| Campo | Contenido |
|-------|-----------|
| **Skills** | `AGENTS.md` §5, `08_agents/agents/SKILLS.md` |
| **Métricas** | M-AI-012, M-AI-013, M-AI-015 |

**Regla exacta:**

1. El agente **no** persiste dictámenes de acreditación ni aprueba/rechaza indicadores sin actor humano [TD].
2. Toda salida IA persistida incluye: `prompt_hash`, `model_id`, `trace_id`, `rationale` (≤ 280 caracteres).
3. Textos para actas o comunicación externa: marca `BORRADOR — NO DISTRIBUIR` hasta firma [JD].
4. Ante duda normativa CEUB/ARCU-SUR: responder `UNKNOWN` y citar `docs/LFSD.md` — no inventar artículos ni resoluciones.

---

## 4. Matriz DR ↔ RB ↔ UC

| DR | CR-SIG | RB / BR | FSD-UC |
|----|--------|---------|--------|
| DR-01 | CR-SIG-01 | BR-015, RB-04 | UC-002, UC-003 |
| DR-02 | CR-SIG-02 | — | Todos |
| DR-03 | CR-SIG-03 | RB-10 | Todos (UI) |
| DR-04 | CR-SIG-04 | — | Tests, seeds, diagramas |
| DR-05 | — | RB-03, BR-014 | UC-003 |
| DR-06 | — | RB-04 | UC-002, UC-009 |
| DR-07 | — | RB-11 | UC-003, UC-005, skills v2 |

---

## 5. Checklist PR (agente / desarrollador)

Antes de solicitar revisión humana:

- [ ] PR declara `FSD-UC-xxx` y `TC-xx` (DR-02)
- [ ] Sin datos ficticios institucionales sin `TEST_` / `FICTIONAL_EXAMPLE` (DR-04)
- [ ] Mensajes UI en español con roles [CC]/[TD]/[JD] (DR-03)
- [ ] Cambios en evidencias: `indicador_id` y sin DELETE físico (DR-01, DR-06)
- [ ] Workflow: validaciones RB-03 en servicio de subfase (DR-05)
- [ ] Si hay sugerencia IA: metadatos trazabilidad (DR-07)
- [ ] `matriz_trazabilidad.md` actualizada si nuevo alcance (DR-02)

---

## 6. Errores frecuentes del agente (anti-patrones)

| Anti-patrón | Regla violada | Corrección |
|-------------|---------------|------------|
| Inventar “Resolución CEUB 123/2026” en seed | DR-04 | `TEST_resolucion_001` + comentario fictional |
| Cerrar subfase con indicador `PENDIENTE` | DR-05 | `WF_INCOMPLETE` + lista pendientes |
| String UI “Admin approved” | DR-03 | “El [JD] autorizó…” |
| `DELETE FROM documento` en migración | DR-06 | Soft policy: solo nuevas versiones |
| PR sin ID de trazabilidad | DR-02 | Añadir UC/REQ/TC en descripción |
| LLM aprueba indicador en API | DR-07 | Solo [TD]; IA sugiere borrador |

---

## 7. Relación con reglas de negocio (RB)

Las reglas **RB-01 … RB-12** y **BR-013 … BR-015** se implementan en código y pruebas según `reglas_negocio.md`. Este archivo **no duplica** la especificación completa de cada RB; define **cómo debe comportarse el agente** al tocarlas.

| Prioridad | Si el agente propone… | Acción |
|-----------|----------------------|--------|
| **C1** | Omitir RB-01, RB-03, BR-015 | Rechazar; escalar a @ArchAgent + [TD] |
| **C2** | Cambiar umbral semáforo sin `config_dashboard` | Requerir ADR + [JD] |
| **C3** | Renombrar actor en UI | Aplicar DR-03 solamente |

---

## 8. Implementación en Cursor (`.cursor/rules/`)

| Archivo `.mdc` | Regla | Estado recomendado |
|----------------|-------|-------------------|
| `01_domain_language.mdc` | DR-03 (lenguaje ubicuo código) | Desplegado |
| `02_state_machine.mdc` | DR-05 | Desplegar en repo código |
| `03_append_only_db.mdc` | DR-06 | Desplegar en repo código |
| `04_sigesa_criterio_evidencia.mdc` | DR-01 / CR-SIG-01 | Copiar “Regla exacta” §DR-01 |
| `05_sigesa_trazabilidad_ids.mdc` | DR-02 / CR-SIG-02 | Copiar “Regla exacta” §DR-02 |
| `06_sigesa_nomenclatura_umss.mdc` | DR-03 / CR-SIG-03 | Copiar “Regla exacta” §DR-03 |
| `07_sigesa_no_datos_ficticios.mdc` | DR-04 / CR-SIG-04 | Copiar “Regla exacta” §DR-04 |

Plantillas MDC: `team/Marlene/08_agents/agents/cursor_rules.md`.

**Globs sugeridos:**

| Regla | `globs` |
|-------|---------|
| Evidencia / API docs | `**/*.{ts,py,md}`, `**/api/**` |
| Estado / workflow | `**/*{controller,service,workflow}*` |
| Append-only | `**/*{repository,model,migration}*`, `**/*.sql` |
| Trazabilidad | `**/*.{md}`, `.github/**` |

---

## 9. Trazabilidad métricas AI-SDLC

| Métrica | Reglas que alimentan |
|---------|---------------------|
| M-AI-PCOV | DR-01 … DR-07 + CR-SIG en `.mdc` |
| M-AI-SFID | Cumplimiento DR en código vs FSD |
| M-AI-TII | DR-02 + matriz sin huérfanos |
| M-AI-HRR | DR-04, DR-07 (no alucinar normativa) |

Detalle: `09_trazabilidad/metricas_ai_sdlc.md`.

---

## 10. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Consolidación CR-SIG + cursor rules + DR-05…07 |

---

*Reglas de producto ejecutables: `04_fsd/reglas_negocio.md`. Glosario: `04_fsd/glosario.md`. Gobernanza agentes: `AGENTS.md`.*
