# Especificación de Casos de Uso y Escenarios BDD (Gherkin)

## SIGESA / AcredIA — Evaluación y Acreditación de Carreras UMSS

**Universidad Mayor de San Simón (UMSS)** · Dirección Universitaria de Evaluación y Acreditación (DUEA)

---

## 0. Control documental

| Campo | Valor |
|-------|-------|
| **Tipo de documento** | Especificación de casos de uso + escenarios BDD verificables |
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Estado** | Borrador para revisión QA / UAT / DUEA |
| **Audiencia** | Analistas funcionales, desarrollo, QA automatizado, UAT académico, stakeholders DUEA |
| **Trazabilidad PRD** | `03_prd/PRD_SIGESA_Institucional_Completo_v1.md` (PRD-US-xxx) |
| **Trazabilidad FSD** | `04_fsd/FSD_SIGESA_Empresarial_Completo_v1.md` (FSD-UC-xxx, FR-xxx, RB-xx) |
| **Convención IDs** | **UC-SIG-NN** = caso de uso de este documento; mapeo explícito a FSD-UC |
| **Idioma Gherkin** | Español (palabras clave `Característica`, `Escenario`, `Dado`, `Cuando`, `Entonces`, `Y`) — compatible con Cucumber/Gherkin i18n |

### 0.1 Glosario de actores (roles)

| Código | Rol | Descripción |
|--------|-----|-------------|
| **JD** | Jefatura DUEA | Configuración, publicación, reportes, auditoría |
| **TD** | Técnico DUEA | Revisión técnica, dictamen, avance de fases |
| **CC** | Coordinador/a de carrera | Carga y corrección de evidencias |
| **P** | Público | Consulta sin autenticación |
| **SISTEMA** | Sistema SIGESA | Notificaciones, jobs, validaciones automáticas |

### 0.2 Matriz de cobertura temática

| Área institucional requerida | Caso de uso |
|------------------------------|---------------|
| Gestión de carreras y programas | UC-SIG-01 |
| Registro y administración de procesos de acreditación | UC-SIG-02 |
| Gestión documental y evidencias | UC-SIG-03 |
| Evaluación de criterios e indicadores | UC-SIG-04 |
| Generación de reportes e informes | UC-SIG-05 |
| Seguimiento de observaciones y mejoras | UC-SIG-06 |
| Gestión de usuarios y roles | UC-SIG-07 |
| Auditoría y trazabilidad | UC-SIG-08 |
| Validación de cumplimiento normativo | UC-SIG-09 |
| Dashboard e indicadores institucionales | UC-SIG-10 |

---

## 1. Introducción

### 1.1 Propósito

Este documento consolida **diez casos de uso críticos** del sistema SIGESA con el nivel de detalle requerido para **diseño**, **desarrollo**, **pruebas automatizadas (BDD)** y **UAT** con personal académico–administrativo de la UMSS. Cada caso incluye **trazabilidad** a requerimientos y reglas de negocio, **validaciones**, **datos de entrada/salida** y **criterios de aceptación verificables**.

### 1.2 Buenas prácticas aplicadas

- Casos de uso alineados a **UML** (actores, límites del sistema, secuencia implícita en flujos).  
- Escenarios **Gherkin** idempotentes donde procede, con datos tabulados en `Esquema del escenario`.  
- Separación explícita: **flujo principal**, **alternativos**, **excepciones**.  
- Códigos de error API alineados a `04_fsd` (`SIGESA_*` / dominios AUTH, DOC, WF, VAL).

### 1.3 Convenciones de medición

- **P95**: percentil 95 de latencia en entorno de prueba de referencia.  
- **SLA notificaciones**: evento crítico notificado en **≤ 15 minutos** (P95).  
- **Tamaño máximo archivo evidencia**: **50 MB** (ajustable por configuración).

---

# Casos de uso

---

