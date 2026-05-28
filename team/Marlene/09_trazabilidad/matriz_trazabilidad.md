# Matriz de trazabilidad extremo a extremo — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Ubicación canónica** | `team/Marlene/09_trazabilidad/matriz_trazabilidad.md` |
| **Réplica gobierno repo** | `matriz_trazabilidad.md` (raíz) |
| **Fuentes** | `docs/LFSD.md`, `team/Marlene/01_brd/BRD_v1.md`, `03_prd/PRD.md`, `04_fsd/*`, `05_nfr/NFR_ISO25010.md` |
| **Alcance** | CEUB / ARCU-SUR — DUEA UMSS · release objetivo v1.0 |

---

## 1. Convención de identificadores

| Prefijo | Significado | Ejemplo |
|---------|-------------|---------|
| **OBJ** | Objetivo de negocio | OBJ-01 |
| **BRD-MRD** | Necesidad BRD (mapa MRD) | BRD-MRD-N-01 |
| **PRD-REQ** | Requerimiento funcional PRD | PRD-REQ-001 |
| **PRD-US** | User story | PRD-US-003 |
| **FSD-UC** | Caso de uso | FSD-UC-002 |
| **NFR** | No funcional ISO 25010 | NFR-009 |
| **RB** / **BR** | Regla de negocio / Must | RB-03, BR-015 |
| **GH** | Escenario Gherkin | GH-UC003-S02 |
| **API** | Contrato REST `/api/v1` | API-DOC-POST |
| **MOD** | Módulo lógico | MOD-WORKFLOW |
| **TC** | Caso de prueba LFSD §11 | TC-07 |
| **PC** | Prompt contract IA | PC-UC-003 |
| **SKILL** | Skill agente (`AGENTS.md`) | SKILL-SIG-04 |

**Estado implementación:** `PLAN` · `EN_CURSO` · `DONE` · `N/A` (solo documentación).

**Prioridad:** `P0` MVP · `P1` v1.0 · `P2` evolutivo.

**Criticidad:** `C1` acreditación / normativa · `C2` operación DUEA · `C3` transversal.

---

## 2. Objetivos de negocio (OBJ)

| ID | Objetivo | Artefactos principales |
|----|----------|------------------------|
| OBJ-01 | Fuente única de verdad para evidencias | UC-002, UC-007, MOD-DOCS |
| OBJ-02 | Trazabilidad auditable CEUB / visitas | RB-04, NFR-013, UC-009 |
| OBJ-03 | Visibilidad gerencial tiempo real | UC-004, UC-005, MOD-DASHBOARD |
| OBJ-04 | Cumplimiento plazos y notificaciones | RB-05, NFR-003, UC-006 |
| OBJ-05 | Soberanía datos @umss.edu.bo | RB-06, NFR-005, UC-001 |

---

## 3. Matriz maestra por caso de uso (FSD-UC)

Cada fila es la **unidad de trazabilidad** principal para releases, PRs y checklist QA (`CR-SIG-02`).

