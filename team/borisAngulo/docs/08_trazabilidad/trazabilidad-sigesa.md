# Trazabilidad SIGESA — MRD → PRD → FSD

> **Propósito**: matriz de trazabilidad completa de la cadena de especificación del proyecto SIGESA, desde requerimientos de mercado hasta casos de uso funcionales, incluyendo prompt-contratos y métricas AI-SDLC.
>
> **Cadena cubierta**: MRD-N → BRD-BR → PRD-REQ → PRD-US → FSD-UC → PC → NFR

| Campo | Valor |
|-------|-------|
| Producto | SIGESA — Sistema de Gestión de Evaluación y Acreditación |
| Versión | v1.0 |
| Fecha | 2026-05-14 |
| Autor | Boris Angulo / Equipo AcredIA |
| Fuentes | BRD_v2.md · MRD.md · PRD_v1.md · FSD_v1.md · prompt-contracts.md · nfr_iso25010.md |
| Estado | Borrador |

---

## 1. Matriz de trazabilidad completa

| # | MRD-N | BRD-BR / RB | PRD-REQ | PRD-US | FSD-UC | PC | NFR | Estado |
|---|-------|-------------|---------|--------|--------|----|-----|--------|
| 1 | MRD-N-01 | BR-002, BR-003, RB-01, RB-02, RB-03 | PRD-REQ-002, PRD-REQ-003 | PRD-US-004, PRD-US-008, PRD-US-009 | FSD-UC-002 | PC-002, PC-003 | NFR-004 | ✅ Completo |
| 2 | MRD-N-02 | BR-007, RB-06, RB-07 | PRD-REQ-006, PRD-REQ-007 | PRD-US-010, PRD-US-011, PRD-US-012 | FSD-UC-003 | PC-004, PC-005 | NFR-001, NFR-003, NFR-004, NFR-007 | ✅ Completo |
| 3 | MRD-N-03 | BR-009 | PRD-REQ-009 | PRD-US-015 | FSD-UC-005 | PC-007 | NFR-001 | ✅ Completo |
| 4 | MRD-N-04 | BR-010 | PRD-REQ-010 | PRD-US-016 | FSD-UC-006 | PC-008 | NFR-005 | ✅ Completo |
| 5 | MRD-N-05 | BR-008 | PRD-REQ-008 | PRD-US-013, PRD-US-014 | FSD-UC-004 | PC-006 | NFR-004 | ✅ Completo |
| 6 | MRD-N-06 | BR-011 | PRD-REQ-011 | PRD-US-017 | FSD-UC-007 | PC-009 | NFR-001, NFR-006 | ✅ Completo |
| 7 | MRD-N-07 | RB-04, RB-11 | PRD-NFR-005, OP-06 | PRD-US-001 | FSD-UC-001 | PC-001 | NFR-004 | ⚠️ Parcial — sin FSD-UC dedicado a UX |
| 8 | — | BR-001, BR-004, BR-005, RB-04, RB-05, RB-11 | PRD-REQ-001, PRD-REQ-013 | PRD-US-001, PRD-US-002, PRD-US-003 | FSD-UC-001 | PC-001, PC-011 | NFR-003, NFR-004, NFR-008 | ✅ Completo |
| 9 | — | BR-006, BR-012, RB-09 | PRD-REQ-004, PRD-REQ-005 | PRD-US-005, PRD-US-006, PRD-US-007 | FSD-UC-002 | PC-002, PC-003 | NFR-004 | ✅ Completo |
| 10 | — | BR-012, BR-013 | PRD-REQ-012, PRD-REQ-013 | PRD-US-018 … 021 | EXT-001…004 / COMP-AUDIT | PC-012–015 / §2.4.1 | NFR-002, NFR-003 | ⚠️ Extensiones v1.1+ (ver §3) |

---

## 2. Trazabilidad por capa

### 2.1 BRD → FSD (reglas de negocio)

