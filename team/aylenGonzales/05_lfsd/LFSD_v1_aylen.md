# LFSD — AcredIA / SIGESA v1 ⚡
> Lightweight Functional Specification Document — modo compacto orientado a implementación

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | AcredIA / SIGESA — Sistema Inteligente de Gestión y Seguimiento de Acreditaciones |
| Grupo | AcredIA (`team/aylenGonzales`) |
| Versión | v1.0 |
| Fecha | 12/05/2026 |
| Modo | **LFSD ⚡** |
| Insumo 1 | `team/aylenGonzales/02_vision_negocio_v2.md` |
| Insumo 2 | `team/aylenGonzales/BRD_v2_aylen.md` |
| Insumo 3 | `team/aylenGonzales/PRD_v1_aylen.md` |
| Insumo 4 | `team/aylenGonzales/FSD_v1_aylen.md` |
| Trazabilidad | `PRD_v1_aylen.md` → `FSD_v1_aylen.md` → este LFSD |

---

## 1. Objetivo LFSD

AcredIA / SIGESA digitaliza el ciclo completo de gestión y seguimiento de acreditaciones universitarias CEUB y ARCU-SUR para la DUEA de la UMSS, eliminando la dependencia de Excel, correos y WhatsApp como canales de evidencia oficial.

**Módulos cubiertos en v1.0:**

| # | Módulo | Task ID |
|---|--------|---------|
| 1 | Autenticación y gestión de acceso por rol | T-001, T-002 |
| 2 | Repositorio de evidencias con versionado automático | T-003 |
| 3 | Flujo de aprobación/rechazo de indicadores | T-004 |
| 4 | Dashboard gerencial con semáforos en tiempo real | T-005 |
| 5 | Generación de reporte ejecutivo PDF | T-006 |
| 6 | Notificaciones automáticas por correo institucional | T-007 |
| 7 | Buscador de documentos con filtros múltiples | T-008 |
| 8 | Log de auditoría inmutable | T-009 |
| 9 | Portal público de consulta sin autenticación | T-010 |
| 10 | Respaldo automático diario | T-011 |
| 11 | Configuración de taxonomías CEUB y ARCU-SUR | T-012 |

---

## 2. Actores

| Actor | Tipo | Permisos clave |
|-------|------|----------------|
| [CC] Coordinador de Carrera | Humano | Cargar, versionar y consultar documentos de su carrera; ver observaciones del TD |
| [TD] Técnico DUEA | Humano | Aprobar/rechazar indicadores con justificación; autorizar avance de fases; visibilidad global |
| [JD] Jefatura DUEA | Humano | Configurar usuarios y plantillas; generar reportes; auditar historial; aprobar dictámenes |
| [P] Público externo | Humano | Solo lectura de información publicada oficialmente; sin autenticación |
| [JC] Jefe de Carrera | Humano | Permisos equivalentes a [CC] con mandato de supervisión institucional |
| [EE] Evaluador Externo | Humano | Visibilidad acotada al proceso asignado; registro de dictámenes; solo lectura |
| Sistema de notificaciones | Sistema | Lectura de eventos del sistema; envío de correos vía SMTP institucional |
| Motor de reportes | Sistema | Lectura de datos de carreras, fases y documentos para generación PDF/Excel |

---

## 3. Casos de uso críticos

---

### UC-A01 — Autenticación y gestión de acceso por rol
**Trazabilidad:** `PRD-REQ-001`, `PRD-REQ-002` | **BRs:** RB-06, BR-006

**Precondiciones:**
1. El usuario tiene correo institucional activo con dominio @umss.edu.bo.
2. El administrador ([JD]) ha registrado al usuario con su rol asignado.
3. El sistema tiene configurada la política de acceso por rol.

**Flujo principal:**
1. El usuario ingresa correo institucional y contraseña en la pantalla de login.
2. El sistema valida que el dominio sea @umss.edu.bo; rechaza cualquier otro dominio.
3. El sistema verifica las credenciales contra la base de datos.
4. El sistema genera un token JWT con rol y permisos del usuario.
5. El sistema redirige al dashboard correspondiente según el rol y registra el evento en auditoría.

