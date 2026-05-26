# Botones cambios — hover / variant lab

| Field | Value |
|-------|--------|
| **Node ID** | `26:57` |
| **Dimensions** | 517 × 908 |
| **Category** | Components (WIP) |
| **Figma** | [Open frame](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=26-57) |
| **Screenshot** | [../screenshots/botones-cambios.md](../screenshots/botones-cambios.md) |
| **Production ref** | [botones-y-acciones.md](botones-y-acciones.md) |

## Purpose

Sandbox frame isolating **Default vs hover** (and loading) states for core button component sets. Use alongside `Botones y acciones` for state matrix; prefer published instances from `24:26` for documentation.

## Layout structure

Single gray demo panel (`Rectangle 4`, 477×762) with component sets arranged in a loose grid:

| Component set | Node | Symbols | Size |
|---------------|------|---------|------|
| Primary Button | `26:50` | Default, hover | 156×48 |
| Secundary button | `522:92` | Default, hover | 156×48 |
| Cancelar | `26:59` | Default, Variant2 | 101×48 |
| Eliminar proceso | `26:73` | Default, hover | 153×48 |
| Más opciones | `26:66` | Default, hover | 134×48 |
| Cargando... | `29:121` | Default, hover | 119×48 |
| Frame 3 (compact) | `26:84` | Default, Variant2 | 118×33 |
| Frame 6 (icon?) | `34:142` | Default, hover | 73×48 |
| Cancelar con advertencia | `973:2633` | Default, Variant3 | 134×48 |

## Auto-layout

Component sets use Figma variant layout (horizontal pair, 20px inset, ~55px vertical gap between symbols).

## Interaction notes

- **Property 1=hover** on Primary, Secondary, Eliminar, Más opciones, Cargando — map to `:hover` in CSS
- **Variant2 / Variant3** on Cancelar — verify against design intent (warning vs disabled)
- Loading button maintains dimensions on hover

## Colors

- Primary hover: darker blue (`color-primario-hover`)
- Destructive hover: deeper red
- Secondary hover: subtle border/fill shift (confirm in Dev Mode)

## Cross-references

- [`../components/component-inventory.md`](../components/component-inventory.md)
- [`botones-y-acciones.md`](botones-y-acciones.md)
