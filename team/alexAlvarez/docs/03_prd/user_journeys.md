# User Journeys — SIGESA / AcredIA

> Los siguientes viajes reflejan los flujos críticos de uso para el Coordinador de Carrera [CC] y el Técnico DUEA [TD].

## 1. Viaje del Coordinador de Carrera subsanando una evidencia rechazada

El Coordinador experimenta urgencia y alivio: desde la frustración inicial por el rechazo hasta la seguridad de haber completado la corrección.

```mermaid
journey
  title Journey Coordinador subsana evidencia rechazada
  section Descubrir
    Recibo notificacion de rechazo: 5: coordinador
    Entiendo la observacion con dificultad: 4: coordinador
  section Actuar
    Busco la Evidence en el dashboard: 3: coordinador
    Cargo la nueva version de Evidence: 2: coordinador
  section Validar
    Espero la revision del TD: 3: coordinador
    Recibo confirmacion de aprobacion: 5: coordinador
```

## 2. Viaje del Técnico DUEA revisando indicadores en un lote

El Técnico transita de concentración a alivio al filtrar el lote correcto y cerrar decisiones con justificación clara.

```mermaid
journey
  title Journey Tecnico DUEA audita lote de indicadores
  section Iniciar
    Abro el panel de auditoria: 4: tecnico
    Selecciono filtros por Fase e Indicador: 3: tecnico
  section Revisar
    Reviso evidencia y versiones: 2: tecnico
    Registro rechazo con justificacion: 3: tecnico
  section Cerrar
    Apruebo indicadores validos: 4: tecnico
    Veo avance de fase actualizado: 5: tecnico
```