**Invariantes:**
- Solo se admiten correos @umss.edu.bo; cualquier otro dominio es rechazado con mensaje claro.
- Credenciales inválidas no revelan cuál campo falla (mensaje genérico).
- Tras 5 intentos fallidos el sistema bloquea el acceso a la cuenta.
- Todo intento de login queda registrado en LOG_AUDITORIA con usuario, fecha y hora.
- El token JWT nunca expone la contraseña ni datos sensibles.

**Failure modes:**

| Código | Trigger | Respuesta del sistema |
|--------|---------|----------------------|
| `AUTH_INVALID_DOMAIN` | Correo con dominio distinto a @umss.edu.bo | HTTP 401; mensaje: "Solo se admiten correos @umss.edu.bo" |
| `AUTH_INVALID_CREDENTIALS` | Credenciales no coinciden con la base de datos | HTTP 401; mensaje genérico sin revelar cuál campo falla |
| `AUTH_USER_INACTIVE` | Usuario registrado pero desactivado por [JD] | HTTP 403; mensaje: "Cuenta inactiva, contacte al administrador" |
| `AUTH_TOO_MANY_ATTEMPTS` | 5 o más intentos fallidos consecutivos | HTTP 429; bloqueo temporal con mensaje de instrucción |

**Criterios de aceptación:**

```gherkin
Dado un usuario registrado con correo válido @umss.edu.bo y contraseña correcta
Cuando ingresa sus credenciales y pulsa "Iniciar sesión"
Entonces el sistema genera un token JWT y redirige al dashboard según su rol
  Y el log de auditoría registra el evento de inicio de sesión con usuario, fecha y hora
```

```gherkin
Dado un usuario con correo @gmail.com
Cuando intenta autenticarse en el sistema
Entonces el sistema muestra "Solo se admiten correos @umss.edu.bo"
  Y bloquea el acceso sin crear sesión
```

---

### UC-A02 — Carga y versionado de evidencias
**Trazabilidad:** `PRD-REQ-003`, `PRD-REQ-004` | **BRs:** RB-02, RB-04, BR-001, BR-002, BR-015

**Precondiciones:**
1. [CC] está autenticado y tiene una subfase en estado "Pendiente" o "Rechazado".
2. El indicador al que se cargará el documento está configurado en el sistema.
3. El archivo a cargar es PDF, DOCX o XLSX con tamaño ≤ 50 MB.

**Flujo principal:**
1. [CC] selecciona su carrera, la subfase pendiente y el indicador objetivo.
2. [CC] adjunta el archivo y completa la descripción del cambio (campo obligatorio).
3. El sistema muestra barra de progreso durante la carga del archivo.
4. El sistema calcula SHA-256, asigna versión autoincremental y registra autor, fecha y hora.
5. El indicador cambia a "En revisión" y el sistema notifica al [TD] en ≤ 15 minutos.

**Invariantes:**
- Solo [CC] puede cargar documentos; [TD] valida pero no carga en nombre del coordinador.
- La versión siempre es mayor a la anterior; nunca decrece.
- El historial de versiones es inalterable; ninguna versión previa puede eliminarse.
- Toda carga requiere `descripcion_cambio` no vacía.
- El estado del indicador se actualiza a EN_REVISION tras toda carga exitosa.

**Failure modes:**

| Código | Trigger | Respuesta del sistema |
|--------|---------|----------------------|
| `DOC_INVALID_FORMAT` | Formato distinto a PDF, DOCX o XLSX | HTTP 422; mensaje listando formatos aceptados |
| `DOC_FILE_TOO_LARGE` | Archivo mayor a 50 MB | HTTP 422; mensaje con guía de compresión |
| `DOC_UNAUTHORIZED` | Usuario sin permisos sobre la carrera del indicador | HTTP 403; operación rechazada |
| `DOC_STORAGE_ERROR` | Falla en el almacenamiento S3-compatible | HTTP 503; mensaje de reintento sin duplicar archivo |

**Criterios de aceptación:**

```gherkin
Dado un [CC] autenticado con subfase en estado "Pendiente"
Cuando sube un archivo PDF válido de 10 MB con descripción del cambio completada
Entonces el sistema muestra barra de progreso durante la carga
  Y al finalizar muestra confirmación con nombre, versión asignada, fecha y hora
  Y el indicador cambia a estado "En revisión"
  Y el [TD] asignado recibe notificación por correo en ≤ 15 minutos
```

