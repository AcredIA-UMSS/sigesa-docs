# Alcance del Proyecto SIGESA

**Ámbito:** `team/alexAlvarez/docs/00_overview/`  
**Versión:** v1.0  
**Fecha:** 17/05/2026  
**Trazabilidad:** Deriva de [`../01_brd/BRD.md`](../01_brd/BRD.md) §5–7, [`../context/01_vision_negocio.txt`](../context/01_vision_negocio.txt) y [`definicion_producto.md`](definicion_producto.md)  
**Estado:** Borrador alineado a BRD v1.0  

---

## 1. Objetivo del documento

Este artefacto delimita con precisión **qué entra y qué no entra** en el producto SIGESA para el ciclo de acreditación UMSS gestionado por la DUEA. Su función es evitar deriva de alcance durante diseño técnico (PRD/FSD/DTI) y dar criterios verificables para aceptación de entregables en piloto y producción.

El alcance se expresa en **capacidades de negocio** y **restricciones de dominio**, no en stack tecnológico. Las decisiones de implementación pertenecen a carpetas posteriores (`04_fsd`, `05_nfr`, DTI si aplica).

---

## 2. Contexto institucional

La UMSS debe demostrar cumplimiento ante evaluadores internos y externos (CEUB, ARCU-SUR) para múltiples carreras en paralelo. Hoy, la evidencia normativa circula por canales no integrados; la DUEA asume costos de **reconciliación manual**, **pérdida de contexto** en observaciones y **invisibilidad del avance real** para la Jefatura.

SIGESA acota su misión a **digitalizar y auditar el flujo normativo** desde la apertura de un **Proceso** hasta la publicación del resultado, sin sustituir el juicio académico del evaluador ni los actos administrativos fuera del sistema.

---

## 3. Alcance IN (dentro del proyecto)

### 3.1 Dominio y taxonomía normativa

| ID | Elemento | Descripción detallada |
|----|----------|----------------------|
| **SCOPE-IN-01** | Marcos CEUB y ARCU-SUR | Modelado como **Modalidad** (Factory Pattern de negocio): al crear un **Proceso**, el sistema instancia automáticamente Fases, Dimensiones, Criterios e Indicadores de la plantilla vigente. |
| **SCOPE-IN-02** | Jerarquía completa | Operación obligatoria sobre: `Proceso → Fase → Dimensión → Criterio → Indicador → Evidencia`. Prohibida la carga “huérfana” sin indicador. |
| **SCOPE-IN-03** | Un proceso activo por carrera | Una **Carrera** puede tener historial de múltiples **Procesos**, pero solo **uno** en estado Activo simultáneamente (regla de negocio para evitar duplicidad de esfuerzo). |

### 3.2 Actores y permisos (RBAC de negocio)

| ID | Elemento | Descripción |
|----|----------|-------------|
| **SCOPE-IN-04** | [CC] Coordinador de Carrera | Escritura sobre **Evidencia** y respuestas de subsanación; lectura de observaciones y avance de su carrera únicamente. |
| **SCOPE-IN-05** | [TD] Técnico DUEA | Escritura sobre **Observaciones** y transiciones de estado del **Indicador**; revisión global de evidencias en proceso. |
| **SCOPE-IN-06** | [JD] Jefatura DUEA | Administración de usuarios, datos maestros, apertura/cierre de **Procesos**, dictámenes y configuración de publicación. |
| **SCOPE-IN-07** | [P] Público | Consulta de estados y certificados **ya publicados** por la institución (read-only). |

### 3.3 Ciclo de fases y máquina de estados

| ID | Elemento | Descripción |
|----|----------|-------------|
| **SCOPE-IN-08** | Tres fases secuenciales | Fase 1 Autoevaluación; Fase 2 Evaluación Interna (subsanación); Fase 3 Evaluación Externa. |
| **SCOPE-IN-09** | Máquina micro en Indicador | Estados: `PENDIENTE → SUBIDO → (APROBADO \| OBSERVADO) → SUBSANADO → … → APROBADO`. |
| **SCOPE-IN-10** | Hard stop de fase | API y UI deben rechazar transición si ∃ indicador ∉ {APROBADO} según regla agregada del BRD y `context/04_state_machine.md`. |

