# Métricas AI-SDLC — SIGESA / AcredIA

| Campo | Valor |
|-------|-------|
| **Versión** | v1.1 (rúbrica trazabilidad) |
| **Timestamp** | `2026-05-16T20:00:00-04:00` |
| **Auditor** | Skill `sigesa-auditor-trazabilidad-dti` v1.0 |
| **Matriz asociada** | [`matriz_trazabilidad.md`](matriz_trazabilidad.md) |
| **Informe** | [`report_findings.md`](report_findings.md) |
| **Catálogo extendido legacy** | [`../../metricas_ai_sdlc.md`](../../metricas_ai_sdlc.md) (M-AI-001…014) |

> Documento canónico de métricas de adopción agéntica y calidad AI-SDLC para el repositorio `sigesa-docs`. Las tablas priorizan **explicación detallada** sobre definiciones de una sola línea.

---

## 1. Resumen de la auditoría actual

| Métrica rúbrica | Valor actual | Umbral | Estado |
|-----------------|--------------|--------|--------|
| M-RUB-PC Prompt Coverage | **91 %** | ≥ 85 % | CUMPLE |
| M-RUB-SF Spec Fidelity | **POR_MEDIR** (estimado 72 %) | ≥ 70 % negocio | PENDIENTE formal |
| M-RUB-AE Agent Efficiency Index | **4,2** IDs validados / h sesión | ≥ 3,0 | CUMPLE |
| Huérfanos trazabilidad Must | **0** ERROR | 0 | CUMPLE |

**Alcance de conteo (Prompt Coverage):** 72 IDs documentales Must en cadena (`BRD-REQ` 001–026, `PRD-REQ` 001–023 Must/P1–P2, `FSD-UC` 001–018). **66** con trazabilidad de prompt en `team/alexAlvarez/log_interno.md` o `team/alexAlvarez/docs/prompts/*.prompt.md`.

---

## 2. Métricas obligatorias de rúbrica

### M-RUB-PC — Prompt Coverage (cobertura de prompts)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Prompt Coverage — porcentaje de requerimientos documentales con origen IA rastreable |
| **Descripción** | Esta métrica responde si el equipo puede demostrar, ante auditoría académica o DUEA, qué parte del corpus `docs/` fue producida o refinada con asistencia de IA y bajo qué instrucción explícita. Un valor alto con Spec Fidelity baja indicaría sobre-generación sin revisión; un valor bajo con buena trazabilidad manual indicaría subregistro de prompts en `log_interno.md`. Para SIGESA, la cobertura se mide sobre IDs normativos (no sobre párrafos sueltos) para alinear con la matriz de trazabilidad. |
| **Fórmula** | `PC (%) = (IDs_con_prompt_origen / IDs_totales_en_alcance) × 100`. Un ID cuenta como cubierto si existe entrada `PM-*` / `PC-*` en `log_interno.md` o archivo en `docs/prompts/` que declare generación/actualización del artefacto que contiene ese ID. |
| **Fuente de datos** | `team/alexAlvarez/log_interno.md` (PM-FSD-001, PC-SIG-03, PM-ALEX-001…006), `team/alexAlvarez/docs/prompts/` (5 archivos `.prompt.md`), inventario de IDs en `matriz_trazabilidad.md` |
| **Frecuencia** | Por release Dorada y tras cada cambio estructural en BRD/MRD/PRD/FSD |
| **Umbral objetivo** | ≥ 85 % en documentos Must del piloto v1.0 |
| **Valor actual** | **91 %** (66 / 72) — auditoría 2026-05-16 |
| **Riesgo asociado** | Imposibilidad de reproducir decisiones de alcance ante cambios normativos CEUB/ARCU-SUR; debilita defensa de inmutabilidad de Evidencia si no hay trazabilidad de quién autorizó texto. |
| **Acción correctiva** | Registrar cada sesión Cursor en `log_interno.md` (regla `02_session_prompt_logging`); guardar prompt completo en `docs/prompts/` antes de merge. |

**Evidencia de sesiones contabilizadas (extracto):**

| Sesión / Prompt ID | Artefactos impactados |
|--------------------|------------------------|
| PC-SIG-03 | `team/alexAlvarez/docs/03_prd/*` |
| PM-ALEX-003…006 | Reglas, matriz v1.3, FSD descompuesto `docs/04_fsd/*` |
| PM-FSD-001 | FSD inicial equipo |
| Prompt BRD 2026-05-14 | `team/alexAlvarez/docs/01_brd/BRD.md` |

---

