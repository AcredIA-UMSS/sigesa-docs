# Matriz de trazabilidad extremo a extremo — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Fuente canónica** | `docs/LFSD.md` (FSD / LFSD), `docs/BRD_v1.md`, `team/aylenGonzales/PRD_v1.md` (referencias PRD-REQ / PRD-US) |
| **Paquete AcredIA (detalle UC 001–012)** | `team/Marlene/09_trazabilidad/matriz_trazabilidad.md` |
| **Alcance** | Sistema de Evaluación y Acreditación de Carreras (CEUB / ARCU-SUR) — DUEA UMSS |

---

## 1. Convención de identificadores

| Prefijo | Significado | Ejemplo |
|---------|-------------|---------|
| **OBJ** | Objetivo de negocio | OBJ-01 |
| **PRD-REQ** | Requerimiento funcional (PRD) | PRD-REQ-001 |
| **NFR** | Requerimiento no funcional ISO/IEC 25010 (mapeo LFSD §10) | NFR-001 |
| **FSD-UC** | Caso de uso (LFSD §4) | FSD-UC-001 |
| **PRD-US** | User Story (trazada en LFSD por UC) | PRD-US-001 |
| **RB** / **BR** | Regla de negocio / regla Must (LFSD §5) | RB-06, BR-015 |
| **GH** | Escenario Gherkin (agrupado por UC) | GH-UC001-S01 |
| **API** | Contrato REST lógico (LFSD §8 + rutas §9) | API-AUTH-LOGIN |
| **MOD** | Módulo lógico del sistema (LFSD §2.4) | MOD-AUTH |
| **TC** | Caso de prueba (LFSD §11) | TC-01 |
| **RISK** | Riesgo (LFSD §13) | RISK-01 |
| **KPI** | Indicador de resultado / operación | KPI-01 |

**Estado de implementación (global artefacto):** `PLAN` | `EN_CURSO` | `DONE` | `N/A` (documentación solamente).

**Prioridad:** `P0` crítico institucional · `P1` alto · `P2` medio · `P3` bajo.

**Criticidad:** `C1` acreditación / cumplimiento normativo · `C2` operación DUEA · `C3` soporte / transversal.

---

## 2. Objetivos de negocio (OBJ)

| ID | Objetivo | Contexto UMSS / CEUB |
|----|----------|----------------------|
| OBJ-01 | Única fuente de verdad para evidencias de acreditación | Reduce dispersión Excel/correo/pendrive |
| OBJ-02 | Trazabilidad auditable ante CEUB y visitas externas | RB-04, NFR-013 |
| OBJ-03 | Visibilidad gerencial en tiempo real del avance por carrera/facultad | FSD-UC-004 |
| OBJ-04 | Cumplimiento de plazos de convocatoria y notificaciones | RB-05, NFR-003 |
| OBJ-05 | Soberanía de datos y acceso institucional (@umss.edu.bo) | RB-06, NFR-005 |

---

## 3. Matriz maestra (bidireccional por fila dominante)

Cada fila consolida la **cadena** OBJ → PRD-REQ → NFR → UC → US → RB/BR → Gherkin → API → MOD → TC → Riesgo → KPI.

