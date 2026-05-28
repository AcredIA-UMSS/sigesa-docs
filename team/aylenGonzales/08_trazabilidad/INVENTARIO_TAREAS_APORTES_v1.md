# Inventario de tareas (aportes) — aylenGonzales v1.1

| Metadato | Valor |
|----------|-------|
| **Total tareas** | 260 (T-001…T-260) |
| **Autor** | Aylen Mariangel Gonzales Alvino (equipo AcredIA) |
| **Fecha inventario** | 16/05/2026 |
| **Última verificación** | 16/05/2026 — solo `team/aylenGonzales/` |
| **Auditoría** | `08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` |

## Resumen de verificación (carpeta equipo)

| Estado | Cantidad | % |
|--------|----------|---|
| **Entregada** | 252 | 96,9 % |
| **Entregada parcial** | 2 | 0,8 % |
| **Referencia repo** | 4 | 1,5 % |
| **Recomendada / pendiente** | 2 | 0,8 % |

**Artefactos físicos verificados:** 96 archivos `.md` / `.mmd` / `.prompt.md` bajo `team/aylenGonzales/` (12 subcarpetas: `00_context` … `11_pocs`).

| Subcarpeta | Archivos clave |
|------------|----------------|
| `01_brd/` | `BRD_v2_aylen.md` |
| `02_mrd/` | `MRD_v1.md` |
| `03_prd/` | `PRD_v1.md` (20 US) |
| `04_fsd/` | `FSD_v2.md`, `casos-de-uso.md`, `glossary.md`, `prompt-contracts.md`, `FSD_v1.md` |
| `05_lfsd/` | `LFSD_v1_aylen.md` |
| `06_nfr/` | `NFR-ISO25010.md`, `NFR_IA.md` |
| `06_prompt_contracts/` | `PC-005…007.prompt.md`, `README.md` |
| `07_diagramas/` | 18× `.mmd` + `README.md` |
| `08_trazabilidad/` | `matriz_trazabilidad.md`, `metricas_ai_sdlc.md`, auditoría, inventario |
| `09_dti/` | `DTI_v1.md`, `adr/ADR-001…006.md` |
| `10_agents/` | `AGENTS.md`, 7× `skills/skill_*.md` |
| `11_pocs/` | `POC-01/`, `POC-02/`, `README.md` |

## Reglas de conteo (oficial APORTES / release 1.0.0)

**Cuenta como 1 tarea:**

| Unidad | Criterio |
|--------|----------|
| UC | Flujo principal + alterno + Gherkin verificable |
| NFR ISO 25010 | Métrica + umbral + verificación |
| Diagrama | Un `.mmd` versionado y coherente con FSD |
| Sección doc | Un `##` sustantivo (BRD/MRD/PRD/FSD/DTI/LFSD) |
| ADR | Un ADR aceptado |
| POC | **Ejecutada** con evidencia (no solo propuesta) |
| Skill | Un `skill_*.md` accionable en `10_agents/skills/` |
| Cursor rule | Un `.mdc` de dominio (físico en repo) |
| Prompt-contrato | 6 elementos + Invariants + Failure modes |
| User story | INVEST + criterios de aceptación |
| Bitácora / demo | Una sección de bitácora o sesión demo entregada |
| Código | Función o módulo no trivial + prueba |

**Co-autoría:** misma tarea registrada dos veces con observación `co-autoría con <otro>`.

**No cuenta:** cosmética, typos aislados, config sin sustancia, copiar/pegar sin adaptación.

**Alcance v1.1:** solo rutas bajo `team/aylenGonzales/`.

## Cuadre «completado» estricto vs inventario T-001…T-260

