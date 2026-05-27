# Annotations — Formularios

| Linked screenshot | [../screenshots/formularios.md](../screenshots/formularios.md) |
|-------------------|----------------------------------------------------------------|
| Linked frame | [../frames/formularios.md](../frames/formularios.md) |

## Designer notes (from frame text)

- **Form fields documented:** Nombre (text), Código acreditación (with lock/token icon), Estado (dropdown), Correo (with error state + `!` icon), Carrera (text).
- **Checkbox rows:** Criteria selection — stacks vertically with `label-md` text.
- **Radio rows:** Evaluation type selection — mutually exclusive.
- **Toggle rows:** Notification preferences — binary on/off.
- **InputText states:** `Default` and `Click` (focused) — border changes on focus.
- **InputAreaText:** Multiline variant, 233×163px demo size.
- **Dropdown states:** `desplegar=false` (collapsed, 233×56) and `desplegar=true` (expanded with options list).
- **Error state:** Correo field shows red border + `!` chip below — `Error` variant explicit in component.
- Section "Casillas y selectores" groups checkboxes, radios, and toggles.

## Implementation hints

- Form layout: single-column, labels always above controls (accessibility — label visible regardless of input state).
- Input min-width: 233px; expand to container in layout.
- Dropdown options list: `Option` component with `activeTrue` property on selected item.
- Error message pattern: field border + `!` icon chip — map to HTML `aria-describedby` + `role="alert"`.
- Use `esp-6` (32px) between form field groups; `esp-4` (16px) between label and control.

## Open questions

- [ ] Confirm disabled state for all form controls (not explicitly documented in-frame)
- [ ] Verify dropdown option list max height + scroll behavior for long lists
- [ ] Clarify if "Carrera" is a free-text or select field (shown as text input in frame)
