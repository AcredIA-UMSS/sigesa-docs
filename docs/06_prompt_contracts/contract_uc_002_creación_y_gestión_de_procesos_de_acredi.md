---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-002
domain: fsd-uc-acredia
---

## PC-002 — Creación y gestión de procesos de acreditación (agrupa FSD-UC-002 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para especificación funcional
de procesos de acreditación universitaria con reglas de unicidad y validación de datos.

# Task
Define reglas funcionales, validaciones y transiciones del caso de uso FSD-UC-002:
creación y gestión de procesos de acreditación con unicidad por tipo/carrera/periodo
y validación de datos obligatorios.

# Context
- Entradas: datos del proceso (carrera_id, facultad_id, tipo_acreditacion,
  organismo, gestion_año, fecha_inicio, fecha_fin).
- Tipos válidos de acreditación: ARCU-SUR, CEUB, otros.
- Referencias de dominio: BR-001, BR-002, BR-003, BR-012.
- Restricciones: no crear sin datos obligatorios; no duplicar proceso activo
  del mismo tipo/carrera/periodo; fecha_inicio < fecha_fin.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Validar presencia de todos los datos obligatorios.
2. Verificar unicidad: no debe existir proceso activo con mismo tipo/carrera/periodo.
3. Validar coherencia de fechas (inicio estrictamente anterior al fin).
4. Definir estados válidos y transiciones permitidas.
5. Listar invariantes, failure modes y criterios Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes, state_transitions
y Gherkin para (a) datos obligatorios, (b) unicidad y (c) fechas coherentes.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "Un proceso requiere obligatoriamente carrera, facultad, tipo, organismo, gestión, fecha_inicio y fecha_fin.",
      "No puede existir más de un proceso activo del mismo tipo/carrera/periodo.",
      "fecha_inicio debe ser estrictamente anterior a fecha_fin.",
      "Solo usuarios con rol Administrador DUEA pueden crear procesos."
    ],
    "failure_modes": [
      { "code": "PROC_MISSING_FIELDS",   "condition": "Algún campo obligatorio está ausente o vacío",              "message": "Datos obligatorios incompletos: {campos}." },
      { "code": "PROC_DUPLICATE_ACTIVE", "condition": "Ya existe proceso activo mismo tipo/carrera/periodo",       "message": "Ya existe un proceso activo de este tipo para la carrera en el periodo indicado." },
      { "code": "PROC_INVALID_DATES",    "condition": "fecha_inicio >= fecha_fin",                                 "message": "La fecha de inicio debe ser anterior a la fecha de fin." },
      { "code": "PROC_INVALID_TYPE",     "condition": "tipo_acreditacion no está en el enum permitido",            "message": "Tipo de acreditación no reconocido: {tipo}." },
      { "code": "PROC_UNAUTHORIZED",     "condition": "Usuario sin rol Administrador DUEA intenta crear proceso",  "message": "No tiene permisos para crear procesos de acreditación." }
    ],
    "state_transitions": {
      "En proceso": ["Acreditado", "Vencido"],
      "Acreditado":  [],
      "Vencido":     []
    },
    "acceptance_criteria_gherkin": "
      Escenario 1 — Fechas incoherentes:
      Dado un Administrador DUEA autenticado
      Cuando define fecha_inicio posterior a fecha_fin
      Entonces el sistema responde PROC_INVALID_DATES
      Y no persiste el proceso

      Escenario 2 — Proceso duplicado:
      Dado un proceso activo tipo ARCU-SUR para Ingeniería de Sistemas 2026
      Cuando el administrador intenta crear otro proceso con los mismos parámetros
      Entonces el sistema responde PROC_DUPLICATE_ACTIVE
      Y el proceso existente no se modifica

      Escenario 3 — Campos obligatorios faltantes:
      Dado un Administrador DUEA autenticado
      Cuando envía el formulario sin el campo organismo
      Entonces el sistema responde PROC_MISSING_FIELDS indicando el campo faltante
      Y no crea el proceso

      Escenario 4 — Creación exitosa:
      Dado un Administrador DUEA autenticado con datos completos y válidos
      Cuando crea el proceso
      Entonces el sistema persiste el proceso en estado En proceso
      Y registra el evento en auditoría con actor y timestamp
    "
  }
}
```

---
