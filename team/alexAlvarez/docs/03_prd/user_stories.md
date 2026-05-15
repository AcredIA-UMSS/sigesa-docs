# User Stories — SIGESA / AcredIA

> 20+ Historias de Usuario agrupadas por Épicas, cada una en formato INVEST con criterios de aceptación en Gherkin. Diagramas stateDiagram-v2 opcionales para cambios de estado.

## Épica 1: Gestión de Evidencias y Versionado

### PRD-US-001
**Como** Coordinador de Carrera [CC], **quiero** buscar una Evidence por Fase, Indicador y carrera en menos de 5 segundos, **para** encontrar rápidamente el documento correcto y evitar retrasos.
**BRD vinculado:** BRD-OBJ-01

#### Criterios de aceptación
```gherkin
Escenario: Búsqueda de evidencia rápida
  Dado que el [CC] está autenticado y en su dashboard
  Cuando busca por Fase, Indicador y carrera
  Entonces el sistema muestra resultados relevantes en < 5 segundos
```
```gherkin
Escenario: Filtro de resultados por Indicador
  Dado que hay múltiples evidencias en el proceso
  Cuando el [CC] aplica el filtro de Indicador
  Entonces el sistema reduce la lista solo a las evidencias del Indicador seleccionado
```
```gherkin
Escenario: No hay resultados disponibles
  Dado que no existen evidencias que coincidan con el filtro
  Cuando el [CC] ejecuta la búsqueda
  Entonces el sistema muestra un mensaje claro de "No se encontraron resultados"
```

### PRD-US-002
**Como** Coordinador de Carrera [CC], **quiero** registrar una nueva Evidence vinculada a un Indicador, **para** mantener un historial auditado y evitar duplicados.
**BRD vinculado:** BRD-OBJ-04

#### Criterios de aceptación
```gherkin
Escenario: Registro de nueva evidencia
  Dado que el [CC] ha seleccionado un Indicador válido
  Cuando carga un archivo y completa la metadata requerida
  Entonces el sistema crea una nueva Evidence vinculada al Indicador con versión inicial
```
```gherkin
Escenario: Versionado automático de evidencia
  Dado que ya existe una Evidence previa para el mismo Indicador
  Cuando el [CC] carga una nueva versión
  Entonces el sistema incrementa la versión y guarda la nueva entrada sin borrar la anterior
```
```gherkin
Escenario: Metadata obligatoria
  Dado que el [CC] intenta subir el archivo sin descripción
  Cuando confirma la carga
  Entonces el sistema rechaza la operación y solicita la metadata obligatoria
```

### PRD-US-003
**Como** Coordinador de Carrera [CC], **quiero** subsanar una Evidence rechazada con una nueva versión relacionada, **para** que el sistema mantenga inmutabilidad y libere mi Fase.
**BRD vinculado:** BRD-CST-01

#### Criterios de aceptación
```gherkin
Escenario: Subsanación de evidencia rechazada
  Dado que el Indicador está en estado Rechazado
  Cuando el [CC] carga una corrección como nueva Evidence
  Entonces el sistema vincula la nueva versión a la observación original
```
```gherkin
Escenario: No se borra evidencia previa
  Dado que existe una versión anterior de Evidence
  Cuando el [CC] subsana la entrega
  Entonces la versión anterior permanece registrada y se agrega la nueva versión
```
```gherkin
Escenario: Aviso de liberación de fase
  Dado que la nueva Evidence cumple los criterios
  Cuando el [TD] aprueba el Indicador
  Entonces el sistema actualiza el estado de la Fase si todos los Indicadores están aprobados
```

### PRD-US-010
**Como** Coordinador de Carrera [CC], **quiero** ver el historial completo de versiones de una Evidence, **para** entender qué cambios se hicieron y por qué.
**BRD vinculado:** BRD-OBJ-04

#### Criterios de aceptación
```gherkin
Escenario: Acceso al historial de versiones
  Dado que una Evidence tiene múltiples versiones
  Cuando el [CC] selecciona la opción de historial
  Entonces el sistema muestra todas las versiones con fechas y autores
```
```gherkin
Escenario: Vinculación a observaciones
  Dado que una versión fue creada por subsanación
  Cuando el [CC] ve el historial
  Entonces ve el enlace a la observación que motivó la nueva versión
```

### PRD-US-011
**Como** Técnico DUEA [TD], **quiero** descargar Evidencias para revisión offline, **para** auditar en detalle sin depender de la conexión.
**BRD vinculado:** BRD-OBJ-04

