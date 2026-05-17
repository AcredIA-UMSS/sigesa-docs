# ADR-0007: Autenticación JWT stateless y RBAC por rol

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-16 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | MOD-AUTH |
| Fuente equipo | `team/aylenGonzales/09_dti/adr/ADR-004.md` |
| Relacionado | [ADR-0003](ADR-0003-authentication-adapter.md) (proveedor credenciales) · FSD-UC-001 · PRD-REQ-001 |

## Contexto

SPA React + API REST stateless. Roles [CC], [TD], [JD], [P] con alcances distintos. Correo `@umss.edu.bo` obligatorio. Sin IdP institucional en v1.0 (TI UMSS). PRD-NFR-006: cero accesos no autorizados en piloto.

## Decisión

- Tras autenticación exitosa ([ADR-0003](ADR-0003-authentication-adapter.md): `LocalAuthAdapter` v1.0), emitir **JWT** con claims: `sub`, `roles[]`, `programId` (si [CC]), `exp` (TTL ≤ 24 h).
- Middleware valida JWT en cada request; RBAC por endpoint y por filtro de datos (FSD-BR-09: [CC] solo su carrera).
- Revocación anticipada: blocklist en BD o TTL corto + refresh controlado.
- Portal [P]: endpoints públicos sin JWT (UC-016), rate limit.

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Escala horizontal API sin sesión servidor | Token robado válido hasta `exp` |
| Alineado a ADR-0009 (jsonwebtoken en Node) | Blocklist añade complejidad si se exige revocación inmediata |

## Alternativas rechazadas

- Sesión en memoria del servidor: acopla escalado.
- OAuth2/OIDC v1.0: bloqueado por ausencia de IdP UMSS (v1.1 vía ADR-0003).

## Separación de responsabilidades

| ADR | Responsabilidad |
|-----|-----------------|
| ADR-0003 | **De dónde** vienen credenciales (local → LDAP) |
| ADR-0007 | **Cómo** se mantiene sesión API (JWT + RBAC) |
