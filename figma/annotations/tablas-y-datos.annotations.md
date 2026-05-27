# Annotations — Tablas y Datos

| Linked screenshot | [../screenshots/tablas-y-datos.md](../screenshots/tablas-y-datos.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/tablas-y-datos.md](../frames/tablas-y-datos.md) |

## Designer notes (from frame text)

- **Two table artboards:** `50:290` (1024×1242) and `53:890` (1024×1162, alternate layout).
- Domain data shown: acreditación process rows with status badges (`EN PROCESO`, `ACREDITADA`, etc.).
- Column patterns: code (`IBM Plex Mono`), name (text), date, status badge, action icons.
- Acreditación codes displayed in `code` token style (monospace, bordered container).
- Row hover state: inferred from design system (no explicit hover artboard found).
- `DUEA 2025` tag used as cycle/period label within table rows.

## Implementation hints

- Use `IBM Plex Mono` (`code` token) for acreditación codes (e.g., `ACRED-2025-0143`).
- Status badge column: render `<StatusBadge>` component — see [`../components/component-inventory.md`](../components/component-inventory.md).
- Table row height: infer from spacing system — use `esp-4` (16px) vertical padding per row.
- Action column: icon buttons (Tablas y datos frame shows action icon cells) — align right.
- Apply `color-exito` bg tint for `ACREDITADA` rows when full-row highlight is needed.

## Open questions

- [ ] Confirm exact column order for primary table (code / name / estado / fecha / acciones)
- [ ] Verify pagination component existence — not found in-frame
- [ ] Check if empty state / loading skeleton is documented for tables
