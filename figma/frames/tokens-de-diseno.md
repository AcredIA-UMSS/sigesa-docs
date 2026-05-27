# Tokens de Diseño

| Field | Value |
|-------|--------|
| **Node ID** | `44:1259` |
| **Dimensions** | 1024 × 847 |
| **Category** | Foundations |
| **Figma** | [Open in Figma](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=44-1259) |
| **Screenshot** | [../screenshots/tokens-de-diseno.md](../screenshots/tokens-de-diseno.md) |

## Layout structure

`Main Content Area` (auto-layout vertical):

- **Header** — eyebrow `FUNDAMENTOS`, title `Tokens de diseño`
- **Semantic Color Tokens Section** — 3×3 grid of semantic swatches
- **Motion Tokens Section** — duration tokens with icon metaphors

## Semantic color frames (layer names = token IDs)

| Frame name | Role |
|------------|------|
| color-primario | Primary brand actions |
| color-primario-hover | Primary hover |
| color-peligro | Error / destructive |
| color-exito | Success |
| color-advertencia | Warning |
| color-info | Information (`#0D6EFD` labeled) |
| bg-pagina | Page background |
| bg-tarjeta | Card surface |

## Motion tokens

| Frame | Token |
|-------|-------|
| dur-rapido | Fast transitions |
| dur-normal | Default transitions |
| dur-lento | Slow / emphasis |

## Spacing values

Swatch cards ~298.67px wide; section padding 48px; grid gap ~16px.

## Cross-references

- [`../tokens/colors.json`](../tokens/colors.json)
- [`../tokens/effects.json`](../tokens/effects.json)
