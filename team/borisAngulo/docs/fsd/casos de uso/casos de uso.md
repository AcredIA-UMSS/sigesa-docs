# Casos de Uso Críticos — SIGESA v1.0

> **Trazabilidad**: `FSD_v1.md` §4 → `PRD_v1.md` §5 → `BRD_v2.md` §12  
> **Criterio de evaluación**: ≥ 10 casos de uso críticos con flujo principal, flujos alternos y Gherkin verificables.  
> **Total en este documento**: 12 casos de uso.

---

## Índice

| ID | Nombre | Actor principal | PRD trazado |
|----|--------|----------------|-------------|
| FSD-UC-001 | Autenticación y autorización por roles | Usuario humano | PRD-US-001, PRD-US-003 |
| FSD-UC-002 | Creación y gestión de procesos de acreditación | Administrador DUEA | PRD-US-008, PRD-US-009 |
| FSD-UC-003 | Gestión de fases y cierre con pendientes | Administrador DUEA | PRD-US-004, PRD-US-006 |
| FSD-UC-004 | Carga y versionado de evidencias por criterio | Coordinador / Jefe de Carrera | PRD-US-010, PRD-US-011 |
| FSD-UC-005 | Protección ante borrado o reemplazo destructivo | Coordinador / Técnico | PRD-US-012 |
| FSD-UC-006 | Flujo de observaciones DUEA ↔ carrera | Administrador DUEA / Coordinador | PRD-US-013, PRD-US-014 |
| FSD-UC-007 | Panel de estado con semáforo por carrera y facultad | Administrador DUEA | PRD-US-015 |
| FSD-UC-008 | Alertas automáticas por plazos e hitos | Scheduler / Usuario responsable | PRD-US-016 |
| FSD-UC-009 | Generación de reporte ejecutivo PDF en ≤ 2 clics | Administrador DUEA | PRD-US-017 |
| FSD-UC-010 | Importación masiva de actividades por planilla | Coordinador | PRD-US-007 |
| FSD-UC-011 | Gestión de usuarios y asignación de roles | Administrador DUEA | PRD-US-002 |
| FSD-UC-012 | Acceso de evaluador externo con alcance mínimo | Evaluador externo | PRD-US-020 |

---

## FSD-UC-001 — Autenticación y autorización por roles

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-001, PRD-US-003 / BR-004, BR-005, BR-11 |
| **Actor principal** | Usuario humano (cualquier rol) |
| **Precondiciones** | El usuario existe en el sistema y tiene al menos un rol asignado |
| **Disparador** | El usuario intenta acceder al sistema o ejecutar una operación sensible |

### Flujo principal

1. El usuario navega a la pantalla de inicio de sesión.
2. El usuario ingresa sus credenciales (usuario + contraseña o SSO).
3. El sistema valida las credenciales contra el directorio institucional.
4. El sistema determina los roles y permisos del usuario.
5. El sistema crea una sesión activa y redirige al panel correspondiente al rol.
6. El sistema registra el evento `LOGIN` en la bitácora de auditoría con usuario, timestamp e IP.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | Credenciales inválidas (usuario o contraseña incorrectos) | Rechaza el acceso; muestra mensaje genérico sin revelar si el usuario existe; registra intento fallido |
| A2 | Usuario existe pero no tiene ningún rol asignado | Deniega acceso a funciones internas; muestra mensaje de contacto con administrador |
| A3 | Usuario intenta ejecutar operación sensible sin sesión activa | El sistema rechaza la operación y redirige al login; no altera datos |
| A4 | Sesión expirada durante uso activo | El sistema invalida la sesión; redirige al login con mensaje de expiración |

### Postcondiciones

- El usuario opera únicamente con las acciones permitidas para su rol.
- Todo intento de acceso (exitoso o fallido) queda registrado en auditoría.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Acceso exitoso con credenciales válidas
  Dado un usuario con rol "Coordinador de Carrera" registrado en el sistema
  Cuando ingresa sus credenciales correctas en la pantalla de login
  Entonces obtiene una sesión activa
    Y es redirigido al panel de coordinación
    Y solo ve los menús y datos permitidos para su rol
    Y el sistema registra el evento LOGIN en la bitácora de auditoría

Escenario: Acceso denegado con credenciales incorrectas
  Dado un visitante en la pantalla de inicio de sesión
  Cuando ingresa una contraseña incorrecta
  Entonces el sistema no crea sesión
    Y muestra el mensaje "Credenciales inválidas" sin indicar si el usuario existe
    Y no redirige a ninguna vista interna

Escenario: Operación sensible sin sesión activa
  Dado un cliente no autenticado
  Cuando intenta acceder directamente a la URL "/procesos"
  Entonces el sistema redirige al login
    Y no expone ningún dato del sistema
    Y no modifica ningún registro

