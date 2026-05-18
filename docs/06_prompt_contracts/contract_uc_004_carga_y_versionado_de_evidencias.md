---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-004
domain: fsd-uc-acredia
---

## PC-004 — Carga y versionado de evidencias vinculadas a criterio (agrupa FSD-UC-003 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para gestión documental:
clasificación obligatoria, versionado secuencial e inmutabilidad auditada de evidencias.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-003 (canónico): carga de evidencias
vinculadas a un criterio de acreditación con versionado automático e historial inalterable.

# Context
- Entradas: archivo, metadata (criterio_id, proceso_id, fase_id, descripción),
  usuario responsable y rol.
- Referencias de dominio: BR-006, BR-007, BR-011, BR-012.
- Restricciones: no almacenar sin clasificación obligatoria (criterio_id requerido);
  registrar autor y fecha en cada versión; historial de versiones inalterable;
  confirmación explícita para acciones destructivas.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Validar presencia de clasificación obligatoria (criterio_id, proceso_id, fase_id).
2. Validar que el criterio existe y está asociado al tipo de acreditación del proceso.
3. Crear nueva versión incremental; nunca sobrescribir versiones anteriores.
4. Registrar autor, timestamp y evento en auditoría append-only.
5. Listar invariantes, failure modes, versioning_rules y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes, versioning_rules
y Gherkin para (a) carga exitosa y (b) rechazo por clasificación faltante.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "Toda evidencia debe tener criterio_id, proceso_id y fase_id antes de persistirse.",
      "El historial de versiones es inalterable: ninguna versión puede eliminarse silenciosamente.",
      "Cada versión registra autor, timestamp y hash del archivo.",
      "Solo usuarios autorizados sobre la carrera pueden cargar evidencias."
    ],
    "failure_modes": [
      { "code": "EVID_MISSING_CLASSIFICATION", "condition": "criterio_id, proceso_id o fase_id ausente",         "message": "La evidencia debe clasificarse con criterio, proceso y fase antes de guardar." },
      { "code": "EVID_INVALID_CRITERION",      "condition": "criterio_id no existe o no aplica al proceso",      "message": "El criterio seleccionado no es válido para este proceso de acreditación." },
      { "code": "EVID_UNAUTHORIZED",           "condition": "Usuario sin permiso sobre la carrera del proceso",  "message": "No tiene permisos para cargar evidencias en esta carrera." },
      { "code": "EVID_UPLOAD_FAILED",          "condition": "Fallo en el servicio de almacenamiento",            "message": "Error al guardar el archivo. Intente nuevamente." }
    ],
    "versioning_rules": [
      "version = MAX(versiones_existentes_para_criterio_proceso_fase) + 1",
      "Si no existen versiones previas: version = 1.",
      "Las versiones anteriores permanecen accesibles en el historial.",
      "El reemplazo destructivo requiere confirmación explícita y registra evento EVID_DESTRUCTIVE_REPLACE."
    ],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Carga exitosa:
      Dado un Coordinador autenticado con permiso sobre la carrera
      Cuando sube un archivo con criterio_id, proceso_id y fase_id válidos
      Entonces el sistema almacena la evidencia como versión 1
      Y registra autor y timestamp en auditoría
      Y muestra confirmación con número de versión

      Escenario 2 — Clasificación faltante:
      Dado un Coordinador autenticado
      Cuando intenta guardar un archivo sin seleccionar criterio_id
      Entonces el sistema responde EVID_MISSING_CLASSIFICATION
      Y no persiste el archivo

      Escenario 3 — Segunda versión:
      Dado una evidencia en versión 1 ya almacenada
      Cuando el Coordinador sube un nuevo archivo para el mismo criterio/proceso/fase
      Entonces el sistema crea versión 2
      Y mantiene la versión 1 accesible en el historial
    "
  }
}
```

---
