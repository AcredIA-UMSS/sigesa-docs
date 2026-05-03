# Business Requirements Document (BRD)
# AcredIA · SIGESA — Sistema Inteligente de Gestión y Seguimiento de Acreditaciones

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | AcredIA / SIGESA |
| Grupo | AcredIA |
| Versión | v0.1 |
| Fecha | 02/05/2026 |
| Sponsor de negocio | Jefa de la DUEA — Dirección Universitaria de Evaluación y Acreditación, UMSS |
| Stakeholders | Jefatura DUEA · Técnicos DUEA · Coordinadores de Carrera · Directores Académicos · Rectorado UMSS · Decanos · Estudiantes/Egresados · CEUB · ARCU-SUR |
| Autores | Marlene Velasquez Arias · Boris Anthony Angulo Urquieta · Aylen Mariangel Gonzales Alvino · Alexander James Alvarez |
| Revisores | M.Sc. Edson Terceros Torrico |
| Estado | Borrador |

---

## 1. Resumen Ejecutivo

**Problema:** La DUEA de la UMSS gestiona procesos de acreditación (CEUB/ARCU-SUR) mediante un "caos silencioso" de hojas de Excel aisladas, correos electrónicos, pendrives y WhatsApp, lo que provoca pérdidas de 20+ minutos por sesión buscando documentos, duplicidad de versiones y estrés operativo pre-auditoría con plazos inamovibles.

**Propuesta:** Construir **AcredIA / SIGESA**, un sistema web activo de gestión de acreditaciones que centraliza toda la documentación, automatiza flujos de aprobación y brinda visibilidad gerencial en tiempo real, específicamente diseñado para cumplir las normativas CEUB y ARCU-SUR desde su arquitectura base.

**Valor esperado:**
- Reducción del tiempo de localización de documentos de 20+ minutos a menos de 2 minutos.
- Eliminación de pérdidas documentales (de recurrente a 0 incidentes por gestión).
- Generación de reportes ejecutivos de horas/días a menos de 5 minutos automatizados.

**Métricas clave de éxito:**
- ≥ 80% de usuarios activos en los primeros 3 meses post-lanzamiento.
- 100% de fases de acreditación con trazabilidad documental completa.
- Tiempo promedio de generación de reporte ejecutivo ≤ 5 minutos.

**Llamada a la acción:** Se requiere de la Jefatura DUEA y la UMSS: aprobación formal del proyecto, provisión de datos actuales de carreras/facultades/fases, y designación de un referente institucional para coordinar el onboarding del sistema.

---

## 2. Contexto del Negocio

- **Organización:** Universidad Mayor de San Simón (UMSS), Cochabamba, Bolivia.
- **Unidad impactada:** Dirección Universitaria de Evaluación y Acreditación (DUEA).
- **Procesos de negocio afectados:**
  - Gestión documental de evidencias de acreditación.
  - Seguimiento de fases y subfases de autoevaluación (CEUB y ARCU-SUR).
  - Generación de reportes para autoridades (Rectorado, Vicerrectorado, Decanos).
  - Coordinación entre técnicos DUEA y coordinadores de carrera por facultad.
  - Emisión de certificados de acreditación a estudiantes/egresados.
- **Estrategia organizacional vinculada:** La UMSS tiene como objetivo estratégico institucional mantener y ampliar la acreditación de sus carreras ante organismos nacionales (CEUB) e internacionales (ARCU-SUR/MERCOSUR), lo cual es requisito para el reconocimiento de títulos y la legitimidad académica regional. El fracaso en auditorías compromete directamente el prestigio institucional y la validez de los títulos emitidos.

---

## 3. Problema y Oportunidad de Negocio

### 3.1 Problema

La DUEA de la UMSS gestiona actualmente los procesos de acreditación CEUB y ARCU-SUR de forma manual y dispersa, utilizando herramientas no integradas: documentos físicos, hojas de cálculo Excel individuales, correos electrónicos y mensajes de WhatsApp como canales de trabajo.

