# Requisitos no funcionales — ISO/IEC 25010 — SIGESA

## Control de versión

| Campo | Valor |
|-------|-------|
| **Versión** | v1.0 (equipo Alex Álvarez) |
| **Alineación Dorada** | [`docs/05_nfr/NFR_ISO25010.md`](../../../../docs/05_nfr/NFR_ISO25010.md) v1.1 |
| **Timestamp** | `2026-05-17T18:00:00-04:00` |
| **Autor** | Alexander James Alvarez |
| **Estado** | Borrador — listo para suite de pruebas y DTI |
| **BRD** | [`../01_brd/BRD.md`](../01_brd/BRD.md) |
| **MRD** | [`../02_mrd/MRD.md`](../02_mrd/MRD.md) |
| **PRD** | [`../03_prd/PRD.md`](../03_prd/PRD.md) · [`user_stories.md`](../03_prd/user_stories.md) |
| **FSD** | [`../04_fsd/FSD.md`](../04_fsd/FSD.md) · [`gherkin.md`](../04_fsd/gherkin.md) |
| **Regla QA** | [`.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc`](../../../../.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc) |

> **Propósito:** definir **cómo se verifica** la calidad del sistema más allá de las user stories del equipo. Todo NFR Must del release v1.0 debe tener **métrica numérica**, **método de verificación** y enlace a Gherkin o TC antes de implementación productiva.

---

## 0. Alineación con la regla QA Gherkin

| Invariante QA | Cumplimiento en este paquete |
|---------------|------------------------------|
| Código solo con Gherkin en PRD/FSD | [`../04_fsd/gherkin.md`](../04_fsd/gherkin.md) + PRD Dorado `docs/03_prd/PRD.md` |
| Tags en tests | [`plantilla_tags_pruebas.md`](plantilla_tags_pruebas.md) |
| Sad path DELETE / estados | NFR-017, NFR-018 · [`catalogo_tc.md`](catalogo_tc.md) |
| Sin código sin criterio | Gate documental — pendiente `src/` |

**Tags canónicos:** `@PRD-US-xxx` `@FSD-UC-xxx` `@NFR-xxx` `@TC-SAD-xxx`

---

## 1. Modelo de calidad (ISO/IEC 25010:2011)

| Característica ISO | NFR IDs | Prioridad v1.0 |
|--------------------|---------|----------------|
| Eficiencia de desempeño | NFR-001, NFR-002, NFR-003, NFR-004 | Crítica |
| Disponibilidad / fiabilidad | NFR-005, NFR-015 | Alta |
| Seguridad | NFR-006, NFR-007, NFR-008, NFR-009, NFR-017 | Crítica |
| Usabilidad | NFR-010, NFR-011 | Alta |
| Accesibilidad | NFR-012 | Media (v1.1) |
| Compatibilidad | NFR-013 | Media |
| Mantenibilidad | NFR-014 | Crítica (CI) |
| Adecuación funcional / dominio | NFR-016, NFR-018 | Crítica (gate) |
| Cumplimiento | NFR-019 | Ley 164 UMSS |

Diagrama de distribución: [`07_diagramas/nfr_cobertura_iso25010.mmd`](07_diagramas/nfr_cobertura_iso25010.mmd)

---

## 2. Catálogo maestro NFR-001 … NFR-019

