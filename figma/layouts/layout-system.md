# Layout system — AcredIA

## Grid and columns

| Context | Width | Columns (inferred) | Gutter |
|---------|-------|-------------------|--------|
| Documentation | 1024px | 12 (928px content + 48px padding) | 16–24px |
| Semantic color grid | 928px content | 3 columns (`298.67px` cells) | ~16px |
| App reference (`Body`) | 1280px | Fluid main + fixed sidebar | — |

Content area pattern on foundation frames:

```
Main Content Area
├── Header (48px top padding)
│   ├── Eyebrow label (FUNDAMENTOS / COMPONENTES)
│   ├── Heading 1
│   └── Description paragraph
└── Sections (48px horizontal inset)
```

## Spacing system

Base unit: **4px**. Token names `esp-1` … `esp-10`.

| Token | Value | Typical use |
|-------|-------|-------------|
| esp-1 | 4px | Tight inline gap, icon padding |
| esp-2 | 8px | Chip internal gap |
| esp-3 | 12px | Compact stacks |
| esp-4 | 16px | Default component gap |
| esp-5 | 24px | Section sub-gap |
| esp-6 | 32px | Between form fields |
| esp-7 | 40px | — |
| esp-8 | 48px | Page horizontal padding |
| esp-9 | 64px | Large section breaks |
| esp-10 | 80px | Hero / major separation |

See [`../tokens/spacing.json`](../tokens/spacing.json).

## Breakpoints (convention)

| Name | Min width | Artboard evidence |
|------|-----------|-------------------|
| `doc` | — | 1024 fixed docs |
| `desktop` | 1280px | Body layouts |
| `wide` | 1446px | Navegación frame |

No Figma variables for breakpoints in cached export — define in code (Tailwind screens).

## Containers

| Container | Max width | Padding |
|-----------|-----------|---------|
| Doc content | 928px | 48px horizontal |
| Form column | 326px | 60px section offset |
| Dropdown panel | 273px | 20px internal |

## Auto-layout conventions

| Pattern | Direction | Alignment | Gap |
|---------|-----------|-----------|-----|
| Button row | Horizontal | Center | ~16px between instances |
| Form field | Vertical | Left | label 16px above field |
| Token table row | Horizontal | Center vertical | label 120px + value 100px + visual |
| Sidebar menu | Vertical | Left | 68px row height |
| Badge row | Horizontal | Center | ~10px |

## Alignment rules

- Section titles: left-aligned, full width of content column.
- Documentation eyebrows: uppercase, `label-md` style (`FUNDAMENTOS`, `COMPONENTES`).
- Form labels: always visible above control (accessibility requirement stated in copy).
- Destructive actions: right-aligned in button groups or isolated red button.

## Padding systems

| Element | Padding |
|---------|---------|
| Primary button | ~10px vertical, horizontal hug + min width |
| Input (`Frame 7`) | 10px all sides, H 36 |
| Color swatch card | 17px |
| Page header block | 48px top |

## Border radius

| Token | Value | Use |
|-------|-------|-----|
| sm | 4px | Inputs, small chips |
| md | 8px | Buttons |
| lg | 12px | Cards |
| full | pill | Badges (28px height) |

See [`../tokens/radius.json`](../tokens/radius.json).

## Related frames

- [`../frames/espaciado-y-radio.md`](../frames/espaciado-y-radio.md)
- [`../frames/body-reference-1280.md`](../frames/body-reference-1280.md)