Esta situación genera tres capas de dolor verificadas mediante entrevistas contextuales y pruebas de usabilidad realizadas en febrero-marzo 2026:

**Operativo:** Los técnicos invierten 20+ minutos por sesión buscando la "versión final" de un documento entre correos y carpetas de Drive. La ausencia de versionamiento estandarizado produce duplicidad de archivos y pérdida de trazabilidad (*Amnesia de Versiones*). Las sesiones del sistema actual expiran repentinamente y la carga de archivos pesados es lenta.

**Estratégico:** La jefatura vive en incertidumbre permanente, dependiendo de la memoria de su equipo para saber si una carrera cumple o no los requisitos. No puede generar reportes ejecutivos sin detener el trabajo técnico.

**Coordinativo:** Los coordinadores de carrera enfrentan plazos inamovibles sin confirmación automática de recepción de documentos, y deben recopilar información de múltiples unidades (RRHH, infraestructura, dirección académica) de forma manual.

La consecuencia de no actuar es directa: mayor riesgo de no superar auditorías externas, pérdida de acreditaciones vigentes y afectación al prestigio institucional y a la validez de los títulos de la UMSS.

### 3.2 Oportunidad

- **Valor económico:** Reducción de horas-técnico dedicadas a tareas burocráticas (búsqueda, organización, reporte manual) que pueden redirigirse a trabajo estratégico. Estimación preliminar: 15–20 horas/mes por técnico recuperables.
- **Valor estratégico/reputacional:** La UMSS puede afrontar auditorías CEUB y ARCU-SUR con evidencia organizada, trazable e inmediata, reduciendo el riesgo de observaciones por deficiencias documentales.
- **Ventana de oportunidad:** No existe ninguna solución activa diseñada nativamente para las normativas bolivianas de acreditación universitaria. Los sistemas globales (QS, THE, AACSB) puntúan 2/10 en cumplimiento normativo local y requieren adaptaciones manuales costosas. AcredIA captura ese espacio vacío.

---

## 4. Usuarios Objetivo / Actores del Sistema

El sistema reconoce 4 actores fundamentales con niveles de visibilidad y permisos distintos:

---

### [CC] Coordinador de Carrera

| Atributo | Valor |
|----------|-------|
| **Rol** | Actor operativo |
| **Objetivo** | Cumplir con el framework de evaluación normativo |
| **Responsabilidades** | Carga de evidencias documentales · Respuesta a observaciones del Técnico DUEA · Corrección de indicadores rechazados · Seguimiento del progreso de su carrera |
| **Visibilidad** | Limitada a su propia carrera |

---

### [TD] Técnico DUEA (Auditor)

| Atributo | Valor |
|----------|-------|
| **Rol** | Actor auditor y orquestador |
| **Objetivo** | Validar la calidad técnica y completitud de las evidencias |
| **Responsabilidades** | Revisión de evidencia técnica · Aprobación o rechazo de indicadores (con justificación obligatoria) · Generación de observaciones vinculadas · Autorización del avance de fases |
| **Visibilidad** | Global (todas las carreras y facultades) |

---

### [JD] Jefatura DUEA (Administrador)

| Atributo | Valor |
|----------|-------|
| **Rol** | Actor estratégico |
| **Objetivo** | Supervisar velocidad de procesos y garantizar continuidad institucional |
| **Responsabilidades** | Monitoreo de cuellos de botella · Configuración del sistema (usuarios, facultades, plantillas normativas) · Aprobación de dictámenes finales · Auditoría de historial de acreditaciones |
| **Visibilidad** | Total del sistema |

---

### [P] Público (Portal de Transparencia)

| Atributo | Valor |
|----------|-------|
| **Rol** | Actor externo |
| **Acceso** | Estudiantes, empleadores, organismos de acreditación |
| **Responsabilidades** | Consultar estados y descargar certificados institucionales sin fricciones |
| **Visibilidad** | Pública (solo información publicada oficialmente) |

## 5. Propuesta de Valor

