# Glosario FSD — Lenguaje ubicuo SIGESA

| Campo | Valor |
|-------|-------|
| **Ámbito** | `team/alexAlvarez/docs/04_fsd/` |
| **Versión** | v1.0 |
| **Canónico extendido** | [`../context/03_domain_glossary.md`](../context/03_domain_glossary.md) |

> Términos obligatorios en API, BD y UI. **No usar:** File/Archivo (→ **Evidencia**), Step/Stage (→ **Fase**), Cliente/Super Admin (→ roles oficiales).

---

## Actores

| Término | Código | Definición |
|---------|--------|------------|
| Coordinador de Carrera | [CC] | Responsable operativo de la evidencia de **una** carrera. `Coordinator` en código. |
| Técnico DUEA | [TD] | Auditor normativo; emite **Observaciones** y aprueba **Indicadores**. `Technician`. |
| Jefatura DUEA | [JD] | Gobierno del sistema, procesos, plantillas y publicación. `Admin`. |
| Público | [P] | Consulta estados y certificados publicados. Sin acceso a evidencia interna. |

---

## Entidades estructurales

| Término ES | Identificador código/BD | Definición |
|------------|-------------------------|------------|
| **Proceso** | `AccreditationProcess` / `accreditation_process` | Intento formal de acreditación de una carrera en un periodo. |
| **Modalidad** | `modality` | Marco **CEUB** o **ARCU-SUR**; dispara materialización de taxonomía. |
| **Fase** | `Phase` / `phase` | Etapa temporal: Autoevaluación, Evaluación Interna, Evaluación Externa. |
| **Dimensión** | `evaluation_dimension` | Contenedor normativo nivel 1. |
| **Criterio** | `evaluation_criterion` | Contenedor normativo nivel 2. |
| **Indicador** | `Indicator` / `indicator` | Unidad atómica evaluable; ancla de **Evidencia** y máquina de estados. |
| **Evidencia** | `Evidence` | Prueba documental versionada; **append-only**. |
| **Observación** | `Observation` | No conformidad formal del [TD] sobre una versión de evidencia. |

---

## Estados del Indicador

| Estado | Significado | Siguiente actor típico |
|--------|-------------|------------------------|
| `PENDIENTE` | Sin evidencia | [CC] |
| `SUBIDO` | Evidencia en auditoría | [TD] |
| `OBSERVADO` | No conformidad registrada | [CC] |
| `SUBSANADO` | Corrección enviada | [TD] |
| `APROBADO` | Cumplimiento verificado | — |

Diagrama: [`../07_diagramas/state-001-01-estado.mmd`](../07_diagramas/state-001-01-estado.mmd)

---

## Atributos técnicos frecuentes

| Atributo | Uso |
|----------|-----|
| `supersedes_id` | FK a versión anterior de evidencia |
| `observation_id` | Enlace obligatorio en subsanación |
| `content_hash_sha256` | Integridad del blob |
| `created_by_role` | `CC`, `TD`, `JD`, `SYSTEM` |

---

## Anti-patrones (prohibidos)

| Prohibido | Usar en su lugar |
|-----------|------------------|
| Archivo, File, documento genérico | **Evidencia** / `evidence_version` |
| Rechazado (como estado API) | **OBSERVADO** |
| Step, Stage | **Fase** |
| DELETE evidencia normativa | Nueva versión + append-only |
| Columnas `Unnamed: 0`, `gtin` en modelo | Eliminar en ETL; no persistir |

---

## Siglas institucionales

| Sigla | Significado |
|-------|-------------|
| **CEUB** | Consejo de Evaluación Universitaria de Bolivia |
| **ARCU-SUR** | Red de cooperación universitaria del Sur |
| **DUEA** | Dirección Universitaria de Evaluación y Acreditación UMSS |
| **UMSS** | Universidad Mayor de San Simón |

---

## Trazabilidad documental

| Documento | Relación |
|-----------|----------|
| BRD | Objetivos y restricciones de negocio |
| PRD | Épicas e historias |
| FSD (este árbol) | Comportamiento verificable |
| `07_diagramas/` | Representaciones visuales |