## UC-SIG-01 — Administración del catálogo de carreras y programas académicos

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-01 |
| **Nombre** | Administración del catálogo de carreras y programas académicos |
| **Objetivo del proceso** | Mantener el **catálogo institucional** (facultades, carreras, modalidad, códigos) como base única para permisos, procesos de acreditación y reportes. |
| **Descripción funcional detallada** | La jefatura DUEA (**JD**) registra o actualiza facultades y carreras, incluyendo metadatos académicos relevantes para CEUB/ARCU-SUR (p. ej., modalidad presencial/semi-presencial, sede Cochabamba). El sistema valida unicidad de códigos, impide borrado físico si existen procesos activos y mantiene historial de cambios en auditoría. Los coordinadores (**CC**) quedan asignados a carreras para restringir evidencias. |
| **Actor principal** | JD |
| **Actores secundarios** | CC (asignación), SISTEMA (auditoría) |
| **Stakeholders** | DUEA, Secretaría Académica, Decanatos, TI UMSS |
| **Precondiciones** | Usuario autenticado con rol JD; sesión válida. |
| **Disparador (trigger)** | JD selecciona “Catálogo” y ejecuta alta/edición de facultad o carrera. |
| **Flujo principal** | 1) JD abre módulo Catálogo. 2) JD crea o edita facultad (nombre, código). 3) JD crea o edita carrera (nombre, código, facultad, modalidad). 4) Sistema valida unicidad de `codigo` en ámbito facultad o global según política. 5) Sistema persiste y registra evento `CATALOGO_CARRERA_UPSERT`. 6) JD opcionalmente asigna CC a carrera. 7) Sistema confirma y actualiza vistas dependientes (cache dashboard si aplica). |
| **Flujos alternativos** | **A1** Desactivación lógica de carrera (sin procesos activos): marca `activo=false`. **A2** Importación masiva CSV validado (fase 2): archivo con errores fila a fila. |
| **Flujos de excepción/error** | **E1** Código duplicado → HTTP 409 `CAT_DUPLICATE_CODE`. **E2** Intento borrar carrera con proceso `EN_PROCESO` → 409 `CAT_CARRERA_HAS_ACTIVE_PROCESS`. **E3** Sin permiso → 403. |
| **Postcondiciones** | Catálogo consistente; auditoría con actor y diff resumido; CC puede operar solo sobre carreras asignadas. |
| **Reglas de negocio** | RB-10 (mensajes claros); integridad referencial carrera–facultad; política UMSS de códigos de carrera. |
| **Prioridad** | **P0** |
| **Criticidad** | **Alta** — bloquea asignación CC y creación de procesos. |
| **Requerimientos asociados** | FR-004, FR-005; PRD-US-002; FSD-UC-001 (contexto permisos) |
| **Validaciones funcionales** | Código no vacío; facultad existente; modalidad en enumeración; email CC válido si se asigna usuario. |
| **Datos de entrada** | `facultad{nombre, codigo}`, `carrera{nombre, codigo, facultadId, modalidad}`, `asignaciones{usuarioId, carreraId}`. |
| **Datos de salida** | `carreraId`, `estado`, `timestampConfirmacion`. |
| **Criterios de aceptación verificables** | (1) No existen dos carreras activas con mismo `codigo` según regla. (2) No se elimina carrera con proceso activo. (3) Todo cambio genera fila auditoría. (4) CC sin asignación no accede a carga de evidencias de esa carrera. |

### BDD — UC-SIG-01

```gherkin
# language: es
Característica: UC-SIG-01 Catálogo de carreras y programas
  Como jefatura DUEA
  Quiero administrar facultades y carreras
  Para que los procesos de acreditación y los permisos se basen en datos institucionales únicos

  Escenario: Alta de carrera exitosa en facultad existente
    Dado la facultad "FAC-CS" con id "11111111-1111-1111-1111-111111111111"
    Y un usuario JD autenticado
    Cuando solicita crear carrera con codigo "INF-SIS-256" nombre "Ingeniería de Sistemas" modalidad "PRESENCIAL" facultadId "11111111-1111-1111-1111-111111111111"
    Entonces el sistema responde 201
    Y existe la carrera con codigo "INF-SIS-256"
    Y el log de auditoría contiene acción "CATALOGO_CARRERA_UPSERT"

  Escenario: Código de carrera duplicado
    Dado que ya existe carrera activa con codigo "INF-SIS-256"
    Y un usuario JD autenticado
    Cuando solicita crear otra carrera con el mismo codigo "INF-SIS-256"
    Entonces el sistema responde 409
    Y el cuerpo incluye codigo de error "CAT_DUPLICATE_CODE"

  Esquema del escenario: Asignación CC a carrera habilita permisos
    Dado un usuario CC "coord.inf@umss.edu.bo" sin asignación previa
    Y la carrera "<carreraId>" existe
    Cuando JD asigna el CC a la carrera "<carreraId>"
    Entonces el CC puede acceder al tablero de evidencias de "<carreraId>"
    Y el CC no puede acceder a otra carrera "<otraCarreraId>"

    Ejemplos:
      | carreraId                            | otraCarreraId                        |
      | 22222222-2222-2222-2222-222222222222 | 33333333-3333-3333-3333-333333333333 |
```

---

