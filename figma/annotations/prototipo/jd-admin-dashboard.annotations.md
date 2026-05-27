# Annotations — JD Administrador DUEA — Dashboard Principal

| Linked screenshot | [`../../screenshots/jd-admin-dashboard.png`](../../screenshots/jd-admin-dashboard.png) |
|---|---|
| Linked frame | [`../../frames/prototipo/jd-admin-dashboard.md`](../../frames/prototipo/jd-admin-dashboard.md) |
| Node ID | `435:450` |
| Page | Prototipo Web (`79:15`) |
| FSD-UCs | FSD-UC-003 (Crear Proceso), FSD-UC-013 (Usuarios), FSD-UC-017 (Dictamen) |

---

## Critical observations (from metadata text analysis)

### ✅ "DUEA Administrador" role label confirmed in sidebar
The sidebar explicitly labels this role. Confirms distinct [JD] role view
separate from [CC] ("Coordinador de Carrera") and [P] (public portal).

### ✅ "Alertas de Auditoría" section resolves audit gap
The prior audit report identified missing [JD] monitoring capabilities (§2.3 Coverage).
This panel shows alerts for processes requiring JD attention, covering the governance role.
The "● Estable" status indicator confirms real-time system health display.

### ✅ "Enlace Técnico" card covers TD liaison
The JD can see and access the technical liaison (TD) section, supporting the hierarchical
escalation path: CC → TD → JD in the accreditation workflow.

### ⚠️ "ÚLTIMA OBSERVACIÓN" visible to JD
The last system observation is shown in the JD dashboard. This is a read-only view
(JD cannot modify observations — TD-exclusive per glosario §8). The implementation
must enforce this permission boundary via RBAC.

### ⚠️ Process creation UI not directly visible in this frame
The "Crear Proceso" action (FSD-UC-003, JD-exclusive per glosario §Role JD) must be accessible
from this dashboard. The sidebar or a CTA button should lead to the process creation form.
Candidate frame for creation form: `436:804` or `437:1097` — not yet screenshotted.

### ⚠️ Dimension (1555px wide) wider than standard 1280px shell
The frame is 1555×1512 vs the standard 1280px layout. This suggests either:
(a) The admin panel has a wider layout with an expanded sidebar, or
(b) The frame includes surrounding context (e.g., floating modals, dropdown menus).
**Implementation note:** ensure responsive behavior at 1280px for the admin dashboard.

---

## Implementation hints

- Sidebar: use `Main menu component` (`535:222`) with admin-specific nav items
- KPI cards: use the card component from `Tablas y datos` frame patterns
- "Alertas de Auditoría" section: implement as a notification panel with severity levels
- "DUEA Administrador" label: bind to authenticated user's display name + role
- "● Estable" indicator: use `StatusBadge` component with `color-exito` + dot

---

## Open questions

- [ ] Does "DUEA Administrador" frame serve both TD and JD or is it JD-exclusive?
- [ ] Where is the "Crear Proceso" button in this view? Not visible from metadata text alone.
- [ ] What does the "Enlace Técnico" card navigate to? TD profile or TD task view?
- [ ] Is the 1555px width intentional (wide layout) or a Figma artboard artifact?
- [ ] Confirm if JD can view individual indicator details or only aggregate process status.
