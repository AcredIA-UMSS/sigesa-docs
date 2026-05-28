# ADR-0014: Proveedor cloud AWS y estilo de despliegue SIGESA v1.0

| Campo | Valor |
|-------|-------|
| **Número canónico** | **ADR-0014** |
| **Archivo (rúbrica curso)** | `ADR-0005-cloud-provider-y-estilo-de-despliegue.md` |
| **Nota numeración** | El slot **ADR-0005** del índice repo está reservado a [bitácora append-only](ADR-0005-audit-log-append-only-postgresql.md). Este ADR satisface el ítem nominal de rúbrica «cloud provider + estilo de despliegue» sin superseder ADR-0005 audit log. |
| Estado | **Aceptado** |
| Fecha | 2026-05-28 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | Infraestructura v1.0 · DTI §8 · `hybrid_architecture.md` |
| Relacionado | [ADR-0006](ADR-0006-postgresql-16-primary-database.md) · [ADR-0009](ADR-0009-backend-nodejs-express.md) · [ADR-0010](ADR-0010-event-driven-choreography.md) · [ADR-0011](ADR-0011-sqs-fifo-phase-closure.md) · [ADR-0013](ADR-0013-s3-evidence-blob-storage.md) |

## Contexto

SIGESA debe desplegarse en un entorno institucional UMSS con:

- Picos de actividad en ventanas de acreditación CEUB/ARCU-SUR (carga masiva de Evidencias y dictámenes [TD]).
- Requisitos de auditoría normativa: trazabilidad append-only, historial de estados y blobs inmutables ([ADR-0001](ADR-0001-append-only-evidence-storage.md), [ADR-0012](ADR-0012-indicator-state-history-append-only.md)).
- Arquitectura **cloud distribuida** ya decidida en DTI Dorada v1.0: microservicios hexagonales, coreografía EventBridge, SQS FIFO y S3 ([`hybrid_architecture.md`](../05_dti/hybrid_architecture.md)).
- Restricción operativa del curso/proyecto: demostrar MVP ejecutable en laboratorio (`app/` + Docker Compose) sin bloquear el diseño target de producción ([`c4-008-08-contenedores-produccion.mmd`](../07_diagramas/c4-008-08-contenedores-produccion.mmd)).

Faltaba un ADR explícito que **nombre el proveedor cloud**, el **estilo de despliegue** y los **trade-offs** frente a alternativas — requisito de la rúbrica «Excelente» del release 2.0.0 (`docs/`).

## Decisión

### 1. Proveedor cloud: **Amazon Web Services (AWS)**

Se adopta **AWS** como proveedor único para producción v1.0.

| Criterio | Por qué AWS |
|----------|-------------|
| Alineación stack ya decidido | EventBridge, SQS FIFO, S3, RDS PostgreSQL encajan con ADR-0010, ADR-0011, ADR-0013 |
| PostgreSQL gestionado | Amazon RDS PostgreSQL 16 cumple ADR-0006 con respaldo administrado |
| GovTech académico UMSS | Contrato institucional y skills del equipo orientados a AWS en DTI §8 |
| Coste inicial controlado | Fargate + RDS db.t4g + S3 Standard; sin clusters Kubernetes obligatorios en v1.0 |

### 2. Estilo de despliegue

| Entorno | Estilo | Descripción |
|---------|--------|-------------|
| **STAGE / laboratorio** | **Contenedores Docker Compose** | Perfil `full-stack` en `app/sigesa-backend/docker-compose.yml`: gateway + evidence + audit + orchestration + PostgreSQL 16 + MinIO (S3-compatible). Eventos vía webhooks HTTP internos (adaptador dev). |
| **PROD v1.0** | **Microservicios containerizados en AWS ECS Fargate** | Un task definition por servicio (Evidence, Audit, Orchestration, Notification). Sin gestión de nodos EC2. API Gateway (HTTP API o ALB + ECS) como punto de entrada único con JWT/RBAC. |
| **PROD v1.1+ (opcional)** | **Amazon EKS** | Solo si el volumen de carreras concurrentes o políticas DUEA exigen autoscaling multi-AZ avanzado; no requisito v1.0. |

