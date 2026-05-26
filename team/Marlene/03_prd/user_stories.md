# User Stories — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Producto** | SIGESA — Sistema de Evaluación y Acreditación de Carreras |
| **Institución** | Universidad Mayor de San Simón (UMSS) · DUEA |
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Documento padre** | `docs/03_prd/PRD.md` |
| **Especificación funcional** | `docs/04_fsd/FSD.md` (LFSD) |
| **Trazabilidad extendida** | `team/Marlene/09_trazabilidad/matriz_trazabilidad.md` |
| **Total historias** | 22 (`PRD-US-001` … `PRD-US-022`) |

---

## 1. Convenciones

### 1.1 Formato INVEST

Cada historia cumple el estándar **INVEST**: *Independent*, *Negotiable*, *Valuable*, *Estimable*, *Small*, *Testable*. La verificación se indica por historia en la columna **INVEST**.

### 1.2 Roles (actores)

| Código | Rol |
|--------|-----|
| **[CC]** | Coordinador/a de carrera |
| **[TD]** | Técnico/a DUEA |
| **[JD]** | Jefatura DUEA |
| **[P]** | Público (consulta sin autenticación) |
| **[DC]** | Decano/a o autoridad de facultad (solo lectura, evolutivo) |

### 1.3 Prioridad y valor

| Prioridad | Significado |
|-----------|-------------|
| **P0** | Crítico para MVP / piloto institucional |
| **P1** | Alto; siguiente oleada |
| **P2** | Medio; mejora o conveniencia |

**Valor de negocio:** escala 1–10 (10 = máximo impacto en cumplimiento CEUB/ARCU-SUR).

### 1.4 Plantilla de historia

```text
Como [rol],
quiero [capacidad],
para [beneficio institucional].
```

---

## 2. Resumen del backlog (22 historias)

| ID | Título corto | Rol | P | Valor | PRD-REQ | FSD-UC (principal) |
|----|--------------|-----|---|-------|---------|-------------------|
| PRD-US-001 | Login institucional | CC, TD, JD | P0 | 10 | REQ-001 | UC-001 |
| PRD-US-002 | Administración de usuarios | JD | P0 | 9 | REQ-002 | UC-001 |
| PRD-US-003 | Carga de evidencia | CC | P0 | 10 | REQ-003 | UC-002 |
| PRD-US-004 | Historial de versiones | TD, CC | P0 | 10 | REQ-004 | UC-002 |
| PRD-US-005 | Confirmación de carga | CC | P0 | 8 | REQ-003 | UC-002 |
| PRD-US-006 | Aprobar / rechazar indicador | TD | P0 | 10 | REQ-005 | UC-003 |
| PRD-US-007 | Avance de fase / subfase | TD | P0 | 9 | REQ-005, REQ-010 | UC-003 |
| PRD-US-008 | Ver y responder observaciones | CC | P0 | 9 | REQ-005 | UC-003 |
| PRD-US-009 | Dashboard semáforos | JD | P0 | 10 | REQ-006 | UC-004 |
| PRD-US-010 | Filtros en dashboard | JD | P1 | 7 | REQ-006 | UC-004 |
| PRD-US-011 | Reporte ejecutivo PDF | JD | P0 | 10 | REQ-007 | UC-005 |
| PRD-US-012 | Exportación Excel | JD | P2 | 6 | REQ-017 | — |
| PRD-US-013 | Alertas por eventos críticos | CC | P0 | 9 | REQ-008 | UC-002, UC-003 |
| PRD-US-014 | Notificación nueva carga | TD | P0 | 9 | REQ-008 | UC-002 |
| PRD-US-015 | Buscador global | TD | P0 | 10 | REQ-009 | T-008 |
| PRD-US-016 | Portal público estado | P | P1 | 8 | REQ-012 | Portal §2.1 |
| PRD-US-017 | Descarga certificado | P | P2 | 7 | REQ-013 | Portal §2.1 |
| PRD-US-018 | Consulta log auditoría | JD | P0 | 9 | REQ-011 | Transversal |
| PRD-US-019 | Plantillas normativas versionadas | JD | P1 | 8 | REQ-010 | UC-003 |
| PRD-US-020 | Vista lectura decano | DC | P2 | 7 | REQ-006 | UC-004 |
| PRD-US-021 | Plan de mejora | CC, TD | P1 | 8 | REQ-016 | §2.1 LFSD |
| PRD-US-022 | Estado respaldos automáticos | JD | P0 | 9 | REQ-014 | T-011 |

---

## 3. Épica E1 — Identidad y acceso (IAM)

