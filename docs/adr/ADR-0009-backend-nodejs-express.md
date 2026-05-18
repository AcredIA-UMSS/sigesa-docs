# ADR-0009: Backend API con Node.js 20 y Express 4

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-16 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | Capa API REST |
| Fuente equipo | `team/aylenGonzales/09_dti/adr/ADR-006.md` |
| Relacionado | [ADR-0002](ADR-0002-modular-monolith.md) · [ADR-0007](ADR-0007-jwt-rbac-authentication.md) · FSD §2.3 |

## Contexto

Spike FSD: Node/Express vs FastAPI. Bloquea Docker Compose (T-01), auth JWT (T-02), multipart evidencias. Piloto ~150 usuarios concurrentes máx. NFR-009: cobertura Jest ≥ 80 % en dominio.

## Decisión

- **Node.js 20 LTS** + **Express 4** para API REST v1.0.
- Librerías alineadas: `jsonwebtoken`, `multer`, `crypto` (SHA-256), **PDFKit**, **Nodemailer**, ORM/driver PostgreSQL maduro.
- Monorepo o carpetas `backend/` + `frontend/` con ecosistema npm compartido en tooling CI.
- OpenAPI: generar/mantener en `docs/05_dti/openapi.yaml` (artefacto derivado).

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Cohesión con React/TypeScript en equipo | Tipado menos estricto que FastAPI sin disciplina TS |
| POC piloto completado más rápido en spike AcredIA | Reevaluar FastAPI solo si perfil equipo cambia |

## Alternativas rechazadas

- **FastAPI (Python)**: válido técnicamente; descartado en v1.0 por time-to-market del spike y NFR-009 Jest ya previsto en FSD AcredIA.

## Nota para otros equipos

`team/borisAngulo` aún marca stack backend como pendiente ADR-001 en AGENTS.md; para implementación repo-wide prevalece **este ADR-0009** salvo nuevo ADR que lo supersede.
