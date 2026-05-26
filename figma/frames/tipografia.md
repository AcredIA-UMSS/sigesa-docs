# Tipografía

| Field | Value |
|-------|--------|
| **Node ID** | `8:2186` |
| **Dimensions** | 1024 × 825 |
| **Category** | Foundations |
| **Figma** | [Open in Figma](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=8-2186) |
| **Screenshot** | [../screenshots/tipografia.md](../screenshots/tipografia.md) |

## Layout structure

- Title block (40px inset): H1 + description
- Table: **Escala Tipográfica** with columns TOKEN | TAMAÑO / PESO | MUESTRA
- 9 type rows in grouped frames (`Grupo 1` … `Group 9`)

## Child hierarchy (summary)

```
Tipografía
├── Text: "Tipografía"
├── Text: Inter + IBM Plex Mono description
└── Group 12 — Escala Tipográfica
    ├── display-lg → 3 rem / 700
    ├── heading-xl → 1.875 rem / 600
    ├── heading-lg → 1.5 rem / 600
    ├── heading-md → 1.25 rem / 600
    ├── heading-sm → 1.125 rem / 600
    ├── body-lg → 1 rem / 400
    ├── body-md → 0.875 rem / 400
    ├── label-md → 0.75 rem / 500
    └── code → mono sample ACRED-2025-0143
```

## Auto-layout

Token column uses fixed-width badge frames (~94px). Sample text is free-positioned to the right.

## Typography usage

| Token | Spec |
|-------|------|
| display-lg | 3rem / 700 |
| heading-xl | 1.875rem / 600 |
| heading-lg | 1.5rem / 600 |
| heading-md | 1.25rem / 600 |
| heading-sm | 1.125rem / 600 |
| body-lg | 1rem / 400 |
| body-md | 0.875rem / 400 |
| label-md | 0.75rem / 500 |
| code | 0.875rem / 400 / IBM Plex Mono |

## Color usage

- Primary text: near-black on white doc background
- Token badges: neutral fill frames

## Components

Documentation-only; no component instances.

## Interaction notes

Static reference. Code sample uses bordered `Frame 2` for monospace block.

## Responsive behavior

Fixed 1024 documentation width. Scale tokens are rem-based for web implementation.

## Cross-references

- Tokens: [`../tokens/typography.json`](../tokens/typography.json)
- Annotations: [`../annotations/tipografia.annotations.md`](../annotations/tipografia.annotations.md)
