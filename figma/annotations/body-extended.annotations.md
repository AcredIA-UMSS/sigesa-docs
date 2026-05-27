# Annotations — Body Extended

| Linked screenshot | [../screenshots/body-extended.md](../screenshots/body-extended.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/body-extended.md](../frames/body-extended.md) |

## Designer notes (from frame text)

- **Extended scroll composition at 1280px:** Same shell as `body-reference-1280` but 3705px tall — 2× the height.
- Node: `1004:49` — added after main Body frame (higher node ID).
- Shows multi-section vertical scroll: additional workflow states, expanded tables, or multi-step forms.
- Likely covers: list view → detail view → form → confirmation pattern in one continuous scroll mock.

## Implementation hints

- Treat this frame as the detailed scroll narrative — use it to extract section-by-section layout specs.
- Each vertical section maps to a distinct application view/route.
- Do not implement as a single scrolling page; extract sections into individual route components.

## Open questions

- [ ] Identify exact sections visible (requires screenshot — currently `reference-only`)
- [ ] Determine if this frame shows a second workflow (subsanación / corrección) or just more of the same flow
- [ ] Verify interaction between Body and Body Extended frames in prototype mode
