# Auditoría de consistencia — Cadena Dorada vs MVP runtime (`app/`)

| Campo | Valor |
|-------|-------|
| **Versión** | v1.0 |
| **Timestamp** | `2026-05-28T17:30:00-04:00` |
| **Auditor** | Sesión alexAlvarez + agente Cursor |
| **Alcance** | BRD → MRD → PRD → NFR → FSD → DTI + ADRs + C4 → `app/sigesa-front` + `app/sigesa-backend` |
| **Trigger** | Actualización C4 (`c4-006`, `c4-007`, `c4-008`) y alineación documentación ↔ código MVP |

---

## 1. Veredicto ejecutivo

| Capa | ¿Consistente? | Notas |
|------|---------------|-------|
| **BRD → MRD → PRD** (negocio) | **Sí** | Cadena Dorada trazable; matriz v1.5 APTO (`report_findings.md`) |
| **PRD Must v1.0 → código MVP** | **Parcial** | MVP cubre ciclo CC/TD evidencia→dictamen; no cubre Must [JD], [P], alertas SMTP, PDF, FTS |
| **NFR P1 → código MVP** | **Parcial** | NFR-017/018 materializados; NFR-001/004/005/014 sin suite producto |
| **DTI lógico (cloud) → código** | **Parcial** | Dominio y hexagonal alineados; infra AWS sustituida por adaptadores dev |
| **C4 → código** | **Sí (post-fix)** | `c4-007` = runtime MVP; `c4-008` = target prod; drift legacy corregido 2026-05-28 |
| **ADRs → código** | **Parcial** | 0001, 0006, 0007, 0009, 0012, 0013 OK; 0010/0011 adaptadores dev; Notification pendiente |

**Conclusión:** La documentación de **negocio** es coherente entre sí. La **implementación MVP** es un subconjunto deliberado documentado en `api_contracts_mvp_runtime.md` y ahora en C4. No hay contradicción si se distingue **MVP runtime** vs **target v1.0 cloud**.

---

## 2. Cadena documental (BRD → MRD → PRD)

### 2.1 Alineación temática

| Tema | BRD | MRD | PRD | Estado |
|------|-----|-----|-----|--------|
| No-ERP / automatización acreditación | CST-07, §2.1 | §2.1 categoría | Constitution §0.1 | OK |
| Append-only Evidencia | REQ-007, CST-01 | MRD-N-03 | US-006, REQ-007 | OK |
| Roles [CC]/[TD]/[JD]/[P] | § stakeholders | Segmentos | US por rol | OK (PRD > MVP code) |
| Auth UMSS + RBAC | REQ-001, Q-02 | MRD-N-09 | US-001–003 | OK; MVP = adapter local |
| Observaciones + subsanación | REQ-008 | MRD-N-04 | US-006,009 | OK en código |
| Cierre Fase | REQ-009 | MRD-N-05 | US-011 | Parcial en código (orch webhook) |
| Alertas SMTP | REQ-011 | MRD-N-07 | US-017–019 | **Gap MVP** |
| Panel [JD] / PDF | REQ-010,012 | MRD-N-06,08 | US-013,021 | **Gap MVP** |

### 2.2 Trazabilidad formal

- `docs/09_trazabilidad/report_findings.md`: **APTO** (0 huérfanos ERROR Must en PRD↔FSD).
- Esta auditoría **no invalida** el gate documental; añade capa **implementación MVP**.

---

## 3. PRD / FSD Must vs implementación (`app/`)

### 3.1 Implementado (MVP CC + TD)

| PRD-US / FSD-UC | Funcionalidad | Evidencia código |
|-----------------|---------------|------------------|
| US-001 / UC-001 | Login JWT `@umss.edu.bo` | `AuthLoginUseCase`, `authStore` |
| US-005 / UC-004 | Carga Evidencia | `UploadEvidence`, `EvidenceUploader` |
| US-006 / UC-006 | Subsanación | Upload + `observationId`, evento `EvidenceSubsanated` |
| US-007 | Historial versiones | `ListEvidences`, `EvidenceList` |
| US-009 / UC-008 | Rechazo TD + motivo | `RejectIndicator`, `RejectModal` (≥20 chars) |
| US-010 / UC-009 | Aprobación TD | `ApproveIndicator` |
| US-012 / UC-012 | Dashboard CC | `CoordinatorHome`, `/cc/home`, `/cc/fases/*` |
| US-014 | Bandeja TD | `TechnicianDashboard`, `/td/dashboard` |
| US-011 / UC-010 | Cierre Fase | `HandleIndicatorApproved`, `PhaseCloseRule` (sin SQS) |

### 3.2 No implementado en MVP (documentado como fuera de alcance front)

| PRD-US | Gap | Documentación |
|--------|-----|---------------|
| US-002, US-023 | Admin [JD] usuarios/plantillas | PRD Must v1.0; fuera `sigesa-front/AGENTS.md` MVP |
| US-004 | Búsqueda FTS multifiltro | FSD-UC-007; sin endpoint en gateway |
| US-013, US-021 | Panel [JD], PDF | DTI §2.5 S4; `c4-008` |
| US-017–019 | Notificaciones SMTP | NFR-004; `notification_outbox` sin worker |
| US-024 | Import planilla | BRD-REQ-019 |
| Portal [P] | UC-018 | Sin rutas front |

