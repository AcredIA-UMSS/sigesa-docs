# Annotations — body-reference-1280

| Linked screenshot | [../screenshots/body-reference-1280.md](../screenshots/body-reference-1280.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/body-reference-1280.md](../frames/body-reference-1280.md) |

## Shell composition

- Reference implementation of **Manual de Estilo** doc site chrome — not SIGESA production app, but layout patterns apply.
- Sidebar width **256px** + top bar **64px** = standard app shell for 1280 desktop.

## Implementation hints

- Map sidebar to shadcn `Sidebar` or custom layout with `grid-cols-[256px_1fr]`.
- Search input: reuse `InputText` molecule with search icon slot.
- Nav rows: 36px height matches `Navegacion` component set.

## Open questions

- [ ] Confirm nav link labels from Figma text layers (XML shows generic "Text" names)
- [ ] Wire icon buttons to notifications / profile modals
