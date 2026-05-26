# Requisitos No Funcionales — ISO/IEC 25010 — SIGESA / AcredIA

## Control de versión del documento

| Campo | Valor |
|-------|-------|
| **Versión** | **Dorada v1.1** |
| **Timestamp** | `2026-05-16T16:15:44-04:00` |
| **Resumen de cambios** | NFR Dorado ampliado: trazabilidad PRD↔FSD↔TC, catálogo de pruebas BDD, alineación con regla QA Gherkin (`.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc`), escenarios obligatorios (happy + sad path), umbrales verificables y matriz de cobertura. |
| **Fuentes** | `docs/01_brd/BRD.md` v2.1 · `docs/03_prd/PRD.md` v1.0 · `docs/04_fsd/FSD.md` v1.0 · `docs/05_dti/modelo_datos.md` |
| **Regla QA** | [04_sigesa_qa_gherkin_coverage.mdc](../../.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc) |
| **Estado** | Borrador — listo para suite de pruebas y DTI |

> **Propósito:** definir **cómo se verifica** la calidad del sistema más allá de las user stories. Todo NFR Must debe tener **métrica numérica**, **método de verificación** y **enlace a escenarios Gherkin o pruebas automatizadas** antes de cerrar un release (v1.0).

---

## 0. Alineación con la regla QA Gherkin

La regla **Guardián de QA y Cobertura Gherkin** impone:

| Invariante QA | Cómo lo cumple este documento |
|---------------|-------------------------------|
| Código solo con Gherkin en PRD/FSD | §6 mapea cada NFR a `PRD-US` / `FSD-UC` con bloque Gherkin existente |
| Cabecera de tests con tags | §7 plantilla `@Tag("PRD-US-xxx")` `@Tag("FSD-UC-xxx")` `@Tag("NFR-xxx")` |
| Sad path obligatorio (DELETE, estados) | §5 catálogo `TC-SAD-*`; NFR-017 append-only; NFR-018 state machine |
| Pausa si falta Gherkin | §8 auditoría de cobertura — 24/24 US con Gherkin en PRD Dorado |

**Convención de tags en código de prueba** (preferir IDs canónicos del repo):

```gherkin
# Cabecera sugerida en *.feature / *.spec.ts
# @Tag("PRD-US-008") @Tag("FSD-UC-005") @Tag("NFR-017") @Tag("TC-SAD-001")
```

> La regla muestra el ejemplo `US-SIG-012`; en documentación Dorada el ID canónico es **`PRD-US-012`** (equivalente semántico).

---

## 1. Modelo de calidad (ISO/IEC 25010:2011)

Características cubiertas en SIGESA v1.0 (mínimo 5, objetivo 8+):

| Característica ISO | NFR IDs | Peso release v1.0 |
|--------------------|---------|-------------------|
| **Eficiencia de desempeño** | NFR-001 … NFR-004 | Crítico |
| **Disponibilidad** (Confiabilidad) | NFR-005, NFR-015 | Alto |
| **Seguridad** | NFR-006 … NFR-009, NFR-017 | Crítico |
| **Usabilidad** | NFR-010, NFR-011 | Alto |
| **Accesibilidad** (subcaracterística usabilidad) | NFR-012 | Medio (v1.1 hardening) |
| **Compatibilidad** | NFR-013 | Medio |
| **Mantenibilidad** | NFR-014 | Crítico (CI) |
| **Adecuación funcional / dominio** | NFR-016 | Crítico (gate) |
| **Portabilidad / cumplimiento** | NFR-019 | Ley 164 UMSS |

---

## 2. Catálogo maestro de NFRs

