# Body (extended) — 1280 scroll composition

| Field | Value |
|-------|--------|
| **Node ID** | `1004:49` |
| **Dimensions** | 1280 × 3705 |
| **Category** | Layout / screen |
| **Figma** | [Open frame](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=1004-49) |
| **Screenshot** | [../screenshots/body-extended.md](../screenshots/body-extended.md) |
| **Shell ref** | [body-reference-1280.md](body-reference-1280.md) |

## Layout structure

Long-form landing / institutional page — vertical stack of full-width sections. No sidebar in this artboard (marketing-style layout).

| Section | Node ID | Y offset | Height | Purpose |
|---------|---------|----------|--------|---------|
| Header - Hero Section | `1004:81` | 70 | 760 | Hero + CTA buttons + campus visual |
| Section - Institutional Introduction | `1004:50` | 926 | 442 | DUEA intro + 3 feature cards |
| Section - Primary Access Grid | `1004:102` | 1464 | 384 | Quick-access tiles |
| Section - The Process | `1004:130` | 1848 | 567 | Step-by-step acreditación flow |
| Section - News & Highlights | `1004:169` | 2415 | 788 | News cards / highlights |

## Hero section (`1004:81`)

```
Header - Hero Section (1280×760)
└── Container (1004:82)
    ├── Left Content (478×387)
    │   ├── Eyebrow badge (1004:84)
    │   ├── H1 — "Excelencia que Trasciende" (1004:87)
    │   ├── Lead paragraph (1004:89)
    │   └── CTA row — Primary + Secondary buttons (1004:90)
    └── Right Visual (689×600) — campus image with shadow overlay
```

## Institutional cards (`1004:56`)

3-column card grid @ 384px each, 32px gutter:

| Card | Title | Icon tile |
|------|-------|-----------|
| Card 1 (`1004:57`) | Garantía de Calidad | 48×48 overlay |
| Card 2 (`1004:65`) | Mejora Continua | 48×48 |
| Card 3 (`1004:73`) | Visión Global | 48×48 |

Card internal padding: 33px; icon → title gap ~16px; title → body ~16px.

## Auto-layout

- Sections: full bleed 1280px width
- Content containers: 32px horizontal inset (768px max for text blocks)
- Card grid: horizontal, equal width columns
- Hero: horizontal split ~478px / 689px

## Spacing values

| Value | Usage |
|-------|-------|
| 32px | Section horizontal padding |
| 33px | Card internal padding |
| 416px | Card column offset (384 + 32 gutter) |
| 50px | Hero eyebrow → H1 gap |
| 68px | Hero CTA row height |

## Typography usage

| Element | Sample / style |
|---------|----------------|
| Hero H1 | `display-lg` scale — "Excelencia que Trasciende" |
| Section H2 | `heading-xl` — "¿Qué es la DUEA?" |
| Card H3 | `heading-md` — 26px |
| Body copy | `body-lg` / `body-md` |
| CTA buttons | `body-md` / 600 |

## Color usage

- Hero eyebrow badge: brand tint overlay
- Primary CTA: `color-primario`
- Secondary CTA: outline / ghost
- Cards: `bg-tarjeta` white on `bg-pagina`

## Component usage

- Primary / Secondary buttons (from botones-y-acciones)
- Feature cards (organism — not isolated as component set)
- Step indicator patterns (see navegacion frame)

## Interaction notes

- Hero primary CTA includes trailing arrow icon — navigate to process
- Secondary CTA — learn more / scroll to intro section
- Process section likely links to acreditación workflow (validate prototype)

## Responsive / constraints

- Designed at 1280px; cards stack to 1 column below ~1024px
- Hero splits to vertical stack on tablet
- Section spacing preserved with `esp-9` / `esp-10` between blocks

## Cross-references

- [`body-reference-1280.md`](body-reference-1280.md) — app shell variant
- [`../layouts/layout-system.md`](../layouts/layout-system.md)
- [`../maps/responsive-patterns.md`](../maps/responsive-patterns.md)
