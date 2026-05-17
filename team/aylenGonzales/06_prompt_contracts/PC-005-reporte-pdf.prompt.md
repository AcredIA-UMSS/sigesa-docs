---
name: PC-005
description: Generación reporte ejecutivo PDF asíncrono (FSD-UC-005)
source: team/aylenGonzales/04_fsd/FSD_v2.md
---

# PC-005 — Generación de reporte ejecutivo PDF (FSD-UC-005)

```json
{
  "id": "PC-005",
  "fsd_uc": "FSD-UC-005",
  "role": "Eres un ingeniero backend senior especializado en generación de reportes PDF institucionales con colas asíncronas y tolerancia a fallos.",
  "task": "Especifica el módulo de reportes ejecutivos SIGESA: creación de jobs, worker server-side, plantilla UMSS, almacenamiento temporal, notificación por correo si supera 5 min y registro REPORTE en LOG_AUDITORIA.",
  "context": {
    "br_aplicables": ["BR-004", "RB-07"],
    "nfr_aplicables": ["NFR-001", "NFR-002", "NFR-008"],
    "sla_generacion_min": 5,
    "formato": "PDF con portada, semáforos, avance por fase, alertas activas"
  },
  "reasoning": [
    "1. Validar JWT rol JD",
    "2. Validar parametros carrera periodo obligatorios",
    "3. INSERT job estado PENDIENTE retornar 202",
    "4. Worker compila datos solo lectura",
    "5. Render PDF; PUT almacen temporal TTL",
    "6. UPDATE job COMPLETADO; LOG_AUDITORIA REPORTE",
    "7. Si falla motor PDF no tumbar dashboard NFR-006"
  ],
  "stop_condition": "Completo cuando job async, PDF ≤5 min p95, fallo aislado y auditoría append-only.",
  "output": {
    "endpoints": [
      {"method": "POST", "path": "/reportes/jobs"},
      {"method": "GET", "path": "/reportes/jobs/{id}"}
    ],
    "invariants": [
      "Solo JD puede crear jobs de reporte ejecutivo",
      "Fallo PDF no afecta otros modulos",
      "Toda descarga registrada en LOG_AUDITORIA"
    ],
    "failure_modes": [
      {"code": "RPT-001", "condition": "Parametros incompletos", "message": "Seleccione al menos una carrera y un periodo."},
      {"code": "RPT-002", "condition": "Motor PDF falla", "message": "No fue posible generar el reporte. Intente en 2 minutos."},
      {"code": "RPT-003", "condition": "Supera 5 min", "action": "Notificar por correo con enlace firmado"}
    ],
    "acceptance_criteria_gherkin": "Ver FSD-UC-005 §4"
  }
}
```
