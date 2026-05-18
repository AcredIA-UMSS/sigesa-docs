---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-009
domain: fsd-uc-acredia
---

## PC-009 — Generación de reporte ejecutivo PDF en ≤ 2 clics (agrupa FSD-UC-007 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para generación de reportes
ejecutivos PDF desde contexto de proceso con restricciones de latencia y flujo mínimo.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-007 (canónico): generación del reporte
ejecutivo PDF desde el contexto del proceso o panel en no más de 2 interacciones del
usuario, con entrega en menos de 5 segundos (p95).

# Context
- Entradas: proceso_id (derivado del contexto actual), usuario solicitante y rol.
- Contenido del reporte: datos del proceso, fases, avance por criterio, evidencias
  cargadas, observaciones pendientes y semáforo de estado.
- Referencias de dominio: BR-008.
- NFR: latencia p95 < 5 s (NFR-001/§8); flujo ≤ 2 clics desde contexto.
- Restricciones: solo usuarios autorizados pueden generar reportes;
  el reporte refleja el estado actual al momento de la generación (no cacheable > 5 min).

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Verificar sesión y permisos del usuario sobre el proceso.
2. Clic 1: usuario accede al proceso o panel y selecciona "Generar reporte PDF".
3. (Opcional) Clic 2: confirmar parámetros si aplica (fecha de corte, secciones).
4. Motor PDF consolida datos y genera el archivo.
5. Sistema entrega el PDF para descarga directa en ≤ 5 s (p95).
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes y Gherkin para
(a) generación exitosa en ≤ 2 clics y (b) fallo del motor PDF.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "El flujo completo requiere máximo 2 interacciones del usuario desde el contexto.",
      "El reporte refleja el estado actual: no se usa caché de más de 5 minutos.",
      "Solo usuarios con permiso sobre el proceso pueden generar el reporte.",
      "El motor PDF debe responder en p95 < 5 000 ms (NFR-001)."
    ],
    "failure_modes": [
      { "code": "PDF_ENGINE_TIMEOUT",    "condition": "Motor PDF supera 5 000 ms (p95)",                        "message": "La generación del reporte tardó demasiado. Intente nuevamente." },
      { "code": "PDF_ENGINE_DOWN",       "condition": "Motor PDF no disponible",                                 "message": "El servicio de reportes no está disponible. El sistema sigue operativo." },
      { "code": "PDF_UNAUTHORIZED",      "condition": "Usuario sin permiso sobre el proceso",                   "message": "No tiene permisos para generar reportes de este proceso." },
      { "code": "PDF_NO_DATA",           "condition": "Proceso sin datos suficientes para el reporte",          "message": "El proceso no tiene datos suficientes para generar el reporte." }
    ],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Generación exitosa:
      Dado un Administrador DUEA autenticado en el panel del proceso PRO-012
      Cuando hace clic en 'Generar reporte PDF'
      Entonces el sistema genera el PDF en ≤ 5 segundos
      Y lo entrega para descarga directa sin navegación adicional

      Escenario 2 — Motor PDF caído:
      Dado que el motor de reportes PDF no está disponible
      Cuando el Administrador DUEA solicita el reporte
      Entonces el sistema responde PDF_ENGINE_DOWN
      Y el panel y las demás funciones permanecen operativas (NFR-006)

      Escenario 3 — Sin permisos:
      Dado un Evaluador externo autenticado
      Cuando intenta generar el reporte ejecutivo de un proceso
      Entonces el sistema responde PDF_UNAUTHORIZED
      Y no inicia la generación del PDF
    "
  }
}
```

---