Escenario: Usuario sin rol asignado
  Dado un usuario registrado al que no se le ha asignado ningún rol
  Cuando ingresa credenciales correctas
  Entonces el sistema no le permite acceder a funciones internas
    Y muestra un mensaje indicando que debe contactar al administrador
```

---

## FSD-UC-002 — Creación y gestión de procesos de acreditación

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-008, PRD-US-009 / BR-001, BR-002, BR-003, BR-012 |
| **Actor principal** | Administrador DUEA |
| **Precondiciones** | La carrera y facultad existen en datos maestros; el administrador tiene sesión activa |
| **Disparador** | El administrador inicia la creación de un nuevo proceso de acreditación |

### Flujo principal

1. El administrador selecciona "Nuevo proceso" desde el panel de gestión.
2. El sistema presenta el formulario con campos obligatorios: carrera, facultad, tipo de acreditación (ARCU-SUR / CEUB), organismo acreditador, gestión (año), fecha de inicio y fecha de fin.
3. El administrador completa todos los campos obligatorios.
4. El sistema valida que la fecha de inicio sea estrictamente anterior a la fecha de fin.
5. El sistema verifica que no exista otro proceso activo del mismo tipo para la misma carrera en el mismo periodo.
6. El sistema crea el proceso en estado "En proceso" y genera el cronograma inicial.
7. El sistema registra el evento de creación en la bitácora de auditoría.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | Campo obligatorio vacío al intentar guardar | Rechaza la operación; señala visualmente el campo faltante con mensaje claro |
| A2 | Fecha de inicio ≥ fecha de fin | Rechaza el guardado; muestra mensaje "La fecha de inicio debe ser anterior a la fecha de fin" |
| A3 | Ya existe un proceso activo del mismo tipo para la misma carrera y periodo | Rechaza la creación; muestra mensaje con el proceso existente |
| A4 | Carrera o facultad no existe en datos maestros | El campo no aparece en el selector; el administrador debe registrar la carrera primero |

### Postcondiciones

- El proceso queda registrado con todos los metadatos obligatorios.
- El evento queda en la bitácora de auditoría con usuario y timestamp.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Creación exitosa de proceso con datos completos
  Dado un administrador DUEA autenticado
  Cuando crea un proceso para la carrera "Ingeniería de Sistemas"
    Y selecciona tipo "ARCU-SUR", organismo "CEUB", gestión "2026"
    Y define fecha de inicio "01/03/2026" y fecha de fin "30/11/2026"
  Entonces el proceso se crea en estado "En proceso"
    Y aparece en el panel global de procesos
    Y el evento queda registrado en auditoría

Escenario: Rechazo por fechas incoherentes
  Dado un administrador DUEA autenticado
  Cuando define fecha de inicio "30/11/2026" y fecha de fin "01/03/2026"
  Entonces el sistema rechaza el guardado
    Y muestra el mensaje "La fecha de inicio debe ser anterior a la fecha de fin"
    Y no crea ningún proceso

Escenario: Rechazo por proceso duplicado activo
  Dado que la carrera "Derecho" ya tiene un proceso activo de tipo "CEUB" en el periodo 2026
  Cuando el administrador intenta crear otro proceso "CEUB" para "Derecho" en 2026
  Entonces el sistema rechaza la operación
    Y muestra el identificador del proceso existente

Escenario: Rechazo por campo obligatorio faltante
  Dado un administrador DUEA en el formulario de nuevo proceso
  Cuando intenta guardar sin seleccionar el tipo de acreditación
  Entonces el sistema no crea el proceso
    Y resalta el campo "Tipo de acreditación" con un mensaje de error visible
```

---

## FSD-UC-003 — Gestión de fases y cierre con pendientes

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-004, PRD-US-006 / BR-008, BR-009, BR-010 |
| **Actor principal** | Administrador DUEA |
| **Precondiciones** | Existe un proceso activo; el administrador tiene sesión activa |
| **Disparador** | El administrador intenta cambiar el estado de una fase o cerrar el proceso |

### Flujo principal

1. El administrador abre un proceso activo desde el panel.
2. El sistema muestra las fases del ciclo: Autoevaluación → Documentación → Visita de pares → Informe externo → Resolución final.
3. El administrador selecciona cambiar el estado de una fase.
4. El sistema verifica que el usuario tiene permisos para el cambio de estado.
5. El sistema verifica que no existen tareas obligatorias pendientes asociadas a la fase.
6. El sistema actualiza el estado de la fase y registra el cambio en el historial del proceso.
7. El sistema registra el evento en la bitácora de auditoría con actor, timestamp y estado anterior/nuevo.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | Intento de cierre del proceso con tareas pendientes | Bloquea el cierre; lista las tareas pendientes que impiden el cierre |
| A2 | Cambio de estado por usuario sin permisos | Rechaza la operación; muestra mensaje de permisos insuficientes |
| A3 | Intento de retroceder a una fase ya cerrada sin autorización | Rechaza la transición; solo administrador puede revertir con justificación |

