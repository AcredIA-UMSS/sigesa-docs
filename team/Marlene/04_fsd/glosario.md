# Glosario — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Producto** | SIGESA — Sistema de Evaluación y Acreditación de Carreras |
| **Institución** | UMSS · DUEA |
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Fuente canónica** | `docs/LFSD.md` §14 |
| **FSD padre** | `team/Marlene/04_fsd/FSD.md` §28 |
| **Nomenclatura UI** | `team/Marlene/rules/domain_rules.md` (DR-03 / CR-SIG-03) |

---

## 1. Propósito y uso

Este glosario es la **referencia única** de términos para documentación técnica, mensajes de UI, APIs y capacitación DUEA. Debe usarse de forma consistente en:

- Textos visibles al usuario (español institucional)
- Documentos `04_fsd/` (casos de uso, reglas, contratos)
- Mensajes de error (`RB-10`)

**Convención de roles:** en documentación y UI usar la notación entre corchetes — **[CC]**, **[TD]**, **[JD]**, **[P]** — no sinónimos en inglés (“Admin”, “Reviewer”).

**Convención de estados:** en UI (LFSD) usar *Pendiente*, *En revisión*, *Aprobado*, *Rechazado*; en API/persistencia usar `PENDIENTE`, `EN_REVISION`, `APROBADO`, `RECHAZADO` (ver §6).

---

## 2. Institucional y acreditación

| Término | Definición | Notas |
|---------|------------|-------|
| **UMSS** | Universidad Mayor de San Simón, Cochabamba, Bolivia. | |
| **DUEA** | Dirección Universitaria de Evaluación y Acreditación de la UMSS. Unidad dueña del proceso y del sistema. | No abreviar como “oficina de calidad” en documentos oficiales sin contexto. |
| **CEUB** | Comité Ejecutivo de la Universidad Boliviana; organismo de **acreditación nacional** de carreras universitarias en Bolivia. | Tipo de proceso: `CEUB`. |
| **ARCU-SUR** | Mecanismo de Acreditación de Carreras Universitarias del **MERCOSUR** (ámbito regional). | En API: `ARCU_SUR`. Requiere CEUB vigente (**RB-01**). |
| **AcredIA** | Nombre del producto / iniciativa de modernización documental y de procesos de acreditación en la UMSS. | Marca asociada a SIGESA. |
| **SIGESA** | Sistema de Evaluación y Acreditación de Carreras; sistema web operado por DUEA. | Nombre funcional del software. |
| **Autoevaluación** | Fase del proceso en que la carrera elabora y presenta evidencias según criterios normativos. | Estructurada en fases/subfases en plantilla. |
| **Convocatoria** | Periodo oficial CEUB/ARCU-SUR con plazos externos inmutables (**RB-05**). | |
| **Resolución CEUB** | Acto administrativo que acredita una carrera a nivel nacional; prerequisito para ARCU-SUR. | No inventar números de resolución en datos de prueba (CR-SIG-04). |
| **Gestión** | Año académico o ciclo de acreditación (p. ej. 2026). Campo `gestion` en `proceso`. | Entero YYYY. |

---

## 3. Actores y roles

| Código | Nombre completo | Responsabilidad en SIGESA |
|--------|-----------------|---------------------------|
| **[CC]** | Coordinador/a de carrera | Carga y versionado de evidencias; consulta observaciones; plan de mejora. |
| **[TD]** | Técnico/a DUEA | Dictamen técnico (aprobar/rechazar); avance de subfases; búsqueda global. |
| **[JD]** | Jefatura DUEA | Dashboard, reportes PDF, configuración de procesos, usuarios, publicación portal, auditoría. |
| **[P]** | Público (ciudadanía, estudiantes, egresados) | Consulta anónima de estado publicado en portal. |
| **[JC]** | Jefe/a de carrera | Rol evolutivo; supervisión institucional de evidencias (equivalente ampliado a [CC]). | v1.1+ |
| **[EE]** | Evaluador/a externo | Rol evolutivo; lectura acotada y dictámenes en evaluación externa. | v2 |
| **Sistema** | Componentes automáticos | Notificaciones, jobs de reporte, respaldos, validaciones normativas. |

**Matriz de visibilidad (resumen):**

| Recurso | CC | TD | JD | P |
|---------|----|----|----|----|
| Evidencias propia carrera | RW | R + decisión | R | — |
| Todas las carreras | — | R | R | — |
| Configuración / auditoría | — | R* | RW | — |
| Portal publicado | — | — | RW publicación | R |

