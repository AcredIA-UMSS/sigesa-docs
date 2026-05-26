# ADR-0010: Coreografía Event-Driven con AWS EventBridge

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-25 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | Evidence Service · Audit Service · Orchestration Service · Notification Service |
| Relacionado | [ADR-0002](ADR-0002-modular-monolith.md) · [ADR-0011](ADR-0011-sqs-fifo-phase-closure.md) · [ADR-0012](ADR-0012-indicator-state-history-append-only.md) |

## Contexto

La arquitectura monolito modular de ADR-0002 fue la base inicial, pero la decisión institucional vigente promueve la arquitectura cloud distribuida como v1.0 oficial. El ciclo de Observación y Subsanación exige que la carga de Evidence por [CC], la validación por [TD], las notificaciones y el cierre de Phase no queden acoplados en una única transacción HTTP.

El problema principal es la mezcla de responsabilidades: Evidence Service debe gestionar el blob y los metadatos de Evidence, mientras Audit Service debe gobernar la máquina de estados. Si Evidence Service también actualiza el estado de Indicator, cualquier cambio en validación normativa obliga a tocar el servicio de carga y rompe la separación del dominio.

## Decisión

Se adopta coreografía Event-Driven con AWS EventBridge para la comunicación inter-servicio. Cada servicio publica eventos al completar su responsabilidad y no invoca directamente a otros servicios.

| Servicio emisor | Evento | Servicios consumidores |
|-----------------|--------|------------------------|
| Evidence Service | `EvidenceUploaded` | Audit Service, Notification Service |
| Evidence Service | `EvidenceSubsanated` | Audit Service, Notification Service |
| Audit Service | `IndicatorApproved` | Orchestration Service, Notification Service |
| Audit Service | `IndicatorObserved` | Notification Service |
| Orchestration Service | `PhaseCompleted` | Notification Service |

Evidence Service no actualiza estado de Indicator. Publica `EvidenceUploaded` o `EvidenceSubsanated` y termina. Audit Service consume esos eventos y es el único responsable de insertar transiciones en `indicator_state_history`.

Cada evento incluye `type`, `version`, `timestamp`, `correlationId` y payload de dominio. Los consumidores deben ser idempotentes mediante tabla `processed_events`, porque EventBridge entrega al menos una vez.

## Consecuencias

### Positivas

- Evidence Service y Audit Service evolucionan sin coordinar despliegues.
- Notification Service agrega canales sin modificar servicios de negocio.
- EventBridge deja una traza temporal que soporta auditoría normativa.

### Negativas

- El sistema adopta consistencia eventual entre la publicación de un evento y la proyección del nuevo estado.
- El diagnóstico requiere observabilidad distribuida: CloudWatch, correlation IDs y métricas por consumidor.

## Validación

- Publicar `EvidenceUploaded` en staging y verificar que Audit Service inserta exactamente una transición en `indicator_state_history`.
- Reenviar el mismo `correlationId` y verificar que no se duplica el procesamiento.
- Validar en CI que Evidence Service no importa repositorios ni puertos de estado de Indicator.

## Referencias

- [`docs/05_dti/hybrid_architecture.md`](../05_dti/hybrid_architecture.md)
- [`docs/05_dti/adrs/ADR_010_event_driven_choreography.md`](../05_dti/adrs/ADR_010_event_driven_choreography.md)
- [`team/alexAlvarez/docs/context/04_state_machine.md`](../../team/alexAlvarez/docs/context/04_state_machine.md)
