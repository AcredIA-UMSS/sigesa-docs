# Business Requirements Document (BRD) — SIGESA

| Campo | Valor |
|-------|--------|
| Producto | SIGESA — Sistema de gestión y seguimiento de acreditaciones (UMSS) |
| Ámbito | `team/alexAlvarez/docs/01_brd/` |
| Versión | v1.0 |
| Fecha | 14/05/2026 |
| Sponsor de negocio | Jefatura DUEA UMSS *(nombre en acta por confirmar)* |
| Estado | Borrador |
| Fuentes de contexto | `docs/BRD_v1.md`, `team/borisAngulo/BRD_v2.md`, `context/03_domain_glossary.md`, `team/alexAlvarez/docs/README.md`, `team/alexAlvarez/docs/context/*`, `templates/BRD_TEMPLATE.md` |

> **Nota de coherencia:** No existen en esta copia del repo los archivos `team/alexAlvarez/docs/00_overview/definicion_producto.md` ni `team/alexAlvarez/docs/04_fsd/glosario.md` solicitados en el prompt de trabajo; este BRD se alinea al glosario canónico en `context/03_domain_glossary.md` y a la definición de producto consolidada en `team/alexAlvarez/docs/README.md`. Las cifras de campo citadas como «20+ minutos» provienen de `docs/BRD_v1.md`; las metas con línea base «por medir» siguen el criterio explícito de `team/borisAngulo/BRD_v2.md`.

---

## 1. Resumen ejecutivo

**[BRD-SUM-01] Problema — dispersión documental:** La DUEA y las carreras gestionan acreditación **CEUB** y **ARCU-SUR** con canales no integrados (hojas de cálculo, correo, almacenamiento informal, mensajería). El resultado es **pérdida de trazabilidad**, **versiones contradictorias** de la misma **Evidencia** normativa y **tiempo operativo elevado** en localizar la versión válida y demostrar cumplimiento ante auditorías.

**[BRD-SUM-02] Propuesta — Single Source of Truth:** **SIGESA** centraliza el ciclo por **Proceso** de acreditación, **Fase** normativa y taxonomía **Dimensión → Criterio → Indicador**, anclando cada **Evidencia** con versionado y auditoría. La Jefatura DUEA obtiene visibilidad consolidada; el **Coordinador de Carrera [CC]** opera dentro de su carrera; el **Técnico DUEA [TD]** valida y registra observaciones; el **Público [P]** consulta información publicada oficialmente.

**[BRD-SUM-03] Valor esperado (alineado al repositorio):** Reducción del tiempo de localización de evidencia de **20+ minutos** a **≤ 2 minutos** en condiciones objetivo *(referencia `docs/BRD_v1.md`)*; **cero incidentes** de pérdida documental por gestión como meta de negocio; reportes ejecutivos **≤ 5 minutos** frente a compilación manual de horas o días.

**[BRD-SUM-04] Llamada a la acción:** Validación institucional del alcance, designación de responsable DUEA para datos maestros y normativa aplicable, y definición de **ventana de piloto** con carreras piloto y línea base de KPIs «por medir antes del lanzamiento».

---

## 2. Objetivos SMART (mínimo 3)

| ID | Objetivo | Métrica | Línea base | Meta | Horizonte |
|----|----------|---------|------------|------|-----------|
| **[BRD-OBJ-01]** | Reducir el tiempo de localización de **Evidencia** normativa en operación diaria | Minutos promedio por consulta | 20+ min *(BRD_v1)* | ≤ 2 min | Q4 2026 *(sujeto a calendario institucional)* |
| **[BRD-OBJ-02]** | Eliminar pérdida de **Evidencia** en procesos gestionados en SIGESA | Incidentes de pérdida por gestión | Recurrente *(cualitativo BRD_v1)* | 0 | Q1 2027 |
| **[BRD-OBJ-03]** | Cerrar procesos activos con hitos críticos a tiempo | % de hitos de fase cumplidos en fecha | Por medir en piloto | ≥ línea base + 20 pp | Fin de piloto *(alineado BRD v2)* |
| **[BRD-OBJ-04]** | Asegurar trazabilidad documental completa en fases activas | % de fases con cadena completa Proceso→Indicador→**Evidencia** | 0% *(sin sistema integrado)* | 100% | Q2 2027 |

