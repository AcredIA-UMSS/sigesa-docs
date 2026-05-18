# SIGESA / AcredIA — Release v1.0.0

## Sistema de Evaluación y Acreditación de Carreras · Universidad Mayor de San Simón (UMSS)

| Control documental | Valor |
|--------------------|--------|
| **Nombre del release** | **v1.0.0** |
| **Fecha de publicación** | 14/05/2026 |
| **Estado del release** | **Publicado — línea base documental y de gobernanza** (repositorio `sigesa-docs`) |
| **Clasificación del documento** | Release notes · Governance report · AI engineering & compliance report |
| **Versión del informe** | 2.1 — paquete documental Marlene integrado |
| **Ubicación canónica** | `team/Marlene/10_aportes/release-1.0.0.md` |
| **Fuentes canónicas** | `docs/LFSD.md` · `team/Marlene/01_brd/BRD_v1.md` · `03_prd/PRD.md` · `04_fsd/*` · `09_trazabilidad/matriz_trazabilidad.md` · `09_trazabilidad/metricas_ai_sdlc.md` · `AGENTS.md` (raíz) · `08_agents/ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md` |
| **Réplicas repo** | `matriz_trazabilidad.md` · `metricas_ai_sdlc.md` (raíz) |

---

# Parte A — Información general del release

## A.1 Objetivo estratégico

Institucionalizar una **línea base única** de especificación, trazabilidad y control de evolución para **SIGESA**, de modo que la **DUEA**, **facultades** y **proveedor tecnológico** operen con:

1. **Trazabilidad extremo a extremo** desde necesidades de mercado (MRD) hasta pruebas y KPIs (PRD/FSD/LFSD).  
2. **Aseguramiento de calidad** explícito (Gherkin, TC, NFR ISO/IEC 25010).  
3. **Gobernanza de IA** en el ciclo de vida (AI-SDLC) con métricas auditables y umbrales.  
4. **Control de deriva** (*spec drift*) entre documentación y artefactos de implementación futuros.

## A.2 Alcance funcional (declaración de límites)

| Capa | Incluido en v1.0.0 | Excluido o diferido |
|------|---------------------|---------------------|
| **Documentación** | MRD, PRD referenciado, FSD/LFSD, matrices, métricas IA, AGENTS, diagramas Mermaid | — |
| **Producto software** | Especificado y trazado (**FSD-UC-001 … UC-012** + capacidades §2.1 LFSD) | Implementación según tablero de código (repositorio aplicativo externo) |
| **Integraciones** | SMTP, S3, PDF internos (diseño) | SIIS / ERP tiempo real (**v2**, LFSD §2.2) |
| **IA avanzada** | Métricas, skills, reglas Cursor, prompt-contratos LFSD §7 | Clasificación autónoma de evidencias (**v2**, LFSD §2.2) |

## A.3 Stakeholders involucrados

| Rol | Organización | Interés en v1.0.0 |
|-----|----------------|-------------------|
| Sponsor / buyer | Jefatura DUEA UMSS | Gobernanza, reportes, riesgo reputacional CEUB/ARCU-SUR |
| Usuario intensivo | Técnicos DUEA [TD] | Flujo de dictamen y trazabilidad |
| Usuario primario | Coordinación carrera [CC] | Carga y versionado de evidencias |
| Gobierno académico | Decanatos / Vicerrectorado [S3 MRD] | Semáforos y síntesis |
| Comunidad | Estudiantes / egresados [S4 MRD] | Portal público controlado |
| Proveedor | Grupo AcredIA / desarrollo | Contratos técnicos claros |
| Cumplimiento | DTI / seguridad UMSS | TLS, datos, auditoría |

## A.4 Resumen ejecutivo institucional

La UMSS enfrenta ciclos de **acreditación de carrera** bajo exigencias de **evidencia trazable**, **plazos** y **coordinación multiactor** (carrera ↔ DUEA ↔ instancias externas). SIGESA se define como plataforma que **centraliza el ciclo documental**, **formaliza el flujo de aprobación** y **habilita inteligencia gerencial** sin sustituir el juicio institucional. La versión **v1.0.0** del **paquete documental** establece la **cadena de confianza** entre lo que el mercado y la política institucional exigen (MRD), lo que el producto promete (PRD) y lo que el sistema debe hacer (FSD/LFSD), incluyendo **controles de IA** en el ciclo de ingeniería para evitar deriva normativa o alucinaciones en asistencias futuras (**RB-11**).

