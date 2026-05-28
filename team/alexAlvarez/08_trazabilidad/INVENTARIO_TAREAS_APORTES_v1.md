# Inventario de tareas (aportes) — alexAlvarez v1.2

| Metadato | Valor |
|----------|-------|
| **Total filas inventario** | 285 (T-001…T-285) |
| **Entregadas (carpeta equipo)** | 246 |
| **Entregadas parciales** | 9 |
| **Referencia repo (Golden + `.cursor/`)** | 30 |
| **Autor** | Alex Alvarez (equipo AcredIA) |
| **Fecha inventario** | 17/05/2026 |
| **Alcance primario** | `team/alexAlvarez/` (mismo criterio que `team/aylenGonzales/`) |
| **Auditoría** | [`AUDITORIA_RUBRICAS_EXCELENTE.md`](AUDITORIA_RUBRICAS_EXCELENTE.md) |

## Qué es una tarea (reglas APORTES — sin inflar)

Cada fila del inventario corresponde **como máximo a una unidad** de la tabla oficial. **No** se listan por separado los 58 archivos de `docs/06_prompt_contracts/` ni cada sesión `PM-*` del log: eso inflaba el total a ~370 de forma irreal.

| Unidad | Criterio | Ejemplo en este inventario |
|--------|----------|----------------------------|
| Sección `##` | Un encabezado sustantivo en BRD/MRD/PRD/FSD/DTI/LFSD | `BRD seccion` §1…§12 |
| User story | Una US INVEST + CA | `PRD-US-001` … `026` |
| User journey | Un journey documentado | 6 filas en `user_journeys.md` |
| UC crítico | Flujo + alterno + Gherkin en cuerpo UC | 8 UC en `casos_uso.md` |
| UC índice | Solo índice / Gherkin parcial | 9 UC — **parcial** |
| Regla / NFR / Diagrama / PC | Una regla, NFR, `.mmd` o PC completo | FSD-BR-01…18, NFR-001…019, 10 `.mmd`, 9 PC-SIG |
| Bitácora | **Un** archivo `log_interno.md` | 1 fila (muchas sesiones dentro) |
| Golden / Skill / Rule | Entregable fuera de `team/` | Estado **Referencia repo** |

## Resumen verificación (carpeta equipo)

| Estado | Cantidad | % |
|--------|----------|---|
| **Entregada** | 246 | 86.3 % |
| **Entregada parcial** | 9 | 3.2 % |
| **Referencia repo** | 30 | 10.5 % |

**Artefactos físicos:** ~57 archivos `.md` / `.mmd` / `.prompt.md` bajo `team/alexAlvarez/docs/` + `08_trazabilidad/` + `log_interno.md`.

| Subcarpeta | Entregables clave |
|------------|-------------------|
| `01_brd/` | `BRD.md` (12 §) |
| `02_mrd/` | `MRD.md` (16 §) |
| `03_prd/` | `PRD.md`, `user_stories.md` (26 US), `user_journeys.md`, `roadmap.md` |
| `04_fsd/` | `FSD.md`, `casos_uso.md`, `gherkin.md`, `reglas_negocio.md`, `api_contracts.md`, `modelo_datos.md`, `glosario.md` |
| `05_lfsd/` | `LFSD_v1.md` |
| `05_nfr/` | `NFR_ISO25010.md` (19 NFR), `catalogo_tc.md`, `matriz_cobertura.md` |
| `06_prompt_contracts/` | 9× `PC-SIG-*.prompt.md` |
| `07_diagramas/` | 10× `.mmd` |
| `08_trazabilidad/` | auditoría, inventario, punteros matriz/métricas |
| `00_overview/`, `context/` | insumos de negocio |

## Cuadre rúbrica «Excelente» vs inventario

| Criterio rúbrica (umbral Excelente) | Evidencia Alex | ¿Cumple? |
|-------------------------------------|----------------|----------|
| BRD: 10+ elementos negocio | 13 secciones BRD (SMART, stakeholders, business case, alcance, KPIs, restricciones, supuestos, riesgos, gobernanza, criterios éxito) | **Sí** |
| MRD: 7+ elementos, 2+ segmentos | 18 secciones (segmentos §4, JTBD §5, VoC §6, competencia §7, hipótesis §13…) | **Sí** |
| PRD: 20+ US + 2+ journeys + roadmap | 26 US + 6 journeys + `roadmap.md` | **Sí** |
| FSD: 30+ elementos totales | 86 (§ FSD, UC, reglas, API, modelo, glosario, LFSD, Gherkin) | **Sí** |
| UC+Gherkin: 10+ UC críticos completos | 8 UC con cuerpo completo + 9 UC índice parcial | **Parcial** (8/10 cuerpo; 17/17 índice) |
| NFR: 8+ cuantificables, 5+ características ISO | 19 NFR con métrica/umbral (7+ características en §1) | **Sí** |
| Diagramas: 10+ `.mmd` | 10 archivos en `07_diagramas/` + NFR pie | **Sí** |
| PCs: 10+ | 9 `PC-SIG` en equipo (+ catálogo Golden 58 — **1 fila** referencia) | **Parcial** en equipo; **Sí** con Golden |
| Skills + Rules | 7 skills + 5 rules (`.cursor/`) | **Sí** (referencia repo) |

