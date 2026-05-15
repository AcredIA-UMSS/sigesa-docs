# Market Requirements Document (MRD) – AcredIA / SIGESA

> **Propósito del MRD**: describir el mercado, los usuarios y la oportunidad comercial que justifican la construcción del producto. Responde a **"¿qué pide el mercado y por qué este producto ganará?"**.

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | AcredIA / SIGESA — Sistema Inteligente de Gestión y Seguimiento de Acreditaciones |
| Grupo | AcredIA |
| Versión | `v1.0` |
| Fecha | `14/05/2026` |
| Product Manager / Autor | Aylen Mariangel Gonzales Alvino |
| Revisores | M.Sc. Edson Terceros Torrico · Tech Lead AcredIA · QA AcredIA |
| Estado | Borrador |
| Relación con BRD | `BRD v2.0 — team/aylenGonzales/BRD_v2.md` |
| Relación con PRD | `PRD v1.0 — team/aylenGonzales/PRD_v1.md` |
| Relación con FSD | `FSD v1.0 — team/aylenGonzales/FSD_v1.md` |

---

## 1. Resumen Ejecutivo

AcredIA / SIGESA es un sistema web de gestión y seguimiento de acreditaciones universitarias diseñado nativamente para la Dirección Universitaria de Evaluación y Acreditación (DUEA) de la Universidad Mayor de San Simón (UMSS), Cochabamba, Bolivia.

El mercado objetivo es la educación superior boliviana: 14 universidades del sistema CEUB y carreras vinculadas al mecanismo ARCU-SUR del MERCOSUR. La UMSS concentra 38 000 estudiantes de pregrado en 12 facultades, con procesos de acreditación que hoy se gestionan con Excel, correos y WhatsApp, ocasionando pérdidas documentales y más de 20 minutos por sesión buscando versiones finales de documentos.

La diferenciación central es ser el **único sistema diseñado nativamente para las normativas bolivianas** (CEUB y ARCU-SUR), con taxonomías de fases e indicadores integradas desde la capa de datos, eliminando las costosas adaptaciones manuales que exigen soluciones globales como DEVA (UAJMS) o plataformas internacionales como QS, THE y AACSB.

La oportunidad comercial abarca las 14 universidades del CEUB como mercado potencial (SAM estimado: 14 instituciones) y la UMSS como mercado obtenible en v1.0 (1 institución, 12 facultades, ~120 carreras). El modelo de negocio es **SaaS B2B institucional** con licencia anual por universidad, escalable a nivel nacional y posteriormente a la región andina con normativas similares.

---

## 2. Visión del Producto

> "Para la DUEA de la UMSS y sus coordinadores de carrera, que hoy pierden horas gestionando evidencias de acreditación en correos y Excel dispersos, AcredIA / SIGESA es la única plataforma de gestión documental diseñada nativamente para normativas bolivianas (CEUB y ARCU-SUR) que reduce el tiempo de localización de documentos de 20+ minutos a menos de 2 minutos y elimina la pérdida documental en procesos activos, lista para despliegue en Q4 2026."

---

## 3. Análisis de Mercado

### 3.1 Tamaño de Mercado

| Métrica | Valor | Fuente |
|---------|-------|--------|
| TAM (*Total Addressable Market*) | 60 universidades públicas y privadas en Bolivia + países andinos con normativas CEUB equivalentes (aprox. USD 8M en herramientas de gestión académica) | Ministerio de Educación Bolivia, 2024; estimación propia |
| SAM (*Serviceable Addressable Market*) | 14 universidades del sistema CEUB + carreras ARCU-SUR activas en Bolivia (aprox. USD 1.4M) | CEUB, Informe de Acreditaciones 2023 |
| SOM (*Serviceable Obtainable Market*) | UMSS (1 institución, 12 facultades, ~120 carreras) — mercado alcanzable en v1.0; estimado USD 40K–80K licencia anual | Datos internos DUEA-UMSS, 2026; estimación equipo AcredIA |

### 3.2 Tendencias del Sector

