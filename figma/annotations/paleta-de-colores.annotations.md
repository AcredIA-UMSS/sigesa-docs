# Annotations — Paleta de Colores

| Linked screenshot | [../screenshots/paleta-de-colores.md](../screenshots/paleta-de-colores.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/paleta-de-colores.md](../frames/paleta-de-colores.md) |

## Designer notes (from frame text)

- **Brand primary:** UMSS blue `#003770` — institutional identity, primary actions, sidebar.
- **Brand accent:** UMSS red `#E30613` — CTAs, alerts, destructive highlights.
- **Semantic status palette:**
  - `color-exito` (green) — `ACREDITADA` state.
  - `color-peligro` (red) — `RECHAZADA` / `NO ACREDITADA` state.
  - `color-advertencia` (amber) — `EN PROCESO` / pending states.
  - `color-info` (blue) — `En revisión` state.
- Color ramps documented as labeled swatches (name + hex + token name).
- Background and surface colors: `#FFFFFF` (card), `#F5F7FA` (page bg).

## Implementation hints

- Map brand colors to `colors.json` token keys — see [`../tokens/colors.json`](../tokens/colors.json).
- Use `css-variables.css` for runtime theming — see [`../tokens/css-variables.css`](../tokens/css-variables.css).
- Apply `color-primario` to primary buttons, active nav items, links.
- Apply `color-peligro` exclusively for destructive/error states; never use for warnings.
- Badge dot color equals the semantic status color at full opacity.

## Open questions

- [ ] Confirm exact hex for neutral-50 … neutral-900 ramp used in table rows
- [ ] Verify dark mode variant existence (no evidence found in-frame)
