# Informe de auditoría de trazabilidad — SIGESA Dorada (histórico)

> **Informe canónico:** [`docs/09_trazabilidad/report_findings.md`](../09_trazabilidad/report_findings.md) (v1.3).

| Campo | Valor |
|-------|-------|
| **Versión** | **v1.2** |
| **Timestamp** | `2026-05-16T16:30:00-04:00` |
| **Auditor** | Skill `sigesa-auditor-trazabilidad-dti` |
| **Alcance** | BRD v2.2 · MRD v1.1 · PRD · FSD · NFR v1.1 · matriz v1.2 |

---

## 1. Resumen ejecutivo

| Métrica | Resultado |
|---------|-----------|
| BRD-REQ (001–026) | 26/26 mapeados o N/A explícito |
| PRD-REQ → BRD (cero huérfanos Q-01) | **PRD-REQ-012 → BRD-REQ-026** |
| PRD-US → FSD-UC | 24/24 |
| Decisiones Q-01…Q-04 | **Cerradas** en BRD §21.1 |
| **Veredicto** | **APTO para compilar DTI Dorado** |

---

## 2. Decisiones institucionales incorporadas

| ID | Decisión | Artefacto |
|----|----------|-----------|
| Q-01 | **BRD-REQ-026** paneles [CC]/[TD] | `docs/01_brd/BRD.md` §11 |
| Q-02 | Auth local v1.0 + Adapter LDAP v1.1 | [`ADR-0003`](../adr/ADR-0003-authentication-adapter.md) |
| Q-03 | Progreso async **> 5 MB** | BRD-REQ-025, NFR-011 |
| Q-04 | Responsive lectura Must v1.0; carga móvil v1.1 | PRD-REQ-023, BRD §21.1 |
| Q-05 | Carreras piloto | **Abierto** — BRD §14.3 plantilla |

---

## 3. Hallazgos por severidad

### 3.1 Error — ninguno

### 3.2 Warning — abiertos

| ID | Hallazgo | Acción |
|----|----------|--------|
| W-01 | BRD-REQ-021 respaldo sin UC | DTI §infra |
| W-05 | Wireframes M2 no en repo | FSD §9 cuando existan |
| **W-06** | **BRD-Q-04:** faltan 2–3 carreras y fechas piloto | Completar §14.3 BRD con [JD] |

### 3.3 Cerrados en v1.2

| ID | Resolución |
|----|------------|
| E-01 | PRD §14 corregido |
| W-04 | ADR-0001, 0002, **0003** |
| Q-01…Q-04 | BRD §21.1 |
| GAP-NFR-03 | Umbral 5 MB |

---

## 4. Pregunta única pendiente (Q-05 / BRD-Q-04)

Proporcionar para cada carrera piloto (mínimo 2):

1. Nombre de carrera y facultad  
2. Modalidad (CEUB / ARCU-SUR)  
3. Fecha límite de la Fase crítica (Evaluación Interna u otra)  
4. Coordinador [CC] responsable  

Se integrará en **BRD §14.3** y en casos de prueba UAT (`TC-PILOT-*`).

*Referencia de ejemplo en bitácoras UX (no sustituye listado formal): carrera tipo «Diseño Gráfico».*

---

## 5. Gate DTI

| Criterio | Estado |
|----------|--------|
| Matriz v1.2 | Cumple |
| BRD-REQ-026 | Cumple |
| ADR auth | Cumple |
| Q-05 carreras piloto | **Pendiente** (no bloquea redacción DTI; bloquea UAT F2) |
| Compilar `docs/05_dti/DTI.md` | **Siguiente paso** |

---

## 6. Registro de cambios

| Versión | Timestamp | Cambio |
|---------|-----------|--------|
| v1.0 | 2026-05-16T15:51:39-04:00 | Informe inicial |
| v1.1 | 2026-05-16T16:22:00-04:00 | Auditoría E-01, matriz v1.1 |
| **v1.2** | 2026-05-16T16:30:00-04:00 | Q-01…Q-04 cerradas; BRD v2.2 |