- **Digitalización acelerada en educación superior boliviana**: la Ley 070 y el CEUB han impulsado la adopción de sistemas de gestión académica, creando demanda de herramientas de trazabilidad documental.
- **Expansión de ARCU-SUR**: Bolivia ha firmado compromisos de acreditación regional que exigen evidencia sistematizada y auditable por organismos internacionales del MERCOSUR.
- **Presión por transparencia institucional**: estudiantes, egresados y empleadores demandan información pública y verificable sobre el estado de acreditación de las carreras, impulsando portales de transparencia.
- **Auge de SaaS B2B en educación superior latinoamericana**: el mercado EdTech institucional crece a tasas de 15–20 % anual en la región, con soluciones verticales para acreditación ganando tracción frente a ERP generalistas.

### 3.3 Factores Regulatorios y de Cumplimiento

- **Ley 070 de Educación 'Avelino Siñani – Elizardo Pérez' (Bolivia)**: marco normativo que regula la educación superior y exige acreditación periódica de carreras.
- **Normativas CEUB**: estándar nacional de acreditación universitaria en Bolivia; taxonomía de fases e indicadores que AcredIA implementa de forma nativa.
- **Mecanismo ARCU-SUR (MERCOSUR)**: acreditación regional de carreras de grado; exige trazabilidad documental completa para evaluación por pares internacionales.
- **Política institucional UMSS**: resoluciones internas de la DUEA que establecen canales oficiales de gestión documental; requisito de resolución para adopción de SIGESA como canal único.

### 3.4 Cadencia de Continuous Discovery

> Ver S04 §B6 (*Continuous Discovery + Dual-Track Agile*). El MRD es un documento **vivo** que se alimenta semanalmente del *track de Discovery*.

| Aspecto | Valor |
|---------|-------|
| Cadencia de entrevistas | Semanal |
| Usuarios contactados por ciclo | ≥ 1 por semana (Torres recomienda ≥ 1 por semana); objetivo 2–3 en periodos de validación intensiva |
| Formato de hipótesis | *Cuando `<situación>`, espero `<resultado>`, porque `<razón>`* |
| Backlog de hipótesis | Ver §12 de este MRD |
| Output del track | Validaciones que actualizan §3, §5, §11 y §12 de este MRD. Ninguna US Must entra al Delivery sin hipótesis validada. |

> **Criterio**: si en una semana no hubo contacto con usuarios, declárelo explícitamente como riesgo en §13.

---

## 4. Segmentación y *Personas*

### 4.1 Segmentos de Clientes

| Segmento | Tamaño | Necesidad principal | Disposición a pagar | Origen M2 |
|----------|--------|----------------------|---------------------|-----------|
| Técnico DUEA [TD] | 5–10 técnicos por universidad CEUB | Localizar versión final de documento sin búsqueda manual en correos | Cubierto por presupuesto institucional DUEA | Persona técnico M2 – Bitácora 3 |
| Coordinador de Carrera [CC] | ~120 coordinadores en UMSS (1 por carrera) | Cargar evidencias y recibir confirmación de recepción sin depender del correo | Cubierto por matrícula institucional | Persona coordinadora M2 – Bitácora 3 |
| Jefatura DUEA [JD] | 1–3 directivos por universidad | Visibilidad gerencial en tiempo real y generación autónoma de reportes PDF | Cubierto por partida presupuestaria DUEA | Persona jefatura M2 – Bitácora 3 |
| Público externo [P] | 38 000 estudiantes UMSS + egresados y empleadores | Consultar estado oficial de acreditación sin trámite presencial | Acceso gratuito (portal público, sin autenticación) | Segmento externo identificado en entrevistas M2 |

### 4.2 *Personas*

> **Trazabilidad con M2 (UI/UX)**: personas caracterizadas en Bitácora 3 (UMSS, feb–mar 2026). Se complementan aquí con mirada de mercado (tamaño, *willingness-to-pay*, segmento competitivo).

#### Persona 1 – Técnico DUEA [TD]

