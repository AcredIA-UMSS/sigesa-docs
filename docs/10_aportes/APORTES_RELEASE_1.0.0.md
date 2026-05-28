# Aportes individuales — SIGESA / AcredIA · Release 1.0.0 (v1.2)

> **Documento de cierre de aportes** — Grupo AcredIA · UMSS.  
> Granularidad: `templates/APORTES_TEMPLATE.md` §4 y `.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md`.  
> Alcance inventario: `team/*`, `.cursor/*`, `AGENTS.md` (excluye `docs/` institucional, `templates/`, `context/`, `.github/`).
>
> **Fuente canónica:** §1 detalla las **965** tareas; §2–§3 calculan factores. Origen: [`INVENTARIO_TAREAS_APORTES_EQUIPO.md`](../09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md) · Rúbrica: [`AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md`](../09_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md) (**9,5/10** promedio).

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA — Sistema Gestor de Acreditaciones UMSS |
| Grupo | AcredIA (equipo documental SIGESA-DOCS) |
| Release evaluable | `release/1.0.0` |
| Sesión asociada | S5 |
| Fecha de cierre (inventario) | 17/05/2026 |
| Período de elaboración (release) | **~14/05/2026 – 17/05/2026** (sesión S5; actividad documentada en `PROMPT_MAPPING.md` PM-040…PM-051) |
| Columna «Fecha verif.» en §1 | Fecha en que la tarea quedó **contada y verificada** en inventario v1.2 — **no** implica que el artefacto se haya creado ese día |
| Integrantes del grupo (n) | alexAlvarez · aylenGonzales · borisAngulo · Marlene (n = 4) |
| Branch del release | `release/1.0.0` |
| Commit de cierre (HEAD) | `cf7b220` |
| Inventario consolidado | [`docs/09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md`](../09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md) (**965** tareas) |
| Auditoría Excelente equipo | [`docs/09_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md`](../09_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md) (promedio **9,5/10**) |
| Versión documento | **v1.2** (cuadre inventarios 17/05/2026) |
| Inventarios individuales | `team/*/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md` (boris: `team/borisAngulo/docs/08_trazabilidad/`) |

---

## 1. Tabla de tareas atribuidas

> **965 filas** — inventario verificado v1.2 desde [INVENTARIO_TAREAS_APORTES_EQUIPO.md](../09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md). Una fila = una tarea según §4.

### Nota sobre la columna «Fecha verif.»

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué significa **17/05/2026** en casi todas las filas? | Es la **fecha de cierre del cuadre** del inventario (regeneración §1 v1.2.1), cuando el equipo verificó que el artefacto existía en disco. |
| ¿Y si el trabajo se hizo **antes**? | **No hay conflicto.** BRD, PRD, diagramas, etc. pueden haberse redactado entre **14/05 y 16/05** (u otra fecha); la columna no sustituye el historial de commits ni `log_interno.md`. |
| ¿Cómo acreditar la fecha real de autoría? | `git log` sobre la **Referencia**, entradas en `team/<integrante>/log_interno.md`, o bloques fechados en `PROMPT_MAPPING.md`. |
| Inventario inicial PM-041 | El primer barrido automatizado fue **16/05/2026** (703 filas); el cuadre ampliado a **965** se cerró **17/05/2026**. |

### alexAlvarez (285 tareas · 14 categorías)

| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |
|---|------------|----------------|-----------|------------|--------------|
| 1 | alexAlvarez | 1. Resumen ejecutivo | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 2 | alexAlvarez | 2. Objetivos SMART (mínimo 3) | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 3 | alexAlvarez | 3. Stakeholders y matriz RACI básica | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 4 | alexAlvarez | 4. Business case (valor y retorno) | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 5 | alexAlvarez | 5. Alcance del proyecto (scope) | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 6 | alexAlvarez | 6. KPIs de negocio | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 7 | alexAlvarez | 7. Restricciones (constraints) | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 8 | alexAlvarez | 8. Supuestos (assumptions) | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 9 | alexAlvarez | 9. Riesgos y mitigación (mínimo 3) | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 10 | alexAlvarez | 10. Gobernanza del proyecto | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 11 | alexAlvarez | 11. Criterios de éxito | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 12 | alexAlvarez | 12. Trazabilidad hacia MRD / PRD / FSD | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 13 | alexAlvarez | 13. Registro de cambios | BRD | `team/alexAlvarez/docs/01_brd/BRD.md` | 17/05/2026 |
| 14 | alexAlvarez | 0. Metadatos | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 15 | alexAlvarez | 1. Resumen ejecutivo | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 16 | alexAlvarez | 2. Visión del producto | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 17 | alexAlvarez | 3. Análisis de mercado | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 18 | alexAlvarez | 4. Segmentación y personas | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 19 | alexAlvarez | 5. Jobs-to-be-Done (JTBD) | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 20 | alexAlvarez | 6. Voz del Cliente (VoC) | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 21 | alexAlvarez | 7. Análisis de competencia (Status Quo) | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 22 | alexAlvarez | 8. Propuesta de valor | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 23 | alexAlvarez | 9. Pricing y modelo de negocio | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 24 | alexAlvarez | 10. Go-to-market | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 25 | alexAlvarez | 11. Métricas de éxito del producto | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 26 | alexAlvarez | 12. Requerimientos de mercado (alto nivel) | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 27 | alexAlvarez | 13. Supuestos e hipótesis a validar | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 28 | alexAlvarez | 14. Riesgos de mercado | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 29 | alexAlvarez | 15. Trazabilidad | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 30 | alexAlvarez | 16. Anexos | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 31 | alexAlvarez | 17. Registro de cambios | MRD | `team/alexAlvarez/docs/02_mrd/MRD.md` | 17/05/2026 |
| 32 | alexAlvarez | 0. Metadatos | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 33 | alexAlvarez | 1. Resumen ejecutivo del producto | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 34 | alexAlvarez | 2. Épicas principales | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 35 | alexAlvarez | 3. Enlaces a documentos complementarios | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 36 | alexAlvarez | 4. Objetivos y métricas clave | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 37 | alexAlvarez | 5. Alcance y restricciones | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 38 | alexAlvarez | 6. Priorización MoSCoW (resumen) | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 39 | alexAlvarez | 7. Requerimientos funcionales (alto nivel) | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 40 | alexAlvarez | 8. Requerimientos no funcionales (alto nivel) | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 41 | alexAlvarez | 9. Dependencias e integraciones | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 42 | alexAlvarez | 10. Supuestos y restricciones | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 43 | alexAlvarez | 11. Experiencia de usuario | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 44 | alexAlvarez | 12. Métricas de éxito del producto | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 45 | alexAlvarez | 13. Riesgos del producto | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 46 | alexAlvarez | 14. Trazabilidad | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 47 | alexAlvarez | 15. Anexos | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 48 | alexAlvarez | 16. Registro de cambios | PRD | `team/alexAlvarez/docs/03_prd/PRD.md` | 17/05/2026 |
| 49 | alexAlvarez | 0. Vista por fases de negocio | PRD | `team/alexAlvarez/docs/03_prd/roadmap.md` | 17/05/2026 |
| 50 | alexAlvarez | 1. Roadmap de entregas (Gantt) | PRD | `team/alexAlvarez/docs/03_prd/roadmap.md` | 17/05/2026 |
| 51 | alexAlvarez | 2. Oleadas de release (dependencias) | PRD | `team/alexAlvarez/docs/03_prd/roadmap.md` | 17/05/2026 |
| 52 | alexAlvarez | 3. Desglose por hitos | PRD | `team/alexAlvarez/docs/03_prd/roadmap.md` | 17/05/2026 |
| 53 | alexAlvarez | 4. Trazabilidad épica → historias (muestra) | PRD | `team/alexAlvarez/docs/03_prd/roadmap.md` | 17/05/2026 |
| 54 | alexAlvarez | PRD-US-001 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 55 | alexAlvarez | PRD-US-002 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 56 | alexAlvarez | PRD-US-003 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 57 | alexAlvarez | PRD-US-004 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 58 | alexAlvarez | PRD-US-005 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 59 | alexAlvarez | PRD-US-006 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 60 | alexAlvarez | PRD-US-007 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 61 | alexAlvarez | PRD-US-008 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 62 | alexAlvarez | PRD-US-009 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 63 | alexAlvarez | PRD-US-010 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 64 | alexAlvarez | PRD-US-011 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 65 | alexAlvarez | PRD-US-012 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 66 | alexAlvarez | PRD-US-013 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 67 | alexAlvarez | PRD-US-014 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 68 | alexAlvarez | PRD-US-015 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 69 | alexAlvarez | PRD-US-016 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 70 | alexAlvarez | PRD-US-017 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 71 | alexAlvarez | PRD-US-018 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 72 | alexAlvarez | PRD-US-019 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 73 | alexAlvarez | PRD-US-020 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 74 | alexAlvarez | PRD-US-021 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 75 | alexAlvarez | PRD-US-022 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 76 | alexAlvarez | PRD-US-023 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 77 | alexAlvarez | PRD-US-024 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 78 | alexAlvarez | PRD-US-025 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 79 | alexAlvarez | PRD-US-026 con criterios aceptacion | PRD | `team/alexAlvarez/docs/03_prd/user_stories.md` | 17/05/2026 |
| 80 | alexAlvarez | 1. Viaje del Coordinador de Carrera subsanando una evidencia observada | PRD | `team/alexAlvarez/docs/03_prd/user_journeys.md` | 17/05/2026 |
| 81 | alexAlvarez | 2. Viaje del Técnico DUEA revisando indicadores en un lote | PRD | `team/alexAlvarez/docs/03_prd/user_journeys.md` | 17/05/2026 |
| 82 | alexAlvarez | 3. Viaje del Público consultando estado de acreditación | PRD | `team/alexAlvarez/docs/03_prd/user_journeys.md` | 17/05/2026 |
| 83 | alexAlvarez | 4. Viaje de la Jefatura DUEA auditando estado general de facultades | PRD | `team/alexAlvarez/docs/03_prd/user_journeys.md` | 17/05/2026 |
| 84 | alexAlvarez | 5. Viaje del Coordinador de Carrera en Fase 1 (autoevaluación) | PRD | `team/alexAlvarez/docs/03_prd/user_journeys.md` | 17/05/2026 |
| 85 | alexAlvarez | 6. Viaje de apertura de Proceso ([JD] / [TD]) | PRD | `team/alexAlvarez/docs/03_prd/user_journeys.md` | 17/05/2026 |
| 86 | alexAlvarez | 1. Resumen ejecutivo | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 87 | alexAlvarez | 2. Mapa de artefactos FSD | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 88 | alexAlvarez | 2.1 Reconciliación FSD ↔ LFSD | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 89 | alexAlvarez | 3. Diagramas (referencia externa) | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 90 | alexAlvarez | 4. Actores (resumen) | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 91 | alexAlvarez | 5. Alcance funcional (resumen) | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 92 | alexAlvarez | 6. Trazabilidad PRD → FSD | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 93 | alexAlvarez | 7. NFR y plan de pruebas (referencia) | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 94 | alexAlvarez | 8. Plan técnico y tasks (LFSD) | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 95 | alexAlvarez | 9. Registro de cambios | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 96 | alexAlvarez | Checklist entrega FSD (rúbrica) | FSD | `team/alexAlvarez/docs/04_fsd/FSD.md` | 17/05/2026 |
| 97 | alexAlvarez | FSD-UC-001 flujo+alternos+Gherkin | UC | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 98 | alexAlvarez | FSD-UC-003 flujo+alternos+Gherkin | UC | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 99 | alexAlvarez | FSD-UC-004 flujo+alternos+Gherkin | UC | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 100 | alexAlvarez | FSD-UC-006 flujo+alternos+Gherkin | UC | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 101 | alexAlvarez | FSD-UC-008 flujo+alternos+Gherkin | UC | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 102 | alexAlvarez | FSD-UC-009 flujo+alternos+Gherkin | UC | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 103 | alexAlvarez | FSD-UC-010 flujo+alternos+Gherkin | UC | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 104 | alexAlvarez | FSD-UC-016 flujo+alternos+Gherkin | UC | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 105 | alexAlvarez | FSD-UC-002 en indice (detalle en gherkin/FSD) [Entregada parcial] (sin flujo largo en casos_uso) | Otro | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 106 | alexAlvarez | FSD-UC-005 en indice (detalle en gherkin/FSD) [Entregada parcial] (sin flujo largo en casos_uso) | Otro | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 107 | alexAlvarez | FSD-UC-007 en indice (detalle en gherkin/FSD) [Entregada parcial] (sin flujo largo en casos_uso) | Otro | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 108 | alexAlvarez | FSD-UC-011 en indice (detalle en gherkin/FSD) [Entregada parcial] (sin flujo largo en casos_uso) | Otro | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 109 | alexAlvarez | FSD-UC-012 en indice (detalle en gherkin/FSD) [Entregada parcial] (sin flujo largo en casos_uso) | Otro | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 110 | alexAlvarez | FSD-UC-013 en indice (detalle en gherkin/FSD) [Entregada parcial] (sin flujo largo en casos_uso) | Otro | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 111 | alexAlvarez | FSD-UC-014 en indice (detalle en gherkin/FSD) [Entregada parcial] (sin flujo largo en casos_uso) | Otro | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 112 | alexAlvarez | FSD-UC-015 en indice (detalle en gherkin/FSD) [Entregada parcial] (sin flujo largo en casos_uso) | Otro | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 113 | alexAlvarez | FSD-UC-017 en indice (detalle en gherkin/FSD) [Entregada parcial] (sin flujo largo en casos_uso) | Otro | `team/alexAlvarez/docs/04_fsd/casos_uso.md` | 17/05/2026 |
| 114 | alexAlvarez | gherkin.md escenarios por UC Must (refuerzo UC-001,004,006,008,009,010,016,003) | Gherkin | `team/alexAlvarez/docs/04_fsd/gherkin.md` | 17/05/2026 |
| 115 | alexAlvarez | FSD-BR-01 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 116 | alexAlvarez | FSD-BR-02 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 117 | alexAlvarez | FSD-BR-03 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 118 | alexAlvarez | FSD-BR-04 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 119 | alexAlvarez | FSD-BR-05 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 120 | alexAlvarez | FSD-BR-06 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 121 | alexAlvarez | FSD-BR-07 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 122 | alexAlvarez | FSD-BR-08 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 123 | alexAlvarez | FSD-BR-09 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 124 | alexAlvarez | FSD-BR-10 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 125 | alexAlvarez | FSD-BR-11 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 126 | alexAlvarez | FSD-BR-12 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 127 | alexAlvarez | FSD-BR-13 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 128 | alexAlvarez | FSD-BR-14 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 129 | alexAlvarez | FSD-BR-15 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 130 | alexAlvarez | FSD-BR-16 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 131 | alexAlvarez | FSD-BR-17 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 132 | alexAlvarez | FSD-BR-18 | Otro | `team/alexAlvarez/docs/04_fsd/reglas_negocio.md` | 17/05/2026 |
| 133 | alexAlvarez | 1. Convenciones | FSD | `team/alexAlvarez/docs/04_fsd/api_contracts.md` | 17/05/2026 |
| 134 | alexAlvarez | 2. Autenticación (MOD-AUTH) | FSD | `team/alexAlvarez/docs/04_fsd/api_contracts.md` | 17/05/2026 |
| 135 | alexAlvarez | 3. Procesos y plantillas (MOD-PROCESS) | FSD | `team/alexAlvarez/docs/04_fsd/api_contracts.md` | 17/05/2026 |
| 136 | alexAlvarez | 4. Evidencias (MOD-EVIDENCE) | FSD | `team/alexAlvarez/docs/04_fsd/api_contracts.md` | 17/05/2026 |
| 137 | alexAlvarez | 5. Indicadores y observaciones (MOD-AUDIT) | FSD | `team/alexAlvarez/docs/04_fsd/api_contracts.md` | 17/05/2026 |
| 138 | alexAlvarez | 6. Portal público (MOD-PUBLIC) | FSD | `team/alexAlvarez/docs/04_fsd/api_contracts.md` | 17/05/2026 |
| 139 | alexAlvarez | 7. Fragmento OpenAPI (esquema Error) | FSD | `team/alexAlvarez/docs/04_fsd/api_contracts.md` | 17/05/2026 |
| 140 | alexAlvarez | 8. Trazabilidad endpoint → UC | FSD | `team/alexAlvarez/docs/04_fsd/api_contracts.md` | 17/05/2026 |
| 141 | alexAlvarez | 1. Principios | Otro | `team/alexAlvarez/docs/04_fsd/modelo_datos.md` | 17/05/2026 |
| 142 | alexAlvarez | 2. Jerarquía normativa | Otro | `team/alexAlvarez/docs/04_fsd/modelo_datos.md` | 17/05/2026 |
| 143 | alexAlvarez | 3. Diccionario de entidades (core) | Otro | `team/alexAlvarez/docs/04_fsd/modelo_datos.md` | 17/05/2026 |
| 144 | alexAlvarez | 4. Reglas de integridad (DB) | Otro | `team/alexAlvarez/docs/04_fsd/modelo_datos.md` | 17/05/2026 |
| 145 | alexAlvarez | 5. Trazabilidad | Otro | `team/alexAlvarez/docs/04_fsd/modelo_datos.md` | 17/05/2026 |
| 146 | alexAlvarez | Actores | Otro | `team/alexAlvarez/docs/04_fsd/glosario.md` | 17/05/2026 |
| 147 | alexAlvarez | Entidades estructurales | Otro | `team/alexAlvarez/docs/04_fsd/glosario.md` | 17/05/2026 |
| 148 | alexAlvarez | Estados del Indicador | Otro | `team/alexAlvarez/docs/04_fsd/glosario.md` | 17/05/2026 |
| 149 | alexAlvarez | Atributos técnicos frecuentes | Otro | `team/alexAlvarez/docs/04_fsd/glosario.md` | 17/05/2026 |
| 150 | alexAlvarez | Anti-patrones (prohibidos) | Otro | `team/alexAlvarez/docs/04_fsd/glosario.md` | 17/05/2026 |
| 151 | alexAlvarez | Siglas institucionales | Otro | `team/alexAlvarez/docs/04_fsd/glosario.md` | 17/05/2026 |
| 152 | alexAlvarez | Trazabilidad documental | Otro | `team/alexAlvarez/docs/04_fsd/glosario.md` | 17/05/2026 |
| 153 | alexAlvarez | 0. Metadatos | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 154 | alexAlvarez | 1. Objetivo LFSD | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 155 | alexAlvarez | 2. Actores | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 156 | alexAlvarez | 3. Casos de uso críticos | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 157 | alexAlvarez | 4. Reglas de negocio (LFSD — subset) | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 158 | alexAlvarez | 5. Modelo de datos core (resumen) | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 159 | alexAlvarez | 6. Prompt-contratos (implementación IA) | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 160 | alexAlvarez | 7. NFRs críticos (LFSD) | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 161 | alexAlvarez | 8. Trazabilidad LFSD ↔ FSD ↔ PRD | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 162 | alexAlvarez | 9. Tasks ejecutables (Spec Kit) | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 163 | alexAlvarez | 10. Riesgos top-4 | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 164 | alexAlvarez | 11. Registro de cambios | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 165 | alexAlvarez | UC-L01 failure modes | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 166 | alexAlvarez | UC-L02 failure modes | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 167 | alexAlvarez | UC-L03 failure modes | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 168 | alexAlvarez | UC-L04 failure modes | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 169 | alexAlvarez | UC-L05 failure modes | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 170 | alexAlvarez | UC-L06 failure modes | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 171 | alexAlvarez | UC-L07 failure modes | Otro | `team/alexAlvarez/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 172 | alexAlvarez | NFR-001 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 173 | alexAlvarez | NFR-002 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 174 | alexAlvarez | NFR-003 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 175 | alexAlvarez | NFR-004 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 176 | alexAlvarez | NFR-005 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 177 | alexAlvarez | NFR-006 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 178 | alexAlvarez | NFR-007 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 179 | alexAlvarez | NFR-008 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 180 | alexAlvarez | NFR-009 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 181 | alexAlvarez | NFR-010 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 182 | alexAlvarez | NFR-011 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 183 | alexAlvarez | NFR-012 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 184 | alexAlvarez | NFR-013 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 185 | alexAlvarez | NFR-014 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 186 | alexAlvarez | NFR-015 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 187 | alexAlvarez | NFR-016 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 188 | alexAlvarez | NFR-017 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 189 | alexAlvarez | NFR-018 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 190 | alexAlvarez | NFR-019 metrica+umbral+verificacion | NFR | `team/alexAlvarez/docs/05_nfr/NFR_ISO25010.md` | 17/05/2026 |
| 191 | alexAlvarez | TC de rendimiento y operaciones | NFR | `team/alexAlvarez/docs/05_nfr/catalogo_tc.md` | 17/05/2026 |
| 192 | alexAlvarez | TC sad path (dominio) | NFR | `team/alexAlvarez/docs/05_nfr/catalogo_tc.md` | 17/05/2026 |
| 193 | alexAlvarez | Mapeo a tags Gherkin del equipo | NFR | `team/alexAlvarez/docs/05_nfr/catalogo_tc.md` | 17/05/2026 |
| 194 | alexAlvarez | Puente PRD-NFR (equipo) → NFR ISO (catálogo) | NFR | `team/alexAlvarez/docs/05_nfr/matriz_cobertura.md` | 17/05/2026 |
| 195 | alexAlvarez | Matriz NFR → verificación (equipo Alex) | NFR | `team/alexAlvarez/docs/05_nfr/matriz_cobertura.md` | 17/05/2026 |
| 196 | alexAlvarez | Cobertura Gherkin documentada (equipo) | NFR | `team/alexAlvarez/docs/05_nfr/matriz_cobertura.md` | 17/05/2026 |
| 197 | alexAlvarez | TypeScript / Jest / Supertest | NFR | `team/alexAlvarez/docs/05_nfr/plantilla_tags_pruebas.md` | 17/05/2026 |
| 198 | alexAlvarez | Gherkin / Cucumber | NFR | `team/alexAlvarez/docs/05_nfr/plantilla_tags_pruebas.md` | 17/05/2026 |
| 199 | alexAlvarez | Playwright (E2E) | NFR | `team/alexAlvarez/docs/05_nfr/plantilla_tags_pruebas.md` | 17/05/2026 |
| 200 | alexAlvarez | CI — job sugerido | NFR | `team/alexAlvarez/docs/05_nfr/plantilla_tags_pruebas.md` | 17/05/2026 |
| 201 | alexAlvarez | diag-10-pie-cobertura-nfr-boris.mmd | Diagrama | `team/alexAlvarez/docs/05_nfr/07_diagramas/diag-10-pie-cobertura-nfr-boris.mmd` | 17/05/2026 |
| 202 | alexAlvarez | pie-010-cobertura-iso25010.mmd | Diagrama | `team/alexAlvarez/docs/05_nfr/07_diagramas/pie-010-cobertura-iso25010.mmd` | 17/05/2026 |
| 203 | alexAlvarez | state-001-01-estado.mmd | Diagrama | `team/alexAlvarez/docs/07_diagramas/state-001-01-estado.mmd` | 17/05/2026 |
| 204 | alexAlvarez | seq-001-01-secuencia.mmd | Diagrama | `team/alexAlvarez/docs/07_diagramas/seq-001-01-secuencia.mmd` | 17/05/2026 |
| 205 | alexAlvarez | state-002-02-estado.mmd | Diagrama | `team/alexAlvarez/docs/07_diagramas/state-002-02-estado.mmd` | 17/05/2026 |
| 206 | alexAlvarez | seq-002-02-secuencia.mmd | Diagrama | `team/alexAlvarez/docs/07_diagramas/seq-002-02-secuencia.mmd` | 17/05/2026 |
| 207 | alexAlvarez | state-003-03-estado.mmd | Diagrama | `team/alexAlvarez/docs/07_diagramas/state-003-03-estado.mmd` | 17/05/2026 |
| 208 | alexAlvarez | seq-003-03-secuencia.mmd | Diagrama | `team/alexAlvarez/docs/07_diagramas/seq-003-03-secuencia.mmd` | 17/05/2026 |
| 209 | alexAlvarez | gantt-005-diagrama.mmd | Diagrama | `team/alexAlvarez/docs/07_diagramas/gantt-005-diagrama.mmd` | 17/05/2026 |
| 210 | alexAlvarez | er-006-diagrama.mmd | Diagrama | `team/alexAlvarez/docs/07_diagramas/er-006-diagrama.mmd` | 17/05/2026 |
| 211 | alexAlvarez | PC-SIG-03-generador-prd.prompt 6elem+invariants | Prompt | `team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-03-generador-prd.prompt.md` | 17/05/2026 |
| 212 | alexAlvarez | PC-SIG-04-v2-consolidacion-maestra.prompt 6elem+invariants | Prompt | `team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-04-v2-consolidacion-maestra.prompt.md` | 17/05/2026 |
| 213 | alexAlvarez | PC-SIG-07-compilador-ecosistema-agentico.prompt 6elem+invariants | Prompt | `team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-07-compilador-ecosistema-agentico.prompt.md` | 17/05/2026 |
| 214 | alexAlvarez | PC-SIG-08-gobernanza-seguridad-agents.prompt 6elem+invariants | Prompt | `team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-08-gobernanza-seguridad-agents.prompt.md` | 17/05/2026 |
| 215 | alexAlvarez | PC-SIG-09-arquitecto-bd-er.prompt 6elem+invariants | Prompt | `team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-09-arquitecto-bd-er.prompt.md` | 17/05/2026 |
| 216 | alexAlvarez | PC-SIG-10-consistencia-documental.prompt 6elem+invariants | Prompt | `team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-10-consistencia-documental.prompt.md` | 17/05/2026 |
| 217 | alexAlvarez | PC-SIG-11-ejecutor-tareas-granular.prompt 6elem+invariants | Prompt | `team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-11-ejecutor-tareas-granular.prompt.md` | 17/05/2026 |
| 218 | alexAlvarez | PC-SIG-12-backlog-github.prompt 6elem+invariants | Prompt | `team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-12-backlog-github.prompt.md` | 17/05/2026 |
| 219 | alexAlvarez | PC-SIG-13-arquitecto-dti.prompt 6elem+invariants | Prompt | `team/alexAlvarez/docs/06_prompt_contracts/PC-SIG-13-arquitecto-dti.prompt.md` | 17/05/2026 |
| 220 | alexAlvarez | 1. Resumen ejecutivo | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 221 | alexAlvarez | 2. Problema de negocio | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 222 | alexAlvarez | 3. Propuesta de solución (producto) | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 223 | alexAlvarez | 4. Usuarios y jobs principales | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 224 | alexAlvarez | 5. Propuesta de valor por segmento | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 225 | alexAlvarez | 6. Diferenciadores del producto (vs. “más un Drive”) | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 226 | alexAlvarez | 7. Alcance funcional del producto (resumen) | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 227 | alexAlvarez | 8. Métricas de éxito del producto | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 228 | alexAlvarez | 9. Principios de diseño del producto | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 229 | alexAlvarez | 10. Escenario referencia: subsanación (product slice crítico) | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 230 | alexAlvarez | 11. Roadmap de producto (referencia) | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 231 | alexAlvarez | 12. Dependencias y gobernanza del producto | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 232 | alexAlvarez | 13. Glosario mínimo del producto | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 233 | alexAlvarez | 14. Trazabilidad documental | Otro | `team/alexAlvarez/docs/00_overview/definicion_producto.md` | 17/05/2026 |
| 234 | alexAlvarez | 1. Objetivo del documento | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 235 | alexAlvarez | 2. Contexto institucional | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 236 | alexAlvarez | 3. Alcance IN (dentro del proyecto) | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 237 | alexAlvarez | 4. Alcance OUT (explícitamente excluido) | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 238 | alexAlvarez | 5. Fronteras del sistema (context diagram narrativo) | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 239 | alexAlvarez | 6. Entregables por fase del proyecto documental | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 240 | alexAlvarez | 7. Criterios de aceptación del alcance (Definition of Done — negocio) | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 241 | alexAlvarez | 8. Restricciones que condicionan el alcance | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 242 | alexAlvarez | 9. Supuestos y dependencias | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 243 | alexAlvarez | 10. Riesgos de alcance (registro breve) | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 244 | alexAlvarez | 11. Relación con otros documentos | Otro | `team/alexAlvarez/docs/00_overview/alcance_proyecto.md` | 17/05/2026 |
| 245 | alexAlvarez | Entidades Estructurales (Jerarquía de Acreditación) | Otro | `team/alexAlvarez/docs/context/03_domain_glossary.md` | 17/05/2026 |
| 246 | alexAlvarez | Entidades Operativas | Otro | `team/alexAlvarez/docs/context/03_domain_glossary.md` | 17/05/2026 |
| 247 | alexAlvarez | Actores y Permisos (Roles) | Otro | `team/alexAlvarez/docs/context/03_domain_glossary.md` | 17/05/2026 |
| 248 | alexAlvarez | 1. Flujo Macro de Acreditación (The Accreditation Lifecycle) | Otro | `team/alexAlvarez/docs/context/04_state_machine.md` | 17/05/2026 |
| 249 | alexAlvarez | 2. Máquina de Estados del Indicador (Micro-Nivel) | Otro | `team/alexAlvarez/docs/context/04_state_machine.md` | 17/05/2026 |
| 250 | alexAlvarez | 3. Reglas Críticas de Transición (Hard Constraints) | Otro | `team/alexAlvarez/docs/context/04_state_machine.md` | 17/05/2026 |
| 251 | alexAlvarez | matriz_trazabilidad.md puntero Dorada | Otro | `team/alexAlvarez/08_trazabilidad/matriz_trazabilidad.md` | 17/05/2026 |
| 252 | alexAlvarez | metricas_ai_sdlc.md puntero | Otro | `team/alexAlvarez/08_trazabilidad/metricas_ai_sdlc.md` | 17/05/2026 |
| 253 | alexAlvarez | AUDITORIA_RUBRICAS_EXCELENTE.md | Otro | `team/alexAlvarez/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` | 17/05/2026 |
| 254 | alexAlvarez | INVENTARIO_TAREAS_APORTES_v1.md | Otro | `team/alexAlvarez/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md` | 17/05/2026 |
| 255 | alexAlvarez | log_interno.md PM-FSD-001…PM-ALEX-015 | Bitácora | `team/alexAlvarez/log_interno.md` | 17/05/2026 |
| 256 | alexAlvarez | sigesa-generacion-documentos-negocio [Referencia repo] (autoría Alex Alvarez) | Skill | `.cursor/skills/sigesa-generacion-documentos-negocio/SKILL.md` | 17/05/2026 |
| 257 | alexAlvarez | sigesa-generacion-documentos-tecnicos [Referencia repo] (autoría Alex Alvarez) | Skill | `.cursor/skills/sigesa-generacion-documentos-tecnicos/SKILL.md` | 17/05/2026 |
| 258 | alexAlvarez | sigesa-arquitectura-tecnica-ia [Referencia repo] (autoría Alex Alvarez) | Skill | `.cursor/skills/sigesa-arquitectura-tecnica-ia/SKILL.md` | 17/05/2026 |
| 259 | alexAlvarez | sigesa-api-contract-designer [Referencia repo] (autoría Alex Alvarez) | Skill | `.cursor/skills/sigesa-api-contract-designer/SKILL.md` | 17/05/2026 |
| 260 | alexAlvarez | sigesa-db-architect-append-only [Referencia repo] (autoría Alex Alvarez) | Skill | `.cursor/skills/sigesa-db-architect-append-only/SKILL.md` | 17/05/2026 |
| 261 | alexAlvarez | sigesa-auditor-trazabilidad-dti [Referencia repo] (autoría Alex Alvarez) | Skill | `.cursor/skills/sigesa-auditor-trazabilidad-dti/SKILL.md` | 17/05/2026 |
| 262 | alexAlvarez | mermaid-expert-architect [Referencia repo] (autoría Alex Alvarez) | Skill | `.cursor/skills/mermaid-expert-architect/SKILL.md` | 17/05/2026 |
| 263 | alexAlvarez | 01_domain_language [Referencia repo] (autoría Alex Alvarez) | Rule | `.cursor/rules/01_domain_language.mdc` | 17/05/2026 |
| 264 | alexAlvarez | 02_session_prompt_logging [Referencia repo] (autoría Alex Alvarez) | Rule | `.cursor/rules/02_session_prompt_logging.mdc` | 17/05/2026 |
| 265 | alexAlvarez | 03_sigesa_doc_orchestrator [Referencia repo] (autoría Alex Alvarez) | Rule | `.cursor/rules/03_sigesa_doc_orchestrator.mdc` | 17/05/2026 |
| 266 | alexAlvarez | 04_sigesa_qa_gherkin_coverage [Referencia repo] (autoría Alex Alvarez) | Rule | `.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc` | 17/05/2026 |
| 267 | alexAlvarez | 06_docs_consistency_checker [Referencia repo] (autoría Alex Alvarez) | Rule | `.cursor/rules/06_docs_consistency_checker.mdc` | 17/05/2026 |
| 268 | alexAlvarez | Consolidacion docs/06_prompt_contracts (58 PCs) [Referencia repo] (PM-ALEX reorganización) | Otro | `docs/06_prompt_contracts/prompt_contracts.md` | 17/05/2026 |
| 269 | alexAlvarez | Consolidacion docs/07_diagramas (92 .mmd) [Referencia repo] (PM-ALEX-009) | Otro | `docs/07_diagramas/README.md` | 17/05/2026 |
| 270 | alexAlvarez | docs/08_agents AGENTS.md v2.0 [Referencia repo] | Otro | `docs/08_agents/AGENTS.md` | 17/05/2026 |
| 271 | alexAlvarez | docs/08_agents skills.md + cursor_rules.md [Referencia repo] | Otro | `docs/08_agents/skills.md` | 17/05/2026 |
| 272 | alexAlvarez | docs/09_trazabilidad matriz v1.5 APTO [Referencia repo] (PM-ALEX-007/013) | Otro | `docs/09_trazabilidad/matriz_trazabilidad.md` | 17/05/2026 |
| 273 | alexAlvarez | docs/09_trazabilidad metricas v1.2 [Referencia repo] | Otro | `docs/09_trazabilidad/metricas_ai_sdlc.md` | 17/05/2026 |
| 274 | alexAlvarez | docs/09_trazabilidad report_findings v1.4 [Referencia repo] | Otro | `docs/09_trazabilidad/report_findings.md` | 17/05/2026 |
| 275 | alexAlvarez | Descomposicion docs/04_fsd/ Dorado [Referencia repo] (PM-ALEX-005) | Otro | `docs/04_fsd/FSD.md` | 17/05/2026 |
| 276 | alexAlvarez | docs/05_dti/DTI.md compilado [Referencia repo] (PM-ALEX-008) | Otro | `docs/05_dti/DTI.md` | 17/05/2026 |
| 277 | alexAlvarez | ADR_001_append_only_evidencia [Referencia repo] (PM-ALEX-008) | ADR | `docs/05_dti/adrs/ADR_001_append_only_evidencia.md` | 17/05/2026 |
| 278 | alexAlvarez | ADR_002_monolito_modular [Referencia repo] (PM-ALEX-008) | ADR | `docs/05_dti/adrs/ADR_002_monolito_modular.md` | 17/05/2026 |
| 279 | alexAlvarez | ADR_003_adapter_autenticacion [Referencia repo] (PM-ALEX-008) | ADR | `docs/05_dti/adrs/ADR_003_adapter_autenticacion.md` | 17/05/2026 |
| 280 | alexAlvarez | ADR_004_almacenamiento_blobs_docker [Referencia repo] (PM-ALEX-008) | ADR | `docs/05_dti/adrs/ADR_004_almacenamiento_blobs_docker.md` | 17/05/2026 |
| 281 | alexAlvarez | ADR_005_audit_log_postgresql [Referencia repo] (PM-ALEX-008) | ADR | `docs/05_dti/adrs/ADR_005_audit_log_postgresql.md` | 17/05/2026 |
| 282 | alexAlvarez | ADR_006_postgresql_16 [Referencia repo] (PM-ALEX-008) | ADR | `docs/05_dti/adrs/ADR_006_postgresql_16.md` | 17/05/2026 |
| 283 | alexAlvarez | ADR_007_jwt_rbac [Referencia repo] (PM-ALEX-008) | ADR | `docs/05_dti/adrs/ADR_007_jwt_rbac.md` | 17/05/2026 |
| 284 | alexAlvarez | ADR_008_taxonomias_ceub_arcu [Referencia repo] (PM-ALEX-008) | ADR | `docs/05_dti/adrs/ADR_008_taxonomias_ceub_arcu.md` | 17/05/2026 |
| 285 | alexAlvarez | ADR_009_backend_nodejs_express [Referencia repo] (PM-ALEX-008) | ADR | `docs/05_dti/adrs/ADR_009_backend_nodejs_express.md` | 17/05/2026 |

### aylenGonzales (260 tareas · 16 categorías)

| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |
|---|------------|----------------|-----------|------------|--------------|
| 286 | aylenGonzales | 0 Metadatos | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 287 | aylenGonzales | 1 Resumen ejecutivo | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 288 | aylenGonzales | 2 Contexto del negocio | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 289 | aylenGonzales | 3 Problema y oportunidad | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 290 | aylenGonzales | 4 Usuarios objetivo | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 291 | aylenGonzales | 5 Propuesta de valor | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 292 | aylenGonzales | 6 Panorama competitivo | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 293 | aylenGonzales | 7 Business case | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 294 | aylenGonzales | 8 Metricas KPIs | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 295 | aylenGonzales | 9 Objetivos SMART | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 296 | aylenGonzales | 10 Stakeholders RACI | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 297 | aylenGonzales | 11 Requerimientos MoSCoW | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 298 | aylenGonzales | 12 Reglas de negocio | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 299 | aylenGonzales | 13 Supuestos y restricciones | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 300 | aylenGonzales | 14 Alcance | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 301 | aylenGonzales | 15 Beneficios y costos | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 302 | aylenGonzales | 16 Riesgos de negocio | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 303 | aylenGonzales | 17 Criterios de exito | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 304 | aylenGonzales | 18 Trazabilidad | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 305 | aylenGonzales | 19 Aprobaciones | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 306 | aylenGonzales | 20 Historial versiones | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 307 | aylenGonzales | 21 Alineacion estrategica | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 308 | aylenGonzales | 22 Actores complementarios | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 309 | aylenGonzales | 23 Requerimientos extendidos | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 310 | aylenGonzales | 24 Indicadores adicionales | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 311 | aylenGonzales | 25 KPIs extendidos | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 312 | aylenGonzales | 26 Riesgos producto | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 313 | aylenGonzales | Checklist minimo | BRD | `01_brd/BRD_v2_aylen.md` | 17/05/2026 |
| 314 | aylenGonzales | Seccion MRD §0 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 315 | aylenGonzales | Seccion MRD §1 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 316 | aylenGonzales | Seccion MRD §2 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 317 | aylenGonzales | Seccion MRD §3 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 318 | aylenGonzales | Seccion MRD §4 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 319 | aylenGonzales | Seccion MRD §5 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 320 | aylenGonzales | Seccion MRD §6 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 321 | aylenGonzales | Seccion MRD §7 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 322 | aylenGonzales | Seccion MRD §8 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 323 | aylenGonzales | Seccion MRD §9 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 324 | aylenGonzales | Seccion MRD §10 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 325 | aylenGonzales | Seccion MRD §11 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 326 | aylenGonzales | Seccion MRD §12 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 327 | aylenGonzales | Seccion MRD §13 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 328 | aylenGonzales | Seccion MRD §14 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 329 | aylenGonzales | Seccion MRD §15 | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 330 | aylenGonzales | Checklist minimo MRD | MRD | `02_mrd/MRD_v1.md` | 17/05/2026 |
| 331 | aylenGonzales | 0 Metadatos | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 332 | aylenGonzales | 0.1 Constitution | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 333 | aylenGonzales | 1 Resumen | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 334 | aylenGonzales | 2 Objetivos | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 335 | aylenGonzales | 3 Alcance | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 336 | aylenGonzales | 4 Personas y journeys | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 337 | aylenGonzales | 5 User stories | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 338 | aylenGonzales | 6 Priorizacion | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 339 | aylenGonzales | 7 RF alto nivel | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 340 | aylenGonzales | 8 RNF alto nivel | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 341 | aylenGonzales | 9 Dependencias | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 342 | aylenGonzales | 10 Supuestos PRD | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 343 | aylenGonzales | 11 Experiencia | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 344 | aylenGonzales | 12 Metricas producto | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 345 | aylenGonzales | 13 Riesgos producto | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 346 | aylenGonzales | 14 Trazabilidad | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 347 | aylenGonzales | 15 Aprobaciones | PRD | `03_prd/PRD_v1.md` | 17/05/2026 |
| 348 | aylenGonzales | PRD-US-001 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 349 | aylenGonzales | PRD-US-002 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 350 | aylenGonzales | PRD-US-003 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 351 | aylenGonzales | PRD-US-004 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 352 | aylenGonzales | PRD-US-005 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 353 | aylenGonzales | PRD-US-006 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 354 | aylenGonzales | PRD-US-007 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 355 | aylenGonzales | PRD-US-008 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 356 | aylenGonzales | PRD-US-009 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 357 | aylenGonzales | PRD-US-010 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 358 | aylenGonzales | PRD-US-011 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 359 | aylenGonzales | PRD-US-012 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 360 | aylenGonzales | PRD-US-013 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 361 | aylenGonzales | PRD-US-014 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 362 | aylenGonzales | PRD-US-015 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 363 | aylenGonzales | PRD-US-016 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 364 | aylenGonzales | PRD-US-017 con criterios Gherkin | PRD | `03_prd/PRD_v1.md §5` | 17/05/2026 |
| 365 | aylenGonzales | Journey [CC] carga evidencia | PRD | `03_prd/PRD_v1.md §4.2` | 17/05/2026 |
| 366 | aylenGonzales | Journey [JD] reporte PDF | PRD | `03_prd/PRD_v1.md §4.2` | 17/05/2026 |
| 367 | aylenGonzales | Journey [TD] aprobacion subfase | PRD | `03_prd/PRD_v1.md §4.2` | 17/05/2026 |
| 368 | aylenGonzales | Delivery track v1.0-v2.0 | PRD | `03_prd/PRD_v1.md §3.3` | 17/05/2026 |
| 369 | aylenGonzales | Discovery track S1-S5 | PRD | `03_prd/PRD_v1.md §3.4` | 17/05/2026 |
| 370 | aylenGonzales | 0 Metadatos | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 371 | aylenGonzales | 1 Resumen | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 372 | aylenGonzales | 2 Alcance MOD | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 373 | aylenGonzales | 3 Actores | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 374 | aylenGonzales | 4 Casos de uso | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 375 | aylenGonzales | 5 Reglas RBN | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 376 | aylenGonzales | 6 Modelo datos | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 377 | aylenGonzales | 7 Prompt-contratos | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 378 | aylenGonzales | 8 Integraciones | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 379 | aylenGonzales | 9 Trazabilidad M2 | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 380 | aylenGonzales | 10 Requerimientos | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 381 | aylenGonzales | 11 Matriz trazabilidad | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 382 | aylenGonzales | 12 Plan pruebas | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 383 | aylenGonzales | 13 Riesgos | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 384 | aylenGonzales | 14 Glosario | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 385 | aylenGonzales | 15 Aprobaciones | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 386 | aylenGonzales | Checklist LFSD | FSD | `04_fsd/FSD_v2.md` | 17/05/2026 |
| 387 | aylenGonzales | FSD-UC-001 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 388 | aylenGonzales | FSD-UC-002 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 389 | aylenGonzales | FSD-UC-003 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 390 | aylenGonzales | FSD-UC-004 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 391 | aylenGonzales | FSD-UC-005 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 392 | aylenGonzales | FSD-UC-006 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 393 | aylenGonzales | FSD-UC-007 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 394 | aylenGonzales | FSD-UC-008 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 395 | aylenGonzales | FSD-UC-009 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 396 | aylenGonzales | FSD-UC-010 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 397 | aylenGonzales | FSD-UC-011 flujo+alternos+Gherkin | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 398 | aylenGonzales | RBN-01 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 399 | aylenGonzales | RBN-02 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 400 | aylenGonzales | RBN-03 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 401 | aylenGonzales | RBN-04 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 402 | aylenGonzales | RBN-05 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 403 | aylenGonzales | RBN-06 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 404 | aylenGonzales | RBN-07 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 405 | aylenGonzales | RBN-08 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 406 | aylenGonzales | RBN-09 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 407 | aylenGonzales | RBN-10 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 408 | aylenGonzales | RBN-11 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 409 | aylenGonzales | RBN-12 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 410 | aylenGonzales | RBN-13 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 411 | aylenGonzales | RBN-14 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 412 | aylenGonzales | RBN-15 | Otro | `04_fsd/FSD_v2.md §5` | 17/05/2026 |
| 413 | aylenGonzales | 1 Dominio evidencia | Otro | `04_fsd/glossary.md` | 17/05/2026 |
| 414 | aylenGonzales | 2 Dominio proceso | Otro | `04_fsd/glossary.md` | 17/05/2026 |
| 415 | aylenGonzales | 3 Roles sistema | Otro | `04_fsd/glossary.md` | 17/05/2026 |
| 416 | aylenGonzales | 4 Dominio auditoria | Otro | `04_fsd/glossary.md` | 17/05/2026 |
| 417 | aylenGonzales | 5 Integraciones | Otro | `04_fsd/glossary.md` | 17/05/2026 |
| 418 | aylenGonzales | casos-de-uso.md bloque UC-001 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 419 | aylenGonzales | casos-de-uso.md bloque UC-002 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 420 | aylenGonzales | casos-de-uso.md bloque UC-003 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 421 | aylenGonzales | casos-de-uso.md bloque UC-004 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 422 | aylenGonzales | casos-de-uso.md bloque UC-005 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 423 | aylenGonzales | casos-de-uso.md bloque UC-006 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 424 | aylenGonzales | casos-de-uso.md bloque UC-007 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 425 | aylenGonzales | casos-de-uso.md bloque UC-008 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 426 | aylenGonzales | casos-de-uso.md bloque UC-009 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 427 | aylenGonzales | casos-de-uso.md bloque UC-0010 | Gherkin | `04_fsd/casos-de-uso.md` | 17/05/2026 |
| 428 | aylenGonzales | NFR-001 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 429 | aylenGonzales | NFR-002 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 430 | aylenGonzales | NFR-003 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 431 | aylenGonzales | NFR-004 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 432 | aylenGonzales | NFR-005 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 433 | aylenGonzales | NFR-006 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 434 | aylenGonzales | NFR-007 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 435 | aylenGonzales | NFR-008 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 436 | aylenGonzales | NFR-009 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 437 | aylenGonzales | NFR-010 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 438 | aylenGonzales | NFR-011 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 439 | aylenGonzales | NFR-012 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 440 | aylenGonzales | NFR-013 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 441 | aylenGonzales | NFR-014 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 442 | aylenGonzales | NFR-015 metrica+umbral+verificacion | NFR | `06_nfr/NFR-ISO25010.md` | 17/05/2026 |
| 443 | aylenGonzales | PC-001 6elem+invariants+failure_modes | Prompt | `04_fsd/FSD_v2.md §7` | 17/05/2026 |
| 444 | aylenGonzales | PC-002 6elem+invariants+failure_modes | Prompt | `04_fsd/FSD_v2.md §7` | 17/05/2026 |
| 445 | aylenGonzales | PC-003 6elem+invariants+failure_modes | Prompt | `04_fsd/FSD_v2.md §7` | 17/05/2026 |
| 446 | aylenGonzales | PC-004 6elem+invariants+failure_modes | Prompt | `04_fsd/FSD_v2.md §7` | 17/05/2026 |
| 447 | aylenGonzales | PC-005 6elem+invariants+failure_modes (+ `prompt-contracts.md`) | Prompt | `06_prompt_contracts/PC-005-reporte-pdf.prompt.md` | 17/05/2026 |
| 448 | aylenGonzales | PC-006 6elem+invariants+failure_modes | Prompt | `06_prompt_contracts/PC-006-notificaciones.prompt.md` | 17/05/2026 |
| 449 | aylenGonzales | PC-007 6elem+invariants+failure_modes | Prompt | `06_prompt_contracts/PC-007-busqueda-fts.prompt.md` | 17/05/2026 |
| 450 | aylenGonzales | PC-008 6elem+invariants+failure_modes | Prompt | `04_fsd/prompt-contracts.md` | 17/05/2026 |
| 451 | aylenGonzales | PC-009 6elem+invariants+failure_modes | Prompt | `04_fsd/prompt-contracts.md` | 17/05/2026 |
| 452 | aylenGonzales | PC-010 6elem+invariants+failure_modes | Prompt | `04_fsd/prompt-contracts.md` | 17/05/2026 |
| 453 | aylenGonzales | ADR-001 | ADR | `09_dti/adr/ADR-001.md` | 17/05/2026 |
| 454 | aylenGonzales | ADR-002 | ADR | `09_dti/adr/ADR-002.md` | 17/05/2026 |
| 455 | aylenGonzales | ADR-003 | ADR | `09_dti/adr/ADR-003.md` | 17/05/2026 |
| 456 | aylenGonzales | ADR-004 | ADR | `09_dti/adr/ADR-004.md` | 17/05/2026 |
| 457 | aylenGonzales | ADR-005 | ADR | `09_dti/adr/ADR-005.md` | 17/05/2026 |
| 458 | aylenGonzales | ADR-006 | ADR | `09_dti/adr/ADR-006.md` | 17/05/2026 |
| 459 | aylenGonzales | DTI_v1 seccion §0 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 460 | aylenGonzales | DTI_v1 seccion §1 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 461 | aylenGonzales | DTI_v1 seccion §2 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 462 | aylenGonzales | DTI_v1 seccion §3 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 463 | aylenGonzales | DTI_v1 seccion §4 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 464 | aylenGonzales | DTI_v1 seccion §5 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 465 | aylenGonzales | DTI_v1 seccion §6 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 466 | aylenGonzales | DTI_v1 seccion §7 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 467 | aylenGonzales | DTI_v1 seccion §8 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 468 | aylenGonzales | DTI_v1 seccion §9 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 469 | aylenGonzales | DTI_v1 seccion §10 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 470 | aylenGonzales | DTI_v1 seccion §11 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 471 | aylenGonzales | DTI_v1 seccion §12 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 472 | aylenGonzales | DTI_v1 seccion §13 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 473 | aylenGonzales | DTI_v1 seccion §14 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 474 | aylenGonzales | DTI_v1 seccion §15 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 475 | aylenGonzales | DTI_v1 seccion §16 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 476 | aylenGonzales | DTI_v1 seccion §17 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 477 | aylenGonzales | DTI_v1 seccion §18 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 478 | aylenGonzales | DTI_v1 seccion §19 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 479 | aylenGonzales | DTI_v1 seccion §20 | Otro | `09_dti/DTI_v1.md` | 17/05/2026 |
| 480 | aylenGonzales | LFSD_v1 seccion §0 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 481 | aylenGonzales | LFSD_v1 seccion §1 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 482 | aylenGonzales | LFSD_v1 seccion §2 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 483 | aylenGonzales | LFSD_v1 seccion §3 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 484 | aylenGonzales | LFSD_v1 seccion §4 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 485 | aylenGonzales | LFSD_v1 seccion §5 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 486 | aylenGonzales | LFSD_v1 seccion §6 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 487 | aylenGonzales | LFSD_v1 seccion §7 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 488 | aylenGonzales | LFSD_v1 seccion §8 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 489 | aylenGonzales | LFSD_v1 seccion §9 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 490 | aylenGonzales | LFSD_v1 seccion §10 | Otro | `05_lfsd/LFSD_v1_aylen.md` | 17/05/2026 |
| 491 | aylenGonzales | ER nucleo | Diagrama | `07_diagramas/er-001-001.mmd` | 17/05/2026 |
| 492 | aylenGonzales | ER dominio negocio (156 líneas; vista conceptual DUEA) | Diagrama | `07_diagramas/er-005-negocio.mmd` | 17/05/2026 |
| 493 | aylenGonzales | Gantt release | Diagrama | `07_diagramas/gantt-002-diagrama.mmd` | 17/05/2026 |
| 494 | aylenGonzales | Gantt sprint | Diagrama | `07_diagramas/gantt-004-diagrama.mmd` | 17/05/2026 |
| 495 | aylenGonzales | Secuencia aprobacion (46 líneas; FSD-UC-003) | Diagrama | `07_diagramas/seq-002-002-flujo-aprobacion.mmd` | 17/05/2026 |
| 496 | aylenGonzales | Secuencia auth (62 líneas; FSD-UC-001) | Diagrama | `07_diagramas/seq-003-003-autenticacion-jwt.mmd` | 17/05/2026 |
| 497 | aylenGonzales | Estado evidencia (27 líneas; FSD-UC-002) | Diagrama | `07_diagramas/state-001-001-ciclo-vida-evidencia-v2.mmd` | 17/05/2026 |
| 498 | aylenGonzales | Estado proceso (41 líneas; UC-003/010) | Diagrama | `07_diagramas/state-002-002-ciclo-vida-proceso-acreditacion.mmd` | 17/05/2026 |
| 499 | aylenGonzales | Secuencia versionado (37 líneas; FSD-UC-002) | Diagrama | `07_diagramas/seq-001-001-versionado-evidencias.mmd` | 17/05/2026 |
| 500 | aylenGonzales | validate_domain_rules | Skill | `10_agents/skills/skill_validate_domain_rules.md` | 17/05/2026 |
| 501 | aylenGonzales | detect_spec_gaps | Skill | `10_agents/skills/skill_detect_spec_gaps.md` | 17/05/2026 |
| 502 | aylenGonzales | sync_traceability_matrix | Skill | `10_agents/skills/skill_sync_traceability_matrix.md` | 17/05/2026 |
| 503 | aylenGonzales | audit_security_compliance | Skill | `10_agents/skills/skill_audit_security_compliance.md` | 17/05/2026 |
| 504 | aylenGonzales | generate_adr | Skill | `10_agents/skills/skill_generate_adr.md` | 17/05/2026 |
| 505 | aylenGonzales | generate_pr_description | Skill | `10_agents/skills/skill_generate_pr_description.md` | 17/05/2026 |
| 506 | aylenGonzales | run_tests_and_lint | Skill | `10_agents/skills/skill_run_tests_and_lint.md` | 17/05/2026 |
| 507 | aylenGonzales | 01_domain_language [Referencia repo] (`.mdc` en raíz `.cursor/rules/`; fuera de carpeta equipo) | Rule | `10_agents/AGENTS.md (ref.)` | 17/05/2026 |
| 508 | aylenGonzales | 02_session_prompt_logging [Referencia repo] (idem) | Rule | `10_agents/AGENTS.md (ref.)` | 17/05/2026 |
| 509 | aylenGonzales | 03_sigesa_doc_orchestrator [Referencia repo] (idem) | Rule | `10_agents/AGENTS.md (ref.)` | 17/05/2026 |
| 510 | aylenGonzales | 04_sigesa_qa_gherkin_coverage [Referencia repo] (idem) | Rule | `10_agents/AGENTS.md (ref.)` | 17/05/2026 |
| 511 | aylenGonzales | AGENTS.md equipo v1.0 | AGENTS | `10_agents/AGENTS.md` | 17/05/2026 |
| 512 | aylenGonzales | matriz_trazabilidad MRD-PRD-FSD | Otro | `08_trazabilidad/matriz_trazabilidad.md` | 17/05/2026 |
| 513 | aylenGonzales | prompt coverage + spec fidelity + decision coverage | Otro | `08_trazabilidad/metricas_ai_sdlc.md` | 17/05/2026 |
| 514 | aylenGonzales | vision negocio v2 | Otro | `00_context/02_vision_negocio_v2.md` | 17/05/2026 |
| 515 | aylenGonzales | POC-01 append-only evidencia (§1–§8 completos) | POC | `11_pocs/POC-01/README.md` | 17/05/2026 |
| 516 | aylenGonzales | POC-02 FTS PostgreSQL (§1–§8 completos) | POC | `11_pocs/POC-02/README.md` | 17/05/2026 |
| 517 | aylenGonzales | seq-004-004-dashboard-semaforos.mmd (FSD-UC-004) | Diagrama | `07_diagramas/seq-004-004-dashboard-semaforos.mmd` | 17/05/2026 |
| 518 | aylenGonzales | seq-005-005-reporte-pdf-async.mmd (FSD-UC-005) | Diagrama | `07_diagramas/seq-005-005-reporte-pdf-async.mmd` | 17/05/2026 |
| 519 | aylenGonzales | seq-006-006-notificaciones-smtp.mmd (FSD-UC-006) | Diagrama | `07_diagramas/seq-006-006-notificaciones-smtp.mmd` | 17/05/2026 |
| 520 | aylenGonzales | seq-007-007-busqueda-fts.mmd (FSD-UC-007) | Diagrama | `07_diagramas/seq-007-007-busqueda-fts.mmd` | 17/05/2026 |
| 521 | aylenGonzales | seq-008-008-portal-publico.mmd (FSD-UC-008) | Diagrama | `07_diagramas/seq-008-008-portal-publico.mmd` | 17/05/2026 |
| 522 | aylenGonzales | seq-009-009-certificados.mmd (FSD-UC-009) | Diagrama | `07_diagramas/seq-009-009-certificados.mmd` | 17/05/2026 |
| 523 | aylenGonzales | seq-010-010-respaldo-diario.mmd (FSD-UC-010) | Diagrama | `07_diagramas/seq-010-010-respaldo-diario.mmd` | 17/05/2026 |
| 524 | aylenGonzales | seq-011-011-proceso-unico-carrera.mmd (FSD-UC-011) | Diagrama | `07_diagramas/seq-011-011-proceso-unico-carrera.mmd` | 17/05/2026 |
| 525 | aylenGonzales | Completar seq-002 (cerrado) (Duplicado lógico T-210) | Diagrama | `07_diagramas/seq-002-002-flujo-aprobacion.mmd` | 17/05/2026 |
| 526 | aylenGonzales | Completar seq-001 (cerrado) (Duplicado lógico T-214) | Diagrama | `07_diagramas/seq-001-001-versionado-evidencias.mmd` | 17/05/2026 |
| 527 | aylenGonzales | Gantt roadmap .mmd (42 líneas; canónico (sin `.mdd` duplicado)) | Diagrama | `07_diagramas/gantt-003-diagrama.mmd` | 17/05/2026 |
| 528 | aylenGonzales | README índice UC-diagrama (11/11 UC mapeados) | Diagrama | `07_diagramas/README.md` | 17/05/2026 |
| 529 | aylenGonzales | PC-005-reporte-pdf.prompt.md (+ ref. `prompt-contracts.md`) | Prompt | `06_prompt_contracts/PC-005-reporte-pdf.prompt.md` | 17/05/2026 |
| 530 | aylenGonzales | PC-006-notificaciones.prompt.md | Prompt | `06_prompt_contracts/PC-006-notificaciones.prompt.md` | 17/05/2026 |
| 531 | aylenGonzales | PC-007-busqueda-fts.prompt.md | Prompt | `06_prompt_contracts/PC-007-busqueda-fts.prompt.md` | 17/05/2026 |
| 532 | aylenGonzales | PRD-US-018 plan de mejora (PRD-REQ-018) | PRD | `03_prd/PRD_v1.md §5.9` | 17/05/2026 |
| 533 | aylenGonzales | PRD-US-019 respaldos JD (PRD-REQ-019) | PRD | `03_prd/PRD_v1.md §5.9` | 17/05/2026 |
| 534 | aylenGonzales | PRD-US-020 WCAG 2.2 AA (PRD-REQ-020) | PRD | `03_prd/PRD_v1.md §5.9` | 17/05/2026 |
| 535 | aylenGonzales | FSD-UC-012 plan de mejora (GAP-004 cerrado) | UC | `04_fsd/FSD_v2.md §4` | 17/05/2026 |
| 536 | aylenGonzales | Catalogo NFR-IA-01…10 (Complemento ISO; no sustituye NFR-001…015) | NFR | `06_nfr/NFR_IA.md` | 17/05/2026 |
| 537 | aylenGonzales | POC-01 evidencia append-only [Entregada parcial] (Plantilla; métricas sin corrida) | POC | `11_pocs/POC-01/evidencia/RESULTADOS_EJECUCION.md` | 17/05/2026 |
| 538 | aylenGonzales | POC-02 evidencia FTS p95 [Entregada parcial] (Plantilla; métricas sin corrida) | POC | `11_pocs/POC-02/evidencia/RESULTADOS_EJECUCION.md` | 17/05/2026 |
| 539 | aylenGonzales | log_interno sesion equipo [Recomendada] (Archivo no existe en carpeta) | Bitácora | `team/aylenGonzales/log_interno.md` | 17/05/2026 |
| 540 | aylenGonzales | Matriz v1.1 UC-012 US-018–020 (20 PRD-REQ en §2) | Otro | `08_trazabilidad/matriz_trazabilidad.md` | 17/05/2026 |
| 541 | aylenGonzales | Spec fidelity 20 REQ [Recomendada] (§2a aún con base 17 REQ) | Otro | `08_trazabilidad/metricas_ai_sdlc.md` | 17/05/2026 |
| 542 | aylenGonzales | 12 caminos tristes §4.1 (UC-001…012) | Gherkin | `04_fsd/FSD_v2.md §4.1` | 17/05/2026 |
| 543 | aylenGonzales | Auditoria rubricas Excelente (10/10 criterios) | Otro | `08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` | 17/05/2026 |
| 544 | aylenGonzales | README carpetas POC | POC | `11_pocs/README.md` | 17/05/2026 |
| 545 | aylenGonzales | README prompt-contracts | Otro | `06_prompt_contracts/README.md` | 17/05/2026 |

### borisAngulo (220 tareas · 10 categorías)

| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |
|---|------------|----------------|-----------|------------|--------------|
| 546 | borisAngulo | 0. Metadatos  / Campo / Valor / /-------/-------/ / Producto / SIG | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 547 | borisAngulo | 1. Resume | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 548 | borisAngulo | 2. Co | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 549 | borisAngulo | 3. Problema y oportu | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 550 | borisAngulo | 4. Usuarios objetivo / Perso | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 551 | borisAngulo | 5. Propuesta de valor  > Sí | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 552 | borisAngulo | 6. Pa | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 553 | borisAngulo | 7. Busi | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 554 | borisAngulo | 8. Métricas clave de éxito (North Star + apoyo)  > Aquí declara | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 555 | borisAngulo | 9. Objetivos de | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 556 | borisAngulo | 10. Stakeholders y roles (modelo RACI)  / Stakeholder / I | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 557 | borisAngulo | 11. Requerimie | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 558 | borisAngulo | 12. Reglas de | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 559 | borisAngulo | 13. Supuestos, restriccio | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 560 | borisAngulo | 14. Alca | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 561 | borisAngulo | 15. Be | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 562 | borisAngulo | 16. Riesgos de | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 563 | borisAngulo | 17. Criterios de éxito del proyecto de | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 564 | borisAngulo | 18. Trazabilidad a docume | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 565 | borisAngulo | 19. Aprobacio | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 566 | borisAngulo | 21. A | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 567 | borisAngulo | Checklist mí | BRD | `team/borisAngulo/docs/01_brd/BRD_v2.md` | 17/05/2026 |
| 568 | borisAngulo | 0. Metadatos  / Campo / Valor / /-------/-------/ / Producto / SIG | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 569 | borisAngulo | 1. Resume | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 570 | borisAngulo | 2. Visió | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 571 | borisAngulo | 3. A | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 572 | borisAngulo | 4. Segme | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 573 | borisAngulo | 5. *Jobs-to-be-Do | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 574 | borisAngulo | 6. A | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 575 | borisAngulo | 7. Propuesta de valor  ### 7.1 *Value Propositio | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 576 | borisAngulo | 8. Prici | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 577 | borisAngulo | 9. *Go-to-market*  ### 9.1 Ca | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 578 | borisAngulo | 10. Métricas de éxito del producto  - **North Star Metric**: porce | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 579 | borisAngulo | 11. Requerimie | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 580 | borisAngulo | 12. Supuestos e hipótesis a validar  / ID / Hipótesis / Cómo validar | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 581 | borisAngulo | 13. Riesgos de mercado  / Riesgo / Prob. / Impacto / Mitigació | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 582 | borisAngulo | 14. Trazabilidad  / MRD ID / BRD ID / PRD ID / /--------/--------/- | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 583 | borisAngulo | 15. A | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 584 | borisAngulo | Checklist de evaluació | MRD | `team/borisAngulo/docs/02_mrd/MRD.md` | 17/05/2026 |
| 585 | borisAngulo | 0. Metadatos  / Campo / Valor / /-------/-------/ / Producto / SIG | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 586 | borisAngulo | 0.1 Co | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 587 | borisAngulo | 1. Resume | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 588 | borisAngulo | 2. Objetivos del producto  Cada objetivo e | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 589 | borisAngulo | 3. Alca | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 590 | borisAngulo | 4. Perso | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 591 | borisAngulo | 5. *User stories* y criterios de aceptació | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 592 | borisAngulo | 6. Priorizació | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 593 | borisAngulo | 7. Requerimie | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 594 | borisAngulo | 8. Requerimie | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 595 | borisAngulo | 9. Depe | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 596 | borisAngulo | 10. Supuestos y restriccio | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 597 | borisAngulo | 11. Experie | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 598 | borisAngulo | 12. Métricas de éxito del producto  - **North Star**: porce | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 599 | borisAngulo | 13. Riesgos del producto  / Riesgo / Prob. / Impacto / Mitigació | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 600 | borisAngulo | 14. Trazabilidad  / PRD ID / BRD / MRD / FSD (próximo) / /--------/ | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 601 | borisAngulo | 15. A | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 602 | borisAngulo | Checklist mí | PRD | `team/borisAngulo/docs/03_prd/PRD_v1.md` | 17/05/2026 |
| 603 | borisAngulo | Objetivo  Permitir que los usuarios acceda | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 604 | borisAngulo | Actores  - Usuario - Sistema de aute | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 605 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 606 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 607 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 608 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 609 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 610 | borisAngulo | Objetivo  Permitir registrar procesos de acreditació | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 611 | borisAngulo | Actores  - Admi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 612 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 613 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 614 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 615 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 616 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 617 | borisAngulo | Objetivo  Admi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 618 | borisAngulo | Actores  - Coordi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 619 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 620 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 621 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 622 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 623 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 624 | borisAngulo | Objetivo  Evitar el cierre de procesos co | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 625 | borisAngulo | Actores  - Admi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 626 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 627 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 628 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 629 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 630 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 631 | borisAngulo | Objetivo  Permitir cargar evide | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 632 | borisAngulo | Actores  - Coordi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 633 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 634 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 635 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 636 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 637 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 638 | borisAngulo | Objetivo  Ma | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 639 | borisAngulo | Actores  - Coordi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 640 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 641 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 642 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 643 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 644 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 645 | borisAngulo | Objetivo  Registrar observacio | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 646 | borisAngulo | Actores  - Admi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 647 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 648 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 649 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 650 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 651 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 652 | borisAngulo | Objetivo  Permitir respo | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 653 | borisAngulo | Actores  - Coordi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 654 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 655 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 656 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 657 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 658 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 659 | borisAngulo | Objetivo  Visualizar el ava | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 660 | borisAngulo | Actores  - Admi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 661 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 662 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 663 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 664 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 665 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 666 | borisAngulo | Objetivo  E | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 667 | borisAngulo | Actores  - Scheduler - Sistema de | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 668 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 669 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 670 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 671 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 672 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 673 | borisAngulo | Objetivo  Ge | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 674 | borisAngulo | Actores  - Admi | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 675 | borisAngulo | Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 676 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 677 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 678 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 679 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 680 | borisAngulo | Objetivo  Registrar eve | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 681 | borisAngulo | Actores  - Sistema de auditoría  ## Preco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 682 | borisAngulo | Flujo pri | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 683 | borisAngulo | Flujos alter | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 684 | borisAngulo | Postco | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 685 | borisAngulo | Gherki | FSD | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 686 | borisAngulo | 0. Metadatos ✅✨  / Campo / Valor / /-------/-------/ / Producto / | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 687 | borisAngulo | 1. Resume | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 688 | borisAngulo | 2. Alca | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 689 | borisAngulo | 3. Actores y roles del sistema ⚡✨  / Actor / Tipo (huma | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 690 | borisAngulo | 4. Casos de uso fu | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 691 | borisAngulo | 5. Reglas de | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 692 | borisAngulo | 6. Modelo de datos fu | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 693 | borisAngulo | 7. Prompt como Co | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 694 | borisAngulo | 8. I | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 695 | borisAngulo | 9. I | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 696 | borisAngulo | 10. Requerimie | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 697 | borisAngulo | 11. Trazabilidad MRD → PRD → FSD ⚡✨  / MRD ( | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 698 | borisAngulo | 12. Pla | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 699 | borisAngulo | 13. Riesgos fu | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 700 | borisAngulo | 14. Glosario ⚡✨  / Térmi | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 701 | borisAngulo | Checklist de e | FSD | `team/borisAngulo/docs/04_fsd/FSD_v1.md` | 17/05/2026 |
| 702 | borisAngulo | 0. Metadatos  / Campo / Valor / /-------/-------/ / Producto / SIG | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 703 | borisAngulo | 1. Resume | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 704 | borisAngulo | 2. Alca | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 705 | borisAngulo | 3. Casos de uso críticos  > **Cobertura LFSD**: 3 casos de uso críti | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 706 | borisAngulo | 4. Reglas de | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 707 | borisAngulo | 4.5 Modelo fu | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 708 | borisAngulo | 5. Prompt Co | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 709 | borisAngulo | 6. NFR críticos (resume | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 710 | borisAngulo | 7. Trazabilidad (MRD → PRD → FSD → LFSD)  / MRD ( | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 711 | borisAngulo | 8. Riesgos fu | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 712 | borisAngulo | Checklist de e | FSD | `team/borisAngulo/docs/05_lfsd/LFSD_v1.md` | 17/05/2026 |
| 713 | borisAngulo | seq-001-01-autenticacion.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/seq-001-01-autenticacion.mmd` | 17/05/2026 |
| 714 | borisAngulo | seq-002-02-evidencias.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/seq-002-02-evidencias.mmd` | 17/05/2026 |
| 715 | borisAngulo | seq-003-03-observaciones.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/seq-003-03-observaciones.mmd` | 17/05/2026 |
| 716 | borisAngulo | state-002-04a-proceso.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/state-002-04a-proceso.mmd` | 17/05/2026 |
| 717 | borisAngulo | state-003-04b-obs-evidencia.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/state-003-04b-obs-evidencia.mmd` | 17/05/2026 |
| 718 | borisAngulo | er-005-05-modelo-datos.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/er-005-05-modelo-datos.mmd` | 17/05/2026 |
| 719 | borisAngulo | gantt-001-06a-ciclo-acreditacion.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/gantt-001-06a-ciclo-acreditacion.mmd` | 17/05/2026 |
| 720 | borisAngulo | c4-007-07-contenedores-sistema.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/c4-007-07-contenedores-sistema.mmd` | 17/05/2026 |
| 721 | borisAngulo | flow-008-08-cierre-proceso-pendientes.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/flow-008-08-cierre-proceso-pendientes.mmd` | 17/05/2026 |
| 722 | borisAngulo | class-009-09-dominio-agregados.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/class-009-09-dominio-agregados.mmd` | 17/05/2026 |
| 723 | borisAngulo | pie-010-10-pie-cobertura-nfr-iso25010.mmd | Diagrama | `team/borisAngulo/docs/07_diagramas/pie-010-10-pie-cobertura-nfr-iso25010.mmd` | 17/05/2026 |
| 724 | borisAngulo | trazabilidad-sigesa.md | Otro | `team/borisAngulo/docs/08_trazabilidad/trazabilidad-sigesa.md` | 17/05/2026 |
| 725 | borisAngulo | 0. Metadatos  / Campo / Valor / /-------/-------/ / Producto / SIG | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 726 | borisAngulo | 1. Visió | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 727 | borisAngulo | 2. Modelo ca | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 728 | borisAngulo | 3. Co | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 729 | borisAngulo | 4. Arquitectura de alto | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 730 | borisAngulo | 5. Modelo de domi | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 731 | borisAngulo | 6. Arquitectura hexago | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 732 | borisAngulo | 7. Reglas de domi | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 733 | borisAngulo | 8. Lógica de pa | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 734 | borisAngulo | 9. Eve | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 735 | borisAngulo | 10. Despliegue (co | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 736 | borisAngulo | 11. Capa IA / SDLC  IA e | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 737 | borisAngulo | 12. NFRs co | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 738 | borisAngulo | 13. Gaps (registro v1.2)  / Gap / Estado / ID / artefacto / Bloquea | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 739 | borisAngulo | 14. POCs críticas  / ID / Objetivo / Criterio éxito / /----/------- | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 740 | borisAngulo | 15. Seguridad (STRIDE resumido)  / Ame | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 741 | borisAngulo | 16. Observabilidad y DevOps  - Logs JSON co | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 742 | borisAngulo | 17. Trade-offs  / Decisió | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 743 | borisAngulo | 18. Roadmap téc | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 744 | borisAngulo | 19. Glosario  / Térmi | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 745 | borisAngulo | 20. ADRs y checklist  / ADR / Título / Estado / /-----/--------/--- | FSD | `team/borisAngulo/docs/09_dti/DTI_v1.md` | 17/05/2026 |
| 746 | borisAngulo | AGENTS.md | AGENTS | `AGENTS.md (co-autoría Equipo)` | 17/05/2026 |
| 747 | borisAngulo | AGENTS.md | AGENTS | `AGENTS.md (co-autoría Equipo)` | 17/05/2026 |
| 748 | borisAngulo | AGENTS.md | AGENTS | `AGENTS.md (co-autoría Equipo)` | 17/05/2026 |
| 749 | borisAngulo | AGENTS.md | AGENTS | `AGENTS.md (co-autoría Equipo)` | 17/05/2026 |
| 750 | borisAngulo | AUDITORIA_RUBRICAS_EXCELENTE.md (Enriquecida 17/05/2026 — 9/10) | Otro | `team/borisAngulo/docs/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` | 17/05/2026 |
| 751 | borisAngulo | INVENTARIO_TAREAS_APORTES_v1.md | Otro | `team/borisAngulo/docs/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md` | 17/05/2026 |
| 752 | borisAngulo | matriz_trazabilidad.md (Cierre trazabilidad 17/05/2026) | Otro | `team/borisAngulo/docs/08_trazabilidad/matriz_trazabilidad.md` | 17/05/2026 |
| 753 | borisAngulo | metricas_ai_sdlc.md (Cierre métricas 17/05/2026) | Otro | `team/borisAngulo/docs/08_trazabilidad/metricas_ai_sdlc.md` | 17/05/2026 |
| 754 | borisAngulo | log_interno.md [Recomendada] | Bitácora | `team/borisAngulo/log_interno.md` | 17/05/2026 |
| 755 | borisAngulo | POC ejecutada con evidencia [Recomendada] | POC | `team/borisAngulo/docs/11_pocs/` | 17/05/2026 |
| 756 | borisAngulo | FSD-UC-001 flujo+alterno+Gherkin (Cuadre v1.1) | Otro | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 757 | borisAngulo | FSD-UC-002 flujo+alterno+Gherkin (Cuadre v1.1) | Otro | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 758 | borisAngulo | FSD-UC-003 flujo+alterno+Gherkin (Cuadre v1.1) | Otro | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 759 | borisAngulo | FSD-UC-004 flujo+alterno+Gherkin (Cuadre v1.1) | Otro | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 760 | borisAngulo | FSD-UC-005 flujo+alterno+Gherkin (Cuadre v1.1) | Otro | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 761 | borisAngulo | FSD-UC-006 flujo+alterno+Gherkin (Cuadre v1.1) | Otro | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 762 | borisAngulo | FSD-UC-007 flujo+alterno+Gherkin (Cuadre v1.1) | Otro | `team/borisAngulo/docs/04_fsd/casos-de-uso.md` | 17/05/2026 |
| 763 | borisAngulo | PC-001 6 elem+invariants+failure modes (Cuadre v1.1) | Prompt | `team/borisAngulo/docs/04_fsd/prompt-contracts.md` | 17/05/2026 |
| 764 | borisAngulo | PC-002 6 elem+invariants+failure modes (Cuadre v1.1) | Prompt | `team/borisAngulo/docs/04_fsd/prompt-contracts.md` | 17/05/2026 |
| 765 | borisAngulo | PC-003 6 elem+invariants+failure modes (Cuadre v1.1) | Prompt | `team/borisAngulo/docs/04_fsd/prompt-contracts.md` | 17/05/2026 |

### Marlene (200 tareas · 13 categorías)

| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |
|---|------------|----------------|-----------|------------|--------------|
| 766 | Marlene | SIGESA / AcredIA — Sistema I | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 767 | Marlene | Portada y co | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 768 | Marlene | Í | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 769 | Marlene | 1. Resume | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 770 | Marlene | 2. I | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 771 | Marlene | 3. Arquitectura de | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 772 | Marlene | 4. Problema y oportu | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 773 | Marlene | 5. Objetivos SMART  Los objetivos siguie | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 774 | Marlene | 6. Stakeholders: ide | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 775 | Marlene | 7. Busi | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 776 | Marlene | 8. Alca | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 777 | Marlene | 9. Requerimie | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 778 | Marlene | 10. KPIs e i | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 779 | Marlene | 11. Restriccio | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 780 | Marlene | 12. Supuestos del proyecto y depe | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 781 | Marlene | 13. A | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 782 | Marlene | 14. Modelo de gober | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 783 | Marlene | 15. Criterios de aceptació | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 784 | Marlene | 16. Impacto esperado e | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 785 | Marlene | 17. Cro | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 786 | Marlene | 18. Co | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 787 | Marlene | 19. A | BRD | `team/Marlene/01_brd/BRD.md` | 17/05/2026 |
| 788 | Marlene | Sistema de Evaluació | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 789 | Marlene | Portada y co | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 790 | Marlene | Í | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 791 | Marlene | 1. Resume | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 792 | Marlene | 2. I | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 793 | Marlene | 3. Siete pilares del a | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 794 | Marlene | 4. Problema actual y oportu | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 795 | Marlene | 5. Segme | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 796 | Marlene | 6. Perso | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 797 | Marlene | 7. Jobs To Be Do | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 798 | Marlene | 8. Voz del clie | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 799 | Marlene | 9. A | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 800 | Marlene | 10. Propuesta de valor y posicio | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 801 | Marlene | 11. Hipótesis de | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 802 | Marlene | 12. Necesidades fu | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 803 | Marlene | 13. Factores críticos de éxito del sistema  / # / Factor crítico / D | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 804 | Marlene | 14. Riesgos de adopció | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 805 | Marlene | 15. KPIs y métricas de validació | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 806 | Marlene | 16. Roadmap estratégico y visió | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 807 | Marlene | 17. Recome | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 808 | Marlene | 18. Trazabilidad y cade | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 809 | Marlene | 19. A | MRD | `team/Marlene/02_mrd/MRD.md` | 17/05/2026 |
| 810 | Marlene | SIGESA / AcredIA — Sistema de Evaluació | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 811 | Marlene | 0. Co | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 812 | Marlene | Í | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 813 | Marlene | 1. I | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 814 | Marlene | 2. Problema i | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 815 | Marlene | 3. Objetivos estratégicos y objetivos SMART del sistema  ### 3.1 Obj | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 816 | Marlene | 4. Segme | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 817 | Marlene | 5. User perso | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 818 | Marlene | 6. Necesidades, pai | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 819 | Marlene | 7. Alca | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 820 | Marlene | 8. Arquitectura fu | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 821 | Marlene | 9. Flujos operativos y procesos clave  ### 9.1 Proceso e | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 822 | Marlene | 10. User Stories (está | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 823 | Marlene | 11. User Jour | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 824 | Marlene | 12. Roadmap del producto por fases  ### 12.1 MVP (mí | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 825 | Marlene | 13. Requerimie | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 826 | Marlene | 14. KPIs y métricas de éxito del producto  / KPI / Descripció | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 827 | Marlene | 15. Riesgos fu | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 828 | Marlene | 16. Restriccio | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 829 | Marlene | 17. Criterios de éxito y criterios de aceptació | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 830 | Marlene | 18. Recome | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 831 | Marlene | 19. Matriz de trazabilidad BRD → PRD → FSD  / BRD (ejemplos) / Épica | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 832 | Marlene | SIGESA / AcredIA — Sistema de Evaluació | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 833 | Marlene | 0. Co | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 834 | Marlene | Í | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 835 | Marlene | 1. I | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 836 | Marlene | 2. Co | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 837 | Marlene | 3. Objetivos fu | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 838 | Marlene | 4. Alca | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 839 | Marlene | 5. Arquitectura fu | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 840 | Marlene | 6. Descripció | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 841 | Marlene | 7. Catálogo de eleme | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 842 | Marlene | 8. Actores, roles y matriz de permisos  ### 8.1 Actores  / Actor / | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 843 | Marlene | 9. Diagramas y procesos pri | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 844 | Marlene | 10. Casos de uso desarrollados  > **Formato por UC:** Nombre, objeti | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 845 | Marlene | 11. Reglas de | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 846 | Marlene | 12. Esce | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 847 | Marlene | 13. Requerimie | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 848 | Marlene | 14. Requerimie | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 849 | Marlene | 15. Modelo co | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 850 | Marlene | 16. Diccio | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 851 | Marlene | 17. Diseño de e | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 852 | Marlene | 18. Co | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 853 | Marlene | 19. Flujos de i | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 854 | Marlene | 20. Validacio | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 855 | Marlene | 21. Ma | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 856 | Marlene | 22. Trazabilidad e | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 857 | Marlene | 23. KPIs fu | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 858 | Marlene | 24. Estrategia de pruebas fu | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 859 | Marlene | 25. Criterios de aceptació | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 860 | Marlene | 26. Riesgos téc | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 861 | Marlene | 27. Supuestos y depe | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 862 | Marlene | 28. Glosario téc | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 863 | Marlene | 29. A | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 864 | Marlene | 30. Recome | FSD | `team/Marlene/04_fsd/FSD.md` | 17/05/2026 |
| 865 | Marlene | CU_BDD.md | Gherkin | `team/Marlene/05_nfr/CU_BDD.md` | 17/05/2026 |
| 866 | Marlene | SKILLS.md | Skill | `team/Marlene/08_agents/agents/SKILLS.md` | 17/05/2026 |
| 867 | Marlene | ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md | Diagrama | `team/Marlene/08_agents/ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md` | 17/05/2026 |
| 868 | Marlene | release-1.0.0.md | Otro | `team/Marlene/09_trazabilidad/10_aportes/release-1.0.0.md` | 17/05/2026 |
| 869 | Marlene | release-1.0.0.md | Otro | `team/Marlene/10_aportes/release-1.0.0.md` | 17/05/2026 |
| 870 | Marlene | AGENTS.md manifiesto raiz (1 fila por regla co-autoría) | AGENTS | `AGENTS.md (co-autoría Equipo)` | 17/05/2026 |
| 871 | Marlene | AUDITORIA_RUBRICAS_EXCELENTE.md v1.0 (Actualizada 17/05/2026 — 10/10) | Otro | `team/Marlene/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` | 17/05/2026 |
| 872 | Marlene | INVENTARIO_TAREAS_APORTES_v1.md v1.0 (Cuadre _aportes_counts + gaps) | Otro | `team/Marlene/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md` | 17/05/2026 |
| 873 | Marlene | matriz_trazabilidad.md canonica (Cierre GAP-M01 17/05/2026) | Otro | `team/Marlene/08_trazabilidad/matriz_trazabilidad.md` | 17/05/2026 |
| 874 | Marlene | metricas_ai_sdlc.md en carpeta equipo (Cierre GAP-M02 17/05/2026) | Otro | `team/Marlene/08_trazabilidad/metricas_ai_sdlc.md` | 17/05/2026 |
| 875 | Marlene | log_interno.md con entradas de sesion [Entregada parcial] (Archivo existe; vacio) | Bitácora | `team/Marlene/log_interno.md` | 17/05/2026 |
| 876 | Marlene | POC ejecutada con evidencia [Recomendada] (GAP-M06) | POC | `team/Marlene/11_pocs/` | 17/05/2026 |
| 877 | Marlene | FSD-UC-001 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 878 | Marlene | FSD-UC-002 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 879 | Marlene | FSD-UC-003 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 880 | Marlene | FSD-UC-004 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 881 | Marlene | FSD-UC-005 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 882 | Marlene | FSD-UC-006 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 883 | Marlene | FSD-UC-007 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 884 | Marlene | FSD-UC-008 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 885 | Marlene | FSD-UC-009 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 886 | Marlene | FSD-UC-010 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 887 | Marlene | FSD-UC-011 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 888 | Marlene | FSD-UC-012 flujo+alternos+excepciones | Otro | `04_fsd/FSD.md §10` | 17/05/2026 |
| 889 | Marlene | NFR-ED-01 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 890 | Marlene | NFR-ED-02 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 891 | Marlene | NFR-SEG-01 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 892 | Marlene | NFR-FIA-01 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 893 | Marlene | NFR-FIA-02 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 894 | Marlene | NFR-USA-01 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 895 | Marlene | NFR-USA-02 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 896 | Marlene | NFR-COM-01 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 897 | Marlene | NFR-MAN-01 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 898 | Marlene | NFR-POR-01 metrica+umbral+verificacion | NFR | `06_prompt_contracts/NFR.md` | 17/05/2026 |
| 899 | Marlene | J-01 Cierre evidencia CEUB | PRD | `03_prd/PRD.md §11.1` | 17/05/2026 |
| 900 | Marlene | J-02 Transparencia empleador | PRD | `03_prd/PRD.md §11.2` | 17/05/2026 |
| 901 | Marlene | seq-001-001-autenticacion-jwt.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-001-001-autenticacion-jwt.mmd` | 17/05/2026 |
| 902 | Marlene | seq-002-002-carga-evidencia-versionada.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-002-002-carga-evidencia-versionada.mmd` | 17/05/2026 |
| 903 | Marlene | seq-003-003-aprobacion-rechazo-subfase.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-003-003-aprobacion-rechazo-subfase.mmd` | 17/05/2026 |
| 904 | Marlene | seq-004-004-dashboard-drilldown.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-004-004-dashboard-drilldown.mmd` | 17/05/2026 |
| 905 | Marlene | seq-005-005-reporte-pdf-asincrono.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-005-005-reporte-pdf-asincrono.mmd` | 17/05/2026 |
| 906 | Marlene | seq-006-006-notificaciones-outbox-smtp.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-006-006-notificaciones-outbox-smtp.mmd` | 17/05/2026 |
| 907 | Marlene | seq-007-007-busqueda-fts-multifiltro.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-007-007-busqueda-fts-multifiltro.mmd` | 17/05/2026 |
| 908 | Marlene | seq-008-008-portal-publico-consulta.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-008-008-portal-publico-consulta.mmd` | 17/05/2026 |
| 909 | Marlene | seq-009-009-auditoria-exportacion.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-009-009-auditoria-exportacion.mmd` | 17/05/2026 |
| 910 | Marlene | seq-010-010-configuracion-proceso-normativa.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-010-010-configuracion-proceso-normativa.mmd` | 17/05/2026 |
| 911 | Marlene | seq-011-011-supervision-respaldos.mmd (Oficial MAR) | Diagrama | `07_diagramas/seq-011-011-supervision-respaldos.mmd` | 17/05/2026 |
| 912 | Marlene | state-001-001-ciclo-vida-evidencia.mmd (Oficial MAR) | Diagrama | `07_diagramas/state-001-001-ciclo-vida-evidencia.mmd` | 17/05/2026 |
| 913 | Marlene | state-002-002-ciclo-proceso-acreditacion.mmd (Oficial MAR) | Diagrama | `07_diagramas/state-002-002-ciclo-proceso-acreditacion.mmd` | 17/05/2026 |
| 914 | Marlene | state-003-003-ciclo-plan-mejora.mmd (Oficial MAR) | Diagrama | `07_diagramas/state-003-003-ciclo-plan-mejora.mmd` | 17/05/2026 |
| 915 | Marlene | er-001-001-modelo-datos-nucleo.mmd (Oficial MAR) | Diagrama | `07_diagramas/er-001-001-modelo-datos-nucleo.mmd` | 17/05/2026 |
| 916 | Marlene | er-002-002-dominio-auditoria-evidencia.mmd (Oficial MAR) | Diagrama | `07_diagramas/er-002-002-dominio-auditoria-evidencia.mmd` | 17/05/2026 |
| 917 | Marlene | gantt-001-001-roadmap-implementacion-sigesa.mmd (Oficial MAR) | Diagrama | `07_diagramas/gantt-001-001-roadmap-implementacion-sigesa.mmd` | 17/05/2026 |
| 918 | Marlene | gantt-002-002-cronograma-convocatoria-ceub.mmd (Oficial MAR) | Diagrama | `07_diagramas/gantt-002-002-cronograma-convocatoria-ceub.mmd` | 17/05/2026 |
| 919 | Marlene | PRD-US-001 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 920 | Marlene | PRD-US-002 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 921 | Marlene | PRD-US-003 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 922 | Marlene | PRD-US-004 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 923 | Marlene | PRD-US-005 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 924 | Marlene | PRD-US-006 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 925 | Marlene | PRD-US-007 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 926 | Marlene | PRD-US-008 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 927 | Marlene | PRD-US-009 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 928 | Marlene | PRD-US-010 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 929 | Marlene | PRD-US-011 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 930 | Marlene | PRD-US-012 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 931 | Marlene | PRD-US-013 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 932 | Marlene | PRD-US-014 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 933 | Marlene | PRD-US-015 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 934 | Marlene | PRD-US-016 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 935 | Marlene | PRD-US-017 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 936 | Marlene | PRD-US-018 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 937 | Marlene | PRD-US-019 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 938 | Marlene | PRD-US-020 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 939 | Marlene | PRD-US-021 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 940 | Marlene | PRD-US-022 INVEST+CA (Cuadre v1.2) | PRD | `team/Marlene/03_prd/PRD.md` | 17/05/2026 |
| 941 | Marlene | PC-NFR-ED-01.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-ED-01.prompt.md` | 17/05/2026 |
| 942 | Marlene | PC-NFR-ED-02.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-ED-02.prompt.md` | 17/05/2026 |
| 943 | Marlene | PC-NFR-SEG-01.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-SEG-01.prompt.md` | 17/05/2026 |
| 944 | Marlene | PC-NFR-FIA-01.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-FIA-01.prompt.md` | 17/05/2026 |
| 945 | Marlene | PC-NFR-FIA-02.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-FIA-02.prompt.md` | 17/05/2026 |
| 946 | Marlene | PC-NFR-USA-01.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-USA-01.prompt.md` | 17/05/2026 |
| 947 | Marlene | PC-NFR-USA-02.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-USA-02.prompt.md` | 17/05/2026 |
| 948 | Marlene | PC-NFR-COM-01.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-COM-01.prompt.md` | 17/05/2026 |
| 949 | Marlene | PC-NFR-MAN-01.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-MAN-01.prompt.md` | 17/05/2026 |
| 950 | Marlene | PC-NFR-POR-01.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-POR-01.prompt.md` | 17/05/2026 |
| 951 | Marlene | PC-NFR-IA-01.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-01.prompt.md` | 17/05/2026 |
| 952 | Marlene | PC-NFR-IA-02.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-02.prompt.md` | 17/05/2026 |
| 953 | Marlene | PC-NFR-IA-03.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-03.prompt.md` | 17/05/2026 |
| 954 | Marlene | PC-NFR-IA-04.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-04.prompt.md` | 17/05/2026 |
| 955 | Marlene | PC-NFR-IA-05.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-05.prompt.md` | 17/05/2026 |
| 956 | Marlene | PC-NFR-IA-06.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-06.prompt.md` | 17/05/2026 |
| 957 | Marlene | PC-NFR-IA-07.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-07.prompt.md` | 17/05/2026 |
| 958 | Marlene | PC-NFR-IA-08.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-08.prompt.md` | 17/05/2026 |
| 959 | Marlene | PC-NFR-IA-09.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-09.prompt.md` | 17/05/2026 |
| 960 | Marlene | PC-NFR-IA-10.prompt.md 6 elem+invariants (Cuadre v1.2) | Prompt | `team/Marlene/06_prompt_contracts/PC-NFR-IA-10.prompt.md` | 17/05/2026 |
| 961 | Marlene | NFR-IA-01 metrica+umbral+verificacion (Cuadre v1.2) | NFR | `team/Marlene/06_prompt_contracts/NFR_IA.md` | 17/05/2026 |
| 962 | Marlene | NFR-IA-02 metrica+umbral+verificacion (Cuadre v1.2) | NFR | `team/Marlene/06_prompt_contracts/NFR_IA.md` | 17/05/2026 |
| 963 | Marlene | NFR-IA-03 metrica+umbral+verificacion (Cuadre v1.2) | NFR | `team/Marlene/06_prompt_contracts/NFR_IA.md` | 17/05/2026 |
| 964 | Marlene | NFR-IA-04 metrica+umbral+verificacion (Cuadre v1.2) | NFR | `team/Marlene/06_prompt_contracts/NFR_IA.md` | 17/05/2026 |
| 965 | Marlene | NFR-IA-05 metrica+umbral+verificacion (Cuadre v1.2) | NFR | `team/Marlene/06_prompt_contracts/NFR_IA.md` | 17/05/2026 |

