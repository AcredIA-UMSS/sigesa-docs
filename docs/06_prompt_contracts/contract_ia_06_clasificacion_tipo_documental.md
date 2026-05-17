---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-06-IA
domain: runtime-ia
---

### PC-SIG-06 — Clasificación sugerida de tipo documental

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-06 |
| **Objetivo** | Sugerir `tipoDocumental` de taxonomía UMSS (enum) a partir de `nombreArchivo` + `primerasLineasTexto`. |
| **Contexto** | Etiquetado asistido en carga CC; TD puede corregir. |
| **Inputs** | `{ "nombreArchivo", "mime", "primerasLineasTexto": "max1500" }`. |
| **Outputs** | `{ "tipoSugerido": "ENUM", "confianza": 0.0-1.0, "alternativas": [] }`. |
| **Reglas** | Si `confianza` < 0,6 → UI “confirme tipo manualmente”. |
| **Criterios** | Accuracy top-1 ≥ 0,88 en set de 500 archivos etiquetados. |

**Failure Modes**

- FM: Confianza calibrada mal → *temperature* 0; *platt scaling* opcional.

**Caso borde**

- Archivo zip con nombre .pdf → baja confianza + `riesgoExtension`.
