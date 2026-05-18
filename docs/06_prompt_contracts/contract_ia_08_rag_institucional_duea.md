---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-08-IA
domain: runtime-ia
---

### PC-SIG-08 — Consulta institucional inteligente (RAG corporativo DUEA)

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-08 |
| **Objetivo** | Responder preguntas sobre **documentos indexados** (reglamentos CEUB/ARCU-SUR publicados, guías DUEA internas **clasificadas como RAG_ALLOWED**). |
| **Contexto** | Chat restringido a rol JD/TD; **sin** mezclar evidencias de carrera no autorizada. |
| **Inputs** | `{ "pregunta": "max500chars", "coleccion": "CEUB|ARCU|DUEA_GUIA", "topK": 5 }`. |
| **Outputs** | `{ "respuesta": "...", "citas": [{"docId","fragmentoId","textoCorto"}] }`. |
| **Reglas** | Si evidencia insuficiente en retrieval → “No consta en los documentos indexados”. |
| **Criterios** | **Faithfulness**: ≥90% respuestas evaluadas con cita verificable en golden Q&A. |

**Invariants**

- I1: `citas` no vacías si afirmación normativa; si vacías → solo “no consta”.

**Failure Modes**

- FM: *Hallucination* legal → grounding estricto; score mínimo similitud 0,75.

**Seguridad**

- Embeddings solo sobre corpus aprobado; no *web browse* libre.

**Ejemplo inválido**

- Pregunta sobre notas de estudiante → fuera de alcance → respuesta estándar rechazo.
