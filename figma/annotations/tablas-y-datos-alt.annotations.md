# Annotations — tablas-y-datos-alt

| Linked screenshot | [../screenshots/tablas-y-datos-alt.md](../screenshots/tablas-y-datos-alt.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/tablas-y-datos-alt.md](../frames/tablas-y-datos-alt.md) |

## Designer notes

- Frame title: **Retroalimentación y estados** — complements data table frame with feedback UI.
- Four alert variants cover full semantic spectrum (info, success, warning, error).
- Modal demo uses realistic acreditación copy context.

## Implementation hints

- Alerts: map to shadcn `Alert` with `variant` prop per semantic token.
- Modal: use Radix Dialog; scrim opacity match `Rectangle 5` (~40–50%).
- Confirm button uses shadow — apply `shadow-md` from tokens.

## Open questions

- [ ] Alert dismiss button not shown — add if product requires
- [ ] Confirm action copy varies by context — parameterize
