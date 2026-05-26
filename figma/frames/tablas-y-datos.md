# Tablas y datos

| Field | Value |
|-------|--------|
| **Node ID** | `50:290` |
| **Dimensions** | 1024 × 1242 |
| **Category** | Components |
| **Figma** | [Open frame](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=50-290) |
| **Screenshot** | [../screenshots/tablas-y-datos.md](../screenshots/tablas-y-datos.md) |
| **Alt frame** | [tablas-y-datos-alt.md](tablas-y-datos-alt.md) (`53:890`) — alerts + modal |

## Layout structure

Documentation artboard with standard doc header + table demo:

```
Main Content Area (51:471)
├── Header (51:472) — title + description
└── Table Section (51:477)
    ├── HorizontalBorder (51:478) — section title + action buttons
    └── Table (51:493)
        ├── Header → Row (51:494) — 7 columns
        └── Body (51:509) — data rows
```

## Table columns (header row)

| # | Cell node | Inferred column |
|---|-----------|-----------------|
| 1 | `51:495` | ID / Código |
| 2 | `51:497` | Programa |
| 3 | `51:499` | Facultad |
| 4 | `51:501` | Estado |
| 5 | `51:503` | Fecha |
| 6 | `51:505` | Progreso |
| 7 | `51:507` | Acciones |

## Sample row states

| Row | Node | Estado badge | Progress |
|-----|------|--------------|----------|
| Row 1: En Revisión | `51:510` | "En revisión" chip | bar + % |
| Row 2: Aprobado | `51:531` | "Aprobado" chip | bar + % |
| Row 3+ | (see XML) | various | — |

Row height: **72px**; header row: **46px**.

## Section toolbar

| Button | Node | Action (inferred) |
|--------|------|-------------------|
| Filter / export | `51:485` | icon + label |
| Add / action | `51:489` | icon + label |

## Auto-layout

- Table: fixed column widths (124–166px first columns)
- Status chips: 80px wide, centered in cell
- Progress: 6px height bar + percentage label
- Action cell: icon button 28.5×23.25

## Spacing values

| Value | Usage |
|-------|-------|
| 32px | Page padding |
| 24px | Cell horizontal padding |
| 16px | Header cell vertical padding |
| 960px | Table width |

## Typography

- Section title: `heading-lg` / 36px
- Column headers: `label-md` / 14px uppercase (inferred)
- Cell data: `body-md` / 20px
- Status chips: `label-md`

## Color usage

- Header row: muted background
- Status "En revisión": info/warning tint
- Status "Aprobado": success tint
- Progress bar: `color-primario` fill on neutral track
- Row hover: subtle gray (implement in code)

## Component usage

- Status badges (from botones-y-acciones)
- Table action icon button
- Pagination — see [navegacion.md](navegacion.md)

## Interaction notes

- Row action button opens detail / menu (not prototyped)
- Toolbar buttons for filter and create
- Sortable columns not shown — add if required by product

## Cross-references

- [`tablas-y-datos-alt.md`](tablas-y-datos-alt.md)
- [`navegacion.md`](navegacion.md) — pagination
- [`../metadata/raw-page-elementos.xml`](../metadata/raw-page-elementos.xml) — full cell tree
