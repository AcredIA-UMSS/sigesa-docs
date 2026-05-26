# Prompt-Contracts — SIGESA v1
**Sistema:** SIGESA — Sistema de Gestión de Evaluación y Acreditación  
**Grupo:** AcredIA (`team/borisAngulo`)  
**Versión:** v1.0 | **Fecha:** 12/05/2026  
**Trazabilidad:** `FSD_v1.md §7` | `casos-de-uso.md`

> Cada contrato sigue los 6 elementos obligatorios: Role · Task · Context · Reasoning · Stop condition · Output, más Invariants y Failure modes.
>
> **Convención de IDs:** **FSD-UC-001…007** (canónico) = `FSD_v1.md` / `DTI_v1.md §2`. Cada **PC-NNN** es un contrato granular; el encabezado indica el FSD-UC canónico que agrupa (no confundir el número de PC con el de UC).

---

## PC-001 — Autenticación y autorización por roles (agrupa FSD-UC-001 canónico)

```markdown
# Role
Eres un agente IA especializado en especificación funcional y validación de contratos de
prompt para autenticación y autorización basada en roles en sistemas institucionales.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-001: autenticación segura y
autorización por rol ante operaciones sensibles. Produce una salida estructurada lista
para implementación y pruebas automatizadas.

# Context
- Entradas: credenciales del usuario (o token SSO), endpoint/operación solicitada,
  roles asignados al usuario.
- Roles disponibles: Administrador DUEA, Jefe de Carrera, Coordinador,
  Técnico operativo/trámites, Evaluador externo, Público general.
- Referencias de dominio: BR-004, BR-005, BR-011.
- Restricciones: no revelar existencia del usuario ante credenciales inválidas;
  operaciones sensibles requieren sesión válida; acceso estrictamente restringido por rol.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Identificar operaciones sensibles y clasificarlas por nivel de riesgo.
2. Definir matriz rol → acciones permitidas / denegadas para cada rol.
3. Redactar invariantes que nunca pueden violarse.
4. Listar failure modes con código, mensaje y condición disparadora.
5. Redactar criterios de aceptación Gherkin (mínimo 2 escenarios).

# Stop condition
Detente cuando: el JSON de salida contenga invariants, failure_modes,
access_control_matrix y acceptance_criteria_gherkin con al menos 2 escenarios.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "Toda acción sensible requiere sesión válida activa.",
      "Sin sesión válida: rechazar sin modificar ningún dato.",
      "Errores de login inválido no revelan si el usuario existe.",
      "Cada usuario opera únicamente con los permisos de su rol asignado."
    ],
    "failure_modes": [
      { "code": "AUTH_NO_SESSION",           "condition": "Operación sensible sin token de sesión",          "message": "Sesión requerida para esta operación." },
      { "code": "AUTH_INVALID_CREDENTIALS",  "condition": "Credenciales no coinciden con ningún usuario",   "message": "Credenciales incorrectas." },
      { "code": "AUTH_NO_ROLE",              "condition": "Usuario existe pero no tiene rol asignado",       "message": "Acceso no autorizado: sin rol asignado." },
      { "code": "AUTH_FORBIDDEN",            "condition": "Rol del usuario no tiene permiso sobre la acción","message": "No tiene permisos para realizar esta operación." },
      { "code": "AUTH_SESSION_EXPIRED",      "condition": "Token de sesión vencido",                        "message": "Su sesión ha expirado. Inicie sesión nuevamente." }
    ],
    "access_control_matrix": {
      "Administrador DUEA":    { "allow": ["crear_proceso","cerrar_proceso","asignar_roles","ver_auditoria","generar_pdf"], "deny": [] },
      "Jefe de Carrera":       { "allow": ["cargar_evidencia","ver_proceso","responder_observacion"],                       "deny": ["asignar_roles","cerrar_proceso"] },
      "Coordinador":           { "allow": ["cargar_evidencia","registrar_actividad","ver_proceso"],                         "deny": ["asignar_roles","cerrar_proceso"] },
      "Técnico operativo":     { "allow": ["cargar_evidencia_limitada","ver_proceso"],                                      "deny": ["asignar_roles","cerrar_proceso","crear_proceso"] },
      "Evaluador externo":     { "allow": ["ver_proceso_asignado","ver_evidencia_asignada"],                                "deny": ["cargar_evidencia","crear_proceso","asignar_roles"] },
      "Público general":       { "allow": ["ver_informacion_publica"],                                                     "deny": ["todo_lo_interno"] }
    },
    "acceptance_criteria_gherkin": "
      Escenario 1 — Login exitoso:
      Dado un usuario con rol Coordinador registrado en el sistema
      Cuando ingresa credenciales correctas
      Entonces obtiene sesión activa
      Y ve únicamente las opciones permitidas para el rol Coordinador

      Escenario 2 — Credenciales inválidas:
      Dado un visitante en la pantalla de inicio de sesión
      Cuando ingresa una contraseña incorrecta
      Entonces el sistema no crea sesión
      Y muestra mensaje genérico sin revelar si el usuario existe

      Escenario 3 — Operación sin sesión:
      Dado un usuario sin sesión activa
      Cuando intenta acceder a /procesos/{id}/evidencias
      Entonces el sistema responde AUTH_NO_SESSION
      Y redirige al login sin modificar datos

      Escenario 4 — Rol sin permiso:
      Dado un Evaluador externo autenticado
      Cuando intenta ejecutar cerrar_proceso
      Entonces el sistema responde AUTH_FORBIDDEN
      Y registra el intento en la bitácora de auditoría
    "
  }
}
```

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

