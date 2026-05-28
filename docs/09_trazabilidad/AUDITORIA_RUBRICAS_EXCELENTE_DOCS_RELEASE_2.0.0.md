# Auditoría Rúbrica «Excelente» — `docs/` · release/2.0.0

| Metadato | Valor |
|----------|-------|
| **Alcance** | Únicamente carpeta `docs/` (raíz del repo) |
| **Release objetivo** | `release/2.0.0` |
| **Fecha auditoría** | 2026-05-28 |
| **Agente** | @QaAgent · skill `sigesa-auditoria-excelente-equipo` (variante Golden Folder) |
| **Excluido** | `team/`, `context/`, `templates/`, `.cursor/`, `AGENTS.md` raíz (referenciado donde aplica criterio 3) |
| **Método** | Inspección en disco + `report_findings.md` v1.4 + conteo `.mmd` + lectura POC `RESULTADO.md` |

---

## 1. Resumen ejecutivo

| # | Criterio | Veredicto |
|---|----------|-----------|
| 1 | Coherencia y completitud documental | **PARCIAL** |
| 2 | Calidad arquitectónica + mapeo AWS | **PARCIAL** |
| 3 | AGENTS.md sincronizado y ejecutable | **CUMPLE** |
| 4 | POC medibles y ejecutadas | **CUMPLE** |
| 5 | Calidad defensa oral | **OMITIDO** |
| 6 | Mapeo rápido documentado | **PARCIAL** |
| 7 | Diagramas `.mmd` legibles y versionados | **PARCIAL** |

**Puntuación rúbrica (solo CUMPLE): 2/6** criterios automatizables (criterio 5 excluido).

**Veredicto global release/2.0.0 (documentación `docs/`):** **APTO con reservas** — cadena Dorada y POCs críticas sólidas; cerrar gaps de DTI §12–18, ADR cloud explícito, mapeo rápido tabular y saneamiento Mermaid residual antes de defensa.

---

## 2. Criterio 1 — Coherencia y completitud documental

**Umbral EXCELENTE:** MRD→PRD→FSD→DTI (§0–17) ↔ C4 ↔ Hexagonal ↔ Distribuido ↔ Event-driven ↔ AWS · trazabilidad en hitos · DTI ≥ 12/18 secciones.

| Evidencia | Estado | Ruta |
|-----------|--------|------|
| BRD completo (§0–26) | CUMPLE | [`docs/01_brd/BRD.md`](../01_brd/BRD.md) |
| MRD (§0–20) | CUMPLE | [`docs/02_mrd/MRD.md`](../02_mrd/MRD.md) |
| PRD (§0–18) | CUMPLE | [`docs/03_prd/PRD.md`](../03_prd/PRD.md) |
| FSD (§0–18, 18 UC) | CUMPLE | [`docs/04_fsd/FSD.md`](../04_fsd/FSD.md) · [`casos_uso.md`](../04_fsd/casos_uso.md) |
| DTI canónico | PARCIAL | [`docs/05_dti/DTI.md`](../05_dti/DTI.md) — §1–10, §19, §11; **faltan §12–§18** numerados |
| C4 | CUMPLE | [`c4-006-06-contexto-sistema.mmd`](../07_diagramas/c4-006-06-contexto-sistema.mmd) · [`c4-007-07-contenedores-sistema.mmd`](../07_diagramas/c4-007-07-contenedores-sistema.mmd) |
| Hexagonal | CUMPLE | DTI §3 · [`hybrid_architecture.md`](../05_dti/hybrid_architecture.md) §2 |
| Distribuido / Event-driven / AWS | CUMPLE | [`hybrid_architecture.md`](../05_dti/hybrid_architecture.md) · ADR-0010/0011/0013 |
| Trazabilidad E2E | CUMPLE | [`matriz_trazabilidad.md`](matriz_trazabilidad.md) v1.5 · [`report_findings.md`](report_findings.md) APTO · 25/25 PRD-US→UC |
| Roadmap estratégico | CUMPLE | [`docs/roadmap.md`](../roadmap.md) v2.0 |