| FSD-UC | Nombre | OBJ | PRD-REQ | PRD-US | NFR | RB / BR | TC | MOD | API (clave) | Diagramas `07_diagramas/` | Gherkin | Estado | P | C |
|--------|--------|-----|---------|--------|-----|---------|-----|-----|-------------|---------------------------|---------|--------|---|---|
| UC-001 | Autenticación y sesión | OBJ-05 | 001, 002 | 001, 002 | 005, 007, 010 | RB-06 | 01, 02 | MOD-AUTH | `POST /auth/login`, `GET /auth/me` | UC01_secuencia, UC01_estado | `gherkin.md` §2 | PLAN | P0 | C1 |
| UC-002 | Carga y versionado evidencia | OBJ-01 | 003, 004 | 003–005, 014 | 006, 009, 013 | RB-02, RB-04, BR-015 | 03–05, 13 | MOD-DOCS | `POST /documentos`, `GET /documentos/{id}` | UC02_secuencia, UC02_estado | §3 | PLAN | P0 | C1 |
| UC-003 | Dictamen y avance subfase | OBJ-01,04 | 005, 010 | 006–008, 019 | 003, 010, 013 | RB-02, RB-03, BR-013, BR-014 | 06–08 | MOD-WORKFLOW | `PATCH …/decision`, `POST …/avance` | UC03_secuencia, UC03_estado | §4 | PLAN | P0 | C1 |
| UC-004 | Dashboard gerencial | OBJ-03 | 006 | 009, 010, 020 | 001, 004, 008 | RB-09, RB-05, RB-10 | 09, 10 | MOD-DASHBOARD | `GET /dashboard/jefatura` | — | §5 | PLAN | P0 | C2 |
| UC-005 | Reporte ejecutivo PDF | OBJ-03 | 007 | 011 | 002, 013 | RB-07 | 11, 12 | MOD-REPORTES | `POST /reportes/pdf` | adicionales SEQ-004 | §6 | PLAN | P0 | C2 |
| UC-006 | Notificaciones dominio | OBJ-04 | 008 | 013, 014 | 003 | RB-12 | 13 | MOD-NOTIF | outbox interno | — | §7 | PLAN | P0 | C2 |
| UC-007 | Búsqueda global | OBJ-01 | 009 | 015 | 001 | — | 14 | MOD-BUSQUEDA | `GET /busqueda/documentos` | — | §8 | PLAN | P0 | C3 |
| UC-008 | Portal público | OBJ-03 | 012, 013 | 016, 017 | 004, 008 | RB-07, BR-010 | PUB-01 | MOD-PUBLICO | `GET /publico/carreras/{slug}` | — | §9 | PLAN | P1 | C2 |
| UC-009 | Auditoría | OBJ-02 | 011 | 018 | 013 | RB-04, BR-009 | AUD-01 | MOD-AUDITORIA | `GET /auditoria` | — | §10 | PLAN | P0 | C1 |
| UC-010 | Proceso y plantilla | OBJ-02 | 010 | 019, 002 | 004 | RB-01, RB-05, RB-08, BR-013 | PROC-01 | MOD-WORKFLOW | `POST /procesos`, plantillas | `gantt-005-diagrama.mmd` | §11 | PLAN | P1 | C1 |
| UC-011 | Respaldos automáticos | OBJ-02 | 014 | 022 | 004, FIA-02 | BR-012 | BKP-01 | MOD-OPS | health / backup | — | §12 | PLAN | P0 | C2 |
| UC-012 | Plan de mejora | OBJ-01 | 016 | 021 | — | — | MEJ-01 | MOD-MEJORA | `POST /planes-mejora` | D-ACT-001 (adicionales) | §13 | PLAN | P1 | C3 |

**Documentos de detalle:** `team/Marlene/04_fsd/casos_uso.md` · `api_contracts.md` · `modelo_datos.md` (`er-006-diagrama.mmd`).

---

## 4. Matriz PRD-REQ ↔ PRD-US ↔ FSD-UC

| PRD-REQ | Descripción breve | PRD-US | FSD-UC |
|---------|-------------------|--------|--------|
| PRD-REQ-001 | Autenticación dominio UMSS | 001 | UC-001 |
| PRD-REQ-002 | Administración usuarios y roles | 002 | UC-001 |
| PRD-REQ-003 | Carga evidencias | 003, 005 | UC-002 |
| PRD-REQ-004 | Historial versiones | 004 | UC-002 |
| PRD-REQ-005 | Workflow aprobación TD | 006–008 | UC-003 |
| PRD-REQ-006 | Dashboard semáforos | 009, 010, 020 | UC-004 |
| PRD-REQ-007 | Reportes PDF ejecutivos | 011 | UC-005 |
| PRD-REQ-008 | Notificaciones eventos | 013, 014 | UC-002, UC-003, UC-006 |
| PRD-REQ-009 | Buscador global | 015 | UC-007 |
| PRD-REQ-010 | Plantillas / configuración proceso | 019, 007 | UC-003, UC-010 |
| PRD-REQ-011 | Log auditoría consultable | 018 | UC-009 |
| PRD-REQ-012 | Portal público estado | 016 | UC-008 |
| PRD-REQ-013 | Certificados publicados | 017 | UC-008 |
| PRD-REQ-014 | Respaldos automáticos | 022 | UC-011 |
| PRD-REQ-016 | Plan de mejora | 021 | UC-012 |
| PRD-REQ-017 | Exportación Excel | 012 | — (v1.2) |