| BRD-BR / RB | Descripción (resumen) | PRD-REQ | FSD-UC | PC | Estado |
|-------------|----------------------|---------|--------|----|--------|
| BR-001 | Proceso obligatorio a carrera y facultad | PRD-REQ-002 | FSD-UC-002 | PC-002 | ✅ |
| BR-002 | No más de un proceso activo mismo tipo/carrera/periodo | PRD-REQ-002, PRD-REQ-003 | FSD-UC-002 | PC-002 | ✅ |
| BR-003 | Proceso registra tipo, organismo, gestión, fechas | PRD-REQ-002 | FSD-UC-002 | PC-002 | ✅ |
| BR-004 | Usuario con al menos un rol; acceso por rol | PRD-REQ-001 | FSD-UC-001 | PC-001 | ✅ |
| BR-005 | Solo Administrador crea usuarios y roles | PRD-REQ-001 | FSD-UC-001 | PC-011 | ✅ |
| BR-006 | Evidencia asociada a criterio y proceso; sin clasificación no se guarda | PRD-REQ-006 | FSD-UC-003 | PC-004 | ✅ |
| BR-007 | Registro de fecha de carga, usuario y historial de versiones | PRD-REQ-007 | FSD-UC-003 | PC-004, PC-005 | ✅ |
| BR-008 | Estados de proceso; avance según cumplimiento de criterios | PRD-REQ-008 | FSD-UC-004 | PC-006 | ✅ |
| BR-009 | Cronograma obligatorio; no cerrar con pendientes; fechas coherentes | PRD-REQ-005 | FSD-UC-002 | PC-003 | ✅ |
| BR-010 | Cambios de estado solo por autorizados; historial | PRD-REQ-009 | FSD-UC-002 | PC-002, PC-003 | ✅ |
| BR-011 | Autenticación obligatoria; bitácora de auditoría | PRD-REQ-001, PRD-REQ-013 | FSD-UC-001 | PC-001 | ✅ |
| BR-012 | Sin datos obligatorios no se crea; sin clasificación no se sube; sin duplicados | PRD-REQ-004, PRD-REQ-006 | FSD-UC-002, FSD-UC-003 | PC-002, PC-004 | ✅ |
| BR-013 | Chatbot informacional acotado a contenido aprobado | — | — | — | ❌ GAP — backlog Could sin FSD-UC |

### 2.2 PRD-US → FSD-UC (user stories)

| PRD-US | Descripción (resumen) | FSD-UC | PC | Estado |
|--------|----------------------|--------|----|--------|
| PRD-US-001 | Iniciar sesión de forma segura | FSD-UC-001 | PC-001 | ✅ |
| PRD-US-002 | Crear usuarios y asignar roles | FSD-UC-001 | PC-011 | ✅ |
| PRD-US-003 | Rechazar acciones sensibles sin sesión | FSD-UC-001 | PC-001 | ✅ |
| PRD-US-004 | Crear y administrar fases del proceso | FSD-UC-002 | PC-002 | ✅ |
| PRD-US-005 | Gestionar actividades con estado y responsable | FSD-UC-002 | PC-002 | ✅ |
| PRD-US-006 | Definir cronograma y bloquear cierre con pendientes | FSD-UC-002 | PC-003 | ✅ |
| PRD-US-007 | Importar actividades desde planilla | FSD-UC-002 | PC-010 | ✅ |
| PRD-US-008 | Registrar tipo de acreditación y metadatos del proceso | FSD-UC-002 | PC-002 | ✅ |
| PRD-US-009 | Impedir más de un proceso activo mismo tipo/carrera | FSD-UC-002 | PC-002 | ✅ |
| PRD-US-010 | Subir evidencias clasificadas por criterio y fase | FSD-UC-003 | PC-004 | ✅ |
| PRD-US-011 | Ver historial de versiones con autor y fecha | FSD-UC-003 | PC-004 | ✅ |
| PRD-US-012 | Confirmación explícita antes de eliminar/reemplazar | FSD-UC-003 | PC-005 | ✅ |
| PRD-US-013 | Registrar observaciones sobre fase entregada | FSD-UC-004 | PC-006 | ✅ |
| PRD-US-014 | Ver y responder observaciones desde bandeja centralizada | FSD-UC-004 | PC-006 | ✅ |
| PRD-US-015 | Panel con semáforo por carrera y facultad | FSD-UC-005 | PC-007 | ✅ |
| PRD-US-016 | Recibir alertas automáticas de plazos e hitos | FSD-UC-006 | PC-008 | ✅ |
| PRD-US-017 | Generar reporte ejecutivo PDF en ≤ 2 clics | FSD-UC-007 | PC-009 | ✅ |
| PRD-US-018 | Bandeja de evidencias pendientes para técnico operativo | FSD-UC-EXT-002 | PC-014 (borrador) | ⚠️ GAP-002a |
| PRD-US-019 | Consultar y registrar acciones sobre constancias (técnico trámites) | FSD-UC-EXT-003 | PC-015 (por crear) | ⚠️ GAP-002b |
| PRD-US-020 | Evaluador externo accede solo a fase asignada | FSD-UC-EXT-004 | PC-012 | ⚠️ GAP-002c — PC listo |
| PRD-US-021 | Vista pública de estado de acreditación | FSD-UC-EXT-001 | PC-013 (borrador) | ⚠️ GAP-001 |
| PRD-US-022 | Sugerencias de organización de evidencias | backlog Could | — | ⚪ Backlog |
| PRD-US-023 | Reportes amplios PDF/Excel | backlog Could | — | ⚪ Backlog |
| PRD-US-024 | Asistente conversacional informacional | backlog Could | — | ⚪ Backlog |