### Postcondiciones

- El estado de la fase queda actualizado y auditado.
- Si hay tareas pendientes, el proceso permanece en su estado actual.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Cierre bloqueado por tareas pendientes
  Dado un proceso activo con la tarea "Subir informe de autoevaluación" en estado "pendiente"
  Cuando el administrador intenta cerrar el proceso
  Entonces el sistema impide el cierre
    Y muestra la lista de tareas pendientes que deben completarse
    Y el proceso permanece en estado "En proceso"

Escenario: Cambio de estado exitoso sin pendientes
  Dado un proceso donde todas las tareas de la fase "Documentación" están completadas
  Cuando el administrador cambia el estado de la fase a "completada"
  Entonces el sistema actualiza el estado de la fase
    Y registra el cambio en el historial con actor y timestamp
    Y la siguiente fase queda habilitada para operación

Escenario: Cambio de estado por usuario sin permisos
  Dado un técnico operativo autenticado
  Cuando intenta cerrar una fase de un proceso
  Entonces el sistema rechaza la operación
    Y muestra mensaje de permisos insuficientes
    Y no altera el estado de la fase
```

---

## FSD-UC-004 — Carga y versionado de evidencias por criterio

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-010, PRD-US-011 / BR-006, BR-007, BR-012 |
| **Actor principal** | Coordinador / Jefe de Carrera / Técnico autorizado |
| **Precondiciones** | Existe un proceso/fase activa; el criterio al que se vincula existe; el usuario tiene permiso sobre la carrera |
| **Disparador** | El coordinador sube un documento de evidencia |

### Flujo principal

1. El coordinador abre la vista de evidencias del proceso/fase.
2. El sistema muestra los criterios de evaluación disponibles y el estado de evidencias por criterio.
3. El coordinador selecciona el criterio al que pertenece la evidencia.
4. El coordinador sube el archivo y completa la descripción.
5. El sistema valida que el criterio esté seleccionado y el archivo no esté vacío.
6. El sistema almacena la evidencia, crea la versión (incremental) y registra autor, fecha y hash del archivo.
7. El sistema muestra confirmación con la versión asignada.
8. El evento queda registrado en la bitácora de auditoría.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | Intento de guardar sin criterio seleccionado | Rechaza la operación; resalta el campo "Criterio" con mensaje de error |
| A2 | Archivo vacío o formato no permitido | Rechaza el guardado con mensaje descriptivo del error |
| A3 | Ya existe una evidencia para el mismo criterio y fase | Crea nueva versión (v2, v3…); conserva todas las versiones anteriores intactas |
| A4 | Usuario sin permiso sobre la carrera | Rechaza la operación; no expone datos de la carrera |

### Postcondiciones

- La evidencia queda almacenada con número de versión, autor y fecha.
- El historial de versiones es consultable y no alterable por ningún usuario.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Carga exitosa de evidencia clasificada
  Dado un coordinador autenticado con permiso sobre la carrera "Medicina"
  Cuando sube el archivo "plan_estudios_2026.pdf"
    Y selecciona el criterio "C1 - Plan de estudios actualizado"
    Y vincula la evidencia a la fase "Autoevaluación" del proceso activo
  Entonces el sistema almacena la evidencia como versión 1
    Y muestra la confirmación con número de versión, autor y fecha
    Y el evento queda registrado en auditoría

Escenario: Rechazo por evidencia sin clasificación
  Dado un coordinador en el formulario de carga de evidencias
  Cuando intenta guardar el archivo sin seleccionar ningún criterio
  Entonces el sistema rechaza la operación
    Y resalta el campo "Criterio" con mensaje "Debe seleccionar un criterio de evaluación"
    Y no almacena ningún archivo

Escenario: Nueva versión de evidencia existente
  Dado que ya existe la versión 1 de una evidencia para el criterio "C1"
  Cuando el coordinador sube una versión actualizada del mismo documento
  Entonces el sistema crea la versión 2 de la evidencia
    Y conserva la versión 1 con su autor, fecha y contenido original intactos
    Y la nueva versión queda como la versión vigente

Escenario: Consulta del historial de versiones
  Dado una evidencia con 3 versiones cargadas por distintos usuarios
  Cuando un usuario autorizado abre el historial de la evidencia
  Entonces ve la lista ordenada de versiones con autor, fecha y número de versión de cada una
    Y no puede modificar ni eliminar entradas del historial
```

