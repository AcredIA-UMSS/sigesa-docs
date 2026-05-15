# Product Requirements Document (PRD) — SIGESA / AcredIA

> Propósito: definir qué debe hacer SIGESA para cumplir los objetivos del BRD, haciendo operativos los requisitos de mercado y normativos.

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA / AcredIA — Sistema de gestión y seguimiento de acreditaciones (UMSS) |
| Versión | v1.0 |
| Fecha | 15/05/2026 |
| Product Manager / Autor | Equipo SIGESA |
| Revisores | DUEA, Tech Lead, QA |
| Estado | Borrador |
| BRD de referencia | `docs/01_brd/BRD.md` |
| MRD de referencia | `docs/02_mrd/MRD.md` |
| Glosario de dominio | `context/03_domain_glossary.md` |
| FSD de referencia | `docs/04_fsd/FSD.md` |
| Fuentes adicionales | `team/Marlene/03_prd/PRD.md` |

## 1. Resumen ejecutivo

SIGESA centraliza el ciclo de acreditación de laUMSS para CEUB y ARCU-SUR, gestionando procesos, fases, indicadores y evidencias con trazabilidad inmutable. El producto atiende a [CC], [TD], [JD] y [P], y resuelve el problema de documentos dispersos, búsqueda lenta y falta de visibilidad institucional.

## 2. Épicas principales

- Gestión de evidencias y versionado.
- Dashboard y experiencia de usuario.
- Auditoría y control de fases.
- Portal público de transparencia.
- Notificaciones y comunicación.

## 3. Objetivos y métricas clave

| Objetivo | Métrica | Meta |
|----------|---------|------|
| Trazabilidad completa | % de fases con cadena indicador→evidencia | 100 % |
| Velocidad de búsqueda | Tiempo promedio por consulta | ≤ 2 min |
| Cumplimiento de hitos | % de fases cerradas a tiempo | ≥ 80 % |
| Transparencia pública | % de consultas resueltas | ≥ 95 % |
| Eficiencia operativa | Reducción de tiempo de comunicación | ≥ 50 % |

## 4. Alcance

### Incluido

- Búsqueda de evidencias por fase, indicador y carrera.
- Repositorio de evidencia con versionado append-only.
- Flujo CC→TD con aprobación/rechazo y justificación obligatoria.
- Dashboard mobile para [CC] y escritorio para [TD]/[JD].
- Portal público de estado y certificados.
- Reportes ejecutivos en PDF.
- Notificaciones automáticas por correo.
- Log de auditoría inmutable.
- Respaldo automático diario.

### Excluido

- Integraciones ERP/SIIS/RRHH.
- Pagos o transacciones.
- Rankings internacionales.
- Especificaciones tecnológicas de detalle.

## 5. Requerimientos funcionales

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| PRD-REQ-001 | Buscar evidencia por fase, indicador, carrera | Must |
| PRD-REQ-002 | Registrar evidencia versionada incubada por indicador | Must |
| PRD-REQ-003 | Permitir carga de documentos por [CC] con confirmación | Must |
| PRD-REQ-004 | Mostrar historial de versiones de un documento | Must |
| PRD-REQ-005 | Permitir aprobación/rechazo de indicadores con justificación | Must |
| PRD-REQ-006 | Mostrar dashboard mobile para [CC] | Must |
| PRD-REQ-007 | Generar reportes PDF ejecutivos | Must |
| PRD-REQ-008 | Notificar eventos críticos en ≤ 15 min | Must |
| PRD-REQ-009 | Publicar estado de acreditación en portal público | Should |

## 6. Requerimientos no funcionales

| ID | Categoría | Requerimiento | Métrica | Umbral |
|----|-----------|---------------|---------|--------|
| PRD-NFR-001 | Rendimiento | Búsqueda de evidencia | p95 | < 500 ms |
| PRD-NFR-002 | Rendimiento | Generación de PDF | absoluto | ≤ 5 min |
| PRD-NFR-003 | Rendimiento | Notificaciones críticas | absoluto | ≤ 15 min |
| PRD-NFR-004 | Disponibilidad | Dashboard y portal público | uptime | ≥ 99 % |
| PRD-NFR-005 | Seguridad | Cifrado en tránsito | estándar | TLS 1.3 |
| PRD-NFR-006 | Seguridad | Cifrado en reposo | estándar | AES-256 |
| PRD-NFR-007 | Seguridad | Control de acceso RBAC | cobertura | 100 % roles |
| PRD-NFR-008 | Usabilidad | Validación en tiempo real en formularios | cobertura | 100 % campos obligatorios |
| PRD-NFR-009 | Usabilidad | Barra de progreso en carga de archivos | cobertura | 100 % cargas |
| PRD-NFR-010 | Compatibilidad | Navegadores modernos | plataformas | Chrome, Firefox, Edge |
| PRD-NFR-011 | Accesibilidad | WCAG 2.2 AA en componentes críticos | verificación | 100 % componentes críticos |
| PRD-NFR-012 | Respaldo | Respaldo diario verificable | frecuencia | 1 vez por día |
| PRD-NFR-013 | Trazabilidad | Registro de acciones en log | cobertura | 100 % acciones |

## 7. Historias de usuario clave

### PRD-US-001
Como usuario, quiero iniciar sesión con mi correo UMSS para acceder según mi rol.

### PRD-US-003
Como [CC], quiero cargar evidencia directamente para evitar canales informales.

### PRD-US-006
Como [TD], quiero aprobar o rechazar indicadores con justificación.

### PRD-US-012
Como [P], quiero consultar el estado de acreditación sin autenticación.

## 8. Dependencias

- Infraestructura UMSS para hosting y correo.
- Datos maestros de carreras y fases entregados por DUEA.
- Servicios de almacenamiento para documentos.
- Log de auditoría append-only.

## 9. Supuestos

- Usuarios tienen correo institucional activo.
- La DUEA reconoce SIGESA como canal oficial de evidencia piloto.
- CEUB/ARCU-SUR no sufrirán cambios estructurales inmediatos.

## 10. Trazabilidad

- PRD-REQ-001 ↔ MRD-N-01
- PRD-REQ-002 ↔ BRD-OBJ-04
- PRD-REQ-003 ↔ MRD-N-01
- PRD-REQ-004 ↔ MRD-N-03
- PRD-REQ-005 ↔ MRD-N-03
- PRD-REQ-006 ↔ MRD-N-02
- PRD-REQ-007 ↔ BRD-OBJ-03
- PRD-REQ-008 ↔ BRD-OBJ-04
- PRD-REQ-009 ↔ MRD-N-04

## 11. Roadmap de lanzamiento

- v1.0: MVP operativo con carga de evidencia, aprobación, dashboard, reportes y portal público.
- v1.1: Experiencia móvil extendida, WCAG AA, exportación Excel.
- v2.0: Integraciones externas, evaluador externo e IA asistencial.

## 12. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 15/05/2026 | Equipo SIGESA | Documento inicial consolidado en `docs/03_prd/PRD.md`. |
