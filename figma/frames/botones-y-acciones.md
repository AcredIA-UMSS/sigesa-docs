# Botones y acciones

| Field | Value |
|-------|--------|
| **Node ID** | `24:26` (parent wrapper `952:3291`) |
| **Dimensions** | 1199 × 2627 |
| **Category** | Components |
| **Figma** | [Open in Figma](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System?node-id=24-26) |
| **Screenshot** | [../screenshots/botones-y-acciones.md](../screenshots/botones-y-acciones.md) |

## Layout structure

Vertical documentation sections (~60px left margin):

1. Variantes de botón
2. Tamaños (Pequeño, Normal, Grande)
3. Estados (default, loading, disabled)
4. Grupo de botones
5. Insignias y etiquetas de estado
6. Botones de navegacion (sidebar patterns)

## Component usage

| Instance | Purpose |
|----------|---------|
| Primary Button | Main CTA |
| Secundary button | Secondary CTA |
| Cancelar | Neutral cancel |
| Eliminar proceso | Destructive |
| Cargando... | Loading state |
| Más opciones | Menu trigger |
| Status chips | Acreditación states |
| Navegacion / Subitem / Main menu / Perfil | Shell nav |

## Typography

Section labels: 16px semibold. Buttons use `body-md` weight 600 (inferred).

## Colors

- Primary: brand blue
- Danger: semantic red
- Badges: semantic tints per state (see component inventory)

## Spacing

Demo containers: 76px height strips; button row gap ~24px; badge row gap ~10px.

## Interaction notes

- Loading replaces label on primary
- Disabled state shown as non-interactive frame
- Nav: Default / Selected / Pressed variants

## Cross-references

- [`../components/component-inventory.md`](../components/component-inventory.md)
- [`../maps/interaction-map.md`](../maps/interaction-map.md)