---

## 3. Stakeholders y matriz RACI básica

**Actores de negocio (lenguaje ubicuo):** **Jefatura DUEA [JD]**, **Técnico DUEA [TD]**, **Coordinador de Carrera [CC]** *(denominación estricta)*, **Público [P]** — definiciones en `context/03_domain_glossary.md`.

| Tema / entregable | [JD] Jefatura DUEA | [TD] Técnico DUEA | [CC] Coordinador de Carrera | [P] Público |
|-------------------|:------------------:|:-----------------:|:---------------------------:|:-----------:|
| Visión, priorización y cierre de alcance de negocio | **A** | C | C | I |
| Validación técnica-normativa de **Evidencia** y observaciones | C | **R** | C | I |
| Carga y subsanación de **Evidencia** por carrera | I | C | **R** | I |
| Configuración institucional (usuarios, datos maestros, plantillas normativas) | **A**/R | R | I | I |
| Reportes ejecutivos de estado | A | R | C | I |
| Consulta de estado acreditación publicado | I | I | I | I |

*El [P] consume información ya publicada por la institución; la rendición de cuentas sobre qué se publica recae en [JD] y normativa interna.*

---

## 4. Business case (valor y retorno)

| ID | Palanca de valor | Descripción | Evidencia / nota |
|----|------------------|-------------|------------------|
| **[BRD-BC-01]** | Ahorro horas-hombre | Recuperación de tiempo de búsqueda, reconciliación de versiones y reuniones de seguimiento reactivo | Estimación orientativa **15–20 h/mes/técnico** en `docs/BRD_v1.md` — **a validar** con registro de tiempos en piloto |
| **[BRD-BC-02]** | Mitigación riesgo acreditación | Menor probabilidad de observaciones por deficiencia documental o incumplimiento de plazo por falta de visibilidad | Cualitativo; cuantificación «por formalizar» como en `team/borisAngulo/BRD_v2.md` |
| **[BRD-BC-03]** | Optimización operativa | Menos retrabajo por observaciones mal canalizadas; un solo canal oficial de **Evidencia** | Depende de resolución institucional de canal único *(riesgo BRD_v1)* |

**[BRD-BC-04]** *Business case financiero (VAN/TIR, CAPEX/OPEX):* **pendiente** de datos de UMSS; no se declaran cifras monetarias inventadas.

---

## 5. Alcance del proyecto (scope)

### 5.1 IN-SCOPE

| ID | Elemento |
|----|----------|
| **[BRD-SCP-IN-01]** | Flujos de acreditación **CEUB** y **ARCU-SUR** modelados como **Proceso** con **Fases** y taxonomía **Dimensión / Criterio / Indicador** |
| **[BRD-SCP-IN-02]** | Registro de **Evidencia** por indicador, con **versionado** y política **append-only** (sin borrado físico de prueba normativa) |
| **[BRD-SCP-IN-03]** | Rol [CC], [TD], [JD] y vista [P] según matriz de permisos de negocio |
| **[BRD-SCP-IN-04]** | Máquina de estados estricta a nivel indicador y reglas de **cierre de fase** agregadas *(ver `team/alexAlvarez/docs/context/04_state_machine.md`)* |
| **[BRD-SCP-IN-05]** | Observaciones formales [TD]↔[CC] y subsanación enlazada a observación |
| **[BRD-SCP-IN-06]** | Panel de estado y reportes ejecutivos de negocio (no diseño de stack) |

