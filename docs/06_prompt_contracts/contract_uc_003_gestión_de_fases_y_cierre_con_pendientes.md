---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-003
domain: fsd-uc-acredia
---

## PC-003 — Gestión de fases y cierre con pendientes (agrupa FSD-UC-002 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para especificación funcional
de fases de procesos de acreditación y reglas de cierre con validación de pendientes.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-002 (canónico): gestión de fases dentro
de un proceso y bloqueo de cierre cuando existen actividades pendientes obligatorias.

# Context
- Entradas: proceso_id, fase con actividades y sus estados
  (pendiente / en_curso / completada), usuario solicitante y rol.
- Referencias de dominio: BR-008, BR-009, BR-010.
- Restricciones: no cerrar proceso con tareas obligatorias pendientes; todo cambio
  de estado queda registrado en historial con actor y timestamp.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Verificar que el proceso existe y está en estado En proceso.
2. Evaluar si existen actividades obligatorias en estado pendiente o en_curso.
3. Si hay pendientes: bloquear cierre y retornar lista de pendientes.
4. Si no hay pendientes: permitir transición y registrar en historial.
5. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes y Gherkin para
(a) cierre bloqueado por pendientes y (b) cierre exitoso sin pendientes.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "No se puede cerrar un proceso con actividades obligatorias pendientes o en curso.",
      "Todo cambio de estado de proceso queda registrado en historial con actor y timestamp.",
      "Solo roles autorizados pueden cambiar el estado de un proceso.",
      "El historial de estados es inmutable (append-only)."
    ],
    "failure_modes": [
      { "code": "FASE_PENDING_TASKS",    "condition": "Existen actividades obligatorias en estado pendiente/en_curso", "message": "No se puede cerrar: existen {N} actividades pendientes: {lista}." },
      { "code": "FASE_PROC_NOT_FOUND",   "condition": "proceso_id no existe",                                          "message": "Proceso no encontrado." },
      { "code": "FASE_INVALID_STATE",    "condition": "El proceso no está en estado En proceso",                       "message": "Solo procesos en estado 'En proceso' pueden cerrarse." },
      { "code": "FASE_UNAUTHORIZED",     "condition": "Usuario sin permiso de cambio de estado",                       "message": "No tiene permisos para cerrar este proceso." }
    ],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Cierre bloqueado:
      Dado un proceso con 3 actividades obligatorias pendientes
      Cuando el Administrador DUEA intenta cerrar el proceso
      Entonces el sistema responde FASE_PENDING_TASKS
      Y devuelve la lista de actividades pendientes sin modificar el estado

      Escenario 2 — Cierre exitoso:
      Dado un proceso con todas las actividades obligatorias en estado completada
      Cuando el Administrador DUEA solicita el cierre
      Entonces el sistema cambia el estado a Acreditado
      Y registra el evento en historial con actor, timestamp y estado anterior

      Escenario 3 — Proceso en estado incorrecto:
      Dado un proceso en estado Acreditado
      Cuando se intenta cerrar nuevamente
      Entonces el sistema responde FASE_INVALID_STATE
      Y no modifica el historial
    "
  }
}
```

---
