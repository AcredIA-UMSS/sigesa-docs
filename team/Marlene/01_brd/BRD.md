# Business Requirements Document (BRD) — Nivel Institucional y Estratégico

## SIGESA / AcredIA — Sistema Inteligente de Gestión y Seguimiento de Acreditaciones

**Universidad Mayor de San Simón (UMSS)** · Dirección Universitaria de Evaluación y Acreditación (DUEA)

---

## Portada y control documental

| Campo | Valor |
|-------|-------|
| **Tipo de documento** | BRD técnico–estratégico (base para planificación de proyecto y gobernanza) |
| **Producto** | SIGESA (AcredIA) |
| **Versión** | v1.0 — Institucional Completo |
| **Fecha** | 14/05/2026 |
| **Clasificación** | Uso interno UMSS / DUEA y equipo proveedor (AcredIA) |
| **Sponsor de negocio** | Jefatura DUEA — UMSS |
| **Autores** | Equipo AcredIA — UMSS (documento de síntesis institucional) |
| **Revisores sugeridos** | Jefatura DUEA · Vicerrectorado Académico · TIC/UTI UMSS · Asesoría jurídica |
| **Estado** | Borrador para validación de cifras económicas y aprobaciones formales |
| **Documentos relacionados** | `docs/BRD_v1.md` · `docs/PRD_v1.md` · `docs/FSD_v1.md` · `docs/LFSD.md` |
| **Nota metodológica** | Las cifras financieras ilustrativas de las secciones 8 y 16 están **parametrizadas** y deben sustituirse por valores oficiales UMSS antes de aprobación presupuestaria. |

---

## Índice analítico

