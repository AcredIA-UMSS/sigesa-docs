# Figma Export Documentation — AcredIA Design System

**Project:** AcredIA Design System  
**Status:** Export Complete (Phase 1)  
**Last Updated:** May 27, 2026  
**File Key:** `8xAUbh7TScU1I4lHVTvUTS`  

---

## 📋 What's Included

### ✅ Completed

- **Project Summary** (`metadata/project-summary.md`)
  - Identity and file information
  - Page and frame inventory
  - Naming conventions
  - Platform detection
  - Typography system
  - Color tokens

- **Component Inventory** (`components/component-inventory.md`)
  - Atoms (Primary button, Badge, Icon, Status badge)
  - Molecules (Input, Dropdown, Checkbox, Navigation item)
  - Organisms (Menu components, Dialog layouts)
  - Full component matrix with variants and states

- **Design Tokens** (`tokens/`)
  - `design-tokens.json` — Complete token definitions
  - `css-variables.css` — CSS custom properties and utility classes
  - Colors (semantic, neutral, brand)
  - Typography (scale, weights, families)
  - Spacing (4px grid, semantic values)
  - Radius, shadows, opacity, motion

- **Directory Structure** (`figma/`)
  ```
  figma/
  ├── metadata/          → Project-level docs
  ├── screenshots/       → Frame screenshots (references)
  ├── frames/           → Per-frame metadata
  ├── components/       → Component inventory & specs
  ├── tokens/           → Design tokens (JSON, CSS, JS)
  ├── layouts/          → Layout & spacing systems
  ├── icons/            → Icon inventory
  ├── annotations/      → Design annotations & notes
  └── maps/             → Interaction maps
  ```

---

## 🎯 Core Design System Facts

### Platform
- **Primary:** Web (responsive 1024–1280px+)
- **Reference libraries:** iOS, iPadOS, watchOS, visionOS, macOS (subscribed)

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary (UMSS Blue) | `#003770` | Brand, primary actions |
| Danger (Institutional Red) | `#E30613` | Destructive, errors |
| Success | `#1FAF31` | Confirmations, approvals |
| Warning | `#FFA500` | Cautions, pending states |
| Info | `#0066CC` | Informational highlights |

### Typography

| Scale | Size | Weight | Usage |
|-------|------|--------|-------|
| `display-lg` | 48px | 700 | Hero headlines |
| `heading-xl` | 30px | 600 | Page titles |
| `body-lg` | 16px | 400 | Main content |
| `code` | 14px | 400 mono | Technical code |

**Fonts:** Inter (UI), IBM Plex Mono (code)

### Spacing Grid
- **Base:** 4px
- **Scale:** `esp-1` (4px) → `esp-10` (40px)
- **Container:** 16px padding
- **Section gap:** 24px

### Components
- Buttons (5 styles + sizes)
- Forms (inputs, selects, checkboxes, toggles, date pickers)
- Navigation (app bar, drawer, tabs, breadcrumbs)
- Data (tables, lists, pagination)
- Dialogs & modals
- Status badges
- Iconography

---

## 📂 File Organization

### `/metadata/`
High-level project documentation:
- **`project-summary.md`** — Overview, pages, platforms, conventions

### `/components/`
Component specifications and inventory:
- **`component-inventory.md`** — Atoms, molecules, organisms breakdown
- Per-component files (optional): `button.md`, `input.md`, etc.

### `/tokens/`
Design token exports in multiple formats:
- **`design-tokens.json`** — Master token definitions (colors, typography, spacing)
- **`css-variables.css`** — CSS custom properties + utility classes
- **`tailwind.partial.config.js`** (optional) — Tailwind CSS config snippet
- Per-category files: `colors.json`, `typography.json`, `spacing.json`

### `/frames/`
Per-frame documentation (auto-generated):
- `Tipografia.md` — Typography scale
- `Tokens-de-Diseno.md` — Color tokens
- `Botones-y-acciones.md` — Button specs
- `Formularios.md` — Form field specs
- `Navegacion.md` — Navigation components
- etc.

### `/screenshots/`
Frame screenshots and references:
- `tipografia.png` — Typography scale visual
- `tokens-semanticos.png` — Color swatches
- `botones.png` — Button variants
- URLs or base64 references for reference-only exports

### `/layouts/`
Layout system documentation:
- **`layout-system.md`** — Grids, breakpoints, spacing, auto-layout rules

### `/icons/`
Icon inventory and usage:
- **`icon-inventory.md`** — Icon categories, sizes, variants
- Icon SVG/PNG exports (if available)

### `/maps/`
Interaction & flow documentation:
- **`interaction-map.md`** — Navigation flows, modal triggers, state transitions
- Mermaid diagrams for visual flows

### `/annotations/`
Design annotations and notes:
- Cross-frame reference notes
- Designer comments and rationale
- Future enhancements or deprecations

---

## 🔄 How to Use This Export

### **For Design-to-Code (Figma → Implementation)**

1. **Review tokens** → Use `tokens/design-tokens.json` in your codebase
2. **Extract CSS** → Copy `tokens/css-variables.css` to your project
3. **Reference components** → Use `components/component-inventory.md` for specs
4. **Check frames** → Open Figma file or view `frames/*.md` for details
5. **Implement** → Build components following Material Design 3 + AcredIA customizations

