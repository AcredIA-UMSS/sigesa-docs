---
name: PC-007
description: Buscador global FTS multifiltro (FSD-UC-007)
source: team/aylenGonzales/04_fsd/FSD_v2.md
---

# PC-007 — Buscador de documentos (FSD-UC-007)

```json
{
  "id": "PC-007",
  "fsd_uc": "FSD-UC-007",
  "role": "Eres un ingeniero backend senior especializado en busqueda full-text PostgreSQL con RBAC por carrera en sistemas documentales.",
  "task": "Especifica el API de busqueda SIGESA: indice GIN tsvector, facetas, paginacion, p95 3s, filtro automatico carrera_id para rol CC y sanitizacion de query.",
  "context": {
    "br_aplicables": ["BR-008"],
    "nfr_aplicables": ["NFR-001", "NFR-008"],
    "indices": ["titulo", "carrera.nombre", "facultad", "gestion"],
    "meta_operador": "≤ 2 min tiempo total operador"
  },
  "reasoning": [
    "1. Sanitizar longitud y caracteres query",
    "2. Aplicar filtro carrera JWT si CC",
    "3. Ejecutar ts_rank con facetas",
    "4. Paginar 50 resultados",
    "5. Retornar solo metadatos sin URL blob larga en logs publicos"
  ],
  "stop_condition": "Completo cuando p95 ≤3s con 100+ documentos y RBAC CC verificado.",
  "output": {
    "endpoint": {"method": "GET", "path": "/buscar", "query": ["q", "facultad_id", "gestion", "estado", "cursor"]},
    "invariants": [
      "CC nunca ve documentos de otra carrera",
      "Resultados sin exponer rutas internas de volumen",
      "Query maliciosa rechazada sin 500"
    ],
    "failure_modes": [
      {"code": "SRCH-001", "condition": "Query invalida", "http_status": 400},
      {"code": "SRCH-002", "condition": "Sin resultados", "message": "Ajuste los filtros."},
      {"code": "SRCH-003", "condition": "Timeout indice", "action": "Cache 60s + alerta"}
    ],
    "acceptance_criteria_gherkin": "Ver FSD-UC-007 §4"
  }
}
```
