# PROMPT — Matriz de trazabilidad extremo a extremo v1.0 → v2.0

Eres un ingeniero senior trabajando en el repositorio SIGESA-DOCS.

## TAREA
Genera una matriz de trazabilidad completa comparando:
- ANTES: rama `release/1.0.0`
- DESPUÉS: rama `release/2.0.0`

Guarda el reporte en: `docs/tabla_comparativa_v1_v2.md`
Guarda una copia del prompt usado en: `team/borisAngulo/prompt_trazabilidad.md`

---

## PASO 1 — Capturar estructura de ambas ramas

```bash
git ls-tree -r --name-only origin/release/1.0.0
git ls-tree -r --name-only origin/release/2.0.0
git diff --stat origin/release/1.0.0..origin/release/2.0.0
git diff origin/release/1.0.0..origin/release/2.0.0
```

---

## PASO 2 — Identificar símbolos/artefactos

Trata como "símbolo" a:

- Cada archivo `.md` → sus encabezados H1/H2/H3 son secciones individuales
- Cada entrada en `AGENTS.md` → definición de agente
- Cada entrada en `PROMPT_MAPPING.md` → prompt documentado
- Cada entrada en `metricas_ai_sdlc.md` → métrica registrada
- Cada fila en `matriz_trazabilidad.md` → entrada de trazabilidad
- Cada archivo en `docs/` → artefacto documental
- Cada archivo en `app/` (solo v1) → módulo de aplicación
- Cada archivo en `templates/` (solo v2) → plantilla nueva
- Cada key en `_aportes_counts.json` → contador de aportes

---

## PASO 3 — Tabla completa de trazabilidad

| Símbolo / Artefacto | Tipo | Ruta en v1.0.0 | Ruta en v2.0.0 | Módulo/Sección | Estado | Líneas v1 | Líneas v2 | Δ Líneas | Observaciones |
|---------------------|------|---------------|---------------|----------------|--------|-----------|-----------|----------|---------------|

**Estados válidos:**
- `SIN_CAMBIOS` — idéntico en ambas ramas
- `MOVIDO` — mismo contenido, ruta diferente
- `RENOMBRADO` — nombre distinto, contenido trazable
- `MODIFICADO` — mismo nombre, contenido alterado
- `AGREGADO` — solo existe en v2.0.0
- `ELIMINADO` — solo existía en v1.0.0
- `DEPRECADO` — marcado como obsoleto en v2.0.0

---

## PASO 4 — Métricas por archivo

| Archivo | Secciones v1 | Secciones v2 | Agregadas | Eliminadas | Modificadas | LOC v1 | LOC v2 | Δ LOC |
|---------|-------------|-------------|-----------|-----------|------------|--------|--------|-------|

---

## PASO 5 — Resumen ejecutivo

- Total artefactos v1.0.0 / v2.0.0
- Artefactos: agregados / eliminados / modificados / sin cambios
- Directorios nuevos y eliminados
- LOC totales: antes / después / delta

---

## PASO 6 — Análisis narrativo

1. ¿Qué módulos fueron refactorizados?
2. ¿Qué se eliminó y qué impacto tiene para el equipo?
3. ¿Qué aporta `templates/` que no cubría `app/` o `figma/`?
4. ¿Hubo reorganización dentro de `docs/`?
5. ¿Cambió alguna definición en `AGENTS.md`?
6. ¿Se modificaron prompts en `PROMPT_MAPPING.md`?
7. ¿Cambiaron métricas en `metricas_ai_sdlc.md`?

---

## PASO 7 — Guardar archivos

**Reporte principal:**
Ruta: `docs/tabla_comparativa_v1_v2.md`

Estructura:
---
# Tabla Comparativa: release/1.0.0 → release/2.0.0
> Fecha: {fecha}
> Repositorio: SIGESA-DOCS

## Resumen Ejecutivo
## Cambios Estructurales de Directorios
## Tabla Completa de Trazabilidad
## Métricas por Archivo
## Análisis Narrativo
## Artefactos Eliminados — Posibles Impactos
---

**Registro del prompt:**
Guarda este mismo prompt (sin modificaciones) en:
`team/borisAngulo/prompt_trazabilidad.md`

---

## RESTRICCIONES
- No omitir ningún archivo ni encabezado de sección.
- Todo el contenido en español.
- Guardar desde la rama de trabajo actual (`release/2.0.0`).

