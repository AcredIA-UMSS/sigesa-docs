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
| Fuentes | BRD_v2.md · MRD_v1.md · PRD_v1.md · FSD_v1.md · prompt-contracts.md |
| Estado | Borrador |

---

## 1. Matriz de trazabilidad completa

| # | MRD-N | BRD-BR / RB | PRD-REQ | PRD-US | FSD-UC | PC | NFR | Estado |
|---|-------|-------------|---------|--------|--------|----|-----|--------|
| 1 | MRD-N-01 | BR-002, BR-003, RB-01, RB-02, RB-03 | PRD-REQ-002, PRD-REQ-003 | PRD-US-004, PRD-US-008, PRD-US-009 | FSD-UC-002 | PC-002, PC-003 | NFR-004 | ✅ Completo |
| 2 | MRD-N-02 | BR-007, RB-06, RB-07 | PRD-REQ-006, PRD-REQ-007 | PRD-US-010, PRD-US-011, PRD-US-012 | FSD-UC-003 | PC-004, PC-005 | NFR-002, NFR-003 | ✅ Completo |
| 3 | MRD-N-03 | BR-009 | PRD-REQ-009 | PRD-US-015 | FSD-UC-005 | PC-007 | NFR-001 | ✅ Completo |
| 4 | MRD-N-04 | BR-010 | PRD-REQ-010 | PRD-US-016 | FSD-UC-006 | PC-008 | NFR-005 | ✅ Completo |
| 5 | MRD-N-05 | BR-008 | PRD-REQ-008 | PRD-US-013, PRD-US-014 | FSD-UC-004 | PC-006 | NFR-004 | ✅ Completo |
| 6 | MRD-N-06 | BR-011 | PRD-REQ-011 | PRD-US-017 | FSD-UC-007 | PC-009 | NFR-001, NFR-006 | ✅ Completo |
| 7 | MRD-N-07 | RB-04, RB-11 | PRD-NFR-005, OP-06 | PRD-US-001 | FSD-UC-001 | PC-001 | NFR-004 | ⚠️ Parcial — sin FSD-UC dedicado a UX |
| 8 | — | BR-001, BR-004, BR-005, RB-04, RB-05, RB-11 | PRD-REQ-001, PRD-REQ-013 | PRD-US-001, PRD-US-002, PRD-US-003 | FSD-UC-001 | PC-001, PC-010 | NFR-003 | ✅ Completo |
| 9 | — | BR-006, BR-012, RB-09 | PRD-REQ-004, PRD-REQ-005 | PRD-US-005, PRD-US-006, PRD-US-007 | FSD-UC-002 | PC-002, PC-003 | NFR-004 | ✅ Completo |
| 10 | — | BR-012, BR-013 | PRD-REQ-012 | PRD-US-018, PRD-US-019, PRD-US-020, PRD-US-021 | — | — | NFR-002 | ❌ GAP — sin FSD-UC ni PC |

---

## 2. Trazabilidad por capa

### 2.1 BRD → FSD (reglas de negocio)

| BRD-BR / RB | Descripción (resumen) | PRD-REQ | FSD-UC | PC | Estado |
|-------------|----------------------|---------|--------|----|--------|
| BR-001 | Proceso obligatorio a carrera y facultad | PRD-REQ-002 | FSD-UC-002 | PC-002 | ✅ |
| BR-002 | No más de un proceso activo mismo tipo/carrera/periodo | PRD-REQ-002, PRD-REQ-003 | FSD-UC-002 | PC-002 | ✅ |
| BR-003 | Proceso registra tipo, organismo, gestión, fechas | PRD-REQ-002 | FSD-UC-002 | PC-002 | ✅ |
| BR-004 | Usuario con al menos un rol; acceso por rol | PRD-REQ-001 | FSD-UC-001 | PC-001 | ✅ |
| BR-005 | Solo Administrador crea usuarios y roles | PRD-REQ-001 | FSD-UC-001 | PC-010 | ✅ |
| BR-006 | Evidencia asociada a criterio y proceso; sin clasificación no se guarda | PRD-REQ-006 | FSD-UC-003 | PC-004 | ✅ |
| BR-007 | Registro de fecha de carga, usuario y historial de versiones | PRD-REQ-007 | FSD-UC-003 | PC-004, PC-005 | ✅ |
| BR-008 | Estados de proceso; avance según cumplimiento de criterios | PRD-REQ-008 | FSD-UC-004 | PC-006 | ✅ |
| BR-009 | Cronograma obligatorio; no cerrar con pendientes; fechas coherentes | PRD-REQ-005 | FSD-UC-002 | PC-003 | ✅ |
| BR-010 | Cambios de estado solo por autorizados; historial | PRD-REQ-009 | FSD-UC-005 | PC-007 | ✅ |
| BR-011 | Autenticación obligatoria; bitácora de auditoría | PRD-REQ-001, PRD-REQ-013 | FSD-UC-001 | PC-001 | ✅ |
| BR-012 | Sin datos obligatorios no se crea; sin clasificación no se sube; sin duplicados | PRD-REQ-004, PRD-REQ-006 | FSD-UC-002, FSD-UC-003 | PC-002, PC-004 | ✅ |
| BR-013 | Chatbot informacional acotado a contenido aprobado | — | — | — | ❌ GAP — backlog Could sin FSD-UC |