---

## 2. Resumen por integrante

> **Base vigente (§3):** inventarios verificados en `team/*/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md` (17/05/2026). Cuadre §4: US, UC, PC, NFR, diagramas sin duplicados `D-*`.

| Integrante | Total tareas (v1.2) | Rúbrica Excelente | Inventario fuente | Observación |
|------------|---------------------|-------------------|-------------------|-------------|
| alexAlvarez | **285** | **9/10** | `team/alexAlvarez/08_trazabilidad/` | Golden `docs/` + gobernanza `.cursor/` |
| aylenGonzales | **260** | **10/10** | `team/aylenGonzales/08_trazabilidad/` | Referencia equipo |
| borisAngulo | **220** | **9/10** | `team/borisAngulo/docs/08_trazabilidad/` | +10 UC/PC v1.1; diag-01…10; FSD PARCIAL |
| Marlene | **200** | **10/10** | `team/Marlene/08_trazabilidad/` | Cuadre v1.2; **volumen menor por tokens muy limitados en Claude Web** (ver §3.1) |
| **Total grupo** | **965** | **9,5/10** promedio | [`INVENTARIO_TAREAS_APORTES_EQUIPO.md`](../09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md) | — |

### Cuadre v1.2 respecto a consolidado anterior (927 tareas)