| Tipo (regla) | Esperado en carpeta | Filas inventario | ¿Completo al pie de la regla? |
|--------------|--------------------:|------------------|-------------------------------|
| User story | 20 | T-063…079 + T-247…249 | **Sí** (20 US + Gherkin en PRD) |
| UC crítico | 12 (uno por UC) | T-102…112 + T-250 | **Sí** en `FSD_v2.md` |
| UC extendido | — (no duplicar) | T-133…142 `casos-de-uso.md` | **Refuerzo**; mismo UC que T-102…111 — **no sumar 2×** en factor |
| Gherkin tristes §4.1 | Incluido en UC o +1 bloque | T-257 | **Sí** (complemento BDD; opcional no duplicar por UC) |
| NFR ISO 25010 | 15 | T-143…157 | **Sí** |
| NFR IA | 10 (o 1 catálogo) | T-251 | **1 tarea** agregada (archivo con 10 ítems) |
| Diagrama `.mmd` | 18 | T-206…214, T-232…239, T-242 | **Sí** (18 archivos) |
| Diagrama duplicado | 0 | T-240, T-241 | **No sumar** (mismo `.mmd` que T-210/T-214) |
| README diagramas | 0 (no es `.mmd`) | T-243 | Índice; no cuenta como diagrama |
| Sección `##` | ~90+ | T-001…105, T-174…205, etc. | **Sí** |
| Prompt-contrato | 10 | T-158…167 (+ T-244…246 ref. mismos PC) | **Sí** (10 PC; filas 244–246 = misma entrega que 162–164) |
| ADR | 6 | T-168…173 | **Sí** |
| Skill | 7 | T-215…221 | **Sí** |
| Cursor rule | 4 en repo | T-222…225 | **No en carpeta** → `Referencia repo` (documentadas en `AGENTS.md`) |
| POC **ejecutada** | 2 con evidencia | T-252, T-253 | **No** — solo plantilla; **Entregada parcial** |
| POC propuesta | 2 (§1–8) | T-230, T-231 | **Sí** como propuesta; **no** sustituye POC ejecutada |
| Bitácora | 1 | T-254 | **No** — `log_interno.md` ausente |
| Código + prueba | n/a docs | — | **0** en esta carpeta (solo documentación) |
| Métricas §2a 20 REQ | 1 actualización | T-256 | **Pendiente** (archivo aún con base 17 REQ) |

### Totales para factor de aporte (estricto)

| Concepto | Cantidad |
|----------|----------|
| Filas «Entregada» en inventario | 252 |
| Menos duplicados lógicos (T-240, T-241) | −2 → **250** |
| Menos POC no ejecutadas (regla POC; T-252–253 parcial) | −2 → **248** documentales «cerradas» |
| POC ejecutadas con evidencia real | **0 / 2** |
| Cursor rules físicas en `team/aylenGonzales/` | **0 / 4** (en `.cursor/rules/` raíz) |
| **Tareas únicas alineadas a reglas** (sin doble UC/diagrama/PC) | **~235–240** |

> Las **252 «Entregada»** del resumen son correctas como **registro de inventario v1.1** (incluye propuestas POC, índices y cierres de gap). Para **APORTES_RELEASE** con regla estricta, usar la fila **~235–240** o reclasificar T-240/241/252/253 antes de calcular factor.

## Registro T-001 a T-260