| Eje | Contenido |
|-----|-----------|
| **Para quién** | Técnicos DUEA, Jefatura DUEA y Coordinadores de Carrera de la UMSS involucrados en procesos de acreditación CEUB y ARCU-SUR |
| **Que necesita** | Gestionar, validar y dar seguimiento a la documentación de acreditación de forma centralizada, trazable y sin pérdida de versiones, cumpliendo plazos inamovibles |
| **Nuestra propuesta es** | AcredIA / SIGESA: sistema web activo de gestión de acreditaciones con repositorio centralizado, control de versiones, dashboard gerencial y automatización de flujos y reportes |
| **Que le aporta** | • Única Fuente de Verdad: eliminación de versiones duplicadas. • Historial de versiones inmutable con autor y fecha. • Dashboard de semáforos con visibilidad instantánea. • Reportes ejecutivos en PDF en menos de 5 minutos. • Alertas automáticas de retrasos y vencimientos. |
| **A diferencia de** | El flujo actual: Excel + carpetas Drive + correos + WhatsApp + pendrives, sin integración, sin trazabilidad y sin automatización |
| **Nuestro diferencial es** | Es el único sistema diseñado nativamente para las normativas CEUB y ARCU-SUR, con taxonomías y reglas de negocio bolivianas integradas desde la capa de entrada de datos, eliminando adaptaciones manuales costosas |

---

## 6. Panorama Competitivo (Resumen)

| Competidor / alternativa | Tipo | Fortaleza percibida | Debilidad percibida |
|--------------------------|------|---------------------|---------------------|
| Excel + Drive + WhatsApp + correo (situación actual) | *do-nothing* | Familiar, sin costo de adopción | Manual, sin trazabilidad, sin versionado, sin reportes automáticos |
| DEVA UAJMS | Directo (parcial) | Existente en ecosistema boliviano | "Caja muerta": solo muestra acreditaciones realizadas, no gestiona activamente |
| QS Quacquarelli Symonds | Indirecto | Prestigio global, datos integrados | Cumplimiento normativo local 2/10, no cubre CEUB/ARCU-SUR, costo prohibitivo |
| Times Higher Education (THE) | Indirecto | Reconocimiento internacional | No aplicable al contexto boliviano, sin normativa CEUB/ARCU-SUR |
| AACSB / AdvancED (Cognia) | Indirecto | Funcionalidades avanzadas | Diseñados para contextos anglosajones, alto costo, sin integración boliviana |

> El análisis profundo con curva de valor y Estrategia del Océano Azul se desarrolla en el MRD.

---

## 7. Business Model Canvas