## A.5 Entregables del paquete documental Marlene (v1.0.0)

| Carpeta | Artefacto | Propósito |
|---------|-----------|-----------|
| `01_brd/` | `BRD_v1.md` | Visión y necesidades de negocio |
| `03_prd/` | `PRD.md`, `user_stories.md`, `roadmap.md`, `user_journeys.md` | Producto e historias PRD-US-001…022 |
| `04_fsd/` | `casos_uso.md`, `gherkin.md`, `reglas_negocio.md`, `modelo_datos.md`, `api_contracts.md`, `glosario.md` | Especificación funcional UC-001…012 |
| `05_nfr/` | `NFR_ISO25010.md` | Calidad ISO/IEC 25010 (NFR-001…013) |
| `06_prompt_contracts/` | `prompt_contracts.md` | PC-UC y contratos IA |
| `07_diagramas/` | `UC01–UC03_*`, `modelo_er.mmd`, `gantt.mmd` | Secuencia, estado, ER, cronograma CEUB |
| `08_agents/` | `ARQ_Mermaid_*`, `agents/SKILLS.md`, `mmd/D-*` | Trazabilidad diagramas y skills |
| `09_trazabilidad/` | `matriz_trazabilidad.md`, `metricas_ai_sdlc.md` | Matriz E2E y métricas AI-SDLC |
| `10_aportes/` | **Este documento** | Release notes y compliance |

**Objetivos de release documentales (RO):**

| ID | Objetivo | Criterio |
|----|----------|----------|
| RO-01 | Trazabilidad E2E | `09_trazabilidad/matriz_trazabilidad.md` publicado |
| RO-02 | Métricas IA responsable | `09_trazabilidad/metricas_ai_sdlc.md` publicado |
| RO-03 | Operación multi-agente | `AGENTS.md` + `08_agents/agents/SKILLS.md` |
| RO-04 | Comunicación de versión | `10_aportes/release-1.0.0.md` |

---

# Parte B — Trazabilidad completa MRD → PRD → FSD

## B.1 Principios de la matriz

| Principio | Descripción |
|-----------|-------------|
| **Bidireccionalidad** | Cada fila `TR-xxx` es navegable desde MRD, PRD o FSD; los IDs de columna permiten pivotes en herramientas ALM. |
| **Cobertura E2E** | Objetivo de negocio ↔ segmento/persona ↔ JTBD ↔ REQ ↔ NFR ↔ historia ↔ UC ↔ reglas ↔ Gherkin ↔ API ↔ módulo ↔ TC ↔ KPI ↔ riesgo. |
| **Normalización** | Se conservan los identificadores **MRD-N-xx** y **PRD-REQ-xx** tal como en `docs/LFSD.md` §11; **TR-xx** añade unicidad de fila cuando un mismo MRD-N agrupa varios flujos. |
| **Estado** | `DOC_DONE` artefacto en repo · `APP_PLAN` código según LFSD §2.5 · `APP_DONE` cuando el repositorio de implementación certifique TC. |

## B.2 Objetivos de negocio vinculados (OBJ) — capa MRD

| OBJ-ID | Objetivo | Origen conceptual |
|--------|----------|-------------------|
| OBJ-01 | Fuente única de verdad documental | MRD §4, P7 |
| OBJ-02 | Reducir costo de coordinación y retrabajo | MRD §4.1, JTBD S1/S2 |
| OBJ-03 | Visibilidad gerencial y transparencia | MRD §2.4, S3/S4 |
| OBJ-04 | Cumplimiento plazos y notificaciones | MRD convocatorias, S2-J1 |
| OBJ-05 | Soberanía de acceso institucional | Política UMSS, RB-06 |

## B.3 Matriz maestra de trazabilidad (MRD → PRD → FSD + ingeniería)

