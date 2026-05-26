# Annotations — dropdown-standalone

| Linked screenshot | [../screenshots/dropdown-standalone.md](../screenshots/dropdown-standalone.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/dropdown-standalone.md](../frames/dropdown-standalone.md) |

## Designer notes

- Extracted component set for isolated inspection — duplicate of `534:389` in Formularios.
- Property `desplegar` controls open/closed state (boolean).

## Implementation hints

- Use Radix Select or Popover + Listbox for keyboard navigation.
- Fixed width **233px** in demos — allow fluid `min-w-[233px]` in production.
- Active option uses primary tint — map to `data-[state=checked]` styling.

## Open questions

- [ ] Multi-select not documented — confirm product requirement
- [ ] Scroll behavior for long option lists
