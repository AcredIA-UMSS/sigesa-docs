# NFR — Componentes inteligentes (IA / NLP)

## SIGESA / AcredIA — Contratos de prompts y orquestación LLM

**Norma de referencia:** ISO/IEC 25010 (calidad de producto) + gobernanza IA UMSS  
**Documento hermano:** [NFR.md](NFR.md) (NFRs de plataforma) · [Prompt_Contracts_SIGESA_IA_v1.md](../07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md)

---

## 0. Control documental

| Campo | Valor |
|-------|-------|
| **Versión** | v1.0 |
| **Fecha** | 16/05/2026 |
| **Estado** | Borrador — HITL obligatorio en salidas con efecto normativo |
| **Principio** | La IA **asiste**; no sustituye dictamen CEUB/ARCU-SUR ni firma institucional |

---

## 1. Catálogo NFR-IA (resumen)

| ID | Nombre | Métrica | Umbral éxito | Umbral fracaso | Verificación |
|----|--------|---------|--------------|----------------|--------------|
| NFR-IA-01 | Precisión factual (JSON) | F1 / exact match | F1 ≥ **0,92** por PC | F1 < **0,85** | Golden set mensual |
| NFR-IA-02 | Consistencia semántica | Jaccard claves JSON | ≥ **0,85** (5 corridas @0,2) | < **0,70** | Repetición controlada |
| NFR-IA-03 | Latencia orquestador P95 | ms E2E | ≤ **12 s** (≤4k tok); ≤ **45 s** (chunk 30k) | > **20 s** / > **60 s** | OpenTelemetry |
| NFR-IA-04 | Disponibilidad subsistema IA | Uptime mensual | ≥ **99%** | < **98%** | Health + sintético |
| NFR-IA-05 | Auditabilidad invocaciones | % log completo | **100%** | < **100%** | Auditoría `ia_invocation` |
| NFR-IA-06 | Aislamiento contexto (RBAC) | Incidentes cross-tenant | **0** | ≥ **1** | OWASP LLM trimestral |
| NFR-IA-07 | Robustez entrada inválida | Respuesta schema/error | **100%** sin uncaught | Cualquier 500 por input | Fuzz / property tests |
| NFR-IA-08 | Rechazo post-validador | % rechazadas | ≤ **8%** PROD | > **15%** sostenido | Grafana |
| NFR-IA-09 | Costo / tokens | Presupuesto mensual | Dentro cuota TI | > **100%** cuota | Billing + tags `carreraId` |
| NFR-IA-10 | Mantenibilidad `pcVersion` | Lead time release PC | ≤ **2 días hábiles** | > **5 días** | Proceso Git + CI |

---

## 2. Desarrollo por NFR-IA

### NFR-IA-01 — Precisión factual en salidas estructuradas

| Campo | Contenido |
|-------|-----------|
| **Categoría ISO 25010** | 6.1 Adecuación funcional — exactitud |
| **Descripción** | Salidas JSON de PC-SIG-01…12 deben coincidir con hechos del contexto autorizado (indicadores, estados, metadatos). |
| **Justificación** | Alucinación en informes o validaciones destruye confianza DUEA y riesgo normativo. |
| **Dataset** | Golden files UMSS por PC; revisión humana muestra ≥50 casos/PC en piloto. |
| **Herramientas** | Scripts eval Python; diff estructurado; revisión TD. |
| **PC vinculados** | PC-SIG-01, 02, 03, 06, 11 |
| **Contrato verificación** | [PC-NFR-IA-01.prompt.md](PC-NFR-IA-01.prompt.md) |

### NFR-IA-02 — Consistencia semántica

| Campo | Contenido |
|-------|-----------|
| **Descripción** | Misma entrada ± redacción menor → mismas claves/decisiones en JSON. |
| **Dependencias** | `temperature` ≤ 0,3 en producción; semillas fijas en eval. |
| **PC vinculados** | PC-SIG-03, 07 |
| **Contrato verificación** | [PC-NFR-IA-02.prompt.md](PC-NFR-IA-02.prompt.md) |

### NFR-IA-03 — Latencia LLM (P95)

