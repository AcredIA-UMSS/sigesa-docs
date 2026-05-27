# AGENTS.md — SIGESA Frontend (`sigesa-front`)

> Guía para agentes y desarrolladores que trabajan en este paquete.
> Contrato activo: **[PC-SIG-FE-MVP]** · Skill: `sigesa-frontend-engineer`

---

## 1. Propósito del paquete

SPA **Next.js** que implementa el **MVP** de SIGESA (UMSS):

| Actor | Flujo MVP | Pantalla Figma (referencia) |
|-------|-----------|----------------------------|
| **[CC]** Coordinador de Carrera | Carga de evidencias y subsanaciones | `cc-coordinador-home`, modales upload/observado |
| **[TD]** Técnico DUEA | Bandeja de auditoría: aprobar / rechazar (observación) | `td-bandeja-tareas` |

**Fuera de alcance MVP:** perfil, reportes históricos, portal público [P], panel [JD], configuración admin.

---

## 2. Plan de implementación seguido

### Fase 0 — Contexto y decisiones

1. Leer contratos API y ADRs antes de codificar:
   - `docs/05_dti/api_contracts_cloud.md` → **canónico** (Evidence + Audit)
   - `docs/04_fsd/api_contracts.md` → dashboards (`/dashboard/coordinator`, `/dashboard/technician`)
   - `docs/05_dti/adrs/ADR_001_append_only_evidencia.md`
   - `docs/05_dti/adrs/ADR_007_jwt_rbac.md`
   - `docs/05_dti/adrs/ADR_010_event_driven_choreography.md`
2. Glosario y máquina de estados:
   - `team/alexAlvarez/docs/context/03_domain_glossary.md`
   - `team/alexAlvarez/docs/context/04_state_machine.md`
3. Diseño visual (estructura, no pixel-perfect en MVP):
   - `figma/frames/prototipo/README.md` y frames P0 exportados

**Decisión arquitectónica:** adoptar **api_contracts_cloud.md** para mutaciones críticas; FSD solo para lecturas agregadas de dashboard. El backend es **event-driven** (EventBridge): la UI **no asume** cambio de estado inmediato tras POST.

**Decisión async MVP:** **React Query polling 30s** en dashboards y observaciones (sin WebSocket en v1.0). Invalidación explícita tras mutaciones exitosas.

### Fase 1 — Fundación

| Paso | Artefacto | Ruta |
|------|-----------|------|
| 1.1 | Proyecto Next.js 16 + TS estricto + Tailwind 4 | raíz del paquete |
| 1.2 | Cliente HTTP (JWT, Idempotency-Key, 50 MB, errores API) | `src/lib/httpClient.ts` |
| 1.3 | Entidades de dominio (sin `any`) | `src/domain/entities/` |
| 1.4 | Stores Zustand (auth sessionStorage, UI modals) | `src/store/` |
| 1.5 | Providers React Query | `src/app/providers.tsx` |

### Fase 2 — Capa de servicios (hexagonal en cliente)

| Servicio | Endpoints principales | Archivo |
|----------|----------------------|---------|
| Evidence | `POST/GET /indicators/{id}/evidences` | `features/evidences/services/evidenceApi.ts` |
| Audit | `POST /approve`, `POST /reject`, `GET /observations` | `features/observations/services/auditApi.ts` |
| Dashboard | `GET /dashboard/coordinator`, `GET /dashboard/technician` | `features/dashboard/services/dashboardApi.ts` |
| Auth | `POST /auth/login` | `features/auth/services/authApi.ts` |

### Fase 3 — Hooks (lógica fuera de `.tsx`)

| Hook | Responsabilidad |
|------|-----------------|
| `useEvidence` | Listado versiones (staleTime 0 — URLs S3 expiran) |
| `useEvidenceUpload` | Upload + invalidate + notificación "pendiente confirmación" |
| `useObservation` | Lista observaciones + polling 30s |
| `useApproveIndicator` / `useRejectIndicator` | Solo rol `DueaTechnician`; invalidate dashboards |
| `useCoordinatorDashboard` / `useTechnicianDashboard` | Polling 30s |
| `useLogin` | JWT en sessionStorage + redirect por rol |

### Fase 4 — Componentes UI (Clean UI)

| Componente | Rol | Notas |
|------------|-----|-------|
| `EvidenceUploader` | CC | Modal; validación 50 MB; `observationId` si subsanación |
| `EvidenceList` | CC/TD | Descarga vía URL prefirmada (no cachear) |
| `ObservationList` | CC | CTA subsanar |
| `CoordinatorHome` | CC | KPIs + lista indicadores expandible |
| `TechnicianDashboard` | TD | Bandeja SUBIDO/SUBSANADO |
| `IndicatorReviewCard` | TD | Aprobar / RejectModal |
| `RejectModal` | TD | `reason` ≥ 20 chars |
| `ProtectedRoute` | — | RBAC por `SIGESARole` |

