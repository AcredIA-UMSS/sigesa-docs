# Market Requirements Document (MRD)

## Sistema de Evaluación, Aseguramiento de la Calidad y Acreditación de Carreras — UMSS

### SIGESA / AcredIA — *Sistema Inteligente de Gestión y Seguimiento de Acreditaciones*

---

## Portada y control documental

| Campo | Valor |
|-------|-------|
| **Tipo** | MRD estratégico–institucional (mercado, usuarios, competencia, posicionamiento, hipótesis, validación) |
| **Institución** | Universidad Mayor de San Simón (UMSS), Cochabamba, Bolivia |
| **Unidad focal** | Dirección Universitaria de Evaluación y Acreditación (DUEA) y ecosistema de calidad académica |
| **Producto** | SIGESA (marca operativa AcredIA) |
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Relación con BRD** | `docs/BRD_SIGESA_Institucional_Completo.md` · `docs/BRD_v1.md` |
| **Relación con PRD/FSD** | `docs/PRD_v1.md` · `docs/FSD_v1.md` · `docs/LFSD.md` |
| **Audiencia** | Sponsor institucional, Product Management, Dirección de TI, Decanatos, Vicerrectorado, DUEA, equipos de calidad, proveedor |
| **Estado** | Borrador para validación con discovery continuo |
| **Metodología** | Segmentación B2B2C institucional, JTBD, VoC, benchmarking, hipótesis testables, roadmap evolutivo |

---

## Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)  
2. [Introducción y contexto institucional](#2-introducción-y-contexto-institucional-del-sistema)  
3. [Siete pilares del análisis de mercado y negocio](#3-siete-pilares-del-análisis-de-mercado-y-negocio-marco-analítico)  
4. [Problema actual y oportunidad de mercado](#4-problema-actual-y-oportunidad-de-mercadotransformación-digital)  
5. [Segmentación de mercado institucional](#5-segmentación-de-mercado-institucional)  
6. [Personas por segmento](#6-personas-user-buyer-personas-por-segmento)  
7. [Jobs To Be Done (JTBD) por segmento](#7-jobs-to-be-done-jtbd-por-segmento)  
8. [Voz del cliente (VoC)](#8-voz-del-cliente-voc)  
9. [Competencia y benchmarking](#9-análisis-de-competencia-y-benchmarking)  
10. [Propuesta de valor y posicionamiento](#10-propuesta-de-valor-y-posicionamiento-estratégico)  
11. [Hipótesis de negocio y de adopción](#11-hipótesis-de-negocio-hipótesis-de-adopción-y-validaciones-esperadas)  
12. [Necesidades funcionales y no funcionales desde el mercado](#12-necesidades-funcionales-y-no-funcionales-derivadas-del-mercado)  
13. [Factores críticos de éxito](#13-factores-críticos-de-éxito-del-sistema)  
14. [Riesgos de adopción y barreras organizacionales](#14-riesgos-de-adopción-y-barreras-organizacionales)  
15. [KPIs y métricas de validación del producto](#15-kpis-y-métricas-de-validación-del-producto)  
16. [Roadmap estratégico y visión evolutiva](#16-roadmap-estratégico-y-visión-evolutiva-del-sistema)  
17. [Recomendaciones estratégicas y conclusiones](#17-recomendaciones-estratégicas-y-conclusiones)  
18. [Trazabilidad y cadencia de discovery](#18-trazabilidad-y-cadencia-de-continuous-discovery)  
19. [Anexos](#19-anexos)

---

## 1. Resumen ejecutivo

El mercado institucional de **software para acreditación y aseguramiento de la calidad** en universidades públicas bolivianas se caracteriza por una **tensión estructural**: por un lado, organismos como el **CEUB** y marcos regionales (**ARCU-SUR**) exigen **evidencias trazables**, **plazos rígidos** y **gobernanza documental**; por otro, las unidades operativas (DUEA, coordinaciones de carrera, decanatos) suelen trabajar con **herramientas genéricas** (hojas de cálculo, correo, almacenamiento disperso, mensajería informal), lo que genera **costos ocultos** en tiempo, coordinación y **riesgo reputacional**.

**SIGESA** se posiciona como **plataforma de transformación digital** orientada a la **evaluación y acreditación de carrera** en la UMSS: centraliza el ciclo de vida de evidencias, automatiza flujos de validación, habilita **inteligencia gerencial** para autoridades y un **canal de transparencia** para estudiantes y egresados. Su **ventaja competitiva sostenible** radica en el **cumplimiento normativo nativo** (taxonomías CEUB/ARCU-SUR) y en la **profundidad de integración con el proceso real** de la DUEA y las carreras, frente a soluciones genéricas de ranking o gestión documental sin lógica acreditadora.

Este MRD define **cuatro segmentos** diferenciados (operativo de carrera; aseguramiento DUEA; gobierno académico; comunidad y externos), con **personas**, **JTBD** (funcional, emocional, social), **VoC**, **benchmarking** nacional e internacional, **hipótesis testables**, **necesidades de mercado** (incluidas no funcionales), **factores críticos de éxito**, **riesgos de adopción**, **KPIs de validación** y un **roadmap evolutivo** alineado a una visión de producto de tres a cinco años. El documento constituye **base formal** para PRD, diseño de producto y decisiones de inversión y gobernanza institucional.

---

## 2. Introducción y contexto institucional del sistema

### 2.1 Naturaleza del “mercado” en una universidad pública

En el contexto UMSS, el término **mercado** no se limita a intercambio monetario: designa el **ecosistema de demandantes y oferentes de valor** en torno a la calidad académica: **organismos acreditadores**, **autoridades**, **unidades de carrera**, **docencia**, **estudiantes** y **proveedores tecnológicos**. El “producto” SIGESA compite por **atención**, **confianza**, **presupuesto de transformación digital** y **adopción efectiva** frente al **status quo** (procesos manuales) y frente a **alternativas parciales** (repositorios, suites internacionales, desarrollos aislados por facultad).

### 2.2 Rol de la DUEA y del proceso de acreditación

La **DUEA** articula la relación entre la universidad y los marcos de evaluación externa, además de promover prácticas internas de **autoevaluación** y **mejora continua**. La **acreditación de carrera** es un proceso de alto **contenido documental** y de **coordinación multiactor**: implica síntesis de políticas, perfiles, infraestructura, resultados de aprendizaje, vinculación social, entre otros ejes, según convocatorias y criterios vigentes.

### 2.3 SIGESA como respuesta de producto

SIGESA se concibe como **sistema activo de gestión** (no como archivo pasivo): habilita **flujos**, **versiones**, **observaciones auditables**, **alertas**, **paneles** y **reportes**, reduciendo la fragmentación que hoy desplaza carga cognitiva hacia personas clave y hacia canales informales.

### 2.4 Alineación con políticas de digitalización y calidad

| Eje institucional | Lectura de mercado interno |
|-------------------|----------------------------|
| Transparencia | Demanda creciente de consulta de estado de carrera sin fricción |
| Eficiencia | Presión por reducir retrabajo en ventanas de convocatoria |
| Gobernanza de datos | Necesidad de fuente única y trazabilidad ante auditorías |
| Experiencia de usuario académico | Expectativa de interfaces similares a servicios digitales cotidianos |

---

## 3. Siete pilares del análisis de mercado y negocio (marco analítico)

El análisis se organiza en **siete componentes fundamentales**, cada uno desarrollado a lo largo del documento y sintetizado aquí.

| # | Componente | Pregunta guía | Salida principal del MRD |
|---|------------|---------------|--------------------------|
| **P1** | **Demanda y jobs institucionales** | ¿Qué “trabajos” críticos deben cumplir los segmentos bajo presión normativa y académica? | JTBD (§7), necesidades (§12) |
| **P2** | **Dolor, fricción y costo de alternativas** | ¿Por qué el status quo es insostenible y cuánto “cuesta” en tiempo y riesgo? | Problema/oportunidad (§4), VoC (§8) |
| **P3** | **Estructura competitiva y sustitutos** | ¿Contra qué compite SIGESA realmente (incluido *do-nothing*)? | Benchmarking (§9) |
| **P4** | **Diferenciación y posicionamiento** | ¿Por qué elegir SIGESA frente a herramientas genéricas o plataformas globales? | Propuesta de valor (§10) |
| **P5** | **Adopción y dinámica organizacional** | ¿Qué barreras impiden el cambio de conducta canal por canal? | Riesgos y barreras (§14), hipótesis adopción (§11) |
| **P6** | **Validación y evidencia (discovery)** | ¿Cómo sabremos que el mercado “compra” el producto en el sentido institucional? | Hipótesis, KPIs (§11, §15), discovery (§18) |
| **P7** | **Trayectoria de producto y expansión** | ¿Cómo evoluciona el producto sin perder foco normativo? | Roadmap (§16), conclusiones (§17) |

**Coherencia metodológica:** los segmentos y personas (§5–6) alimentan JTBD y VoC (§7–8); el benchmarking (§9) contrasta con la propuesta de valor (§10); las hipótesis (§11) se vinculan a KPIs (§15) y al roadmap (§16); los factores críticos de éxito (§13) concentran las palancas de mitigación frente a riesgos de adopción (§14).

---

## 4. Problema actual y oportunidad de mercado/transformación digital

### 4.1 Diagnóstico del problema (mercado interno)

El problema central no es la ausencia de documentos, sino la **desalineación entre la complejidad normativa** y la **madurez digital del proceso**: múltiples versiones en paralelo, metadatos inconsistentes, comunicación por canales no auditables y ausencia de una **vista única de estado** confiable para la toma de decisiones. En la práctica boliviana universitaria, esto se traduce en **picos de carga** previos a visitas o entregas, **retrabajo** entre coordinación de carrera y DUEA, y **asimetría informativa** entre autoridades y operación.

**Evidencia referencial (línea base cualitativa/cuantitativa, trabajo de campo 2026, validar con DUEA):** tiempos elevados de localización de la versión correcta de un documento; fatiga operativa; duplicidad de archivos; dificultad para compilar reportes ejecutivos sin detener el trabajo técnico.

### 4.2 Oportunidad de mercado

| Dimensión | Oportunidad | Lectura para UMSS |
|-----------|-------------|-------------------|
| **Mercado sustituto débil** | Plataformas internacionales de ranking no cubren CEUB/ARCU-SUR | Espacio para solución **contextualizada** |
| **Transformación digital** | Modernización de trámites y cultura de datos | SIGESA como **infraestructura** de calidad |
| **Transparencia** | Estudiantes y egresados demandan claridad sobre acreditación | Portal público como **valor percibido** social |
| **Escalabilidad regional** | Otras universidades del ecosistema CEUB enfrentan problemas análogos | Posible **extensión de mercado** post-consolidación UMSS |

### 4.3 Transformación digital: más allá de la “digitalización de archivos”

La oportunidad madura cuando el proyecto se entiende como **rediseño del flujo de valor**: (1) captura estructurada de evidencias; (2) validación con reglas y trazabilidad; (3) retroalimentación oportuna a carrera; (4) inteligencia para dirección; (5) publicación controlada al exterior. Sin estos elementos, la digitalización degenera en **repositorio pasivo** que no reduce el riesgo ni el costo de coordinación.

---

## 5. Segmentación de mercado institucional

Se definen **cuatro segmentos** claramente diferenciados por **poder de decisión**, **frecuencia de uso**, **tipo de valor buscado** y **relación con el proceso de acreditación**.

### 5.1 Matriz de segmentos

| ID | Segmento | Actores típicos | Principal “job” de mercado | Buyer vs User |
|----|----------|-----------------|---------------------------|----------------|
| **S1** | **Operativo de carrera y calidad académica** | Coordinador/a o director/a de carrera; comité de autoevaluación; docentes aportantes de evidencia | Cumplir plazos con evidencia válida y retroalimentación clara | User primario; Buyer indirecto (decanato/DUEA impulsa) |
| **S2** | **Aseguramiento institucional y acreditación (DUEA)** | Jefatura DUEA; técnicos; especialistas en indicadores | Garantizar trazabilidad, homogeneidad y defensa ante auditores externos | Buyer institucional (presupuesto DUEA/UMSS); User intensivo |
| **S3** | **Gobierno académico y decisión** | Decanos; vicerrectorado; direcciones académicas | Visibilidad de riesgos, priorización y rendición de cuentas | Buyer estratégico; User de lectura/reportes |
| **S4** | **Comunidad universitaria y ecosistema externo** | Estudiantes, egresados, empleadores; evaluadores externos; CEUB/ARCU-SUR como “mercado regulador” | Confianza, verificación y baja fricción informativa | User de consulta; “Buyer” regulatorio indirecto |

### 5.2 Diferenciación entre segmentos (ejemplo aplicado)

- **S1 vs S2:** S1 produce **evidencia granular** y vive el ciclo de corrección; S2 **homogeniza criterios** y **certifica** calidad documental frente al marco externo.  
- **S3 vs S4:** S3 consume **agregados** para decisiones (semáforos, rankings internos de avance); S4 consume **hechos publicados** (estado, certificados) sin acceso a borradores.

---

## 6. Personas (User / Buyer personas por segmento)

> Las personas siguientes son **arquetipos** basados en roles reales en universidades bolivianas y en el modelo SIGESA documentado en el BRD; deben **calibrarse** con entrevistas (nombres ficticios).

### 6.1 Segmento S1 — Persona operativa: **María Elena Rojas**, Coordinadora de Carrera

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Coordinación de carrera (pregrado), Facultad de Ciencias y Tecnología (ejemplo) |
| **Edad / experiencia** | 42 años; 10 años en gestión académica |
| **Contexto** | Comparte tiempo entre docencia, gestión de malla y convocatorias de acreditación |
| **Objetivos** | Entregar paquetes de evidencia completos; reducir observaciones recurrentes; proteger a su equipo docente de sobrecarga administrativa |
| **Dolores** | Plazos inamovibles; versiones conflictivas en Drive/correo; falta de confirmación formal de “recibido conforme” |
| **Comportamiento digital** | Dominio medio de Office; uso intensivo de WhatsApp por pragmatismo; tolerancia baja a sistemas lentos o con sesiones inestables |
| **Frase** | *“Necesito saber qué falta y con qué formato, no adivinar qué archivo es el que valen.”* |
| **Buyer / User** | **User** principal; influencia sobre decanato para apoyo de carga docente |

### 6.2 Segmento S1 — Persona académica aportante: **Dr. Carlos Méndez**, Docente referente de indicador

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Docente titular; responsable de aportar evidencias de resultados de aprendizaje |
| **Objetivos** | Cumplir pedidos de coordinación sin perder horas de preparación de clase |
| **Dolores** | Pedidos urgentes mal especificados; repetición de envíos por cambios de versión |
| **Frase** | *“Si me dan una plantilla clara y un solo lugar para subir, lo hago; si no, todo vuelve al correo.”* |
| **Buyer / User** | **User** ocasional; su adopción depende de UX y de política de carrera |

### 6.3 Segmento S2 — Persona técnica: **Lic. Andrea Flores**, Técnica DUEA (validación)

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Revisión técnica de evidencias; comunicación de observaciones |
| **Objetivos** | Estandarizar criterios; evitar retrabajo pre-auditoría; mantener trazabilidad impecable |
| **Dolores** | Buscar documentos entre canales; falta de metadatos; presión temporal concentrada |
| **Frase** | *“Si no está en el sistema con versión y sello de estado, no puedo defenderlo ante cualquier auditor.”* |
| **Buyer / User** | **User** intensivo; influencia en definición de reglas de negocio |

### 6.4 Segmento S2 — Persona buyer institucional: **Lic. Claudia Sevilla** (arquetipo Jefatura DUEA)

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Dirección de la DUEA; sponsor del cambio |
| **Objetivos** | Cumplimiento normativo; visibilidad gerencial; reducir riesgo institucional |
| **Dolores** | Incertidumbre sobre estado real por carrera; dependencia de reuniones para saber “dónde estamos” |
| **Frase** | *“Necesito un tablero que mienta poco y que podamos explicar en Consejo sin excusas técnicas.”* |
| **Buyer / User** | **Buyer** y **User** de dashboards y reportes |

### 6.5 Segmento S3 — Persona de gobierno: **M.Sc. Fernando Vargas**, Decano

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Decanato; múltiples carreras bajo responsabilidad |
| **Objetivos** | Priorizar apoyo a carreras en riesgo; equilibrar recursos; rendir cuentas al vicerrectorado |
| **Dolores** | Información llega tarde o fragmentada; dificultad para comparar avance entre carreras |
| **Frase** | *“Quiero ver en qué carrera meto presión y en cuál solo acompaño, sin micromanagear.”* |
| **Buyer / User** | **Buyer** parcial (apoyo presupuestario/cultural); **User** de lectura |

### 6.6 Segmento S4 — Persona comunidad: **Valeria Quispe**, Estudiante / egresada

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Consulta estado de acreditación para validación laboral o continuidad de estudios |
| **Objetivos** | Obtener información oficial rápida, sin filas |
| **Dolores** | Respuestas contradictorias en ventanillas; desconfianza por rumores |
| **Frase** | *“Quiero ver en la web de la UMSS el estado oficial, no un PDF que me mandaron por WhatsApp.”* |
| **Buyer / User** | **User** público; valida legitimidad del sistema |

### 6.7 Segmento S4 — Persona externa evaluadora: **Mg. Patricia Lemos** (visitante / par evaluador)

| Atributo | Descripción |
|----------|-------------|
| **Rol** | Evaluadora externa en visita o revisión documental |
| **Objetivos** | Verificar coherencia, trazabilidad y completitud con baja fricción |
| **Dolores** | Paquetes desordenados; dificultad para seguir el hilo versional |
| **Frase** | *“Si me dan acceso estructurado, ahorramos tiempo a todos; si no, pedimos de nuevo y generamos observaciones.”* |
| **Buyer / User** | **User** eventual (lectura controlada); su satisfacción impacta **resultado de acreditación** |

---

## 7. Jobs To Be Done (JTBD) por segmento

### 7.1 Marco teórico aplicado

Para cada segmento se explicitan jobs **funcionales** (tareas), **emocionales** (seguridad, tranquilidad, orgullo) y **sociales** (cómo quiere verse el actor ante pares, autoridades o comunidad).

### 7.2 Segmento S1 — Coordinación de carrera y comité

| JTBD-ID | Situación (*When*) | Motivación (*I want*) | Resultado (*So I can*) | Funcional | Emocional | Social |
|---------|---------------------|------------------------|-------------------------|------------|-----------|--------|
| S1-J1 | Se acerca una fecha límite CEUB | consolidar evidencias en un solo flujo | entregar sin reprocesos masivos de última hora | Agrupar, etiquetar, versionar | Reducir ansiedad | Demostrar liderazgo ante decanato |
| S1-J2 | DUEA observa un indicador | corregir con claridad de requisitos | cerrar el ciclo sin idas y vueltas ambiguas | Flujo de observaciones | Sentir control | Proteger reputación de la carrera |
| S1-J3 | Docentes aportan archivos dispersos | estandarizar la recolección | no pelear por formatos en cada convocatoria | Plantillas y checklist | Menos conflicto interpersonal | Coordinar sin “policía” percibida |

### 7.3 Segmento S2 — DUEA

| JTBD-ID | When | I want | So I can | Funcional | Emocional | Social |
|---------|------|--------|----------|-----------|-----------|--------|
| S2-J1 | Inicia temporada de revisión masiva | priorizar colas por riesgo y fecha | proteger cumplimiento global | Tableros, filtros, reglas | Confianza en el proceso | Sostener credibilidad institucional |
| S2-J2 | Auditor solicita trazabilidad | demostrar cadena documental | evitar observaciones por forma | Logs, versiones, export | Seguridad profesional | Mostrar rigor ante externos |
| S2-J3 | Cambia un criterio normativo | actualizar plantillas sin caos | mantener alineación CEUB/ARCU-SUR | Motor de plantillas versionado | Menos frustración | Liderar modernización |

### 7.4 Segmento S3 — Gobierno académico

| JTBD-ID | When | I want | So I can | Funcional | Emocional | Social |
|---------|------|--------|----------|-----------|-----------|--------|
| S3-J1 | Consejo pide estado | obtener síntesis confiable en minutos | decidir dónde intervenir | Reportes y semáforos | Tranquilidad ante preguntas duras | Aparentar control informado |
| S3-J2 | Una carrera va en rojo | entender causa raíz documental | asignar apoyos focalizados | Drill-down agregado | Evitar sorpresas | Ser visto como gestor proactivo |

### 7.5 Segmento S4 — Comunidad y externos

| JTBD-ID | When | I want | So I can | Funcional | Emocional | Social |
|---------|------|--------|----------|-----------|-----------|--------|
| S4-J1 | Empresa pide constancia | verificar estado oficial en línea | validar título/carrera sin intermediarios | Portal público | Confianza | Evitar vergüenza por datos dudosos |
| S4-J2 | Evaluadora revisa paquete | acceder a estructura clara | emitir juicio técnico eficiente | Vistas de auditoría | Profesionalismo percibido | Mantener reputación del organismo |

---

## 8. Voz del cliente (VoC)

### 8.1 Matriz VoC consolidada por segmento

| Segmento | Necesidades explícitas | Frustraciones (*pain points*) | Expectativas | Citas tipo (sintéticas) |
|----------|------------------------|---------------------------------|----------------|-------------------------|
| **S1** | Claridad de requisitos; confirmación de recepción; menos canales | “¿Cuál es la versión final?”; correcciones tardías; carga lenta | Sistema “tan simple como el correo pero serio” | *“Decime qué falta en lista cerrada.”* |
| **S2** | Trazabilidad; estandarización; búsqueda potente | Doble trabajo; presión de plazos; miedo a huecos documentales | Defendibilidad ante terceros | *“Sin log no existe.”* |
| **S3** | KPIs; comparabilidad entre carreras; export para actas | Datos inconsistentes; reportes armados a mano | Lectura ejecutiva en pocos clics | *“Para Consejo, no para ingenieros.”* |
| **S4** | Información oficial; rapidez; accesibilidad móvil | Rumores; respuestas informales; desconfianza | Transparencia tipo “servicio ciudadano” | *“Que la UMSS lo diga en su web.”* |

### 8.2 Priorización de necesidades (Kano simplificado institucional)

| Necesidad | Tipo Kano | Implicancia para roadmap |
|-----------|-----------|--------------------------|
| Evidencias con estado y versión | **Básico** | Sin esto, el producto no es creíble |
| Notificaciones de plazo | **Básico** | Esperado en cualquier workflow moderno |
| Dashboard decanal | **Performance** | Diferencia fuerte de percepción de valor |
| Portal público elegante | **Delighter** (incremental) | Alto impacto reputacional, no bloquea MVP |

### 8.3 Tensiones típicas (gestión de conflictos de mercado interno)

| Tensión | Descripción | Implicancia de producto |
|---------|-------------|-------------------------|
| **Velocidad vs rigor** | Coordinadores quieren agilidad; DUEA exige formalidad | UX que guíe sin relajar reglas auditables |
| **Centralización vs autonomía de facultad** | Decanatos defienden ritmos propios | Parametrización por facultad y gobernanza clara |
| **Transparencia vs borradores** | Comunidad quiere ver todo; carrera teme exponer borradores | Publicación explícita y estados no públicos por defecto |

---

## 9. Análisis de competencia y benchmarking

### 9.1 Definición del universo competitivo

SIGESA compite en **tres planos**: (1) **status quo** (Office + correo + almacenamiento informal); (2) **sustitutos nacionales o regionales** (portales informativos, repositorios parciales, desarrollos internos); (3) **referentes internacionales** (plataformas de *quality assurance*, LMS con módulos de evidencias, suites de rankings).

### 9.2 Benchmarking comparativo (ilustrativo — actualizar con demos y RFP)

| Criterio | Status quo UMSS típico | Repositorio/Drive institucional | DEVA / portales informativos (referencia ecosistema boliviano) | LMS académico (Moodle, etc.) | Suites internacionales (AACSB, QS/THE, etc.) | **SIGESA (objetivo)** |
|----------|------------------------|----------------------------------|----------------------------------------------------------------|------------------------------|-----------------------------------------------|------------------------|
| **Alineación CEUB/ARCU-SUR** | Baja (manual) | Baja | Baja–Media (informativo) | Baja | Muy baja sin adaptación | **Alta (nativa)** |
| **Workflow de aprobación** | Ad-hoc | No | No | Parcial (tareas) | Variable | **Sí (core)** |
| **Versionado auditado** | Débil | Media | No | Media | Variable | **Alto** |
| **Reporting ejecutivo** | Manual | Manual | No | Bajo | Alto (pero genérico) | **Alto (contextual)** |
| **Portal público controlado** | Fragmentado | No diseñado para ello | Sí (solo estado) | No típico | No típico | **Sí** |
| **Costo total propiedad** | Aparente bajo, oculto alto | Medio | Bajo | Medio (licencias) | Alto | **Medio (parametrizar)** |
| **Time-to-value** | Inmediato (pero destruye valor) | Rápido | Rápido | Lento para acreditación | Muy lento/adaptación | **Medio–alto con MVP focalizado** |

### 9.3 Ventajas y límites por competidor (análisis narrativo)

- **Status quo:** máxima flexibilidad informal, **mínima defensibilidad** ante auditoría y máximo costo oculto en coordinación.  
- **Drive/repositorio:** mejora almacenamiento, **no** reemplaza semántica de acreditación ni workflow con reglas CEUB/ARCU-SUR.  
- **Portales tipo “consulta de acreditación”:** útiles para **comunicación**, no gestionan **ciclo de vida** de evidencias ni observaciones.  
- **LMS:** excelente para **enseñanza**, raramente modela **indicadores** y **fases** de acreditación institucional sin customización profunda.  
- **Internacional alto costo:** fuerte en analytics globales, **débil** en encaje normativo boliviano/regional sin consultoría permanente.

### 9.4 *White spaces* (espacios vacíos de mercado)

1. **Motor normativo + UX de carrera** en un solo producto.  
2. **Trazabilidad legal-institucional** amigable para coordinadores con baja tolerancia a fricción.  
3. **Evidencia exportable** para visitas con **coherencia versional** (historia única del documento).

---

## 10. Propuesta de valor y posicionamiento estratégico

### 10.1 Propuesta de valor por segmento

| Segmento | Promesa central | Prueba / evidencia que debe mostrar el producto |
|----------|-----------------|--------------------------------------------------|
| S1 | “Carga una vez, sabe el estado, corrige con guía” | Checklists, estados, observaciones estructuradas |
| S2 | “Defensa documental con trazabilidad” | Logs, versiones, export de auditoría |
| S3 | “Mando y control informado sin micromanagement” | Semáforos, comparativos, PDF ejecutivo |
| S4 | “Lo oficial está en la web UMSS” | Publicación explícita y trazable |

### 10.2 *Positioning statement* (formato clásico)

> Para **la UMSS y su ecosistema de calidad y acreditación**, que hoy sufren **fragmentación documental y riesgo de incumplimiento bajo plazos normativos**, **SIGESA** es una **plataforma de gestión de acreditación de carrera** que **centraliza evidencias, flujos y reporting con alineación CEUB/ARCU-SUR**, a diferencia de **herramientas genéricas o portales solo informativos**, que **no garantizan trazabilidad ni workflow acreditador**.

### 10.3 Posicionamiento estratégico (matriz perceptual conceptual)

```
                    Alta defensibilidad ante auditoría
                                    |
                                    |  SIGESA (objetivo)
                                    |     *
                                    |
Baja alineación CEUB/ARCU-SUR ------+------ Alta alineación
                                    |
                                    |           * Suites globales (adaptadas)
                                    |
                    Baja defensibilidad
```

---

## 11. Hipótesis de negocio, hipótesis de adopción y validaciones esperadas

### 11.1 Hipótesis de negocio (*Business hypotheses*)

| ID | Hipótesis | Si es verdadera observamos… | Método de validación |
|----|-----------|-----------------------------|------------------------|
| HN-01 | La UMSS pagará costo de cambio a cambio de **reducción medible** de tiempo de búsqueda y retrabajo | KPI-LOC ≤ 2 min (muestra) | Medición en piloto + logs |
| HN-02 | La defensa documental mejora **percepción de riesgo** en decanato | Mayor uso de dashboards por decanos | Analytics de uso + entrevistas |
| HN-03 | El portal público reduce **consultas presenciales** | Caída de tickets en ventanillas correlacionada | Encuesta + conteo antes/después |

### 11.2 Hipótesis de adopción (*Adoption hypotheses*)

| ID | Hipótesis | Indicador | Validación |
|----|-----------|-----------|------------|
| HA-01 | Si la DUEA declara **canal oficial** y lo respalda operativamente, coordinadores migran del doble canal | % evidencias fuera del sistema ↓ | Auditoría de proceso en piloto |
| HA-02 | Si la UX es “ofimática familiar”, usuarios senior adoptan | KPI de completitud de tareas guiadas | UAT segmentado por edad/experiencia digital |
| HA-03 | Si hay **campeones** por facultad, sube adopción temprana | KPI-ADOP por facultad | Diseño experimental A/B de acompañamiento |

### 11.3 Matriz de riesgo de hipótesis (priorización)

| Hipótesis | Impacto si falla | Probabilidad inicial | Acción de mitigación |
|-----------|------------------|------------------------|----------------------|
| HN-01 | Se cuestiona ROI | Media | Medir línea base formal antes del piloto |
| HA-01 | Persistencia WhatsApp/correo | Alta | Política institucional + métricas de canal |

---

## 12. Necesidades funcionales y no funcionales derivadas del mercado

> Estas necesidades **informan** el PRD; no sustituyen requerimientos técnicos detallados.

### 12.1 Necesidades funcionales de mercado (agrupadas)

| ID | Necesidad | Segmento principal | Notas |
|----|-----------|---------------------|-------|
| MF-01 | Carga de evidencias por indicador/subfase con validación de completitud | S1, S2 | Reduce error de omisión |
| MF-02 | Flujo observación → corrección → reaprobación | S1, S2 | Corazón del proceso |
| MF-03 | Búsqueda transversal por metadatos académicos | S2 | Respuesta al dolor de “20+ minutos” |
| MF-04 | Dashboards por carrera/facultad/universidad | S3 | Producto de “mando” |
| MF-05 | Reportes PDF estándar para actas | S3 | Ritual institucional |
| MF-06 | Portal público de estados y certificados publicados | S4 | Confianza social |
| MF-07 | Rol de lectura para evaluadores externos (alcance futuro) | S4 | Benchmark internacional sugiere valor |

### 12.2 Necesidades no funcionales de mercado (percepción de producto)

| ID | Necesidad | Justificación de mercado |
|----|-----------|---------------------------|
| MNF-01 | **Confiabilidad percibida** (datos no “pierden”) | Un solo incidente grave destruye adopción |
| MNF-02 | **Rendimiento en campus** (latencia aceptable en red institucional) | Usuarios comparan inconscientemente con apps consumo |
| MNF-03 | **Accesibilidad básica** (contraste, lectura) | Responsabilidad institucional y ampliación de usuarios |
| MNF-04 | **Seguridad y privacidad** (roles, mínimo privilegio) | Miedo a filtraciones de borradores |
| MNF-05 | **Soporte y tiempo de respuesta** acordado | Mercado interno castiga sistemas “huérfanos” |

---

## 13. Factores críticos de éxito del sistema

| # | Factor crítico | Descripción | Responsable típico |
|---|----------------|-------------|-------------------|
| FCS-1 | **Sponsor ejecutivo sostenido** | Sin decano/VR alineados, el piloto muere en la primera temporada | Rectorado / VR |
| FCS-2 | **Política de canal único** para evidencias formales | Mitiga doble canal | Jefatura DUEA |
| FCS-3 | **Datos maestros** de calidad (carreras, responsables) | Evita conflictos de permisos y reportes falsos | TI + Secretaría académica |
| FCS-4 | **Plantillas normativas** gobernadas | Asegura promesa CEUB/ARCU-SUR | DUEA + jurídico |
| FCS-5 | **UX operativa** para S1 | Determinante de adopción real | Product + UX |
| FCS-6 | **Operación cloud/TI** estable | Confianza base | TI UMSS + proveedor |
| FCS-7 | **Programa de cambio** (comunicación, campeones, micro-ayuda) | Reduce resistencia cultural | DUEA + decanatos |

---

## 14. Riesgos de adopción y barreras organizacionales

### 14.1 Taxonomía de barreras

| Tipo | Ejemplos en UMSS | Palanca |
|------|------------------|---------|
| **Cultural** | “Siempre lo hicimos por WhatsApp” | Comunicación + uso en actas |
| **Política** | Temor a exposición de mal desempeño vía semáforos | Agregación y reglas de uso ético |
| **Técnica** | Sesiones inestables, miedo a pérdida de archivo | Pruebas de carga, respaldo visible |
| **Jurídica** | Dudas sobre datos personales en evidencias | Política de enmascaramiento / anexos |
| **Económica** | Costo OPEX recurrente | Plan por fases y uso de infraestructura institucional |

### 14.2 Matriz riesgo de adopción

| Riesgo | Prob. | Impacto | Síntoma | Mitigación |
|--------|-------|---------|---------|------------|
| Doble canal persistente | A | A | Evidencias fuera de SIGESA | Resolución + métricas |
| Sobrecarga de DUEA en piloto | M | A | Cuellos de botella | Piloto acotado + refuerzo temporal |
| Decanos desconectados | M | M | Baja presión de apoyo a carrera | Reportes automáticos a decanato |
| Desconfianza estudiantil | B | M | Bajo uso portal | Campaña “solo oficial en web UMSS” |

---

## 15. KPIs y métricas de validación del producto

### 15.1 KPIs de mercado / producto (validación continua)

| KPI | Definición | Meta ilustrativa | Segmento |
|-----|------------|------------------|----------|
| **PMF proxy institucional** | % coordinadores que declaran “no volvería al método anterior” | ≥70% post piloto | S1 |
| **Time-to-first-value** | Tiempo desde alta hasta primera evidencia aprobada | ≤14 días en piloto | S1–S2 |
| **Stickiness** | DAU/MAU usuarios clave | ≥0.4 | S2 |
| **NPS interno** | Net Promoter Score DUEA + coordinadores | ≥+20 | S1–S2 |
| **Tasa de error de carga** | % cargas rechazadas por formato incompleto | Tendencia decreciente | S1 |
| **Uso portal** | Visitas únicas mensuales | Crecimiento sostenido | S4 |
| **Exactitud de estado en dashboard** | Discrepancia vs auditoría manual | ≤5% | S3 |

### 15.2 Puentes entre KPIs de mercado y KPIs de negocio (BRD)

| KPI mercado (MRD) | KPI negocio (BRD) |
|-------------------|-------------------|
| Time-to-first-value | Adopción temprana |
| PMF proxy | Satisfacción sponsor / retención de uso |
| Exactitud dashboard | Trazabilidad / confianza ejecutiva |

---

## 16. Roadmap estratégico y visión evolutiva del sistema

### 16.1 Horizontes de producto

| Horizonte | Enfoque | Capacidades representativas |
|-----------|---------|----------------------------|
| **H1 (0–12 meses)** | **Product–market fit institucional** | MVP: evidencias, workflow, dashboards básicos, reportes, notificaciones |
| **H2 (12–24 meses)** | **Profundización y escala** | Portal público robusto, plantillas normativas versionadas, mejoras de analítica, roles decanales |
| **H3 (24–48 meses)** | **Integración ecosistémica** | APIs hacia SIIS/RRHH, indicadores académicos alimentados automáticamente donde sea posible |
| **H4 (48–60 meses)** | **Inteligencia y estándar regional** | Benchmark interuniversitario anonimizado (si política lo permite), módulos para otras universidades CEUB |

### 16.2 Roadmap por ondas (sintético)

| Onda | Ventana | Entrega de valor mercado |
|------|---------|--------------------------|
| **O1** | Meses 1–4 | Discovery duro + piloto 1 facultad |
| **O2** | Meses 5–8 | MVP institucional + KPIs baseline |
| **O3** | Meses 9–12 | Escalamiento multi-facultad + portal público |
| **O4** | Año 2 | Integraciones selectivas + analytics avanzado |

### 16.3 Visión evolutiva (frase guía)

> **“De repositorio trazable a sistema nervioso de la calidad institucional: datos conectados, decisiones más rápidas y comunidad informada.”**

---

## 17. Recomendaciones estratégicas y conclusiones

1. **Instalar Continuous Discovery** con ritmo mínimo quincenal con coordinadores y técnicos DUEA; sin VoC vivo, el MRD envejece antes que el código.  
2. **Negociar explícitamente** el “canal oficial” con acta/resolución: es la palanca de adopción más barata en costo de desarrollo y la más cara políticamente.  
3. **Pilotar por facultad de complejidad media–alta**, no solo la más digitalizada: reduce sesgo de éxito artificial.  
4. **Separar comunicación** “para Consejo” de “para operación”: mismos datos, vistas distintas (mercado interno heterogéneo).  
5. **Preparar extensión regional** solo después de **métricas de uso reales** en UMSS: el *white space* existe, pero la credibilidad se gana en casa.  
6. **Tratar al evaluador externo como usuario eventual** de lectura: diseño de export y vistas de auditoría anticipa mercado regulatorio.

**Conclusión:** el mercado institucional de la UMSS **demanda** una solución que una **rigurosidad acreditadora** con **experiencia de usuario** aceptable para actores sobrecargados. SIGESA puede ocupar un **posicionamiento diferenciado** si mantiene el **encaje normativo** como núcleo y complementa con **gobernanza de datos**, **reporting ejecutivo** y **transparencia pública**. El riesgo principal no es la competencia externa directa, sino la **inercia organizacional** y el **doble canal**; por ello, el MRD prioriza hipótesis de adopción y factores críticos de éxito vinculados a política y diseño de flujo, no solo a funcionalidades.

---

## 18. Trazabilidad y cadencia de Continuous Discovery

| Aspecto | Valor recomendado |
|---------|-------------------|
| **Cadencia de entrevistas/usuarios** | Mínimo **2 sesiones** quincenales durante implementación; mensual en operación |
| **Hipótesis** | Formato *Cuando…, espero…, porque…* en tablero compartido |
| **Actualización del MRD** | Trimestral o ante hito normativo (nueva convocatoria CEUB/ARCU-SUR) |
| **Trazabilidad BRD ↔ MRD** | BRD: necesidad institucional y reglas; MRD: segmentos, competencia, posicionamiento, validación |
| **Trazabilidad MRD ↔ PRD** | Tabla de trazabilidad sugerida abajo |

### 18.1 Matriz de trazabilidad MRD → PRD (ejemplo)

| Tema MRD | Épica PRD sugerida |
|----------|-------------------|
| JTBD S1-J1 | Gestión de entregas por indicador |
| VoC trazabilidad | Log de auditoría y versiones |
| Benchmark reporting | Motor de reportes PDF |
| Segmento S4 | Portal público y publicación |

---

## 19. Anexos

### Anexo A — Glosario

| Término | Definición |
|---------|------------|
| JTBD | *Jobs To Be Done* — framework de necesidades situacionales |
| VoC | *Voice of Customer* — síntesis de necesidades y frustraciones |
| PMF | *Product–Market Fit* — ajuste producto–mercado |
| CEUB / ARCU-SUR | Organismos/marcos de acreditación nacional y regional |

### Anexo B — Referencias internas del repositorio

- `docs/BRD_SIGESA_Institucional_Completo.md`  
- `docs/BRD_v1.md`  
- `templates/MRD_TEMPLATE.md`  

---

*Documento MRD SIGESA — UMSS. Elaboración estratégica v1.0 (14/05/2026). Carpeta: `02_mrd/`.*