---

## 5. Reglas de negocio ↔ casos de uso

| Regla | Enunciado corto | FSD-UC |
|-------|-----------------|--------|
| RB-01 | ARCU-SUR requiere CEUB vigente | UC-010 |
| RB-02 | Solo [CC] asignado carga evidencia | UC-002 |
| RB-03 | Cierre subfase si ∀ obligatorios APROBADO | UC-003 |
| RB-04 | Sin borrado físico documentos aprobados | UC-002, UC-009 |
| RB-05 | `fecha_limite_externa` inmutable | UC-004, UC-010 |
| RB-06 | Dominio @umss.edu.bo | UC-001 |
| RB-07 | PDF / portal solo alcance autorizado | UC-005, UC-008 |
| RB-08 | Metadatos proceso obligatorios | UC-010 |
| RB-09 | Semáforos según `config_dashboard` | UC-004 |
| RB-10 | Mensajes claros a [CC] | UC-003, UC-004 |
| RB-11 | IA no sustituye dictamen (v2) | Skills IA |
| RB-12 | Reintentos SMTP outbox | UC-006 |
| BR-013 | Un proceso EN_PROCESO por carrera/tipo/gestión | UC-010 |
| BR-014 | No cerrar con tareas pendientes | UC-003 |
| BR-015 | `indicador_id` obligatorio en documento | UC-002 |

Fuente: `team/Marlene/04_fsd/reglas_negocio.md`.

---

## 6. Catálogo Gherkin ↔ TC

| TC | FSD-UC | GH (ref.) | Escenario resumido | Automatización |
|----|--------|-----------|-------------------|----------------|
| TC-01 | UC-001 | GH-UC001-S01 | Login exitoso @umss.edu.bo | `@smoke` `@auth` |
| TC-02 | UC-001 | GH-UC001-S02 | Dominio no institucional | `@auth` |
| TC-03 | UC-002 | GH-UC002-S01 | Carga PDF válida | `@smoke` `@documento` |
| TC-04 | UC-002 | GH-UC002-S02 | Sin `indicador_id` → 400 | `@documento` |
| TC-05 | UC-002 | GH-UC002-S03 | Archivo > 50 MB | `@documento` |
| TC-06 | UC-003 | GH-UC003-S01 | Aprobación indicador | `@smoke` `@workflow` |
| TC-07 | UC-003 | GH-UC003-S02 | Rechazo justificación | `@workflow` |
| TC-08 | UC-003 | GH-UC003-S03 | Cierre subfase incompleta | `@workflow` |
| TC-09 | UC-004 | GH-UC004-S01 | Semáforos dashboard | `@dashboard` |
| TC-10 | UC-004 | GH-UC004-S02 | Filtros facultad/carrera | `@dashboard` |
| TC-11 | UC-005 | GH-UC005-S01 | PDF generado ≤ 5 min | `@reporte` |
| TC-12 | UC-005 | GH-UC005-S02 | Marca USO_INTERNO | `@reporte` |
| TC-13 | UC-006 | GH-UC006-S01 | Notificación tras carga | `@notificacion` |
| TC-14 | UC-007 | GH-UC007-S01 | Búsqueda P95 ≤ 3 s | `@busqueda` |

Fuente ejecutable: `team/Marlene/04_fsd/gherkin.md`.

---

## 7. API lógica ↔ UC (extracto)

| ID API | Método / recurso | FSD-UC | Código error ejemplo |
|--------|------------------|--------|----------------------|
| API-AUTH-LOGIN | `POST /api/v1/auth/login` | UC-001 | `SIGESA_AUTH_DOMAIN` |
| API-AUTH-ME | `GET /api/v1/auth/me` | UC-001 | `401` |
| API-DOC-POST | `POST /api/v1/documentos` | UC-002 | `SIGESA_EVIDENCE_CRITERION_REQUIRED` |
| API-DOC-GET | `GET /api/v1/documentos/{id}` | UC-002 | — |
| API-WF-DECISION | `PATCH /api/v1/indicadores/{id}/decision` | UC-003 | `SIGESA_VAL_JUSTIFICATION_SHORT` |
| API-WF-AVANCE | `POST /api/v1/subfases/{id}/avance` | UC-003 | `SIGESA_WF_INCOMPLETE` |
| API-DASH-JEF | `GET /api/v1/dashboard/jefatura` | UC-004 | — |
| API-REP-PDF | `POST /api/v1/reportes/pdf` | UC-005 | job async |
| API-SEARCH | `GET /api/v1/busqueda/documentos` | UC-007 | — |
| API-PUBLIC | `GET /api/v1/publico/carreras/{slug}` | UC-008 | — |
| API-AUDIT | `GET /api/v1/auditoria` | UC-009 | RBAC JD |