---

## FSD-UC-005 — Protección ante borrado o reemplazo destructivo

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-012 / BR-007, BR-011 |
| **Actor principal** | Coordinador / Técnico con permiso de edición |
| **Precondiciones** | El usuario tiene sesión activa y permiso sobre la evidencia; la evidencia existe |
| **Disparador** | El usuario solicita eliminar o reemplazar de forma irreversible una evidencia |

### Flujo principal

1. El usuario selecciona una evidencia y hace clic en "Eliminar" o "Reemplazar versión actual".
2. El sistema intercepta la acción y presenta un modal de confirmación con el nombre del archivo, la acción a realizar y la advertencia de irreversibilidad.
3. El usuario lee el modal y hace clic en "Confirmar".
4. El sistema ejecuta la acción según las reglas de negocio aplicables.
5. El sistema registra el evento (con tipo de acción, archivo afectado, usuario y timestamp) en la bitácora de auditoría.
6. El sistema muestra confirmación de la operación completada.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | El usuario cancela en el modal | La operación no se ejecuta; la evidencia permanece intacta; no se genera evento de auditoría de eliminación |
| A2 | El usuario intenta eliminar la única versión de una evidencia vinculada a criterio obligatorio | El sistema puede bloquear o advertir según reglas de negocio (definición en FSD §5 BR-006) |
| A3 | Sesión expirada entre el clic inicial y la confirmación | El sistema rechaza la ejecución; redirige al login |

### Postcondiciones

- Si se confirma: la acción queda ejecutada y auditada.
- Si se cancela: el repositorio de evidencias permanece sin cambios.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Modal de confirmación mostrado antes del borrado
  Dado un coordinador autenticado que selecciona eliminar la evidencia "acta_reunion.pdf"
  Cuando hace clic en el botón "Eliminar"
  Entonces el sistema muestra un modal con el nombre del archivo y la advertencia de irreversibilidad
    Y presenta los botones "Confirmar" y "Cancelar"
    Y no ejecuta ninguna acción hasta recibir respuesta del usuario

Escenario: Borrado confirmado y auditado
  Dado el modal de confirmación visible para "acta_reunion.pdf"
  Cuando el usuario hace clic en "Confirmar"
  Entonces el sistema elimina la evidencia según las reglas de negocio
    Y registra el evento en la bitácora con tipo "ELIMINACION", usuario, timestamp y nombre del archivo
    Y muestra confirmación de operación completada

Escenario: Cancelación preserva el repositorio intacto
  Dado el modal de confirmación visible para "acta_reunion.pdf"
  Cuando el usuario hace clic en "Cancelar"
  Entonces el sistema cierra el modal
    Y la evidencia permanece sin cambios en el repositorio
    Y no se genera ningún evento de eliminación en la bitácora
```

---

## FSD-UC-006 — Flujo de observaciones DUEA ↔ carrera

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-013, PRD-US-014 / BR-008, BR-010, BR-011 |
| **Actores** | Administrador DUEA (emite); Coordinador / Jefe de Carrera (responde) |
| **Precondiciones** | Existe una fase con entregables en revisión; ambos actores tienen sesión activa |
| **Disparador** | El administrador DUEA revisa una fase entregada y registra una observación formal |

### Flujo principal

1. El administrador DUEA abre la vista de una fase entregada por la carrera.
2. El administrador selecciona "Nueva observación" vinculada al entregable o fase.
3. El administrador escribe el detalle de la observación y guarda.
4. El sistema registra la observación en estado "Abierta" y la asocia a la carrera.
5. El sistema notifica al coordinador de la carrera (por el canal configurado).
6. El coordinador abre la bandeja de observaciones y lee la observación pendiente.
7. El coordinador redacta la respuesta y, si aplica, adjunta evidencia complementaria.
8. El coordinador envía la respuesta.
9. El sistema actualiza el estado de la observación a "Respondida" o "En seguimiento" según la respuesta.
10. El sistema registra toda la secuencia en la bitácora de auditoría.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | El administrador rechaza la respuesta del coordinador | La observación vuelve a estado "Abierta" con comentario de rechazo; el coordinador recibe notificación |
| A2 | El coordinador intenta responder una observación ya cerrada | El sistema no permite modificar observaciones cerradas; muestra el estado final |
| A3 | El coordinador no responde antes del plazo | El sistema puede generar alerta automática según configuración (ver FSD-UC-008) |

### Postcondiciones

- Toda observación y su respuesta quedan registradas con estado, actor y timestamp.
- El flujo completo es auditable sin intercambios fuera del sistema.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Registro de observación formal por DUEA
  Dado un administrador DUEA revisando la fase "Documentación" de la carrera "Arquitectura"
  Cuando registra la observación "Falta el informe de carga horaria docente" vinculada a la fase
  Entonces la observación queda en estado "Abierta" en la bandeja de la carrera
    Y el coordinador de "Arquitectura" recibe la notificación
    Y el evento queda registrado en auditoría con actor, fase y timestamp

Escenario: Respuesta del coordinador a observación abierta
  Dado una observación en estado "Abierta" en la bandeja del coordinador de "Arquitectura"
  Cuando el coordinador redacta la respuesta y adjunta el archivo "carga_horaria_2026.pdf"
  Entonces el estado de la observación cambia a "Respondida"
    Y el administrador DUEA puede ver la respuesta y el adjunto
    Y la secuencia completa queda auditada

Escenario: Intento de responder observación cerrada
  Dado una observación en estado "Cerrada"
  Cuando el coordinador intenta agregar una respuesta
  Entonces el sistema no permite la modificación
    Y muestra el estado final y la fecha de cierre de la observación
```