## Cuadre estricto vs reglas APORTES (factor de aporte)

| Tipo | Filas inventario | Notas |
|------|----------------:|-------|
| Secciones `##` (BRD/MRD/PRD/FSD/…) | 137 | Comparable a aylen ~90+ |
| User story | 26 | `user_stories.md` |
| User journey + roadmap § | 11 |  |
| UC crítico | 8 | No duplicar con `gherkin.md` |
| UC índice parcial | 9 | No sumar 2× con UC crítico en factor |
| Reglas negocio | 18 |  |
| NFR | 19 |  |
| Diagrama | 10 |  |
| Prompt-contrato (equipo) | 9 | No listar 58× Golden |
| Bitácora | 1 | Un archivo |
| Referencia repo | 30 | Skills, rules, Golden 06–09, DTI, ADRs |

| Concepto | Cantidad |
|----------|----------|
| Filas inventario total | 285 |
| Entregadas `team/alexAlvarez/` | 246 |
| Menos UC índice parcial (no sustituyen UC crítico en factor) | −9 → **237** documentales «cerradas» en carpeta |
| Referencia repo (gobernanza + Golden) | 30 |
| **Tareas únicas alineadas a reglas** (sin doble UC/Gherkin/PC Golden) | **~267** filas útiles; **~237** solo carpeta equipo |

> Comparable a **aylenGonzales** (~260 filas inventario, ~235–240 únicas estrictas). El total **285** refleja documentación de equipo + promoción Dorada sin contar cada PC Golden por separado.

## Registro T-001 a T-285