#### Criterios de aceptación
```gherkin
Escenario: Descarga de evidencia
  Dado que el [TD] está revisando un Indicador
  Cuando selecciona descargar la Evidence
  Entonces el sistema permite la descarga del archivo original
```

## Épica 2: Dashboard y Experiencia de Usuario

### PRD-US-004
**Como** Coordinador de Carrera [CC], **quiero** ver rápidamente el estado de mis fases y observaciones en un dashboard, **para** priorizar mis entregas antes de las fechas límite.
**BRD vinculado:** BRD-OBJ-01

#### Criterios de aceptación
```gherkin
Escenario: Vista de fases en dashboard
  Dado que el [CC] abre su dashboard
  Cuando consulta el tablero de fases
  Entonces ve el estado actual y las observaciones de cada Fase
```
```gherkin
Escenario: Prioridad de entregas
  Dado que hay múltiples fases activas
  Cuando el [CC] revisa el dashboard
  Entonces el sistema destaca las fases próximas a fecha límite
```
```gherkin
Escenario: Mensaje de estado claro
  Dado que una Fase está en riesgo
  Cuando el [CC] visualiza el tablero
  Entonces recibe un mensaje claro sobre los próximos pasos
```

### PRD-US-006
**Como** Coordinador de Carrera [CC], **quiero** usar un dashboard mobile ligero, **para** gestionar observaciones urgentes desde mi celular.
**BRD vinculado:** BRD-CST-02

#### Criterios de aceptación
```gherkin
Escenario: Dashboard mobile accesible
  Dado que el [CC] usa un smartphone
  Cuando abre el dashboard mobile
  Entonces accede a la lista de fases y observaciones sin errores de visualización
```
```gherkin
Escenario: Acciones en móvil
  Dado que el [CC] está en la vista mobile
  Cuando selecciona una observación urgente
  Entonces puede abrir la Evidence relacionada y ver el estado del Indicador
```
```gherkin
Escenario: Rendimiento mobile
  Dado que el [CC] navega el dashboard mobile
  Cuando solicita la actualización de datos
  Entonces la interfaz responde en ≤ 3 segundos
```

### PRD-US-012
**Como** Técnico DUEA [TD], **quiero** una interfaz de escritorio con múltiples paneles, **para** revisar Evidencias en paralelo y comparar versiones.
**BRD vinculado:** BRD-OBJ-04

#### Criterios de aceptación
```gherkin
Escenario: Panel múltiple en escritorio
  Dado que el [TD] usa un monitor amplio
  Cuando abre el panel de auditoría
  Entonces puede dividir la vista en paneles para comparar Evidencias
```

### PRD-US-013
**Como** Público [P], **quiero** navegar el portal sin registro, **para** acceder rápidamente a información de acreditación.
**BRD vinculado:** BRD-OBJ-03

#### Criterios de aceptación
```gherkin
Escenario: Acceso anónimo al portal
  Dado que el usuario no está autenticado
  Cuando ingresa al portal público
  Entonces puede buscar carreras y ver estados publicados
```

## Épica 3: Auditoría y Control de Fases

### PRD-US-007
**Como** Técnico DUEA [TD], **quiero** filtrar evidencias por Fase, Indicador y carrera, **para** revisar solo el conjunto relevante de documentos y ahorrar tiempo.
**BRD vinculado:** BRD-OBJ-04

#### Criterios de aceptación
```gherkin
Escenario: Filtro por Indicador
  Dado que el [TD] accede al panel de auditoría
  Cuando aplica filtro por Indicador
  Entonces solo ve evidencias del Indicador seleccionado
```
```gherkin
Escenario: Filtro por Fase
  Dado que hay múltiples Fases activas
  Cuando el [TD] selecciona una Fase
  Entonces la lista muestra evidencias correspondientes a esa Fase
```
```gherkin
Escenario: Búsqueda combinada
  Dado que el [TD] opera con filtros múltiples
  Cuando combina Fase e Indicador
  Entonces el sistema entrega resultados precisos sin recargar la sesión
```

### PRD-US-008
**Como** Técnico DUEA [TD], **quiero** ver el historial de versiones de cada Evidence, **para** saber cuál es la versión vigente y cuál se corrigió.
**BRD vinculado:** BRD-OBJ-04

