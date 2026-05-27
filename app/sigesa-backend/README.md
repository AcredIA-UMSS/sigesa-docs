# SIGESA Backend MVP

Microservicios **Evidence**, **Audit** y **Orchestration** (Node 20 + Express + TypeScript), arquitectura hexagonal, persistencia **append-only** y eventos asíncronos.

## Contratos

| Ámbito | Documento |
|--------|-----------|
| Evidence + Audit REST | [`docs/05_dti/api_contracts_cloud.md`](../../docs/05_dti/api_contracts_cloud.md) |
| Auth + Dashboard | [`docs/04_fsd/api_contracts.md`](../../docs/04_fsd/api_contracts.md) (paridad con `sigesa-front`) |
| Arquitectura | [`docs/05_dti/hybrid_architecture.md`](../../docs/05_dti/hybrid_architecture.md) |

## Estructura

```
app/sigesa-backend/
├── gateway/                 # :8080 — proxy único para el front
├── services/
│   ├── evidence-service/    # :3001
│   ├── audit-service/       # :3002 (+ auth, dashboard, /internal/events)
│   └── orchestration-service/ # :3003 (PhaseCompleted, ADR_011)
├── shared/                  # errores, JWT, middleware, eventos
├── migrations/
└── scripts/seed-dev.sql
```

## Desarrollo local

```bash
cp .env.example .env
docker compose up -d postgres minio minio-init
# Migraciones (primera vez)
docker compose exec -T postgres psql -U sigesa -d sigesa -f /migrations/001_ddl.sql
docker compose exec -T postgres psql -U sigesa -d sigesa -f /migrations/002_supplementary.sql
docker compose exec -T postgres psql -U sigesa -d sigesa -f /scripts/seed-dev.sql

npm install
npm run build -w @sigesa/shared
npm run dev:evidence   # terminal 1
npm run dev:audit      # terminal 2
npm run dev:orchestration
npm run dev:gateway
```

Front: `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1`

### Usuarios demo (seed)

| Email | Rol | Password |
|-------|-----|----------|
| cc.demo@umss.edu.bo | CC | Password123! |
| td.demo@umss.edu.bo | TD | Password123! |

Indicator demo: `50505050-5050-5050-5050-505050505050` (estado inicial PENDIENTE)

## Eventos (dev)

Evidence publica a `AUDIT_INTERNAL_EVENTS_URL` (`POST /internal/events`). Audit publica `IndicatorApproved` a Orchestration. **No** hay HTTP síncrono entre dominios de negocio.

## Append-only

Los repositorios usan solo `INSERT` en `evidence_version`, `indicator_state_history`, `observation`. El único `UPDATE` permitido es enlazar `observation_id` en `evidence_version` tras un rechazo TD (metadato de enlace, no reescritura de blob).

## Tests

```bash
npm test -w @sigesa/audit-service
```