> **Leyenda criticidad:** C1 acreditación / cumplimiento normativo · C2 operación DUEA · C3 soporte.  
> **Evidencia:** trazas a prototipo Hi-Fi / Bitácora / TC según LFSD §9.1 y §11.

| TR-ID | OBJ | Segmento MRD | Persona (ref. MRD §6) | JTBD-ID | MRD necesidad | PRD-REQ | PRD-US (LFSD §4) | FSD-UC | NFR (ISO 25010) | RB / BR | Escenario Gherkin (LFSD §4) | API-ID | MOD-ID | TC-ID | KPI-ID | RISK-ID | Estado doc | Estado app | Criticidad | Responsable matriz | Dependencias cruzadas | Evidencia validación |
|-------|-----|----------------|------------------------|----------|-----------------|---------|-------------------|--------|-----------------|-----------|------------------------------|--------|--------|--------|--------|---------|-------------|------------|------------|----------------------|-------------------------|------------------------|
| TR-01 | OBJ-05 | S1/S2 | María Elena [CC], Andrea [TD] | S2-J2 | MRD-N-06 | PRD-REQ-001,002 | PRD-US-001,002 | FSD-UC-001 | NFR-005,007 | RB-06 | GH-UC001-S01,S02 | API-AUTH-LOGIN | MOD-AUTH | TC-01,02 | KPI-LOGIN | RISK-ACC-01 | DOC_DONE | APP_PLAN | C1 | Tech Lead + DTI | JD alta usuarios | TC-01/02, revisión TLS |
| TR-02 | OBJ-01 | S1 | María Elena [CC] | S1-J1 | MRD-N-01 | PRD-REQ-003,004 | PRD-US-003,004,005 | FSD-UC-002 | NFR-006,009,013 | RB-02,04,BR-015 | GH-UC002-S01,S02 | API-DOC-POST | MOD-DOCS | TC-03,04,05 | KPI-EVID | RISK-STOR-01 | DOC_DONE | APP_PLAN | C1 | CC referente + Dev | TR-01 auth | Bitácora 3 carga 96,66% |
| TR-03 | OBJ-02 | S2 | Andrea [TD] | S2-J1 | MRD-N-03 (WF) | PRD-REQ-005 | PRD-US-006,007,008 | FSD-UC-003 | NFR-003,013 | RB-03,BR-013,014 | GH-UC003-S01–S03 | API-WF-PATCH | MOD-WF | TC-06,07,08 | KPI-SUBFASE | RISK-SMTP-01 | DOC_DONE | APP_PLAN | C1 | TD Lead | TR-02 documentos | Panel TD validado LFSD |
| TR-04 | OBJ-03 | S3/S2 | Claudia [JD] | S3-J1 | MRD-N-03 (Dash) | PRD-REQ-006 | PRD-US-009,010 | FSD-UC-004 | NFR-001,004,008 | RB-09,RB-05 | GH-UC004-S01 | API-DASH-GET | MOD-DASH | TC-09,10 | KPI-DASH | RISK-NET-01 | DOC_DONE | APP_PLAN | C2 | JD DUEA | TR-03 estados | CSAT 8,67/10 JD |
| TR-05 | OBJ-03 | S2/S3 | Claudia [JD] | S2-J2 | MRD-N-04 | PRD-REQ-007 | PRD-US-011 | FSD-UC-005 | NFR-002,013 | RB-07 | GH-UC005-S01 | API-REP-PDF | MOD-REP | TC-11,12 | KPI-PDF | RISK-STOR-01 | DOC_DONE | APP_PLAN | C2 | JD DUEA | TR-04 datos | NFR-002 E2E |
| TR-06 | OBJ-04 | S1/S2 | Andrea [TD] | S1-J2 | MRD-N-05 | PRD-REQ-008 | (notif.) | FSD-UC-002,003 | NFR-003 | — | Implícito GH-UC002/003 | API-NOTIF-OUT | MOD-NOTIF | TC-13 | KPI-NOTIF | RISK-SMTP-01 | DOC_DONE | APP_PLAN | C2 | DevOps | SMTP institucional | Log envío ≤15 min |
| TR-07 | OBJ-01 | S1/S2 | Andrea [TD] | S2-J1 | MRD-N-08 | PRD-REQ-009 | — | T-008 | NFR-001 | — | TC-14 escenario | API-SEARCH | MOD-SEARCH | TC-14 | KPI-SEARCH | RISK-STOR-01 | DOC_DONE | APP_PLAN | C3 | Dev | Índice BD | k6 p95 |
| TR-08 | OBJ-03 | S4 | Valeria [P] | S4-J1 | MRD §5 S4 | PRD-REQ-012 | — | FSD-Portal §2.1 | NFR-004,008 | RB-07 | Lectura pública | API-PUBLIC | MOD-PUB | TC-PUB-01 | KPI-PUB | RISK-NOM-01 | DOC_DONE | APP_PLAN | C2 | JD + Comunicación | TR-04 publicación | UAT contenido público |
| TR-09 | OBJ-02 | S2 | Andrea [TD] | S2-J2 | Transversal | T-009 | — | Transversal | NFR-013 | RB-04 | Todas acciones | internal AUDIT | MOD-AUD | TC-AUD-01 | KPI-AUD | RISK-ACC-01 | DOC_DONE | APP_PLAN | C1 | Dev | TR-01..005 | E2E 100% acciones |
| TR-10 | OBJ-01 | S2 | Lic. Sevilla [JD] | S2-J3 | MRD P7 | T-012 | — | FSD-UC-003 | RB-08,RB-01 | Taxonomía | API-ADMIN-TAX | MOD-ADMIN | TC-TAX-01 | KPI-TAX | RISK-NORM-01 | DOC_DONE | APP_PLAN | C1 | JD + PM | BR-013 unicidad | Workshop taxonomía |
| TR-11 | OBJ-02 | S1 | Carlos docente | S1-J3 | MRD-N-01 | PRD-REQ-003 | PRD-US-003 | FSD-UC-002 | NFR-009 | RB-10 | UX errores | API-DOC-POST | MOD-DOCS | TC-UX-01 | KPI-UX | RISK-NOM-01 | DOC_DONE | APP_PLAN | C3 | UX + Dev | TR-02 | Heurística LFSD §9.1 |
| TR-12 | OBJ-04 | S2 | DevOps | S2-J1 | MRD §14 | T-011 | — | Respaldo §2.1 | NFR-004,006 | — | Runbook | API-OPS-BKP | MOD-OPS | TC-BKP-01 | KPI-RPO | RISK-STOR-01 | DOC_DONE | APP_PLAN | C2 | DevOps | Almacenamiento | Checklist backup |