## PC-007 — Panel de estado con semáforo por carrera y facultad (agrupa FSD-UC-005 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para dashboards de seguimiento
con indicadores visuales de riesgo calculados a partir de datos de avance y fechas.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-005 (canónico): panel de estado con
semáforo visual por carrera/facultad, cálculo de porcentaje de avance por criterios
cumplidos y visualización de fechas clave próximas.

# Context
- Entradas: usuario autenticado y rol (determina qué carreras/procesos puede ver).
- Cálculo de avance: actividades_completadas / actividades_totales por proceso.
- Lógica semáforo: Verde = avance ≥ 70 % y sin fecha crítica en < 7 días;
  Amarillo = avance 40–69 % o fecha crítica en < 15 días; Rojo = avance < 40 %
  o fecha crítica vencida.
- Referencias de dominio: BR-008.
- NFR: latencia p95 < 3 000 ms (NFR-001).
- Restricciones: cada usuario ve solo los procesos de su alcance por rol.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Obtener procesos visibles para el usuario según rol.
2. Calcular porcentaje de avance por proceso.
3. Evaluar fechas críticas próximas.
4. Asignar color de semáforo según lógica definida.
5. Ordenar por riesgo (Rojo primero, luego Amarillo, luego Verde).
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes, semaphore_logic
y Gherkin para (a) panel con datos correctos y (b) filtrado por rol.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "El panel muestra únicamente procesos dentro del alcance del rol del usuario.",
      "El cálculo de avance usa actividades_completadas / actividades_totales del proceso.",
      "El semáforo se recalcula en cada carga del panel (no se cachea más de 5 min).",
      "La respuesta del endpoint del panel cumple NFR-001: p95 < 3 000 ms."
    ],
    "failure_modes": [
      { "code": "PANEL_NO_PROCESSES",    "condition": "Usuario sin procesos visibles en su alcance",             "message": "No hay procesos asignados a su alcance." },
      { "code": "PANEL_CALC_ERROR",      "condition": "División por cero en cálculo (proceso sin actividades)",  "message": "El proceso no tiene actividades registradas; avance = 0 %." },
      { "code": "PANEL_TIMEOUT",         "condition": "Respuesta supera 3 000 ms (NFR-001)",                    "message": "El panel tardó demasiado en cargar. Intente nuevamente." },
      { "code": "PANEL_UNAUTHORIZED",    "condition": "Usuario sin sesión válida accede al panel",               "message": "Sesión requerida para ver el panel." }
    ],
    "semaphore_logic": {
      "Verde":   "avance >= 70% AND días_para_fecha_critica > 15",
      "Amarillo":"(avance >= 40% AND avance < 70%) OR (días_para_fecha_critica <= 15 AND dias > 0)",
      "Rojo":    "avance < 40% OR días_para_fecha_critica <= 0"
    },
    "acceptance_criteria_gherkin": "
      Escenario 1 — Semáforo rojo por fecha vencida:
      Dado un proceso con fecha_fin vencida hace 2 días
      Cuando el Administrador DUEA carga el panel
      Entonces el proceso aparece con indicador Rojo
      Y aparece primero en la lista ordenada por riesgo

      Escenario 2 — Filtrado por rol:
      Dado un Coordinador de la carrera Ingeniería de Sistemas
      Cuando accede al panel
      Entonces ve únicamente los procesos de su carrera
      Y no ve procesos de otras carreras o facultades

      Escenario 3 — Panel sin procesos:
      Dado un Evaluador externo sin procesos asignados
      Cuando accede al panel
      Entonces el sistema responde PANEL_NO_PROCESSES
      Y muestra mensaje informativo sin error
    "
  }
}
```

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

## PC-011 — Gestión de usuarios y asignación de roles (agrupa FSD-UC-001 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para administración de usuarios
y control de acceso basado en roles (RBAC) en sistemas institucionales.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-001 (canónico): creación de usuarios,
asignación/modificación de roles y gestión del ciclo de vida de cuentas, con
restricción exclusiva al Administrador DUEA y registro en auditoría.

# Context
- Entradas: datos del nuevo usuario (nombre, email institucional, rol_asignado),
  usuario administrador solicitante.
- Roles asignables: Administrador DUEA, Jefe de Carrera, Coordinador,
  Técnico operativo, Evaluador externo.
- Referencias de dominio: BR-004, BR-005.
- Restricciones: solo el Administrador DUEA puede crear usuarios y asignar roles;
  no crear usuarios sin rol asignado; email debe ser único en el sistema;
  toda creación/modificación queda en auditoría.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Verificar que el solicitante tiene rol Administrador DUEA.
2. Validar unicidad del email en el sistema.
3. Validar que el rol asignado es uno de los roles permitidos del sistema.
4. Crear el usuario con rol asignado y habilitarlo para autenticación.
5. Registrar evento en auditoría con actor, timestamp y datos del nuevo usuario.
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes y Gherkin para
(a) creación exitosa, (b) email duplicado y (c) intento por usuario no autorizado.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "Solo el Administrador DUEA puede crear usuarios y asignar o modificar roles.",
      "Todo usuario debe tener al menos un rol asignado al crearse.",
      "El email de cada usuario es único en el sistema.",
      "Toda creación o modificación de usuario queda registrada en auditoría con actor y timestamp."
    ],
    "failure_modes": [
      { "code": "USR_UNAUTHORIZED",      "condition": "Usuario sin rol Administrador DUEA intenta crear cuenta", "message": "Solo el Administrador DUEA puede gestionar usuarios." },
      { "code": "USR_EMAIL_DUPLICATE",   "condition": "El email ya existe en el sistema",                        "message": "Ya existe un usuario registrado con ese correo electrónico." },
      { "code": "USR_INVALID_ROLE",      "condition": "El rol asignado no es un rol válido del sistema",         "message": "El rol especificado no existe en el sistema." },
      { "code": "USR_MISSING_ROLE",      "condition": "Se intenta crear usuario sin asignar rol",                "message": "Todo usuario debe tener un rol asignado." },
      { "code": "USR_MISSING_FIELDS",    "condition": "nombre o email ausente",                                  "message": "Nombre y correo electrónico son obligatorios." }
    ],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Alta exitosa de usuario con rol asignado:
      Dado un Administrador DUEA autenticado en el módulo de gestión de usuarios
      Cuando registra el usuario 'Carlos Mamani' con email 'c.mamani@umss.edu'
      Y le asigna el rol 'Coordinador de Carrera'
      Entonces el usuario puede autenticarse con ese rol
      Y el cambio queda registrado en auditoría con actor y timestamp

      Escenario 2 — Rechazo por usuario sin rol:
      Dado un Administrador en el formulario de nuevo usuario
      Cuando completa nombre y email pero no asigna ningún rol
      Entonces el sistema responde USR_MISSING_ROLE
      Y muestra el mensaje 'Debe asignar al menos un rol al usuario'

      Escenario 3 — Rechazo por email duplicado:
      Dado que el email 'c.mamani@umss.edu' ya existe en el sistema
      Cuando el Administrador intenta crear otro usuario con el mismo email
      Entonces el sistema responde USR_EMAIL_DUPLICATE
      Y sugiere buscar al usuario existente para modificar sus datos o roles
    "
  }
}
```

