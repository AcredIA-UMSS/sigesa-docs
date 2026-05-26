# NFR_ISO25010.md — SIGESA v1
**Sistema:** SIGESA — Sistema de Gestión de Evaluación y Acreditación  
**Grupo:** AcredIA (`team/borisAngulo`)  
**Versión:** v1.0 | **Fecha:** 12/05/2026  
**Trazabilidad:** `FSD_v1.md §10` | Norma: ISO/IEC 25010:2023  
**Responsable de definición:** @ArchAgent

---

## Contexto de aplicación

Los NFRs aplican al sistema SIGESA en su versión 1.0 (modo LFSD). Cada NFR incluye:
- **Métrica**: qué se mide y cómo
- **Umbral aceptable**: valor mínimo para aprobar
- **Umbral excelente**: valor objetivo
- **Verificación**: método concreto de comprobación

---

## Tabla maestra NFRs ISO 25010

| ID | Característica ISO 25010 | Sub-característica | Requisito | Métrica | Umbral aceptable | Umbral excelente | Verificación | Trazabilidad FSD |
|----|--------------------------|-------------------|-----------|---------|-----------------|-----------------|--------------|-----------------|
| NFR-001 | Eficiencia de desempeño | Comportamiento temporal | La carga del panel de semáforo y la visualización de evidencias deben responder en tiempo aceptable bajo carga normal | Latencia p95 (ms) en GET /panel y GET /evidencias con 50 usuarios concurrentes | < 3 000 ms | < 1 500 ms | Prueba de carga con k6/Locust: 50 VUs, 5 min, medir p95 | FSD-UC-005, NFR-001 |
| NFR-002 | Eficiencia de desempeño | Utilización de recursos | La generación del reporte PDF ejecutivo no debe degradar el servicio principal | CPU del servidor durante generación PDF (%) | < 80 % | < 60 % | Monitoreo con Prometheus/Grafana durante prueba de carga con generación simultánea de 5 PDFs | FSD-UC-007 |
| NFR-003 | Seguridad | Confidencialidad | Toda evidencia sensible (PII, documentos académicos) debe transmitirse cifrada y almacenarse protegida | % de endpoints con HTTPS forzado + cifrado en reposo AES-256 | 100 % endpoints sensibles | 100 % + log de acceso | Escaneo OWASP ZAP + revisión de configuración TLS + auditoría de políticas de almacenamiento | FSD-UC-001, FSD-UC-003, NFR-002 |
| NFR-004 | Seguridad | No repudio | Toda acción crítica (carga/reemplazo de evidencia, cierre de proceso, cambio de estado) debe quedar registrada de forma inalterable | % de eventos críticos con registro en auditoría append-only (actor, timestamp, acción, recurso) | ≥ 95 % | 100 % | Tests de integración que verifican inserción en tabla de auditoría tras cada acción sensible; smoke test en staging | FSD-UC-001, FSD-UC-003, BR-11 |
| NFR-005 | Fiabilidad | Disponibilidad | El servicio debe estar disponible durante el horario académico crítico (lunes–viernes, 07:00–22:00 BOT) | Uptime (%) calculado mensualmente en ventana horaria académica | ≥ 99,0 % | ≥ 99,5 % | Monitoreo continuo con UptimeRobot o Pingdom; reporte mensual automático; alertas si cae < umbral | FSD-UC-002, FSD-UC-005 |
| NFR-006 | Fiabilidad | Tolerancia a fallos | Ante fallo del motor de reportes PDF, el sistema debe continuar operativo y notificar al usuario sin pérdida de datos | Tiempo de recuperación / degradación graceful: operaciones core disponibles tras fallo PDF | 100 % operaciones core disponibles; mensaje de error al usuario ≤ 5 s | + reintento automático en ≤ 30 s | Prueba de caos: apagar servicio PDF y verificar respuesta del sistema principal; revisar logs de degradación | FSD-UC-007, §8 Integraciones |
| NFR-007 | Usabilidad | Capacidad de aprendizaje | Un usuario nuevo (coordinador de carrera) debe poder completar la carga de una evidencia vinculada a criterio sin asistencia externa | Tiempo de tarea en prueba de usabilidad con usuarios reales (minutos); tasa de errores (%) | Tiempo ≤ 5 min; errores ≤ 2 | Tiempo ≤ 3 min; errores = 0 | Test de usabilidad con 5 participantes (método think-aloud): medir tiempo y errores en tarea de carga de evidencia; comparar con línea base Excel | FSD-UC-003, NFR-004 |
| NFR-008 | Usabilidad | Accesibilidad | Los componentes de interfaz prioritarios (login, panel, carga de evidencia, historial) deben cumplir WCAG 2.2 nivel AA | Número de violaciones de accesibilidad nivel AA en componentes prioritarios | 0 violaciones críticas (nivel A) | 0 violaciones A + 0 violaciones AA | Auditoría automática con axe-core/Lighthouse en CI; revisión manual con lector de pantalla (NVDA/VoiceOver) para flujos críticos | FSD-UC-001, FSD-UC-003, NFR-006 |
| NFR-009 | Mantenibilidad | Modularidad | El código del backend debe estar organizado en módulos independientes por dominio (Auth, Process, Evidence, Observations, Reporting, Audit) sin acoplamiento directo entre módulos | Cobertura de pruebas unitarias por módulo (%) + número de dependencias directas entre módulos (acoplamiento eferente) | Cobertura ≥ 80 %; acoplamiento eferente ≤ 3 por módulo | Cobertura ≥ 90 %; acoplamiento eferente ≤ 2 | Reporte de cobertura Jest/pytest en CI/CD; análisis estático con SonarQube (métrica CBO — Coupling Between Objects) | FSD §2.4, AGENTS.md @DevAgent |
| NFR-010 | Compatibilidad | Interoperabilidad | Las integraciones con el almacenamiento de objetos, motor PDF y canal de notificaciones deben cumplir contratos de API definidos y responder dentro del SLA declarado | % de llamadas a servicios externos que cumplen SLA (p95): almacenamiento < 2 s, PDF < 5 s, notificaciones < 60 s | ≥ 95 % de llamadas dentro de SLA | ≥ 99 % de llamadas dentro de SLA | Contract testing (Pact o equivalente) por servicio externo; prueba de integración end-to-end en staging midiendo latencias reales con logs estructurados | FSD §8 Integraciones |

