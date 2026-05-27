# Formularios (Form Fields & Inputs)

| Field | Value |
|-------|--------|
| **Node ID** | `37:173` |
| **Dimensions** | 1024 × 1463 |
| **Category** | Components |
| **Figma** | [Open in Figma](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=37-173) |
| **Screenshot** | [../screenshots/formularios.png](../screenshots/formularios.png) |
| **Doc Frame** | Component showcase with domain context |

---

## 📋 Frame Overview

Comprehensive form field documentation covering text inputs, dropdowns, checkboxes, radios, toggles, and textarea components used in acreditación workflows.

**Domain context:** SIGESA program metadata, accreditation codes, career selections, process states.

---

## 🎯 Component Sections

### 1. Text Input Fields

**Component variants:** `InputText`, `InputAreaText`

| Field Type | Height | State Label | Validation | Use Case |
|-----------|--------|-------------|-----------|----------|
| **Text Input** | 36px (standard), 44px (touch) | "Click", "Default" | Optional error state | Single-line entry |
| **Textarea** | 120px+ (resizable) | "Default", "Click" | Optional error state | Multi-line comments |
| **Email Input** | 36px | "Default", "Error" | Email validation | Contact info |
| **Code Input** | 36px | "Default" | Monospace | Program codes |

**Structure:**
```
Label (body-md / 500)
    8px gap
Input Field (36px height)
├─ Padding: 8px (Y), 12px (X)
├─ Border: 1px solid #E8E8E8
├─ Radius: 8px
├─ Font: body-md
└─ Placeholder: #888888 (50% opacity)
    8px gap
Helper text (body-sm / optional)
```

### 2. Dropdown / Select Fields

**Component name:** `Dropdown`, `Option`

| Property | Closed State | Open State | Usage |
|----------|-------------|-----------|-------|
| **Height** | 56px | Variable (items × 36px) | Collapsed / expanded |
| **Icon** | Chevron down | Chevron up | Visual indicator |
| **Placeholder** | "Seleccionar..." | Hidden | Default text |
| **Options** | Hidden | List visible | Selection list |

**Structure:**
```
Dropdown Container (56px)
├─ Label: "Estado del Proceso"
├─ Field: Select button (36px internal)
├─ Icon: Chevron (18px, trailing)
└─ (Open) Options List
    ├─ Option item (36px each)
    ├─ Icon + Label (gap: 8px)
    ├─ Active state: #F5F5F5 bg
    └─ Selected state: color-primary + checkmark
```

**Option Items:**
```
┌──────────────────────────────┐
│ ✓  EN PROCESO               │  36px height
│    body-md, left-aligned    │
└──────────────────────────────┘
```

### 3. Checkbox Fields

**Component name:** `Checkbox row`

| Property | State | Visual |
|----------|-------|--------|
| **Unchecked** | Default | Empty square (16×16px) |
| **Checked** | Active | Filled with checkmark |
| **Indeterminate** | Mixed selection | Square with dash |
| **Disabled** | Inactive | Grayed out, no interaction |

**Structure:**
```
┌─────────────────────────────────┐
│ ☐ Criterios obligatorios        │  Row height: 20px
│   label-md, 8px gap from box    │
└─────────────────────────────────┘

Spacing:
├─ Box size: 16×16px
├─ Stroke: 1px
├─ Radius: 4px
├─ Gap to label: 8px
└─ Row spacing (vertical): 12px
```

### 4. Radio Button Fields

**Component name:** `Radio row`

| Property | State | Visual |
|----------|-------|--------|
| **Unselected** | Default | Empty circle (16×16px) |
| **Selected** | Active | Filled circle (inner dot 8×8px) |
| **Disabled** | Inactive | Grayed out |

**Structure:**
```
┌──────────────────────────────┐
│ ◯ Evaluación documental      │  Row height: 20px
│ ◯ Evaluación presencial      │
│ ◉ Autoevaluación             │  (selected)
└──────────────────────────────┘

Spacing:
├─ Circle size: 16×16px
├─ Inner dot: 8×8px
├─ Gap to label: 8px
└─ Row spacing: 12px
```

### 5. Toggle / Switch Fields

**Component name:** `Toggle row`

| Property | State | Visual |
|----------|-------|--------|
| **Off** | Default | Neutral track, circle left |
| **On** | Active | color-primary track, circle right |
| **Disabled** | Inactive | Grayed out |

**Structure:**
```
[  ◯  ] Notificaciones habilitadas

Track:
├─ Width: 40px
├─ Height: 20px
├─ Radius: 10px (pill)
└─ States:
    ├─ Off: #E8E8E8 (neutral)
    └─ On: color-primario (#003770)

Circle:
├─ Size: 16×16px
├─ Transitions: 150ms ease
└─ Shadow: elevation-1
```

---

## 📐 Form Field Layout

### Full Form Structure