| ID | ISO 25010 | Requisito | Métrica | Umbral | Release | PRD-NFR | Verificación |
|----|-----------|-----------|---------|--------|---------|---------|--------------|
| NFR-001 | Eficiencia temporal | Latencia API lecturas frecuentes (`GET` búsqueda, dashboard) | p95 | < 500 ms | P1 | PRD-NFR-001 | k6, APM |
| NFR-002 | Eficiencia temporal | Tarea E2E: localizar y abrir Evidencia correcta | mediana | ≤ 2 min | P1 | PRD-NFR-002 | UAT cronometría (10 tareas) |
| NFR-003 | Eficiencia temporal | Generación reporte PDF ejecutivo [JD] | P95 | ≤ 5 min | P1 | PRD-NFR-003 | E2E + timer |
| NFR-004 | Eficiencia temporal | Notificación evento crítico (cola → SMTP) | tiempo | ≤ 15 min | P1 | PRD-NFR-004 | métricas `notification_outbox` |
| NFR-005 | Disponibilidad | Uptime servicio horario extendido piloto | % mensual | ≥ 99 % | P1 | PRD-NFR-005 | uptime monitor / SLA |
| NFR-006 | Seguridad | TLS en tránsito | versión mínima | TLS 1.2+ | P1 | PRD-NFR-006 | SSL Labs / scan |
| NFR-007 | Seguridad | Cifrado en reposo blobs Evidencia | algoritmo | AES-256 o equivalente | P1 | PRD-NFR-007 | auditoría storage |
| NFR-008 | Seguridad | RBAC en endpoints sensibles | cobertura | 100 % | P1 | PRD-NFR-008 | matriz permisos + tests API |
| NFR-009 | Seguridad | Aislamiento datos [CC] por carrera | incidentes críticos | 0 | P1 | PRD-NFR-009 | tests rol + pentest ligero |
| NFR-010 | Usabilidad | Validación en formularios críticos | cobertura campos | 100 % | P1 | PRD-NFR-010 | checklist UX + E2E |
| NFR-011 | Usabilidad | Barra progreso cargas **> 5 MB** (async) | cobertura UI | 100 % | P1/P2 | PRD-NFR-011 | E2E upload |
| NFR-012 | Accesibilidad | WCAG 2.2 AA componentes críticos | hallazgos críticos AA | 0 | P2 | PRD-NFR-012 | axe-core, auditoría manual |
| NFR-013 | Compatibilidad | Navegadores soportados | pass UAT | Chrome, Firefox, Edge (últ. 2) | P1 | PRD-NFR-013 | matriz browsers |
| NFR-014 | Mantenibilidad | Trazabilidad tests ↔ PRD-US / FSD-UC / NFR | cobertura Must | 100 % | P1 | PRD-NFR-014 | CI grep `@Tag` |
| NFR-015 | Fiabilidad | Respaldo diario + restore trimestral | RPO / prueba restore | 24 h / éxito restore | P1 | PRD-NFR-015 | runbook ops (DTI) |
| NFR-016 | Adecuación dominio | No-ERP: sin módulos SIIS/RRHH en v1 | revisión alcance | 0 módulos | P1 | PRD-NFR-016 | gate release checklist |
| NFR-017 | Seguridad / auditoría | Append-only: rechazo DELETE Evidencia aprobada | tasa rechazo | 100 % intentos | P1 | (BRD-CST-01) | TC-SAD-001 |
| NFR-018 | Adecuación funcional | Máquina de estados: sin saltos ilegales | tasa bloqueo | 100 % | P1 | (BRD-CST-03) | TC-SAD-002, TC-SAD-003 |
| NFR-019 | Cumplimiento | Ley 164 / políticas UMSS datos personales | checklist legal | sin hallazgos críticos | P1 | BRD-CST-06 | revisión DPO |

---

## 3. Detalle por NFR (métrica + método + actores)

### NFR-001 — Latencia API (p95 < 500 ms)

| Campo | Valor |
|-------|-------|
| Endpoints en alcance | `GET /evidences/search`, `GET /dashboard/*`, `GET /indicators` (bandeja [TD]) |
| Carga de prueba | 50 VUs, 5 min, ramp-up 30 s |
| Herramienta | k6 + OpenTelemetry |
| Criterio fallo | p95 ≥ 500 ms en 2 corridas consecutivas |

### NFR-002 — Búsqueda E2E (≤ 2 min)

| Campo | Valor |
|-------|-------|
| Escenario Gherkin | PRD-US-004 · FSD-UC-007 |
| Método | 10 usuarios [TD]; cronómetro tarea completa hasta abrir Evidencia |
| Baseline BRD | BRD-KPI-01 |

### NFR-003 — PDF ejecutivo (P95 ≤ 5 min)

| Campo | Valor |
|-------|-------|
| Escenario Gherkin | PRD-US-021 · FSD-UC-014 |
| Método | 20 generaciones con filtros distintos; percentil 95 |
| Actores | [JD] |

### NFR-004 — Notificaciones (≤ 15 min)

| Campo | Valor |
|-------|-------|
| Escenarios Gherkin | PRD-US-017, 018, 019 · FSD-UC-015 |
| Métrica | `delivered_at - created_at` en `notification_outbox` |
| Eventos | rechazo, aprobación, plazo, nueva Evidencia |

### NFR-005 — Disponibilidad (≥ 99 %)

| Ventana | Lun–Sáb 07:00–22:00 (piloto; ajustar con TI UMSS) |
| Exclusiones | Mantenimiento anunciado ≤ 4 h/mes |

### NFR-006 a NFR-009 — Seguridad