| Bloque | Mínimo 3 elementos concretos |
|--------|-------------------------------|
| **1. Segmentos de clientes** | Técnicos operativos DUEA (usuarios diarios) / Jefatura y dirección DUEA (toma de decisiones) / Coordinadores de carrera y directores académicos de las 12 facultades UMSS / Rectorado, Vicerrectorado y Decanos (consumidores de reportes) / Estudiantes y egresados (consulta pública de estado de acreditación) |
| **2. Propuesta de valor** | Única Fuente de Verdad con control de versiones automático / Visibilidad gerencial instantánea sin intervención técnica / Cumplimiento normativo CEUB y ARCU-SUR nativo desde la arquitectura / Automatización de alertas, notificaciones y reportes sin intervención humana / Cero pérdidas documentales con historial inmutable auditable |
| **3. Canales** | Plataforma web institucional con autenticación por correo UMSS (sin instalación) / Notificaciones automáticas por correo institucional / Capacitación y onboarding presencial en la DUEA / Integración futura con sistemas académicos internos UMSS |
| **4. Relación con clientes** | Interfaz de "cero curva de aprendizaje": botones grandes, lenguaje sin jerga técnica / Retroalimentación en tiempo real: confirmaciones, aprobaciones y rechazos con comentarios / Soporte técnico interno vía equipo AcredIA / Sección de ayuda integrada: manual de usuario, preguntas frecuentes y contacto |
| **5. Fuentes de ingresos** | Implementación institucional: acuerdo de licenciamiento con UMSS/DUEA / Mantenimiento anual y soporte técnico continuo / Módulos adicionales por demanda (integración RRHH, informes externos) / Licenciamiento potencial a otras universidades del sistema boliviano CEUB |
| **6. Recursos clave** | Plataforma web SIGESA: backend, base de datos y almacenamiento cloud / Equipo de desarrollo AcredIA (ingenieros, diseñadores UX) / Taxonomías y reglas de negocio CEUB y ARCU-SUR integradas al motor de validación / Base de datos inicial de carreras, facultades y fases UMSS / Accesos de integración con sistemas institucionales UMSS |
| **7. Actividades clave** | Desarrollo y mantenimiento evolutivo de la plataforma SIGESA / Integración y actualización de normativas CEUB y ARCU-SUR en el motor de validación / Capacitación, onboarding y soporte continuo a todos los tipos de usuario / Generación y automatización de reportes e informes ejecutivos / Gestión de respaldos y seguridad de la información |
| **8. Socios clave** | UMSS / DUEA: cliente primario e institución implementadora / CEUB: organismo normativo boliviano cuyas reglas estructuran el sistema / ARCU-SUR / MERCOSUR Educativo: organismo normativo regional / Ministerio de Educación de Bolivia: validación institucional / Proveedor de infraestructura cloud: hosting, almacenamiento y disponibilidad |
| **9. Estructura de costos** | Desarrollo inicial: horas de ingeniería de software y diseño UX / Infraestructura cloud: hosting, base de datos y almacenamiento (OPEX mensual) / Licencias de herramientas de desarrollo y servicios de terceros / Capacitación presencial y materiales de onboarding / Mantenimiento evolutivo: actualizaciones normativas y mejoras funcionales |

---

## 8. Métricas Clave de Éxito (North Star + Apoyo)

| ID | KPI | North Star? | Línea base | Meta | Horizonte | Fuente del dato |
|----|-----|-------------|------------|------|-----------|-----------------|
| KPI-01 | Tiempo promedio de localización de un documento en el sistema | **Sí** | 20+ minutos (manual, validado en campo) | ≤ 2 minutos | Q4 2026 | Logs del sistema / encuesta a usuarios |
| KPI-02 | Tasa de adopción activa del sistema por usuarios objetivo | No | 0% (sistema nuevo) | ≥ 80% de actores clave | 3 meses post-lanzamiento | Logs de sesiones del sistema |
| KPI-03 | Tiempo promedio de generación de reporte ejecutivo | No | Horas / días (compilación manual) | ≤ 5 minutos | Q4 2026 | Logs del sistema |
| KPI-04 | Incidentes de pérdida documental por proceso de acreditación | No | Recurrente (por medir antes del lanzamiento) | 0 incidentes por gestión | Q1 2027 | Registro de incidencias DUEA |
| KPI-05 | Porcentaje de fases con trazabilidad documental completa | No | 0% (no existe trazabilidad actual) | 100% | Q2 2027 | Dashboard del sistema |

---

## 9. Objetivos de Negocio (SMART)

| ID | Objetivo | Métrica | Línea base | Meta | Horizonte |
|----|----------|---------|------------|------|-----------|
| BO-01 | Reducir el tiempo operativo de búsqueda de documentos de acreditación | Minutos promedio por búsqueda | 20+ minutos | ≤ 2 minutos | Q4 2026 |
| BO-02 | Eliminar la pérdida documental en procesos de acreditación | Incidentes de pérdida por gestión | Recurrente | 0 incidentes | Q1 2027 |
| BO-03 | Lograr que la jefatura DUEA genere reportes ejecutivos de forma autónoma | Tiempo promedio sin asistencia técnica | Horas/días | ≤ 5 minutos | Q4 2026 |
| BO-04 | Aumentar la tasa de adopción del sistema entre actores clave | % de usuarios activos sobre total registrados | 0% | ≥ 80% | 3 meses post-lanzamiento |
| BO-05 | Garantizar trazabilidad completa de evidencias en todos los procesos activos | % de fases con historial documental completo | 0% | 100% | Q2 2027 |

