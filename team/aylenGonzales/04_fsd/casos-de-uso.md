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
| FSD-UC-008 | Portal Público de Consulta de Estado | [P] Público sin autenticación | Should |
| FSD-UC-009 | Emisión y Descarga de Certificados de Acreditación | [JD] Jefe de Departamento | Could |
| FSD-UC-010 | Respaldo Automático Diario Verificable | Sistema (scheduler) | Must |

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

---

## FSD-UC-008 — Portal Público de Consulta de Estado

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-008 |
| **Nombre** | Portal Público de Consulta de Estado de Acreditación |
| **Actor principal** | [P] Usuario público (sin autenticación) |
| **Actores secundarios** | Sistema |
| **Prioridad** | Should |
| **Trazabilidad** | MRD-N-10 · BR-010 · PRD-REQ-010 — cierra GAP-001 |

### Precondiciones
- Al menos una carrera con estado de acreditación registrado en el sistema.
- El portal público está habilitado por el administrador.

### Flujo principal
1. Usuario externo accede a la URL pública del portal (sin login).
2. Usuario selecciona facultad y/o carrera desde una lista desplegable.
3. Sistema consulta el estado de acreditación vigente de la carrera.
4. Sistema muestra: nombre de la carrera, facultad, estado (`EN_PROCESO`, `ACREDITADA`, `VENCIDA`), fecha de última actualización y fase CEUB actual.
5. Usuario puede descargar el resumen público en PDF (sin datos internos del expediente).

### Flujos alternativos
| Paso | Condición | Acción |
|------|-----------|--------|
| 3a | Carrera sin estado registrado | Sistema muestra "Información no disponible aún" |
| 5a | Error en generación de PDF | Sistema ofrece vista en pantalla como alternativa |

### Postcondiciones
- No se modifican datos del sistema.
- Consulta registrada en LOG_AUDITORIA (acción = `PUBLIC_QUERY`, sin datos de usuario).

### Reglas de negocio aplicables
`RBN-10` · `RBN-11`

### Escenarios Gherkin

```gherkin
Scenario: Consulta pública exitosa de carrera acreditada
  Given el portal público está habilitado
  And la carrera "Ingeniería de Sistemas" tiene estado ACREDITADA
  When un usuario externo selecciona esa carrera sin autenticarse
  Then el sistema muestra estado "ACREDITADA", facultad y fecha de actualización
  And el sistema registra PUBLIC_QUERY en el log sin datos personales

Scenario: Consulta de carrera sin información disponible
  Given la carrera "Licenciatura en Arte" no tiene estado registrado
  When un usuario externo la selecciona
  Then el sistema muestra "Información no disponible aún"
  And no expone ningún dato interno del expediente

Scenario: Descarga de resumen público en PDF
  Given la carrera tiene estado ACREDITADA
  When el usuario externo solicita descargar el resumen
  Then el sistema genera un PDF sin datos internos del expediente
  And el PDF incluye solo: nombre, facultad, estado y fecha de actualización
```

---

## FSD-UC-009 — Emisión y Descarga de Certificados de Acreditación

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-009 |
| **Nombre** | Emisión y Descarga de Certificados de Acreditación |
| **Actor principal** | [JD] Jefe de Departamento |
| **Actores secundarios** | Sistema generador de documentos, [TD] |
| **Prioridad** | Could |
| **Trazabilidad** | MRD-N-11 · BR-011 · PRD-REQ-011 — cierra GAP-002 |

### Precondiciones
- Usuario autenticado con rol `[JD]`.
- La carrera tiene estado `ACREDITADA` con evidencias en `APROBADO_FINAL`.
- La acreditación fue registrada por el administrador del sistema.

### Flujo principal
1. [JD] accede al módulo de certificados.
2. [JD] selecciona la carrera y el período de acreditación.
3. Sistema verifica que el estado sea `ACREDITADA` y que la vigencia no haya expirado.
4. Sistema genera el certificado PDF con: nombre de la carrera, facultad, período de acreditación, marco normativo (CEUB/ARCU-SUR), número de certificado único y QR de verificación.
5. [JD] descarga el certificado firmado digitalmente.
6. Sistema registra la emisión en LOG_AUDITORIA (acción = `CERTIFICATE_ISSUED`).

### Flujos alternativos
| Paso | Condición | Acción |
|------|-----------|--------|
| 3a | Estado distinto de `ACREDITADA` | Sistema bloquea la emisión y muestra el estado actual |
| 3b | Acreditación vencida | Sistema informa la fecha de vencimiento y sugiere proceso de renovación |
| 4a | Error en generación PDF | Sistema notifica al [JD] y registra el fallo en el log |

### Postcondiciones
- Certificado registrado con número único e inmutable en el sistema.
- QR de verificación activo y consultable públicamente.
- LOG_AUDITORIA actualizado con `CERTIFICATE_ISSUED`.

### Reglas de negocio aplicables
`RBN-11` · `RBN-12`

### Escenarios Gherkin

