---
source: team/Marlene/07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md
id: PC-SIG-01-IA
domain: runtime-ia
---

### PC-SIG-01 — Borrador estructurado de informe de acreditación (narrativa + datos)

| Elemento | Especificación |
|----------|----------------|
| **ID** | PC-SIG-01 |
| **Objetivo del contrato** | Generar un **borrador** de informe de avance de acreditación en **español** a partir de **datos estructurados** oficiales (sin inventar cifras). |
| **Contexto funcional y alcance** | Módulo **M7 Reporting** / asistente JD. Entrada: JSON de estado por carrera/fase/indicador **ya calculado por SIGESA**. Salida: texto secciones + tabla resumen **solo** si los números vienen en input. Ámbito: CEUB y/o ARCU-SUR según `tipoProceso`. |
| **Inputs esperados** | Schema `InformeAccreditacionInput` v1: `{ "pcVersion": "1.0.0", "carrera": {...}, "proceso": {...}, "resumenIndicadores": [...], "alertas": [...] }`. Validaciones: JSON Schema; `carrera.id` UUID; `resumenIndicadores` máx. 200 ítems. |
| **Outputs esperados** | JSON: `{ "status": "OK" \| "NEEDS_MORE_CONTEXT", "markdown": "string", "tablas": [], "advertencias": [] }`. `markdown` ≤ 12.000 caracteres. **Prohibido** inventar fechas o porcentajes no presentes en input. |
| **Reglas de negocio y comportamiento** | RB-IA-01: no afirmar “acreditada” si `estadoProceso` no lo indica; citar solo datos del JSON; si faltan campos críticos → `NEEDS_MORE_CONTEXT`. |
| **Criterios de validación y aceptación** | (1) JSON output valida schema. (2) Diff automático: **0** números en salida que no estén en entrada. (3) Revisión humana JD en UAT: ≥4/5 utilidad del borrador. |

**Invariants**

- I1: Toda cifra en `markdown` aparece literalmente en `input` (normalización Unicode).
- I2: `pcVersion` y `modelId` se registran en auditoría.

**Failure Modes**

- FM1: Modelo alucina porcentaje → **validator numérico** rechaza → reintento con prompt “corrige: solo datos provistos”.
- FM2: Markdown truncado por `max_tokens` → `status: NEEDS_MORE_CONTEXT` + sección incompleta marcada.

**Mitigación y recuperación**

- Chunking por facultad; aumentar `max_tokens` solo vía config aprobada; *fallback*: plantilla Jinja2 sin LLM.

**Seguridad y privacidad**

- No incluir nombres de estudiantes en input; solo agregados. PII en `alertas` → bloqueo o enmascaramiento (PC-SIG-11).

**Ambigüedad / entradas inválidas**

- JSON malformado → 400 API sin llamar LLM. Campos opcionales ausentes → narrativa solo sobre disponibles.

**Trazabilidad y auditoría**

- Tabla `ia_invocation`: `requestId`, `userId`, `pcId`, `inputHash`, `outputHash`, `tokens`, `latencyMs`, `validationResult`.

**Ejemplo válido**

- Input contiene `porcentajeAvance: 72`. Salida incluye “72%” en contexto de avance.

**Ejemplo inválido**

- Input sin `fechaLimite`; salida inventa “vence el 30 de noviembre” → **rechazo validator**.

**Casos borde**

- `porcentajeAvance` null → texto debe decir “no disponible en el sistema” sin estimar.
