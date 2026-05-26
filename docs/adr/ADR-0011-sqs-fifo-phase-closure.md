# ADR-0011: SQS FIFO para cierre concurrente de Phase

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-25 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | Orchestration Service · PhaseCloseRule · `indicator_state_history` |
| Relacionado | [ADR-0010](ADR-0010-event-driven-choreography.md) · [ADR-0012](ADR-0012-indicator-state-history-append-only.md) |

## Contexto

La máquina de estados exige que una Phase cierre si y solo si todos sus Indicators están en `APROBADO`. En un entorno distribuido, varios eventos `IndicatorApproved` de la misma Phase pueden llegar casi al mismo tiempo. Si dos instancias del Orchestration Service ejecutan el conteo simultáneamente, pueden leer un estado intermedio y omitir o duplicar el evento `PhaseCompleted`.

El patrón Append-Only evita usar una fila mutable de estado como mecanismo de bloqueo. Por tanto, el control de concurrencia debe ocurrir antes de la evaluación de cierre, ordenando los eventos por Phase.

## Decisión

Se adopta SQS FIFO con `MessageGroupId = phaseId` para todos los eventos `IndicatorApproved` que alimentan la regla de cierre de Phase.

```
EventBridge
  -> Rule(type = IndicatorApproved)
  -> SQS FIFO sigesa-phase-closure.fifo
       MessageGroupId = phaseId
  -> Orchestration Service
```

SQS FIFO garantiza orden total por `phaseId`: el siguiente mensaje del grupo no se entrega hasta confirmar el anterior. El handler ejecuta la consulta `COUNT(APROBADO) == COUNT(TOTAL)` dentro de una transacción `REPEATABLE READ` y registra `correlationId` en `processed_events` para idempotencia.

La cola debe tener Dead Letter Queue con `maxReceiveCount = 3`. Un mensaje malformado no puede bloquear indefinidamente el cierre de la Phase.

## Consecuencias

### Positivas

- La regla de cierre de Phase se evalúa de forma determinista.
- No se introduce estado mutable ni locks distribuidos.
- El mecanismo escala por Phase: distintas Phases pueden procesarse en paralelo.

### Negativas

- Los eventos de una misma Phase se procesan secuencialmente.
- La operación introduce latencia de cola, aceptable para el flujo de acreditación.

## Validación

- Publicar múltiples `IndicatorApproved` para una misma Phase y verificar que `PhaseCompleted` se emite exactamente una vez.
- Reenviar un evento con el mismo `correlationId` y verificar idempotencia.
- Forzar fallo del handler y comprobar envío a DLQ tras tres intentos.

## Referencias

- [`docs/05_dti/hybrid_architecture.md`](../05_dti/hybrid_architecture.md)
- [`docs/05_dti/adrs/ADR_011_sqs_fifo_phase_closure.md`](../05_dti/adrs/ADR_011_sqs_fifo_phase_closure.md)
- [`team/alexAlvarez/docs/context/04_state_machine.md`](../../team/alexAlvarez/docs/context/04_state_machine.md)
