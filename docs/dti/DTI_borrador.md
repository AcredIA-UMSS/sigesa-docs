# Documento Técnico Inicial (DTI) — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | borrador v0.2 |
| **Fecha** | 26/05/2026 |
| **Estado** | En elaboración (módulo 4) |
| **Paquete funcional** | `team/Marlene/` |

---

## 12. POCs Críticas

> Mínimo **2 POCs** que validan riesgos arquitectónicos antes de la construcción completa. Detalle en `docs/pocs/<id>/` según [`POC_TEMPLATE.md`](../pocs/POC-NN/POC_TEMPLATE.md).

### 12.1 POC‑01: Pipeline de evidencias (upload + S3 + idempotencia)

| Campo | Contenido |
|-------|-----------|
| **ID** | [`POC-01-evidencias-upload`](../pocs/POC-01-evidencias-upload/) |
| **Riesgo** | RISK-02 — inconsistencia BD/objeto; versión duplicada en reintentos |
| **Hipótesis** | Multipart + SHA-256 + S3 + UK `(indicador_id, version)` + `Idempotency-Key` evita duplicados y cumple P95 ≤ 3 s (5 MB, entorno POC) |
| **Criterio éxito** | 100% idempotencia; 413 > 50 MB; P95 ≤ 3 s; hash registrado |
| **Alcance** | 1 endpoint `POST /documentos`; sin UI |
| **Cronograma** | 4 días |
| **Resultado** | **Éxito** — ver [`RESULTADO.md`](../pocs/POC-01-evidencias-upload/RESULTADO.md) · evidencia [`poc01-run-summary.json`](../pocs/POC-01-evidencias-upload/evidencia/poc01-run-summary.json) |
| **ADR** | [ADR-0003](../adr/ADR-0003-upload-idempotency-s3.md) |

### 12.2 POC‑02: Workflow dictamen y cierre de subfase

| Campo | Contenido |
|-------|-----------|
| **ID** | [`POC-02-workflow-dictamen`](../pocs/POC-02-workflow-dictamen/) |
| **Riesgo** | Cierre indebido de subfase (RB-03, BR-013–015) |
| **Hipótesis** | Máquina de estados + `puede_cerrar_subfase()` bloquea 100% cierres inválidos en casos sintéticos |
| **Criterio éxito** | ≥ 8/8 escenarios; 409 con `motivos[]`; concurrencia 200+409 |
| **Alcance** | `PATCH /decision`, `POST /avance`, tests pytest |
| **Cronograma** | 4 días |
| **Resultado** | **Éxito** — 13/13 tests PASS — [`RESULTADO.md`](../pocs/POC-02-workflow-dictamen/RESULTADO.md) |
| **ADR** | [ADR-0004](../adr/ADR-0004-workflow-state-machine.md) |

---

## 21. Registro de decisiones arquitectónicas (ADR)

| ADR | Título | Estado | Fecha |
|-----|--------|--------|-------|
| 0001 | Adopción de arquitectura hexagonal | Aceptada | 13/05/2026 |
| 0002 | Log auditoría append-only PostgreSQL | Propuesta | 13/05/2026 |
| 0003 | Upload idempotente + validar antes de S3 | Aceptada (POC-01) | 26/05/2026 |
| 0004 | Máquina de estados workflow | Aceptada (POC-02) | 26/05/2026 |

---

## Checklist de entrega del DTI (extracto módulo 4)

- [ ] Visión del producto + métricas de éxito
- [ ] Diagramas C4 niveles 1–3
- [ ] Data flow UC crítico
- [ ] Modelo de dominio
- [ ] Arquitectura hexagonal
- [ ] Mapeo AWS
- [ ] Capa IA / agentes
- [ ] NFRs con umbrales
- [x] **2 POCs críticas** definidas y ejecutadas (§12)
- [ ] Seguridad, observabilidad, DevOps
- [x] **≥ 3 ADRs** (0001–0004)
- [ ] AGENTS.md sincronizado
- [ ] PROMPT_MAPPING sincronizado

---

*Índice POCs: [`docs/pocs/README.md`](../pocs/README.md). Ejecución local: `docs/pocs/run_local_pocs.ps1`.*