**Veredicto:** **PARCIAL** — cadena y vistas arquitectónicas están; el DTI no cubre 12 de 18 secciones del template (hueco §12–§18).

**Gap:** `GAP-DOC-01` — Completar DTI §12–§18 o renumerar plantilla y sincronizar índice.

---

## 3. Criterio 2 — Calidad arquitectónica + mapeo AWS

**Umbral:** Trade-offs explícitos · AWS por capa justificado · ADR `0005-cloud-provider-y-estilo-de-despliegue.md`.

| Evidencia | Estado | Ruta |
|-----------|--------|------|
| Trade-offs CRUD vs hexagonal/event/append | CUMPLE | [`hybrid_architecture.md`](../05_dti/hybrid_architecture.md) §1.1–1.3 |
| Tabla servicios AWS | CUMPLE | DTI §2.4 · hybrid §2 · escenarios §2.5 |
| ADR EventBridge / SQS / S3 | CUMPLE | [`docs/adr/ADR-0010`](../adr/ADR-0010-event-driven-choreography.md) … ADR-0013 |
| ADR **0005-cloud-provider-y-estilo-de-despliegue** | **NO CUMPLE** | No existe en `docs/adr/` |
| ADR-0005 existente | Otro alcance | [`ADR-0005-audit-log-append-only-postgresql.md`](../adr/ADR-0005-audit-log-append-only-postgresql.md) (bitácora, no cloud provider) |

**Veredicto:** **PARCIAL** — arquitectura cloud bien argumentada; falta el ADR nominal de la rúbrica de curso.

**Gap:** `GAP-DOC-02` — Crear `docs/adr/ADR-0005-cloud-provider-y-estilo-de-despliegue.md` (o alinear rúbrica al ADR-0006/0010 y actualizar índice).

---

## 4. Criterio 3 — AGENTS.md sincronizado y ejecutable

**Alcance `docs/`:** manifiesto en [`docs/08_agents/AGENTS.md`](../08_agents/AGENTS.md) (v2.2, 2026-05-27).

| Evidencia | Estado |
|-----------|--------|
| Pirámide Golden Folder `docs/01`–`09` | CUMPLE |
| 12 skills + 5 rules referenciados | CUMPLE |
| Enlace a DTI, POCs, matriz, comandos vía raíz | CUMPLE (apunta a [`AGENTS.md`](../../AGENTS.md) ejecutable) |
| Stack Node/Express, PG16, S3, EventBridge alineado DTI | CUMPLE |
| Políticas P-S01–P-S04, riesgos IA | CUMPLE |

**Veredicto:** **CUMPLE** — un agente puede operar leyendo `docs/08_agents/AGENTS.md` + raíz `AGENTS.md` + `docs/05_dti/DTI.md`.

---

## 5. Criterio 4 — POC con criterio medible y aprendizaje

| POC | UC / riesgo | Estado | Métricas | Aprendizaje |
|-----|-------------|--------|----------|-------------|
| POC-01 | Upload evidencia | **Completada** | P95 0,036 s; idempotencia 3/3 | [`RESULTADO.md`](../pocs/POC-01-evidencias-upload/RESULTADO.md) §11 |
| POC-02 | Workflow dictamen | **Completada** | ≥8/8 tests; 0 escapes cierre | [`RESULTADO.md`](../pocs/POC-02-workflow-dictamen/RESULTADO.md) |
| POC-03 | Outbox UC-015 | En ejecución | pytest verde bootstrap | [`POC-03.md`](../pocs/POC-03-notification-outbox/POC-03.md) |
| POC-04 | Audit UC-017 | En ejecución | pytest verde bootstrap | [`POC-04.md`](../pocs/POC-04-audit-log-query/POC-04.md) |

