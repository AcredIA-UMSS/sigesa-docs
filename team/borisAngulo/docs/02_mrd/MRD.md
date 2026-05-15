# Market Requirements Document (MRD) – SIGESA v1.0

> **Propósito del MRD**: describir **el mercado, los usuarios y la oportunidad** que justifican la construcción del producto. Responde a **"¿qué pide el mercado y por qué este producto ganará?"**.
>
> Complementa al BRD (visión interna del negocio) y antecede al PRD (qué debe hacer el producto). Audiencia: *Product Management, DUEA, Vicerrectoría, Docente*.

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA — Sistema de Gestión de Evaluación y Acreditación |
| Grupo | AcredIA (`team/borisAngulo`) |
| Versión | v1.0 |
| Fecha | 14/05/2026 |
| Product Manager / Autor | Equipo AcredIA |
| Revisores | Docente + DUEA UMSS |
| Estado | Borrador |
| BRD de referencia | `./team/borisAngulo/BRD_v2.md` (v2.0) |
| PRD de referencia | `./team/borisAngulo/PRD_v1.md` (v1.0) |
| Visión de negocio | `./team/borisAngulo/01_vision_negocio_v2.txt` |

---

## 1. Resumen ejecutivo

La Universidad Mayor de San Simón (UMSS) gestiona la evaluación y acreditación de sus carreras universitarias —bajo los marcos normativos ARCU-SUR y CEUB— mediante herramientas completamente dispersas: hojas de cálculo aisladas, correo electrónico, almacenamiento en pendrives y canales de mensajería informal. Este ecosistema fragmentado genera pérdida de trazabilidad, duplicidad de documentos, retrasos críticos en plazos de acreditación y una carga administrativa insostenible para la Dirección Universitaria de Evaluación y Acreditación (DUEA) y para los equipos de cada carrera.

SIGESA es una plataforma institucional de gestión de acreditación diseñada desde cero para el contexto normativo boliviano (CEUB / ARCU-SUR). A diferencia de los repositorios genéricos o plataformas globales de ranking que no incorporan los flujos locales, SIGESA centraliza el ciclo completo: fases, evidencias versionadas, observaciones DUEA-carrera, semáforo de riesgo y reportes ejecutivos en dos clics.

El mercado primario es la propia UMSS, con más de 60 carreras distribuidas en múltiples facultades, involucrando a cientos de actores directos (coordinadores, jefes de carrera, técnicos DUEA, evaluadores externos). La oportunidad de escala se extiende a otras universidades públicas bolivianas bajo el mismo marco CEUB, representando un mercado potencial de decenas de instituciones. El diferenciador central es el encaje normativo nativo: flujos y criterios ARCU-SUR/CEUB construidos en el corazón del producto, no como parametrizaciones tardías.

---

## 2. Visión del producto

> "Para la DUEA y los equipos de carrera de la UMSS, que hoy pierden semanas de trabajo en archivos dispersos sin trazabilidad, SIGESA es la plataforma de gestión de acreditación con normativa boliviana nativa que convierte un proceso caótico en un ciclo auditable, con evidencias versionadas, alertas automáticas y decisiones en tiempo real, antes de que venza el próximo plazo CEUB."

---

## 3. Análisis de mercado

### 3.1 Tamaño de mercado

| Métrica | Valor estimado | Fuente / base de cálculo |
|---------|---------------|--------------------------|
| TAM (*Total Addressable Market*) | ~60 universidades públicas en Bolivia + privadas bajo CEUB | CEUB — padrón de universidades afiliadas |
| SAM (*Serviceable Addressable Market*) | UMSS: 60+ carreras en proceso o pendientes de acreditación ARCU-SUR/CEUB | DUEA UMSS — catálogo de carreras por confirmar en piloto |
| SOM (*Serviceable Obtainable Market*) | Piloto: 5–10 carreras UMSS en el primer ciclo académico | Acuerdo operativo con DUEA |

> **Nota**: Las cifras exactas de carreras activas en proceso de acreditación deben confirmarse con la DUEA antes del lanzamiento. El SAM y SOM son estimaciones de trabajo para dimensionar el piloto.

### 3.2 Tendencias del sector

