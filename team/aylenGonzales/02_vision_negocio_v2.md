# SIGESA — Sistema de Gestión de Evaluación y Acreditación
## Documento de Visión de Negocio (v2)

**Versión:** 2.0  
**Base:** `./docs/01_vision_negocio.txt` (contenido original conservado íntegramente en las secciones 1 a 5).  
**Fuentes complementarias:** Bitácora 3 — *Validación al prototipado Hi-Fi con IA* (AcredIA, UMSS, entrega 20/04/2026); PDFs del repositorio en carpeta `bitacoras` (Bitácora 1, Módulo 2, Bitácora 3).  
**Nota sobre otros PDF:** el archivo *Actividad4.docx.pdf* revisado corresponde a un caso de estudio académico (empresa de muebles / análisis DAFO) y **no** aporta dominio de negocio para SIGESA; por ello no se incorporó su contenido al suplemento.

---

## Suplemento ejecutivo (solo en v2)

Este suplemento resume lo que los entregables de diseño y validación AcredIA añaden al documento de visión: marco de investigación, visión de *Single Source of Truth*, stakeholders y métricas de validación, sin sustituir las secciones 1–5.

| Tema | Aporte desde Bitácora 3 / proyecto |
|------|-------------------------------------|
| Contexto operativo actual | Gestión CEUB / ARCU-SUR con Excel, correo, pendrives y WhatsApp (“caos silencioso”); técnicos con **más de 20 minutos** por tarea buscando la versión final de un documento. |
| Visión ampliada | **Única fuente de verdad**; sistema de gestión activo (no solo repositorio tipo Drive): menos carga operativa, visibilidad para jefatura DUEA, validación de evidencias por coordinadores, **cero pérdidas documentales** y soporte a auditorías. |
| Stakeholders | **Internos:** DUEA, directora, técnicos, jefe de evaluación, coordinadores, decanos / vicerrectorado / rectorado. **Externos:** estudiantes, egresados, docentes, CEUB / ARCU-SUR. |
| Tareas núcleo adicionales | Administración de **planes de mejora**; **coordinación** entre actores; generación automática de informes (alineado a P3 del documento base). |
| IA y ética | Clasificación de documentos, detección de evidencias faltantes, alertas de plazos, análisis de patrones; principios de **confidencialidad, integridad, disponibilidad**, mitigación de **sesgos**, **transparencia** de criterios, revisión humana, copias de seguridad y recuperación. |
| Arquitectura de información (alto nivel) | Módulos: Inicio (dashboard), **Procesos de acreditación** (creación, seguimiento, evaluación interna/externa, planes de mejora), **Seguimiento**, **Reportes**, **Usuarios**, **Configuración**, **Ayuda** — sitemap centrado en **procesos** (no solo en roles). |
| Validación con usuarios | Protocolo **Think-Aloud**; evolución en tres fases; mejora fuerte de satisfacción en perfiles clave tras iteración (p. ej. técnico DUEA y coordinador de carrera de **2/5 a 5/5** en escala reportada en la bitácora). |
| Métricas de referencia (prototipo) | Tasa de éxito global de tareas reportada **96,66%**; CSAT promedio **8,67/10**; hallazgos heurísticos corregidos (validaciones en tiempo real, breadcrumbs, búsqueda/filtros, contraste WCAG 2.2 AA, mensajes de error contextuales). |
| Riesgos / próxima ola de producto | Falta de **deshacer** fluido post-acción; carga de archivos pesados y feedback determinista; **experiencia móvil** del coordinador; tooltips que pueden fatigar al usuario experto — propuestas: *undo* con temporizador, barras de progreso reales / skeletons, modo “usuario experto”. |

---

## 1. Problema que resuelve

El Sistema de Gestión de Evaluación y Acreditación (SIGESA) surge para resolver la ineficiencia y desorganización en los procesos de evaluación y acreditación de carreras en la Universidad Mayor de San Simón (UMSS), alineados a los lineamientos de ARCU-SUR y el CEUB.

Actualmente, la gestión se realiza mediante herramientas dispersas: documentos físicos, hojas de cálculo y repositorios digitales no integrados. Esto genera:

- Duplicidad de información
- Falta de trazabilidad
- Dificultad en el seguimiento del avance
- Retrasos en el cumplimiento de plazos
- Alta carga administrativa para los actores involucrados
- Limitaciones en la toma de decisiones oportunas

