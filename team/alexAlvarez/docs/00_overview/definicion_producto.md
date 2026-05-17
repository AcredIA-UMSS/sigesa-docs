# Definición de Producto — SIGESA

**Ámbito:** `team/alexAlvarez/docs/00_overview/`  
**Versión:** v1.0  
**Fecha:** 17/05/2026  
**Producto:** SIGESA / AcredIA — UMSS DUEA  
**Estado:** Alineado a BRD v1.0 y PRD v2.0  

---

## 1. Resumen ejecutivo

**SIGESA** es el producto digital que convierte la acreditación universitaria de un proceso **fragmentado, opaco y propenso a pérdida documental** en un flujo **lineal, auditable y orientado a la máquina de estados normativa**. Atiende principalmente al **Coordinador de Carrera [CC]** (carga y subsanación de **Evidencia**), al **Técnico DUEA [TD]** (validación y **Observaciones**), y a la **Jefatura DUEA [JD]** (gobierno, visibilidad y cierre), con un canal de **transparencia** para el **Público [P]**.

La propuesta de valor central es la **Única Fuente de Verdad (SSOT)** para la prueba normativa, con **inmutabilidad append-only** que permite enfrentar auditorías con historial completo, no con “la última versión que alguien tenía en el correo”.

---

## 2. Problema de negocio

### 2.1 Situación actual (pain points)

La DUEA y las carreras de la UMSS gestionan acreditaciones **CEUB** y **ARCU-SUR** mediante prácticas heterogéneas:

- **Dispersión:** PDFs, planillas Excel, carpetas en Drive, correo y mensajería instantánea coexisten sin taxonomía única.
- **Ambigüedad de versiones:** Tras una observación del evaluador interno, no queda claro cuál documento es la “versión válida” ni quién debe actuar a continuación.
- **Invisibilidad gerencial:** La **Jefatura DUEA** depende de arqueos manuales para conocer el avance real por carrera y facultad.
- **Costo de coordinación:** [CC] y [TD] invierten tiempo en llamadas y mensajes para preguntar “¿qué me falta?” o “¿recibiste el archivo?”.

### 2.2 Impacto si no se resuelve

- Riesgo de **fracaso en acreditación** por evidencia incompleta, mal clasificada o no trazable.
- **Retrasos** en hitos de fase por falta de alertas y bloqueos formales.
- **Pérdida de confianza** institucional ante evaluadores externos y organismos de control.

### 2.3 Declaración del problema (formato Jobs-to-be-Done)

> *Cuando una carrera enfrenta un proceso de acreditación bajo CEUB o ARCU-SUR, los actores institucionales necesitan demostrar cumplimiento indicador por indicador con prueba documental trazable, pero hoy la evidencia vive en silos no integrados; esto genera retrabajo, observaciones mal cerradas y ansiedad gerencial. SIGESA existe para que cada pieza de **Evidencia** viva en el lugar normativo correcto, con historial inmutable y turnos de acción explícitos.*

---

## 3. Propuesta de solución (producto)

SIGESA ofrece:

| Capacidad | Descripción para el usuario de negocio |
|-----------|--------------------------------------|
| **Orquestación por Proceso** | Cada intento de acreditación de una carrera es un **Proceso** con cronograma, modalidad y fases. |
| **Taxonomía automática** | Al elegir CEUB o ARCU-SUR, el árbol Dimensiones → Criterios → Indicadores aparece sin construcción manual. |
| **Carga guiada** | El [CC] navega el árbol y adjunta **Evidencia** solo donde el indicador lo exige. |
| **Auditoría estructurada** | El [TD] aprueba o **Observa** con justificación; el sistema bloquea cierres prematuros. |
| **Subsanación enlazada** | En Fase 2, cada corrección responde a una observación concreta y crea nueva versión sin borrar la anterior. |
| **Visibilidad y alertas** | Dashboards y notificaciones muestran avance, cuellos de botella y plazos fatales. |
| **Transparencia** | El [P] consulta resultados publicados oficialmente. |

---

## 4. Usuarios y jobs principales

### 4.1 [CC] Coordinador de Carrera

**Job principal:** *Asegurar que mi carrera presente evidencia completa y subsane observaciones a tiempo para lograr la acreditación.*

| Job | Tareas en SIGESA | Éxito observable |
|-----|------------------|------------------|
| Completar autoevaluación | Cargar evidencias en todos los indicadores de Fase 1 | 100% indicadores con al menos una evidencia **SUBIDA** |
| Responder observaciones | Leer observación, subir corrección, enviar a revisión | Indicador pasa a **SUBSANADO**; observación en “revisión pendiente” |
| Conocer mi estado | Ver panel de avance y plazos | Sin necesidad de contacto paralelo por “última versión” |

