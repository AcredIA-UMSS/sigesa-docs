---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-010
domain: fsd-uc-acredia
---

## PC-010 — Importación masiva de actividades por planilla (agrupa FSD-UC-002 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para procesos de importación
masiva de datos con validación por fila, importación parcial y reporte de errores
en sistemas de gestión documental institucional.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-002 (canónico): importación masiva de
actividades desde una plantilla oficial, con validación fila a fila, importación
parcial de filas válidas y reporte detallado de errores por fila.

# Context
- Entradas: archivo de plantilla (formato oficial), proceso_id, fase_id,
  usuario solicitante y rol.
- Campos obligatorios por fila: descripción, responsable, estado
  (valores permitidos: pendiente / en_curso / completada), fecha.
- Referencias de dominio: BR-002, BR-012.
- Restricciones: solo se acepta la plantilla oficial; campos obligatorios por fila
  no pueden estar vacíos; no crear actividades duplicadas en el mismo proceso/fase;
  el lote de filas válidas se importa aunque haya filas con error.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Validar que el archivo sigue el formato de la plantilla oficial (columnas correctas).
2. Validar fila a fila: campos obligatorios, valores de estado permitidos, formato de fechas.
3. Separar filas válidas de filas con error.
4. Importar filas válidas y crear actividades en el proceso/fase.
5. Generar reporte de importación: filas importadas, filas con error y descripción por fila errónea.
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes, import_rules y Gherkin para
(a) importación exitosa total, (b) importación parcial con errores y (c) rechazo por formato incorrecto.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "Solo se acepta el archivo con el formato de la plantilla oficial; cualquier otra estructura es rechazada.",
      "Las filas válidas se importan aunque el lote contenga filas con error (importación parcial).",
      "El reporte de importación debe indicar número de fila y motivo exacto para cada fila errónea.",
      "No se crean actividades duplicadas (misma descripción + responsable + fecha) en el mismo proceso/fase."
    ],
    "failure_modes": [
      { "code": "IMP_INVALID_FORMAT",    "condition": "El archivo no corresponde a la plantilla oficial",          "message": "El archivo no corresponde a la plantilla oficial. Descargue la plantilla desde el sistema." },
      { "code": "IMP_EMPTY_FILE",        "condition": "El archivo no contiene filas de datos",                    "message": "El archivo no contiene actividades para importar." },
      { "code": "IMP_MISSING_FIELD",     "condition": "Campo obligatorio vacío en una o más filas",               "message": "Campo '{campo}' obligatorio vacío en fila(s) {números}." },
      { "code": "IMP_INVALID_STATUS",    "condition": "Valor de estado no permitido en una fila",                 "message": "Valor de estado '{valor}' no permitido en fila {N}. Use: pendiente, en_curso, completada." },
      { "code": "IMP_UNAUTHORIZED",      "condition": "Usuario sin permiso sobre la carrera del proceso",         "message": "No tiene permisos para importar actividades en este proceso." }
    ],
    "import_rules": [
      "Importación parcial: filas válidas se persisten; filas inválidas se reportan sin cancelar el lote.",
      "El reporte final incluye: total importadas, total con error, detalle por fila errónea.",
      "Si todas las filas son inválidas: ninguna se persiste y el reporte lista todos los errores."
    ],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Importación exitosa total:
      Dado un Coordinador autenticado con permiso sobre la carrera
      Y un archivo de plantilla con 15 filas válidas sin errores
      Cuando carga el archivo en el módulo de importación
      Entonces el sistema crea las 15 actividades en la fase correspondiente
      Y muestra el resumen '15 actividades importadas correctamente, 0 errores'

      Escenario 2 — Importación parcial con filas erróneas:
      Dado un archivo con 15 actividades donde las filas 4, 9 y 13 tienen el campo 'responsable' vacío
      Cuando el Coordinador carga el archivo
      Entonces el sistema importa las 12 actividades válidas
      Y reporta 'IMP_MISSING_FIELD en filas 4, 9, 13: campo responsable obligatorio'
      Y no cancela la importación de las filas correctas

      Escenario 3 — Rechazo por formato incorrecto:
      Dado un Coordinador que carga un archivo con columnas distintas a la plantilla oficial
      Cuando el sistema procesa el archivo
      Entonces responde IMP_INVALID_FORMAT
      Y rechaza la importación completa
      Y ofrece el enlace para descargar la plantilla correcta
    "
  }
}
```

---
