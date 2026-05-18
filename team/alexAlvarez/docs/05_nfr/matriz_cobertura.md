# Matriz de cobertura NFR — Gherkin — FSD-UC

| Campo | Valor |
|-------|-------|
| **Versión** | v1.0 |
| **Ámbito** | `team/alexAlvarez/docs/` |
| **Gherkin fuente** | [`../04_fsd/gherkin.md`](../04_fsd/gherkin.md) |

## Puente PRD-NFR (equipo) → NFR ISO (catálogo)

| PRD-NFR (PRD §8) | NFR ISO extendidos |
|------------------|-------------------|
| PRD-NFR-001 Rendimiento búsqueda p95 | NFR-001, NFR-002 |
| PRD-NFR-002 Escalabilidad 200 usuarios | NFR-001 (carga), NFR-005 |
| PRD-NFR-003 Cifrado tránsito/reposo | NFR-006, NFR-007, NFR-019 |
| PRD-NFR-004 Disponibilidad 99.5 % | NFR-005, NFR-015 |
| PRD-NFR-005 Usabilidad ≤ 3 pasos | NFR-010, NFR-011 |

## Matriz NFR → verificación (equipo Alex)

| NFR | Gherkin en `gherkin.md` | PRD-US | FSD-UC | Sad path | Estado doc |
|-----|-------------------------|--------|--------|----------|------------|
| NFR-001 | Indirecto | 001, 007 | UC-007 | — | Planificado k6 |
| NFR-002 | Parcial | 001, 007 | UC-007 | — | UAT piloto |
| NFR-003 | Pendiente ampliar | 021 | UC-014 | — | En PRD Dorado |
| NFR-004 | Pendiente ampliar | 005, 018, 019 | UC-015 | — | En PRD Dorado |
| NFR-005 | No (ops) | — | — | N/A | Runbook DTI |
| NFR-006 | `@TC-SAD-AUTH` | 001 | UC-001 | Sesión | Cubierto |
| NFR-007 | — | — | UC-004, UC-005 | — | ADR storage |
| NFR-008 | `@TC-SAD-AUTH` | 001 | UC-001 | 401 | Cubierto |
| NFR-009 | — | 012 | UC-011 | Aislamiento | Test plan |
| NFR-010 | `@TC-SAD-MIME` | 002 | UC-004 | MIME | Cubierto |
| NFR-011 | — | 025 | UC-004 | — | UI upload |
| NFR-012 | No | — | — | — | v1.1 WCAG |
| NFR-013 | No | — | — | — | Matriz browsers |
| NFR-014 | Meta (todos tags) | *Must* | * | — | CI |
| NFR-015 | No (ops) | — | — | — | DTI backup |
| NFR-016 | Gate BRD | — | — | — | Checklist |
| NFR-017 | `@TC-SAD-DELETE` | 003 | UC-006 | DELETE | Cubierto |
| NFR-018 | `@TC-SAD-PHASE` `@TC-SAD-JUST` `@TC-SAD-APPROVE` | 009, 014, 023 | UC-008, UC-009, UC-010 | Estados | Cubierto |
| NFR-019 | No | — | — | — | Revisión legal |

## Cobertura Gherkin documentada (equipo)

| Métrica | Valor |
|---------|-------|
| Bloques Gherkin en `gherkin.md` | 8 UC críticos + sad paths |
| UC con diagrama en `07_diagramas/` | UC-003, 004, 005, 006, 008, 009, 010 |
| Alineación Dorado `docs/03_prd/PRD.md` | 24 US (referencia consolidación) |

**Brecha conocida:** ampliar `gherkin.md` para US-021 (PDF), US-017–019 (notificaciones) antes de cerrar NFR-003 y NFR-004 en implementación.