```gherkin
Dado un [CC] intentando cargar un archivo de 80 MB
Cuando selecciona el archivo y pulsa "Cargar"
Entonces el sistema rechaza la carga con mensaje claro y guía de compresión
  Y no se registra ninguna entrada en el historial de versiones
```

---

### UC-A03 — Aprobación y rechazo de indicadores
**Trazabilidad:** `PRD-REQ-005` | **BRs:** RB-02, RB-03, BR-003, BR-014

**Precondiciones:**
1. [TD] está autenticado con rol Técnico DUEA.
2. Al menos un indicador está en estado "En revisión" con evidencia cargada.
3. [TD] tiene visibilidad global sobre todas las carreras.

**Flujo principal:**
1. [TD] accede al panel de auditoría y selecciona la carrera con indicadores pendientes.
2. [TD] revisa el indicador con todas las versiones cargadas; la versión vigente está marcada.
3. [TD] descarga y valida la evidencia vigente.
4. Si aprueba: indicador cambia a "Aprobado" y [CC] recibe notificación en ≤ 15 minutos.
5. Si rechaza: sistema exige justificación (mínimo 20 caracteres); al confirmar, indicador cambia a "Rechazado" y [CC] recibe notificación con la observación.

**Invariantes:**
- La justificación es obligatoria en todo rechazo; mínimo 20 caracteres.
- El botón "Confirmar rechazo" permanece deshabilitado hasta que se ingrese texto válido.
- No se puede aprobar una subfase si algún indicador está en estado Pendiente o Rechazado.
- Toda aprobación o rechazo queda registrado en LOG_AUDITORIA con actor, fecha, hora y justificación.

**Failure modes:**

| Código | Trigger | Respuesta del sistema |
|--------|---------|----------------------|
| `AUDIT_UNAUTHORIZED` | Usuario con rol distinto a TD intenta aprobar/rechazar | HTTP 403; operación rechazada |
| `AUDIT_INVALID_STATE` | Indicador no está en estado EN_REVISION | HTTP 422; mensaje indicando estado actual |
| `AUDIT_MISSING_JUSTIFICATION` | Rechazo sin campo de justificación completado | Botón deshabilitado; mensaje "La justificación es obligatoria" |
| `AUDIT_SUBFASE_INCOMPLETE` | Intento de cerrar subfase con indicadores pendientes | HTTP 422; lista de indicadores incompletos |

**Criterios de aceptación:**

```gherkin
Dado un [TD] revisando un indicador en estado "En revisión"
Cuando selecciona "Rechazar" y deja el campo de justificación vacío
Entonces el sistema deshabilita el botón "Confirmar rechazo"
  Y muestra el mensaje "La justificación es obligatoria"
```

```gherkin
Dado un [TD] que ingresó justificación de al menos 20 caracteres
Cuando confirma el rechazo
Entonces el indicador cambia a estado "Rechazado"
  Y el [CC] recibe notificación con la observación en ≤ 15 minutos
  Y el log de auditoría registra la acción con usuario, fecha y justificación
```

---

### UC-A04 — Dashboard gerencial con semáforos en tiempo real
**Trazabilidad:** `PRD-REQ-006` | **BRs:** BR-003, RB-09

**Precondiciones:**
1. [JD] está autenticada con rol Jefatura DUEA.
2. Existen carreras y procesos de acreditación configurados y activos en el sistema.

**Flujo principal:**
1. [JD] accede al dashboard principal tras autenticación.
2. El sistema calcula el porcentaje de avance por carrera según criterios configurados.
3. El sistema asigna semáforo: Verde (≥ 80 %), Amarillo (50–79 %), Rojo (< 50 % o indicadores vencidos).
4. [JD] filtra por facultad, tipo de acreditación (CEUB/ARCU-SUR) o gestión (año).
5. [JD] selecciona una carrera para ver detalle: fases, % avance, alertas activas, indicadores pendientes.

**Invariantes:**
- Los semáforos se actualizan en tiempo real sin recargar la página.
- El avance porcentual se calcula en función del cumplimiento de criterios configurados (RB-09).
- La información es accesible en ≤ 2 minutos sin intervención técnica.
- El acceso al dashboard queda registrado en LOG_AUDITORIA.

**Failure modes:**

