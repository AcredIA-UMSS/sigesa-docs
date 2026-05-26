# NFR — Componentes inteligentes (IA / NLP) — aylenGonzales

## SIGESA / AcredIA — Orquestación LLM y prompt-contracts

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 16/05/2026 |
| **Hermano** | [NFR-ISO25010.md](NFR-ISO25010.md) |
| **Contratos** | `04_fsd/FSD_v2.md` §7 · `04_fsd/prompt-contracts.md` · `06_prompt_contracts/` |
| **Principio** | IA asiste; dictamen CEUB/ARCU-SUR permanece humano (RB-11) |

---

## Catálogo NFR-IA (resumen)

| ID | Nombre | Métrica | Umbral éxito | Umbral fracaso | Verificación |
|----|--------|---------|--------------|----------------|--------------|
| NFR-IA-01 | Precisión factual JSON | F1 / exact match | F1 ≥ **0,92** | F1 < **0,85** | Golden set mensual |
| NFR-IA-02 | Consistencia semántica | Jaccard claves | ≥ **0,85** (5 corridas) | < **0,70** | Repetición @temp 0,2 |
| NFR-IA-03 | Latencia orquestador P95 | ms E2E | ≤ **12 s** (≤4k tok) | > **20 s** | OpenTelemetry |
| NFR-IA-04 | Disponibilidad subsistema IA | Uptime mensual | ≥ **99%** | < **98%** | Health check |
| NFR-IA-05 | Auditabilidad invocaciones | % log completo | **100%** | < **100%** | Tabla `ia_invocation` |
| NFR-IA-06 | Aislamiento contexto RBAC | Cross-tenant | **0** incidentes | ≥ **1** | Tests adversariales |
| NFR-IA-07 | Robustez entrada inválida | Sin 500 por input | **100%** | Cualquier 500 | Fuzz schema |
| NFR-IA-08 | Rechazo post-validador | % rechazadas PROD | ≤ **8%** | > **15%** | Grafana |
| NFR-IA-09 | Costo tokens | Cuota mensual TI | Dentro cuota | > **100%** | Billing tags |
| NFR-IA-10 | Mantenibilidad pcVersion | Lead time release PC | ≤ **2 días hábiles** | > **5 días** | Git + CI |

---

## Trazabilidad PC ↔ NFR-IA

| NFR-IA | PC vinculados (SIGESA v1) |
|--------|---------------------------|
| NFR-IA-01 | PC-002, PC-003, PC-004 |
| NFR-IA-02 | PC-003, PC-007 |
| NFR-IA-03 | PC-005 (resúmenes largos) |
| NFR-IA-05 | PC-001 … PC-010 (transversal) |
| NFR-IA-06 | PC-001, PC-008 |

---

## Alineación NFR plataforma

| NFR sistema | NFR-IA relacionado |
|-------------|-------------------|
| NFR-004 (confidencialidad) | NFR-IA-06 |
| NFR-005 (no repudio) | NFR-IA-05 |
| NFR-013 (analizabilidad) | NFR-IA-05, NFR-IA-07 |

Ver métricas consolidadas en `08_trazabilidad/metricas_ai_sdlc.md`.
