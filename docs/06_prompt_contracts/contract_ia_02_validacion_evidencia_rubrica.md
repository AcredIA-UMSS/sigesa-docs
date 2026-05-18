---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-02-IA
domain: runtime-ia
---

### PC-SIG-02 — Validación asistida de evidencia contra rúbrica textual

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-02 |
| **Objetivo** | Producir **checklist asistida**: coherencia del título/archivo con **descriptor de indicador** y señales de **completitud superficial** (no sustituye lectura humana del PDF completo si el sistema no extrae texto). |
| **Contexto** | Módulo **M4 Documentos** + **M3 Normativa**; actor TD o CC (sugerencia previa a envío). |
| **Inputs** | `{ "indicador": { "codigo", "nombre", "descriptor" }, "metadatosArchivo": { "nombre", "mime", "tamanoBytes" }, "extractoTextoOpcional": "max4000chars" }`. |
| **Outputs** | `{ "status", "coincidencia": "ALTA|MEDIA|BAJA", "checklist": [{"item","cumple","motivo"}], "riesgos": [] }`. |
| **Reglas** | No marcar “cumple” en ítems que requieran contenido no presente en `extractoTextoOpcional` si este es null → `INSUFFICIENT_TEXT`. |
| **Criterios aceptación** | En golden set, **macro-F1 ≥ 0,85** en etiqueta `coincidencia` vs etiquetado TD; checklist sin contradicciones internas. |

**Invariants**

- I1: Si `extractoTextoOpcional` vacío, máximo **2** ítems de contenido profundo.

**Failure Modes**

- FM: Sobre-confianza con nombre de archivo engañoso (“malla.pdf” con contenido vacío) → riesgo `riesgos` debe incluir `ARCHIVO_POSIBLEMENTE_VACIO`.

**Mitigación**

- Combinar con validación servidor: tamaño mínimo bytes, parser PDF primera página.

**Seguridad**

- Extracto truncado y sin datos personales no esenciales.

**Ejemplo válido**

- Descriptor pide “plan de estudios”; nombre `Plan_Estudios_2026.pdf` + extracto con “malla curricular” → `coincidencia` ALTA.

**Ejemplo inválido**

- Sin extracto, modelo afirma “el PDF contiene resultados de aprendizaje” → schema fuerza `INSUFFICIENT_TEXT`.

**Caso borde**

- Idioma mixto ES/EN en extracto → checklist en español institucional.