| Código | Trigger | Respuesta del sistema |
|--------|---------|----------------------|
| `DASH_NO_DATA` | No existen procesos activos configurados | Dashboard vacío con mensaje instructivo para configurar carreras |
| `DASH_UNAUTHORIZED` | Usuario sin rol JD intenta acceder al dashboard gerencial | HTTP 403; redirección al dashboard de su rol |
| `DASH_TIMEOUT` | Carga de datos supera 3 segundos (p95) | Indicador de carga visible; alerta al administrador si persiste |
| `DASH_FILTER_EMPTY` | Filtro aplicado no retorna resultados | Mensaje informativo "Sin carreras para los filtros seleccionados" |

**Criterios de aceptación:**

```gherkin
Dado la [JD] autenticada con procesos activos en el sistema
Cuando accede al dashboard principal
Entonces ve todas las carreras con semáforo Verde/Amarillo/Rojo según su avance
  Y los semáforos se actualizan en tiempo real sin recargar la página
  Y la información es obtenible en ≤ 2 minutos sin asistencia técnica
```

```gherkin
Dado la [JD] en el dashboard con múltiples carreras activas
Cuando aplica filtro por facultad "Ciencias y Tecnología"
Entonces el sistema muestra solo las carreras de esa facultad con sus semáforos actualizados
  Y las carreras de otras facultades dejan de mostrarse
```

---

## 4. Reglas de negocio

| ID | Regla | UC afectados |
|----|-------|-------------|
| RB-01 | Carrera solo puede iniciar proceso ARCU-SUR con resolución CEUB vigente | UC-A03, UC-A04 |
| RB-02 | Solo [CC] carga documentos; [TD] valida pero no carga en nombre del coordinador | UC-A02 |
| RB-03 | Subfase solo puede marcarse "Aprobada" si todos sus indicadores fueron aprobados por [TD] | UC-A03 |
| RB-04 | Documentos aprobados no pueden eliminarse; solo se versionan | UC-A02 |
| RB-05 | Fechas límite de convocatorias CEUB/ARCU-SUR no son modificables por usuarios | UC-A03, UC-A04 |
| RB-06 | Acceso requiere autenticación con correo @umss.edu.bo activo | UC-A01 |
| RB-07 | Reportes ejecutivos son de uso interno; distribución externa requiere autorización de Jefa DUEA | UC-A04 |
| RB-08 | Todo proceso registra: tipo de acreditación, organismo, gestión (año), fecha inicio y fin | UC-A03, UC-A04 |
| RB-09 | Avance porcentual calculado en función del cumplimiento de criterios configurados | UC-A04 |
| RB-10 | Mensajes de error deben ser claros, accionables y con redacción empática | Todos |
| BR-001 | Sistema debe permitir carga de documentos directamente en la plataforma (sin correo ni WhatsApp) | UC-A02 |
| BR-002 | Sistema mantiene historial de versiones por documento con autor, fecha y descripción | UC-A02 |
| BR-003 | Dashboard gerencial con semáforos accesible en ≤ 2 minutos sin asistencia técnica | UC-A04 |
| BR-014 | Proceso con tareas pendientes no puede cerrarse | UC-A03 |
| BR-015 | Toda evidencia debe asociarse a criterio de evaluación; no se admite carga sin clasificación | UC-A02 |

---

## 5. Modelo de datos core

| Entidad | Atributo clave | Tipo | Restricción |
|---------|---------------|------|-------------|
| USUARIO | `id` | UUID | UUIDv4, PK autogenerado |
| USUARIO | `email` | string(120) | Dominio @umss.edu.bo; regex RFC 5322; único |
| USUARIO | `rol` | enum | CC / TD / JD / P / JC / EE; obligatorio |
| USUARIO | `activo` | boolean | Default: true; solo [JD] puede desactivar |
| CARRERA | `id` | UUID | UUIDv4, PK |
| CARRERA | `facultadId` | UUID | FK a FACULTAD; obligatorio |
| PROCESO | `tipo_acreditacion` | enum | CEUB / ARCU-SUR; obligatorio |
| PROCESO | `estado` | enum | EN_PROCESO / ACREDITADO / VENCIDO |
| PROCESO | `gestion` | int | Año YYYY; no duplicar mismo tipo/carrera/periodo |
| SUBFASE | `fecha_limite` | date | Obligatoria; no modificable si viene de convocatoria oficial |
| SUBFASE | `estado` | enum | PENDIENTE / EN_REVISION / APROBADA / RECHAZADA |
| INDICADOR | `estado` | enum | PENDIENTE / EN_REVISION / APROBADO / RECHAZADO |
| INDICADOR | `justificacion_rechazo` | string(500) | Obligatoria cuando estado = RECHAZADO; mínimo 20 chars |
| DOCUMENTO | `version` | int | Autoincremental por indicadorId; nunca decrece |
| DOCUMENTO | `hash` | string(64) | SHA-256 del archivo; previene duplicados exactos |
| DOCUMENTO | `descripcion_cambio` | string(300) | Obligatoria en toda carga; no puede ser vacía |
| LOG_AUDITORIA | `accion` | enum | LOGIN / CARGA / APROBACION / RECHAZO / AVANCE_FASE / REPORTE / LOGOUT |
| LOG_AUDITORIA | `actor_user_id` | UUID | FK a USUARIO; obligatorio en todo evento |