| ID | ISO 25010 | Requisito | Métrica | Umbral | PRD-US (equipo) | FSD-UC | Verificación |
|----|-----------|-----------|---------|--------|-----------------|--------|--------------|
| NFR-001 | Eficiencia temporal | Latencia API lecturas (`GET` búsqueda, dashboard) | p95 | < 500 ms | 001, 007 | UC-007 | k6 |
| NFR-002 | Eficiencia temporal | E2E localizar y abrir Evidencia | mediana | ≤ 2 min | 001, 007 | UC-007 | UAT |
| NFR-003 | Eficiencia temporal | PDF ejecutivo [JD] | P95 | ≤ 5 min | 021 | UC-014 | E2E |
| NFR-004 | Eficiencia temporal | Notificación crítica SMTP | tiempo | ≤ 15 min | 005, 018, 019 | UC-015 | outbox |
| NFR-005 | Disponibilidad | Uptime piloto horario extendido | % mensual | ≥ 99 % | — | — | monitor |
| NFR-006 | Seguridad | TLS en tránsito | versión | TLS 1.2+ | 001 | UC-001 | scan |
| NFR-007 | Seguridad | Cifrado reposo blobs | algoritmo | AES-256 eq. | 002, 010 | UC-004, UC-005 | storage audit |
| NFR-008 | Seguridad | RBAC endpoints sensibles | cobertura | 100 % | 001 | UC-001 | API matrix |
| NFR-009 | Seguridad | Aislamiento [CC] por carrera | incidentes | 0 | 012 | UC-011 | tests rol |
| NFR-010 | Usabilidad | Validación formularios críticos | cobertura | 100 % | 002, 009 | UC-004, UC-008 | E2E |
| NFR-011 | Usabilidad | Progreso carga > 5 MB | cobertura UI | 100 % | 025 | UC-004 | E2E |
| NFR-012 | Accesibilidad | WCAG 2.2 AA flujos críticos | críticos A | 0 | — | — | axe v1.1 |
| NFR-013 | Compatibilidad | Chrome, Firefox, Edge (últ. 2) | pass UAT | 100 % | — | — | matriz |
| NFR-014 | Mantenibilidad | Tags PRD-US / FSD-UC / NFR en tests | Must | 100 % | *Must* | * | CI grep |
| NFR-015 | Fiabilidad | Respaldo diario + restore trimestral | RPO | ≤ 24 h | — | UC-017 | runbook |
| NFR-016 | Dominio | No-ERP (sin SIIS/RRHH) | módulos | 0 | — | — | gate |
| NFR-017 | Auditoría | Append-only Evidencia aprobada | rechazo DELETE | 100 % | 003 | UC-006 | TC-SAD-DELETE |
| NFR-018 | Dominio | Máquina de estados Indicador/Fase | bloqueo ilegal | 100 % | 009, 014, 023 | UC-008–010 | TC-SAD-* |
| NFR-019 | Cumplimiento | Ley 164 / políticas UMSS | checklist | sin críticos | — | — | DPO |

Puente con PRD §8 del equipo: ver [`matriz_cobertura.md`](matriz_cobertura.md).

---

## 3. Detalle por NFR (selección crítica)

### NFR-001 — Latencia API

| Campo | Valor |
|-------|-------|
| Endpoints | `GET /api/v1/evidences/search`, dashboard [CC]/[TD] |
| Carga | 50 VUs, 5 min |
| Fallo | p95 ≥ 500 ms en 2 corridas |
| Contrato | [`../04_fsd/api_contracts.md`](../04_fsd/api_contracts.md) API-EVD-02 |

### NFR-002 — Búsqueda E2E (≤ 2 min)

| Campo | Valor |
|-------|-------|
| Actor | [TD] (búsqueda global) / [CC] (carrera propia) |
| BRD | BRD-KPI-01 / objetivo PRD-OP-01 |
| Diagrama | [`../07_diagramas/UC02_secuencia.mmd`](../07_diagramas/UC02_secuencia.mmd) (carga; búsqueda sin diagrama dedicado) |

### NFR-017 — Inmutabilidad Evidencia

| Campo | Valor |
|-------|-------|
| Regla | FSD-BR-02 · BRD-CST-01 |
| Gherkin | [`../04_fsd/gherkin.md`](../04_fsd/gherkin.md) `@TC-SAD-DELETE` |
| API | `DELETE /evidences/{id}` → `409 EVIDENCE_IMMUTABLE` |
| DDL ref | [`../../../../docs/05_dti/ddl_sigesa_append_only.sql`](../../../../docs/05_dti/ddl_sigesa_append_only.sql) |

