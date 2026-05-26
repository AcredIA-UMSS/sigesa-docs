# Dropdown (standalone extract)

| Field | Value |
|-------|--------|
| **Node ID** | `1729:8294` |
| **Dimensions** | 273 × 280 |
| **Category** | Components |
| **Figma** | [Open frame](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=1729-8294) |
| **Screenshot** | [../screenshots/dropdown-standalone.md](../screenshots/dropdown-standalone.md) |
| **In-context** | [formularios.md](formularios.md) — `Estado del proceso` field |

## Layout structure

Minimal component-set extract with two symbols stacked vertically:

| Symbol | Node | Property | Size |
|--------|------|----------|------|
| Closed | `1729:8306` | `desplegar=false` | 233×56 |
| Open | `1729:8295` | `desplegar=true` | 233×56 (+ options panel) |

## Child hierarchy (open state)

```
Dropdown (desplegar=true)
├── Trigger row — label + chevron
└── Options list
    └── Option rows (233×36 each)
        ├── Property 1=ActiveFalse
        └── Property 1=activeTrue
```

Full set also documented at `534:389` inside Formularios frame.

## Auto-layout

- Trigger: horizontal, space-between, 56px height
- Options: vertical stack, full width 233px
- Option row height: 36px

## Typography

- Trigger label: `body-md`
- Options: `body-md` / 400

## Colors

- Border: neutral gray (`gray-300`)
- Active option: `color-primario` background tint
- Chevron: muted foreground

## Interaction notes

| Trigger | Transition |
|---------|------------|
| Click trigger | `desplegar=false` → `true` |
| Select option | commit value, close panel |
| Click outside | close (implement in code) |

## Cross-references

- [`../components/component-inventory.md`](../components/component-inventory.md) — Dropdown molecule
- [`../maps/interaction-map.md`](../maps/interaction-map.md) — form state diagram
- [`formularios.md`](formularios.md)
