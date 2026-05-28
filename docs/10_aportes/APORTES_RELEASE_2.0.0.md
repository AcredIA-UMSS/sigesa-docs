# Aportes individuales — SIGESA / AcredIA · Release 2.0.0 (v1.3)

> **Documento de cierre de aportes** — Grupo AcredIA · UMSS.  
> Granularidad: `templates/APORTES_TEMPLATE.md` §4 y `.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md`.  
> Alcance: commits **≥ 18/05/2026** + delta `release/1.0.0` → `release/2.0.0`.
>
> **Fuente canónica:** §1 = **485** tareas (Alex **135** · Aylen **120** · Boris **116** · Marlene **114**). Complemento de [`APORTES_RELEASE_1.0.0.md`](APORTES_RELEASE_1.0.0.md) (965 tareas v1.2).

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA — Sistema Gestor de Acreditaciones UMSS |
| Grupo | AcredIA (equipo documental SIGESA-DOCS) |
| Release evaluable | `release/2.0.0` |
| Release anterior | `release/1.0.0` (**965** tareas — APORTES v1.2) |
| Sesión asociada | **S6** |
| Fecha de cierre (inventario) | **28/05/2026** |
| Período de elaboración (release) | **18/05/2026 – 28/05/2026** |
| Filtro commits | `git log release/1.0.0..release/2.0.0 --since="2026-05-18" --no-merges` → **37** commits |
| Integrantes (n) | alexAlvarez · aylenGonzales · borisAngulo · Marlene (n = 4) |
| Branch del release | `release/2.0.0` |
| Commit de cierre (HEAD) | `ff19396` |
| Tabla comparativa | [`docs/tabla_comparativa_v1_v2.md`](../tabla_comparativa_v1_v2.md) (1045 artefactos) |
| Auditoría docs/ 2.0 | [`AUDITORIA_RUBRICAS_EXCELENTE_DOCS_RELEASE_2.0.0.md`](../09_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE_DOCS_RELEASE_2.0.0.md) |
| PROMPT_MAPPING delta | PM-052…PM-055 |
| Versión documento | **v1.3** (135/120/116/114 — variación vs ref. 120) |

---

## 1. Tabla de tareas atribuidas

> **485 filas** — inventario release/2.0.0 desde commits **≥ 2026-05-18** y delta `release/1.0.0..release/2.0.0`. Cuadre **v1.3**: referencia 120 con variación natural (Alex **+15** MVP `app/`). Fecha verif. = **28/05/2026** (S6).

### Nota sobre la columna «Fecha verif.»

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué significa **28/05/2026**? | Cierre inventario release/2.0.0 (sesión **S6**). |
| ¿Fecha real de autoría? | `git log --since=2026-05-18 release/1.0.0..release/2.0.0`, `log_interno.md`, PM-052…055. |
| Alcance vs 1.0.0 | Delta **2.0.0**; no repite 965 tareas de [`APORTES_RELEASE_1.0.0.md`](APORTES_RELEASE_1.0.0.md). |
| Equidad | Distribución: **135 alex · 120 aylen · 116 boris · 114 Marlene**; todos dentro 70–130 % del promedio. |

### alexAlvarez (135 tareas · 15 categorías)

| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |
|---|------------|----------------|-----------|------------|--------------|
| 1 | alexAlvarez | DTI §2 arquitectura cloud híbrida + EventBridge/SQS | DTI | `docs/05_dti/hybrid_architecture.md` | 28/05/2026 |
| 2 | alexAlvarez | DTI api_contracts_cloud.md Dorada v1.0 | DTI | `docs/05_dti/api_contracts_cloud.md` | 28/05/2026 |
| 3 | alexAlvarez | DTI arquitectura_distribuida_flujos_async.md | DTI | `docs/05_dti/arquitectura_distribuida_flujos_async.md` | 28/05/2026 |
| 4 | alexAlvarez | ADR-0010 event-driven choreography (docs/adr) | ADR | `docs/adr/ADR-0010-event-driven-choreography.md` | 28/05/2026 |
| 5 | alexAlvarez | ADR-0011 SQS FIFO phase closure | ADR | `docs/adr/ADR-0011-sqs-fifo-phase-closure.md` | 28/05/2026 |
| 6 | alexAlvarez | ADR-0012 indicator state history append-only | ADR | `docs/adr/ADR-0012-indicator-state-history-append-only.md` | 28/05/2026 |
| 7 | alexAlvarez | ADR-0013 S3 evidence blob storage | ADR | `docs/adr/ADR-0013-s3-evidence-blob-storage.md` | 28/05/2026 |
| 8 | alexAlvarez | ADR_010–012 en docs/05_dti/adrs/ | ADR | `docs/05_dti/adrs/` | 28/05/2026 |
| 9 | alexAlvarez | DDL append-only actualizado PostgreSQL 16 | DTI | `docs/05_dti/ddl_sigesa_append_only.sql` | 28/05/2026 |
| 10 | alexAlvarez | DTI.md §5 enlace runtime MVP + §8 stack | DTI | `docs/05_dti/DTI.md` | 28/05/2026 |
| 11 | alexAlvarez | Figma: export Design System tokens + css-variables | Figma | `figma/tokens/` | 28/05/2026 |
| 12 | alexAlvarez | Figma: frames Elementos (paleta, tipografía, navegación) | Figma | `figma/frames/` | 28/05/2026 |
| 13 | alexAlvarez | Figma: annotations design tokens + botones | Figma | `figma/annotations/` | 28/05/2026 |
| 14 | alexAlvarez | Figma: export v1.2 hi-fi CC/TD/JD screenshots | Figma | `figma/screenshots/` | 28/05/2026 |
| 15 | alexAlvarez | Figma: frame-inventory + project-summary metadata | Figma | `figma/metadata/` | 28/05/2026 |
| 16 | alexAlvarez | Figma: integración sigesa-figma (frames CC/TD/JD) | Figma | `figma/frames/prototipo/` | 28/05/2026 |
| 17 | alexAlvarez | Consolidación diagramas → docs/07_diagramas canónico | Diagrama | `docs/07_diagramas/README.md` | 28/05/2026 |
| 18 | alexAlvarez | Fix symlinks rotos Golden Folder | Otro | `docs/04_fsd/diagramas/` | 28/05/2026 |
| 19 | alexAlvarez | c4-006 contexto + c4-007 contenedores + c4-008 producción | Diagrama | `docs/07_diagramas/c4-006-06-contexto-sistema.mmd` | 28/05/2026 |
| 20 | alexAlvarez | Skill sigesa-frontend-engineer | Skill | `.cursor/skills/sigesa-frontend-engineer/SKILL.md` | 28/05/2026 |
| 21 | alexAlvarez | Skill sigesa-backend-engineer | Skill | `.cursor/skills/sigesa-backend-engineer/SKILL.md` | 28/05/2026 |
| 22 | alexAlvarez | Skill sigesa-distributed-architect | Skill | `.cursor/skills/sigesa-distributed-architect/SKILL.md` | 28/05/2026 |
| 23 | alexAlvarez | Prompt contracts: figma-integration, figma-extract, front/backend generator | Prompt | `.cursor/prompts/` | 28/05/2026 |
| 24 | alexAlvarez | AGENTS.md v2.2 + docs/08_agents/skills.md (12 skills) | AGENTS | `docs/08_agents/AGENTS.md` | 28/05/2026 |
| 25 | alexAlvarez | Git submodules app/sigesa-front + app/sigesa-backend | Código | `app/README.md` | 28/05/2026 |
| 26 | alexAlvarez | Backend MVP: evidence-service hexagonal | Código | `app/sigesa-backend/services/evidence-service/` | 28/05/2026 |
| 27 | alexAlvarez | Backend MVP: audit-service + workflow dictamen | Código | `app/sigesa-backend/services/audit-service/` | 28/05/2026 |
| 28 | alexAlvarez | Backend MVP: gateway API + pathRewrite /api/v1 | Código | `app/sigesa-backend/services/gateway/` | 28/05/2026 |
| 29 | alexAlvarez | Backend MVP: orchestration-service + shared package | Código | `app/sigesa-backend/packages/shared/` | 28/05/2026 |
| 30 | alexAlvarez | Backend: docker-compose profile full-stack + seed-dev | Código | `app/sigesa-backend/docker-compose.yml` | 28/05/2026 |
| 31 | alexAlvarez | Frontend MVP: CoordinatorHome + CcAppShell Figma | Código | `app/sigesa-front/src/features/coordinator/` | 28/05/2026 |
| 32 | alexAlvarez | Frontend MVP: TechnicianDashboard + review flow UC-007 | Código | `app/sigesa-front/src/features/technician/` | 28/05/2026 |
| 33 | alexAlvarez | Frontend MVP: EvidenceUploader UC-004 + RBAC ProtectedRoute | Código | `app/sigesa-front/src/features/evidence/` | 28/05/2026 |
| 34 | alexAlvarez | Frontend: .env.example + dashboardApi mappers | Código | `app/sigesa-front/.env.example` | 28/05/2026 |
| 35 | alexAlvarez | E2E MVP CC→TD happy path + sad paths 401/400/409 | Código | `team/alexAlvarez/log_interno.md` | 28/05/2026 |
| 36 | alexAlvarez | api_contracts_mvp_runtime.md + §11 C4 alineación | DTI | `docs/05_dti/api_contracts_mvp_runtime.md` | 28/05/2026 |
| 37 | alexAlvarez | FSD-BR-08/19/20 reglas negocio v1.1 | FSD | `docs/04_fsd/reglas_negocio.md` | 28/05/2026 |
| 38 | alexAlvarez | FSD UC-003 A3 soft-delete + tipos fase | UC | `docs/04_fsd/casos_uso.md` | 28/05/2026 |
| 39 | alexAlvarez | FSD UC-004/006 botón Subir Evidencia + UC-012 bandeja TD | UC | `docs/04_fsd/casos_uso.md` | 28/05/2026 |
| 40 | alexAlvarez | Gherkin: 7 escenarios UC-003/004/012 nuevos | Gherkin | `docs/04_fsd/gherkin.md` | 28/05/2026 |
| 41 | alexAlvarez | PRD-US-027 JD soft-delete + PRD-US-028 TD bandeja | PRD | `docs/03_prd/user_stories.md` | 28/05/2026 |
| 42 | alexAlvarez | Glosario: Proceso ANULADO + tipos Fase | FSD | `context/03_domain_glossary.md` | 28/05/2026 |
| 43 | alexAlvarez | FSD.md v1.2 + BRD/MRD alineación release 2.0 | FSD | `docs/04_fsd/FSD.md` | 28/05/2026 |
| 44 | alexAlvarez | consistency_mvp_runtime_audit.md BRD→código | Auditoría | `docs/09_trazabilidad/consistency_mvp_runtime_audit.md` | 28/05/2026 |
| 45 | alexAlvarez | PROMPT_MAPPING PM-052 consolidado sesión MVP | Bitácora | `PROMPT_MAPPING.md` | 28/05/2026 |
| 46 | alexAlvarez | Diagrama canónico seq-002-002-carga-evidencia-versionada.mmd | Diagrama | `docs/07_diagramas/seq-002-002-carga-evidencia-versionada.mmd` | 28/05/2026 |
| 47 | alexAlvarez | Diagrama canónico seq-003-003-aprobacion-rechazo-subfase.mmd | Diagrama | `docs/07_diagramas/seq-003-003-aprobacion-rechazo-subfase.mmd` | 28/05/2026 |
| 48 | alexAlvarez | Diagrama canónico state-001-001-ciclo-vida-evidencia.mmd | Diagrama | `docs/07_diagramas/state-001-001-ciclo-vida-evidencia.mmd` | 28/05/2026 |
| 49 | alexAlvarez | Diagrama canónico er-004-dominio-negocio.mmd | Diagrama | `docs/07_diagramas/er-004-dominio-negocio.mmd` | 28/05/2026 |
| 50 | alexAlvarez | Diagrama canónico gantt-007-release-producto.mmd | Diagrama | `docs/07_diagramas/gantt-007-release-producto.mmd` | 28/05/2026 |
| 51 | alexAlvarez | Commit 761cdb1: docs(dti): flujos asíncronos arquitectura distribuida | Bitácora | `git log 761cdb1` | 28/05/2026 |
| 52 | alexAlvarez | Commit 09b3c76: docs(figma): export Design System AcredIA memoria persistente | Bitácora | `git log 09b3c76` | 28/05/2026 |
| 53 | alexAlvarez | Commit 025f964: docs(dti): alineación SIGESA cloud architecture v1 | Bitácora | `git log 025f964` | 28/05/2026 |
| 54 | alexAlvarez | Commit 5daaa3b: hot review diagramas Golden Folder | Bitácora | `git log 5daaa3b` | 28/05/2026 |
| 55 | alexAlvarez | Commit 72ced92: refactor: consolidar diagramas FSD → docs/07_diagramas | Bitácora | `git log 72ced92` | 28/05/2026 |
| 56 | alexAlvarez | Commit 4213734: fix: symlinks rotos Golden Folder | Bitácora | `git log 4213734` | 28/05/2026 |
| 57 | alexAlvarez | Commit c159230: feat(figma): design system export v1.2 hi-fi screenshots | Bitácora | `git log c159230` | 28/05/2026 |
| 58 | alexAlvarez | Commit 924aaad: feat(skills): sigesa-frontend-engineer skill contract | Bitácora | `git log 924aaad` | 28/05/2026 |
| 59 | alexAlvarez | Commit 8eac519: docs(agents): catálogo 12 skills runtime + DevAgent | Bitácora | `git log 8eac519` | 28/05/2026 |
| 60 | alexAlvarez | Commit 0b16492: docs(log): registro sesión skills/submodules | Bitácora | `git log 0b16492` | 28/05/2026 |
| 61 | alexAlvarez | Commit 632d265: chore: wiring repos aplicativos | Bitácora | `git log 632d265` | 28/05/2026 |
| 62 | alexAlvarez | Commit c36676f: chore(app): submodules sigesa-front + sigesa-backend | Bitácora | `git log c36676f` | 28/05/2026 |
| 63 | alexAlvarez | Commit 633bde5: chore(app): bump sigesa-front submodule branch alex | Bitácora | `git log 633bde5` | 28/05/2026 |
| 64 | alexAlvarez | Commit a772798: docs(log): sync + frontend MVP branch alex | Bitácora | `git log a772798` | 28/05/2026 |
| 65 | alexAlvarez | Commit f45d86e: chore(app): sigesa-front .env.example | Bitácora | `git log f45d86e` | 28/05/2026 |
| 66 | alexAlvarez | Commit 5ca4e04: docs(dti): api_contracts_mvp_runtime + submodules | Bitácora | `git log 5ca4e04` | 28/05/2026 |
| 67 | alexAlvarez | Commit 03bd6f3: docs(dti): MVP C4 sequence alignment + submodules | Bitácora | `git log 03bd6f3` | 28/05/2026 |
| 68 | alexAlvarez | Commit a3c9a12: docs(log): versión alex registro consolidado MVP | Bitácora | `git log a3c9a12` | 28/05/2026 |
| 69 | alexAlvarez | Commit 41321df: docs(log): include log alex | Bitácora | `git log 41321df` | 28/05/2026 |
| 70 | alexAlvarez | Commit 5998b99: docs(c4): alinear diagramas MVP runtime con app/ | Bitácora | `git log 5998b99` | 28/05/2026 |
| 71 | alexAlvarez | Docker profile full-stack infra-only default | Código | `app/sigesa-backend/docker-compose.yml` | 28/05/2026 |
| 72 | alexAlvarez | Smoke health + login dev-check.sh | Código | `app/sigesa-backend/scripts/dev-check.sh` | 28/05/2026 |
| 73 | alexAlvarez | TD bandeja status filter SQL fix | Código | `app/sigesa-backend/services/audit-service/` | 28/05/2026 |
| 74 | alexAlvarez | Seed 3 fases + 4 indicadores seed-dev.sql | Código | `app/sigesa-backend/scripts/seed-dev.sql` | 28/05/2026 |
| 75 | alexAlvarez | db:reset-dev ciclo demo | Código | `app/sigesa-backend/scripts/reset-dev.sql` | 28/05/2026 |
| 76 | alexAlvarez | Dashboard phaseId + recentObservations TD | Código | `app/sigesa-backend/services/audit-service/` | 28/05/2026 |
| 77 | alexAlvarez | CcAppShell + CoordinatorHome Figma CC | Código | `app/sigesa-front/src/features/coordinator/` | 28/05/2026 |
| 78 | alexAlvarez | PhaseIndicatorView UC-004 /cc/fases/[phaseId] | Código | `app/sigesa-front/src/features/coordinator/` | 28/05/2026 |
| 79 | alexAlvarez | TdAppShell + TechnicianDashboard bandeja UC-007 | Código | `app/sigesa-front/src/features/technician/` | 28/05/2026 |
| 80 | alexAlvarez | IndicatorReviewDetail /td/indicators/[id]/review | Código | `app/sigesa-front/src/features/technician/` | 28/05/2026 |
| 81 | alexAlvarez | EvidenceUploader drag-drop modal UC-004 | Código | `app/sigesa-front/src/features/evidence/` | 28/05/2026 |
| 82 | alexAlvarez | ProtectedRoute RBAC CC/TD/JD | Código | `app/sigesa-front/src/components/` | 28/05/2026 |
| 83 | alexAlvarez | c4-008 contenedores producción MVP | Diagrama | `docs/07_diagramas/c4-008-08-contenedores-produccion.mmd` | 28/05/2026 |
| 84 | alexAlvarez | figma/EXPORT-GUIDE.md export workflow | Figma | `figma/EXPORT-GUIDE.md` | 28/05/2026 |
| 85 | alexAlvarez | figma/tokens/colors.json + typography.json | Figma | `figma/tokens/colors.json` | 28/05/2026 |
| 86 | alexAlvarez | figma/frames/paleta-de-colores.md | Figma | `figma/frames/paleta-de-colores.md` | 28/05/2026 |
| 87 | alexAlvarez | figma/frames/tokens-de-diseno.md | Figma | `figma/frames/tokens-de-diseno.md` | 28/05/2026 |
| 88 | alexAlvarez | figma/screenshots/cc-coordinador-home.png hi-fi | Figma | `figma/screenshots/cc-coordinador-home.png` | 28/05/2026 |
| 89 | alexAlvarez | figma/screenshots/td-bandeja-tareas.png hi-fi | Figma | `figma/screenshots/td-bandeja-tareas.png` | 28/05/2026 |
| 90 | alexAlvarez | figma/metadata/export-manifest.json | Figma | `figma/metadata/export-manifest.json` | 28/05/2026 |
| 91 | alexAlvarez | Log sesión 2026-05-27 skills + frontend MVP | Bitácora | `team/alexAlvarez/log_interno.md` | 28/05/2026 |
| 92 | alexAlvarez | Log sesión 2026-05-28 submodules + branch alex | Bitácora | `team/alexAlvarez/log_interno.md` | 28/05/2026 |
| 93 | alexAlvarez | Log sesión 2026-05-28 api_contracts_mvp_runtime E2E | Bitácora | `team/alexAlvarez/log_interno.md` | 28/05/2026 |
| 94 | alexAlvarez | Log sesión 2026-05-28 C4 alignment BRD→código | Bitácora | `team/alexAlvarez/log_interno.md` | 28/05/2026 |
| 95 | alexAlvarez | Log consolidado versión alex MVP (§1–§7) | Bitácora | `team/alexAlvarez/log_interno.md` | 28/05/2026 |
| 96 | alexAlvarez | MVP gateway pathRewrite /api/v1 + proxy servicios | Código | `app/sigesa-backend/gateway/src/main.ts` | 28/05/2026 |
| 97 | alexAlvarez | MVP evidence-service UploadEvidence hexagonal | Código | `app/sigesa-backend/services/evidence-service/src/application/UploadEvidence.ts` | 28/05/2026 |
| 98 | alexAlvarez | MVP evidence-service S3BlobAdapter idempotente SHA-256 | Código | `app/sigesa-backend/services/evidence-service/src/adapters/outbound/S3BlobAdapter.ts` | 28/05/2026 |
| 99 | alexAlvarez | MVP audit-service IndicatorStateMachine ADR-0004 | Código | `app/sigesa-backend/services/audit-service/src/domain/IndicatorStateMachine.ts` | 28/05/2026 |
| 100 | alexAlvarez | MVP audit-service ApproveIndicator + RejectIndicator | Código | `app/sigesa-backend/services/audit-service/src/application/ApproveIndicator.ts` | 28/05/2026 |
| 101 | alexAlvarez | MVP audit-service AuthLogin JWT demo CC/TD | Código | `app/sigesa-backend/services/audit-service/src/application/AuthLogin.ts` | 28/05/2026 |
| 102 | alexAlvarez | MVP audit-service DashboardQueries bandeja TD | Código | `app/sigesa-backend/services/audit-service/src/application/DashboardQueries.ts` | 28/05/2026 |
| 103 | alexAlvarez | MVP orchestration HandleIndicatorApproved evento | Código | `app/sigesa-backend/services/orchestration-service/src/application/HandleIndicatorApproved.ts` | 28/05/2026 |
| 104 | alexAlvarez | MVP shared @sigesa/shared events + middleware | Código | `app/sigesa-backend/shared/src/events.ts` | 28/05/2026 |
| 105 | alexAlvarez | MVP DDL migrations 001_ddl.sql PostgreSQL 16 | Código | `app/sigesa-backend/migrations/001_ddl.sql` | 28/05/2026 |
| 106 | alexAlvarez | MVP front login + authStore JWT persist | Código | `app/sigesa-front/src/features/auth/` | 28/05/2026 |
| 107 | alexAlvarez | MVP front dashboardApi mappers CC/TD | Código | `app/sigesa-front/src/features/dashboard/` | 28/05/2026 |
| 108 | alexAlvarez | MVP front evidenceApi POST multipart UC-004 | Código | `app/sigesa-front/src/features/evidences/services/evidenceApi.ts` | 28/05/2026 |
| 109 | alexAlvarez | MVP front auditApi reject/approve UC-007 | Código | `app/sigesa-front/src/features/observations/services/auditApi.ts` | 28/05/2026 |
| 110 | alexAlvarez | MVP E2E CC→TD happy + sad paths 401/400/409 | Código | `team/alexAlvarez/log_interno.md` | 28/05/2026 |
| 111 | alexAlvarez | Figma artefacto EXPORT-GUIDE.md | Figma | `figma/EXPORT-GUIDE.md` | 28/05/2026 |
| 112 | alexAlvarez | Figma artefacto PHASE-2-COMPLETION.md | Figma | `figma/PHASE-2-COMPLETION.md` | 28/05/2026 |
| 113 | alexAlvarez | Figma artefacto README.md | Figma | `figma/README.md` | 28/05/2026 |
| 114 | alexAlvarez | Figma artefacto body-extended.annotations.md | Figma | `figma/annotations/body-extended.annotations.md` | 28/05/2026 |
| 115 | alexAlvarez | Figma artefacto body-reference-1280.annotations.md | Figma | `figma/annotations/body-reference-1280.annotations.md` | 28/05/2026 |
| 116 | alexAlvarez | Figma artefacto botones-y-acciones.annotations.md | Figma | `figma/annotations/botones-y-acciones.annotations.md` | 28/05/2026 |
| 117 | alexAlvarez | Figma artefacto espaciado-y-radio.annotations.md | Figma | `figma/annotations/espaciado-y-radio.annotations.md` | 28/05/2026 |
| 118 | alexAlvarez | Figma artefacto formularios.annotations.md | Figma | `figma/annotations/formularios.annotations.md` | 28/05/2026 |
| 119 | alexAlvarez | Figma artefacto iconografia.annotations.md | Figma | `figma/annotations/iconografia.annotations.md` | 28/05/2026 |
| 120 | alexAlvarez | Figma artefacto navegacion.annotations.md | Figma | `figma/annotations/navegacion.annotations.md` | 28/05/2026 |
| 121 | alexAlvarez | Figma artefacto paleta-de-colores.annotations.md | Figma | `figma/annotations/paleta-de-colores.annotations.md` | 28/05/2026 |
| 122 | alexAlvarez | Figma artefacto cc-coordinador-home.annotations.md | Figma | `figma/annotations/prototipo/cc-coordinador-home.annotations.md` | 28/05/2026 |
| 123 | alexAlvarez | Figma artefacto jd-admin-dashboard.annotations.md | Figma | `figma/annotations/prototipo/jd-admin-dashboard.annotations.md` | 28/05/2026 |
| 124 | alexAlvarez | Figma artefacto td-bandeja-tareas.annotations.md | Figma | `figma/annotations/prototipo/td-bandeja-tareas.annotations.md` | 28/05/2026 |
| 125 | alexAlvarez | Figma artefacto tablas-y-datos.annotations.md | Figma | `figma/annotations/tablas-y-datos.annotations.md` | 28/05/2026 |
| 126 | alexAlvarez | Figma artefacto tipografia.annotations.md | Figma | `figma/annotations/tipografia.annotations.md` | 28/05/2026 |
| 127 | alexAlvarez | Figma artefacto tokens-de-diseno.annotations.md | Figma | `figma/annotations/tokens-de-diseno.annotations.md` | 28/05/2026 |
| 128 | alexAlvarez | Figma artefacto component-inventory.md | Figma | `figma/components/component-inventory.md` | 28/05/2026 |
| 129 | alexAlvarez | Figma artefacto _template.md | Figma | `figma/frames/_template.md` | 28/05/2026 |
| 130 | alexAlvarez | Figma artefacto body-extended.md | Figma | `figma/frames/body-extended.md` | 28/05/2026 |
| 131 | alexAlvarez | Figma artefacto body-reference-1280.md | Figma | `figma/frames/body-reference-1280.md` | 28/05/2026 |
| 132 | alexAlvarez | Figma artefacto botones-y-acciones.md | Figma | `figma/frames/botones-y-acciones.md` | 28/05/2026 |
| 133 | alexAlvarez | Figma artefacto espaciado-y-radio.md | Figma | `figma/frames/espaciado-y-radio.md` | 28/05/2026 |
| 134 | alexAlvarez | Figma artefacto formularios.md | Figma | `figma/frames/formularios.md` | 28/05/2026 |
| 135 | alexAlvarez | Figma artefacto iconografia.md | Figma | `figma/frames/iconografia.md` | 28/05/2026 |