### 3.4 Evidencia, observaciones y trazabilidad

| ID | Elemento | Descripción |
|----|----------|-------------|
| **SCOPE-IN-11** | Repositorio append-only | Toda **Evidencia** registrada permanece en el historial; correcciones = nuevas versiones con enlace a **Observación**. |
| **SCOPE-IN-12** | Observaciones formales | [TD] registra no conformidad con texto obligatorio; el indicador pasa a **OBSERVADO**; plazos del cronograma institucional aplican. |
| **SCOPE-IN-13** | Emparejamiento de subsanación | La versión corregida referencia `observation_id` (o equivalente relacional); no se admite subsanación genérica desacoplada. |
| **SCOPE-IN-14** | Auditoría de eventos | Registro de quién, cuándo y qué transición ocurrió (carga, observación, subsanación, aprobación). |

### 3.5 Visibilidad, reportes y comunicación

| ID | Elemento | Descripción |
|----|----------|-------------|
| **SCOPE-IN-15** | Dashboards gerenciales | Vista [JD]/[TD] con semáforos de avance, cuellos de botella y procesos por facultad/carrera. |
| **SCOPE-IN-16** | Vista operativa [CC] | Avance por fase, indicadores pendientes/observados, plazos próximos (incl. experiencia mobile según PRD). |
| **SCOPE-IN-17** | Notificaciones | Alertas de observaciones nuevas, subsanaciones pendientes de revisión y fechas fatales (canales definidos en FSD; integración institucional en alcance MVP según PRD). |
| **SCOPE-IN-18** | Reportes exportables | Generación de reportes de cumplimiento en formatos acordados (PDF/Excel) para actas y seguimiento DUEA. |

### 3.6 Autenticación y seguridad (nivel negocio)

| ID | Elemento | Descripción |
|----|----------|-------------|
| **SCOPE-IN-19** | Identidad institucional | Autenticación mediante mecanismo UMSS (correo institucional u SSO acordado). |
| **SCOPE-IN-20** | Aislamiento por carrera | [CC] no accede a evidencia de otras carreras; filtro aplicado en todas las capas. |

---

## 4. Alcance OUT (explícitamente excluido)

| ID | Elemento excluido | Motivo |
|----|-------------------|--------|
| **SCOPE-OUT-01** | Integración en tiempo real con SIIS / ERP / RRHH | Complejidad institucional; fase posterior; importación batch o manual en piloto. |
| **SCOPE-OUT-02** | Pasarelas de pago o cobro por certificación | Fuera del problema de acreditación normativa. |
| **SCOPE-OUT-03** | Rankings internacionales (QS, THE, etc.) | No es objeto del marco CEUB/ARCU-SUR gestionado por DUEA. |
| **SCOPE-OUT-04** | Edición libre de la taxonomía por [CC] | La estructura normativa la gobierna [JD]/plantillas maestras, no el coordinador. |
| **SCOPE-OUT-05** | Borrado de evidencia por usuarios operativos | Contradice política append-only y auditoría. |
| **SCOPE-OUT-06** | Mensajería informal como canal oficial | WhatsApp/correo pueden coexistir en la institución, pero **no** sustituyen el registro en SIGESA para procesos piloto. |
| **SCOPE-OUT-07** | Especificación de frameworks, lenguajes o cloud | Pertenece a DTI/arquitectura, no a este documento de alcance de producto. |
| **SCOPE-OUT-08** | Gestión académica curricular (notas, matrícula) | Dominios ajenos; solo se referencian documentos probatorios de acreditación. |

---

## 5. Fronteras del sistema (context diagram narrativo)

**Dentro de la frontera SIGESA:**

- Usuarios autenticados [CC], [TD], [JD] operando sobre procesos de acreditación.
- Almacenamiento versionado de **Evidencia** y metadatos normativos.
- Motor de estados, observaciones, notificaciones y reportes descritos en §3.

**Fuera de la frontera (actores o sistemas externos):**

- Pares evaluadores externos (interacción parcialmente registrada en Fase 3; la visita física no es “implementada”).
- Sistemas legados UMSS (solo interfaces futuras, fuera de MVP).
- Autoridades que emiten resoluciones fuera del flujo — el sistema **almacena** la evidencia de esas resoluciones, no las genera.