1. [Resumen ejecutivo](#1-resumen-ejecutivo)  
2. [Introducción y contexto organizacional](#2-introducción-y-contexto-organizacional-del-sistema-sigesa)  
3. [Arquitectura de negocio: diez componentes clave](#3-arquitectura-de-negocio-diez-componentes-clave-del-ecosistema-sigesa)  
4. [Problema y oportunidad de negocio](#4-problema-y-oportunidad-de-negocio)  
5. [Objetivos SMART](#5-objetivos-smart)  
6. [Stakeholders: identificación y análisis](#6-stakeholders-identificación-y-análisis-detallado)  
7. [Business case: costo–beneficio, ROI y VAN](#7-business-case-costo-beneficio-roi-y-vannpv)  
8. [Alcance funcional, no funcional y exclusiones](#8-alcance-funcional-no-funcional-y-exclusiones)  
9. [Requerimientos de alto nivel del negocio](#9-requerimientos-de-alto-nivel-del-negocio)  
10. [KPIs e indicadores de éxito](#10-kpis-e-indicadores-de-éxito)  
11. [Restricciones](#11-restricciones-técnicas-operativas-presupuestarias-y-normativas)  
12. [Supuestos y dependencias críticas](#12-supuestos-del-proyecto-y-dependencias-críticas)  
13. [Riesgos de negocio y mitigación](#13-análisis-de-riesgos-del-negocio-y-estrategias-de-mitigación)  
14. [Gobernanza y toma de decisiones](#14-modelo-de-gobernanza-y-estructura-de-toma-de-decisiones)  
15. [Criterios de aceptación y de éxito](#15-criterios-de-aceptación-y-criterios-de-éxito-del-proyecto)  
16. [Impacto en procesos académicos y administrativos](#16-impacto-esperado-en-procesos-académicos-y-administrativos)  
17. [Cronograma y roadmap](#17-cronograma-general-y-roadmap-de-implementación)  
18. [Conclusiones y recomendaciones estratégicas](#18-conclusiones-y-recomendaciones-estratégicas)  
19. [Anexos](#19-anexos)

---

## 1. Resumen ejecutivo

La **Universidad Mayor de San Simón** enfrenta, a través de la **DUEA**, la gestión simultánea de procesos de **evaluación y acreditación de carrera** conforme a marcos **CEUB** (nacional) y **ARCU-SUR** (regional). Hoy, la operación depende de **canales no integrados** (hojas de cálculo, correo, almacenamiento disperso, mensajería informal), lo que genera **latencia operativa** (p. ej., más de veinte minutos por sesión solo en localización de la “versión correcta” de un documento), **ambigüedad de versiones** y **riesgo reputacional y normativo** ante auditorías con plazos rígidos.

**SIGESA** (enmarcado en la iniciativa **AcredIA**) propone una **plataforma web** que actúa como **única fuente de verdad** para evidencias, versiones, flujos de validación, trazabilidad y reporting ejecutivo, alineada **nativamente** a la taxonomía de fases e indicadores propia de CEUB/ARCU-SUR.

En términos de valor cuantificable (línea base documentada en trabajo de campo 2026 y sujeta a validación institucional), el proyecto apunta a: **(i)** reducir el tiempo de búsqueda documental de **>20 minutos a ≤2 minutos**; **(ii)** alcanzar **≥80% de adopción activa** de actores clave en los primeros tres meses post go-live; **(iii)** producir **reportes ejecutivos en ≤5 minutos**; **(iv)** tender a **cero incidentes** de pérdida documental por gestión; **(v)** lograr **100% de trazabilidad** en fases activas.

El presente BRD consolida **requisitos de negocio**, **modelo económico ilustrativo** (costo–beneficio, ROI, VAN), **gobernanza**, **riesgos**, **KPIs** y **roadmap**, constituyendo una **base analítica** para decisión del Rectorado/DUEA y para la cadena documental **BRD → MRD → PRD → FSD**.

**Llamada a la acción:** designación de **comité de gobernanza**, **aprobación de presupuesto** (CAPEX/OPEX), **resolución de uso obligatorio del canal oficial**, provisión de **datos maestros** (facultades, carreras, coordinadores, plantillas normativas) y **plan de migración** desde repositorios actuales.

---

## 2. Introducción y contexto organizacional del sistema SIGESA

### 2.1 Propósito del documento

Este BRD define **qué** debe lograr el negocio institucional y **por qué**, sin prescribir la solución técnica detallada (reservada a PRD/FSD). Su audiencia incluye **alta dirección académica**, **DUEA**, **direcciones de carrera**, **unidades de soporte** (jurídica, TI, planificación) y **proveedor de solución**.

### 2.2 Contexto de la UMSS y la función de la DUEA

La UMSS es una universidad pública de gran escala cuya legitimidad académica y reconocimiento de títulos se apoya, entre otros factores, en la **vigencia y calidad** de los procesos de **acreditación de carrera**. La DUEA concentra la **orquestación normativa**, la **asesoría metodológica**, el **seguimiento documental** y la **interlocución** con organismos acreditadores.

En este contexto, SIGESA no es un “sistema de archivo” aislado: es un **instrumento de gestión institucional** que articula **cumplimiento**, **transparencia** y **eficiencia operativa**.

### 2.3 Definición operativa de SIGESA

**SIGESA** (*Sistema Inteligente de Gestión y Seguimiento de Acreditaciones*) es el producto digital que habilita:

- **Repositorio centralizado** de evidencias con **versionado** y **políticas de inmutabilidad** para documentos aprobados.  
- **Workflow** de revisión entre **Coordinación de Carrera** y **Técnico DUEA**, con observaciones auditables.  
- **Panel de estado** (p. ej., semáforos) para **jefatura** y autoridades.  
- **Automatización** de alertas y reportes.  
- **Portal de transparencia** para consulta pública de estados y certificaciones publicadas.

### 2.4 Alineación estratégica

| Pilar institucional | Cómo SIGESA lo sostiene |
|---------------------|-------------------------|
| Calidad y acreditación | Reduce defectos documentales y mejora trazabilidad ante CEUB/ARCU-SUR |
| Gobernanza de la información | Consolida fuente única y reduce dependencia de conocimiento tácito |
| Transparencia | Publica estados oficiales y reduce asimetría informativa |
| Eficiencia administrativa | Libera horas-técnico de tareas repetitivas de búsqueda y compilación |
| Continuidad | Mitiga riesgo de pérdida de conocimiento por rotación de personal |

---

## 3. Arquitectura de negocio: diez componentes clave del ecosistema SIGESA

A continuación se definen **diez componentes de negocio** mutuamente relacionados. Cada uno incluye **rol**, **entradas/salidas**, **reglas dominantes** y **vínculo con riesgos/KPIs**.

| ID | Componente de negocio | Definición y valor | Reglas / políticas típicas | Indicadores asociados |
|----|------------------------|--------------------|----------------------------|------------------------|
| C1 | **Catálogo institucional** | Facultades, carreras, modalidades, responsables y vigencias. Base para permisos y reportes. | Designación formal de coordinador; sincronización periódica con datos oficiales UMSS | Integridad del catálogo (% registros completos) |
| C2 | **Marco normativo CEUB/ARCU-SUR** | Estructura de fases, subfases, indicadores y criterios de evidencia. | Fechas límite externas no editables por usuario operativo | % de plantillas alineadas a normativa vigente |
| C3 | **Gestión documental y versiones** | Carga, clasificación, control de versiones e historial inmutable post-aprobación. | No eliminación dura de aprobados; trazabilidad de autor/fecha | Tiempo de localización; incidentes de versión incorrecta |
| C4 | **Flujo de validación (workflow)** | Estados (borrador, en revisión, observado, aprobado), reglas de paso y responsables. | Justificación obligatoria en rechazo | Lead time por subfase; backlog de observaciones |
| C5 | **Comunicación y notificaciones** | Alertas por plazo, rechazo, vencimiento y recordatorios. | Uso de correo institucional; registro de entrega lógica | % eventos críticos notificados a tiempo |
| C6 | **Inteligencia gerencial (dashboards)** | Vista consolidada por carrera/facultad/universidad; semáforos y tendencias. | Accesos por rol; datos solo oficiales | Tiempo para obtener estado; uso por jefatura |
| C7 | **Reporting ejecutivo** | PDFs estándar para Consejo, Decanato, Rectorado. | Aprobación para distribución externa (política DUEA) | Tiempo de generación; periodicidad cumplida |
| C8 | **Cumplimiento y auditoría** | Bitácora inmutable de acciones; exportaciones para auditoría externa. | Retención conforme a política UMSS | % acciones registradas; éxito en auditoría documental |
| C9 | **Transparencia y certificación pública** | Consulta de estado y descarga de certificados publicados. | Solo información aprobada para publicación | Tráfico portal; tickets de consulta reducidos |
| C10 | **Operación, soporte y mejora continua** | Roles de administración, soporte L1/L2, gestión de cambios normativos. | Ventana de cambios; pruebas de regresión en plantillas | MTTR incidencias; tiempo de actualización normativa |

**Coherencia sistémica:** los objetivos SMART (Sección 5) se distribuyen principalmente sobre **C3–C7**; los riesgos críticos impactan **C3, C4 y C8**; la gobernanza (Sección 14) es el mecanismo de arbitraje sobre **C2, C7 y C9** (publicación y marco normativo).

---

## 4. Problema y oportunidad de negocio

### 4.1 Descripción del problema (síntesis causal)

El problema central no es la ausencia de “documentos”, sino la **fragmentación del ciclo de vida documental**: múltiples copias en paralelo, ausencia de **metadatos consistentes**, dependencia de **canales informales** y falta de una **vista de estado** confiable para la toma de decisiones. Esto se manifiesta en tres capas — **operativa**, **coordinativa** y **estratégica** — y converge en un riesgo de **no conformidad** ante evaluadores externos o en **retrabajo** intensivo en ventanas pre-auditoría.

**Evidencia cualitativa y cuantitativa (referencial de trabajo de campo, 2026):** tiempos elevados de búsqueda, estrés operativo por plazos fijos, duplicidad de versiones y dificultad para compilar reportes sin pausar el trabajo técnico.

### 4.2 Oportunidad de negocio

| Dimensión | Oportunidad | Ejemplo aplicado (UMSS) |
|-----------|-------------|-------------------------|
| Eficiencia | Recuperación de horas-técnico para asesoría y control de calidad | Redistribución de 15–20 h/mes/técnico hacia revisión metodológica |
| Riesgo | Menor probabilidad de observaciones por trazabilidad | Carpeta de auditoría exportable desde el sistema |
| Servicio | Menor fricción para estudiantes/egresados | Estado de acreditación consultable sin colas administrativas |
| Posicionamiento | Diferenciación por cumplimiento nativo CEUB/ARCU-SUR | Menos adaptación manual que plataformas globales genéricas |

### 4.3 Consecuencia de no actuar (*do-nothing*)

Mantenimiento del status quo implica **crecimiento del riesgo** con el aumento del volumen documental y la complejidad regional; **costos ocultos** en horas directivas y técnicas; y **dependencia de personas clave**, con alta vulnerabilidad ante rotaciones.

---

## 5. Objetivos SMART

Los objetivos siguientes son **específicos**, con **métrica**, **factibilidad** acotada a capacidades típicas de una primera versión productiva, **relevancia institucional** y **horizonte temporal** explícito.

| ID | Objetivo SMART | Métrica | Meta | Plazo |
|----|----------------|---------|------|-------|
| OB-01 | Reducir el tiempo promedio de localización de evidencia clave desde el repositorio oficial | Minutos por búsqueda representativa (muestra mensual) | ≤ 2 min | Q4-2026 |
| OB-02 | Eliminar pérdidas documentales atribuibles a canales informales en procesos gestionados en SIGESA | Incidentes formales / gestión | 0 | Q1-2027 |
| OB-03 | Habilitar autonomía de jefatura para obtener estado consolidado sin soporte técnico ad-hoc | Tiempo desde login hasta vista consolidada | ≤ 2 min | Q4-2026 |
| OB-04 | Automatizar generación de reporte ejecutivo estándar | Tiempo de generación (P95) | ≤ 5 min | Q4-2026 |
| OB-05 | Alcanzar adopción activa de actores clave | % usuarios activos mensuales / universo registrado | ≥ 80% | Mes +3 post go-live |
| OB-06 | Asegurar trazabilidad completa en fases activas | % fases con cadena documental completa | 100% | Q2-2027 |
| OB-07 | Cumplimiento de políticas de acceso por rol | Incidentes de acceso indebido confirmados | 0 críticos | Continuo |

---

## 6. Stakeholders: identificación y análisis detallado

### 6.1 Mapa de influencia–interés (matriz resumida)

| Stakeholder | Tipo | Interés principal | Poder/Influencia | Implicancia para SIGESA |
|-------------|------|-------------------|------------------|-------------------------|
| Jefatura DUEA | Interno | Cumplimiento, visibilidad, priorización | Alto | Sponsor y dueña de políticas de publicación |
| Técnicos DUEA | Interno | Validación eficiente, orden documental | Medio–Alto | Dueños operativos del workflow |
| Coordinadores de carrera | Interno | Cumplir plazos, reducir retrabajo | Medio | Volumen de carga y calidad de evidencias |
| Decanatos / Direcciones académicas | Interno | Resultados por facultad, apoyo a carreras | Medio | Gestión de cuellos de botella académicos |
| Rectorado / Vicerrectorado | Interno | Riesgo institucional, reporting | Alto | Consumo de reportes; decisiones de inversión |
| Estudiantes / Egresados | Externo–comunidad | Transparencia de estado | Bajo–Medio | Portal público |
| CEUB | Externo–regulador | Cumplimiento normativo nacional | Alto (indirecto) | Define marco evaluativo |
| ARCU-SUR / espacios regionales | Externo–regulador | Armonización regional | Alto (indirecto) | Requisitos de evidencia y plazos |
| Ministerio de Educación (marco general) | Externo–institucional | Políticas educativas | Medio | Alineación legal/institucional |
| Proveedor TI / nube | Externo–proveedor | SLA, seguridad, continuidad | Medio | Operación 24/7 lógica del servicio |
| Equipo de desarrollo (AcredIA) | Externo–proveedor | Alcance, calidad, entregas | Medio | Ejecución técnica |

### 6.2 Necesidades y riesgos por grupo (extracto)

| Grupo | Necesidad clave | Riesgo si no se atiende |
|-------|-----------------|-------------------------|
| Coordinadores | Claridad de requisitos por subfase y feedback rápido | Uso paralelo de WhatsApp/correo |
| Técnicos DUEA | Herramientas de revisión masiva y trazabilidad | Cuellos de botella pre-auditoría |
| Jefatura | Paneles y reportes confiables | Decisiones con información incompleta |
| Autoridades superiores | Síntesis ejecutiva periódica | Subinversión o sobredemanda operativa a DUEA |

### 6.3 RACI de alto nivel (governance lite)

| Actividad | Jefatura DUEA | Técnicos DUEA | Coordinadores | TI UMSS | AcredIA |
|-----------|---------------|----------------|---------------|---------|---------|
| Definir política de canal oficial | **A** | C | C | C | I |
| Validar evidencias | C | **R** | C | I | I |
| Cargar evidencias | I | C | **R** | I | I |
| Aprobar publicación portal | **A** | R | C | C | I |
| Operar infraestructura | I | I | I | **R** | C |
| Desarrollar/mantener producto | C | C | I | C | **R** |

*A = Accountable, R = Responsible, C = Consulted, I = Informed.*

---

## 7. Business case: costo–beneficio, ROI y VAN (NPV)

### 7.1 Supuestos económicos ilustrativos (paramétricos)

> **Advertencia:** las cifras siguientes son **modelo de referencia** para debate de dirección; deben reemplazarse por **costos salariales oficiales**, **cargas sociales**, **costos de licencias** y **tarifas cloud** aprobadas por la UMSS.

| Parámetro | Símbolo | Valor ilustrativo | Notas |
|-----------|---------|-------------------|-------|
| Horas recuperadas / técnico / mes | \(h_{rec}\) | 15 h | Basado en entrevistas de campo (rango 15–20) |
| Número de técnicos equivalentes | \(N\) | 4 | Ajustar a planta real DUEA |
| Costo hora cargado (BOB) | \(c_h\) | 80 BOB/h | Incluye aproximación de carga social |
| Tasa de descuento anual | \(r\) | 12% | Típica para análisis público conservador |
| Horizonte | \(T\) | 3 años | Alineado a ciclos de acreditación |
| CAPEX inicial (desarrollo + implementación) | \(I_0\) | 850.000 BOB | Placeholder: licencias, desarrollo, PMO, migración |
| OPEX anual (cloud + soporte L2/L3 + mantenimiento evolutivo) | \(OPEX_t\) | 120.000 BOB/año | Placeholder |

### 7.2 Beneficio anual monetizado (componente directo)

Beneficio operativo anual estimado por recuperación de tiempo:

\[
B_{anual} = h_{rec} \times 12 \times N \times c_h = 15 \times 12 \times 4 \times 80 = 57.600 \text{ BOB/año}
\]

Este flujo es **conservador** porque **no capitaliza** beneficios difíciles de monetizar: reducción de riesgo de pérdida de acreditación, valor reputacional, menor carga en decanatos y menor exposición legal/transparencia.

### 7.3 Flujo de caja simplificado (3 años)

| Año | Inversión / Costo (BOB) | Beneficio directo (BOB) | Flujo neto (BOB) |
|-----|---------------------------|---------------------------|------------------|
| 0 | \(I_0 + OPEX_{0.5}\) ≈ 910.000 | 0 | −910.000 |
| 1 | 120.000 | 57.600 | −62.400 |
| 2 | 120.000 | 57.600 | −62.400 |
| 3 | 120.000 | 57.600 | −62.400 |

> Con los placeholders actuales, el **flujo directo** no cubre CAPEX+OPEX: el **argumento de inversión** debe incluir **beneficios no monetizados** o **ajustes** (menor \(I_0\), mayor \(h_{rec}\), mayor \(N\), menor OPEX, o **aportes** institucionales ya presupuestados para digitalización). Esto es **esperado** en proyectos de infraestructura de cumplimiento donde el ROI financiero puro es débil pero el **ROI de riesgo** es dominante.

### 7.4 Valor Actual Neto (VAN / NPV) — fórmula y ejemplo

\[
VAN = -I_{0}^{*} + \sum_{t=1}^{T} \frac{B_t - OPEX_t}{(1+r)^t}
\]

Tomando \(I_{0}^{*}=910.000\), \(B_t=57.600\), \(OPEX_t=120.000\), \(r=0{,}12\), \(T=3\):

| Año \(t\) | Numerador \((B_t-OPEX_t)\) | Denominador \((1+r)^t\) | VA (BOB) |
|-----------|----------------------------|-------------------------|----------|
| 1 | −62.400 | 1,12 | −55.714 |
| 2 | −62.400 | 1,2544 | −49.745 |
| 3 | −62.400 | 1,404928 | −44.415 |

\[
VAN \approx -910.000 - 55.714 - 49.745 - 44.415 \approx -1.059.874 \text{ BOB}
\]

**Interpretación para dirección:** con parámetros conservadores y sin cuantificar **riesgo evitado**, el caso financiero **requiere** (a) **subsidio institucional** explícito, (b) **CAPEX ya licitado** en programas de transformación digital, o (c) **revisión de costos** y **beneficios ampliados** (p. ej., consolidación de contratos de nube institucional, reuso de SSO, reducción de impresión/certificación física).

### 7.5 ROI simplificado (año 1, flujo directo)

Definición operativa usada:

\[
ROI_{año1} = \frac{\text{Beneficio directo año 1} - \text{Costo total año 1}}{\text{Costo total año 1}}
\]

Con costo total año 1 ≈ amortización simplificada no modelada + OPEX; si solo se compara beneficio directo vs OPEX:

\[
ROI_{OPEX} = \frac{57.600 - 120.000}{120.000} \approx -52\%
\]

De nuevo, esto muestra que el **ROI narrativo** debe integrar **cumplimiento** y **continuidad académica**.

### 7.6 Matriz costo–beneficio ampliada (cualitativa + cuantitativa)

| Ítem | Tipo | Descripción | Magnitud |
|------|------|-------------|----------|
| Tiempo técnico recuperado | Cuantificable | Menos búsqueda y compilación | Ver \(B_{anual}\) |
| Reducción de incidentes de versión | Cuantificable / cualitativo | Menos retrabajo pre-auditoría | Meta 0 incidentes críticos |
| Riesgo de observaciones documentales | Cualitativo–alto valor | Mejor estructura de evidencias | Potencialmente evita costos reputacionales y correctivos |
| Transparencia a comunidad | Cualitativo | Menos consultas presenciales | Reducción de carga en ventanillas |
| Costo OPEX recurrente | Cuantificable | Nube, soporte, mejoras | Ver \(OPEX_t\) |
| Costo de cambio organizacional | Cuantificable | Capacitación, gestión del cambio | Por presupuestar |

---

## 8. Alcance funcional, no funcional y exclusiones

### 8.1 Alcance funcional (MVP institucional)

| Área | Incluido |
|------|----------|
| Gestión de evidencias | Carga, clasificación, versiones, observaciones |
| Workflow | Estados, aprobación/rechazo con justificación |
| Normativa | Plantillas CEUB/ARCU-SUR parametrizables |
| Reporting | PDF ejecutivo estándar |
| Notificaciones | Correo institucional ante eventos críticos |
| Roles | Administrador, técnico, coordinador, público |
| Portal | Consulta de estado y certificados publicados |
| Auditoría | Bitácora de acciones relevantes |

### 8.2 Requerimientos no funcionales de negocio (traducibles a LFSD)

| ID | Categoría | Requerimiento | Métrica objetivo ilustrativa |
|----|-----------|---------------|------------------------------|
| NFR-01 | Disponibilidad | Accesible en horario laboral extendido pre-convocatoria | ≥ 99% mensual en ventanas críticas (definir con TI) |
| NFR-02 | Rendimiento percibido | Operaciones frecuentes sin bloqueo perceptible | P95 acciones clave ≤ umbral acordado con TI |
| NFR-03 | Seguridad | Autenticación institucional; mínimo privilegio | 0 brechas críticas en pentest inicial |
| NFR-04 | Resiliencia | Respaldo diario verificable | RPO/RTO acordados con TI |
| NFR-05 | Usabilidad | Curva de aprendizaje baja | ≥ 80% completitud tareas guiadas en UAT |
| NFR-06 | Cumplimiento | Alineación a políticas UMSS de datos personales | Checklist legal cumplido |
| NFR-07 | Mantenibilidad normativa | Actualización de plantillas sin proyecto “grande” | Ventana máxima de cambio normativo acordada |

### 8.3 Exclusiones explícitas (para control de alcance)

- Integración **en tiempo real** con SIIS, RRHH o ERP en **v1** (puede planificarse v1.5+).  
- **Pagos en línea** por trámites de certificación.  
- **Gestión completa** de visitas in-situ de pares (logística, agendas, hoteles).  
- **Modelos predictivos** de aprobación acreditadora (fuera de alcance de negocio del BRD; posible línea futura de I+D).  
- Ranking internacional **QS/THE** integrado.

---

## 9. Requerimientos de alto nivel del negocio

| ID | Enunciado | Prioridad | Criterio de aceptación de negocio |
|----|------------|-----------|-----------------------------------|
| HLR-01 | Canal oficial de evidencias | Must | ≥95% de evidencias de procesos piloto ingresan por SIGESA |
| HLR-02 | Versionado auditado | Must | Toda versión con usuario/fecha; aprobados no eliminables |
| HLR-03 | Trazabilidad de decisiones | Must | 100% rechazos con comentario obligatorio |
| HLR-04 | Estado consolidado para jefatura | Must | Vista consolidada sin soporte ad-hoc en ≤2 min |
| HLR-05 | Reportes ejecutivos reproducibles | Must | PDF estándar en ≤5 min (P95) |
| HLR-06 | Alertas de plazo | Must | 100% eventos críticos configurados emiten notificación |
| HLR-07 | Marco CEUB/ARCU-SUR | Must | Checklist de alineación normativa aprobado por DUEA |
| HLR-08 | Portal público controlado | Should | Solo contenidos explícitamente publicados |
| HLR-09 | Continuidad operativa | Must | Política de respaldo aceptada por TI |
| HLR-10 | Gobierno de datos maestros | Must | Responsable institucional por actualización de catálogo |

---

## 10. KPIs e indicadores de éxito

### 10.1 Tabla principal (desempeño, adopción, eficiencia)

| KPI | Definición | Línea base | Meta | Frecuencia | Dueño datos |
|-----|------------|------------|------|------------|-------------|
| **KPI-LOC** | Tiempo de localización de documento tipo | >20 min | ≤2 min | Mensual | SIGESA + encuesta |
| **KPI-ADOP** | Usuarios activos / registrados (actores clave) | 0% | ≥80% | Mensual | SIGESA |
| **KPI-REP** | Tiempo generación reporte estándar | Horas/días | ≤5 min | Por evento | SIGESA |
| **KPI-INC** | Incidentes pérdida/versión incorrecta | Recurrente | 0 críticos/gestión | Por gestión | DUEA |
| **KPI-TRZ** | % fases activas con cadena completa | 0% | 100% | Trimestral | SIGESA |
| **KPI-UAT** | Defectos bloqueantes post-UAT | — | Tendencia ↓ | Por release | QA |
| **KPI-SAT** | Satisfacción sponsor (Likert 1–5) | — | ≥4.0 | Post go-live | Encuesta |

### 10.2 Cuadro de alineación KPI ↔ Objetivo ↔ Riesgo

| KPI | Objetivo principal | Riesgo mitigado |
|-----|--------------------|-----------------|
| KPI-LOC | OB-01 | Operación caótica pre-auditoría |
| KPI-ADOP | OB-05 | Resistencia al cambio / doble canal |
| KPI-REP | OB-04 | Dependencia de trabajo manual paralelo |
| KPI-TRZ | OB-06 | Fallas en auditoría documental |

---

## 11. Restricciones técnicas, operativas, presupuestarias y normativas

| Tipo | Restricción | Implicancia |
|------|-------------|-------------|
| **Normativa** | Cumplimiento CEUB/ARCU-SUR y marco legal educativo | No flexibilización de requisitos externos |
| **Técnica** | Arquitectura web; dependencias TI UMSS (DNS, certificados, correo) | Co-diseño con TI |
| **Operativa** | Baja tolerancia a fricción en picos de carga | Pruebas de carga y soporte reforzado en convocatorias |
| **Presupuestaria** | CAPEX/OPEX sujetos a aprobación | Roadmap por fases financiables |
| **Seguridad** | Credenciales institucionales; políticas de datos | Posible integración SSO institucional a futuro |
| **Cultural** | Heterogeneidad digital de coordinadores | Programa de acompañamiento y comunicación interna |

---

## 12. Supuestos del proyecto y dependencias críticas

### 12.1 Supuestos

- Existencia de **datos maestros** razonablemente limpios (carreras, coordinadores).  
- **Correo institucional** operativo para notificaciones.  
- **Patrocinio ejecutivo** sostén uso del canal oficial.  
- Disponibilidad de **ventanas** para UAT alineadas al calendario académico.

### 12.2 Dependencias críticas (CDL)

| ID | Dependencia | Impacto si falla | Plan de contingencia |
|----|-------------|------------------|----------------------|
| D1 | Aprobación formal y presupuesto | Paraliza proyecto | Fase piloto acotada por facultad |
| D2 | Datos iniciales | Retrasa configuración | Importación incremental + validación decanal |
| D3 | Infraestructura cloud/TI | Afecta disponibilidad | Ambiente alterno temporal |
| D4 | Acceso a textos normativos oficiales | Riesgo de mala taxonomía | Revisión conjunta DUEA–jurídica |

---

## 13. Análisis de riesgos del negocio y estrategias de mitigación

| Riesgo | P | I | Score | Mitigación | Trigger de escalamiento |
|--------|---|---|-------|------------|-------------------------|
| Doble canal (WhatsApp/correo) | A | A | Crítico | Resolución de canal oficial + auditoría de uso | >30% evidencias fuera de SIGESA en piloto |
| Resistencia al cambio | A | M | Alto | UX guiada, campeones por facultad, micro-videos | KPI-ADOP <50% a mes +2 |
| Cambio normativo CEUB/ARCU-SUR | M | A | Alto | Motor de plantillas versionado; comité normativo | Publicación oficial de cambio estructural |
| Fallas de migración | B | Cr | Alto | Migración por lotes + checksum + rollback | Pérdida de integridad en QA |
| Dependencia de proveedor | M | M | Medio | SLA, escrow de código/documentación, KPI soporte | Incumplimiento SLA 2 meses consecutivos |
| Percepción de “vigilancia” | M | M | Medio | Comunicación ética de uso de logs | Quejas formales > umbral |

*(P: Probabilidad B/M/A; I: Impacto B/M/A/Cr.)*

---

## 14. Modelo de gobernanza y estructura de toma de decisiones

### 14.1 Comités y roles

| Órgano | Composición típica | Frecuencia | Decisiones |
|--------|---------------------|------------|------------|
| **Steering Committee** | Vicerrectorado académico o delegado, Jefatura DUEA, TI, Planificación | Mensual en implementación; trimestral en operación | Prioridades, presupuesto incremental, go/no-go de fases |
| **Comité Operativo DUEA** | Jefatura + técnicos líderes | Quincenal | Priorización de plantillas, criterios de publicación portal |
| **Comité de Cambios Normativos** | DUEA + asesoría jurídica + AcredIA | A demanda | Versionado de marcos CEUB/ARCU-SUR en sistema |
| **Mesa de Servicio** | TI + AcredIA | Continuo | Incidentes y pedidos |

### 14.2 Matriz de decisión RACI ampliada (extracto)

| Decisión | Steering | Jefatura DUEA | TI UMSS | AcredIA |
|----------|----------|---------------|---------|---------|
| Aprobar go-live | **A** | R | C | C |
| Publicar en portal | **A** | R | I | I |
| Cambiar plantilla normativa mayor | **A** | R | I | C |
| Aprobar excepción de seguridad | **A** | C | R | C |

### 14.3 Políticas de escalamiento

1. **Nivel 1:** Coordinación ↔ Técnico DUEA (operativo).  
2. **Nivel 2:** Jefatura DUEA (priorización y conflictos inter-facultad).  
3. **Nivel 3:** Steering (presupuesto, riesgo institucional, cambios de alcance mayores).

---

## 15. Criterios de aceptación y criterios de éxito del proyecto

### 15.1 Criterios de aceptación (UAT de negocio)

| ID | Historia de aceptación | Condición verificable |
|----|------------------------|------------------------|
| CA-01 | Coordinador carga evidencia de subfase | Archivo visible, metadatos completos, notificación a técnico |
| CA-02 | Técnico rechaza con causa | Estado “observado”, motivo obligatorio, notificación |
| CA-03 | Jefatura ve semáforos | Consistencia con reglas de completitud |
| CA-04 | Reporte PDF | Contiene filtros acordados y marca temporal |
| CA-05 | Portal público | No muestra borradores; solo publicados |
| CA-06 | Auditoría | Log contiene actor, timestamp, acción |

### 15.2 Criterios de éxito del proyecto (post go-live)

- **≥80%** de KPI-ADOP al mes +3.  
- **Cero** incidentes críticos KPI-INC en primera gestión piloto completa.  
- **≥4/5** en KPI-SAT del sponsor.  
- **≥80%** de objetivos SMART en verde al cierre del trimestre de estabilización.  
- Uso de SIGESA como **canal aceptado** en acta/resolución DUEA.

---

## 16. Impacto esperado en procesos académicos y administrativos

| Proceso | Hoy (síntoma) | Con SIGESA (efecto esperado) | Notas de gestión del cambio |
|---------|---------------|------------------------------|-----------------------------|
| Autoevaluación documental | Fragmentación | Flujo único con estados | Capacitación por facultad |
| Seguimiento decanal | Información rezagada | Paneles por facultad | Roles de lectura decanal |
| Soporte a auditorías | Compilación manual | Exportación estructurada | Procedimiento de congelado de versiones |
| Atención a estudiantes | Consultas dispersas | Portal de transparencia | Política de publicación |
| Planificación DUEA | Dependencia de reuniones | KPIs objetivos | Ritual de revisión mensual |

---

## 17. Cronograma general y roadmap de implementación

### 17.1 Fases (visión macro)

| Fase | Duración orientativa | Entregables de negocio |
|------|----------------------|------------------------|
| **F0 — Descubrimiento y baseline** | 4–6 semanas | BRD aprobado, línea base KPI, datos maestros v0 |
| **F1 — MVP cerrado** | 8–12 semanas | UAT funcional interno DUEA |
| **F2 — Piloto por facultad(es)** | 4–8 semanas | Métricas KPI-ADOP/KPI-LOC en entorno real |
| **F3 — Despliegue institucional** | 4–6 semanas | Resolución canal oficial, soporte reforzado |
| **F4 — Estabilización** | 4–8 semanas | Hardening, ajustes normativos, reporting avanzado |
| **F5 — Evolución** | Continuo | Integraciones SIIS/RRHH, analytics, mejoras UX |

### 17.2 Hitos (*milestones*)

| Hito | Descripción | Dependencia clave |
|------|-------------|-------------------|
| H1 | Aprobación Steering + presupuesto | D1 |
| H2 | Congelación de alcance MVP | Comité operativo |
| H3 | Piloto exitoso (KPIs verdes) | D2, capacitación |
| H4 | Go-live institucional | TI, seguridad |
| H5 | Primera auditoría apoyada 100% en SIGESA | Estabilización |

---

## 18. Conclusiones y recomendaciones estratégicas

1. **Tratar SIGESA como infraestructura de cumplimiento**, no como proyecto de “software aislado”: el retorno dominante es **reducción de riesgo** y **continuidad académica**, además de eficiencia.  
2. **Institucionalizar el canal único** mediante acto administrativo claro, con **consecuencias operativas** para flujos paralelos en procesos formales.  
3. **Validar el business case** con finanzas UMSS: sustituir placeholders de CAPEX/OPEX y **cuantificar ahorros tangibles** (impresión, traslados de compilación, horas decanales).  
4. **Financiar gobernanza**: sin comités y ritos de revisión, los KPIs decaen post-lanzamiento.  
5. **Planificar integraciones** como fase 2, una vez estable el **modelo de datos** y la **operación estable**.  
6. **Comunicar transparencia** como beneficio político-institucional: reduce fricción con estudiantes y fortalece confianza social.

---

## 19. Anexos

### Anexo A — Glosario breve

| Término | Definición |
|---------|------------|
| CEUB | Comité de Evaluación Universitaria de Bolivia — acreditación nacional |
| ARCU-SUR | Acreditación regional de carrera universitaria en el MERCOSUR |
| UAT | User Acceptance Testing — prueba de aceptación de usuario |
| VAN/NPV | Valor actual neto de flujos futuros descontados |

### Anexo B — Trazabilidad con `docs/BRD_v1.md`

El presente documento **extiende** el BRD v0.1 incorporando: **diez componentes de negocio**, **requisitos no funcionales de negocio**, **business case financiero paramétrico (ROI/VAN)**, **gobernanza**, **roadmap**, **criterios de aceptación** y **matrices de alineación** KPI–objetivo–riesgo, sin invalidar los requerimientos de negocio ya priorizados en la versión previa.

---

*Fin del documento BRD SIGESA — Institucional Completo v1.0 (14/05/2026).*
