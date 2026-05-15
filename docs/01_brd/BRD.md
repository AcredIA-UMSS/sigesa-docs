# Business Requirements Document (BRD) — SIGESA

| Campo | Valor |
|-------|-------|
| Producto | SIGESA — Sistema de gestión y seguimiento de acreditaciones (UMSS) |
| Ámbito | `docs/01_brd/` |
| Versión | v1.0 |
| Fecha | 15/05/2026 |
| Sponsor de negocio | Jefatura DUEA UMSS *(por confirmar en acta institucional)* |
| Estado | Borrador |
| Fuentes de contexto | `team/alexAlvarez/docs/01_brd/BRD.md`, `team/aylenGonzales/01_brd/BRD_v2_aylen.md`, `team/borisAngulo/docs/01_brd/BRD_v2.md`, `team/Marlene/01_brd/BRD.md`, `context/03_domain_glossary.md`, `docs/BRD_v1.md` |

## 1. Resumen ejecutivo

**Problema central:** Las acreditaciones CEUB y ARCU-SUR en UMSS se gestionan con documentos dispersos, versiones múltiples y canales informales. Esto produce pérdida de trazabilidad, tiempos elevados de búsqueda de evidencia y riesgo de incumplimiento normativo.

**Propuesta de valor:** SIGESA centraliza el ciclo de acreditación en un solo sistema, modelando procesos, fases, dimensiones, criterios, indicadores y evidencias. Cada evidencia queda versionada, auditada y asociada a su indicador normativo.

**Impacto esperado:** Reducción del tiempo de localización documental de 20+ minutos a ≤ 2 minutos, eliminación de pérdidas de evidencia por gestión y generación de reportes ejecutivos en menos de 5 minutos. Este BRD incorpora también la visión institucional y de gobernanza estratégica documentada en `team/Marlene/01_brd/BRD.md`.

## 2. Objetivos SMART

| ID | Objetivo | Métrica | Línea base | Meta | Horizonte |
|----|----------|---------|------------|------|-----------|
| BRD-OBJ-01 | Reducir el tiempo de localización de evidencia normativa | Minutos promedio por consulta | 20+ min | ≤ 2 min | Q4 2026 |
| BRD-OBJ-02 | Eliminar pérdida de evidencia en procesos activos | Incidentes de pérdida por gestión | Recurrente | 0 | Q1 2027 |
| BRD-OBJ-03 | Mejorar cumplimiento de hitos de fase | % de hitos cumplidos en fecha | Por medir | ≥ 80 % | Fin de piloto |
| BRD-OBJ-04 | Asegurar trazabilidad completa Proceso→Indicador→Evidencia | % de fases con trazabilidad completa | 0 % | 100 % | Q2 2027 |

## 3. Stakeholders y matriz RACI

| Tema | JD | TD | CC | P |
|------|:--:|:--:|:--:|:--:|
| Definición de alcance y priorización | A | C | C | I |
| Validación técnica y normativa | C | R | C | I |
| Carga y subsanación de evidencias | I | C | R | I |
| Configuración institucional | A/R | R | I | I |
| Reportes ejecutivos | A | R | C | I |
| Consulta pública de estado acreditación | I | I | I | I |

## 4. Business case

| ID | Palanca de valor | Descripción |
|----|------------------|-------------|
| BRD-BC-01 | Ahorro horas-hombre | Reducción de búsquedas manuales, reconciliación de versiones y reuniones de seguimiento. |
| BRD-BC-02 | Mitigación de riesgo de acreditación | Menor probabilidad de observaciones por documentación inconsistente. |
| BRD-BC-03 | Optimización operativa | Un único canal de evidencia y trazabilidad aumenta la confiabilidad del proceso. |

## 5. Alcance

### In-Scope

- Gestión de acreditación CEUB y ARCU-SUR como proceso normativo.
- Registro de evidencias por indicador con versionado append-only.
- Roles [CC], [TD], [JD] y vista pública [P].
- Máquina de estados de fase con reglas de avance basadas en aprobación de indicadores.
- Observaciones formales entre [TD] y [CC].
- Reportes ejecutivos y dashboard de estado.

