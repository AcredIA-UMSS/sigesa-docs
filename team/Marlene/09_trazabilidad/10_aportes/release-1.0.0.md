# Release notes — SIGESA / AcredIA v1.0.0

## Sistema de Evaluación y Acreditación de Carreras · UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | 1.0.0 |
| **Fecha de corte** | 14/05/2026 |
| **Tipo de release** | Línea base documental, de trazabilidad y de gobernanza IA-SDLC (repositorio `sigesa-docs`) |
| **FSD de referencia** | `docs/LFSD.md` v1.0 (11/05/2026) |

---

## 1. Resumen ejecutivo

La versión **1.0.0** consolida la **primera línea base oficial** de documentación técnica, metodológica y de gobernanza para el ecosistema **SIGESA / AcredIA**, alineada con los casos de uso **FSD-UC-001 a UC-005**, reglas de negocio **RB/BR** del LFSD, NFR bajo perspectiva **ISO/IEC 25010**, y prácticas **DevSecOps** y **AI-SDLC**. Está orientada a la operación de la **DUEA** y a las **facultades** de la **Universidad Mayor de San Simón** en procesos **CEUB** y **ARCU-SUR**, con énfasis en evidencia versionada, dictamen técnico DUEA y visibilidad gerencial.

---

## 2. Objetivos del release

| ID | Objetivo | Criterio de éxito |
|----|-----------|-------------------|
| RO-01 | Establecer trazabilidad extremo a extremo (negocio → prueba) | Publicación de `matriz_trazabilidad.md` |
| RO-02 | Definir métricas de IA responsable en el ciclo de vida | Publicación de `metricas_ai_sdlc.md` |
| RO-03 | Estandarizar operación multi-agente y Cursor Rules de dominio | Publicación de `AGENTS.md` v1.0 |
| RO-04 | Formalizar comunicación de versión a stakeholders | Este documento |

---

## 3. Valor institucional (UMSS / Bolivia)

- **Transparencia operativa:** cadena clara entre convocatoria, carga de evidencias por [CC], revisión por [TD] y visibilidad de [JD].  
- **Defensa ante auditoría externa:** trazabilidad documental (`RB-04`) y registro de acciones (`NFR-013`).  
- **Alineación normativa nacional y regional:** taxonomías CEUB y ARCU-SUR tratadas como configuración crítica (`T-012`).  
- **Soberanía de acceso:** política de dominio institucional `@umss.edu.bo` (`RB-06`).

---

## 4. Alcance funcional (según LFSD)

| Ámbito | Incluido en especificación v1.0 | Nota de implementación |
|--------|----------------------------------|-------------------------|
| Autenticación JWT + roles | Sí (`FSD-UC-001`) | Tasks T-001, T-002 — estado según tablero de proyecto |
| Carga y versionado de evidencias | Sí (`FSD-UC-002`) | T-003 |
| Aprobación / rechazo TD | Sí (`FSD-UC-003`) | T-004 |
| Dashboard y portal | Sí (`FSD-UC-004`, §2.1) | T-005, T-010 |
| Reportes PDF | Sí (`FSD-UC-005`) | T-006 |
| Integración SIIS tiempo real | No v1 (`LFSD` §2.2) | Roadmap v2 |

---

## 5. Funcionalidades implementadas (por capa de entrega)

### 5.1 Gestión de acreditación académica

- Modelado de **proceso** por carrera y tipo CEUB/ARCU-SUR (`RB-08`, `RB-01`).  
- Estados de **indicador** y reglas de cierre de **subfase** (`RB-03`, `BR-014`).  
- Diagramas de arquitectura funcional y estado en `08_mermaid/`.

### 5.2 Evaluación académica (flujo DUEA)

- Flujo **CC → TD** con justificación obligatoria en rechazo (`FSD-UC-003`).  
- Matriz de trazabilidad vinculada a **TC-06–TC-08**.

### 5.3 Gestión documental

- Política **append-only** / versionado para aprobados (`RB-04`).  
- Límites de tamaño y MIME (`FSD-UC-002`).  
- ER de referencia en LFSD §6.

### 5.4 Reportes

- Requisito de generación **≤ 5 min** (`NFR-002`, `FSD-UC-005`).  
- Restricción de **uso interno** y distribución externa bajo control JD (`RB-07`).

### 5.5 Dashboard

- Semáforos y filtros por facultad y gestión (`FSD-UC-004`).  
- KPIs de latencia y completitud enlazados en `matriz_trazabilidad.md`.

### 5.6 Seguridad y auditoría

- TLS 1.3, cifrado en reposo, cero incidentes no autorizados como objetivo (`NFR-005–007`).  
- Cobertura de auditoría **100 %** acciones como meta (`NFR-013`).  
- Riesgos y mitigaciones catalogados en LFSD §13 reflejados en matriz.

---

## 6. Mejoras técnicas

### 6.1 APIs (contratos lógicos)

Catálogo REST alineado LFSD §8–9 y ampliado en `matriz_trazabilidad.md` §4 (`API-AUTH-*`, `API-DOC-*`, `API-WF-*`, `API-DASH-*`, `API-REP-*`).

### 6.2 Arquitectura

- Vista por capas (SPA, API, workers, PostgreSQL, S3) en diagramas Mermaid.  
- Módulos lógicos `MOD-*` mapeados a tasks `T-001`…`T-012`.

### 6.3 Escalabilidad

- Separación de generación PDF **asíncrona** (cola jobs) como patrón de diseño en diagramas de secuencia.  
- Outbox para notificaciones (patrón recomendado en secuencias técnicas).