| OBJ | PRD-REQ | NFR (ISO 25010) | FSD-UC | PRD-US (ref. LFSD) | RB / BR | GH (escenario) | API lógica | MOD | TC | RISK (LFSD §13) | KPI | Estado | Prioridad | Responsable | Criticidad | Evidencia validación |
|-----|---------|-----------------|--------|-------------------|-----------|----------------|------------|-----|-----|-----------------|-----|--------|-------------|--------------|------------|----------------------|
| OBJ-01 | PRD-REQ-003,004 | NFR-009,013,006 | FSD-UC-002 | PRD-US-003,004,005 | RB-02, RB-04, BR-015 | GH-UC002-S01,S02 | API-DOC-POST, API-DOC-GET | MOD-DOCS | TC-03,04,05 | RISK-02 | KPI-EVID-COMPLETE | PLAN | P0 | Tech Lead AcredIA | C1 | LFSD §9.1 Hi-Fi carga |
| OBJ-01 | PRD-REQ-005 | NFR-003,013 | FSD-UC-003 | PRD-US-006,007,008 | RB-03, BR-013,014 | GH-UC003-S01,S02,S03 | API-WF-PATCH | MOD-WORKFLOW | TC-06,07,08 | RISK-01 | KPI-SUBFASE-OK | PLAN | P0 | TD Lead DUEA + Dev | C1 | Panel TD validado LFSD |
| OBJ-03 | PRD-REQ-006 | NFR-001,004 | FSD-UC-004 | PRD-US-009,010 | RB-09, RB-05 | GH-UC004-S01 | API-DASH-GET | MOD-DASHBOARD | TC-09,10 | RISK-04 | KPI-DASH-LATENCY | PLAN | P0 | JD DUEA + Dev | C2 | CSAT dashboard LFSD |
| OBJ-02 | PRD-REQ-007 | NFR-002,013 | FSD-UC-005 | PRD-US-011 | RB-07 | GH-UC005-S01 | API-REP-POST-PDF | MOD-REPORTES | TC-11,12 | RISK-02 | KPI-PDF-SLA | PLAN | P1 | JD DUEA | C2 | E2E reporte ≤5 min |
| OBJ-05 | PRD-REQ-001,002 | NFR-005,007 | FSD-UC-001 | PRD-US-001,002 | RB-06 | GH-UC001-S01,S02 | API-AUTH-LOGIN | MOD-AUTH | TC-01,02 | RISK-07 | KPI-LOGIN-SUCCESS | PLAN | P0 | Infra UMSS + Dev | C1 | TC seguridad dominio |
| OBJ-04 | PRD-REQ-008 | NFR-003 | FSD-UC-002,003 | (notif.) | — | Implícito en GH-UC002/003 | API-NOTIF-OUTBOX | MOD-NOTIF | TC-13 | RISK-01 | KPI-NOTIF-SLA | PLAN | P1 | Dev + Comunicaciones | C2 | Monitoreo SMTP |
| OBJ-01 | PRD-REQ-009 | NFR-001 | T-008 (buscador) | — | — | TC-14 escenario | API-SEARCH-GET | MOD-BUSQUEDA | TC-14 | RISK-02 | KPI-SEARCH-P95 | PLAN | P2 | Dev | C3 | k6 p95 ≤3s |
| OBJ-03 | PRD-REQ-012 | NFR-004,008 | Portal (§2.1) | — | RB-11 (IA v2) | Portal lectura | API-PUBLIC-GET | MOD-PUBLICO | TC-PUB-01 | RISK-05 | KPI-PORTAL-UPTIME | PLAN | P2 | JD DUEA | C2 | UAT lectura pública |
| OBJ-02 | T-009 | NFR-013 | Transversal | — | RB-04 | Todas las acciones | API-AUDIT-APPEND | MOD-AUDITORIA | TC-AUD-01 | RISK-07 | KPI-AUDIT-COVERAGE | PLAN | P0 | Dev | C1 | E2E 100% acciones |
| OBJ-01 | T-011 | NFR-004,006 | Respaldo (§2.1) | — | — | Runbook backup | API-OPS-BACKUP | MOD-OPS | TC-BKP-01 | RISK-02 | KPI-RPO-RTO | PLAN | P1 | DevOps | C2 | Checklist despliegue |

**Notas:**

- **PRD-REQ-012** en LFSD §9 tabla de pantallas (`/portal-publico`); si el PRD consolidado usa otra numeración, mantener equivalencia en ADR.
- **ISO/IEC 25010:** NFR-001/002 → **Eficiencia de desempeño**; NFR-004 → **Confiabilidad**; NFR-005–007 → **Seguridad**; NFR-008 → **Usabilidad (ext.) / accesibilidad**; NFR-009/010/012 → **Usabilidad**; NFR-011 → **Compatibilidad**; NFR-013 → **Mantenibilidad / portabilidad trazabilidad** (registro verificable).

---

## 4. Catálogo API ↔ UC (contratos lógicos)

| ID API | Método / recurso | FSD-UC | RB / BR crítica |
|--------|------------------|--------|-----------------|
| API-AUTH-LOGIN | `POST /auth/login` | UC-001 | RB-06 |
| API-AUTH-REFRESH | `POST /auth/refresh` | UC-001 | RB-06 |
| API-DOC-POST | `POST /documentos` | UC-002 | RB-02, BR-015 |
| API-DOC-GET | `GET /documentos/{id}` | UC-002 | RB-04 |
| API-WF-PATCH | `PATCH /indicadores/{id}/decision` | UC-003 | RB-03, BR-014 |
| API-DASH-GET | `GET /dashboard/jefatura` | UC-004 | RB-09 |
| API-REP-POST-PDF | `POST /reportes/pdf` | UC-005 | RB-07 |
| API-SEARCH-GET | `GET /busqueda` | T-008 | NFR-001 |
| API-PUBLIC-GET | `GET /portal-publico/estado` | Portal | Datos no sensibles |
| API-AUDIT-APPEND | Evento interno post-acción | Transversal | NFR-013 |

---

## 5. Catálogo Gherkin ↔ TC (referencia cruzada)

| ID GH | UC | Resumen escenario (LFSD §4) | TC |
|-------|-----|------------------------------|-----|
| GH-UC001-S01 | UC-001 | Login exitoso @umss.edu.bo | TC-01 |
| GH-UC001-S02 | UC-001 | Rechazo dominio no institucional | TC-02 |
| GH-UC002-S01 | UC-002 | Carga exitosa PDF ≤50MB | TC-03 |
| GH-UC002-S02 | UC-002 | Archivo demasiado grande | TC-05 |
| GH-UC003-S01 | UC-003 | Rechazo sin justificación bloqueado | TC-07 |
| GH-UC003-S02 | UC-003 | Rechazo con justificación válida | TC-07 |
| GH-UC003-S03 | UC-003 | Bloqueo cierre subfase incompleta | TC-08 |
| GH-UC004-S01 | UC-004 | Semáforos y tiempo real | TC-09 |
| GH-UC005-S01 | UC-005 | Generación PDF y auditoría | TC-11 |

