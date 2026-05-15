# Casos de Uso — AcredIA / SIGESA
**Archivo:** `team/aylenGonzales/docs/fsd/casos-de-uso.md`
**Versión:** 1.0 | **Fecha:** 2026-05-14 | **Autora:** Aylen Mariangel Gonzales Alvino
**Fuente:** FSD v2.0 §2 | **Relaciones:** BRD v2 · PRD v1 · MRD v1

---

## Índice

| ID | Nombre | Actor principal | Prioridad |
|----|--------|-----------------|-----------|
| FSD-UC-001 | Carga de Evidencias | [CC] Coordinador de Carrera | Must |
| FSD-UC-002 | Control de Versiones de Documentos | [CC] / [TD] | Must |
| FSD-UC-003 | Flujo de Aprobación CC→TD→JD | [CC] / [TD] / [JD] | Must |
| FSD-UC-004 | Notificaciones Automáticas por Eventos | Sistema | Must |
| FSD-UC-005 | Generación de Reportes Ejecutivos PDF | [JD] Jefe de Departamento | Must |
| FSD-UC-006 | Autenticación y Gestión de Roles | [Todos] | Must |
| FSD-UC-007 | Búsqueda Multifiltro de Documentos | [TD] / [JD] | Must |

---

## FSD-UC-001 — Carga de Evidencias

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-001 |
| **Nombre** | Carga de Evidencias |
| **Actor principal** | [CC] Coordinador de Carrera |
| **Actores secundarios** | Sistema de almacenamiento, módulo de versiones |
| **Prioridad** | Must |
| **Trazabilidad** | MRD-N-01 · BR-001 · PRD-REQ-001 · PRD-US-001 |

### Precondiciones
- El usuario está autenticado con correo `@umss.edu.bo`.
- El usuario tiene rol `[CC]` asignado.
- El expediente de la carrera existe en el sistema.

### Flujo principal
1. [CC] accede al expediente de su carrera.
2. [CC] selecciona la fase e indicador CEUB/ARCU-SUR correspondiente.
3. [CC] adjunta el archivo (PDF, DOCX, XLSX; máx. 50 MB).
4. Sistema valida formato, tamaño y metadatos obligatorios (título, fecha, tipo).
5. Sistema registra la evidencia con versión `v1.0`, autor, timestamp y hash SHA-256.
6. Sistema confirma la carga y notifica al [TD] asignado (→ FSD-UC-004).

### Flujos alternativos
| Paso | Condición | Acción |
|------|-----------|--------|
| 4a | Formato no permitido | Sistema rechaza y muestra lista de formatos válidos |
| 4b | Tamaño > 50 MB | Sistema rechaza y sugiere compresión |
| 4c | Metadatos incompletos | Sistema bloquea envío y señala campos faltantes |

### Postcondiciones
- Evidencia registrada con versión inmutable en el repositorio.
- Log de auditoría actualizado (LOG_AUDITORIA, acción = `UPLOAD`).
- [TD] notificado en ≤ 15 min.

### Reglas de negocio aplicables
`RBN-01` · `RBN-02` · `RBN-07`

### Escenarios Gherkin

```gherkin
Scenario: Carga exitosa de evidencia válida
  Given el usuario [CC] está autenticado con aylen@umss.edu.bo
  And el expediente CARRERA-042 existe en el sistema
  When sube el archivo "plan-estudios-2026.pdf" (2 MB) con metadatos completos
  Then el sistema registra la evidencia con versión v1.0
  And genera hash SHA-256 del archivo
  And notifica al [TD] asignado en ≤ 15 min
  And el log de auditoría registra la acción UPLOAD

Scenario: Rechazo por formato no permitido
  Given el usuario [CC] está autenticado
  When intenta subir "evidencia.exe"
  Then el sistema rechaza la carga
  And muestra el mensaje "Formato no permitido. Use PDF, DOCX o XLSX."
  And no se registra ninguna versión

Scenario: Rechazo por metadatos incompletos
  Given el usuario [CC] está autenticado
  When sube un archivo válido sin seleccionar la fase CEUB
  Then el sistema bloquea el envío
  And señala el campo "Fase CEUB" como requerido
```

---

## FSD-UC-002 — Control de Versiones de Documentos

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-002 |
| **Nombre** | Control de Versiones de Documentos |
| **Actor principal** | [CC] Coordinador de Carrera |
| **Actores secundarios** | [TD] Técnico DUEA, Sistema |
| **Prioridad** | Must |
| **Trazabilidad** | MRD-N-02 · BR-002 · PRD-REQ-002 · PRD-US-003 |

