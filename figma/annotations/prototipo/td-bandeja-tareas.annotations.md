# Annotations — TD Técnico DUEA — Bandeja de Tareas

| Linked screenshot | [`../../screenshots/td-bandeja-tareas.png`](../../screenshots/td-bandeja-tareas.png) |
|---|---|
| Linked frame | [`../../frames/prototipo/td-bandeja-tareas.md`](../../frames/prototipo/td-bandeja-tareas.md) |
| Node ID | `1249:3112` |
| Page | Prototipo Web (`79:15`) |
| FSD-UCs | FSD-UC-005 (Observar/Rechazar), FSD-UC-008 (Aprobar Indicador) |

---

## Critical observations (from metadata text analysis)

### ✅ Task tray pattern confirmed
The "Bandeja de Tareas Pendientes" implements the core TD workflow:
each submitted batch of evidence appears as a card with a "REVISAR" CTA.
This directly supports `FSD-UC-008` (TD reviews and approves) and `FSD-UC-005` (TD observes).

### ✅ Empty state for observations exists
"No existen observaciones realizadas aún" — the design handles the zero-observation case.
This resolves the gap flagged in the prior audit report (§2.4 Missing Patterns).

### ✅ Observation text is visible (not just a count)
The frame shows the actual observation message: "Evidencia de contrato docente incompleta
para la facultad de ingeniería." This means the [CC] CAN read the observation reason directly.
**Resolves gap L from prior audit** (modal required to see observation text).

### ⚠️ "REVISAR" button leads to... where?
The metadata shows a "REVISAR" button but does not have a dedicated approval/rejection
form visible in this frame. The approve/reject modal must be in a child overlay or separate frame.
**Action required:** identify and screenshot the "Aprobar / Rechazar" confirmation modal for TD.
Candidate frames: `885:2309` (Body 1280×1574), `513:918` (Body 1280×1744).

### ⚠️ Role conflation: "DUEA Administrador" label in TD frame
The sidebar label reads "DUEA Administrador" in this frame. However the frame was identified
as the TD review dashboard through its content (Bandeja de Tareas, REVISAR). This suggests
either:
(a) The TD and JD share the same sidebar shell with different content areas (RBAC-filtered), or
(b) The label "Administrador" is used loosely to mean "DUEA staff" (TD + JD).
**Action required:** verify role routing logic with the design team.

### ✅ Observation (subsanación) type label present
"Observación (subsanación)" is explicitly labeled in the UI — this means the design
distinguishes between an initial observation and a re-observation after subsanation.
This aligns with the state machine iteration loop: `SUBSANADO → OBSERVADO` (re-rejection).

### ⚠️ "Indicadores de calidad regional MERCOSUR" visible
This text references ARCU-SUR (international modality). This confirms the frame covers
both CEUB and ARCU-SUR review flows — consistent with the domain's dual-modality design.

---

## Implementation hints

- Task tray: card list component, ordered by submission date (most recent first)
- "REVISAR" button: `Primary Button` → navigates to dimension-level review view
- Observation text: `InputAreaText` for creation; `<p>` read-only for display
- "OBSERVACIONES REALIZADAS" counter badge: maps to `StatusBadge` with count
- "Observaciones críticas detectadas" alert: `Alert 2: Success` component variant in danger style
- Empty state text: standard empty state component — "No existen observaciones realizadas aún"

---

## Open questions

- [ ] What happens when TD clicks "REVISAR"? Is there a detail screen or modal? Identify frame.
- [ ] Can TD see all careers or only assigned ones? Scope of "TOTAL CARRERAS 54" metric.
- [ ] Is the "Bandeja de Tareas" filtered by status (SUBIDO only)? Or does it show all active tasks?
- [ ] Who creates the "Observación (subsanación)" — is it auto-created when CC resubmits, or manual?
- [ ] Confirm if "Revisión de Pares" section is Fase 3 (external evaluators) or a generic label.
