# Annotations — botones-cambios

| Linked screenshot | [../screenshots/botones-cambios.md](../screenshots/botones-cambios.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/botones-cambios.md](../frames/botones-cambios.md) |

## Designer notes

- WIP sandbox — hover states isolated from main documentation frame.
- **Cancelar con advertencia** (`973:2633`) adds warning variant for destructive cancel flows.

## Implementation hints

- Map `Property 1=hover` to CSS `:hover` and `:focus-visible`.
- Preserve 48px default button height across hover transitions (no layout shift).
- Loading hover (`29:121`) should not re-enable click.

## Open questions

- [ ] Merge into published component library or keep as dev-only reference
- [ ] Variant3 on Cancelar con advertencia — document copy/color spec
