# Market Requirements Document (MRD) — SIGESA / AcredIA

> **Propósito del MRD**: definir el mercado, los usuarios y la oportunidad comercial que justifican el desarrollo de SIGESA. Este documento se apoya en el glosario de dominio, la LFSD del proyecto y los resultados de pruebas UX en los que se identificó la necesidad de búsquedas rápidas y una vista mobile para Coordinadores.

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA / AcredIA — Sistema de gestión y seguimiento de acreditaciones (UMSS) |
| Grupo | AcredIA |
| Versión | v0.1 |
| Fecha | 14/05/2026 |
| Product Manager / Autor | Alex Alvarez |
| Revisores | Docente + stakeholders DUEA |
| Estado | Borrador |
| Relación con BRD | BRD_v1 / FSD_v1 |

## 1. Resumen ejecutivo

SIGESA transforma el proceso de acreditación de la DUEA de la UMSS, reemplazando el status quo manual basado en Excel, WhatsApp y USBs por una plataforma única de evidencias inmutables. El producto atiende a tres grandes segmentos de mercado: Coordinadores de Carrera, Técnicos DUEA y público externo (estudiantes y empleadores). La propuesta se centra en la velocidad de búsqueda (<5 segundos para documentos clave), la trazabilidad de Evidencias por Fase/Indicador y un dashboard mobile para Coordinadores bajo presión de fechas límite.

Esta solución responde a una necesidad real del mercado universitario: acelerar la subsanación de observaciones, reducir el esfuerzo visual en la gestión de indicadores y entregar transparencia documental a estudiantes y empleadores. SIGESA se posiciona como la única fuente de verdad institucional cuando se trata de evidencias de acreditación.

## 2. Visión del producto

Para la UMSS y la DUEA, una plataforma de acreditación documental que centraliza evidencias, acelera decisiones y hace visible el avance normativo, con búsquedas en menos de 5 segundos y dashboard mobile para Coordinadores.

## 3. Análisis de mercado

### 3.1 Tamaño de mercado

| Métrica | Valor | Fuente |
|---------|-------|--------|
| TAM | 60 carreras universitarias + 12 facultades de la UMSS | estimación interna UMSS |
| SAM | 300 Coordinadores y 40 Técnicos DUEA activos por ciclo | análisis de estructura DUEA |
| SOM | 50 carreras iniciales en primera fase de despliegue | plan de adopción UMSS |

### 3.2 Tendencias del sector

- Digitalización de procesos de acreditación universitaria.
- Demanda de trazabilidad documental y transparencia en auditorías.
- Preferencia por interfaces móviles para tareas operativas urgentes.

### 3.3 Factores regulatorios y de cumplimiento

- CEUB y ARCU-SUR exigen documentación ordenada y auditable.
- La DUEA requiere control de versiones e inmutabilidad de evidencias.
- Transparencia pública demanda un portal de consultas sin autenticación para certificados y estados de acreditación.

### 3.4 Cadencia de Continuous Discovery

| Aspecto | Valor |
|---------|-------|
| Cadencia de entrevistas | quincenal |
| Usuarios contactados por ciclo | 4-6 (Coordinadores, Técnicos, estudiantes, empleadores) |
| Formato de hipótesis | Cuando `<situación>`, espero `<resultado>`, porque `<razón>` |
| Backlog de hipótesis | sección 12 |
| Output del track | validaciones del dashboard, requerimiento de búsqueda rápida, VoC heurístico |

## 4. Segmentación y personas

### 4.1 Segmentos de clientes

| Segmento | Tamaño | Necesidad principal | Disposición a pagar | Origen M2 |
|----------|--------|----------------------|---------------------|----------|
| Coordinador de Carrera [CC] | 250-300 | resolución rápida de observaciones y control de avance | incluida en presupuesto UMSS | M2 personas operativas |
| Técnico DUEA [TD] | 40-50 | auditoría de cientos de Evidencias con una interfaz potente | presupuestos DUEA | M2 personas de auditoría |
| Estudiantes y Empleadores | 30.000+ estudiantes y 1.000 empleadores en red | transparencia de certificaciones y acceso instantáneo a resultados | valor institucional / reputacional | nuevo segmento de mercado |

### 4.2 Personas

#### Persona 1 – Coordinador Carla

- **Origen M2**: persona operativa de M2 / CC.
- **Rol**: Coordinador de Carrera.
- **Demografía**: 38 años, coordina la acreditación de una carrera en la UMSS, usa celular y laptop.
- **Objetivos**: cerrar fases a tiempo, corregir observaciones y entregar evidencias válidas sin perder datos.
- **Dolores actuales**: trabaja con Excel/WhatsApp, pierde horas buscando PDF, teme no cumplir fechas límite.
- **Comportamiento digital**: prioriza móvil para tareas urgentes y usa laptop para carga y control detallado.
- **Frase representativa**: “Necesito saber qué evidencias faltan y corregirlas sin perder tiempo en buscar archivos.”

