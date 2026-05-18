# Modelo de datos — SIGESA

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Fuente canónica** | `docs/LFSD.md` §6 |

---

## Resumen

Modelo relacional de referencia (**PostgreSQL 14+**) para acreditación CEUB/ARCU-SUR en la UMSS.

| Dominio | Tablas clave |
|---------|----------------|
| Identidad | `usuario`, `usuario_carrera` |
| Catálogo | `facultad`, `carrera` |
| Workflow | `plantilla`, `proceso`, `fase`, `subfase`, `indicador` |
| Documental | `documento` (versionado + `storage_key`) |
| Soporte | `log_auditoria`, `notificacion_outbox`, `reporte_job`, `publicacion_carrera`, `plan_mejora` |

**Núcleo:** carrera → proceso → fase → subfase → indicador → documento (evidencia con `version` y `hash_sha256`).

**Documento completo (ER, diccionario, enums, índices, reglas BD):** [team/Marlene/04_fsd/modelo_datos.md](../../team/Marlene/04_fsd/modelo_datos.md)

**Relacionados:** [reglas_negocio.md](../../team/Marlene/04_fsd/reglas_negocio.md) · [casos_uso.md](../../team/Marlene/04_fsd/casos_uso.md)