### PRD-US-001 — Autenticación con correo institucional UMSS

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **usuario interno** ([CC], [TD], [JD]), **quiero** iniciar sesión con mi correo **@umss.edu.bo**, **para** acceder solo a las funciones autorizadas por mi rol. |
| **Prioridad** | P0 |
| **Valor** | 10 |
| **Dependencias** | Datos maestros UMSS (alta de usuario) |
| **INVEST** | I · N · V · E · S · T — todos Sí |
| **PRD-REQ** | PRD-REQ-001 |
| **FSD-UC** | FSD-UC-001 |
| **TC** | TC-01, TC-02 |

**Criterios de aceptación**

1. Credenciales válidas con dominio `@umss.edu.bo` → JWT/sesión y redirección al dashboard según rol.
2. Dominio no institucional → rechazo con mensaje explícito (sin revelar si el usuario existe).
3. Tras 5 intentos fallidos → bloqueo temporal y registro en auditoría.
4. Todo intento (éxito/fallo) queda en log de auditoría.

**Reglas:** `RB-06`.

---

### PRD-US-002 — Administración de usuarios y roles ([JD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[JD]**, **quiero** crear, editar y desactivar usuarios asignando roles **[CC]/[TD]/[JD]**, **para** gobernar el acceso sin depender del proveedor TI. |
| **Prioridad** | P0 |
| **Valor** | 9 |
| **Dependencias** | PRD-US-001 |
| **INVEST** | Todos Sí |
| **PRD-REQ** | PRD-REQ-002 |
| **FSD-UC** | FSD-UC-001 |

**Criterios de aceptación**

1. CRUD de usuarios con rol primario; desactivación impide login de inmediato.
2. [CC] asociado a una o más carreras según configuración (cardinalidad en FSD).
3. Sin auto-elevación de rol sin política institucional explícita.
4. Acciones registradas en auditoría.

**Reglas:** `RB-06`.

---

## 4. Épica E2 — Gestión documental y evidencias

### PRD-US-003 — Carga de evidencia en plataforma ([CC])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[CC]**, **quiero** cargar archivos de evidencia contra un indicador, **para** dejar de usar correo o WhatsApp como canal oficial. |
| **Prioridad** | P0 |
| **Valor** | 10 |
| **Dependencias** | PRD-US-001; taxonomía de indicadores (PRD-US-019 o carga inicial) |
| **PRD-REQ** | PRD-REQ-003 |
| **FSD-UC** | FSD-UC-002 |
| **TC** | TC-03, TC-04, TC-05 |

**Criterios de aceptación**

1. Formatos PDF, DOCX, XLSX; tamaño máximo según FSD (≤ 50 MB).
2. Tras carga exitosa → indicador **En revisión**, versión `vN` autoincremental.
3. Hash SHA-256 y almacenamiento en repositorio objeto (S3-compatible).
4. No permite envío sin `indicador_id` válido del proceso activo.

**Reglas:** `RB-02`, `BR-015`.

---

### PRD-US-004 — Historial de versiones ([TD] / [CC])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[TD]** o **[CC]**, **quiero** ver el historial de versiones con autor, fecha y descripción, **para** identificar la versión vigente ante auditoría CEUB. |
| **Prioridad** | P0 |
| **Valor** | 10 |
| **Dependencias** | PRD-US-003 |
| **PRD-REQ** | PRD-REQ-004 |
| **FSD-UC** | FSD-UC-002 |

**Criterios de aceptación**

1. Lista descendente por fecha: versión, autor, descripción, descarga según permiso.
2. Versiones aprobadas no eliminables físicamente (`RB-04`).
3. [CC] solo ve evidencias de su carrera.

**Reglas:** `RB-04`.

---

### PRD-US-005 — Confirmación de registro de carga ([CC])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[CC]**, **quiero** recibir confirmación en pantalla al completar una carga, **para** tener certeza de que la evidencia quedó registrada. |
| **Prioridad** | P0 |
| **Valor** | 8 |
| **Dependencias** | PRD-US-003 |
| **PRD-REQ** | PRD-REQ-003 |
| **FSD-UC** | FSD-UC-002 |

**Criterios de aceptación**

1. Pantalla de éxito: indicador, archivo, versión, timestamp.
2. Correo de confirmación opcional según política DUEA (≤ 15 min si aplica).
3. Reintento de red no duplica versión sin acción explícita del usuario.

---

## 5. Épica E3 — Workflow de aprobación DUEA

