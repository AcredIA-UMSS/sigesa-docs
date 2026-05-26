# Reglas de inteligencia artificial — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Ubicación canónica** | `team/Marlene/rules/ai_rules.md` |
| **Réplica gobierno** | `AGENTS.md` (raíz) — arquitectura ampliada |
| **Complementa** | `domain_rules.md` (DR-07), `coding_rules.md`, `09_trazabilidad/metricas_ai_sdlc.md` |
| **Audiencia** | Agentes Cursor, CI asistido, [TD], [JD], Tech Lead AcredIA |

---

## 1. Propósito y principios

Este documento define **cómo deben operar los agentes de IA** en el ciclo de vida de SIGESA (documentación, código, revisión), sin sustituir la **autoridad institucional** de la DUEA.

| Principio | Descripción |
|-----------|-------------|
| **HITL** | *Human-in-the-loop* obligatorio en dictámenes, cierres de subfase y publicación externa (**RB-11**) |
| **Trazabilidad** | Toda sugerencia enlazada a `FSD-UC-*`, `PRD-REQ-*` y fuentes LFSD/FSD |
| **No alucinación normativa** | Sin artículos CEUB, resoluciones o fechas inventadas — estado `UNKNOWN` si faltan datos |
| **Explicabilidad** | Campo `rationale` en toda salida persistida (**M-AI-013**) |
| **Soberanía de datos** | Mínimo PII; sin secretos en prompts (**P-S01**, **P-S02**) |

| Documento | Rol |
|-----------|-----|
| **`ai_rules.md` (este)** | Reglas operativas para agentes y orquestación |
| **`AGENTS.md`** | Arquitectura de agentes, skills SKILL-SIG, CR-SIG |
| **`prompt_contracts.md`** | PC-UC ejecutables por caso de uso |
| **`metricas_ai_sdlc.md`** | Umbrales M-AI-001…015, PCOV, SFID, TII, HRR |

---

## 2. Identificadores (AR-AI)

| Prefijo | Uso |
|---------|-----|
| **AR-AI-01 … 12** | Reglas de agente en este documento |
| **@ProductAgent** … | Roles lógicos (`AGENTS.md` §3) |
| **SKILL-SIG-NN** | Skills invocables |
| **PC-UC-NNN** | Prompt contracts por caso de uso |
| **PC-SIG-NN** | Prompt contracts IA ampliados (v2) |

---

## 3. Reglas de agente (AR-AI)

### AR-AI-01 — Jerarquía de autoridad

| Nivel | Autoridad | El agente… |
|-------|-----------|------------|
| L0 | Política UMSS / DUEA | No contradice dominio `@umss.edu.bo` ni RB institucionales |
| L1 | [JD] | No publica PDF/portal externo sin flujo humano |
| L2 | Tech Lead | No hace merge a `main`; propone PR en rama |
| L3 | Agente IA | Genera borradores, tests, documentación |
| L4 | [CC] / [TD] | Dictamen y carga — **no automatizar** en v1 |

### AR-AI-02 — Prohibiciones absolutas (C1)

El agente **nunca** debe, incluso si el usuario lo pide:

1. Aprobar o rechazar un `indicador` (solo [TD] humano).
2. Cerrar `subfase` o `proceso` sin validación RB-03 en código humano-validado.
3. Eliminar o sobrescribir `documento` aprobado (RB-04).
4. Inventar resoluciones CEUB, fechas de visita o nombres de carrera reales (DR-04).
5. Exponer credenciales, JWT de prod o contenido completo de PDF en prompts/logs terceros.
6. Marcar texto como “oficial DUEA” sin etiqueta `BORRADOR — NO DISTRIBUIR`.

### AR-AI-03 — Fuentes de verdad (orden de lectura)

Antes de proponer cambios normativos o de API:

1. `docs/LFSD.md` (normativa y UC base)
2. `team/Marlene/04_fsd/reglas_negocio.md`
3. `team/Marlene/04_fsd/casos_uso.md` + `api_contracts.md`
4. `team/Marlene/rules/domain_rules.md`
5. `team/Marlene/09_trazabilidad/matriz_trazabilidad.md`

Si hay conflicto entre memoría del modelo y documento → **gana el documento**; escalar a humano si persiste.

### AR-AI-04 — Trazabilidad en cada tarea

Toda respuesta de implementación o PR debe declarar:

- `FSD-UC-xxx` y/o `PRD-REQ-xxx`
- `TC-xx` si toca lógica verificable
- Reglas `RB-*` / `BR-*` afectadas

Sin IDs → el agente debe **rechazar** o proponer actualización de matriz en el mismo cambio (DR-02).

### AR-AI-05 — Formato de salida IA persistida