#### Criterios de aceptación
```gherkin
Escenario: Historial de versiones visible
  Dado que el [TD] revisa un Indicador
  Cuando abre la sección de historial
  Entonces el sistema muestra las versiones previas y la vigente
```
```gherkin
Escenario: Marcar versión vigente
  Dado que existen varias versiones
  Cuando el [TD] visualiza la lista
  Entonces la versión vigente queda claramente etiquetada
```
```gherkin
Escenario: Detalle de cambio
  Dado que una Evidence tiene una observación ligada
  Cuando el [TD] abre la versión corregida
  Entonces ve la referencia a la observación y el autor de la corrección
```

### PRD-US-009
**Como** Técnico DUEA [TD], **quiero** rechazar un Indicador con justificación obligatoria, **para** que el Coordinador entienda qué corregir.
**BRD vinculado:** BRD-OBJ-02

#### Criterios de aceptación
```gherkin
Escenario: Rechazo con justificación
  Dado que el [TD] encuentra una no-conformidad
  Cuando rechaza el Indicador
  Entonces debe ingresar una justificación obligatoria
```
```gherkin
Escenario: Creación automática de observación
  Dado que el rechazo se confirma
  Cuando el sistema procesa
  Entonces crea una Observación ligada al Indicador y notifica al [CC]
```

### PRD-US-014
**Como** Técnico DUEA [TD], **quiero** aprobar Indicadores en lote, **para** acelerar el cierre de Fases.
**BRD vinculado:** BRD-OBJ-03

#### Criterios de aceptación
```gherkin
Escenario: Aprobación en lote
  Dado que múltiples Indicadores están listos
  Cuando el [TD] selecciona aprobar lote
  Entonces el sistema aprueba todos y actualiza el estado de Fase si aplica
```

### PRD-US-015
**Como** Jefatura DUEA [JD], **quiero** ver reportes ejecutivos de avance por Fase, **para** monitorear el cumplimiento institucional.
**BRD vinculado:** BRD-KPI-02

#### Criterios de aceptación
```gherkin
Escenario: Reporte ejecutivo
  Dado que el [JD] accede a reportes
  Cuando selecciona por Fase
  Entonces ve % de Indicadores aprobados y fechas límite
```

## Épica 4: Portal Público y Transparencia

### PRD-US-016
**Como** Estudiante [P], **quiero** verificar el estado de acreditación de mi carrera, **para** confiar en la información oficial.
**BRD vinculado:** BRD-OBJ-03

#### Criterios de aceptación
```gherkin
Escenario: Consulta de estado
  Dado que el estudiante busca una carrera
  Cuando ingresa al portal
  Entonces ve el estado actual de Fases y certificados disponibles
```

### PRD-US-017
**Como** Empleador [P], **quiero** descargar certificados de acreditación, **para** evaluar la calidad institucional.
**BRD vinculado:** BRD-OBJ-03

#### Criterios de aceptación
```gherkin
Escenario: Descarga de certificado
  Dado que la carrera está acreditada
  Cuando el empleador solicita descarga
  Entonces el sistema permite descargar el certificado oficial
```

## Épica 5: Notificaciones y Comunicación

### PRD-US-005
**Como** Coordinador de Carrera [CC], **quiero** recibir notificaciones cuando un Indicador es rechazado o aprobado, **para** decidir qué acciones tomar sin revisar correos dispersos.
**BRD vinculado:** BRD-OBJ-02

#### Criterios de aceptación
```gherkin
Escenario: Notificación de rechazo
  Dado que el [TD] rechaza un Indicador
  Cuando el rechazo se confirma
  Entonces el [CC] recibe notificación en ≤ 15 minutos
```
```gherkin
Escenario: Notificación de aprobación
  Dado que el [TD] aprueba un Indicador
  Cuando el estado cambia a Aprobado
  Entonces el [CC] recibe notificación en ≤ 15 minutos
```
```gherkin
Escenario: Acceso desde notificación
  Dado que el [CC] abre la notificación
  Cuando selecciona el enlace de la evidencia
  Entonces el sistema muestra la Evidence y la observación relacionada
```

### PRD-US-018
**Como** Coordinador de Carrera [CC], **quiero** recibir alertas de fechas límite próximas, **para** evitar incumplimientos.
**BRD vinculado:** BRD-KPI-03

#### Criterios de aceptación
```gherkin
Escenario: Alerta de fecha límite
  Dado que una Fase tiene fecha límite en 3 días
  Cuando el sistema evalúa
  Entonces envía notificación al [CC] con recordatorio
```

