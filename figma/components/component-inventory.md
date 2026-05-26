# Component inventory — AcredIA Design System

**Source frame:** `Botones y acciones`, `Formularios`, `Navegación`, `Tablas y datos`, `Iconografia`  
**Figma:** [Design System file](https://www.figma.com/design/DX0AyrzfJQEUog45DsGEsl/AcredIA---Design-System)

---

## Atoms

| Component | Variants / states | Size (approx) | Typography | Colors | Icons | Usage |
|-----------|-------------------|---------------|------------|--------|-------|-------|
| **Primary Button** | default, loading (`Cargando...`) | H 48 (normal), 56 (Grande), 36 (Pequeño) | `body-md` / 600 | `color-primario`, white text | optional leading | Primary CTA — guardar, confirmar |
| **Secundary button** | default | H 48 | `body-md` | outline / neutral | optional | Secondary actions |
| **Cancelar** | default | H 48 | `body-md` | ghost / neutral | — | Dismiss, cancel flow |
| **Eliminar proceso** | default | H 48 | `body-md` | `color-peligro` | — | Destructive actions |
| **Más opciones** | default | H 48 | `body-md` | neutral | menu icon | Overflow menu trigger |
| **Status badge — Pendiente** | `EN PROCESO` | 134×28 | `label-md` | warning tint + dot | ellipse indicator | Fase en curso |
| **Status badge — En revisión** | symbol `En revisión` | 120×28 | `label-md` | info tint | dot | Revisión DUEA |
| **Status badge — Aprobado** | `ACREDITADA` | 133×28 | `label-md` | `color-exito` | dot | Acreditación vigente |
| **Status badge — Rechazado** | `RECHAZADA` | 132×28 | `label-md` | `color-peligro` | dot | No acreditada |
| **Status badge — Vencido** | `NO ACREDITADA` | 154×28 | `label-md` | neutral/danger | dot | Vencimiento |
| **Tag — DUEA 2025** | static label | 107×28 | `label-md` | brand subtle | — | Ciclo / convocatoria |
| **Icon (nav)** | Default, Gestion, Dashboards, Historial, ayuda, Configuracion, Variant7 | 18–22px | — | `color-primario` / muted | vector | Sidebar / navbar |
| **Dot / pulse loaders** | 6 dot variants + pulse | 250×250 / 456×232 | — | brand primary | animated | Loading states |
| **Alert — Info** | static | 452×122 | `heading-sm` + `body-md` | `color-info` | info icon | Inline feedback |
| **Alert — Success** | static | 452×122 | same | `color-exito` | check icon | Operation OK |
| **Alert — Warning** | static | 452×122 | same | `color-advertencia` | warning icon | Caution |
| **Alert — Error** | static | 452×122 | same | `color-peligro` | error icon | Failure |

---

## Molecules

| Component | Variants / states | Dimensions | Nested | Responsive |
|-----------|-------------------|------------|--------|------------|
| **InputText** | `click=Default`, `click=Click` | 233×54 | label + field | min-width 233 |
| **InputAreaText** | Default, Click | 233×163 | label + textarea | fixed demo width |
| **Dropdown** | `desplegar=false`, `desplegar=true` | 233×56 | chevron, options list | — |
| **Option** (list item) | `Property 1=ActiveFalse`, `activeTrue` | 233×36 | — | full width |
| **Checkbox row** | checked / unchecked | 173×16 | label text | stacks vertically |
| **Radio row** | selected / unselected | 173×16 | label text | evaluation type |
| **Toggle row** | on / off | 173×16 | switch track | notifications |
| **Button group** | horizontal | variable | 2–3 buttons | gap ~16px |
| **Navegacion item** | Default, Selected, Pressed | 269×68 | icon + label | sidebar |
| **Subitem** | Default, Variant2 | 216×33 | nested under menu | indented |
| **Perfil** (sidebar) | Default | 260×84 | avatar + meta | — |

---

## Organisms

| Component | Contains | Frame ref | Inferred usage |
|-----------|----------|-----------|----------------|
| **Main menu component** | Default + Expanded (240×42 / 240×210) | `535:222` | App sidebar with collapsible sections |
| **Form — campos de texto** | Nombre, Código acreditación, Estado, Correo, Carrera | `37:192` | Program evaluation form |
| **Form — Casillas y selectores** | checklists, radios, toggles | `38:273` | Criteria + notification prefs |
| **Variantes de botón** (row) | all button types | `25:38` | Pattern library strip |
| **Insignias y etiquetas** (row) | all status badges | `35:152` | Process state legend |
| **Botones de navegacion** | menu + subitem + profile | `279:31` | Shell navigation |
| **Tablas y datos** | data table + toolbar | `50:290` | Acreditación listings, 7 columns |
| **Retroalimentación y estados** | alerts grid + confirmation modal | `53:890` | Feedback UI, destructive confirm |
| **Confirmation Modal** | header + body + footer | `53:1500` | 448×303 dialog over scrim |
| **Iconografia sections** | Archivos, Personalizacion, nav icons | `56:1786` | Icon catalog |
| **Motion loaders** | dot / circle / pulse | `1676:*`, `1677:*` | Async loading reference |

---

## Layouts

| Layout | Size | Node | Notes |
|--------|------|------|-------|
| **Body (shell)** | 1280×1747 | `56:1522` | Full app chrome reference |
| **Body (extended flows)** | 1280×3705 | `1004:49` | Multi-section scroll composition |
| **Documentation artboard** | 1024×* | foundations | Left-aligned doc layout, 48px padding |

---

## Component sets (symbols) — quick index

| Name | Node IDs | Property pattern |
|------|----------|------------------|
| Navegacion | `285:82`, `285:89`, `535:276` | Property 1 = Default / Selected / Pressed |
| Main menu component | `535:221`, `535:223` | Default / Expanded |
| Dropdown | `534:387`, `534:388` | desplegar = true / false |
| InputText | `534:160`, `534:162` | click = Default / Click |
| Iconos nav bar | `937:2538` … `1760:10625` | Property 1 = role |
| Button (toggle) | `328:1069`, `328:1071` | Property 1 = Default / Variant2 |
| Primary Button (hover lab) | `26:50` | Property 1 = Default / hover |
| Cancelar con advertencia | `973:2633` | Default / Variant3 |
| Dropdown (extract) | `1729:8294` | desplegar = true / false |

---

## External library components (subscribed, not AcredIA-native)

Available via team libraries for reference only:

- Material 3: Button, FAB, Toggle, Split button, Icon button, …
- Simple Design System: Button, inputs, cards, …
- Apple HIG kits: platform-specific controls

Prefer **in-file** AcredIA instances when implementing SIGESA UI.
