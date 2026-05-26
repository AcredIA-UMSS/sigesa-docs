---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-03-IA
domain: runtime-ia
---

### PC-SIG-03 — Evaluación asistida de alineación con criterio (no binario oficial)

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-03 |
| **Objetivo** | Clasificar **sugerencia** `ALINEADO | PARCIAL | NO_ALINEADO` con justificación breve respecto a **texto del criterio** e **extracto** evidencia. |
| **Contexto** | Asistencia a TD antes de dictamen; **no** escribe “APROBADO” en sistema. |
| **Inputs** | `{ "criterioTexto": "...", "extractoEvidencia": "max8000" }`. |
| **Outputs** | `{ "status", "clasificacion", "justificacionMax500chars", "preguntasParaHumano": [] }`. |
| **Reglas** | Justificación **≤500** caracteres; mínimo 1 pregunta si `PARCIAL` o `NO_ALINEADO`. |
| **Criterios** | Inter-annotator agreement κ ≥ 0,75 vs muestra TD en piloto. |

**Invariants**

- I1: `clasificacion` ∈ enum cerrado.

**Failure Modes**

- FM: Sesgo optimista → calibración con ejemplos negativos en *system*.

**Mitigación**

- *Temperature* ≤ 0,3; contrastar con regla determinística si `extracto` vacío → `NO_EVALUABLE`.

**Auditoría**

- Guardar solo extracto hash si política restringe texto completo.

**Ejemplos**

- Válido: criterio “vinculación social”; extracto menciona convenios municipales → PARCIAL con pregunta sobre medición de impacto.

- Inválido: salida “recomiendo aprobar” → **violación**; reemplazar por plantilla que prohíbe verbo “aprobar”.