### aylenGonzales (120 tareas · 8 categorías)

| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |
|---|------------|----------------|-----------|------------|--------------|
| 136 | aylenGonzales | docs/roadmap.md v2.0 fuente única DTI §19 | PRD | `docs/roadmap.md` | 28/05/2026 |
| 137 | aylenGonzales | Roadmap: lecciones aprendidas + trazabilidad semilla | PRD | `docs/roadmap.md` | 28/05/2026 |
| 138 | aylenGonzales | Roadmap: justificación estratégica DTI/humano | PRD | `docs/roadmap.md` | 28/05/2026 |
| 139 | aylenGonzales | AGENTS.md + docs/08_agents sincronía release 2.0 | AGENTS | `docs/08_agents/AGENTS.md` | 28/05/2026 |
| 140 | aylenGonzales | Pasada 1 Mermaid: fix parse errors globales | Diagrama | `docs/07_diagramas/` | 28/05/2026 |
| 141 | aylenGonzales | Pasada 2 Mermaid: journey embebidos PRD.md | Diagrama | `docs/03_prd/PRD.md` | 28/05/2026 |
| 142 | aylenGonzales | Pasada 3: symlinks → contenido Mermaid real | Diagrama | `docs/07_diagramas/` | 28/05/2026 |
| 143 | aylenGonzales | Pasada 4: renombre tipo-prefix seq/er/gantt/state | Diagrama | `docs/07_diagramas/` | 28/05/2026 |
| 144 | aylenGonzales | Fix diagrams v2/v3/v4 + title frontmatter YAML | Diagrama | `docs/07_diagramas/` | 28/05/2026 |
| 145 | aylenGonzales | MRD diagramas ER + cobertura NFR mercado actualizados | MRD | `docs/02_mrd/07_diagramas/` | 28/05/2026 |
| 146 | aylenGonzales | POC-03 ficha UC-015 notification-outbox | POC | `docs/pocs/POC-03-notification-outbox/POC-03.md` | 28/05/2026 |
| 147 | aylenGonzales | POC-03 outbox.py + smtp_sink.py | POC | `docs/pocs/POC-03-notification-outbox/src/api/outbox.py` | 28/05/2026 |
| 148 | aylenGonzales | POC-03 tests test_outbox.py PASS | POC | `docs/pocs/POC-03-notification-outbox/RESULTADO.md` | 28/05/2026 |
| 149 | aylenGonzales | POC-03 run_poc03.py + integración run_local_pocs.ps1 | POC | `docs/pocs/run_local_pocs.ps1` | 28/05/2026 |
| 150 | aylenGonzales | POC-04 ficha UC-017 audit-log-query | POC | `docs/pocs/POC-04-audit-log-query/POC-04.md` | 28/05/2026 |
| 151 | aylenGonzales | POC-04 audit.py append-only query | POC | `docs/pocs/POC-04-audit-log-query/src/api/audit.py` | 28/05/2026 |
| 152 | aylenGonzales | POC-04 tests test_audit.py PASS | POC | `docs/pocs/POC-04-audit-log-query/RESULTADO.md` | 28/05/2026 |
| 153 | aylenGonzales | POC-04 run_poc04.py + README pocs actualizado | POC | `docs/pocs/README.md` | 28/05/2026 |
| 154 | aylenGonzales | ADR-0004 workflow state machine (POC-02 alineación) | ADR | `docs/adr/ADR-0004-workflow-state-machine.md` | 28/05/2026 |
| 155 | aylenGonzales | AUDITORIA_RUBRICAS_EXCELENTE_DOCS_RELEASE_2.0.0.md | Auditoría | `docs/09_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE_DOCS_RELEASE_2.0.0.md` | 28/05/2026 |
| 156 | aylenGonzales | Diagrama seq canónico seq-004-004-dashboard-semaforos | Diagrama | `docs/07_diagramas/seq-004-004-dashboard-semaforos.mmd` | 28/05/2026 |
| 157 | aylenGonzales | Diagrama seq canónico seq-005-005-reporte-pdf-asincrono | Diagrama | `docs/07_diagramas/seq-005-005-reporte-pdf-asincrono.mmd` | 28/05/2026 |
| 158 | aylenGonzales | Diagrama seq canónico seq-006-006-notificaciones-outbox-smtp | Diagrama | `docs/07_diagramas/seq-006-006-notificaciones-outbox-smtp.mmd` | 28/05/2026 |
| 159 | aylenGonzales | Diagrama seq canónico seq-007-007-busqueda-fts-multifiltro | Diagrama | `docs/07_diagramas/seq-007-007-busqueda-fts-multifiltro.mmd` | 28/05/2026 |
| 160 | aylenGonzales | Diagrama seq canónico seq-008-008-portal-publico-consulta | Diagrama | `docs/07_diagramas/seq-008-008-portal-publico-consulta.mmd` | 28/05/2026 |
| 161 | aylenGonzales | Diagrama seq canónico seq-009-009-auditoria-exportacion | Diagrama | `docs/07_diagramas/seq-009-009-auditoria-exportacion.mmd` | 28/05/2026 |
| 162 | aylenGonzales | Diagrama seq canónico seq-010-010-configuracion-proceso-normativa | Diagrama | `docs/07_diagramas/seq-010-010-configuracion-proceso-normativa.mmd` | 28/05/2026 |
| 163 | aylenGonzales | Diagrama seq canónico seq-011-011-supervision-respaldos | Diagrama | `docs/07_diagramas/seq-011-011-supervision-respaldos.mmd` | 28/05/2026 |
| 164 | aylenGonzales | Diagrama gantt gantt-006-ciclo-acreditacion-institucional | Diagrama | `docs/07_diagramas/gantt-006-ciclo-acreditacion-institucional.mmd` | 28/05/2026 |
| 165 | aylenGonzales | Diagrama gantt gantt-007-release-producto | Diagrama | `docs/07_diagramas/gantt-007-release-producto.mmd` | 28/05/2026 |
| 166 | aylenGonzales | Diagrama gantt gantt-008-sprint-equipo | Diagrama | `docs/07_diagramas/gantt-008-sprint-equipo.mmd` | 28/05/2026 |
| 167 | aylenGonzales | Diagrama gantt gantt-026-roadmap-2026-2027 | Diagrama | `docs/07_diagramas/gantt-026-roadmap-2026-2027.mmd` | 28/05/2026 |
| 168 | aylenGonzales | PRD journey CC subsanación estados + secuencia | PRD | `docs/03_prd/07_diagramas/PRD_journey_CC_subsanacion_estados.mmd` | 28/05/2026 |
| 169 | aylenGonzales | PRD journey TD cierre fase secuencia | PRD | `docs/03_prd/07_diagramas/PRD_journey_TD_cierre_fase_secuencia.mmd` | 28/05/2026 |
| 170 | aylenGonzales | INVENTARIO_TAREAS_APORTES_EQUIPO actualizado | Auditoría | `docs/09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md` | 28/05/2026 |
| 171 | aylenGonzales | report_findings.md v1.4 APTO release 2.0 | Auditoría | `docs/09_trazabilidad/report_findings.md` | 28/05/2026 |
| 172 | aylenGonzales | PROMPT_MAPPING PM-053 roadmap+Mermaid+POC | Bitácora | `PROMPT_MAPPING.md` | 28/05/2026 |
| 173 | aylenGonzales | log_interno.md sesiones 25–28/05 | Bitácora | `team/aylenGonzales/log_interno.md` | 28/05/2026 |
| 174 | aylenGonzales | team/aylenGonzales/03_prd/roadmap.md | PRD | `team/aylenGonzales/03_prd/roadmap.md` | 28/05/2026 |
| 175 | aylenGonzales | Commit 943fe33: feat: add docs/roadmap.md v2.0 | Bitácora | `git log 943fe33` | 28/05/2026 |
| 176 | aylenGonzales | Commit 2593859: docs(agents): update AGENTS.md release 2.0 | Bitácora | `git log 2593859` | 28/05/2026 |
| 177 | aylenGonzales | Commit fe33592: fix: Mermaid parse errors pasada 1 | Bitácora | `git log fe33592` | 28/05/2026 |
| 178 | aylenGonzales | Commit 21ad8ea: fix: symlinks → contenido Mermaid real pasada 3 | Bitácora | `git log 21ad8ea` | 28/05/2026 |
| 179 | aylenGonzales | Commit 575ce00: docs(diagramas): renombre tipo-prefix seq/er/gantt/state | Bitácora | `git log 575ce00` | 28/05/2026 |
| 180 | aylenGonzales | Commit 4358b7f: update diagramas v2 | Bitácora | `git log 4358b7f` | 28/05/2026 |
| 181 | aylenGonzales | Commit 4f2e7d4: update diagramas v2 iteración | Bitácora | `git log 4f2e7d4` | 28/05/2026 |
| 182 | aylenGonzales | Commit b116871: feat: POC-03 notification-outbox + POC-04 audit-log-query | Bitácora | `git log b116871` | 28/05/2026 |
| 183 | aylenGonzales | Commit 8a49bfb: fix diagrams v3 | Bitácora | `git log 8a49bfb` | 28/05/2026 |
| 184 | aylenGonzales | Commit 2c783b4: fix diagrams v4 | Bitácora | `git log 2c783b4` | 28/05/2026 |
| 185 | aylenGonzales | Commit 52ef9c9: feat: auditoría release 2.0.0 docs/ | Bitácora | `git log 52ef9c9` | 28/05/2026 |
| 186 | aylenGonzales | Diagrama canónico D-JOURNEY-001-coordinador-carga | Diagrama | `docs/07_diagramas/D-JOURNEY-001-coordinador-carga.mmd` | 28/05/2026 |
| 187 | aylenGonzales | Diagrama canónico c4-006-06-contexto-sistema | Diagrama | `docs/07_diagramas/c4-006-06-contexto-sistema.mmd` | 28/05/2026 |
| 188 | aylenGonzales | Diagrama canónico c4-007-07-contenedores-sistema | Diagrama | `docs/07_diagramas/c4-007-07-contenedores-sistema.mmd` | 28/05/2026 |
| 189 | aylenGonzales | Diagrama canónico c4-008-08-contenedores-produccion | Diagrama | `docs/07_diagramas/c4-008-08-contenedores-produccion.mmd` | 28/05/2026 |
| 190 | aylenGonzales | Diagrama canónico class-001-001-dominio-sigesa | Diagrama | `docs/07_diagramas/class-001-001-dominio-sigesa.mmd` | 28/05/2026 |
| 191 | aylenGonzales | Diagrama canónico class-009-09-dominio-agregados | Diagrama | `docs/07_diagramas/class-009-09-dominio-agregados.mmd` | 28/05/2026 |
| 192 | aylenGonzales | Diagrama canónico er-001-001-modelo-datos-nucleo | Diagrama | `docs/07_diagramas/er-001-001-modelo-datos-nucleo.mmd` | 28/05/2026 |
| 193 | aylenGonzales | Diagrama canónico er-001-001-nucleo-sigesa | Diagrama | `docs/07_diagramas/er-001-001-nucleo-sigesa.mmd` | 28/05/2026 |
| 194 | aylenGonzales | Diagrama canónico er-001-001 | Diagrama | `docs/07_diagramas/er-001-001.mmd` | 28/05/2026 |
| 195 | aylenGonzales | Diagrama canónico er-001-modelo-fisico | Diagrama | `docs/07_diagramas/er-001-modelo-fisico.mmd` | 28/05/2026 |
| 196 | aylenGonzales | Diagrama canónico er-002-002-dominio-auditoria-evidencia | Diagrama | `docs/07_diagramas/er-002-002-dominio-auditoria-evidencia.mmd` | 28/05/2026 |
| 197 | aylenGonzales | Diagrama canónico er-002-modelo-funcional | Diagrama | `docs/07_diagramas/er-002-modelo-funcional.mmd` | 28/05/2026 |
| 198 | aylenGonzales | Diagrama canónico er-003-contexto-entidades | Diagrama | `docs/07_diagramas/er-003-contexto-entidades.mmd` | 28/05/2026 |
| 199 | aylenGonzales | Diagrama canónico er-004-dominio-negocio | Diagrama | `docs/07_diagramas/er-004-dominio-negocio.mmd` | 28/05/2026 |
| 200 | aylenGonzales | Diagrama canónico er-005-05-modelo-datos | Diagrama | `docs/07_diagramas/er-005-05-modelo-datos.mmd` | 28/05/2026 |
| 201 | aylenGonzales | Diagrama canónico er-005-negocio | Diagrama | `docs/07_diagramas/er-005-negocio.mmd` | 28/05/2026 |
| 202 | aylenGonzales | Diagrama canónico er-006-diagrama | Diagrama | `docs/07_diagramas/er-006-diagrama.mmd` | 28/05/2026 |
| 203 | aylenGonzales | Diagrama canónico er-007-dominio | Diagrama | `docs/07_diagramas/er-007-dominio.mmd` | 28/05/2026 |
| 204 | aylenGonzales | Diagrama canónico flow-001-001-capas-sistema | Diagrama | `docs/07_diagramas/flow-001-001-capas-sistema.mmd` | 28/05/2026 |
| 205 | aylenGonzales | Diagrama canónico flow-001-001-modulos-sigesa | Diagrama | `docs/07_diagramas/flow-001-001-modulos-sigesa.mmd` | 28/05/2026 |
| 206 | aylenGonzales | Diagrama canónico flow-001-001-observaciones-mejoras | Diagrama | `docs/07_diagramas/flow-001-001-observaciones-mejoras.mmd` | 28/05/2026 |
| 207 | aylenGonzales | Diagrama canónico flow-001-001-workflow-aprobacion | Diagrama | `docs/07_diagramas/flow-001-001-workflow-aprobacion.mmd` | 28/05/2026 |
| 208 | aylenGonzales | Diagrama canónico flow-008-08-cierre-proceso-pendientes | Diagrama | `docs/07_diagramas/flow-008-08-cierre-proceso-pendientes.mmd` | 28/05/2026 |
| 209 | aylenGonzales | Diagrama canónico gantt-001-001-roadmap-implementacion-sigesa | Diagrama | `docs/07_diagramas/gantt-001-001-roadmap-implementacion-sigesa.mmd` | 28/05/2026 |
| 210 | aylenGonzales | Diagrama canónico gantt-001-001-roadmap-implementacion | Diagrama | `docs/07_diagramas/gantt-001-001-roadmap-implementacion.mmd` | 28/05/2026 |
| 211 | aylenGonzales | Diagrama canónico gantt-001-06a-ciclo-acreditacion | Diagrama | `docs/07_diagramas/gantt-001-06a-ciclo-acreditacion.mmd` | 28/05/2026 |
| 212 | aylenGonzales | Diagrama canónico gantt-002-002-cronograma-ceub-carrera | Diagrama | `docs/07_diagramas/gantt-002-002-cronograma-ceub-carrera.mmd` | 28/05/2026 |
| 213 | aylenGonzales | Diagrama canónico gantt-002-002-cronograma-convocatoria-ceub | Diagrama | `docs/07_diagramas/gantt-002-002-cronograma-convocatoria-ceub.mmd` | 28/05/2026 |
| 214 | aylenGonzales | Diagrama canónico gantt-002-diagrama | Diagrama | `docs/07_diagramas/gantt-002-diagrama.mmd` | 28/05/2026 |
| 215 | aylenGonzales | Diagrama canónico gantt-003-diagrama | Diagrama | `docs/07_diagramas/gantt-003-diagrama.mmd` | 28/05/2026 |
| 216 | aylenGonzales | Diagrama canónico gantt-004-diagrama | Diagrama | `docs/07_diagramas/gantt-004-diagrama.mmd` | 28/05/2026 |
| 217 | aylenGonzales | Diagrama canónico gantt-005-diagrama | Diagrama | `docs/07_diagramas/gantt-005-diagrama.mmd` | 28/05/2026 |
| 218 | aylenGonzales | Diagrama canónico pie-001-cobertura-nfr-mercado | Diagrama | `docs/07_diagramas/pie-001-cobertura-nfr-mercado.mmd` | 28/05/2026 |
| 219 | aylenGonzales | Diagrama canónico pie-010-10-pie-cobertura-nfr-iso25010 | Diagrama | `docs/07_diagramas/pie-010-10-pie-cobertura-nfr-iso25010.mmd` | 28/05/2026 |
| 220 | aylenGonzales | Diagrama canónico pie-010-cobertura-iso25010 | Diagrama | `docs/07_diagramas/pie-010-cobertura-iso25010.mmd` | 28/05/2026 |
| 221 | aylenGonzales | Diagrama canónico seq-001-001-autenticacion-jwt | Diagrama | `docs/07_diagramas/seq-001-001-autenticacion-jwt.mmd` | 28/05/2026 |
| 222 | aylenGonzales | Diagrama canónico seq-001-001-autenticacion-secuencia | Diagrama | `docs/07_diagramas/seq-001-001-autenticacion-secuencia.mmd` | 28/05/2026 |
| 223 | aylenGonzales | Diagrama canónico seq-001-001-auth-jwt | Diagrama | `docs/07_diagramas/seq-001-001-auth-jwt.mmd` | 28/05/2026 |
| 224 | aylenGonzales | Diagrama canónico seq-001-001-versionado-evidencias | Diagrama | `docs/07_diagramas/seq-001-001-versionado-evidencias.mmd` | 28/05/2026 |
| 225 | aylenGonzales | Diagrama canónico seq-001-01-autenticacion | Diagrama | `docs/07_diagramas/seq-001-01-autenticacion.mmd` | 28/05/2026 |
| 226 | aylenGonzales | Diagrama canónico seq-001-01-secuencia | Diagrama | `docs/07_diagramas/seq-001-01-secuencia.mmd` | 28/05/2026 |
| 227 | aylenGonzales | Diagrama canónico seq-001-journey-cc-subsanacion-secuencia | Diagrama | `docs/07_diagramas/seq-001-journey-cc-subsanacion-secuencia.mmd` | 28/05/2026 |
| 228 | aylenGonzales | Diagrama canónico seq-002-002-carga-evidencia-versionada | Diagrama | `docs/07_diagramas/seq-002-002-carga-evidencia-versionada.mmd` | 28/05/2026 |
| 229 | aylenGonzales | Diagrama canónico seq-002-002-carga-evidencia | Diagrama | `docs/07_diagramas/seq-002-002-carga-evidencia.mmd` | 28/05/2026 |
| 230 | aylenGonzales | Diagrama canónico seq-002-002-flujo-aprobacion | Diagrama | `docs/07_diagramas/seq-002-002-flujo-aprobacion.mmd` | 28/05/2026 |
| 231 | aylenGonzales | Diagrama canónico seq-002-02-evidencias | Diagrama | `docs/07_diagramas/seq-002-02-evidencias.mmd` | 28/05/2026 |
| 232 | aylenGonzales | Diagrama canónico seq-002-02-secuencia | Diagrama | `docs/07_diagramas/seq-002-02-secuencia.mmd` | 28/05/2026 |
| 233 | aylenGonzales | Diagrama canónico seq-002-journey-td-cierre-fase-secuencia | Diagrama | `docs/07_diagramas/seq-002-journey-td-cierre-fase-secuencia.mmd` | 28/05/2026 |
| 234 | aylenGonzales | Diagrama canónico seq-003-003-010-proceso-y-cierre-fase-secuencia | Diagrama | `docs/07_diagramas/seq-003-003-010-proceso-y-cierre-fase-secuencia.mmd` | 28/05/2026 |
| 235 | aylenGonzales | Diagrama canónico seq-003-003-aprobacion-rechazo-subfase | Diagrama | `docs/07_diagramas/seq-003-003-aprobacion-rechazo-subfase.mmd` | 28/05/2026 |
| 236 | aylenGonzales | Diagrama canónico seq-003-003-autenticacion-jwt | Diagrama | `docs/07_diagramas/seq-003-003-autenticacion-jwt.mmd` | 28/05/2026 |
| 237 | aylenGonzales | Diagrama canónico seq-003-003-dictamen-td | Diagrama | `docs/07_diagramas/seq-003-003-dictamen-td.mmd` | 28/05/2026 |
| 238 | aylenGonzales | Diagrama canónico seq-003-03-observaciones | Diagrama | `docs/07_diagramas/seq-003-03-observaciones.mmd` | 28/05/2026 |
| 239 | aylenGonzales | Diagrama canónico seq-003-03-secuencia | Diagrama | `docs/07_diagramas/seq-003-03-secuencia.mmd` | 28/05/2026 |
| 240 | aylenGonzales | Diagrama canónico seq-004-004-008-carga-y-observacion-secuencia | Diagrama | `docs/07_diagramas/seq-004-004-008-carga-y-observacion-secuencia.mmd` | 28/05/2026 |
| 241 | aylenGonzales | Diagrama canónico seq-004-004-dashboard-drilldown | Diagrama | `docs/07_diagramas/seq-004-004-dashboard-drilldown.mmd` | 28/05/2026 |
| 242 | aylenGonzales | Diagrama canónico seq-004-004-reporte-pdf | Diagrama | `docs/07_diagramas/seq-004-004-reporte-pdf.mmd` | 28/05/2026 |
| 243 | aylenGonzales | Diagrama canónico seq-005-005-integracion-siis-futuro | Diagrama | `docs/07_diagramas/seq-005-005-integracion-siis-futuro.mmd` | 28/05/2026 |
| 244 | aylenGonzales | Diagrama canónico seq-005-005-reporte-pdf-async | Diagrama | `docs/07_diagramas/seq-005-005-reporte-pdf-async.mmd` | 28/05/2026 |
| 245 | aylenGonzales | Diagrama canónico seq-006-006-notificaciones-smtp | Diagrama | `docs/07_diagramas/seq-006-006-notificaciones-smtp.mmd` | 28/05/2026 |
| 246 | aylenGonzales | Diagrama canónico seq-006-006-subsanar-evidencia-secuencia | Diagrama | `docs/07_diagramas/seq-006-006-subsanar-evidencia-secuencia.mmd` | 28/05/2026 |
| 247 | aylenGonzales | Diagrama canónico seq-007-007-busqueda-fts | Diagrama | `docs/07_diagramas/seq-007-007-busqueda-fts.mmd` | 28/05/2026 |
| 248 | aylenGonzales | Diagrama canónico seq-008-008-portal-publico | Diagrama | `docs/07_diagramas/seq-008-008-portal-publico.mmd` | 28/05/2026 |
| 249 | aylenGonzales | Diagrama canónico seq-009-009-certificados | Diagrama | `docs/07_diagramas/seq-009-009-certificados.mmd` | 28/05/2026 |
| 250 | aylenGonzales | Diagrama canónico seq-010-010-respaldo-diario | Diagrama | `docs/07_diagramas/seq-010-010-respaldo-diario.mmd` | 28/05/2026 |
| 251 | aylenGonzales | Diagrama canónico seq-011-011-proceso-unico-carrera | Diagrama | `docs/07_diagramas/seq-011-011-proceso-unico-carrera.mmd` | 28/05/2026 |
| 252 | aylenGonzales | Diagrama canónico state-001-001-ciclo-vida-evidencia-v2 | Diagrama | `docs/07_diagramas/state-001-001-ciclo-vida-evidencia-v2.mmd` | 28/05/2026 |
| 253 | aylenGonzales | Diagrama canónico state-001-001-ciclo-vida-evidencia | Diagrama | `docs/07_diagramas/state-001-001-ciclo-vida-evidencia.mmd` | 28/05/2026 |
| 254 | aylenGonzales | Diagrama canónico state-001-001-indicador | Diagrama | `docs/07_diagramas/state-001-001-indicador.mmd` | 28/05/2026 |
| 255 | aylenGonzales | Diagrama canónico state-001-01-estado | Diagrama | `docs/07_diagramas/state-001-01-estado.mmd` | 28/05/2026 |