---

## 6. Prompt-contratos

### PC-A01 — UC-A01: Autenticación y gestión de acceso por rol

```markdown
# Role
Eres el módulo de autenticación de AcredIA/SIGESA, sistema web institucional de gestión
de acreditaciones universitarias de la UMSS (Bolivia).

# Task
Validar las credenciales de un usuario y emitir un token JWT con su rol y permisos,
o retornar un error descriptivo según el tipo de falla, sin revelar si el error es
de email o de contraseña.

# Context
- Entrada: { email: string, password: string }
- El email debe pertenecer exclusivamente al dominio @umss.edu.bo.
- Roles válidos: CC (Coordinador de Carrera), TD (Técnico DUEA), JD (Jefatura DUEA).
- BRs de referencia: RB-06 (solo correo institucional), BR-006 (roles diferenciados).
- Restricciones: mensaje genérico en credenciales incorrectas; bloqueo tras 5 intentos;
  registrar todo intento en LOG_AUDITORIA.

# Reasoning
1. Validar formato y dominio del email (@umss.edu.bo).
2. Buscar usuario en base de datos por email.
3. Verificar contraseña con hash bcrypt.
4. Verificar que el usuario esté activo (activo = true).
5. Generar JWT con payload: { userId, email, rol, carreraId? }.
6. Registrar evento LOGIN en LOG_AUDITORIA con usuario, fecha y hora.

# Stop condition
Retornar error inmediato si: dominio inválido / credenciales incorrectas /
usuario inactivo / 5+ intentos fallidos.

# Output
{
  "status": "ok | error",
  "data": {
    "token": "string (JWT)",
    "usuario": {
      "id": "uuid",
      "email": "string",
      "rol": "CC | TD | JD",
      "carreraId": "uuid | null"
    }
  },
  "error": {
    "code": "AUTH_INVALID_DOMAIN | AUTH_INVALID_CREDENTIALS | AUTH_USER_INACTIVE | AUTH_TOO_MANY_ATTEMPTS",
    "message": "string descriptivo y accionable"
  },
  "invariants": [
    "Token JWT nunca expone contraseña",
    "Dominio siempre validado como @umss.edu.bo",
    "Todo intento de login registrado en LOG_AUDITORIA"
  ],
  "failure_modes": [
    {"code": "AUTH_INVALID_DOMAIN", "trigger": "dominio != @umss.edu.bo", "http": 401},
    {"code": "AUTH_INVALID_CREDENTIALS", "trigger": "usuario/contraseña incorrectos", "http": 401},
    {"code": "AUTH_USER_INACTIVE", "trigger": "activo = false", "http": 403},
    {"code": "AUTH_TOO_MANY_ATTEMPTS", "trigger": "5+ intentos fallidos", "http": 429}
  ],
  "acceptance_criteria_gherkin": "Dado/Cuando/Entonces para login exitoso y dominio inválido"
}
```

---

### PC-A02 — UC-A02: Carga y versionado de evidencias

