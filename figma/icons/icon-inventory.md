# Icon Inventory — AcredIA Design System

**Source Frame:** Iconografia (`56:1786`)  
**Frame Size:** 1024 × 1712px  
**Last Updated:** May 27, 2026  
**Figma:** [Open Iconografia frame](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=56-1786)

---

## 📋 Icon Categories

### 1. **Navigation Icons**

Used in app navigation, tabs, and menu systems.

| Icon | Variant | Size | Usage | State |
|------|---------|------|-------|-------|
| **Home** | Default | 18–22px | Dashboard home | Active, inactive |
| **Gestión** | Gestion | 18×16.5px | Process management | Active, inactive |
| **Dashboards** | Dashboards | 18×16.5px | Analytics/dashboards | Active, inactive |
| **Historial** | Historial | 18×18px | History/timeline | Active, inactive |
| **Ayuda** | ayuda | 18×18px | Help/support | Active, inactive |
| **Configuración** | Configuracion | 18×15px | Settings/config | Active, inactive |

**Figma:** Component set `937:2540`  
**Stroke:** 1.5–2px  
**Grid:** 24×24px canvas, optically centered  
**Color:** `color-primario` (default), `color-neutral-700` (inactive)

### 2. **File Type Icons**

Document and file metaphors for content organization.

| Icon | Category | Size | Label | Usage |
|------|----------|------|-------|-------|
| **PDF** | Document | 48px | PDF file | Reports, exports |
| **Word** | Document | 48px | Word doc | Proposals, briefs |
| **Excel** | Spreadsheet | 48px | Excel sheet | Data tables |
| **Image** | Media | 48px | Image file | Media assets |
| **Folder** | Container | 48px | Carpeta | Directory structure |
| **Archive** | Compressed | 48px | ZIP file | Compressed data |

**Frame:** Archivos section  
**Style:** Flat icon fill with semantic color  
**Accessibility:** Labels shown below icon (text)

### 3. **Action Icons**

Functional icons for buttons and interactions.

| Icon | Size | Usage | States |
|------|------|-------|--------|
| **Chevron Down** | 10–16px | Dropdown menu | Default, hover |
| **Chevron Right** | 10–16px | Navigation arrow | Default, hover |
| **Edit** | 16–20px | Edit button | Default, disabled |
| **Delete** | 16–20px | Delete action | Default, danger |
| **Share** | 16–20px | Share option | Default, active |
| **Download** | 16–20px | Download action | Default, processing |
| **Upload** | 16–20px | Upload action | Default, processing |
| **Search** | 16–20px | Search trigger | Default, active |
| **Menu** | 16–20px | Hamburger menu | Default, active |
| **Close** | 16–20px | Dismiss/close | Default, hover |

**Style:** Outlined or filled  
**Accessibility:** Always paired with text label

### 4. **Status Icons**

Indicators for validation and state information.

| Icon | Color | Size | Meaning | Usage |
|------|-------|------|---------|-------|
| **Check Circle** | `color-success` | 18–24px | Success/approved | Form validation, completion |
| **Error Circle** | `color-danger` | 18–24px | Error/rejected | Form errors, failures |
| **Warning Triangle** | `color-warning` | 18–24px | Warning/caution | Alerts, cautions |
| **Info Circle** | `color-info` | 18–24px | Information | Help tooltips, tips |
| **Clock** | `color-neutral-600` | 18–24px | Pending/in progress | Status badges |
| **Dot indicator** | Semantic | 6–8px | Status dot | Inline status badge |

**Implementation:** Inline with status text  
**Animation:** Optional pulse on pending states

### 5. **Institutional Icons**

AcredIA and UMSS specific branding.

| Icon | Size | Context | Usage |
|------|------|---------|-------|
| **UMSS Logo** | 32–64px | Header, footer | Branding |
| **DUEA Badge** | 32–48px | Acreditación context | Institutional marker |
| **Acreditación Seal** | 64–96px | Certificates, credentials | Trust indicator |
| **SIGESA Logo** | 24–32px | System identifier | Product marker |

**Color:** Brand colors (`color-brand-primary`, `color-brand-accent`)  
**Accessibility:** Alt text for screen readers

### 6. **Utility & Motion**

Loading states, animations, and special UI.

| Icon | Type | Size | Animation | Usage |
|------|------|------|-----------|-------|
| **Spinner** | Loading | 16–20px | Rotating | Async operations |
| **Dot loader** | Loading | 20–24px | Bouncing | Data fetching |
| **Pulse indicator** | Attention | 8–12px | Pulsing | Real-time updates |
| **Chevron animated** | Navigation | 16px | Smooth easing | Page transitions |

**Animation Duration:** 250–500ms  
**Easing:** `cubic-bezier(0.2, 0, 0.13, 1)` (Material 3 standard)

---

## 🎨 Icon Design System

### Size Scale

| Token | Canvas | Optical | Usage | Context |
|-------|--------|---------|-------|---------|
| **Icon XS** | 16px | 12–14px | Inline indicators | Badges, chips |
| **Icon S** | 18px | 16–18px | Navigation | Nav bar, tabs |
| **Icon M** | 24px | 20–24px | Component icons | Buttons, inputs |
| **Icon L** | 32px | 28–32px | Section icons | Headers, callouts |
| **Icon XL** | 48px | 40–48px | Card icons | File types, media |
| **Icon 2XL** | 64px | 56–64px | Hero icons | Institutional |

### Stroke Weight

