# Prompt Contracts — AcredIA / SIGESA
**Archivo:** `team/aylenGonzales/docs/fsd/prompt-contracts.md`
**Versión:** 1.0 | **Fecha:** 2026-05-14 | **Autora:** Aylen Mariangel Gonzales Alvino
**Fuente:** FSD v2.0 §7 | **Relaciones:** BRD v2 · PRD v1 · MRD v1 · casos-de-uso.md

---

## ¿Qué es un Prompt Contract?

Un **Prompt Contract** (PC) define el contrato formal entre un caso de uso del sistema y el componente de IA generativa que lo asiste. Especifica:
- **System prompt**: instrucción base que configura el comportamiento del modelo.
- **Input esperado**: estructura y tipo de datos que el UC entrega al modelo.
- **Output esperado**: formato, contenido y restricciones del resultado.
- **Criterio de rechazo**: condiciones bajo las cuales el output es inválido y debe reintentarse o escalarse.

### Cobertura actual

| PC | FSD-UC cubierto | Estado |
|----|-----------------|--------|
| PC-001 | FSD-UC-001 (Carga de Evidencias) | ✅ Definido |
| PC-002 | FSD-UC-002 (Control de Versiones) | ✅ Definido |
| PC-003 | FSD-UC-003 (Flujo de Aprobación) | ✅ Definido |
| PC-004 | FSD-UC-005 (Generación de Reportes PDF) | ✅ Definido |
| PC-005 | FSD-UC-004 (Notificaciones) | ⚠️ Pendiente — GAP |
| PC-006 | FSD-UC-006 (Autenticación) | ⚠️ Pendiente — GAP |
| PC-007 | FSD-UC-007 (Búsqueda Multifiltro) | ⚠️ Pendiente — GAP |

**Prompt Coverage actual:** 4 / 7 ≈ **57 %** — umbral objetivo: ≥ 85 % (Q3 2026)

---

## PC-001 — Validación Asistida de Metadatos en Carga de Evidencias

| Campo | Valor |
|-------|-------|
| **ID** | PC-001 |
| **FSD-UC** | FSD-UC-001 |
| **MRD-N** | MRD-N-01 |
| **Disparador** | El [CC] adjunta un archivo; el sistema invoca al modelo antes de registrar la versión |
| **Modelo recomendado** | claude-sonnet-4-20250514 |

### System Prompt

```
Eres el asistente de validación de metadatos del sistema SIGESA de la UMSS.
Tu única función es verificar si los metadatos de una evidencia académica son
suficientes para registrarla en el expediente de acreditación CEUB/ARCU-SUR.

Reglas que SIEMPRE debes aplicar:
1. Los campos obligatorios son: título, fase_ceub, indicador, carrera, gestión, tipo_documento.
2. El campo "título" debe tener entre 5 y 200 caracteres.
3. El campo "gestión" debe seguir el formato AAAA-I o AAAA-II (ej: 2026-I).
4. El campo "tipo_documento" debe ser uno de: PLAN_ESTUDIO, REGLAMENTO, INFORME,
   ACTA, MEMORIA, OTRO.
5. Si todos los campos son válidos, responde SOLO con el JSON de confirmación.
6. Si hay errores, responde SOLO con el JSON de errores.
7. Nunca agregues texto explicativo fuera del JSON.
```

### Input esperado

```json
{
  "titulo": "string (5-200 chars)",
  "fase_ceub": "string (ej: 'Fase 2 - Gestión Académica')",
  "indicador": "string (ej: 'Indicador 2.3')",
  "carrera": "string",
  "gestion": "string (formato AAAA-I o AAAA-II)",
  "tipo_documento": "PLAN_ESTUDIO | REGLAMENTO | INFORME | ACTA | MEMORIA | OTRO",
  "descripcion_opcional": "string | null"
}
```

### Output esperado — éxito

```json
{
  "status": "VALID",
  "metadata_confirmed": {
    "titulo": "...",
    "fase_ceub": "...",
    "indicador": "...",
    "carrera": "...",
    "gestion": "...",
    "tipo_documento": "..."
  }
}
```

### Output esperado — error

```json
{
  "status": "INVALID",
  "errores": [
    {
      "campo": "gestion",
      "mensaje": "Formato inválido. Use AAAA-I o AAAA-II (ej: 2026-I)."
    }
  ]
}
```

### Criterios de rechazo del output

