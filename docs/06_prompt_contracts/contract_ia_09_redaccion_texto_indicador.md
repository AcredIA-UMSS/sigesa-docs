---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-09-IA
domain: runtime-ia
---

### PC-SIG-09 — Asistencia para redacción de texto de indicador en plantilla

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-09 |
| **Objetivo** | Sugerir descripción corta de **qué evidencia subir** para un indicador según `plantilla` y `nombreIndicador`. |
| **Contexto** | Configuración JD de plantillas CEUB/ARCU-SUR. |
| **Inputs** | `{ "marco": "CEUB|ARCU_SUR", "nombreIndicador", "ejemplosOficiales": [] }`. |
| **Outputs** | `{ "textoAyudaCc": "max800chars", "formatoSugerido": "PDF|XLSX|..." }`. |
| **Reglas** | No contradecir `ejemplosOficiales`; si contradicción detectada → `CONFLICTO_PLANTILLA`. |
| **Criterios** | Aprobación contenido por JD en flujo editorial (ticket). |

**Caso borde**

- Indicador nuevo sin ejemplos → `textoAyudaCc` genérico + `CONFLICTO_PLANTILLA` false y flag `REVIEW_BY_JD`.