| ID | Verificación adicional |
|----|------------------------|
| NFR-006 | Terminación TLS en reverse proxy institucional |
| NFR-007 | ADR-0001 storage; cifrado servidor-side buckets |
| NFR-008 | Tabla endpoint × rol en DTI; test 403 por rol |
| NFR-009 | [CC] carrera A no lee indicadores carrera B — test automatizado |

### NFR-010, NFR-011 — Usabilidad

| ID | Gherkin | Umbral |
|----|---------|--------|
| NFR-010 | PRD-US-005 (carga sin campo) | 100 % campos críticos con mensaje accionable |
| NFR-011 | PRD-US-025 | Umbral: **> 5 MB** (decisión PRD-Q-03 / BRD-REQ-025) |

### NFR-012 — WCAG 2.2 AA

| Alcance v1.1 | Login, carga Evidencia, bandeja [TD], panel [JD], formularios observación |
| Herramienta | axe-core en CI + muestreo manual teclado |

### NFR-014 — Trazabilidad BDD (regla QA)

| Campo | Valor |
|-------|-------|
| Gate CI | Job `traceability-check`: falla si `PRD-US-*` Must sin `@Tag` en `tests/` |
| Cobertura mínima | 100 % US Must (US-001–011, 021, 023 excl. 024 P2) |
| Referencia | `.cursor/rules/04_sigesa_qa_gherkin_coverage.mdc` |

### NFR-015 — Respaldo

| RPO | ≤ 24 h |
| RTO objetivo piloto | ≤ 8 h (negocio; detalle en DTI) |
| Evidencia verificación | Acta restore trimestral |

### NFR-016 — No-ERP

| Gate | Lista módulos en release notes; 0 referencias SIIS/RRHH/nómina |

---

## 4. NFRs transversales de dominio (obligatorios QA)

Derivados de BRD-CST-01, BRD-CST-03 y regla QA §2.3 (sad paths).

### NFR-017 — Inmutabilidad Evidencia (append-only)

| Campo | Valor |
|-------|-------|
| PRD-US | US-008 |
| FSD-UC | UC-005 |
| BRD | BRD-CST-01, BRD-RB-18 |
| DDL | `evidence_version` sin DELETE para app role |

**Escenario Gherkin de referencia (PRD):**

```gherkin
Escenario: Intento de eliminar Evidencia aprobada
  Dado una Evidencia en estado Aprobado
  Cuando un usuario intenta eliminarla físicamente
  Entonces el sistema rechaza la operación
  Y registra el intento en la bitácora de auditoría
  Y mantiene todas las versiones existentes
```

**Prueba automatizada:** `TC-SAD-001` — `DELETE /evidences/{id}` → `409 EVIDENCE_IMMUTABLE` + fila `audit_log`.

### NFR-018 — Máquina de estados

| TC | Escenario | PRD-US | FSD-UC |
|----|-----------|--------|--------|
| TC-SAD-002 | [CC] intenta cerrar Fase | US-011 | UC-010 |
| TC-SAD-003 | Rechazo sin justificación | US-009 | UC-008 |
| TC-SAD-004 | [CC] intenta aprobar Indicador | — | UC-009 (403) |

```gherkin
# TC-SAD-002 — derivado PRD-US-011
Escenario: Cierre de Fase bloqueado
  Dado una Fase con al menos un Indicador no Aprobado
  Cuando el [TD] intenta cerrar la Fase
  Entonces el sistema rechaza con FASE_CIERRE_BLOQUEADO
```

---

## 5. Catálogo de casos de prueba (TC) ↔ NFR

| TC ID | Tipo | NFR | PRD-US | FSD-UC | Descripción |
|-------|------|-----|--------|--------|-------------|
| TC-NFR-001 | Carga | NFR-001 | US-004 | UC-007 | k6 búsqueda p95 |
| TC-NFR-002 | UAT | NFR-002 | US-004 | UC-007 | Cronometría 10 tareas |
| TC-NFR-003 | E2E | NFR-003 | US-021 | UC-014 | PDF P95 |
| TC-NFR-004 | Integración | NFR-004 | US-017 | UC-015 | SLA outbox |
| TC-NFR-005 | Monitor | NFR-005 | — | — | Uptime mensual |
| TC-NFR-008 | API | NFR-008 | US-001 | UC-001 | Matriz RBAC |
| TC-NFR-009 | Seguridad | NFR-009 | US-012 | UC-011 | Aislamiento carrera |
| TC-NFR-014 | CI | NFR-014 | Must all | — | grep `@Tag("PRD-US-` |
| TC-SAD-001 | Negativo | NFR-017 | US-008 | UC-005 | DELETE bloqueado |
| TC-SAD-002 | Negativo | NFR-018 | US-011 | UC-010 | Cierre fase bloqueado |
| TC-SAD-003 | Negativo | NFR-018 | US-009 | UC-008 | Sin justificación |
| TC-SAD-005 | Negativo | NFR-008 | US-003 | UC-001 | Sin sesión 401 |