| Size | Stroke | Notes |
|------|--------|-------|
| 16–18px | 1.5px | Navigation icons |
| 20–24px | 2px | Action icons |
| 32px+ | 2–2.5px | Larger icons |

### Color Rules

- **Default:** `color-primario` (#003770)
- **Inactive/disabled:** `color-neutral-400` (#A0A0A0)
- **Success state:** `color-success` (#1FAF31)
- **Error state:** `color-danger` (#E30613)
- **Warning state:** `color-warning` (#FFA500)
- **Hover:** 20% opacity increase from default

### Grid & Positioning

- **Canvas:** 24×24px (standard), or custom per category
- **Padding:** 2–4px optical padding on all sides
- **Alignment:** Center-aligned both horizontally and vertically
- **Optical correction:** Slight adjustments for visual balance

---

## 📊 Icon Variants

### State Variants

All interactive icons support:

```
icon-state
├── default
├── hover
├── active
├── disabled
└── loading (spinner)
```

### Style Variants

- **Outlined:** Stroked, no fill (default)
- **Filled:** Solid fill (secondary)
- **Tonal:** Filled with low opacity (tertiary)

---

## 🔄 Icon Usage Patterns

### Navigation Icon Pattern

```
┌────────────────────┐
│  18px icon         │
│  color-primario    │
│  ┌──────────────┐  │
│  │ 18×18px      │  │
│  │ centered     │  │
│  └──────────────┘  │
│                    │
│  "Gestion" (opt)   │
│  12px label        │
└────────────────────┘
```

### Status Icon Pattern

```
✓ Success message
├─ Icon: 18px, color-success
├─ Text: body-md
└─ Helper: body-sm gray
```

### Inline Icon Pattern

```
[Icon 16px] Text label
Gap: 8px
Vertical alignment: center
```

---

## 📋 Export Ready Icons

### Exported Formats

- [ ] **SVG** — Scalable, color-capable
- [ ] **PNG (18px)** — Raster fallback
- [ ] **PNG (24px)** — 1.5x density
- [ ] **PNG (32px)** — 2x density

### Export Locations

- **Navigation:** `/icons/navigation/`
- **Files:** `/icons/files/`
- **Actions:** `/icons/actions/`
- **Status:** `/icons/status/`
- **Institutional:** `/icons/branding/`

### Naming Convention

```
{category}-{name}-{size}@{density}.{format}

Examples:
- navigation-home-18@1x.svg
- actions-edit-20@1x.png
- status-success-24@2x.png
- files-pdf-48@1x.svg
```

---

## ♿ Accessibility

### Icon Labels

✅ **Always pair with text label** when meaning is ambiguous
✅ **Use aria-label** for screen readers
✅ **Color alone doesn't convey meaning** — add icon or text
✅ **Contrast ratio ≥ 3:1** for icons

### Example

```html
<!-- Good -->
<button aria-label="Edit document">
  <Icon name="edit" /> Edit
</button>

<!-- Bad -->
<button aria-label="button">
  <Icon name="edit" />
</button>
```

---

## 📈 Icon Inventory Matrix

| Category | Total Icons | Outlined | Filled | Animated | Export Status |
|----------|------------|----------|--------|----------|---------------|
| Navigation | 7 | 7 | — | — | ⚠️ Partial |
| Files | 6 | 6 | — | — | ⚠️ Partial |
| Actions | 10 | 10 | — | — | ⚠️ Partial |
| Status | 6 | 6 | — | 1 | ⚠️ Partial |
| Institutional | 4 | — | 4 | — | ⚠️ Partial |
| Utility | 4 | — | — | 4 | ⚠️ Partial |
| **TOTAL** | **37+** | **29** | **4** | **5** | **Export Pending** |

---

## 🔗 Cross-References

- **Source:** [`../frames/iconografia.md`](../frames/iconografia.md)
- **Sizes:** [`../tokens/spacing.json`](../tokens/spacing.json)
- **Colors:** [`../tokens/design-tokens.json`](../tokens/design-tokens.json)
- **Component Usage:** [`../components/component-inventory.md`](../components/component-inventory.md)

---

**Document Version:** 1.0  
**Status:** Icon reference catalog (exports pending)  
**Maintained by:** AcredIA Design Team

## Usage locations

| Icon context | Components / frames |
|--------------|---------------------|
| Sidebar | `Navegacion`, `Main menu component`, `Iconos nav bar` |
| Dropdown | chevron on `Estado del proceso` field (`38:255`) |
| Código acreditación | lock/token icon (`38:248`) |
| Form validation | `!` in error chip (`38:262`) |
| Tables | Tablas y datos frames |
| File upload / archivos | Iconografia — Archivos |

## Variants

- **Filled vs outline:** Navigation uses single-weight vectors; toggle pattern not documented for AcredIA set.
- **State:** Selected nav item uses `Property 1=Selected` on parent `Navegacion` (background + icon color shift).

## External icon libraries

Subscribed kits include **Google Icons (Material)** and **SF Symbols** via Apple / M3 libraries — use only when explicitly importing from those kits; prefer AcredIA `Iconografia` for product UI.

## Export TODO

- [ ] Export SVG sprite per section from Figma (Plugin: Export assets)
- [ ] Map each `Property 1` variant to React icon component name
- [ ] Record stroke width and corner style per size tier

## Related

- [`../frames/iconografia.md`](../frames/iconografia.md)
- [`../components/component-inventory.md`](../components/component-inventory.md)