## UC-SIG-02 — Registro y administración de procesos de acreditación

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-02 |
| **Nombre** | Registro y administración de procesos de acreditación |
| **Objetivo del proceso** | Instanciar un **proceso de acreditación** (CEUB o ARCU-SUR) por carrera y gestión académica, con fechas y plantilla normativa, habilitando el flujo de evidencias. |
| **Descripción funcional detallada** | **JD** crea un `proceso` seleccionando carrera, tipo (CEUB / ARCU-SUR), organismo, gestión (ej. 2026), fechas y plantilla versionada. El sistema clona la estructura de fases/subfases/indicadores. Aplica reglas de unicidad de proceso activo por tipo y periodo y valida elegibilidad ARCU-SUR. |
| **Actor principal** | JD |
| **Actores secundarios** | TD (asignación revisión), SISTEMA |
| **Stakeholders** | DUEA, Coordinación de carrera, CEUB/ARCU-SUR (cumplimiento) |
| **Precondiciones** | Catálogo de carrera activo; plantilla normativa cargada; JD autenticado. |
| **Disparador** | JD pulsa “Nuevo proceso de acreditación”. |
| **Flujo principal** | 1) JD selecciona carrera y tipo. 2) Si tipo ARCU-SUR, sistema verifica CEUB vigente (RB-01). 3) JD ingresa gestión, fechas, plantilla. 4) Sistema valida BR-013 (único activo). 5) Sistema crea proceso `EN_PROCESO` y estructura hija. 6) Sistema registra auditoría. 7) JD notifica a CC/TD (opcional manual o plantilla correo). |
| **Flujos alternativos** | **A1** Proceso en estado `BORRADOR` hasta JD confirme “Activar”. **A2** Clonación desde proceso plantilla de año anterior (solo indicadores completos). |
| **Flujos de excepción/error** | **E1** ARCU-SUR sin CEUB vigente → 422 `NORM_ARCU_REQUIRES_CEUB`. **E2** Duplicado proceso activo → 409 `PROC_DUPLICATE`. **E3** Fecha fin < fecha inicio → 400 `VAL_DATES`. |
| **Postcondiciones** | Proceso operativo; indicadores en `PENDIENTE`; trazabilidad creada. |
| **Reglas de negocio** | RB-01, RB-05, RB-08, BR-013 |
| **Prioridad** | **P0** |
| **Criticidad** | **Alta** |
| **Requerimientos asociados** | FR-007, FR-008, FR-009; PRD-US-019; FSD-UC-010 |
| **Validaciones funcionales** | Tipo enum; gestión numérica YYYY; plantilla_id existente y vigente; fechas límite externas no editables por TD (RB-05). |
| **Datos de entrada** | `{carreraId, tipo, organismo, gestion, fechaInicio, fechaFin, plantillaId}` |
| **Datos de salida** | `{procesoId, estado, fasesClonadas}` |
| **Criterios de aceptación verificables** | (1) No se crea ARCU-SUR si falla RB-01. (2) No dos procesos activos mismo tipo+misma gestión+misma carrera. (3) Todos los indicadores obligatorios presentes según plantilla. |

### BDD — UC-SIG-02

```gherkin
# language: es
Característica: UC-SIG-02 Procesos de acreditación
  Como jefatura DUEA
  Quiero registrar un proceso CEUB o ARCU-SUR por carrera y gestión
  Para habilitar el ciclo documental acreditador con trazabilidad

  Escenario: Creación exitosa de proceso CEUB
    Dado la carrera "22222222-2222-2222-2222-222222222222" sin proceso CEUB activo para gestion 2026
    Y una plantilla CEUB version 3 vigente
    Y un usuario JD autenticado
    Cuando crea proceso tipo "CEUB" gestion 2026 con fechas validas y plantillaId de la version 3
    Entonces el sistema responde 201
    Y el proceso queda en estado "EN_PROCESO"
    Y existen fases e indicadores clonados desde la plantilla

  Escenario: ARCU-SUR rechazado sin acreditación CEUB vigente
    Dado la carrera "22222222-2222-2222-2222-222222222222" sin proceso CEUB en estado acreditado vigente
    Y un usuario JD autenticado
    Cuando intenta crear proceso tipo "ARCU_SUR" gestion 2026
    Entonces el sistema responde 422
    Y el codigo de error es "NORM_ARCU_REQUIRES_CEUB"

  Escenario: Segundo proceso activo del mismo tipo y gestión es rechazado
    Dado ya existe proceso CEUB activo para la carrera y gestion 2026
    Cuando JD intenta crear otro proceso CEUB para la misma carrera y gestion 2026
    Entonces el sistema responde 409
    Y el codigo de error es "PROC_DUPLICATE"
```

---

## UC-SIG-03 — Gestión documental: carga, versionado y almacenamiento de evidencias

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-03 |
| **Nombre** | Carga, versionado y almacenamiento de evidencias |
| **Objetivo del proceso** | Registrar evidencias de indicadores con **versiones inmutables** y metadatos auditables, sustituyendo canales informales. |
| **Descripción funcional detallada** | **CC** adjunta archivo (PDF/DOCX/XLSX), descripción de cambio e `indicadorId`. El sistema valida permisos de carrera, MIME, tamaño, calcula SHA-256, sube a almacenamiento objeto, incrementa `version`, pasa indicador a `EN_REVISION` y encola notificación a **TD**. Versiones previas permanecen accesibles; no se borran aprobadas (RB-04). |
| **Actor principal** | CC |
| **Actores secundarios** | TD (notificado), SISTEMA (almacenamiento, hash) |
| **Stakeholders** | Coordinación de carrera, DUEA, auditores externos |
| **Precondiciones** | CC autenticado y asignado a carrera del indicador; indicador en `PENDIENTE` o `RECHAZADO`; proceso `EN_PROCESO`. |
| **Disparador** | CC envía formulario “Cargar evidencia”. |
| **Flujo principal** | 1) Selección indicador. 2) Adjuntar archivo + descripción obligatoria. 3) Validaciones. 4) Persistencia documento vN. 5) Actualizar estado indicador. 6) Auditoría `CARGA`. 7) Notificación async TD. |
| **Flujos alternativos** | **A1** Reintento tras timeout de red sin duplicar versión si `Idempotency-Key` repetido. **A2** Nueva versión sobre indicador `APROBADO` con advertencia UI (reapertura según política). |
| **Flujos de excepción/error** | **E1** 413 `DOC_SIZE`. **E2** 415 `DOC_MIME`. **E3** 403 `DOC_UNAUTHORIZED`. **E4** 502 `STORAGE_ERROR`. |
| **Postcondiciones** | Documento persistido; TD notificado en SLA; indicador `EN_REVISION`. |
| **Reglas de negocio** | RB-02, RB-04; BR-001, BR-002, BR-015 |
| **Prioridad** | **P0** |
| **Criticidad** | **Crítica** |
| **Requerimientos asociados** | FR-010–FR-015; PRD-US-003, 004, 005, 014; FSD-UC-002 |
| **Validaciones funcionales** | MIME whitelist; tamaño; descripción no vacía; indicador pertenece a carrera del CC. |
| **Datos de entrada** | `multipart: archivo, indicadorId, descripcionCambio`, header opcional `Idempotency-Key` |
| **Datos de salida** | `{documentoId, version, hash, indicadorEstado}` |
| **Criterios de aceptación verificables** | (1) Versión monotónica. (2) Hash coincide con archivo almacenado. (3) P95 notificación ≤15 min en prueba de carga notificaciones. (4) CC de otra carrera obtiene 403. |

