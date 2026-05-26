# Auditoría rúbricas «Excelente» — `team/aylenGonzales`

| Metadato | Valor |
|----------|-------|
| **Autor auditoría** | Agente IA |
| **Fecha verificación** | 16/05/2026 |
| **Alcance** | **Únicamente** `team/aylenGonzales/` (sin `docs/`, raíz `AGENTS.md` ni `.cursor/` salvo nota) |
| **Inventario** | `INVENTARIO_TAREAS_APORTES_v1.md` (256 ítems T-001…T-256) |
| **Método** | Conteo de archivos, grep de IDs (`PRD-US-*`, `FSD-UC-*`, `NFR-*`, `PC-*`) y revisión de líneas en `07_diagramas/*.mmd` |

---

## Resumen ejecutivo

| Criterio | Peso | Veredicto | Evidencia principal | Observación |
|----------|------|-----------|---------------------|-------------|
| BRD — volumen y profundidad | 5 % | **CUMPLE** | `01_brd/BRD_v2_aylen.md` (§0–§26, checklist) | Firmas §19 pendientes institucionales |
| MRD — volumen y profundidad | 5 % | **CUMPLE** | `02_mrd/MRD_v1.md` — 4 segmentos, JTBD, VoC | — |
| PRD — volumen y profundidad | 10 % | **CUMPLE** | **20** `PRD-US-001…020`; 3 journeys §4.2; roadmap §3 | Umbral ≥20 US alcanzado |
| FSD — volumen y profundidad | 15 % | **CUMPLE** | `FSD_v2.md` + `casos-de-uso.md` + LFSD + DTI + 6 ADR | **12** UC; >45 elementos |
| Casos de uso + Gherkin | 10 % | **CUMPLE** | 12 UC con flujos; §4.1 con **12** caminos tristes | UC-012 sin diagrama seq (opcional) |
| NFR ISO 25010 | 10 % | **CUMPLE** | 15 `NFR-001…015` + complemento `NFR_IA.md` (10 IA) | 7 características ISO en §0 |
| Prompt-contracts | 10 % | **CUMPLE** | PC-001…004 en `FSD_v2.md`; PC-005…007 en `06_prompt_contracts/`; PC-008…010 en `prompt-contracts.md` | 10 PC con 6 elem. + inv. + failure |
| Diagramas Mermaid | 10 % | **CUMPLE** | **18** `.mmd` + `README.md`; 4 tipos; UC-001…011 con seq | Duplicado menor `.mdd` (ver §8) |
| AGENTS + Skills + Rules | 15 % | **CUMPLE** | `10_agents/AGENTS.md` + **7** skills | Rules `.mdc` en repo raíz, no en carpeta equipo |
| Trazabilidad + métricas AI-SDLC | 10 % | **CUMPLE** | `matriz_trazabilidad.md` v2.0/v1.1; `metricas_ai_sdlc.md` | Recalcular métrica 2a tras REQ 018–020 |

**Puntuación:** **10/10** criterios «Excelente» en alcance `team/aylenGonzales/`.

---

## 1. BRD (5 %) — CUMPLE

**Fuente verificada:** `01_brd/BRD_v2_aylen.md`

| # | Elemento rúbrica | ¿Cumple? | Evidencia |
|---|------------------|:--------:|-----------|
| 1 | Objetivos SMART | Sí | §9 |
| 2 | Stakeholders | Sí | §0, §4, §10 RACI |
| 3 | Business case ROI/NPV | Sí | §15 (VAN/TIR sujetos a validación UMSS) |
| 4 | Alcance | Sí | §14 |
| 5 | KPIs | Sí | §8 |
| 6 | Restricciones | Sí | §13.2 |
| 7 | Supuestos | Sí | §13.1 |
| 8 | Riesgos | Sí | §16–17 |
| 9 | Gobernanza | Sí | §18 |
| 10 | Criterios de éxito | Sí | §17, checklists §25–26 |

**Contexto:** `00_context/02_vision_negocio_v2.md` (insumo, no sustituye BRD).

---

## 2. MRD (5 %) — CUMPLE

**Fuente verificada:** `02_mrd/MRD_v1.md`

| Elemento | Evidencia |
|----------|-----------|
| Segmentos (≥2) | S1 [TD], S2 [CC], S3 [JD], S4 [P] — §4.1 |
| Personas | §4.2 (4) |
| JTBD | §5 |
| Voz del cliente | §6 |
| Competencia / posicionamiento | §7, §2 |
| Hipótesis | §12 |
| Trazabilidad a PRD | §14 |

