# JD — Administrador DUEA — Dashboard Principal

| Field | Value |
|-------|-------|
| **Node ID** | `435:450` |
| **Page** | `Prototipo Web` (`79:15`) |
| **Dimensions** | 1555 × 1512 |
| **Role** | [JD] Jefatura / Administrador DUEA |
| **Author** | Marlene |
| **Figma** | [Open in Figma](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-?node-id=435-450) |
| **Screenshot** | [`../../screenshots/jd-admin-dashboard.png`](../../screenshots/jd-admin-dashboard.png) ✅ |

---

## Frame overview

Main entry dashboard for **[JD] Jefatura / Administrador DUEA** after authentication.
Shows the administrative control panel for managing accreditation processes, users, and
institutional KPIs across all careers and faculties.

---

## Component sections (from metadata text analysis)

### 1. App Shell — Admin sidebar
- Role label: `"DUEA Administrador"` in sidebar header
- Admin-scoped navigation (includes user management, process creation sections not visible in CC/TD)
- "Administrator Profile" component in sidebar

### 2. Main Content Canvas (node `435:451` — `1007 × 1290.5`)
The main content area contains multiple administrative panels:

#### 2a. Alertas de Auditoría panel (node `437:1097` context)
- Section: "Alertas de Auditoría"
- Alert item: "Requiere revisión" — flagged processes awaiting JD attention
- Status display: "● Estable" indicator

#### 2b. Enlace Técnico card (node `436:804` context)
- Quick-access card to "Enlace Técnico" — technical liaison section

#### 2c. Última Observación panel (node `525:75` context)
- Section: "ÚLTIMA OBSERVACIÓN"
- Shows most recent observation emitted in the system

---

## JD-specific actions visible in this frame cluster

| Action | FSD-UC | Notes |
|--------|--------|-------|
| Ver Alertas de Auditoría | FSD-UC-003 | Process status monitoring |
| Acceder a Gestión de Usuarios | FSD-UC-013 | User creation/role assignment |
| Ver última observación del sistema | FSD-UC-005 | Read-only for JD |
| Crear Proceso de Acreditación | FSD-UC-003 | JD-exclusive action |
| Gestionar Modalidades (CEUB/ARCU-SUR) | FSD-UC-003 | JD-exclusive |

---

## Sibling Admin frames (for complete JD flow)

| Frame | Node ID | Description | Priority |
|-------|---------|-------------|----------|
| JD Home Admin (Aylen) | `495:445` | Alternative admin home | P1 |
| JD Crear Usuario | `509:73` | User creation form with role selector | P1 |
| JD Gestión Usuarios | `680:3892` | User list + RBAC management | P1 |
| JD Reportes | `678:3289` | Institutional reports | P2 |
| JD Dashboard KPIs | `892:2719` | "Dashboard General" — totals: usuarios 1284 / admins 12 | P1 |
| JD Panel Control | `231:130` | "Panel de Control Gestión Académica" — carreras KPIs | P1 |
| JD Crear Proceso | `436:804` | Process creation/management form | P0 |
| JD Modalidades | `1449:6528` | Modalities management dashboard | P1 |
| JD Certificado | `1077:4736` | Certificate issuance | P2 |

---

## RBAC verification

- "DUEA Administrador" label confirms [JD] role scoping
- "Enlace Técnico" card suggests JD can escalate to TD for technical review
- "Alertas de Auditoría" section: JD receives system-level alerts, not individual reviews
- No "REVISAR" task-tray (TD-exclusive) — confirms correct role separation in UI

---

## FSD traceability

| FSD item | This frame covers |
|---------|-------------------|
| FSD-UC-003 — Crear / Gestionar Proceso | Alertas + process overview |
| FSD-UC-013 — Gestión de usuarios y RBAC | Admin sidebar + user sections |
| FSD-UC-017 — Registrar Dictamen Final | JD-exclusive panel (to verify in detail view) |
| FSD-BR-08 — Solo JD puede crear Procesos | Admin-only nav confirmed |

---

## Export status

| Asset | Status |
|-------|--------|
| Screenshot PNG | ✅ `screenshots/jd-admin-dashboard.png` (263 KB, 1555×1512) |
| Frame metadata | ✅ this file |
| Annotations | ✅ `annotations/prototipo/jd-admin-dashboard.annotations.md` |

**Last export:** 2026-05-27 via MCP `get_screenshot`