---

## 6. Módulos ↔ Tareas Spec Kit (LFSD §2.5)

| MOD | Descripción | Task IDs | Estado global |
|-----|-------------|----------|-----------------|
| MOD-AUTH | IAM JWT dominio UMSS | T-001, T-002 | PLAN |
| MOD-DOCS | Evidencias versionadas S3 | T-003, T-008 | PLAN |
| MOD-WORKFLOW | Aprobación TD / fases | T-004, T-007, T-012 | PLAN |
| MOD-DASHBOARD | Semáforos JD | T-005, T-010 | PLAN |
| MOD-REPORTES | PDF server-side | T-006 | PLAN |
| MOD-NOTIF | Correo SMTP / outbox | T-007 | PLAN |
| MOD-AUDITORIA | Log append-only | T-009 | PLAN |
| MOD-OPS | Backup diario | T-011 | PLAN |

---

## 7. KPIs operativos e institucionales

| KPI | Fórmula | Objetivo | Fuente |
|-----|-----------|------------|--------|
| KPI-EVID-COMPLETE | Indicadores con evidencia vigente / indicadores requeridos | ≥ umbral por convocatoria | BD agregados |
| KPI-SUBFASE-OK | Subfases aprobadas a tiempo / subfases totales | Tendencia ≥ gestión anterior | MOD-WORKFLOW |
| KPI-DASH-LATENCY | p95 tiempo carga dashboard | ≤ 2 min experiencia (NFR agregado negocio LFSD UC-004) | APM |
| KPI-PDF-SLA | % jobs PDF ≤ 5 min | 100% | Cola jobs |
| KPI-NOTIF-SLA | % notificaciones ≤ 15 min | ≥ 99% | Logs SMTP |
| KPI-LOGIN-SUCCESS | Logins OK / intentos válidos | ≥ 99% | AUDIT |
| KPI-AUDIT-COVERAGE | Acciones con log / acciones totales E2E | 100% | NFR-013 |

---

## 8. Riesgos ↔ mitigación (resumen RISK)

| ID | Descripción corta | Mitigación principal | Objetivo afectado |
|----|-------------------|----------------------|-------------------|
| RISK-01 | Falla SMTP | Cola retry + alerta admin | OBJ-04 |
| RISK-02 | Carga / almacenamiento | Límite 50MB, colas | OBJ-01 |
| RISK-04 | Cambio normativa CEUB | Taxonomías configurables | OBJ-02 |
| RISK-05 | Red institucional | Pruebas en campus | OBJ-03 |
| RISK-07 | Acceso no autorizado | TLS, JWT, auditoría | OBJ-05 |

---

## 9. Vista inversa: NFR ISO 25010 → artefactos

| NFR-ID | Característica 25010 (principal) | PRD-REQ / UC | MOD | TC |
|--------|----------------------------------|--------------|-----|-----|
| NFR-001 | Eficiencia desempeño | REQ-009 | MOD-BUSQUEDA | TC-14 |
| NFR-002 | Eficiencia desempeño | REQ-007 | MOD-REPORTES | TC-11 |
| NFR-003 | Eficiencia desempeño | REQ-008 | MOD-NOTIF | TC-13 |
| NFR-004 | Confiabilidad | REQ-006 | MOD-DASHBOARD | TC-09 |
| NFR-005 | Seguridad | REQ-001 | MOD-AUTH | TC-01 |
| NFR-006 | Seguridad | — | MOD-DOCS | TC-03 |
| NFR-007 | Seguridad | REQ-001 | MOD-AUTH | TC-02 |
| NFR-008 | Usabilidad | REQ-006 | MOD-DASHBOARD | TC-10 |
| NFR-009 | Usabilidad | REQ-003 | MOD-DOCS | TC-03 |
| NFR-010 | Usabilidad | Transversal | SPA | E2E formularios |
| NFR-011 | Compatibilidad | Transversal | SPA | Manual browsers |
| NFR-012 | Usabilidad móvil CC | REQ-003 | SPA CC | Dispositivos reales |
| NFR-013 | Mantenibilidad (trazabilidad) | Todos | MOD-AUDITORIA | TC-AUD-01 |

---

## 10. Gobierno de la matriz

| Actividad | Frecuencia | Responsable |
|-----------|------------|---------------|
| Actualización de IDs y estado | Sprint / hito | Scrum Master AcredIA |
| Auditoría de cobertura UC vs código | Release | QA Lead |
| Firma institucional alcance release | Mayor | Jefatura DUEA |

---

*Documento generado para equipos análisis, arquitectura, desarrollo, QA, DevOps y stakeholders DUEA / facultades UMSS.*
