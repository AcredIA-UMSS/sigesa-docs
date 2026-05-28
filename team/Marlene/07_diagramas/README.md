# Diagramas Mermaid — Marlene (`07_diagramas`)

> Carpeta de entrega oficial de diagramas. Los borradores en `08_agents/mmd/` no sustituyen estos archivos.

| Archivo | Tipo | FSD-UC | Descripción |
|---------|------|--------|-------------|
| [seq-001-001-autenticacion-jwt.mmd](seq-001-001-autenticacion-jwt.mmd) | Secuencia | FSD-UC-001 | Login institucional @umss.edu.bo + JWT |
| [seq-002-002-carga-evidencia-versionada.mmd](seq-002-002-carga-evidencia-versionada.mmd) | Secuencia | FSD-UC-002 | Carga multipart, hash, objeto, versión |
| [seq-003-003-aprobacion-rechazo-subfase.mmd](seq-003-003-aprobacion-rechazo-subfase.mmd) | Secuencia | FSD-UC-003 | Dictamen [TD], avance subfase |
| [seq-004-004-dashboard-drilldown.mmd](seq-004-004-dashboard-drilldown.mmd) | Secuencia | FSD-UC-004 | Semáforos y drill-down [JD] |
| [seq-005-005-reporte-pdf-asincrono.mmd](seq-005-005-reporte-pdf-asincrono.mmd) | Secuencia | FSD-UC-005 | Job PDF asíncrono |
| [seq-006-006-notificaciones-outbox-smtp.mmd](seq-006-006-notificaciones-outbox-smtp.mmd) | Secuencia | FSD-UC-006 | Outbox + SMTP UMSS |
| [seq-007-007-busqueda-fts-multifiltro.mmd](seq-007-007-busqueda-fts-multifiltro.mmd) | Secuencia | FSD-UC-007 | FTS PostgreSQL + facetas |
| [seq-008-008-portal-publico-consulta.mmd](seq-008-008-portal-publico-consulta.mmd) | Secuencia | FSD-UC-008 | Consulta [P] sin auth |
| [seq-009-009-auditoria-exportacion.mmd](seq-009-009-auditoria-exportacion.mmd) | Secuencia | FSD-UC-009 | Log append-only + CSV |
| [seq-010-010-configuracion-proceso-normativa.mmd](seq-010-010-configuracion-proceso-normativa.mmd) | Secuencia | FSD-UC-010 | Alta proceso CEUB/ARCU-SUR |
| [seq-011-011-supervision-respaldos.mmd](seq-011-011-supervision-respaldos.mmd) | Secuencia | FSD-UC-011 | Health backups DB/objetos |
| [state-001-001-ciclo-vida-evidencia.mmd](state-001-001-ciclo-vida-evidencia.mmd) | Estado | FSD-UC-002 | Máquina estados documento/indicador |
| [state-002-002-ciclo-proceso-acreditacion.mmd](state-002-002-ciclo-proceso-acreditacion.mmd) | Estado | FSD-UC-003, FSD-UC-010 | Proceso y subfases |
| [state-003-003-ciclo-plan-mejora.mmd](state-003-003-ciclo-plan-mejora.mmd) | Estado | FSD-UC-012 | Plan de mejora correctiva |
| [er-001-001-modelo-datos-nucleo.mmd](er-001-001-modelo-datos-nucleo.mmd) | ER | Transversal | Núcleo acreditación UMSS |
| [er-002-002-dominio-auditoria-evidencia.mmd](er-002-002-dominio-auditoria-evidencia.mmd) | ER | FSD-UC-009 | Auditoría + versiones |
| [gantt-001-001-roadmap-implementacion-sigesa.mmd](gantt-001-001-roadmap-implementacion-sigesa.mmd) | Gantt | Transversal | Fases F0–F4 implementación |
| [gantt-002-002-cronograma-convocatoria-ceub.mmd](gantt-002-002-cronograma-convocatoria-ceub.mmd) | Gantt | Transversal | Piloto carrera vs hitos CEUB |

**Fuente:** `team/Marlene/04_fsd/FSD.md` · v1.0 · 14/05/2026

**Cobertura:** 18 diagramas · 12/12 casos de uso críticos FSD-UC-001…012 · 4 tipos (11 secuencia, 3 estado, 2 ER, 2 Gantt)