**Notas de consistencia documental**

1. **MRD-N-03** aparece dos veces en LFSD §11 (flujo aprobación vs dashboard); en esta matriz se separa semánticamente en **TR-03** (workflow) y **TR-04** (dashboard), manteniendo el mismo código MRD para auditoría externa al LFSD.  
2. **PRD-REQ-012** y ruta `/portal-publico` figuran en LFSD §9; alineación con `team/aylenGonzales/PRD_v1.md` debe mantenerse por **ADR** si hubiera divergencia de numeración.  
3. **API-IDs** son lógicos; el contrato OpenAPI definitivo vive en el repositorio de implementación cuando exista.

## B.4 Vista inversa FSD → MRD (bidireccionalidad)

| FSD-UC | Filas TR | MRD cubiertos |
|--------|----------|---------------|
| UC-001 | TR-01 | MRD-N-06 |
| UC-002 | TR-02, TR-06, TR-11 | MRD-N-01, MRD-N-05 |
| UC-003 | TR-03, TR-06, TR-10 | MRD-N-03 (WF), P7 |
| UC-004 | TR-04 | MRD-N-03 (Dash) |
| UC-005 | TR-05 | MRD-N-04 |
| Portal | TR-08 | MRD S4 |
| Auditoría | TR-09 | Transversal MRD P6 |
| Buscador | TR-07 | MRD-N-08 |
| Backup | TR-12 | MRD riesgo/adopción |

## B.5 Garantías de alineación negocio → producto → funcionalidad

| Control | Método | Frecuencia |
|---------|--------|------------|
| Revisión de filas TR | Comité de cambio (JD + Tech Lead) | Por release |
| Diff LFSD vs PRD | Checklist REQ-IDs | Mensual en desarrollo activo |
| Diff MRD vs OBJ | PM revisa segmentos S1–S4 | Por trimestre académico |

