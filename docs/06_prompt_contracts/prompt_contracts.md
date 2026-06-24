# Catálogo oficial de Prompt Contracts — SIGESA

Repositorio consolidado y deduplicado del workspace. Fuente canónica para orquestación IA en el flujo de acreditación UMSS (CEUB/ARCU-SUR).

## Resumen del escaneo

| Métrica | Valor |
|---------|-------|
| Contratos únicos consolidados | **59** |
| Familia SDLC (PC-SIG-03…13, orquestación documental) | 9 |
| Familia Runtime IA (PC-SIG-01…12, producto inteligente) | 12 |
| Familia verificación NFR (PC-NFR-*) | 20 |
| Familia FSD UC AcredIA aylen (PC-005…007) | 3 |
| Familia MOD-DASH backend alexAlvarez (PC-MOD-DASH-01) | 1 |
| Familia FSD UC AcredIA boris (PC-001…014) | 14 |

**Nota de namespaces:** Los IDs `PC-SIG-03`…`PC-SIG-12` existen en dos familias distintas (SDLC vs runtime IA). En este catálogo se distinguen como `PC-SIG-NN` (SDLC) y `PC-SIG-NN-IA` (runtime).

**Duplicados descartados:** Copias en `team/alexAlvarez/docs/prompts/`, `.github/prompts/` (sin frontmatter completo) y symlinks de invocación rápida.

## Índice maestro

