---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-005
domain: fsd-uc-acredia
---

## PC-005 — Protección ante borrado o reemplazo destructivo (agrupa FSD-UC-003 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para operaciones destructivas
sobre documentos con confirmación explícita y registro de auditoría inalterable.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-003 (canónico): protección ante borrado
o reemplazo destructivo de evidencias, incluyendo flujo de confirmación obligatoria
y registro del evento en auditoría.

# Context
- Entradas: evidencia_id, tipo_operacion (borrar | reemplazar), usuario solicitante y rol.
- Referencias de dominio: BR-007, BR-011.
- Restricciones: ninguna operación destructiva se ejecuta sin confirmación explícita
  del usuario; el evento queda registrado independientemente del resultado;
  historial de versiones nunca se altera silenciosamente.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Detectar si la operación es destructiva (borrar o reemplazar sin nueva versión).
2. Presentar diálogo de confirmación con detalle de la evidencia afectada.
3. Si el usuario cancela: no modificar nada y registrar intento cancelado.
4. Si el usuario confirma: ejecutar operación y registrar evento EVID_DESTRUCTIVE con actor/timestamp.
5. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes y Gherkin para
(a) confirmación → ejecución, (b) cancelación → sin cambios.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "Ninguna operación destructiva se ejecuta sin confirmación explícita del usuario.",
      "El evento de intento (confirmado o cancelado) siempre se registra en auditoría.",
      "El historial de versiones nunca se elimina silenciosamente.",
      "Solo usuarios con permisos sobre la carrera pueden iniciar operaciones destructivas."
    ],
    "failure_modes": [
      { "code": "DEST_UNAUTHORIZED",     "condition": "Usuario sin permiso sobre la carrera",                   "message": "No tiene permisos para eliminar o reemplazar esta evidencia." },
      { "code": "DEST_EVID_NOT_FOUND",   "condition": "evidencia_id no existe",                                 "message": "La evidencia especificada no existe." },
      { "code": "DEST_CANCELLED",        "condition": "Usuario cancela en el diálogo de confirmación",          "message": "Operación cancelada. No se realizaron cambios." },
      { "code": "DEST_AUDIT_FAIL",       "condition": "Fallo al registrar en auditoría tras la operación",      "message": "Error crítico de auditoría. Operación revertida." }
    ],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Confirmación y ejecución:
      Dado un Coordinador autenticado con permiso sobre la carrera
      Cuando solicita borrar la evidencia EV-042 y confirma en el diálogo
      Entonces el sistema ejecuta el borrado
      Y registra evento EVID_DESTRUCTIVE con actor, timestamp y evidencia_id en auditoría

      Escenario 2 — Cancelación:
      Dado un Coordinador autenticado
      Cuando solicita borrar la evidencia EV-042 y cancela en el diálogo
      Entonces el sistema no modifica la evidencia
      Y registra evento DEST_CANCELLED en auditoría

      Escenario 3 — Sin permiso:
      Dado un Técnico operativo sin permiso sobre la carrera
      Cuando intenta borrar una evidencia
      Entonces el sistema responde DEST_UNAUTHORIZED
      Y no presenta el diálogo de confirmación
    "
  }
}
```

---