---

## Cobertura de características ISO 25010

| Característica ISO 25010 | NFRs que la cubren | Cantidad |
|--------------------------|--------------------|----------|
| Eficiencia de desempeño | NFR-001, NFR-002 | 2 |
| Seguridad | NFR-003, NFR-004 | 2 |
| Fiabilidad | NFR-005, NFR-006 | 2 |
| Usabilidad | NFR-007, NFR-008 | 2 |
| Mantenibilidad | NFR-009 | 1 |
| Compatibilidad | NFR-010 | 1 |
| **Total características** | **6 de 8 ISO 25010** | **10 NFRs** |

> **Criterio de excelencia cumplido**: 10 NFRs con métrica, umbral y verificación cubriendo **6 características** ISO 25010 (umbral excelente: ≥ 5 características con ≥ 8 NFRs).

---

## Notas de verificación

- **NFR-001 / NFR-002**: Ejecutar en entorno de staging con datos realistas (≥ 100 procesos, ≥ 500 evidencias).
- **NFR-003**: El escaneo OWASP ZAP debe incluir autenticación simulada para endpoints protegidos.
- **NFR-004**: Los tests de auditoría deben cubrir los 7 casos de uso críticos (FSD-UC-001 a FSD-UC-007).
- **NFR-005**: El cálculo de uptime excluye ventanas de mantenimiento programado comunicadas con ≥ 24 h de anticipación.
- **NFR-007**: La línea base se establece en la primera iteración de pruebas; la mejora ≥ 25 % aplica a partir de v1.1.
- **NFR-009**: El análisis de acoplamiento aplica al backend; el frontend sigue criterio de componentes independientes por pantalla (ver FSD §9).

---

## Trazabilidad cruzada NFR → FSD → PRD

| NFR | FSD-UC relacionado | PRD-REQ relacionado | Responsable verificación |
|-----|-------------------|---------------------|--------------------------|
| NFR-001 | FSD-UC-005, FSD-UC-007 | PRD-REQ-005 | @QaAgent + @DevAgent |
| NFR-002 | FSD-UC-007 | PRD-REQ-007 | @ArchAgent + @DevAgent |
| NFR-003 | FSD-UC-001, FSD-UC-003 | PRD-REQ-001, PRD-REQ-006 | @ArchAgent + @QaAgent |
| NFR-004 | FSD-UC-001, FSD-UC-003 | PRD-REQ-013 | @QaAgent |
| NFR-005 | FSD-UC-002, FSD-UC-005 | PRD-REQ-002 | @DevAgent (infra) |
| NFR-006 | FSD-UC-007 | PRD-REQ-007 | @ArchAgent |
| NFR-007 | FSD-UC-003 | PRD-REQ-006 | @ProductAgent + @QaAgent |
| NFR-008 | FSD-UC-001, FSD-UC-003 | PRD-REQ-001 | @ProductAgent |
| NFR-009 | Todos | PRD-REQ (arquitectura) | @ArchAgent |
| NFR-010 | FSD-UC-003, FSD-UC-007 | PRD-REQ-007, PRD-REQ-006 | @ArchAgent + @QaAgent |

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 12/05/2026 | AcredIA / @ArchAgent | Creación inicial — 10 NFRs ISO 25010 cuantificables |