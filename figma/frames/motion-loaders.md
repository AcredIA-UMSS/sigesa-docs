# Motion / Loaders — animation reference

| Field | Value |
|-------|--------|
| **Node ID range** | `1676:7886` – `1677:8016` |
| **Primary cluster** | `1676:7886` Frame 39 (3243×3332) |
| **Category** | Motion reference |
| **Figma** | [Dot Loader 1](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=1676-7916) |
| **Screenshot** | [../screenshots/motion-loaders.md](../screenshots/motion-loaders.md) |

## Layout structure

Scattered animation demos on canvas (not a single doc artboard):

| Asset | Node ID | Size | Type |
|-------|---------|------|------|
| Frame 39 (cluster) | `1676:7886` | 3243×3332 | iPhone / frame variants |
| Dot Loader 1–6 | `1676:7916`–`1676:7941` | 250×250 each | Sequential dot animation |
| circle-animation | `1676:7946` | 240×1740 | 6 variants (Variant1–6) |
| pulse-1 | `1677:8007` | 456×232 | start → end |
| pulse-2 | `1677:8013` | 456×232 | start → end |
| Component 1–3 | `1676:7887`–`1676:7905` | ~454×216 | Device frame loaders |

## Motion tokens (from Tokens de Diseño)

| Token | Duration | Use |
|-------|----------|-----|
| `dur-rapido` | 150ms | Micro-interactions |
| `dur-normal` | 250ms | Panel / loader cycle |
| `dur-lento` | 400ms | Page transitions |

See [`../tokens/effects.json`](../tokens/effects.json).

## Component usage

| Pattern | Implementation hint |
|---------|---------------------|
| Dot Loader | CSS keyframes or Lottie; 6-frame sequence |
| Circle animation | SVG stroke-dashoffset rotation |
| Pulse | scale + opacity `@keyframes` start/end symbols |
| Button loading | `Cargando...` text swap (see botones frames) |

## Interaction notes

- Loaders are **non-blocking indicators** — pair with disabled primary button state
- No navigation prototype links — reference only for CSS/animation specs
- iPhone frame variants suggest mobile loading contexts (secondary to 1280 web)

## Cross-references

- [`../tokens/effects.json`](../tokens/effects.json)
- [`tokens-de-diseno.md`](tokens-de-diseno.md) — Motion Tokens Section
- [`botones-y-acciones.md`](botones-y-acciones.md) — Cargando state
