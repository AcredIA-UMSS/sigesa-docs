---
name: sigesa-db-architect-append-only
description: |
  Actúa como Database Architect especializado en sistemas de auditoría. Genera scripts DDL (PostgreSQL),
  modelos ORM y diagramas ER físicos, garantizando inmutabilidad (Append-Only) y control de versiones
  para la taxonomía SIGESA.
allowed-tools:
  - read
  - edit
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

## Propósito

Plantilla para invocar al skill `sigesa-db-architect-append-only` cuando se necesita diseñar
la capa de persistencia respetando la regla institucional de no eliminación física y versionado
de evidencias.

## Entradas esperadas
- Modelo de dominio o lista de Casos de Uso (FSD).
- `glosario.md` (taxonomía: Fase -> Dimensión -> Criterio -> Indicador -> Evidencia).
- Parámetros opcionales: RDBMS (por defecto PostgreSQL), política de retención, pico concurrente.

## Ejemplo de invocación

"Actúa como `sigesa-db-architect-append-only`. Genera DDL PostgreSQL para las tablas
`proceso, fase, dimension, criterio, indicador, evidencia, observacion` con versión y
supersedes_id; incluye índices sugeridos, constraints, y un `mermaid erDiagram` del modelo.
Retención: 10 años. ORM: SQLAlchemy models."

## Salidas
- Archivo SQL `ddl_sigesa_append_only.sql` (PostgreSQL) con comentarios técnicos.
- `models.py` o equivalente ORM si se solicita.
- Diagrama `mermaid erDiagram` embebido en Markdown.

## Notas operativas
- No generar `DELETE` en scripts; proponer `status = 'ANULADO'` o versionado.
- Incluir columnas de auditoría: `version`, `supersedes_id`, `created_at`, `created_by`.
- Usar `UUID` para PKs y `bigint`/timestamps para auditoría si el RDBMS lo soporta.