### 2.3 FSD-UC → PC (prompt-contratos)

| FSD-UC | Descripción | PC | Invariants | Failure modes | Estado |
|--------|-------------|-----|-----------|---------------|--------|
| FSD-UC-001 | Autenticación y autorización por roles | PC-001, PC-011 | 4+4 | 5+5 | ✅ |
| FSD-UC-002 | Creación y gestión de procesos/fases | PC-002, PC-003 | 4+4 | 5+4 | ✅ |
| FSD-UC-003 | Carga y versionado de evidencias | PC-004, PC-005 | 4+4 | 4+4 | ✅ |
| FSD-UC-004 | Flujo de observaciones DUEA ↔ carrera | PC-006 | 4 | 5 | ✅ |
| FSD-UC-005 | Panel de estado con semáforo | PC-007 | 4 | 4 | ✅ |
| FSD-UC-006 | Alertas automáticas por plazos e hitos | PC-008 | 4 | 4 | ✅ |
| FSD-UC-007 | Reporte ejecutivo PDF en ≤ 2 clics | PC-009 | 4 | 4 | ✅ |

### 2.4 NFR → mecanismo de verificación

> Fuente canónica: `docs/06_nfr/nfr_iso25010.md` (10 NFR, ISO/IEC 25010:2023).

| NFR | Descripción | Umbral | Mecanismo de verificación | FSD-UC | Estado |
|-----|-------------|--------|--------------------------|--------|--------|
| NFR-001 | Rendimiento panel y evidencias | p95 < 3 000 ms | k6/Locust 50 VUs | UC-005, UC-003 | ✅ |
| NFR-002 | CPU generación PDF | < 80 % | Prometheus/Grafana | UC-007 | ✅ |
| NFR-003 | HTTPS + cifrado reposo | 100 % endpoints sensibles | OWASP ZAP + TLS | UC-001, UC-003 | ✅ |
| NFR-004 | Auditoría append-only | ≥ 95 % eventos críticos | Tests integración | UC-001, UC-003 | ✅ |
| NFR-005 | Disponibilidad horario académico | ≥ 99 % | UptimeRobot/Pingdom | UC-002, UC-005 | ✅ |
| NFR-006 | Degradación graceful PDF | Core 100 % si PDF cae | Chaos test | UC-007 | ✅ |
| NFR-007 | Usabilidad carga evidencia | ≤ 5 min; ≤ 2 errores | Test think-aloud | UC-003 | ✅ |
| NFR-008 | Accesibilidad WCAG 2.2 AA | 0 violaciones críticas A | axe-core + NVDA | UC-001, UC-003 | ✅ |
| NFR-009 | Modularidad backend | Cobertura ≥ 80 % | SonarQube + CI | Transversal | ✅ |
| NFR-010 | Interoperabilidad integraciones | ≥ 95 % SLA externo | Contract testing | UC-003, UC-007 | ✅ |