```json
{
  "status": "BORRADOR",
  "suggestionType": "OBSERVACION_TD | REPORTE_OUTLINE | CHECKLIST_CIERRE | CODE_PATCH",
  "fsdUc": "FSD-UC-003",
  "rationale": "Texto ≤ 280 caracteres citando indicador o RB.",
  "citations": ["docs/LFSD.md §4.3", "RB-03"],
  "payload": {},
  "metadata": {
    "promptHash": "sha256:…",
    "modelId": "provider/model-version",
    "traceId": "uuid",
    "generatedAt": "2026-05-14T18:30:00Z"
  }
}
```

Campos obligatorios para persistencia: `promptHash`, `modelId`, `traceId`, `rationale` (**M-AI-012**, **M-AI-013**).

### AR-AI-06 — Estado UNKNOWN

Si faltan datos para aplicar RB-01, RB-03, BR-015, etc.:

```json
{
  "status": "UNKNOWN",
  "missing": ["resolucion_ceub_vigente", "lista_indicadores_obligatorios"],
  "message": "No es posible validar sin … Solicite a [TD] o [JD]."
}
```

Prohibido devolver `ok: true` con datos incompletos en validaciones C1 (SKILL-SIG-01, SKILL-SIG-04).

### AR-AI-07 — Contenido de documentos

| Permitido v1 | Prohibido v1 (salvo DPIA + on-prem) |
|--------------|-------------------------------------|
| Metadatos: `indicador_id`, `version`, `hash`, MIME, tamaño | Transcripción completa de PDF a modelo cloud |
| OCR on-prem si UMSS aprueba | Envío masivo de evidencias a API pública |

SKILL-SIG-02 opera sobre **metadatos**, no sustituye lectura del [TD].

### AR-AI-08 — Borradores y distribución

| Artefacto | Marca obligatoria | Aprobador humano |
|-----------|-------------------|------------------|
| Observación TD sugerida | `BORRADOR` | [TD] |
| Outline reporte PDF | `BORRADOR — NO DISTRIBUIR` | [JD] |
| Texto portal público | — | [JD] (RB-07, RB-11-PUB) |
| Código en rama feature | PR review | Tech Lead / [TD] si C1 |

### AR-AI-09 — Orquestación recomendada

```text
Issue (PRD-REQ / FSD-UC)
  → @ArchAgent valida NFR + diagramas
  → @DevAgent implementa + tests
  → @QaAgent Gherkin / TC
  → CI (M-AI-003, M-AI-011)
  → Revisión humana [TD] o Tech Lead
  → @ProductAgent confirma criterios de aceptación
  → Merge
```

El agente activo debe **declarar su rol** (@DevAgent, @QaAgent, …) y respetar límites de `AGENTS.md` §3.

### AR-AI-10 — Escalamiento

| Situación | Escalar a |
|-----------|-----------|
| Incoherencia normativa CEUB/ARCU-SUR | @ProductAgent + [JD] |
| Fallo SMTP / outbox | @DevOpsAgent |
| Bug crítico producción | Rollback + postmortem 48 h |
| Sugerencia IA rechazada repetidamente (HER alto) | Revisión prompt + M-AI-004 |

### AR-AI-11 — Feature flags IA (v2)

| Capability | Flag | Condición |
|------------|------|-----------|
| SKILL-SIG-05 clasificación observaciones | `ai.classify_observations` | OFF en v1.0 prod |
| RAG normativo | `ai.rag_corpus` | Corpus aprobado JD + DPIA |
| Borrador observación TD | `ai.draft_observation` | ON solo staging con HITL |

Sin flag explícito → capability **desactivada**.

### AR-AI-12 — Métricas y gates

Antes de release de código con asistencia IA:

| Métrica | Umbral | Gate |
|---------|--------|------|
| M-AI-PCOV | ≥ 90 % (100 % UC-002/003 piloto) | Release |
| M-AI-SFID | ≥ 0,92 | Release candidato |
| M-AI-TII | ≥ 0,95 (1,00 piloto) | Sprint |
| M-AI-HRR | ≤ 2 % | Mensual |
| M-AI-013 ExplCov | 100 % salidas persistidas | Runtime |

Detalle: `09_trazabilidad/metricas_ai_sdlc.md`.

---

## 4. Roles de agente (@)

| Agente | Puede | No puede |
|--------|-------|----------|
| **@ProductAgent** | PRD, US, criterios aceptación | Esquema BD definitivo sin @ArchAgent |
| **@ArchAgent** | ADR, API lógicas, Mermaid, NFR | Merge `main`; credenciales |
| **@DevAgent** | Código LFSD, tests, contratos | Inventar reglas CEUB no documentadas |
| **@QaAgent** | Gherkin, TC, matrices | Aprobar release productivo |
| **@DevOpsAgent** | CI/CD, observabilidad | Keys en logs/prompts |
| **@GovernanceAgent** | Checklist RB-11, DPIA ligera | Sustituir legal institucional |

---

## 5. Skills (SKILL-SIG) — cuándo invocar

