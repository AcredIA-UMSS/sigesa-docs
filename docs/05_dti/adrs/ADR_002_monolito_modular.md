# ADR_002: Monolito modular para SIGESA v1.0

| Campo | Valor |
|-------|-------|
| **Canónico** | [ADR-0002](../../adr/ADR-0002-modular-monolith.md) |
| **Estado** | **Aceptada** |
| **Fecha** | 2026-05-17 |
| **Alcance** | Arquitectura de aplicación UMSS |
| **Trazabilidad** | FSD §2.4 · MOD-* en matriz · NFR operabilidad |

## Contexto

SIGESA no es un marketplace ni una plataforma de analítica masiva: es un **flujo transaccional** con máquina de estados del Indicador, validaciones RBAC por carrera, carga de archivos y generación de reportes PDF. El tráfico esperado en el piloto (5–10 carreras, ~150 usuarios concurrentes máximos según estimación del equipo AcredIA) es moderado. El equipo de implementación es acotado (~4 desarrolladores) con ventana al piloto Q3–Q4 2026 y restricción de **costo $0** en servicios cloud de pago (SA-05, BRD).

Microservicios introducirían fronteras de red, despliegues independientes, observabilidad distribuida y consistencia eventual en operaciones que el dominio exige **atómicas** (escritura de blob + fila `evidence_version` + transición de estado + fila `audit_log`). Un monolito bien modularizado con límites explícitos (`MOD-AUTH`, `MOD-EVIDENCE`, `MOD-WORKFLOW`, etc.) concentra la complejidad donde aporta valor: reglas append-only y máquina de estados, no en orquestación de diez contenedores.

El FSD Dorado ya declara estilo “monolito modular” como referencia funcional; este ADR fija la decisión técnica y el mapa de módulos para el DTI y el código.

## Alternativas consideradas

| Alternativa | Pros | Contras | Veredicto |
|-------------|------|---------|-----------|
| **A. Monolito modular (hexagonal)** | Menor latencia entre módulos; un `pg_dump`; despliegue Docker Compose único | Escalado horizontal acoplado | **Elegida** |
| **B. Microservicios + broker (Kafka/Rabbit)** | Escalado independiente por servicio | Sobredimensionado; anti-patrón skill técnica SIGESA | Rechazada |
| **C. Serverless (Lambda)** | Escala automática | OPEX; datos fuera de servidor UMSS | Rechazada |
| **D. Dos monolitos (API + worker pesado)** | Separa notificaciones | Aceptable como evolución interna; v1.0 usa cola en BD + cron ligero | Parcial v1.0 |

## Decisión

1. **Un despliegue aplicativo** `sigesa-api` (Node.js + Express, ver ADR_009) con fronteras de paquete por módulo lógico.
2. **Arquitectura hexagonal** en el núcleo: casos de uso en dominio, adaptadores HTTP/PostgreSQL/volumen/SMTP en bordes (ver [`DTI.md`](../DTI.md) §5).
3. **Frontend** SPA React desacoplado (`sigesa-web`), stateless, consume REST `/api/v1`.
4. **Comunicación entre módulos**: in-process (llamadas directas a puertos), no HTTP interno en v1.0.
5. **Worker de notificaciones**: mismo runtime o contenedor sidecar; cola `notification_outbox` en PostgreSQL (sin Kafka).

### Mapa de módulos (v1.0)

| Módulo | Responsabilidad | UC principales |
|--------|-----------------|----------------|
| MOD-AUTH | Login, JWT, RBAC, usuarios | FSD-UC-001, UC-002 |
| MOD-PROCESS | Proceso, Fase, plantillas CEUB/ARCU-SUR | UC-003, UC-008 |
| MOD-EVIDENCE | Carga, versionado, búsqueda | UC-005, UC-006 |
| MOD-WORKFLOW | Observaciones, aprobación [TD] | UC-007, UC-009 |
| MOD-DASH | Panel semaforizado | UC-011 |
| MOD-NOTIFY | Cola SMTP | UC-012 |
| MOD-REPORT | PDF ejecutivo | UC-013 |
| MOD-PUBLIC | Portal [P] | UC-014 |
| MOD-AUDIT | Bitácora append-only | UC-017 |

## Consecuencias

### Positivas

- Time-to-market alineado al piloto; un solo pipeline CI/CD y una imagen Docker principal.
- Transacciones ACID locales entre evidencia, estado e auditoría sin saga distribuida.
- Onboarding de desarrolladores: un repositorio de backend, convenciones únicas.

### Negativas

- Escalar solo la capa de lectura (p. ej. búsqueda) requiere refactor o réplicas de lectura en v2.
- Fallo de despliegue afecta todos los módulos; mitigación con health checks y rollback de imagen.

### Evolución prevista

Extracción a servicio separado solo si métricas de producción demuestran cuello de botella aislado (p. ej. generación PDF masiva), mediante nuevos ADR que supersedan este documento sin romper append-only.

## Referencias

- [`docs/04_fsd/FSD.md`](../../04_fsd/FSD.md) §2.4
- [`team/aylenGonzales/09_dti/DTI_v1.md`](../../../team/aylenGonzales/09_dti/DTI_v1.md) §3
- [`team/borisAngulo/docs/09_dti/DTI_v1.md`](../../../team/borisAngulo/docs/09_dti/DTI_v1.md) §4