### PRD-US-019
**Como** Técnico DUEA [TD], **quiero** notificaciones de nuevas Evidencias cargadas, **para** iniciar revisiones promptly.
**BRD vinculado:** BRD-OBJ-04

#### Criterios de aceptación
```gherkin
Escenario: Notificación de nueva evidencia
  Dado que el [CC] carga una Evidence
  Cuando se confirma
  Entonces el [TD] recibe notificación de revisión pendiente
```

### PRD-US-020
**Como** Jefatura DUEA [JD], **quiero** reportes automáticos de hitos cumplidos, **para** seguimiento ejecutivo.
**BRD vinculado:** BRD-KPI-04

#### Criterios de aceptación
```gherkin
Escenario: Reporte automático
  Dado que un hito de Fase se cumple
  Cuando el sistema detecta
  Entonces envía reporte al [JD] con métricas actualizadas
```

### PRD-US-021
**Como** Coordinador de Carrera [CC], **quiero** exportar reportes de mi Proceso, **para** compartir con stakeholders internos.
**BRD vinculado:** BRD-OBJ-01

#### Criterios de aceptación
```gherkin
Escenario: Exportar reporte
  Dado que el [CC] está en su dashboard
  Cuando selecciona exportar
  Entonces el sistema genera un PDF con estado de Fases e Indicadores
```

### PRD-US-022
**Como** Técnico DUEA [TD], **quiero** exportar listas de Observaciones abiertas, **para** priorizar auditorías.
**BRD vinculado:** BRD-OBJ-02

#### Criterios de aceptación
```gherkin
Escenario: Exportar observaciones
  Dado que hay Observaciones abiertas
  Cuando el [TD] solicita exportar
  Entonces recibe un CSV con detalles de Indicadores y Evidencias afectadas
```
**BRD vinculado:** BRD-CST-01

#### Criterios de aceptación
```gherkin
Escenario: Rechazo con justificación
  Dado que el [TD] decide rechazar un Indicador
  Cuando ingresa la justificación y confirma
  Entonces el sistema registra el rechazo y notifica al [CC]
```
```gherkin
Escenario: Justificación obligatoria
  Dado que el [TD] deja vacío el campo de justificación
  Cuando intenta confirmar el rechazo
  Entonces el sistema impide la acción y muestra un error
```
```gherkin
Escenario: Historial de rechazo
  Dado que el Indicador fue rechazado
  Cuando el [TD] revisa el registro
  Entonces ve la justificación asociada y la marca de tiempo
```

### PRD-US-010
**Como** Técnico DUEA [TD], **quiero** aprobar un Indicador y que el sistema notifique al Coordinador, **para** que la fase pueda avanzar sin dudas.
**BRD vinculado:** BRD-OBJ-02

#### Criterios de aceptación
```gherkin
Escenario: Aprobación de indicador
  Dado que el [TD] valida la Evidence
  Cuando selecciona "Aprobar"
  Entonces el sistema cambia el estado del Indicador a Aprobado
```
```gherkin
Escenario: Notificación de aprobación
  Dado que el Indicador se aprueba
  Cuando la acción está completa
  Entonces el [CC] recibe notificación en ≤ 15 minutos
```
```gherkin
Escenario: Actualización de fase
  Dado que todos los Indicadores de la Fase están Aprobados
  Cuando el último Indicador se aprueba
  Entonces el sistema marca la Fase como lista para cierre
```

### PRD-US-011
**Como** Jefatura DUEA [JD], **quiero** consultar un reporte ejecutivo de avance por carrera y Fase, **para** tomar decisiones de priorización.
**BRD vinculado:** BRD-OBJ-03

#### Criterios de aceptación
```gherkin
Escenario: Reporte de avance por carrera
  Dado que el [JD] abre el reporte ejecutivo
  Cuando selecciona una facultad
  Entonces ve el avance por carrera y el estado de sus Fases
```
```gherkin
Escenario: Semáforos de riesgo
  Dado que algunas Fases tienen retrasos
  Cuando el reporte se muestra
  Entonces los semáforos indican riesgo alto/medio/bajo
```
```gherkin
Escenario: Exportación de reporte
  Dado que el [JD] necesita compartir la información
  Cuando solicita exportar el reporte
  Entonces el sistema genera un archivo para descarga
```

