# Iconografia

| Field | Value |
|-------|--------|
| **Node ID** | `56:1786` |
| **Dimensions** | 1024 × 1712 |
| **Category** | Components |
| **Figma** | [Open frame](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=56-1786) |
| **Screenshot** | [../screenshots/iconografia.md](../screenshots/iconografia.md) |

## Layout structure

Vertical documentation page with labeled sections (~928px content width):

| Section | Node | Height (approx) | Content |
|---------|------|-----------------|---------|
| Section: Acciones | `56:1583` | 194px | Action / file icons |
| Section: Navegación | `56:1631` | 192px | Nav-related icons |
| Section: Estados | `56:1672` | 192px | Status / state icons |
| Section: Archivos | `56:1713` | 192px | Document metaphors |
| Section: Archivos (expanded) | `328:649` | 264px | File type grid |
| Personalizacion | (toggle demos) | — | Theme / settings icons |
| Iconos nav bar | `937:2540` | — | Full sidebar icon set |

## Iconos nav bar — component set

| Variant (Property 1) | Symbol range | Size |
|----------------------|--------------|------|
| Default | `937:2538` | 18×18 |
| Gestion | — | 18×16.5 |
| Dashboards | — | 18×16.5 |
| Historial | — | 18×18 |
| ayuda | — | 18×18 |
| Configuracion | — | 18×15 |
| Variant7 | `1760:10625` | 18×13 |

## Spacing / grid

- Icon tiles in catalog: 48×48 container with 16–20px glyph
- Nav icons: 15–22px vectors inside 36px nav rows
- Section dividers: 1px horizontal rules between groups

## Typography

- Section labels: `heading-sm` / 16px semibold
- Icon labels below tiles: `label-md` / 12px

## Colors

- Default icons: `gray-600` / muted foreground
- Selected nav: `color-primario`
- Status dots: semantic colors (exito, peligro, advertencia)
- File type icons: brand + neutral mix

## Component usage

| Context | Icons used |
|---------|------------|
| Sidebar | Iconos nav bar set |
| Forms | chevron, lock, validation `!` |
| Tables | row action, filter |
| Alerts | info/success/warning/error glyphs |
| Buttons | leading icons, menu overflow |

## Interaction notes

- Nav icons swap fill/color on Selected / Pressed (parent Navegacion set)
- Toggle demos in Personalizacion — binary on/off visual
- File icons are static — no hover state documented

## Cross-references

- [`../icons/icon-inventory.md`](../icons/icon-inventory.md)
- [`navegacion.md`](navegacion.md)
- [`body-reference-1280.md`](body-reference-1280.md)