---

## 10. Stakeholders y Roles (Modelo RACI)

| Stakeholder | Interés principal | R / A / C / I |
|-------------|-------------------|----------------|
| Jefa DUEA (Sponsor) | Visibilidad gerencial, reportes, cumplimiento normativo | **A** (Accountable) |
| Técnicos DUEA | Gestión documental, flujos de aprobación, seguimiento de fases | **R** (Responsible) |
| Coordinadores de Carrera | Carga de documentos, seguimiento de su carrera | **R** (Responsible) |
| Equipo de Desarrollo AcredIA | Implementación técnica y mantenimiento | **R** (Responsible) |
| Docente / Tutor académico | Revisión metodológica del proyecto | **C** (Consulted) |
| Rectorado / Vicerrectorado / Decanos | Reportes ejecutivos, cumplimiento institucional | **I** (Informed) |
| CEUB | Normativa de acreditación nacional | **C** (Consulted) |
| ARCU-SUR / MERCOSUR Educativo | Normativa de acreditación regional | **C** (Consulted) |
| Estudiantes / Egresados | Consulta pública de estado de acreditación | **I** (Informed) |
| Dirección académica / RRHH UMSS | Provisión de datos institucionales | **C** (Consulted) |

---

## 11. Requerimientos de Negocio

| ID | Requerimiento de negocio | Prioridad (MoSCoW) | Justificación | Métrica de aceptación |
|----|---------------------------|--------------------|---------------|-----------------------|
| BR-001 | El sistema debe permitir a los coordinadores de carrera cargar documentos de evidencia sin enviarlos por correo o WhatsApp | Must | Elimina el canal informal que genera pérdida de trazabilidad | 100% de documentos cargados directamente en el sistema |
| BR-002 | El sistema debe mantener historial de versiones por documento, registrando automáticamente autor, fecha y descripción del cambio | Must | Elimina la "Amnesia de Versiones", principal dolor operativo identificado | 0 incidentes de confusión por versiones duplicadas por gestión |
| BR-003 | El sistema debe mostrar el estado de avance de cada carrera en dashboard visual (semáforos verde/amarillo/rojo) accesible para la jefatura sin asistencia técnica | Must | La jefatura necesita visibilidad instantánea para tomar decisiones | Estado actualizado obtenible en ≤ 2 minutos sin intervención técnica |
| BR-004 | El sistema debe generar automáticamente reportes ejecutivos en PDF exportables con información del estado de acreditación por carrera y facultad | Must | Reportes actuales requieren horas de compilación manual | Reporte ejecutivo generado en ≤ 5 minutos |
| BR-005 | El sistema debe enviar notificaciones automáticas por correo institucional ante retrasos, subfases rechazadas y vencimientos de plazos | Must | Sin alertas automáticas, los retrasos se detectan solo cuando la jefatura consulta manualmente | 100% de eventos críticos notificados en ≤ 15 minutos del evento |
| BR-006 | El sistema debe gestionar roles diferenciados (Administrador, Técnico DUEA, Coordinador, Vista Pública) con accesos y permisos distintos | Must | Cada actor tiene responsabilidades y visibilidad diferente en el proceso | 0 incidentes de acceso no autorizado a información restringida |
| BR-007 | El sistema debe estructurar fases y subfases de acreditación según normativas CEUB y ARCU-SUR preconfiguradas | Must | El cumplimiento normativo nativo elimina adaptaciones manuales costosas | 100% de fases configuradas alineadas a estándares CEUB/ARCU-SUR vigentes |
| BR-008 | El sistema debe permitir búsqueda rápida de documentos por título, carrera, facultad, modalidad y gestión | Must | Los técnicos invierten 20+ minutos buscando documentos entre correos y carpetas | Tiempo de localización ≤ 2 minutos usando el buscador |
| BR-009 | El sistema debe registrar log de auditoría inmutable de todas las acciones (carga, aprobación, rechazo, eliminación) | Should | Garantiza trazabilidad ante organismos acreditadores externos | 100% de acciones registradas con usuario, fecha y hora |
| BR-010 | El sistema debe permitir a estudiantes y egresados consultar públicamente el estado de acreditación de su carrera sin autenticación | Should | Rectorado y comunidad universitaria requieren transparencia | Información disponible para consulta pública sin login |
| BR-011 | El sistema debe gestionar la emisión y descarga de certificados de acreditación para participantes del proceso | Could | Elimina el proceso manual actual de certificados en papel | Certificados generados y descargados directamente desde el sistema |
| BR-012 | El sistema debe soportar respaldos automáticos de base de datos y documentos almacenados | Must | La pérdida de datos durante una auditoría sería crítica e irreparable | Respaldo automático diario verificable con confirmación al administrador |