### PRD-US-012
**Como** Público [P] (estudiante o empleador), **quiero** consultar el estado público de acreditación de una carrera, **para** confiar en que la información es oficial.
**BRD vinculado:** BRD-OBJ-03

#### Criterios de aceptación
```gherkin
Escenario: Consulta pública de acreditación
  Dado que un usuario accede al portal sin autenticación
  Cuando busca una carrera acreditada
  Entonces ve su estado de acreditación y si la información es oficial
```
```gherkin
Escenario: Información limitada pública
  Dado que un empleador consulta el portal
  Cuando selecciona una carrera
  Entonces ve solo datos autorizados y no detalles internos
```
```gherkin
Escenario: Navegación fluida
  Dado que el usuario navega el portal
  Cuando selecciona otra carrera
  Entonces el sitio responde sin errores de navegación
```

### PRD-US-013
**Como** Público [P] (estudiante), **quiero** acceder a un certificado oficial o comprobante de acreditación, **para** compartirlo con terceros y validar mi formación.
**BRD vinculado:** BRD-OBJ-03

#### Criterios de aceptación
```gherkin
Escenario: Descarga de certificado público
  Dado que el estudiante encuentra su carrera
  Cuando solicita el certificado oficial
  Entonces el sistema descarga el documento autorizado
```
```gherkin
Escenario: Consulta de vigencia
  Dado que el estudiante revisa la acreditación
  Cuando ve el registro de la carrera
  Entonces observa la vigencia y tipo de acreditación
```
```gherkin
Escenario: Confianza en la fuente
  Dado que el portal muestra el certificado
  Cuando el usuario revisa la página
  Entonces identifica la fuente institucional oficial
```

### PRD-US-014
**Como** Jefatura DUEA [JD], **quiero** configurar la taxonomía de CEUB/ARCU-SUR en el sistema, **para** que las Fases, Criterios e Indicadores reflejen la normativa vigente.
**BRD vinculado:** BRD-CST-02

#### Criterios de aceptación
```gherkin
Escenario: Configuración de taxonomía
  Dado que el [JD] ingresa a la configuración
  Cuando define Dimensiones, Criterios e Indicadores
  Entonces el sistema guarda la taxonomía para los procesos futuros
```
```gherkin
Escenario: Validación normativa
  Dado que el [JD] carga una plantilla normativa
  Cuando guarda los cambios
  Entonces el sistema valida que la estructura cumpla con CEUB/ARCU-SUR
```
```gherkin
Escenario: Uso de nueva taxonomía
  Dado que una nueva taxonomía está activa
  Cuando el [CC] inicia un proceso
  Entonces la Fase y los Indicadores corresponden al nuevo esquema
```

### PRD-US-015
**Como** Coordinador de Carrera [CC], **quiero** ver todas las observaciones abiertas relacionadas a mis Evidencias, **para** solucionar prioridades de manera ordenada.
**BRD vinculado:** BRD-OBJ-01

#### Criterios de aceptación
```gherkin
Escenario: Lista de observaciones abiertas
  Dado que el [CC] accede a su panel
  Cuando abre la sección de observaciones
  Entonces ve las observaciones abiertas agrupadas por Indicador
```
```gherkin
Escenario: Acción sobre observación
  Dado que existe una observación abierta
  Cuando el [CC] selecciona una observación
  Entonces el sistema muestra la Evidence y el estado del Indicador
```
```gherkin
Escenario: Orden por prioridad
  Dado que varias observaciones están activas
  Cuando el [CC] revisa la lista
  Entonces el sistema muestra primero las observaciones con fechas límite próximas
```

### PRD-US-016
**Como** Técnico DUEA [TD], **quiero** registrar una auditoría de cada acción sobre Evidence, **para** garantizar el cumplimiento y la trazabilidad.
**BRD vinculado:** BRD-CST-01

#### Criterios de aceptación
```gherkin
Escenario: Registro de auditoría de carga
  Dado que el [CC] carga una Evidence
  Cuando la operación se completa
  Entonces el sistema crea un registro de auditoría con usuario, fecha y acción
```
```gherkin
Escenario: Registro de auditoría de rechazo
  Dado que el [TD] rechaza un Indicador
  Cuando confirma la observación
  Entonces el sistema guarda la acción en el log de auditoría
```
```gherkin
Escenario: Acceso al historial de auditoría
  Dado que el [TD] consulta una Evidence
  Cuando solicita ver el historial
  Entonces el sistema muestra las acciones relacionadas con la Evidence
```