---

## FSD-UC-007 — Panel de estado con semáforo por carrera y facultad

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-015 / BR-008 |
| **Actor principal** | Administrador DUEA |
| **Precondiciones** | Existen procesos activos registrados en el sistema; el administrador tiene sesión activa |
| **Disparador** | El administrador abre el panel global de acreditación |

### Flujo principal

1. El administrador accede al panel global desde el menú principal.
2. El sistema consulta todos los procesos activos con sus datos de avance, fechas y estados.
3. El sistema calcula el semáforo de riesgo por carrera según las reglas configuradas:
   - 🟢 Verde: avance en plazo, sin tareas críticas vencidas.
   - 🟡 Amarillo: avance con riesgo moderado (plazo próximo o tareas atrasadas no críticas).
   - 🔴 Rojo: incumplimiento de plazo crítico o tarea bloqueante sin resolver.
4. El sistema muestra el panel con indicador de semáforo, etapa actual, porcentaje de avance y fechas clave por carrera.
5. El administrador puede filtrar por facultad o por color de semáforo.
6. El administrador hace clic en una carrera para ver el detalle del proceso.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | No existen procesos activos registrados | El panel muestra estado vacío con mensaje "No hay procesos activos en el periodo actual" |
| A2 | Los datos de avance de una carrera están incompletos | El sistema muestra semáforo gris con indicador "Sin datos suficientes" |
| A3 | El administrador aplica filtro por facultad | El panel recarga mostrando solo las carreras de la facultad seleccionada |

### Postcondiciones

- El administrador tiene visibilidad actualizada de todos los procesos sin consultas informales.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Semáforo visible por carrera en el panel global
  Dado un administrador DUEA en el panel global
  Cuando abre la vista sin filtros
  Entonces ve cada carrera con proceso activo con su indicador de semáforo (verde, amarillo o rojo)
    Y ve la etapa actual, el porcentaje de avance y las fechas clave de cada carrera
    Y puede distinguir visualmente las carreras en riesgo sin abrir ningún detalle

Escenario: Filtro por facultad
  Dado el panel global con procesos de múltiples facultades
  Cuando el administrador selecciona filtrar por la facultad "Ciencias y Tecnología"
  Entonces el panel muestra solo las carreras de esa facultad
    Y los semáforos corresponden al estado real de esas carreras

Escenario: Panel sin procesos activos
  Dado que no existen procesos activos en el periodo actual
  Cuando el administrador abre el panel
  Entonces el sistema muestra el mensaje "No hay procesos activos en el periodo actual"
    Y no muestra indicadores de semáforo vacíos ni datos de ejemplo
