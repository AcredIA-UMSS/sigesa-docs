# TD — Técnico DUEA — Bandeja de Tareas Pendientes

| Field | Value |
|-------|-------|
| **Node ID** | `1249:3112` |
| **Page** | `Prototipo Web` (`79:15`) |
| **Dimensions** | 1282 × 1589 |
| **Role** | [TD] Técnico DUEA |
| **Figma** | [Open in Figma](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=1249-3112) |
| **Screenshot** | [`../../screenshots/td-bandeja-tareas.png`](../../screenshots/td-bandeja-tareas.png) ✅ |

---

## Frame overview

This is the **core workflow screen for [TD] Técnico DUEA**. It contains the task inbox for pending
evidence reviews and the observation management workflow. The frame is a composite scroll-view
showing multiple sub-sections of the TD audit flow.

---

## Component sections (from metadata text analysis)

### 1. Panel Administrativo Header
- `UMSS DUEA` branding in sidebar
- "Panel Administrativo" title
- Search bar: "Buscar registros institucionales..."
- Sidebar navigation scoped to TD/Admin role

### 2. KPI Strip (Institutional overview)
| Metric | Value shown |
|--------|-------------|
| TOTAL FACULTADES | 12 |
| TOTAL CARRERAS | 54 |
| PROCESOS ACTIVOS | 08 |
| ACREDITADAS | — |
| EN PROCESO | — |
| VENCIDAS | — |

### 3. Bandeja de Tareas Pendientes (Task Tray) ⭐
The critical TD section. Shows the queue of submitted evidence awaiting review:

| Task card field | Example value |
|-----------------|---------------|
| Task title | "Carga de Evidencias: Fase II" |
| Task title (2) | "Carga de Evidencias: Vinculación con el Medio" |
| CTA button | **"REVISAR"** → navigates to evidence review detail |
| Dimension label | "Revisar Dimensión 2: Docencia - Medicina" |
| Indicator count | "Total: 2 Indicadores" |

**UX pattern:** Each task card in the tray represents a submitted batch of evidence from a [CC].
The TD clicks "REVISAR" to enter the dimension-level review view.

### 4. Flujo de Observaciones (Observation workflow)
Shows the observation lifecycle for a specific indicator:

| UI element | Content |
|-----------|---------|
| Header | "Flujo de trabajo de documentación y observaciones" |
| Section label | "OBSERVACIONES" |
| Observation type | "Observación (subsanación)" |
| Observation text example | "Evidencia de contrato docente incompleta para la facultad de ingeniería." |
| Critical alert | "Observaciones críticas detectadas" |
| Empty state | "No existen observaciones realizadas aún" |

### 5. Revisión de Pares — Observed state panel
| UI element | Content |
|-----------|---------|
| Section title | "Revisión de Pares - Observada" |
| Summary | "OBSERVACIONES REALIZADAS" |
| Linked evidence | "Matriz_Indicadores_Carga_Academica.xlsx" |
| Note | "Pendiente: fotos del inventario del laboratorio" |

### 6. Indicadores de Desempeño section
| UI element | Content |
|-----------|---------|
| Section | "Indicadores de Desempeño" |
| Count | "Total: 2 Indicadores" |
| Supporting text | "Revisión sistemática de observaciones y validación de documentos." |

---

## Domain state machine coverage (from this frame)

| Transition | Covered? | UI evidence |
|-----------|---------|-------------|
| SUBIDO → APROBADO | ✅ (via REVISAR flow) | "REVISAR" CTA + approval path |
| SUBIDO → OBSERVADO | ✅ | "Flujo de observaciones" section |
| OBSERVADO state display | ✅ | "Observaciones críticas detectadas" + text |
| Empty state (no observations) | ✅ | "No existen observaciones realizadas aún" |
| SUBSANADO → APROBADO/OBSERVADO | ✅ | "Observación (subsanación)" label |

**This frame covers 4/5 indicator state transitions visible to [TD].**

---

## RBAC verification

- Sidebar navigation: "Panel Administrativo" label → TD/Admin role
- No evidence upload buttons (CC-only action) → correctly excluded
- "REVISAR" CTA present → TD-exclusive action
- "DUEA Administrador" label suggests this view is shared between TD and JD with
  scope filters — requires clarification with design team

---

## FSD traceability

| FSD item | This frame covers |
|---------|-------------------|
| FSD-UC-005 — Observar/Rechazar Indicador | "Flujo de observaciones", "REVISAR" tray |
| FSD-UC-008 — Aprobar Indicador | "REVISAR" → approval path |
| FSD-BR-05 — Observación con justificación obligatoria | Observation text field visible |
| FSD-BR-07 — Bloqueo de fase si ∃ OBSERVADO | "Observaciones críticas detectadas" alert |

---

## Export status

| Asset | Status |
|-------|--------|
| Screenshot PNG | ✅ `screenshots/td-bandeja-tareas.png` (287 KB, 1282×1589) |
| Frame metadata | ✅ this file |
| Annotations | ✅ `annotations/prototipo/td-bandeja-tareas.annotations.md` |

**Last export:** 2026-05-27 via MCP `get_screenshot`
