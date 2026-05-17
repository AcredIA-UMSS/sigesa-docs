---
name: sigesa-api-contract-designer
description: |
  Actúa como API Designer para SIGESA. Genera contratos de API (OpenAPI/Swagger)
  o definiciones de GraphQL asegurando RBAC y la integridad de la Máquina de Estados.
allowed-tools:
  - read
  - edit
model-tier: claude-3-opus
fsd-version-min: v0.1
status: stable
owner: Módulo 4 – UMSS (Equipo SIGESA)
---

# Skill: API Contract Designer para SIGESA

> Protege la capa de integración: evita que clientes forcen transiciones de negocio inválidas.

## 1. Cuándo activarlo (triggers)
- DURANTE: Diseño de contratos entre frontend y backend.
- ARRANCA cuando: El usuario solicita un contrato OpenAPI/Swagger, GraphQL, o endpoints relacionados con evidencias, indicadores u observaciones.

## 2. Entradas obligatorias
- `04_state_machine.md` y `glosario.md`.
- Casos de uso con actores para conocer permisos ([CC], [TD], [JD]).

## 3. Procedimiento Estricto (Workflow)
1. **RBAC explícito:** Cada operación debe documentar `x-allowed-roles` (ej. `[CC]`, `[TD]`, `[JD]`).
2. **No permitir `estado` desde el cliente:** Esquemas de payload deben omitir `estado`; el backend asigna el estado inicial (`SUBIDO`) y ofrece endpoints semánticos para transiciones.
3. **Endpoints semánticos de transición:** Diseñar rutas como `POST /evidencias/{id}/observar` o `POST /indicadores/{id}/aprobar` en lugar de `PUT /resource` genérico.
4. **Validación de Máquina de Estados:** Documentar `responses` y `4xx` cuando una transición es inválida para el actor.
5. **Seguridad y scopes:** Incluir `securitySchemes` (JWT/OAuth2) y mapear scopes a roles.

## 4. Salida esperada
- OpenAPI 3.0 YAML/JSON completo (`openapi.yaml`).
- Alternativa GraphQL SDL si se solicita.
- `diagram.md` con `mermaid sequenceDiagram` ilustrando autorización y chequeos de estado.
- Ejemplos de requests/responses y errores de validación de estado.

## 5. Anti-patrones
- **`DELETE /evidencias/{id}`:** Abort generation; proponer `POST /evidencias/{id}/anular`.
- **Permitir `estado` en payloads de cliente:** Abort generation.
- **Endpoints que permitan a [CC] aprobar:** Abort generation; solo `[TD]` puede aprobar según máquina de estados.

## 6. Ejemplo OpenAPI fragment

```yaml
openapi: 3.0.3
info:
  title: SIGESA Evidencias API
  version: '1.0'
paths:
  /evidencias:
    post:
      summary: Subir evidencia
      x-allowed-roles: ['CC']
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  type: string
                  format: binary
                metadata:
                  type: object
              required: [file]
      responses:
        '201':
          description: Evidencia registrada (estado forzado: SUBIDO)
        '400':
          description: Payload inválido

  /evidencias/{id}/aprobar:
    post:
      summary: Aprobar evidencia
      x-allowed-roles: ['TD']
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Aprobada
        '403':
          description: Rol no autorizado o transición inválida
```

## 7. Verificación (Checklist API Designer)
- [ ] ¿Cada endpoint tiene `x-allowed-roles`?
- [ ] ¿Ningún payload cliente puede contener `estado` para entidades con control de flujo?
- [ ] ¿Las transiciones documentadas coinciden con `04_state_machine.md`?

## 8. Modo de fallo conocido
- Si un UC requiere que un actor cambie un estado prohibido por la máquina, el agente debe detenerse y solicitar clarificación del requisito o la aprobación del `[JD]`.
