---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-008
domain: fsd-uc-acredia
---

## PC-008 — Alertas automáticas por plazos e hitos (agrupa FSD-UC-006 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para sistemas de alertas
automáticas basadas en scheduler con registro de eventos y manejo de fallos de entrega.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-006 (canónico): generación y envío
automático de alertas por proximidad de plazos e hitos críticos del proceso de
acreditación, sin intervención manual.

# Context
- Actor: Scheduler/Notificador (sistema).
- Ventanas de alerta: 30 días, 15 días, 7 días y 1 día antes de fecha crítica.
- Destinatarios: Administrador DUEA + Coordinador/Jefe de la carrera afectada.
- Canal: correo electrónico (SMTP) o canal equivalente configurado.
- Referencias de dominio: BR-009, BR-011.
- NFR: entrega < 1 min desde disparo (NFR-005 / §8 Integraciones).
- Restricciones: no enviar alertas duplicadas en la misma ventana; registrar
  cada intento y resultado en log de eventos.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Scheduler evalúa procesos activos con fechas críticas en ventana de 30/15/7/1 día.
2. Para cada proceso en ventana: verificar si ya se envió alerta en esta ventana.
3. Si no se envió: generar mensaje con detalle del proceso y fecha crítica.
4. Enviar por canal configurado; registrar resultado (éxito/fallo) en log.
5. Si fallo de entrega: reintentar hasta 3 veces con backoff exponencial.
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes, alert_windows
y Gherkin para (a) alerta enviada y (b) deduplicación.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "No se envía más de una alerta por proceso por ventana de tiempo.",
      "Cada intento de envío (éxito o fallo) queda registrado en el log de eventos.",
      "Las alertas no requieren intervención manual para dispararse.",
      "Ante fallo de canal: reintento hasta 3 veces con backoff exponencial (1 min, 2 min, 4 min)."
    ],
    "failure_modes": [
      { "code": "ALERT_CHANNEL_DOWN",    "condition": "Canal SMTP o equivalente no disponible",                 "message": "Fallo de entrega de alerta. Se reintentará automáticamente." },
      { "code": "ALERT_DUPLICATE",       "condition": "Ya existe registro de alerta enviada en la misma ventana","message": "Alerta ya enviada para este proceso en la ventana actual. No se duplica." },
      { "code": "ALERT_MAX_RETRIES",     "condition": "3 reintentos fallidos",                                   "message": "Alerta no entregada tras 3 intentos. Requiere revisión manual del canal." },
      { "code": "ALERT_NO_RECIPIENTS",   "condition": "Proceso sin Coordinador o DUEA asignado",                "message": "No se encontraron destinatarios válidos para el proceso {proceso_id}." }
    ],
    "alert_windows": [30, 15, 7, 1],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Alerta enviada correctamente:
      Dado un proceso con fecha crítica en 7 días
      Cuando el Scheduler ejecuta la evaluación diaria
      Entonces el sistema genera y envía alerta al DUEA y al Coordinador de la carrera
      Y registra el evento con timestamp, destinatarios y resultado exitoso

      Escenario 2 — Deduplicación:
      Dado que ya se envió alerta de 7 días para el proceso PRO-012
      Cuando el Scheduler vuelve a evaluar en la misma ventana
      Entonces el sistema responde ALERT_DUPLICATE
      Y no envía un segundo correo

      Escenario 3 — Fallo de canal con reintento:
      Dado que el canal SMTP no está disponible
      Cuando el Scheduler intenta enviar una alerta
      Entonces el sistema reintenta hasta 3 veces con backoff exponencial
      Y registra ALERT_MAX_RETRIES si todos los intentos fallan
    "
  }
}
```

---
