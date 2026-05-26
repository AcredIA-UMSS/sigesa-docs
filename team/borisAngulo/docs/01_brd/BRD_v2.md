# Business Requirements Document (BRD) – SIGESA v2

> **Propósito del BRD**: formalizar las **necesidades y restricciones de negocio** que justifican la existencia del producto, *independientemente de la solución técnica*. Responde a **"¿qué necesita el negocio y por qué?"**.
>
> **Alcance en este módulo**: en este Módulo 4, **todos los grupos entregan BRD** como primer documento de la cadena `BRD → MRD → PRD → FSD → DTI`. El BRD captura la visión del *sponsor*; el MRD profundizará luego la mirada de mercado y competencia.
>
> El BRD debe alinearse al marco conceptual visto en S02 (método científico aplicado al software): aquí formulamos la **etapa "Problema"** —qué dolor real resolvemos y por qué importa— antes de pasar a la abstracción de producto en MRD/PRD.

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA — Sistema de Gestión de Evaluación y Acreditación |
| Grupo | AcredIA (`team/borisAngulo`) |
| Versión | v2.0 |
| Fecha | 11/05/2026 |
| Sponsor de negocio | Dirección / responsable DUEA UMSS (por confirmar en acta) |
| Stakeholders | DUEA; jefaturas y coordinación de carrera; técnicos operativos y de trámites; rectoría / decanatos / secretarías académicas; CEUB / ARCU-SUR; evaluadores externos; público general |
| Autores | Equipo AcredIA (documento derivado de visión de negocio v2) |
| Revisores | Docente + 1 grupo par |
| Estado | Borrador |
| Insumo del Módulo Anterior (M2 UI/UX) | `./team/borisAngulo/01_vision_negocio_v2.txt` |
| Prompts utilizados | PM-005 |

## 1. Resumen ejecutivo

- **Problema:** La UMSS gestiona evaluación y acreditación de carreras (ARCU-SUR / CEUB) con herramientas dispersas (Excel aislados, correo, pendrives, mensajería), sin repositorio único de verdad; la evidencia más fuerte del dolor es la **pérdida de trazabilidad y tiempo** en localizar versiones finales y el **riesgo de incumplimiento de plazos** por falta de visibilidad centralizada.

- **Propuesta:** SIGESA — plataforma de negocio que **centraliza** procesos por carrera y facultad, **gestiona fases** de acreditación (autoevaluación hasta resolución final), **versiona y audita evidencias** vinculadas a criterios, y ofrece **panel de estado**, **alertas** y **reportes ejecutivos** con UX de baja curva de aprendizaje para jefatura y personal técnico.

- **Valor esperado (objetivos cuantitativos a validar en piloto):** reducción del **tiempo** en tareas clave de evidencias y seguimiento (medido en pruebas de usabilidad); **↑ cumplimiento de plazos** en hitos de acreditación; **↓ documentos duplicados o sin clasificar**; mejora de **percepción de utilidad y confiabilidad** (encuesta post-uso).

- **Métricas clave:** (1) **North Star:** porcentaje de procesos activos con evidencias críticas trazables y al día según cronograma — meta **≥ 80 %** al cierre del piloto (horizonte académico acordado con DUEA); (2) **Cumplimiento de fechas límite** en fases — meta **mejora ≥ 20 %** vs. línea base «por medir antes del lanzamiento»; (3) **Satisfacción** (técnicos, coordinadores, autoridades) — meta **≥ 4/5** en escala Likert tras estabilización.

- **Llamada a la acción:** el *sponsor* debe **validar alcance MoSCoW**, **asignar responsable DUEA** para decisiones de roles y datos maestros (carreras, facultades), **facilitar acceso** a normativa y muestras de procesos reales, y **autorizar ventana de piloto** con carreras piloto definidas.

## 2. Contexto del negocio