**Veredicto:** **CUMPLE** — ≥2 POC ejecutadas con hipótesis SMART, evidencia JSON/log y veredicto explícito (POC-01/02).

---

## 6. Criterio 5 — Defensa oral

**Veredicto:** **OMITIDO** (evaluación presencial).

---

## 7. Criterio 6 — Mapeo rápido documentado

**Umbral:** Tabla completa símbolo → archivo/sección → métricas antes/después.

| Evidencia | Estado |
|-----------|--------|
| Métricas M-RUB-PC / SF / AE | PARCIAL — [`metricas_ai_sdlc.md`](metricas_ai_sdlc.md) §1–2 (definición + valor actual) |
| Tabla símbolo → archivo → antes/después | **NO CUMPLE** — no hay tabla única con esa forma en `docs/` |
| Inventario Golden Folder (06–08) | PARCIAL — conteos en métricas §1.1 |

**Veredicto:** **PARCIAL**

**Gap:** `GAP-DOC-03` — Añadir en `docs/09_trazabilidad/` tabla `M-RUB-*` → `docs/<ruta>` → baseline vs actual (release 2.0.0).

---

## 8. Criterio 7 — Diagramas `.mmd`

| Métrica | Valor | Umbral |
|---------|-------|--------|
| Archivos `.mmd` en `docs/07_diagramas/` | **93** | ≥ 8 |
| Con título (frontmatter o `title:`) | Mayoría C4/seq/state/gantt recientes | Título/leyenda |
| Versionados en Git | Sí | Sí |
| Legibilidad GitHub | PARCIAL | Sin errores parse |

**Problemas detectados en auditoría:**

- `FK UK` en atributos ER (inválido Mermaid) — **corregido** en `er-004-dominio-negocio.mmd` y `er-005-negocio.mmd` durante esta auditoría.
- ~35 archivos aún con `title` **inline** dentro del cuerpo (`er-001-001.mmd`, `er-003-contexto-entidades.mmd`, varios `gantt-*`, `seq-*`) — riesgo de parse error.
- Duplicados/nomenclatura heterogénea (`er-004` vs `MRD_dominio_negocio_er.mmd` en `docs/02_mrd/07_diagramas/`).

**Veredicto:** **PARCIAL** — volumen y versionado excelentes; legibilidad uniforme pendiente.

**Gap:** `GAP-DOC-04` — Pasada Mermaid: frontmatter + una sola clave PK/FK/UK por atributo en todos los `er-*.mmd`.

---

## 9. Gaps prioritarios (solo `docs/`)

| ID | Prioridad | Acción |
|----|-----------|--------|
| GAP-DOC-01 | Alta | Completar DTI §12–§18 o actualizar plantilla/rúbrica |
| GAP-DOC-02 | Alta | ADR cloud provider con estilo de despliegue (nombre rúbrica) |
| GAP-DOC-03 | Media | Tabla mapeo rápido símbolo→archivo→métricas |
| GAP-DOC-04 | Media | Sanear `.mmd` restantes (inline `title`, `FK UK`) |
| GAP-DOC-05 | Baja | Cerrar POC-03/04 `RESULTADO.md` con veredicto SMART antes de defensa |
| GAP-DOC-06 | Baja | `docs/10_aportes/release-2.0.0.md` (hoy solo índice v1.0.0) |

---

## 10. Referencias inspeccionadas

- [`docs/pocs/README.md`](../pocs/README.md)
- [`docs/09_trazabilidad/matriz_trazabilidad.md`](matriz_trazabilidad.md)
- [`docs/09_trazabilidad/report_findings.md`](report_findings.md)
- [`docs/08_agents/AGENTS.md`](../08_agents/AGENTS.md)
- [`docs/05_dti/hybrid_architecture.md`](../05_dti/hybrid_architecture.md)
- [`docs/adr/README.md`](../adr/README.md)

---

## Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 2026-05-28 | Auditoría inicial release/2.0.0 alcance `docs/` |