---

## 3. PRD (10 %) — CUMPLE

**Fuente verificada:** `03_prd/PRD_v1.md`

| Requisito | Estado | Detalle verificado |
|-----------|--------|-------------------|
| ≥20 user stories INVEST + CA | **20/20** | Tablas §5.1–§5.9: `PRD-US-001` … `PRD-US-020` |
| ≥2 user journeys | **3** | §4.2 Mermaid journey [CC], [JD], [TD] |
| Roadmap | Sí | §3.3 Delivery + §3.4 Discovery |
| Requerimientos funcionales | **20** | `PRD-REQ-001…020` en §7 (incl. 018 plan mejora, 019 respaldo, 020 WCAG) |

**Épica E9 (cierre gap):** US-018, US-019, US-020 presentes con Gherkin en §5.9.

---

## 4. FSD (15 %) — CUMPLE

**Fuentes verificadas:** `04_fsd/FSD_v2.md`, `casos-de-uso.md`, `glossary.md`, `prompt-contracts.md`, `05_lfsd/LFSD_v1_aylen.md`, `09_dti/DTI_v1.md`, `09_dti/adr/ADR-001…006.md`

| Tipo | Cantidad | Ubicación |
|------|----------|-----------|
| Casos de uso | **12** | `FSD_v2.md` §4 — UC-001…012 |
| Reglas de negocio (RBN) | 15 | `FSD_v2.md` §5 |
| Gherkin por UC + §4.1 tristes | 12 + bloque §4.1 | `FSD_v2.md` |
| Gherkin extendido | 10+ UC | `casos-de-uso.md` |
| ER Mermaid (inline) | 1 | `FSD_v2.md` §6.1 |
| Glosario | 5 dominios | `glossary.md` |
| Prompt-contratos | 10 | §7 + `prompt-contracts.md` + `06_prompt_contracts/` |
| LFSD | 1 | `05_lfsd/LFSD_v1_aylen.md` |
| DTI + ADR | 1 + 6 | `09_dti/` |

**Total elementos sustantivos:** >45 (umbral ≥30).

**Versión legacy:** `FSD_v1.md` conservado; canónico = `FSD_v2.md`.

---

## 5. Casos de uso + Gherkin (10 %) — CUMPLE

| FSD-UC | En `FSD_v2.md` | Flujo / alternos | Gherkin nominal | Camino triste §4.1 |
|--------|----------------|------------------|-----------------|-------------------|
| UC-001 … UC-011 | Sí | Sí | Sí | Sí (12 bloques `# FSD-UC-00N`) |
| UC-012 Plan de mejora | Sí | Sí | Sí (§4 + §4.1) | Sí |

**Nota:** UC-011 y UC-012 no exigen diagrama de secuencia propio para la rúbrica de diagramas (cobertura 001–011 en `07_diagramas/`).

---

## 6. NFR ISO 25010 (10 %) — CUMPLE

| Archivo | Contenido verificado |
|---------|---------------------|
| `06_nfr/NFR-ISO25010.md` | **15** filas `NFR-001…015`; métrica, umbral, verificación; 7 características ISO §0 |
| `06_nfr/NFR_IA.md` | **10** `NFR-IA-01…10` (complemento IA ética / RB-11; no sustituye ISO) |

---

## 7. Prompt-contracts (10 %) — CUMPLE

| PC | FSD-UC | Ubicación | Archivo ejecutable |
|----|--------|-----------|-------------------|
| PC-001 … PC-004 | UC-001 … UC-004 | `FSD_v2.md` §7 | Inline |
| PC-005 … PC-007 | UC-005 … UC-007 | `04_fsd/prompt-contracts.md` + `06_prompt_contracts/` | `PC-005-reporte-pdf.prompt.md`, `PC-006-notificaciones.prompt.md`, `PC-007-busqueda-fts.prompt.md` |
| PC-008 … PC-010 | UC-008 … UC-010 | `04_fsd/prompt-contracts.md` | Inline en MD |

**Índice:** `06_prompt_contracts/README.md`.

Cada PC incluye system prompt, I/O, invariants y failure modes (muestra en `FSD_v2` §7 y `prompt-contracts.md`).

---

## 8. Diagramas Mermaid (10 %) — CUMPLE

**Carpeta verificada:** `07_diagramas/` — **18 archivos `.mmd`** + `README.md`.

