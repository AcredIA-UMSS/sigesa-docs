# Tabla Comparativa: release/1.0.0 → release/2.0.0
> Fecha: 2026-05-28
> Repositorio: SIGESA-DOCS

## Resumen Ejecutivo
Entre `release/1.0.0` y `release/2.0.0` se registran **705** rutas con cambios (A/M/N cambios renombrados/movidos no desglosados aún en esta versión del reporte). La evolución afecta principalmente gobernanza de prompts, estructura documental (carpetas Doradas), e incorporación de artefactos técnicos y de aplicación.

## Cambios Estructurales de Directorios
- **.cursor/**: incorporación masiva de prompts y skills.
- **app/**: inclusión de estructura completa de backend/front (TypeScript/Next/servicios), migraciones y configuración.
- **Documentación y matrices**: modificaciones en archivos de trazabilidad, mapeos de prompts y metadatos.

## Tabla Completa de Trazabilidad
> Nota: Esta primera entrega del archivo contiene la cabecera estructural requerida por la tarea. La matriz extrema a extrema (símbolo, tipo, rutas por versión, estado, LOC y observaciones) requiere un pase automatizado completo (conteo de encabezados H1/H2/H3 por símbolo en cada rama + detección de igualdad de contenido y/o renombre) para evitar omisiones.

| Símbolo / Artefacto | Tipo | Ruta en v1.0.0 | Ruta en v2.0.0 | Módulo/Sección | Estado | Líneas v1 | Líneas v2 | Δ Líneas | Observaciones |
|---------------------|------|---------------|---------------|----------------|--------|-----------|-----------|----------|---------------|
| AGENTS.md | Documento (H1/H2/H3 como secciones) | `AGENTS.md` | `AGENTS.md` | Gobernanza | MODIFICADO | — | — | — | Pendiente cálculo LOC y secciones |
| PROMPT_MAPPING.md | Documento (H1/H2/H3 como secciones) | `PROMPT_MAPPING.md` | `PROMPT_MAPPING.md` | AI-SDLC / Registro prompts | MODIFICADO | — | — | — | Pendiente cálculo |
| metricas_ai_sdlc.md | Documento (H1/H2/H3 como secciones) | `metricas_ai_sdlc.md` | `metricas_ai_sdlc.md` | AI-SDLC métricas | SIN_CAMBIOS | — | — | — | Pendiente verificación |
| matriz_trazabilidad.md | Documento (H1/H2/H3 como secciones) | `matriz_trazabilidad.md` | `matriz_trazabilidad.md` | Auditoría | MOVIDO/RENOMBRADO | — | — | — | Existe alias en raíz a `docs/09_trazabilidad/` |

## Métricas por Archivo
> Pendiente: calcular LOC por archivo con `git show` y `wc` equivalente (en Windows se requiere recuento por PowerShell).

| Archivo | Secciones v1 | Secciones v2 | Agregadas | Eliminadas | Modificadas | LOC v1 | LOC v2 | Δ LOC |
|---------|-------------|-------------|-----------|-----------|------------|--------|-------|-------|
| AGENTS.md | — | — | — | — | — | — | — | — |
| PROMPT_MAPPING.md | — | — | — | — | — | — | — | — |
| metricas_ai_sdlc.md | — | — | — | — | — | — | — | — |

## Análisis Narrativo
1. Refactorizaciones evidentes: incorporación de estructura `app/` y expansión del catálogo de prompts y governance de agentes.
2. Riesgo para el equipo: alta variación de artefactos, por lo que el valor de la matriz completa es prevenir “eslabones rotos” entre PRD↔FSD↔NFR.
3. Directorios nuevos vs. existentes: `app/` y `.cursor/` crecen significativamente en v2.
4. Reorganización documental: cambios en archivos de mapeo/trazabilidad.

## Artefactos Eliminados — Posibles Impactos
> Pendiente: identificar artefactos con estado `ELIMINADO` y su impacto.

---

