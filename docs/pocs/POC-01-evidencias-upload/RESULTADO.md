# POC-01 — Resultados

| Metadato | Valor |
|----------|-------|
| **Fecha ejecución** | 26/05/2026 |
| **Entorno** | Local SQLite + almacenamiento disco (`POC_USE_SQLITE=1`) |
| **Veredicto** | **Éxito** |

---

## 9. Resultados

### 9.1 Tabla de métricas

| Métrica | Valor obtenido | Umbral éxito | Veredicto |
|---------|----------------|--------------|-----------|
| Reintentos idempotentes | 3/3 misma `version` e `id` | 100% equivalentes | OK |
| Integridad hash | Registrado en BD + `storageKey` | 0 mismatch | OK |
| P95 latencia 5 MB (n=30) | **0,036 s** | ≤ 3 s | OK |
| Rechazo > 50 MB | HTTP **413** `SIGESA_DOC_SIZE` | 413 | OK |

### 9.2 Evidencia

- [`evidencia/poc01-run-summary.json`](evidencia/poc01-run-summary.json)

---

## 10. Conclusiones y veredicto

- **Veredicto:** Éxito — la hipótesis se sostiene en el alcance POC.
- **Justificación:** Idempotency-Key evita versiones duplicadas; validación de tamaño antes de persistir; P95 muy por debajo del umbral en entorno local.
- **Próximos pasos:** Integrar patrón en servicio documental v1; repetir benchmark con MinIO + PostgreSQL en STAGE (Docker); crear [ADR-0003](../../adr/ADR-0003-upload-idempotency-s3.md).

---

## 11. Aprendizajes

- **Técnico:** Validar tamaño y MIME antes de escribir en objeto reduce basura en S3.
- **Equipo:** `TestClient` evita límites de cliente HTTP en archivos > 50 MB.
- **Herramientas:** Modo `POC_LOCAL_STORAGE` permite ejecutar sin Docker en laboratorio.

---

## 12. Riesgos remanentes

- Latencia real en campus UMSS con archivos 20–50 MB y antivirus.
- Concurrencia multi-[CC] sobre mismo indicador (optimistic lock en producto).
- Antivirus / DLP no cubiertos.

---

## Checklist de cierre

- [x] Hipótesis y criterio declarados antes de ejecutar
- [x] Alcance time-boxed respetado
- [x] Resultados numéricos en `evidencia/`
- [x] Veredicto explícito
- [x] ADR-0003 creado