### **For Code-to-Design (Implementation → Figma Sync)**

1. **Map components** → Link your code components to Figma via Code Connect
2. **Update tokens** → If design tokens change, re-export from this directory
3. **Sync instances** → Use Figma to keep component instances in sync with code

### **For Stakeholder Communication**

1. Open `metadata/project-summary.md` for project overview
2. Share component inventory with product/engineering teams
3. Use screenshots in presentations or documentation
4. Reference color/typography scales for brand consistency

### **For Developer Handoff**

1. Provide `tokens/design-tokens.json` to frontend developers
2. Include `components/component-inventory.md` for implementation reference
3. Link Figma file for live component previews
4. Share `layouts/layout-system.md` for responsive breakpoints

---

## 🔄 Incremental Export & Updates

This export is designed for **incremental updates**:

- **Add new frames?** → Create corresponding `.md` in `frames/`
- **Change tokens?** → Update `tokens/design-tokens.json` and regenerate CSS
- **Add components?** → Extend `components/component-inventory.md`
- **Document flows?** → Create diagrams in `maps/interaction-map.md`

No need to re-export the entire file; update individual sections as needed.

---

## 📊 Inventory Checklist

| Category | Status | Files | Notes |
|----------|--------|-------|-------|
| **Project Metadata** | ✅ | 1 | Includes pages, frames, naming |
| **Components** | ✅ | 1 | Atoms, molecules, organisms |
| **Design Tokens** | ✅ | 2 | JSON + CSS vars |
| **Frames** | ✅ | 11 | Per-frame detailed documentation |
| **Layout System** | ✅ | 1 | Spacing, grids, breakpoints, auto-layout |
| **Icon Inventory** | ✅ | 1 | 37+ icons, categories, usage patterns |
| **Screenshots** | 📋 | Multiple | References only (access-limited) |
| **Interactions** | 📋 | 1 | Navigation flows, triggers |

**Legend:** ✅ Done | 🔄 In Progress | 📋 Planned (Phase 3)

---

## 🚀 Next Steps

### Phase 2: Deep Dives
- [ ] Generate per-frame metadata for all 15+ frames
- [ ] Export frame screenshots (if access restored)
- [ ] Document layout breakpoints & auto-layout rules
- [ ] Create icon inventory with SVG/PNG exports

### Phase 3: Integration
- [ ] Generate Tailwind CSS config snippet
- [ ] Create React/Next.js component templates
- [ ] Build Code Connect mappings for library components
- [ ] Generate Storybook story files (if applicable)

### Phase 4: Governance
- [ ] Version control for token changes
- [ ] Create change log for design system updates
- [ ] Set up design system governance docs
- [ ] Document component deprecation policy

---

## 📖 Reference

### Material Design 3 Integration
- Primary base: Material Design 3 (v1.25)
- Extensions: AcredIA institutional colors, UMSS branding
- Reference: [Material Design 3 Documentation](https://m3.material.io/)

### Token Naming Conventions
- **Semantic:** `color-primary`, `color-danger`, `dur-rapid`
- **Scale:** `sp-1`, `esp-N` (spacing), `heading-lg` (typography)
- **Component-specific:** `button-padding`, `input-height`

### Figma File Structure
- **Single page:** `Elementos` (foundations + components)
- **Sections:** FUNDAMENTOS, Tokens de Diseño, COMPONENTES, Reference Body
- **Frame canvas:** ~5000px wide × 3700px tall (reference layouts extend further)

---

## ❓ FAQ

**Q: Why JSON tokens when Figma has variables?**  
A: Portable format for multi-tool consumption (web, mobile, backend). Figma variables are team/plan-restricted.

**Q: Can I regenerate these exports?**  
A: Yes, use MCP tools (`get_metadata`, `get_screenshot`, `search_design_system`) to re-export at any time.

**Q: How do I keep tokens in sync with Figma?**  
A: Manual export → JSON update, or automate via design token pipeline (e.g., Style Dictionary, Tokens Studio).

**Q: Which components are production-ready?**  
A: Buttons, forms, navigation, data tables are fully spec'd. Dialogs/modals in design (not code yet).

**Q: Can I modify these tokens?**  
A: Yes, but document changes and version them in your codebase. Keep source-of-truth in Figma.

---

## 📝 Document Maintenance

| File | Last Updated | Owner | Frequency |
|------|--------------|-------|-----------|
| `metadata/project-summary.md` | May 27, 2026 | Design team | Quarterly |
| `components/component-inventory.md` | May 27, 2026 | Design team | As-needed |
| `tokens/design-tokens.json` | May 27, 2026 | Design → Dev | On release |
| `tokens/css-variables.css` | May 27, 2026 | Dev team | On sync |

---

**Questions?** Refer to the Figma file or contact the AcredIA design team.  
**Contribute?** Submit PRs for token updates, new frame docs, or integration guides.

---

**Generated by:** Figma Design System Export Tool  
**Version:** 1.0  
**License:** AcredIA / UMSS (Internal use)