### 5.2 OUT-OF-SCOPE (versión de negocio actual)

| ID | Elemento | Comentario |
|----|----------|------------|
| **[BRD-SCP-OUT-01]** | Integración en tiempo real con SIIS/ERP/RRHH UMSS | Posible fase posterior *(como BRD_v1 §14.2)* |
| **[BRD-SCP-OUT-02]** | Pagos en línea por certificaciones | Explícitamente fuera en BRD v2 |
| **[BRD-SCP-OUT-03]** | Ranking internacional tipo QS/THE como producto | Fuera del propósito normativo local |
| **[BRD-SCP-OUT-04]** | Especificación de **cómo** técnico (frameworks, lenguajes) | Corresponde a PRD/FSD/DTI |

---

## 6. KPIs de negocio

| ID | KPI | North Star | Línea base | Meta | Horizonte | Fuente |
|----|-----|:----------:|------------|------|-----------|--------|
| **[BRD-KPI-01]** | Tiempo medio de localización de **Evidencia** | Sí | 20+ min | ≤ 2 min | Q4 2026 | Encuesta + logs *(definición operativa en piloto)* |
| **[BRD-KPI-02]** | % de **Procesos** activos con **Evidencias** críticas al día vs. cronograma | No | Por medir | ≥ 80% en piloto | Ciclo acordado con DUEA | SIGESA + validación DUEA |
| **[BRD-KPI-03]** | % de hitos de **Fase** cumplidos en fecha | No | Por medir | Mejora ≥ 20 pp vs. base | Mismo | Plan vs. real |
| **[BRD-KPI-04]** | % de procesos cerrados a tiempo *(cierre normativo/hitos finales)* | No | Por medir | Por definir con DUEA | Post-piloto | Acta / sistema |
| **[BRD-KPI-05]** | Satisfacción [TD]/[CC]/[JD] (utilidad, facilidad, confianza) | No | Por medir | ≥ 4/5 | Post-piloto | Encuesta |

---

## 7. Restricciones (constraints)

