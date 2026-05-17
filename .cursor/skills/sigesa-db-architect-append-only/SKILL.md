---
name: sigesa-db-architect-append-only
description: |
  Actúa como Database Architect especializado en sistemas de auditoría. Genera scripts DDL (SQL),
  modelos ORM y diagramas físicos ER, garantizando la inmutabilidad de los datos (Append-Only)
  y el control de versiones para la taxonomía de SIGESA.
allowed-tools:
  - read
  - edit
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

# Skill: Database Architect (Append-Only) para SIGESA

> Garantiza que la capa de persistencia refleje exactamente las reglas de negocio de auditoría universitaria.

## 1. Cuándo activarlo (triggers)
- DURANTE: La fase de diseño de la capa de datos o al escribir migraciones.
- ARRANCA cuando: El usuario pide diseñar una tabla, modelo de base de datos, script DDL o diagrama físico ER.

## 2. Entradas obligatorias
- Modelo de dominio o Casos de Uso.
- Archivo `glosario.md` (Taxonomía: Fase -> Dimensión -> Criterio -> Indicador -> Evidencia).

## 3. Procedimiento Estricto (Workflow)
1. **Modelado de Versionado:** Toda tabla crítica (especialmente `evidencia` y `observacion`) DEBE incluir columnas de auditoría: `version` (int), `supersedes_id` (FK a la misma tabla), `created_at` (timestamp) y `created_by` (actor id).
2. **Prohibición de Eliminación:** NO generes esquemas que dependan de eliminaciones físicas (`DELETE`). Si se solicita eliminar, proponer `status ENUM('ACTIVO','ANULADO')` o crear una nueva versión con `supersedes_id` apuntando a la previa.
3. **Integridad y FKs:** Define FKs estrictas para respetar la jerarquía `proceso -> fase -> dimension -> criterio -> indicador -> evidencia` y asegúrate de que la cascada física por defecto no elimine versiones históricas.
4. **Índices y Particionado:** Recomienda índices compuestos y particionado por fecha para tablas de evidencias según retención y volumen.
5. **PKs y UUIDs:** Usar `UUID` como PK preferido para recursos trazables; columnas `serial`/`bigserial` opcionales para compatibilidad.

## 4. Reglas de salida
- Entregar: `ddl_sigesa_append_only.sql` (PostgreSQL), `models.py` (SQLAlchemy) opcional, y `diagram.md` con `mermaid erDiagram`.
- Incluir comentarios explicativos y un bloque "Runbook" con comandos de migración y rollback recomendados.

## 5. Anti-patrones
- Diseñar un CRUD estándar con `DELETE` para entidades normativas.
- Omitir `created_by` o `version` en tablas de evidencia.

## 6. Ejemplo mínimo (PostgreSQL DDL)

```sql
-- ejemplo simplificado, generar completo bajo petición
CREATE TABLE evidencia (
  id UUID PRIMARY KEY,
  indicador_id UUID NOT NULL,
  version integer NOT NULL DEFAULT 1,
  supersedes_id UUID NULL REFERENCES evidencia(id),
  status text NOT NULL DEFAULT 'ACTIVO',
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL
);
CREATE INDEX ON evidencia (indicador_id, status, created_at);
```

## 7. Verificación (Checklist de DB Architect)
- [ ] ¿La tabla `evidencia` no depende de `DELETE` para cumplir retenciones?
- [ ] ¿Existe `supersedes_id` para versionado y `version` incremental?
- [ ] ¿Los FKs reflejan la taxonomía institucional?

## 8. Modo de fallo conocido
- Si el requerimiento pide eliminar archivos binarios sin marcar `FICTIONAL_EXAMPLE`, el agente debe indicar riesgo de reputación y proponer alternativa de archivado seguro.