| ID | Categoria | Descripcion | Referencia | Estado | Observacion |
|----|-----------|-------------|------------|--------|-------------|
| T-001 | BRD seccion | 1. Resumen ejecutivo | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-002 | BRD seccion | 2. Objetivos SMART (mínimo 3) | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-003 | BRD seccion | 3. Stakeholders y matriz RACI básica | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-004 | BRD seccion | 4. Business case (valor y retorno) | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-005 | BRD seccion | 5. Alcance del proyecto (scope) | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-006 | BRD seccion | 6. KPIs de negocio | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-007 | BRD seccion | 7. Restricciones (constraints) | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-008 | BRD seccion | 8. Supuestos (assumptions) | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-009 | BRD seccion | 9. Riesgos y mitigación (mínimo 3) | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-010 | BRD seccion | 10. Gobernanza del proyecto | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-011 | BRD seccion | 11. Criterios de éxito | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-012 | BRD seccion | 12. Trazabilidad hacia MRD / PRD / FSD | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-013 | BRD seccion | 13. Registro de cambios | team/alexAlvarez/docs/01_brd/BRD.md | Entregada |  |
| T-014 | MRD seccion | 0. Metadatos | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-015 | MRD seccion | 1. Resumen ejecutivo | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-016 | MRD seccion | 2. Visión del producto | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-017 | MRD seccion | 3. Análisis de mercado | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-018 | MRD seccion | 4. Segmentación y personas | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-019 | MRD seccion | 5. Jobs-to-be-Done (JTBD) | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-020 | MRD seccion | 6. Voz del Cliente (VoC) | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-021 | MRD seccion | 7. Análisis de competencia (Status Quo) | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-022 | MRD seccion | 8. Propuesta de valor | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-023 | MRD seccion | 9. Pricing y modelo de negocio | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-024 | MRD seccion | 10. Go-to-market | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-025 | MRD seccion | 11. Métricas de éxito del producto | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-026 | MRD seccion | 12. Requerimientos de mercado (alto nivel) | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-027 | MRD seccion | 13. Supuestos e hipótesis a validar | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-028 | MRD seccion | 14. Riesgos de mercado | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-029 | MRD seccion | 15. Trazabilidad | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-030 | MRD seccion | 16. Anexos | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-031 | MRD seccion | 17. Registro de cambios | team/alexAlvarez/docs/02_mrd/MRD.md | Entregada |  |
| T-032 | PRD seccion | 0. Metadatos | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-033 | PRD seccion | 1. Resumen ejecutivo del producto | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-034 | PRD seccion | 2. Épicas principales | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-035 | PRD seccion | 3. Enlaces a documentos complementarios | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-036 | PRD seccion | 4. Objetivos y métricas clave | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-037 | PRD seccion | 5. Alcance y restricciones | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-038 | PRD seccion | 6. Priorización MoSCoW (resumen) | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-039 | PRD seccion | 7. Requerimientos funcionales (alto nivel) | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-040 | PRD seccion | 8. Requerimientos no funcionales (alto nivel) | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-041 | PRD seccion | 9. Dependencias e integraciones | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-042 | PRD seccion | 10. Supuestos y restricciones | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-043 | PRD seccion | 11. Experiencia de usuario | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-044 | PRD seccion | 12. Métricas de éxito del producto | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-045 | PRD seccion | 13. Riesgos del producto | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-046 | PRD seccion | 14. Trazabilidad | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-047 | PRD seccion | 15. Anexos | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-048 | PRD seccion | 16. Registro de cambios | team/alexAlvarez/docs/03_prd/PRD.md | Entregada |  |
| T-049 | Roadmap seccion | 0. Vista por fases de negocio | team/alexAlvarez/docs/03_prd/roadmap.md | Entregada |  |
| T-050 | Roadmap seccion | 1. Roadmap de entregas (Gantt) | team/alexAlvarez/docs/03_prd/roadmap.md | Entregada |  |
| T-051 | Roadmap seccion | 2. Oleadas de release (dependencias) | team/alexAlvarez/docs/03_prd/roadmap.md | Entregada |  |
| T-052 | Roadmap seccion | 3. Desglose por hitos | team/alexAlvarez/docs/03_prd/roadmap.md | Entregada |  |
| T-053 | Roadmap seccion | 4. Trazabilidad épica → historias (muestra) | team/alexAlvarez/docs/03_prd/roadmap.md | Entregada |  |
| T-054 | User story INVEST | PRD-US-001 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-055 | User story INVEST | PRD-US-002 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-056 | User story INVEST | PRD-US-003 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-057 | User story INVEST | PRD-US-004 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-058 | User story INVEST | PRD-US-005 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-059 | User story INVEST | PRD-US-006 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-060 | User story INVEST | PRD-US-007 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-061 | User story INVEST | PRD-US-008 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-062 | User story INVEST | PRD-US-009 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-063 | User story INVEST | PRD-US-010 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-064 | User story INVEST | PRD-US-011 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-065 | User story INVEST | PRD-US-012 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-066 | User story INVEST | PRD-US-013 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-067 | User story INVEST | PRD-US-014 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-068 | User story INVEST | PRD-US-015 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-069 | User story INVEST | PRD-US-016 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-070 | User story INVEST | PRD-US-017 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-071 | User story INVEST | PRD-US-018 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-072 | User story INVEST | PRD-US-019 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-073 | User story INVEST | PRD-US-020 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-074 | User story INVEST | PRD-US-021 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-075 | User story INVEST | PRD-US-022 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-076 | User story INVEST | PRD-US-023 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-077 | User story INVEST | PRD-US-024 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-078 | User story INVEST | PRD-US-025 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-079 | User story INVEST | PRD-US-026 con criterios aceptacion | team/alexAlvarez/docs/03_prd/user_stories.md | Entregada |  |
| T-080 | User journey | 1. Viaje del Coordinador de Carrera subsanando una evidencia observada | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-081 | User journey | 2. Viaje del Técnico DUEA revisando indicadores en un lote | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-082 | User journey | 3. Viaje del Público consultando estado de acreditación | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-083 | User journey | 4. Viaje de la Jefatura DUEA auditando estado general de facultades | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-084 | User journey | 5. Viaje del Coordinador de Carrera en Fase 1 (autoevaluación) | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-085 | User journey | 6. Viaje de apertura de Proceso ([JD] / [TD]) | team/alexAlvarez/docs/03_prd/user_journeys.md | Entregada |  |
| T-086 | FSD seccion | 1. Resumen ejecutivo | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-087 | FSD seccion | 2. Mapa de artefactos FSD | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-088 | FSD seccion | 2.1 Reconciliación FSD ↔ LFSD | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-089 | FSD seccion | 3. Diagramas (referencia externa) | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-090 | FSD seccion | 4. Actores (resumen) | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-091 | FSD seccion | 5. Alcance funcional (resumen) | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-092 | FSD seccion | 6. Trazabilidad PRD → FSD | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-093 | FSD seccion | 7. NFR y plan de pruebas (referencia) | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-094 | FSD seccion | 8. Plan técnico y tasks (LFSD) | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-095 | FSD seccion | 9. Registro de cambios | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-096 | FSD seccion | Checklist entrega FSD (rúbrica) | team/alexAlvarez/docs/04_fsd/FSD.md | Entregada |  |
| T-097 | Caso de uso critico | FSD-UC-001 flujo+alternos+Gherkin | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada |  |
| T-098 | Caso de uso critico | FSD-UC-003 flujo+alternos+Gherkin | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada |  |
| T-099 | Caso de uso critico | FSD-UC-004 flujo+alternos+Gherkin | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada |  |
| T-100 | Caso de uso critico | FSD-UC-006 flujo+alternos+Gherkin | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada |  |
| T-101 | Caso de uso critico | FSD-UC-008 flujo+alternos+Gherkin | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada |  |
| T-102 | Caso de uso critico | FSD-UC-009 flujo+alternos+Gherkin | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada |  |
| T-103 | Caso de uso critico | FSD-UC-010 flujo+alternos+Gherkin | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada |  |
| T-104 | Caso de uso critico | FSD-UC-016 flujo+alternos+Gherkin | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada |  |
| T-105 | UC indice | FSD-UC-002 en indice (detalle en gherkin/FSD) | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada parcial | sin flujo largo en casos_uso |
| T-106 | UC indice | FSD-UC-005 en indice (detalle en gherkin/FSD) | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada parcial | sin flujo largo en casos_uso |
| T-107 | UC indice | FSD-UC-007 en indice (detalle en gherkin/FSD) | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada parcial | sin flujo largo en casos_uso |
| T-108 | UC indice | FSD-UC-011 en indice (detalle en gherkin/FSD) | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada parcial | sin flujo largo en casos_uso |
| T-109 | UC indice | FSD-UC-012 en indice (detalle en gherkin/FSD) | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada parcial | sin flujo largo en casos_uso |
| T-110 | UC indice | FSD-UC-013 en indice (detalle en gherkin/FSD) | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada parcial | sin flujo largo en casos_uso |
| T-111 | UC indice | FSD-UC-014 en indice (detalle en gherkin/FSD) | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada parcial | sin flujo largo en casos_uso |
| T-112 | UC indice | FSD-UC-015 en indice (detalle en gherkin/FSD) | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada parcial | sin flujo largo en casos_uso |
| T-113 | UC indice | FSD-UC-017 en indice (detalle en gherkin/FSD) | team/alexAlvarez/docs/04_fsd/casos_uso.md | Entregada parcial | sin flujo largo en casos_uso |
| T-114 | Gherkin BDD | gherkin.md escenarios por UC Must | team/alexAlvarez/docs/04_fsd/gherkin.md | Entregada | refuerzo UC-001,004,006,008,009,010,016,003 |
| T-115 | Regla de negocio | FSD-BR-01 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-116 | Regla de negocio | FSD-BR-02 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-117 | Regla de negocio | FSD-BR-03 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-118 | Regla de negocio | FSD-BR-04 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-119 | Regla de negocio | FSD-BR-05 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-120 | Regla de negocio | FSD-BR-06 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-121 | Regla de negocio | FSD-BR-07 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-122 | Regla de negocio | FSD-BR-08 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-123 | Regla de negocio | FSD-BR-09 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-124 | Regla de negocio | FSD-BR-10 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-125 | Regla de negocio | FSD-BR-11 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-126 | Regla de negocio | FSD-BR-12 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-127 | Regla de negocio | FSD-BR-13 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-128 | Regla de negocio | FSD-BR-14 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-129 | Regla de negocio | FSD-BR-15 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-130 | Regla de negocio | FSD-BR-16 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-131 | Regla de negocio | FSD-BR-17 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-132 | Regla de negocio | FSD-BR-18 | team/alexAlvarez/docs/04_fsd/reglas_negocio.md | Entregada |  |
| T-133 | FSD API seccion | 1. Convenciones | team/alexAlvarez/docs/04_fsd/api_contracts.md | Entregada |  |
| T-134 | FSD API seccion | 2. Autenticación (MOD-AUTH) | team/alexAlvarez/docs/04_fsd/api_contracts.md | Entregada |  |
| T-135 | FSD API seccion | 3. Procesos y plantillas (MOD-PROCESS) | team/alexAlvarez/docs/04_fsd/api_contracts.md | Entregada |  |
| T-136 | FSD API seccion | 4. Evidencias (MOD-EVIDENCE) | team/alexAlvarez/docs/04_fsd/api_contracts.md | Entregada |  |
| T-137 | FSD API seccion | 5. Indicadores y observaciones (MOD-AUDIT) | team/alexAlvarez/docs/04_fsd/api_contracts.md | Entregada |  |
| T-138 | FSD API seccion | 6. Portal público (MOD-PUBLIC) | team/alexAlvarez/docs/04_fsd/api_contracts.md | Entregada |  |
| T-139 | FSD API seccion | 7. Fragmento OpenAPI (esquema Error) | team/alexAlvarez/docs/04_fsd/api_contracts.md | Entregada |  |
| T-140 | FSD API seccion | 8. Trazabilidad endpoint → UC | team/alexAlvarez/docs/04_fsd/api_contracts.md | Entregada |  |
| T-141 | Modelo datos seccion | 1. Principios | team/alexAlvarez/docs/04_fsd/modelo_datos.md | Entregada |  |
| T-142 | Modelo datos seccion | 2. Jerarquía normativa | team/alexAlvarez/docs/04_fsd/modelo_datos.md | Entregada |  |
| T-143 | Modelo datos seccion | 3. Diccionario de entidades (core) | team/alexAlvarez/docs/04_fsd/modelo_datos.md | Entregada |  |
| T-144 | Modelo datos seccion | 4. Reglas de integridad (DB) | team/alexAlvarez/docs/04_fsd/modelo_datos.md | Entregada |  |
| T-145 | Modelo datos seccion | 5. Trazabilidad | team/alexAlvarez/docs/04_fsd/modelo_datos.md | Entregada |  |
| T-146 | Glosario FSD seccion | Actores | team/alexAlvarez/docs/04_fsd/glosario.md | Entregada |  |
| T-147 | Glosario FSD seccion | Entidades estructurales | team/alexAlvarez/docs/04_fsd/glosario.md | Entregada |  |
| T-148 | Glosario FSD seccion | Estados del Indicador | team/alexAlvarez/docs/04_fsd/glosario.md | Entregada |  |
| T-149 | Glosario FSD seccion | Atributos técnicos frecuentes | team/alexAlvarez/docs/04_fsd/glosario.md | Entregada |  |
| T-150 | Glosario FSD seccion | Anti-patrones (prohibidos) | team/alexAlvarez/docs/04_fsd/glosario.md | Entregada |  |
| T-151 | Glosario FSD seccion | Siglas institucionales | team/alexAlvarez/docs/04_fsd/glosario.md | Entregada |  |
| T-152 | Glosario FSD seccion | Trazabilidad documental | team/alexAlvarez/docs/04_fsd/glosario.md | Entregada |  |
| T-153 | LFSD seccion | 0. Metadatos | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-154 | LFSD seccion | 1. Objetivo LFSD | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-155 | LFSD seccion | 2. Actores | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-156 | LFSD seccion | 3. Casos de uso críticos | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-157 | LFSD seccion | 4. Reglas de negocio (LFSD — subset) | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-158 | LFSD seccion | 5. Modelo de datos core (resumen) | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-159 | LFSD seccion | 6. Prompt-contratos (implementación IA) | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-160 | LFSD seccion | 7. NFRs críticos (LFSD) | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-161 | LFSD seccion | 8. Trazabilidad LFSD ↔ FSD ↔ PRD | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-162 | LFSD seccion | 9. Tasks ejecutables (Spec Kit) | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-163 | LFSD seccion | 10. Riesgos top-4 | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-164 | LFSD seccion | 11. Registro de cambios | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-165 | LFSD UC | UC-L01 failure modes | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-166 | LFSD UC | UC-L02 failure modes | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-167 | LFSD UC | UC-L03 failure modes | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-168 | LFSD UC | UC-L04 failure modes | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-169 | LFSD UC | UC-L05 failure modes | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-170 | LFSD UC | UC-L06 failure modes | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-171 | LFSD UC | UC-L07 failure modes | team/alexAlvarez/docs/05_lfsd/LFSD_v1.md | Entregada |  |
| T-172 | NFR ISO 25010 | NFR-001 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-173 | NFR ISO 25010 | NFR-002 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-174 | NFR ISO 25010 | NFR-003 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-175 | NFR ISO 25010 | NFR-004 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-176 | NFR ISO 25010 | NFR-005 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-177 | NFR ISO 25010 | NFR-006 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-178 | NFR ISO 25010 | NFR-007 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-179 | NFR ISO 25010 | NFR-008 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-180 | NFR ISO 25010 | NFR-009 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-181 | NFR ISO 25010 | NFR-010 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-182 | NFR ISO 25010 | NFR-011 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-183 | NFR ISO 25010 | NFR-012 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-184 | NFR ISO 25010 | NFR-013 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-185 | NFR ISO 25010 | NFR-014 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-186 | NFR ISO 25010 | NFR-015 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-187 | NFR ISO 25010 | NFR-016 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-188 | NFR ISO 25010 | NFR-017 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-189 | NFR ISO 25010 | NFR-018 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-190 | NFR ISO 25010 | NFR-019 metrica+umbral+verificacion | team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md | Entregada |  |
| T-191 | NFR catalogo seccion | TC de rendimiento y operaciones | team/alexAlvarez/docs/05_nfr/catalogo_tc.md | Entregada |  |
| T-192 | NFR catalogo seccion | TC sad path (dominio) | team/alexAlvarez/docs/05_nfr/catalogo_tc.md | Entregada |  |
| T-193 | NFR catalogo seccion | Mapeo a tags Gherkin del equipo | team/alexAlvarez/docs/05_nfr/catalogo_tc.md | Entregada |  |
| T-194 | NFR matriz seccion | Puente PRD-NFR (equipo) → NFR ISO (catálogo) | team/alexAlvarez/docs/05_nfr/matriz_cobertura.md | Entregada |  |
| T-195 | NFR matriz seccion | Matriz NFR → verificación (equipo Alex) | team/alexAlvarez/docs/05_nfr/matriz_cobertura.md | Entregada |  |
| T-196 | NFR matriz seccion | Cobertura Gherkin documentada (equipo) | team/alexAlvarez/docs/05_nfr/matriz_cobertura.md | Entregada |  |
| T-197 | NFR plantilla seccion | TypeScript / Jest / Supertest | team/alexAlvarez/docs/05_nfr/plantilla_tags_pruebas.md | Entregada |  |
| T-198 | NFR plantilla seccion | Gherkin / Cucumber | team/alexAlvarez/docs/05_nfr/plantilla_tags_pruebas.md | Entregada |  |
| T-199 | NFR plantilla seccion | Playwright (E2E) | team/alexAlvarez/docs/05_nfr/plantilla_tags_pruebas.md | Entregada |  |
| T-200 | NFR plantilla seccion | CI — job sugerido | team/alexAlvarez/docs/05_nfr/plantilla_tags_pruebas.md | Entregada |  |
| T-201 | Diagrama Mermaid | diag-10-pie-cobertura-nfr-boris.mmd | team/alexAlvarez/docs/05_nfr/07_diagramas/diag-10-pie-cobertura-nfr-boris.mmd | Entregada |  |
| T-202 | Diagrama Mermaid | pie-010-cobertura-iso25010.mmd | team/alexAlvarez/docs/05_nfr/07_diagramas/pie-010-cobertura-iso25010.mmd | Entregada |  |
| T-203 | Diagrama Mermaid | state-001-01-estado.mmd | team/alexAlvarez/docs/07_diagramas/state-001-01-estado.mmd | Entregada |  |
| T-204 | Diagrama Mermaid | seq-001-01-secuencia.mmd | team/alexAlvarez/docs/07_diagramas/seq-001-01-secuencia.mmd | Entregada |  |
| T-205 | Diagrama Mermaid | state-002-02-estado.mmd | team/alexAlvarez/docs/07_diagramas/state-002-02-estado.mmd | Entregada |  |
| T-206 | Diagrama Mermaid | seq-002-02-secuencia.mmd | team/alexAlvarez/docs/07_diagramas/seq-002-02-secuencia.mmd | Entregada |  |
| T-207 | Diagrama Mermaid | state-003-03-estado.mmd | team/alexAlvarez/docs/07_diagramas/state-003-03-estado.mmd | Entregada |  |
| T-208 | Diagrama Mermaid | seq-003-03-secuencia.mmd | team/alexAlvarez/docs/07_diagramas/seq-003-03-secuencia.mmd | Entregada |  |
| T-209 | Diagrama Mermaid | gantt-005-diagrama.mmd | team/alexAlvarez/docs/07_diagramas/gantt-005-diagrama.mmd | Entregada |  |
| T-210 | Diagrama Mermaid | er-006-diagrama.mmd | team/alexAlvarez/docs/07_diagramas/er-006-diagrama.mmd | Entregada |  |
| T-211 | Prompt-contrato | PC-SIG-03-generador-prd.prompt 6elem+invariants | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-03-generador-prd.prompt.md | Entregada |  |
| T-212 | Prompt-contrato | PC-SIG-04-v2-consolidacion-maestra.prompt 6elem+invariants | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-04-v2-consolidacion-maestra.prompt.md | Entregada |  |
| T-213 | Prompt-contrato | PC-SIG-07-compilador-ecosistema-agentico.prompt 6elem+invariants | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-07-compilador-ecosistema-agentico.prompt.md | Entregada |  |
| T-214 | Prompt-contrato | PC-SIG-08-gobernanza-seguridad-agents.prompt 6elem+invariants | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-08-gobernanza-seguridad-agents.prompt.md | Entregada |  |
| T-215 | Prompt-contrato | PC-SIG-09-arquitecto-bd-er.prompt 6elem+invariants | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-09-arquitecto-bd-er.prompt.md | Entregada |  |
| T-216 | Prompt-contrato | PC-SIG-10-consistencia-documental.prompt 6elem+invariants | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-10-consistencia-documental.prompt.md | Entregada |  |
| T-217 | Prompt-contrato | PC-SIG-11-ejecutor-tareas-granular.prompt 6elem+invariants | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-11-ejecutor-tareas-granular.prompt.md | Entregada |  |
| T-218 | Prompt-contrato | PC-SIG-12-backlog-github.prompt 6elem+invariants | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-12-backlog-github.prompt.md | Entregada |  |
| T-219 | Prompt-contrato | PC-SIG-13-arquitecto-dti.prompt 6elem+invariants | team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-13-arquitecto-dti.prompt.md | Entregada |  |
| T-220 | Overview seccion | 1. Resumen ejecutivo | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-221 | Overview seccion | 2. Problema de negocio | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-222 | Overview seccion | 3. Propuesta de solución (producto) | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-223 | Overview seccion | 4. Usuarios y jobs principales | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-224 | Overview seccion | 5. Propuesta de valor por segmento | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-225 | Overview seccion | 6. Diferenciadores del producto (vs. “más un Drive”) | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-226 | Overview seccion | 7. Alcance funcional del producto (resumen) | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-227 | Overview seccion | 8. Métricas de éxito del producto | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-228 | Overview seccion | 9. Principios de diseño del producto | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-229 | Overview seccion | 10. Escenario referencia: subsanación (product slice crítico) | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-230 | Overview seccion | 11. Roadmap de producto (referencia) | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-231 | Overview seccion | 12. Dependencias y gobernanza del producto | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-232 | Overview seccion | 13. Glosario mínimo del producto | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-233 | Overview seccion | 14. Trazabilidad documental | team/alexAlvarez/docs/00_overview/definicion_producto.md | Entregada |  |
| T-234 | Overview seccion | 1. Objetivo del documento | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-235 | Overview seccion | 2. Contexto institucional | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-236 | Overview seccion | 3. Alcance IN (dentro del proyecto) | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-237 | Overview seccion | 4. Alcance OUT (explícitamente excluido) | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-238 | Overview seccion | 5. Fronteras del sistema (context diagram narrativo) | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-239 | Overview seccion | 6. Entregables por fase del proyecto documental | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-240 | Overview seccion | 7. Criterios de aceptación del alcance (Definition of Done — negocio) | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-241 | Overview seccion | 8. Restricciones que condicionan el alcance | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-242 | Overview seccion | 9. Supuestos y dependencias | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-243 | Overview seccion | 10. Riesgos de alcance (registro breve) | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-244 | Overview seccion | 11. Relación con otros documentos | team/alexAlvarez/docs/00_overview/alcance_proyecto.md | Entregada |  |
| T-245 | Contexto seccion | Entidades Estructurales (Jerarquía de Acreditación) | team/alexAlvarez/docs/context/03_domain_glossary.md | Entregada |  |
| T-246 | Contexto seccion | Entidades Operativas | team/alexAlvarez/docs/context/03_domain_glossary.md | Entregada |  |
| T-247 | Contexto seccion | Actores y Permisos (Roles) | team/alexAlvarez/docs/context/03_domain_glossary.md | Entregada |  |
| T-248 | Contexto seccion | 1. Flujo Macro de Acreditación (The Accreditation Lifecycle) | team/alexAlvarez/docs/context/04_state_machine.md | Entregada |  |
| T-249 | Contexto seccion | 2. Máquina de Estados del Indicador (Micro-Nivel) | team/alexAlvarez/docs/context/04_state_machine.md | Entregada |  |
| T-250 | Contexto seccion | 3. Reglas Críticas de Transición (Hard Constraints) | team/alexAlvarez/docs/context/04_state_machine.md | Entregada |  |
| T-251 | Trazabilidad | matriz_trazabilidad.md puntero Dorada | team/alexAlvarez/08_trazabilidad/matriz_trazabilidad.md | Entregada |  |
| T-252 | Trazabilidad | metricas_ai_sdlc.md puntero | team/alexAlvarez/08_trazabilidad/metricas_ai_sdlc.md | Entregada |  |
| T-253 | Trazabilidad | AUDITORIA_RUBRICAS_EXCELENTE.md | team/alexAlvarez/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md | Entregada |  |
| T-254 | Trazabilidad | INVENTARIO_TAREAS_APORTES_v1.md | team/alexAlvarez/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md | Entregada |  |
| T-255 | Bitacora | log_interno.md PM-FSD-001…PM-ALEX-015 | team/alexAlvarez/log_interno.md | Entregada |  |
| T-256 | Skill | sigesa-generacion-documentos-negocio | .cursor/skills/sigesa-generacion-documentos-negocio/SKILL.md | Referencia repo | autoría Alex Alvarez |
| T-257 | Skill | sigesa-generacion-documentos-tecnicos | .cursor/skills/sigesa-generacion-documentos-tecnicos/SKILL.md | Referencia repo | autoría Alex Alvarez |
| T-258 | Skill | sigesa-arquitectura-tecnica-ia | .cursor/skills/sigesa-arquitectura-tecnica-ia/SKILL.md | Referencia repo | autoría Alex Alvarez |
| T-259 | Skill | sigesa-api-contract-designer | .cursor/skills/sigesa-api-contract-designer/SKILL.md | Referencia repo | autoría Alex Alvarez |
| T-260 | Skill | sigesa-db-architect-append-only | .cursor/skills/sigesa-db-architect-append-only/SKILL.md | Referencia repo | autoría Alex Alvarez |
| T-261 | Skill | sigesa-auditor-trazabilidad-dti | .cursor/skills/sigesa-auditor-trazabilidad-dti/SKILL.md | Referencia repo | autoría Alex Alvarez |
| T-262 | Skill | mermaid-expert-architect | .cursor/skills/mermaid-expert-architect/SKILL.md | Referencia repo | autoría Alex Alvarez |
| T-263 | Cursor rule | 01_domain_language | .cursor/rules/01_domain_language.mdc | Referencia repo | autoría Alex Alvarez |
| T-264 | Cursor rule | 02_session_prompt_logging | .cursor/rules/02_session_prompt_logging.mdc | Referencia repo | autoría Alex Alvarez |
| T-265 | Cursor rule | 03_sigesa_doc_orchestrator | .cursor/rules/03_sigesa_doc_orchestrator.mdc | Referencia repo | autoría Alex Alvarez |
| T-266 | Cursor rule | 04_sigesa_qa_gherkin_coverage | .cursor/rules/04_sigesa_qa_gherkin_coverage.mdc | Referencia repo | autoría Alex Alvarez |
| T-267 | Cursor rule | 06_docs_consistency_checker | .cursor/rules/06_docs_consistency_checker.mdc | Referencia repo | autoría Alex Alvarez |
| T-268 | Golden Folder | Consolidacion docs/06_prompt_contracts (58 PCs) | docs/06_prompt_contracts/prompt_contracts.md | Referencia repo | PM-ALEX reorganización |
| T-269 | Golden Folder | Consolidacion docs/07_diagramas (92 .mmd) | docs/07_diagramas/README.md | Referencia repo | PM-ALEX-009 |
| T-270 | Golden Folder | docs/08_agents AGENTS.md v2.0 | docs/08_agents/AGENTS.md | Referencia repo |  |
| T-271 | Golden Folder | docs/08_agents skills.md + cursor_rules.md | docs/08_agents/skills.md | Referencia repo |  |
| T-272 | Golden Folder | docs/09_trazabilidad matriz v1.5 APTO | docs/09_trazabilidad/matriz_trazabilidad.md | Referencia repo | PM-ALEX-007/013 |
| T-273 | Golden Folder | docs/09_trazabilidad metricas v1.2 | docs/09_trazabilidad/metricas_ai_sdlc.md | Referencia repo |  |
| T-274 | Golden Folder | docs/09_trazabilidad report_findings v1.4 | docs/09_trazabilidad/report_findings.md | Referencia repo |  |
| T-275 | Golden Folder | Descomposicion docs/04_fsd/ Dorado | docs/04_fsd/FSD.md | Referencia repo | PM-ALEX-005 |
| T-276 | Golden Folder | docs/05_dti/DTI.md compilado | docs/05_dti/DTI.md | Referencia repo | PM-ALEX-008 |
| T-277 | ADR aceptado | ADR_001_append_only_evidencia | docs/05_dti/adrs/ADR_001_append_only_evidencia.md | Referencia repo | PM-ALEX-008 |
| T-278 | ADR aceptado | ADR_002_monolito_modular | docs/05_dti/adrs/ADR_002_monolito_modular.md | Referencia repo | PM-ALEX-008 |
| T-279 | ADR aceptado | ADR_003_adapter_autenticacion | docs/05_dti/adrs/ADR_003_adapter_autenticacion.md | Referencia repo | PM-ALEX-008 |
| T-280 | ADR aceptado | ADR_004_almacenamiento_blobs_docker | docs/05_dti/adrs/ADR_004_almacenamiento_blobs_docker.md | Referencia repo | PM-ALEX-008 |
| T-281 | ADR aceptado | ADR_005_audit_log_postgresql | docs/05_dti/adrs/ADR_005_audit_log_postgresql.md | Referencia repo | PM-ALEX-008 |
| T-282 | ADR aceptado | ADR_006_postgresql_16 | docs/05_dti/adrs/ADR_006_postgresql_16.md | Referencia repo | PM-ALEX-008 |
| T-283 | ADR aceptado | ADR_007_jwt_rbac | docs/05_dti/adrs/ADR_007_jwt_rbac.md | Referencia repo | PM-ALEX-008 |
| T-284 | ADR aceptado | ADR_008_taxonomias_ceub_arcu | docs/05_dti/adrs/ADR_008_taxonomias_ceub_arcu.md | Referencia repo | PM-ALEX-008 |
| T-285 | ADR aceptado | ADR_009_backend_nodejs_express | docs/05_dti/adrs/ADR_009_backend_nodejs_express.md | Referencia repo | PM-ALEX-008 |