### BDD — UC-SIG-03

```gherkin
# language: es
Característica: UC-SIG-03 Gestión documental de evidencias
  Como coordinador de carrera
  Quiero cargar y versionar evidencias por indicador
  Para cumplir plazos CEUB/ARCU-SUR con trazabilidad institucional

  Escenario: Primera carga exitosa de evidencia PDF
    Dado el CC "coord.inf@umss.edu.bo" autenticado asignado a la carrera del indicador "IND-001"
    Y el indicador "IND-001" en estado "PENDIENTE"
    Cuando carga un archivo PDF de 2 MB con descripcionCambio "Versión inicial malla 2026 aprobada en CI"
    Entonces la respuesta es 201
    Y la version del documento es 1
    Y el indicador pasa a estado "EN_REVISION"
    Y se encola notificacion al TD asignado

  Escenario: Archivo no permitido por MIME
    Dado el CC autenticado con acceso al indicador "IND-002"
    Cuando intenta cargar un archivo "evidencia.exe"
    Entonces la respuesta es 415
    Y el codigo de error es "DOC_MIME"

  Escenario: Coordinador sin asignación no puede cargar
    Dado el CC "coord.otra@umss.edu.bo" autenticado sin asignacion a la carrera del indicador "IND-003"
    Cuando intenta cargar un PDF valido en "IND-003"
    Entonces la respuesta es 403
    Y el codigo de error es "DOC_UNAUTHORIZED"

  Escenario: Archivo excede tamaño máximo
    Dado el CC autenticado con acceso al indicador "IND-004"
    Cuando intenta cargar un PDF de 80 MB
    Entonces la respuesta es 413
    Y el codigo de error es "DOC_SIZE"
```

---

## UC-SIG-04 — Evaluación técnica de indicadores (aprobación y rechazo)

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-04 |
| **Nombre** | Evaluación técnica de criterios e indicadores |
| **Objetivo del proceso** | Emitir **dictamen técnico** (aprobar/rechazar) sobre evidencias de cada indicador, con causa obligatoria en rechazo. |
| **Descripción funcional detallada** | **TD** revisa cola de indicadores `EN_REVISION`, descarga versión vigente, decide. Rechazo exige justificación ≥ 20 caracteres. El sistema actualiza estado, registra auditoría y notifica **CC**. Opcionalmente habilita cierre de subfase si todos los indicadores obligatorios están `APROBADO` (UC-SIG-04b enlazado a avance — puede fusionarse en implementación). |
| **Actor principal** | TD |
| **Actores secundarios** | CC, SISTEMA |
| **Stakeholders** | DUEA, Coordinación de carrera, calidad académica |
| **Precondiciones** | TD autenticado; indicador `EN_REVISION`. |
| **Disparador** | TD abre detalle del indicador y confirma decisión. |
| **Flujo principal** | 1) Lista priorizada por fecha límite. 2) Descarga evidencia vigente. 3) Selección APROBAR/RECHAZAR. 4) Validación justificación si rechazo. 5) Persistencia. 6) Notificación CC. 7) Auditoría. |
| **Flujos alternativos** | **A1** TD deja comentario interno no visible a CC (si política lo permite — v2). |
| **Flujos de excepción/error** | **E1** Rechazo sin justificación suficiente → 422 `VAL_JUSTIFICATION_SHORT`. **E2** Indicador no en `EN_REVISION` → 409 `WF_INVALID_STATE`. |
| **Postcondiciones** | Estado indicador terminal de ciclo actual; CC informado. |
| **Reglas de negocio** | RB-03 (para cierre subfase en flujo relacionado); RB-10 |
| **Prioridad** | **P0** |
| **Criticidad** | **Crítica** |
| **Requerimientos asociados** | FR-016–FR-020; PRD-US-006, 007, 008; FSD-UC-003 |
| **Validaciones funcionales** | Rol TD; longitud justificación; estado válido para transición. |
| **Datos de entrada** | `{indicadorId, accion: APROBAR|RECHAZAR, justificacion?}` |
| **Datos de salida** | `{indicadorId, estado, actualizadoEn}` |
| **Criterios de aceptación verificables** | (1) Imposible confirmar rechazo sin texto ≥20. (2) Aprobación sin justificación obligatoria. (3) Auditoría con acción y técnico. |

### BDD — UC-SIG-04

