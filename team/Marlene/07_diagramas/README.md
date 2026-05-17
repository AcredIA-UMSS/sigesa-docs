# Diagramas Mermaid — Marlene (`07_diagramas`)

> Carpeta de entrega oficial de diagramas. Los borradores en `08_agents/mmd/` no sustituyen estos archivos.

| Archivo | Tipo | FSD-UC | Descripción |
|---------|------|--------|-------------|
| [MAR-SEQ-001-autenticacion-jwt.mmd](MAR-SEQ-001-autenticacion-jwt.mmd) | Secuencia | FSD-UC-001 | Login institucional @umss.edu.bo + JWT |
| [MAR-SEQ-002-carga-evidencia-versionada.mmd](MAR-SEQ-002-carga-evidencia-versionada.mmd) | Secuencia | FSD-UC-002 | Carga multipart, hash, objeto, versión |
| [MAR-SEQ-003-aprobacion-rechazo-subfase.mmd](MAR-SEQ-003-aprobacion-rechazo-subfase.mmd) | Secuencia | FSD-UC-003 | Dictamen [TD], avance subfase |
| [MAR-SEQ-004-dashboard-drilldown.mmd](MAR-SEQ-004-dashboard-drilldown.mmd) | Secuencia | FSD-UC-004 | Semáforos y drill-down [JD] |
| [MAR-SEQ-005-reporte-pdf-asincrono.mmd](MAR-SEQ-005-reporte-pdf-asincrono.mmd) | Secuencia | FSD-UC-005 | Job PDF asíncrono |
| [MAR-SEQ-006-notificaciones-outbox-smtp.mmd](MAR-SEQ-006-notificaciones-outbox-smtp.mmd) | Secuencia | FSD-UC-006 | Outbox + SMTP UMSS |
| [MAR-SEQ-007-busqueda-fts-multifiltro.mmd](MAR-SEQ-007-busqueda-fts-multifiltro.mmd) | Secuencia | FSD-UC-007 | FTS PostgreSQL + facetas |
| [MAR-SEQ-008-portal-publico-consulta.mmd](MAR-SEQ-008-portal-publico-consulta.mmd) | Secuencia | FSD-UC-008 | Consulta [P] sin auth |
| [MAR-SEQ-009-auditoria-exportacion.mmd](MAR-SEQ-009-auditoria-exportacion.mmd) | Secuencia | FSD-UC-009 | Log append-only + CSV |
| [MAR-SEQ-010-configuracion-proceso-normativa.mmd](MAR-SEQ-010-configuracion-proceso-normativa.mmd) | Secuencia | FSD-UC-010 | Alta proceso CEUB/ARCU-SUR |
| [MAR-SEQ-011-supervision-respaldos.mmd](MAR-SEQ-011-supervision-respaldos.mmd) | Secuencia | FSD-UC-011 | Health backups DB/objetos |
| [MAR-STA-001-ciclo-vida-evidencia.mmd](MAR-STA-001-ciclo-vida-evidencia.mmd) | Estado | FSD-UC-002 | Máquina estados documento/indicador |
| [MAR-STA-002-ciclo-proceso-acreditacion.mmd](MAR-STA-002-ciclo-proceso-acreditacion.mmd) | Estado | FSD-UC-003, FSD-UC-010 | Proceso y subfases |
| [MAR-STA-003-ciclo-plan-mejora.mmd](MAR-STA-003-ciclo-plan-mejora.mmd) | Estado | FSD-UC-012 | Plan de mejora correctiva |
| [MAR-ER-001-modelo-datos-nucleo.mmd](MAR-ER-001-modelo-datos-nucleo.mmd) | ER | Transversal | Núcleo acreditación UMSS |
| [MAR-ER-002-dominio-auditoria-evidencia.mmd](MAR-ER-002-dominio-auditoria-evidencia.mmd) | ER | FSD-UC-009 | Auditoría + versiones |
| [MAR-GANTT-001-roadmap-implementacion-sigesa.mmd](MAR-GANTT-001-roadmap-implementacion-sigesa.mmd) | Gantt | Transversal | Fases F0–F4 implementación |
| [MAR-GANTT-002-cronograma-convocatoria-ceub.mmd](MAR-GANTT-002-cronograma-convocatoria-ceub.mmd) | Gantt | Transversal | Piloto carrera vs hitos CEUB |

**Fuente:** `team/Marlene/04_fsd/FSD.md` · v1.0 · 14/05/2026

**Cobertura:** 18 diagramas · 12/12 casos de uso críticos FSD-UC-001…012 · 4 tipos (11 secuencia, 3 estado, 2 ER, 2 Gantt)