SIGESA busca centralizar la información, automatizar procesos y proporcionar un sistema estructurado que mejore el control, la eficiencia y la transparencia en la gestión institucional.

---

## 2. Usuarios principales

### Usuario #1 — Administrador DUEA

**Objetivo:** Supervisar y controlar todos los procesos de acreditación desde un solo lugar, asegurando que las etapas avancen a tiempo, la documentación esté completa y la información no se pierda ante cambios de gestión.

**Tareas principales:**
1. Ver el estado actualizado de todas las carreras sin consultar a cada jefatura por separado.
2. Aprobar, rechazar o enviar observaciones sobre las fases entregadas por los coordinadores.
3. Consultar el historial completo de ciclos anteriores de acreditación para garantizar continuidad institucional.

---

### Usuario #2 — Jefe de Carrera

**Objetivo:** Cumplir oportunamente con los requisitos de acreditación de su carrera, organizando la evidencia y respondiendo observaciones sin depender de procesos manuales dispersos.

**Tareas principales:**
1. Cargar y actualizar los documentos de evidencia vinculados a cada etapa del proceso.
2. Recibir alertas de fechas límite para no perder plazos críticos.
3. Consultar el estado actual de su carrera y las observaciones pendientes que debe atender.

---

### Usuario #3 — Coordinador de Carrera

**Objetivo:** Gestionar el proceso de autoevaluación de su carrera, siendo responsable de recopilar y organizar evidencias, coordinar con docentes y personal administrativo, dar seguimiento a los criterios de evaluación y asegurar el cumplimiento de los requisitos de acreditación.

---

### Usuario #4 — Público General

**Objetivo:** Acceder a información pública del sistema (estado de acreditación de carreras, reportes generales, datos institucionales). No tiene permisos de edición ni acceso a información sensible.

---

## 3. Funcionalidades del sistema

Las funcionalidades se priorizan en tres niveles:

### P1 — Crítico (el sistema no funciona sin esto)

1. **Registro y autenticación de usuarios con roles diferenciados**
   Roles: Administrador DUEA, Jefe de Carrera, Coordinador, Evaluador Externo. Controla qué puede ver y hacer cada usuario. Es la puerta de entrada a todo: sin roles definidos, cualquier usuario podría aprobar, crear o borrar fases, rompiendo la lógica de negocio.

2. **Gestión de fases del proceso de acreditación**
   Fases: Autoevaluación → Documentación → Visita de pares → Informe externo → Resolución final. Permite registrar avances, observaciones y cambios de estado. Es el núcleo operativo del sistema.

3. **Carga, organización y versionado de documentos de evidencia**
   Vinculados a etapas específicas del proceso. Reemplaza el principal dolor detectado: documentos dispersos en físico, Drive y correo. Es la propuesta de valor inmediata.

### P2 — Importante (diferencia el sistema del proceso manual)

4. **Panel centralizado de estado de acreditación por carrera**
   Incluye etapa actual, porcentaje de avance y fechas clave. Sin dashboard, el sistema sigue requiriendo consultas manuales y la DUEA continúa dependiendo de reportes informales.

5. **Alertas automáticas sobre fechas límite y hitos críticos**
   Los retrasos más graves ocurren porque nadie recuerda los plazos a tiempo. Sin alertas, el sistema pierde su ventaja sobre el proceso manual.

### P3 — Valioso (agrega valor estratégico)

6. **Reportes de avance exportables (PDF/Excel)**
   Con métricas de cumplimiento por carrera, facultad y periodo. Permite a la DUEA y autoridades tomar decisiones con datos consolidados y cumplir con rendición de cuentas externa. Puede incorporarse en una segunda iteración.

---

## 4. Reglas de negocio

### Gestión de procesos de acreditación
- Un proceso debe estar asociado obligatoriamente a una carrera y una facultad.
- No puede existir más de un proceso activo del mismo tipo (ARCU-SUR o CEUB) para una misma carrera en el mismo periodo.
- Todo proceso debe registrar: tipo de acreditación, organismo acreditador, gestión (año), fecha de inicio y fin.

### Gestión de usuarios y roles
- Cada usuario debe tener al menos un rol asignado (Administrador, Técnico, Coordinador, etc.).
- El acceso a funcionalidades está restringido según el rol.
- Solo el Administrador puede crear usuarios, asignar roles y modificar permisos.