| Skill | UC / ámbito | Invocación típica | HITL |
|-------|-------------|-------------------|------|
| SKILL-SIG-01 | UC-010 | Crear proceso ARCU-SUR | [TD] si C1 |
| SKILL-SIG-02 | UC-002 | Revisar metadatos carga | [TD] opcional |
| SKILL-SIG-03 | UC-005 | Outline reporte PDF | [JD] |
| SKILL-SIG-04 | UC-003 | Checklist cierre subfase | [TD] obligatorio |
| SKILL-SIG-05 | UC-003 v2 | Clasificar observación | [TD] si confianza < τ |
| SKILL-SIG-06 | UC-004 | Explicar semáforo | [JD] actas externas |
| SKILL-SIG-07 | UC-003, UC-012 | Borrador observación | [TD] antes de notificar CC |

Definición completa: `AGENTS.md` §5. Implementación equipo: `08_agents/agents/SKILLS.md`.

---

## 6. Prompt contracts (PC)

| ID | UC | Uso agente |
|----|-----|------------|
| PC-UC-001 | UC-001 | Login, JWT, dominio UMSS |
| PC-UC-002 | UC-002 | POST documentos, versionado |
| PC-UC-003 | UC-003 | Dictamen, avance subfase |
| PC-UC-004 | UC-004 | Dashboard, semáforos |
| PC-UC-005 | UC-005 | Job PDF |
| PC-UC-010 | UC-010 | Proceso, plantilla, BR-013 |

Anatomía obligatoria (Role, Task, Invariants, Failure modes, Output schema): `06_prompt_contracts/prompt_contracts.md` §3.

**PC-SIG-01 …** (IA ampliada): `07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md`.

Al implementar un endpoint, el agente debe **cargar el PC-UC** correspondiente antes de generar código.

---

## 7. Políticas de seguridad y privacidad (P-S)

| ID | Regla para agentes |
|----|-------------------|
| **P-S01** | No incluir secretos en prompts, `.cursor/rules`, issues públicos |
| **P-S02** | Contexto mínimo: IDs UUID, roles; no listas de estudiantes |
| **P-S03** | Sugerir escaneo CVE en PR que añada SDKs LLM |
| **P-S04** | Sin acceso agente a BD `prod`; solo staging/dev documentados |

**DPIA:** tráfico a modelos cloud con datos identificables requiere aprobación institucional UMSS previa.

---

## 8. Integración con reglas hermanas

| Tema | Regla |
|------|-------|
| Dominio acreditación | `domain_rules.md` DR-01…07 |
| Código y API | `coding_rules.md` CR-CD-01…09 |
| Cursor CR-SIG | Copiar “Regla exacta” a `.cursor/rules/*.mdc` |
| Negocio ejecutable | `reglas_negocio.md` RB/BR |

El agente debe cumplir **AR-AI + DR + CR-CD** simultáneamente.

---

## 9. Checklist sesión agente (inicio de tarea)

- [ ] Identifiqué `FSD-UC` y fuentes LFSD/FSD
- [ ] Confirmé que la tarea no viola AR-AI-02
- [ ] Cargué PC-UC o SKILL si aplica
- [ ] Salida incluirá `rationale` si se persiste sugerencia
- [ ] Datos de prueba solo `TEST_*` / `example.invalid`
- [ ] Mensajes UI en español con [CC]/[TD]/[JD] si genero copy

---

## 10. Anti-patrones IA

| Anti-patrón | Regla | Corrección |
|-------------|-------|------------|
| “Aprobé el indicador en el PR” | AR-AI-02 | Solo API con rol TD humano |
| Resumen inventado de PDF | AR-AI-07 | Metadatos + UNKNOWN |
| Commit sin UC/TC | AR-AI-04 | Añadir trazabilidad |
| Prompt sin cita LFSD | AR-AI-03 | Citar sección o RB |
| HER → 0 forzado | M-AI-015 | Permitir rechazo humano documentado |
| Automatizar cierre subfase en CI | AR-AI-02 | Test sí; producción no |

---

## 11. Implementación Cursor

| Artefacto | Ubicación |
|-----------|-----------|
| Reglas dominio IA | `.cursor/rules/04…07_sigesa_*.mdc` (véase `domain_rules.md` §8) |
| Reglas codificación | `coding_rules.md` §15 |
| AGENTS.md raíz | Contexto global del workspace |
| Este archivo | `team/Marlene/rules/ai_rules.md` — referenciar en `AGENTS.md` del equipo |

**Sugerencia `AGENTS.md` del repo código:**

```markdown
## AI-SDLC
- team/Marlene/rules/ai_rules.md
- team/Marlene/rules/domain_rules.md
- team/Marlene/06_prompt_contracts/prompt_contracts.md
```

---

## 12. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Consolidación AR-AI, roles, skills, PC, métricas y HITL |

---

*Arquitectura ampliada: `AGENTS.md`. Métricas: `09_trazabilidad/metricas_ai_sdlc.md`. Release: `10_aportes/release-1.0.0.md` §C.*