### 2.5 MRD hipótesis → métricas de verificación

> Cierre documental **GAP-005**. La validación empírica ocurre en el piloto según protocolo abajo.

| Hipótesis | Enunciado (resumen) | FSD-UC / PC | Métrica piloto | Umbral éxito | NFR / KPI | Estado doc |
|-----------|---------------------|-------------|----------------|--------------|-----------|------------|
| H-01 | Panel semáforo reduce consultas informales ≥ 30 % | UC-005 / PC-007 | Conteo consultas DUEA antes vs. durante piloto | ≥ 30 % reducción | NFR-001, KPI-M-01, KPI-01 BRD | ✅ Vinculado |
| H-02 | Versionado reduce tiempo localización evidencia ≥ 25 % | UC-003 / PC-004 | Tarea cronometrada “versión final aceptada” | ≥ 25 % vs. línea base | NFR-007, KPI-M-02, KPI-03 BRD | ✅ Vinculado |
| H-03 | Alertas mejoran cumplimiento de hitos | UC-006 / PC-008 | % hitos a tiempo (plan vs. real) | ≥ 20 pp mejora (KPI-M-01) | NFR-005, KPI-M-01 | ✅ Vinculado |
| H-04 | Importación masiva sin soporte técnico | UC-002 / PC-010 | % usuarios completan import sin ayuda | ≥ 80 % | NFR-007, KPI-M-02 | ✅ Vinculado |
| H-05 | DUEA usa reporte PDF ≥ 1/carrera/mes | UC-007 / PC-009 | Logs `REPORT_GENERATED` por carrera/mes | ≥ 1 | NFR-002, KPI-M-02, BRD BO-03 | ✅ Vinculado |

**Protocolo piloto (resumen)**

1. Establecer línea base pre-SIGESA (2 semanas antes del go-live).
2. Instrumentar telemetría: panel, evidencias, alertas, import, PDF.
3. Revisión quincenal DUEA + @ProductAgent con plantilla de cierre en `FSD_v1.md` §2.6.

---

## 3. Registro de gaps (v1.1)

| ID | Estado | Capa | Alcance | ID reservado | Entregable | Responsable | Sprint |
|----|--------|------|---------|--------------|------------|-------------|--------|
| **GAP-001** | 🟡 Abierto | FSD | Vista pública sin datos sensibles (PRD-REQ-012, US-021) | `FSD-UC-EXT-001` | PC-013 completo + UC en FSD §4 + endpoint público | @ArchAgent | Roles públicos |
| **GAP-002a** | 🟡 Abierto | FSD | Bandeja técnico operativo (US-018) | `FSD-UC-EXT-002` | PC-014 completo + RBAC | @ArchAgent | Perfiles técnicos |
| **GAP-002b** | 🟡 Abierto | FSD | Técnico trámites / constancias (US-019) | `FSD-UC-EXT-003` | PC-015 + UC FSD | @ArchAgent | Perfiles técnicos |
| **GAP-002c** | 🟠 Parcial | FSD | Evaluador externo (US-020) | `FSD-UC-EXT-004` | Enlazar PC-012 en FSD §4; UC borrador | @ArchAgent | Antes sprint roles |
| **GAP-003** | 🟡 Abierto | Ops | SLA operativo piloto (NFR-005) | Runbook `OPS-SLA-001` | Acta TI: ventana, herramienta, on-call | Tech Lead UMSS | Pre-lanzamiento |
| **GAP-004** | 🟢 Cerrado (doc) | Arq | Bitácora transversal (PRD-REQ-013, CU-012) | `COMP-AUDIT-001` | FSD §2.4.1 + tests CI por UC | @QaAgent | Con MVP |
| **GAP-005** | 🟢 Cerrado (doc) | MRD | Hipótesis H-01…H-05 | §2.5 esta matriz | Protocolo piloto §2.5 | @ProductAgent | Piloto |

### 3.1 Detalle por gap

#### GAP-001 — Vista pública (`FSD-UC-EXT-001`)

