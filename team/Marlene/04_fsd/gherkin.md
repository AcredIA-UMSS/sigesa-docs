# Escenarios BDD (Gherkin) — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Producto** | SIGESA — Sistema de Evaluación y Acreditación de Carreras |
| **Institución** | UMSS · DUEA |
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Casos de uso** | `team/Marlene/04_fsd/casos_uso.md` |
| **FSD padre** | `team/Marlene/04_fsd/FSD.md` |
| **Fuente LFSD** | `docs/LFSD.md` §4 (criterios de aceptación) |
| **Fuente ampliada** | `team/Marlene/05_nfr/CU_BDD.md` (UC-SIG-01 … UC-SIG-10) |
| **Idioma** | Español (`# language: es`) — compatible Cucumber i18n |

---

## 1. Propósito y convenciones

Este documento contiene escenarios **Gherkin verificables** para automatización (Cucumber, pytest-bdd, Playwright) y **UAT** con personal DUEA.

| Convención | Descripción |
|------------|-------------|
| **FSD-UC-NNN** | Caso de uso funcional (ver `casos_uso.md`) |
| **TC-NN** | Caso de prueba LFSD §11 |
| **Tags** | `@smoke`, `@p0`, `@normativa`, `@documento`, `@dashboard`, `@auditoria`, `@portal` |
| **Datos de prueba** | Prefijos `TEST_` y dominios `example.invalid` en fixtures (CR-SIG-04) |
| **Estados UI** | Pendiente, En revisión, Aprobado, Rechazado (LFSD) |
| **Estados API** | `PENDIENTE`, `EN_REVISION`, `APROBADO`, `RECHAZADO` (persistencia) |

### 1.1 Matriz de trazabilidad (escenario → UC → prueba)

| FSD-UC | TC | PRD-US | Tags sugeridos |
|--------|-----|--------|----------------|
| UC-001 | TC-01, TC-02 | 001, 002 | `@smoke` `@auth` |
| UC-002 | TC-03, TC-04, TC-05, TC-13 | 003–005, 014 | `@smoke` `@documento` |
| UC-003 | TC-06, TC-07, TC-08 | 006–008 | `@smoke` `@workflow` |
| UC-004 | TC-09, TC-10 | 009, 010 | `@dashboard` |
| UC-005 | TC-11, TC-12 | 011 | `@reporte` |
| UC-006 | TC-13 | 013, 014 | `@notificacion` |
| UC-007 | TC-14 | 015 | `@busqueda` |
| UC-008 | — | 016, 017 | `@portal` |
| UC-009 | — | 018 | `@auditoria` |
| UC-010 | — | 019 | `@normativa` |
| UC-011 | — | 022 | `@ops` |
| UC-012 | — | 021 | `@mejora` |

### 1.2 Mapeo UC-SIG (CU_BDD) → FSD-UC

| UC-SIG | FSD-UC |
|--------|--------|
| UC-SIG-07 | UC-001 |
| UC-SIG-03 | UC-002 |
| UC-SIG-04, UC-SIG-04b | UC-003 |
| UC-SIG-10 | UC-004 |
| UC-SIG-05 | UC-005 |
| UC-SIG-02 | UC-010 |
| UC-SIG-06 | UC-012 |
| UC-SIG-08 | UC-009 |
| UC-SIG-09 | Transversal (UC-002, UC-003, UC-010) |

---

## 2. FSD-UC-001 — Autenticación y sesión institucional

**Trazabilidad:** `PRD-REQ-001`, `PRD-REQ-002` · `RB-06`

