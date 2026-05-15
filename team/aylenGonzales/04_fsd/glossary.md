
## 14. Glosario

| Término | Definición |
|---------|------------|
| **SIGESA** | Sistema Inteligente de Gestión y Seguimiento de Acreditaciones — nombre técnico del producto |
| **AcredIA** | Nombre comercial del producto y del equipo de desarrollo |
| **DUEA** | Dirección Universitaria de Evaluación y Acreditación — unidad organizacional cliente en la UMSS |
| **UMSS** | Universidad Mayor de San Simón — institución implementadora |
| **CEUB** | Comité Ejecutivo de la Universidad Boliviana — organismo acreditador nacional |
| **ARCU-SUR** | Sistema de Acreditación Regional de Carreras Universitarias del MERCOSUR — organismo acreditador regional |
| **[CC]** | Coordinador de Carrera — actor operativo que carga evidencias |
| **[TD]** | Técnico DUEA — actor auditor que aprueba o rechaza indicadores |
| **[JD]** | Jefatura DUEA — actor estratégico con visibilidad total del sistema |
| **[JC]** | Jefe de Carrera — actor con responsabilidad institucional sobre el proceso de su carrera |
| **[EE]** | Evaluador Externo — par académico con acceso de solo lectura al proceso asignado |
| **[P]** | Público externo — estudiantes, egresados y empleadores que acceden al portal público |
| **Indicador** | Unidad mínima de evaluación dentro de una fase de acreditación; tiene un estado propio |
| **Fase** | Agrupación de indicadores dentro de un proceso de acreditación (ej.: Autoevaluación) |
| **Proceso de acreditación** | Instancia de acreditación de una carrera ante CEUB o ARCU-SUR en un periodo específico |
| **Evidencia** | Documento (PDF/DOCX/XLSX) cargado para respaldar un indicador; tiene historial de versiones |
| **Hash SHA-256** | Huella digital del archivo calculada para verificar integridad; almacenada en BD |
| **Semáforo** | Indicador visual (Verde/Amarillo/Rojo) del estado de avance de una carrera en el dashboard |
| **LOG_AUDITORIA** | Tabla append-only en PostgreSQL que registra todas las acciones del sistema de forma inmutable |
| **JWT** | JSON Web Token — token de autenticación con claims de rol y carrera, TTL 24 h |
| **RBAC** | Role-Based Access Control — control de acceso basado en roles implementado via JWT claims |
| **Volumen Docker** | Directorio persistente montado en el contenedor: `/data/evidencias/` |
| **LFSD ⚡** | Lightweight Functional Specification Document — modo compacto y orientado a implementación del FSD |