| Campo | Contenido |
|-------|-----------|
| **Descripción** | Orquestador → política → (PII) → LLM → validador → persistencia. |
| **Alineación sistema** | Complementa [NFR-ED-01](NFR.md#nfr-ed-01--tiempo-de-respuesta-de-api-en-operación-nominal) (API sin LLM). |
| **PC vinculados** | PC-SIG-10 (resúmenes largos) |
| **Contrato verificación** | [PC-NFR-IA-03.prompt.md](PC-NFR-IA-03.prompt.md) |

### NFR-IA-04 — Disponibilidad subsistema IA

| Campo | Contenido |
|-------|-----------|
| **Descripción** | Degradación graceful: si LLM cae, flujos core SIGESA siguen; UI muestra mensaje RB-10. |
| **Alineación** | [NFR-FIA-01](NFR.md#nfr-fia-01--disponibilidad-del-servicio-slo) (plataforma). |
| **Contrato verificación** | [PC-NFR-IA-04.prompt.md](PC-NFR-IA-04.prompt.md) |

### NFR-IA-05 — Auditabilidad (append-only IA)

| Campo | Contenido |
|-------|-----------|
| **Descripción** | Cada invocación: `prompt_hash`, `model_id`, `pcId`, `pcVersion`, `user_id`, `trace_id`, entrada/salida redactada. |
| **Alineación** | AGENTS.md M-AI-013; [NFR-SEG-01](NFR.md#nfr-seg-01--seguridad-de-la-información-y-control-de-acceso-defensa-en-profundidad). |
| **Contrato verificación** | [PC-NFR-IA-05.prompt.md](PC-NFR-IA-05.prompt.md) |

### NFR-IA-06 — Seguridad: no fuga de contexto cruzado

| Campo | Contenido |
|-------|-----------|
| **Descripción** | Usuario [CC] carrera A no puede inyectar/recibir contexto carrera B en RAG o prompts. |
| **PC vinculados** | PC-SIG-04, 05, 12 (PII) |
| **Contrato verificación** | [PC-NFR-IA-06.prompt.md](PC-NFR-IA-06.prompt.md) |

### NFR-IA-07 — Robustez ante entradas inválidas

| Campo | Contenido |
|-------|-----------|
| **Descripción** | Entrada fuera de schema → `INVALID_INPUT` JSON; sin stack trace al cliente. |
| **Contrato verificación** | [PC-NFR-IA-07.prompt.md](PC-NFR-IA-07.prompt.md) |

### NFR-IA-08 — Tasa de rechazo del validador de schema

| Campo | Contenido |
|-------|-----------|
| **Descripción** | Respuestas LLM que no pasan JSON Schema se rechazan y reintentan o escalan a humano. |
| **Contrato verificación** | [PC-NFR-IA-08.prompt.md](PC-NFR-IA-08.prompt.md) |

### NFR-IA-09 — Escalabilidad y costo

| Campo | Contenido |
|-------|-----------|
| **Descripción** | Cuotas por facultad/carrera; alertas al 80 % presupuesto mensual tokens. |
| **Contrato verificación** | [PC-NFR-IA-09.prompt.md](PC-NFR-IA-09.prompt.md) |

### NFR-IA-10 — Mantenibilidad de prompts

| Campo | Contenido |
|-------|-----------|
| **Descripción** | Cambio de plantilla PC requiere semver, tests golden verdes y aprobación DUEA+TI. |
| **Alineación** | [NFR-MAN-01](NFR.md#nfr-man-01--mantenibilidad-y-despliegue-continuo) |
| **Contrato verificación** | [PC-NFR-IA-10.prompt.md](PC-NFR-IA-10.prompt.md) |

---

## 3. Matriz NFR-IA ↔ PC-SIG

| PC-ID | NFR-IA principal |
|-------|-----------------|
| PC-SIG-01 | NFR-IA-01, 05 |
| PC-SIG-02 | NFR-IA-07, 01 |
| PC-SIG-03 | NFR-IA-01, 02 |
| PC-SIG-04 | NFR-IA-06, 05 |
| PC-SIG-05 | NFR-IA-06 |
| PC-SIG-06 | NFR-IA-01 |
| PC-SIG-07 | NFR-IA-02, 05 |
| PC-SIG-08 | NFR-IA-01, 04 |
| PC-SIG-09 | NFR-IA-10 |
| PC-SIG-10 | NFR-IA-03 |
| PC-SIG-11 | NFR-IA-01 |
| PC-SIG-12 | NFR-IA-06, 07 |

---

## 4. Criterios de aceptación go-live (IA)

1. NFR-IA-05: tabla `ia_invocation` con 100 % muestras en piloto.  
2. NFR-IA-06: suite cross-tenant en STAGE sin hallazgos críticos.  
3. NFR-IA-01: F1 ≥ 0,92 en golden set mínimo por PC P0 (01, 02, 03, 12).  
4. NFR-IA-03: P95 medido en STAGE dentro de umbrales.  
5. Feature flag `ia_enabled` con kill-switch documentado.

---

*Fuente consolidada: `07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md` §4–§9 · `06_prompt_contracts/NFR.md`.*
