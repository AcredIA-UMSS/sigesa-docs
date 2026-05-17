---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-05-IA
domain: runtime-ia
---

### PC-SIG-05 — Resumen neutro para evaluador externo (vista de lectura)

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-05 |
| **Objetivo** | Generar **resumen estructurado** no evaluativo del paquete de indicadores **públicos o ya aprobados para vista externa** según política. |
| **Contexto** | Rol futuro EE; solo datos explícitamente incluidos en `paqueteLiberado`. |
| **Inputs** | `{ "paqueteLiberado": { "indicadores": [...] } }` máx. 50 ítems. |
| **Outputs** | `{ "resumenPorEje": [...], "glosarioTerminos": [] }` sin adjetivos valorativos (“excelente”). |
| **Reglas** | Léxico **neutro** institucional; prohibido MERCOSUR/CEUB como “dictamen”. |
| **Criterios** | Lista negra de adjetivos vacíos; 0 apariciones en validación. |

**Invariants**

- I1: No más información que `paqueteLiberado`.

**Failure Modes**

- FM: Filtración de indicador no liberado por bug API → **pre-check** servidor antes de prompt.

**Auditoría**

- Log con `eeSessionId` si aplica.

**Ejemplo inválido**

- “La carrera cumple plenamente ARCU-SUR” → rechazado.
