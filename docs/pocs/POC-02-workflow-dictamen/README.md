# POC-02: Workflow de dictamen y cierre de subfase

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| ID | `POC-02-workflow-dictamen` |
| Título | Máquina de estados indicador + cierre subfase RB-03 |
| Grupo | AcredIA — SIGESA docs |
| Responsable(s) | Equipo módulo DTI |
| Fecha de inicio | 26/05/2026 |
| Fecha objetivo de cierre | 30/05/2026 |
| Estado | Completada |
| ADR relacionado | [ADR-0004](../../adr/ADR-0004-workflow-state-machine.md) |
| Trazabilidad | FSD-UC-003 · TC-06, TC-07, TC-08 · NFR-013 · RB-03, BR-013–015 |

---

## 1. Riesgo que mitiga

Cierre indebido de subfase o dictamen inconsistente con CEUB: automatizar sin validar que todos los indicadores obligatorios estén `APROBADO`.

---

## 2. Hipótesis

> Creemos que una **máquina de estados explícita** con `puede_cerrar_subfase()` evita **100% de cierres inválidos** en escenarios sintéticos y responde **`puede_cerrar: false` con `motivos[]`** cuando falta al menos un indicador.

---

## 3. Criterio de éxito medible

| Métrica | Éxito | Fracaso |
|---------|-------|---------|
| Casos TC-06/07/08 adaptados | ≥ 8/8 PASS | < 7/8 |
| Cierre con pendientes | 0 escapes | ≥ 1 |
| Rechazo → nueva carga | `EN_REVISION` | estado ilegal |
| Concurrencia dictamen | 1×200 + 1×409 | doble aprobación |

---

## 4. Alcance

**Incluye:** `PATCH /indicadores/{id}/decision`, `POST /subfases/{id}/avance`, `GET /subfases/{id}/puede-cerrar`, tests automatizados.

**Excluye:** UI [TD], PDF, portal, LLM.

---

## 5. Ejecución

```powershell
cd docs\pocs
docker compose up -d
cd POC-02-workflow-dictamen\src
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
python -m uvicorn api.main:app --port 8002
# Otra terminal:
python -m pytest tests/ -v
python scripts\run_poc02.py
```

---

## 6. Resultados

Ver [`RESULTADO.md`](RESULTADO.md) y [`evidencia/`](evidencia/).