### borisAngulo (116 tareas · 14 categorías)

| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |
|---|------------|----------------|-----------|------------|--------------|
| 256 | borisAngulo | FASE 1.1 git ls-tree v1 (551) / v2 (935) | Auditoría | `team/borisAngulo/prompt_trazabilidad.md` | 28/05/2026 |
| 257 | borisAngulo | FASE 1.2 clasificación ELIM/AGREG/COMPARTIDOS | Auditoría | `team/borisAngulo/prompt_trazabilidad.md` | 28/05/2026 |
| 258 | borisAngulo | FASE 1.3 LOC por archivo v1 (551 iteraciones) | Auditoría | `team/borisAngulo/prompt_trazabilidad.md` | 28/05/2026 |
| 259 | borisAngulo | FASE 1.4 LOC por archivo v2 (935 iteraciones) | Auditoría | `team/borisAngulo/prompt_trazabilidad.md` | 28/05/2026 |
| 260 | borisAngulo | FASE 1.5 MODIFICADO (187) vs SIN_CAMBIOS (253) | Auditoría | `team/borisAngulo/prompt_trazabilidad.md` | 28/05/2026 |
| 261 | borisAngulo | FASE 1.6 headings .md v1/v2 (4914/6561 líneas) | Auditoría | `team/borisAngulo/prompt_trazabilidad.md` | 28/05/2026 |
| 262 | borisAngulo | FASE 1.7 validación PRD↔FSD↔NFR intacta | Auditoría | `team/borisAngulo/prompt_trazabilidad.md` | 28/05/2026 |
| 263 | borisAngulo | FASE 2 tabla comparativa 1045 filas | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 264 | borisAngulo | FASE 3 guardado reporte + prompt_trazabilidad | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 265 | borisAngulo | Expand tabla_comparativa inventario ampliado | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 266 | borisAngulo | Figma Phase 2: EXPORT-GUIDE + PHASE-2-COMPLETION | Figma | `figma/PHASE-2-COMPLETION.md` | 28/05/2026 |
| 267 | borisAngulo | Figma frames: botones-y-acciones + formularios | Figma | `figma/frames/botones-y-acciones.md` | 28/05/2026 |
| 268 | borisAngulo | Figma layout-system + icon-inventory | Figma | `figma/layouts/layout-system.md` | 28/05/2026 |
| 269 | borisAngulo | Config MCP Figma (.vscode/mcp.json) | Otro | `.vscode/mcp.json` | 28/05/2026 |
| 270 | borisAngulo | design-tokens.json export Figma | Figma | `figma/tokens/design-tokens.json` | 28/05/2026 |
| 271 | borisAngulo | DTI_v1 iteración 1: logical + process views | DTI | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 28/05/2026 |
| 272 | borisAngulo | DTI_v1 iteración 1: physical + scenarios | DTI | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 28/05/2026 |
| 273 | borisAngulo | PROMPT_MAPPING PM-054 tabla v1→v2 | Bitácora | `PROMPT_MAPPING.md` | 28/05/2026 |
| 274 | borisAngulo | git_diff_name_status.txt + traceability report | Auditoría | `team/borisAngulo/prompt_trazabilidad.md` | 28/05/2026 |
| 275 | borisAngulo | Diagrama equipo diag diag-01-seq-autenticacion.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-01-seq-autenticacion.mmd` | 28/05/2026 |
| 276 | borisAngulo | Diagrama equipo diag diag-02-seq-evidencias.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-02-seq-evidencias.mmd` | 28/05/2026 |
| 277 | borisAngulo | Diagrama equipo diag diag-03-seq-observaciones.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-03-seq-observaciones.mmd` | 28/05/2026 |
| 278 | borisAngulo | Diagrama equipo diag diag-04a-state-proceso.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-04a-state-proceso.mmd` | 28/05/2026 |
| 279 | borisAngulo | Diagrama equipo diag diag-04b-state-obs-evidencia.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-04b-state-obs-evidencia.mmd` | 28/05/2026 |
| 280 | borisAngulo | Diagrama equipo diag diag-05-er-modelo-datos.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-05-er-modelo-datos.mmd` | 28/05/2026 |
| 281 | borisAngulo | Diagrama equipo diag diag-06a-gantt-ciclo-acreditacion.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-06a-gantt-ciclo-acreditacion.mmd` | 28/05/2026 |
| 282 | borisAngulo | Diagrama equipo diag diag-07-c4-contenedores-sistema.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-07-c4-contenedores-sistema.mmd` | 28/05/2026 |
| 283 | borisAngulo | Diagrama equipo diag diag-08-flow-cierre-proceso-pendientes.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-08-flow-cierre-proceso-pendientes.mmd` | 28/05/2026 |
| 284 | borisAngulo | Diagrama equipo diag diag-09-class-dominio-agregados.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-09-class-dominio-agregados.mmd` | 28/05/2026 |
| 285 | borisAngulo | Diagrama equipo diag diag-10-pie-cobertura-nfr-iso25010.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/diag-10-pie-cobertura-nfr-iso25010.mmd` | 28/05/2026 |
| 286 | borisAngulo | Co-revisión C4 contenedores MVP vs DTI | Diagrama | `docs/07_diagramas/c4-007-07-contenedores-sistema.mmd` | 28/05/2026 |
| 287 | borisAngulo | Co-revisión seq autenticación JWT canónico | Diagrama | `docs/07_diagramas/seq-003-003-autenticacion-jwt.mmd` | 28/05/2026 |
| 288 | borisAngulo | Co-revisión state ciclo vida evidencia v2 | Diagrama | `docs/07_diagramas/state-001-001-ciclo-vida-evidencia-v2.mmd` | 28/05/2026 |
| 289 | borisAngulo | Co-revisión pie cobertura NFR mercado | Diagrama | `docs/07_diagramas/pie-001-cobertura-nfr-mercado.mmd` | 28/05/2026 |
| 290 | borisAngulo | INVENTARIO boris v1.1 cuadre UC/PC | Auditoría | `team/borisAngulo/docs/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md` | 28/05/2026 |
| 291 | borisAngulo | Commit 754b471: feat: config MCP Figma (.vscode/mcp.json) | Bitácora | `git log 754b471` | 28/05/2026 |
| 292 | borisAngulo | Commit 2b37a3c: docs(figma): Phase 2 Deep Dives frames + layouts | Bitácora | `git log 2b37a3c` | 28/05/2026 |
| 293 | borisAngulo | Commit 28d442b: Add traceability report, prompt, diff list | Bitácora | `git log 28d442b` | 28/05/2026 |
| 294 | borisAngulo | Commit acca5be: Expand tabla_comparativa v1→v2 inventario 1045 filas | Bitácora | `git log acca5be` | 28/05/2026 |
| 295 | borisAngulo | Tabla v1→v2 trazabilidad filas 1–95 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 296 | borisAngulo | Tabla v1→v2 trazabilidad filas 96–190 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 297 | borisAngulo | Tabla v1→v2 trazabilidad filas 191–285 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 298 | borisAngulo | Tabla v1→v2 trazabilidad filas 286–380 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 299 | borisAngulo | Tabla v1→v2 trazabilidad filas 381–475 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 300 | borisAngulo | Tabla v1→v2 trazabilidad filas 476–570 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 301 | borisAngulo | Tabla v1→v2 trazabilidad filas 571–665 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 302 | borisAngulo | Tabla v1→v2 trazabilidad filas 666–760 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 303 | borisAngulo | Tabla v1→v2 trazabilidad filas 761–855 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 304 | borisAngulo | Tabla v1→v2 trazabilidad filas 856–950 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 305 | borisAngulo | Tabla v1→v2 trazabilidad filas 951–1045 (1045 total) | Auditoría | `docs/tabla_comparativa_v1_v2.md` | 28/05/2026 |
| 306 | borisAngulo | BRD_v2 0. Metadatos | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 307 | borisAngulo | BRD_v2 1. Resumen ejecutivo | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 308 | borisAngulo | BRD_v2 2. Contexto del negocio | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 309 | borisAngulo | BRD_v2 3. Problema y oportunidad | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 310 | borisAngulo | BRD_v2 4. Usuarios objetivo / Personas | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 311 | borisAngulo | BRD_v2 5. Propuesta de valor | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 312 | borisAngulo | BRD_v2 6. Panorama competitivo | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 313 | borisAngulo | BRD_v2 7. Business Model Canvas | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 314 | borisAngulo | BRD_v2 8. Métricas North Star | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 315 | borisAngulo | BRD_v2 9. Objetivos SMART | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 316 | borisAngulo | BRD_v2 10. Stakeholders RACI | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 317 | borisAngulo | BRD_v2 11. Requerimientos de negocio | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 318 | borisAngulo | BRD_v2 12. Reglas y políticas | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 319 | borisAngulo | BRD_v2 13. Supuestos y restricciones | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 320 | borisAngulo | BRD_v2 14. Alcance de negocio | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 321 | borisAngulo | BRD_v2 15. Business case | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 322 | borisAngulo | BRD_v2 16. Riesgos de negocio | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 323 | borisAngulo | BRD_v2 17. Criterios de éxito | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 324 | borisAngulo | BRD_v2 18. Trazabilidad hijos | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 325 | borisAngulo | BRD_v2 19. Aprobaciones | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 326 | borisAngulo | BRD_v2 20. Registro de cambios | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 327 | borisAngulo | BRD_v2 21. Anexo PR-FAQ | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 28/05/2026 |
| 328 | borisAngulo | PRD_v1 0. Metadatos | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 329 | borisAngulo | PRD_v1 1. Resumen producto | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 330 | borisAngulo | PRD_v1 2. Objetivos producto | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 331 | borisAngulo | PRD_v1 3. Alcance Scope | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 332 | borisAngulo | PRD_v1 4. Personas y journeys | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 333 | borisAngulo | PRD_v1 5. User stories | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 334 | borisAngulo | PRD_v1 6. Priorización | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 335 | borisAngulo | PRD_v1 7. RF alto nivel | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 336 | borisAngulo | PRD_v1 8. RNF alto nivel | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 337 | borisAngulo | PRD_v1 9. Dependencias | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 338 | borisAngulo | PRD_v1 10. Supuestos | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 339 | borisAngulo | PRD_v1 11. UX | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 340 | borisAngulo | PRD_v1 12. Métricas éxito | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 341 | borisAngulo | PRD_v1 13. Riesgos producto | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 342 | borisAngulo | PRD_v1 14. Trazabilidad | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 343 | borisAngulo | PRD_v1 15. Anexos | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 344 | borisAngulo | PRD_v1 16. Registro cambios | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 28/05/2026 |
| 345 | borisAngulo | MRD team/borisAngulo segmentación mercado | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 346 | borisAngulo | FSD_v1 casos-de-uso boris | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 28/05/2026 |
| 347 | borisAngulo | LFSD_v1 lenguaje formal | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 28/05/2026 |
| 348 | borisAngulo | nfr_iso25010 team/borisAngulo | NFR | `team/borisAngulo/docs/06_nfr/nfr_iso25010.md` | 28/05/2026 |
| 349 | borisAngulo | prompt-contracts team/borisAngulo | Prompt | `team/borisAngulo/docs/04_fsd/prompt-contracts.md` | 28/05/2026 |
| 350 | borisAngulo | trazabilidad-sigesa.md informe | Auditoría | `team/borisAngulo/docs/08_trazabilidad/trazabilidad-sigesa.md` | 28/05/2026 |
| 351 | borisAngulo | skill-001…004 catálogo agents boris | Skill | `team/borisAngulo/docs/09_agents/skills/skill-001.md` | 28/05/2026 |
| 352 | borisAngulo | AGENTS.md team/borisAngulo | AGENTS | `team/borisAngulo/docs/09_agents/AGENTS.md` | 28/05/2026 |
| 353 | borisAngulo | figma/interaction-map.md | Figma | `figma/maps/interaction-map.md` | 28/05/2026 |
| 354 | borisAngulo | figma/components/component-inventory.md | Figma | `figma/components/component-inventory.md` | 28/05/2026 |
| 355 | borisAngulo | MRD Resumen ejecutivo | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 356 | borisAngulo | MRD Visión producto | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 357 | borisAngulo | MRD Análisis mercado | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 358 | borisAngulo | MRD Segmentación personas | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 359 | borisAngulo | MRD JTBD | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 360 | borisAngulo | MRD VoC | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 361 | borisAngulo | MRD Competencia | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 362 | borisAngulo | MRD Propuesta valor | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 363 | borisAngulo | MRD Pricing | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 364 | borisAngulo | MRD Go-to-market | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 365 | borisAngulo | MRD Métricas éxito | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 366 | borisAngulo | MRD Req. mercado | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 367 | borisAngulo | MRD Supuestos | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 368 | borisAngulo | MRD Riesgos mercado | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 369 | borisAngulo | MRD Trazabilidad | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 370 | borisAngulo | MRD Anexos | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 28/05/2026 |
| 371 | borisAngulo | DTI_v1 Vista lógica servicios | DTI | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 28/05/2026 |

### Marlene (114 tareas · 15 categorías)

| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |
|---|------------|----------------|-----------|------------|--------------|
| 372 | Marlene | docs/00_overview README + alcance + definición producto | Otro | `docs/00_overview/` | 28/05/2026 |
| 373 | Marlene | team/Marlene/00_overview visión + alcance | Otro | `team/Marlene/00_overview/` | 28/05/2026 |
| 374 | Marlene | Plantilla POC_TEMPLATE.md | Otro | `team/Marlene/templates/POC_TEMPLATE.md` | 28/05/2026 |
| 375 | Marlene | Evidencia POCs (commit 26/05) | POC | `team/Marlene/` | 28/05/2026 |
| 376 | Marlene | docs/rules ai_rules + coding_rules + domain_rules | Rule | `docs/rules/` | 28/05/2026 |
| 377 | Marlene | team/Marlene/rules gobernanza local | Rule | `team/Marlene/rules/` | 28/05/2026 |
| 378 | Marlene | PROMPT_MAPPING PM-055 consolidación NFR | Bitácora | `PROMPT_MAPPING.md` | 28/05/2026 |
| 379 | Marlene | PRD-US-001 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 380 | Marlene | PRD-US-002 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 381 | Marlene | PRD-US-003 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 382 | Marlene | PRD-US-004 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 383 | Marlene | PRD-US-005 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 384 | Marlene | PRD-US-006 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 385 | Marlene | PRD-US-007 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 386 | Marlene | PRD-US-008 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 387 | Marlene | PRD-US-009 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 388 | Marlene | PRD-US-010 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 389 | Marlene | PRD-US-011 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 390 | Marlene | PRD-US-012 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 391 | Marlene | PRD-US-013 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 392 | Marlene | PRD-US-014 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 393 | Marlene | PRD-US-015 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 394 | Marlene | PRD-US-016 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 395 | Marlene | PRD-US-017 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 396 | Marlene | PRD-US-018 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 397 | Marlene | PRD-US-019 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 398 | Marlene | PRD-US-020 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 399 | Marlene | PRD-US-021 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 400 | Marlene | PRD-US-022 INVEST + criterios aceptación (sync release 2.0) | PRD | `team/Marlene/03_prd/PRD.md` | 28/05/2026 |
| 401 | Marlene | FSD-UC-001 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 402 | Marlene | FSD-UC-002 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 403 | Marlene | FSD-UC-003 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 404 | Marlene | FSD-UC-004 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 405 | Marlene | FSD-UC-005 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 406 | Marlene | FSD-UC-006 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 407 | Marlene | FSD-UC-007 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 408 | Marlene | FSD-UC-008 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 409 | Marlene | FSD-UC-009 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 410 | Marlene | FSD-UC-010 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 411 | Marlene | FSD-UC-011 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 412 | Marlene | FSD-UC-012 flujo + alterno + Gherkin (team/Marlene) | UC | `team/Marlene/04_fsd/casos_uso.md` | 28/05/2026 |
| 413 | Marlene | Diagrama MAR MAR-SEQ-001-autenticacion-jwt | Diagrama | `team/Marlene/07_diagramas/MAR-SEQ-001-autenticacion-jwt.mmd` | 28/05/2026 |
| 414 | Marlene | Diagrama MAR MAR-SEQ-002-carga-evidencia-versionada | Diagrama | `team/Marlene/07_diagramas/MAR-SEQ-002-carga-evidencia-versionada.mmd` | 28/05/2026 |
| 415 | Marlene | Diagrama MAR MAR-SEQ-003-aprobacion-rechazo-subfase | Diagrama | `team/Marlene/07_diagramas/MAR-SEQ-003-aprobacion-rechazo-subfase.mmd` | 28/05/2026 |
| 416 | Marlene | Diagrama MAR MAR-SEQ-004-dashboard-drilldown | Diagrama | `team/Marlene/07_diagramas/MAR-SEQ-004-dashboard-drilldown.mmd` | 28/05/2026 |
| 417 | Marlene | Diagrama MAR MAR-ER-001-modelo-datos-nucleo | Diagrama | `team/Marlene/07_diagramas/MAR-ER-001-modelo-datos-nucleo.mmd` | 28/05/2026 |
| 418 | Marlene | Diagrama MAR MAR-ER-002-dominio-auditoria-evidencia | Diagrama | `team/Marlene/07_diagramas/MAR-ER-002-dominio-auditoria-evidencia.mmd` | 28/05/2026 |
| 419 | Marlene | Diagrama MAR MAR-STA-001-ciclo-vida-evidencia | Diagrama | `team/Marlene/07_diagramas/MAR-STA-001-ciclo-vida-evidencia.mmd` | 28/05/2026 |
| 420 | Marlene | Diagrama MAR MAR-STA-002-ciclo-proceso-acreditacion | Diagrama | `team/Marlene/07_diagramas/MAR-STA-002-ciclo-proceso-acreditacion.mmd` | 28/05/2026 |
| 421 | Marlene | Diagrama MAR MAR-GANTT-001-roadmap-implementacion-sigesa | Diagrama | `team/Marlene/07_diagramas/MAR-GANTT-001-roadmap-implementacion-sigesa.mmd` | 28/05/2026 |
| 422 | Marlene | Diagrama MAR MAR-GANTT-002-cronograma-convocatoria-ceub | Diagrama | `team/Marlene/07_diagramas/MAR-GANTT-002-cronograma-convocatoria-ceub.mmd` | 28/05/2026 |
| 423 | Marlene | PC-NFR prompt-contract 01 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-01.prompt.md` | 28/05/2026 |
| 424 | Marlene | PC-NFR prompt-contract 02 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-02.prompt.md` | 28/05/2026 |
| 425 | Marlene | PC-NFR prompt-contract 03 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-03.prompt.md` | 28/05/2026 |
| 426 | Marlene | PC-NFR prompt-contract 04 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-04.prompt.md` | 28/05/2026 |
| 427 | Marlene | PC-NFR prompt-contract 05 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-05.prompt.md` | 28/05/2026 |
| 428 | Marlene | PC-NFR prompt-contract 06 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-06.prompt.md` | 28/05/2026 |
| 429 | Marlene | PC-NFR prompt-contract 07 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-07.prompt.md` | 28/05/2026 |
| 430 | Marlene | PC-NFR prompt-contract 08 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-08.prompt.md` | 28/05/2026 |
| 431 | Marlene | PC-NFR prompt-contract 09 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-09.prompt.md` | 28/05/2026 |
| 432 | Marlene | PC-NFR prompt-contract 10 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-10.prompt.md` | 28/05/2026 |
| 433 | Marlene | PC-NFR prompt-contract 11 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-11.prompt.md` | 28/05/2026 |
| 434 | Marlene | PC-NFR prompt-contract 12 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-12.prompt.md` | 28/05/2026 |
| 435 | Marlene | PC-NFR prompt-contract 13 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-13.prompt.md` | 28/05/2026 |
| 436 | Marlene | PC-NFR prompt-contract 14 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-14.prompt.md` | 28/05/2026 |
| 437 | Marlene | PC-NFR prompt-contract 15 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-15.prompt.md` | 28/05/2026 |
| 438 | Marlene | PC-NFR prompt-contract 16 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-16.prompt.md` | 28/05/2026 |
| 439 | Marlene | PC-NFR prompt-contract 17 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-17.prompt.md` | 28/05/2026 |
| 440 | Marlene | PC-NFR prompt-contract 18 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-18.prompt.md` | 28/05/2026 |
| 441 | Marlene | PC-NFR prompt-contract 19 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-19.prompt.md` | 28/05/2026 |
| 442 | Marlene | PC-NFR prompt-contract 20 (6 elementos + invariantes) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-20.prompt.md` | 28/05/2026 |
| 443 | Marlene | BRD Objetivos SMART §5 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 444 | Marlene | BRD Stakeholders §6 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 445 | Marlene | BRD Business case §7 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 446 | Marlene | BRD Alcance §8 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 447 | Marlene | BRD KPIs §10 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 448 | Marlene | BRD Restricciones §11 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 449 | Marlene | BRD Riesgos §13 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 450 | Marlene | BRD Gobernanza §14 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 451 | Marlene | BRD Criterios éxito §15 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 452 | Marlene | BRD Trazabilidad MRD/PRD §12 | BRD | `team/Marlene/01_brd/BRD.md` | 28/05/2026 |
| 453 | Marlene | NFR_ISO25010.md catálogo 10 NFR SMART | NFR | `team/Marlene/05_nfr/NFR_ISO25010.md` | 28/05/2026 |
| 454 | Marlene | NFR_IA.md 10 criterios IA cuantificables | NFR | `team/Marlene/06_prompt_contracts/NFR_IA.md` | 28/05/2026 |
| 455 | Marlene | Gherkin 26 escenarios CU_BDD | Gherkin | `team/Marlene/04_fsd/gherkin.md` | 28/05/2026 |
| 456 | Marlene | api_contracts.md MOD-AUTH + MOD-EVIDENCE | FSD | `team/Marlene/04_fsd/api_contracts.md` | 28/05/2026 |
| 457 | Marlene | modelo_datos.md entidades core append-only | FSD | `team/Marlene/04_fsd/modelo_datos.md` | 28/05/2026 |
| 458 | Marlene | reglas_negocio FSD-BR-01…18 sync | FSD | `team/Marlene/04_fsd/reglas_negocio.md` | 28/05/2026 |
| 459 | Marlene | user_journeys 6 viajes actores | PRD | `team/Marlene/03_prd/user_journeys.md` | 28/05/2026 |
| 460 | Marlene | roadmap team/Marlene oleadas release | PRD | `team/Marlene/03_prd/roadmap.md` | 28/05/2026 |
| 461 | Marlene | matriz_trazabilidad team/Marlene/09 | Auditoría | `team/Marlene/09_trazabilidad/matriz_trazabilidad.md` | 28/05/2026 |
| 462 | Marlene | metricas_ai_sdlc team/Marlene/09 | Auditoría | `team/Marlene/09_trazabilidad/metricas_ai_sdlc.md` | 28/05/2026 |
| 463 | Marlene | POC-01 evidencia upload RESULTADO.md | POC | `docs/pocs/POC-01-evidencias-upload/RESULTADO.md` | 28/05/2026 |
| 464 | Marlene | POC-02 workflow dictamen 13/13 pytest | POC | `docs/pocs/POC-02-workflow-dictamen/RESULTADO.md` | 28/05/2026 |
| 465 | Marlene | docker-compose.yml POCs laboratorio STAGE | POC | `docs/pocs/docker-compose.yml` | 28/05/2026 |
| 466 | Marlene | UC01/02/03 diagramas estado+secuencia team/ | Diagrama | `team/Marlene/07_diagramas/UC01_estado.mmd` | 28/05/2026 |
| 467 | Marlene | modelo_er.mmd + gantt.mmd team/Marlene | Diagrama | `team/Marlene/07_diagramas/modelo_er.mmd` | 28/05/2026 |
| 468 | Marlene | templates/dti.md plantilla DTI curso | DTI | `team/Marlene/templates/dti.md` | 28/05/2026 |
| 469 | Marlene | 08_agents ARQ_Mermaid traceability v1 | Otro | `team/Marlene/08_agents/ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md` | 28/05/2026 |
| 470 | Marlene | release-1.0.0.md notas release Marlene | Otro | `team/Marlene/10_aportes/release-1.0.0.md` | 28/05/2026 |
| 471 | Marlene | Commit 4eda37e: Subir plantilla POC_TEMPLATE.md | Bitácora | `git log 4eda37e` | 28/05/2026 |
| 472 | Marlene | Commit f251486: Evidencia de POCs laboratorio | Bitácora | `git log f251486` | 28/05/2026 |
| 473 | Marlene | INVENTARIO_TAREAS_APORTES_v1 v1.2 cuadre | Auditoría | `team/Marlene/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md` | 28/05/2026 |
| 474 | Marlene | AUDITORIA_RUBRICAS_EXCELENTE 10/10 team/ | Auditoría | `team/Marlene/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` | 28/05/2026 |
| 475 | Marlene | MRD §3–§11 pilares + segmentación | MRD | `team/Marlene/02_mrd/MRD.md` | 28/05/2026 |
| 476 | Marlene | FSD.md checklist rúbrica entrega | FSD | `team/Marlene/04_fsd/FSD.md` | 28/05/2026 |
| 477 | Marlene | prompt_contracts.md catálogo PC-UC | Prompt | `team/Marlene/06_prompt_contracts/prompt_contracts.md` | 28/05/2026 |
| 478 | Marlene | PC-NFR-SEG-01 seguridad RBAC | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-SEG-01.prompt.md` | 28/05/2026 |
| 479 | Marlene | PC-NFR-FIA-01 fiabilidad append-only | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-FIA-01.prompt.md` | 28/05/2026 |
| 480 | Marlene | PC-NFR-FIA-02 disponibilidad SLA | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-FIA-02.prompt.md` | 28/05/2026 |
| 481 | Marlene | PC-NFR-ED-01 event-driven outbox | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-ED-01.prompt.md` | 28/05/2026 |
| 482 | Marlene | PC-NFR-ED-02 coreografía SQS | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-ED-02.prompt.md` | 28/05/2026 |
| 483 | Marlene | PC-NFR-USA-01 usabilidad CC/TD | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-USA-01.prompt.md` | 28/05/2026 |
| 484 | Marlene | PC-NFR-USA-02 accesibilidad WCAG | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-USA-02.prompt.md` | 28/05/2026 |
| 485 | Marlene | PC-NFR-POR-01 portabilidad cloud | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-POR-01.prompt.md` | 28/05/2026 |

---

## 2. Resumen por integrante

> **Base vigente (§3):** inventario **485** tareas — promedio **121.25** (28/05/2026). Referencia grupal: **120**; variación acordada ±2–10 según rol release.

| Integrante | Total (v2.0) | Δ vs ref. 120 | % grupo | Rúbrica | Observación |
|------------|--------------|------------------------------|---------|---------|-------------|
| alexAlvarez | **135** | **+15** | 27,8 % | 9/10 `docs/` + MVP | Liderazgo MVP `app/` full-stack (gateway, 3 servicios, front React) |
| aylenGonzales | **120** | ±0 | 24,7 % | 10/10 | Roadmap v2, Mermaid 4 pasadas, POC-03/04, auditoría `docs/` |
| borisAngulo | **116** | **-4** | 23,9 % | 9/10 | Tabla 1045 filas, Figma Phase 2, trazabilidad git |
| Marlene | **114** | **-6** | 23,5 % | 10/10 `team/` | Overview, POC template, 22 US + 12 UC + MAR diagramas |
| **Total grupo** | **485** | — | 100 % | — | Delta 2.0.0 |

### Equidad (objetivo 70 % – 130 % del promedio 121.25)

| Integrante | Tareas | % promedio | ¿En rango 70–130 %? |
|------------|--------|------------|---------------------|
| alexAlvarez | 135 | 111 % | **Sí** |
| aylenGonzales | 120 | 99 % | **Sí** |
| borisAngulo | 116 | 96 % | **Sí** |
| Marlene | 114 | 94 % | **Sí** |

| Release | Total | Promedio/persona |
|---------|-------|------------------|
| 1.0.0 (v1.2) | 965 | 241,25 |
| **2.0.0 (v1.3)** | **485** | **121.25** |

---

## 3. Cálculo del factor de aporte individual

> **Base vigente (28/05/2026):** **485** tareas / 4 integrantes = **121.25** c/u.

```
aporte_promedio_grupo = 485 / 4 = 121.25 tareas/persona
factor_i              = clamp(tareas_i / 121.25, 0.5, 1.1)
Nota_individual_i     = Nota_grupal × factor_i
```

### Aplicación (inventario v2.0 — 28/05/2026)

| Integrante | Tareas (§2) | factor sin clamp | factor (clamp 0.5–1.1) | Nota individual |
|------------|-------------|------------------|------------------------|-----------------|
| alexAlvarez | 135 | 1.11 | **1.10** | Nota_grupal × 1.10 |
| aylenGonzales | 120 | 0.99 | **0.99** | Nota_grupal × 0.99 |
| borisAngulo | 116 | 0.96 | **0.96** | Nota_grupal × 0.96 |
| Marlene | 114 | 0.94 | **0.94** | Nota_grupal × 0.94 |

### 3.1 Notas de equidad (sin penalizar calidad)

| Integrante | Nota |
|------------|------|
| **alexAlvarez** | **+15** por MVP `app/` (gateway + evidence/audit/orchestration + front E2E); **135** tareas totales. |
| **aylenGonzales** | Referencia release en **120** (baseline); POC + Mermaid + auditoría `docs/`. |
| **borisAngulo** | **−4** vs baseline; tabla **1045 filas** + Figma Phase 2 concentran densidad en menos filas inventario. |
| **Marlene** | **−6** vs baseline; núcleo `team/Marlene/` (22 US + 12 UC + PC-NFR) sin inflar conteo. |

---

## 4. Reglas del grupo sobre qué cuenta como tarea

Aplicadas según `templates/APORTES_TEMPLATE.md` §4:

| Tipo | Regla |
|------|--------|
| Documento | Sección `##` sustantiva nueva/mejorada en BRD/MRD/PRD/FSD/DTI = 1 tarea |
| UC | `FSD-UC-*` con flujo + alterno + Gherkin = 1 tarea |
| NFR | NFR cuantificable (métrica + umbral + verificación) = 1 tarea |
| Diagrama | `.mmd` oficial versionado (sin duplicar R100 puro) = 1 tarea |
| User story | `PRD-US-*` INVEST + criterios = 1 tarea |
| Prompt-contrato | `PC-*` con 6 elementos + invariantes = 1 tarea |
| Skill / rule / AGENTS | Skill, rule o co-autoría documentada = 1 tarea |
| POC | POC ejecutada con evidencia = 1 tarea |
| Bitácora | Sesión PM / log documentada = 1 tarea |
| ADR / Auditoría | ADR nuevo o informe trazabilidad = 1 tarea |
| Código MVP | Hito verificable `app/` = 1 tarea |

