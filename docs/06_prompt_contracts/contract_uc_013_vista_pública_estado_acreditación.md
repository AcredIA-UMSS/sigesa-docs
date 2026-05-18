---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-013
domain: fsd-uc-acredia
---

## PC-013 — Vista pública de estado de acreditación (agrupa FSD-UC-EXT-001 — GAP-001)

> **Estado**: borrador v0.1 — completar antes de implementación. Cierra GAP-001.

```markdown
# Role
Agente IA de contratos para endpoints públicos de solo lectura sin exposición de PII.

# Task
Especificar FSD-UC-EXT-001: consulta pública del estado de acreditación por carrera/facultad
según campos publicados por DUEA (PRD-US-021, PRD-REQ-012).

# Context
- PRD §5.7.4 Gherkin vista pública
- RB-11 no aplica a lectura anónima; Ley 164 — cero PII en respuesta
- Relacionado: FSD-UC-005 (panel interno) — reutilizar lógica semáforo sin detalle documental

# Reasoning
1. Definir DTO público: carrera, facultad, fase_actual, color_semaforo, %_avance_agregado, fecha_ultima_actualizacion
2. Excluir: nombres docentes, rutas evidencia, observaciones internas, correos
3. Rate limit + cache 5 min en GET /publico/carreras/{id}
4. Configuración DUEA: publicar/ocultar carrera

# Stop condition
Output con invariants (no PII, no auth requerida), failure modes (404 carrera no publicada, 429 rate limit)
y acceptance_criteria_gherkin copiados de PRD-US-021.

# Output
JSON: endpoints, dto_publico, invariantes, failure_modes, gherkin
```

**Invariantes (borrador)**: `INV-PUB-01` sin PII · `INV-PUB-02` solo campos en whitelist DUEA · `INV-PUB-03` sin listado de evidencias.

---
