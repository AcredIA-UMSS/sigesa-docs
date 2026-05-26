---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-07-IA
domain: runtime-ia
---

### PC-SIG-07 — Borrador de observación / recomendación para técnico DUEA (HITL)

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-07 |
| **Objetivo** | Proponer **borrador** de observación alineada a descriptor de indicador y *checklist* de omisiones detectadas por PC-SIG-02. |
| **Contexto** | Panel TD; salida **no envía** notificación a CC hasta TD edite y confirme. |
| **Inputs** | `{ "descriptorIndicador", "resultadoChecklistPc02": {...} }`. |
| **Outputs** | `{ "borradorObservacion": "max1500chars", "citasChecklist": ["idItem",...] }`. |
| **Reglas** | Cada párrafo debe referenciar ≥1 `citasChecklist`; tono respetuoso (RB-10). |
| **Criterios** | 100% citas existen en checklist; longitud ≤1500. |

**Invariants**

- I1: No incluir datos personales estudiantes.

**Mitigación**

- TD borra párrafos antes de enviar; plantilla “observación oficial” separada.
