# Layout System — AcredIA Design System

**Document:** Core layout principles, grid systems, responsive breakpoints, and auto-layout rules  
**Last Updated:** May 27, 2026  
**File Key:** `8xAUbh7TScU1I4lHVTvUTS`

---

## 📐 Responsive Breakpoints

The AcredIA design system uses three primary breakpoints aligned with Material Design 3 and institutional requirements.

| Breakpoint | Width | Primary Device | Usage |
|------------|-------|-----------------|-------|
| **Desktop** | 1280px+ | Desktop, tablet landscape | Primary implementation |
| **Tablet** | 1024–1279px | Tablet portrait | Secondary layout |
| **Mobile** | < 1024px | Phone, small tablet | Future consideration |

### Breakpoint Tokens

```css
--breakpoint-mobile: 0px;
--breakpoint-tablet: 1024px;
--breakpoint-desktop: 1280px;
--breakpoint-wide: 1440px;
```

---

## 🔲 Grid System

### Base Grid

- **Grid Unit:** 4px
- **Spacing Scale:** 10-step scale based on 4px multiples
  - `esp-1` = 4px | `esp-2` = 8px | `esp-3` = 12px | `esp-4` = 16px | `esp-5` = 20px
  - `esp-6` = 24px | `esp-7` = 28px | `esp-8` = 32px | `esp-9` = 36px | `esp-10` = 40px

### Column Grid

| Breakpoint | Width | Columns | Gutter | Margin | Content Width |
|-----------|-------|---------|--------|--------|---------------|
| **Desktop** | 1280px | 12 | 16px | 24px | 1232px |
| **Tablet** | 1024px | 8 | 16px | 16px | 992px |
| **Mobile** | < 1024px | 4 | 12px | 12px | Fluid |

---

## 📏 Spacing System

### Container Padding

| Context | Padding |
|---------|---------|
| **Page container** | 24px (desktop), 16px (tablet) |
| **Section block** | 16px |
| **Component padding** | 12–16px |
| **Button padding** | X: 16px, Y: 12px |

### Gap Spacing

| Component | Gap | Token |
|-----------|-----|-------|
| **Section to section** | 24–32px | `esp-6` to `esp-8` |
| **Item in list/grid** | 16px | `esp-4` |
| **Button group** | 12px | `esp-3` |
| **Form field group** | 12px | `esp-3` |
| **Inline element** | 8px | `esp-2` |

---

## 🔄 Auto-Layout Rules

### Button Auto-Layout

```
Direction: Right
Padding: 16px (X), 12px (Y)
Item spacing: 8px
Alignment: Center
Fill: Hug contents
```

### Form Field Auto-Layout

```
Direction: Down
Padding: 0px
Item spacing: 8px (label to field)
Alignment: Stretch
Fill: Fill container
Min height: 36px (input), 44px (touch)
```

### Navigation Item Auto-Layout

```
Direction: Right
Padding: 12px (X), 8px (Y)
Item spacing: 8px (icon to label)
Alignment: Center
Fill: Fill container (width)
Height: 56px (mobile), 48px (desktop)
```

### Table Row Auto-Layout

```
Direction: Right
Padding: 12px (X), 16px (Y)
Item spacing: 16px (column gap)
Alignment: Center
Min height: 48px (compact), 56px (normal)
```

---

## 🏗️ Component Sizing

### Button Sizes

| Size | Height | Padding X | Padding Y | Font | Usage |
|------|--------|-----------|-----------|------|-------|
| **XS** | 32px | 12px | 8px | body-sm | Compact |
| **S** | 36px | 12px | 8px | body-md | Form |
| **M** | 44px | 16px | 12px | body-md | Standard |
| **L** | 52px | 20px | 16px | body-lg | Primary |
| **XL** | 60px | 24px | 20px | body-lg | Hero |

### Input Field Heights

| Type | Height | Notes |
|------|--------|-------|
| **Standard** | 36px | Single-line |
| **Touch** | 44px | Mobile-friendly |
| **Textarea** | 120px+ | Multi-line |
| **Dense** | 32px | Compact |

---

## 🎨 Responsive Layout Example

### Desktop (1280px+)

```
┌─────────────────────────────────────────┐
│  Top App Bar (56px)                     │
├──────┬──────────────────────────────────┤
│      │  Content (12-column, 24px margin)│
│ 240px│  ┌──────────┬──────────┐         │
│Sidebar  │ Col 1-4  │ Col 5-8  │         │
│ Fixed   ├──────────┴──────────┤         │
│      │  │ Col 1-12            │         │
│      │  └──────────────────────┘         │
└──────┴──────────────────────────────────┘
```

