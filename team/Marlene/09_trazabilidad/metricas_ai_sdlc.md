# Métricas AI-SDLC y gobernanza de componentes inteligentes — SIGESA / UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Ubicación canónica** | `team/Marlene/09_trazabilidad/metricas_ai_sdlc.md` |
| **Réplica gobierno repo** | `metricas_ai_sdlc.md` (raíz) |
| **Normas** | ISO/IEC 25010 · ISO/IEC 23894 (riesgos IA) · LFSD `RB-11` |
| **Artefactos vinculados** | `AGENTS.md`, `matriz_trazabilidad.md`, `06_prompt_contracts/prompt_contracts.md`, `08_agents/agents/SKILLS.md` |
| **Alcance** | Prompts, agentes Cursor, skills, CI asistido, asistentes futuros en producto |

---

## 1. Marco de medición

| Dimensión | Propósito | Métricas representativas |
|-----------|-----------|--------------------------|
| **Cobertura de gobernanza** | Toda función C1 con contrato IA o regla explícita | M-AI-PCOV |
| **Fidelidad a especificación** | Código/docs = PRD/FSD/LFSD | M-AI-SFID |
| **Integridad trazabilidad** | Sin filas huérfanas REQ→TC | M-AI-TII |
| **Calidad del prompt** | Menos ambigüedad y deriva | M-AI-001, M-AI-004 |
| **Calidad de salida** | Precisión normativa CEUB/ARCU-SUR | M-AI-002, M-AI-HRR |
| **Robustez** | Entradas inválidas / adversariales | M-AI-005 |
| **Operación** | Latencia, costo, disponibilidad | M-AI-006, M-AI-014, M-AI-010 |
| **Gobernanza** | Auditoría, explicabilidad, supervisión humana | M-AI-012, M-AI-013, M-AI-015 |
| **DevSecOps** | Supply chain IA | M-AI-011, M-AI-003 |

**Frecuencia:** `RT` tiempo real · `D` diaria · `W` semanal · `M` mensual · `REL` por release.

**Principio SIGESA:** ninguna métrica sustituye el dictamen humano [TD] en transiciones `C1` (`RB-11`).

---

## 2. Métricas de release (obligatorias v1.0)

Definidas en detalle en `team/Marlene/10_aportes/release-1.0.0.md` §C; resumen operativo:

### M-AI-PCOV — Prompt Coverage

| Campo | Contenido |
|-------|-----------|
| **Objetivo** | % de UC/MOD/GH críticos cubiertos por prompt-contrato, `CR-SIG-*` o `SKILL-SIG-*`. |
| **Fórmula** | `PCOV = |cubiertos| / |críticos| × 100` |
| **Conjunto crítico v1.0** | FSD-UC-001…005 (P0) + MOD-AUTH, DOCS, WF, DASH, REP + escenarios Gherkin asociados |
| **Fuente** | `prompt_contracts.md` (PC-UC-*), `AGENTS.md` §5, `.cursor/rules/`, `07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md` |
| **Umbral** | ≥ **90 %** global C1; **100 %** UC-002 y UC-003 antes de piloto |
| **Gate release** | Bloqueo si PCOV < umbral |
| **Responsable** | Tech Lead AcredIA + QA Lead |

### M-AI-SFID — Spec Fidelity

| Campo | Contenido |
|-------|-----------|
| **Objetivo** | Alineación MRD → PRD → FSD → implementación. |
| **Fórmula** | `SFID = 0,5·Align_REQ + 0,3·Align_RB + 0,2·Align_NFR` (pesos ajustables por ADR) |
| **Validación** | Muestreo endpoints vs matriz; E2E vs Gherkin; checklist NFR en CI |
| **Umbral** | ≥ **0,92** release candidato; **1,00** en C1 sin ADR |
| **Responsable** | Arquitecto + QA |

### M-AI-TII — Traceability Integrity Index