```markdown
# Role
Eres el módulo de gestión documental de AcredIA/SIGESA, responsable de registrar
evidencias con trazabilidad completa, versionado automático e inmutabilidad.

# Task
Registrar un documento de evidencia cargado por [CC], asignarlo al indicador
correspondiente, versionar automáticamente y notificar al [TD] asignado.

# Context
- Entrada: { archivo: File (PDF/DOCX/XLSX, ≤ 50 MB), descripcion_cambio: string,
  indicadorId: UUID, subfaseId: UUID, usuarioId: UUID }
- Actor: usuario con rol CC y visibilidad sobre la carrera del indicador.
- BRs: RB-02 (solo CC carga), RB-04 (no eliminar versiones), BR-001, BR-015.
- Restricciones: formato PDF/DOCX/XLSX; tamaño ≤ 50 MB; descripcion_cambio obligatoria.

# Reasoning
1. Validar rol del usuario (CC con acceso a la carrera del indicador).
2. Validar formato y tamaño del archivo.
3. Calcular SHA-256 del archivo.
4. Determinar número de versión: max(version) del indicadorId + 1.
5. Subir archivo al almacenamiento S3-compatible.
6. Crear registro DOCUMENTO con todos los metadatos.
7. Actualizar estado del INDICADOR a EN_REVISION.
8. Registrar en LOG_AUDITORIA con acción CARGA.
9. Disparar notificación al [TD] asignado (async, ≤ 15 min).

# Stop condition
Retornar error si: usuario sin permisos / formato inválido / archivo > 50 MB /
descripcion_cambio vacía / falla en almacenamiento S3.

# Output
{
  "status": "ok | error",
  "data": {
    "documento": {
      "id": "uuid",
      "version": "int",
      "nombreArchivo": "string",
      "fechaCarga": "ISO8601",
      "hash": "sha256",
      "indicadorEstado": "EN_REVISION"
    }
  },
  "invariants": [
    "Version siempre mayor a la anterior",
    "Hash único por archivo por indicador",
    "Ninguna versión previa eliminada",
    "Estado del indicador siempre actualizado tras carga exitosa"
  ],
  "failure_modes": [
    {"code": "DOC_INVALID_FORMAT", "trigger": "formato no permitido", "http": 422},
    {"code": "DOC_FILE_TOO_LARGE", "trigger": "archivo > 50 MB", "http": 422},
    {"code": "DOC_UNAUTHORIZED", "trigger": "usuario sin permisos sobre carrera", "http": 403},
    {"code": "DOC_STORAGE_ERROR", "trigger": "falla S3", "http": 503}
  ],
  "acceptance_criteria_gherkin": "Dado/Cuando/Entonces para carga exitosa y rechazo por tamaño"
}
```

---

### PC-A03 — UC-A03: Aprobación y rechazo de indicadores

```markdown
# Role
Eres el módulo de auditoría y validación de AcredIA/SIGESA, que orquesta el flujo
de aprobación entre [TD] (Técnico DUEA) y [CC] (Coordinador de Carrera).

# Task
Registrar la decisión de aprobación o rechazo de un indicador por parte del [TD],
con justificación obligatoria en rechazos, y notificar automáticamente al [CC].

# Context
- Entrada: { indicadorId: UUID, accion: APROBAR | RECHAZAR,
  justificacion?: string, tecnicoId: UUID }
- Actor: usuario con rol TD.
- BRs: RB-03 (subfase solo aprobada si todos indicadores lo están), BR-014 (no cerrar con pendientes).
- Restricciones: justificación mínimo 20 caracteres en rechazo; no cerrar subfase con pendientes.

# Reasoning
1. Validar rol del usuario (TD).
2. Validar que el indicador esté en estado EN_REVISION.
3. Si RECHAZAR: validar que justificacion tenga ≥ 20 caracteres.
4. Actualizar estado del INDICADOR con tecnicoId y justificacion.
5. Registrar en LOG_AUDITORIA con acción APROBACION o RECHAZO.
6. Notificar al [CC] responsable (async, ≤ 15 min).
7. Si APROBAR: verificar si todos los indicadores de la subfase están APROBADOS
   → habilitar opción de avance de fase para [TD].

# Stop condition
Retornar error si: usuario sin rol TD / indicador no en EN_REVISION /
justificacion ausente en RECHAZAR / justificacion < 20 chars.

# Output
{
  "status": "ok | error",
  "data": {
    "indicador": {
      "id": "uuid",
      "estado": "APROBADO | RECHAZADO",
      "fechaHora": "ISO8601",
      "tecnicoId": "uuid",
      "justificacion": "string | null"
    },
    "subfaseCompleta": "boolean",
    "notificacionEnviada": "boolean"
  },
  "invariants": [
    "Toda aprobación o rechazo registrado en LOG_AUDITORIA",
    "[CC] siempre notificado tras decisión",
    "Justificación nunca vacía en rechazo"
  ],
  "failure_modes": [
    {"code": "AUDIT_UNAUTHORIZED", "trigger": "usuario sin rol TD", "http": 403},
    {"code": "AUDIT_INVALID_STATE", "trigger": "indicador no en EN_REVISION", "http": 422},
    {"code": "AUDIT_MISSING_JUSTIFICATION", "trigger": "rechazo sin justificación", "http": 422},
    {"code": "AUDIT_SUBFASE_INCOMPLETE", "trigger": "cierre con indicadores pendientes", "http": 422}
  ],
  "acceptance_criteria_gherkin": "Dado/Cuando/Entonces para rechazo sin justificación y rechazo válido"
}
```