### Tablet (1024px)

```
┌──────────────────────────────┐
│  Top App Bar (56px)          │
├──────────────────────────────┤
│  Content (8-column, 16px)    │
│  ┌──────────┬──────────┐     │
│  │ Col 1-4  │ Col 5-8  │     │
│  ├──────────┴──────────┤     │
│  │ Col 1-8              │     │
│  └──────────────────────┘     │
│  [Sidebar: Collapsible]       │
│                              │
├──────────────────────────────┤
│  Bottom Nav (56px) optional  │
└──────────────────────────────┘
```

---

## 📋 Documented Frame Layouts

| Frame | Width | Columns | Padding | Notes |
|-------|-------|---------|---------|-------|
| **Tipografía** | 1024px | 12 | 40px | Doc standard |
| **Tokens de Diseño** | 1024px | 12 | 48px | Grid demo |
| **Botones y acciones** | 1199px | Custom | 40px | Component matrix |
| **Navegación** | 1446px | Custom | — | Full-width nav demo |
| **Body (ref)** | 1280px | 12 | 24px | App reference |

---

## 🎯 Best Practices

✅ Use 4px grid baseline  
✅ Maintain consistent margins at breakpoints  
✅ Use auto-layout for all containers  
✅ Follow component padding rules  
✅ Test responsive behavior  
✅ Keep line length readable (40-80 chars)

---

## 🔗 Cross-References

- [`../tokens/spacing.json`](../tokens/spacing.json)
- [`../tokens/css-variables.css`](../tokens/css-variables.css)
- [`../components/component-inventory.md`](../components/component-inventory.md)

## Spacing system

Base unit: **4px**. Token names `esp-1` … `esp-10`.

| Token | Value | Typical use |
|-------|-------|-------------|
| esp-1 | 4px | Tight inline gap, icon padding |
| esp-2 | 8px | Chip internal gap |
| esp-3 | 12px | Compact stacks |
| esp-4 | 16px | Default component gap |
| esp-5 | 24px | Section sub-gap |
| esp-6 | 32px | Between form fields |
| esp-7 | 40px | — |
| esp-8 | 48px | Page horizontal padding |
| esp-9 | 64px | Large section breaks |
| esp-10 | 80px | Hero / major separation |

See [`../tokens/spacing.json`](../tokens/spacing.json).

## Breakpoints (convention)

| Name | Min width | Artboard evidence |
|------|-----------|-------------------|
| `doc` | — | 1024 fixed docs |
| `desktop` | 1280px | Body layouts |
| `wide` | 1446px | Navegación frame |

No Figma variables for breakpoints in cached export — define in code (Tailwind screens).

## Containers

| Container | Max width | Padding |
|-----------|-----------|---------|
| Doc content | 928px | 48px horizontal |
| Form column | 326px | 60px section offset |
| Dropdown panel | 273px | 20px internal |

## Auto-layout conventions

| Pattern | Direction | Alignment | Gap |
|---------|-----------|-----------|-----|
| Button row | Horizontal | Center | ~16px between instances |
| Form field | Vertical | Left | label 16px above field |
| Token table row | Horizontal | Center vertical | label 120px + value 100px + visual |
| Sidebar menu | Vertical | Left | 68px row height |
| Badge row | Horizontal | Center | ~10px |

## Alignment rules

- Section titles: left-aligned, full width of content column.
- Documentation eyebrows: uppercase, `label-md` style (`FUNDAMENTOS`, `COMPONENTES`).
- Form labels: always visible above control (accessibility requirement stated in copy).
- Destructive actions: right-aligned in button groups or isolated red button.

## Padding systems

| Element | Padding |
|---------|---------|
| Primary button | ~10px vertical, horizontal hug + min width |
| Input (`Frame 7`) | 10px all sides, H 36 |
| Color swatch card | 17px |
| Page header block | 48px top |

## Border radius

| Token | Value | Use |
|-------|-------|-----|
| sm | 4px | Inputs, small chips |
| md | 8px | Buttons |
| lg | 12px | Cards |
| full | pill | Badges (28px height) |

See [`../tokens/radius.json`](../tokens/radius.json).

## Related frames

- [`../frames/espaciado-y-radio.md`](../frames/espaciado-y-radio.md)
- [`../frames/body-reference-1280.md`](../frames/body-reference-1280.md)