---

## 4. NFR ISO 25010 vs código

| NFR | Requisito | MVP | Verificación |
|-----|-----------|-----|--------------|
| NFR-017 | Append-only | **OK** | Repos INSERT-only; tests audit |
| NFR-018 | Máquina estados | **OK** | `IndicatorStateMachine.test.ts` |
| NFR-008 | RBAC endpoints | **Parcial** | JWT middleware; solo CC/TD rutas UI |
| NFR-004 | Notificación ≤15 min | **No** | Sin Notification Service |
| NFR-001 | p95 GET <500ms | **No medido** | Sin k6/APM en repo app |
| NFR-014 | Tags tests ↔ PRD | **No** | Tests backend sin `@Tag` NFR |

---

## 5. DTI + ADRs + C4 vs código

### 5.1 Dos vistas C4 (post actualización)

| Diagrama | Rol | Alineación código |
|----------|-----|-------------------|
| [`c4-006`](../07_diagramas/c4-006-06-contexto-sistema.mmd) | Contexto MVP CC+TD | OK |
| [`c4-007`](../07_diagramas/c4-007-07-contenedores-sistema.mmd) | Runtime local `app/` | OK |
| [`c4-008`](../07_diagramas/c4-008-08-contenedores-produccion.mmd) | Target cloud v1.0 | Roadmap; no 100% código |

### 5.2 ADRs vs adaptadores

| ADR | Decisión | Código MVP | Prod target |
|-----|----------|------------|-------------|
| ADR-0001 | Append-only Evidence | OK | OK |
| ADR-0002 | Monolito modular | Supersedido | N/A |
| ADR-0003 | Auth local → LDAP | OK (`@umss.edu.bo` dev) | LDAP pendiente |
| ADR-0004 | Volumen Docker | Supersedido | N/A |
| ADR-0006 | PostgreSQL 16 | OK | OK |
| ADR-0007 | JWT + RBAC | OK | OK |
| ADR-0009 | Node + Express | OK (Node 22) | OK |
| ADR-0010 | EventBridge | **HttpWebhook** dev | EventBridge prod |
| ADR-0011 | SQS FIFO | **Webhook serial** | SQS prod |
| ADR-0012 | state_history | OK | OK |
| ADR-0013 | S3 blobs | OK (MinIO) | OK |

### 5.3 Por qué webhooks HTTP (documentado)

Ver [`hybrid_architecture.md` §2.6](../05_dti/hybrid_architecture.md): mismo `EventPublisherPort` y envelopes; adaptador dev evita AWS en laptop. **No** viola ADR-0010 a nivel de dominio.

---

## 6. Drifts corregidos en esta sesión

| Archivo | Antes | Después |
|---------|-------|---------|
| `c4-007-07-contenedores-sistema.mmd` | Monolito + volumen Docker | Microservicios MVP + MinIO + webhooks |
| `c4-006-06-contexto-sistema.mmd` | 4 actores + sin IdP explícito | MVP CC+TD + IdP dev/prod |
| `DTI.md` §2, §8 | Solo stack legacy | Dual MVP / target + §8.1/8.2 |
| `hybrid_architecture.md` | Solo EventBridge en texto | §2.6 adaptadores dev vs prod |
| `api_contracts_mvp_runtime.md` §11 | "monolito Dorada" | Tabla alineada a gateway/servicios |
| `docs/05_dti/07_diagramas/diag-*` | Copias duplicadas | Symlinks a canónico + `c4-008` |

---

## 7. Drifts pendientes (no bloqueantes para MVP)

| Ítem | Recomendación |
|------|---------------|
| `docs/roadmap.md` §3.3 cita monolito ADR-0002 | Añadir nota "supersedido por ADR-0010; MVP en microservicios" |
| Secuencias `seq-*` legacy endpoints | Ya documentado en `api_contracts_mvp_runtime.md` §11.2 — no reescribir en MVP |
| `AGENTS.md` stack React 18 | Opcional: "Next.js 16 en app/" |
| POCs Python vs app Node | POCs validan ADR-0003/0004; app es stack ADR-0009 — OK complementario |

---

## 8. Matriz resumen BRD → código (Must piloto CC/TD)

```text
BRD-REQ-005/006/008/009 ──► PRD-US-005..011 ──► FSD-UC-004..010 ──► DTI §2 + ADR-0010/012
        │                                                              │
        └──────────────────────────────────────────────────────────────┼──► app/ MVP OK
                                                                       │
BRD-REQ-011/012/010 ──► PRD alertas/JD/PDF ──► NFR-004 ──► c4-008 ──► app/ GAP
```

---

## 9. Registro

| Fecha | Cambio |
|-------|--------|
| 2026-05-28 | Primera auditoría MVP runtime; C4 actualizado; DTI §8 dual; hybrid §2.6 |
