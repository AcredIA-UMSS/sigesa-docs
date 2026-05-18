---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-001
domain: fsd-uc-acredia
---

## PC-001 — Autenticación y autorización por roles (agrupa FSD-UC-001 canónico)

```markdown
# Role
Eres un agente IA especializado en especificación funcional y validación de contratos de
prompt para autenticación y autorización basada en roles en sistemas institucionales.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-001: autenticación segura y
autorización por rol ante operaciones sensibles. Produce una salida estructurada lista
para implementación y pruebas automatizadas.

# Context
- Entradas: credenciales del usuario (o token SSO), endpoint/operación solicitada,
  roles asignados al usuario.
- Roles disponibles: Administrador DUEA, Jefe de Carrera, Coordinador,
  Técnico operativo/trámites, Evaluador externo, Público general.
- Referencias de dominio: BR-004, BR-005, BR-011.
- Restricciones: no revelar existencia del usuario ante credenciales inválidas;
  operaciones sensibles requieren sesión válida; acceso estrictamente restringido por rol.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Identificar operaciones sensibles y clasificarlas por nivel de riesgo.
2. Definir matriz rol → acciones permitidas / denegadas para cada rol.
3. Redactar invariantes que nunca pueden violarse.
4. Listar failure modes con código, mensaje y condición disparadora.
5. Redactar criterios de aceptación Gherkin (mínimo 2 escenarios).

# Stop condition
Detente cuando: el JSON de salida contenga invariants, failure_modes,
access_control_matrix y acceptance_criteria_gherkin con al menos 2 escenarios.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "Toda acción sensible requiere sesión válida activa.",
      "Sin sesión válida: rechazar sin modificar ningún dato.",
      "Errores de login inválido no revelan si el usuario existe.",
      "Cada usuario opera únicamente con los permisos de su rol asignado."
    ],
    "failure_modes": [
      { "code": "AUTH_NO_SESSION",           "condition": "Operación sensible sin token de sesión",          "message": "Sesión requerida para esta operación." },
      { "code": "AUTH_INVALID_CREDENTIALS",  "condition": "Credenciales no coinciden con ningún usuario",   "message": "Credenciales incorrectas." },
      { "code": "AUTH_NO_ROLE",              "condition": "Usuario existe pero no tiene rol asignado",       "message": "Acceso no autorizado: sin rol asignado." },
      { "code": "AUTH_FORBIDDEN",            "condition": "Rol del usuario no tiene permiso sobre la acción","message": "No tiene permisos para realizar esta operación." },
      { "code": "AUTH_SESSION_EXPIRED",      "condition": "Token de sesión vencido",                        "message": "Su sesión ha expirado. Inicie sesión nuevamente." }
    ],
    "access_control_matrix": {
      "Administrador DUEA":    { "allow": ["crear_proceso","cerrar_proceso","asignar_roles","ver_auditoria","generar_pdf"], "deny": [] },
      "Jefe de Carrera":       { "allow": ["cargar_evidencia","ver_proceso","responder_observacion"],                       "deny": ["asignar_roles","cerrar_proceso"] },
      "Coordinador":           { "allow": ["cargar_evidencia","registrar_actividad","ver_proceso"],                         "deny": ["asignar_roles","cerrar_proceso"] },
      "Técnico operativo":     { "allow": ["cargar_evidencia_limitada","ver_proceso"],                                      "deny": ["asignar_roles","cerrar_proceso","crear_proceso"] },
      "Evaluador externo":     { "allow": ["ver_proceso_asignado","ver_evidencia_asignada"],                                "deny": ["cargar_evidencia","crear_proceso","asignar_roles"] },
      "Público general":       { "allow": ["ver_informacion_publica"],                                                     "deny": ["todo_lo_interno"] }
    },
    "acceptance_criteria_gherkin": "
      Escenario 1 — Login exitoso:
      Dado un usuario con rol Coordinador registrado en el sistema
      Cuando ingresa credenciales correctas
      Entonces obtiene sesión activa
      Y ve únicamente las opciones permitidas para el rol Coordinador

      Escenario 2 — Credenciales inválidas:
      Dado un visitante en la pantalla de inicio de sesión
      Cuando ingresa una contraseña incorrecta
      Entonces el sistema no crea sesión
      Y muestra mensaje genérico sin revelar si el usuario existe

      Escenario 3 — Operación sin sesión:
      Dado un usuario sin sesión activa
      Cuando intenta acceder a /procesos/{id}/evidencias
      Entonces el sistema responde AUTH_NO_SESSION
      Y redirige al login sin modificar datos

      Escenario 4 — Rol sin permiso:
      Dado un Evaluador externo autenticado
      Cuando intenta ejecutar cerrar_proceso
      Entonces el sistema responde AUTH_FORBIDDEN
      Y registra el intento en la bitácora de auditoría
    "
  }
}
```

---