- **Origen M2**: `M2/personas/persona_tecnico_duea` (Bitácora 3, validado con usuarios DUEA, feb–mar 2026).
- **Rol**: Técnico de evaluación y acreditación, DUEA-UMSS.
- **Demografía**: 28–45 años, formación en ciencias de la educación o administración, experiencia en procesos CEUB/ARCU-SUR.
- **Objetivos**: Validar calidad técnica de evidencias con trazabilidad completa; aprobar/rechazar indicadores; orquestar avance de fases a tiempo.
- **Dolores actuales**: Invierte 20+ min/sesión buscando la "versión final" de un documento entre correos, carpetas y pendrives; sin visibilidad centralizada de qué falta por revisar.
- **Comportamiento digital**: PC de escritorio en oficina DUEA; usa Outlook, Excel y WhatsApp como canal de coordinación; baja adopción de sistemas especializados.
- **Frase representativa**: *"Siempre me llegan cinco versiones del mismo documento y no sé cuál es la buena."*
- **Tamaño del segmento**: 5–10 técnicos en UMSS; ~70–140 en el sistema CEUB.
- **Willingness-to-pay**: Decisión institucional (DUEA); usuario interno sin capacidad de compra directa.

#### Persona 2 – Coordinador de Carrera [CC]

- **Origen M2**: `M2/personas/persona_coordinador_carrera` (Bitácora 3, validado con usuarios DUEA, feb–mar 2026).
- **Rol**: Coordinador académico de carrera, responsable de la carga de evidencias de acreditación ante la DUEA.
- **Demografía**: 35–55 años, docente con cargo administrativo, nivel técnico digital bajo–medio; carga laboral alta y plazos inamovibles.
- **Objetivos**: Cargar evidencias a tiempo y tener certeza de que fueron recibidas; saber exactamente qué falta antes de la fecha límite.
- **Dolores actuales**: No sabe si sus documentos llegaron al técnico; recibe observaciones por correo sin referencia clara al indicador; duplica esfuerzos buscando versiones previas.
- **Comportamiento digital**: Uso mixto PC/móvil; prefiere WhatsApp para coordinación urgente; adopción de nuevas herramientas solo si son muy simples (≤ 3 pasos).
- **Frase representativa**: *"Le mandé el documento por correo pero no sé si lo recibieron, y ya no sé cuánto falta."*
- **Tamaño del segmento**: ~120 coordinadores en UMSS; ~1 680 en el sistema CEUB.
- **Willingness-to-pay**: Cubierto por matrícula institucional; usuario interno sin compra directa.

#### Persona 3 – Jefatura DUEA [JD]

- **Origen M2**: `M2/personas/persona_jefatura_duea` (Bitácora 3, validado con usuarios DUEA, feb–mar 2026).
- **Rol**: Directora/Jefa de la DUEA; responsable estratégica del proceso de acreditación institucional.
- **Demografía**: 40–60 años, formación en educación superior o gestión universitaria, cargo de confianza institucional.
- **Objetivos**: Monitorear el estado real de todos los procesos activos sin depender de la memoria del equipo; generar reportes ejecutivos para autoridades rectorales en minutos.
- **Dolores actuales**: No puede saber el estado real sin interrumpir el trabajo técnico; reportar a las autoridades le exige consolidar Excel manualmente; detección tardía de retrasos críticos.
- **Comportamiento digital**: PC de escritorio; usa email institucional y herramientas ofimáticas; toma decisiones basadas en reportes consolidados; baja tolerancia a la complejidad técnica.
- **Frase representativa**: *"Cuando el Rector me llama a las 8 AM, necesito saber en segundos cómo va cada carrera, no un Excel de la semana pasada."*
- **Tamaño del segmento**: 1–3 directivos por universidad; ~14–42 en el sistema CEUB. Principal decisor de compra.
- **Willingness-to-pay**: Alta disposición institucional: el ROI se mide en horas técnicas ahorradas y riesgo de pérdida de acreditaciones. Decisor de presupuesto DUEA.

---

## 5. *Jobs-to-be-Done*