\*Según política futura para [TD].

---

## 4. Dominio funcional — proceso de acreditación

| Término | Definición |
|---------|------------|
| **Facultad** | Unidad académica superior que agrupa carreras. Entidad `facultad`. |
| **Carrera** | Programa académico sujeto a acreditación. Entidad `carrera`. |
| **Plantilla normativa** | Definición versionada de fases, subfases e indicadores para CEUB o ARCU-SUR. Se clona al crear un `proceso`. |
| **Proceso de acreditación** | Instancia de un ciclo CEUB o ARCU-SUR para una carrera y gestión. Estados: `BORRADOR`, `EN_PROCESO`, `ACREDITADO`, `VENCIDO`, `CERRADO`. |
| **Fase** | Etapa mayor del proceso (p. ej. autoevaluación, visita). Contiene subfases. |
| **Subfase** | Subdivisión de una fase con indicadores y fecha límite operativa. Cierre sujeto a **RB-03**. |
| **Indicador** | Unidad mínima evaluable; requiere evidencia documental y criterio asociado (**BR-015**). |
| **Criterio de evaluación** | Descripción normativa asociada al indicador; texto en campo `criterio`. |
| **Evidencia** | Archivo documental que acredita el cumplimiento de un indicador. Implementado como `documento` versionado. |
| **Dictamen técnico** | Decisión del [TD]: aprobar o rechazar un indicador en revisión. |
| **Observación** | Justificación registrada cuando el [TD] rechaza (mínimo 20 caracteres). |
| **Plan de mejora** | Conjunto de acciones correctivas vinculadas a un indicador observado (**FSD-UC-012**). |
| **Avance de subfase** | Transición que cierra una subfase y habilita la siguiente cuando todos los indicadores obligatorios están aprobados. |

---

## 5. Gestión documental

| Término | Definición |
|---------|------------|
| **Versión (documento)** | Entero monotónico por indicador (`version` 1, 2, 3…). Nueva carga = nueva versión; anteriores conservadas (**RB-04**). |
| **Versión vigente** | Última versión del documento marcada como referencia para revisión del [TD]. |
| **Hash (SHA-256)** | Huella criptográfica del archivo para integridad y detección de duplicados. |
| **Almacenamiento objeto** | Repositorio S3-compatible; binarios fuera de la fila principal en BD (`storage_key`). |
| **SSOT** | *Single Source of Truth* — única fuente de verdad documental; principio rector de SIGESA frente a correo/WhatsApp. |
| **Metadatos de carga** | Autor, fecha/hora, descripción del cambio, MIME, tamaño, vínculo a `indicador_id`. |

**Formatos aceptados (v1):** PDF, DOCX, XLSX — máximo **50 MB** por archivo.

---

## 6. Estados — UI vs API

| Concepto | Etiqueta UI (LFSD) | Valor API / BD |
|----------|-------------------|----------------|
| Indicador sin evidencia | Pendiente | `PENDIENTE` |
| Evidencia enviada a revisión | En revisión | `EN_REVISION` |
| Validado por [TD] | Aprobado | `APROBADO` |
| Devuelto con observación | Rechazado | `RECHAZADO` |
| Proceso en curso | En proceso | `EN_PROCESO` |
| Plan de mejora inicial | Propuesto | `PROPUESTO` |
| Plan en ejecución | En ejecución | `EN_EJECUCION` |
| Plan con prueba adjunta | Evidenciado | `EVIDENCIADO` |
| Plan finalizado | Cerrado | `CERRADO` |

---

## 7. Dashboard, reportes y transparencia

| Término | Definición |
|---------|------------|
| **Semáforo** | Indicador visual agregado de avance por carrera: **Verde** (≥ 80 %), **Amarillo** (50–79 %), **Rojo** (&lt; 50 % o vencimientos). **RB-09**. |
| **Porcentaje de avance** | Métrica calculada según indicadores aprobados y pesos en `config_dashboard`. |
| **Reporte ejecutivo** | PDF consolidado de uso **interno** para autoridades UMSS (**RB-07**). |
| **USO_INTERNO** | Clasificación por defecto de reportes hasta autorización [JD] para distribución externa. |
| **Portal público** | Vista anónima del estado de acreditación publicado oficialmente (**FSD-UC-008**). |
| **Publicación** | Acción de [JD] que hace visible un registro en portal (**RB-11-PUB**). |