- **Organización**: Universidad Mayor de San Simón (UMSS), Cochabamba, Bolivia.
- **Unidad impactada**: Dirección Universitaria de Evaluación y Acreditación (DUEA) y, transversalmente, facultades, carreras y unidades que proveen evidencias y trámites asociados.
- **Proceso(s) de negocio afectado(s)**: ciclo de **evaluación y acreditación de carreras** alineado a **ARCU-SUR** y **CEUB** — en particular autoevaluación, documentación, visita de pares, informe externo y resolución final; soporte a **emisión de constancias** relacionadas con estado de acreditación cuando aplique.
- **Estrategia de la organización** que justifica el proyecto (objetivo estratégico vinculado): fortalecer la **calidad académica**, la **transparencia** y la **capacidad de auditoría** institucional frente a organismos acreditadores y la comunidad universitaria, reduciendo la carga administrativa y la dependencia de medios informales.

## 3. Problema y oportunidad de negocio

### 3.1 Problema

La acreditación exige evidencias por criterio, plazos e hitos coordinados entre muchos actores. Hoy la información vive repartida entre **documentos físicos**, **hojas de cálculo no integradas**, **correo**, **almacenamiento removible** y **canales informales**, lo que produce **duplicidad**, **poca trazabilidad** y **dificultad para saber el avance real** por carrera o facultad. Los síntomas incluyen **retrasos en plazos**, **alta carga administrativa** y **decisiones tardías** por falta de una vista consolidada. Una causa raíz es la **ausencia de un sistema de registro único** que relacione proceso, criterio, evidencia y versión con **auditoría** (quién, cuándo). El personal técnico reporta fricción al ubicar la «versión final» entre canales, con **costo de tiempo y riesgo de error** por documento. La consecuencia de no actuar es continuar con **incumplimientos**, **pérdida de conocimiento** ante rotación de gestión y **menor confianza** en la rendición de cuentas frente a CEUB/ARCU-SUR y autoridades internas.

### 3.2 Oportunidad

- **Valor económico estimado**: ahorro de horas-hombre en búsqueda de versiones, reuniones de seguimiento y retrabajo por observaciones mal canalizadas; *cifras en USD/BOB por formalizar* en el piloto con línea base de tiempos por tarea.
- **Valor estratégico / reputacional**: mayor **preparación demostrable** para visitas e informes; **continuidad** entre ciclos de acreditación gracias al historial institucional.
- **Ventana de oportunidad (*time‑to‑value*)**: la hipótesis validada en levantamiento indica que un **panel simple para jefatura** más **repositorio con versionado** para técnicos reduce fricciones en el **primer ciclo de uso** si el alcance Must Have del MoSCoW se cumple.

### 3.3 Evidencia de Continuous Discovery

> Vincula este BRD al **track de Discovery** del Dual‑Track Agile (ver S04 §B6). El BRD no se escribe en el vacío: se sostiene en evidencia de campo.

- **Documento de Discovery**: `docs/discovery/discovery_v0.1.md` (entregable de S03) — *vinculación formal pendiente si el archivo aún no existe en el repo*.
- **Entrevistas realizadas**: *n por medir y documentar en Discovery* con perfiles Administrador DUEA, Coordinador/Jefe de Carrera, Técnico operativo (resumen en anexo de Discovery cuando se consolide).
- **Hipótesis principales validadas / refutadas**: según `01_vision_negocio_v2.txt`, hipótesis **validada en levantamiento**: *«Si la jefatura tiene panel de baja curva de aprendizaje y los técnicos tienen repositorio con versionado e historial claro, se reducen fricciones y aumenta la probabilidad de cumplir plazos y requisitos»* — detalle de método y muestra en Discovery.
- **Artefactos M2 (UI/UX)** que sustentan la propuesta: wireframes / journeys / casos de uso del Módulo 2 — *rutas por enlazar cuando estén publicados*.
- **Próxima cadencia de Discovery**: *semanal o quincenal por definir con el docente y DUEA* durante la iteración del producto.

## 4. Usuarios objetivo / Personas clave