---

# Parte C — Métricas AI-SDLC (compliance de ingeniería de IA)

## C.1 Marco de aplicación

Las métricas aplican a: **prompt-contratos** (LFSD §7), **agentes** (`AGENTS.md`), **automatizaciones CI** asistidas y **cualquier asistente** que genere texto o código contra el repositorio `sigesa-docs` o el código aplicativo.

## C.2 M-AI-PCOV — Prompt Coverage (obligatoria)

| Atributo | Definición |
|----------|------------|
| **ID** | M-AI-PCOV |
| **Nombre** | Prompt Coverage |
| **Objetivo** | Medir el porcentaje de **funcionalidades, módulos o escenarios críticos** cubiertos por **prompts formales**, **contratos IA** o **automatizaciones** gobernadas. |
| **Fórmula** | \(\text{PCOV} = \frac{\left| \{ \text{UC} \cup \text{MOD} \cup \text{GH} \}_{\text{cubiertos}} \right|}{\left| \{ \text{UC} \cup \text{MOD} \cup \text{GH} \}_{\text{críticos}} \right|} \times 100\%\) |
| **Método de cálculo** | 1) Inventariar conjunto crítico: FSD-UC-001…005 + MOD-AUTH, DOCS, WF, DASH, REP + escenarios Gherkin en LFSD §4. 2) Marcar como cubierto si existe prompt-contrato LFSD §7 **o** regla `CR-SIG-*` **o** skill `SKILL-SIG-*` que referencie explícitamente el ID. 3) Agregar en hoja de cálculo de gobernanza vinculada a este release. |
| **Fuente de datos** | `docs/LFSD.md` §7, `AGENTS.md`, `.cursor/rules/` (cuando desplegados), `PROMPT_MAPPING.md`. |
| **Frecuencia de medición** | Mensual en desarrollo activo; **obligatoria** en gate de release de código. |
| **Umbral aceptable** | **PCOV ≥ 90 %** en conjunto crítico C1; **100 %** para UC-002 y UC-003 antes de piloto institucional. |
| **Responsable** | Tech Lead AcredIA + QA Lead |
| **Riesgo asociado** | Funcionalidad implementada sin guía de IA ni contrato → deriva y regresiones silenciosas. |
| **Estrategia de mejora** | Priorizar prompt-contratos para UC-003 y UC-002; asignar `SKILL-SIG-04` a pipeline de revisión de PR; congelar versiones en Git tags. |
| **Acción correctiva** | Bloqueo de release si PCOV < umbral; plan de remediación en 10 días hábiles con seguimiento JD. |

## C.3 M-AI-SFID — Spec Fidelity (obligatoria)

| Atributo | Definición |
|----------|------------|
| **ID** | M-AI-SFID |
| **Nombre** | Spec Fidelity |
| **Objetivo** | Cuantificar la **fidelidad** entre cadena **MRD → PRD → FSD** y los **artefactos implementados** (código, OpenAPI, migraciones, UI). |
| **Fórmula** | \(\text{SFID} = w_1 \cdot \text{Align}_{\text{REQ}} + w_2 \cdot \text{Align}_{\text{RB}} + w_3 \cdot \text{Align}_{\text{NFR}}\) con \(w_1+w_2+w_3=1\) (por defecto \(0{,}5/0{,}3/0{,}2\)). Cada \(\text{Align}_x = 1 - \frac{\text{desviaciones}_x}{\text{checks}_x}\). |
| **Nivel esperado de alineación** | **SFID ≥ 0,92** en release candidato; **1,00** en requisitos C1 sin ADR de excepción. |
| **Método de validación** | Auditoría manual asistida: (1) muestreo de endpoints vs matriz TR; (2) tests E2E vs Gherkin; (3) revisión RB en código (flags de feature); (4) checklist NFR en pipeline (TLS, logs). |
| **Riesgos por desviación** | Incumplimiento ante auditor CEUB; pérdida de confianza de JD; retrabajo en carrera. |
| **Indicadores de inconsistencia** | REQ en código sin TR; RB implementada distinta a LFSD sin ADR; TC rojo sin issue vinculada a TR-xx. |
| **Fuente de datos** | Repositorio código + `team/Marlene/09_trazabilidad/matriz_trazabilidad.md` + resultados CI + informe QA. |
| **Frecuencia** | Cada release candidato y trimestral en mantenimiento. |
| **Umbral aceptable** | Ver nivel esperado. |
| **Responsable** | Arquitecto + QA |
| **Riesgo asociado** | “Shadow spec” en cabeza de desarrolladores o IA. |
| **Acción correctiva** | Congelación de alcance; ADR por cada excepción; actualización retroactiva de LFSD prohibida sin comité (solo forward con versión). |

