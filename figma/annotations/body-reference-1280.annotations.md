# Annotations — Body Reference (1280px)

| Linked screenshot | [../screenshots/body-reference-1280.md](../screenshots/body-reference-1280.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/body-reference-1280.md](../frames/body-reference-1280.md) |

## Designer notes (from frame text)

- **Full app shell at 1280px:** Sidebar (fixed left) + Main content area (fluid right).
- This is the primary reference screen for SIGESA/AcredIA UI layout.
- Sidebar shows: `Main menu component` with `Navegacion` items + `Perfil` block.
- Main content shows: data tables, status badges, action buttons — DUEA acreditación context.
- Frame node: `56:1522`, 1280×1747px.

## Implementation hints

- Use this frame as the ground truth for app shell proportions: sidebar ~240px, content area fills remainder.
- Page background: `#F5F7FA` (inferred surface color); sidebar: white or brand subtle.
- Content area has `esp-8` (48px) horizontal padding.
- Replicates real acreditación workflow state: list of programs with status badges.

## Open questions

- [ ] Confirm header bar height — partially visible at top of frame
- [ ] Verify if a breadcrumb or page title component appears above table
- [ ] Check for secondary right panel (detail/sidebar) — not present in this frame
