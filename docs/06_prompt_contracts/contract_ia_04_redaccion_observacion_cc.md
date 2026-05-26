---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-04-IA
domain: runtime-ia
---

### PC-SIG-04 — Asistente de redacción para coordinador (respuesta a observación DUEA)

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-04 |
| **Objetivo** | Proponer **borrador** de texto de respuesta del CC a observación TD, tono profesional, sin comprometer hechos no suministrados. |
| **Contexto** | Módulo **M6 Observaciones**; input: texto observación + bullets hechos aportados por CC. |
| **Inputs** | `{ "observacionTd": "string", "hechosAportadosPorCc": ["..."], "limitePalabras": 400 }`. |
| **Outputs** | `{ "borradorRespuesta": "string", "listaVerificacionHechosUsados": ["..."] }`. |
| **Reglas** | Cada afirmación fáctica del borrador debe mapear a un hecho en lista; si no, mover a `sugerenciasPendientes`. |
| **Criterios** | 100% afirmaciones factuales trazables a `hechosAportadosPorCc` en validador NLP ligero (regex + NER opcional). |

**Invariants**

- I1: No incluir datos de otras carreras (input no los contiene; *system* lo refuerza).

**Failure Modes**

- FM: Tonada agresiva → filtro de toxicidad; segundo pase “reescribe neutro”.

**Seguridad**

- No pegar automáticamente en campo oficial sin clic “Insertar borrador”.

**Caso borde**

- Observación en jerga; pedir aclaración a TD fuera de IA.