| Tipo | Cantidad | Archivos |
|------|----------|----------|
| Secuencia | 11 | `seq-001`, `seq-002`, `seq-003`, `AYL-SEQ-004` … `AYL-SEQ-011` |
| Estado | 2 | `state-flujo-001`, `state-flujo-002` |
| ER | 2 | `diagrama-er-001` (115 líneas), `diagrama-er-dominio-negocio` (156 líneas) |
| Gantt | 3 | `diagrama-gantt-release`, `diagrama-gantt-sprint`, `diagrama-gantt-roadmap` |

**Mapeo UC (seq):** FSD-UC-001 → seq-003; UC-002 → seq-001; UC-003 → seq-002; UC-004…011 → AYL-SEQ-004…011 (índice en `README.md`).

**Contenido mínimo:** todos los `.mmd` listados tienen ≥19 líneas de diagrama (no vacíos).

**Observación menor:** existe `diagrama-gantt-roadmap.mdd` (duplicado legacy); canónico = `diagrama-gantt-roadmap.mmd`. Eliminar `.mdd` para evitar confusión.

---

## 9. AGENTS + Skills + Rules (15 %) — CUMPLE

**Dentro de `team/aylenGonzales/`:**

| Artefacto | Cantidad | Ruta |
|-----------|----------|------|
| AGENTS.md equipo | 1 | `10_agents/AGENTS.md` |
| Skills accionables | **7** | `10_agents/skills/skill_*.md` |

Skills verificados: `validate_domain_rules`, `detect_spec_gaps`, `sync_traceability_matrix`, `audit_security_compliance`, `generate_adr`, `generate_pr_description`, `run_tests_and_lint`.

**Rules:** los archivos `.cursor/rules/*.mdc` **no** están bajo `team/aylenGonzales/`; `10_agents/AGENTS.md` documenta las 4 reglas globales del repositorio. Para auditoría estricta de carpeta equipo: **cumple** por documentación + skills; implementación física de rules = raíz del monorepo.

---

## 10. Trazabilidad + métricas AI-SDLC (10 %) — CUMPLE

| Entregable | Archivo | Estado verificado |
|------------|---------|-------------------|
| Matriz MRD→PRD→FSD | `08_trazabilidad/matriz_trazabilidad.md` | 12 MRD-N + extensiones PRD-REQ/US 018–020; §2 con **20** REQ |
| Métricas AI-SDLC | `08_trazabilidad/metricas_ai_sdlc.md` | Prompt coverage **100 %**; chain **100 %** |
| Inventario aportes | `08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md` | 256 tareas |

**Desalineación a corregir (no bloquea rúbrica documental):** `metricas_ai_sdlc.md` §2a aún calcula sobre 17 REQ (88,24 %); la matriz ya refleja **18/20 = 90 %** trazable con REQ-016 en backlog Excel.

---

## 11. Otras subcarpetas (informativo)

| Carpeta | Archivos clave | Observación |
|---------|----------------|-------------|
| `00_context/` | `02_vision_negocio_v2.md` | Insumo BRD |
| `05_lfsd/` | `LFSD_v1_aylen.md` | Complemento FSD |
| `09_dti/` | `DTI_v1.md`, 6 ADR | Track técnico |
| `11_pocs/` | `POC-01/`, `POC-02/` | Propuestas completas; `evidencia/RESULTADOS_EJECUCION.md` = plantilla (ejecución pendiente) |

---

## 12. Gaps residuales (solo carpeta aylenGonzales)

| ID | Área | Descripción | Severidad |
|----|------|-------------|-----------|
| GAP-A01 | Repo | Eliminar `07_diagramas/diagrama-gantt-roadmap.mdd` duplicado | Baja |
| GAP-A02 | Métricas | Sincronizar `metricas_ai_sdlc.md` con 20 PRD-REQ y Spec fidelity 90 % | Media |
| GAP-A03 | POC | Ejecutar POC-01/02 y completar métricas en `evidencia/` | Media (post-doc) |
| GAP-A04 | PRD/FSD | `PRD-REQ-016` export Excel — backlog v2.0 (matriz §2) | Baja |
| GAP-A05 | BRD | Firmas institucionales §19 | Baja (proceso humano) |

---

## Referencias

- Inventario: `INVENTARIO_TAREAS_APORTES_v1.md`
- Índice diagramas: `07_diagramas/README.md`
- Registro global prompts: `PROMPT_MAPPING.md` (PM-045 cierre gaps Excelente)