**Patrón arquitectónico:** hexagonal **por servicio** + **coreografía event-driven** entre servicios (no orquestación centralizada de sagas HTTP síncronas).

### 3. Mapeo AWS por capa

| Capa SIGESA | Servicio AWS | ADR / DTI |
|-------------|--------------|-----------|
| Frontend SPA | S3 + CloudFront (estáticos) o contenedor Fargate | DTI §8.2 |
| API / RBAC | API Gateway o ALB + JWT authorizer | ADR-0007 |
| Evidence Service | ECS Fargate | ADR-0013 (S3 blobs) |
| Audit Service | ECS Fargate | ADR-0010, ADR-0012 |
| Orchestration Service | ECS Fargate + **SQS FIFO** | ADR-0011 |
| Notification Service | ECS Fargate + SMTP institucional | FSD-UC-015 |
| Bus de eventos | **Amazon EventBridge** | ADR-0010 |
| Cola ordenada por Phase | **Amazon SQS FIFO** | ADR-0011 |
| BD transaccional | **Amazon RDS PostgreSQL 16** (Multi-AZ STAGE+) | ADR-0006, ADR-0005 audit |
| Blobs Evidencia | **Amazon S3** (versioning + lifecycle) | ADR-0013 |
| Observabilidad | CloudWatch Logs + métricas + alarmas | DTI §8.2 |
| IaC (objetivo) | Terraform 1.8+ | DTI §8 · AGENTS.md |

### 4. Trade-offs explícitos (vs alternativas)

| Alternativa | Motivo de rechazo v1.0 |
|-------------|------------------------|
| **Azure / GCP** | Requeriría reescribir decisiones ADR-0010/0011/0013; sin mandato institucional UMSS documentado |
| **On-prem VMs monolito** | No escala picos CEUB; contradice microservicios y EventBridge del DTI |
| **Serverless puro (Lambda only)** | Evidence upload multipart, conexiones largas SMTP y state machine compleja favorecen contenedores Fargate |
| **Kubernetes obligatorio v1.0** | OPEX y curva operativa alta para piloto DUEA; ECS Fargate suficiente |
| **Multi-cloud activo-activo** | Complejidad innecesaria; RTO/RPO cubiertos con Multi-AZ RDS + S3 |

## Consecuencias

### Positivas

- Una sola nube coherente con ADR-0010–0013 y [`hybrid_architecture.md`](../05_dti/hybrid_architecture.md) §1–§2.
- MVP local (`app/`) y producción comparten **mismo dominio**; solo cambian adaptadores (webhook vs EventBridge, MinIO vs S3).
- ECS Fargate reduce operación vs clusters self-managed.

### Negativas

- **Vendor lock-in** moderado en EventBridge y SQS FIFO.
- Coste AWS recurrente (RDS + Fargate + S3 + tráfico).
- Runbooks Terraform/IAM pendientes de cierre antes de go-live institucional.

## Validación

- [ ] Diagrama C4 producción [`c4-008`](../07_diagramas/c4-008-08-contenedores-produccion.mmd) referencia servicios AWS de esta tabla.
- [ ] POC-01/02 en laboratorio Docker demuestran dominio; migración a Fargate no altera contratos HTTP documentados en [`api_contracts_cloud.md`](../05_dti/api_contracts_cloud.md).
- [ ] Revisión de seguridad: bucket S3 privado, RDS en subnet privada, secretos en AWS Secrets Manager (no `.env` en prod).

## Referencias

- [`docs/05_dti/hybrid_architecture.md`](../05_dti/hybrid_architecture.md) §1.1–1.3, §2.6 (MVP vs prod)
- [`docs/05_dti/DTI.md`](../05_dti/DTI.md) §8 Despliegue y operaciones
- [`docs/07_diagramas/c4-008-08-contenedores-produccion.mmd`](../07_diagramas/c4-008-08-contenedores-produccion.mmd)
- [`app/README.md`](../../app/README.md)
