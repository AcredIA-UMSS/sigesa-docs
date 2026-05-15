---
name: sigesa-auditor-trazabilidad-dti
description: |
  Actúa como Tech Lead y Auditor de Calidad para SIGESA. Compila el DTI y genera la matriz
  de trazabilidad, asegurando que cada requerimiento de negocio esté atado a una decisión
  arquitectónica y un caso de uso.
allowed-tools:
  - read
  - edit
  - ask-user
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

## Propósito

Facilitar la invocación del skill que audita trazabilidad y compila el Documento de Diseño Técnico
(DTI). Produce una `matriz_trazabilidad.md` y un `DTI.md` consolidado listos para desarrollo.

## Entradas esperadas
- Carpetas de negocio: `docs/01_brd/`, `docs/02_mrd/`, `docs/03_prd/`.
- Carpetas técnicas: `docs/04_fsd/` (Casos de Uso, ADRs, NFRs).
- Opcional: lista de IDs a priorizar o excluir.

## Ejemplo de invocación

"Actúa como `sigesa-auditor-trazabilidad-dti`. Genera `matriz_trazabilidad.md` que conecte
IDs BRD→PRD→FSD y marque faltantes; compila `DTI.md` en `docs/05_dti/` agregando ADRs,
diagramas Mermaid y NFRs. Señala requisitos huérfanos y solicita aclaraciones." 

## Salidas
- `matriz_trazabilidad.md` con cobertura completa en formato tabla Markdown.
- `docs/05_dti/DTI.md` consolidado.
- Reporte de hallazgos (requerimientos huérfanos, inconsistencias de IDs).

## Notas operativas
- El agente debe pedir confirmación humana antes de crear el `DTI.md` final si detecta inconsistencias críticas.
- Respeta las reglas de nomenclatura y trazabilidad definidas en `matriz_trazabilidad.md` existente.