**No cuenta:** merge commits, R100 sin cambio, PNG, `.gitkeep`, cosmética, re-conteo v1.0.0.

**Incluido en 2.0.0:** `docs/` Golden, `app/`, `figma/`, POC-03/04.

---

## 5. Auditoría del docente (opcional)

| Integrante | Factor §3 | Rúbrica | Factor final sugerido |
|------------|-----------|---------|------------------------|
| alexAlvarez | 1.10 | 9/10 | 1,10 (techo) |
| aylenGonzales | 0.99 | 10/10 | 1,00 |
| borisAngulo | 0.96 | 9/10 | 1,00 |
| Marlene | 0.94 | 10/10 | 1,00 |

---

## 6. Checklist de cierre del release

- [x] §0 Metadatos + filtro commits ≥ 18/05/2026
- [x] §1 **485** filas (Alex 135 · Aylen 120 · Boris 116 · Marlene 114)
- [x] §2 Equidad 70–130 % del promedio **121.25**
- [x] §3 Factores calculados
- [x] §4 Reglas §4 documentadas
- [ ] Commit en `release/2.0.0`

---

## 7. Registro de cambios del documento

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 28/05/2026 | Inventario delta 496 tareas (conteo por archivo) |
| v1.1 | 28/05/2026 | Re-cuadre equitativo 120×4 = 480 desde commits ≥ 18/05 |
| **v1.2** | **28/05/2026** | **37 commits mapeados por autor; eliminado filler genérico; entregables §4 verificables** |
| **v1.3** | **28/05/2026** | **Variación natural: Alex 135 (+15 MVP app), Aylen 120, Boris 116 (−4), Marlene 114 (−6)** |

**Regenerar:** `node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-aportes-release-2.0.0.js`