---

## 12. Reglas de Negocio y Políticas

| ID | Regla | Tipo | Origen |
|----|-------|------|--------|
| RB-01 | Una carrera solo puede iniciar proceso ARCU-SUR si cuenta con resolución de acreditación CEUB vigente | Política | Normativa CEUB / ARCU-SUR |
| RB-02 | Los documentos solo pueden ser cargados por el Coordinador de Carrera designado; los técnicos DUEA validan pero no cargan en nombre del coordinador | Política | Procedimiento interno DUEA |
| RB-03 | Una subfase solo puede marcarse "Aprobada" si todos los documentos requeridos fueron cargados y validados por el técnico DUEA asignado | Política | Normativa de autoevaluación CEUB/ARCU-SUR |
| RB-04 | Los documentos aprobados no pueden eliminarse; solo se versionan (nueva versión se agrega, anterior queda en historial) | Normativa | Principio de trazabilidad para auditorías externas |
| RB-05 | El sistema debe respetar los plazos oficiales de convocatorias CEUB y ARCU-SUR; las fechas límite no son modificables por usuarios | Normativa | CEUB / Ministerio de Educación Bolivia |
| RB-06 | El acceso requiere autenticación con correo institucional UMSS activo; no se admiten correos personales | Política | Política de seguridad institucional UMSS |
| RB-07 | Los reportes ejecutivos son de uso interno institucional; su distribución externa requiere autorización de la Jefa DUEA | Política | Procedimiento interno DUEA |

---

## 13. Supuestos, Restricciones y Dependencias

**Supuestos:**
- La DUEA y la UMSS proporcionarán información actualizada de carreras, facultades y fases de acreditación para la configuración inicial.
- Todos los usuarios clave cuentan con correo electrónico institucional UMSS activo.
- La UMSS dispone de infraestructura de red que permite acceso web desde puestos de la DUEA y jefaturas de carrera.
- Las normativas CEUB y ARCU-SUR no sufrirán cambios estructurales mayores durante la implementación de la primera versión.
- Los coordinadores de carrera tienen disposición para adoptar el sistema como canal oficial, reemplazando correo y WhatsApp.

**Restricciones:**
- El sistema debe cumplir estrictamente con normativas CEUB y ARCU-SUR vigentes; no puede omitir ni modificar requisitos establecidos por estos organismos.
- La interfaz debe ser operable sin instalación de software adicional (solución web pura).
- Usuarios con nivel técnico bajo no deben requerir más de una sesión de capacitación para operar funciones principales.
- El presupuesto está sujeto a aprobación institucional de la UMSS.
- Los documentos aprobados no pueden eliminarse definitivamente (restricción de trazabilidad para auditorías).

**Dependencias:**
- **Institucional:** Aprobación formal de la DUEA y UMSS para implementación y provisión de datos base.
- **Normativa:** Acceso a documentación oficial actualizada de CEUB y ARCU-SUR para configurar taxonomías y fases.
- **Tecnológica:** Contratación de proveedor cloud para hosting, base de datos y almacenamiento.
- **Operativa:** Vigencia de correos institucionales UMSS para todos los usuarios.
- **Integraciones futuras:** Sistemas internos UMSS (SIIS académico, RRHH, ERP universitario) para fases posteriores.