---

### PC-A04 — UC-A04: Dashboard gerencial con semáforos

```markdown
# Role
Eres el módulo de visibilidad gerencial de AcredIA/SIGESA, que calcula y expone
el estado consolidado de todos los procesos de acreditación activos.

# Task
Calcular el porcentaje de avance por carrera, asignar semáforo y exponer el estado
en tiempo real para la [JD] con filtros por facultad, tipo y gestión.

# Context
- Actor: usuario con rol JD.
- Lógica de semáforos: Verde ≥ 80%, Amarillo 50–79%, Rojo < 50% o indicadores vencidos.
- BRs: BR-003 (dashboard en ≤ 2 min), RB-09 (avance por criterios configurados).
- Restricciones: actualización en tiempo real sin recarga; tiempo de respuesta p95 ≤ 3 s.

# Reasoning
1. Validar rol del usuario (JD).
2. Obtener carreras activas con sus procesos, fases e indicadores.
3. Calcular porcentaje de avance por carrera según criterios configurados.
4. Asignar semáforo según umbrales definidos.
5. Aplicar filtros solicitados (facultad, tipo, gestión).
6. Registrar acceso en LOG_AUDITORIA.

# Stop condition
Retornar error si: usuario sin rol JD / tiempo de respuesta > 3 s sin datos parciales.

# Output
{
  "status": "ok | error",
  "data": {
    "carreras": [
      {
        "carreraId": "uuid",
        "nombre": "string",
        "facultad": "string",
        "semaforo": "VERDE | AMARILLO | ROJO",
        "porcentajeAvance": "int (0-100)",
        "alertasActivas": "int",
        "ultimaActualizacion": "ISO8601"
      }
    ]
  },
  "invariants": [
    "Semáforo siempre calculado con criterios configurados (RB-09)",
    "Datos actualizados en tiempo real sin recarga de página",
    "Acceso registrado en LOG_AUDITORIA"
  ],
  "failure_modes": [
    {"code": "DASH_UNAUTHORIZED", "trigger": "usuario sin rol JD", "http": 403},
    {"code": "DASH_NO_DATA", "trigger": "sin procesos activos", "mensaje": "instructivo de configuración"},
    {"code": "DASH_TIMEOUT", "trigger": "carga > 3 s p95", "http": 503},
    {"code": "DASH_FILTER_EMPTY", "trigger": "filtro sin resultados", "mensaje": "informativo"}
  ],
  "acceptance_criteria_gherkin": "Dado/Cuando/Entonces para semáforos en tiempo real y filtro por facultad"
}
```

---

## 7. NFRs críticos

| ID | Categoría | Umbral | Cómo se verifica |
|----|-----------|--------|------------------|
| NFR-001 | Rendimiento | Tiempo de respuesta del buscador p95 ≤ 3 s | Prueba de carga con k6 |
| NFR-002 | Rendimiento | Generación de reporte ejecutivo PDF ≤ 5 min | Prueba funcional E2E con Playwright |
| NFR-003 | Rendimiento | Notificación de eventos críticos por correo ≤ 15 min del evento | Monitoreo de logs de envío SMTP |
| NFR-004 | Disponibilidad | Uptime del sistema en horario hábil UMSS ≥ 99 % mensual | Monitoreo continuo (UptimeRobot o similar) |
| NFR-005 | Seguridad | Cifrado en tránsito TLS 1.3 y en reposo AES-256 | Auditoría de configuración cloud |
| NFR-006 | Seguridad | 0 incidentes de acceso no autorizado por gestión | Revisión mensual del log de auditoría |
| NFR-007 | Auditoría | 100 % de acciones registradas en log con usuario, fecha y hora | Revisión de logs tras pruebas E2E |
| NFR-008 | Accesibilidad | WCAG 2.2 nivel AA en 100 % de componentes críticos | Axe / Lighthouse audit |
| NFR-009 | Usabilidad | Barra de progreso presente en 100 % de cargas de archivos | Revisión manual + pruebas de usabilidad |