```gherkin
# language: es
Característica: UC-SIG-04 Evaluación de indicadores
  Como técnico DUEA
  Quiero aprobar o rechazar indicadores con trazabilidad
  Para asegurar calidad documental antes del cierre de fase

  Escenario: Aprobación exitosa
    Dado el TD "td.duea@umss.edu.bo" autenticado
    Y el indicador "IND-010" en estado "EN_REVISION" con documento vigente
    Cuando envia decision APROBAR sin justificacion
    Entonces la respuesta es 200
    Y el indicador pasa a "APROBADO"
    Y el CC de la carrera recibe notificacion de aprobacion

  Escenario: Rechazo con justificación válida
    Dado el indicador "IND-011" en estado "EN_REVISION"
    Cuando el TD envia decision RECHAZAR con justificacion de 25 caracteres
    Entonces la respuesta es 200
    Y el indicador pasa a "RECHAZADO"
    Y la justificacion queda almacenada y visible para el CC

  Escenario: Rechazo bloqueado por justificación corta
    Dado el indicador "IND-012" en estado "EN_REVISION"
    Cuando el TD envia decision RECHAZAR con justificacion de 10 caracteres
    Entonces la respuesta es 422
    Y el codigo de error es "VAL_JUSTIFICATION_SHORT"
```

---

## UC-SIG-04b — Cierre de subfase y avance de fase (extensión operativa)

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-04b |
| **Nombre** | Cierre de subfase y autorización de avance |
| **Objetivo** | Cerrar subfase solo con **completitud** validada y avanzar el proceso. |
| **Actor principal** | TD |
| **Reglas** | RB-03, BR-014 |
| **Requerimientos** | FR-019, FR-020 |

### BDD — UC-SIG-04b

```gherkin
# language: es
Característica: UC-SIG-04b Avance de subfase
  Como técnico DUEA
  Quiero cerrar una subfase cuando todos los indicadores obligatorios estén aprobados
  Para avanzar el proceso conforme a normativa

  Escenario: Cierre exitoso de subfase
    Dado la subfase "SUB-01" con tres indicadores obligatorios todos en "APROBADO"
    Y un TD autenticado
    Cuando solicita avance de subfase "SUB-01" con confirmar true
    Entonces la respuesta es 200
    Y la subfase queda "CERRADA"
    Y la siguiente subfase queda habilitada si existe

  Escenario: Cierre bloqueado por indicador pendiente
    Dado la subfase "SUB-02" con un indicador obligatorio en "PENDIENTE"
    Cuando el TD intenta avance de subfase "SUB-02"
    Entonces la respuesta es 409
    Y el codigo de error es "WF_INCOMPLETE"
    Y la lista indicadoresPendientes no está vacía
```

---

## UC-SIG-05 — Generación de reportes e informes ejecutivos

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-05 |
| **Nombre** | Generación de reportes e informes ejecutivos (PDF) |
| **Objetivo del proceso** | Producir informes **PDF** para Consejo de Facultad, Decanato o Vicerrectorado con estado de avance y alertas. |
| **Descripción funcional detallada** | **JD** parametriza alcance (universidad, facultad, carrera), gestión y tipo de acreditación. El sistema encola job, genera PDF server-side con marca institucional UMSS, metadatos de generación y filtros aplicados. Si supera umbral de tiempo, notifica por correo con enlace temporal firmado. |
| **Actor principal** | JD |
| **Actores secundarios** | SISTEMA (motor reportes) |
| **Stakeholders** | Rectorado, Vicerrectorado, Decanos, DUEA |
| **Precondiciones** | Datos de procesos cargados; JD autenticado. |
| **Disparador** | JD pulsa “Generar PDF”. |
| **Flujo principal** | 1) Parámetros. 2) Job async. 3) Generación. 4) Almacenamiento temporal. 5) Descarga o correo “listo”. 6) Auditoría `REPORTE`. |
| **Flujos alternativos** | **A1** Exportación Excel adicional (Could). |
| **Flujos de excepción/error** | **E1** Fallo plantilla → 500 `REPORT_TEMPLATE`. **E2** Timeout → 202 + `jobId`. |
| **Postcondiciones** | PDF disponible; uso interno marcado (RB-07). |
| **Reglas de negocio** | RB-07, BR-004 |
| **Prioridad** | **P0** |
| **Criticidad** | **Alta** |
| **Requerimientos asociados** | FR-025, FR-026; PRD-US-011; FSD-UC-005 |
| **Criterios de aceptación verificables** | P95 ≤ 5 min o respuesta 202 con seguimiento; PDF contiene fecha, solicitante, alcance. |

### BDD — UC-SIG-05

```gherkin
# language: es
Característica: UC-SIG-05 Reportes ejecutivos
  Como jefatura DUEA
  Quiero generar un PDF de estado de acreditaciones
  Para presentar información consolidada a autoridades académicas

  Escenario: Generación síncrona exitosa en volumen pequeño
    Dado JD autenticado
    Y existen datos de avance para la facultad seleccionada
    Cuando solicita PDF con alcance "FACULTAD" y gestion 2026
    Entonces recibe 200 o 201 con enlace de descarga
    Y el PDF contiene texto "USO_INTERNO" o leyenda de distribución restringida
    Y el log contiene evento "REPORTE"

  Escenario: Job asíncrono para alcance universidad completo
    Dado JD autenticado
    Cuando solicita PDF con alcance "UNIVERSIDAD" y el sistema determina volumen alto
    Entonces recibe 202 con jobId
    Y cuando el job finaliza existe notificación o enlace de descarga
```