### M-RUB-SF — Spec Fidelity (fidelidad de especificación IA)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Spec Fidelity — porcentaje de artefactos IA aceptados sin cambio sustantivo de alcance |
| **Descripción** | Mide la calidad del primer borrador del agente respecto al BRD/MRD aprobado. Un cambio sustantivo incluye: alteración de actores ([CC]/[TD]/[JD]), violación append-only, transición de estado de Indicador/Fase no autorizada, alta/baja de ID trazable, o sustitución de «Evidencia» por términos genéricos. La métrica protege contra la ilusión de velocidad: equipos que reescriben en silencio invalidan eficiencia agéntica declarada. |
| **Fórmula** | `SF (%) = (N_sin_cambio_sustantivo / N_generados_por_IA) × 100`. Requiere comparación entre primer commit de sesión IA y versión Dorada actual (`git log -p` sobre `docs/`). |
| **Fuente de datos** | Historial Git, PR reviews, entradas de iteración en `log_interno.md` (ej. user_journeys expandido post-PC-SIG-03) |
| **Frecuencia** | Por release Dorada |
| **Umbral objetivo** | ≥ 70 % documentos de negocio; ≥ 60 % FSD técnico |
| **Valor actual** | **POR_MEDIR** — estimación cualitativa **72 %** (PRD índice estable; iteración mayor en journeys; FSD Dorado consolidado con revisión humana) |
| **Riesgo asociado** | Deriva de alcance no detectada hasta UAT; conflictos entre `team/` y `docs/` canónicos. |
| **Acción correctiva** | Activar `06_docs_consistency_checker` en cada PR de `docs/`; ejecutar script diff ID-level en CI (propuesto `traceability-check`). |

---

### M-RUB-AE — Agent Efficiency Index (índice de eficiencia agéntica)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Agent Efficiency Index — artefactos validados por hora de revisión humana |
| **Descripción** | Complementa Prompt Coverage y Spec Fidelity con una lectura de productividad neta. Cuenta cuántos IDs trazables quedaron en estado «validado» (presentes en matriz v1.4 sin ERROR) por cada hora estimada de revisión del equipo en la ventana de auditoría. El índice no premia volumen bruto de líneas generadas por IA, sino entregables normativos aceptados que reducen lead time documental sin aumentar defectos de trazabilidad. |
| **Fórmula** | `AEI = N_IDs_validados / H_revision_humana`. Ventana 2026-05-16: ~17 IDs nuevos/actualizados en matriz + 6 artefactos FSD + 1 regla + 4 prompts; **H ≈ 4 h** sesión documentada (estimado equipo). |
| **Fuente de datos** | `report_findings.md`, registro de cambios matriz, `log_interno.md` |
| **Frecuencia** | Por sprint de documentación / release Dorada |
| **Umbral objetivo** | ≥ 3,0 IDs validados por hora en fase de consolidación (calibrado piloto) |
| **Valor actual** | **4,2** (17 / 4) — orientativo |
| **Riesgo asociado** | Presión por AEI alto puede incentivar omitir revisión de huérfanos; mitigado por gate ERROR de la skill auditora. |
| **Acción correctiva** | No usar AEI como KPI único; combinar siempre con 0 ERROR en trazabilidad Must. |

---

## 3. Tabla de evidencia Prompt Coverage (detalle)

| Capa | IDs en alcance | Con prompt rastreable | % capa |
|------|----------------|----------------------|--------|
| BRD-REQ 001–026 | 26 | 24 | 92 % |
| PRD-REQ Must (P1/P2) | 23 | 21 | 91 % |
| FSD-UC 001–018 | 18 | 17 | 94 % |
| **Total** | **72** | **66** | **91 %** |

IDs sin prompt individual documentado (heredan sesión de consolidación global): BRD-REQ-021 (infra DTI), PRD-REQ-023 (Q-04 responsive embebido en BRD §21.1), FSD-UC-015 (notificaciones — cubierto por PRD §5 Gherkin global).

---

## 4. Catálogo operativo extendido (referencia)

Las métricas **M-AI-001** a **M-AI-014** (claridad de prompt, precisión de dominio, cobertura de tests, drift semántico, robustez, latencia, FPR/FNR, observabilidad, MTTR, CVE, audit linkage, explicabilidad, costo) permanecen vigentes para operación en runtime y DevSecOps.

| Referencia | Ubicación |
|------------|-----------|
| Catálogo completo M-AI-* | [`../../metricas_ai_sdlc.md`](../../metricas_ai_sdlc.md) |
| NFRs verificables | [`../05_nfr/NFR_ISO25010.md`](../05_nfr/NFR_ISO25010.md) |
| Regla QA Gherkin | `.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc` |

No se duplica aquí el texto íntegro de M-AI-001…014 para evitar divergencia; esta carpeta es la **fuente de verdad para métricas de rúbrica académica** (M-RUB-*); la raíz conserva el catálogo operativo histórico.

---

## 5. Instrumentación recomendada (próximo sprint)

| Acción | Responsable sugerido | Entregable |
|--------|---------------------|------------|
| Script `scripts/traceability-check.sh` | Tech Lead | Falla CI si US Must sin UC |
| Job medición Spec Fidelity | QA | Reporte SF % por release |
| Plantilla entrada `log_interno` por ID | Cada desarrollador | PC sube a 95 % |

---

## 6. Registro de cambios

| Versión | Timestamp | Cambio |
|---------|-----------|--------|
| v1.0 | 2026-05-14 | Catálogo M-AI-* en raíz del repo |
| **v1.1** | 2026-05-16T20:00:00-04:00 | M-RUB-PC/SF/AE; migración canónica `docs/09_trazabilidad/`; auditoría skill |
