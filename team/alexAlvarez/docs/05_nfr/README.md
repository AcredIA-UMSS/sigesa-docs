# Requisitos no funcionales — `team/alexAlvarez/docs/05_nfr/`

| Campo | Valor |
|-------|-------|
| **Responsable** | Alexander James Alvarez |
| **Versión** | v1.0 (equipo) |
| **Norma** | ISO/IEC 25010:2011 |
| **Fecha** | 2026-05-17 |
| **Canónico repo** | [`docs/05_nfr/NFR_ISO25010.md`](../../../../docs/05_nfr/NFR_ISO25010.md) Dorada v1.1 |

## Índice de artefactos

| Archivo | Contenido |
|---------|-----------|
| [`NFR_ISO25010.md`](NFR_ISO25010.md) | Catálogo maestro NFR-001…019, detalle, dominio append-only |
| [`catalogo_tc.md`](catalogo_tc.md) | Casos de prueba TC-NFR-* y TC-SAD-* |
| [`matriz_cobertura.md`](matriz_cobertura.md) | NFR → Gherkin → FSD-UC → implementación |
| [`plantilla_tags_pruebas.md`](plantilla_tags_pruebas.md) | Convención `@Tag` para Jest/Playwright/Cucumber |
| [`07_diagramas/`](07_diagramas/README.md) | Diagrama cobertura ISO 25010 (`.mmd`) |

## Trazabilidad ascendente

| Artefacto | Ruta |
|-----------|------|
| BRD | [`../01_brd/BRD.md`](../01_brd/BRD.md) |
| MRD | [`../02_mrd/MRD.md`](../02_mrd/MRD.md) |
| PRD (PRD-NFR-001…005) | [`../03_prd/PRD.md`](../03_prd/PRD.md) §8 |
| FSD | [`../04_fsd/FSD.md`](../04_fsd/FSD.md) · [`gherkin.md`](../04_fsd/gherkin.md) |
| Diagramas UC | [`../07_diagramas/`](../07_diagramas/) |
| DTI / DDL | [`../../../../docs/05_dti/`](../../../../docs/05_dti/) |

## Relación PRD equipo vs. catálogo ISO

El PRD de equipo lista **5** NFR de alto nivel (`PRD-NFR-001`…`005`). Este directorio los descompone en **19** NFR verificables (`NFR-001`…`019`) alineados al documento Dorado del repositorio, sin contradecir umbrales de negocio (búsqueda ≤ 2 min E2E, API p95, append-only).