## C.4 M-AI-TII — Traceability Integrity Index (métrica adicional obligatoria)

| Atributo | Definición |
|----------|------------|
| **ID** | M-AI-TII |
| **Nombre** | Traceability Integrity Index |
| **Objetivo** | Asegurar que **ningún requisito crítico** quede huérfano en la cadena TR (sin TC, sin API, sin RB cuando aplique). |
| **Fórmula** | \(\text{TII} = 1 - \frac{\text{huérfanos}_{C1}}{\text{filas TR}_{C1}}\) · Huérfano = fila TR sin al menos un TC **y** un MOD **y** un API cuando el UC sea implementado en código. |
| **Fuente de datos** | `team/Marlene/09_trazabilidad/matriz_trazabilidad.md` + export ALM + cobertura de tests vinculados por etiqueta `TR-xx`. |
| **Frecuencia** | Por sprint / release |
| **Umbral aceptable** | **TII = 1,00** antes de piloto; **≥ 0,95** en mantenimiento. |
| **Responsable** | QA Lead |
| **Riesgo asociado** | Riesgo de trazabilidad ante auditoría (no demostrable “quién probó qué”). |
| **Acción correctiva** | Crear TC y enlazar PR; prohibir merge sin etiqueta TR. |

## C.5 M-AI-HRR — Hallucination Risk Rate (métrica adicional recomendada)

| Atributo | Definición |
|----------|------------|
| **ID** | M-AI-HRR |
| **Nombre** | Hallucination Risk Rate |
| **Objetivo** | Estimar tasa de salidas IA con **afirmaciones no verificables** contra corpus aprobado (LFSD, MRD, normativa enlazada). |
| **Fórmula** | \(\text{HRR} = \frac{\text{salidas con al menos una afirmación no verificada}}{\text{salidas muestreadas}}\) (evaluación humana o panel dorado). |
| **Fuente de datos** | Muestreo de salidas de agentes; registro en hoja de revisión; golden prompts. |
| **Frecuencia** | Mensual |
| **Umbral aceptable** | **HRR ≤ 2 %** en asistencias que no son dictamen; **0 %** en textos marcados como “oficial DUEA” sin firma humana. |
| **Responsable** | Oficial de calidad IA + TD referente |
| **Riesgo asociado** | Riesgo IA reputacional / normativo. |
| **Acción correctiva** | RAG solo sobre corpus aprobado; plantillas con `rationale`; kill-switch (véase `team/Marlene/09_trazabilidad/metricas_ai_sdlc.md`). |

## C.6 Tabla resumen de métricas AI-SDLC del release

| ID | Nombre | Umbral | Responsable |
|----|--------|--------|-------------|
| M-AI-PCOV | Prompt Coverage | ≥ 90 % (100 % UC-002/003 piloto) | Tech Lead + QA |
| M-AI-SFID | Spec Fidelity | ≥ 0,92 | Arquitecto + QA |
| M-AI-TII | Traceability Integrity | ≥ 0,95 (1,00 piloto) | QA Lead |
| M-AI-HRR | Hallucination Risk Rate | ≤ 2 % asistido | TD + PM |
| M-AI-014 | Costo inferencia (ref. `09_trazabilidad/metricas_ai_sdlc.md`) | Presupuesto | JD sponsor |

---

# Parte D — Resumen de funcionalidades del release v1.0.0

## D.1 Por tipo de entrega

