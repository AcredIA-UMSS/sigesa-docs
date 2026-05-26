# Rúbrica «Excelente» — carpeta `team/<integrante>/`

Referencia canónica de verificación: `team/aylenGonzales/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`.

## 10 criterios (pesos)

| # | Criterio | Peso | Umbral «Excelente» |
|---|----------|------|-------------------|
| 1 | BRD | 5 % | ≥10 elementos negocio (SMART, stakeholders, business case, alcance, KPIs, restricciones, supuestos, riesgos, gobernanza, criterios éxito) |
| 2 | MRD | 5 % | Segmentos, JTBD, VoC, trazabilidad a PRD |
| 3 | PRD | 10 % | ≥20 `PRD-US` INVEST+CA; ≥2 journeys; roadmap |
| 4 | FSD | 15 % | ≥30 elementos sustantivos; ≥12 `FSD-UC` desarrollados en FSD canónico |
| 5 | UC + Gherkin | 10 % | Flujo+alterno+Gherkin por UC; §4.1 caminos tristes (ideal) |
| 6 | NFR ISO 25010 | 10 % | ≥15 `NFR-001…015` con métrica+umbral+verificación (o 10+ catálogo equivalente documentado) |
| 7 | Prompt-contracts | 10 % | ≥10 PC con 6 elementos + invariants + failure modes |
| 8 | Diagramas Mermaid | 10 % | ≥10 `.mmd` en `07_diagramas/`; ≥4 tipos; cobertura UC críticos |
| 9 | AGENTS + Skills | 15 % | `AGENTS.md` + ≥7 skills accionables (o documentación rules en AGENTS) |
| 10 | Trazabilidad + métricas | 10 % | `matriz_trazabilidad.md` + `metricas_ai_sdlc.md` + `INVENTARIO_TAREAS_APORTES_v1.md` |

**Veredicto global:** contar CUMPLE / 10 (PARCIAL no suma como Excelente).

## Reglas de conteo inventario (APORTES)

Cuenta **1 tarea** cada: UC (flujo+alterno+Gherkin), NFR cuantificable, `.mmd` oficial, `##` sustantivo, ADR, POC **ejecutada** con evidencia, skill, cursor rule, PC completo, US INVEST, bitácora, código+prueba.

**No cuenta:** cosmética, duplicados (`D-*` borrador si ya existe `MAR-*`), doble conteo UC en `casos-de-uso.md` + `FSD_v2.md`.

**Co-autoría:** dos filas con observación `co-autoría con <otro>`.

Fuente automatizada: `_aportes_counts.json` (clave = nombre carpeta `team/`).

## Salidas obligatorias

| Archivo | Ruta |
|---------|------|
| Auditoría | `team/<integrante>/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` o `team/<integrante>/docs/08_trazabilidad/...` |
| Inventario | `.../INVENTARIO_TAREAS_APORTES_v1.md` |
| Log global (opcional) | `PROMPT_MAPPING.md` bloque PM-xxx |