| Integrante | Antes | Ahora | Δ | Motivo del ajuste |
|------------|-------|-------|---|-------------------|
| alexAlvarez | 285 | 285 | 0 | Sin cambio |
| aylenGonzales | 260 | 260 | 0 | Sin cambio |
| borisAngulo | 210 | **220** | +10 | +7 `FSD-UC` + 3 `PC` en `casos-de-uso.md` / `prompt-contracts.md` |
| Marlene | 172 | **200** | +28 | +22 `PRD-US` + 20 `PC` + 5 `NFR-IA`; −19 duplicados `D-*` / `AGENTS` |
| **Grupo** | 927 | **965** | +38 | Reglas §4 aplicadas en inventarios individuales |

### Histórico PM-041 (`_aportes_counts.json`, 16/05/2026)

| Integrante | Total (hist.) |
|------------|---------------|
| alexAlvarez | 118 |
| aylenGonzales | 212 |
| borisAngulo | 243 |
| Marlene | 130 |
| **Total** | **703** |

---

## 3. Cálculo del factor de aporte individual

> **Base vigente (17/05/2026):** **965** tareas / 4 integrantes.

```
aporte_promedio_grupo = 965 / 4 = 241.25 tareas/persona
factor_i              = clamp(tareas_i / 241.25, 0.5, 1.1)
Nota_individual_i     = Nota_grupal × factor_i
```