### PRD-US-006 — Aprobar o rechazar indicador con causa ([TD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[TD]**, **quiero** aprobar o rechazar un indicador con **justificación obligatoria** en rechazo, **para** mantener trazabilidad de dictámenes. |
| **Prioridad** | P0 |
| **Valor** | 10 |
| **Dependencias** | PRD-US-003 |
| **PRD-REQ** | PRD-REQ-005 |
| **FSD-UC** | FSD-UC-003 |
| **TC** | TC-06, TC-07 |

**Criterios de aceptación**

1. Rechazo sin texto ≥ 20 caracteres → acción bloqueada.
2. Aprobación registra usuario y timestamp en auditoría.
3. Estado **Aprobado** o **Rechazado** visible al [CC] con notificación ≤ 15 min.

**Reglas:** `RB-03` (cierre parcial en US-007).

---

### PRD-US-007 — Autorizar avance de fase ([TD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[TD]**, **quiero** autorizar el avance de subfase solo cuando todos los indicadores requeridos estén aprobados, **para** cumplir normativa de autoevaluación. |
| **Prioridad** | P0 |
| **Valor** | 9 |
| **Dependencias** | PRD-US-006 |
| **PRD-REQ** | PRD-REQ-005, PRD-REQ-010 |
| **FSD-UC** | FSD-UC-003 |
| **TC** | TC-08 |

**Criterios de aceptación**

1. Avance deshabilitado si queda indicador obligatorio no aprobado.
2. Evento de avance en auditoría; notificación al [CC].
3. Fechas límite de convocatoria no editables por usuario (`RB-05`).

**Reglas:** `RB-03`, `BR-014`, `BR-013`.

---

### PRD-US-008 — Ver y responder observaciones ([CC])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[CC]**, **quiero** ver las observaciones del [TD] vinculadas al indicador rechazado, **para** corregir y cargar nueva versión sin perder el hilo. |
| **Prioridad** | P0 |
| **Valor** | 9 |
| **Dependencias** | PRD-US-006 |
| **PRD-REQ** | PRD-REQ-005 |
| **FSD-UC** | FSD-UC-003 |

**Criterios de aceptación**

1. Panel con fecha, autor [TD], texto, enlace al indicador.
2. Estado **Rechazado** muestra CTA “Cargar nueva versión”.
3. Historial de observaciones inmutable para [CC].

**Reglas:** `RB-04` en nueva carga.

---

## 6. Épica E4 — Inteligencia gerencial y reportes

### PRD-US-009 — Dashboard con semáforos ([JD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[JD]**, **quiero** ver semáforos por carrera y facultad, **para** detectar cuellos de botella sin asistencia técnica. |
| **Prioridad** | P0 |
| **Valor** | 10 |
| **Dependencias** | PRD-US-006, PRD-US-007 |
| **PRD-REQ** | PRD-REQ-006 |
| **FSD-UC** | FSD-UC-004 |
| **TC** | TC-09 |

**Criterios de aceptación**

1. Verde (≥ 80 % avance), amarillo (50–79 %), rojo (< 50 % o vencidos) según `RB-09`.
2. Vista útil en ≤ 2 min desde login en red institucional típica.
3. Actualización en tiempo real sin recarga completa de página.

**Reglas:** `RB-09`, `RB-07` (uso interno).

---

### PRD-US-010 — Filtros avanzados en dashboard ([JD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[JD]**, **quiero** filtrar por facultad, tipo CEUB/ARCU-SUR y gestión, **para** focalizar reuniones de seguimiento. |
| **Prioridad** | P1 |
| **Valor** | 7 |
| **Dependencias** | PRD-US-009 |
| **PRD-REQ** | PRD-REQ-006 |
| **FSD-UC** | FSD-UC-004 |
| **TC** | TC-10 |

**Criterios de aceptación**

1. Filtros combinables; persistencia en sesión.
2. Contador de carreras por estado.
3. Componentes de filtro accesibles (WCAG 2.2 AA en críticos).

**Reglas:** `RB-01` en filtro ARCU-SUR.

---

### PRD-US-011 — Reporte ejecutivo PDF ([JD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[JD]**, **quiero** generar un reporte PDF del estado por carrera/facultad, **para** presentarlo en actas y consejos. |
| **Prioridad** | P0 |
| **Valor** | 10 |
| **Dependencias** | PRD-US-009 |
| **PRD-REQ** | PRD-REQ-007 |
| **FSD-UC** | FSD-UC-005 |
| **TC** | TC-11, TC-12 |

**Criterios de aceptación**

1. Generación ≤ 5 min (NFR-002); notificación async si excede.
2. PDF incluye timestamp, usuario generador, alcance de filtros.
3. Marca **uso interno**; distribución externa solo con autorización [JD] (`RB-07`).

**Reglas:** `RB-07`.

---