---

## UC-SIG-06 — Seguimiento de observaciones y plan de mejora

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-06 |
| **Nombre** | Seguimiento de observaciones y plan de mejora |
| **Objetivo del proceso** | Vincular **observaciones** de TD con **acciones de mejora** hasta cierre evidenciado. |
| **Descripción funcional detallada** | Tras rechazo (UC-SIG-04), **CC** crea ítems de plan (título, responsable interno carrera, fecha objetivo). **TD** cambia estados hasta `CERRADO` cuando exista evidencia de cumplimiento adjunta o indicador repasa a `APROBADO`. |
| **Actor principal** | CC / TD |
| **Actores secundarios** | JD (supervisión) |
| **Stakeholders** | Comité de calidad de carrera, DUEA |
| **Precondiciones** | Indicador en `RECHAZADO` o política DUEA habilita plan proactivo. |
| **Disparador** | CC crea plan desde panel de observaciones. |
| **Flujo principal** | 1) CC crea plan vinculado a `indicadorId`. 2) Estados PROPUESO → EN_EJECUCION → EVIDENCIADO → CERRADO por TD. 3) Auditoría por transición. |
| **Flujos alternativos** | **A1** Múltiples ítems por una misma observación. |
| **Flujos de excepción/error** | **E1** Cierre sin evidencia cuando política exige adjunto → 422. |
| **Postcondiciones** | Trazabilidad mejora ↔ indicador. |
| **Reglas de negocio** | Coherencia con RB-03 al reabrir ciclos; RB-10 |
| **Prioridad** | **P1** |
| **Criticidad** | **Media-Alta** |
| **Requerimientos asociados** | FR-033; PRD-US-021; FSD-UC-012 |
| **Criterios de aceptación** | Historial de estados visible; TD no puede cerrar sin cumplir checklist configurable. |

### BDD — UC-SIG-06

```gherkin
# language: es
Característica: UC-SIG-06 Plan de mejora
  Como coordinador de carrera
  Quiero registrar acciones de mejora a partir de observaciones del TD
  Para cerrar el ciclo de calidad de forma documentada

  Escenario: Creación de plan desde indicador observado
    Dado el indicador "IND-020" en estado "RECHAZADO" con observacion visible
    Y el CC autenticado con acceso a la carrera
    Cuando crea plan de mejora con titulo "Actualizar matriz de competencias" y fecha objetivo "2026-08-01"
    Entonces el plan queda en estado "PROPUESTO"
    Y está vinculado al indicador "IND-020"

  Escenario: TD cierra plan con evidencia
    Dado un plan "PLAN-01" en estado "EVIDENCIADO" con adjunto de cumplimiento
    Y un TD autenticado
    Cuando cambia el estado a "CERRADO"
    Entonces el plan queda "CERRADO"
    Y se registra la transición en auditoría
```

---

## UC-SIG-07 — Gestión de usuarios, roles y asignaciones

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-07 |
| **Nombre** | Gestión de usuarios y roles del sistema |
| **Objetivo del proceso** | Gobernar **identidades** y **permisos** alineados a política UMSS (@umss.edu.bo). |
| **Descripción funcional detallada** | **JD** alta/baja/modificación de usuarios, asignación de rol primario (CC/TD/JD) y asignación CC↔carrera. Bloqueo inmediato al desactivar. Opcional: delegación limitada de permisos de lectura a decanos en fase evolutiva. |
| **Actor principal** | JD |
| **Actores secundarios** | TI (aprovisionamiento inicial masivo opcional) |
| **Stakeholders** | DUEA, TI UMSS |
| **Precondiciones** | JD autenticado. |
| **Disparador** | JD accede a “Usuarios”. |
| **Flujo principal** | CRUD usuario; validación email dominio; asignación rol; auditoría. |
| **Flujos alternativos** | **A1** Importación CSV inicial con validación fila a fila. |
| **Flujos de excepción/error** | **E1** Email duplicado → 409. **E2** Intento auto-elevación rol → 403. |
| **Postcondiciones** | Permisos efectivos en próximo login o refresh token según diseño. |
| **Reglas de negocio** | RB-06 |
| **Prioridad** | **P0** |
| **Criticidad** | **Alta** |
| **Requerimientos asociados** | FR-001, FR-004, FR-005; PRD-US-001, 002; FSD-UC-001 |
| **Criterios de aceptación** | Usuario desactivado no puede autenticarse; matriz §8.2 FSD respetada en pruebas. |

### BDD — UC-SIG-07

```gherkin
# language: es
Característica: UC-SIG-07 Usuarios y roles
  Como jefatura DUEA
  Quiero administrar usuarios y sus roles
  Para asegurar el principio de mínimo privilegio

  Escenario: Alta de coordinador con correo UMSS
    Dado JD autenticado
    Cuando crea usuario email "nuevo.coord@umss.edu.bo" rol "CC" activo true
    Entonces la respuesta es 201
    Y el usuario puede autenticarse tras establecer password inicial según flujo definido

  Escenario: Rechazo de correo no institucional
    Dado JD autenticado
    Cuando intenta crear usuario email "x@gmail.com"
    Entonces la respuesta es 400 o 422 con error de dominio
```

