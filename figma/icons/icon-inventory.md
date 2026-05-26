# Icon inventory — AcredIA

**Primary frame:** `Iconografia` (`56:1786`)  
**Figma:** [Iconografia node](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=56-1786)

## Categories

| Category | Section in Figma | Node hints | Sizes |
|----------|------------------|------------|-------|
| **Navigation** | Iconos nav bar | `937:2540` component set | 18–22px |
| **Files / documents** | Section: Archivos | `328:649` | 48px tile + label |
| **Personalization** | Personalizacion | `328:649` | 48–72px |
| **Actions** | Embedded in buttons, dropdowns | chevron vectors | 10–16px |
| **Status** | Badge ellipse dots | 6×6px | inline |
| **Motion / utility** | Loader sections | 16–20px | animated |

## Navigation icon set (`Iconos nav bar`)

| Variant (Property 1) | Approx size | Inferred route |
|----------------------|-------------|----------------|
| Default | 18×18 | Home / dashboard |
| Gestion | 18×16.5 | Gestión de procesos |
| Dashboards | 18×16.5 | Dashboards |
| Historial | 18×18 | Historial |
| ayuda | 18×18 | Ayuda |
| Configuracion | 18×15 | Configuración |
| Variant7 | 18×13 | TBD — verify label in Figma |

Component set key: `937:2540` (symbols `937:2538` … `1760:10625`).

## Usage locations

| Icon context | Components / frames |
|--------------|---------------------|
| Sidebar | `Navegacion`, `Main menu component`, `Iconos nav bar` |
| Dropdown | chevron on `Estado del proceso` field (`38:255`) |
| Código acreditación | lock/token icon (`38:248`) |
| Form validation | `!` in error chip (`38:262`) |
| Tables | Tablas y datos frames |
| File upload / archivos | Iconografia — Archivos |

## Variants

- **Filled vs outline:** Navigation uses single-weight vectors; toggle pattern not documented for AcredIA set.
- **State:** Selected nav item uses `Property 1=Selected` on parent `Navegacion` (background + icon color shift).

## External icon libraries

Subscribed kits include **Google Icons (Material)** and **SF Symbols** via Apple / M3 libraries — use only when explicitly importing from those kits; prefer AcredIA `Iconografia` for product UI.

## Export TODO

- [ ] Export SVG sprite per section from Figma (Plugin: Export assets)
- [ ] Map each `Property 1` variant to React icon component name
- [ ] Record stroke width and corner style per size tier

## Related

- [`../frames/iconografia.md`](../frames/iconografia.md)
- [`../components/component-inventory.md`](../components/component-inventory.md)