### Precondiciones
- Evidencia existente cargada previamente (FSD-UC-001).
- Usuario autenticado con rol `[CC]`.

### Flujo principal
1. [CC] selecciona una evidencia existente.
2. [CC] carga una versión actualizada del documento.
3. Sistema incrementa automáticamente el número de versión (`v1.0 → v2.0`).
4. Sistema registra autor, fecha, timestamp y hash de la nueva versión.
5. Versión anterior permanece inmutable y accesible en el historial.
6. Sistema notifica al [TD] sobre la nueva versión disponible.

### Flujos alternativos
| Paso | Condición | Acción |
|------|-----------|--------|
| 2a | Archivo idéntico al anterior (mismo hash) | Sistema advierte duplicado y cancela la nueva versión |
| 4a | Fallo en almacenamiento | Sistema revierte y mantiene la versión anterior activa |

### Postcondiciones
- Nueva versión registrada; versión anterior conservada e inmutable.
- Historial completo visible para [TD] y [JD].
- Log de auditoría actualizado (acción = `VERSION_CREATE`).

### Reglas de negocio aplicables
`RBN-01` · `RBN-03` · `RBN-08`

### Escenarios Gherkin

```gherkin
Scenario: Carga de nueva versión exitosa
  Given existe la evidencia "reglamento-interno.pdf" en versión v1.0
  And el usuario [CC] está autenticado
  When sube "reglamento-interno-v2.pdf" como actualización
  Then el sistema registra la versión v2.0 con nuevo hash
  And la versión v1.0 permanece accesible e inmutable
  And el [TD] recibe notificación de nueva versión

Scenario: Detección de archivo duplicado
  Given existe la evidencia en versión v1.0 con hash ABC123
  When el [CC] intenta subir un archivo con el mismo hash ABC123
  Then el sistema muestra "El archivo es idéntico a la versión actual"
  And no se crea una nueva versión
```

---

## FSD-UC-003 — Flujo de Aprobación CC→TD→JD

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-003 |
| **Nombre** | Flujo de Aprobación CC→TD→JD |
| **Actor principal** | [TD] Técnico DUEA |
| **Actores secundarios** | [CC] Coordinador de Carrera, [JD] Jefe de Departamento, Sistema |
| **Prioridad** | Must |
| **Trazabilidad** | MRD-N-03 · BR-003 · PRD-REQ-003 · PRD-US-005 |

### Precondiciones
- Evidencia cargada y en estado `PENDIENTE_REVISION`.
- Actores con roles correctamente asignados.

### Flujo principal
1. [TD] recibe notificación de evidencia pendiente.
2. [TD] revisa la evidencia y selecciona Aprobar o Rechazar.
3a. **Aprobación**: Sistema actualiza estado a `APROBADO_TD` y notifica a [JD].
3b. **Rechazo**: [TD] ingresa justificación obligatoria (mín. 20 caracteres). Sistema actualiza estado a `RECHAZADO_TD` y notifica a [CC] con la justificación.
4. [JD] recibe evidencias en estado `APROBADO_TD`.
5. [JD] realiza aprobación final: estado pasa a `APROBADO_FINAL`.
6. Sistema registra cada transición en el log de auditoría con actor, timestamp y acción.

### Flujos alternativos
| Paso | Condición | Acción |
|------|-----------|--------|
| 3b | Justificación < 20 caracteres | Sistema bloquea el rechazo y solicita justificación más detallada |
| 5a | [JD] rechaza en etapa final | Requiere justificación; estado pasa a `RECHAZADO_JD`; notifica a [CC] y [TD] |

### Postcondiciones
- Estado final registrado (`APROBADO_FINAL` o `RECHAZADO_*`).
- Trazabilidad completa de la cadena de aprobación en log de auditoría.
- Todas las partes notificadas según el resultado.

### Reglas de negocio aplicables
`RBN-04` · `RBN-05` · `RBN-09`

### Escenarios Gherkin

```gherkin
Scenario: Aprobación completa CC→TD→JD
  Given la evidencia "informe-autoevaluacion.pdf" está en estado PENDIENTE_REVISION
  When el [TD] la aprueba
  Then el estado cambia a APROBADO_TD
  And el [JD] recibe notificación
  When el [JD] aprueba
  Then el estado cambia a APROBADO_FINAL
  And el log registra ambas aprobaciones con timestamp

Scenario: Rechazo por [TD] con justificación
  Given la evidencia está en estado PENDIENTE_REVISION
  When el [TD] selecciona Rechazar e ingresa "Falta firma del decano y sello institucional"
  Then el estado cambia a RECHAZADO_TD
  And el [CC] recibe notificación con la justificación completa

Scenario: Intento de rechazo sin justificación
  Given la evidencia está en estado PENDIENTE_REVISION
  When el [TD] selecciona Rechazar e ingresa solo "mal"
  Then el sistema muestra "La justificación debe tener al menos 20 caracteres"
  And no permite confirmar el rechazo
```

