# Documento de Especificación Funcional (FSD) — SIGESA

| Campo | Valor |
|-------|-------|
| **Ámbito** | `team/alexAlvarez/docs/04_fsd/` |
| **Versión** | **v1.2** (FSD clásico + LFSD + Figma integration) |
| **Fecha** | 27/05/2026 |
| **Autor** | Alexander James Alvarez |
| **Estado** | Borrador — listo para revisión docente |
| **BRD** | [`../01_brd/BRD.md`](../01_brd/BRD.md) |
| **PRD** | [`../03_prd/PRD.md`](../03_prd/PRD.md) |
| **LFSD** | [`../05_lfsd/LFSD_v1.md`](../05_lfsd/LFSD_v1.md) |
| **Overview** | [`../00_overview/README.md`](../00_overview/README.md) |

> **Modo dual:** **FSD clásico** (este índice + artefactos en `04_fsd/`) para especificación completa; **LFSD** en [`../05_lfsd/`](../05_lfsd/README.md) para los 7 UC críticos con failure modes, tasks y prompt-contratos. Patrón FSD: *El sistema debe…*

---

## 1. Resumen ejecutivo

**SIGESA** orquesta el ciclo de acreditación UMSS (**CEUB**, **ARCU-SUR**) sobre la jerarquía **Proceso → Fase → Dimensión → Criterio → Indicador → Evidencia**, con **Observaciones** formales del **Técnico DUEA [TD]** y subsanación **append-only** del **Coordinador de Carrera [CC]**. La **Jefatura DUEA [JD]** gobierna procesos y publicación; el **Público [P]** consulta solo datos publicados.

**Invariantes (no negociables):**
1. Sin borrado físico de evidencia normativa (BRD-CST-01 / FSD-BR-02).
2. Sin avance de **Fase** si ∃ indicador ≠ `APROBADO` (FSD-BR-07).
3. Trazabilidad BDD: todo `Must` tiene Gherkin en [`gherkin.md`](gherkin.md).

**KPIs (BRD):** localización de evidencia ≤ 2 min; 0 pérdida documental; reporte ejecutivo ≤ 5 min (P95).

---

## 2. Mapa de artefactos FSD

