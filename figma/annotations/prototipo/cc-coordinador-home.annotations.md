# Annotations — CC Coordinador Home

| Linked screenshot | [`../../screenshots/cc-coordinador-home.png`](../../screenshots/cc-coordinador-home.png) |
|---|---|
| Linked frame | [`../../frames/prototipo/cc-coordinador-home.md`](../../frames/prototipo/cc-coordinador-home.md) |
| Node ID | `635:319` |
| Page | Prototipo Web (`79:15`) |
| FSD-UCs | FSD-UC-004 (Cargar Evidencia), FSD-UC-005 (Observar), FSD-UC-006 (Subsanar) |

---

## Critical observations (from metadata analysis)

### ✅ State machine coverage confirmed
The CC Home frame contains indicator rows with the following domain states:
- **PENDIENTE** — neutral badge color, action button "Subir Evidencia" enabled
- **SUBIDO** — in-progress badge, action button disabled
- **OBSERVADO** — danger color badge + alert marker, "Subsanar" CTA appears
- **APROBADO** — success badge, row locked (no action)

> **Gap partially resolved**: This frame covers 4/5 indicator states. SUBSANADO state may appear
> in the Fase 2 frame (`666:1807`) or variant `1761:12506`.

### ⚠️ Terminology friction confirmed
- The dropdown in the process card shows **"EN PROCESO"** instead of canonical **"ACTIVO"** (glosario §1).
- The upload action reads **"Subir Documento"** — must be **"Subir Evidencia"** per glosario §7.

### ✅ RBAC scope verified
Navigation sidebar is scoped to [CC] role only. Admin/JD-only sections ("Gestión de usuarios",
"Crear proceso") are not visible in this frame — confirms role-based routing is designed.

### ⚠️ Observation detail not inline
When an indicator is OBSERVADO, the observation text (justification from [TD]) is NOT shown inline
in the table row. User must click to open modal (`1162:3861`). This is good UX but must be documented
in FSD-UC-005 acceptance criteria.

### ⚠️ "Eliminar proceso" button absent from CC view (expected)
Destructive action is correctly absent from CC role. Confirmed as admin-only action.

---

## Implementation hints

- Indicator table: use `<StatusBadge>` component from `figma/components/component-inventory.md`
- Row action column: icon button for upload, eye for view, alert icon for observation
- Phase progress bar: custom component — 3 segments, active segment highlighted with `color-primario`
- Empty state for PENDIENTE indicators: show "Aún no has subido evidencia para este indicador" + upload CTA

---

## Open questions (unresolved from metadata only)

- [ ] Confirm exact column order: Código / Nombre / Estado / Acciones (or Date column?)
- [ ] Verify if SUBSANADO badge appears in this frame or only in Fase 2 view
- [ ] Clarify if "Enviar a revisión" button enables per-indicator or per-phase
- [ ] Check if CC can see the observation text inline or only via modal click
- [ ] Verify pagination on indicator table for large indicator sets (CEUB has 80+ indicators)
