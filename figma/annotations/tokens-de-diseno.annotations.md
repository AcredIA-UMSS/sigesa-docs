# Annotations — Tokens de Diseño

| Linked screenshot | [../screenshots/tokens-de-diseno.md](../screenshots/tokens-de-diseno.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/tokens-de-diseno.md](../frames/tokens-de-diseno.md) |

## Designer notes (from frame text)

- **Semantic color tokens:** `color-primario`, `color-secundario`, `color-peligro`, `color-advertencia`, `color-exito`, `color-info` — all mapped to raw palette values.
- **Motion tokens:** `dur-rapido` (~150ms), `dur-normal` (~250ms), `dur-lento` (~400ms) — documented as labeled rows.
- Token format in Figma: kebab-case Spanish (e.g., `color-primario`, `dur-rapido`).
- Token section uses a 3-column grid layout: name | swatch/demo | value.

## Implementation hints

- All semantic tokens are captured in [`../tokens/colors.json`](../tokens/colors.json) and [`../tokens/effects.json`](../tokens/effects.json).
- Motion tokens (`dur-*`) map to CSS `transition-duration` values; no easing curve explicitly documented — default to `ease-in-out`.
- Tailwind partial in [`../tokens/tailwind.partial.config.js`](../tokens/tailwind.partial.config.js) includes semantic color aliases.

## Open questions

- [ ] Confirm whether tokens are published as Figma Variables or remain documentation-only
- [ ] Identify if a token for `color-neutro` (table row bg, dividers) is defined