---

## 8. Notificaciones, auditoría y operación

| Término | Definición |
|---------|------------|
| **Notificación por evento** | Correo institucional disparado por CARGA, APROBACION, RECHAZO, etc. SLA ≤ 15 min P95. |
| **Outbox** | Tabla `notificacion_outbox` de eventos pendientes de envío fiable. |
| **Log de auditoría** | Registro **append-only** de acciones (usuario, acción, entidad, timestamp). **BR-009**. |
| **Meta-auditoría** | Registro de consultas sensibles al propio log de auditoría. |
| **Job (reporte)** | Trabajo asíncrono de generación PDF (`reporte_job`). |
| **Respaldo automático** | Copia programada de BD y objetos; visible en `/health/backups` (**UC-011**). |
| **Idempotency-Key** | Cabecera HTTP para reintentos de carga sin duplicar versión. |

---

## 9. Términos técnicos y API

| Término | Definición |
|---------|------------|
| **JWT** | *JSON Web Token* — autenticación sin estado; dominio `@umss.edu.bo` (**RB-06**). |
| **RBAC** | Control de acceso basado en roles (`CC`, `TD`, `JD`). |
| **REST / API v1** | Interfaz HTTP JSON bajo `/api/v1`. Ver `api_contracts.md`. |
| **Código de error** | Identificador estable (`SIGESA_DOC_SIZE`, `SIGESA_WF_INCOMPLETE`, …) en envelope JSON. |
| **Cursor (paginación)** | Token opaco para listas grandes (`nextCursor`). |
| **URL firmada** | Enlace temporal de descarga de evidencia; no loguear URL completa. |
| **Prompt-contrato** | Especificación formal de un UC para agentes IA (LFSD §7). |
| **OpenAPI** | Descripción machine-readable de la API (artefacto futuro `openapi/sigesa-v1.yaml`). |

---

## 10. Trazabilidad documental (IDs)

| ID | Significado |
|----|-------------|
| **PRD-REQ-NNN** | Requerimiento de producto |
| **PRD-US-NNN** | User story |
| **FSD-UC-NNN** | Caso de uso funcional |
| **RB-NN** | Regla de negocio / política |
| **BR-NNN** | Requerimiento de negocio (BRD) |
| **BR-013–015** | Reglas estructurales Must |
| **FR-NNN** | Requerimiento funcional detallado (FSD) |
| **NFR-NNN** | Requerimiento no funcional |
| **TC-NN** | Caso de prueba |
| **TR-NN** | Fila de matriz de trazabilidad |

---

## 11. Inteligencia artificial (v2.0)

| Término | Definición |
|---------|------------|
| **RB-11 (IA)** | Recomendaciones IA explicables; supervisión humana obligatoria; sin cambio de dictamen automático. |
| **Rationale** | Texto breve que explica una sugerencia IA (**M-AI-013**). |
| **HER** | *Human Edit Rate* — tasa de edición humana sobre sugerencias IA. |
| **Feature flag** | Interruptor de despliegue para funciones IA o portal sin redeploy completo. |

---

## 12. Términos que no deben usarse en UI

| Evitar | Usar en su lugar |
|--------|------------------|
| Admin | [JD] o Jefatura DUEA |
| Reviewer | [TD] o Técnico DUEA |
| Upload user | [CC] o Coordinador de carrera |
| Ticket / Issue | Indicador / Observación |
| File (solo) | Evidencia / Documento |
| Approved (inglés) | Aprobado |
| Dashboard admin | Dashboard de jefatura |

---

## 13. Índice alfabético rápido

| A–D | E–M | N–Z |
|-----|-----|-----|
| AcredIA | Evidencia | Outbox |
| ARCU-SUR | Fase | Plan de mejora |
| Autoevaluación | Gestión | Portal público |
| CEUB | Hash SHA-256 | Proceso |
| [CC] | Indicador | RB / BR |
| Criterio | [JD] | Semáforo |
| Dictamen | JWT | SIGESA |
| Documento | [P] | SSOT |
| DUEA | Plantilla | Subfase |
| | [TD] | UMSS |

---

## 14. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Glosario unificado LFSD §14 + FSD §28 + dominio 04_fsd |

---

*Reglas: `reglas_negocio.md`. Comportamiento: `casos_uso.md`. Datos: `modelo_datos.md`. API: `api_contracts.md`.*