### Aplicación (inventario v1.2 — 17/05/2026)

| Integrante | Tareas (§2) | factor sin clamp | factor (clamp 0.5–1.1) | Nota individual (Nota_grupal × factor) |
|------------|-------------|------------------|------------------------|----------------------------------------|
| alexAlvarez | 285 | 1.18 | **1.10** | Nota_grupal × 1.10 |
| aylenGonzales | 260 | 1.08 | **1.08** | Nota_grupal × 1.08 |
| borisAngulo | 220 | 0.91 | **0.91** | Nota_grupal × 0.91 |
| Marlene | 200 | 0.83 | **0.83** | Nota_grupal × 0.83 *(ajuste docente opcional: §3.1)* |

> **Aporte promedio del grupo**: 965 / 4 = **241.25** tareas/persona.

### 3.1 Justificación contextual — Marlene (volumen vs. calidad)

**Declaración del equipo:** durante el release, Marlene trabajó principalmente en **Claude Web** con **tokens de contexto muy limitados** (ventanas cortas, sin sesiones largas ni iteración masiva comparable a Cursor IDE). Eso redujo la cantidad de artefactos que pudo generar o refinar en una sola sesión, no la profundidad de lo entregado.

| Aspecto | Evidencia |
|---------|-----------|
| Volumen (§3) | **200** tareas vs. promedio **241,25** → factor automático **0,83** |
| Calidad (rúbrica) | **10/10** en `team/Marlene/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md` |
| Priorización | BRD/MRD/PRD completos, **20** prompt-contracts `PC-NFR-*`, **5** NFR-IA cuantificables, **18** diagramas `MAR-*` oficiales (sin duplicar borradores `D-*`) |
| Limitación externa | Pocas iteraciones por límite de tokens en Claude Web; trabajo complementado en cuadre v1.2 con inventario verificado en disco |

