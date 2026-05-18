---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-11-IA
domain: runtime-ia
---

### PC-SIG-11 — Autoevaluación: brecha (*gap*) entre texto y lista de verificación

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-11 |
| **Objetivo** | Comparar texto de autoevaluación carrera contra **lista de verificación** (ítems CEUB/ARCU-SUR) y devolver **matriz cobertura** sugerida. |
| **Contexto** | Comité calidad carrera; entrada solo texto autorizado. |
| **Inputs** | `{ "textoAutoevaluacion": "max50000", "listaVerificacion": [{"id","textoItem"}] }`. |
| **Outputs** | `{ "cobertura": [{"itemId","estado":"CUBIERTO|PARCIAL|NO_EVIDENTE","citaFragmento":"max200"}] }`. |
| **Reglas** | `citaFragmento` debe ser substring del texto o `NO_CITA` si PARCIAL/NO. |
| **Criterios** | Validador substring exacto (normalizado); 95% ítems con estado coherente en golden. |

**Caso borde**

- Sinónimos (“RA” vs “resultado del aprendizaje”) → diccionario sinónimos curado UMSS v1.
