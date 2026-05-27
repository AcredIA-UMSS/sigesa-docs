# Annotations — Espaciado y Radio

| Linked screenshot | [../screenshots/espaciado-y-radio.md](../screenshots/espaciado-y-radio.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/espaciado-y-radio.md](../frames/espaciado-y-radio.md) |

## Designer notes (from frame text)

- **Base grid:** 4px unit — all spacing tokens are multiples of 4px.
- **Token names:** `esp-1` … `esp-10` (4px to 80px scale).
- **Border radius tokens:** `sm` (4px), `md` (8px), `lg` (12px), `full` (pill / 9999px).
- Frame documents both spacing scale rows and border-radius swatches with labeled demo cards.
- Shadow demonstration card uses combined style: `Background + Border + Shadow`.

## Implementation hints

- Spacing tokens are in [`../tokens/spacing.json`](../tokens/spacing.json), radius in [`../tokens/radius.json`](../tokens/radius.json), shadows in [`../tokens/shadows.json`](../tokens/shadows.json).
- Use `esp-4` (16px) as the default component gap.
- Use `esp-8` (48px) as page horizontal padding on 1024px doc frames.
- Radius `full` applies to badge components (`28px` height → fully pill-shaped).
- Inputs use `sm` radius (4px); buttons use `md` (8px); cards use `lg` (12px).

## Open questions

- [ ] Confirm `esp-7` (40px) usage — no explicit use-case documented in Figma text
- [ ] Verify shadow token values (offset, blur, spread, color) against Dev Mode
