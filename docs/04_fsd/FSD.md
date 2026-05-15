# Functional Specification Document (FSD) — SIGESA / AcredIA

> Propósito: traducir los requisitos del BRD y PRD en un diseño funcional concreto, con casos de uso y criterios de aceptación.

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA / AcredIA — Sistema de gestión y seguimiento de acreditaciones (UMSS) |
| Versión | v1.0 |
| Fecha | 15/05/2026 |
| Autores | Equipo SIGESA |
| Revisores | DUEA, Tech Lead, QA |
| Estado | Borrador |
| BRD de referencia | `docs/01_brd/BRD.md` |
| PRD de referencia | `docs/03_prd/PRD.md` |
| Glosario de dominio | `context/03_domain_glossary.md` |

## 1. Resumen ejecutivo

SIGESA es la plataforma que organiza el ciclo de acreditación CEUB y ARCU-SUR de la UMSS mediante un repositorio único de evidencias versionadas, una máquina de estados de fase, un dashboard operativo y un portal de transparencia. El FSD define el comportamiento del sistema para los actores [CC], [TD], [JD] y [P].

## 2. Alcance

### Incluido

- Autenticación institucional con roles.
- Carga de evidencia documentada por indicador.
- Versionado append-only de documentos.
- Aprobación/rechazo de indicadores con justificación.
- Dashboard mobile para [CC] y escritorio para [TD]/[JD].
- Panel de reportes PDF.
- Portal público de estado de acreditación.
- Notificaciones automáticas por evento crítico.
- Log de auditoría inmutable.

### Excluido

- Integración en tiempo real con sistemas externos UMSS.
- Pagos o facturación.
- Ranking internacional.
- Decisiones tecnológicas específicas.

## 3. Supuestos y dependencias

- La DUEA entregará datos maestros de carreras y fases.
- El correo institucional UMSS estará disponible para notificaciones.
- El acceso web institucional es estable.
- La normativa CEUB/ARCU-SUR no cambiará durante la fase piloto.

## 4. Actores y roles

| Actor | Responsabilidad |
|-------|-----------------|
| [CC] Coordinador de Carrera | Carga de evidencia y seguimiento de su carrera |
| [TD] Técnico DUEA | Auditoría de evidencias y aprobación de indicadores |
| [JD] Jefatura DUEA | Supervisión estratégica y generación de reportes |
| [P] Público externo | Consulta de estado de acreditación |

## 5. Casos de uso

### FSD-UC-001 — Autenticación y autorización

- Permite login con correo @umss.edu.bo.
- Asigna roles [CC], [TD], [JD] para controlar visibilidad.
- Redirige a dashboards personalizados.
- Bloquea correos no institucionales.
- Registra evento en log de auditoría.

#### Criterios de aceptación

```gherkin
Scenario: Usuario con correo UMSS válido inicia sesión
  Given un usuario registrado con correo @umss.edu.bo
  When ingresa correo y contraseña correctos
  Then recibe acceso a su dashboard según rol
  And se registra un evento de auditoría
```

### FSD-UC-002 — Carga y versionado de evidencia

- El [CC] carga archivos validando formato y tamaño.
- El sistema mantiene historial de versiones y hash de archivo.
- El indicador pasa a estado "En revisión".
- El [TD] recibe notificación en ≤ 15 min.
- Las versiones anteriores son accesibles, no eliminables.

#### Criterios de aceptación

```gherkin
Scenario: Coordinador carga evidencia válida
  Given un [CC] con indicador en estado "Pendiente"
  When sube un archivo válido con descripción
  Then el sistema guarda la versión y avisa al [TD]
  And muestra confirmación con número de versión
```

### FSD-UC-003 — Aprobación y rechazo de indicadores

- [TD] revisa evidencias y selecciona aprobar o rechazar.
- El rechazo requiere justificación mínima.
- Si todos los indicadores de la subfase están aprobados, la subfase puede cerrarse.
- Se registra cada acción en el log.

#### Criterios de aceptación

```gherkin
Scenario: Técnico rechaza indicador sin justificación
  Given un [TD] revisando un indicador en revisión
  When intenta rechazar sin justificar
  Then el sistema bloquea la acción y muestra error
```

### FSD-UC-004 — Dashboard y control de fases

- Muestra semáforos de estado por carrera y facultad.
- Permite filtrar por Fase, Indicador y Carrera.
- Incluye resumen de indicadores pendientes, aprobados y rechazados.

### FSD-UC-005 — Portal público de transparencia

- Publica el estado de acreditación sin autenticación.
- Permite consulta de certificados y estados de proceso.
- No expone datos personales restringidos.

## 6. Requisitos funcionales clave

| ID | Funcionalidad |
|----|---------------|
| FSD-F-001 | Login con correo institucional |
| FSD-F-002 | Búsqueda de evidencias y filtros por indicador |
| FSD-F-003 | Carga de evidencia con validación de formato |
| FSD-F-004 | Historial de versiones de documentos |
| FSD-F-005 | Aprobación/rechazo de indicadores |
| FSD-F-006 | Dashboard operativo con semáforos |
| FSD-F-007 | Generación de reportes ejecutivos PDF |
| FSD-F-008 | Notificaciones automáticas por evento crítico |
| FSD-F-009 | Portal público de estado |
| FSD-F-010 | Registro de auditoría append-only |

## 7. Requisitos no funcionales clave

| ID | Categoría | Descripción |
|----|-----------|-------------|
| FSD-NFR-001 | Rendimiento | Búsqueda de evidencia con p95 < 500 ms |
| FSD-NFR-002 | Rendimiento | Generación de PDF ≤ 5 min |
| FSD-NFR-003 | Disponibilidad | Uptime ≥ 99 % |
| FSD-NFR-004 | Seguridad | TLS 1.3 en tránsito |
| FSD-NFR-005 | Seguridad | AES-256 en reposo |
| FSD-NFR-006 | Accesibilidad | WCAG 2.2 AA en componentes críticos |
| FSD-NFR-007 | Usabilidad | Validación en tiempo real en formularios |
| FSD-NFR-008 | Trazabilidad | 100 % de acciones registradas en log |

## 8. Datos de entrada y salida

### FSD-UC-001
- Entrada: correo institucional, contraseña.
- Salida: token JWT con rol y redirección.

### FSD-UC-002
- Entrada: archivo, descripción, indicadorId.
- Salida: documento guardado con versión y hash.

### FSD-UC-003
- Entrada: indicadorId, acción, justificación.
- Salida: estado actualizado y notificación.

## 9. Criterios de éxito

- Login institucional operativo.
- Carga de evidencia con versionado append-only.
- Rechazo de indicadores con justificación obligatoria.
- Dashboard de estado y portal público disponibles.
- Notificaciones críticas enviadas en ≤ 15 min.

## 10. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 15/05/2026 | Equipo SIGESA | Consolidación del FSD básico. |