> Identifiquen los **1 o 2 usuarios principales** del sistema desde la perspectiva del negocio (no técnica). Profundizarán este análisis en el MRD y PRD; aquí basta con caracterizarlos lo suficiente para validar la propuesta de valor.

### 4.1 Persona principal

| Atributo | Valor |
|----------|-------|
| Nombre / rol | **Administrador DUEA** |
| Contexto | Supervisa **todas** las carreras en acreditación; necesita estado unificado sin depender de consultas informales a cada jefatura. |
| *Jobs‑to‑be‑done* | Ver estado actualizado global; **aprobar / rechazar / observar** fases entregadas por coordinación; consultar **historial de ciclos** anteriores para continuidad institucional. |
| Dolores principales | Reportes informales; falta de **semáforo** de riesgo; dependencia de Excel/correo; riesgo de pérdida de información con cambios de gestión. |
| Ganancia esperada | **Control**, **plazos visibles**, **trazabilidad** y base para **reportes ejecutivos** y auditoría. |

### 4.2 Persona secundaria (opcional)

| Atributo | Valor |
|----------|-------|
| Nombre / rol | **Coordinador de Carrera** (con **Jefe de Carrera** como actor de carga y seguimiento estrechamente alineado) |
| Contexto | Gestiona autoevaluación, recoge evidencias con docentes y administrativos, atiende **criterios** ARCU-SUR/CEUB y plazos de la DUEA. |
| *Jobs‑to‑be‑done* | Organizar evidencias por criterio y fase; responder **observaciones DUEA**; usar **carga masiva / planilla** donde aplique; mantener al día el **cronograma** de la carrera. |
| Dolores principales | Dispersión de archivos; dificultad para probar cumplimiento; **observaciones** no centralizadas. |
| Ganancia esperada | **Bandeja de observaciones**, panel de progreso, menos errores y **alertas** antes de vencer hitos. |

## 5. Propuesta de valor

> Síntesis tipo *Value Proposition Canvas* (Osterwalder). Debe poder leerse de pie.

| Eje | Contenido |
|-----|-----------|
| **Para quién** (cliente / usuario principal) | DUEA y equipos de carrera (coordinación/jefatura) que deben cumplir ARCU-SUR/CEUB en la UMSS. |
| **Que necesita** (*job‑to‑be‑done*) | Gestionar un **ciclo de acreditación** con evidencias **clasificadas**, **versionadas** y **auditables**, con **visibilidad** de avance y **alertas** de plazo. |
| **Nuestra propuesta es** (producto / servicio) | **SIGESA**: sistema activo de gestión de fases, evidencias y reportes, con normativa local en el diseño del flujo. |
| **Que le aporta** (*pain relievers* + *gain creators*) | Un solo lugar para estado por carrera/facultad; **historial de versiones** con responsable y fecha; **flujo de observaciones**; **reporte ejecutivo** en PDF en ≤ 2 clics; **UX** de baja curva; **modal** anti-borrado accidental. |
| **A diferencia de** (alternativa actual) | Excel+correo+pendrive+mensajería; repositorios pasivos sin reglas de proceso ni alertas. |
| **Nuestro diferencial es** (*unique value*) | **Normativa y flujo CEUB/ARCU-SUR nativos**; sistema **activo** (notificaciones, versiones, reportes); sin modelo de **membresía** tipo plataformas globales; foco en **cumplimiento local** frente a cajas «internacionales» mal adaptadas. |

## 6. Panorama competitivo (resumen)

> Visión sintética suficiente para sustentar el BRD. El **análisis profundo** vive en el MRD; aquí basta con ubicar el producto.

