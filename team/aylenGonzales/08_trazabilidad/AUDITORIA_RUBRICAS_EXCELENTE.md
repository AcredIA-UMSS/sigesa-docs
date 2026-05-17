# Auditoría rúbricas «Excelente» — `team/aylenGonzales`

| Metadato | Valor |
|----------|-------|
| **Autor auditoría** | Agente IA (sesión 2026-05-16) |
| **Alcance** | Todas las subcarpetas bajo `team/aylenGonzales/` |
| **Inventario tareas** | `INVENTARIO_TAREAS_APORTES_v1.md` (250 ítems) |

---

## Resumen ejecutivo

| Criterio | Peso | Veredicto | Evidencia principal | Acción |
|----------|------|-----------|---------------------|--------|
| BRD — volumen y profundidad | 5 % | **CUMPLE** | `01_brd/BRD_v2_aylen.md` §0–§26 | Mantener; cerrar firmas §19 |
| MRD — volumen y profundidad | 5 % | **CUMPLE** | `02_mrd/MRD_v1.md` — 4 segmentos S1–S4 | — |
| PRD — volumen y profundidad | 10 % | **PARCIAL** | 17 `PRD-US-*` (umbral 20) | +3 user stories INVEST (T-248–T-250) |
| FSD — volumen y profundidad | 15 % | **CUMPLE** | `FSD_v2.md` + `casos-de-uso.md` + DTI | ≥30 elementos (ver §FSD) |
| Casos de uso + Gherkin | 10 % | **CUMPLE** | 11 `FSD-UC-*` con flujos + Gherkin | UC-011 ampliar Gherkin triste |
| NFR ISO 25010 | 10 % | **CUMPLE** | 15 NFR en `06_nfr/NFR-ISO25010.md` | 7 características cubiertas |
| Prompt-contracts | 10 % | **CUMPLE** | PC-001…PC-010 (6 elem. + inv. + failure) | Extraer PC-005…007 a archivos `.prompt.md` |
| Diagramas Mermaid | 10 % | **NO CUMPLE** | 9 `.mmd`; `seq-001` **vacío**; UC 004–011 sin seq | +11 diagramas (T-214–T-224) |
| AGENTS + Skills + Rules | 15 % | **CUMPLE** | `10_agents/AGENTS.md` + 7 skills; `.cursor/rules` ×4 dominio | Co-autoría repo `AGENTS.md` |
| Trazabilidad + métricas AI-SDLC | 10 % | **CUMPLE** | `matriz_trazabilidad.md`, `metricas_ai_sdlc.md` | Actualizar tras nuevos artefactos |

**Puntuación estimada (solo criterios «Excelente»):** 8/10 criterios cumplidos · 1 parcial (PRD) · 1 no cumple (diagramas).

---

## 1. BRD (5 %) — CUMPLE

**Fuente:** `01_brd/BRD_v2_aylen.md`

| # | Elemento rúbrica | ¿Cumple? | Evidencia |
|---|------------------|:---------:|-----------|
| 1 | Objetivos SMART | Sí | §9 — objetivos con métrica/meta |
| 2 | Stakeholders | Sí | §0, §4, §10 RACI |
| 3 | Business case ROI/NPV | Sí | §15 beneficios / costos |
| 4 | Alcance | Sí | §14 en/fuera/piloto |
| 5 | KPIs | Sí | §8 North Star + apoyo |
| 6 | Restricciones | Sí | §13.2 |
| 7 | Supuestos | Sí | §13.1 |
| 8 | Riesgos | Sí | §16–17 |
| 9 | Gobernanza | Sí | §18 |
| 10 | Criterios de éxito | Sí | §17, checklists §25–26 |

---

## 2. MRD (5 %) — CUMPLE

**Fuente:** `02_mrd/MRD_v1.md`

| Elemento | Evidencia |
|----------|-----------|
| Segmentos (≥2) | S1 [TD], S2 [CC], S3 [JD], S4 [P] — §4.1 |
| Personas | §4.2 (4 personas) |
| JTBD | §5 |
| Voz del cliente | §6 (entrevistas Bitácora 3) |
| Competencia | §7 |
| Posicionamiento | §2 visión, §7 propuesta valor |
| Hipótesis | §12 |

---

## 3. PRD (10 %) — PARCIAL (17/20 user stories)

| Requisito | Estado | Detalle |
|-----------|--------|---------|
| ≥20 user stories INVEST + CA | **17** | `PRD-US-001` … `PRD-US-017` en §5 |
| ≥2 user journeys | **3** | §4.2 Mermaid journey [CC], [JD], [TD] |
| Roadmap | Sí | §3.3 Delivery + §3.4 Discovery |

**Gap:** faltan 3 historias para umbral 20 (propuestas en inventario T-248–T-250).

---

## 4. FSD (15 %) — CUMPLE (≥30 elementos)

Conteo conservador en `04_fsd/`:

