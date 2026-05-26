# ADR‑0004: Máquina de estados explícita para dictamen y cierre de subfase

### Metadatos

| Campo | Valor |
|-------|-------|
| Número | `0004` |
| Título | Máquina de estados para dictamen [TD] y cierre de subfase |
| Fecha | `26/05/2026` |
| Autor(es) | Equipo AcredIA — UMSS |
| Estado | **Aceptada** (validada por POC-02) |
| Alcance | Módulo workflow / FSD-UC-003 |
| POC | [`docs/pocs/POC-02-workflow-dictamen/`](../pocs/POC-02-workflow-dictamen/) |

---

### 1. Contexto

RB-03 y BR-013–015 exigen que ninguna subfase cierre si indicadores obligatorios no están `APROBADO`. El riesgo de auditoría CEUB es alto si la lógica está dispersa en controladores.

**POC-02:** 13 tests PASS; `puede_cerrar_subfase()` devuelve `motivos[]` e `indicadoresPendientes`.

---

### 2. Alternativas consideradas

| Alternativa | Pros | Contras |
|-------------|------|---------|
| A. Flags booleanos en BD | Rápido | Estados ilegales |
| B. Máquina de estados + servicio dominio `evaluar_cierre` | Testeable; alineado SKILL-SIG-04 | Más código inicial |
| C. Reglas solo en frontend | UX rápida | Inseguro |

---

### 3. Decisión

> **Elegimos B:** estados `PENDIENTE | EN_REVISION | APROBADO | RECHAZADO`; transiciones de dictamen solo desde `EN_REVISION`; cierre de subfase vía `evaluar_cierre()` antes de `POST /subfases/{id}/avance`.

Concurrencia: `UPDATE ... WHERE estado = 'EN_REVISION'` → segundo dictamen recibe `409 SIGESA_WF_CONFLICT`.

Rechazo → nueva carga [CC]: transición `RECHAZADO` → `EN_REVISION` explícita.

---

### 4. Consecuencias

- **Positivas:** API 409 `SIGESA_WF_INCOMPLETE` con lista de pendientes (BR-014).
- **Negativas:** Plantillas CEUB/ARCU-SUR multi-versión requieren extensión del modelo.
- **Observables:** Contador `sigesa_wf_cierre_rechazado_total`.

---

### 5. Referencias

- POC-02 [`RESULTADO.md`](../pocs/POC-02-workflow-dictamen/RESULTADO.md)
- UC03_estado.mmd · TC-06, TC-07, TC-08