```gherkin
# language: es
@smoke @auth @p0
Característica: FSD-UC-001 Autenticación y sesión institucional
  Como usuario interno de la UMSS ([CC], [TD] o [JD])
  Quiero iniciar sesión con correo @umss.edu.bo
  Para acceder al dashboard según mi rol con trazabilidad en auditoría

  @TC-01
  Escenario: Login exitoso con correo institucional
    Dado un usuario registrado con correo "coord.test@umss.edu.bo" rol "CC" y contraseña válida
    Cuando ingresa sus credenciales y pulsa "Iniciar sesión"
    Entonces el sistema genera un token JWT con el rol del usuario
    Y redirige al dashboard del coordinador
    Y el log de auditoría registra el evento "LOGIN"

  @TC-02
  Escenario: Intento con correo no institucional
    Dado un usuario con correo "usuario@gmail.com"
    Cuando intenta autenticarse
    Entonces el sistema responde con error de dominio
    Y el mensaje indica que solo se admiten correos @umss.edu.bo
    Y no se emite token JWT

  Escenario: Credenciales incorrectas sin revelar el campo fallido
    Dado un usuario registrado "td.test@umss.edu.bo"
    Cuando ingresa contraseña incorrecta
    Entonces el sistema responde 401
    Y el mensaje de error es genérico
    Y no se emite token JWT

  Escenario: Usuario inactivo no puede iniciar sesión
    Dado un usuario "inactivo@umss.edu.bo" con activo false
    Cuando ingresa credenciales válidas
    Entonces el sistema responde 403
    Y el código de error es "AUTH_INACTIVE"

  Escenario: Bloqueo tras cinco intentos fallidos en ventana de quince minutos
    Dado un usuario registrado "coord.test@umss.edu.bo"
    Y ha fallado el login cinco veces en los últimos 15 minutos
    Cuando intenta autenticarse nuevamente
    Entonces el sistema responde 429
    Y el código de error es "AUTH_LOCKED"

  Escenario: Alta de coordinador con correo UMSS por jefatura
    Dado un usuario [JD] autenticado
    Cuando crea usuario email "nuevo.coord@umss.edu.bo" rol "CC" activo true
    Entonces la respuesta es 201
    Y el usuario puede autenticarse tras el flujo de contraseña inicial definido
```

---

## 3. FSD-UC-002 — Carga y versionado de evidencia

**Trazabilidad:** `PRD-REQ-003`, `PRD-REQ-004` · `RB-02`, `RB-04`, `BR-015`

```gherkin
# language: es
@smoke @documento @p0
Característica: FSD-UC-002 Carga y versionado de evidencia
  Como coordinador de carrera [CC]
  Quiero cargar y versionar evidencias por indicador
  Para cumplir plazos CEUB/ARCU-SUR con trazabilidad institucional

  @TC-03
  Escenario: Carga exitosa de evidencia PDF
    Dado un [CC] autenticado asignado a la carrera del indicador "TEST_IND-001"
    Y el indicador "TEST_IND-001" en estado "PENDIENTE"
    Cuando sube un archivo PDF de 2 MB con descripcionCambio "Versión inicial evidencia TEST"
    Entonces la respuesta es 201
    Y la versión del documento es 1
    Y el indicador pasa a estado "EN_REVISION"
    Y se encola notificación al [TD] asignado
    Y el log de auditoría registra la acción "CARGA"

  @TC-04
  Escenario: Nueva versión tras rechazo preserva historial
    Dado un documento versión 1 en estado "RECHAZADO" para "TEST_IND-002"
    Y el [CC] autenticado con acceso a la carrera
    Cuando sube un PDF válido como versión 2 con descripción de corrección
    Entonces la versión 1 permanece en el historial
    Y la versión 2 queda como vigente
    Y el indicador pasa a "EN_REVISION"

  @TC-05
  Escenario: Archivo demasiado grande
    Dado un [CC] autenticado con acceso al indicador "TEST_IND-003"
    Cuando intenta cargar un PDF de 80 MB
    Entonces la respuesta es 413
    Y el código de error es "DOC_SIZE"
    Y no se registra ninguna entrada en el historial de versiones

  Escenario: Archivo no permitido por MIME
    Dado el [CC] autenticado con acceso al indicador "TEST_IND-004"
    Cuando intenta cargar un archivo "evidencia.exe"
    Entonces la respuesta es 415
    Y el código de error es "DOC_MIME"

  Escenario: Coordinador sin asignación a la carrera no puede cargar
    Dado el [CC] "coord.otra@umss.edu.bo" sin asignación a la carrera del indicador "TEST_IND-005"
    Cuando intenta cargar un PDF válido en "TEST_IND-005"
    Entonces la respuesta es 403
    Y el código de error es "DOC_UNAUTHORIZED"

  Escenario: Carga sin indicador asociado es rechazada
    Dado el [CC] autenticado
    Cuando intenta cargar un PDF sin indicadorId
    Entonces la respuesta es 400
    Y el mensaje referencia el criterio BR-015
```

---

## 4. FSD-UC-003 — Aprobación, rechazo y avance de subfase

**Trazabilidad:** `PRD-REQ-005` · `RB-02`, `RB-03`, `BR-014`