---

## 14. Alcance de Negocio

### 14.1 En Alcance
- Gestión documental centralizada de evidencias de acreditación CEUB y ARCU-SUR.
- Seguimiento de fases y subfases por carrera y facultad.
- Flujos de aprobación entre coordinadores de carrera y técnicos DUEA.
- Dashboard gerencial con estado en tiempo real para la jefatura.
- Generación automática de reportes ejecutivos en PDF.
- Notificaciones automáticas por correo institucional ante eventos críticos.
- Gestión de roles y permisos diferenciados por tipo de usuario.
- Historial de versiones inmutable por documento.
- Consulta pública del estado de acreditación (vista estudiante/egresado).
- Emisión y descarga de certificados de acreditación.
- Log de auditoría de todas las acciones del sistema.
- Configuración inicial de las 12 facultades, carreras y fases de acreditación UMSS.

### 14.2 Fuera de Alcance
- Integración en tiempo real con sistemas externos UMSS (SIIS, RRHH, ERP) en versión inicial — contemplado para fases posteriores.
- Módulo de pagos o cobro de certificaciones.
- Matrices de evaluación externa autogeneradas por pares evaluadores internacionales.
- Control manual de respaldos por usuario (los respaldos son automáticos).
- Informes de seguimiento de bitácoras internas — excluido de la versión 1.
- Integración con plataformas internacionales de ranking (QS, THE).

---

## 15. Beneficios Esperados y *Business Case* Resumido

> Cifras estimadas con base en entrevistas de campo (feb-mar 2026). Requieren validación con la DUEA antes del cierre del proyecto.

| Tipo | Año 1 | Año 2 | Año 3 |
|------|-------|-------|-------|
| Ahorro operativo (horas técnico recuperadas) | ~720 h/año (15 h/mes × 4 técnicos × 12 meses) | ~720 h/año | ~720 h/año |
| Reducción de riesgo (evitación de observaciones por deficiencias documentales en auditorías) | Alto — por cuantificar | Continuidad | Continuidad |
| Inversión estimada CAPEX — desarrollo | Por definir con equipo UMSS | — | — |
| Costo operación OPEX — hosting/soporte | Por definir según infraestructura cloud elegida | Idem | Idem |
| **VAN** | Por calcular con datos confirmados de UMSS | | |
| **TIR** | Por calcular con datos confirmados de UMSS | | |

**Nota:** La línea base de costos actuales debe medirse formalmente antes del lanzamiento para construir el business case cuantitativo definitivo.

---

## 16. Riesgos de Negocio

| Riesgo | Probabilidad | Impacto | Mitigación | Responsable |
|--------|--------------|---------|------------|-------------|
| Resistencia al cambio por usuarios senior (bajo nivel técnico) | Alta | Alto | Diseño "cero curva de aprendizaje" + capacitación presencial + interfaz similar a ofimática conocida | Equipo AcredIA + DUEA |
| Falta de compromiso de coordinadores para abandonar correo/WhatsApp | Alta | Alto | Establecer el sistema como único canal válido mediante resolución institucional DUEA | Jefa DUEA (Sponsor) |
| Cambios en normativas CEUB o ARCU-SUR que requieran reconfiguración | Media | Alto | Arquitectura modular para actualizar taxonomías sin rediseño completo | Equipo AcredIA |
| Pérdida de datos durante migración desde Excel/Drive actuales | Baja | Crítico | Plan de migración por fases con validación manual + respaldos antes y durante | Equipo AcredIA + DUEA |
| Baja disponibilidad de infraestructura de red en instalaciones UMSS | Media | Alto | Pruebas en condiciones de red institucional real + optimización de tiempos de carga | Equipo AcredIA |
| Falta de aprobación institucional formal de la UMSS | Media | Crítico | Gestión temprana del sponsor para obtener aval del Rectorado antes del inicio del desarrollo | Jefa DUEA + PM |