```

---

## FSD-UC-008 — Alertas automáticas por plazos e hitos

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-016 / BR-009, BR-011 |
| **Actores** | Scheduler (dispara); Usuario responsable (recibe) |
| **Precondiciones** | El proceso tiene cronograma definido con fechas de hitos; el canal de notificaciones está configurado |
| **Disparador** | El scheduler evalúa las ventanas de alerta configuradas según el cronograma |

### Flujo principal

1. El scheduler ejecuta la evaluación de plazos según la cadencia configurada (ej. diaria).
2. El sistema identifica todos los hitos cuya fecha cae dentro de la ventana de alerta (ej. 7 días antes del vencimiento).
3. El sistema determina los usuarios a notificar según el rol y la carrera asociada al hito.
4. El sistema envía la notificación por el canal configurado (correo institucional u otro).
5. El sistema registra el evento de notificación en la bitácora (hito, usuarios notificados, timestamp).

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | El canal de notificaciones no está disponible | El sistema registra el fallo de envío y reintenta según política de reintentos; el evento queda en bitácora como "pendiente" |
| A2 | El hito ya fue completado antes de la ventana de alerta | El sistema omite la notificación para ese hito |
| A3 | No hay usuarios con el rol correspondiente asignados a la carrera | El sistema registra la alerta como "sin destinatarios" en bitácora y notifica al administrador DUEA |

### Postcondiciones

- Los usuarios responsables reciben la alerta sin que el administrador haya actuado manualmente.
- El evento de notificación queda registrado en la bitácora.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Alerta enviada automáticamente antes del vencimiento
  Dado un hito "Entrega de informe de autoevaluación" con fecha de vencimiento en 5 días
  Y una ventana de alerta configurada de 7 días antes del vencimiento
  Cuando el scheduler ejecuta la evaluación diaria
  Entonces el sistema envía la notificación al coordinador de la carrera correspondiente
    Y el evento queda registrado en la bitácora con hito, destinatario y timestamp

Escenario: Alerta omitida para hito ya completado
  Dado un hito cuya fecha de vencimiento cae dentro de la ventana de alerta
  Y el hito ya fue marcado como completado por el coordinador
  Cuando el scheduler ejecuta la evaluación
  Entonces el sistema no envía notificación para ese hito
    Y registra la omisión con motivo "hito completado" en la bitácora

Escenario: Fallo de canal y reintento
  Dado que el canal de correo institucional no está disponible al momento del disparo
  Cuando el sistema intenta enviar la alerta
  Entonces registra el fallo en la bitácora como "entrega pendiente"
    Y reintenta el envío según la política de reintentos configurada
```

---

## FSD-UC-009 — Generación de reporte ejecutivo PDF en ≤ 2 clics

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-017 / BR-008 |
| **Actor principal** | Administrador DUEA |
| **Precondiciones** | Existe al menos un proceso activo con datos de avance; el administrador tiene sesión activa |
| **Disparador** | El administrador solicita generar el reporte ejecutivo desde el panel o la vista de carrera |

### Flujo principal

1. El administrador está en el panel global o en la vista de una carrera.
2. El administrador hace clic en "Generar reporte ejecutivo" (clic 1).
3. El sistema presenta un diálogo de confirmación/configuración mínima (ej. selección de periodo si aplica).
4. El administrador confirma (clic 2).
5. El sistema consolida los datos del proceso (etapa, avance, fechas, observaciones abiertas, evidencias cargadas).
6. El motor PDF genera el reporte con datos en tiempo real.
7. El sistema descarga automáticamente el PDF o lo muestra en una pestaña nueva.
8. El evento de generación queda registrado en auditoría.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | El motor PDF falla durante la generación | Muestra mensaje de error con opción de reintentar; no descarga archivo parcial |
| A2 | No hay datos suficientes para generar el reporte | Muestra advertencia antes del clic 2 indicando qué datos faltan |
| A3 | El usuario necesita el reporte de una facultad completa (todas las carreras) | La misma interacción de ≤ 2 clics aplica desde el panel filtrado por facultad |

### Postcondiciones

- El PDF generado refleja el estado actualizado del proceso al momento de la solicitud.
- El flujo completo no excede 2 interacciones del usuario desde el contexto de trabajo.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Generación exitosa en exactamente 2 clics
  Dado un administrador DUEA en la vista de la carrera "Derecho"
  Cuando hace clic en "Generar reporte ejecutivo" (clic 1)
    Y confirma en el diálogo de configuración (clic 2)
  Entonces el sistema descarga un PDF con los datos del proceso actualizados
    Y el flujo no excede 2 clics desde el contexto de carrera
    Y el evento de generación queda registrado en auditoría

Escenario: Error del motor PDF con mensaje claro
  Dado que el motor de generación PDF no está disponible
  Cuando el administrador intenta generar el reporte
  Entonces el sistema muestra mensaje de error descriptivo
    Y ofrece la opción de reintentar
    Y no descarga ningún archivo parcial o corrupto

Escenario: Reporte consolidado de facultad
  Dado un administrador en el panel filtrado por la facultad "Ciencias Jurídicas"
  Cuando genera el reporte ejecutivo desde ese contexto
  Entonces el PDF incluye los datos de todas las carreras activas de esa facultad
    Y el flujo sigue cumpliendo el límite de ≤ 2 clics
