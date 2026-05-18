# ADR-0008: Taxonomías CEUB/ARCU-SUR como configuración en base de datos

| Campo | Valor |
|-------|-------|
| Estado | **Aceptado** |
| Fecha | 2026-05-16 |
| Autor | Equipo AcredIA (consolidado en repo) |
| Alcance | MOD-PROCESS |
| Fuente equipo | `team/aylenGonzales/09_dti/adr/ADR-005.md` |
| Relacionado | FSD-UC-003 · PRD-US-023 · PRD-REQ-010 · MRD diferenciador |

## Contexto

El diferenciador SIGESA es soporte nativo a normativas **CEUB** y **ARCU-SUR** (fases, dimensiones, criterios, indicadores). Las normas **cambian** (RF-05); ARCU-SUR exige CEUB previo (RB-01). Coordinadores no deben configurar taxonomía manualmente en v1.0.

## Decisión

- Plantillas versionadas en BD: `AccreditationTemplate`, `TemplatePhase`, `EvaluationDimension`, `EvaluationCriterion`, `IndicatorCatalog` (ver `docs/05_dti/modelo_datos.md`).
- Activación por [JD]; al crear proceso se instancian fases e indicadores desde plantilla.
- **No hardcodear** taxonomía en código de aplicación; seeds/migraciones para carga inicial CEUB/ARCU-SUR.
- Soporte de **múltiples versiones** de plantilla (carrera acreditada bajo CEUB 2021 vs 2025).

## Consecuencias

| Positivo | Negativo |
|----------|----------|
| Actualizar norma sin redeploy completo | Carga inicial requiere trabajo DUEA + datos |
| Integridad normativa controlada por [JD] | Edición libre por [CC] prohibida por diseño |

## Alternativas rechazadas

- Constantes en código: cada cambio CEUB = release.
- Configuración editable por [CC]: riesgo de incumplimiento.