---

## FSD-UC-004 — Notificaciones Automáticas por Eventos

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-004 |
| **Nombre** | Notificaciones Automáticas por Eventos |
| **Actor principal** | Sistema (disparador automático) |
| **Actores secundarios** | [CC] / [TD] / [JD] (receptores) |
| **Prioridad** | Must |
| **Trazabilidad** | MRD-N-05 · BR-005 · PRD-REQ-005 · PRD-US-009 |

### Precondiciones
- Evento crítico registrado en el sistema (carga, aprobación, rechazo, vencimiento).
- Correos institucionales `@umss.edu.bo` configurados para los roles.

### Flujo principal
1. Sistema detecta evento crítico.
2. Sistema identifica al/los destinatario/s según el tipo de evento y rol.
3. Sistema genera correo con asunto estandarizado, descripción del evento y enlace directo.
4. Sistema envía el correo en ≤ 15 min desde el evento.
5. Sistema registra el envío en LOG_AUDITORIA (acción = `NOTIFICATION_SENT`).

### Tabla de eventos y destinatarios

| Evento | Disparador | Destinatario |
|--------|-----------|--------------|
| Nueva evidencia cargada | FSD-UC-001 | [TD] asignado |
| Nueva versión disponible | FSD-UC-002 | [TD] asignado |
| Aprobación TD | FSD-UC-003 paso 3a | [JD] |
| Rechazo TD | FSD-UC-003 paso 3b | [CC] |
| Aprobación final JD | FSD-UC-003 paso 5 | [CC] + [TD] |
| Vencimiento de plazo | Scheduler diario | [CC] + [TD] |

### Escenarios Gherkin

```gherkin
Scenario: Notificación enviada en tiempo
  Given el [CC] cargó una nueva evidencia a las 10:00
  Then el [TD] recibe correo de notificación antes de las 10:15
  And el log registra NOTIFICATION_SENT con timestamp

Scenario: Notificación de rechazo con justificación
  Given el [TD] rechazó una evidencia con justificación "Falta sello institucional"
  Then el [CC] recibe correo con asunto "Evidencia rechazada: [nombre]"
  And el cuerpo del correo incluye la justificación completa
```

---

## FSD-UC-005 — Generación de Reportes Ejecutivos PDF

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-005 |
| **Nombre** | Generación de Reportes Ejecutivos PDF |
| **Actor principal** | [JD] Jefe de Departamento |
| **Actores secundarios** | Sistema generador de PDF |
| **Prioridad** | Must |
| **Trazabilidad** | MRD-N-04 · BR-004 · PRD-REQ-004 · PRD-US-007 |

### Precondiciones
- Usuario autenticado con rol `[JD]`.
- Al menos una carrera con evidencias en estado `APROBADO_FINAL`.

### Flujo principal
1. [JD] accede al módulo de reportes.
2. [JD] selecciona tipo de reporte (por carrera, por fase CEUB, por gestión).
3. [JD] define el rango de fechas y el nivel de detalle.
4. Sistema compila los datos de evidencias aprobadas.
5. Sistema genera el PDF con portada, índice, tablas de indicadores y estado por fase.
6. Sistema presenta el PDF descargable en ≤ 5 min.
7. Sistema registra la generación en LOG_AUDITORIA (acción = `REPORT_GENERATED`).

### Flujos alternativos
| Paso | Condición | Acción |
|------|-----------|--------|
| 4a | No hay evidencias aprobadas en el rango | Sistema informa y ofrece ampliar el rango de fechas |
| 6a | Generación supera 5 min | Sistema notifica al [JD] por correo cuando el PDF esté listo |

### Escenarios Gherkin

```gherkin
Scenario: Generación exitosa de reporte PDF
  Given el [JD] está autenticado
  And existen evidencias APROBADO_FINAL para CARRERA-042 en gestión 2026-I
  When selecciona "Reporte por carrera" y confirma
  Then el sistema genera el PDF en ≤ 5 min
  And el PDF incluye portada, índice y tabla de indicadores CEUB
  And el log registra REPORT_GENERATED

Scenario: Sin evidencias disponibles
  Given no hay evidencias APROBADO_FINAL en el rango seleccionado
  When el [JD] solicita el reporte
  Then el sistema muestra "No hay evidencias aprobadas en el período seleccionado"
  And sugiere ampliar el rango de fechas
```

