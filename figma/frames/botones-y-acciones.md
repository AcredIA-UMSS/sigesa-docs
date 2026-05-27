# Botones y Acciones (Buttons & Actions)

| Field | Value |
|-------|--------|
| **Node ID** | `24:26` (parent: `952:3291`) |
| **Dimensions** | 1199 × 2627 |
| **Category** | Components |
| **Figma** | [Open in Figma](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=24-26) |
| **Screenshot** | [../screenshots/botones-y-acciones.png](../screenshots/botones-y-acciones.png) |
| **Doc Frame** | Foundation / Component showcase |

---

## 🎯 Frame Overview

Comprehensive button and action component documentation covering styles, sizes, states, and interactive patterns used throughout the AcredIA system.

---

## 📊 Component Sections

### 1. Button Variants

**Figma Variants:** `Primary Button | Secundary button | Cancelar | Eliminar proceso | Más opciones`

| Button Type | Color | Text Color | Usage | Material Equiv |
|-----------|-------|-----------|-------|----------------|
| **Primary Button** | `color-primario` (#003770) | White | Main CTA, save, confirm | Filled Button |
| **Secondary Button** | Outline | `color-primario` | Alternative action | Outlined Button |
| **Cancel** | Neutral | `color-neutral-700` | Dismiss, cancel flow | Text Button |
| **Delete / Destructive** | `color-danger` (#E30613) | White | Destructive actions | Filled Button (error) |
| **More Options** | Neutral | `color-neutral-700` | Overflow menu | Icon Button |

**Padding:** 16px (X), 12px (Y)  
**Radius:** 8px  
**Font:** body-md (500 weight)

### 2. Button Sizes

| Size | Height | Padding Y | Label | Usage | Spec |
|------|--------|-----------|-------|-------|------|
| **Pequeño** | 36px | 8px | `label-md` | Compact UI, inline actions | XS size |
| **Normal** | 44px | 12px | `body-md` | Standard CTA | M size (default) |
| **Grande** | 52px | 16px | `body-lg` | Primary actions, hero | L size |

### 3. Button States

All buttons support the Material 3 state system:

| State | Style | Opacity | Usage |
|-------|-------|---------|-------|
| **Default** | Solid fill | 100% | Clickable, ready |
| **Hover** | Elevated shadow + 8% opacity overlay | 108% perceived | Mouse over |
| **Active/Pressed** | Darker tint + 16% opacity | 116% perceived | Actively pressed |
| **Disabled** | Grayed out | 38% | Inactive / form incomplete |
| **Loading** | Spinner + "Cargando..." label | 100% | Async operation in progress |

### 4. Status Badges

Semantic status indicators for acreditación processes.

| Badge | Token | Color | Size | Domain Usage |
|-------|-------|-------|------|--------------|
| **EN PROCESO** | Pending | `color-warning` | 134×28 | Evaluation in progress |
| **En revisión** | Review | `color-info` | 120×28 | Under DUEA review |
| **ACREDITADA** | Success | `color-success` | 133×28 | Accreditation approved |
| **RECHAZADA** | Error | `color-danger` | 132×28 | Accreditation denied |
| **NO ACREDITADA** | Expired | `color-neutral-600` | 154×28 | Accreditation expired |

**Style:** Rounded pill with semantic color + dot indicator  
**Typography:** `label-md` (uppercase)  
**Padding:** 8px (X), 6px (Y)

### 5. Button Groups

Horizontal stacks of related buttons.

```
┌──────────────┬──────────────┬──────────────┐
│   Guardar    │   Cancelar   │   Eliminar   │
└──────────────┴──────────────┴──────────────┘
     Primary         Text        Destructive
     Gap: 12px
```

**Auto-layout:** Horizontal, 12px gap  
**Alignment:** Center-aligned  
**Responsiveness:** Stacks vertically on mobile

### 6. Navigation Buttons / Sidebar Items

Sidebar and menu button patterns.

| Component | Size | Height | States | Content |
|-----------|------|--------|--------|---------|
| **Menu Item** | Full-width | 48px | default, selected, hover | Icon (18px) + Label |
| **Submenu** | Indented | 36px | default, selected | Nested item |
| **Profile Card** | Full-width | 84px | default | Avatar + Name + Role |

**Icon:** 18px, `color-primario` (default), active state emphasized  
**Gap:** 8px between icon and label  
**Active indicator:** Left border highlight or background color

---

## 🎨 Color & Style Guide

### Primary Button

```
┌─────────────────────┐
│  Guardar Cambios    │  ← body-md / 500
├─────────────────────┤
│ Background: #003770 │
│ Text: White         │
│ Height: 44px        │
│ Radius: 8px         │
│ Shadow: elevation-1 │
└─────────────────────┘

States:
├─ Hover: #002855 + shadow-2
├─ Active: #001f3f + shadow-3
└─ Disabled: #CCCCCC + no shadow
```

### Secondary Button (Outlined)

```
┌─────────────────────┐
│  Cancelar           │
├─────────────────────┤
│ Background: White   │
│ Border: 1px solid   │
│ Border Color: #003770
│ Text: #003770       │
│ Height: 44px        │
│ Radius: 8px         │
└─────────────────────┘

States:
├─ Hover: Light fill (#F5F5F5)
├─ Active: Border + fill #E8E8E8
└─ Disabled: Neutral stroke
```

### Destructive Button

```
┌─────────────────────┐
│  Eliminar Proceso   │
├─────────────────────┤
│ Background: #E30613 │
│ Text: White         │
│ Icon: Trash (opt)   │
│ Height: 44px        │
│ Radius: 8px         │
└─────────────────────┘

States:
├─ Hover: #B3050F
├─ Active: #800309
├─ Disabled: Neutral gray
└─ Requires confirmation
```

---

## ♿ Accessibility

✅ **Touch target:** ≥ 48px height minimum  
✅ **Focus indicator:** Visible 2–4px border  
✅ **Contrast:** Text ≥ 4.5:1 (WCAG AA)  
✅ **Labels:** Clear, action-oriented (not "Click here")  
✅ **States:** Color + additional indicator (not color alone)  
✅ **Icon + text:** Icons never standalone in critical actions  

---

## 📐 Responsive Behavior

### Desktop (1280px+)
- Buttons: Horizontal layout, standard gap (12px)
- Button groups: Inline with justified spacing

### Tablet (1024px)
- Buttons: Horizontal layout, tighter gap (8px)
- Full-width buttons if needed in narrow contexts

### Mobile (< 1024px)
- Button groups: Stack vertically, full-width
- Gap: 12px between stacked buttons
- Min height: 44px (touch-friendly)

---

## 🔗 Cross-References

- **Component specs:** [`../components/component-inventory.md`](../components/component-inventory.md) → Buttons section
- **Color tokens:** [`../tokens/design-tokens.json`](../tokens/design-tokens.json)
- **CSS utilities:** [`../tokens/css-variables.css`](../tokens/css-variables.css) → Button classes
- **Layout rules:** [`../layouts/layout-system.md`](../layouts/layout-system.md)

---

## 📋 Implementation Checklist

- [ ] Button component variants created (5 types)
- [ ] Size variants implemented (XS, S, M, L, XL)
- [ ] State styles defined (default, hover, active, disabled, loading)
- [ ] Accessibility features verified
- [ ] Touch targets tested (≥ 48px)
- [ ] Loading state animation implemented
- [ ] Responsive stacking for mobile
- [ ] Documentation links added to code

---

**Version:** 1.0  
**Last Updated:** May 27, 2026  
**Status:** Production-ready  
**Maintained by:** AcredIA Design Team

## Component usage

| Instance | Purpose |
|----------|---------|
| Primary Button | Main CTA |
| Secundary button | Secondary CTA |
| Cancelar | Neutral cancel |
| Eliminar proceso | Destructive |
| Cargando... | Loading state |
| Más opciones | Menu trigger |
| Status chips | Acreditación states |
| Navegacion / Subitem / Main menu / Perfil | Shell nav |

## Typography

Section labels: 16px semibold. Buttons use `body-md` weight 600 (inferred).

## Colors

- Primary: brand blue
- Danger: semantic red
- Badges: semantic tints per state (see component inventory)

## Spacing

Demo containers: 76px height strips; button row gap ~24px; badge row gap ~10px.

## Interaction notes

- Loading replaces label on primary
- Disabled state shown as non-interactive frame
- Nav: Default / Selected / Pressed variants

## Cross-references

- [`../components/component-inventory.md`](../components/component-inventory.md)
- [`../maps/interaction-map.md`](../maps/interaction-map.md)
