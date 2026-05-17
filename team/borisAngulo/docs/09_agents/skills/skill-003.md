---
name: sigesa-generar-diagramas-equipo
description: >
  Generar archivos .mmd en team/borisAngulo/docs/07_diagramas/ con convencion diag-NN-tipo-nombre,
  comentario %% con fuente FSD/PRD/DTI, sin duplicar tipos ya existentes en el equipo ni en team/*.
  Activar cuando el usuario pida diagramar un UC o modulo aun no cubierto visualmente.
allowed-tools:
  - read
  - edit
model-tier: sonnet
fsd-version-min: v1.0
status: stable
owner: AcredIA / borisAngulo
---

# Skill-003 — Generar diagramas Mermaid en `07_diagramas/` (SIGESA borisAngulo)

> **Agente responsable**: **@VisualAgent** (complementa `mermaid-expert-architect` global con rutas y reglas del equipo).

## 1. Cuándo activarlo

- DURANTE: documentación técnica, cierre de UC, revisión de DTI o auditoría visual de cobertura.
- ARRANCA cuando: el usuario pide "diagrama", "visualizar UC", "nuevo .mmd en 07_diagramas" o detecta un FSD-UC sin diagrama asociado.
- NO ACTIVAR cuando: el tipo de diagrama solicitado ya existe para el mismo UC (ej. segundo `sequenceDiagram` para FSD-UC-001).

## 2. Entradas obligatorias

| Campo | Fuente |
|-------|--------|
| UC o requisito | `FSD-UC-NNN` y/o `PRD-REQ-NNN` |
| Documentación | `team/borisAngulo/docs/01_brd/` … `09_dti/` según alcance |
| Inventario actual | `team/borisAngulo/docs/07_diagramas/*.mmd` |
| Cross-equipo | `team/*/07_diagramas/*.mmd` (evitar duplicar tipo+propósito) |

Si falta el UC o requisito, responder: "Indica FSD-UC-NNN o PRD-REQ-NNN antes de generar el diagrama."

## 3. Inventario de tipos ya cubiertos (borisAngulo)

| Archivo | Tipo | UC / fuente |
|---------|------|-------------|
| diag-01 | sequenceDiagram | FSD-UC-001 |
| diag-02 | sequenceDiagram | FSD-UC-003 |
| diag-03 | sequenceDiagram | FSD-UC-004 |
| diag-04a/04b | stateDiagram-v2 | BR-008, observaciones, evidencia |
| diag-05 | erDiagram | FSD §6 |
| diag-06a | gantt | ciclo acreditación |
| diag-07 | C4Container | DTI §3.2 |
| diag-08 | flowchart | FSD-UC-002 / BR-009 |
| diag-09 | classDiagram | DTI §4.2 |
| diag-10 | pie | NFR ISO 25010 |

Priorizar tipos **no listados** para nuevos UC (journey, timeline, mindmap) solo si están respaldados en PRD/FSD.

## 4. Procedimiento

1. Listar archivos `diag-*.mmd` y extraer el correlativo `NN` máximo; el siguiente es `NN+1`.
2. Elegir tipo Mermaid que **no duplique** el propósito de un archivo existente (misma UC + mismo tipo = prohibido).
3. Leer flujo/reglas del UC en `FSD_v1.md`, `casos-de-uso.md` y `prompt-contracts.md` (PC asociado).
4. Redactar sintaxis Mermaid válida (IDs sin espacios; texto en `ID["Etiqueta legible"]`).
5. Primera línea del archivo: `%% Titulo — Fuente: FSD-UC-XXX / PRD-REQ-XXX`.
6. Guardar como `team/borisAngulo/docs/07_diagramas/diag-NN-tipo-nombre.mmd`.
7. Registrar en `PROMPT_MAPPING.md` fila `| PM-XXX | diag | team/borisAngulo/docs/07_diagramas/ | ... |`.

## 5. Salida esperada

- Uno o más archivos `.mmd` nuevos.
- Tabla de trazabilidad diagrama → UC:

| Archivo | Tipo | FSD-UC | PRD-REQ |
|---------|------|--------|---------|
| diag-11-... | ... | FSD-UC-NNN | PRD-REQ-NNN |

## 6. Criterios de "bien hecho"

- [ ] Cero entidades o transiciones inventadas (solo documentación leída).
- [ ] Comentario `%%` en línea 1 con fuente trazable.
- [ ] Naming `diag-NN-tipo-nombre.mmd` correlativo.
- [ ] No duplica tipo+UC ya diagramado en `07_diagramas/`.

## 7. Anti-patrones

- Copiar diagrama de otro equipo sin adaptar IDs SIGESA → prohibido.
- Usar `DELETE` o flujos que violen append-only en evidencias → STOP.
- Generar `sequenceDiagram` redundante para UC ya cubierto por diag-01/02/03.

## 8. Mini ejemplo

```
"Genera un journey para FSD-UC-006 (alertas automaticas) en 07_diagramas usando skill-003."
```

## 9. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 2026-05-16 | AcredIA / borisAngulo | Versión inicial (post PM-034) |
