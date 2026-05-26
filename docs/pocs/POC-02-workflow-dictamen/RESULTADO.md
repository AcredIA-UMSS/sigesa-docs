# POC-02 — Resultados

| Metadato | Valor |
|----------|-------|
| **Fecha ejecución** | 26/05/2026 |
| **Entorno** | Local SQLite (`POC_USE_SQLITE=1`) + pytest |
| **Veredicto** | **Éxito** |

---

## 9. Resultados

### 9.1 Tabla de métricas

| Métrica | Valor obtenido | Umbral éxito | Veredicto |
|---------|----------------|--------------|-----------|
| Casos automatizados | **13/13 PASS** | ≥ 8/8 | OK |
| Cierre con pendientes | HTTP 409 `SIGESA_WF_INCOMPLETE` | 0 escapes | OK |
| Rechazo → nueva versión | `RECHAZADO` → `EN_REVISION` | estado legal | OK |
| Concurrencia doble dictamen | 200 + 409 | no doble aprobación | OK |

### 9.2 Evidencia

- [`evidencia/poc02-pytest-summary.json`](evidencia/poc02-pytest-summary.json)
- [`evidencia/poc02-pytest.log`](evidencia/poc02-pytest.log)

---

## 10. Conclusiones y veredicto

- **Veredicto:** Éxito.
- **Justificación:** `evaluar_cierre()` y transiciones explícitas bloquean cierre con indicadores obligatorios no `APROBADO`; API devuelve `motivos[]` e `indicadoresPendientes`.
- **Próximos pasos:** Integrar en módulo workflow hexagonal; alinear con [ADR-0004](../../adr/ADR-0004-workflow-state-machine.md); E2E Playwright TC-06–08.

---

## 11. Aprendizajes

- **Técnico:** `UPDATE ... WHERE estado = 'EN_REVISION'` es suficiente para conflicto de dictámenes concurrentes en POC.
- **Equipo:** Separar lógica pura (`workflow.py`) facilita tests sin BD.
- **Normativo:** Lista `motivos[]` es obligatoria para UX [TD] (BR-014).

---

## 12. Riesgos remanentes

- Reglas compuestas CEUB/ARCU-SUR (plantillas distintas por subfase).
- Delegación y roles múltiples [TD] no modelados.
- Integración con notificaciones UC-006.

---

## Checklist de cierre

- [x] Hipótesis SMART documentada
- [x] 13 tests PASS
- [x] Evidencia en `evidencia/`
- [x] Veredicto explícito
- [x] ADR-0004 creado
