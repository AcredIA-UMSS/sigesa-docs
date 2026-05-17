---
name: sigesa-sync-traceability-matrix
description: >
  Actualizar team/aylenGonzales/08_trazabilidad/matriz_trazabilidad.md y metricas_ai_sdlc.md
  tras cambios en PRD-REQ-*, FSD-UC-* o ADR-*; agente @ProductAgent; salida archivos §1–§4 de la matriz.
allowed-tools:
  - read
  - edit
model-tier: sonnet
fsd-version-min: v1.0
status: stable
owner: AcredIA / aylenGonzales
---

# Skill: Sincronizar matriz de trazabilidad SIGESA

> **Agente responsable**: **@ProductAgent** (AGENTS.md §8.1). Solo carpetas `00_context/` … `08_trazabilidad/`, `04_fsd/`, `10_agents/`.

## 1. Cuándo activarlo (triggers)

- DURANTE: nuevo FSD-UC, nuevo PRD-REQ, nuevo ADR, cierre de GAP en FSD_v2 §11.
- ARRANCA cuando: el usuario entrega IDs nuevos (`PRD-REQ-018`, `FSD-UC-012`, `ADR-007`) o un PR que añade UC sin fila en matriz.
- NO ACTIVAR cuando: solo cambios de código en `src/` sin impacto en IDs documentales.

## 2. Entradas obligatorias (Inputs)

El usuario MUST proporcionar al menos una de:

- Lista de IDs añadidos o modificados: `MRD-N-*`, `BR-*`, `PRD-REQ-*`, `FSD-UC-*`, `PC-*`, `NFR-*`, `ADR-*`.
- Ruta al cambio: `team/aylenGonzales/04_fsd/FSD_v2.md` (sección tocada).
- Referencia al PR o commit que introdujo el cambio.

Si falta el ID nuevo, responder: *"Necesito al menos un PRD-REQ-* o FSD-UC-* y su vínculo MRD/BR antes de editar la matriz."*

## 3. Fuentes de verdad (orden de precedencia)

1. `team/aylenGonzales/08_trazabilidad/matriz_trazabilidad.md` (estructura §1–§4 existente).
2. `team/aylenGonzales/04_fsd/FSD_v2.md` §11 (matriz y GAPs).
3. `team/aylenGonzales/03_prd/PRD_v1.md`, `02_mrd/MRD_v1.md`, `01_brd/BRD_v2_aylen.md`.
4. `team/aylenGonzales/08_trazabilidad/metricas_ai_sdlc.md` (fórmulas Prompt Coverage, Spec Fidelity).
5. `team/aylenGonzales/10_agents/AGENTS.md` §13 (umbrales métricas).

## 4. Procedimiento

1. Leer `matriz_trazabilidad.md` completo; identificar formato de filas §1 (12 MRD-N) y §2 (17 PRD-REQ).
2. Para cada ID nuevo:
   - Añadir fila en §1 si hay nuevo `MRD-N-*` (cadena MRD→BR→PRD→US→FSD→PC→NFR→ADR).
   - Actualizar §2 tabla PRD×FSD si hay `PRD-REQ-*` nuevo.
   - Registrar GAP en §3 si falta PC, TC o UC (patrón GAP-003… del FSD).
3. Recalcular en `metricas_ai_sdlc.md`:
   - Prompt Coverage = UC con PC / 10 (v1.0).
   - Spec Fidelity = PRD-REQ trazables / 17.
   - Decision Coverage = RF con ADR / 6 (FSD §13).
4. Actualizar semáforos 🟢/🟡/🔴 según umbrales AGENTS.md §13.
5. **Append-only** en `PROMPT_MAPPING.md` si el usuario lo solicita (PM-032+).
6. Guardar ambos archivos sin borrar historial de versiones en otras carpetas.

## 5. Salida esperada

| Archivo | Acción |
|---------|--------|
| `team/aylenGonzales/08_trazabilidad/matriz_trazabilidad.md` | Modificado — §1–§4 |
| `team/aylenGonzales/08_trazabilidad/metricas_ai_sdlc.md` | Modificado — recálculo métricas |

Resumen obligatorio en respuesta:

| Métrica | Antes | Después |
|---------|-------|---------|
| Prompt Coverage | X % | Y % |
| Spec Fidelity | X % | Y % |
| GAPs abiertos | lista | lista |

## 6. Verificación (criterios de "bien hecho")

- Ningún ID inventado: cada fila citada existe en MRD, PRD, FSD o ADR del repo.
- GAP explícito cuando PRD-REQ sin FSD-UC (ej. PRD-REQ-016, 017 backlog).
- Coherencia con FSD_v2 §11 (no contradecir GAP-003…005 sin documentar resolución).

## 7. Anti-patrones específicos

- Editar `src/` o `09_dti/adr/` desde este skill (fuera de alcance @ProductAgent).
- Eliminar filas históricas de la matriz sin entrada en §20 changelog del documento.
- Marcar Spec Fidelity 100 % ignorando PRD-REQ en backlog documentado.

## 8. Mini ejemplo de invocación

> "Añadí FSD-UC-012 en FSD_v2. Actualiza matriz y métricas. Usa skill_sync_traceability_matrix."

## 9. Modos de fallo conocidos

- PRD-REQ sin BR en BRD → STOP, proponer actualización BRD primero.
- ADR en Propuesta sin merge → fila matriz con nota "ADR pendiente aceptación".

## 10. Registro de cambios del Skill

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 16/05/2026 | Equipo AcredIA | Versión inicial @ProductAgent, AGENTS §13 |