| Competidor / alternativa | Tipo (directo / indirecto / *do‑nothing*) | Fortaleza percibida | Debilidad percibida |
|--------------------------|--------------------------------------------|---------------------|---------------------|
| Proceso actual (hojas de cálculo, correo, físico, mensajería) | *do‑nothing* | bajo costo de adopción inmediata | sin trazabilidad ni alertas; alto riesgo de error |
| Plataformas / marcos globales (p. ej. QS Stars, THE, AACSB, Cognia como referentes de madurez) | indirecto | benchmarks de calidad institucional | bajo encaje con **cumplimiento normativo local** CEUB/ARCU-SUR si no se parametrizan |
| Repositorios o DMS genéricos (Drive, carpetas de red) | indirecto | almacenamiento conocido | no modelan **fases**, **criterios** ni **RACI** DUEA–carrera |
| SIGESA (propuesta) | directo (objetivo) | flujo y evidencias **alineados** a UMSS y organismos bolivianos | requiere **piloto**, capacitación y gobernanza de datos |

> Nota: este resumen se complementa con la sección de competencia del MRD (`docs/mrd/MRD_v0.1.md`).

## 7. Business Model Canvas

> Síntesis del **modelo de negocio** del producto en los 9 bloques de Osterwalder. Debe contener **al menos 3 elementos por bloque** (criterio de parada de la consigna).

| Bloque | Mínimo 3 elementos concretos |
|--------|-------------------------------|
| 1. Segmentos de clientes | UMSS / DUEA / Facultades y carreras en acreditación / Público que consulta estado de acreditación |
| 2. Propuesta de valor | Trazabilidad de evidencias / Gestión de fases y plazos / Reportes para decisiones y rendición de cuentas |
| 3. Canales | Web institucional (futuro enlace) / Capacitación presencial o virtual / Comunicación interna DUEA–carreras |
| 4. Relación con clientes | Soporte en piloto / Observaciones formales en flujo / Auditoría de uso y mejoras continuas |
| 5. Fuentes de ingresos | No aplica modelo de ingreso por licencia al estudiante final (*Won’t Have*: pagos en línea por certificaciones) / Presupuesto institucional de TI o proyecto / Posibles fondos de mejora calidad (por explorar en MRD) |
| 6. Recursos clave | Equipo AcredIA / Datos maestros de carreras y facultades / Normativa CEUB–ARCU-SUR y reglamento UMSS / Infraestructura de servidores UMSS |
| 7. Actividades clave | Parametrización de procesos y roles / Carga y validación de evidencias / Seguimiento de cronogramas y alertas |
| 8. Socios clave | CEUB / ARCU-SUR / Vicerrectoría y decanatos / Secretarías académicas / Evaluadores externos |
| 9. Estructura de costos | Desarrollo y mantenimiento / Infraestructura / Capacitación y change management / Operación de soporte |

## 8. Métricas clave de éxito (North Star + apoyo)

> Aquí declaran los **KPIs de negocio** que medirán si el proyecto resuelve realmente el problema. Si falta una línea base, decláralo explícitamente como "por medir antes del lanzamiento".

| ID | KPI | North Star? | Línea base | Meta | Horizonte | Fuente del dato |
|----|-----|-------------|------------|------|-----------|-----------------|
| KPI-01 | % de procesos activos con evidencias críticas al día vs. cronograma | sí | por medir antes del lanzamiento | ≥ 80 % en piloto | ciclo académico acordado | SIGESA + validación DUEA |
| KPI-02 | Cumplimiento de fechas límite de fases (hitos) | no | por medir antes del lanzamiento | mejora ≥ 20 % vs. línea base | mismo horizonte | SIGESA (fechas planificadas vs. reales) |
| KPI-03 | Tiempo medio de tareas clave (cargar evidencia, revisar estado, generar reporte ejecutivo) | no | por medir antes del lanzamiento | reducción ≥ 25 % vs. línea base | post–piloto | Pruebas de usabilidad + logs |
| KPI-04 | Satisfacción percibida (técnicos, coordinadores, autoridades): útil, fácil, confiable | no | por medir antes del lanzamiento | ≥ 4/5 | post–piloto | Encuesta institucional |

## 9. Objetivos de negocio (SMART)