| Artefacto | Contenido | Estado |
|-----------|-----------|--------|
| [**casos_uso.md**](casos_uso.md) | 17 casos `FSD-UC-001…017` con flujos y excepciones | ✅ v1.0 |
| [**gherkin.md**](gherkin.md) | Escenarios BDD + caminos tristes | ✅ v1.0 |
| [**reglas_negocio.md**](reglas_negocio.md) | Catálogo FSD-BR-01…18 | ✅ v1.0 |
| [**modelo_datos.md**](modelo_datos.md) | Diccionario lógico append-only | ✅ v1.0 |
| [**api_contracts.md**](api_contracts.md) | REST `/api/v1` lógico | ✅ v1.0 |
| [**glosario.md**](glosario.md) | Lenguaje ubicuo FSD | ✅ v1.0 |
| [**../07_diagramas/**](../07_diagramas/) | UC01–UC03 secuencia/estado, ER, Gantt | ✅ v1.0 |
| [**../05_nfr/**](../05_nfr/NFR_ISO25010.md) | ISO 25010, TC, cobertura Gherkin | ✅ v1.0 |
| [**../05_lfsd/LFSD_v1.md**](../05_lfsd/LFSD_v1.md) | 7 UC críticos, failure modes, tasks T-001…012 | ✅ v1.0 |

---

## 2.1 Reconciliación FSD ↔ LFSD

| LFSD (implementación) | FSD-UC (canónico) | Detalle FSD clásico |
|----------------------|-------------------|---------------------|
| UC-L01 | FSD-UC-001 | [`casos_uso.md`](casos_uso.md#fsd-uc-001--autenticación-y-sesión) |
| UC-L02 | FSD-UC-003 | [`casos_uso.md`](casos_uso.md#fsd-uc-003--plantillas-y-proceso-ceubarcu-sur) |
| UC-L03 | FSD-UC-004 | [`casos_uso.md`](casos_uso.md#fsd-uc-004--cargar-evidencia) |
| UC-L04 | FSD-UC-006 | [`casos_uso.md`](casos_uso.md#fsd-uc-006--subsanar-evidencia) |
| UC-L05 | FSD-UC-008 | [`reglas_negocio.md`](reglas_negocio.md) + gherkin US-009 |
| UC-L06 | FSD-UC-009, UC-010 | estados en [`../07_diagramas/`](../07_diagramas/) |
| UC-L07 | FSD-UC-013 | panel [JD] — ampliar gherkin en sprint panel |

Los `FSD-UC-002`, `005`, `007`, `011`…`018` se especifican solo en FSD clásico hasta priorización en [`../05_lfsd/LFSD_v1.md`](../05_lfsd/LFSD_v1.md) §9.

---

## 3. Diagramas (referencia externa)

Los diagramas Mermaid **no** se duplican inline; viven en `07_diagramas/`:

| Archivo | Caso de uso |
|---------|-------------|
| [`seq-001-01-secuencia.mmd`](../07_diagramas/seq-001-01-secuencia.mmd) | FSD-UC-006 Subsanar |
| [`state-001-01-estado.mmd`](../07_diagramas/state-001-01-estado.mmd) | Estados subsanación |
| [`seq-002-02-secuencia.mmd`](../07_diagramas/seq-002-02-secuencia.mmd) | FSD-UC-004/008 Carga y observar |
| [`state-002-02-estado.mmd`](../07_diagramas/state-002-02-estado.mmd) | Estados Fase 1 |
| [`seq-003-03-secuencia.mmd`](../07_diagramas/seq-003-03-secuencia.mmd) | FSD-UC-003/010 Proceso y cierre fase |
| [`state-003-03-estado.mmd`](../07_diagramas/state-003-03-estado.mmd) | Agregación de fase |
| [`er-006-diagrama.mmd`](../07_diagramas/er-006-diagrama.mmd) | Modelo entidad-relación |
| [`gantt-005-diagrama.mmd`](../07_diagramas/gantt-005-diagrama.mmd) | Roadmap PRD |

---

## 4. Actores (resumen)

| Actor | Responsabilidad | Permisos clave |
|-------|-----------------|----------------|
| [CC] | Carga y subsanación de **Evidencia** | Escritura en su carrera |
| [TD] | Observa y aprueba **Indicadores** | Global auditoría |
| [JD] | Procesos, plantillas, publicación | Administración |
| [P] | Consulta pública | Solo lectura publicada |

Detalle: [`casos_uso.md` § índice](casos_uso.md) · [`glosario.md`](glosario.md)

---

## 5. Alcance funcional (resumen)

**Dentro:** auth UMSS, RBAC, taxonomía CEUB/ARCU-SUR, evidencia versionada, observaciones, dashboards, notificaciones, portal [P], auditoría.

**Fuera:** ERP/SIIS tiempo real, pagos, rankings internacionales.

Detalle: [`../00_overview/alcance_proyecto.md`](../00_overview/alcance_proyecto.md)

---

## 6. Trazabilidad PRD → FSD

| PRD-REQ | FSD-UC | PRD-US |
|---------|--------|--------|
| PRD-REQ-001 | UC-007 | 001 |
| PRD-REQ-002 | UC-004, UC-005 | 002, 010 |
| PRD-REQ-003 | UC-008 | 009 |
| PRD-REQ-004 | UC-011 | 006 |
| PRD-REQ-005 | UC-012 | 007, 012 |
| PRD-REQ-006 | UC-016 | 016, 017 |
| PRD-REQ-007 | UC-015 | 005, 019 |

Matriz completa: pendiente en `09_trazabilidad/` (siguiente fase documental).

---

## 7. NFR y plan de pruebas (referencia)

| Artefacto | Ruta |
|-----------|------|
| PRD (5 NFR alto nivel) | [`../03_prd/PRD.md`](../03_prd/PRD.md) §8 (`PRD-NFR-001`…`005`) |
| **ISO 25010 (equipo)** | [`../05_nfr/NFR_ISO25010.md`](../05_nfr/NFR_ISO25010.md) — catálogo `NFR-001`…`019` |
| Catálogo TC | [`../05_nfr/catalogo_tc.md`](../05_nfr/catalogo_tc.md) |
| Matriz cobertura | [`../05_nfr/matriz_cobertura.md`](../05_nfr/matriz_cobertura.md) |
| Dorado consolidado | [`../../../../docs/05_nfr/NFR_ISO25010.md`](../../../../docs/05_nfr/NFR_ISO25010.md) |

**Estrategia QA:** Jest/Supertest (API), Playwright (E2E), tags `@PRD-US-xxx` `@FSD-UC-xxx` `@NFR-xxx` según [`gherkin.md`](gherkin.md) y [`../05_nfr/plantilla_tags_pruebas.md`](../05_nfr/plantilla_tags_pruebas.md).

---

## 8. Plan técnico y tasks (LFSD)

Desglose implementable: [`../05_lfsd/LFSD_v1.md`](../05_lfsd/LFSD_v1.md) §9 (`T-001`…`T-012`).

| Tema | Decisión | Referencia |
|------|----------|------------|
| Stack | React + Node 20 + Express + PostgreSQL 16 | [`../../../../docs/05_dti/DTI.md`](../../../../docs/05_dti/DTI.md) |
| Auth | Local v1.0; LDAP v1.1 | ADR_003 en DTI |
| Blobs | Volumen Docker v1.0 | ADR_004 en DTI |
| SSO UMSS | v1.1 | LFSD + DTI |

---

## 9. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v0.1 | 11/05/2026 | FSD monolítico único (histórico Git) |
| v1.0 | 17/05/2026 | Descomposición en 6 artefactos + `07_diagramas/`; índice maestro |
| v1.1 | 17/05/2026 | Integración LFSD (`05_lfsd/`): 7 UC críticos, failure modes, tasks, reconciliación FSD↔LFSD |

---

## Checklist entrega FSD (rúbrica)

- [x] Índice maestro con trazabilidad BRD/PRD
- [x] ≥ 3 UC críticos detallados en `casos_uso.md`
- [x] Reglas de negocio catalogadas
- [x] Modelo de datos sin columnas residuales
- [x] Contratos API lógicos
- [x] Gherkin con caminos tristes
- [x] Glosario y diagramas en `07_diagramas/`
- [x] NFR ISO 25010 en `05_nfr/`
- [x] LFSD v1.0 con UC críticos y tasks en `05_lfsd/`