```gherkin
Scenario: Emisión exitosa de certificado
  Given la carrera "Ing. de Sistemas" tiene estado ACREDITADA vigente
  And el [JD] está autenticado
  When solicita emitir el certificado para el período 2026-I
  Then el sistema genera el PDF con número único y QR de verificación
  And el log registra CERTIFICATE_ISSUED con timestamp y usuario

Scenario: Bloqueo por estado no acreditado
  Given la carrera "Lic. en Arte" tiene estado EN_PROCESO
  When el [JD] intenta emitir un certificado
  Then el sistema muestra "La carrera no tiene acreditación vigente"
  And no genera ningún documento

Scenario: Certificado con acreditación vencida
  Given la carrera tiene acreditación vencida al 2025-12-31
  When el [JD] intenta emitir el certificado
  Then el sistema muestra "Acreditación vencida el 31/12/2025"
  And sugiere iniciar el proceso de renovación
  And no emite el certificado
```

---

## FSD-UC-010 — Respaldo Automático Diario Verificable

| Campo | Valor |
|-------|-------|
| **ID** | FSD-UC-010 |
| **Nombre** | Respaldo Automático Diario Verificable |
| **Actor principal** | Sistema (scheduler automático) |
| **Actores secundarios** | Administrador del sistema |
| **Prioridad** | Must |
| **Trazabilidad** | MRD-N-12 · BR-012 · PRD-REQ-012 |

### Precondiciones
- Sistema en funcionamiento con base de datos y almacenamiento de archivos activos.
- Scheduler configurado para ejecutarse diariamente a las 02:00 hora local.

### Flujo principal
1. Scheduler dispara el proceso de respaldo a las 02:00.
2. Sistema genera respaldo comprimido de la base de datos (dump SQL).
3. Sistema genera respaldo del almacenamiento de archivos (evidencias y documentos).
4. Sistema calcula hash SHA-256 del paquete de respaldo para verificación de integridad.
5. Sistema almacena el respaldo en ubicación secundaria (distinta al almacenamiento primario).
6. Sistema registra en LOG_AUDITORIA: acción = `BACKUP_COMPLETED`, tamaño, hash, duración y estado (`SUCCESS` / `FAILED`).
7. Si el respaldo falla: sistema envía alerta al administrador por correo en ≤ 15 min.

### Flujos alternativos
| Paso | Condición | Acción |
|------|-----------|--------|
| 2a | Fallo en dump de base de datos | Marca respaldo como `FAILED`; alerta al administrador; reintenta en 1 hora |
| 5a | Almacenamiento secundario sin espacio | Alerta al administrador; no sobreescribe respaldo anterior válido |

### Postcondiciones
- Respaldo del día disponible y verificable por hash en ubicación secundaria.
- LOG_AUDITORIA actualizado con resultado del proceso.
- Administrador notificado solo en caso de fallo.

### Reglas de negocio aplicables
`RBN-13` · `RBN-14`

### Escenarios Gherkin

```gherkin
Scenario: Respaldo diario exitoso
  Given el scheduler está configurado para las 02:00
  And el almacenamiento secundario tiene espacio disponible
  When se ejecuta el proceso de respaldo
  Then el sistema genera dump SQL y respaldo de archivos
  And calcula hash SHA-256 del paquete
  And registra BACKUP_COMPLETED con estado SUCCESS en el log
  And no envía ninguna alerta al administrador

Scenario: Fallo en respaldo con alerta
  Given el scheduler ejecuta el proceso a las 02:00
  And el almacenamiento secundario está lleno
  When el sistema intenta almacenar el respaldo
  Then registra BACKUP_COMPLETED con estado FAILED en el log
  And envía alerta al administrador en ≤ 15 min
  And no sobreescribe el respaldo anterior válido

Scenario: Verificación de integridad del respaldo
  Given existe un respaldo del día anterior con hash ABC123
  When el administrador ejecuta la verificación
  Then el sistema recalcula el hash del paquete
  And confirma "Integridad verificada: hash coincide" si el valor es ABC123
  And muestra "Respaldo comprometido" si el hash difiere
```

---

## Gaps declarados

| ID | Gap | MRD-N afectado | Estado |
|----|-----|----------------|--------|
| GAP-001 | Portal público de consulta de estado sin FSD-UC asignado | MRD-N-10 | ✅ Cerrado — FSD-UC-008 |
| GAP-002 | Emisión de certificados de acreditación sin FSD-UC asignado | MRD-N-11 | ✅ Cerrado — FSD-UC-009 |
| GAP-003 | NFR-013 sin caso de prueba automatizado | — | ⚠️ Pendiente — TC-011 con k6/Locust |

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | 2026-05-13 | Aylen Gonzales Alvino | Versión inicial derivada de FSD v2.0 |
| 1.1 | 2026-05-14 | Aylen Gonzales Alvino | Agrega FSD-UC-008, FSD-UC-009, FSD-UC-010; cierra GAP-001 y GAP-002; total 10 UC |