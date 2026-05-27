# Project summary — AcredIA Design System

## Identity

| Property | Value |
|----------|--------|
| **Figma file name** | AcredIA — Design System (Copy) |
| **Previous file key** | `DX0AyrzfJQEUog45DsGEsl` (original — superseded) |
| **File key** | `8xAUbh7TScU1I4lHVTvUTS` |
| **Team context** | AcredIA / UMSS / DUEA acreditación institucional |
| **Primary URL** | https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy- |

## Pages

| Page ID | Name | Role | Export status |
|---------|------|------|---------------|
| `0:1` | Elementos | Foundations + components + reference screens | ✅ Full export (2026-05-26) |
| `79:15` | Prototipo Web | Functional prototype screens by role (CC / JD / P / AUTH) | ✅ Metadata extracted · 1 screenshot (2026-05-27) |

**Prototipo Web frame index:** [`frame-inventory-prototipo.json`](frame-inventory-prototipo.json)  
**Prototipo Web frame catalog:** [`../frames/prototipo/README.md`](../frames/prototipo/README.md)

## Frame inventory (top-level artboards)

| Frame | Node ID | Size (W×H) | Category |
|-------|---------|------------|----------|
| Tipografía | `8:2186` | 1024×825 | Foundations |
| Tokens de Diseño | `44:1259` | 1024×847 | Foundations |
| Espaciado y radio | `44:784` | 1024×1535 | Foundations |
| Paleta de Colores | `8:2187` | 1024×1203 | Foundations |
| Botones y acciones | `24:26` (inside `952:3291`) | 1199×2627 | Components |
| Formularios | `37:173` | 1024×1463 | Components |
| Navegación | `42:15` | 1446×1382 | Components |
| Tablas y datos | `50:290` | 1024×1242 | Components |
| Tablas y datos (alt) | `53:890` | 1024×1162 | Components |
| Iconografia | `56:1786` | 1024×1712 | Components |
| Body (reference UI) | `56:1522` | 1280×1747 | Layout / screen |
| Body (extended) | `1004:49` | 1280×3705 | Layout / screen |
| Botones cambios | `26:57` | 517×908 | Work-in-progress |
| Dropdown (standalone) | `1729:8294` | 273×280 | Component extract |
| Loaders / motion demos | `1676:*`, `1677:*` | various | Motion reference |

Full index: [`frame-inventory.json`](frame-inventory.json).

## Section inventory (within page)

| Section label | Typical X position | Content |
|---------------|-------------------|---------|
| FUNDAMENTOS | Left cluster (~-2866) | Tipografía, Paleta, Espaciado |
| Tokens de Diseño | Center-left (~-1610) | Semantic colors, motion duration |
| COMPONENTES | Center / right | Botones, Formularios, Navegación, Tablas, Iconografía |
| Reference Body | Far left (~-5027, -1502) | Full-page UI compositions |

## Detected platforms

| Platform | Evidence |
|----------|----------|
| **Web (primary)** | 1024px / 1280px artboards, editorial layout, form patterns |
| **Design-system doc** | Token swatches, scales, component matrices |
| **Mobile-adjacent** | Subscribed iOS / Material libraries (reference only, not primary AcredIA UI) |

## Naming conventions

| Pattern | Example | Usage |
|---------|---------|--------|
| `kebab-case` Spanish | `color-primario`, `dur-rapido` | Semantic token frames |
| `esp-N` | `esp-1` … `esp-10` | Spacing scale rows |
| Typography tokens | `display-lg`, `heading-xl`, `body-md` | Type scale |
| Component instances | `Primary Button`, `Secundary button` | UI instances (note spelling) |
| Variant properties | `Property 1=Default`, `desplegar=true` | Figma component properties |
| State badges | `EN PROCESO`, `ACREDITADA` | Acreditación domain states |

## Design system usage

- **AcredIA-native**: Custom palette (UMSS blue `#003770`, red `#E30613`), Inter + IBM Plex Mono, 4px spacing grid, semantic status colors.
- **Subscribed libraries** (reference / optional instances):
  - Material 3 Design Kit
  - Simple Design System (Figma)
  - iOS 18 / iOS 26 / iPadOS / macOS / watchOS / visionOS kits

AcredIA components in-file are **not** Material clones; they follow institutional branding with SIGESA/acreditación copy.

## Responsive breakpoints (inferred)

| Name | Width | Source |
|------|-------|--------|
| `doc` | 1024 | Foundation & component documentation frames |
| `layout` | 1280 | `Body` reference screens |
| `wide` | 1446+ | `Navegación` artboard |

Formal breakpoint tokens are **not** defined as Figma variables in the cached export; treat as layout conventions.

## Auto-layout usage

- Widespread in token documentation (`Main Content Area`, grid swatches).
- Component sections use fixed demo containers (`Rectangle 3` backgrounds) with horizontal button rows.
- Form fields use labeled stacks (~36px input height).
- Navigation menu uses variant component sets with vertical auto-layout symbols.

## Variable collections

| Status | Notes |
|--------|--------|
| **Local collections** | Not extracted (MCP `use_figma` rate-limited). Token values inferred from labeled frames and text nodes. |
| **Library variables** | Material 3, SDS, Apple HIG kits available via team libraries. |

## Style collections

| Type | In-file evidence |
|------|------------------|
| Text styles | Typography scale documented on `Tipografía` frame (token names as text, not necessarily published styles) |
| Color styles | Semantic + brand ramps on `Paleta de Colores` / `Tokens de Diseño` |
| Effect styles | Shadows on radius/spacing demo cards (`Background+Border+Shadow`) |

## Typography system (summary)

| Token | Size / weight | Sample copy |
|-------|---------------|-------------|
| `display-lg` | 3rem / 700 | Acreditación |
| `heading-xl` | 1.875rem / 600 | Evaluación Institucional |
| `heading-lg` | 1.5rem / 600 | Criterios de Evaluación |
| `heading-md` | 1.25rem / 600 | Proceso de Acreditación |
| `heading-sm` | 1.125rem / 600 | Estado del Proceso |
| `body-lg` | 1rem / 400 | Long-form institutional text |
| `body-md` | 0.875rem / 400 | Secondary descriptions |
| `label-md` | 0.75rem / 500 | ETIQUETA DE CAMPO |
| `code` | 0.875rem / 400 mono | ACRED-2025-0143 |

**Fonts:** Inter (UI), IBM Plex Mono (codes, tokens, technical data).

## Export provenance

- `get_metadata` — page `0:1` (cached XML)
- `get_libraries` — subscribed kits list
- `search_design_system` — cross-library component/variable search sample
- Pending: `use_figma` variable extraction, per-frame `get_screenshot` PNGs
