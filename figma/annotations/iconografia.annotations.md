# Annotations — Iconografía

| Linked screenshot | [../screenshots/iconografia.md](../screenshots/iconografia.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/iconografia.md](../frames/iconografia.md) |

## Designer notes (from frame text)

- **Three icon sections:** Navigation (nav bar icons), Archivos (file/document icons), Personalizacion (customization icons).
- **Nav bar icons:** Component set `937:2540` — 7 variants, 18–22px.
- **Archivos / Personalizacion:** 48–72px tile size, each with a descriptive label below.
- Frame is 1024×1712px — tallest icon documentation page.
- Icons are **vector layers** (not an icon font or SVG sprite in-file).

## Implementation hints

- Export nav bar icons as SVG from Figma (Plugin: Batch export / TinyImage) per variant.
- Map `Property 1` variant name to React component name (e.g., `Gestion` → `<IconGestion />`).
- For `Archivos` section icons: export at 2× (96px) for @2x displays.
- Do NOT use Material or SF Symbols icons for product UI — use AcredIA `Iconografia` set only.
- Status dot (6×6px ellipse inside badges) is not an icon component — it is an inline SVG circle.

## Open questions

- [ ] Export SVG sprite or individual files per icon section — see [`../icons/icon-inventory.md`](../icons/icon-inventory.md)
- [ ] Identify `Variant7` nav icon (name and intended route)
- [ ] Confirm stroke style for `Archivos` icons (filled vs outline, stroke width)