| Tipo | Descripción | Estado |
|------|-------------|--------|
| Especificación | LFSD/FSD completo UC-001…005, RB, NFR, ER, APIs lógicos | DOC_DONE |
| Trazabilidad | Matriz TR + `09_trazabilidad/matriz_trazabilidad.md` | DOC_DONE |
| IA-SDLC | `09_trazabilidad/metricas_ai_sdlc.md`, `AGENTS.md`, `08_agents/agents/SKILLS.md` | DOC_DONE |
| Visualización | `07_diagramas/` (UC01–03, ER, Gantt) + `08_agents/mmd/` | DOC_DONE |
| FSD detallado | `04_fsd/` (12 UC, Gherkin, API, modelo) | DOC_DONE |
| Código aplicativo | Tasks T-001…T-012 | APP_PLAN (externo a este repo) |

## D.2 Casos de uso cubiertos (especificación)

| Rango | Fuente | Diagramas secuencia/estado |
|-------|--------|------------------------------|
| UC-001 … UC-003 | `04_fsd/casos_uso.md` | `07_diagramas/UC01_*` … `UC03_*` |
| UC-004 … UC-012 | `04_fsd/casos_uso.md` | Pendientes en `07_diagramas/` (v1.1) |
| Transversal | `modelo_er.mmd`, `gantt.mmd` | ER + cronograma tipo CEUB |

Núcleo LFSD §4 (UC-001…005) ampliado a **UC-012** en el paquete Marlene (portal, auditoría, respaldos, plan de mejora).

## D.3 APIs desarrolladas (nivel diseño)

Catálogo lógico: `API-AUTH-*`, `API-DOC-*`, `API-WF-*`, `API-DASH-*`, `API-REP-*`, `API-NOTIF-*`, `API-SEARCH`, `API-PUBLIC`, `API-OPS-BKP`, `API-ADMIN-TAX` — detalle en Parte B.

## D.4 Integraciones institucionales

| Integración | Estado v1.0.0 |
|---------------|----------------|
| Correo SMTP UMSS | Especificado (NFR-003) |
| Almacenamiento institucional / cloud S3-compatible | Especificado (NFR-006) |
| SIIS / bus datos académicos | **No** v1.0.0 (LFSD §2.2) — diseño futuro en diagrama D-SEQ-005 |

## D.5 Módulos completados (documentalmente)

MOD-AUTH, MOD-DOCS, MOD-WF, MOD-DASH, MOD-REP, MOD-NOTIF, MOD-SEARCH, MOD-PUB, MOD-AUD, MOD-ADMIN, MOD-OPS.

## D.6 Validaciones críticas implementadas (en especificación)

- Justificación obligatoria en rechazo TD (`FSD-UC-003`).  
- Imposibilidad de cerrar subfase incompleta (`BR-014`, `RB-03`).  
- Versionado de evidencias (`RB-04`).  
- Dominio @umss.edu.bo (`RB-06`).  
- Reporte uso interno (`RB-07`).

---

# Parte E — Calidad y validación

## E.1 Cobertura de pruebas (objetivo producto)

| Ámbito | Meta LFSD §12 | Estado v1.0.0 |
|--------|----------------|---------------|
| Dominio core (auth, docs, wf, notif) | ≥ 80 % cobertura código | **Pendiente** código |
| E2E Playwright | Flujos UC-001…005 | **Pendiente** código |

## E.2 Cobertura Gherkin

Escenarios embebidos en LFSD §4 para UC-001…005; trazados a TC-01…TC-14 en matriz TR.

## E.3 Validación de reglas de negocio

| Mecanismo | Descripción |
|-----------|-------------|
| Tests unitarios | Reglas RB-02, RB-03, BR-014, BR-015 codificables |
| Revisión manual | RB-05 fechas convocatoria, RB-07 distribución externa |

## E.4 QA funcional y técnico

| Tipo | Evidencia esperada |
|------|-------------------|
| QA funcional | Registro de ejecución TC con resultado PASS vinculado TR-xx |
| QA técnico | Informes k6, Axe WCAG, escaneo dependencias |

## E.5 Evidencias de aceptación

- Bitácora M2 / Hi-Fi citada en LFSD §9.1 para UC-002, UC-003, UC-004.  
- Este release añade **evidencia documental** de trazabilidad (Parte B) y **gobernanza IA** (Parte C).

