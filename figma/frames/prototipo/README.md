# Prototipo Web — Frame catalog

**Page:** `Prototipo Web` (`79:15`)  
**Discovered:** 2026-05-27 via `get_metadata`  
**File:** [AcredIA Design System (Copy)](https://www.figma.com/design/8xAUbh7TScU1I4lHVTvUTS/AcredIA---Design-System--Copy-)

This page contains the **functional prototype screens** organized by role. Unlike the `Elementos` page
(design system foundations + components), this page shows complete application views.

---

## Frame index by role

### [AUTH] Authentication

| Slug | Node ID | Dimensions | Screenshot |
|------|---------|------------|------------|
| auth-login | `111:74` | 1280×1123 | pending |
| auth-login-v2 | `1747:9301` | 1280×1123 | pending |
| auth-login-continuation | `1749:9710` | 1280×1116 | pending |

---

### [P] Público — Portal público (Aylen)

| Slug | Node ID | Dimensions | Screenshot |
|------|---------|------------|------------|
| public-home | `1505:6772` | 1280×3762 | pending |
| public-info-duea | `1644:8175` | 1280×4415 | pending |
| public-modalidades | `169:51` | 1280×2801 | pending |
| public-acreditacion | `169:62` | 1280×2632 | pending |
| public-acreditacion-v2 | `1926:10098` | 1280×4587 | pending |
| public-acreditacion-carrera-acreditada | `197:677` | 1280×2671 | pending |
| public-acreditacion-carrera-no-acreditada | `189:636` | 1280×1726 | pending |
| public-noticias | `189:275` | 1280×2780 | pending |
| public-ayuda | `189:648` | 1280×2968 | pending |
| public-home-boris | `83:87` | 1440×1024 | pending |
| certificado | `1077:4736` | 1280×1457 | pending |

---

### [TD] Técnico DUEA

| Slug | Node ID | Dimensions | Screenshot | Priority |
|------|---------|------------|------------|----------|
| **td-bandeja-tareas** | `1249:3112` | 1282×1589 | **✅ EXPORTED** | P0 |
| td-review-detail | `885:2309` | 1280×1574 | pending | P1 — TD evidence detail view |
| td-panel-control | `231:130` | 1280×1145 | pending | P1 — KPI panel |
| td-panel-admin | `513:918` | 1280×1744 | pending | P2 |

---

### [CC] Coordinador de Carrera (Boris Angulo)

| Slug | Node ID | Dimensions | Screenshot | Priority |
|------|---------|------------|------------|----------|
| **cc-coordinador-home** | `635:319` | 1280×1164 | **✅ EXPORTED** | P0 |
| cc-coordinador-home-v2 | `1761:12506` | 1280×1164 | pending | P1 |
| cc-coordinador-home-v3 | `1761:14012` | 1280×1164 | pending | P2 |
| cc-coordinador-home-v4 | `1761:14387` | 1280×1164 | pending | P2 |
| cc-fase1 | `1143:3254` | 1280×1043 | pending | P0 |
| cc-fase1-arcusur | `1761:9866` | 1280×1043 | pending | P1 |
| cc-fase2 | `666:1807` | 1280×1043 | pending | P0 |
| cc-fase2-arcusur | `1761:9867` | 1280×1043 | pending | P1 |
| cc-fase3 | `1143:3567` | 1280×1043 | pending | P1 |
| cc-fase3-arcusur | `1761:9868` | 1280×1043 | pending | P1 |
| cc-documentacion | `670:2333` | 1280×1387 | pending | P0 |
| cc-documentacion-arcusur | `1761:9869` | 1280×1387 | pending | P1 |
| cc-observaciones | `671:2661` | 1280×1159 | pending | **P0 — OBSERVADO gap** |
| cc-observaciones-arcusur | `1761:9947` | 1280×1159 | pending | P1 |
| cc-reportes | `673:2991` | 1280×1159 | pending | P1 |
| cc-info-carrera | `673:2992` | 1280×2273 | pending | P2 |
| cc-modal-proceso | `767:1489` | 864×747 | pending | P0 |
| cc-modal-proceso-arcusur | `1594:8472` | 864×747 | pending | P1 |
| cc-modal-proceso-observado | `1162:3861` | 864×735 | pending | **P0 — Observation modal gap** |
| cc-modal-subir-documento | `782:1510` | 671×684 | pending | **P0 — Upload modal gap** |
| cc-modal-visualizar-documento | `1656:8218` | 1216×683 | pending | P1 |
| cc-modal-observaciones | `1656:8404` | 611×450 | pending | P0 |
| cc-notificaciones | `1143:3121` | 390×634 | pending | P1 |
| cc-certificado-modal | `1167:4151` | 937×819 | pending | P1 |
| cc-arcusur-home | `1594:7144` | 1280×1164 | pending | P1 |

---

### [JD] Administrador / Jefatura DUEA (Marlene + Aylen Admin)

| Slug | Node ID | Dimensions | Screenshot | Priority |
|------|---------|------------|------------|----------|
| **jd-admin-dashboard** | `435:450` | 1555×1512 | **✅ EXPORTED** | P0 |
| jd-admin-home | `495:445` | 1280×1313 | pending | P1 |
| jd-dashboard-general | `892:2719` | 1280×1396 | pending | P1 — usuarios KPIs |
| jd-panel-kpi | `231:130` | 1280×1145 | pending | P1 — carreras KPIs |
| jd-admin-crear-usuario | `509:73` | 1280×1207 | pending | P1 |
| jd-usuarios | `680:3892` | 1280×1313 | pending | P1 |
| jd-reportes | `678:3289` | 1280×1703 | pending | P1 |
| jd-plan-mejora | `1077:5356` | 1280×1482 | pending | P2 |

---

## Screenshot export plan (next session)

MCP calls budget for next run (prioritized):

| Priority | Frame slug | Node ID | Justification |
|----------|-----------|---------|---------------|
| **P0** | cc-observaciones | `671:2661` | Covers OBSERVADO state — critical audit gap |
| **P0** | cc-modal-proceso-observado | `1162:3861` | Observation modal — critical audit gap |
| **P0** | cc-modal-subir-documento | `782:1510` | Upload modal — critical audit gap |
| **P0** | jd-admin-dashboard | `435:450` | JD role — critical audit gap |
| **P0** | auth-login | `111:74` | Auth flow — missing from documentation |
| **P1** | cc-fase2 | `666:1807` | SUBSANADO state confirmation |
| **P1** | cc-documentacion | `670:2333` | Evidence management view |
| **P1** | public-home | `1505:6772` | Public portal landing |

**Calls used this session:** 3 total (get_metadata ×2, get_screenshot ×1)  
**Calls remaining for next session:** budget permitting