| Campo | Contenido |
|-------|-----------|
| **Objetivo** | Cero requisitos C1 huérfanos (sin TC y MOD/API cuando UC está en código). |
| **Fórmula** | `TII = 1 − huérfanos_C1 / filas_TR_C1` |
| **Fuente** | `team/Marlene/09_trazabilidad/matriz_trazabilidad.md` + etiquetas `TR-xx` en PR |
| **Umbral** | **1,00** antes de piloto; ≥ **0,95** mantenimiento |
| **Gate merge** | PR sin `FSD-UC-xxx` + `TC-xx` rechazado (`CR-SIG-02`) |
| **Responsable** | QA Lead |

### M-AI-HRR — Hallucination Risk Rate

| Campo | Contenido |
|-------|-----------|
| **Objetivo** | Tasa de afirmaciones no verificables vs corpus aprobado (LFSD, FSD, RB). |
| **Fórmula** | `HRR = salidas_no_verificables / salidas_muestreadas` |
| **Umbral** | ≤ **2 %** asistencias no dictamen; **0 %** textos “oficiales DUEA” sin firma humana |
| **Mitigación** | RAG corpus aprobado; `rationale` obligatorio; kill-switch feature flag |
| **Responsable** | TD referente + PM |

---

## 3. Catálogo operativo (M-AI-001 … M-AI-015)

| ID | Nombre corto | Fórmula / indicador | Umbral | Frec. | FSD-UC / Skill |
|----|--------------|---------------------|--------|-------|----------------|
| **M-AI-001** | Claridad prompt (PCI) | `(checks_ok/10)×100` | ≥ 85 % | W | Todos los PC-UC |
| **M-AI-002** | Precisión dominio | `V/(V+E+H)` | ≥ 95 % golden | M, REL | SKILL-SIG-01, 02, 06 |
| **M-AI-003** | Cobertura tests IA | `Cov_IA` líneas/ramas | ≥ 80 % core | REL | UC tocados por agente |
| **M-AI-004** | Drift semántico prompt | cos_sim o score 1–5 | ≤ 2/5 manual | W | PC versionados |
| **M-AI-005** | Robustez entrada | `IRR` red-team | 100 % P0 | M | UC-001–003 API |
| **M-AI-006** | Latencia inferencia | p95 latencia | ≤ 8 s asistente | RT, D | UC-004, 005 async |
| **M-AI-007** | FPR clasificación (v2) | `FP/(FP+TN)` | ≤ 5 % | M | SKILL-SIG-05 |
| **M-AI-008** | FNR clasificación (v2) | `FN/(FN+TP)` | ≤ 8 % | M | SKILL-SIG-05 |
| **M-AI-009** | OTel completeness | spans con attrs IA | 100 % | D | Endpoints con LLM |
| **M-AI-010** | MTTR incidentes IA | media `t_resolve−t_detect` | ≤ 4 h S2 | M | Pipeline IA |
| **M-AI-011** | CVE dependencias IA | `CVE_crit` en imagen | 0 críticos | REL | CI (P-S03) |
| **M-AI-012** | Audit linkage (ALR) | salidas con `trace_id`/PR | 100 % | W | UC-002, 003, 009 |
| **M-AI-013** | Explainability (ExplCov) | con campo `rationale` | 100 % | RT | RB-11, todos skills |
| **M-AI-014** | Costo / 1000 req | `C_1k` tokens + $ | Presupuesto JD | M | Todos |
| **M-AI-015** | Human escalation (HER) | `escalados/presentadas` | Monitoreo tendencia | W | SKILL-SIG-02, 07 |

Definiciones extendidas (campos completos por métrica): ver `metricas_ai_sdlc.md` en la raíz del repositorio (réplica idéntica en contenido técnico base).

---

## 4. Trazabilidad métrica ↔ artefactos Marlene