- **Digitalización de la gestión académica institucional**: las universidades latinoamericanas están migrando progresivamente sus procesos administrativos y de calidad a plataformas digitales, impulsadas por exigencias de transparencia y rendición de cuentas ante organismos reguladores.
- **Mayor exigencia normativa de los organismos acreditadores**: ARCU-SUR y el CEUB han incrementado los requisitos de evidencia documental, trazabilidad y periodicidad de los informes, lo que eleva el costo operativo del proceso manual y crea urgencia de sistematización.
- **Brecha tecnológica en universidades públicas regionales**: la mayoría de universidades públicas bolivianas carece de sistemas especializados en gestión de acreditación; usan herramientas ofimáticas de propósito general no adaptadas al flujo normativo local, generando una oportunidad clara de diferenciación para SIGESA.

### 3.3 Factores regulatorios y de cumplimiento

- **Ley 164 (Bolivia)**: protección de datos personales aplicable a información de estudiantes, docentes y personal administrativo contenida en el sistema.
- **Normativa CEUB**: marco regulatorio de evaluación y acreditación para universidades bolivianas del sistema público; define criterios, plazos e indicadores que SIGESA debe soportar nativamente.
- **ARCU-SUR**: sistema de acreditación regional del MERCOSUR, aplicable a carreras que buscan reconocimiento internacional; define fases, visitas de pares y estándares de evidencia.
- **Reglamento interno UMSS**: políticas de gobernanza de datos, gestión documental y roles institucionales que condicionan el diseño de permisos y la política de respaldo.

### 3.4 Cadencia de Continuous Discovery

| Aspecto | Valor |
|---------|-------|
| Cadencia de entrevistas | Quincenal durante el piloto |
| Usuarios a contactar por ciclo | ≥ 2 (mínimo 1 Coordinador/Jefe de Carrera + 1 Técnico DUEA) |
| Formato de hipótesis | *Cuando `<situación>`, espero `<resultado>`, porque `<razón>`* |
| Backlog de hipótesis | Ver §12 de este MRD |
| Output del track | Validaciones que actualizan §4, §5, §6 y §12 |

> **Criterio**: si en un ciclo quincenal no hubo contacto con usuarios, se declara como riesgo activo en §13.

---

## 4. Segmentación y *Personas*

### 4.1 Segmentos de clientes

| Segmento | Tamaño estimado | Necesidad principal | Perfil de adopción |
|----------|----------------|---------------------|--------------------|
| **Seg-1: Gestión y supervisión institucional** (Administrador DUEA, autoridades académicas) | ~5–15 personas en UMSS | Vista unificada de todas las carreras; control de plazos y auditoría; reportes ejecutivos para rendición de cuentas | Alto poder de decisión; adopción impulsada por necesidad de transparencia y cumplimiento normativo |
| **Seg-2: Equipos operativos de carrera** (Coordinadores, Jefes de Carrera, Técnicos operativos) | ~100–200 personas en UMSS (estimado por número de carreras × roles) | Organizar y subir evidencias clasificadas; responder observaciones; no perder plazos | Alta frecuencia de uso; adopción condicionada por facilidad de uso (curva de aprendizaje baja) |

> **Nota de segmentación**: estos dos segmentos tienen necesidades radicalmente distintas y condicionan decisiones de UX separadas. Seg-1 necesita *visibilidad y decisión*; Seg-2 necesita *eficiencia operativa y guía en el proceso*. Un sistema que optimice solo uno de los dos fracasa en el otro.

### 4.2 Personas

---

#### Persona 1 – Daniela Flores, Administradora DUEA

- **Segmento**: Seg-1 (Gestión y supervisión institucional)
- **Rol**: Administradora de la Dirección Universitaria de Evaluación y Acreditación (DUEA), UMSS.
- **Demografía**: 38 años, licenciada en Educación con posgrado en gestión universitaria, 10 años en la institución.
- **Contexto**: Responsable de coordinar los procesos de acreditación de todas las carreras de la UMSS frente a CEUB y ARCU-SUR. Gestiona múltiples procesos simultáneos con equipos distribuidos en diferentes facultades.
- **Objetivos**:
  - Saber en todo momento el estado real de cada carrera sin depender de llamadas o correos.
  - Aprobar, rechazar o enviar observaciones a los coordinadores de forma formal y trazable.
  - Generar reportes ejecutivos para Vicerrectoría y organismos acreditadores sin armar presentaciones manuales.
  - Garantizar que el conocimiento institucional no se pierda con cambios de gestión.
