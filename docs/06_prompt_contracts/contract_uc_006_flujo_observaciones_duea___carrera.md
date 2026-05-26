---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-006
domain: fsd-uc-acredia
---

## PC-006 — Flujo de observaciones DUEA ↔ carrera (agrupa FSD-UC-004 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para flujos de comunicación
institucional con estados auditados y trazabilidad a entregables de acreditación.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-004 (canónico): flujo de observaciones
formales entre DUEA y carrera, con estados (abierta / en seguimiento / cerrada),
registro de respuestas y auditoría de cada transición.

# Context
- Entradas: proceso_id, fase_id, observacion (texto, tipo, entregable referenciado),
  usuario creador (DUEA) y usuario respondente (Coordinador/Jefe).
- Referencias de dominio: BR-008, BR-010, BR-011.
- Restricciones: solo DUEA puede crear observaciones; solo Coordinador/Jefe puede
  responder; todo cambio de estado queda en historial con actor y timestamp;
  no se puede cerrar una observación sin respuesta registrada.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Validar actor creador (debe ser DUEA).
2. Crear observación vinculada a proceso/fase/entregable con estado abierta.
3. Notificar al Coordinador/Jefe de la carrera afectada.
4. Al recibir respuesta: cambiar estado a en_seguimiento y registrar.
5. Al confirmar cierre (DUEA): cambiar a cerrada y registrar.
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes, state_transitions
y Gherkin para (a) creación, (b) respuesta y (c) cierre de observación.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "Solo el Administrador DUEA puede crear observaciones formales.",
      "No se puede cerrar una observación sin al menos una respuesta registrada.",
      "Todo cambio de estado registra actor, timestamp y estado anterior.",
      "Una observación cerrada no puede reabrirse en v1."
    ],
    "failure_modes": [
      { "code": "OBS_UNAUTHORIZED_CREATE",  "condition": "Usuario sin rol DUEA intenta crear observación",       "message": "Solo el Administrador DUEA puede crear observaciones formales." },
      { "code": "OBS_CLOSE_WITHOUT_REPLY",  "condition": "Intento de cierre sin respuesta registrada",           "message": "No se puede cerrar la observación sin respuesta de la carrera." },
      { "code": "OBS_NOT_FOUND",            "condition": "observacion_id no existe",                             "message": "Observación no encontrada." },
      { "code": "OBS_ALREADY_CLOSED",       "condition": "Intento de responder una observación cerrada",         "message": "Esta observación ya fue cerrada y no acepta más respuestas." },
      { "code": "OBS_UNAUTHORIZED_REPLY",   "condition": "Usuario sin rol Coordinador/Jefe intenta responder",   "message": "Solo el Coordinador o Jefe de carrera puede responder observaciones." }
    ],
    "state_transitions": {
      "abierta":       ["en_seguimiento"],
      "en_seguimiento": ["cerrada"],
      "cerrada":       []
    },
    "acceptance_criteria_gherkin": "
      Escenario 1 — Creación de observación:
      Dado un Administrador DUEA autenticado
      Cuando crea una observación vinculada a la fase Documentación del proceso PRO-012
      Entonces el sistema registra la observación en estado abierta
      Y notifica al Coordinador de la carrera afectada

      Escenario 2 — Respuesta de la carrera:
      Dado una observación en estado abierta
      Cuando el Coordinador registra una respuesta formal
      Entonces el sistema cambia el estado a en_seguimiento
      Y registra actor y timestamp en historial

      Escenario 3 — Cierre sin respuesta:
      Dado una observación en estado abierta sin respuesta registrada
      Cuando el Administrador DUEA intenta cerrarla
      Entonces el sistema responde OBS_CLOSE_WITHOUT_REPLY
      Y mantiene el estado abierta
    "
  }
}
```

---
