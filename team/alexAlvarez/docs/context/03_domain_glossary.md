# Glosario de Dominio (Domain Glossary)

Este documento establece el "Lenguaje Ubicuo" (Ubiquitous Language) del sistema SIGESA. Define las entidades estructurales, su comportamiento, cardinalidad y restricciones a nivel de base de datos y de negocio. Esta terminología debe usarse estrictamente en el código fuente, la base de datos y la arquitectura del sistema.

---

## Entidades Estructurales (Jerarquía de Acreditación)

La evaluación de una carrera se rige por una estructura de árbol estricta. Las relaciones son jerárquicas y no pueden saltarse niveles.

### 1. Proceso (Process / AccreditationCycle)
Es la entidad raíz que representa un intento formal de una Carrera por lograr o renovar su acreditación en un periodo determinado.
* **Cardinalidad:** Una Carrera (Career) puede tener múltiples Procesos en su historia (ej. Acreditación 2018, Renovación 2026), pero **solo un (1)** Proceso puede estar en estado `Activo` a la vez.
* **Atributos de Negocio:** Requiere asociarse obligatoriamente a una Carrera, un periodo de gestión (Año), una Modalidad normativa y un conjunto de fechas límite de ejecución.
* **Ciclo de Vida:** `Borrador → Activo → Acreditado / Rechazado / Vencido / Anulado`
* **Estado Anulado (soft delete):** El [JD] puede cerrar anticipadamente un Proceso `Activo` sin completar la acreditación (ej. retiro voluntario, cambio normativo, fuerza mayor). La acción **no elimina datos**; transiciona el Proceso a `Anulado` y preserva íntegramente todas las Evidencias, Observaciones e historial de transiciones para auditoría. Regla: FSD-BR-19.
* **Nota de UI:** La interfaz muestra el estado `Activo` con el badge visual **`"EN PROCESO"`**. Este es un mapeo de presentación; el valor persistido en base de datos es `ACTIVO`.

### 2. Modalidad (Framework / Modality)
Representa el marco normativo y legal que auditará el Proceso. En SIGESA, existen dos entidades predefinidas: **CEUB** (Nacional) y **ARCU-SUR** (Internacional).
* **Comportamiento Sistémico:** La selección de la Modalidad actúa como un patrón "Factory". Al instanciar un Proceso con una Modalidad, el sistema debe replicar e inyectar automáticamente todo el árbol estático correspondiente de Dimensiones, Criterios e Indicadores.

### 3. Fase (Phase / Stage)
Agrupación temporal y lógica que determina qué acciones están permitidas en el Proceso en un momento dado. Un proceso estándar en SIGESA tiene tres fases secuenciales:

| # | Nombre canónico | Label UI (formulario) | Descripción funcional |
|---|----------------|----------------------|----------------------|
| **Fase 1** | **Autoevaluación** | "Autoevaluación" | El [CC] recopila y carga Evidencias masivamente para todos los Indicadores del Proceso. |
| **Fase 2** | **Evaluación Interna** | "Evaluación Interna" | El [TD] audita las Evidencias. Solo se admiten subsanaciones vinculadas a Observaciones específicas abiertas; sin carga masiva nueva. |
| **Fase 3** | **Evaluación Externa** | "Evaluación Externa" | Presentación a pares evaluadores externos, [JD] y stakeholders. Vista de solo lectura para [CC] y [TD]; el [JD] registra el Dictamen Final. |

* **Restricción:** El motor del sistema no permite avanzar a la Fase *N+1* si la Fase *N* tiene dependencias (Indicadores) no resueltas — ver FSD-BR-07.
* **Nota de UI:** Los radio buttons en el formulario de creación de Proceso usan las etiquetas "Autoevaluación" / "Evaluación Interna" / "Evaluación Externa". Los valores "Evaluación documental / presencial" que aparecen en el diseño actual (Figma node `37:173`) **no son correctos** y deben actualizarse en el diseño.

### 4. Dimensión (Dimension)
El primer nivel taxonómico dentro del modelo de evaluación definido por la Modalidad (ej. "Contexto Institucional", "Proyecto Académico"). 
* **Función:** Actúa puramente como un contenedor lógico y visual para organizar Criterios. No posee lógica de estado propia.

### 5. Criterio (Criterion)
El segundo nivel taxonómico. Agrupa una serie de Indicadores bajo una temática específica. Al igual que la Dimensión, es un contenedor estructural.

### 6. Indicador (Indicator)
**La entidad transaccional más crítica del sistema.** Es el elemento atómico evaluable de la normativa.
* **Función:** Es el "nodo de anclaje". Toda Evidencia documental se sube contra un Indicador específico, nunca al vacío.
* **Comportamiento:** La Máquina de Estados micro-nivel reside aquí. Las decisiones de aprobación, rechazo y subsanación ocurren exclusivamente a nivel de Indicador.

---

## Entidades Operativas

### 7. Evidencia (Evidence / DocumentVersion)
Objeto de negocio que encapsula el respaldo documental (PDFs, resoluciones, planillas) cargado para satisfacer un Indicador.
* **Restricción de Mutabilidad (Append-Only):** Por normativas de auditoría, la Evidencia es **inmutable**. Un archivo subido nunca sufre un evento `DELETE` o un `UPDATE` destructivo en base de datos. Si una evidencia es rechazada, la corrección debe insertarse como un nuevo registro (ej. `v2`) relacionado a la anterior, preservando la trazabilidad.

### 8. Observación (Observation / AuditNote)
El registro formal de una no-conformidad emitido por un auditor técnico.
* **Relación:** Pertenece a un Indicador y apunta a una versión específica de Evidencia.
* **Bloqueo Sistémico:** La existencia de una Observación con estado "Abierto" cambia el estado del Indicador a "Observado" e impide automáticamente el cierre de la Fase actual.

---

## Actores y Permisos (Roles)

* **Coordinador de Carrera [CC]:** Ámbito de aplicación local (solo su carrera). Posee permisos de escritura (Create/Update) exclusivos sobre las entidades `Evidencia`. No puede modificar estructuras ni aprobar procesos.
* **Técnico DUEA [TD]:** Ámbito de aplicación global. Posee permisos de escritura sobre las entidades `Observación` y controla las transiciones de estado de los `Indicadores`. 
* **Jefatura DUEA [JD]:** Administrador. Permisos globales para crear `Procesos`, modificar diccionarios de datos (`Modalidad`, `Dimensión`) y gestionar accesos.
* **Público [P]:** Actor anónimo (sin sesión). Solo posee permisos de lectura (Read-Only) hacia vistas materializadas de dictámenes finales y certificados.