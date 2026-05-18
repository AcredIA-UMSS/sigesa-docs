---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-10-IA
domain: runtime-ia
---

### PC-SIG-10 — Resumen automático de texto largo con anclas

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-10 |
| **Objetivo** | Resumir documentos extensos (PEI, reglamento carrera) en **viñetas** con referencias `[§ estimado]` o número de página si disponible en metadata OCR. |
| **Contexto** | TD revisión; máximo N páginas vía OCR preprocesado. |
| **Inputs** | `{ "textoConAnclas": "max120000", "objetivoResumen": "max200chars" }` o chunks con `chunkId`. |
| **Outputs** | `{ "bullets": [{"texto","anclaRef"}], "advertencias": [] }`. |
| **Reglas** | Máx. 15 bullets; no afirmar ausencia de tema si solo se vio chunk parcial → `advertencias` incluye `PARCIAL`. |
| **Criterios** | ROUGE-L vs resumen humano ≥ 0,35 en piloto (referencial) + revisión TD. |

**Failure Modes**

- FM: Resumen sesgado al primer chunk → *map-reduce* obligatorio para >8k tokens.