| JTBD ID | Cuando… | Quiero… | Para poder… |
|---------|---------|---------|-------------|
| JTBD-01 | necesito revisar evidencias de una carrera y no encuentro la versión final | acceder al historial de versiones con autor, fecha y estado desde un único panel | no perder 20+ minutos buscando en correos y carpetas compartidas |
| JTBD-02 | cargo evidencias de mi carrera cerca de la fecha límite | recibir confirmación inmediata de que el documento fue registrado con mi nombre y versión | tener certeza de que el técnico lo recibirá sin perder la carga por incertidumbre |
| JTBD-03 | el Rector solicita el estado de acreditaciones de todas las carreras | generar un reporte ejecutivo PDF en menos de 5 minutos con semáforos de avance por carrera | responder con información oficial sin detener el trabajo técnico del equipo |
| JTBD-04 | el técnico rechaza un indicador que cargué | ver la observación completa con texto, fecha y nombre del técnico directamente en el sistema | corregir y recargar sin depender de un correo que puede perderse en la bandeja |
| JTBD-05 | soy estudiante o egresado y necesito saber si mi carrera está acreditada para una postulación laboral | consultar el estado oficial de acreditación de mi carrera en un portal público sin registrarme | presentar evidencia oficial a empleadores sin gestionar un trámite presencial en la universidad |
| JTBD-06 | se acerca la fecha límite de una subfase y hay indicadores pendientes | recibir una alerta automática por correo con el detalle de qué falta y un enlace directo a la subfase | actuar a tiempo sin necesidad de revisar el sistema diariamente o esperar que el técnico me avise |

---

## 6. Análisis Competitivo

### 6.1 Tabla Comparativa

| Criterio | AcredIA / SIGESA | DEVA (UAJMS) | SharePoint / Google Drive | Do-nothing (Excel + correo) |
|----------|------------------|--------------|---------------------------|------------------------------|
| Normativa boliviana nativa (CEUB + ARCU-SUR) | ✅ Ambas integradas | ⚠️ Parcial (CEUB solo) | ❌ Manual | ❌ Manual |
| Control de versiones de documentos | ✅ Historial inmutable automático | ⚠️ Básico | ⚠️ Parcial (sin inmutabilidad) | ❌ Renombrado manual |
| Dashboard gerencial en tiempo real | ✅ Semáforos por carrera/facultad | ❌ No | ❌ No | ❌ No |
| Generación de reportes PDF | ✅ Automático, ≤ 5 min | ⚠️ Manual | ❌ No | ⚠️ Manual en Excel |
| Flujo de aprobación con trazabilidad | ✅ Completo (CC→TD→JD) | ⚠️ Parcial | ❌ No | ❌ Nulo |
| Notificaciones automáticas | ✅ Correo institucional ≤ 15 min | ❌ No | ❌ No | ❌ WhatsApp manual |
| Portal público de transparencia | ✅ Sí, sin autenticación | ❌ No | ❌ No | ❌ No |
| Log de auditoría inmutable | ✅ 100% de acciones | ⚠️ Parcial | ❌ No | ❌ Nulo |
| Modelo de precios | SaaS B2B institucional (licencia anual) | Desarrollo propio (costo interno UAJMS) | Licencia Microsoft/Google incluida | Costo oculto en tiempo humano |

### 6.2 *Positioning Statement*

> Para la Jefatura DUEA y los Técnicos de Acreditación de universidades bolivianas, que hoy pierden horas gestionando evidencias en correos y Excel sin trazabilidad real, **AcredIA / SIGESA** es el único sistema de gestión documental diseñado nativamente para normativas CEUB y ARCU-SUR que centraliza evidencias, automatiza flujos de aprobación y genera reportes ejecutivos en minutos — a diferencia de DEVA (limitado al CEUB y sin dashboard gerencial) y de los sistemas generalistas (que requieren adaptaciones manuales costosas y no garantizan inmutabilidad documental).

### 6.3 Ventaja Competitiva Sostenible

- **Normativa nativa**: taxonomías CEUB y ARCU-SUR integradas en la capa de datos desde el día 1, eliminando la principal barrera de adopción frente a soluciones globales.
- **Datos propios de acreditación**: a medida que las universidades adopten SIGESA, el sistema acumula datos históricos de procesos bolivianos que alimentarán el módulo de IA asistencial (v2.0), creando una ventaja de red acumulativa.
- **Relación institucional UMSS-DUEA**: el piloto con la UMSS genera casos de éxito referenciales para el sistema CEUB completo, con efecto bola de nieve entre universidades pares.
- **Diseño centrado en el usuario boliviano**: validado con usuarios reales de la DUEA (Bitácora 3, tasa de éxito 96,66 %), con interfaz adaptada al nivel técnico real del ecosistema universitario nacional.

