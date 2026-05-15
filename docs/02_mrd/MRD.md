# Market Requirements Document (MRD) — SIGESA / AcredIA

> Propósito: definir el mercado, los usuarios y la oportunidad que justifican el desarrollo de SIGESA.

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA / AcredIA — Sistema de gestión y seguimiento de acreditaciones (UMSS) |
| Versión | v1.0 |
| Fecha | 15/05/2026 |
| Product Manager / Autor | Equipo SIGESA |
| Revisores | DUEA, Tech Lead, QA |
| Estado | Borrador |
| Relación con BRD | BRD v1.0 / BRD v2.0 |
| Fuentes | `team/alexAlvarez/docs/02_mrd/MRD.md`, `team/aylenGonzales/03_prd/PRD_v1.md`, `team/borisAngulo/docs/01_brd/BRD_v2.md` |

## 1. Resumen ejecutivo

SIGESA transforma el proceso de acreditación de la DUEA de la UMSS, reemplazando el status quo manual de Excel, WhatsApp, correo y USBs por una plataforma única de evidencias inmutables. El producto atiende a Coordinadores de Carrera, Técnicos DUEA y público externo, con foco en búsquedas rápidas, trazabilidad documental y transparencia.

## 2. Visión del producto

Para UMSS/DUEA, SIGESA es la fuente de verdad institucional que centraliza evidencias de acreditación CEUB/ARCU-SUR, acelera decisiones y reduce el tiempo operativo de búsqueda documental a menos de 2 minutos.

## 3. Análisis de mercado

### 3.1 Tamaño de mercado

| Métrica | Valor |
|---------|-------|
| TAM | 60 carreras + 12 facultades en UMSS |
| SAM | 300 Coordinadores + 40 Técnicos DUEA activos |
| SOM | 50 carreras en primera fase de despliegue |

### 3.2 Tendencias regulatorias

- CEUB y ARCU-SUR exigen documentación ordenada y auditable.
- La DUEA requiere control de versiones e inmutabilidad documental.
- Transparencia pública demanda consulta de estados sin autenticación.

### 3.3 Factores clave

- Necesidad de búsquedas rápidas de evidencia.
- Exigencia de reportes ejecutivos en tiempo real.
- Demanda de dashboard mobile para Coordinadores.

## 4. Segmentación y personas

### Segmentos

- Coordinador de Carrera [CC]
- Técnico DUEA [TD]
- Estudiante / Empleador / Público externo [P]

### Personas principales

- Coordinador Carla: necesita encontrar evidencia faltante y cerrar fases a tiempo.
- Técnico Tomás: necesita auditar evidencias con rapidez y justificar rechazos.
- Estudiante/Empleador: necesita verificar acreditación institucional oficial.

## 5. Jobs-to-be-Done

| ID | Cuando… | Quiero… | Para poder… |
|-----|---------|---------|-------------|
| JTBD-CC-01 | soy Coordinador y mi evidencia es observada | subir una corrección exacta | que el sistema libere la fase |
| JTBD-CC-02 | estoy ante la fecha límite | encontrar evidencia pendiente en <5 segundos | evitar sanciones |
| JTBD-TD-01 | soy Técnico DUEA y tengo cientos de indicadores | filtrar evidencias por fase/indicador | aprobar o rechazar rápido |
| JTBD-TD-02 | necesito justificar un rechazo | agregar observación clara | que el Coordinador actúe con precisión |
| JTBD-P-01 | soy estudiante | acceder a estado de acreditación oficial | confiar en la veracidad |

## 6. Voz del cliente

- “El sistema exige demasiado esfuerzo visual.”
- “Necesitamos vista mobile para Coordinadores.”
- “No podemos perder tiempo buscando archivos.”
- “El proceso actual es Excel, WhatsApp y USBs.”

## 7. Análisis de competencia vs status quo

| Criterio | SIGESA | Status quo |
|----------|--------|------------|
| Fuente de verdad | única e inmutable | dispersa y cambiante |
| Control de versiones | automático | manual |
| Búsqueda | <2 min | lento |
| Mobile | sí | no |
| Auditoría | trazabilidad inmutable | sin historial fiable |
| Transparencia pública | portal oficial | informal |

## 8. Propuesta de valor

SIGESA ofrece:

- Repositorio único de evidencias versionadas.
- Dashboards de estado y semáforos para Coordinadores y técnicos.
- Búsqueda rápida, trazabilidad y notificaciones automáticas.
- Portal público de transparencia y descarga de certificados.

## 9. Go-to-market

### Canales

- Coordinación directa con la DUEA y facultades.
- Comunicación institucional UMSS.
- Capacitaciones y talleres operativos.

### Roadmap de lanzamiento

- Piloto con 5 carreras y 1 equipo DUEA.
- Capacitación de Coordinadores y Técnicos.
- Soporte activo y ajustes tras validación piloto.

## 10. Métricas de éxito

| Métrica | Meta |
|---------|------|
| Tiempo de búsqueda | ≤ 2 min |
| Tiempo de reporte | ≤ 5 min |
| Uso mobile [CC] | ≥ 70 % |
| Reportes generados | ≥ 80 % de los solicitados |
| Confianza de usuarios | ≥ 4/5 |

## 11. Requerimientos de mercado

| ID | Requerimiento | Prioridad |
|----|--------------|-----------|
| MRD-N-01 | Búsqueda de evidencias en <5 segundos | Must |
| MRD-N-02 | Dashboard mobile para Coordinadores | Must |
| MRD-N-03 | Interfaz de escritorio para Técnicos DUEA | Must |
| MRD-N-04 | Portal público de acreditación | Should |
| MRD-N-05 | Trazabilidad inmutable de evidencia | Must |

## 12. Supuestos e hipótesis

- La DUEA proveerá datos maestros y recursos para el piloto.
- La infraestructura UMSS permite acceso web institucional.
- Las normativas CEUB/ARCU-SUR permanecerán estables durante la fase inicial.
- La adopción creará valor en coordinación y auditoría.

## 13. Riesgos de mercado

| Riesgo | Mitigación |
|-------|------------|
| Baja adopción por inercia de Excel | Capacitación, UX intuitiva y comunicación institucional |
| Resistencia de técnicos a nuevas herramientas | Dashboard potente y filtros clave |
| Dependencia de infraestructura UMSS | Pruebas en condiciones reales y ajuste de performance |
| Expectativa de transparencia pública no cubierta | Lanzar portal mínimo viable con datos oficiales |

## 14. Trazabilidad primaria

- MRD-N-01 → PRD-REQ-001, FSD-UC-001
- MRD-N-02 → PRD-REQ-004, FSD-UC-004
- MRD-N-03 → PRD-REQ-005, FSD-UC-003
- MRD-N-04 → PRD-REQ-006, FSD-UC-005
- MRD-N-05 → PRD-REQ-002, FSD-UC-002

## 15. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 15/05/2026 | Equipo SIGESA | Consolidación inicial de MRD desde `team/*/docs`. |