#### Persona 2 – Técnico DUEA Tomás

- **Origen M2**: persona de auditoría de M2 / TD.
- **Rol**: Técnico DUEA.
- **Demografía**: 45 años, responsable de validar indicadores y autorizar avances de fase para múltiples carreras.
- **Objetivos**: auditar evidencias con precisión, reducir errores y documentar rechazos con justificación.
- **Dolores actuales**: recibe evidencias por USB, correo y chat; no hay trazabilidad ni versión clara.
- **Comportamiento digital**: usa escritorio con monitores múltiples, necesita filtros avanzados y vistas globales.
- **Frase representativa**: “Mi trabajo es revisar evidencias, no reconstruir historias desde archivos dispersos.”

#### Persona 3 – Estudiante Enrique / Empleador Mariana

- **Origen M2**: nuevo segmento público.
- **Rol**: estudiante que espera transparencia; empleador que revisa acreditación institucional.
- **Demografía**: estudiante de 22 años y empleadora de 35 años en RRHH.
- **Objetivos**: verificar certificados con rapidez y confiar en la validez de la acreditación.
- **Dolores actuales**: no hay acceso público oficial a estados de acreditación; depende de rumores o documentos no verificados.
- **Comportamiento digital**: usa smartphone y busca información en portales oficiales.
- **Frase representativa**: “Quiero ver si la carrera está acreditada sin tener que llamar o pedir documentos.”

## 5. Jobs-to-be-Done (JTBD)

| JTBD ID | Cuando… | Quiero… | Para poder… |
|---------|---------|---------|-------------|
| JTBD-CC-01 | soy Coordinador y mi evidencia es observada | subir una corrección exacta | que el sistema libere mi Fase |
| JTBD-CC-02 | estoy ante la fecha límite de cierre | encontrar en <5 segundos la evidencia pendiente | evitar sanciones por atraso |
| JTBD-TD-01 | soy Técnico DUEA y veo cientos de indicadores | filtrar evidencias por Fase/Indicador rápidamente | aprobar o rechazar sin perder tiempo |
| JTBD-TD-02 | necesito justificar un rechazo | agregar observación clara y obligatoria | que el Coordinador actúe con precisión |
| JTBD-P-01 | soy estudiante buscando el estado de mi carrera | acceder a certificación y avance públicos | confiar en que la información es oficial |
| JTBD-P-02 | soy empleador queriendo verificar a una egresada | consultar el estatus de acreditación | decidir si su título es confiable |

## 6. Voz del Cliente (VoC)

- “El sistema exige demasiado esfuerzo visual.”
- “Se requiere vista mobile para el Coordinador.”
- “No podemos perder tiempo buscando archivos; necesitamos búsquedas en menos de 5 segundos.”
- “El proceso actual es Excel, WhatsApp y USBs, eso no es un sistema.”

## 7. Análisis de competencia (Status Quo)

### 7.1 Comparativa SIGESA vs status quo manual

| Criterio | SIGESA | Status quo manual |
|----------|--------|-------------------|
| Fuente de verdad | única, inmutable, consultable | dispersa, cambiante, difícil de auditar |
| Control de versiones | automático para cada Evidence | manual en múltiples copias |
| Búsqueda | <5 segundos con filtros por Fase/Indicador | lento, depende de nombres de archivos |
| Mobile | dashboard mobile para Coordinadores | no existe, trabajos en laptop/WhatsApp |
| Auditoría | trazabilidad y logs inalterables | pocas pruebas, no hay historial confiable |
| Transparencia pública | portal de consulta oficial | inexistente o informal |
| Notificaciones | push / email / alertas | llamadas, mensajes y correos dispersos |

### 7.2 Positioning statement

Para los Coordinadores de Carrera y Técnicos DUEA de la UMSS, SIGESA es la plataforma de acreditación documental que centraliza evidencias de Fase e Indicador con búsquedas ultrarrápidas y trazabilidad inmutable, a diferencia del proceso manual que depende de Excel, WhatsApp y USBs.

### 7.3 Ventaja competitiva sostenible

- Ventaja propia: datos institucionales de la DUEA y el glosario de dominio que garantiza consistencia en Evidencias, Fases e Indicadores.
- Red: adopción natural dentro de la UMSS y visibilidad para estudiantes y empleadores.
- Regulación: cumple con las expectativas de CEUB / ARCU-SUR y con la necesidad de auditoría interna.

## 8. Propuesta de valor

SIGESA ofrece:
- Un repositorio único de Evidencias versionadas por Indicador.
- Dashboards con estado de Fase y semáforos para priorizar tareas.
- Búsquedas en menos de 5 segundos para coordinadores bajo presión.
- Vista mobile para Coordinadores y una interfaz de escritorio potente para Técnicos DUEA.
- Portal público de transparencia para estudiantes y empleadores.

## 9. Pricing y modelo de negocio