| Métrica | Matriz / doc | Agente / skill | NFR cruzado |
|---------|--------------|----------------|-------------|
| M-AI-PCOV | `matriz_trazabilidad.md` §3, §11 | `SKILL-SIG-01…07`, PC-UC | — |
| M-AI-SFID | `matriz_trazabilidad.md` §4, §13 | @ArchAgent, @QaAgent | NFR-013 |
| M-AI-TII | `matriz_trazabilidad.md` §3, §14 | @QaAgent | NFR-013 |
| M-AI-002 | Golden set por UC | SKILL-SIG-01, 02 | — |
| M-AI-003 | TC-01…14 | @DevAgent CI | — |
| M-AI-005 | `gherkin.md` escenarios negativos | — | NFR-007 |
| M-AI-006 | `NFR_ISO25010.md` | @DevOpsAgent | NFR-001–003 |
| M-AI-012 | `modelo_datos.md` `log_auditoria` | @GovernanceAgent | NFR-013 |
| M-AI-013 | `prompt_contracts.md` §13 | Todos PC-UC | NFR-013 |
| M-AI-015 | UI feedback TD (futuro) | SKILL-SIG-07 | RB-11 |

---

## 5. Cobertura PCOV por UC (inventario v1.0)

Estado documental al corte **14/05/2026** (actualizar en cada release):

| FSD-UC | Crítico | PC-UC / SKILL | CR-SIG | Diagrama | PCOV fila |
|--------|---------|---------------|--------|----------|-----------|
| UC-001 | C1 | PC-UC-001 | CR-SIG-03 | UC01_* | Cubierto |
| UC-002 | C1 | PC-UC-002, SKILL-SIG-02 | CR-SIG-01, 04 | UC02_* | Cubierto |
| UC-003 | C1 | PC-UC-003, SKILL-SIG-04, 07 | CR-SIG-02 | UC03_* | Cubierto |
| UC-004 | C1 | PC-UC-004, SKILL-SIG-06 | — | — | Parcial |
| UC-005 | C2 | PC-UC-005, SKILL-SIG-03 | CR-SIG-04 | SEQ-004 | Cubierto |
| UC-006 | C2 | — (outbox) | — | — | Parcial |
| UC-007 | C3 | — | — | — | Pendiente v1.1 |
| UC-008 | C2 | — | RB-11-PUB | — | Pendiente |
| UC-009 | C1 | — | — | — | Pendiente |
| UC-010 | C1 | PC-UC-010, SKILL-SIG-01 | — | gantt.mmd | Cubierto |
| UC-011 | C2 | — | — | — | Pendiente |
| UC-012 | C3 | SKILL-SIG-07 (borrador) | — | D-ACT-001 | Parcial |

**PCOV documental estimado (UC P0):** 5/5 UC LFSD núcleo con al menos un artefacto IA = **100 %** núcleo; **UC-001…012 paquete Marlene:** 8/12 = **67 %** → plan v1.1 cerrar UC-006, 007, 009.

---

## 6. Gates CI/CD y release

| Gate | Métrica | Acción si falla |
|------|---------|-----------------|
| Merge `main` | M-AI-003, M-AI-011 | Rechazar pipeline |
| Release candidato | M-AI-PCOV, M-AI-SFID, M-AI-TII | No tag `v*` |
| Pre-piloto institucional | M-AI-002, M-AI-005, M-AI-HRR | Comité JD + TD |
| Producción continua | M-AI-006, M-AI-009, M-AI-012, M-AI-013 | Alerta SLO + ticket S2 |

**Checklist humano C1 (no automatizable):** dictamen TD, cierre subfase, PDF externo, publicación portal — validación manual obligatoria (`AGENTS.md` §11).

---

## 7. Dashboard conceptual

