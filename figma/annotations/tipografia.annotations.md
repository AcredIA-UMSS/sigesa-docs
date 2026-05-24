# Annotations — Tipografía

| Linked screenshot | [../screenshots/tipografia.md](../screenshots/tipografia.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/tipografia.md](../frames/tipografia.md) |

## Designer notes (from frame text)

- **Primary font:** Inter — legible, institutional, with personality.
- **Monospace:** IBM Plex Mono for codes, tokens, and technical data.
- Type scale is **rem-based** for responsive web implementation.

## Implementation hints

- Map tokens to Tailwind `fontSize` keys in [`../tokens/tailwind.partial.config.js`](../tokens/tailwind.partial.config.js).
- `label-md` uses uppercase in samples — apply `text-transform: uppercase` for field labels.
- `code` samples use bordered container — equivalent to `<code>` inside muted panel.

## Open questions

- [ ] Confirm if published Figma text styles exist or tokens are documentation-only
- [ ] Validate line-height per step against Dev Mode specs