---

## UC-SIG-08 — Auditoría, trazabilidad y exportación de eventos

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-08 |
| **Nombre** | Consulta y exportación de auditoría |
| **Objetivo del proceso** | Garantizar **trazabilidad** append-only de acciones para defensa ante auditores y transparencia interna. |
| **Descripción funcional detallada** | **JD** (y TD según política) consulta `log_auditoria` con filtros; exporta CSV paginado. Sistema impide modificación/eliminación de filas de log vía API estándar. |
| **Actor principal** | JD |
| **Actores secundarios** | TD (lectura si aplica) |
| **Stakeholders** | Contraloría interna, DUEA, auditores CEUB |
| **Precondiciones** | Rol autorizado. |
| **Disparador** | JD abre “Auditoría”. |
| **Flujo principal** | Filtro → lista → export opcional. |
| **Flujos alternativos** | **A1** Meta-auditoría de consultas sensibles. |
| **Flujos de excepción/error** | **E1** Rango temporal excesivo → forzar async export. |
| **Postcondiciones** | Archivo exportado o vista en pantalla; acceso auditado. |
| **Reglas de negocio** | RB-04 contexto documental; BR-009 |
| **Prioridad** | **P0** |
| **Criticidad** | **Alta** |
| **Requerimientos asociados** | FR-030, FR-031; PRD-US-018; FSD-UC-009 |
| **Criterios de aceptación** | No existe endpoint estándar DELETE/UPDATE sobre log; 100% acciones críticas registradas en prueba E2E. |

### BDD — UC-SIG-08

```gherkin
# language: es
Característica: UC-SIG-08 Auditoría
  Como jefatura DUEA
  Quiero consultar y exportar el log de auditoría
  Para demostrar trazabilidad en procesos de acreditación

  Escenario: Filtro por acción CARGA en rango de fechas
    Dado JD autenticado
    Y existen eventos CARGA en los últimos 7 dias
    Cuando consulta auditoria con accion "CARGA" y rango ultimos 7 dias
    Entonces la respuesta contiene solo eventos CARGA
    Y cada evento incluye usuarioId timestamp y entidadId

  Escenario: Intento de borrado de log vía API estándar
    Dado JD autenticado
    Cuando intenta DELETE sobre el recurso de un evento de auditoría
    Entonces la respuesta es 405 o 403
```

---

## UC-SIG-09 — Validación de cumplimiento normativo (CEUB / ARCU-SUR)

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-09 |
| **Nombre** | Validación automática y asistida de cumplimiento normativo |
| **Objetivo del proceso** | Asegurar que el sistema **impida** operaciones incumplidas con marco CEUB/ARCU-SUR y plazos oficiales. |
| **Descripción funcional detallada** | Validaciones en creación de proceso (RB-01, BR-013), inmutabilidad de fechas límite externas (RB-05), checklist de indicadores obligatorios antes de cierre (RB-03), bloqueo de eliminación de evidencias aprobadas (RB-04). Panel “Cumplimiento” opcional lista incumplimientos por carrera. |
| **Actor principal** | SISTEMA / JD (configuración) |
| **Actores secundarios** | TD, CC |
| **Stakeholders** | CEUB, ARCU-SUR, Ministerio de Educación (marco general) |
| **Precondiciones** | Reglas cargadas en motor de validación versión plantilla. |
| **Disparador** | Operaciones de negocio disparan validaciones; JD puede ejecutar “Simulación de cumplimiento”. |
| **Flujo principal** | Validación en API + mensajes RB-10. |
| **Flujos alternativos** | **A1** Reporte de brechas de cumplimiento PDF (Could). |
| **Flujos de excepción/error** | Códigos `NORM_*`, `WF_*`, `VAL_*`. |
| **Postcondiciones** | Estado del sistema coherente con normativa modelada. |
| **Reglas de negocio** | RB-01, RB-03, RB-04, RB-05, RB-08, BR-013, BR-014 |
| **Prioridad** | **P0** |
| **Criticidad** | **Crítica** |
| **Requerimientos asociados** | FR-008, FR-009, FR-019; FSD-UC-010 |
| **Criterios de aceptación** | Pruebas negativas automatizadas para cada regla en matriz de pruebas. |

### BDD — UC-SIG-09

```gherkin
# language: es
Característica: UC-SIG-09 Cumplimiento normativo
  Como sistema SIGESA
  Debo aplicar reglas CEUB y ARCU-SUR en operaciones críticas
  Para reducir riesgo de incumplimiento en convocatorias

  Escenario: Fecha límite externa no editable por TD
    Dado un proceso con fecha limite externa "2026-11-30" definida por convocatoria
    Y un TD autenticado
    Cuando intenta modificar la fecha limite externa a "2026-12-31"
    Entonces la operación es rechazada con 403 o 422 según diseño de API
    Y el valor permanece "2026-11-30"

  Escenario: Bloqueo de eliminación de documento aprobado
    Dado un documento en estado de aprobacion "APROBADO" para el indicador "IND-030"
    Cuando cualquier usuario intenta eliminar fisicamente el documento
    Entonces la operación no está permitida
    Y solo es posible agregar una nueva version según RB-04
```

---