---

## 7. Propuesta de Valor

### 7.1 *Value Proposition Canvas* Resumido

| Gains | Pains | Gains Relievers | Pain Relievers | Products & Services |
|-------|-------|-----------------|----------------|---------------------|
| Visibilidad en tiempo real del estado de acreditación por carrera | 20+ min buscando versión final de documentos | Dashboard gerencial con semáforos en tiempo real | Repositorio centralizado con historial inmutable | Sistema web sin instalación |
| Generación autónoma de reportes en minutos | Pérdida documental por gestión en correos/WhatsApp | Confirmación automática de carga con versión y fecha | Notificaciones automáticas ≤ 15 min | Repositorio de evidencias con versionado automático |
| Certeza de recepción documental | Detección tardía de retrasos críticos | Portal público de transparencia institucional | Flujo CC→TD→JD con trazabilidad completa | Flujo de aprobación/rechazo con justificación obligatoria |
| Cumplimiento normativo verificable para auditorías externas | Dependencia del equipo técnico para saber el estado real | | Buscador que localiza documentos en ≤ 2 min | Reportes PDF ejecutivos automatizados · Log de auditoría inmutable |

---

## 8. Pricing y Modelo de Negocio

- **Modelo principal**: SaaS B2B institucional — licencia anual por universidad contratante.
- **Tier Piloto (UMSS v1.0)**: costo de implementación cubierto por acuerdo institucional UMSS-AcredIA (Q4 2026). Sin costo de licencia en fase piloto.
- **Tier Universidad (v1.1+)**: USD 40 000–80 000/año por universidad, según tamaño de facultades y número de procesos activos. Incluye soporte, actualizaciones normativas y capacitaciones anuales.
- **Add-ons (v2.0)**: Módulo de IA asistencial (clasificación de evidencias, detección de patrones): +USD 15 000/año. Módulo de evaluador externo [EE]: +USD 10 000/año.
- **Benchmark competitivo**: DEVA (UAJMS) implica desarrollo propio sin licencia externa (costo interno estimado > USD 100K en desarrollo). Sistemas ERP generalistas: adaptación > USD 200K + mantenimiento anual.
- **Elasticidad estimada**: baja. La acreditación universitaria es un requerimiento normativo no discrecional. El costo de no acreditar (pérdida de reconocimiento estatal) supera ampliamente el costo de la licencia.

---

## 9. *Go-to-Market*

### 9.1 Canales de Adquisición

- **Canal directo institucional**: relación directa con la Jefatura DUEA y Rectorado de la UMSS; referencia a otras universidades del sistema CEUB a través de la Red de Vicerrectores Académicos.
- **Canal académico**: publicaciones en congresos y jornadas de educación superior boliviana (JUBA, CEUB); ponencias sobre el piloto UMSS como caso de éxito.
- **Canal digital**: landing page con caso de estudio UMSS, demostraciones en vídeo del flujo CC→TD→JD, blog técnico sobre normativas CEUB/ARCU-SUR (SEO dirigido a directores DUEA).
- **Partners normativos**: alianza con el CEUB y el Ministerio de Educación para visibilidad en comunicaciones oficiales de acreditación.

### 9.2 Estrategia de Lanzamiento

| Fase | Actividades |
|------|-------------|
| **Pre-launch** (Q3 2026) | Piloto cerrado con DUEA-UMSS: 5 carreras piloto, 3 técnicos, 1 jefatura. Validación de hipótesis S1–S5 del Discovery track. Ajuste de UX basado en feedback real. |
| **Launch** (Q4 2026) | Despliegue v1.0 completo en UMSS (12 facultades, ~120 carreras). Resolución institucional DUEA que establece SIGESA como canal oficial. Capacitación presencial a todos los [CC] y [TD]. |
| **Post-launch** (Q1–Q2 2027) | Publicación del caso de éxito UMSS. Outreach a 3 universidades CEUB priorizadas (UAGRM, UAB, UPEA). Lanzamiento v1.1 con planes de mejora y exportación Excel. |
| **Expansión** (Q3 2027+) | v2.0 con módulo de IA asistencial y evaluador externo. Entrada a mercados andinos con normativas equivalentes (Perú, Ecuador). |