Detalle OpenAPI-style: `team/Marlene/04_fsd/api_contracts.md`.

---

## 8. Módulos ↔ tareas ↔ estado

| MOD | Descripción | FSD-UC | Task / épica PRD | Estado |
|-----|-------------|--------|------------------|--------|
| MOD-AUTH | JWT, RBAC, dominio UMSS | UC-001 | E1 IAM | PLAN |
| MOD-DOCS | Evidencias S3 versionadas | UC-002, UC-007 | E2 Documentos | PLAN |
| MOD-WORKFLOW | Dictamen TD, subfases | UC-003, UC-010 | E3 Workflow | PLAN |
| MOD-DASHBOARD | Semáforos JD | UC-004 | E4 Dashboard | PLAN |
| MOD-REPORTES | PDF server-side | UC-005 | E5 Reportes | PLAN |
| MOD-NOTIF | Outbox SMTP | UC-006 | E5 Notif | PLAN |
| MOD-PUBLICO | Portal lectura | UC-008 | E6 Portal | PLAN |
| MOD-AUDITORIA | Log append-only | UC-009 | E7 Gobernanza | PLAN |
| MOD-OPS | Backup / health | UC-011 | Ops | PLAN |
| MOD-MEJORA | Planes mejora | UC-012 | v1.1+ | PLAN |

---

## 9. Diagramas Mermaid ↔ UC

| FSD-UC | Secuencia | Estado | Otros |
|--------|-----------|--------|-------|
| UC-001 | `07_diagramas/seq-001-01-secuencia.mmd` | `state-001-01-estado.mmd` | D-SEQ-001 |
| UC-002 | `seq-002-02-secuencia.mmd` | `state-002-02-estado.mmd` | D-SEQ-002 |
| UC-003 | `seq-003-03-secuencia.mmd` | `state-003-03-estado.mmd` | D-SEQ-003 |
| UC-004 | — | — | — |
| UC-005 | `08_agents/mmd/` (SEQ-004) | — | — |
| Transversal | — | — | `er-006-diagrama.mmd`, `gantt-005-diagrama.mmd` |

Índice agentes: `team/Marlene/08_agents/ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md`.

---

## 10. NFR ISO 25010 ↔ artefactos

| NFR | Característica 25010 | FSD-UC | TC | Verificación |
|-----|----------------------|--------|-----|--------------|
| NFR-001 | Eficiencia desempeño | UC-007 | TC-14 | k6 P95 ≤ 3 s |
| NFR-002 | Eficiencia desempeño | UC-005 | TC-11 | Job PDF ≤ 5 min |
| NFR-003 | Eficiencia desempeño | UC-006 | TC-13 | Outbox ≤ 15 min |
| NFR-004 | Fiabilidad | Todos | — | SLA 99 % hábil |
| NFR-005 | Seguridad | UC-001 | TC-01 | TLS 1.2+ |
| NFR-006 | Seguridad | UC-002 | TC-03 | Cifrado reposo |
| NFR-007 | Seguridad | UC-001 | TC-02 | Pentest / auditoría |
| NFR-008 | Usabilidad | UC-002 | UAT | WCAG AA objetivo |
| NFR-009 | Usabilidad | UC-002 | TC-03 | Barra progreso 100 % |
| NFR-010 | Usabilidad | UC-001–003 | E2E | Validación formularios |
| NFR-011 | Compatibilidad | Todos | Manual | Chrome, Firefox, Edge |
| NFR-012 | Compatibilidad | UC-002 | Dispositivo | 360×640 |
| NFR-013 | Trazabilidad | UC-002, UC-003, UC-009 | E2E | 100 % acciones críticas |

Catálogo completo: `team/Marlene/05_nfr/NFR_ISO25010.md`.