### Gestión de evidencias
- Toda evidencia debe estar asociada a un criterio de evaluación y a un proceso de acreditación.
- No se permite guardar evidencias sin clasificación.
- El sistema debe registrar: fecha de carga y usuario responsable.
- Se debe mantener historial de versiones de documentos.

### Seguimiento y control
- El sistema debe mostrar el estado de cada proceso: En proceso / Acreditado / Vencido.
- El avance se calcula en función del cumplimiento de criterios.
- Se generan alertas automáticas cuando se acerquen fechas límite o existan actividades pendientes.

### Gestión de cronogramas
- Todo proceso debe contar con un cronograma definido.
- No se puede cerrar un proceso si existen tareas pendientes.
- Las fechas deben ser coherentes (inicio < fin).

### Generación de reportes
- El sistema debe permitir generar reportes por carrera, facultad y modalidad de acreditación.
- Los reportes deben basarse en información actualizada en tiempo real.

### Estados del sistema
- Todo proceso debe tener un estado definido.
- Los cambios de estado deben quedar registrados en un historial.
- Solo usuarios autorizados pueden cambiar el estado de un proceso.

### Seguridad y acceso
- El sistema requiere autenticación para el acceso.
- Los usuarios solo pueden visualizar información según su rol.
- Se debe registrar la actividad del usuario (bitácora de auditoría).

### Validaciones
- No se permite: crear procesos sin datos obligatorios, subir documentos incompletos ni duplicar registros críticos.
- El sistema debe mostrar mensajes de error claros al usuario.

### Inteligencia del sistema
- El sistema emite alertas automáticas de vencimiento.
- Sugiere organización de evidencias por criterio.
- Puede generar recomendaciones basadas en procesos anteriores.

---

## 5. Criterios de éxito

El sistema SIGESA funciona correctamente cuando se evidencia mejora real en el proceso de evaluación y acreditación, validado a través de los siguientes indicadores:

### Usabilidad
- Los usuarios completan sus tareas clave (registrar evidencias, hacer seguimiento, generar reportes) de manera eficiente.
- Se reduce el tiempo y los errores respecto al proceso actual.
- Medición: pruebas de usabilidad (tiempo de tarea, tasa de éxito, número de errores).

### Indicadores del proceso
- Reducción de retrasos en acreditaciones.
- Mayor cumplimiento de plazos.
- Disminución de documentos perdidos o duplicados.
- Incremento en la trazabilidad de la información.

### Satisfacción del usuario
- Técnicos, coordinadores y autoridades perciben el sistema como útil, fácil de usar y confiable.

### Impacto institucional
- Mejora en la toma de decisiones.
- Mayor transparencia en la gestión.
- Proceso de acreditación más organizado y auditable.

---

## 6. Ampliación y alineación con evidencia de proyecto (post v1)

Las siguientes subsecciones **no sustituyen** las secciones 1–5; amplían contexto institucional, actores, marco normativo de experiencia de usuario y señales de validación obtenidas del trabajo AcredIA (Bitácora 3).

### 6.1 Marco de investigación y alcance del diseño

- El diseño de SIGESA se apoya en **investigación centrada en el usuario** (entrevistas contextuales, encuestas, mapeo de procesos) y en normativas **CEUB** y **ARCU-SUR** como reglas de negocio nativas del sistema.
- El alcance documentado del proyecto de diseño incluye flujos para **tres perfiles principales:** técnico evaluador, jefatura de la DUEA y coordinador de carrera; wireframes en Balsamiq y Figma; **arquitectura de información** por rol; prototipo Hi-Fi con animaciones y flujos funcionales como referencia para implementación.

### 6.2 Dolor operativo cuantificado y visión de plataforma

- Además de la dispersión ya descrita en la sección 1, la evidencia de campo señala fricción concreta: **más de 20 minutos** por tarea solo para ubicar la versión final de un documento entre correos y chats; la jefatura sin **visibilidad en tiempo real** del avance; coordinadores sin certeza de si un documento fue **recibido y validado**.
- La visión complementaria del producto es una **única fuente de verdad**: centralización inteligente frente a WhatsApp, correo y pendrives; automatización que reduce carga administrativa; trazabilidad orientada a **auditorías** y cumplimiento de plazos ante organismos acreditadores.

### 6.3 Actores y necesidades transversales