---

## 6. Entregables por fase del proyecto documental

Este alcance se materializa en artefactos del repositorio, no solo en software:

| Fase documental | Entregable mínimo | Relación con alcance |
|-----------------|-------------------|---------------------|
| Overview | Este documento + definición producto | Delimitación |
| BRD | Objetivos SMART, KPIs, restricciones | Justificación de negocio |
| MRD / PRD | Segmentos, épicas, roadmap | Priorización |
| FSD | Casos de uso, reglas, contratos | Comportamiento verificable |
| NFR ISO 25010 | Seguridad, rendimiento, mantenibilidad | Calidad |
| Trazabilidad | Matriz REQ → prueba | Cobertura de auditoría docente |

---

## 7. Criterios de aceptación del alcance (Definition of Done — negocio)

El alcance IN se considerará **cumplido en piloto** cuando:

1. **Trazabilidad:** Para una carrera piloto en Fase 2, toda corrección post-observación sea recuperable como cadena `Observación → Evidencia v1 → Evidencia v2` sin huecos.
2. **Bloqueo:** Un intento de pasar a Fase 3 con ≥1 indicador **OBSERVADO** sea rechazado con mensaje accionable en UI y código HTTP 4xx en API.
3. **Aislamiento:** Un [CC] de carrera A no liste indicadores ni evidencias de carrera B (prueba de autorización).
4. **Visibilidad:** [JD] visualice el % de indicadores aprobados por proceso sin exportación manual a Excel.
5. **Canal único (piloto):** Acta institucional o equivalente que designe SIGESA como repositorio oficial para las carreras piloto.

---

## 8. Restricciones que condicionan el alcance

| ID | Restricción | Impacto en diseño |
|----|-------------|-------------------|
| **CST-01** | Append-only en **Evidencia** | Esquema de BD, APIs sin DELETE de prueba, UI sin “reemplazar archivo” |
| **CST-02** | Plazos del cronograma no editables por [CC] | Permisos y validación en backend |
| **CST-03** | CEUB/ARCU-SUR como únicas modalidades MVP | Plantillas precargadas; extensibilidad futura vía [JD] |
| **CST-04** | Cumplimiento normativo UMSS | Retención, logs, autenticación institucional |
| **CST-05** | Lenguaje ubicuo en APIs y docs | Nomenclatura [CC], [TD], [JD], Evidencia, Fase |

---

## 9. Supuestos y dependencias

| ID | Supuesto | Si falla… |
|----|----------|-----------|
| **ASM-01** | DUEA entrega datos maestros (facultades, carreras, plantillas) | Retraso en go-live; alcance funcional intacto pero sin contenido |
| **ASM-02** | Actores con conectividad y credenciales UMSS | Plan de capacitación y soporte |
| **ASM-03** | Estabilidad estructural de marcos CEUB/ARCU-SUR en piloto | Gestión de cambio de plantillas |
| **ASM-04** | Resolución de canal único para evidencia en piloto | Riesgo de doble fuente de verdad |
| **ASM-05** | Medición de línea base KPI antes del piloto | Metas SMART no verificables |

---

## 10. Riesgos de alcance (registro breve)

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Resistencia a dejar canales informales | Media | Alto | Patrocinio [JD] + KPI de adopción |
| Complejidad del bucle Fase 2 | Alta | Alto | Priorizar casos de prueba de subsanación en QA |
| Cambio normativo mid-piloto | Baja | Medio | Versionado de plantillas Modalidad |
| Subestimación de volumen documental | Media | Medio | NFR de almacenamiento y rendimiento (carpeta `05_nfr`) |

---

## 11. Relación con otros documentos

- **BRD:** Objetivos SMART y KPIs numéricos — [`../01_brd/BRD.md`](../01_brd/BRD.md)
- **PRD:** Épicas y roadmap de entrega — [`../03_prd/PRD.md`](../03_prd/PRD.md)
- **Parte difícil (subsanación):** [`../context/02_parte_dificil.txt`](../context/02_parte_dificil.txt)
- **Definición de producto:** [`definicion_producto.md`](definicion_producto.md)

---

## Historial de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 17/05/2026 | Alex Álvarez | Creación inicial; alineación estructura `00_overview/` |