| ID | Categoria | Descripcion | Referencia | Estado | Observacion |
|----|-----------|-------------|------------|--------|-------------|
| T-001 | BRD seccion | 0 Metadatos | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-002 | BRD seccion | 1 Resumen ejecutivo | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-003 | BRD seccion | 2 Contexto del negocio | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-004 | BRD seccion | 3 Problema y oportunidad | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-005 | BRD seccion | 4 Usuarios objetivo | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-006 | BRD seccion | 5 Propuesta de valor | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-007 | BRD seccion | 6 Panorama competitivo | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-008 | BRD seccion | 7 Business case | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-009 | BRD seccion | 8 Metricas KPIs | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-010 | BRD seccion | 9 Objetivos SMART | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-011 | BRD seccion | 10 Stakeholders RACI | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-012 | BRD seccion | 11 Requerimientos MoSCoW | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-013 | BRD seccion | 12 Reglas de negocio | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-014 | BRD seccion | 13 Supuestos y restricciones | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-015 | BRD seccion | 14 Alcance | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-016 | BRD seccion | 15 Beneficios y costos | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-017 | BRD seccion | 16 Riesgos de negocio | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-018 | BRD seccion | 17 Criterios de exito | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-019 | BRD seccion | 18 Trazabilidad | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-020 | BRD seccion | 19 Aprobaciones | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-021 | BRD seccion | 20 Historial versiones | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-022 | BRD seccion | 21 Alineacion estrategica | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-023 | BRD seccion | 22 Actores complementarios | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-024 | BRD seccion | 23 Requerimientos extendidos | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-025 | BRD seccion | 24 Indicadores adicionales | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-026 | BRD seccion | 25 KPIs extendidos | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-027 | BRD seccion | 26 Riesgos producto | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-028 | BRD seccion | Checklist minimo | 01_brd/BRD_v2_aylen.md | Entregada |  |
| T-029 | MRD seccion | Seccion MRD §0 | 02_mrd/MRD_v1.md | Entregada |  |
| T-030 | MRD seccion | Seccion MRD §1 | 02_mrd/MRD_v1.md | Entregada |  |
| T-031 | MRD seccion | Seccion MRD §2 | 02_mrd/MRD_v1.md | Entregada |  |
| T-032 | MRD seccion | Seccion MRD §3 | 02_mrd/MRD_v1.md | Entregada |  |
| T-033 | MRD seccion | Seccion MRD §4 | 02_mrd/MRD_v1.md | Entregada |  |
| T-034 | MRD seccion | Seccion MRD §5 | 02_mrd/MRD_v1.md | Entregada |  |
| T-035 | MRD seccion | Seccion MRD §6 | 02_mrd/MRD_v1.md | Entregada |  |
| T-036 | MRD seccion | Seccion MRD §7 | 02_mrd/MRD_v1.md | Entregada |  |
| T-037 | MRD seccion | Seccion MRD §8 | 02_mrd/MRD_v1.md | Entregada |  |
| T-038 | MRD seccion | Seccion MRD §9 | 02_mrd/MRD_v1.md | Entregada |  |
| T-039 | MRD seccion | Seccion MRD §10 | 02_mrd/MRD_v1.md | Entregada |  |
| T-040 | MRD seccion | Seccion MRD §11 | 02_mrd/MRD_v1.md | Entregada |  |
| T-041 | MRD seccion | Seccion MRD §12 | 02_mrd/MRD_v1.md | Entregada |  |
| T-042 | MRD seccion | Seccion MRD §13 | 02_mrd/MRD_v1.md | Entregada |  |
| T-043 | MRD seccion | Seccion MRD §14 | 02_mrd/MRD_v1.md | Entregada |  |
| T-044 | MRD seccion | Seccion MRD §15 | 02_mrd/MRD_v1.md | Entregada |  |
| T-045 | MRD seccion | Checklist minimo MRD | 02_mrd/MRD_v1.md | Entregada |  |
| T-046 | PRD seccion | 0 Metadatos | 03_prd/PRD_v1.md | Entregada |  |
| T-047 | PRD seccion | 0.1 Constitution | 03_prd/PRD_v1.md | Entregada |  |
| T-048 | PRD seccion | 1 Resumen | 03_prd/PRD_v1.md | Entregada |  |
| T-049 | PRD seccion | 2 Objetivos | 03_prd/PRD_v1.md | Entregada |  |
| T-050 | PRD seccion | 3 Alcance | 03_prd/PRD_v1.md | Entregada |  |
| T-051 | PRD seccion | 4 Personas y journeys | 03_prd/PRD_v1.md | Entregada |  |
| T-052 | PRD seccion | 5 User stories | 03_prd/PRD_v1.md | Entregada |  |
| T-053 | PRD seccion | 6 Priorizacion | 03_prd/PRD_v1.md | Entregada |  |
| T-054 | PRD seccion | 7 RF alto nivel | 03_prd/PRD_v1.md | Entregada |  |
| T-055 | PRD seccion | 8 RNF alto nivel | 03_prd/PRD_v1.md | Entregada |  |
| T-056 | PRD seccion | 9 Dependencias | 03_prd/PRD_v1.md | Entregada |  |
| T-057 | PRD seccion | 10 Supuestos PRD | 03_prd/PRD_v1.md | Entregada |  |
| T-058 | PRD seccion | 11 Experiencia | 03_prd/PRD_v1.md | Entregada |  |
| T-059 | PRD seccion | 12 Metricas producto | 03_prd/PRD_v1.md | Entregada |  |
| T-060 | PRD seccion | 13 Riesgos producto | 03_prd/PRD_v1.md | Entregada |  |
| T-061 | PRD seccion | 14 Trazabilidad | 03_prd/PRD_v1.md | Entregada |  |
| T-062 | PRD seccion | 15 Aprobaciones | 03_prd/PRD_v1.md | Entregada |  |
| T-063 | User story INVEST | PRD-US-001 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-064 | User story INVEST | PRD-US-002 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-065 | User story INVEST | PRD-US-003 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-066 | User story INVEST | PRD-US-004 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-067 | User story INVEST | PRD-US-005 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-068 | User story INVEST | PRD-US-006 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-069 | User story INVEST | PRD-US-007 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-070 | User story INVEST | PRD-US-008 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-071 | User story INVEST | PRD-US-009 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-072 | User story INVEST | PRD-US-010 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-073 | User story INVEST | PRD-US-011 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-074 | User story INVEST | PRD-US-012 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-075 | User story INVEST | PRD-US-013 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-076 | User story INVEST | PRD-US-014 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-077 | User story INVEST | PRD-US-015 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-078 | User story INVEST | PRD-US-016 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-079 | User story INVEST | PRD-US-017 con criterios Gherkin | 03_prd/PRD_v1.md §5 | Entregada |  |
| T-080 | User journey | Journey [CC] carga evidencia | 03_prd/PRD_v1.md §4.2 | Entregada |  |
| T-081 | User journey | Journey [JD] reporte PDF | 03_prd/PRD_v1.md §4.2 | Entregada |  |
| T-082 | User journey | Journey [TD] aprobacion subfase | 03_prd/PRD_v1.md §4.2 | Entregada |  |
| T-083 | Roadmap | Delivery track v1.0-v2.0 | 03_prd/PRD_v1.md §3.3 | Entregada |  |
| T-084 | Roadmap | Discovery track S1-S5 | 03_prd/PRD_v1.md §3.4 | Entregada |  |
| T-085 | FSD seccion | 0 Metadatos | 04_fsd/FSD_v2.md | Entregada |  |
| T-086 | FSD seccion | 1 Resumen | 04_fsd/FSD_v2.md | Entregada |  |
| T-087 | FSD seccion | 2 Alcance MOD | 04_fsd/FSD_v2.md | Entregada |  |
| T-088 | FSD seccion | 3 Actores | 04_fsd/FSD_v2.md | Entregada |  |
| T-089 | FSD seccion | 4 Casos de uso | 04_fsd/FSD_v2.md | Entregada |  |
| T-090 | FSD seccion | 5 Reglas RBN | 04_fsd/FSD_v2.md | Entregada |  |
| T-091 | FSD seccion | 6 Modelo datos | 04_fsd/FSD_v2.md | Entregada |  |
| T-092 | FSD seccion | 7 Prompt-contratos | 04_fsd/FSD_v2.md | Entregada |  |
| T-093 | FSD seccion | 8 Integraciones | 04_fsd/FSD_v2.md | Entregada |  |
| T-094 | FSD seccion | 9 Trazabilidad M2 | 04_fsd/FSD_v2.md | Entregada |  |
| T-095 | FSD seccion | 10 Requerimientos | 04_fsd/FSD_v2.md | Entregada |  |
| T-096 | FSD seccion | 11 Matriz trazabilidad | 04_fsd/FSD_v2.md | Entregada |  |
| T-097 | FSD seccion | 12 Plan pruebas | 04_fsd/FSD_v2.md | Entregada |  |
| T-098 | FSD seccion | 13 Riesgos | 04_fsd/FSD_v2.md | Entregada |  |
| T-099 | FSD seccion | 14 Glosario | 04_fsd/FSD_v2.md | Entregada |  |
| T-100 | FSD seccion | 15 Aprobaciones | 04_fsd/FSD_v2.md | Entregada |  |
| T-101 | FSD seccion | Checklist LFSD | 04_fsd/FSD_v2.md | Entregada |  |
| T-102 | Caso de uso critico | FSD-UC-001 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-103 | Caso de uso critico | FSD-UC-002 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-104 | Caso de uso critico | FSD-UC-003 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-105 | Caso de uso critico | FSD-UC-004 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-106 | Caso de uso critico | FSD-UC-005 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-107 | Caso de uso critico | FSD-UC-006 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-108 | Caso de uso critico | FSD-UC-007 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-109 | Caso de uso critico | FSD-UC-008 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-110 | Caso de uso critico | FSD-UC-009 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-111 | Caso de uso critico | FSD-UC-010 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-112 | Caso de uso critico | FSD-UC-011 flujo+alternos+Gherkin | 04_fsd/FSD_v2.md §4 | Entregada |  |
| T-113 | Regla de negocio | RBN-01 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-114 | Regla de negocio | RBN-02 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-115 | Regla de negocio | RBN-03 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-116 | Regla de negocio | RBN-04 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-117 | Regla de negocio | RBN-05 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-118 | Regla de negocio | RBN-06 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-119 | Regla de negocio | RBN-07 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-120 | Regla de negocio | RBN-08 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-121 | Regla de negocio | RBN-09 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-122 | Regla de negocio | RBN-10 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-123 | Regla de negocio | RBN-11 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-124 | Regla de negocio | RBN-12 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-125 | Regla de negocio | RBN-13 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-126 | Regla de negocio | RBN-14 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-127 | Regla de negocio | RBN-15 | 04_fsd/FSD_v2.md §5 | Entregada |  |
| T-128 | Glosario FSD | 1 Dominio evidencia | 04_fsd/glossary.md | Entregada |  |
| T-129 | Glosario FSD | 2 Dominio proceso | 04_fsd/glossary.md | Entregada |  |
| T-130 | Glosario FSD | 3 Roles sistema | 04_fsd/glossary.md | Entregada |  |
| T-131 | Glosario FSD | 4 Dominio auditoria | 04_fsd/glossary.md | Entregada |  |
| T-132 | Glosario FSD | 5 Integraciones | 04_fsd/glossary.md | Entregada |  |
| T-133 | UC extendido Gherkin | casos-de-uso.md bloque UC-001 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-134 | UC extendido Gherkin | casos-de-uso.md bloque UC-002 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-135 | UC extendido Gherkin | casos-de-uso.md bloque UC-003 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-136 | UC extendido Gherkin | casos-de-uso.md bloque UC-004 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-137 | UC extendido Gherkin | casos-de-uso.md bloque UC-005 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-138 | UC extendido Gherkin | casos-de-uso.md bloque UC-006 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-139 | UC extendido Gherkin | casos-de-uso.md bloque UC-007 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-140 | UC extendido Gherkin | casos-de-uso.md bloque UC-008 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-141 | UC extendido Gherkin | casos-de-uso.md bloque UC-009 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-142 | UC extendido Gherkin | casos-de-uso.md bloque UC-0010 | 04_fsd/casos-de-uso.md | Entregada |  |
| T-143 | NFR ISO 25010 | NFR-001 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-144 | NFR ISO 25010 | NFR-002 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-145 | NFR ISO 25010 | NFR-003 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-146 | NFR ISO 25010 | NFR-004 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-147 | NFR ISO 25010 | NFR-005 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-148 | NFR ISO 25010 | NFR-006 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-149 | NFR ISO 25010 | NFR-007 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-150 | NFR ISO 25010 | NFR-008 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-151 | NFR ISO 25010 | NFR-009 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-152 | NFR ISO 25010 | NFR-010 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-153 | NFR ISO 25010 | NFR-011 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-154 | NFR ISO 25010 | NFR-012 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-155 | NFR ISO 25010 | NFR-013 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-156 | NFR ISO 25010 | NFR-014 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-157 | NFR ISO 25010 | NFR-015 metrica+umbral+verificacion | 06_nfr/NFR-ISO25010.md | Entregada |  |
| T-158 | Prompt-contrato | PC-001 6elem+invariants+failure_modes | 04_fsd/FSD_v2.md §7 | Entregada |  |
| T-159 | Prompt-contrato | PC-002 6elem+invariants+failure_modes | 04_fsd/FSD_v2.md §7 | Entregada |  |
| T-160 | Prompt-contrato | PC-003 6elem+invariants+failure_modes | 04_fsd/FSD_v2.md §7 | Entregada |  |
| T-161 | Prompt-contrato | PC-004 6elem+invariants+failure_modes | 04_fsd/FSD_v2.md §7 | Entregada |  |
| T-162 | Prompt-contrato | PC-005 6elem+invariants+failure_modes | 06_prompt_contracts/PC-005-reporte-pdf.prompt.md | Entregada | + `prompt-contracts.md` |
| T-163 | Prompt-contrato | PC-006 6elem+invariants+failure_modes | 06_prompt_contracts/PC-006-notificaciones.prompt.md | Entregada |  |
| T-164 | Prompt-contrato | PC-007 6elem+invariants+failure_modes | 06_prompt_contracts/PC-007-busqueda-fts.prompt.md | Entregada |  |
| T-165 | Prompt-contrato | PC-008 6elem+invariants+failure_modes | 04_fsd/prompt-contracts.md | Entregada |  |
| T-166 | Prompt-contrato | PC-009 6elem+invariants+failure_modes | 04_fsd/prompt-contracts.md | Entregada |  |
| T-167 | Prompt-contrato | PC-010 6elem+invariants+failure_modes | 04_fsd/prompt-contracts.md | Entregada |  |
| T-168 | ADR aceptado | ADR-001 | 09_dti/adr/ADR-001.md | Entregada |  |
| T-169 | ADR aceptado | ADR-002 | 09_dti/adr/ADR-002.md | Entregada |  |
| T-170 | ADR aceptado | ADR-003 | 09_dti/adr/ADR-003.md | Entregada |  |
| T-171 | ADR aceptado | ADR-004 | 09_dti/adr/ADR-004.md | Entregada |  |
| T-172 | ADR aceptado | ADR-005 | 09_dti/adr/ADR-005.md | Entregada |  |
| T-173 | ADR aceptado | ADR-006 | 09_dti/adr/ADR-006.md | Entregada |  |
| T-174 | DTI seccion | DTI_v1 seccion §0 | 09_dti/DTI_v1.md | Entregada |  |
| T-175 | DTI seccion | DTI_v1 seccion §1 | 09_dti/DTI_v1.md | Entregada |  |
| T-176 | DTI seccion | DTI_v1 seccion §2 | 09_dti/DTI_v1.md | Entregada |  |
| T-177 | DTI seccion | DTI_v1 seccion §3 | 09_dti/DTI_v1.md | Entregada |  |
| T-178 | DTI seccion | DTI_v1 seccion §4 | 09_dti/DTI_v1.md | Entregada |  |
| T-179 | DTI seccion | DTI_v1 seccion §5 | 09_dti/DTI_v1.md | Entregada |  |
| T-180 | DTI seccion | DTI_v1 seccion §6 | 09_dti/DTI_v1.md | Entregada |  |
| T-181 | DTI seccion | DTI_v1 seccion §7 | 09_dti/DTI_v1.md | Entregada |  |
| T-182 | DTI seccion | DTI_v1 seccion §8 | 09_dti/DTI_v1.md | Entregada |  |
| T-183 | DTI seccion | DTI_v1 seccion §9 | 09_dti/DTI_v1.md | Entregada |  |
| T-184 | DTI seccion | DTI_v1 seccion §10 | 09_dti/DTI_v1.md | Entregada |  |
| T-185 | DTI seccion | DTI_v1 seccion §11 | 09_dti/DTI_v1.md | Entregada |  |
| T-186 | DTI seccion | DTI_v1 seccion §12 | 09_dti/DTI_v1.md | Entregada |  |
| T-187 | DTI seccion | DTI_v1 seccion §13 | 09_dti/DTI_v1.md | Entregada |  |
| T-188 | DTI seccion | DTI_v1 seccion §14 | 09_dti/DTI_v1.md | Entregada |  |
| T-189 | DTI seccion | DTI_v1 seccion §15 | 09_dti/DTI_v1.md | Entregada |  |
| T-190 | DTI seccion | DTI_v1 seccion §16 | 09_dti/DTI_v1.md | Entregada |  |
| T-191 | DTI seccion | DTI_v1 seccion §17 | 09_dti/DTI_v1.md | Entregada |  |
| T-192 | DTI seccion | DTI_v1 seccion §18 | 09_dti/DTI_v1.md | Entregada |  |
| T-193 | DTI seccion | DTI_v1 seccion §19 | 09_dti/DTI_v1.md | Entregada |  |
| T-194 | DTI seccion | DTI_v1 seccion §20 | 09_dti/DTI_v1.md | Entregada |  |
| T-195 | LFSD seccion | LFSD_v1 seccion §0 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-196 | LFSD seccion | LFSD_v1 seccion §1 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-197 | LFSD seccion | LFSD_v1 seccion §2 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-198 | LFSD seccion | LFSD_v1 seccion §3 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-199 | LFSD seccion | LFSD_v1 seccion §4 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-200 | LFSD seccion | LFSD_v1 seccion §5 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-201 | LFSD seccion | LFSD_v1 seccion §6 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-202 | LFSD seccion | LFSD_v1 seccion §7 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-203 | LFSD seccion | LFSD_v1 seccion §8 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-204 | LFSD seccion | LFSD_v1 seccion §9 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-205 | LFSD seccion | LFSD_v1 seccion §10 | 05_lfsd/LFSD_v1_aylen.md | Entregada |  |
| T-206 | Diagrama Mermaid | ER nucleo | 07_diagramas/er-001-001.mmd | Entregada |  |
| T-207 | Diagrama Mermaid | ER dominio negocio | 07_diagramas/er-005-negocio.mmd | Entregada | 156 líneas; vista conceptual DUEA |
| T-208 | Diagrama Mermaid | Gantt release | 07_diagramas/gantt-002-diagrama.mmd | Entregada |  |
| T-209 | Diagrama Mermaid | Gantt sprint | 07_diagramas/gantt-004-diagrama.mmd | Entregada |  |
| T-210 | Diagrama Mermaid | Secuencia aprobacion | 07_diagramas/seq-002-002-flujo-aprobacion.mmd | Entregada | 46 líneas; FSD-UC-003 |
| T-211 | Diagrama Mermaid | Secuencia auth | 07_diagramas/seq-003-003-autenticacion-jwt.mmd | Entregada | 62 líneas; FSD-UC-001 |
| T-212 | Diagrama Mermaid | Estado evidencia | 07_diagramas/state-001-001-ciclo-vida-evidencia-v2.mmd | Entregada | 27 líneas; FSD-UC-002 |
| T-213 | Diagrama Mermaid | Estado proceso | 07_diagramas/state-002-002-ciclo-vida-proceso-acreditacion.mmd | Entregada | 41 líneas; UC-003/010 |
| T-214 | Diagrama Mermaid | Secuencia versionado | 07_diagramas/seq-001-001-versionado-evidencias.mmd | Entregada | 37 líneas; FSD-UC-002 |
| T-215 | Skill propio | validate_domain_rules | 10_agents/skills/skill_validate_domain_rules.md | Entregada |  |
| T-216 | Skill propio | detect_spec_gaps | 10_agents/skills/skill_detect_spec_gaps.md | Entregada |  |
| T-217 | Skill propio | sync_traceability_matrix | 10_agents/skills/skill_sync_traceability_matrix.md | Entregada |  |
| T-218 | Skill propio | audit_security_compliance | 10_agents/skills/skill_audit_security_compliance.md | Entregada |  |
| T-219 | Skill propio | generate_adr | 10_agents/skills/skill_generate_adr.md | Entregada |  |
| T-220 | Skill propio | generate_pr_description | 10_agents/skills/skill_generate_pr_description.md | Entregada |  |
| T-221 | Skill propio | run_tests_and_lint | 10_agents/skills/skill_run_tests_and_lint.md | Entregada |  |
| T-222 | Cursor rule dominio | 01_domain_language | 10_agents/AGENTS.md (ref.) | Referencia repo | `.mdc` en raíz `.cursor/rules/`; fuera de carpeta equipo |
| T-223 | Cursor rule dominio | 02_session_prompt_logging | 10_agents/AGENTS.md (ref.) | Referencia repo | idem |
| T-224 | Cursor rule dominio | 03_sigesa_doc_orchestrator | 10_agents/AGENTS.md (ref.) | Referencia repo | idem |
| T-225 | Cursor rule dominio | 04_sigesa_qa_gherkin_coverage | 10_agents/AGENTS.md (ref.) | Referencia repo | idem |
| T-226 | AGENTS.md | AGENTS.md equipo v1.0 | 10_agents/AGENTS.md | Entregada |  |
| T-227 | Trazabilidad | matriz_trazabilidad MRD-PRD-FSD | 08_trazabilidad/matriz_trazabilidad.md | Entregada |  |
| T-228 | Metricas AI-SDLC | prompt coverage + spec fidelity + decision coverage | 08_trazabilidad/metricas_ai_sdlc.md | Entregada |  |
| T-229 | Contexto | vision negocio v2 | 00_context/02_vision_negocio_v2.md | Entregada |  |
| T-230 | POC propuesta | POC-01 append-only evidencia | 11_pocs/POC-01/README.md | Entregada | §1–§8 completos |
| T-231 | POC propuesta | POC-02 FTS PostgreSQL | 11_pocs/POC-02/README.md | Entregada | §1–§8 completos |
| T-232 | Diagrama Mermaid | seq-004-004-dashboard-semaforos.mmd | 07_diagramas/seq-004-004-dashboard-semaforos.mmd | Entregada | FSD-UC-004 |
| T-233 | Diagrama Mermaid | seq-005-005-reporte-pdf-async.mmd | 07_diagramas/seq-005-005-reporte-pdf-async.mmd | Entregada | FSD-UC-005 |
| T-234 | Diagrama Mermaid | seq-006-006-notificaciones-smtp.mmd | 07_diagramas/seq-006-006-notificaciones-smtp.mmd | Entregada | FSD-UC-006 |
| T-235 | Diagrama Mermaid | seq-007-007-busqueda-fts.mmd | 07_diagramas/seq-007-007-busqueda-fts.mmd | Entregada | FSD-UC-007 |
| T-236 | Diagrama Mermaid | seq-008-008-portal-publico.mmd | 07_diagramas/seq-008-008-portal-publico.mmd | Entregada | FSD-UC-008 |
| T-237 | Diagrama Mermaid | seq-009-009-certificados.mmd | 07_diagramas/seq-009-009-certificados.mmd | Entregada | FSD-UC-009 |
| T-238 | Diagrama Mermaid | seq-010-010-respaldo-diario.mmd | 07_diagramas/seq-010-010-respaldo-diario.mmd | Entregada | FSD-UC-010 |
| T-239 | Diagrama Mermaid | seq-011-011-proceso-unico-carrera.mmd | 07_diagramas/seq-011-011-proceso-unico-carrera.mmd | Entregada | FSD-UC-011 |
| T-240 | Diagrama Mermaid | Completar seq-002 (cerrado) | 07_diagramas/seq-002-002-flujo-aprobacion.mmd | Entregada | Duplicado lógico T-210 |
| T-241 | Diagrama Mermaid | Completar seq-001 (cerrado) | 07_diagramas/seq-001-001-versionado-evidencias.mmd | Entregada | Duplicado lógico T-214 |
| T-242 | Diagrama Mermaid | Gantt roadmap .mmd | 07_diagramas/gantt-003-diagrama.mmd | Entregada | 42 líneas; canónico (sin `.mdd` duplicado) |
| T-243 | Diagrama Mermaid | README índice UC-diagrama | 07_diagramas/README.md | Entregada | 11/11 UC mapeados |
| T-244 | Prompt-contrato | PC-005-reporte-pdf.prompt.md | 06_prompt_contracts/PC-005-reporte-pdf.prompt.md | Entregada | + ref. `prompt-contracts.md` |
| T-245 | Prompt-contrato | PC-006-notificaciones.prompt.md | 06_prompt_contracts/PC-006-notificaciones.prompt.md | Entregada |  |
| T-246 | Prompt-contrato | PC-007-busqueda-fts.prompt.md | 06_prompt_contracts/PC-007-busqueda-fts.prompt.md | Entregada |  |
| T-247 | User story INVEST | PRD-US-018 plan de mejora | 03_prd/PRD_v1.md §5.9 | Entregada | PRD-REQ-018 |
| T-248 | User story INVEST | PRD-US-019 respaldos JD | 03_prd/PRD_v1.md §5.9 | Entregada | PRD-REQ-019 |
| T-249 | User story INVEST | PRD-US-020 WCAG 2.2 AA | 03_prd/PRD_v1.md §5.9 | Entregada | PRD-REQ-020 |
| T-250 | Caso de uso critico | FSD-UC-012 plan de mejora | 04_fsd/FSD_v2.md §4 | Entregada | GAP-004 cerrado |
| T-251 | NFR IA | Catalogo NFR-IA-01…10 | 06_nfr/NFR_IA.md | Entregada | Complemento ISO; no sustituye NFR-001…015 |
| T-252 | POC ejecutada | POC-01 evidencia append-only | 11_pocs/POC-01/evidencia/RESULTADOS_EJECUCION.md | Entregada parcial | Plantilla; métricas sin corrida |
| T-253 | POC ejecutada | POC-02 evidencia FTS p95 | 11_pocs/POC-02/evidencia/RESULTADOS_EJECUCION.md | Entregada parcial | Plantilla; métricas sin corrida |
| T-254 | Bitacora | log_interno sesion equipo | `team/aylenGonzales/log_interno.md` | Recomendada | Archivo no existe en carpeta |
| T-255 | Trazabilidad | Matriz v1.1 UC-012 US-018–020 | 08_trazabilidad/matriz_trazabilidad.md | Entregada | 20 PRD-REQ en §2 |
| T-256 | Metricas AI-SDLC | Spec fidelity 20 REQ | 08_trazabilidad/metricas_ai_sdlc.md | Recomendada | §2a aún con base 17 REQ |
| T-257 | Gherkin BDD | 12 caminos tristes §4.1 | 04_fsd/FSD_v2.md §4.1 | Entregada | UC-001…012 |
| T-258 | Trazabilidad | Auditoria rubricas Excelente | 08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md | Entregada | 10/10 criterios |
| T-259 | Indice POC | README carpetas POC | 11_pocs/README.md | Entregada |  |
| T-260 | Indice PC | README prompt-contracts | 06_prompt_contracts/README.md | Entregada |  |