```gherkin
# language: es
@smoke @workflow @p0
Característica: FSD-UC-003 Aprobación, rechazo y avance de subfase
  Como técnico DUEA [TD]
  Quiero aprobar o rechazar indicadores y cerrar subfases
  Para asegurar calidad documental antes del avance normativo

  @TC-06
  Escenario: Aprobación exitosa de indicador
    Dado el [TD] "td.test@umss.edu.bo" autenticado
    Y el indicador "TEST_IND-010" en estado "EN_REVISION" con documento vigente
    Cuando envía decisión APROBAR sin justificación
    Entonces la respuesta es 200
    Y el indicador pasa a "APROBADO"
    Y el [CC] de la carrera recibe notificación de aprobación

  @TC-07
  Escenario: Rechazo bloqueado sin justificación suficiente
    Dado el indicador "TEST_IND-011" en estado "EN_REVISION"
    Cuando el [TD] selecciona "Rechazar" y deja la justificación vacía
    Entonces el botón "Confirmar" permanece deshabilitado
    Y el sistema muestra que la justificación es obligatoria

  Escenario: Rechazo con justificación válida
    Dado el indicador "TEST_IND-012" en estado "EN_REVISION"
    Cuando el [TD] envía decisión RECHAZAR con justificación de al menos 20 caracteres
    Entonces la respuesta es 200
    Y el indicador pasa a "RECHAZADO"
    Y el [CC] recibe notificación con la observación en un plazo máximo de 15 minutos
    Y el log de auditoría registra la acción con justificación

  Escenario: Rechazo rechazado por justificación corta vía API
    Dado el indicador "TEST_IND-013" en estado "EN_REVISION"
    Cuando el [TD] envía decisión RECHAZAR con justificación de 10 caracteres
    Entonces la respuesta es 422
    Y el código de error es "VAL_JUSTIFICATION_SHORT"

  @TC-08
  Escenario: Cierre de subfase bloqueado por indicadores incompletos
    Dado la subfase "TEST_SUB-02" con un indicador obligatorio en "PENDIENTE"
    Cuando el [TD] intenta avanzar la subfase "TEST_SUB-02"
    Entonces la respuesta es 409
    Y el código de error es "WF_INCOMPLETE"
    Y la lista indicadoresPendientes no está vacía

  Escenario: Cierre exitoso de subfase con todos los indicadores aprobados
    Dado la subfase "TEST_SUB-01" con todos los indicadores obligatorios en "APROBADO"
    Y un [TD] autenticado
    Cuando solicita avance de subfase "TEST_SUB-01" con confirmar true
    Entonces la respuesta es 200
    Y la subfase queda "CERRADA"

  Escenario: Conflicto de concurrencia entre dos técnicos
    Dado el [TD]-A y el [TD]-B revisan el mismo indicador "TEST_IND-014"
    Cuando el [TD]-A aprueba primero
    Entonces el [TD]-B recibe 409 al confirmar
    Y el código de error es "WF_CONFLICT"
```

---

## 5. FSD-UC-004 — Dashboard gerencial y drill-down

**Trazabilidad:** `PRD-REQ-006` · `RB-09`, `RB-10`

```gherkin
# language: es
@dashboard @p0
Característica: FSD-UC-004 Dashboard gerencial y drill-down
  Como jefatura DUEA [JD]
  Quiero ver el estado de avance de las carreras en semáforos
  Para priorizar apoyos antes de vencimientos CEUB

  @TC-09
  Escenario: Jefatura consulta dashboard con semáforos
    Dado la [JD] autenticada con procesos activos para gestión 2026
    Cuando accede al dashboard principal
    Entonces ve todas las carreras con semáforo Verde, Amarillo o Rojo según avance
    Y los semáforos se actualizan sin recargar la página completa
    Y la información es obtenible en menos de 2 minutos sin asistencia técnica

  Escenario: Semáforo verde para carrera con alto avance
    Dado la carrera "TEST_CarreraA" con porcentaje de avance calculado 85 por ciento
    Cuando la [JD] solicita el dashboard resumen para gestión 2026
    Entonces "TEST_CarreraA" muestra semáforo "VERDE"

  Esquema del escenario: Semáforo según porcentaje de avance
    Dado la carrera "<carrera>" con porcentaje de avance <pct>
    Cuando la [JD] solicita el dashboard resumen
    Entonces el semáforo es "<semaforo>"

    Ejemplos:
      | carrera        | pct | semaforo  |
      | TEST_CarreraA  | 85  | VERDE     |
      | TEST_CarreraB  | 60  | AMARILLO  |
      | TEST_CarreraC  | 30  | ROJO      |

  @TC-10
  Escenario: Filtro por facultad reduce el conjunto de carreras
    Dado la [JD] autenticada
    Cuando solicita dashboard con facultadId "11111111-1111-1111-1111-111111111111"
    Entonces todos los ítems devueltos pertenecen a esa facultad
```