### PRD-US-012 — Exportación Excel de avance ([JD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[JD]**, **quiero** exportar Excel con detalle por indicador/carrera, **para** análisis offline en decanatos. |
| **Prioridad** | P2 |
| **Valor** | 6 |
| **Dependencias** | PRD-US-009 |
| **PRD-REQ** | PRD-REQ-017 |

**Criterios de aceptación**

1. Columnas: facultad, carrera, proceso, fase, indicador, estado, última actualización.
2. Descarga asíncrona si volumen supera umbral definido en FSD.

**Reglas:** `RB-07`.

---

## 7. Épica E5 — Notificaciones y búsqueda

### PRD-US-013 — Alertas a [CC] por eventos críticos

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[CC]**, **quiero** recibir alertas por correo ante rechazos y proximidad de vencimiento, **para** actuar antes de perder plazos CEUB/ARCU-SUR. |
| **Prioridad** | P0 |
| **Valor** | 9 |
| **Dependencias** | SMTP UMSS; PRD-US-006 |
| **PRD-REQ** | PRD-REQ-008 |
| **FSD-UC** | FSD-UC-002, FSD-UC-003 |
| **TC** | TC-13 |

**Criterios de aceptación**

1. Catálogo de eventos: rechazo, recordatorio 7/3/1 día a deadline, etc.
2. Envío ≤ 15 min del evento (NFR-003).
3. Cola con reintentos y registro en auditoría.

**Reglas:** `RB-05`.

---

### PRD-US-014 — Notificación a [TD] por nueva carga

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[TD]**, **quiero** ser notificado cuando un [CC] cargue o versione evidencia, **para** priorizar mi cola de revisión. |
| **Prioridad** | P0 |
| **Valor** | 9 |
| **Dependencias** | PRD-US-003 |
| **PRD-REQ** | PRD-REQ-008 |
| **FSD-UC** | FSD-UC-002 |

**Criterios de aceptación**

1. Enlace profundo al indicador en el correo.
2. Agrupación anti-spam si hay muchas cargas en ventana corta.

---

### PRD-US-015 — Buscador global de documentos ([TD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[TD]**, **quiero** buscar por título, carrera, facultad, modalidad y gestión, **para** localizar evidencias en segundos. |
| **Prioridad** | P0 |
| **Valor** | 10 |
| **Dependencias** | PRD-US-003 |
| **PRD-REQ** | PRD-REQ-009 |
| **FSD-UC** | Tarea T-008 |
| **TC** | TC-14 |

**Criterios de aceptación**

1. Resultados paginados con metadatos.
2. P95 consulta simple ≤ 3 s (NFR-001).
3. [TD] ve todo; [CC] solo su carrera.

---

## 8. Épica E6 — Transparencia y comunidad

### PRD-US-016 — Portal público: consulta de estado ([P])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[P]**, **quiero** consultar el estado oficial de acreditación de una carrera sin login, **para** verificar información con respaldo UMSS. |
| **Prioridad** | P1 |
| **Valor** | 8 |
| **Dependencias** | Flujo de publicación [JD] |
| **PRD-REQ** | PRD-REQ-012 |
| **FSD-UC** | Alcance LFSD §2.1 portal |

**Criterios de aceptación**

1. No expone borradores ni observaciones internas.
2. Búsqueda por carrera/facultad con resultados claros.
3. Leyenda de estados en lenguaje ciudadano.

**Reglas:** `RB-07`.

---

### PRD-US-017 — Descarga de certificado publicado ([P])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[P]**, **quiero** descargar certificado oficialmente publicado, **para** trámites laborales o académicos. |
| **Prioridad** | P2 |
| **Valor** | 7 |
| **Dependencias** | PRD-US-016 |
| **PRD-REQ** | PRD-REQ-013 |

**Criterios de aceptación**

1. Solo PDFs marcados “público” por [JD].
2. Código o marca verificable (fase 2 opcional).

---

## 9. Épica E7 — Gobernanza, plantillas y operación

### PRD-US-018 — Consulta de log de auditoría ([JD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[JD]**, **quiero** consultar y exportar el log de auditoría, **para** responder auditorías externas y transparencia. |
| **Prioridad** | P0 |
| **Valor** | 9 |
| **Dependencias** | PRD-US-001; almacenamiento append-only |
| **PRD-REQ** | PRD-REQ-011 |
| **NFR** | NFR-013 |

**Criterios de aceptación**

1. Log append-only sin borrado desde UI estándar.
2. Filtros: fecha, usuario, acción, entidad.
3. Export CSV/PDF.

**Reglas:** `RB-04`, `NFR-013`.

---