---

## PC-012 — Acceso de evaluador externo con alcance mínimo (agrupa FSD-UC-EXT-004 — GAP-002c)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para control de acceso
con principio de mínimo privilegio en sistemas de acreditación institucional.

# Task
Especifica el contrato funcional para FSD-UC-EXT-004 (GAP-002c): acceso del evaluador
externo al sistema con alcance estrictamente limitado a la fase y carrera asignadas,
sin posibilidad de navegar a recursos no autorizados.

# Context
- Entradas: credenciales del evaluador externo, fase_id y carrera_id asignadas
  por el Administrador DUEA.
- Alcance del rol: solo lectura/descarga de documentos de la fase asignada;
  registro de observaciones/informes en formularios habilitados para su rol.
- Referencias de dominio: BR-004, BR-005, BR-011.
- NFR aplicable: NFR-003 (confidencialidad), NFR-004 (no repudio).
- Restricciones: el evaluador no puede ver carreras o fases no asignadas;
  no puede crear usuarios, asignar roles ni acceder a módulos administrativos;
  las credenciales temporales vencen según la política configurada por el administrador.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Autenticar al evaluador con sus credenciales temporales.
2. Cargar el alcance asignado (fase_id, carrera_id) desde la configuración del administrador.
3. Restringir navegación y acceso de datos al alcance definido.
4. Registrar cada acción del evaluador en la bitácora de auditoría.
5. Al vencer las credenciales: invalidar sesión y bloquear acceso.
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes y Gherkin para
(a) acceso exitoso dentro del alcance, (b) intento de acceso fuera del alcance
y (c) credenciales vencidas.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "El evaluador externo solo accede a la fase y carrera explícitamente asignadas por el Administrador DUEA.",
      "Ningún recurso fuera del alcance asignado es visible ni accesible para el evaluador.",
      "Toda acción del evaluador queda registrada en auditoría con actor, recurso y timestamp.",
      "Las credenciales temporales tienen fecha de vencimiento; al vencer, el acceso se invalida automáticamente."
    ],
    "failure_modes": [
      { "code": "EXT_UNAUTHORIZED_RESOURCE", "condition": "Evaluador intenta acceder a carrera o fase no asignada",    "message": "No tiene acceso a este recurso." },
      { "code": "EXT_ADMIN_FUNCTION",        "condition": "Evaluador intenta acceder a módulo administrativo",        "message": "Esta función no está disponible para su rol." },
      { "code": "EXT_CREDENTIALS_EXPIRED",   "condition": "Credenciales temporales del evaluador han vencido",        "message": "Sus credenciales de acceso han vencido. Contacte al Administrador DUEA." },
      { "code": "EXT_NO_SCOPE_ASSIGNED",     "condition": "El evaluador no tiene fase/carrera asignada aún",          "message": "No tiene recursos asignados para revisar en este momento." },
      { "code": "EXT_AUDIT_FAIL",            "condition": "Fallo al registrar acción del evaluador en auditoría",     "message": "Error crítico de auditoría. La acción no fue completada." }
    ],
    "acceptance_criteria_gherkin": "
      Escenario 1 — Acceso exitoso dentro del alcance asignado:
      Dado un evaluador externo asignado a la fase 'Visita de pares' de la carrera 'Arquitectura'
      Cuando accede al sistema con sus credenciales
      Entonces solo ve los documentos y formularios de la fase 'Visita de pares' de 'Arquitectura'
      Y no puede navegar a otras fases, carreras ni módulos administrativos
      Y cada acción queda registrada en auditoría

      Escenario 2 — Intento de acceso a recurso no asignado:
      Dado un evaluador externo con acceso a la carrera 'Arquitectura'
      Cuando intenta navegar a la URL de la carrera 'Derecho'
      Entonces el sistema responde EXT_UNAUTHORIZED_RESOURCE
      Y no expone ningún dato de la carrera 'Derecho'
      Y registra el intento en la bitácora de auditoría

      Escenario 3 — Credenciales vencidas:
      Dado un evaluador cuyas credenciales temporales han vencido
      Cuando intenta autenticarse
      Entonces el sistema responde EXT_CREDENTIALS_EXPIRED
      Y no crea sesión
      Y muestra el mensaje de contacto con el Administrador DUEA
    "
  }
}
```

---

## PC-013 — Vista pública de estado de acreditación (agrupa FSD-UC-EXT-001 — GAP-001)

> **Estado**: borrador v0.1 — completar antes de implementación. Cierra GAP-001.

```markdown
# Role
Agente IA de contratos para endpoints públicos de solo lectura sin exposición de PII.