**Anti-jobs (lo que SIGESA evita que haga):** Perseguir por WhatsApp al técnico; adivinar en qué carpeta guardar un PDF; sobrescribir archivos en Drive.

### 4.2 [TD] Técnico DUEA

**Job principal:** *Validar calidad y pertinencia de la evidencia y mantener el flujo del proceso sin cuellos de botella.*

| Job | Tareas en SIGESA |
|-----|------------------|
| Abrir/revisar procesos | Crear proceso, asignar carrera, seleccionar modalidad |
| Auditar evidencia | Bandeja de indicadores **SUBIDO** / **SUBSANADO** |
| Formalizar no conformidades | Crear **Observación** con texto obligatorio → **OBSERVADO** |
| Liberar fases | Validar agregación de aprobados antes de transición |

### 4.3 [JD] Jefatura DUEA

**Job principal:** *Supervisar el portafolio de acreditaciones, desbloquear riesgos y cerrar dictámenes con evidencia consolidada.*

| Job | Tareas en SIGESA |
|-----|------------------|
| Gobierno | Usuarios, facultades, plantillas, políticas de publicación |
| Monitoreo | Dashboards multi-carrera, reportes ejecutivos |
| Cierre | Dictamen final, transición a Acreditado/Rechazado, activación portal [P] |

### 4.4 [P] Público

**Job principal:** *Verificar de forma confiable si una carrera está acreditada y acceder a certificación oficial.*

---

## 5. Propuesta de valor por segmento

| Segmento | Dolor | Ganancia con SIGESA |
|----------|-------|---------------------|
| [CC] | Caos de versiones y plazos opacos | Un solo lugar para saber qué falta y cuándo vence |
| [TD] | Bandejas dispersas y observaciones informales | Cola de revisión priorizada y observaciones auditables |
| [JD] | Ceguera operativa | Semáforos y KPIs en tiempo casi real |
| [P] | Información no oficial en redes | Consulta institucional validada |
| Institución UMSS | Riesgo reputacional y normativo | Trazabilidad demostrable en auditorías |

---

## 6. Diferenciadores del producto (vs. “más un Drive”)

1. **Semántica normativa integrada:** No es almacenamiento libre; es **Indicador → Evidencia** obligatorio.
2. **Máquina de estados:** El avance no es “subjetivo”; es computable a partir de estados de indicadores.
3. **Append-only:** La auditoría ve **todas** las versiones, no solo la última.
4. **Emparejamiento observación–subsanación:** Cierra el loop que históricamente rompe la Fase 2.
5. **RBAC por rol real:** [CC] no puede “arreglar” el proceso saltándose al [TD].

---

## 7. Alcance funcional del producto (resumen)

Detalle completo en [`alcance_proyecto.md`](alcance_proyecto.md). Resumen:

**Incluido:** CEUB/ARCU-SUR, tres fases, evidencia versionada, observaciones, dashboards, notificaciones, portal público, reportes.

**Excluido:** ERP en tiempo real, pagos, rankings globales, borrado de evidencia, mensajería como sustituto del registro oficial.

---

## 8. Métricas de éxito del producto

Alineadas al BRD y PRD; línea base “por medir” en piloto salvo donde se cite referencia histórica.

| ID | Métrica | North Star | Meta (piloto / Q4 2026) |
|----|---------|:----------:|-------------------------|
| **PD-KPI-01** | Tiempo medio de localización de **Evidencia** | Sí | ≤ 2 min (vs. 20+ min referencia histórica) |
| **PD-KPI-02** | Incidentes de pérdida documental en procesos SIGESA | No | 0 |
| **PD-KPI-03** | % indicadores críticos al día vs. cronograma | No | ≥ 80% |
| **PD-KPI-04** | % fases con cadena completa Proceso→Evidencia | No | 100% en procesos activos piloto |
| **PD-KPI-05** | Satisfacción [CC]/[TD]/[JD] (encuesta) | No | ≥ 4/5 post-piloto |

### 8.1 Criterio de éxito cualitativo (visión de negocio)

> *El sistema funciona cuando una auditoría institucional o visita de pares puede reconstruir cualquier indicador observado con su historial de evidencias y observaciones **sin arqueo manual** fuera de SIGESA, y cuando [CC] y [TD] dejan de coordinarse por canales paralelos para preguntar por versiones o turnos.*