---

## FSD-UC-006 — Autenticación y Gestión de Roles

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-006 |
| **Nombre** | Autenticación y Gestión de Roles |
| **Actor principal** | [Todos los usuarios] |
| **Actores secundarios** | Administrador del sistema |
| **Prioridad** | Must |
| **Trazabilidad** | MRD-N-06 · BR-006 · PRD-REQ-006 · PRD-US-011 |

### Precondiciones
- Usuario con correo institucional `@umss.edu.bo` registrado.

### Flujo principal
1. Usuario accede a la URL del sistema.
2. Usuario ingresa correo `@umss.edu.bo` y contraseña.
3. Sistema valida que el dominio sea `@umss.edu.bo`; rechaza cualquier otro dominio.
4. Sistema autentica y asigna el rol correspondiente: `[CC]`, `[TD]`, `[JD]` o `[P]`.
5. Sistema redirige al dashboard correspondiente al rol.
6. Sistema registra el inicio de sesión en LOG_AUDITORIA (acción = `LOGIN`).

### Flujos alternativos
| Paso | Condición | Acción |
|------|-----------|--------|
| 3a | Dominio distinto a `@umss.edu.bo` | Sistema rechaza con mensaje "Solo cuentas institucionales UMSS" |
| 2a | Credenciales incorrectas (3 intentos) | Sistema bloquea la cuenta por 15 min |

### Escenarios Gherkin

```gherkin
Scenario: Login exitoso con cuenta institucional
  Given el usuario tiene correo aylen@umss.edu.bo con rol [CC]
  When ingresa sus credenciales correctas
  Then el sistema lo autentica y redirige al dashboard [CC]
  And el log registra LOGIN con timestamp e IP

Scenario: Rechazo de dominio externo
  Given el usuario intenta ingresar con usuario@gmail.com
  When ingresa sus credenciales
  Then el sistema muestra "Solo se permiten cuentas @umss.edu.bo"
  And no permite el acceso
```

---

## FSD-UC-007 — Búsqueda Multifiltro de Documentos

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-007 |
| **Nombre** | Búsqueda Multifiltro de Documentos |
| **Actor principal** | [TD] Técnico DUEA |
| **Actores secundarios** | [JD] Jefe de Departamento |
| **Prioridad** | Must |
| **Trazabilidad** | MRD-N-08 · BR-008 · PRD-REQ-008 · PRD-US-015 |

### Precondiciones
- Usuario autenticado con rol `[TD]` o `[JD]`.
- Al menos una evidencia cargada en el sistema.

### Flujo principal
1. Usuario accede al módulo de búsqueda.
2. Usuario aplica uno o más filtros: título, carrera, facultad, modalidad, gestión, estado, fase CEUB.
3. Sistema ejecuta la búsqueda y devuelve resultados en ≤ 3 seg.
4. Usuario selecciona un resultado y accede al detalle del documento.
5. Sistema registra la búsqueda en LOG_AUDITORIA (acción = `SEARCH`).

### Escenarios Gherkin

```gherkin
Scenario: Búsqueda exitosa por carrera y gestión
  Given existen 15 evidencias para CARRERA-042 en gestión 2026-I
  When el [TD] filtra por carrera="Ingeniería de Sistemas" y gestión="2026-I"
  Then el sistema devuelve los resultados en ≤ 3 seg
  And muestra las 15 evidencias con título, estado y fecha

Scenario: Búsqueda sin resultados
  Given no existen evidencias para los filtros aplicados
  When el [TD] realiza la búsqueda
  Then el sistema muestra "No se encontraron documentos con los filtros seleccionados"
  And sugiere ampliar o cambiar los criterios de búsqueda
```

---

## Gaps declarados

| ID | Gap | MRD-N afectado | Acción requerida |
|----|-----|----------------|-----------------|
| GAP-001 | Portal público de consulta de estado sin FSD-UC asignado | MRD-N-10 | Formalizar FSD-UC-008 |
| GAP-002 | Emisión de certificados de acreditación sin FSD-UC asignado | MRD-N-11 | Formalizar FSD-UC-009 |

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | 2026-05-14 | Aylen Gonzales Alvino | Versión inicial derivada de FSD v2.0 |