---

## 11. IA asistida (v2) ↔ UC

| Skill / PC | Objetivo | FSD-UC | Gobernanza |
|------------|----------|--------|------------|
| SKILL-SIG-01 | Coherencia CEUB/ARCU-SUR | UC-010 | RB-01 · M-AI-002 |
| SKILL-SIG-02 | Metadatos evidencia vs indicador | UC-002 | RB-11 |
| SKILL-SIG-03 | Borrador reporte ejecutivo | UC-005 | RB-07 |
| SKILL-SIG-04 | Checklist cierre subfase | UC-003 | RB-03, humano [TD] |
| PC-UC-001 … 005 | Prompt contracts API | UC-001–005 | `06_prompt_contracts/prompt_contracts.md` |
| PC-SIG-01 … | Skills ampliados | varios | `07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md` |

---

## 12. KPIs y riesgos (resumen)

| KPI | Objetivo | FSD-UC / MOD |
|-----|----------|--------------|
| KPI-EVID-COMPLETE | Evidencias vigentes / requeridos | UC-002 |
| KPI-SUBFASE-OK | Subfases cerradas a tiempo | UC-003 |
| KPI-DASH-LATENCY | Experiencia dashboard ≤ 2 min | UC-004 |
| KPI-PDF-SLA | 100 % jobs ≤ 5 min | UC-005 |
| KPI-NOTIF-SLA | ≥ 99 % en 15 min | UC-006 |
| KPI-AUDIT-COVERAGE | 100 % acciones críticas | UC-009 |

| RISK | Mitigación | OBJ |
|------|------------|-----|
| RISK-01 | Cola SMTP retry | OBJ-04 |
| RISK-02 | Límite 50 MB, almacenamiento | OBJ-01 |
| RISK-04 | Plantillas versionadas | OBJ-02 |
| RISK-07 | JWT, TLS, auditoría | OBJ-05 |

---

## 13. BRD (MRD) ↔ PRD ↔ FSD (mapa alto nivel)

| BRD (BR-00x) | MRD ref. | PRD-REQ | FSD-UC |
|--------------|----------|---------|--------|
| BR-001 | MRD-N-01 Gestión documental | PRD-REQ-003 | UC-002 |
| BR-002 | MRD-N-02 Versiones | PRD-REQ-004 | UC-002 |
| BR-003 | MRD-N-03 Dashboard | PRD-REQ-006 | UC-004 |
| BR-004 | MRD-N-04 Reportes | PRD-REQ-007 | UC-005 |
| BR-005 | MRD-N-05 Notificaciones | PRD-REQ-008 | UC-006 |
| BR-006 | MRD-N-06 Roles | PRD-REQ-001, 002 | UC-001 |
| BR-007 | MRD-N-07 Normativa CEUB/ARCU | PRD-REQ-010 | UC-010 |
| BR-008 | MRD-N-08 Buscador | PRD-REQ-009 | UC-007 |

Fuente: `team/Marlene/01_brd/BRD_v1.md` § trazabilidad.

---

## 14. Gobierno de la matriz

| Actividad | Frecuencia | Responsable | Entregable |
|-----------|------------|-------------|------------|
| Actualizar IDs y enlaces en PR | Cada PR funcional | Dev + QA | Descripción PR con `FSD-UC-xxx` + `TC-xx` |
| Revisar cobertura UC ↔ tests | Sprint | QA Lead | Informe cobertura |
| Sincronizar con `matriz_trazabilidad.md` raíz | Release | Tech Lead AcredIA | Diff aprobado |
| Firma alcance release | Hito mayor | Jefatura DUEA [JD] | Acta + tag Git |

**Regla Cursor:** `CR-SIG-02` — todo cambio de lógica de negocio declara `PRD-REQ` o `FSD-UC` y actualiza esta matriz o `casos_uso.md` §7 en el mismo PR.

---

## 15. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Matriz unificada paquete Marlene; alineación UC-001…012, US-001…022, diagramas `07_diagramas/` |

---

*Mantenimiento: al cambiar un UC, actualizar §3, §6 y §9 en el mismo commit. Métricas IA: `metricas_ai_sdlc.md`. Escenarios detallados solo en `gherkin.md` para evitar duplicar criterios de aceptación.*