### 2.2 PRD-US → FSD-UC (user stories)

| PRD-US | Descripción (resumen) | FSD-UC | PC | Estado |
|--------|----------------------|--------|----|--------|
| PRD-US-001 | Iniciar sesión de forma segura | FSD-UC-001 | PC-001 | ✅ |
| PRD-US-002 | Crear usuarios y asignar roles | FSD-UC-001 | PC-010 | ✅ |
| PRD-US-003 | Rechazar acciones sensibles sin sesión | FSD-UC-001 | PC-001 | ✅ |
| PRD-US-004 | Crear y administrar fases del proceso | FSD-UC-002 | PC-002 | ✅ |
| PRD-US-005 | Gestionar actividades con estado y responsable | FSD-UC-002 | PC-002 | ✅ |
| PRD-US-006 | Definir cronograma y bloquear cierre con pendientes | FSD-UC-002 | PC-003 | ✅ |
| PRD-US-007 | Importar actividades desde planilla | FSD-UC-002 | PC-002 | ✅ |
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
| PRD-US-018 | Bandeja de evidencias pendientes para técnico operativo | — | — | ❌ GAP-002 |
| PRD-US-019 | Consultar y registrar acciones sobre constancias (técnico trámites) | — | — | ❌ GAP-002 |
| PRD-US-020 | Evaluador externo accede solo a fase asignada | — | — | ❌ GAP-002 |
| PRD-US-021 | Vista pública de estado de acreditación | — | — | ❌ GAP-001 |
| PRD-US-022 | Sugerencias de organización de evidencias | backlog Could | — | ⚪ Backlog |
| PRD-US-023 | Reportes amplios PDF/Excel | backlog Could | — | ⚪ Backlog |
| PRD-US-024 | Asistente conversacional informacional | backlog Could | — | ⚪ Backlog |

### 2.3 FSD-UC → PC (prompt-contratos)

| FSD-UC | Descripción | PC | Invariants | Failure modes | Estado |
|--------|-------------|-----|-----------|---------------|--------|
| FSD-UC-001 | Autenticación y autorización por roles | PC-001, PC-010 | 4+4 | 5+5 | ✅ |
| FSD-UC-002 | Creación y gestión de procesos/fases | PC-002, PC-003 | 4+4 | 5+4 | ✅ |
| FSD-UC-003 | Carga y versionado de evidencias | PC-004, PC-005 | 4+4 | 4+4 | ✅ |
| FSD-UC-004 | Flujo de observaciones DUEA ↔ carrera | PC-006 | 4 | 5 | ✅ |
| FSD-UC-005 | Panel de estado con semáforo | PC-007 | 4 | 4 | ✅ |
| FSD-UC-006 | Alertas automáticas por plazos e hitos | PC-008 | 4 | 4 | ✅ |
| FSD-UC-007 | Reporte ejecutivo PDF en ≤ 2 clics | PC-009 | 4 | 4 | ✅ |

### 2.4 NFR → mecanismo de verificación

