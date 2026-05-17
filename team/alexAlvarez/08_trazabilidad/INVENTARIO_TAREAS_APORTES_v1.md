# Inventario de tareas (aportes) — alexAlvarez v1.0

| Metadato | Valor |
|----------|-------|
| **Total tareas** | 112 filas (IDs T-001…T-132; saltos por deduplicación _aportes) |
| **Autor** | Alex Alvarez (equipo AcredIA — orquestación Golden Folder y gobernanza IA) |
| **Fecha inventario** | 17/05/2026 |
| **Última verificación** | 17/05/2026 — `team/alexAlvarez/` + promoción `docs/` documentada |
| **Auditoría** | [`AUDITORIA_RUBRICAS_EXCELENTE.md`](AUDITORIA_RUBRICAS_EXCELENTE.md) |

## Resumen de verificación

| Estado | Cantidad | % |
|--------|----------|---|
| **Entregada** | 114 | ~100 % |
| **Referencia repo** | 0 | — |
| **Pendiente** | 0 | — |

**Artefactos físicos:** ~66 archivos bajo `team/alexAlvarez/docs/` + `log_interno.md`; **promoción Dorada** en `docs/04_fsd/`, `docs/06`–`09`, `docs/05_dti/DTI.md`; **7 skills** y **5 rules** en `.cursor/` (autoría Alex; excl. `sigesa-auditoria-excelente-equipo`).

## Resumen por capa (conteo de tareas inventario)

| Capa | Tareas inventario | Evidencia principal |
|------|-------------------|---------------------|
| BRD / MRD / PRD | T-001…058, T-100, T-126…128 | `docs/01_brd`…`03_prd` equipo + Golden PRD |
| FSD / LFSD | T-091…096, T-069…070 | `casos_uso.md` 17 UC; `docs/04_fsd/` Dorado |
| NFR | T-097…099, T-059…060 | 19 NFR; diagrama pie ISO |
| Prompt contracts | T-103…111, T-074 | 9 PC-SIG en equipo; 58 en `docs/06/` |
| Diagramas | T-059…068, T-075 | 10 `.mmd` equipo; 92 canónicos `docs/07/` |
| Gobernanza IA | T-079…090, T-076, T-129…130 | Skills + rules + `docs/08_agents/` |
| Trazabilidad Dorada | T-071…073 | `docs/09_trazabilidad/` v1.5 APTO |
| DTI | T-078…079 | `docs/05_dti/DTI.md` + ADRs |

## Reglas de conteo

Ver skill `sigesa-auditoria-excelente-equipo` y `templates/APORTES_TEMPLATE.md`. Co-autoría documentada en filas Golden (Boris/Aylen/Marlene en consolidación `docs/07_diagramas/`).

## Registro completo