---

## 6. FSD-UC-005 — Generación de reporte ejecutivo PDF

**Trazabilidad:** `PRD-REQ-007` · `RB-07`

```gherkin
# language: es
@reporte @p0
Característica: FSD-UC-005 Generación de reporte ejecutivo PDF
  Como jefatura DUEA [JD]
  Quiero generar un PDF de estado de acreditaciones
  Para presentar información consolidada a autoridades académicas

  @TC-11 @TC-12
  Escenario: Jefatura genera reporte ejecutivo en PDF
    Dado la [JD] en el módulo de reportes con alcance facultad y gestión 2026
    Cuando pulsa "Generar PDF"
    Entonces el sistema genera el reporte en menos de 5 minutos
    Y el PDF incluye semáforos, porcentaje de avance por fase y alertas activas
    Y el PDF contiene leyenda de uso interno o "USO_INTERNO"
    Y el reporte es descargable desde el sistema
    Y el log de auditoría registra la generación con usuario y parámetros

  Escenario: Job asíncrono para alcance de alto volumen
    Dado la [JD] autenticada
    Cuando solicita PDF con alcance "UNIVERSIDAD" y el sistema determina volumen alto
    Entonces recibe 202 con jobId
    Y cuando el job finaliza existe notificación o enlace de descarga
```

---

## 7. FSD-UC-006 — Notificaciones por evento de dominio

**Trazabilidad:** `PRD-REQ-008` · `RB-05`

```gherkin
# language: es
@notificacion @p0
Característica: FSD-UC-006 Notificaciones por evento de dominio
  Como sistema SIGESA
  Debo notificar eventos críticos por correo institucional
  Para que [CC] y [TD] actúen dentro de los plazos CEUB

  @TC-13
  Escenario: Notificación de carga de evidencia al técnico en SLA
    Dado un [CC] que completó carga exitosa en "TEST_IND-020"
    Y el [TD] "td.test@umss.edu.bo" es referente del proceso
    Cuando el worker de notificaciones procesa el evento "CARGA"
    Entonces se envía correo SMTP al [TD]
    Y el tiempo entre carga y envío es menor o igual a 15 minutos en P95 de prueba

  Escenario: Notificación de rechazo incluye observación al coordinador
    Dado un indicador "TEST_IND-021" rechazado con justificación registrada
    Cuando el worker procesa el evento "RECHAZO"
    Entonces se envía correo al [CC] asignado
    Y el cuerpo del correo contiene la justificación del [TD]

  Escenario: Reintento ante fallo SMTP
    Dado un evento en cola con estado "REINTENTO"
    Y el servidor SMTP no está disponible
    Cuando el worker ejecuta el siguiente intento
    Entonces el estado permanece "REINTENTO" o pasa a "ENVIADO" si SMTP responde
    Y se registra el número de intento en trazabilidad operativa
```

---

## 8. FSD-UC-007 — Búsqueda global de documentos

**Trazabilidad:** `PRD-REQ-009` · NFR-001

```gherkin
# language: es
@busqueda @p0
Característica: FSD-UC-007 Búsqueda global de documentos
  Como técnico DUEA [TD]
  Quiero buscar evidencias por metadatos y filtros
  Para localizar documentos sin recorrer carrera por carrera

  @TC-14
  Escenario: Búsqueda simple por texto en metadatos
    Dado el [TD] autenticado
    Y existen documentos con descripción que contiene "malla curricular"
    Cuando busca con query "malla curricular" sin filtros adicionales
    Entonces la respuesta llega en menos de 3 segundos en entorno de referencia
    Y los resultados muestran solo metadatos sin URL firmada en el payload de lista

  Escenario: Filtros por facultad y gestión
    Dado el [TD] autenticado
    Cuando busca con facultadId "11111111-1111-1111-1111-111111111111" y gestion 2026
    Entonces todos los resultados pertenecen a esa facultad y gestión

  Escenario: Query malformada o excesivamente larga
    Dado el [TD] autenticado
    Cuando envía una query que excede el límite permitido
    Entonces la respuesta es 400
    Y el código de error es "SEARCH_BAD_QUERY"
```