| Panel | Audiencia | Widgets |
|-------|-----------|---------|
| **Gobernanza release** | Tech Lead, QA | PCOV, SFID, TII |
| **Calidad IA** | Arquitecto | PCI, Acc, HRR, Drift |
| **Operación** | DevOps | L_p95, MTTR, CVE, C_1k |
| **Cumplimiento DUEA** | JD, oficial cumplimiento | ALR, ExplCov, HER, KPI matriz §12 |
| **Acreditación** | TD | Acc por RB, HER por facultad |

---

## 8. KPIs de IA responsable (resumen ejecutivo)

| Principio | Métrica | Umbral |
|-----------|---------|--------|
| No daño | M-AI-005 (IRR) | 100 % P0 |
| Calidad normativa | M-AI-002 (Acc) | ≥ 95 % |
| Transparencia | M-AI-013 (ExplCov) | 100 % |
| Rendición de cuentas | M-AI-012 (ALR) | 100 % |
| Trazabilidad | M-AI-TII | ≥ 0,95 (1,00 piloto) |
| Supervisión humana | RB-11 + M-AI-015 (HER) | Sin automatismo dictamen |
| Costo controlado | M-AI-014 | Dentro de acta JD |

---

## 9. Explainability y auditabilidad (implementación)

| Campo persistido | Obligatorio | Referencia |
|-----------------|-------------|------------|
| `prompt_hash` | Sí | Git commit del PC-UC |
| `model_id` | Sí | Proveedor + versión |
| `trace_id` | Sí | OpenTelemetry / `LOG_AUDITORIA` |
| `rationale` | Sí | ≤ 280 caracteres, M-AI-013 |
| `accepted_by` / `rejected_by` | Sí | Usuario humano UMSS |
| Contenido PDF completo en log terceros | **No** | DPIA UMSS |

Esquema JSON sugerido en `prompt_contracts.md` y validación por JSON Schema en CI (alimenta **M-AI-SFID**).

---

## 10. DevSecOps e IA

| Control | Métrica | Herramienta |
|---------|---------|-------------|
| Secret scanning | 0 secretos en repo | Gitleaks |
| SCA imágenes / SDK | M-AI-011 | Trivy / Dependabot |
| PII en prompts | Política datos | Clasificación DUEA |
| Acceso modelo | IAM mínimo | Cloud / on-prem UMSS |
| Kill-switch IA | Feature flag | Degradación 100 % manual |

Políticas agente: `AGENTS.md` §6 (P-S01–P-S04).

---

## 11. Estrategia de monitoreo continuo

1. **CI/CD:** M-AI-003, M-AI-011 cada merge; validación schema salida IA (SFID parcial).  
2. **Staging:** red-team M-AI-005 semanal; golden set M-AI-002 por release.  
3. **Producción:** M-AI-006, M-AI-009 en APM; alertas alineadas **NFR-004**.  
4. **Comité de prompts:** M-AI-001, M-AI-004 antes de cambiar PC-UC o skills.  
5. **Revisión trimestral DUEA + AcredIA:** muestreo HER, HRR, informe PCOV/TII.

---

## 12. Responsables por métrica

| Métrica | Responsable primario | Suplente |
|---------|---------------------|----------|
| M-AI-PCOV | Tech Lead AcredIA | QA Lead |
| M-AI-SFID | Arquitecto software | Product Owner |
| M-AI-TII | QA Lead | Scrum Master |
| M-AI-HRR | TD referente DUEA | Oficial cumplimiento IA |
| M-AI-002 | QA + TD | Tech Lead |
| M-AI-011 | DevOps | Seguridad UMSS |
| M-AI-014 | JD sponsor | Tech Lead |
| M-AI-015 | PM AcredIA | JD |

---

## 13. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Catálogo unificado paquete Marlene; métricas release PCOV/SFID/TII/HRR; mapa UC-001…012 |

---

*Mantenimiento: al añadir `FSD-UC` o `SKILL-SIG`, actualizar §5 y recalcular PCOV. Sincronizar umbrales con `release-1.0.0.md` §C en cada tag.*