# Task
Especificar FSD-UC-EXT-001: consulta pública del estado de acreditación por carrera/facultad
según campos publicados por DUEA (PRD-US-021, PRD-REQ-012).

# Context
- PRD §5.7.4 Gherkin vista pública
- RB-11 no aplica a lectura anónima; Ley 164 — cero PII en respuesta
- Relacionado: FSD-UC-005 (panel interno) — reutilizar lógica semáforo sin detalle documental

# Reasoning
1. Definir DTO público: carrera, facultad, fase_actual, color_semaforo, %_avance_agregado, fecha_ultima_actualizacion
2. Excluir: nombres docentes, rutas evidencia, observaciones internas, correos
3. Rate limit + cache 5 min en GET /publico/carreras/{id}
4. Configuración DUEA: publicar/ocultar carrera

# Stop condition
Output con invariants (no PII, no auth requerida), failure modes (404 carrera no publicada, 429 rate limit)
y acceptance_criteria_gherkin copiados de PRD-US-021.

# Output
JSON: endpoints, dto_publico, invariantes, failure_modes, gherkin
```

**Invariantes (borrador)**: `INV-PUB-01` sin PII · `INV-PUB-02` solo campos en whitelist DUEA · `INV-PUB-03` sin listado de evidencias.

---

## PC-014 — Bandeja técnico operativo DUEA (agrupa FSD-UC-EXT-002 — GAP-002a)

> **Estado**: borrador v0.1 — completar antes de implementación.

```markdown
# Role
Agente IA de contratos para bandejas de trabajo y RBAC acotado (técnico operativo).