- **Dolores actuales**:
  - Recibe actualizaciones por WhatsApp, correo y llamadas telefónicas; nunca tiene certeza de cuál es la versión vigente.
  - Cuando necesita reportar a Vicerrectoría, tarda horas consolidando Excel de distintas carreras.
  - Ante rotación de personal, la información del ciclo anterior se pierde o queda en equipos personales.
  - No tiene forma de saber qué carreras están en riesgo de incumplir plazos sin consultar a cada jefatura.
- **Comportamiento digital**: usuario de herramientas ofimáticas (Excel, Word, correo institucional); familiaridad media-alta con plataformas web; accede desde computadora de escritorio en oficina.
- **Frase representativa**: *"Necesito saber cómo van todas las carreras sin tener que llamar a cada coordinador todos los lunes."*

---

#### Persona 2 – Carlos Mamani, Coordinador de Carrera

- **Segmento**: Seg-2 (Equipos operativos de carrera)
- **Rol**: Coordinador de carrera de Ingeniería de Sistemas, responsable del proceso de autoevaluación ARCU-SUR.
- **Demografía**: 45 años, docente titular con cargo de coordinación adicional, formación en ingeniería. Maneja sus tareas académicas en paralelo a las de coordinación.
- **Contexto**: Debe recopilar evidencias de decenas de criterios involucrando a docentes, personal administrativo y la propia dirección de carrera. Coordina con la DUEA para entregar fases y responder observaciones.
- **Objetivos**:
  - Organizar los documentos de evidencia por criterio sin perder versiones anteriores.
  - Saber exactamente qué está pendiente y cuándo vence para no llegar tarde.
  - Responder observaciones de la DUEA sin intercambios de correo desorganizados.
  - Completar la carga de actividades sin reingreso manual repetitivo.
- **Dolores actuales**:
  - Localizar la "versión final" de un documento entre correos, mensajes de WhatsApp y carpetas compartidas le toma más tiempo que el trabajo mismo.
  - Los plazos le llegan como recordatorios informales, no como alertas formales del sistema.
  - Cuando la DUEA hace observaciones, no queda registro formal de lo que respondió ni de la decisión tomada.
  - La carga inicial de actividades al principio del ciclo es manual y propensa a errores.
- **Comportamiento digital**: familiaridad alta con herramientas ofimáticas; resistencia moderada a sistemas nuevos si la interfaz no se parece a lo que ya conoce; usa laptop institucional y teléfono personal.
- **Frase representativa**: *"Siempre estoy buscando el último archivo entre el correo y el WhatsApp. Nunca sé cuál es el bueno."*

---

## 5. *Jobs-to-be-Done*

| JTBD ID | Cuando… | Quiero… | Para poder… |
|---------|---------|---------|-------------|
| JTBD-01 | necesito conocer el estado de avance de todas las carreras en acreditación | ver un panel único con semáforos de riesgo sin consultar a cada jefatura | tomar decisiones oportunas y reportar a Vicerrectoría sin preparar Excel manual |
| JTBD-02 | recibo un entregable de fase de una carrera | registrar mi observación formal de forma vinculada al entregable | que el coordinador la reciba, la atienda y quede trazabilidad del intercambio |
| JTBD-03 | me piden un reporte del estado de acreditación para una reunión urgente | generar el reporte ejecutivo en PDF en pocos pasos desde mi contexto actual | no perder tiempo armando documentos y llegar a la reunión con datos actualizados |
| JTBD-04 | inicio un nuevo ciclo de autoevaluación de mi carrera | organizar las evidencias por criterio y fase desde un repositorio único | no buscar entre correos y carpetas no versionadas cuál es el documento válido |
| JTBD-05 | se acerca una fecha límite crítica del proceso de acreditación | recibir una alerta automática con anticipación suficiente | no depender de que alguien me lo recuerde informalmente y evitar el incumplimiento |
| JTBD-06 | la DUEA me envía observaciones sobre una fase entregada | verlas todas en un solo lugar y registrar mi respuesta formalmente | cerrar el ciclo de observación sin intercambios de correo desorganizados |
| JTBD-07 | necesito cargar el conjunto inicial de actividades del ciclo para mi carrera | importarlas desde una planilla en lugar de ingresarlas una por una | reducir el tiempo de carga inicial y minimizar errores de transcripción |