## E.6 Estado de cumplimiento ISO/IEC 25010 (producto cuando exista código)

| Característica | NFR IDs | Evidencia |
|----------------|---------|-----------|
| Rendimiento eficiente | NFR-001–003 | k6, monitoreo jobs PDF |
| Confiabilidad | NFR-004 | Uptime |
| Seguridad | NFR-005–007 | Auditoría config, pentest plan |
| Usabilidad / accesibilidad | NFR-008–010,012 | Axe, pruebas usuario |
| Compatibilidad | NFR-011 | Matriz browsers |
| Mantenibilidad (trazabilidad) | NFR-013 | Logs append-only |

**Declaración v1.0.0:** el **cumplimiento pleno** de ISO 25010 sobre **software en ejecución** se certifica en el **release de aplicación** (repositorio de implementación), no en el solo paquete documental; este documento define **umbrales y método de verificación**.

---

# Parte F — Riesgos y compliance

## F.1 Riesgos técnicos

| ID | Riesgo | Mitigación |
|----|--------|------------|
| RT-01 | Falla SMTP | Cola retry, alerta admin (LFSD §13) |
| RT-02 | Saturación S3/red | Límite 50 MB, colas |
| RT-03 | CVE dependencias | Escaneo CI (M-AI-011 en `09_trazabilidad/metricas_ai_sdlc.md`) |

## F.2 Riesgos funcionales

Inconsistencia de taxonomía CEUB/ARCU-SUR; mitigación: MOD-ADMIN configurable (`T-012`).

## F.3 Riesgos IA

Alucinación normativa, automatismo sin RB-11, fuga de contexto con PII — mitigación: M-AI-HRR, skills con human-in-the-loop, `AGENTS.md` §6–10.

## F.4 Riesgos de trazabilidad

Filas TR huérfanas de TC — mitigación: M-AI-TII gate.

## F.5 Riesgos de gobernanza

Aprobación de textos “oficiales” generados por IA sin JD — mitigación: RB-07 + flujo firma humana.

## F.6 Controles de auditoría

| Control | Descripción |
|---------|-------------|
| AC-01 | Log append-only NFR-013 |
| AC-02 | Matriz TR versionada en Git |
| AC-03 | ADR para excepciones a LFSD |
| AC-04 | Revisión trimestral PCOV/SFID/TII |

---

# Parte G — Roadmap evolutivo

## G.1 v1.1.0 (planeado)

- Endurecimiento portal público y CDN.  
- Buscador con índices y SLAs formales.  
- Despliegue de `.cursor/rules` CR-SIG-* en todos los IDEs del equipo.  
- Panel interno PCOV/SFID/TII en Grafana o equivalente.

## G.2 Evolución IA

- Corpus RAG curado DUEA (solo documentos aprobados).  
- Skills `SKILL-SIG-05` bajo feature flag con DPIA.

## G.3 Automatización futura

- Generación de borradores de observación TD con revisión obligatoria.  
- Validación automática de BR-014 en CI (tests de estado).

## G.4 Escalabilidad

- Workers horizontales para PDF y notificaciones; particionamiento de logs.

## G.5 Integraciones institucionales

- Lectura enriquecida desde SIIS vía bus institucional (v2).  
- SSO institucional UMSS (evaluación técnica separada).

## G.6 Observabilidad y monitoreo

- OpenTelemetry en API y jobs; SLOs alineados NFR-004 y NFR-002; alertas HER y HRR.

---

# Parte H — Firmas y registro

| Rol | Acción |
|-----|--------|
| Producto AcredIA | Publicación v1.0.0 documental |
| Jefatura DUEA | Validación institucional **pendiente** según calendario UMSS |

| Versión informe | Fecha | Nota |
|-----------------|-------|------|
| 2.0 | 14/05/2026 | Matriz MRD→PRD→FSD extendida + métricas AI-SDLC obligatorias |
| 2.1 | 14/05/2026 | Rutas paquete Marlene; entregables §A.5; UC-001…012; diagramas `07_diagramas/` |

---

*Fin del documento `team/Marlene/10_aportes/release-1.0.0.md`.*