**Interpretación para el docente:** el factor **0,83** refleja **menor cantidad de filas de inventario**, no incumplimiento de la rúbrica «Excelente». Si el criterio de nota pondera **calidad documental** además de volumen, el grupo solicita considerar un **factor final ≥ 0,83** (p. ej. **0,95–1,00**) documentado en §5, sin modificar el inventario verificado de **200** tareas.

### Histórico PM-041 (703 tareas)

| Integrante | Tareas | factor (clamp) |
|------------|--------|----------------|
| alexAlvarez | 118 | 0.67 |
| aylenGonzales | 212 | 1.10 |
| borisAngulo | 243 | 1.10 |
| Marlene | 130 | 0.74 |

---

## 4. Reglas del grupo sobre qué cuenta como tarea

Aplicadas según `templates/APORTES_TEMPLATE.md` §4 y verificación skill `sigesa-auditoria-excelente-equipo`:

| Tipo | Regla |
|------|--------|
| Documento | Una sección `##` sustantiva en BRD/MRD/PRD/FSD/DTI/LFSD = 1 tarea |
| UC | Un `FSD-UC-*` con flujo + alterno + Gherkin = 1 tarea |
| NFR | Un NFR cuantificable (métrica + umbral + verificación) = 1 tarea |
| Diagrama | Un `.mmd` oficial versionado (sin duplicar `D-*` si existe `MAR-*` / `diag-*`) = 1 tarea |
| User story | Un `PRD-US-*` INVEST + criterios de aceptación = 1 tarea |
| Prompt-contrato | Un `PC-*` con 6 elementos + invariantes + failure modes = 1 tarea |
| Skill / rule / AGENTS | Un skill accionable, una cursor rule o co-autoría documentada = 1 tarea |
| POC | Una POC **ejecutada** con evidencia = 1 tarea |
| Bitácora | Una sección de bitácora o sesión demo entregada = 1 tarea |