| Condición | Acción |
|-----------|--------|
| El modelo devuelve texto fuera del JSON | Reintentar con temperatura = 0 |
| `status` no es `"VALID"` ni `"INVALID"` | Escalar a validación manual |
| El JSON no puede parsearse | Escalar a validación manual |
| Tiempo de respuesta > 5 seg | Timeout; continuar con validación manual |

### Caso de prueba

```
Input: { "titulo": "Plan", "gestion": "26-I", "tipo_documento": "OTRO", ... }
Output esperado: { "status": "INVALID", "errores": [{ "campo": "titulo", ... }, { "campo": "gestion", ... }] }
```

---

## PC-002 — Detección de Cambios Significativos entre Versiones

| Campo | Valor |
|-------|-------|
| **ID** | PC-002 |
| **FSD-UC** | FSD-UC-002 |
| **MRD-N** | MRD-N-02 |
| **Disparador** | El [CC] carga una nueva versión de un documento existente |
| **Modelo recomendado** | claude-sonnet-4-20250514 |

### System Prompt

```
Eres el analizador de versiones documentales del sistema SIGESA de la UMSS.
Tu función es comparar el resumen de metadatos de dos versiones de una evidencia
académica e identificar si los cambios son significativos para el proceso de
acreditación CEUB/ARCU-SUR.

Reglas:
1. Un cambio es SIGNIFICATIVO si afecta: tipo_documento, fase_ceub, indicador,
   o si el título cambia en más del 30%.
2. Un cambio es MENOR si solo afecta: descripcion_opcional o correcciones
   tipográficas en el título (≤ 30% de diferencia).
3. Responde SOLO con el JSON especificado. Sin texto adicional.
4. No accedas al contenido del archivo; solo analiza los metadatos provistos.
```

### Input esperado

```json
{
  "version_anterior": {
    "version_id": "string",
    "titulo": "string",
    "fase_ceub": "string",
    "indicador": "string",
    "tipo_documento": "string",
    "fecha": "ISO8601"
  },
  "version_nueva": {
    "titulo": "string",
    "fase_ceub": "string",
    "indicador": "string",
    "tipo_documento": "string"
  }
}
```

### Output esperado

```json
{
  "tipo_cambio": "SIGNIFICATIVO | MENOR",
  "campos_modificados": ["fase_ceub", "indicador"],
  "requiere_reaprobacion": true,
  "resumen": "string (máx. 100 chars)"
}
```

### Criterios de rechazo del output

| Condición | Acción |
|-----------|--------|
| `tipo_cambio` no es `"SIGNIFICATIVO"` ni `"MENOR"` | Reintentar |
| `requiere_reaprobacion` no es booleano | Reintentar |
| JSON no parseable | Escalar; marcar versión como `REQUIERE_REVISION_MANUAL` |

---

## PC-003 — Asistencia en Justificación de Rechazo

| Campo | Valor |
|-------|-------|
| **ID** | PC-003 |
| **FSD-UC** | FSD-UC-003 |
| **MRD-N** | MRD-N-03 |
| **Disparador** | El [TD] selecciona "Rechazar" y antes de confirmar, el sistema ofrece asistencia para redactar la justificación |
| **Modelo recomendado** | claude-sonnet-4-20250514 |

### System Prompt

```
Eres el asistente de redacción de justificaciones técnicas del sistema SIGESA
de la UMSS. Ayudas a los Técnicos DUEA ([TD]) a redactar justificaciones de
rechazo claras, formales y accionables para el Coordinador de Carrera ([CC]).

Reglas:
1. La justificación debe ser formal, en español, entre 30 y 300 caracteres.
2. Debe indicar QUÉ falta o está incorrecto y QUÉ debe hacer el [CC] para corregirlo.
3. Usa terminología del marco CEUB/ARCU-SUR cuando sea relevante.
4. No incluyas opiniones subjetivas ni lenguaje peyorativo.
5. Responde SOLO con el JSON especificado.
```

### Input esperado

```json
{
  "nombre_evidencia": "string",
  "fase_ceub": "string",
  "motivo_rechazo_corto": "string (palabras clave del [TD], ej: 'falta sello')",
  "observacion_adicional": "string | null"
}
```

### Output esperado

```json
{
  "justificacion_sugerida": "string (30-300 chars)",
  "accion_requerida": "string (qué debe hacer el [CC])"
}
```

