# Formularios

| Field | Value |
|-------|--------|
| **Node ID** | `37:173` |
| **Dimensions** | 1024 × 1463 |
| **Category** | Components |
| **Figma** | [Open in Figma](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=37-173) |
| **Screenshot** | [../screenshots/formularios.md](../screenshots/formularios.md) |

## Layout structure

Two-column doc layout:

- **Left:** campos de texto (Nombre, Código, Estado, Correo, Carrera)
- **Right:** Casillas y selectores (checkboxes, radios, toggles)
- **Bottom:** Componentes matrix (Dropdown, Option, InputText, InputAreaText)

## Field specs

| Field | Height | States shown |
|-------|--------|--------------|
| Text input (`Frame 7`) | 36px | normal, error (Correo) |
| Dropdown | 56px | closed / open |
| Textarea | 163px | default / focus |

## Copy / domain context

SIGESA acreditación: programa, código `ACRED-2025-*`, carrera, estado de proceso, criterios obligatorios, tipo de evaluación.

## Accessibility note (from frame copy)

> Todos los campos incluyen estado normal, enfocado, error y éxito. Siempre con etiqueta visible y mensaje de ayuda asociado.

## Component sets

- `Dropdown` — desplegar true/false
- `Option` — ActiveFalse / activeTrue
- `InputText` — click Default / Click
- `InputAreaText` — click Default / Click

## Cross-references

- [`../components/component-inventory.md`](../components/component-inventory.md)
- [`../maps/interaction-map.md`](../maps/interaction-map.md)