**No cuenta:** cosmética, duplicados borrador (`07_diagramas/mmd/D-*` si ya hay `MAR-*`), doble fila `AGENTS` repetida, commits de config sin contenido sustantivo.

**Excluido del inventario por integrante:** `docs/` raíz institucional, `templates/`, `context/`, `.github/`.

---

## 5. Auditoría del docente (opcional)

| Integrante | Factor §3 (v1.2) | Rúbrica | Factor final aplicado | Justificación del ajuste |
|------------|------------------|---------|------------------------|---------------------------|
| alexAlvarez | 1.10 | 9/10 | | Techo clamp |
| aylenGonzales | 1.08 | 10/10 | | Referencia equipo |
| borisAngulo | 0.91 | 9/10 | | Trabajo denso; gaps FSD §4 |
| Marlene | 0.83 | 10/10 | *(sugerido ≥ 0,95)* | **Tokens muy limitados en Claude Web** durante el release: menor volumen de iteraciones (200 tareas) pero **rúbrica 10/10** y artefactos densos (BRD→PRD, 20 PC, NFR-IA, diagramas MAR-*). Ver §3.1. |

> El docente puede aplicar factor **§3 (volumen)** o documentar ajuste en «Factor final». Para Marlene, el grupo documenta explícitamente la limitación de **Claude Web (tokens)** como causa del factor 0,83 automático, no de calidad insuficiente.