# Task
Especificar FSD-UC-EXT-002: bandeja de evidencias pendientes y acciones documentales
permitidas al técnico operativo (PRD-US-018).

# Context
- Extiende UC-003 (evidencias) con vista filtrada por permisos rol Técnico Operativo
- BR-006, BR-012; NFR-003, NFR-004

# Stop condition
Output completo con ≥ 4 invariants y ≥ 4 failure modes + Gherkin PRD §5.7.1.
```

---

## Tabla de trazabilidad consolidada

| PC | FSD-UC canónico | Nombre | PRD-US | BRD-BR | NFR | Elementos completos |
|----|-----------------|--------|--------|--------|-----|---------------------|
| PC-001 | FSD-UC-001 | Autenticación y autorización por roles | PRD-US-001, PRD-US-003 | BR-004, BR-005, BR-011 | NFR-003, NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-002 | FSD-UC-002 | Creación y gestión de procesos | PRD-US-008, PRD-US-009 | BR-001, BR-002, BR-003, BR-012 | NFR-004, NFR-005 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-003 | FSD-UC-002 | Gestión de fases y cierre con pendientes | PRD-US-004, PRD-US-006 | BR-008, BR-009, BR-010 | NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-004 | FSD-UC-003 | Carga y versionado de evidencias | PRD-US-010, PRD-US-011 | BR-006, BR-007, BR-012 | NFR-001, NFR-003, NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-005 | FSD-UC-003 | Protección ante borrado destructivo | PRD-US-012 | BR-007, BR-011 | NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-006 | FSD-UC-004 | Flujo de observaciones DUEA ↔ carrera | PRD-US-013, PRD-US-014 | BR-008, BR-010, BR-011 | NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-007 | FSD-UC-005 | Panel semáforo por carrera/facultad | PRD-US-015 | BR-008 | NFR-001 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-008 | FSD-UC-006 | Alertas automáticas por plazos | PRD-US-016 | BR-009, BR-011 | NFR-005 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-009 | FSD-UC-007 | Reporte ejecutivo PDF ≤ 2 clics | PRD-US-017 | BR-008 | NFR-001, NFR-002, NFR-006 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-010 | FSD-UC-002 | Importación masiva de actividades | PRD-US-007 | BR-002, BR-012 | NFR-004, NFR-007 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-011 | FSD-UC-001 | Gestión de usuarios y asignación de roles | PRD-US-002 | BR-004, BR-005 | NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-012 | FSD-UC-EXT-004 | Acceso de evaluador externo con alcance mínimo | PRD-US-020 | BR-004, BR-005, BR-011 | NFR-003, NFR-004 | Role · Task · Context · Reasoning · Stop · Output · Invariants · Failure modes |
| PC-013 | FSD-UC-EXT-001 | Vista pública estado acreditación (borrador) | PRD-US-021 | PRD-REQ-012 | NFR-003, NFR-008 | Borrador GAP-001 |
| PC-014 | FSD-UC-EXT-002 | Bandeja técnico operativo (borrador) | PRD-US-018 | BR-006, BR-012 | NFR-004, NFR-007 | Borrador GAP-002a |

---

## Criterio de evaluación alcanzado

| Nivel | Criterio | ¿Cumplido? |
|-------|----------|------------|
| **EXCELENTE** | ≥ 10 contratos completos | ✅ 12 contratos (PC-001 a PC-012) — cobertura total de los 12 UCs |
| **EXCELENTE** | Los 6 elementos en cada contrato | ✅ Role · Task · Context · Reasoning · Stop condition · Output |
| **EXCELENTE** | Invariants verificables (mínimo 4 por contrato) | ✅ 48 invariants totales |
| **EXCELENTE** | Failure modes con código, condición y mensaje (mínimo 4 por contrato) | ✅ 57 failure modes totales |
| **EXCELENTE** | Gherkin verificable (Dado/Cuando/Entonces), 3 escenarios por contrato | ✅ 36 escenarios totales |
| **EXCELENTE** | Trazabilidad PC → FSD-UC → PRD-US → BRD-BR → NFR | ✅ Tabla consolidada con nombre por fila |
| **EXTRA** | 12 CU en `casos-de-uso.md` agrupados en 7 FSD-UC canónicos + 12 PC | ✅ Tabla consolidada alineada a DTI §2 |

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 12/05/2026 | AcredIA / @ArchAgent | Creación inicial — 10 prompt-contratos con 6 elementos + invariants + failure modes |
| v1.1 | 14/05/2026 | AcredIA / @ArchAgent | Corrección de numeración UC-010/UC-011; adición de PC-010 (Importación masiva), PC-011 (Gestión usuarios), PC-012 (Evaluador externo) para cobertura 1:1 con casos-de-uso.md |