### 9.3 Funnel AARRR Inicial

| Etapa | Métrica | Meta |
|-------|---------|------|
| Acquisition | Universidades CEUB contactadas para demo | ≥ 5 universidades en pipeline (12 meses post-launch) |
| Activation | Usuarios activos registrados en UMSS (CC + TD + JD) | ≥ 80 % de usuarios registrados activos en primeros 3 meses |
| Retention | MAU / total registrados | ≥ 75 % MAU/total a los 6 meses |
| Revenue | Contratos firmados con universidades CEUB adicionales | ≥ 1 contrato adicional firmado en Q2 2027 |
| Referral | Universidades que llegan por recomendación de UMSS | ≥ 2 referencias activas en 18 meses post-launch |

---

## 10. Métricas de Éxito del Producto

- **North Star Metric**: tiempo promedio de localización de documento ≤ 2 minutos (vs. 20+ min actuales) — KPI-01.
- **KPI-02** (adopción): tasa de usuarios activos ≥ 80 % en primeros 3 meses — medición Q1 2027.
- **KPI-03** (eficiencia): tiempo de generación de reporte ejecutivo PDF ≤ 5 min — validación piloto Q3 2026.
- **KPI-04** (calidad): incidentes de pérdida documental en procesos activos = 0 — continuo desde Q4 2026.
- **KPI-05** (trazabilidad): % de fases con trazabilidad documental completa = 100 % — Q4 2026.
- **KPI-06** (usabilidad): tasa de éxito en core tasks ≥ 95 % en piloto — test Q3 2026.
- **KPI-07** (satisfacción): CSAT post-piloto ≥ 8,0/10 — medición Q4 2026.

---

## 11. Requerimientos de Mercado (Alto Nivel)

| ID | Requerimiento | Prioridad | Justificación de mercado |
|----|---------------|-----------|--------------------------|
| MRD-N-01 | Repositorio centralizado de evidencias con historial de versiones inmutable accesible en ≤ 2 minutos | Must | Dolor principal [TD]: 20+ min/sesión buscando versión final (validado entrevistas DUEA) |
| MRD-N-02 | Control de versiones automático sin intervención del usuario (autor, fecha, hash) | Must | Requerimiento de trazabilidad para auditorías externas CEUB/ARCU-SUR |
| MRD-N-03 | Flujo de aprobación CC→TD→JD con trazabilidad completa y justificación obligatoria en rechazos | Must | Normativa CEUB exige dictámenes documentados y auditables por pares externos |
| MRD-N-04 | Generación autónoma de reportes ejecutivos PDF en ≤ 5 minutos sin asistencia técnica | Must | Dolor [JD]: depende del equipo técnico para saber el estado real; retrasos en reporte a autoridades |
| MRD-N-05 | Notificaciones automáticas por correo institucional ante eventos críticos en ≤ 15 minutos | Must | Plazos inamovibles de convocatorias CEUB/ARCU-SUR; detección tardía = pérdida de acreditación |
| MRD-N-06 | Autenticación exclusiva con correo @umss.edu.bo y roles diferenciados [CC], [TD], [JD], [P] | Must | Política de seguridad institucional UMSS; acceso a documentos con valor normativo |
| MRD-N-07 | Taxonomías de fases e indicadores CEUB y ARCU-SUR preconfiguradas desde el día 1 | Must | Diferenciador principal vs. competidores generalistas; elimina adaptación manual costosa |
| MRD-N-08 | Buscador de documentos por título, carrera, facultad, modalidad y gestión con resultados en ≤ 3 seg | Must | Reduce tiempo de localización de 20+ min a ≤ 2 min (North Star Metric del producto) |
| MRD-N-09 | Log de auditoría inmutable de todas las acciones del sistema (100 % de cobertura) | Must | Requerimiento de trazabilidad para pares evaluadores internacionales ARCU-SUR |
| MRD-N-10 | Portal público de consulta de estado de acreditación sin autenticación | Should | 38 000 estudiantes UMSS demandan transparencia; diferenciador de imagen institucional |
| MRD-N-11 | Emisión y descarga de certificados de acreditación desde el sistema | Could | Demanda de egresados y empleadores; reduce trámites presenciales en la DUEA |
| MRD-N-12 | Respaldo automático diario verificable de base de datos y documentos | Must | Riesgo de pérdida documental en proceso activo = pérdida de acreditación institucional |