- Modelo: solución SaaS institucional para la UMSS, financiada por la DUEA dentro del presupuesto administrativo.
- Estructura de precios: costo fijo por semestre con soporte y actualizaciones; no hay cobro transaccional al usuario final.
- Benchmark: el valor se compara con la reducción de horas improductivas y el riesgo de sanciones de acreditación.

## 10. Go-to-market

### 10.1 Canales de adquisición

- Canal directo: coordinación con la DUEA y facultades de la UMSS.
- Canal digital: comunicación interna UMSS, correo institucional y capacitaciones.
- Partners: soporte de TI institucional y equipos de proyecto de acreditación.

### 10.2 Estrategia de lanzamiento

- Pre-launch: piloto con 5 carreras y 1 equipo DUEA para validar búsquedas rápidas y dashboard mobile.
- Launch: capacitación a Coordinadores y Técnicos DUEA, despliegue por facultad.
- Post-launch: soporte activo, métricas de uso y ajustes de UX según VoC.

### 10.3 Funnel AARRR inicial

| Etapa | Métrica | Meta |
|-------|---------|------|
| Acquisition | carreras inscritas en el piloto | 5 |
| Activation | Coordinadores activos en la primera semana | 80 % |
| Retention | Coordinadores usando dashboard móvil | 70 % |
| Revenue | presupuesto institucional asignado | aprobado |
| Referral | recomendaciones internas DUEA | 2 facultades adicionales |

## 11. Métricas de éxito del producto

- North Star Metric: porcentaje de indicadores resueltos con evidencias aprobadas antes de la fecha límite.
- KPIs secundarios:
  - Tiempo de búsqueda de evidencia < 5 segundos.
  - Tiempo de subsanación tras observación < 24 horas.
  - Porcentaje de Coordinadores que usan vista mobile ≥ 70 %.
  - Porcentaje de indicadores con justificación de rechazo completa ≥ 95 %.

## 12. Requerimientos de mercado (alto nivel)

| ID | Requerimiento | Prioridad | Justificación |
|----|---------------|-----------|---------------|
| MRD-N-01 | Búsqueda de evidencias con resultado en <5 segundos | Must | hallazgo UX crítico para Coordinadores |
| MRD-N-02 | Dashboard mobile para Coordinadores | Must | VoC señala necesidad de vista mobile para el CC |
| MRD-N-03 | Interfaz de escritorio potente para Técnico DUEA | Must | necesita auditar cientos de Evidencias eficientemente |
| MRD-N-04 | Portal público de consulta de acreditación | Should | mejora transparencia para estudiantes y empleadores |
| MRD-N-05 | Trazabilidad inmutable de cada Evidence | Must | requisito de auditoría y cumplimiento normativo |

## 13. Supuestos e hipótesis a validar

| ID | Hipótesis | Cómo validar | Criterio de éxito |
|----|-----------|--------------|-------------------|
| H1 | Al tener búsquedas en <5 segundos, los Coordinadores subsanarán más rápido | piloto con Coordinadores y métricas de búsqueda | reducción del 30 % en tiempo de corrección |
| H2 | La vista mobile aumentará el uso del dashboard CC | pruebas con prototipo mobile y encuesta | ≥ 70 % de Coordinadores la usan semanalmente |
| H3 | Un portal público mejora la percepción de transparencia | encuesta a estudiantes y empleadores | ≥ 80 % de confianza declarada |
| H4 | La visibilidad global de TD reduce rechazos por falta de versionado | comparación antes/después del piloto | reducción de 25 % en observaciones repetidas |

## 14. Riesgos de mercado

| Riesgo | Prob. | Impacto | Mitigación |
|--------|-------|---------|------------|
| Falta de adopción de Coordinadores por inercia del Excel | media | alto | capacitación y experiencia mobile intuitiva |
| Resistencia de TD a cambiar procesos manuales de auditoría | media | medio | interfaz de escritorio potente y filtros clave |
| Dependencia de la infraestructura UMSS | alto | alto | plan de despliegue gradual y respaldo de TI institucional |
| Expectativa de transparencia pública no cubierta | media | medio | lanzar portal mínimo viable y actualizar con datos oficiales |

## 15. Trazabilidad

| MRD ID | BRD ID | PRD ID |
|--------|--------|--------|
| MRD-N-01 | BR-001 | PRD-REQ-008 |
| MRD-N-02 | BR-003 | PRD-REQ-006 |
| MRD-N-03 | BR-004 | PRD-REQ-005 |

## 16. Anexos

- Referencias: `context/03_domain_glossary.md`, `team/aylenGonzales/LFSD_v1_aylen.md`, `docs/BRD_v1.md`.
- Hallazgos UX: necesidad de búsqueda rápida, reducción del esfuerzo visual y dashboard mobile para Coordinadores.

## 17. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v0.1 | 14/05/2026 | Alex Álvarez | Creación inicial del MRD con segmentos, personas, JTBD y análisis de status quo |
