# CC — Coordinador Home Dashboard

| Field | Value |
|-------|-------|
| **Node ID** | `635:319` |
| **Page** | `Prototipo Web` (`79:15`) |
| **Dimensions** | 1280 × 1164 |
| **Role** | [CC] Coordinador de Carrera |
| **Author** | Boris Angulo |
| **Figma** | [Open in Figma](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=635-319) |
| **Screenshot** | [`../../screenshots/cc-coordinador-home.png`](../../screenshots/cc-coordinador-home.png) ✅ |

---

## Frame overview

Main entry dashboard for the **Coordinador de Carrera [CC]** after authentication. Shows:
- Active accreditation process(es) for the career
- Indicator list with status badges (PENDIENTE / SUBIDO / OBSERVADO / APROBADO)
- Navigation sidebar with role-scoped sections
- Progress summary by Phase

---

## Component sections

### App Shell
- **Layout:** 1280px sidebar + main content area
- **Sidebar:** AcredIA Main menu component (`535:222`) — nav items: Inicio, Gestión, Documentación, Observaciones, Reportes, Información carrera
- **Header:** breadcrumb + user profile

### Main Content — Proceso overview
- Active `Proceso` card with:
  - Code badge (`ACRED-YYYY-NNNN` in monospace)
  - Status badge → `EN PROCESO` (maps to domain state: **Activo**)
  - Phase indicator bar (Fase 1 / Fase 2 / Fase 3)
  - Deadline date

### Indicator table / list
- Each row: `Indicador` code · name · **status badge** · upload action icon
- Status badge values present in this frame:
  - `PENDIENTE` (neutral dot) — awaiting evidence from CC
  - `SUBIDO` / `EN REVISIÓN` — evidence submitted, awaiting TD review
  - `OBSERVADO` (danger color) — rejected, requires subsanation
  - `APROBADO` (success color) — validated by TD

### Action buttons
- Primary: "Subir Evidencia" (maps to FSD-UC-004)
- Secondary: "Ver Observaciones" (maps to FSD-UC-005)
- Disabled: "Enviar a revisión" (available only when all Indicators uploaded)

---

## Domain state coverage

| State machine state | Visual representation | Notes |
|--------------------|----------------------|-------|
| PENDIENTE | Row with neutral badge | Awaiting CC action |
| SUBIDO | Row with info/pending badge | Awaiting TD review |
| OBSERVADO | Row with danger badge + alert icon | CC must subsanar |
| APROBADO | Row with success badge | No further action |
| SUBSANADO | — | May appear in alternate variant `1761:12506` |

---

## Sibling frames (same role)

| Frame | Node ID | Description |
|-------|---------|-------------|
| CC Fase 1 | `1143:3254` | Indicator list filtered to Phase 1 |
| CC Fase 2 | `666:1807` | Subsanation phase view |
| CC Fase 3 | `1143:3567` | External evaluation read-only |
| CC Documentación | `670:2333` | Evidence upload detail |
| CC Observaciones | `671:2661` | Observation tracking |
| CC Reportes | `673:2991` | Progress reports |
| CC Modal subir doc | `782:1510` | Upload modal overlay |
| CC Modal observado | `1162:3861` | Observation detail modal |

---

## Export status

| Asset | Status |
|-------|--------|
| Screenshot PNG | ✅ `screenshots/cc-coordinador-home.png` (306 KB) |
| Frame metadata | ✅ this file |
| Annotations | ✅ `annotations/prototipo/cc-coordinador-home.annotations.md` |

**Last export:** 2026-05-27 via MCP `get_screenshot`
