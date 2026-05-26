# Annotations — tokens-de-diseno

| Linked screenshot | [../screenshots/tokens-de-diseno.md](../screenshots/tokens-de-diseno.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/tokens-de-diseno.md](../frames/tokens-de-diseno.md) |

## Designer notes

- Semantic color tokens in 3-column grid (298.67px cells).
- Motion duration tokens: dur-rapido, dur-normal, dur-lento with clock icon demo.

## Implementation hints

- Export semantic colors to CSS variables — see [`../tokens/css-variables.css`](../tokens/css-variables.css).
- Motion tokens → `transition-duration` utilities.

## Open questions

- [ ] Figma local variables not extracted — reconcile with `use_figma` when quota available
