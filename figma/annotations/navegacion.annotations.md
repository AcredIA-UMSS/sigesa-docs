# Annotations — Navegación

| Linked screenshot | [../screenshots/navegacion.md](../screenshots/navegacion.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/navegacion.md](../frames/navegacion.md) |

## Designer notes (from frame text)

- **Main menu component:** Collapsible sidebar — two variants: `Default` (240×42) and `Expanded` (240×210).
- **Navegacion item:** Three states — `Default`, `Selected` (active background + color shift), `Pressed`.
- **Subitem:** Nested under parent item — indented, 216×33px, lighter text.
- **Perfil block:** Bottom of sidebar — avatar + user name + role, 260×84px.
- **Nav icon set:** 7 variants (`Default`, `Gestion`, `Dashboards`, `Historial`, `ayuda`, `Configuracion`, `Variant7`).
- Artboard is 1446px wide — widest breakpoint in the system.
- Navigation uses vertical auto-layout with 68px row height for menu items.

## Implementation hints

- Sidebar width: 240px fixed; content area fills remaining space.
- Active route: apply `Property 1=Selected` to current nav item.
- Icon + label inside `Navegacion` component — icon is `Iconos nav bar` component set.
- `Subitem` visible only when parent is expanded — use CSS height animation or `display:none` toggle.
- Profile block position: fixed to bottom of sidebar (`position: sticky; bottom: 0` or flex justify-end).
- Wide breakpoint (1446px): sidebar remains visible — no hamburger/drawer pattern documented.

## Open questions

- [ ] Confirm hamburger/mobile drawer behavior — no mobile artboard exists in AcredIA-native frames
- [ ] Clarify `Variant7` nav icon identity — label and route unknown
- [ ] Verify sidebar collapse behavior (icon-only mode not explicitly shown)