```

---

## FSD-UC-010 — Importación masiva de actividades por planilla

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-007 / BR-002, BR-012 |
| **Actor principal** | Coordinador de Carrera |
| **Precondiciones** | Existe un proceso y fase activa; el coordinador tiene permiso sobre la carrera; la plantilla de importación está aprobada |
| **Disparador** | El coordinador inicia la carga masiva de actividades al comienzo del ciclo |

### Flujo principal

1. El coordinador accede a la sección de actividades de la fase.
2. El coordinador descarga la plantilla de importación oficial desde el sistema.
3. El coordinador completa la plantilla con las actividades y sus datos (descripción, responsable, estado, fecha).
4. El coordinador carga el archivo completado.
5. El sistema valida cada fila del archivo (campos obligatorios, formato de fechas, valores de estado permitidos).
6. El sistema importa las filas válidas y crea las actividades en el proceso/fase.
7. El sistema presenta un resumen de importación: filas importadas correctamente y filas con errores con descripción por fila.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | El archivo no sigue el formato de la plantilla oficial | Rechaza la importación completa; indica qué estructura se espera |
| A2 | Algunas filas tienen errores (campo faltante, valor no permitido) | Importa las filas válidas; reporta las filas con error sin cancelar el lote válido |
| A3 | El archivo está vacío | Rechaza la operación con mensaje "El archivo no contiene actividades" |

### Postcondiciones

- Las actividades válidas quedan creadas en el sistema con responsable y estado.
- El coordinador conoce exactamente cuáles filas fallaron y por qué.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Importación exitosa de todas las filas válidas
  Dado un coordinador con un archivo de plantilla completado con 15 actividades sin errores
  Cuando carga el archivo en el módulo de importación
  Entonces el sistema crea las 15 actividades en la fase correspondiente
    Y muestra el resumen "15 actividades importadas correctamente, 0 errores"

Escenario: Importación parcial con filas erróneas
  Dado un archivo de plantilla con 15 actividades donde 3 tienen el campo "responsable" vacío
  Cuando el coordinador carga el archivo
  Entonces el sistema importa las 12 actividades válidas
    Y reporta las 3 filas con error indicando "Campo 'responsable' obligatorio en filas 4, 9, 13"
    Y no cancela la importación de las filas correctas

Escenario: Rechazo de formato incorrecto
  Dado un coordinador que carga un archivo con columnas distintas a la plantilla oficial
  Cuando el sistema procesa el archivo
  Entonces rechaza la importación completa
    Y muestra el mensaje "El archivo no corresponde a la plantilla oficial"
    Y ofrece el enlace para descargar la plantilla correcta
```

---

## FSD-UC-011 — Gestión de usuarios y asignación de roles

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-002 / BR-004, BR-005 |
| **Actor principal** | Administrador DUEA |
| **Precondiciones** | El administrador tiene sesión activa con permisos de gestión de usuarios |
| **Disparador** | El administrador crea un nuevo usuario o modifica los roles de uno existente |

### Flujo principal

1. El administrador accede al módulo de gestión de usuarios.
2. El administrador selecciona "Nuevo usuario" o busca un usuario existente.
3. El administrador completa los datos obligatorios: nombre, email institucional, y asigna al menos un rol.
4. El sistema valida que el email no esté duplicado.
5. El sistema crea el usuario y lo habilita para autenticación con el rol asignado.
6. El sistema registra la creación/modificación en la bitácora de auditoría.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | El email ya existe en el sistema | Rechaza la creación; sugiere buscar al usuario existente y modificar su rol |
| A2 | El administrador guarda sin asignar ningún rol | Rechaza la operación; mensaje "Debe asignar al menos un rol al usuario" |
| A3 | Usuario sin permisos de administración intenta crear usuarios | Rechaza la operación; no expone el módulo de gestión de usuarios |

### Postcondiciones

- El usuario queda habilitado para autenticarse con los permisos del rol asignado.
- El cambio queda registrado en auditoría.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Alta exitosa de usuario con rol asignado
  Dado un administrador DUEA autenticado en el módulo de gestión de usuarios
  Cuando registra el usuario "Carlos Mamani" con email "c.mamani@umss.edu"
    Y le asigna el rol "Coordinador de Carrera"
  Entonces el usuario puede autenticarse con ese rol
    Y el cambio queda registrado en auditoría con actor y timestamp

Escenario: Rechazo por usuario sin rol
  Dado un administrador en el formulario de nuevo usuario
  Cuando completa nombre y email pero no asigna ningún rol
  Entonces el sistema rechaza la operación
    Y muestra el mensaje "Debe asignar al menos un rol al usuario"

Escenario: Rechazo por email duplicado
  Dado que el email "c.mamani@umss.edu" ya existe en el sistema
  Cuando el administrador intenta crear otro usuario con el mismo email
  Entonces el sistema rechaza la creación
    Y sugiere buscar al usuario existente para modificar sus datos o roles