### Criterios de rechazo del output

| Condición | Acción |
|-----------|--------|
| `justificacion_sugerida` < 30 o > 300 caracteres | Reintentar con temperatura = 0 |
| Contiene lenguaje informal o peyorativo | Reintentar; si persiste, descartar y dejar campo libre al [TD] |
| JSON no parseable | Descartar output; [TD] redacta manualmente |

### Nota de uso
El output es una **sugerencia**: el [TD] puede editarla o descartarla. El sistema nunca envía la justificación generada por IA sin revisión humana.

---

## PC-004 — Generación de Resumen Ejecutivo para Reportes PDF

| Campo | Valor |
|-------|-------|
| **ID** | PC-004 |
| **FSD-UC** | FSD-UC-005 |
| **MRD-N** | MRD-N-04 |
| **Disparador** | El [JD] solicita la generación del reporte; el modelo genera el párrafo de resumen ejecutivo antes de compilar el PDF |
| **Modelo recomendado** | claude-sonnet-4-20250514 |

### System Prompt

```
Eres el redactor de resúmenes ejecutivos del sistema SIGESA de la UMSS.
Tu función es generar el párrafo de resumen ejecutivo de un reporte de
acreditación para el Jefe de Departamento ([JD]).

Reglas:
1. El resumen debe tener entre 100 y 300 palabras.
2. Debe mencionar: nombre de la carrera, gestión evaluada, número de evidencias
   aprobadas, número de fases CEUB completadas y estado general de avance.
3. Usa tono formal académico-institucional.
4. No inventes datos: usa SOLO los valores del JSON de entrada.
5. Finaliza con una oración de recomendación basada en el porcentaje de avance:
   - ≥ 90 %: "Se recomienda proceder con la presentación formal ante el CEUB."
   - 70–89 %: "Se recomienda completar las evidencias pendientes antes del cierre de gestión."
   - < 70 %: "Se requiere atención prioritaria para alcanzar el umbral mínimo de acreditación."
6. Responde SOLO con el JSON especificado.
```

### Input esperado

```json
{
  "carrera": "string",
  "facultad": "string",
  "gestion": "string (ej: 2026-I)",
  "total_evidencias_cargadas": "integer",
  "total_evidencias_aprobadas": "integer",
  "fases_ceub_total": "integer",
  "fases_ceub_completadas": "integer",
  "porcentaje_avance": "float (0.0 - 100.0)"
}
```

### Output esperado

```json
{
  "resumen_ejecutivo": "string (100-300 palabras)",
  "recomendacion": "string (una de las 3 frases predefinidas)",
  "porcentaje_avance_confirmado": "float"
}
```

### Criterios de rechazo del output

| Condición | Acción |
|-----------|--------|
| `resumen_ejecutivo` < 100 o > 300 palabras | Reintentar |
| `recomendacion` no coincide con ninguna de las 3 frases predefinidas | Reintentar con temperatura = 0 |
| `porcentaje_avance_confirmado` difiere del input en > 0.01 | Descartar; usar valor del input directamente |
| JSON no parseable | Descartar output; generar PDF sin párrafo de resumen ejecutivo |

### Caso de prueba

```
Input: { "carrera": "Ing. de Sistemas", "porcentaje_avance": 85.5, ... }
Output esperado: {
  "resumen_ejecutivo": "Durante la gestión 2026-I...",
  "recomendacion": "Se recomienda completar las evidencias pendientes antes del cierre de gestión.",
  "porcentaje_avance_confirmado": 85.5
}
```

---

## Gaps de cobertura — Prompt Contracts pendientes

| ID | FSD-UC | Descripción | Acción | Responsable | Fecha límite |
|----|--------|-------------|--------|-------------|--------------|
| PC-005 | FSD-UC-004 | Generación de asunto y cuerpo de notificaciones por evento | Definir PC-005 | Aylen / Tech Lead | Q3 2026 |
| PC-006 | FSD-UC-006 | Asistencia en mensajes de error de autenticación | Definir PC-006 | Tech Lead AcredIA | Q3 2026 |
| PC-007 | FSD-UC-007 | Sugerencia de términos de búsqueda alternativos | Definir PC-007 | Aylen / Tech Lead | Q3 2026 |

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 1.0 | 2026-05-14 | Aylen Gonzales Alvino | Versión inicial: PC-001 a PC-004 derivados de FSD v2.0 |