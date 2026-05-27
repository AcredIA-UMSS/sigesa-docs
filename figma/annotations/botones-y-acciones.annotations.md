# Annotations — Botones y Acciones

| Linked screenshot | [../screenshots/botones-y-acciones.md](../screenshots/botones-y-acciones.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/botones-y-acciones.md](../frames/botones-y-acciones.md) |

## Designer notes (from frame text)

- **Button variants documented:** Primary, Secundary, Cancelar, Eliminar proceso, Más opciones.
- **Size scale:** Pequeño (H 36px), Normal (H 48px), Grande (H 56px).
- **Primary button:** `color-primario` fill + white text + optional leading icon.
- **Eliminar proceso:** `color-peligro` fill — destructive action; isolated from positive CTAs.
- **Loading state:** Primary button displays `Cargando...` copy + spinner — all other button types do not show a loading variant.
- Button group (horizontal) documented with ~16px gap.
- Status badges (`EN PROCESO`, `ACREDITADA`, `RECHAZADA`, `NO ACREDITADA`) documented in same frame section.
- `Botones cambios` (node `26:57`, 517×908) is a WIP/change-tracking artboard within the same component cluster.

## Implementation hints

- Map `Primary Button` to primary CTA action (guardar, confirmar, enviar).
- Map `Cancelar` to dismiss/cancel flows — ghost style, no background.
- Never use `Eliminar proceso` for non-destructive actions.
- Loading state: disable interaction + show spinner inside button bounds.
- Badge height is always 28px; width adapts to label length (`pill` radius applied).
- Implement `Más opciones` as an overflow menu trigger (ellipsis / kebab pattern).

## Open questions

- [ ] Confirm if `Secundary button` has hover/focus states documented (note: "Secundary" spelling in Figma — do not correct in component names)
- [ ] Check if `Cancelar` uses `outline` or `ghost` style (no explicit fill token annotated)
- [ ] Validate icon size inside buttons per size tier (Pequeño / Normal / Grande)
