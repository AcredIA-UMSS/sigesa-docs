# ADR-0012: Historial append-only de estados de Indicator

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-25 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | `indicator_state_history` · `indicator_current_view` · Audit Service |
| Relacionado | [ADR-0001](ADR-0001-append-only-evidence-storage.md) · [ADR-0005](ADR-0005-audit-log-append-only-postgresql.md) · [ADR-0010](ADR-0010-event-driven-choreography.md) |

## Contexto

La arquitectura cloud v1.0 requiere que las transiciones de Indicator y Phase sean auditables con la misma fuerza que las versiones de Evidence. Un campo mutable `indicator.status` no satisface esa necesidad: aunque exista audit log, el dato principal se sobrescribe y obliga a reconstruir la historia desde una fuente secundaria.

La máquina de estados define transiciones explícitas: `PENDIENTE`, `SUBIDO`, `OBSERVADO`, `SUBSANADO`, `APROBADO`. Cada transición debe persistirse como hecho nuevo y nunca como actualización destructiva.

## Decisión

Se adopta una tabla `indicator_state_history` solo inserción y una vista `indicator_current_view` para consultar el estado actual.

```
indicator_state_history
  id              UUID PRIMARY KEY
  indicator_id    UUID NOT NULL REFERENCES indicator(id)
  previous_state  TEXT NOT NULL
  new_state       TEXT NOT NULL
  created_by_role TEXT NOT NULL
  created_by_id   UUID NOT NULL
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
  correlation_id  UUID NOT NULL
```

La vista `indicator_current_view` retorna el último `new_state` por `indicator_id`. Los servicios de lectura usan la vista; los servicios de escritura insertan en `indicator_state_history`.

El rol de aplicación recibe `SELECT, INSERT` sobre `indicator_state_history` y se revocan explícitamente `UPDATE` y `DELETE`. La misma política aplica a `evidence`, `observation` y `processed_events`.

## Consecuencias

### Positivas

- La historia completa de cada Indicator queda auditable sin depender exclusivamente de `audit_log`.
- La regla “cero UPDATE para estados” se aplica a nivel de dominio y de base de datos.
- El cierre de Phase puede consultar un estado actual derivado de hechos inmutables.

### Negativas

- Las consultas deben usar vista o subquery para estado actual.
- Los ORMs requieren configuración adicional para mapear la vista.

## Validación

- Intentar `UPDATE indicator_state_history` con rol `sigesa_app` debe fallar por permisos.
- Insertar tres transiciones para un Indicator y verificar que `indicator_current_view` devuelve la última.
- Ejecutar la consulta de cierre de Phase antes y después de aprobar el último Indicator.

## Referencias

- [`docs/05_dti/hybrid_architecture.md`](../05_dti/hybrid_architecture.md)
- [`docs/05_dti/adrs/ADR_012_ddl_indicator_state_history.md`](../05_dti/adrs/ADR_012_ddl_indicator_state_history.md)
- [`team/alexAlvarez/docs/context/04_state_machine.md`](../../team/alexAlvarez/docs/context/04_state_machine.md)