```gherkin
# Referencia — PRD-US-003 / FSD-UC-006
Escenario: Intento de eliminar Evidencia aprobada
  Dado una Evidencia en estado Aprobado
  Cuando un usuario intenta eliminarla físicamente
  Entonces el sistema rechaza la operación
  Y registra el intento en la bitácora de auditoría
  Y mantiene todas las versiones existentes
```

### NFR-018 — Máquina de estados

| TC | Escenario | Gherkin tag |
|----|-----------|-------------|
| TC-SAD-PHASE | Cierre Fase con pendientes | `@TC-SAD-PHASE` |
| TC-SAD-JUST | Rechazo sin justificación | `@TC-SAD-JUST` |
| TC-SAD-APPROVE | [CC] no puede aprobar | `@TC-SAD-APPROVE` |

Estados: [`../07_diagramas/UC01_estado.mmd`](../07_diagramas/UC01_estado.mmd), [`UC03_estado.mmd`](../07_diagramas/UC03_estado.mmd). Norma: [`../context/04_state_machine.md`](../context/04_state_machine.md).

---

## 4. Seguridad y cumplimiento (resumen)

| ID | Verificación |
|----|--------------|
| NFR-006 | TLS en reverse proxy UMSS |
| NFR-007 | Volumen Docker / storage según [`../../../../docs/05_dti/adrs/ADR_004_almacenamiento_blobs_docker.md`](../../../../docs/05_dti/adrs/ADR_004_almacenamiento_blobs_docker.md) |
| NFR-008 | Matriz en DTI §5; tests 403 por rol |
| NFR-009 | Test: token [CC] carrera A → 403 en indicadores carrera B |
| NFR-019 | Checklist Ley 164 con oficina legal UMSS |

---

## 5. Catálogo TC y matrices

| Artefacto | Enlace |
|-----------|--------|
| Catálogo TC completo | [`catalogo_tc.md`](catalogo_tc.md) |
| Matriz NFR ↔ Gherkin | [`matriz_cobertura.md`](matriz_cobertura.md) |
| Plantilla tags | [`plantilla_tags_pruebas.md`](plantilla_tags_pruebas.md) |

---

## 6. Auditoría de alineación (checklist)

| Criterio | Estado | Evidencia |
|----------|--------|-----------|
| ≥ 5 características ISO | Cumple | §1 (9 características) |
| NFR con umbral numérico | Cumple | §2 (19 NFR) |
| Sad path append-only | Cumple | NFR-017 + gherkin |
| Sad path estados | Cumple | NFR-018 + gherkin |
| Trazabilidad FSD-UC | Cumple | [`../04_fsd/casos_uso.md`](../04_fsd/casos_uso.md) |
| Sincronía Dorado repo | Parcial | Promover a `docs/05_nfr/` tras revisión |

**Brechas equipo (no bloquean documentación v1.0):**

| ID | Brecha | Acción |
|----|--------|--------|
| GAP-NFR-A1 | Gherkin US-021, 017–019 incompleto en `gherkin.md` | Ampliar antes de sprint PDF/notificaciones |
| GAP-NFR-A2 | NFR-005, 015 sin runbook en equipo | Copiar sección ops desde DTI |
| GAP-NFR-A3 | NFR-012 WCAG | Checklist v1.1 |

---

## 7. Trazabilidad externa

| Artefacto | Ruta |
|-----------|------|
| Matriz Dorada | [`../../../../docs/09_trazabilidad/matriz_trazabilidad.md`](../../../../docs/09_trazabilidad/matriz_trazabilidad.md) |
| Informe auditoría | [`../../../../docs/09_trazabilidad/report_findings.md`](../../../../docs/09_trazabilidad/report_findings.md) |
| NFR consolidado | [`../../../../docs/05_nfr/NFR_ISO25010.md`](../../../../docs/05_nfr/NFR_ISO25010.md) |

---

## 8. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 2026-05-17 | Creación carpeta `05_nfr/` equipo: catálogo 19 NFR, TC, matriz, diagrama ISO |
