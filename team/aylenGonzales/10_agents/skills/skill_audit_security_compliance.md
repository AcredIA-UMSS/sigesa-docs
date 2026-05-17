---
name: sigesa-audit-security-compliance
description: >
  Auditar cumplimiento de seguridad SIGESA: NFR-003, NFR-004, NFR-012, ADR-002, ADR-004, RBN-07,
  RB-06 y AGENTS.md §7; agentes @ArchAgent y @QaAgent; salida informe y checklist TC-006.
allowed-tools:
  - read
  - run-tests
model-tier: sonnet
fsd-version-min: v1.0
status: stable
owner: AcredIA / aylenGonzales
---

# Skill: Auditoría de seguridad y cumplimiento SIGESA

> **Agentes**: **@ArchAgent**, **@QaAgent** (AGENTS.md §8.1). MOD-09 transversal, MOD-01, MOD-10.

## 1. Cuándo activarlo (triggers)

- DURANTE: pre-release piloto, PR que toca auth, evidencias, portal público, logs, SMTP.
- ARRANCA cuando: cambios en `src/adapter/in/`, middleware JWT, rutas `/publico/*`, migraciones `LOG_AUDITORIA`, `docker-compose.yml`.
- NO ACTIVAR cuando: solo documentación Markdown sin rutas HTTP.

## 2. Entradas obligatorias (Inputs)

El usuario MUST proporcionar al menos una de:

- Módulos: MOD-01, MOD-02, MOD-09, MOD-10 (ver §8.3).
- FSD-UC: FSD-UC-001, 002, 008 (los más sensibles).
- Ruta del diff o lista de endpoints nuevos/modificados.

Si falta alcance, responder: *"Necesito MOD-* o endpoints tocados para auditar seguridad."*

## 3. Fuentes de verdad (orden de precedencia)

1. `team/aylenGonzales/10_agents/AGENTS.md` §7 (seguridad y privacidad).
2. `team/aylenGonzales/09_dti/adr/ADR-002.md` (LOG_AUDITORIA append-only).
3. `team/aylenGonzales/09_dti/adr/ADR-004.md` (JWT, @umss.edu.bo, bloqueo 3 intentos).
4. `team/aylenGonzales/09_dti/adr/ADR-001.md` (no servir `/data/evidencias/` estático).
5. FSD_v2 §10: NFR-003, NFR-004, NFR-012; §12 TC-002, TC-006.

## 4. Procedimiento

1. **Autenticación (MOD-01, FSD-UC-001)**  
   - Verificar validación dominio `@umss.edu.bo` (RBN-01, RB-06).  
   - JWT TTL 24 h; refresh; claims `rol`, `carrera_id` (ADR-004).  
   - Bloqueo 15 min tras 3 fallos (FSD-UC-001, TC-002).  
   - Eventos LOGIN/LOGOUT/FAIL en LOG_AUDITORIA misma transacción.

2. **Evidencias (MOD-02, ADR-001)**  
   - Confirmar ausencia de `express.static` hacia `/data/evidencias/`.  
   - Descarga solo con JWT + RBAC por `carrera_id`.

3. **Log inmutable (MOD-09, ADR-002, RBN-07, NFR-012)**  
   - Revisar migración SQL: `REVOKE DELETE, UPDATE ON LOG_AUDITORIA FROM sigesa_app`.  
   - Ejecutar o verificar TC-006: UPDATE debe fallar con `permission denied`.  
   - Comando: `docker compose exec postgres psql -U postgres -d sigesa -c "\z LOG_AUDITORIA"`.

4. **Portal público (MOD-10, FSD-UC-008)**  
   - Responses sin correos institucionales, hashes SHA-256, rutas internas, justificaciones rechazo.

5. **Logs aplicación (AGENTS §7)**  
   - Grep en código: no loguear `password`, JWT completo, `hash_sha256` de archivos.

6. **Transporte (NFR-003)**  
   - Verificar configuración TLS 1.3 en reverse proxy / compose (documentar si solo dev HTTP).

7. **IA (RBN-15)**  
   - Confirmar que no hay endpoints que aprueben/rechazen indicadores sin actor [TD] humano.

8. Emitir informe con severidad: C1 (bloqueante merge) / C2 / C3.

## 5. Salida esperada

- Informe en respuesta del agente con tabla de hallazgos.
- Opcional persistir: `team/aylenGonzales/10_agents/reports/security-audit-YYYY-MM-DD.md`.

| Control | ID | Estado | Evidencia |
|---------|-----|--------|-----------|
| TLS 1.3 | NFR-003 | PASS/FAIL | archivo config |
| Log append-only | RBN-07, TC-006 | PASS/FAIL | salida psql |
| Dominio UMSS | RBN-01 | PASS/FAIL | test TC-002 |
| Portal sin PII | FSD-UC-008 | PASS/FAIL | sample JSON |

## 6. Verificación (criterios de "bien hecho")

- Todo hallazgo C1 tiene regla citada (RBN, NFR, ADR) existente en AGENTS o FSD.
- TC-006 ejecutado o instrucción clara si Docker no disponible.
- Cero recomendaciones de almacenar secretos en `.env` commiteado (P-S01).

## 7. Anti-patrones específicos

- Desactivar middleware JWT en rutas "temporalmente".
- Exponer `LOG_AUDITORIA` vía DELETE para "limpiar datos de prueba" en prod.
- Usar correos de prueba `@gmail.com` en seeds sin dominio `example.invalid` (AGENTS raíz CR-SIG-04).

## 8. Mini ejemplo de invocación

> "Audita el PR de MOD-01 y MOD-10. Usa skill_audit_security_compliance."

## 9. Modos de fallo conocidos

- Entorno sin Docker → marcar TC-006 SKIP; exigir revisión manual SQL en migración.
- Conflicto NFR vs implementación → STOP, escalar a Tech Lead / docente.

## 10. Registro de cambios del Skill

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| 0.1.0 | 16/05/2026 | Equipo AcredIA | Versión inicial §7 AGENTS, ADR-001/002/004 |