---

## 12. Supuestos e Hipótesis a Validar

| ID | Hipótesis | Cómo validar | Criterio de éxito |
|----|-----------|--------------|-------------------|
| H1 | Cuando [CC] usa el sistema por primera vez, puede cargar evidencias sin capacitación previa en ≤ 3 pasos, porque el flujo es autoexplicativo | Test de usabilidad con 3 coordinadores reales en piloto UMSS (Discovery S1) | Tasa de éxito ≥ 95 % en tarea de carga sin asistencia |
| H2 | Cuando [JD] necesita generar un reporte ejecutivo PDF, lo completa en ≤ 5 minutos de forma autónoma, porque el módulo tiene ≤ 3 pasos de configuración | Test de usabilidad con jefa DUEA real en piloto (Discovery S2) | Completado sin asistencia técnica en ≤ 5 min en prueba en vivo |
| H3 | Cuando [TD] aprueba/rechaza una subfase, el flujo se completa en ≤ 4 clics y ≤ 3 minutos, porque el panel de auditoría agrupa todos los indicadores en una vista | Test de prototipo Hi-Fi con técnicos reales DUEA (Discovery S3 — parcialmente validado Bitácora 3) | Tiempo de tarea ≤ 3 min, 0 errores críticos, satisfacción ≥ 4/5 |
| H4 | Cuando [TD] usa el buscador, localiza cualquier documento en ≤ 2 minutos, porque los filtros reducen el universo a ≤ 10 resultados | Prueba comparativa cronometrada vs. método actual en piloto UMSS (Discovery S4) | Mediana de tiempo ≤ 2 min en piloto; vs. 20+ min en método actual |
| H5 | Cuando ocurre un evento crítico (rechazo, vencimiento), la notificación automática llega al usuario en ≤ 15 minutos, eliminando la detección tardía | Revisión de logs de envío post-piloto durante 4 semanas de uso real (Discovery S5) | 100 % de eventos críticos notificados en ≤ 15 min en logs de producción |
| H6 | Cuando las universidades CEUB conocen el caso de éxito UMSS, ≥ 2 muestran interés en adoptar SIGESA en los primeros 12 meses, porque el dolor de acreditación es sistémico | Outreach directo a 5 universidades CEUB post-launch; registro de demos agendadas | ≥ 2 universidades con demo agendada en Q1–Q2 2027 |

---

## 13. Riesgos de Mercado

| Riesgo | Prob. | Impacto | Mitigación |
|--------|-------|---------|------------|
| Resistencia al cambio — coordinadores no abandonan correo/WhatsApp como canal de evidencias | Alta | Alto | Resolución institucional DUEA que establezca SIGESA como canal único; capacitación presencial; diseño ≤ 3 pasos por flujo crítico |
| DEVA (UAJMS) u otra universidad boliviana lanza solución similar con apoyo del CEUB antes del despliegue UMSS | Media | Alto | Acelerar time-to-market a Q4 2026; publicar caso de éxito UMSS; blindar relación con jefatura DUEA y CEUB |
| Cambios normativos en CEUB o ARCU-SUR que invaliden las taxonomías preconfiguradas | Media | Alto | Arquitectura modular para actualizar taxonomías sin redeploy; monitoreo permanente de comunicaciones CEUB |
| Baja disponibilidad de red institucional UMSS afecta la experiencia | Media | Medio | Pruebas de rendimiento en condiciones de red real antes del despliegue; optimización de assets |
| Presupuesto institucional UMSS no aprobado a tiempo para Q4 2026 | Media | Alto | Negociación anticipada con Rectorado y DUEA; modelo de piloto gratuito; identificar partida presupuestaria alternativa |
| La UMSS decide desarrollar SIGESA internamente (make vs. buy) tras ver el piloto exitoso | Baja | Alto | Blindar IP del producto; contratos con cláusulas de exclusividad; demostrar ventaja de SaaS (actualizaciones normativas incluidas) |

---

## 14. Trazabilidad

