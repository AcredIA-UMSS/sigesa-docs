# Glosario de dominio – SIGESA / AcredIA

> **Propósito del glosario**: fijar de forma explícita y versionada la correspondencia entre **términos de negocio en español** y los **identificadores en inglés** (entidades, roles, tablas) que usarán ingeniería, datos y agentes de IA al modelar SIGESA. Responde a **"¿con qué nombres consistentes hablamos del dominio?"** y reduce ambigüedad entre BRD/FSD y el código futuro.
>
> **Audiencia**: Producto, arquitectura, desarrollo, QA y asistentes de IA. Complementa la cadena `BRD → MRD → PRD → FSD` sin sustituir esos documentos: enlaza el lenguaje de negocio con el lenguaje de implementación.

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA / AcredIA — Sistema de gestión y seguimiento de acreditaciones (UMSS) |
| Grupo | AcredIA |
| Versión del documento | `v1.0` |
| Fecha | `13/05/2026` |
| Autores | Equipo AcredIA |
| Revisores | Docente + 1 grupo par |
| Estado | Borrador |
| Plantilla de referencia | Alineado a la convención de [`templates/BRD_TEMPLATE.md`](../templates/BRD_TEMPLATE.md), [`templates/fsd_template.md`](../templates/fsd_template.md) y documentos entregados en `docs/` y `team/` |
| Trazabilidad a BRD / FSD | [`docs/BRD_v1.md`](../docs/BRD_v1.md), [`docs/FSD_v1.md`](../docs/FSD_v1.md), [`team/borisAngulo/BRD_v2.md`](../team/borisAngulo/BRD_v2.md), [`team/borisAngulo/FSD_v1.md`](../team/borisAngulo/FSD_v1.md), [`team/alexAlvarez/docs/FSD.md`](../team/alexAlvarez/docs/FSD.md) |
| Prompts utilizados | *(vacío si no se usó IA en esta versión)* |

---

## 1. Resumen ejecutivo

SIGESA centraliza la acreditación de carreras (CEUB, ARCU-SUR) en la UMSS. En la fase de arquitectura y documentación coexisten varios BRD/FSD con vocabulario solapado (p. ej. “documento” frente a “evidencia”, `DOCUMENTO` en un ER frente a `EVIDENCIA` en otro). Sin un glosario acordado, los equipos y las IA generan nombres distintos para el mismo concepto, debilitando trazabilidad y automatización.

Este documento declara **un único mapeo** de términos de negocio en español a **entidades de código en inglés** (`Faculty`, `AcademicProgram`, `Evidence`, etc.) y a **roles** (`ProgramCoordinator`, `DueaTechnician`, …). Las definiciones condensan el comportamiento descrito en los BRD/FSD del repositorio. Una sección de **guardarraíles para IA** impone consulta previa a este archivo y prohíbe el uso del término genérico *File* para la prueba normativa de dominio, que debe llamarse **Evidence**.

---

## 2. Mapeo de entidades y roles

> Tabla maestra: **término de negocio (ES)** → **identificador futuro (EN)** → **definición** alineada a BRD/FSD.

| Término de negocio (ES) | Entidad de código futuro (EN) | Definición (según BRD/FSD) |
|-------------------------|--------------------------------|----------------------------|
| Facultad | `Faculty` | Unidad académica superior que agrupa carreras en la UMSS; dato maestro para filtrar paneles, reportes y procesos (doce facultades en configuración inicial). |
| Carrera | `AcademicProgram` | Programa de formación acreditado (carrera) bajo una facultad; unidad sobre la cual corre el proceso de acreditación y a la que se asignan coordinadores y evidencias. |
| Proceso | `AccreditationProcess` | Ciclo de acreditación de una carrera para un tipo normativo (p. ej. CEUB o ARCU-SUR), con gestión (año), organismo, fechas y estado; no puede duplicarse como proceso activo del mismo tipo para la misma carrera en el mismo periodo. |
| Fase | `Phase` | Etapa mayor del proceso (p. ej. autoevaluación, subsanaciones, evaluación externa); contiene entregables y reglas de avance y cierre según normativa. |
| Dimensión | `EvaluationDimension` | Agrupación del marco de evaluación que organiza criterios e indicadores (p. ej. dimensiones del instrumento CEUB/ARCU-SUR en la taxonomía del sistema). |
| Criterio | `EvaluationCriterion` | Requisito evaluable de la norma al que debe vincularse la evidencia; toda evidencia debe asociarse a un criterio (clasificación obligatoria). |
| Indicador | `Indicator` | Elemento medible o verificable dentro de una fase o subfase que exige una o más evidencias documentales y pasa por estados de revisión y aprobación por la DUEA. |
| Evidencia | `Evidence` | Documento probatorio normativo cargado por la carrera, versionado y auditado; no es un “archivo” genérico del dominio: el término de dominio es **Evidence**. |
| Coordinador de Carrera (CC) | `ProgramCoordinator` | Actor operativo que carga y corrige evidencias de su carrera, atiende observaciones y ve el avance acotado a su programa. |
| Técnico DUEA (TD) | `DueaTechnician` | Actor de auditoría con visibilidad global; valida evidencias, aprueba o rechaza indicadores con justificación y autoriza avances de fase cuando corresponde. |
| Jefatura DUEA (JD) | `DueaAdministrator` | Actor estratégico con visión total: configuración (usuarios, facultades, plantillas), reportes ejecutivos, dictámenes y supervisión de cuellos de botella. |
| Público (P) | `Public` | Consulta anónima del portal de transparencia: solo información oficial publicada (estado de acreditación, certificados, etc.). |

---

## 3. Reglas estrictas para la IA (guardarraíles)

Las siguientes reglas son **obligatorias** para cualquier asistente de IA que genere diagramas, esquemas, código o especificaciones técnicas para este producto.

Rule 1: PROHIBITED: Never use the generic term File when referring to a normative Evidence document. You must strictly use the mapped domain term (Evidence).

Rule 2: Always check this glossary before generating architecture diagrams, database schemas, or future code. If a business term is not listed here, ask the user to define the English variable before proceeding.

---

## 4. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 13/05/2026 | Equipo AcredIA | Creación inicial del glosario de dominio y guardarraíles para IA; estructura alineada a plantillas del repositorio (`templates/`). |

---

## Checklist mínimo de entrega

- [x] **§0 Metadatos** completos (tabla `Campo | Valor`).
- [x] **§1 Resumen ejecutivo** con propósito, problema de vocabulario y uso del glosario.
- [x] **§2 Mapeo de entidades y roles** (tabla con columnas ES / EN / definición).
- [x] **§3 Reglas estrictas para la IA** (texto literal de Rule 1 y Rule 2 en inglés).
- [x] **§4 Registro de cambios** con versión, fecha, autor y descripción del cambio.
- [ ] Revisión por pares registrada como comentarios en el PR (pendiente).

---

*Documento elaborado por el equipo AcredIA — UMSS, Cochabamba, Bolivia, 2026.*  
*Glosario de dominio v1.0: convención de secciones según [`templates/BRD_TEMPLATE.md`](../templates/BRD_TEMPLATE.md) y [`templates/fsd_template.md`](../templates/fsd_template.md).*
