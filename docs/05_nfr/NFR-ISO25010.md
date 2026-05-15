# Requerimientos No Funcionales — SIGESA / AcredIA

> Propósito: documentar los NFRs del proyecto ordenados por características ISO/IEC 25010 con métricas y umbrales verificables.

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA / AcredIA |
| Versión | v1.0 |
| Fecha | 15/05/2026 |
| Autor | Equipo SIGESA |
| Estado | Borrador |
| Referencias | `docs/01_brd/BRD.md`, `docs/03_prd/PRD.md`, `docs/04_fsd/FSD.md` |

## 1. Introducción

Este documento consolida los 15 requerimientos no funcionales de SIGESA, alineados a ISO/IEC 25010, para garantizar la calidad del sistema en desempeño, seguridad, confiabilidad, usabilidad, compatibilidad, mantenibilidad y portabilidad.

## 2. NFRs

| ID | Característica ISO | Métrica | Umbral | Verificación |
|----|--------------------|---------|--------|--------------|
| NFR-001 | Eficiencia de desempeño | Tiempo de respuesta del buscador | p95 < 500 ms | Pruebas de carga k6 |
| NFR-002 | Eficiencia de desempeño | Generación de reporte PDF | Tiempo absoluto ≤ 5 min | Pruebas funcionales E2E |
| NFR-003 | Eficiencia de desempeño | Notificación de eventos críticos | Tiempo absoluto ≤ 15 min | Monitoreo de correo institucional |
| NFR-004 | Confiabilidad | Disponibilidad en horario operativo | Uptime ≥ 99 % | Uptime monitor |
| NFR-005 | Seguridad | Cifrado de datos en tránsito | TLS 1.3 | Auditoría de configuración |
| NFR-006 | Seguridad | Cifrado de datos en reposo | AES-256 | Auditoría cloud |
| NFR-007 | Seguridad | Control de acceso RBAC | 100 % roles operativos | Pruebas de penetración de roles |
| NFR-008 | Fiabilidad | Tolerancia a fallos de módulo | Servicio continúa ante fallo parcial | Pruebas de inyección de fallos |
| NFR-009 | Fiabilidad | Recuperabilidad y respaldo | Backup diario verificable | Prueba de restauración |
| NFR-010 | Usabilidad | Tiempo de tarea para carga de evidencia | Mejora ≥ 25 % vs línea base | Pruebas de usabilidad |
| NFR-011 | Usabilidad | Conformidad WCAG 2.2 AA en componentes críticos | Auditoría 100 % | Lighthouse / axe |
| NFR-012 | Mantenibilidad | Modularidad y cobertura de pruebas | Cobertura mínima de módulos críticos | Reporte de tests unitarios / E2E |
| NFR-013 | Mantenibilidad | Trazabilidad de acciones en log | 100 % de acciones registradas | Revisión de logs |
| NFR-014 | Compatibilidad | Navegadores modernos compatibles | Chrome / Firefox / Edge | Pruebas de compatibilidad |
| NFR-015 | Portabilidad | Despliegue en entornos reproducibles | Script de despliegue limpio | Despliegue en entorno de staging |

## 3. Descripción de NFRs

### NFR-001 — Tiempo de respuesta en operaciones de búsqueda
- El sistema debe servir resultados en el buscador con latencia p95 menor a 500 ms.
- Verificación: pruebas de carga con 50 usuarios concurrentes usando k6.

### NFR-002 — Generación de reportes
- La generación de un reporte ejecutivo en PDF no debe superar 5 minutos.
- Verificación: prueba funcional de generación de PDF en el entorno de staging.

### NFR-003 — Notificaciones críticas
- Las notificaciones de rechazo, aprobación o vencimiento deben enviarse en un máximo de 15 minutos.
- Verificación: monitoreo de cola de envío y logs de correo.

### NFR-004 — Disponibilidad operacional
- El servicio debe mantenerse disponible al menos el 99 % del tiempo durante horario académico.
- Verificación: Uptime monitor externo.

### NFR-005 — Cifrado en tránsito
- Todo tráfico de usuario debe usar TLS 1.3.
- Verificación: auditoría de configuración HTTPS.

### NFR-006 — Cifrado en reposo
- Documentos y datos sensibles deben almacenarse con cifrado AES-256.
- Verificación: auditoría de proveedor cloud.

### NFR-007 — Control de acceso RBAC
- El sistema debe aplicar roles diferenciados y no permitir acceso cruzado indebido.
- Verificación: pruebas adversariales de roles.

### NFR-008 — Tolerancia a fallos
- Un módulo debe poder fallar sin comprometer la disponibilidad total del sistema.
- Verificación: inyección de fallos y observación del comportamiento.

### NFR-009 — Recuperabilidad
- El sistema debe generar respaldos diarios verificables.
- Verificación: restauración periódica de respaldo en staging.

### NFR-010 — Eficiencia de tareas críticas
- Las tareas de carga de evidencia deben ser un 25 % más rápidas que la línea base manual.
- Verificación: pruebas de usabilidad con usuarios DUEA.

### NFR-011 — Accesibilidad
- Los componentes críticos deben cumplir WCAG 2.2 AA.
- Verificación: auditoría con Lighthouse / axe.

### NFR-012 — Modularidad y pruebas
- La solución debe ser modular y cubrir con pruebas unitarias/E2E los módulos críticos.
- Verificación: reporte de cobertura y estructura modular.

### NFR-013 — Trazabilidad de log
- El 100 % de las acciones relevantes debe registrarse con usuario, fecha y hora.
- Verificación: revisión de logs y cobertura.

### NFR-014 — Compatibilidad
- El sistema debe operar en Chrome, Firefox y Edge modernos.
- Verificación: pruebas de compatibilidad manual y automatizada.

### NFR-015 — Portabilidad del despliegue
- El entorno debe desplegarse de forma reproducible con scripts.
- Verificación: despliegue exitoso en staging desde script limpio.

## 4. Matriz de trazabilidad NFR ↔ UC ↔ PRD

| NFR | PRD Requisito | FSD Caso de uso | Fuente |
|-----|---------------|-----------------|--------|
| NFR-001 | PRD-REQ-001 | FSD-UC-002 | Búsqueda |
| NFR-002 | PRD-REQ-007 | FSD-UC-005 | Reportes |
| NFR-003 | PRD-REQ-008 | FSD-UC-002/003 | Notificaciones |
| NFR-004 | PRD-NFR-004 | FSD-UC-004 | Dashboard |
| NFR-005 | PRD-NFR-005 | FSD-UC-001 | Seguridad |
| NFR-006 | PRD-NFR-006 | FSD-UC-001 | Seguridad |
| NFR-007 | PRD-NFR-007 | FSD-UC-001 | RBAC |
| NFR-008 | FSD-NFR-008 | FSD-UC-004 | Fiabilidad |
| NFR-009 | FSD-NFR-009 | FSD-UC-005 | Backup |
| NFR-010 | PRD-NFR-008 | FSD-UC-002 | Usabilidad |
| NFR-011 | PRD-NFR-011 | FSD-UC-004 | Accesibilidad |
| NFR-012 | FSD-NFR-012 | FSD-UC-001 | Mantenibilidad |
| NFR-013 | PRD-NFR-013 | FSD-UC-002 | Trazabilidad |
| NFR-014 | PRD-NFR-010 | FSD-UC-004 | Compatibilidad |
| NFR-015 | FSD-NFR-015 | FSD-UC-005 | Portabilidad |

## 5. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 15/05/2026 | Equipo SIGESA | Consolidación inicial de NFRs. |