| Tipo | Cantidad | Archivo |
|------|----------|---------|
| Casos de uso críticos | 11 | `FSD_v2.md` §4 |
| Reglas de negocio (RBN) | 15+ | `FSD_v2.md` §5 |
| Escenarios Gherkin (FSD) | 11 bloques | `FSD_v2.md` por UC |
| Escenarios Gherkin (extendido) | 24+ | `casos-de-uso.md` |
| Modelo de datos ER | 1 | `FSD_v2.md` §6 |
| Contratos API / OpenAPI refs | 1 | `FSD_v2.md` §6–§8 |
| Glosario | 5 secciones | `glossary.md` |
| Prompt-contratos | 10 | PC-001…010 |
| Integraciones | 1 | §8 |
| Matriz trazabilidad FSD | 1 | §11 |
| Plan pruebas / riesgos | 2 | §12–§13 |
| LFSD | 1 doc | `05_lfsd/LFSD_v1_aylen.md` |
| DTI | 1 doc | `09_dti/DTI_v1.md` |
| ADR | 6 | `09_dti/adr/` |

**Total elementos sustantivos:** >45.

---

## 5. Casos de uso + Gherkin (10 %) — CUMPLE

| FSD-UC | Flujo principal | Alternos | Gherkin verificable |
|--------|-----------------|----------|---------------------|
| UC-001 … UC-011 | Sí en `FSD_v2.md` | Sí (tablas A1, E1…) | Sí (`FSD_v2` + `casos-de-uso.md`) |

---

## 6. NFR ISO 25010 (10 %) — CUMPLE

**Fuente:** `06_nfr/NFR-ISO25010.md`

- **15** NFR (`NFR-001` … `NFR-015`) con métrica, umbral y verificación.
- **7** características ISO 25010 cubiertas (tabla §0).

---

## 7. Prompt-contracts (10 %) — CUMPLE

| PC | FSD-UC | 6 elementos JSON | Invariants | Failure modes |
|----|--------|------------------|------------|---------------|
| PC-001 … PC-004 | UC-001…004 | `FSD_v2.md` §7 | Sí | Sí |
| PC-005 … PC-007 | UC-005…007 | `prompt-contracts.md` (referenciado) | Sí | Sí |
| PC-008 … PC-010 | UC-008…010 | `prompt-contracts.md` | Sí | Sí |

**Nota:** PC-005…007 están documentados por referencia cruzada; recomendable materializar archivos `.prompt.md` (T-225–T-227).

---

## 8. Diagramas Mermaid (10 %) — NO CUMPLE

**Inventario `07_diagramas/`:**

| Archivo | Tipo | Bytes/contenido | UC mapeado |
|---------|------|-----------------|------------|
| `seq-001-versionado-evidencias.mmd` | Secuencia | **VACÍO** | UC-002 (pendiente) |
| `seq-002-flujo-aprobacion.mmd` | Secuencia | Vacío o mínimo | UC-003 |
| `seq-003-autenticacion-jwt.mmd` | Secuencia | Revisar | UC-001 |
| `state-flujo-001-ciclo-vida-evidencia.mmd` | Estado | Revisar | UC-002 |
| `state-flujo-002-ciclo-vida-proceso-acreditacion.mmd` | Estado | Revisar | UC-003/010 |
| `diagrama-er-001.mmd` | ER | Sí | Transversal |
| `diagrama-er-dominio-negocio.mmd` | ER | Sí | Transversal |
| `diagrama-gantt-release.mmd` | Gantt | Sí | Roadmap |
| `diagrama-gantt-sprint.mmd` | Gantt | Sí | Sprint |
| `diagrama-gantt-roadmap.mdd` | Gantt | Extensión errónea `.mdd` | Renombrar `.mmd` |

**Faltan diagramas de secuencia** para UC-004, UC-005, UC-006, UC-007, UC-008, UC-009, UC-010, UC-011 (y completar UC-002 en seq-001).

---

## 9. AGENTS + Skills + Rules (15 %) — CUMPLE

| Artefacto | Cantidad | Ruta |
|-----------|----------|------|
| AGENTS.md equipo | 1 completo | `10_agents/AGENTS.md` |
| Skills accionables | **7** | `10_agents/skills/skill_*.md` |
| Cursor rules dominio (repo) | **4+** | `.cursor/rules/01…04*.mdc` |
| AGENTS.md raíz | 1 | `AGENTS.md` (co-autoría Equipo) |

Skills: `validate_domain_rules`, `detect_spec_gaps`, `sync_traceability_matrix`, `audit_security_compliance`, `generate_adr`, `generate_pr_description`, `run_tests_and_lint`.

---

## 10. Trazabilidad + métricas AI-SDLC (10 %) — CUMPLE

| Entregable | Archivo | Métricas |
|------------|---------|----------|
| Matriz MRD→PRD→FSD | `08_trazabilidad/matriz_trazabilidad.md` | Filas MRD-N-* |
| AI-SDLC | `08_trazabilidad/metricas_ai_sdlc.md` | Prompt coverage 100 %, Spec fidelity 88,24 %, Decision coverage |

---

## 11. Otras subcarpetas (no en rúbrica principal)

| Carpeta | Contenido | Observación |
|---------|-----------|-------------|
| `00_context/` | Visión negocio v2 | Insumo BRD — cuenta como contexto |
| `05_lfsd/` | LFSD v1 | Complemento FSD |
| `09_dti/` | DTI + 6 ADR | Excelente para DTI track |
| `11_pocs/` | POC-01, POC-02 | Propuestas §1–8; §9–10 ejecución pendiente |

---

## Referencias

- Inventario 250 tareas: `INVENTARIO_TAREAS_APORTES_v1.md`
- Registro global: `PROMPT_MAPPING.md` (añadir PM-045 tras cierre de gaps)