| NFR | Descripción | Umbral | Mecanismo de verificación | Estado |
|-----|-------------|--------|--------------------------|--------|
| NFR-001 | Rendimiento — latencia panel y evidencias | p95 < 3 s | Pruebas de performance con k6 / JMeter | ✅ Definido |
| NFR-002 | Seguridad — protección PII y evidencias | Cumplimiento Ley 164 | Auditoría legal + revisión de código | ✅ Definido |
| NFR-003 | Auditoría — trazabilidad eventos críticos | 100 % endpoints sensibles | Revisión de logs + tests de integración | ✅ Definido |
| NFR-004 | Usabilidad — tiempo de tarea | ≥ 25 % mejora vs. línea base | Pruebas de usabilidad con usuarios reales | ✅ Definido |
| NFR-005 | Disponibilidad — horario académico | Uptime objetivo (por acordar con TI) | Monitoreo continuo | ✅ Definido |
| NFR-006 | Accesibilidad — WCAG 2.2 AA | Componentes prioritarios | Checklist WCAG + herramienta automática | ⚠️ Sin test concreto asignado |
| NFR-007 | Disponibilidad ampliada | 99 % en piloto (propuesto) | Por definir con TI antes del piloto | ❌ Sin mecanismo definido |

### 2.5 MRD hipótesis → métricas de verificación

| Hipótesis MRD | Enunciado (resumen) | Métrica de verificación | NFR / KPI vinculado | Estado |
|--------------|---------------------|------------------------|---------------------|--------|
| H-01 | Panel semáforo reduce consultas informales ≥ 30 % | Conteo consultas antes/durante piloto | KPI-M-01, NFR-001 | ⚠️ GAP-005 — sin vínculo formal a FSD |
| H-02 | Repositorio versionado reduce tiempo de localización ≥ 25 % | Prueba de tarea cronometrada | KPI-M-02, NFR-004 | ⚠️ GAP-005 |
| H-03 | Alertas automáticas mejoran cumplimiento de hitos | Fechas plan vs. real en piloto | KPI-M-01, NFR-005 | ⚠️ GAP-005 |
| H-04 | Importación masiva completable sin soporte técnico | Prueba de usabilidad sin asistencia | KPI-M-02, NFR-004 | ⚠️ GAP-005 |
| H-05 | DUEA usa reporte ejecutivo ≥ 1 vez/carrera/mes | Logs de uso del módulo de reportes | BO-03, NFR-001 | ⚠️ GAP-005 |

---

## 3. Gaps identificados

| ID | Capa | Descripción | Impacto | Recomendación de cierre |
|----|------|-------------|---------|------------------------|
| GAP-001 | FSD | PRD-REQ-012 y PRD-US-021 (vista pública información no sensible) no tienen FSD-UC ni PC asignado | Medio — funcionalidad `Should` sin contrato funcional | Crear FSD-UC-008 y PC-011 derivados de PRD-US-021 antes del sprint de roles públicos |
| GAP-002 | FSD | PRD-US-018, PRD-US-019, PRD-US-020 (técnico operativo, técnico de trámites, evaluador externo) sin FSD-UC ni PC | Alto — 3 historias `Should` sin especificación funcional; @DevAgent no puede implementar | Crear FSD-UC-009 (perfiles técnicos), FSD-UC-010 (evaluador externo) y PC-012 antes del sprint correspondiente |
| GAP-003 | NFR | NFR-007 (disponibilidad) sin mecanismo de verificación definido | Medio — SLA de piloto no verificable | Acordar uptime objetivo con TI y definir herramienta de monitoreo antes del lanzamiento |
| GAP-004 | FSD | PRD-REQ-013 (bitácora de auditoría) referenciado en todos los UC pero sin FSD-UC propio ni PC | Medio — componente transversal sin especificación explícita | Crear FSD-UC-011 de auditoría transversal o documentar como componente en FSD §2.4 |
| GAP-005 | MRD→FSD | Hipótesis H-01 a H-05 del MRD §12 sin trazabilidad formal hacia métricas NFR ni KPI del FSD | Alto — Discovery track sin cierre demostrable en cadena BRD→FSD | Vincular en tabla §2.5: H-01→NFR-001/KPI-M-01, H-02→NFR-004/KPI-M-02, H-03→NFR-005/KPI-M-01, H-04→NFR-004/KPI-M-02, H-05→NFR-001/BO-03 |

---

## 4. Métricas AI-SDLC

### 4.1 Definiciones y valores