- **Técnicos de la DUEA:** gestión operativa y documental; necesidad de eficiencia en bandeja de trabajo y validación de PDF/evidencias.
- **Jefatura / dirección DUEA:** decisiones estratégicas y visibilidad consolidada.
- **Jefe de evaluación:** supervisión y validación de información académica (rol institucional explícito en la bitácora).
- **Autoridades universitarias:** interés en resultados y transparencia.
- **Comunidad universitaria y externos:** estudiantes, egresados y docentes como parte del ecosistema impactado por la calidad y el estado de acreditación de los programas.

### 6.4 Coherencia con roles del documento base

- El documento original distingue **Administrador DUEA**, **Jefe de Carrera**, **Coordinador** y **público general**. La evidencia de diseño refuerza el rol operativo de **técnico DUEA** y la figura de **evaluador externo / par académico** en flujos de prueba; conviene mantener un **mapa rol–permiso** único en implementación para evitar ambigüedades de nomenclatura (p. ej. “Director de proceso” vs “Enlace técnico”) detectadas en evaluación heurística.

### 6.5 Módulos funcionales y enfoque “por procesos”

- La navegación prioritaria se alinea a **procesos de acreditación** (creación, cronograma, documentos, evaluación, historial, observaciones) más que a una estructura rígidamente segmentada solo por rol, manteniendo **control de acceso por rol** en backend.
- Módulos transversales relevantes para completitud del negocio: **planes de mejora**, **seguimiento** por carrera/criterio, **reportes**, **configuración** (criterios, tipos de documento, plantillas, estados), **ayuda** (manual, FAQ, soporte).

### 6.6 Inteligencia artificial, ética y confianza

- La IA se plantea como **asistencia**, no sustitución: clasificación y sugerencias, detección de faltantes, alertas, apoyo a reportes y patrones de retraso.
- Requisitos éticos y de cumplimiento: **RBAC**, autenticación segura, **encriptación**, políticas de uso y almacenamiento, **validación periódica** de algoritmos, **supervisión humana** en decisiones, explicabilidad de criterios, posibilidad de revisar decisiones automatizadas, **copias de seguridad**, monitoreo y planes de recuperación.

### 6.7 Señales de validación útiles para la definición de “éxito”

- Además de los criterios cualitativos de la sección 5, la validación del prototipo reporta indicadores que pueden alimentar **SLAs de producto** o metas de release: tasas de éxito en tareas críticas, tiempos de tarea por perfil, **CSAT**, conformidad **WCAG 2.2 nivel AA** en componentes revisados, y reducción de errores tras incorporar **retroalimentación inmediata** (barras de progreso, confirmaciones para acciones irreversibles, validación en tiempo real en formularios largos).

### 6.8 Riesgos residuales y línea de evolución

- Para mantener la promesa de visión en producción, la hoja de ruta debería considerar: recuperación ágil de errores (**deshacer** con ventana temporal), retroalimentación **determinista** en cargas pesadas, **diseño responsive** para coordinación desde campo, y personalización de densidad de ayudas para **usuarios expertos** (p. ej. reducción de ayuda contextual intrusiva).

---

## 7. Referencias rápidas del entregable AcredIA (Bitácora 3)

Enlaces y artefactos citados en la bitácora (útiles para trazabilidad del diseño y del negocio):

- Carpeta Drive — pruebas de usabilidad (enlace en documento fuente Bitácora 3).
- Prototipo Figma — *AcredIA – Design System*.
- FigJam — user journey / user flows.
- Miro — user persona.
- Balsamiq — wireframes tempranos.
- Pitch del producto (Google Drive, enlace en Bitácora 3).

*(Los enlaces exactos están en el PDF original de la bitácora; conviene copiarlos aquí cuando se estabilice la política de enlaces del repositorio.)*

---

## 8. Otras fuentes PDF del repositorio

| Archivo (en repo) | Relación con SIGESA |
|-------------------|---------------------|
| `bitacoras/Bitácora 1 - Lean Startup - AcredIA.pdf` | Continuidad del hilo AcredIA / descubrimiento de problema-solución; revisar en una v3 para alinear *problem/solution fit* con la sección 1. |
| `bitacoras/Bitacora Módulo 2 - AcredIA.pdf` | Evolución de requisitos y diseño intermedio; revisar en v3 para criterios de éxito y alcance. |
| `bitacoras/Bitácora 3 - VALIDACIÓN AL PROTOTIPADO Hi-Fi CON IA - AcredIA.pdf` | **Principal fuente** del suplemento de las secciones 6–8 de este documento. |

---

*Fin del documento de visión de negocio v2.*