## UC-SIG-10 — Dashboard e indicadores institucionales

| Atributo | Contenido |
|----------|-----------|
| **ID** | UC-SIG-10 |
| **Nombre** | Dashboard gerencial e indicadores institucionales |
| **Objetivo del proceso** | Visualizar **semáforos** y **porcentajes de avance** por carrera/facultad para toma de decisiones sin compilación manual. |
| **Descripción funcional detallada** | **JD** accede a `/dashboard/resumen`; sistema calcula `porcentaje_avance` según RB-09 (pesos configurables), aplica bandas de semáforo (verde/amarillo/rojo), permite filtros por facultad, tipo CEUB/ARCU-SUR y gestión. Actualización en tiempo casi real (polling o WebSocket). |
| **Actor principal** | JD |
| **Actores secundarios** | DC (solo lectura futura) |
| **Stakeholders** | Decanatos, Vicerrectorado, DUEA |
| **Precondiciones** | Procesos e indicadores con estados actualizados. |
| **Disparador** | Acceso a dashboard tras login JD. |
| **Flujo principal** | Solicitud agregados → cálculo → render tabla y drill-down carrera. |
| **Flujos alternativos** | **A1** Export snapshot CSV del dashboard (Could). |
| **Flujos de excepción/error** | **E1** Timeout cálculo → respuesta con cache `stale=true`. |
| **Postcondiciones** | Vista coherente con datos transaccionales. |
| **Reglas de negocio** | RB-09, RB-10, BR-003 |
| **Prioridad** | **P0** |
| **Criticidad** | **Alta** |
| **Requerimientos asociados** | FR-021–FR-024; PRD-US-009, 010; FSD-UC-004 |
| **Criterios de aceptación** | Tiempo a vista útil ≤ 2 min en red campus referencia; semáforos alineados a umbrales documentados. |

### BDD — UC-SIG-10

```gherkin
# language: es
Característica: UC-SIG-10 Dashboard institucional
  Como jefatura DUEA
  Quiero ver el estado de avance de las carreras en semáforos
  Para priorizar apoyos antes de vencimientos CEUB

  Escenario: Semáforo verde para carrera con alto avance
    Dado procesos configurados para la gestion 2026
    Y la carrera "Ing. Sistemas" tiene porcentaje de avance calculado 85 por ciento
    Cuando JD solicita el dashboard resumen para gestion 2026
    Entonces la carrera "Ing. Sistemas" muestra semaforo "VERDE"

  Esquema del escenario: Semáforo según porcentaje de avance
    Dado la carrera "<carrera>" con porcentaje de avance <pct>
    Cuando JD solicita el dashboard resumen
    Entonces el semaforo es "<semaforo>"

    Ejemplos:
      | carrera   | pct | semaforo |
      | Carrera A | 85 | VERDE    |
      | Carrera B | 60 | AMARILLO |
      | Carrera C | 30 | ROJO     |

  Escenario: Filtro por facultad reduce el conjunto de carreras
    Dado JD autenticado
    Cuando solicita dashboard con facultadId "11111111-1111-1111-1111-111111111111"
    Entonces todos los items devueltos pertenecen a esa facultad
```

---

## 2. Matriz de trazabilidad global (resumen)

| UC-SIG | FSD-UC | PRD-US (ejemplo) | Reglas dominantes |
|--------|--------|------------------|-------------------|
| UC-SIG-01 | — (catálogo) | PRD-US-002 | RB-10 |
| UC-SIG-02 | FSD-UC-010 | PRD-US-019, 007 | RB-01, RB-05, RB-08, BR-013 |
| UC-SIG-03 | FSD-UC-002 | PRD-US-003–005, 014 | RB-02, RB-04 |
| UC-SIG-04 | FSD-UC-003 | PRD-US-006–008 | RB-03 (cierre), RB-10 |
| UC-SIG-04b | FSD-UC-003 | PRD-US-007 | RB-03, BR-014 |
| UC-SIG-05 | FSD-UC-005 | PRD-US-011 | RB-07 |
| UC-SIG-06 | FSD-UC-012 | PRD-US-021 | RB-10 |
| UC-SIG-07 | FSD-UC-001 | PRD-US-001, 002 | RB-06 |
| UC-SIG-08 | FSD-UC-009 | PRD-US-018 | BR-009 |
| UC-SIG-09 | Transversal | PRD-US-007, 019 | RB-01, RB-03–RB-05 |
| UC-SIG-10 | FSD-UC-004 | PRD-US-009, 010 | RB-09 |

---

## 3. Estrategia de automatización BDD

| Herramienta | Uso |
|-------------|-----|
| Cucumber / pytest-bdd / SpecFlow | Ejecución escenarios `.feature` |
| Playwright | UI crítica CC/TD |
| CI | Rama `main` ejecuta suite `@smoke` en cada push |

**Tags sugeridos:** `@smoke`, `@normativa`, `@documento`, `@dashboard`, `@auditoria`.

---

## 4. Registro de cambios

| Versión | Fecha | Descripción |
|---------|-------|-------------|
| v1.0 | 14/05/2026 | Versión inicial: 10 CU críticos + UC-SIG-04b + Gherkin en español |

---

*Fin del documento — `05_cu_bdd/CU_BDD_SIGESA_Institucional_v1.md`*
