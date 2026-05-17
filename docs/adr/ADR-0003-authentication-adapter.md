# ADR-0003: Patrón Adapter para autenticación (local v1.0 → LDAP v1.1)

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-16 |
| Decisión Q-02 | Credenciales locales en piloto; LDAP/SSO UMSS en v1.1 |
| Trazabilidad | BRD §21.1 Q-02 · FSD-UC-001 · PRD-REQ-001 |
| Relacionado | [ADR-0007](ADR-0007-jwt-rbac-authentication.md) (JWT/RBAC en API) |

## Contexto

La integración SSO/LDAP institucional puede retrasar el piloto F2 por dependencias de TI. El MVP requiere validar flujos de acreditación con usuarios acotados.

## Decisión

- **v1.0:** implementar `LocalAuthAdapter` (correo @umss.edu.bo + hash Argon2id en `app_user`).
- **v1.1:** implementar `LdapAuthAdapter` sin cambiar servicios de dominio; interfaz `AuthPort` / `AuthenticationProvider`.
- Sesión y RBAC permanecen en capa de aplicación tras autenticación exitosa.

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Piloto no bloqueado por infra | Doble mantenimiento temporal de adaptadores |
| Migración LDAP = cambio de conector | Política de contraseñas local distinta a UMSS hasta v1.1 |

## Alternativas rechazadas

- Esperar LDAP para v1.0: rechazado (riesgo calendario piloto).
- Auth embebida sin interfaz: rechazado (refactor costoso en v1.1).
