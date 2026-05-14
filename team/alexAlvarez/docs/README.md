# SIGESA: Sistema Gestor de Acreditaciones UMSS

**Documentación oficial del proyecto SIGESA:** Business Requirements Document (BRD), Architecture Decision Records (ADR), Functional Specification Documents (FSD) y otros artefactos técnicos. 

---

## Visión General

**SIGESA** (Sistema Gestor de Acreditaciones) es una plataforma web diseñada para orquestar, monitorear y auditar todo el ciclo de vida de los procesos de acreditación universitaria de la Universidad Mayor de San Simón (UMSS). 

El sistema soporta dinámicamente dos normativas de evaluación: **CEUB** (Nacional) y **ARCU-SUR** (Internacional). 

**Propósito Principal:** Transformar un proceso históricamente fragmentado y ambiguo en un flujo de trabajo lineal, orientado a procesos y estrictamente trazable. Elimina el problema de los "archivos huérfanos" obligando a que cada pieza de evidencia documental y cada subsanación resida exactamente dentro de la fase, dimensión e indicador normativo que le corresponde.

---

## El Problema que Resuelve

En versiones y enfoques anteriores, el proceso de acreditación enfrentaba cuellos de botella críticos en la comunicación y gestión de la información:
* Los documentos probatorios se dispersaban en múltiples formatos y canales (físico, Excel, Google Drive, correo electrónico, WhatsApp).
* Las observaciones generadas en las auditorías no se emparejaban eficientemente con las correcciones, causando pérdida de contexto.
* El estado real y el avance de una carrera eran invisibles para la Jefatura, requiriendo arqueos manuales constantes.
* No existía un mecanismo centralizado para hacer seguimiento de tiempos y responsabilidades.

**Solución sistémica de SIGESA:**
1.  **Arquitectura Orientada a Procesos:** La navegación y la carga de archivos ocurren dentro de una máquina de estados estricta.
2.  **Trazabilidad Absoluta:** Un documento rechazado no se elimina ni se sobrescribe; se observa. La nueva versión se ancla a la observación, manteniendo un historial inmutable.
3.  **Automatización Normativa:** Al seleccionar una normativa (CEUB o ARCU-SUR), el sistema despliega automáticamente las Dimensiones, Criterios e Indicadores estructurados.
4.  **Filtro de Contexto Global:** El sistema adapta la visibilidad de los datos automáticamente según los permisos y el alcance del usuario autenticado.

---

## Actores Principales (Roles)

El sistema opera con cuatro perfiles fundamentales, cada uno con niveles de acceso y responsabilidades delimitadas para garantizar la seguridad y fluidez del proceso.

### [CC] Coordinador de Carrera
* **Rol:** Operativo (Gestor de la evidencia).
* **Objetivo:** Cumplir con el framework de evaluación normativo para su programa académico.
* **Responsabilidades:** Carga inicial de evidencias documentales, revisión y respuesta a observaciones, corrección de indicadores rechazados y seguimiento del progreso de las fases.
* **Visibilidad:** Restringida exclusivamente a la carrera o programa que coordina.

### [TD] Técnico DUEA
* **Rol:** Auditor y orquestador operativo.
* **Objetivo:** Validar la calidad técnica, pertinencia y completitud de las evidencias presentadas.
* **Responsabilidades:** Revisión minuciosa de la evidencia, aprobación o rechazo de indicadores (exigiendo justificación documentada), generación de observaciones oficiales y autorización de cambio de estado en las fases.
* **Visibilidad:** Global (acceso a todas las carreras y facultades en proceso).

### [JD] Jefatura DUEA (Administrador)
* **Rol:** Estratégico y directivo.
* **Objetivo:** Supervisar la velocidad de los procesos, identificar bloqueos y garantizar la continuidad institucional.
* **Responsabilidades:** Monitoreo mediante paneles de control (dashboards), configuración maestra del sistema (gestión de usuarios, facultades, plantillas de normativas), aprobación de dictámenes finales y auditoría del historial de procesos.
* **Visibilidad:** Total (control absoluto sobre el sistema y sus métricas).

### [P] Público (Portal de Transparencia)
* **Rol:** Externo (Consultivo).
* **Acceso:** Estudiantes, empleadores, sociedad civil y organismos externos.
* **Responsabilidades:** Consultar el estado oficial de acreditación de las carreras y descargar certificaciones validadas por la institución.

---

## Flujo de Trabajo Crítico (Core Loop)

El motor lógico de SIGESA empuja a las carreras a través de un ciclo de vida iterativo y normado. 

**Jerarquía Estructural:** Dentro de cada fase, la evaluación se desglosa siguiendo este árbol de datos: `Proceso -> Fase -> Dimensión -> Criterio -> Indicador -> Evidencia`.

1.  **Fase Inicial (Preparación):** JD/TD configuran el nuevo proceso, asignan la carrera y seleccionan la normativa aplicable (CEUB/ARCU-SUR). El sistema carga el árbol de evaluación pertinente.
2.  **Fase 1 (Autoevaluación):** El CC carga las evidencias navegando por el árbol de indicadores. El TD audita y registra observaciones. El sistema bloquea la transición a la siguiente etapa si existen indicadores en estado "Pendiente" o "Rechazado".
3.  **Fase 2 (Evaluación Interna - Subsanaciones):** El CC atiende exclusivamente las observaciones levantadas, subiendo correcciones ancladas al problema original. El TD valida estas nuevas versiones hasta alcanzar el cumplimiento total.
4.  **Fase 3 (Evaluación Externa):** Acompañamiento a la visita de pares externos, registro del dictamen final, actualización del estado a "Acreditado" y publicación de resultados en el portal de transparencia.

