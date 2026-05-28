# POCs críticas — SIGESA / AcredIA · UMSS (módulo DTI)

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 26/05/2026 |
| **Requisito** | Mínimo 2 POCs con código, evidencia y resultado (`DOCUMENTO_TECNICO_INICIAL` §12) |
| **Plantilla** | [`POC-NN/POC_TEMPLATE.md`](POC-NN/POC_TEMPLATE.md) |

---

## Índice de POCs

| ID | Carpeta | Riesgo / UC | Estado |
|----|---------|-------------|--------|
| **POC-01** | [`POC-01-evidencias-upload/`](POC-01-evidencias-upload/) | RISK-02 · FSD-UC-002 | Completada |
| **POC-02** | [`POC-02-workflow-dictamen/`](POC-02-workflow-dictamen/) | RB-03 · FSD-UC-003 | Completada |
| **POC-03** | [`POC-03-notification-outbox/`](POC-03-notification-outbox/) | RISK-NOTIF-01 · FSD-UC-015 | En ejecución |
| **POC-04** | [`POC-04-audit-log-query/`](POC-04-audit-log-query/) | RISK-AUDIT-01 · FSD-UC-017 | En ejecución |

---

## Infraestructura

### Modo local (sin Docker) — recomendado en laboratorio

```powershell
cd docs\pocs
.\run_local_pocs.ps1
```

Usa SQLite + disco (`POC_USE_SQLITE=1`, `POC_LOCAL_STORAGE`).

### Modo Docker (STAGE / validación integración)

```bash
cd docs/pocs
docker compose up -d
```

| Servicio | Puerto | Uso |
|----------|--------|-----|
| PostgreSQL 16 | 5433 | Metadatos POC-01 a POC-04 |
| MinIO | 9000 / 9001 | Objetos evidencia (POC-01) |
| POC-03 API | 8003 | Outbox notificaciones |
| POC-04 API | 8004 | Bitácora auditoría |

Variables: ver `.env.example` en cada POC `src/`.

---

## Cronograma (referencia plan)

| Día | Entregable |
|-----|------------|
| 0 | Esqueletos + hipótesis SMART |
| 1–3 | POC-01 código + evidencia |
| 4 | ADR-0003 + DTI §12.1 |
| 5–7 | POC-02 código + evidencia |
| 8 | ADR-0004 + DTI §12.2 |

---

## Convenciones

- Datos de prueba: prefijo `TEST_`, dominio `example.invalid` (CR-SIG-04).
- Sin secretos en el repositorio; usar `.env` local (gitignored).
- Resultados: `POC-0N/RESULTADO.md` y `POC-0N/evidencia/`.

---

## ADRs derivados

| ADR | Título |
|-----|--------|
| [ADR-0003](../adr/ADR-0003-upload-idempotency-s3.md) | Upload idempotente + validar antes de S3 |
| [ADR-0004](../adr/ADR-0004-workflow-state-machine.md) | Máquina de estados dictamen / cierre subfase |
| [ADR-0005](../adr/ADR-0005-audit-log-append-only-postgresql.md) | Bitácora append-only (POC-04) |
| [ADR-0010](../adr/ADR-0010-event-driven-choreography.md) | Coreografía event-driven (POC-03 outbox) |

---

*DTI: [`../dti/DTI_borrador.md`](../dti/DTI_borrador.md) §12.*