---

## 9. FSD-UC-008 — Consulta pública de estado

**Trazabilidad:** `PRD-REQ-012`, `PRD-REQ-013` · `RB-07`

```gherkin
# language: es
@portal @p1
Característica: FSD-UC-008 Consulta pública de estado de acreditación
  Como ciudadano o visitante [P]
  Quiero consultar el estado oficial de acreditación de una carrera
  Para verificar información publicada por la UMSS

  Escenario: Consulta exitosa de carrera publicada
    Dado la carrera "TEST_CarreraPublica" con publicado true en vista pública
    Cuando [P] solicita GET público por slug "test-carrera-publica"
    Entonces la respuesta es 200
    Y el cuerpo contiene solo campos públicos definidos por [JD]
    Y no expone datos personales de coordinadores

  Escenario: Carrera no publicada no revela existencia interna
    Dado la carrera "TEST_CarreraInterna" con publicado false
    Cuando [P] solicita GET público por id de esa carrera
    Entonces la respuesta es 404
    Y el mensaje no confirma existencia en el sistema interno

  Escenario: Rate limiting en portal público
    Dado [P] sin autenticación
    Cuando supera el límite de solicitudes por minuto configurado
    Entonces la respuesta es 429
```

---

## 10. FSD-UC-009 — Consulta y exportación de auditoría

**Trazabilidad:** `PRD-REQ-011` · `RB-04`, `BR-009`

```gherkin
# language: es
@auditoria @p0
Característica: FSD-UC-009 Consulta y exportación de auditoría
  Como jefatura DUEA [JD]
  Quiero consultar y exportar el log de auditoría
  Para demostrar trazabilidad ante auditores CEUB

  Escenario: Filtro por acción CARGA en rango de fechas
    Dado la [JD] autenticada
    Y existen eventos CARGA en los últimos 7 días
    Cuando consulta auditoría con acción "CARGA" y rango últimos 7 días
    Entonces la respuesta contiene solo eventos CARGA
    Y cada evento incluye usuarioId, timestamp y entidadId

  Escenario: Intento de borrado de log vía API estándar
    Dado la [JD] autenticada
    Cuando intenta DELETE sobre un evento de auditoría
    Entonces la respuesta es 405 o 403

  Escenario: Exportación de rango mayor a un año es asíncrona
    Dado la [JD] autenticada
    Cuando solicita export CSV con rango mayor a 365 días
    Entonces la respuesta es 202 con jobId de exportación
```

---

## 11. FSD-UC-010 — Configuración de proceso y plantilla normativa

**Trazabilidad:** `PRD-REQ-010` · `RB-01`, `RB-08`, `BR-013`

```gherkin
# language: es
@normativa @p1
Característica: FSD-UC-010 Configuración de proceso y plantilla normativa
  Como jefatura DUEA [JD]
  Quiero registrar procesos CEUB o ARCU-SUR por carrera y gestión
  Para habilitar el ciclo documental con trazabilidad

  Escenario: Creación exitosa de proceso CEUB
    Dado la carrera "22222222-2222-2222-2222-222222222222" sin proceso CEUB activo para gestión 2026
    Y una plantilla CEUB versión 3 vigente
    Y la [JD] autenticada
    Cuando crea proceso tipo "CEUB" gestión 2026 con fechas válidas y plantillaId de la versión 3
    Entonces la respuesta es 201
    Y el proceso queda en estado "EN_PROCESO"
    Y existen fases e indicadores clonados desde la plantilla

  Escenario: ARCU-SUR rechazado sin acreditación CEUB vigente
    Dado la carrera sin proceso CEUB acreditado vigente
    Y la [JD] autenticada
    Cuando intenta crear proceso tipo "ARCU_SUR" gestión 2026
    Entonces la respuesta es 422
    Y el código de error es "NORM_ARCU_REQUIRES_CEUB"

  Escenario: Segundo proceso activo del mismo tipo y gestión es rechazado
    Dado ya existe proceso CEUB activo para la carrera y gestión 2026
    Cuando la [JD] intenta crear otro proceso CEUB para la misma carrera y gestión 2026
    Entonces la respuesta es 409
    Y el código de error es "PROC_DUPLICATE"
```

---

## 12. FSD-UC-011 — Supervisión de respaldos automáticos