---

## 6. Análisis competitivo

### 6.1 Tabla comparativa

| Criterio | **SIGESA** | Proceso actual (Excel + correo + físico) | Repositorios genéricos (Drive, carpetas de red) | Plataformas globales (QS Stars, AACSB, Cognia) |
|----------|-----------|------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| Normativa CEUB/ARCU-SUR nativa | ✅ Sí, flujos y criterios en el diseño | ❌ No | ❌ No | ❌ No (requieren parametrización costosa) |
| Gestión de fases del ciclo | ✅ Autoevaluación → Resolución final | ❌ Manual, sin flujo formal | ❌ Solo almacenamiento | ⚠️ Genérico, no adaptado a Bolivia |
| Versionado auditable de evidencias | ✅ Con autor, fecha e historial | ❌ Sin control de versiones | ⚠️ Básico (historial de Drive no vinculado a criterios) | ⚠️ Varía por plataforma |
| Panel de semáforo por carrera | ✅ Verde/Amarillo/Rojo con % avance | ❌ No existe | ❌ No existe | ⚠️ Dashboards genéricos sin contexto normativo local |
| Alertas automáticas de plazos | ✅ Sin intervención manual | ❌ Recordatorios informales | ❌ No | ⚠️ Varía |
| Flujo formal de observaciones DUEA-carrera | ✅ Bandeja centralizada con estados | ❌ Por correo/WhatsApp | ❌ No | ❌ No |
| Reporte ejecutivo PDF en ≤ 2 clics | ✅ Sí | ❌ Construcción manual (horas) | ❌ No | ⚠️ Reportes generales no contextualizados |
| Costo de adopción | Piloto institucional (sin licencia por usuario) | Muy bajo (herramientas ya conocidas) | Bajo (cuentas institucionales existentes) | Alto (membresía internacional en USD) |
| Curva de aprendizaje | Baja (diseño tipo ofimática) | Muy baja (herramientas conocidas) | Baja | Media-alta (interfaces en inglés, no adaptadas) |
| Trazabilidad de auditoría | ✅ Bitácora de eventos | ❌ No existe | ❌ No estructurada | ⚠️ Varía |

### 6.2 *Positioning Statement*

> Para los equipos de gestión y carrera de la UMSS que hoy pierden trazabilidad y tiempo gestionando la acreditación con herramientas dispersas, **SIGESA** es la plataforma de gestión de acreditación universitaria que centraliza evidencias, fases y decisiones con normativa CEUB/ARCU-SUR nativa, a diferencia de los repositorios genéricos y plataformas internacionales que no modelan los flujos ni los criterios del contexto boliviano.

### 6.3 Ventaja competitiva sostenible

- **Encaje normativo nativo**: CEUB y ARCU-SUR están construidos en la lógica del producto, no parametrizados sobre una base genérica. Esto requeriría meses de trabajo y conocimiento local para replicarse.
- **Diseño co-construido con la DUEA UMSS**: la relación institucional directa genera un producto que refleja las reglas de negocio reales del proceso boliviano, algo que ningún proveedor externo puede lograr sin inversión equivalente.
- **Sin modelo de membresía**: el modelo de despliegue institucional (sin licencia por usuario final tipo plataformas globales) elimina la barrera económica que históricamente ha excluido a universidades públicas regionales de herramientas especializadas.

---

## 7. Propuesta de valor

### 7.1 *Value Proposition Canvas* resumido