```

---

## FSD-UC-012 — Acceso de evaluador externo con alcance mínimo

| Campo | Valor |
|-------|-------|
| **Trazabilidad** | PRD-US-020 / BR-004, BR-005, BR-011 |
| **Actor principal** | Evaluador externo |
| **Precondiciones** | El administrador DUEA ha creado una cuenta con rol "Evaluador externo" y la ha asociado a una fase específica; el evaluador tiene credenciales |
| **Disparador** | El evaluador externo accede al sistema durante la fase asignada |

### Flujo principal

1. El evaluador externo recibe credenciales temporales de acceso emitidas por el administrador DUEA.
2. El evaluador accede al sistema con sus credenciales.
3. El sistema autentica al evaluador y determina su alcance: solo la fase y documentos asignados.
4. El evaluador visualiza los documentos de evidencia y datos de la fase que le corresponde.
5. El evaluador puede, según el alcance definido, descargar documentos o registrar observaciones/informes en los formularios habilitados para su rol.
6. El sistema registra cada acción del evaluador en la bitácora de auditoría.

### Flujos alternos

| ID | Condición | Comportamiento del sistema |
|----|-----------|---------------------------|
| A1 | El evaluador intenta acceder a fases o carreras no asignadas | El sistema deniega el acceso; no expone datos de otras carreras o fases |
| A2 | El evaluador intenta crear usuarios o modificar roles | El sistema rechaza la operación; la función no está disponible para este rol |
| A3 | Las credenciales del evaluador vencen según la política configurada | El sistema invalida la sesión; el administrador debe renovar el acceso si aplica |

### Postcondiciones

- El evaluador accede solo a lo estrictamente necesario para su función.
- Toda acción del evaluador queda auditada.

### Criterios de aceptación (Gherkin)

```gherkin
Escenario: Evaluador accede solo a su fase asignada
  Dado un evaluador externo asignado a la fase "Visita de pares" de la carrera "Arquitectura"
  Cuando accede al sistema con sus credenciales
  Entonces solo ve los documentos y formularios de la fase "Visita de pares" de "Arquitectura"
    Y no puede navegar a otras fases, carreras ni módulos administrativos

Escenario: Intento de acceso a recursos no asignados
  Dado un evaluador externo con acceso a la carrera "Arquitectura"
  Cuando intenta navegar a la URL de la carrera "Derecho"
  Entonces el sistema deniega el acceso
    Y no expone datos de la carrera "Derecho"
    Y registra el intento en la bitácora de auditoría

Escenario: Intento de crear usuarios por evaluador externo
  Dado un evaluador externo autenticado
  Cuando intenta acceder al módulo de gestión de usuarios
  Entonces el sistema rechaza la operación
    Y el módulo no es visible ni accesible para este rol
```

---

## Trazabilidad consolidada

| FSD-UC | PRD-US | BRD-BR | NFR (FSD §10) | Prueba de aceptación |
|--------|--------|--------|----------------|----------------------|
| FSD-UC-001 | PRD-US-001, PRD-US-003 | BR-004, BR-005, BR-011 | NFR-002, NFR-003 | TC-AUTH-001 a 004 |
| FSD-UC-002 | PRD-US-008, PRD-US-009 | BR-001, BR-002, BR-003, BR-012 | NFR-003 | TC-PROC-001 a 004 |
| FSD-UC-003 | PRD-US-004, PRD-US-006 | BR-008, BR-009, BR-010 | NFR-003 | TC-FASE-001 a 003 |
| FSD-UC-004 | PRD-US-010, PRD-US-011 | BR-006, BR-007, BR-012 | NFR-002, NFR-003 | TC-EVID-001 a 004 |
| FSD-UC-005 | PRD-US-012 | BR-007, BR-011 | NFR-003 | TC-EVID-005 a 007 |
| FSD-UC-006 | PRD-US-013, PRD-US-014 | BR-008, BR-010, BR-011 | NFR-003 | TC-OBS-001 a 003 |
| FSD-UC-007 | PRD-US-015 | BR-008 | NFR-001 | TC-DASH-001 a 003 |
| FSD-UC-008 | PRD-US-016 | BR-009, BR-011 | NFR-005 | TC-ALERT-001 a 003 |
| FSD-UC-009 | PRD-US-017 | BR-008 | NFR-001 | TC-REP-001 a 003 |
| FSD-UC-010 | PRD-US-007 | BR-002, BR-012 | NFR-004 | TC-IMP-001 a 003 |
| FSD-UC-011 | PRD-US-002 | BR-004, BR-005 | NFR-003 | TC-USR-001 a 003 |
| FSD-UC-012 | PRD-US-020 | BR-004, BR-005, BR-011 | NFR-002, NFR-003 | TC-EXT-001 a 003 |

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 14/05/2026 | AcredIA | Versión inicial — 12 casos de uso críticos con flujo principal, flujos alternos y Gherkin verificable, derivados de FSD_v1, PRD_v1 y BRD_v2 |