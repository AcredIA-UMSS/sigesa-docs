# Tablas y datos (alt) — Retroalimentación y estados

| Field | Value |
|-------|--------|
| **Node ID** | `53:890` |
| **Dimensions** | 1024 × 1162 |
| **Category** | Components |
| **Figma** | [Open frame](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=53-890) |
| **Screenshot** | [../screenshots/tablas-y-datos-alt.md](../screenshots/tablas-y-datos-alt.md) |
| **Sibling** | [tablas-y-datos.md](tablas-y-datos.md) (`50:290`) — data tables |

## Layout structure

Vertical documentation page with 48px horizontal inset (`59px` offset in XML):

1. **Hero Section** (`53:1256`) — title + intro copy
2. **Alerts Section** (`53:1261`) — 2×2 grid of semantic alerts
3. **Confirmation Modal** (`53:1500`) — overlay demo with scrim

## Child hierarchy

```
Tablas y datos (53:890)
├── Hero Section (53:1256)
│   ├── Heading 1 — "Retroalimentación y estados"
│   └── Description paragraph
├── Alerts Section (53:1261)
│   ├── Section header + count label
│   └── Container (53:1267)
│       ├── Alert 1: Info (53:1268) — 452×122
│       ├── Alert 2: Success (53:1277)
│       ├── Alert 3: Warning (53:1286)
│       └── Alert 4: Error (53:1295)
└── Group 15 (53:1521)
    ├── Heading 4 — "Modal de confirmación"
    ├── Rectangle 5 — scrim backdrop (815×380)
    └── Confirmation Modal (53:1500) — 448×303
        ├── Modal Header (53:1501) — title + close button
        ├── Modal Content (53:1507)
        └── Modal Footer (53:1509) — Cancel + Confirm buttons
```

## Auto-layout

- Alerts: 2-column grid, ~452px card width, 24px gutter (`476 - 452 = 24`)
- Alert internal: icon tile 40×40 @ 25px inset; text stack at x=81
- Modal: fixed 448px width; footer buttons right-aligned with ~16px gap

## Spacing values

| Element | Value |
|---------|-------|
| Page horizontal inset | ~59px |
| Alert card padding | 25px |
| Alert icon size | 40×40 |
| Modal header padding | 24px horizontal, 16px vertical |
| Modal content inset | 32px |
| Footer button height | 44px |

## Typography usage

| Element | Style (inferred) |
|---------|------------------|
| Page title | `heading-xl` / 40px |
| Alert title | `heading-sm` / 23px |
| Alert body | `body-md` |
| Modal title | `heading-md` / 28px |
| Modal body | `body-md` |
| Button labels | `body-md` / 600 |

## Color usage

| Component | Semantic token |
|-----------|----------------|
| Alert Info | `color-info` tint + icon background |
| Alert Success | `color-exito` |
| Alert Warning | `color-advertencia` |
| Alert Error | `color-peligro` |
| Modal scrim | neutral overlay (~50% opacity) |
| Primary confirm button | `color-primario` + shadow |

## Component usage

| Component | Node | Variants |
|-----------|------|----------|
| Alert (info/success/warning/error) | `53:1268`–`53:1295` | 4 semantic types |
| Confirmation Modal | `53:1500` | single demo |
| Close button | `53:1504` | icon 14×14 |
| Cancel button | `53:1510` | ghost/outline |
| Confirm button | `53:1512` | primary + shadow |

## Interaction notes

- Modal shown over dimmed `Rectangle 5` scrim — implement as dialog with focus trap
- Close (×) in header dismisses without action
- Footer: Cancel (secondary) + Confirm (primary destructive context possible)
- Alerts are static — no dismiss animation documented

## Responsive / constraints

- Fixed 1024 doc width; alerts wrap to single column below ~960px in implementation
- Modal max-width 448px centered on scrim

## Cross-references

- [`../components/component-inventory.md`](../components/component-inventory.md) — Alert, Modal organisms
- [`../maps/interaction-map.md`](../maps/interaction-map.md) — modal overlay graph
- [`../tokens/colors.json`](../tokens/colors.json) — semantic colors