**Trazabilidad:** `PRD-REQ-014` · BR-012

```gherkin
# language: es
@ops @p0
Característica: FSD-UC-011 Supervisión de respaldos automáticos
  Como jefatura DUEA [JD]
  Quiero ver el estado del último respaldo de BD y documentos
  Para verificar continuidad operativa

  Escenario: Consulta de último backup exitoso
    Dado la [JD] autenticada
    Y el último job de backup finalizó con estado "OK"
    Cuando solicita GET "/health/backups"
    Entonces la respuesta es 200
    Y el cuerpo incluye timestamp, duración y estado "OK"

  Escenario: Último backup en fallo visible para jefatura
    Dado el último job de backup finalizó con estado "FAILED"
    Cuando la [JD] solicita GET "/health/backups"
    Entonces el estado mostrado es "FAILED"
    Y se incluye mensaje de error resumido para operaciones

  Escenario: Usuario sin rol JD no accede al panel de respaldos
    Dado un [CC] autenticado
    Cuando solicita GET "/health/backups"
    Entonces la respuesta es 403
```

---

## 13. FSD-UC-012 — Plan de mejora vinculado

**Trazabilidad:** `PRD-REQ-016` · `PRD-US-021`

```gherkin
# language: es
@mejora @p1
Característica: FSD-UC-012 Plan de mejora vinculado a indicador
  Como coordinador de carrera [CC]
  Quiero registrar acciones de mejora a partir de observaciones del [TD]
  Para cerrar el ciclo de calidad de forma documentada

  Escenario: Creación de plan desde indicador observado
    Dado el indicador "TEST_IND-030" en estado "RECHAZADO" con observación visible
    Y el [CC] autenticado con acceso a la carrera
    Cuando crea plan de mejora con título "Actualizar matriz TEST" y fecha objetivo "2026-08-01"
    Entonces el plan queda en estado "PROPUESTO"
    Y está vinculado al indicador "TEST_IND-030"

  Escenario: TD cierra plan con evidencia de cumplimiento
    Dado un plan "TEST_PLAN-01" en estado "EVIDENCIADO" con adjunto de cumplimiento
    Y un [TD] autenticado
    Cuando cambia el estado a "CERRADO"
    Entonces el plan queda "CERRADO"
    Y se registra la transición en auditoría

  Escenario: Cierre de plan sin evidencia cuando la política lo exige
    Dado un plan "TEST_PLAN-02" en estado "EN_EJECUCION" sin adjunto
    Y la política exige evidencia para cierre
    Cuando el [TD] intenta cambiar el estado a "CERRADO"
    Entonces la respuesta es 422
```

---

## 14. Reglas transversales (cumplimiento normativo)

Escenarios que validan reglas en múltiples UC (`UC-SIG-09`).

```gherkin
# language: es
@normativa @p0
Característica: Validación transversal de cumplimiento normativo
  Como sistema SIGESA
  Debo aplicar reglas CEUB y ARCU-SUR en operaciones críticas
  Para reducir riesgo de incumplimiento en convocatorias

  Escenario: Fecha límite externa no editable por técnico
    Dado un proceso con fecha límite externa "2026-11-30" definida por convocatoria
    Y un [TD] autenticado
    Cuando intenta modificar la fecha límite externa a "2026-12-31"
    Entonces la operación es rechazada con 403 o 422
    Y el valor permanece "2026-11-30"

  Escenario: Bloqueo de eliminación física de documento aprobado
    Dado un documento aprobado para el indicador "TEST_IND-040"
    Cuando cualquier usuario intenta eliminar físicamente el documento
    Entonces la operación no está permitida
    Y solo es posible agregar una nueva versión según RB-04
```

---

## 15. Estrategia de automatización

| Capa | Herramienta | Alcance |
|------|-------------|---------|
| API / dominio | Cucumber + REST client | Escenarios `@smoke`, `@normativa` |
| UI crítica | Playwright | UC-001, UC-002, UC-003 |
| CI | Pipeline en `main` | Suite `@smoke` en cada push |

**Exportación a `.feature`:** cada bloque ` ```gherkin ` puede copiarse a `tests/features/uc-NNN.feature` manteniendo `# language: es`.

---

## 16. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Consolidación LFSD §4 + CU_BDD para FSD-UC-001 … UC-012 |

---

*Casos de uso narrativos: `casos_uso.md`. Reglas formales: `reglas_negocio.md`.*
