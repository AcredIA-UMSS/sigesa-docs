# Annotations — motion-loaders

| Linked screenshot | [../screenshots/motion-loaders.md](../screenshots/motion-loaders.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/motion-loaders.md](../frames/motion-loaders.md) |

## Designer notes

- Animation reference assets — not wired to navigation prototypes.
- Dot loaders 1–6 represent frame sequence for CSS/Lottie export.
- Pulse symbols (`start` / `end`) define keyframe endpoints.

## Implementation hints

- Prefer CSS animations over GIF for dot/circle loaders.
- Tie `dur-normal` (250ms) to loader cycle where applicable.
- Pair with `Cargando...` button state from botones frames.

## Open questions

- [ ] Export Lottie/SVG from Figma for each loader variant
- [ ] Accessibility: announce loading state to screen readers