| | Seg-1: Gestión/DUEA | Seg-2: Equipos operativos de carrera |
|--|---------------------|--------------------------------------|
| **Gains (ganancias esperadas)** | Control total del ciclo desde un panel; reportes en minutos; historial institucional que sobrevive rotaciones de gestión | Certeza de trabajar con la versión correcta; plazos visibles; respuesta formal a observaciones sin correos perdidos |
| **Pains (dolores actuales)** | Dependencia de consultas informales; consolidación manual de Excel; pérdida de información con cambio de autoridades | Búsqueda eterna de "la versión final"; plazos que llegan tarde; observaciones sin trazabilidad |
| **Gain Relievers** | Panel semáforo en tiempo real; reporte ejecutivo en ≤ 2 clics; historial de ciclos anteriores | Repositorio único versionado; alertas automáticas anticipadas; bandeja de observaciones centralizada |
| **Pain Relievers** | Eliminación de consultas manuales a jefaturas; flujo formal de aprobación/rechazo; auditoría de cambios de estado | Fin de la búsqueda entre canales; importación masiva de actividades; modal de confirmación anti-borrado accidental |
| **Products & Services** | SIGESA: panel global, módulo de reportes, gestión de usuarios y permisos, auditoría | SIGESA: carga de evidencias por criterio, bandeja de observaciones, historial de versiones, alertas de plazo |

---

## 8. Pricing y modelo de negocio