---

## 6. Matriz NFR → Gherkin → Implementación

| NFR | ¿Gherkin en PRD? | PRD-US / notas | ¿Sad path definido? |
|-----|-------------------|----------------|---------------------|
| NFR-001 | Indirecto | US-004 (tiempo en escenario) | — |
| NFR-002 | Sí | US-004 | — |
| NFR-003 | Sí | US-021 | — |
| NFR-004 | Sí | US-017, 018, 019 | — |
| NFR-005 | No (ops) | — | N/A infra |
| NFR-006–009 | Parcial | US-001, 003, 012 | US-003 sesión |
| NFR-010 | Sí | US-005 | carga inválida |
| NFR-011 | Sí | US-025 | — |
| NFR-012 | No (auditoría UX) | checklist FSD | — |
| NFR-013 | No | matriz manual | — |
| NFR-014 | Meta | todos Must | CI |
| NFR-015 | No (ops) | DTI runbook | — |
| NFR-016 | Gate documental | BRD-CST-07 | — |
| NFR-017 | Sí | US-008 | **TC-SAD-001** |
| NFR-018 | Sí | US-009, 011 | **TC-SAD-002/003** |
| NFR-019 | No | revisión legal | — |

**Cobertura Gherkin PRD Dorado:** 24/24 `PRD-US` con al menos un bloque `gherkin` — **cumple regla QA** para iniciar implementación.

---

## 7. Plantilla de cabecera para archivos de prueba

```typescript
/**
 * SIGESA — Pruebas automatizadas
 * @Tag("PRD-US-008")
 * @Tag("FSD-UC-005")
 * @Tag("NFR-017")
 * @Tag("TC-SAD-001")
 * BRD: BRD-CST-01 | Regla: 04_sigesa_qa_gherkin_coverage
 */
```

```gherkin
# language: es
@NFR-017 @PRD-US-008 @FSD-UC-005 @TC-SAD-001
Característica: Inmutabilidad de Evidencia aprobada
```

---

## 8. Auditoría de alineación (checklist regla QA)

| Criterio regla QA | Estado | Evidencia |
|-------------------|--------|-----------|
| Gherkin existe antes de código | Cumple | `docs/03_prd/PRD.md` §5 (24 US) |
| Tags PRD-US en tests planificados | Planificado | §7 plantilla; CI NFR-014 |
| Sad path DELETE / estados | Cumple | US-008, 009, 011, 003; §4 TC-SAD |
| Sin código sin criterio aceptación | Cumple (docs) | Pendiente aplicar en `src/` cuando exista |
| NFR con umbral numérico | Cumple | §2 (19 NFR) |
| ≥ 5 características ISO | Cumple | §1 (9 características) |

**Brechas menores (no bloquean documentación):**

| ID | Brecha | Acción |
|----|--------|--------|
| GAP-NFR-01 | NFR-005, 015 sin Gherkin (infra) | Runbook DTI + TC-OPS |
| GAP-NFR-02 | NFR-012 sin escenarios Gherkin UX | Añadir en PRD v1.1 o checklist manual |
| ~~GAP-NFR-03~~ | Umbral 5 MB | **Cerrado** — PRD-Q-03 |

---

## 9. Trazabilidad a artefactos Dorados

| Artefacto | Enlace |
|-----------|--------|
| PRD NFR | `docs/03_prd/PRD.md` §8 (`PRD-NFR-001`…`016`) |
| FSD pruebas | `docs/04_fsd/FSD.md` §12 |
| Matriz E2E | [`matriz_trazabilidad.md`](../../matriz_trazabilidad.md) |
| Modelo datos | [`docs/05_dti/modelo_datos.md`](../05_dti/modelo_datos.md) |
| Informe auditoría | [`docs/08_trazabilidad/report_findings.md`](../08_trazabilidad/report_findings.md) |

---

## 10. Registro de cambios

| Versión | Timestamp | Cambio |
|---------|-----------|--------|
| Dorada v1.0 | `2026-05-16T15:51:39-04:00` | Tabla inicial 16 NFR |
| **Dorada v1.1** | `2026-05-16T16:15:44-04:00` | QA Gherkin, NFR-017/018/019, catálogo TC, matriz cobertura |

---

## Control de versión (cierre)

| Campo | Valor |
|-------|-------|
| **Versión** | **Dorada v1.1** |
| **Timestamp** | `2026-05-16T16:15:44-04:00` |

*Próximo paso: implementar job CI `traceability-check` y suite `tests/features/nfr/` con TC-SAD-*.*