---

## 17. Criterios de Éxito del Proyecto de Negocio

- Cumplimiento de ≥ 80% de los objetivos SMART declarados en la sección 9.
- Tasa de adopción activa ≥ 80% de usuarios clave en los primeros 3 meses post-lanzamiento.
- Tiempo de localización de documentos ≤ 2 minutos (vs 20+ minutos actuales).
- Cero pérdidas documentales en el primer proceso de acreditación gestionado íntegramente con el sistema.
- Satisfacción del sponsor (Jefa DUEA) ≥ 4/5 en evaluación post-implementación.
- El sistema supera al menos una auditoría CEUB o ARCU-SUR con evidencia organizada desde la plataforma.

---

## 18. Trazabilidad a Documentos Hijos

| BRD ID | MRD relacionado | PRD relacionado | Caso de uso FSD |
|--------|-----------------|-----------------|-----------------|
| BR-001 | MRD-N-01 (Gestión documental) | PRD-REQ-01 | FSD-UC-001 (Carga de documentos) |
| BR-002 | MRD-N-02 (Control de versiones) | PRD-REQ-02 | FSD-UC-002 (Historial de versiones) |
| BR-003 | MRD-N-03 (Dashboard gerencial) | PRD-REQ-03 | FSD-UC-003 (Dashboard semáforos) |
| BR-004 | MRD-N-04 (Reportes automáticos) | PRD-REQ-04 | FSD-UC-004 (Generación reporte PDF) |
| BR-005 | MRD-N-05 (Notificaciones) | PRD-REQ-05 | FSD-UC-005 (Sistema de alertas) |
| BR-006 | MRD-N-06 (Roles y permisos) | PRD-REQ-06 | FSD-UC-006 (Gestión de accesos) |
| BR-007 | MRD-N-07 (Normativa CEUB/ARCU-SUR) | PRD-REQ-07 | FSD-UC-007 (Configuración de fases) |
| BR-008 | MRD-N-08 (Buscador) | PRD-REQ-08 | FSD-UC-008 (Búsqueda de documentos) |

---

## 19. Aprobaciones

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Sponsor (Jefa DUEA) | | | |
| PM / Líder del proyecto | | | |
| Docente revisor | M.Sc. Rodrigo Iver Romero Frias | | |
| Grupo par revisor | | | |

---

## 20. Registro de Cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v0.1 | 02/05/2026 | Equipo AcredIA | Versión inicial — elaborada con base en Bitácoras Módulo 1 y Módulo 2, adaptada al template oficial Módulo 4 |

---

## Checklist Mínimo de Entrega

- [x] **Resumen ejecutivo** de ½ página con problema, propuesta, valor y métricas.
- [x] Problema de negocio con evidencia cuantitativa (20+ minutos, validado en campo).
- [x] **2 personas / usuarios objetivo** caracterizadas (JTBD, dolores, ganancias).
- [x] **Propuesta de valor** explícita (formato VPC).
- [x] **Panorama competitivo** con 5 alternativas (incluyendo *do-nothing*).
- [x] **Business Model Canvas** con los 9 bloques, ≥ 3 elementos por bloque.
- [x] **Métricas clave de éxito**: 1 *North Star* (KPI-01) + 4 KPIs de apoyo, con meta y horizonte.
- [x] 5 objetivos de negocio SMART.
- [x] Matriz RACI completa con 10 stakeholders.
- [x] 12 requerimientos de negocio priorizados (MoSCoW).
- [x] 7 reglas de negocio, restricciones, supuestos y dependencias explícitos.
- [x] *Business case* estimado con ahorro operativo cuantificado.
- [x] Trazabilidad a MRD/PRD iniciada (8 mapeos BR→MRD→PRD→FSD).

---

*Documento elaborado por el equipo AcredIA — UMSS, Cochabamba, Bolivia, 2026.*
*Basado en investigación de campo: entrevistas contextuales, mapeo de procesos y pruebas de usabilidad realizadas febrero–marzo 2026.*