### Fase 5 — Rutas App Router

| Ruta | Archivo |
|------|---------|
| `/` | Redirect según sesión → `/login` o dashboard |
| `/login` | `src/app/login/page.tsx` |
| `/cc/home` | `src/app/cc/home/page.tsx` |
| `/td/dashboard` | `src/app/td/dashboard/page.tsx` |
| `/unauthorized` | `src/app/unauthorized/page.tsx` |

### Fase 6 — Verificación

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build` (requiere red si usa fuentes Google; layout usa fuentes del sistema)

---

## 3. Directivas no negociables

### 3.1 Append-Only (ADR_001)

- **Prohibido** en UI: `deleteEvidence`, `updateIndicator`, `DELETE /evidences`, `PUT` con `status` en body.
- **Permitido:** `POST /indicators/{id}/evidences` (nueva versión), `POST /approve`, `POST /reject`.

### 3.2 UX event-driven (ADR_010)

Tras upload o mutación:

1. Mostrar feedback inmediato ("Procesando…" / "Pendiente de confirmación del servidor").
2. **No** marcar indicador como `APROBADO` / `SUBSANADO` hasta refetch/polling.
3. Invalidar queries relacionadas; confiar en polling 30s para dashboards.

### 3.3 Reglas duras API (front_generator.prompt.md)

| Regla | Implementación |
|-------|----------------|
| Archivos ≤ 50 MB | `MAX_FILE_SIZE` en `httpClient.ts` + validación en `EvidenceUploader` |
| `Idempotency-Key` en POST | `withIdempotencyKey()` en `apiPost` / `apiPostFormData` |
| URLs S3 (15 min) | `staleTime: 0` en `useEvidence`; no `localStorage` para URLs |

### 3.4 RBAC (ADR_007)

| Rol JWT | Glosario | Rutas MVP |
|---------|----------|-----------|
| `ProgramCoordinator` | [CC] | `/cc/home` |
| `DueaTechnician` | [TD] | `/td/dashboard` |
| `DueaAdministrator` | [JD] | `/unauthorized` (MVP) |

Guardias centralizadas: `shared/utils/rbac.ts`, `ProtectedRoute`, checks en hooks approve/reject.

### 3.5 Clean UI

- Los `.tsx` **no** llaman `fetch` directo.
- Patrón: `component → hook → service → httpClient`.

---

## 4. Árbol de directorios (referencia)

```
src/
├── app/                    # App Router (páginas)
├── domain/entities/        # Process, Indicator, Evidence, Observation, User
├── features/
│   ├── auth/
│   ├── evidences/
│   ├── observations/
│   └── dashboard/
├── shared/
│   ├── constants/roles.ts
│   ├── layout/AppShell.tsx
│   ├── ui/                 # Button, Spinner, StateBadge, NotificationBar
│   └── utils/              # rbac.ts, stateColors.ts
├── store/                  # authStore, uiStore
└── lib/httpClient.ts
```

---

## 5. STOP CONDITIONS (detener y preguntar al usuario)

1. Endpoint no documentado en `api_contracts_cloud.md` ni `api_contracts.md`.
2. Flujo Figma contradice `04_state_machine.md`.
3. Petición de operación destructiva o rol sin permiso (ej. CC aprueba indicador).

---

## 6. Formato de salida al generar código

Cada entrega con código debe encabezar:

```markdown
## Control de versión - Frontend Artifact
| Campo | Valor |
|-------|-------|
| **Contrato** | [PC-SIG-FE-MVP] Frontend Engineer MVP |
| **Skill Activo** | `sigesa-frontend-engineer` |
| **Componente** | … |
| **Ruta Exacta** | `app/sigesa-front/…` |
| **Estado** | 🟡 PENDIENTE DE REVISIÓN |
```

---

## 7. Documentación externa (repo padre)

| Documento | Ruta desde raíz `sigesa-docs` |
|-----------|-------------------------------|
| Contrato cloud API | `docs/05_dti/api_contracts_cloud.md` |
| Contrato FSD API | `docs/04_fsd/api_contracts.md` |
| Prompt MVP frontend | `.cursor/prompts/front_generator.prompt.md` |
| Skill Lead FE | `.cursor/skills/sigesa-frontend-engineer/SKILL.md` |
| Figma prototipo | `figma/frames/prototipo/` |

---

## 8. Próximos pasos sugeridos (post-MVP)

- [ ] Alinear `/login` con frame Figma `auth-login`
- [ ] Mock API / MSW para desarrollo sin backend
- [ ] WebSocket o SSE cuando el backend exponga canal de eventos
- [ ] Pantallas P0 faltantes: `cc-observaciones`, modales upload dedicados

---

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