### PRD-US-019 — Versionado de plantillas CEUB/ARCU-SUR ([JD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[JD]**, **quiero** crear nueva versión de plantilla sin borrar la anterior, **para** trazabilidad cuando cambie la normativa. |
| **Prioridad** | P1 |
| **Valor** | 8 |
| **Dependencias** | PRD-US-002 |
| **PRD-REQ** | PRD-REQ-010 |
| **FSD-UC** | FSD-UC-003 (config.) |

**Criterios de aceptación**

1. Proceso activo anclado a versión de plantilla de inicio.
2. Nueva convocatoria puede usar plantilla nueva.
3. Publicación de plantilla en auditoría.

**Reglas:** `RB-05`, `RB-08`.

---

### PRD-US-020 — Vista de lectura para decano ([DC])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[DC]**, **quiero** ver en solo lectura el avance de carreras de mi facultad, **para** priorizar apoyos sin validar evidencias. |
| **Prioridad** | P2 |
| **Valor** | 7 |
| **Dependencias** | PRD-US-009 |
| **PRD-REQ** | PRD-REQ-006 |

**Criterios de aceptación**

1. Solo metadatos agregados, no contenido de archivos.
2. Sin aprobar/rechazar.
3. Alcance estricto a facultad asignada.

**Reglas:** `RB-07`.

---

### PRD-US-021 — Plan de mejora vinculado al proceso ([CC] / [TD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[CC]**, **quiero** registrar acciones de mejora tras observaciones; como **[TD]**, dar seguimiento y cierre, **para** cerrar el ciclo de calidad. |
| **Prioridad** | P1 |
| **Valor** | 8 |
| **Dependencias** | PRD-US-008 |
| **PRD-REQ** | PRD-REQ-016 |
| **FSD-UC** | Gestión planes LFSD §2.1 |

**Criterios de aceptación**

1. Plan vinculado a carrera, proceso e indicador origen.
2. Estados: propuesto → en ejecución → evidenciado → cerrado por [TD].
3. Trazabilidad en auditoría.

---

### PRD-US-022 — Verificación de respaldo automático ([JD])

| Campo | Contenido |
|-------|-----------|
| **Historia** | Como **[JD]**, **quiero** ver el estado del último respaldo de BD y documentos, **para** certificar continuidad ante auditorías TI. |
| **Prioridad** | P0 |
| **Valor** | 9 |
| **Dependencias** | Infra jobs; PRD-US-002 |
| **PRD-REQ** | PRD-REQ-014 |
| **FSD-UC** | Tarea T-011 |

**Criterios de aceptación**

1. Panel: última ejecución, éxito/fallo, duración.
2. Alerta a [JD]/TI si falla el job.
3. Sin exponer credenciales de infraestructura.

---

## 10. Trazabilidad historias → requerimientos → casos de uso

| PRD-US | PRD-REQ | FSD-UC / Task | Escenarios Gherkin (ref.) |
|--------|---------|---------------|---------------------------|
| 001, 002 | REQ-001, 002 | UC-001 | GH-UC001-S01, S02 |
| 003, 004, 005 | REQ-003, 004 | UC-002 | GH-UC002-S01, S02 |
| 006, 007, 008 | REQ-005 | UC-003 | GH-UC003-S01–S03 |
| 009, 010 | REQ-006 | UC-004 | GH-UC004-S01 |
| 011 | REQ-007 | UC-005 | GH-UC005-S01 |
| 013, 014 | REQ-008 | UC-002, 003 | Implícitos en LFSD §4 |
| 015 | REQ-009 | T-008 | TC-14 |
| 016, 017 | REQ-012, 013 | Portal | — |
| 018 | REQ-011 | T-009 | TC-AUD-01 |
| 019 | REQ-010 | T-012 | — |
| 021 | REQ-016 | §2.1 | — |
| 022 | REQ-014 | T-011 | — |

---

## 11. Definition of Done (DoD) por historia

Una historia se considera **Done** cuando:

1. Criterios de aceptación verificados (manual o automatizado).
2. Casos de prueba `TC-xx` asociados en verde o documentados como N/A con ADR.
3. Reglas de negocio citadas implementadas o excepción aprobada por [TD]/[JD].
4. Textos de UI alineados a glosario UMSS (`docs/04_fsd/glosario.md`).
5. Eventos registrados en auditoría cuando aplique (`NFR-013`).
6. Trazabilidad actualizada en `docs/09_trazabilidad/matriz_trazabilidad.md`.

---

## 12. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Catálogo inicial 22 historias INVEST — UMSS SIGESA |

---

*Documento canónico de backlog de producto. Sincronizar con `docs/03_prd/PRD.md` ante cambios de alcance.*
