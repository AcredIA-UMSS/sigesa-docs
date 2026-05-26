---
name: PC-006
description: Notificaciones SMTP por evento de dominio (FSD-UC-006)
source: team/aylenGonzales/04_fsd/FSD_v2.md
---

# PC-006 — Notificaciones automáticas por correo (FSD-UC-006)

```json
{
  "id": "PC-006",
  "fsd_uc": "FSD-UC-006",
  "role": "Eres un ingeniero de integración especializado en colas de notificaciones SMTP institucionales con reintentos y SLA.",
  "task": "Especifica el subsistema de notificaciones SIGESA: cola de eventos, worker 60s, plantillas HTML, SMTP UMSS, backoff y alertas FALLIDO_DEFINITIVO al JD.",
  "context": {
    "br_aplicables": ["BR-005", "RB-05"],
    "nfr_aplicables": ["NFR-005", "NFR-010", "NFR-011"],
    "sla_minutos": 15,
    "eventos": ["CARGA", "APROBACION", "RECHAZO", "VENCIMIENTO_PROXIMO", "AVANCE_FASE"]
  },
  "reasoning": [
    "1. Modulos dominio INSERT cola con tipo y destinatario",
    "2. Worker consume cada 60s",
    "3. Enviar SMTP TLS institucional",
    "4. Marcar ENVIADO o REINTENTO",
    "5. Scheduler diario alertas 30 15 7 1 dias",
    "6. Tras 3 fallos alertar JD"
  ],
  "stop_condition": "Completo cuando SLA 15 min medible en logs y reintentos documentados.",
  "output": {
    "invariants": [
      "Rechazo siempre incluye justificacion en cuerpo correo",
      "Cola nunca pierde eventos sin estado terminal",
      "SMTP caido no bloquea transaccion de dominio principal"
    ],
    "failure_modes": [
      {"code": "NTF-001", "condition": "SMTP no disponible", "action": "Reintento backoff"},
      {"code": "NTF-002", "condition": "Correo destinatario invalido", "action": "Notificar JD actualizar usuario"},
      {"code": "NTF-003", "condition": "Cola mayor 100 pendientes", "action": "Alerta capacidad"}
    ],
    "acceptance_criteria_gherkin": "Ver FSD-UC-006 §4"
  }
}
```