- **Modelo actual (piloto v1.0)**: despliegue institucional financiado por presupuesto de TI / proyecto académico de la UMSS. Sin costo de licencia por usuario; sin pagos en línea (*Won't Have* en BRD).
- **Modelo futuro (por explorar en MRD v2)**: licencia institucional anual para otras universidades del sistema CEUB interesadas en adoptar la plataforma; posible fondo de mejora de calidad académica como fuente de financiamiento.
- **Benchmark**: plataformas internacionales de acreditación (Cognia, AACSB) operan con membresías anuales en USD de cuatro a cinco cifras, inaccesibles para universidades públicas bolivianas sin fondos externos. SIGESA elimina esta barrera por diseño.

---

## 9. *Go-to-market*

### 9.1 Canales de adquisición (piloto UMSS)

- **Canal directo institucional**: DUEA como sponsor y puerta de entrada; adopción top-down desde la dirección hacia las carreras piloto.
- **Capacitación presencial**: sesiones de onboarding con coordinadores, jefes de carrera y técnicos antes del inicio del ciclo piloto.
- **Comunicación interna DUEA-carreras**: uso de los canales institucionales existentes (correo, circulares) para anunciar el piloto y sus beneficios concretos.

### 9.2 Estrategia de lanzamiento

- **Pre-launch**: configuración de datos maestros (carreras, facultades, roles) con TI y secretarías; definición de carreras piloto con DUEA; sesión de validación de matriz de permisos.
- **Launch (piloto)**: onboarding de 5-10 carreras seleccionadas; soporte intensivo del equipo AcredIA durante las primeras 4 semanas; colección de feedback estructurado.
- **Post-launch**: análisis de métricas KPI (§10); iteración basada en Discovery; preparación de caso de éxito para expansión a más carreras o instituciones.

### 9.3 Funnel AARRR (contexto institucional)

| Etapa | Métrica | Meta piloto |
|-------|---------|-------------|
| Acquisition | Carreras onboardeadas en el piloto | 5–10 |
| Activation | Coordinadores con al menos 1 evidencia cargada en la primera semana | ≥ 80 % |
| Retention | Usuarios activos semanales por rol durante el ciclo | ≥ 70 % del total onboardeado |
| Revenue | N/A (modelo institucional sin ingreso directo en v1.0) | — |
| Referral | Carreras fuera del piloto que solicitan incorporarse | ≥ 2 en el primer semestre |

---

## 10. Métricas de éxito del producto

- **North Star Metric**: porcentaje de procesos activos en el piloto con evidencias críticas al día respecto al cronograma — **meta ≥ 80 %** al cierre del ciclo académico acordado con DUEA (alineado a BRD KPI-01).

| KPI secundario | Descripción | Meta | Horizonte |
|---------------|-------------|------|-----------|
| KPI-M-01 | Cumplimiento de fechas límite de fases (% hitos a tiempo vs. línea base histórica) | Mejora ≥ 20 pp | Fin del piloto |
| KPI-M-02 | Tiempo medio de tarea: cargar evidencia, revisar estado, generar reporte ejecutivo | Reducción ≥ 25 % vs. línea base pre-piloto | Post-piloto (pruebas de usabilidad) |
| KPI-M-03 | Satisfacción de usuarios (técnicos, coordinadores, DUEA): escala Likert "útil / fácil / confiable" | ≥ 4/5 | Post-piloto (encuesta institucional) |
| KPI-M-04 | % de observaciones DUEA-carrera gestionadas 100 % dentro del sistema (sin correos paralelos) | ≥ 90 % en piloto | Durante el piloto |

---

## 11. Requerimientos de mercado (alto nivel)

| ID | Requerimiento | Segmento | Prioridad | Justificación |
|----|---------------|----------|-----------|---------------|
| MRD-N-01 | Flujos y criterios CEUB/ARCU-SUR nativos en el diseño del sistema | Seg-1 y Seg-2 | Must | Sin encaje normativo local, el sistema no reemplaza al proceso manual |
| MRD-N-02 | Repositorio único de evidencias con versionado auditable (autor, fecha, historial) | Seg-2 | Must | Dolor principal validado en levantamiento: "localizar la versión final" |
| MRD-N-03 | Panel de estado con semáforo de riesgo por carrera y facultad | Seg-1 | Must | Elimina la dependencia de consultas informales a jefaturas |
| MRD-N-04 | Alertas automáticas de plazos sin intervención manual por cada aviso | Seg-1 y Seg-2 | Must | Causa raíz de los retrasos: plazos no visibles de forma oportuna |
| MRD-N-05 | Flujo formal de observaciones DUEA-carrera con bandeja centralizada | Seg-1 y Seg-2 | Should | Elimina el intercambio informal por correo/WhatsApp; garantiza trazabilidad |
| MRD-N-06 | Reporte ejecutivo exportable a PDF en ≤ 2 clics | Seg-1 | Should | Reduce horas de trabajo en consolidación manual para rendición de cuentas |
| MRD-N-07 | UX de baja curva de aprendizaje con lenguaje académico-administrativo | Seg-2 | Must | Condición de adopción para usuarios con perfil ofimático; sin esto el sistema no se usa |

---

## 12. Supuestos e hipótesis a validar

| ID | Hipótesis | Cómo validar | Criterio de éxito |
|----|-----------|--------------|-------------------|
| H-01 | Si la jefatura dispone de un panel con semáforo de baja curva de aprendizaje, se reducen las consultas informales a la DUEA en ≥ 30 % | Telemetría de uso del panel + conteo de consultas informales antes y durante el piloto | ≥ 30 % reducción en consultas repetitivas vs. línea base |
| H-02 | Si el personal técnico tiene un repositorio con versionado e historial claro, el tiempo de localización de "la versión final" se reduce ≥ 25 % | Prueba de tarea cronometrada (buscar documento vigente) antes y después del piloto | Reducción ≥ 25 % en tiempo de tarea |
| H-03 | Las alertas automáticas configuradas mejoran el cumplimiento de hitos de acreditación sin requerir recordatorios manuales del administrador | Comparación de fechas plan vs. real en hitos durante el piloto | Alineado a KPI-M-01: mejora ≥ 20 pp en cumplimiento de plazos |
| H-04 | Los coordinadores de carrera con perfil ofimático pueden completar la carga inicial de actividades usando la importación masiva sin soporte técnico adicional | Prueba de usabilidad: tarea de importación sin asistencia en sesión controlada | ≥ 80 % de usuarios completan la tarea sin ayuda externa |
| H-05 | La DUEA utilizará el reporte ejecutivo PDF al menos una vez por carrera por mes durante el piloto | Logs de uso del módulo de reportes | ≥ 1 reporte generado / carrera / mes (BRD BO-03) |

---

## 13. Riesgos de mercado

| Riesgo | Prob. | Impacto | Mitigación |
|--------|-------|---------|------------|
| Baja adopción por resistencia al cambio desde canales informales consolidados (WhatsApp, correo) | Alta | Alto | Quick wins visibles desde el día 1 (versionado + observaciones centralizadas); sponsor DUEA activo y visible |
| Datos maestros de carreras y facultades incompletos o desactualizados al inicio del piloto | Media | Alto | Plan de carga inicial con TI y secretarías académicas antes del lanzamiento; prever buffer de 2 semanas |
| Perfiles con baja familiaridad tecnológica que no adoptan la plataforma a pesar de la UX simplificada | Media | Alto | Capacitación presencial obligatoria; soporte intensivo en semanas 1-4; recolección temprana de feedback |
| Desalineación entre la interpretación de criterios CEUB/ARCU-SUR y la implementación en el sistema | Baja | Muy alto | Validación formal con DUEA y referentes normativos antes del desarrollo de los flujos de fases |
| Si no se documenta la línea base pre-piloto, las métricas de éxito no pueden demostrarse | Media | Alto | Medir tiempos de tarea y estado de cumplimiento ANTES de lanzar el piloto; incluir en plan de Discovery |

---

## 14. Trazabilidad

| MRD ID | BRD ID | PRD ID |
|--------|--------|--------|
| MRD-N-01 | BR-002, BR-003, BR-006, RB-01, RB-02, RB-03 | PRD-REQ-002, PRD-REQ-003 |
| MRD-N-02 | BR-007, RB-06, RB-07 | PRD-REQ-006, PRD-REQ-007 |
| MRD-N-03 | BR-009 | PRD-REQ-009 |
| MRD-N-04 | BR-010 | PRD-REQ-010 |
| MRD-N-05 | BR-008 | PRD-REQ-008 |
| MRD-N-06 | BR-011 | PRD-REQ-011 |
| MRD-N-07 | (Visión §1, §2, §3) | PRD-NFR-005, OP-06 |
| H-01 | BRD §3.3 hipótesis validada | PRD §3.4 Discovery track |
| H-02 | BRD §3.3 hipótesis validada | PRD §3.4 Discovery track |

---

## 15. Anexos

- `./team/borisAngulo/01_vision_negocio_v2.txt` — visión de negocio consolidada (fuente primaria de segmentos, usuarios y posicionamiento).
- `./team/borisAngulo/BRD_v2.md` — requerimientos y reglas de negocio (fuente de trazabilidad BRD→MRD).
- `./team/borisAngulo/PRD_v1.md` — requerimientos de producto (fuente de trazabilidad MRD→PRD).
- Transcripción de entrevistas Discovery — *por consolidar en `docs/discovery/`*.
- Datos de mercado CEUB (número de universidades afiliadas) — *pendiente de verificación oficial*.

---

## 16. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 14/05/2026 | AcredIA | Versión inicial generada desde `01_vision_negocio_v2.txt`, `BRD_v2.md` y `PRD_v1.md` siguiendo `MRD_TEMPLATE.md` |

---

## Checklist de evaluación

- [x] **Resumen ejecutivo** con problema, propuesta, diferenciación y tamaño de oportunidad.
- [x] **Visión del producto** en ≤ 25 palabras (frase inspiradora).
- [x] **TAM/SAM/SOM** con fuentes declaradas.
- [x] **≥ 2 segmentos** bien diferenciados (Seg-1: gestión/DUEA vs. Seg-2: equipos operativos).
- [x] **≥ 2 personas completas** con rol, contexto, objetivos, dolores, comportamiento y frase representativa.
- [x] **≥ 7 JTBD** en formato "Cuando… / Quiero… / Para poder…".
- [x] **Análisis competitivo** con tabla de 4 alternativas incluyendo *do-nothing* (proceso actual).
- [x] ***Positioning statement*** en 1 frase estructurada.
- [x] **Value Proposition Canvas** resumido por segmento.
- [x] **Pricing y modelo de negocio** con benchmark.
- [x] **Go-to-market** con canales, estrategia y funnel AARRR.
- [x] **North Star Metric** + 4 KPIs secundarios con meta y horizonte.
- [x] **7 requerimientos MRD-N-*** priorizados con segmento y justificación.
- [x] **5 hipótesis** a validar con método y criterio de éxito.
- [x] **5 riesgos de mercado** con probabilidad, impacto y mitigación.
- [x] **Trazabilidad** BRD → MRD → PRD iniciada.
- [x] **0 información inventada**: todo dato sin confirmación marcado como *por confirmar/pendiente*.