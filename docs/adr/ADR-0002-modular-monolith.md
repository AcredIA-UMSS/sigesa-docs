# ADR-0002: Monolito modular para SIGESA v1

| Campo | Valor |
|-------|-------|
| Estado | **Propuesta** |
| Fecha | 2026-05-16 |
| Alcance | Arquitectura aplicación UMSS |
| Trazabilidad | FSD §2.4 · matriz MOD-* |

## Contexto

SIGESA es un flujo transaccional con máquina de estados, tráfico institucional moderado y equipo acotado. Microservicios añadirían complejidad operativa sin beneficio en v1.

## Decisión

Monolito modular con límites `MOD-AUTH`, `MOD-EVIDENCE`, `MOD-WORKFLOW`, etc. Despliegue único; comunicación in-process.

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Menor latencia entre módulos | Escalado horizontal acoplado |
| Adecuado a piloto 5–10 carreras | Refactor futuro si crece tráfico |

## Alternativas rechazadas

- Microservicios + Kafka: sobredimensionado (anti-patrón skill técnica).
