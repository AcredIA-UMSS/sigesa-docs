---
name: sigesa-modulo-panel-alertas-reporte
description: >
  Especificar o implementar Panel semaforo (FSD-UC-005), Alertas (FSD-UC-006) y Reporte PDF
  (FSD-UC-007) segun PC-007, PC-008, PC-009 y DTI v1.1
  y bounded context Reporting del DTI. Activar cuando la tarea toque dashboard, scheduler o PDF.
allowed-tools:
  - read
  - edit
  - run-tests
model-tier: sonnet
fsd-version-min: v1.0
status: stable
owner: AcredIA / borisAngulo
---

# Skill-004 — Módulo Panel, Alertas y Reporte PDF (SIGESA borisAngulo)

> **Agentes**: **@DevAgent** (implementación), **@ArchAgent** (contratos API), **@QaAgent** (NFR-001, NFR-002, NFR-006).

## 1. Cuándo activarlo

- DURANTE: diseño o implementación de dashboard DUEA, jobs de recordatorio, exportación PDF.
- ARRANCA cuando: el usuario cita FSD-UC-005, FSD-UC-006 o FSD-UC-007 (o PRD-US-015, 016, 017).
- NO ACTIVAR para UC de evidencias, observaciones o auth (usar Skill-001).

## 2. Entradas obligatorias

| Campo | Fuente |
|-------|--------|
| Contratos | `prompt-contracts.md` → PC-007, PC-008, PC-009 |
| Reglas semáforo | PC-007: Verde avance >= 70 % y sin fecha critica < 7 dias; Amarillo/Rojo segun PC |
| NFRs | `docs/06_nfr/nfr_iso25010.md` → NFR-001 (panel p95), NFR-002 (PDF CPU), NFR-006 (degradacion) |
| Arquitectura | `09_dti/DTI_v1.md` §3.2 contenedores `worker`, `pdf`; §4.1 Reporting |
| Métricas producto | PRD OP-04, OP-05 (alertas >= 90 %, reporte <= 2 clics) |

## 3. Alcance por caso de uso

| FSD-UC (canónico) | PC | CU | Responsabilidad | Salida tipica |
|-------------------|-----|-----|-----------------|---------------|
| FSD-UC-005 | PC-007 | CU-009 | Panel + semaforo | `GET /panel`, DTO con % avance y color |
| FSD-UC-006 | PC-008 | CU-010 | Scheduler + notificaciones | Job cron, registro en auditoria |
| FSD-UC-007 | PC-009 | CU-011 | Reporte ejecutivo PDF | `POST /reportes/ejecutivo`, max 2 clics UI |

## 4. Procedimiento

### 4.1 Panel y semaforo (FSD-UC-005)

1. Agregar puerto `GetAccreditationDashboardUseCase` en dominio Reporting.
2. Calcular avance por criterios y fechas clave del proceso (BR-008).
3. Aplicar logica de color del PC-007 (sin cachear semaforo > 5 min).
4. Exponer DTO sin PII; filtrar por rol (RB-04): DUEA ve global, coordinador ve su carrera.
5. Test: AC Gherkin CU-009 en `casos-de-uso.md`; assert latencia bajo NFR-001 en integracion.

### 4.2 Alertas automaticas (FSD-UC-006)

1. Worker cron diario consulta actividades con `fecha_limite` proxima (PRD-US-016).
2. Generar evento y enviar por canal SMTP institucional; registrar en `LOG_AUDITORIA`.
3. Si falla envio (FM del UC-010): registrar error sin bloquear operaciones core (NFR-006).
4. Test: escenario Gherkin CU-010; mock del notificador.

### 4.3 Reporte PDF (FSD-UC-007)

1. Consolidar proceso, fases, evidencias criticas, observaciones abiertas y semaforo (PC-009).
2. Invocar adaptador PDF (DTI contenedor `pdf`); timeout y mensaje de error <= 5 s si falla.
3. UI: acceso desde panel o vista carrera en **<= 2 clics** (PRD OP-05).
4. Test: generacion con proceso fixture; caos test apagando servicio PDF (NFR-006).

### 4.4 Verificacion cruzada

```
[ ] PC-007, PC-008, PC-009 existen y no contradicen FSD
[ ] RB-04 aplicada en todos los endpoints del modulo
[ ] RB-11: acciones sensibles auditadas
[ ] Sin secretos SMTP ni rutas internas en logs
```

## 5. Salida esperada

- Codigo hexagonal (puertos + adaptadores) o especificacion OpenAPI si solo diseño.
- Tabla de trazabilidad:

| FSD ID | Componente | Test |
|--------|------------|------|
| FSD-UC-005 | `ReportingDashboardService` | `DashboardIT#semaforoVerde` |
| FSD-UC-006 | `DeadlineAlertScheduler` | `AlertSchedulerIT#enviaNotificacion` |
| FSD-UC-007 | `ExecutiveReportAdapter` | `ReportPdfIT#dosClics` |
| NFR-001 | `GET /panel` | k6 p95 < 3000 ms |

## 6. Anti-patrones

- Cachear semaforo > 5 min cuando PC-007 exige recalculo por carga → STOP.
- Bloquear API principal si PDF falla → viola NFR-006; degradar graceful.
- Exponer datos sensibles en vista publica (GAP-001) → fuera de alcance; usar skill-002 / PC-013.

## 7. Mini ejemplo

```
"Implementa el endpoint GET /panel con semaforo segun PC-007 y skill-004. Stack pendiente ADR-001."
```

## 8. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 2026-05-16 | AcredIA / borisAngulo | Versión inicial |