---

## 8. Trazabilidad

| UC | BRs | NFRs | Test ID |
|----|-----|------|---------|
| UC-A01 (Autenticación) | RB-06, BR-006 | NFR-005, NFR-006, NFR-007 | TC-01: Login correo válido / TC-02: Rechazo dominio inválido |
| UC-A02 (Carga evidencias) | RB-02, RB-04, BR-001, BR-002, BR-015 | NFR-007, NFR-009 | TC-03: Carga exitosa / TC-04: Versionado automático / TC-05: Rechazo por tamaño |
| UC-A03 (Aprobación/rechazo) | RB-02, RB-03, BR-003, BR-014 | NFR-003, NFR-007 | TC-06: Aprobación / TC-07: Rechazo sin justificación / TC-08: Bloqueo subfase incompleta |
| UC-A04 (Dashboard) | BR-003, RB-09 | NFR-001, NFR-004 | TC-09: Semáforos tiempo real / TC-10: Filtro por facultad |

---

## 9. Tasks ejecutables

| Task ID | Descripción | UC | Prompt ID | Estado |
|---------|-------------|-----|-----------|--------|
| T-001 | Implementar autenticación JWT con validación dominio @umss.edu.bo | UC-A01 | PC-A01 | Pendiente |
| T-002 | Implementar CRUD de usuarios y asignación de roles [CC], [TD], [JD] | UC-A01 | PC-A01 | Pendiente |
| T-003 | Implementar endpoint POST /documentos con versionado automático | UC-A02 | PC-A02 | Pendiente |
| T-004 | Implementar flujo aprobación/rechazo de indicadores con justificación obligatoria | UC-A03 | PC-A03 | Pendiente |
| T-005 | Implementar dashboard de semáforos con estado en tiempo real por carrera | UC-A04 | PC-A04 | Pendiente |
| T-006 | Implementar generación de reporte ejecutivo PDF server-side | — | PM-008 | Pendiente |
| T-007 | Implementar notificaciones automáticas por correo SMTP (eventos críticos) | UC-A02, UC-A03 | PM-008 | Pendiente |
| T-008 | Implementar buscador de documentos con filtros múltiples | — | PM-008 | Pendiente |
| T-009 | Implementar log de auditoría inmutable (tabla append-only) | Todos | PM-008 | Pendiente |
| T-010 | Implementar portal público de consulta sin autenticación | — | PM-008 | Pendiente |
| T-011 | Implementar respaldo automático diario con confirmación al administrador | — | PM-008 | Pendiente |
| T-012 | Configurar taxonomías CEUB y ARCU-SUR (fases, subfases, indicadores) | UC-A03 | PM-008 | Pendiente |

---

## 10. Riesgos top-4

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Falla del servidor de correo UMSS interrumpe notificaciones críticas | Media | Alto | Cola de reintentos (retry 3x con backoff exponencial); alerta al administrador si falla persiste más de 30 min |
| Coordinadores no abandonan correo/WhatsApp como canal de evidencias | Alta | Alto | Resolución institucional DUEA que establezca SIGESA como único canal válido; capacitación presencial |
| Baja disponibilidad de red institucional UMSS afecta la experiencia | Media | Alto | Pruebas en condiciones de red real UMSS antes del despliegue; optimización de assets |
| Inconsistencia de nomenclatura de roles en UI genera confusión en usuarios | Media | Medio | Glosario único aprobado por DUEA antes del desarrollo de UI; pruebas de contenido con usuarios reales |

---

## 11. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 12/05/2026 | Aylen Mariangel Gonzales Alvino | LFSD v1 generado desde FSD_v1_aylen.md, PRD_v1_aylen.md y BRD_v2_aylen.md con 4 UC críticos, prompt-contratos y trazabilidad completa |