| ID | Objetivo | Métrica | Línea base | Meta | Horizonte |
|----|----------|---------|------------|------|-----------|
| BO-01 | Reducir retrasos en hitos de acreditación en carreras piloto | % hitos a tiempo | por medir | +20 pp vs. línea base | fin del piloto |
| BO-02 | Aumentar trazabilidad de evidencias (versiones con autor y fecha) | % de evidencias con metadatos completos | por medir | ≥ 95 % en piloto | fin del piloto |
| BO-03 | Mejorar transparencia para decisiones de DUEA | uso mensual del reporte ejecutivo PDF | 0 | ≥ 1 generación / carrera / mes en piloto | durante el piloto |

## 10. Stakeholders y roles (modelo RACI)

| Stakeholder | Interés | R / A / C / I |
|-------------|---------|----------------|
| Sponsor (Vicerrectoría / máxima autoridad académica delegada) | estratégico, presupuesto | A |
| DUEA (Administrador) | operación del sistema y cumplimiento | R |
| Coordinación / Jefe de Carrera | evidencias y plazos de su carrera | R |
| Técnico operativo / trámites | precisión documental y certificaciones asociadas | R |
| TI / Infraestructura UMSS | despliegue, seguridad, respaldos | C |
| CEUB / ARCU-SUR | cumplimiento normativo externo | I |
| Estudiantes / público general | transparencia de estado público | I |

## 11. Requerimientos de negocio

> Cada ítem debe poder responder: ¿qué necesita el negocio, y cómo sabremos que se cumplió? **No** describir soluciones técnicas.

| ID | Requerimiento de negocio | Prioridad (MoSCoW) | Justificación | Métrica de aceptación |
|----|---------------------------|--------------------|---------------|-----------------------|
| BR-001 | Autenticación y autorización por **roles** (administrador, coordinador, jefe, técnico, evaluador externo, público) | Must | Sin roles no hay gobierno del proceso | 100 % de acciones sensibles exigen usuario autenticado con rol válido |
| BR-002 | **Gestión de actividades** en **fases** del proceso de acreditación | Must | Núcleo operativo ARCU-SUR/CEUB | Toda carrera en piloto tiene fases creadas y estados registrados |
| BR-003 | **Creación y administración de fases** por administrador DUEA | Must | Control institucional del ciclo | Solo rol admin puede crear/cerrar fases según reglas |
| BR-004 | **Editor de planilla / carga masiva** para coordinador (donde aplique) | Must | Eficiencia en volumen de actividades | Coordinador puede importar/actividades sin reingreso manual total |
| BR-005 | **Base de datos de actividades** con trazabilidad mínima por fase | Must | Continuidad y auditoría | Cada actividad clave tiene responsable y estado en el tiempo |
| BR-006 | Selección de **tipo de acreditación** (ARCU-SUR / CEUB u otros definidos) | Should | Evita ambigüedad normativa | 100 % de procesos con tipo explícito |
| BR-007 | **Subida de documentos** vinculados a **criterios** y **fases** | Should | Evidencia exigible por norma | 0 evidencias sin clasificación aceptadas en producción |
| BR-008 | **Flujo de observaciones** DUEA ↔ carrera | Should | Reduce idas y vueltas informales | 100 % de observaciones registradas en el sistema en piloto |
| BR-009 | **Panel** de estado por carrera y facultad con **semáforo** de riesgo | Should | Visibilidad para decisión | DUEA puede ver semáforo de todas las carreras piloto sin reportes paralelos |
| BR-010 | **Alertas automáticas** por plazos e hitos sin intervención manual por cada aviso | Should | Mitiga el principal riesgo de retraso | ≥ 90 % de alertas configuradas se entregan a tiempo en prueba |
| BR-011 | **Reporte ejecutivo** exportable a PDF en **≤ 2 clics** desde el contexto de trabajo | Should | Rendición de cuentas rápida | Usuario piloto completa flujo en ≤ 2 clics en prueba de aceptación |
| BR-012 | **Reportes amplios** (PDF/Excel) por carrera, facultad y periodo | Could | Valor estratégico MRD | Disponible al menos un formato consolidado en iteración acordada |
| BR-013 | **Chatbot informacional** (FAQs, enlaces a normativa) sin sustituir decisiones | Could | Reduce consultas repetitivas | Respuestas acotadas a contenido aprobado por DUEA |