| ID | Restricción | Tipo |
|----|-------------|------|
| **[BRD-CST-01]** | **Inmutabilidad de la Evidencia / append-only:** ninguna operación de negocio puede suponer **eliminación física** de prueba normativa ya registrada; las correcciones se expresan como **nuevas versiones** vinculadas a observación y auditoría *(alineado `team/alexAlvarez/docs/README.md` y glosario)* | Normativa-auditoría |
| **[BRD-CST-02]** | Cumplimiento de marcos **CEUB** y **ARCU-SUR** y reglamentación UMSS aplicable; plazos de convocatoria no editables por usuarios operativos | Normativa |
| **[BRD-CST-03]** | **Máquina de estados estricta:** no avanza de **Fase** si existen indicadores no resueltos según reglas agregadas *(documento de estado maquina)* | Operativa |
| **[BRD-CST-04]** | Toda **Evidencia** debe asociarse a **Criterio**/**Indicador** (sin carga «huérfana») | Dominio |
| **[BRD-CST-05]** | Autenticación institucional (correo UMSS u mecanismo que defina la UMSS) | Seguridad |
| **[BRD-CST-06]** | Separación de visibilidad: [CC] solo su carrera; [TD] global según rol | Gobierno de datos |

---

## 8. Supuestos (assumptions)

| ID | Supuesto |
|----|----------|
| **[BRD-ASM-01]** | La UMSS/DUEA entregará datos maestros (facultades, carreras, plantillas de proceso) para parametrización |
| **[BRD-ASM-02]** | Los actores clave dispondrán de acceso institucional adecuado para operación web |
| **[BRD-ASM-03]** | La normativa aplicable no cambiará de forma estructural mayor durante el piloto inicial *(riesgo monitorizado)* |
| **[BRD-ASM-04]** | Existirá **gobernanza** que establezca SIGESA como canal oficial de **Evidencia** para los procesos piloto |
| **[BRD-ASM-05]** | Se ejecutará medición formal de línea base de KPIs antes del lanzamiento del piloto |

---

## 9. Riesgos y mitigación (mínimo 3)

| ID | Riesgo | Prob. | Impacto | Mitigación |
|----|--------|-------|---------|------------|
| **[BRD-RSK-01]** | Resistencia al cambio y persistencia de canales informales | Alta | Alto | Resolución institucional de canal único + capacitación [CC]/[TD] + UX orientada a baja curva |
| **[BRD-RSK-02]** | Cambio normativo CEUB/ARCU-SUR durante implementación | Media | Alto | Parametrización de taxonomías y procedimiento de cambio controlado *(§10)* |
| **[BRD-RSK-03]** | Línea base de KPIs no medida; metas no contrastables | Media | Medio | Plan de medición pre-piloto acordado con DUEA |
| **[BRD-RSK-04]** | Solicitud de negocio incompatible con **[BRD-CST-01]** (borrado de evidencia) | Media | Crítico | **No aprobar**; flujo de subsanación y versionado únicamente |

---

## 10. Gobernanza del proyecto

| ID | Regla |
|----|--------|
| **[BRD-GOV-01]** | **Accountable** final de prioridades y alcance de negocio: **Jefatura DUEA [JD]** en coordinación con sponsor institucional (p. ej. vicerrectorado académico, según acta UMSS). |
| **[BRD-GOV-02]** | Cambios a **requisitos normativos** reflejados en plantillas de proceso (CEUB/ARCU-SUR, fases, indicadores) requieren: (a) **fuente normativa** citada; (b) revisión **[TD]** por viabilidad operativa; (c) **aprobación [JD]** para su despliegue en producción académica. |
| **[BRD-GOV-03]** | Cambios que afecten trazabilidad legal o política de **Evidencia** (p. ej. relajar append-only) requieren **aprobación explícita [JD]** y registro en acta; el agente de producto no puede asumirlos. |
| **[BRD-GOV-04]** | TI/infraestructura UMSS participa como **consultada** en despliegue, seguridad y continuidad. |

---

## 11. Criterios de éxito

| ID | Criterio |
|----|----------|
| **[BRD-SUC-01]** | ≥ 80% de los objetivos **[BRD-OBJ-01]**–**[BRD-OBJ-04]** cumplidos al cierre del horizonte acordado |
| **[BRD-SUC-02]** | **[BRD-KPI-01]** y **[BRD-KPI-05]** alcanzan metas declaradas o, si la línea base difiere tras medición, se documenta nueva meta acordada con DUEA |
| **[BRD-SUC-03]** | Cero violaciones documentadas de **[BRD-CST-01]** en auditoría interna del piloto |
| **[BRD-SUC-04]** | Al menos un ciclo piloto CEUB o ARCU-SUR concluido con **Evidencia** gestionada íntegramente en SIGESA sin incidente de pérdida |
| **[BRD-SUC-05]** | Sponsor [JD] satisfecha/o ≥ 4/5 en evaluación post-piloto |

---

## 12. Trazabilidad hacia MRD / PRD / FSD

| Regla / objetivo BRD | Siguiente artefacto sugerido |
|------------------------|------------------------------|
| [BRD-OBJ-01]–[BRD-OBJ-04], [BRD-KPI-*] | MRD — necesidades de mercado/usuario y priorización MoSCoW |
| [BRD-CST-01]–[BRD-CST-06], [BRD-SCP-IN-*] | PRD — requisitos de producto verificables |
| Máquina de estados y reglas de fase | FSD — casos de uso y reglas de transición |

---

## 13. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 14/05/2026 | Equipo SIGESA (Alex / documentación) | Versión inicial en `team/alexAlvarez/docs/01_brd/BRD.md` a partir de contexto consolidado del repo |

---

*Documento de negocio. No prescribe tecnología de implementación.*