```
Form Container (auto-layout vertical)
├─ Padding: 16px
├─ Gap: 12px (field to field)
└─ Fill: Container width

  ┌─────────────────────────────────┐
  │  Form Section (optional header) │
  │                                 │
  │  ┌─────────────────────────────┐│
  │  │ Nombre del programa         ││  Group 1: Text fields
  │  │ 8px gap                     ││
  │  │ [Input field (36px)]        ││
  │  │ 8px gap                     ││
  │  │ *Campo obligatorio (help)   ││
  │  └─────────────────────────────┘│
  │                                 │
  │  12px gap (field spacing)       │
  │                                 │
  │  ┌─────────────────────────────┐│
  │  │ Código ACRED                ││  Group 2: Code field
  │  │ 8px gap                     ││
  │  │ [ACRED-2025-0143] monospace ││
  │  └─────────────────────────────┘│
  │                                 │
  │  12px gap                       │
  │                                 │
  │  ┌─────────────────────────────┐│
  │  │ Tipo de evaluación          ││  Group 3: Radios
  │  │ 8px gap                     ││
  │  │ ◯ Documental                ││
  │  │ ◯ Presencial                ││
  │  │ ◉ Auto-evaluación           ││
  │  └─────────────────────────────┘│
  │                                 │
  │  24px gap (section spacing)     │
  │                                 │
  │  ┌─────────────────────────────┐│
  │  │ [ Guardar ] [ Cancelar ]    ││  Action buttons
  │  └─────────────────────────────┘│
  └─────────────────────────────────┘
```

### Field Label Pattern

```
Label (body-md / 500)
├─ Color: #333333
├─ Required indicator: * (color-danger)
└─ 8px gap to input

Examples:
├─ "Nombre del programa *"
├─ "Comentarios (opcional)"
└─ "Año de acreditación"
```

### Error State Pattern

```
Input Field (with error)
├─ Border: 1px solid color-danger (#E30613)
├─ Background: Slight red tint (opacity-05)
└─ 8px gap

Error Message:
├─ Text: body-sm / 12px
├─ Color: color-danger
├─ Icon: ⚠ (optional)
└─ Example: "Este campo es requerido"
```

---

## 🎨 Validation & States

### Input States

| State | Border Color | Background | Text Color | Icon |
|-------|-------------|-----------|-----------|------|
| **Default** | #E8E8E8 | White | #333333 | None |
| **Focus** | color-primario | White | #333333 | None |
| **Error** | color-danger | Light red (05%) | color-danger | ⚠ |
| **Success** | color-success | Light green (05%) | #333333 | ✓ |
| **Disabled** | #E8E8E8 | #F5F5F5 | #888888 | None |

### Placeholder Text

- Color: #999999 (70% opacity)
- Font: Same as input (body-md)
- Example: "ej. Evaluación de Acreditación"

---

## ♿ Accessibility

✅ **Labels:** Always paired with inputs (not placeholder-only)  
✅ **Required indicators:** Visual marker (*) + aria-required  
✅ **Error messages:** Clear, actionable text  
✅ **Focus states:** Visible 2–4px border or outline  
✅ **Contrast:** ≥ 4.5:1 for text, ≥ 3:1 for borders  
✅ **Keyboard:** Tab order, Enter to submit, Space to toggle  
✅ **Screen readers:** aria-label, aria-describedby, aria-invalid  

---

## 📱 Responsive Behavior

### Desktop (1280px+)
- Two-column form layouts possible
- Standard field height (36px)
- Full-width inputs with max-width

### Tablet (1024px)
- Single-column stack
- Standard field height (36px)
- Full-width within container padding

### Mobile (< 1024px)
- Full-width single-column (essential)
- Touch-friendly height (44px minimum)
- Stacked selects/checkboxes

---

## 🔗 Cross-References

- **Component specs:** [`../components/component-inventory.md`](../components/component-inventory.md) → Forms section
- **Button actions:** [`botones-y-acciones.md`](botones-y-acciones.md)
- **Layout rules:** [`../layouts/layout-system.md`](../layouts/layout-system.md)
- **Tokens:** [`../tokens/design-tokens.json`](../tokens/design-tokens.json)

---

## 📋 Implementation Checklist

- [ ] Text input component created (36px standard)
- [ ] Dropdown component with open/close states
- [ ] Checkbox variants (unchecked, checked, indeterminate)
- [ ] Radio button group component
- [ ] Toggle switch component
- [ ] Textarea with resize handling
- [ ] Error state styling (red border, message)
- [ ] Focus indicators (accessible)
- [ ] Touch-friendly sizing (≥ 44px height on mobile)
- [ ] Keyboard navigation tested
- [ ] Screen reader labels added

---

**Version:** 1.0  
**Last Updated:** May 27, 2026  
**Status:** Production-ready  
**Domain context:** SIGESA acreditación  
**Maintained by:** AcredIA Design Team

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