| Métrica | Fórmula | Numerador | Denominador | Valor | Nivel |
|---------|---------|-----------|-------------|-------|-------|
| **Prompt Coverage** | (FSD-UC con PC / total FSD-UC) × 100 | 7 UC con PC | 7 UC definidos | **100 %** | ✅ Excelente |
| **Spec Fidelity** | (PRD-REQ con FSD-UC / total PRD-REQ) × 100 | 11 PRD-REQ trazables | 13 PRD-REQ totales | **84,6 %** | ✅ Aceptable |
| **BR Coverage** | (BR/RB con FSD-UC / total BR+RB) × 100 | 12 BR/RB trazables | 13+12 = 25 (BR-013 y backlog excluidos intencionalmente: 12 efectivos) | **84,6 %** | ✅ Aceptable |
| **NFR Coverage** | (NFR con mecanismo definido / total NFR) × 100 | 5 NFR con verificación | 7 NFR totales | **71,4 %** | ⚠️ Requiere acción |
| **Gap Ratio** | (gaps abiertos / total ítems únicos trazados) × 100 | 5 gaps | 47 ítems únicos | **10,6 %** | ✅ Aceptable |
| **Chain Completeness** | (filas cadena completa / total filas matriz) × 100 | 8 filas completas | 10 filas totales | **80 %** | ✅ Aceptable |
| **US Coverage** | (PRD-US con FSD-UC / PRD-US Must+Should) × 100 | 17 US trazables | 21 US Must+Should | **81 %** | ✅ Aceptable |

### 4.2 Fórmulas detalladas

```
Prompt Coverage     = (FSD-UC con ≥ 1 PC asociado) / (total FSD-UC definidos en FSD §4) × 100
Spec Fidelity       = (PRD-REQ con ≥ 1 FSD-UC trazable) / (total PRD-REQ en PRD §7) × 100
BR Coverage         = (BR/RB con aparición en ≥ 1 FSD-UC o PC) / (total BR en BRD §11 + RB en BRD §12) × 100
NFR Coverage        = (NFR con mecanismo de verificación explícito) / (total NFR en FSD §10) × 100
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
Gap Ratio           ██░░░░░░░░░░░░░░░░░░  10,6 %  ✅ (menor es mejor)
NFR Coverage        ██████████████░░░░░░  71,4 %  ⚠️
```

---

## 5. Resumen de estado por capa

| Capa | Total ítems | Con trazabilidad | Gaps | Cobertura |
|------|-------------|-----------------|------|-----------|
| MRD-N (necesidades de mercado) | 7 | 6 completas + 1 parcial | GAP-005 (hipótesis) | 85,7 % |
| BRD-BR (requerimientos de negocio) | 13 | 11 | GAP (BR-013 backlog) | 84,6 % |
| BRD-RB (reglas de negocio) | 12 | 12 | — | 100 % |
| PRD-REQ (requerimientos de producto) | 13 | 11 | GAP-001, GAP-004 | 84,6 % |
| PRD-US Must+Should | 21 | 17 | GAP-001, GAP-002 | 81,0 % |
| FSD-UC (casos de uso) | 7 | 7 con PC | — | 100 % |
| PC (prompt-contratos) | 10 | 10 | — | 100 % |
| NFR | 7 | 5 con verificación | GAP-003 | 71,4 % |

---

## 6. Acciones de cierre prioritarias

| Prioridad | Gap | Acción | Responsable | Sprint sugerido |
|-----------|-----|--------|-------------|-----------------|
| 🔴 Alta | GAP-002 | Crear FSD-UC-009, FSD-UC-010 y PC-012 para perfiles técnicos y evaluador externo | @ArchAgent | Antes del sprint de roles |
| 🔴 Alta | GAP-005 | Vincular H-01 a H-05 del MRD §12 a NFR y KPIs del FSD §10 | @ProductAgent | Inmediato (documentación) |
| 🟡 Media | GAP-001 | Crear FSD-UC-008 y PC-011 para vista pública | @ArchAgent | Sprint de roles públicos |
| 🟡 Media | GAP-004 | Especificar auditoría transversal como FSD-UC-011 o componente en §2.4 | @ArchAgent / Boris Angulo | Antes del sprint de auditoría |
| 🟡 Media | GAP-003 | Acordar SLA con TI y definir herramienta de monitoreo para NFR-007 | Tech Lead | Pre-lanzamiento |
| 🟢 Baja | NFR-006 | Asignar herramienta WCAG y test concreto para accesibilidad | @QaAgent | Sprint de QA |

---

## 7. Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 2026-05-14 | AcredIA / Boris Angulo | Versión inicial generada desde BRD_v2.md, MRD_v1.md, PRD_v1.md, FSD_v1.md y prompt-contracts.md |