Fuente narrativa: [`../context/01_vision_negocio.txt`](../context/01_vision_negocio.txt), [`../context/02_parte_dificil.txt`](../context/02_parte_dificil.txt).

---

## 9. Principios de diseño del producto

Estos principios guían PRD, FSD y decisiones de UX:

| # | Principio | Implicación |
|---|-----------|-------------|
| P1 | **Norma primero** | La UI refleja el árbol CEUB/ARCU-SUR, no carpetas arbitrarias. |
| P2 | **Estado explícito** | Siempre visible: estado del indicador y “de quién es el turno”. |
| P3 | **No destructivo** | Ninguna acción de usuario borra prueba; solo agrega versiones. |
| P4 | **Fallar cerrado** | Si hay duda en transición de fase, el sistema rechaza (no “permite con advertencia”). |
| P5 | **Un rol, un mandato** | [CC] aporta evidencia; [TD] dictamina; [JD] gobierna. |
| P6 | **Trazabilidad por defecto** | Eventos auditables son requisito, no feature opcional. |

---

## 10. Escenario referencia: subsanación (product slice crítico)

**Contexto:** Carrera de Diseño Gráfico, Fase 2 (Evaluación Interna). Indicador 1.2 del currículo con evidencia observada.

| Paso | Actor | Acción en SIGESA | Resultado de producto |
|------|-------|------------------|------------------------|
| 1 | [TD] | Registra observación: “Falta firma del Decano en Resolución 12/2025” | Indicador → **OBSERVADO**; plazo activado |
| 2 | Sistema | Notifica a [CC] | Alerta en dashboard / canal institucional |
| 3 | [CC] | Sube `Resolucion_12_2025_Firmada.pdf` + nota de respuesta | Nueva **Evidencia** v2 ligada a Observación #405 |
| 4 | Sistema | Cambia estados | Observación “revisión pendiente”; indicador **SUBSANADO** |
| 5 | [TD] | Recibe alerta en bandeja | Cola priorizada “Diseño Gráfico — indicador 1.2” |

**Reglas que el producto no puede violar en este escenario:**

- La evidencia v1 **permanece** consultable.
- No se cierra Fase 2 con observación **Abierta**.
- [CC] **no** puede extender el plazo fatal del cronograma.

---

## 11. Roadmap de producto (referencia)

El desglose por releases está en [`../03_prd/roadmap.md`](../03_prd/roadmap.md). Visión de alto nivel:

| Ola | Foco | Outcome |
|-----|------|---------|
| MVP | Épicas 1–3: Evidencia, RBAC, máquina de estados, dashboards básicos | Piloto DUEA con 1–N carreras |
| v1.1 | Notificaciones institucionales robustas | Reducción coordinación informal |
| v1.2 | Portal [P] y reportes avanzados | Transparencia y actas automáticas |

---

## 12. Dependencias y gobernanza del producto

| Dependencia | Responsable | Notas |
|-------------|-------------|-------|
| Datos maestros facultades/carreras | DUEA / UMSS | Bloqueante para go-live |
| Plantillas CEUB/ARCU-SUR vigentes | DUEA + normativa | Versionar cambios |
| Política de canal único en piloto | [JD] | Sin esto, ROI parcial |
| Autenticación UMSS | TI institucional | Requisito de seguridad |
| Capacitación [CC]/[TD] | DUEA + proyecto | Adopción |

---

## 13. Glosario mínimo del producto

| Término | Definición breve |
|---------|------------------|
| **Proceso** | Ciclo de acreditación de una carrera en un periodo |
| **Fase** | Etapa temporal (Autoevaluación, Evaluación Interna, Evaluación Externa) |
| **Indicador** | Unidad atómica evaluable; ancla de evidencia y estados |
| **Evidencia** | Documento probatorio versionado (append-only) |
| **Observación** | No conformidad formal del [TD] sobre una evidencia |
| **Modalidad** | Marco CEUB o ARCU-SUR |

Glosario extendido: [`../context/03_domain_glossary.md`](../context/03_domain_glossary.md) → futuro `04_fsd/glosario.md`.

---

## 14. Trazabilidad documental

| Este documento | Alimenta / se alimenta de |
|----------------|---------------------------|
| `definicion_producto.md` | BRD §1–4, PRD §1–2, context vision |
| BRD | Objetivos SMART, KPIs formales |
| PRD | Épicas, user stories, roadmap |
| FSD | Comportamiento “El sistema debe…” |

---

## Historial de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 17/05/2026 | Alex Álvarez | Creación inicial en `00_overview/` |
