---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-12-IA
domain: runtime-ia
---

### PC-SIG-12 — Preprocesador: detección y enmascaramiento de PII antes de LLM

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-12 |
| **Objetivo** | Redactar o bloquear envío a LLM si detecta **CI boliviana**, correos no institucionales, teléfonos, nombres propios fuera de lista blanca (opcional). |
| **Contexto** | Pipeline **obligatorio** antes de todos los PC que incluyan texto libre. |
| **Inputs** | `{ "textoUsuario": "string", "politica": "ENMASCARAR|BLOQUEAR" }`. |
| **Outputs** | `{ "textoSanitizado", "hallazgos": [{"tipo","posicion"}] }` o error `PII_BLOCKED`. |
| **Reglas** | Lista blanca: nombres de coordinador actual si `role=CC` y coincide con HR record. |
| **Criterios** | Recall ≥ 0,95 en dataset sintético PII; FPR ≤ 0,05. |

**Invariants**

- I1: Ningún LLM recibe texto usuario sin pasar PC-SIG-12 si `featureFlag_ia_pii=true`.

**Failure Modes**

- FM: Sobre-bloqueo → modo ENMASCARAR preferido en v1.