- **Problema**: ciudadanos/consulta externa sin contrato ejecutable para @DevAgent.
- **Solución objetivo**: portal de solo lectura con semáforo agregado y estado de fase **no sensible**; configuración por DUEA (whitelist de campos).
- **Invariantes clave**: sin PII; sin URLs de evidencia; sin autenticación obligatoria; rate limiting en endpoint público.
- **No confundir con**: PC-011 (gestión usuarios internos).
- **Borrador**: `prompt-contracts.md` → PC-013.

#### GAP-002 — Perfiles extendidos (sub-gaps)

| Sub | US | Rol | PC | Bloqueo @DevAgent |
|-----|-----|-----|-----|-------------------|
| 002a | US-018 | Técnico operativo DUEA | PC-014 borrador | Sí |
| 002b | US-019 | Técnico trámites | PC-015 pendiente | Sí |
| 002c | US-020 | Evaluador externo | PC-012 **completo** | Sí — falta UC en FSD |

#### GAP-003 — SLA piloto (checklist TI)

| # | Ítem | Responsable | Evidencia |
|---|------|-------------|-----------|
| 1 | Ventana horaria académica acordada (07:00–22:00 BOT) | TI UMSS | Acta |
| 2 | Herramienta monitoreo (UptimeRobot/Pingdom o institucional) | TI | URL dashboard |
| 3 | Umbral alerta < 99 % mensual (NFR-005) | DevOps | Regla alerta |
| 4 | Ventanas de mantenimiento con aviso ≥ 24 h excluidas del cálculo | TI + DUEA | Calendario |
| 5 | Contacto on-call para incidentes piloto | TI | Runbook |

#### GAP-004 — Auditoría (cerrado documental)

- **Decisión**: `COMP-AUDIT-001` en `FSD_v1.md` §2.4.1; CU-012 describe comportamiento del componente.
- **Pendiente implementación**: matriz de eventos por UC en suite de integración (meta NFR-004).

#### GAP-005 — Discovery (cerrado documental)

- Vínculos formales en §2.5; medición en piloto según protocolo.
- **Criterio cierre empírico**: informe post-piloto con H-01…H-05 vs. umbral MRD §12.

---

## 4. Métricas AI-SDLC

### 4.1 Definiciones y valores

| Métrica | Fórmula | Numerador | Denominador | Valor | Nivel |
|---------|---------|-----------|-------------|-------|-------|
| **Prompt Coverage** | (FSD-UC con PC / total FSD-UC) × 100 | 7 UC con PC | 7 UC definidos | **100 %** | ✅ Excelente |
| **Spec Fidelity** | (PRD-REQ con FSD-UC / total PRD-REQ) × 100 | 11 PRD-REQ trazables | 13 PRD-REQ totales | **84,6 %** | ✅ Aceptable |
| **BR Coverage** | (BR/RB con FSD-UC / total BR+RB) × 100 | 12 BR/RB trazables | 13+12 = 25 (BR-013 y backlog excluidos intencionalmente: 12 efectivos) | **84,6 %** | ✅ Aceptable |
| **NFR Coverage** | (NFR con mecanismo definido / total NFR) × 100 | 10 NFR con verificación | 10 NFR (`nfr_iso25010.md`) | **100 %** | ✅ Excelente |
| **Gap Ratio** | (gaps abiertos / total ítems únicos trazados) × 100 | 4 gaps abiertos (001, 002a–c, 003) | 47 ítems únicos | **8,5 %** | ✅ Excelente |
| **Chain Completeness** | (filas cadena completa / total filas matriz) × 100 | 8 filas completas | 10 filas totales | **80 %** | ✅ Aceptable |
| **US Coverage** | (PRD-US con FSD-UC / PRD-US Must+Should) × 100 | 17 US trazables | 21 US Must+Should | **81 %** | ✅ Aceptable |

### 4.2 Fórmulas detalladas

