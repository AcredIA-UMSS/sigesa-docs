# Auditoría rúbricas «Excelente» — `team/Marlene`

| Metadato | Valor |
|----------|-------|
| **Autor auditoría** | Agente IA (`sigesa-auditoria-excelente-equipo`) |
| **Fecha verificación** | 17/05/2026 |
| **Alcance** | **Únicamente** `team/Marlene/` (sin `docs/` raíz institucional, `templates/`, `context/`) |
| **Inventario** | [`INVENTARIO_TAREAS_APORTES_v1.md`](INVENTARIO_TAREAS_APORTES_v1.md) (**200** tareas, v1.2 — T-001…T-219) |
| **Método** | Escaneo automatizado + lectura BRD/PRD/FSD/NFR/PC/diagramas + verificación de `matriz_trazabilidad.md` y `metricas_ai_sdlc.md` locales |

---

## Resumen ejecutivo

| Criterio | Peso | Veredicto | Evidencia principal | Observación |
|----------|------|-----------|---------------------|-------------|
| BRD | 5 % | **CUMPLE** | `01_brd/BRD.md` — §5–§19 (SMART, stakeholders, business case, KPIs) | 10/10 elementos rúbrica |
| MRD | 5 % | **CUMPLE** | `02_mrd/MRD.md` — segmentos, JTBD, VoC | Trazabilidad a PRD |
| PRD | 10 % | **CUMPLE** | **22** `PRD-US` en `03_prd/PRD.md` | Umbral ≥20 US |
| FSD | 15 % | **CUMPLE** | **12** `FSD-UC-001…012` en `04_fsd/FSD.md` | >30 elementos sustantivos |
| UC + Gherkin | 10 % | **CUMPLE** | 12 UC + `05_nfr/CU_BDD.md` (26 escenarios) | Flujo + alterno + Gherkin |
| NFR ISO 25010 | 10 % | **CUMPLE** | **10** NFR nombrados + **10** `NFR-IA-*` | Catálogo SMART en `NFR.md` + `NFR_IA.md` |
| Prompt-contracts | 10 % | **CUMPLE** | **20** archivos `PC-NFR-*.prompt.md` | 6 elementos + invariantes por PC |
| Diagramas Mermaid | 10 % | **CUMPLE** | **18** `MAR-*.mmd` oficiales en `07_diagramas/` | ≥4 tipos (seq, sta, er, gantt) |
| AGENTS + Skills | 15 % | **CUMPLE** | `08_agents/agents/AGENTS.md` §5 + **7** skills catalogadas | 2 skills locales + 5 repo |
| Trazabilidad + métricas | 10 % | **CUMPLE** | `matriz_trazabilidad.md` + `metricas_ai_sdlc.md` + inventario | Enlace a Golden `docs/09_trazabilidad/` |

**Puntuación:** **10/10** criterios «Excelente» en alcance `team/Marlene/`.

---

## 1. BRD (5 %) — CUMPLE

**Fuente:** `01_brd/BRD.md` (v1.0 Institucional Completo)

| Elemento rúbrica | Evidencia |
|------------------|-----------|
| Objetivos SMART | §5 |
| Stakeholders | §6 |
| Business case ROI/NPV | §7 (parametrizado UMSS) |
| Alcance | §8 |
| KPIs | §10 |
| Restricciones / supuestos / riesgos / gobernanza / éxito | §11–§19 |

---

## 2. MRD (5 %) — CUMPLE

**Fuente:** `02_mrd/MRD.md` — segmentos DUEA/carrera, JTBD, VoC, trazabilidad a PRD.

---

## 3. PRD (10 %) — CUMPLE

| Requisito | Detalle |
|-----------|---------|
| ≥20 US INVEST + CA | **22** `PRD-US` verificados en `03_prd/PRD.md` |
| ≥2 journeys | Roadmap y journeys en PRD §3–§4 |
| Roadmap | Presente en PRD |

---

## 4. FSD (15 %) — CUMPLE

**Fuente:** `04_fsd/FSD.md`

| Tipo | Cantidad |
|------|----------|
| Casos de uso | **12** (`FSD-UC-001…012`) |
| Reglas / modelo / integraciones | § sustantivos >30 elementos |
| BDD extendido | `05_nfr/CU_BDD.md` |

---

## 5. UC + Gherkin (10 %) — CUMPLE

Cada `FSD-UC` en `FSD.md` incluye flujo principal; `CU_BDD.md` aporta escenarios Gherkin por UC crítico (happy + sad paths).

---

## 6. NFR ISO 25010 (10 %) — CUMPLE

| Catálogo | Archivo | Cantidad |
|----------|---------|----------|
| Plataforma | `06_prompt_contracts/NFR.md` | **10** (`NFR-ED`, `SEG`, `FIA`, `USA`, `COM`, `MAN`, `POR`) con métrica+umbral+verificación |
| IA | `06_prompt_contracts/NFR_IA.md` | **10** `NFR-IA-01…10` |

---

## 7. Prompt-contracts (10 %) — CUMPLE

**20** PCs en `06_prompt_contracts/PC-NFR-*.prompt.md` alineados a NFR y FSD-UC.

---

## 8. Diagramas Mermaid (10 %) — CUMPLE

| Tipo | Archivos oficiales |
|------|-------------------|
| Secuencia | MAR-SEQ-001…011 |
| Estado | MAR-STA-001…003 |
| ER | MAR-ER-001…002 |
| Gantt | MAR-GANTT-001…002 |

**Total oficiales:** 18 (excluye `07_diagramas/mmd/D-*` borradores). `README.md` documenta cobertura UC.

---

## 9. AGENTS + Skills (15 %) — CUMPLE

- `08_agents/agents/AGENTS.md` — roles @ProductAgent, @ArchAgent, @QaAgent, @DevAgent.
- **7 skills** catalogadas en AGENTS §5 (2 en `SKILLS.md` + 5 runtime `.cursor/skills/`).
- `cursor_rules.md` — 3 reglas de dominio documentadas.

---

## 10. Trazabilidad + métricas (10 %) — CUMPLE

| Artefacto | Ruta |
|-----------|------|
| Matriz local | `08_trazabilidad/matriz_trazabilidad.md` |
| Métricas AI-SDLC | `08_trazabilidad/metricas_ai_sdlc.md` |
| Inventario | `INVENTARIO_TAREAS_APORTES_v1.md` |
| Narrativa aportes | `10_aportes/release-1.0.0.md` |

---

## Gaps (solo `team/Marlene/`)

| ID | Descripción | Prioridad |
|----|-------------|-----------|
| GAP-MAR01 | Firmas / aprobación formal BRD ante UMSS | Media |
| GAP-MAR02 | POC ejecutada con evidencia en `11_pocs/` | Media |
| GAP-MAR03 | `log_interno.md` en raíz integrante (bitácora sesión) | Baja |

---

## Referencias

- Inventario: `INVENTARIO_TAREAS_APORTES_v1.md`
- Rúbrica: `.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md`
- Plantilla: `team/aylenGonzales/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`