| ID | Categoria | Descripcion | Referencia | Estado | Observacion |
|----|-----------|-------------|------------|--------|-------------|
| T-001 | BRD | 1. Resume | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-002 | BRD | 2. Objetivos SMART (mí | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-004 | BRD | 4. Busi | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-005 | BRD | 5. Alca | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-006 | BRD | 6. KPIs de | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-007 | BRD | 7. Restriccio | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-008 | BRD | 8. Supuestos (assumptio | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-009 | BRD | 9. Riesgos y mitigació | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-010 | BRD | 10. Gober | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-014 | MRD | 1. Resume | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-015 | MRD | 2. Visió | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-016 | MRD | 3. A | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-017 | MRD | 4. Segme | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-018 | MRD | 5. Jobs-to-be-Do | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-019 | MRD | 6. Voz del Clie | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-020 | MRD | 7. A | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-022 | MRD | 9. Prici | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-025 | MRD | 12. Requerimie | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| ID | Hipótesis | Cómo validar | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| Riesgo | Prob. | Impacto | Mitigació | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| -------- | -------- | - | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-030 | PRD | 1. Resume | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-031 | PRD | 2. Épicas pri | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-032 | PRD | 3. E | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| Épica | Objetivo | Métrica | Meta |  | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-034 | PRD | 5. Alca | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-035 | PRD | 7. Requerimie | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-036 | PRD | 8. Requerimie | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-037 | PRD | 9. Depe | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-038 | PRD | 10. Supuestos y restriccio | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-039 | PRD | 11. Experie | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| Riesgo | Prob. | Impacto | Mitigació | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-043 | PRD | 1. Roadmap de e | team/alexAlvarez/docs/03_prd/roadmap.md | Entregada |  |
| T-045 | PRD | 1. Viaje del Coordi | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-046 | PRD | 2. Viaje del Téc | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-047 | PRD | 3. Viaje del Público co | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-048 | PRD | 4. Viaje de la Jefatura DUEA audita | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-049 | Prompt | 06-docs-consistency-checker.prompt.md | team/alexAlvarez/docs/prompts/06-docs-consistency-checker.prompt.md | Entregada |  |
| T-050 | Prompt | PC-SIG-03.prompt.md | team/alexAlvarez/docs/prompts/PC-SIG-03.prompt.md | Entregada |  |
| T-051 | Prompt | sigesa-api-contract-designer.prompt.md | team/alexAlvarez/prompts/sigesa-api-contract-designer.prompt.md | Entregada |  |
| T-052 | Prompt | sigesa-arquitectura-tecnica-ia.prompt.md | team/alexAlvarez/prompts/sigesa-arquitectura-tecnica-ia.prompt.md | Entregada |  |
| T-053 | Prompt | sigesa-auditor-trazabilidad-dti.prompt.md | team/alexAlvarez/prompts/sigesa-auditor-trazabilidad-dti.prompt.md | Entregada |  |
| T-054 | Prompt | sigesa-db-architect-append-only.prompt.md | team/alexAlvarez/prompts/sigesa-db-architect-append-only.prompt.md | Entregada |  |
| Golden agentes | Co-autoría manifiesto AGENTS.md (equipo) | docs/08_agents/AGENTS.md | Entregada | Lead consolidación Alex |
| Bitácora | log_interno.md sesiones PM-ALEX | team/alexAlvarez/log_interno.md | Entregada |  |
| Overview | definicion_producto.md | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| Overview | alcance_proyecto.md | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-059 | Diagrama | diag-10-pie-cobertura-nfr-boris.mmd | team/alexAlvarez/docs/05_nfr/07_diagramas/diag-10-pie-cobertura-nfr-boris.mmd | Entregada |  |
| T-060 | Diagrama | nfr_cobertura_iso25010.mmd | team/alexAlvarez/docs/05_nfr/07_diagramas/nfr_cobertura_iso25010.mmd | Entregada |  |
| T-061 | Diagrama | UC01_estado.mmd | team/alexAlvarez/docs/07_diagramas/UC01_estado.mmd | Entregada |  |
| T-062 | Diagrama | UC01_secuencia.mmd | team/alexAlvarez/docs/07_diagramas/UC01_secuencia.mmd | Entregada |  |
| T-063 | Diagrama | UC02_estado.mmd | team/alexAlvarez/docs/07_diagramas/UC02_estado.mmd | Entregada |  |
| T-064 | Diagrama | UC02_secuencia.mmd | team/alexAlvarez/docs/07_diagramas/UC02_secuencia.mmd | Entregada |  |
| T-065 | Diagrama | UC03_estado.mmd | team/alexAlvarez/docs/07_diagramas/UC03_estado.mmd | Entregada |  |
| T-066 | Diagrama | UC03_secuencia.mmd | team/alexAlvarez/docs/07_diagramas/UC03_secuencia.mmd | Entregada |  |
| T-067 | Diagrama | gantt.mmd | team/alexAlvarez/docs/07_diagramas/gantt.mmd | Entregada |  |
| T-068 | Diagrama | modelo_er.mmd | team/alexAlvarez/docs/07_diagramas/modelo_er.mmd | Entregada |  |
| T-069 | Golden FSD | Descomposición docs/04_fsd/ (7 archivos Dorados) | docs/04_fsd/ | Entregada | PM-ALEX-005 |
| T-070 | Golden FSD | FSD.md índice maestro canónico | docs/04_fsd/FSD.md | Entregada | PM-ALEX-005 |
| T-071 | Golden trazabilidad | matriz_trazabilidad.md v1.5 | docs/09_trazabilidad/matriz_trazabilidad.md | Entregada | PM-ALEX-007 |
| T-072 | Golden trazabilidad | metricas_ai_sdlc.md v1.2 | docs/09_trazabilidad/metricas_ai_sdlc.md | Entregada | PM-ALEX-007 |
| T-073 | Golden trazabilidad | report_findings.md v1.4 APTO | docs/09_trazabilidad/report_findings.md | Entregada | PM-ALEX-007 |
| T-074 | Golden PCs | Catálogo 58 prompt contracts | docs/06_prompt_contracts/prompt_contracts.md | Entregada | consolidación 2026-05-17 |
| T-075 | Golden diagramas | Carpeta canónica 92 .mmd | docs/07_diagramas/README.md | Entregada | PM-ALEX-009 ampliado |
| T-076 | Golden agentes | AGENTS.md Dorada v2.0 | docs/08_agents/AGENTS.md | Entregada |  |
| T-077 | Golden DTI | DTI.md compilado | docs/05_dti/DTI.md | Entregada | PM-ALEX-008 |
| T-078 | Golden DTI | ADRs numerados ADR_001…009 | docs/05_dti/adrs/ | Entregada | PM-ALEX-008 |
| T-079 | Skill | sigesa-generacion-documentos-negocio | .cursor/skills/sigesa-generacion-documentos-negocio/SKILL.md | Entregada | autor Alex; no sigesa-auditoria-excelente-equipo |
| T-080 | Skill | sigesa-generacion-documentos-tecnicos | .cursor/skills/sigesa-generacion-documentos-tecnicos/SKILL.md | Entregada |  |
| T-081 | Skill | sigesa-arquitectura-tecnica-ia | .cursor/skills/sigesa-arquitectura-tecnica-ia/SKILL.md | Entregada |  |
| T-082 | Skill | sigesa-api-contract-designer | .cursor/skills/sigesa-api-contract-designer/SKILL.md | Entregada |  |
| T-083 | Skill | sigesa-db-architect-append-only | .cursor/skills/sigesa-db-architect-append-only/SKILL.md | Entregada |  |
| T-084 | Skill | sigesa-auditor-trazabilidad-dti | .cursor/skills/sigesa-auditor-trazabilidad-dti/SKILL.md | Entregada |  |
| T-085 | Skill | mermaid-expert-architect | .cursor/skills/mermaid-expert-architect/SKILL.md | Entregada |  |
| T-086 | Cursor rule | 01_domain_language.mdc | .cursor/rules/01_domain_language.mdc | Entregada | PM-ALEX-001 |
| T-087 | Cursor rule | 02_session_prompt_logging.mdc | .cursor/rules/02_session_prompt_logging.mdc | Entregada | PM-ALEX-002 |
| T-088 | Cursor rule | 03_sigesa_doc_orchestrator.mdc | .cursor/rules/03_sigesa_doc_orchestrator.mdc | Entregada |  |
| T-089 | Cursor rule | 04_sigesa_qa_gherkin_coverage.mdc | .cursor/rules/04_sigesa_qa_gherkin_coverage.mdc | Entregada |  |
| T-090 | Cursor rule | 06_docs_consistency_checker.mdc | .cursor/rules/06_docs_consistency_checker.mdc | Entregada | PM-ALEX-003 |
| T-091 | FSD | casos_uso.md 17 UC | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada |  |
| T-092 | FSD | gherkin.md escenarios BDD | team/alexAlvarez/docs/04_fsd/gherkin.md | Entregada |  |
| T-093 | FSD | reglas_negocio.md | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-094 | FSD | api_contracts.md | team/alexAlvarez/docs/04_fsd/api_contracts.md | Entregada |  |
| T-095 | FSD | modelo_datos.md | team/alexAlvarez/docs/04_fsd/modelo_datos.md | Entregada |  |
| T-096 | LFSD | LFSD_v1.md UC-L01…L07 | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada | PM-ALEX-011 |
| T-097 | NFR | NFR_ISO25010.md 19 NFR | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada | PM-ALEX-010 |
| T-098 | NFR | catalogo_tc.md | team/alexAlvarez/docs/05_nfr/catalogo_tc.md | Entregada |  |
| T-099 | NFR | matriz_cobertura.md | team/alexAlvarez/docs/05_nfr/matriz_cobertura.md | Entregada |  |
| T-100 | PRD | user_stories.md 26 US | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-101 | Auditoría | AUDITORIA_RUBRICAS_EXCELENTE.md | team/alexAlvarez/08_trazabilidad/ | Entregada |  |
| T-102 | Auditoría | INVENTARIO_TAREAS_APORTES_v1.md | team/alexAlvarez/08_trazabilidad/ | Entregada |  |
| T-103 | Prompt-contrato | PC-SIG-03-generador-prd.prompt | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-03-generador-prd.prompt.md | Entregada |  |
| T-104 | Prompt-contrato | PC-SIG-04-v2-consolidacion-maestra.prompt | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-04-v2-consolidacion-maestra.prompt.md | Entregada |  |
| T-105 | Prompt-contrato | PC-SIG-07-compilador-ecosistema-agentico.prompt | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-07-compilador-ecosistema-agentico.prompt.md | Entregada |  |
| T-106 | Prompt-contrato | PC-SIG-08-gobernanza-seguridad-agents.prompt | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-08-gobernanza-seguridad-agents.prompt.md | Entregada |  |
| T-107 | Prompt-contrato | PC-SIG-09-arquitecto-bd-er.prompt | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-09-arquitecto-bd-er.prompt.md | Entregada |  |
| T-108 | Prompt-contrato | PC-SIG-10-consistencia-documental.prompt | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-10-consistencia-documental.prompt.md | Entregada |  |
| T-109 | Prompt-contrato | PC-SIG-11-ejecutor-tareas-granular.prompt | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-11-ejecutor-tareas-granular.prompt.md | Entregada |  |
| T-110 | Prompt-contrato | PC-SIG-12-backlog-github.prompt | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-12-backlog-github.prompt.md | Entregada |  |
| T-111 | Prompt-contrato | PC-SIG-13-arquitecto-dti.prompt | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-13-arquitecto-dti.prompt.md | Entregada |  |
| T-112 | Prompt sesión | 06-docs-consistency-checker.prompt.md | team/alexAlvarez/docs/prompts/06-docs-consistency-checker.prompt.md | Entregada |  |
| T-113 | Prompt sesión | PC-SIG-03.prompt.md | team/alexAlvarez/docs/prompts/PC-SIG-03.prompt.md | Entregada |  |
| T-114 | Prompt sesión | PC-SIG-13-arquitecto-dti.prompt.md | team/alexAlvarez/docs/prompts/PC-SIG-13-arquitecto-dti.prompt.md | Entregada |  |
| T-115 | Prompt sesión | diagramas-07-symlinks-canonicos.prompt.md | team/alexAlvarez/docs/prompts/diagramas-07-symlinks-canonicos.prompt.md | Entregada |  |
| T-116 | Prompt sesión | fsd-descomposicion-artefactos.prompt.md | team/alexAlvarez/docs/prompts/fsd-descomposicion-artefactos.prompt.md | Entregada |  |
| T-117 | Prompt sesión | lfsd-integracion-fsd.prompt.md | team/alexAlvarez/docs/prompts/lfsd-integracion-fsd.prompt.md | Entregada |  |
| T-118 | Prompt sesión | matriz-trazabilidad-descripciones.prompt.md | team/alexAlvarez/docs/prompts/matriz-trazabilidad-descripciones.prompt.md | Entregada |  |
| T-119 | Prompt sesión | nfr-iso25010-equipo-alex.prompt.md | team/alexAlvarez/docs/prompts/nfr-iso25010-equipo-alex.prompt.md | Entregada |  |
| T-120 | Prompt sesión | session-log-2026-05-16.prompt.md | team/alexAlvarez/docs/prompts/session-log-2026-05-16.prompt.md | Entregada |  |
| T-121 | Prompt sesión | session-log-2026-05-17.prompt.md | team/alexAlvarez/docs/prompts/session-log-2026-05-17.prompt.md | Entregada |  |
| T-122 | Prompt sesión | sigesa-api-contract-designer.prompt.md | team/alexAlvarez/docs/prompts/sigesa-api-contract-designer.prompt.md | Entregada |  |
| T-123 | Prompt sesión | sigesa-arquitectura-tecnica-ia.prompt.md | team/alexAlvarez/docs/prompts/sigesa-arquitectura-tecnica-ia.prompt.md | Entregada |  |
| T-124 | Prompt sesión | sigesa-auditor-trazabilidad-dti.prompt.md | team/alexAlvarez/docs/prompts/sigesa-auditor-trazabilidad-dti.prompt.md | Entregada |  |
| T-125 | Prompt sesión | sigesa-db-architect-append-only.prompt.md | team/alexAlvarez/docs/prompts/sigesa-db-architect-append-only.prompt.md | Entregada |  |
| T-126 | PRD | user_journeys.md 6 journeys | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada | PC-SIG-03 |
| T-127 | PRD | roadmap.md | team/alexAlvarez/docs/03_prd/roadmap.md | Entregada |  |
| T-128 | Golden PRD | PRD.md 25 US canónico | docs/03_prd/PRD.md | Entregada | PC-SIG-04 |
| T-129 | Golden agentes | skills.md catálogo | docs/08_agents/skills.md | Entregada |  |
| T-130 | Golden agentes | cursor_rules.md índice | docs/08_agents/cursor_rules.md | Entregada |  |
| T-131 | Context | 03_domain_glossary.md | team/alexAlvarez/docs/context/03_domain_glossary.md | Entregada |  |
| T-132 | Context | 04_state_machine.md | team/alexAlvarez/docs/context/04_state_machine.md | Entregada |  |