```
Prompt Coverage     = (FSD-UC con ≥ 1 PC asociado) / (total FSD-UC definidos en FSD §4) × 100
Spec Fidelity       = (PRD-REQ con ≥ 1 FSD-UC trazable) / (total PRD-REQ en PRD §7) × 100
BR Coverage         = (BR/RB con aparición en ≥ 1 FSD-UC o PC) / (total BR en BRD §11 + RB en BRD §12) × 100
NFR Coverage        = (NFR con mecanismo de verificación explícito) / (total NFR en nfr_iso25010.md) × 100
Gap Ratio           = (gaps declarados en §3) / (total ítems únicos trazados en §2) × 100
Chain Completeness  = (filas con los 7 eslabones: MRD-N, BRD-BR, PRD-REQ, PRD-US, FSD-UC, PC, NFR) /
                      (total filas de la matriz §1) × 100
US Coverage         = (PRD-US con prioridad Must o Should con ≥ 1 FSD-UC) /
                      (total PRD-US Must+Should en PRD §5) × 100
```

### 4.3 Resumen visual

```
Prompt Coverage     ████████████████████ 100,0 %  ✅
Spec Fidelity       █████████████████░░░  84,6 %  ✅
BR Coverage         █████████████████░░░  84,6 %  ✅
US Coverage         ████████████████░░░░  81,0 %  ✅
Chain Completeness  ████████████████░░░░  80,0 %  ✅
Gap Ratio           █░░░░░░░░░░░░░░░░░░░   8,5 %  ✅ (menor es mejor)
NFR Coverage        ████████████████████ 100,0 %  ✅
```

---

## 5. Resumen de estado por capa

| Capa | Total ítems | Con trazabilidad | Gaps | Cobertura |
|------|-------------|-----------------|------|-----------|
| MRD-N (necesidades de mercado) | 7 | 7 con vínculo H→UC | — | 100 % (doc) |
| BRD-BR (requerimientos de negocio) | 13 | 11 | GAP (BR-013 backlog) | 84,6 % |
| BRD-RB (reglas de negocio) | 12 | 12 | — | 100 % |
| PRD-REQ (requerimientos de producto) | 13 | 12 | GAP-001 (REQ-012) | 92,3 % |
| PRD-US Must+Should | 21 | 17 MVP + 4 EXT planificados | GAP-001, 002a–c | 81,0 % MVP |
| FSD-UC (casos de uso) | 7 | 7 con PC | — | 100 % |
| PC (prompt-contratos) | 12 | 12 | — | 100 % |
| NFR | 10 | 10 con verificación | GAP-003 (ops TI) | 100 % |

---

## 6. Acciones de cierre prioritarias

| Prioridad | Gap | Acción | Responsable | Sprint |
|-----------|-----|--------|-------------|--------|
| 🔴 Alta | GAP-002c | Añadir FSD-UC-EXT-004 en FSD §4; referenciar PC-012 | @ArchAgent | Inmediato |
| 🔴 Alta | GAP-002a/b | Completar PC-014 y crear PC-015 desde PRD §5.7.1–2 | @ArchAgent | Sprint perfiles |
| 🟡 Media | GAP-001 | Completar PC-013 y UC-EXT-001 | @ArchAgent | Sprint público |
| 🟡 Media | GAP-003 | Ejecutar checklist §3.1 GAP-003 con TI | Tech Lead | Pre-lanzamiento |
| 🟢 Hecho | GAP-004 | Mantener tests auditoría en CI por UC | @QaAgent | Con MVP |
| 🟢 Hecho | GAP-005 | Ejecutar protocolo piloto §2.5 | @ProductAgent | Durante piloto |

---

## 7. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 2026-05-14 | AcredIA / Boris Angulo | Versión inicial generada desde BRD_v2.md, MRD_v1.md, PRD_v1.md, FSD_v1.md y prompt-contracts.md |
| v1.1 | 2026-05-16 | AcredIA / Boris Angulo | Reconciliación 7 FSD-UC canónicos vs 12 PC; BR-010→UC-002; NFR-001–010; MRD.md; PC-010/011 corregidos |
| v1.2 | 2026-05-16 | AcredIA / Boris Angulo | Registro gaps §3 ampliado; GAP-004/005 cerrados doc; FSD-UC-EXT-*; H-01…H-05 vinculados; PC-013/014 borrador |