## 12. Reglas de negocio y políticas

| ID | Regla | Tipo | Origen |
|----|-------|------|--------|
| RB-01 | Un proceso debe estar asociado obligatoriamente a una **carrera** y una **facultad** | negocio | visión + gobierno de datos UMSS |
| RB-02 | No más de **un proceso activo** del mismo tipo (ARCU-SUR o CEUB) por carrera y periodo | negocio | visión |
| RB-03 | Todo proceso registra: tipo de acreditación, organismo, gestión (año), fecha inicio y fin | normativa / operación | CEUB/ARCU-SUR + visión |
| RB-04 | Cada usuario tiene al menos un **rol**; el acceso está restringido por rol | seguridad | visión |
| RB-05 | Solo el **Administrador** crea usuarios, asigna roles y modifica permisos | política | visión |
| RB-06 | Toda evidencia asociada a **criterio** y **proceso**; no se guarda sin clasificación | negocio | visión |
| RB-07 | Registro de **fecha de carga** y **usuario responsable**; historial de **versiones** | auditoría | visión |
| RB-08 | Estados de proceso: **En proceso / Acreditado / Vencido**; avance según cumplimiento de criterios | negocio | visión |
| RB-09 | **Cronograma** obligatorio; no cerrar proceso con **tareas pendientes**; fechas coherentes (inicio < fin) | negocio | visión |
| RB-10 | Cambios de estado solo por usuarios **autorizados** y registrados en **historial** | auditoría | visión |
| RB-11 | Autenticación obligatoria; **bitácora de auditoría** de actividad | seguridad / cumplimiento | visión |
| RB-12 | No crear procesos sin datos obligatorios; no subir documentos incompletos; no duplicar registros críticos | validación | visión |

## 13. Supuestos, restricciones y dependencias

- **Supuestos**: la UMSS dispone de **identidad institucional** o mecanismo de cuentas acordado; carreras y facultades tienen **datos maestros** disponibles o serán cargados por DUEA; los usuarios clave tienen **conectividad** razonable; existe **voluntad de cambio** en jefaturas piloto.
- **Restricciones**: cumplimiento de **Ley 164** (protección de datos personales) y políticas UMSS; **alcance MoSCoW** excluye pagos en línea por certificaciones, motor automático completo de matrices de evaluación, y bitácoras narrativas automáticas no basadas en eventos reales; responsables de **respaldos** definidos con TI.
- **Dependencias**: validación legal de textos públicos; **calendario académico** y hitos CEUB/ARCU-SUR; posibles integraciones futuras con sistemas académicos (por detallar en MRD); **aprobación** de matrices de permisos por DUEA.

## 14. Alcance de negocio

### 14.1 En alcance
- Gestión de **procesos** de acreditación por carrera y facultad (ARCU-SUR / CEUB).
- **Fases** desde autoevaluación hasta resolución final, con observaciones y estados.
- **Evidencias** por criterio con versionado y auditoría mínima.
- **Panel** de seguimiento, **alertas**, **reporte ejecutivo** y, según iteración, **reportes amplios**.
- Roles: administrador DUEA, jefe/coordinador, técnico, evaluador externo acotado, público general de lectura.
- Perfiles técnicos operativos y de trámites según MoSCoW Should Have.

### 14.2 Fuera de alcance
- **Pagos en línea** por certificaciones (*Won’t Have* versión actual).
- **Motor automático completo** de matrices de evaluación como única fuente de calificación (excluido; vistas/plantillas manuales pueden evaluarse aparte).
- **Respaldo exclusivamente manual** desconectado del sistema como única política (la política institucional de respaldo debe alinearse al módulo admin cuando corresponda).
- **Generación automática de bitácoras legales** sin base en eventos reales del sistema (la auditoría por **eventos** sí está en alcance normativo).

