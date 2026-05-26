# ADR-0002: Monolito modular para SIGESA v1

| Campo | Valor |
|-------|-------|
| Estado | **Supersedido parcialmente para cloud v1.0** |
| Fecha | 2026-05-16 |
| Alcance | Arquitectura aplicación UMSS |
| Trazabilidad | FSD §2.4 · matriz MOD-* |
| Relacionado | [ADR-0009](ADR-0009-backend-nodejs-express.md) (runtime) · [ADR-0010](ADR-0010-event-driven-choreography.md) · [`README.md`](README.md) |

## Contexto

SIGESA fue modelado inicialmente como flujo transaccional con máquina de estados, tráfico institucional moderado y equipo acotado. La decisión cloud v1.0 vigente supersede el despliegue monolítico, pero conserva el principio de modularidad interna mediante servicios hexagonales.

## Decisión

Decisión histórica: monolito modular con límites `MOD-AUTH`, `MOD-EVIDENCE`, `MOD-WORKFLOW`, etc. Para implementación cloud v1.0 prevalece ADR-0010: servicios desacoplados por eventos.

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Menor latencia entre módulos | Escalado horizontal acoplado |
| Adecuado a piloto 5–10 carreras | Refactor futuro si crece tráfico |

## Alternativas rechazadas

- Microservicios + Kafka: sobredimensionado (anti-patrón skill técnica).