| # | ID del Contrato | Nombre / Objetivo | Archivo Físico | Descripción técnica |
|---|-----------------|-------------------|----------------|---------------------|
| 1 | PC-SIG-03 | Generador de PRD Multipropósito | [`contract_sdlc_03_generador_prd.md`](contract_sdlc_03_generador_prd.md) | Orquesta la suite PRD en cuatro artefactos (PRD maestro, user_journeys con Mermaid journey, user_stories con mínimo 20 US y Gherkin, roadmap con Gantt) bajo team/*/docs/03_prd/, anclado a BRD/MRD/glosario y a invariantes append-only de Evidencia en el flujo UMSS. |
| 2 | PC-SIG-04-V2 | Consolidación Maestra Enrutada por AGENTS.md | [`contract_sdlc_04v2_consolidacion_maestra.md`](contract_sdlc_04v2_consolidacion_maestra.md) | Consolida la Versión Dorada documental en docs/ enrutando por AGENTS.md: unifica BRD/MRD/PRD/FSD/DTI canónicos del repositorio sin duplicar negocio ni violar la jerarquía Fase→Dimensión→Criterio→Indicador→Evidencia. |
| 3 | PC-SIG-07 | Compilador del Ecosistema Agéntico | [`contract_sdlc_07_compilador_ecosistema_agentico.md`](contract_sdlc_07_compilador_ecosistema_agentico.md) | Redacta o actualiza AGENTS.md como manifiesto del ecosistema agéntico SIGESA: roles, skills, rutas de artefactos y reglas de orquestación para agentes Cursor/Claude en el SDLC de acreditación. |
| 4 | PC-SIG-08 | Gobernanza y Seguridad en AGENTS.md | [`contract_sdlc_08_gobernanza_seguridad_agents.md`](contract_sdlc_08_gobernanza_seguridad_agents.md) | Inyecta en AGENTS.md políticas de seguridad, privacidad, PII, trazabilidad append-only y RBAC alineadas al dominio DUEA; depende de existencia previa de AGENTS.md (PC-SIG-07). |
| 5 | PC-SIG-09 | Arquitecto de Base de Datos y Generador ER | [`contract_sdlc_09_arquitecto_bd_er.md`](contract_sdlc_09_arquitecto_bd_er.md) | Produce modelo ER físico append-only (Mermaid erDiagram) y alineación con skill sigesa-db-architect-append-only para tablas de Evidencia, observaciones y auditoría normativa UMSS. |
| 6 | PC-SIG-10 | Consistencia Documental | [`contract_sdlc_10_consistencia_documental.md`](contract_sdlc_10_consistencia_documental.md) | Genera la regla Cursor 06_docs_consistency_checker: detecta desalineación entre BRD/MRD/PRD/FSD/DTI, glosario y trazabilidad antes de merges en el ciclo de acreditación. |
| 7 | PC-SIG-11 | Ejecutor Granular de Tareas | [`contract_sdlc_11_ejecutor_tareas_granular.md`](contract_sdlc_11_ejecutor_tareas_granular.md) | Ejecuta exactamente un artefacto sustantivo por invocación (un UC, NFR o ADR) para evitar diffs masivos y preservar trazabilidad UMSS en implementación asistida por IA. |
| 8 | PC-SIG-12 | Generador de Backlog GitHub | [`contract_sdlc_12_backlog_github.md`](contract_sdlc_12_backlog_github.md) | Materializa backlog GitHub (issues etiquetadas) desde FSD/PRD/DTI con vínculo a UC y NFR para el equipo de desarrollo del sistema gestor de acreditaciones. |
| 9 | PC-SIG-13 | Arquitecto de Infraestructura y DTI | [`contract_sdlc_13_arquitecto_dti.md`](contract_sdlc_13_arquitecto_dti.md) | Puebla docs/05_dti/ con DTI.md (C4, ER, APIs con RBAC) y ADRs granulares; integra skills sigesa-generacion-documentos-tecnicos y sigesa-auditor-trazabilidad-dti. |
| 10 | PC-SIG-01-IA | Borrador estructurado de informe de acreditación | [`contract_ia_01_informe_acreditacion.md`](contract_ia_01_informe_acreditacion.md) | Contrato runtime M7 Reporting: genera borrador JSON/markdown de informe CEUB/ARCU-SUR solo con cifras del input InformeAccreditacionInput; validator anti-alucinación y auditoría ia_invocation. |
| 11 | PC-SIG-02-IA | Validación asistida de evidencia contra rúbrica | [`contract_ia_02_validacion_evidencia_rubrica.md`](contract_ia_02_validacion_evidencia_rubrica.md) | Checklist asistida M4+M3: coherencia metadatos/extracto con descriptor de Indicador; salida coincidencia ALTA|MEDIA|BAJA sin sustituir lectura humana del PDF normativo. |
| 12 | PC-SIG-03-IA | Evaluación asistida de alineación con criterio | [`contract_ia_03_alineacion_criterio.md`](contract_ia_03_alineacion_criterio.md) | Asiste dictamen humano M5 con evaluación no binaria oficial; JSON Schema, HITL y umbrales F1 del golden set UMSS (distinto del PC-SIG-03 SDLC generador PRD). |
| 13 | PC-SIG-04-IA | Asistente redacción respuesta observación DUEA | [`contract_ia_04_redaccion_observacion_cc.md`](contract_ia_04_redaccion_observacion_cc.md) | M6: borrador para [CC] ante observación TD respetando tono institucional, sin alterar estados ni Evidencia append-only. |
| 14 | PC-SIG-05-IA | Resumen neutro evaluador externo | [`contract_ia_05_resumen_evaluador_externo.md`](contract_ia_05_resumen_evaluador_externo.md) | M10 futuro: vista de lectura controlada para evaluador externo con minimización de datos sensibles. |
| 15 | PC-SIG-06-IA | Clasificación sugerida tipo documental | [`contract_ia_06_clasificacion_tipo_documental.md`](contract_ia_06_clasificacion_tipo_documental.md) | M4: sugiere tipo documental y metadatos para ordenar Evidencias en repositorio normativo. |
| 16 | PC-SIG-07-IA | Borrador observación técnico DUEA | [`contract_ia_07_borrador_observacion_td.md`](contract_ia_07_borrador_observacion_td.md) | M5+M6 HITL: propone observación alineada a descriptor e ítems omitidos detectados por PC-SIG-02 runtime. |
| 17 | PC-SIG-08-IA | Consulta institucional inteligente RAG DUEA | [`contract_ia_08_rag_institucional_duea.md`](contract_ia_08_rag_institucional_duea.md) | M3+corpus: RAG corporativo con grounding obligatorio; mitiga alucinación normativa en capacitación interna DUEA. |
| 18 | PC-SIG-09-IA | Asistencia redacción texto de indicador | [`contract_ia_09_redaccion_texto_indicador.md`](contract_ia_09_redaccion_texto_indicador.md) | M3: ayuda a [CC] a redactar descriptor de Indicador en plantilla sin decidir cumplimiento oficial. |
| 19 | PC-SIG-10-IA | Resumen automático texto largo con anclas | [`contract_ia_10_resumen_texto_largo.md`](contract_ia_10_resumen_texto_largo.md) | M4: resume documentos extensos preservando anclas citables para revisión TD eficiente. |
| 20 | PC-SIG-11-IA | Autoevaluación brecha texto vs checklist | [`contract_ia_11_autoevaluacion_gap.md`](contract_ia_11_autoevaluacion_gap.md) | M3+M5: gap analysis entre texto de autoevaluación y lista de verificación normativa. |
| 21 | PC-SIG-12-IA | Preprocesador PII antes de LLM | [`contract_ia_12_enmascaramiento_pii.md`](contract_ia_12_enmascaramiento_pii.md) | Transversal: detección y enmascaramiento PII; gate obligatorio si featureFlag_ia_pii=true antes de cualquier invocación LLM. |
| 22 | PC-NFR-COM-01 | PC-NFR-COM-01 — Verificación NFR | [`contract_nfr_com_01.md`](contract_nfr_com_01.md) | Verificación compatibilidad cliente web institucional UMSS. |
| 23 | PC-NFR-ED-01 | PC-NFR-ED-01 — Verificación NFR | [`contract_nfr_ed_01.md`](contract_nfr_ed_01.md) | Verificación eficiencia de desempeño (tiempos respuesta APIs críticas acreditación). |
| 24 | PC-NFR-ED-02 | PC-NFR-ED-02 — Verificación NFR | [`contract_nfr_ed_02.md`](contract_nfr_ed_02.md) | Verificación capacidad y concurrencia en picos de cierre de fase UMSS. |
| 25 | PC-NFR-FIA-01 | PC-NFR-FIA-01 — Verificación NFR | [`contract_nfr_fia_01.md`](contract_nfr_fia_01.md) | Verificación disponibilidad mensual SLO del sistema gestor. |
| 26 | PC-NFR-FIA-02 | PC-NFR-FIA-02 — Verificación NFR | [`contract_nfr_fia_02.md`](contract_nfr_fia_02.md) | Verificación RPO/RTO y prueba de restore ante pérdida de Evidencia. |
| 27 | PC-NFR-IA-01 | PC-NFR-IA-01 — Verificación NFR | [`contract_nfr_ia_01.md`](contract_nfr_ia_01.md) | Evaluación F1 golden set precisión factual salidas JSON de PCs runtime P0. |
| 28 | PC-NFR-IA-02 | PC-NFR-IA-02 — Verificación NFR | [`contract_nfr_ia_02.md`](contract_nfr_ia_02.md) | Evaluación consistencia semántica entre invocaciones IA del mismo contexto. |
| 29 | PC-NFR-IA-03 | PC-NFR-IA-03 — Verificación NFR | [`contract_nfr_ia_03.md`](contract_nfr_ia_03.md) | Evaluación latencia y calidad de resúmenes largos (PC-SIG-10 runtime). |
| 30 | PC-NFR-IA-04 | PC-NFR-IA-04 — Verificación NFR | [`contract_nfr_ia_04.md`](contract_nfr_ia_04.md) | Evaluación disponibilidad IA y degradación graceful sin tumbar flujo normativo. |
| 31 | PC-NFR-IA-05 | PC-NFR-IA-05 — Verificación NFR | [`contract_nfr_ia_05.md`](contract_nfr_ia_05.md) | Evaluación explicabilidad y trazas de decisión asistida para auditoría DUEA. |
| 32 | PC-NFR-IA-06 | PC-NFR-IA-06 — Verificación NFR | [`contract_nfr_ia_06.md`](contract_nfr_ia_06.md) | Evaluación aislamiento cross-tenant/carrera en contexto recuperado por RAG. |
| 33 | PC-NFR-IA-07 | PC-NFR-IA-07 — Verificación NFR | [`contract_nfr_ia_07.md`](contract_nfr_ia_07.md) | Evaluación robustez ante JSON de entrada inválido sin llamar LLM. |
| 34 | PC-NFR-IA-08 | PC-NFR-IA-08 — Verificación NFR | [`contract_nfr_ia_08.md`](contract_nfr_ia_08.md) | Evaluación regresión de prompts versionados en pipeline QA IA. |
| 35 | PC-NFR-IA-09 | PC-NFR-IA-09 — Verificación NFR | [`contract_nfr_ia_09.md`](contract_nfr_ia_09.md) | Evaluación costo/tokens y presupuesto por ciclo de acreditación. |
| 36 | PC-NFR-IA-10 | PC-NFR-IA-10 — Verificación NFR | [`contract_nfr_ia_10.md`](contract_nfr_ia_10.md) | Evaluación mantenibilidad y versionado de plantillas Prompt Contract. |
| 37 | PC-NFR-MAN-01 | PC-NFR-MAN-01 — Verificación NFR | [`contract_nfr_man_01.md`](contract_nfr_man_01.md) | Verificación mantenibilidad, CI/CD y calidad de despliegue. |
| 38 | PC-NFR-POR-01 | PC-NFR-POR-01 — Verificación NFR | [`contract_nfr_por_01.md`](contract_nfr_por_01.md) | Verificación portabilidad de despliegue entre entornos UMSS. |
| 39 | PC-NFR-SEG-01 | PC-NFR-SEG-01 — Verificación NFR | [`contract_nfr_seg_01.md`](contract_nfr_seg_01.md) | Verificación seguridad RBAC, sesión y operaciones sensibles append-only. |
| 40 | PC-NFR-USA-01 | PC-NFR-USA-01 — Verificación NFR | [`contract_nfr_usa_01.md`](contract_nfr_usa_01.md) | Verificación usabilidad flujos críticos [CC]/[TD]/[JD] en UAT acreditación. |
| 41 | PC-NFR-USA-02 | PC-NFR-USA-02 — Verificación NFR | [`contract_nfr_usa_02.md`](contract_nfr_usa_02.md) | Verificación accesibilidad WCAG 2.1 en portal y bandejas normativas. |
| 42 | PC-005 | Generación reporte ejecutivo PDF | [`contract_fsd_005_reporte_pdf.md`](contract_fsd_005_reporte_pdf.md) | Especifica módulo async de reportes PDF para [JD]: jobs, worker, plantilla UMSS, TTL, notificación >5 min y LOG_AUDITORIA REPORTE (FSD-UC-005). |
| 43 | PC-006 | Notificaciones y alertas | [`contract_fsd_006_notificaciones.md`](contract_fsd_006_notificaciones.md) | Contrato JSON para bandeja y envío de notificaciones por plazos e hitos de acreditación con outbox y NFR de latencia. |
| 44 | PC-007 | Búsqueda FTS evidencias | [`contract_fsd_007_busqueda_fts.md`](contract_fsd_007_busqueda_fts.md) | Contrato de búsqueda full-text sobre Evidencias e indicadores con RBAC y SLA E2E ≤2 min en revisión TD. |
| 45 | PC-MOD-DASH-01 | Paneles operativos y reporting backend | [`contract_fsd_008_mod_dash_backend.md`](contract_fsd_008_mod_dash_backend.md) | Diseño/implementación Java MOD-DASH/MOD-REPORT: FSD-UC-011–014, ADR-0015 sync/async, RBAC SecurityInjector, JaCoCo ≥90%, AcredIA DS. |
| 46 | PC-001 | Autenticación y autorización por roles | [`contract_uc_001_autenticación_y_autorización_por_roles.md`](contract_uc_001_autenticación_y_autorización_por_roles.md) | Contrato AcredIA grupo borisAngulo para Autenticación y autorización por roles (agrupa FSD-UC-001 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 47 | PC-002 | Creación y gestión de procesos de acreditación | [`contract_uc_002_creación_y_gestión_de_procesos_de_acredi.md`](contract_uc_002_creación_y_gestión_de_procesos_de_acredi.md) | Contrato AcredIA grupo borisAngulo para Creación y gestión de procesos de acreditación (agrupa FSD-UC-002 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 48 | PC-003 | Gestión de fases y cierre con pendientes | [`contract_uc_003_gestión_de_fases_y_cierre_con_pendientes.md`](contract_uc_003_gestión_de_fases_y_cierre_con_pendientes.md) | Contrato AcredIA grupo borisAngulo para Gestión de fases y cierre con pendientes (agrupa FSD-UC-002 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 49 | PC-004 | Carga y versionado de evidencias | [`contract_uc_004_carga_y_versionado_de_evidencias.md`](contract_uc_004_carga_y_versionado_de_evidencias.md) | Contrato AcredIA grupo borisAngulo para Carga y versionado de evidencias vinculadas a criterio (agrupa FSD-UC-003 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 50 | PC-005 | Protección ante borrado destructivo | [`contract_uc_005_protección_ante_borrado_destructivo.md`](contract_uc_005_protección_ante_borrado_destructivo.md) | Contrato AcredIA grupo borisAngulo para Protección ante borrado o reemplazo destructivo (agrupa FSD-UC-003 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 51 | PC-006 | Flujo observaciones DUEA ↔ carrera | [`contract_uc_006_flujo_observaciones_duea___carrera.md`](contract_uc_006_flujo_observaciones_duea___carrera.md) | Contrato AcredIA grupo borisAngulo para Flujo de observaciones DUEA ↔ carrera (agrupa FSD-UC-004 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 52 | PC-007 | Panel estado semáforo por carrera | [`contract_uc_007_panel_estado_semáforo_por_carrera.md`](contract_uc_007_panel_estado_semáforo_por_carrera.md) | Contrato AcredIA grupo borisAngulo para Panel de estado con semáforo por carrera y facultad (agrupa FSD-UC-005 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 53 | PC-008 | Alertas automáticas plazos e hitos | [`contract_uc_008_alertas_automáticas_plazos_e_hitos.md`](contract_uc_008_alertas_automáticas_plazos_e_hitos.md) | Contrato AcredIA grupo borisAngulo para Alertas automáticas por plazos e hitos (agrupa FSD-UC-006 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 54 | PC-009 | Generación reporte ejecutivo PDF ≤2 clics | [`contract_uc_009_generación_reporte_ejecutivo_pdf_≤2_clic.md`](contract_uc_009_generación_reporte_ejecutivo_pdf_≤2_clic.md) | Contrato AcredIA grupo borisAngulo para Generación de reporte ejecutivo PDF en ≤ 2 clics (agrupa FSD-UC-007 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 55 | PC-010 | Importación masiva actividades | [`contract_uc_010_importación_masiva_actividades.md`](contract_uc_010_importación_masiva_actividades.md) | Contrato AcredIA grupo borisAngulo para Importación masiva de actividades por planilla (agrupa FSD-UC-002 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 56 | PC-011 | Gestión usuarios y asignación roles | [`contract_uc_011_gestión_usuarios_y_asignación_roles.md`](contract_uc_011_gestión_usuarios_y_asignación_roles.md) | Contrato AcredIA grupo borisAngulo para Gestión de usuarios y asignación de roles (agrupa FSD-UC-001 canónico): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 57 | PC-012 | Acceso evaluador externo alcance mínimo | [`contract_uc_012_acceso_evaluador_externo_alcance_mínimo.md`](contract_uc_012_acceso_evaluador_externo_alcance_mínimo.md) | Contrato AcredIA grupo borisAngulo para Acceso de evaluador externo con alcance mínimo (agrupa FSD-UC-EXT-004 — GAP-002c): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 58 | PC-013 | Vista pública estado acreditación | [`contract_uc_013_vista_pública_estado_acreditación.md`](contract_uc_013_vista_pública_estado_acreditación.md) | Contrato AcredIA grupo borisAngulo para Vista pública de estado de acreditación (agrupa FSD-UC-EXT-001 — GAP-001): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |
| 59 | PC-014 | Bandeja técnico operativo DUEA | [`contract_uc_014_bandeja_técnico_operativo_duea.md`](contract_uc_014_bandeja_técnico_operativo_duea.md) | Contrato AcredIA grupo borisAngulo para Bandeja técnico operativo DUEA (agrupa FSD-UC-EXT-002 — GAP-002a): Role·Task·Context·Reasoning·Stop·Output con invariantes, failure_modes y Gherkin; trazado a FSD-UC canónico del flujo de acreditación UMSS. |

## Convención de archivos

| Prefijo | Familia |
|---------|---------|
| `contract_sdlc_*` | Orquestación SDLC (MADR, `ACTIVA EL CONTRATO DE PROMPT`) |
| `contract_ia_*` | Componentes IA en producción (JSON Schema, HITL) |
| `contract_nfr_*` | Verificación ISO 25010 / NFR-IA |
| `contract_fsd_*` | Casos de uso FSD equipo aylenGonzales + MOD-DASH backend |
| `contract_uc_*` | Casos de uso FSD equipo borisAngulo |

## Fuentes originales

| Ruta | Contenido |
|------|-----------|
| `team/alexAlvarez/docs/06_prompt_contracts/` | PC-SIG SDLC canónicos |
| `team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md` | PC-SIG-01…12 runtime (extraídos) |
| `team/Marlene/06_prompt_contracts/` | PC-NFR-*.prompt.md |
| `team/aylenGonzales/06_prompt_contracts/` | PC-005…007 |
| `app/sigesa-backend/.cursor/prompts/reporting_dashboard.prompt.md` | PC-MOD-DASH-01 (promovido) |
| `team/borisAngulo/docs/04_fsd/prompt-contracts.md` | PC-001…014 (extraídos) |

## Contratos no incluidos

- **PC-L01…L07:** stubs en `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` §6 (plantilla resumida, no contrato ejecutable completo).
- **Prompts de sesión** en `team/alexAlvarez/docs/prompts/` (tareas ad hoc sin ID PC-SIG).
- **Skills** en `.claude/skills/` y `.cursor/skills/` (capacidades reutilizables, no contratos versionados).