| MRD ID | BRD ID | PRD ID | FSD ID |
|--------|--------|--------|--------|
| MRD-N-01 (Repositorio centralizado) | BR-001 | PRD-REQ-003, PRD-REQ-004 | FSD-UC-002 |
| MRD-N-02 (Control de versiones) | BR-002 | PRD-REQ-004 | FSD-UC-002 |
| MRD-N-03 (Flujo aprobación CC→TD→JD) | BR-003 | PRD-REQ-005 | FSD-UC-003 |
| MRD-N-04 (Reportes PDF automáticos) | BR-004 | PRD-REQ-007 | FSD-UC-005 |
| MRD-N-05 (Notificaciones automáticas) | BR-005 | PRD-REQ-008 | FSD-UC-002, FSD-UC-003 |
| MRD-N-06 (Autenticación y roles) | BR-006 | PRD-REQ-001, PRD-REQ-002 | FSD-UC-001 |
| MRD-N-07 (Taxonomías CEUB/ARCU-SUR) | BR-007 | PRD-REQ-010 | FSD-UC-003 (RB-01, RB-05) |
| MRD-N-08 (Buscador de documentos) | BR-008 | PRD-REQ-009 | T-008 (FSD §2.5) |
| MRD-N-09 (Log de auditoría inmutable) | BR-009 | PRD-REQ-011 | T-009 (FSD §2.5) |
| MRD-N-10 (Portal público) | BR-010 | PRD-REQ-012 | T-010 (FSD §2.5) |
| MRD-N-11 (Certificados de acreditación) | BR-011 | PRD-REQ-013 | T-011 (FSD §2.5) |
| MRD-N-12 (Respaldo automático diario) | BR-012 | PRD-REQ-014 | T-011 (FSD §2.5) |

---

## 15. Anexos

- Entrevistas contextuales y mapeo de procesos DUEA (feb–mar 2026): evidencia cuantitativa de 20+ min/búsqueda. Disponible en `M2/bitacora_3`.
- Prototipo Hi-Fi AcredIA — Bitácora 3: validado con usuarios DUEA, tasa de éxito global 96,66 %, CSAT 8,67/10.
- Evaluación heurística del prototipo: severidades altas corregidas en v2 (validación en tiempo real, barra de progreso, mensajes de error empáticos).
- Análisis competitivo completo: DEVA UAJMS, QS, THE, AACSB, do-nothing — BRD v2 §6.
- Business Model Canvas — BRD v2 §7.
- Normativas CEUB y ARCU-SUR: documentación oficial para configuración de taxonomías de fases e indicadores.
- Estimaciones de mercado: Ministerio de Educación Bolivia 2024; CEUB Informe de Acreditaciones 2023; proyección propia equipo AcredIA.

---

## 16. Registro de Cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 14/05/2026 | Aylen Mariangel Gonzales Alvino | Versión inicial — generada a partir de BRD v2.0, PRD v1.0 y FSD v1.0 de AcredIA/SIGESA |

---

## Checklist Mínimo

- [x] TAM/SAM/SOM con fuentes (§3.1).
- [x] ≥ 2 personas completas (3 personas: [TD], [CC], [JD] — §4.2).
- [x] ≥ 3 JTBD (6 JTBD — §5).
- [x] ≥ 2 competidores en matriz (4 opciones — §6.1).
- [x] *Positioning statement* en 1 frase (§6.2).
- [x] Pricing y *go-to-market* esbozados (§8 y §9).
- [x] North Star + 3 KPIs fechados (7 KPIs — §10).
- [x] Requerimientos MRD-N-* priorizados (12 — §11).
- [x] 3 hipótesis a validar con criterio de éxito (6 hipótesis — §12).
- [x] Trazabilidad a BRD y PRD iniciada (12 mapeos MRD→BRD→PRD→FSD — §14).
- [ ] Revisión documentada por pares (pendiente).

---

*Documento elaborado por el equipo AcredIA — UMSS, Cochabamba, Bolivia, 2026.*
*MRD v1.0 (14/05/2026): generado desde `team/aylenGonzales/BRD_v2.md`, `PRD_v1.md` y `FSD_v1.md` siguiendo `MRD_TEMPLATE.md`.*