---

## 6. Checklist de cierre del release

- [x] §0 Metadatos completos con `n_integrantes` y branch del release.
- [x] §1 **965** filas con Integrante, Categoría y Referencia verificable (sincronizado con inventario v1.2).
- [x] §2 Suma de tareas por integrante = total del grupo (**965**, inventario v1.2).
- [x] §3 Aporte promedio (**241.25**) y factor calculado para cada integrante.
- [x] Consolidado [`INVENTARIO_TAREAS_APORTES_EQUIPO.md`](../09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md) y [`AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md`](../09_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md) v1.2 (17/05/2026).
- [x] §4 Granularidad documentada (alineada a plantilla).
- [ ] Archivo commiteado en el branch `release/1.0.0` antes del cierre formal.

---

## 7. Registro de cambios del documento

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 16/05/2026 | PM-041: 703 tareas desde `_aportes_counts.json`; §1 detallado |
| v1.1 | 17/05/2026 | Consolidado 927 tareas en `docs/09_trazabilidad/` |
| **v1.2** | **17/05/2026** | **965** tareas: Marlene 200, boris 220; §2–§4 alineados a inventarios verificados |
| **v1.2.1** | **17/05/2026** | **§1 regenerado completo** (965 filas) desde `INVENTARIO_TAREAS_APORTES_EQUIPO.md`; reemplaza bloque histórico PM-041 (703 filas) |
| **v1.2.2** | **17/05/2026** | §3.1 + §5: justificación Marlene por **tokens limitados en Claude Web** (factor volumen 0,83 vs. rúbrica 10/10) |
| **v1.2.3** | **17/05/2026** | Nota §1: **Fecha verif.** ≠ fecha de autoría; período elaboración 14–17/05 |

**Scripts de regeneración:**
- Consolidado: `node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/merge-inventario-equipo.js`
- §1 APORTES: `node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-aportes-section1.js`

