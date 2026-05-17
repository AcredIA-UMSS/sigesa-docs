---
name: sigesa-auditoria-excelente-equipo
description: |
  Audita la carpeta team/<integrante>/ contra la rúbrica institucional «Excelente» (10 criterios UMSS):
  BRD, MRD, PRD, FSD, Gherkin, NFR, prompt-contracts, diagramas, AGENTS/skills y trazabilidad.
  Emite veredicto CUMPLE/PARCIAL/NO CUMPLE e inventario de aportes sin doble conteo.
allowed-tools:
  - read
  - edit
  - ask-user
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

# Skill: Auditoría de carpeta de equipo (rúbrica Excelente)

> Verifica que el trabajo bajo `team/<integrante>/` alcance el nivel «Excelente» del curso UMSS
> antes de promover artefactos a la Golden Folder `docs/`. Complementa a `sigesa-auditor-trazabilidad-dti`,
> que audita la cadena BRD→FSD en `docs/`; esta skill audita la **entrega del integrante** y el inventario de aportes.

---

## 1. Rol y alcance

Actúas como **Lead QA** y auditor de calidad documental AcredIA. Tu ámbito cubre:

| Ámbito | Rutas |
|--------|--------|
| Entregables del integrante | `team/<integrante>/docs/`, `team/<integrante>/07_diagramas/`, `team/<integrante>/08_trazabilidad/` o equivalentes |
| Referencia Dorada (solo lectura comparativa) | `docs/01_brd/` … `docs/08_agents/`, `docs/09_trazabilidad/` |
| Glosario y gobernanza | `context/03_domain_glossary.md`, `docs/08_agents/AGENTS.md` |
| Conteo automatizado (si existe) | `_aportes_counts.json` en raíz del repo |

**No sustituyes** la aprobación del docente ni la validación normativa DUEA en producción.

---

## 2. Triggers de activación

- El usuario pide «auditar mi carpeta», «rúbrica excelente», «INVENTARIO_TAREAS_APORTES» o «veredicto AcredIA».
- Antes de cerrar un hito de release documental del equipo (`team/*/docs/`).
- Tras un PM-xxx en `log_interno.md` que declare cierre de fase BRD/PRD/FSD del integrante.
- **No activar** para generar código de aplicación ni para auditar solo `docs/` (usar `sigesa-auditor-trazabilidad-dti`).

---

## 3. Los 10 criterios (pesos y umbrales)

Referencia detallada: `team/aylenGonzales/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` (plantilla de auditoría).

| # | Criterio | Peso | Umbral «Excelente» |
|---|----------|------|-------------------|
| 1 | BRD | 5 % | ≥10 elementos de negocio (SMART, stakeholders, business case, alcance, KPIs, restricciones, supuestos, riesgos, gobernanza, criterios de éxito) |
| 2 | MRD | 5 % | Segmentos, JTBD, VoC, trazabilidad hacia PRD |
| 3 | PRD | 10 % | ≥20 `PRD-US` INVEST con criterios de aceptación; ≥2 user journeys; roadmap |
| 4 | FSD | 15 % | ≥30 elementos sustantivos; ≥12 `FSD-UC` desarrollados o alineados al FSD canónico `docs/04_fsd/` |
| 5 | UC + Gherkin | 10 % | Flujo principal + alterno + Gherkin por UC crítico; caminos tristes donde aplique |
| 6 | NFR ISO 25010 | 10 % | ≥15 NFR con métrica, umbral y verificación (o catálogo equivalente documentado) |
| 7 | Prompt-contracts | 10 % | ≥10 PC con rol, contexto, salida, invariantes y modos de fallo |
| 8 | Diagramas Mermaid | 10 % | ≥10 `.mmd` en `07_diagramas/`; ≥4 tipos; cobertura de UC críticos |
| 9 | AGENTS + Skills | 15 % | `AGENTS.md` alineado a `docs/08_agents/` + ≥7 skills accionables en `.cursor/skills/` |
| 10 | Trazabilidad + métricas | 10 % | Matriz + `metricas_ai_sdlc` + `INVENTARIO_TAREAS_APORTES_v1.md` |

**Veredicto global:** solo «Excelente» si **10/10** criterios en estado **CUMPLE** (PARCIAL no cuenta).

---

## 4. Reglas de conteo (inventario APORTES)

Cuenta **una tarea** por: UC (flujo+alterno+Gherkin), NFR cuantificable, `.mmd` oficial, sección `##` sustantiva, ADR, POC ejecutada con evidencia, skill, cursor rule, PC completo, US INVEST, bitácora, código+prueba.

**No cuenta:** cambios cosméticos, duplicados (`D-*` borrador si ya existe `MAR-*` canónico), doble conteo del mismo UC en dos archivos, columnas basura de importación (`Unnamed: 0`, `gtin`) en tablas presentadas como modelo de datos.

**Co-autoría:** dos filas con observación `co-autoría con <otro>`.

---

## 5. Procedimiento

1. Identificar `team/<integrante>/` y listar artefactos `.md`, `.mmd`, `log_interno.md`.
2. Por cada criterio 1–10, registrar evidencia (ruta, conteo, fragmento) y estado CUMPLE | PARCIAL | NO CUMPLE.
3. Contrastar terminología con glosario: Fase, Evidencia, Indicador, actores [CC]/[TD]/[JD]/[P].
4. Verificar append-only: ningún UC o API que permita borrado físico de Evidencia aprobada sin 409.
5. Redactar o actualizar `team/<integrante>/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` y `INVENTARIO_TAREAS_APORTES_v1.md`.
6. Si hay brechas Must, listar plan de subsanación con rutas exactas; no certificar Excelente.

---

## 6. Salidas obligatorias

| Artefacto | Ruta típica |
|-----------|-------------|
| Informe de auditoría | `team/<integrante>/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` |
| Inventario de aportes | `team/<integrante>/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md` |
| Entrada de sesión (opcional) | `team/<integrante>/log_interno.md` |

---

## 7. Invariantes

1. Cero emojis y cero ASCII decorativo en informes generados.
2. No inventar conteos: citar archivo y sección verificada.
3. La Golden Folder `docs/` prevalece sobre borradores locales en caso de conflicto de negocio.
4. Prohibido certificar Excelente con huérfanos Must en trazabilidad PRD-US → FSD-UC.

---

## 8. Modos de fallo

| ID | Condición | Acción |
|----|-----------|--------|
| FM-01 | Carpeta `team/<integrante>/` inexistente | Abortar; pedir ruta |
| FM-02 | Sin `08_trazabilidad/` escribible | Emitir informe en chat; no crear archivos |
| FM-03 | Usuario exige Excelente con <10 CUMPLE | Rechazar; entregar gap analysis |
| FM-04 | Modelo de datos con columnas `Unnamed: 0` | ERROR en criterio 4/6; exigir limpieza |

---

## 9. Referencias

- Rúbrica ampliada: [RUBRICA.md](RUBRICA.md) (esta carpeta)
- Manifiesto agéntico: `docs/08_agents/AGENTS.md`
- Trazabilidad Dorada: `docs/09_trazabilidad/`
- Prompt contracts: `docs/06_prompt_contracts/prompt_contracts.md`
