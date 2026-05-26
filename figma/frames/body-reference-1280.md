# Body (reference shell) — 1280

| Field | Value |
|-------|--------|
| **Node ID** | `56:1522` |
| **Dimensions** | 1280 × 1747 |
| **Category** | Layout / screen |
| **Figma** | [Open in Figma](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=56-1522) |
| **Screenshot** | [../screenshots/body-reference-1280.md](../screenshots/body-reference-1280.md) |

## Layout structure

Full-application shell at **1280px** — fixed top bar + left sidebar + main content area.

```
Body (56:1522)
├── TopNavBar Execution (56:1759) — 1280×64, fixed top
│   ├── Brand / breadcrumb links (left)
│   └── Search + icon buttons (right)
└── Container (56:1523) — 1280×1747
    └── Aside - SideNavBar Execution (56:1524) — 256×1747 @ y=64
        ├── Manual de Estilo header (v1.0.4)
        └── Nav (56:1532) — 6× Link rows @ 36px height, 40px gap
```

## Child hierarchy (sidebar nav)

| # | Link node | Icon size | Row height |
|---|-----------|-----------|------------|
| 1 | `56:1533` | 15×15 | 36px |
| 2 | `56:1538` | 15×15 | 36px |
| 3 | `56:1543` | 15×12 | 36px |
| 4 | `56:1548` | 12×4.5 | 36px |
| 5 | `56:1553` | 14.25×15 | 36px |
| 6 | `56:1558` | 14.625×14.625 | 36px |

## Top bar details

| Zone | Node | Content |
|------|------|---------|
| Left | `56:1760` | App title + 3 breadcrumb links |
| Right | `56:1772` | Search input 256×32 (`Buscar...`) + 2 icon buttons 32–34px |

## Auto-layout

- Sidebar: vertical stack, 24px outer margin, 8px nav top margin
- Nav links: horizontal icon + label, 12px icon-to-text gap
- Top bar: horizontal split — brand cluster + utility cluster

## Spacing values

| Token / value | Usage |
|---------------|-------|
| 64px | Top nav height |
| 256px | Sidebar width |
| 24px | Sidebar padding |
| 32px | Top bar horizontal padding |
| 36px | Nav item row height |
| 40px | Nav item vertical gap |

## Typography usage

| Element | Style |
|---------|-------|
| Manual de Estilo | `heading-sm` / 28px |
| Version label | `label-md` — "v1.0.4 - Activo" |
| Nav links | `body-md` / 20px line |
| Breadcrumbs | `body-md` / 24px |
| Search placeholder | `body-md` / 18px |

## Color usage

- Sidebar background: `bg-tarjeta` / white
- Top bar: white with bottom border (inferred)
- Active nav: `color-primario` tint (see Navegacion component set)
- Icons: muted foreground → primary on selected

## Component usage

| Component | Source frame |
|-----------|--------------|
| Main menu / Navegacion | `42:15`, `535:222` |
| Perfil | botones-y-acciones |
| Search input | formularios pattern |
| Icon buttons | iconografia |

## Interaction notes

- Sidebar links map to doc sections (Manual de Estilo IA)
- Search is presentational in reference — wire to app search in implementation
- Icon buttons (notifications, profile) — no prototype exported

## Responsive / constraints

- Fixed **min-width 1280px** desktop layout
- Sidebar fixed; main content scrolls independently
- On smaller viewports: collapse sidebar to drawer (not in Figma — implement in code)

## Cross-references

- [`../layouts/layout-system.md`](../layouts/layout-system.md)
- [`body-extended.md`](body-extended.md) — marketing + content sections (`1004:49`)
- [`navegacion.md`](navegacion.md)
- [`../maps/interaction-map.md`](../maps/interaction-map.md)