## 15. Beneficios esperados y *business case* resumido

| Tipo | Año 1 | Año 2 | Año 3 |
|------|-------|-------|-------|
| Ahorro operativo (horas-hombre estimadas) | por estimar en piloto | por estimar | por estimar |
| Ingresos adicionales | N/A (proyecto institucional) | N/A | N/A |
| Inversión (CAPEX) | por estimar (desarrollo + infra) | — | — |
| Costo operación (OPEX) | por estimar (soporte, nube/servidor) | por estimar | por estimar |
| **VAN** | por calcular cuando existan flujos de caja | | |
| **TIR** | por calcular cuando existan flujos de caja | | |

## 16. Riesgos de negocio

| Riesgo | Probabilidad | Impacto | Mitigación | Responsable |
|--------|--------------|---------|------------|-------------|
| Baja adopción por curva de aprendizaje | media | alta | UX «tipo ofimática», capacitación, piloto por carrera | PM + DUEA |
| Resistencia al cambio desde canales informales | media | media | Quick wins (versionado + observaciones); sponsor visible | Sponsor |
| Datos maestros incompletos (carreras/facultades) | media | alta | Plan de carga inicial con TI y secretarías | DUEA / TI |
| Desalineación con interpretación CEUB/ARCU-SUR | baja | alta | Validación formal con DUEA y referentes normativos | Sponsor / DUEA |
| Riesgo de permisos mal configurados | media | alta | Matriz RACI y pruebas de rol antes de producción | PM / QA |

## 17. Criterios de éxito del proyecto de negocio

- Cumplimiento de ≥ 80 % de los **objetivos SMART** (BO-01 a BO-03) al cierre del piloto, con líneas base documentadas.
- **Business case** cualitativo positivo (ahorro de tiempo y errores) y, cuando existan cifras, **VAN** revisado al año 1.
- Satisfacción del *sponsor* ≥ 4/5 y alineación con **criterios de éxito** de la visión (usabilidad, proceso, satisfacción de usuario, impacto institucional).

## 18. Trazabilidad a documentos hijos

| BRD ID | MRD relacionado | PRD relacionado | Caso de uso FSD |
|--------|-----------------|-----------------|-----------------|
| BR-001 a BR-005 | MRD-N-01 | PRD-REQ-001, PRD-REQ-002 | FSD-UC-001, FSD-UC-002 |
| BR-006 a BR-008 | MRD-N-02 | PRD-REQ-006 … 008 | FSD-UC-003, FSD-UC-004 |
| BR-009 a BR-011 | MRD-N-03, MRD-N-04 | PRD-REQ-005, 009, 011 | FSD-UC-002, FSD-UC-005, FSD-UC-006, FSD-UC-007 |
| BR-012 a BR-013 | MRD-N-05 | PRD-REQ-012, backlog | GAP-001, GAP-004, backlog |

## 19. Aprobaciones

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Sponsor | | | |
| PM | | | |
| Arquitecto | | | |

## 20. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v0.1 | — | — | versión inicial plantilla / BRD previo |
| v2.0 | 11/05/2026 | AcredIA | BRD v2 generado desde `./team/borisAngulo/01_vision_negocio_v2.txt` siguiendo `BRD_TEMPLATE.md` |

## 21. Anexo opcional — PR‑FAQ Amazon‑style (Working Backwards)

> **Opcional**. El equipo puede optar por presentar la propuesta como **PR‑FAQ** estilo Amazon (ver S04 §B7.1). No reemplaza al BRD: lo **acompaña** como narrativa orientada al cliente. Útil para validar coherencia y comunicar al sponsor.

### 21.1 Press Release (≤ 1 página, futuro fingido)