---

## Especificaciones Funcionales (Prioridad)

* **P1 - Crítico (Core System):** Autenticación y autorización basada en roles (RBAC); motor de máquina de estados para el control de fases; repositorio documental append-only con versionamiento forzado anclado a indicadores específicos.
* **P2 - Importante (Optimización Operativa):** Dashboards gerenciales para visualización de avance y cuellos de botella; sistema automatizado de alertas para fechas fatales y vencimientos; módulo de gestión de observaciones con obligatoriedad de justificación.
* **P3 - Valioso (Escalabilidad y Transparencia):** Generación de reportes dinámicos exportables (PDF/Excel); log de auditoría histórica para procesos pasados; portal web público para consulta de certificaciones.

---

## Reglas de Negocio

A continuación, se detallan las restricciones sistémicas que gobiernan la lógica de la aplicación. Es imperativo que la implementación técnica respete estas definiciones para asegurar la integridad de la auditoría.

| Regla del Sistema | Definición y Comportamiento Esperado |
| :--- | :--- |
| **Aislamiento de Roles** | Un `[CC] Coordinador de Carrera` tiene permisos exclusivos de escritura sobre la subida de evidencia y respuesta a observaciones. No posee privilegios para crear procesos, modificar la estructura de las plantillas normativas o forzar el avance de una fase. Esas acciones son dominio de la Jefatura DUEA y Técnicos. |
| **Máquina de Estados Estricta** | El ciclo de vida de un indicador fluye como: `Pendiente -> Subido -> Observado -> Subsanado -> Aprobado`. Un proceso completo no puede darse por cerrado hasta que todos sus nodos hijos (indicadores) tengan una resolución afirmativa. |
| **Bloqueo de Avance (Hard Stop)** | El sistema no permitirá, bajo ninguna circunstancia, que una carrera transicione de la `Fase 1` a la `Fase 2`, o de la `Fase 2` a la `Fase 3`, si el motor detecta la existencia de al menos un (1) indicador con estado `Pendiente` o `Observado/Rechazado`. |
| **Carga de Plantillas Dinámicas** | La selección de la modalidad (CEUB o ARCU-SUR) durante la creación del proceso actúa como un trigger que instancia automáticamente en la base de datos la totalidad de fases, dimensiones, criterios e indicadores estipulados en los reglamentos vigentes, evitando la creación manual de la estructura. |
| **Trazabilidad y Versionamiento Append-Only** | Para cumplir con estándares de auditoría, los documentos subidos originalmente y posteriormente rechazados NUNCA deben ser eliminados de la base de datos ni del almacenamiento (soft-delete). Se conservan como versiones históricas vinculadas a la fecha y motivo de la observación del Técnico DUEA. |
| **Emparejamiento de Subsanación** | Cuando un Coordinador de Carrera corrige un error, la nueva evidencia (`v2`) debe insertarse en el sistema vinculada directamente mediante un ID relacional a la `Observación` específica que motivó el rechazo, garantizando la continuidad del contexto. |

---

## Contexto para Agentes de Inteligencia Artificial (AI Agent Directives)

Las siguientes instrucciones están diseñadas para configurar el contexto operativo de agentes de código (ej. Devin, Cursor, GitHub Copilot). Léelas y aplícalas antes de proponer cambios estructurales o escribir código.

* **Lenguaje de Dominio (Ubiquitous Language):** No inventes nombres para variables, entidades o modelos de base de datos. Utiliza estrictamente la nomenclatura definida en esta documentación. Mantén presente la jerarquía relacional: `Proceso -> Fase -> Dimensión -> Criterio -> Indicador -> Evidencia`. No confundas el término técnico `File` (el objeto binario) con `Evidence` (la entidad de negocio).
* **Gestión de Estados:** La lógica de transición no es un simple cambio de strings. Involucra validaciones en cascada. El bloqueo de avance por indicadores pendientes es una restricción dura (Hard Constraint) que debe reflejarse tanto en el frontend (deshabilitación de botones) como en los controladores del backend.
* **Persistencia de Datos:** Implementa un modelo de datos `Append-Only` para la entidad de Evidencias. Si generas controladores o mutaciones para actualizar documentos, asegúrate de crear un nuevo registro versionado en lugar de un `UPDATE` destructivo sobre el registro anterior.
* **Cobertura de Pruebas:** Al momento de generar Unit Tests o Integration Tests, prioriza escribir afirmaciones (assertions) que validen el ciclo de `Rechazo -> Observación -> Subsanación` y la restricción de visibilidad entre el `Coordinador de Carrera` y el `Técnico DUEA`.

---

## Estructura de la Documentación Auxiliar

Para profundizar en la lógica de dominio y especificaciones técnicas, referirse a los siguientes artefactos ubicados en el directorio `/context/`:

* `context/01_vision_negocio.txt`: Tareas principales, usuarios y alineación estratégica.
* `context/02_parte_dificil.txt`: Análisis detallado del ciclo de observación y subsanación, incluyendo casos de prueba y reglas duras.
* `context/03_domain_glossary.md`: Mapeo de términos de negocio a variables de software. *(Pendiente de integración)*
* `context/04_state_machine.md`: Reglas de transición lógica entre estados. *(Pendiente de integración)*

---

## Plantilla de Commits

Este repositorio utiliza una convención estandarizada para mantener el historial de cambios legible para sistemas de integración y auditorías. Configura tu entorno local aplicando el template `.gitmessage.txt`:

```bash
git config commit.template .gitmessage.txt
```