### 6.4 Observabilidad

- Métricas AI-SDLC `M-AI-006`, `M-AI-009` y panel DevOps descritos en `metricas_ai_sdlc.md`.

### 6.5 Seguridad

- Reglas DevSecOps y scanning en `metricas_ai_sdlc.md` §7.  
- Cursor Rules `CR-SIG-01` … `CR-SIG-04` en `AGENTS.md`.

---

## 7. Correcciones

| Tipo | Descripción |
|------|-------------|
| Alineación de rutas | Trazabilidad unificada hacia `docs/LFSD.md` como FSD canónico del repositorio |
| Coherencia ID | Uso consistente de `PRD-REQ-*`, `FSD-UC-*`, `NFR-*`, `TC-*` en matriz |

---

## 8. Bugs resueltos

| ID | Descripción |
|----|-------------|
| — | No aplica: release de línea base documental; registro de bugs de producto se mantendrá en el tracker del código aplicativo cuando el repositorio de implementación esté vinculado |

---

## 9. Riesgos mitigados (gobernanza)

| Riesgo | Mitigación en v1.0.0 |
|--------|----------------------|
| Deriva entre especificación y trabajo de IA | `AGENTS.md` + Cursor Rules + métricas drift `M-AI-004` |
| Falta de trazabilidad en auditoría CEUB | `matriz_trazabilidad.md` + NFR-013 explícito |
| Uso irresponsable de IA en dictámenes | RB-11 + skills con human-in-the-loop |

---

## 10. Optimizaciones

- Reducción de ambigüedad para equipos mediante **una matriz maestra** y **un catálogo de métricas IA**.  
- Reducción de tiempo de onboarding de agentes mediante **skills** y **reglas de Cursor** específicas del dominio UMSS.

---

## 11. Métricas del release

| Métrica | Valor / meta |
|---------|----------------|
| Cobertura funcional documentada (UC LFSD §4) | 5/5 UC principales |
| Cobertura QA referenciada | TC-01 a TC-14 + extensiones en matriz |
| KPIs técnicos definidos | Ver §7 `matriz_trazabilidad.md` y §2 `metricas_ai_sdlc.md` |
| Rendimiento esperado (aplicativo) | NFR-001 p95 buscador ≤3 s; NFR-002 PDF ≤5 min; NFR-003 notificación ≤15 min |

---

## 12. Riesgos conocidos

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Dependencia SMTP institucional | Alto | Cola de reintentos, alertas (`RISK-01`) |
| Cambios normativos CEUB/ARCU-SUR | Alto | Taxonomías configurables (`T-012`) |
| Red campus UMSS variable | Medio | Pruebas en condiciones reales (`RISK-05` LFSD) |

---

## 13. Limitaciones

- **Integración SIIS** y otras fuentes académicas en **tiempo real** permanecen **fuera de alcance v1** del LFSD.  
- **IA asistencial autónoma** (clasificación avanzada, detección de patrones) en **v2** según LFSD §2.2.  
- Este repositorio **no sustituye** el acta de instalación ni el certificado de seguridad de la capa de hosting UMSS.

---

## 14. Dependencias

| Dependencia | Tipo |
|-------------|------|
| `docs/LFSD.md` | Especificación funcional |
| `team/aylenGonzales/PRD_v1.md` | Origen PRD-REQ / US citados en LFSD |
| Servidor SMTP UMSS | Operación |
| PostgreSQL + almacenamiento S3-compatible | Infraestructura |

---

## 15. Consideraciones operativas

- Comité de cambio debe validar cualquier modificación de **Cursor Rules** que afecte `CR-SIG-01` a `CR-SIG-04`.  
- Los KPIs de IA (`metricas_ai_sdlc.md`) deben asignarse a un **responsable métrica** en el tablero de operaciones DUEA.  
- Antes de pilotar con datos reales de carreras, ejecutar checklist **P-S01–P-S04** de `AGENTS.md`.

---

## 16. Roadmap futuro

### 16.1 Release 1.1 (propuesta)

- Portal público endurecido con cache CDN y métricas de disponibilidad.  
- Buscador con índices optimizados y pruebas k6 formales.  
- Panel de métricas HER y FPR/FNR para skills v2.

### 16.2 Release 2.0 (propuesta)

- Integración lectura **SIIS** u otros sistemas UMSS vía bus institucional.  
- IA asistencial con **RB-11** plenamente instrumentada en producto.  
- Clasificación automática de evidencias bajo feature flags y DPIA.

### 16.3 Mejoras IA

- Corpus RAG curado por DUEA (documentos públicos CEUB/ARCU-SUR + manuales internos aprobados).  
- Benchmark continuo `M-AI-002` con golden set por facultad.

### 16.4 Integraciones institucionales

- Contratos de datos con **Vicerrectorado** y **DTI** UMSS.  
- Single sign-on institucional (evaluación técnica aparte del JWT inicial).

---

## 17. Agradecimientos y aprobaciones

| Rol | Nombre / área | Acción |
|-----|----------------|--------|
| Producto | Grupo AcredIA | Baseline documental |
| Contraloría funcional | DUEA UMSS | Pendiente de firma según calendario institucional |

---

## 18. Registro de cambios del documento

| Versión | Fecha | Autoría |
|---------|-------|---------|
| 1.0.0 | 14/05/2026 | Baseline generada para repositorio `sigesa-docs` |

---

*Ubicación: `10_aportes/release-1.0.0.md`*