### Out-of-Scope

- Integración en tiempo real con SIIS/ERP/RRHH.
- Pagos en línea.
- Ranking internacional y análisis comparativo externo.
- Especificación tecnológica detallada.

## 6. KPIs de negocio

| ID | KPI | Línea base | Meta | Horizonte |
|----|-----|------------|------|-----------|
| BRD-KPI-01 | Tiempo de búsqueda de evidencia | 20+ min | ≤ 2 min | Q4 2026 |
| BRD-KPI-02 | % de procesos con evidencia completa | Por medir | ≥ 80 % | Piloto |
| BRD-KPI-03 | Tiempo de generación de reporte ejecutivo | > 5 min | ≤ 5 min | Q4 2026 |
| BRD-KPI-04 | Satisfacción de actores clave | Por medir | ≥ 4/5 | Post-piloto |

## 7. Restricciones

| ID | Restricción |
|----|-------------|
| BRD-CST-01 | Append-only: no está permitido eliminar evidencia aprobada. |
| BRD-CST-02 | Cumplimiento CEUB y ARCU-SUR en la configuración de fases e indicadores. |
| BRD-CST-03 | Máquina de estados no permite avanzar fase con indicadores no resueltos. |
| BRD-CST-04 | Cada evidencia debe asociarse a un criterio e indicador. |
| BRD-CST-05 | Autenticación institucional con correo UMSS. |
| BRD-CST-06 | Separación de visibilidad: [CC] por carrera, [TD] global, [JD] global. |

## 8. Supuestos

- La DUEA entregará datos maestros y plantillas de proceso.
- Usuarios tendrán acceso institucional adecuado.
- Las normativas no cambiarán estructuralmente durante el piloto.
- SIGESA será reconocido como canal oficial para la gestión de evidencia piloto.

## 9. Riesgos y mitigación

| ID | Riesgo | Mitigación |
|----|--------|------------|
| BRD-RSK-01 | Resistencia al cambio operativo | Capacitación, UX intuitiva y mandato institucional. |
| BRD-RSK-02 | Cambio normativo CEUB/ARCU-SUR | Parametrización de taxonomías y proceso de cambio controlado. |
| BRD-RSK-03 | Línea base no medida | Validación de métricas antes del lanzamiento piloto. |
| BRD-RSK-04 | Solicitudes de borrado de evidencia | No aprobar cambios que violen append-only; usar versionado. |

## 10. Gobernanza

| ID | Regla |
|----|-------|
| BRD-GOV-01 | [JD] es responsable final de prioridades y validación de alcance. |
| BRD-GOV-02 | Cambios normativos requieren fuente citada, validación [TD] y aprobación [JD]. |
| BRD-GOV-03 | Modificaciones a la política de evidencia requieren aprobación explícita [JD]. |
| BRD-GOV-04 | TI institucional actúa como consultado en seguridad y continuidad. |

## 11. Criterios de éxito

- BRD-SUC-01: ≥ 80 % de objetivos SMART cumplidos.
- BRD-SUC-02: Tiempo de búsqueda de evidencia ≤ 2 min o meta revisada con nueva línea base.
- BRD-SUC-03: Cero violaciones de append-only en auditoría interna.
- BRD-SUC-04: Al menos un ciclo piloto cerrado con evidencia gestionada íntegramente en SIGESA.
- BRD-SUC-05: Sponsor [JD] califica la solución ≥ 4/5.

## 12. Trazabilidad

- BRD-OBJ-01 / BRD-OBJ-04 → MRD, PRD y FSD.
- BRD-CST-01 → NFR / FSD / PRD-REQ.
- BRD-GOV-01 → Requisitos de gobernanza y matrices de trazabilidad.

## 13. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 15/05/2026 | Equipo SIGESA | Consolidación inicial de artefactos de `team/*/docs`. |