```text
[FECHA DE LANZAMIENTO PROYECTADA — PILOTO UMSS]

COCHABAMBA — La Universidad Mayor de San Simón anunció hoy el piloto de **SIGESA**, un sistema de **gestión de evaluación y acreditación de carreras** que permite a la DUEA y a las carreras **centralizar evidencias**, **seguir plazos** y **generar reportes ejecutivos** con trazabilidad frente a CEUB y ARCU-SUR.

"Con SIGESA buscamos que la acreditación deje de depender de archivos dispersos y tengamos una memoria institucional auditable", dijo [nombre y cargo del sponsor].

Hoy las evidencias viven en correos, hojas de cálculo y canales informales, lo que retrasa respuestas a observaciones y dificulta demostrar cumplimiento en visitas de pares.

SIGESA guía el proceso por **fases**, vincula cada documento a **criterios** y conserva **quién subió qué y cuándo**, con **alertas** automáticas y un **panel** de semáforos por carrera y facultad.

"Por fin tenemos una foto clara del avance de nuestra carrera sin armar otro Excel", dijo [coordinador/a de carrera piloto].

SIGESA estará disponible en **fase piloto** para las carreras seleccionadas a partir de [fecha]. Para más información: [enlace institucional].
```

### 21.2 External FAQ (5–10 preguntas)

Preguntas que un cliente externo se haría:

- ¿Qué es exactamente **SIGESA**?
- ¿Cómo me beneficia comparado con carpetas en Drive o correo?
- ¿Qué información es **pública** y cuál es solo para uso interno o evaluadores?
- ¿Cómo se que mi evidencia quedó **registrada** y **acepta** por DUEA?
- ¿Qué pasa si pierdo un plazo — el sistema me **avisa** antes?
- ¿En qué se diferencia de **rankings internacionales** o software «global»?
- ¿Quién responde si hay un **error** en el estado mostrado públicamente?
- ¿Puedo **descargar** un reporte para la facultad en pocos pasos?

### 21.3 Internal FAQ (5–10 preguntas)

Preguntas que el equipo interno y el sponsor se harán:

- ¿Por qué *ahora* y no en el próximo ciclo de acreditación?
- ¿Cuál es la **inversión** mínima viable y el **retorno** en horas ahorradas?
- ¿Cómo se **cierra** el alcance MoSCoW con TI y legal?
- ¿Qué pasa con datos personales en **certificaciones** y consultas públicas?
- ¿Cómo escalamos si **todas** las carreras quieren entrar al mismo tiempo?
- ¿Qué métricas del §8 validamos en las **primeras 4 semanas** de piloto?
- ¿Cómo integramos **evaluadores externos** sin exponer datos indebidos?

> **Criterio de uso**: si el grupo no escribe el PR‑FAQ, esta sección queda vacía. Si lo escribe, debe ser **coherente** con las secciones 1–17 del BRD (no debe contradecir métricas, alcance ni *business case*).

---

## Checklist mínimo de entrega

- [ ] **Resumen ejecutivo** de ½ página con problema, propuesta, valor y métricas.
- [ ] Problema de negocio con evidencia cuantitativa.
- [ ] **1–2 personas / usuarios objetivo** caracterizadas (JTBD, dolores, ganancias).
- [ ] **Propuesta de valor** explícita (formato VPC).
- [ ] **Panorama competitivo resumen** con ≥ 3 alternativas (incluyendo *do‑nothing*).
- [ ] **Business Model Canvas** con los 9 bloques poblados, **≥ 3 elementos por bloque**.
- [ ] **Métricas clave de éxito**: ≥ 1 *North Star* + 2 KPIs de apoyo, con meta y horizonte.
- [ ] ≥ 3 objetivos de negocio SMART.
- [ ] Matriz RACI completa.
- [ ] ≥ 8 requerimientos de negocio priorizados (MoSCoW).
- [ ] Reglas, restricciones, supuestos y dependencias explícitos.
- [ ] *Business case* cuantitativo (aunque sea estimado).
- [ ] Trazabilidad a MRD/PRD iniciada.
