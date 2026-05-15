# Prompt-Contratos — AcredIA / SIGESA
## PC-008 · PC-009 · PC-010

> **Archivo:** `team/aylenGonzales/04_fsd/prompt-contracts.md` (continuación)
> **Versión:** v1.2 — 15/05/2026
> **Autor:** Aylen Mariangel Gonzales Alvino
> **Complementa:** `FSD_v2.md` §7 (PC-001 a PC-004) + `prompt-contracts.md` v1.1 (PC-005 a PC-007)
> **Cierra:** GAP-001 (FSD-UC-008) · GAP-002 (FSD-UC-009) · GAP-003 implícito (FSD-UC-010)

---

## PC-008 — Portal Público de Consulta de Estado (FSD-UC-008)

```json
{
  "id": "PC-008",
  "fsd_uc": "FSD-UC-008",
  "role": "Eres un ingeniero backend senior especializado en APIs públicas de solo lectura con control estricto de exposición de datos sensibles, rate limiting y generación de PDFs públicos sin información interna para sistemas universitarios bolivianos.",
  "task": "Especifica los endpoints públicos (sin autenticación) del portal de consulta de estado de acreditación de SIGESA: listado de carreras, consulta de estado por carrera, generación de resumen PDF público y registro de consultas anónimas en LOG_AUDITORIA. Todos los endpoints deben operar sin JWT, exponer únicamente datos aprobados para divulgación pública y nunca filtrar información interna del expediente.",
  "context": {
    "br_aplicables": ["BR-010"],
    "nfr_aplicables": ["NFR-003", "NFR-008"],
    "actores": ["[P] Usuario público — sin autenticación, sin JWT"],
    "estados_publicos_visibles": [
      "EN_PROCESO — carrera en proceso de acreditación activo",
      "ACREDITADA — acreditación vigente",
      "VENCIDA — acreditación expirada sin renovación activa"
    ],
    "datos_expuestos_publicamente": [
      "nombre de la carrera",
      "facultad",
      "estado de acreditación (EN_PROCESO | ACREDITADA | VENCIDA)",
      "fecha de última actualización del estado",
      "fase CEUB actual (nombre de fase solamente, sin % de avance ni detalle de indicadores)"
    ],
    "datos_NUNCA_expuestos": [
      "expediente interno de evidencias",
      "nombres de usuarios del sistema",
      "justificaciones de rechazo",
      "hash SHA-256 de documentos",
      "rutas de archivos",
      "porcentaje de avance interno",
      "log de auditoría"
    ],
    "rate_limiting": "100 requests/hora por IP para endpoints públicos",
    "pdf_publico_marca_agua": "DOCUMENTO PÚBLICO — DUEA-UMSS",
    "habilitacion": "El portal público es activable/desactivable por el administrador desde configuración del sistema"
  },
  "reasoning": [
    "1. Verificar que el portal público esté habilitado en configuración; si no, retornar 503 con mensaje 'Portal temporalmente deshabilitado'",
    "2. No validar JWT en ningún endpoint de este módulo; cualquier token presente en la request debe ignorarse",
    "3. GET /publico/carreras: retornar lista de carreras con estado público visible, ordenadas por facultad y nombre; aplicar caché de 5 minutos",
    "4. GET /publico/carreras/{id}: retornar datos públicos de la carrera específica; si no tiene estado registrado retornar campo estado='SIN_INFORMACION'",
    "5. GET /publico/carreras/{id}/resumen-pdf: generar PDF solo con datos públicos aprobados para divulgación; aplicar marca de agua 'DOCUMENTO PÚBLICO — DUEA-UMSS'; TTL de descarga 30 minutos",
    "6. Para todos los endpoints: registrar en LOG_AUDITORIA acción=PUBLIC_QUERY con ip_origen y timestamp; sin usuario_id (NULL para consultas anónimas)",
    "7. Aplicar rate limiting de 100 req/hora por IP; si se supera, retornar 429 con Retry-After header",
    "8. Sanitizar todos los parámetros de entrada (carrera_id, nombre) para prevenir inyección SQL aunque no haya autenticación",
    "9. El campo fase_actual en la respuesta expone solo el nombre de la fase (ej: 'Autoevaluación'), nunca el porcentaje interno ni detalle de indicadores"
  ],
  "stop_condition": "Completo cuando: ningún endpoint expone datos internos del expediente, el LOG_AUDITORIA registra PUBLIC_QUERY con usuario_id=NULL, el rate limiting está activo, el PDF público lleva marca de agua diferenciada del PDF interno y el portal puede deshabilitarse sin afectar otros módulos.",
  "output": {
    "endpoints": [
      {
        "method": "GET",
        "path": "/publico/carreras",
        "auth": "ninguna",
        "query_params": {
          "facultad_id": "int — opcional",
          "estado": "EN_PROCESO | ACREDITADA | VENCIDA — opcional"
        },
        "response_200": {
          "carreras": [
            {
              "id": "int",
              "nombre": "string",
              "facultad": "string",
              "estado": "EN_PROCESO | ACREDITADA | VENCIDA | SIN_INFORMACION",
              "fecha_actualizacion": "ISO8601"
            }
          ]
        }
      },
      {
        "method": "GET",
        "path": "/publico/carreras/{id}",
        "auth": "ninguna",
        "response_200": {
          "id": "int",
          "nombre": "string",
          "facultad": "string",
          "estado": "string",
          "fase_actual": "string — nombre de fase solamente",
          "fecha_actualizacion": "ISO8601",
          "organismo_acreditador": "CEUB | ARCU-SUR | null"
        }
      },
      {
        "method": "GET",
        "path": "/publico/carreras/{id}/resumen-pdf",
        "auth": "ninguna",
        "response_200": "application/pdf — descargable con TTL 30 min"
      }
    ],
    "log_auditoria_registro": {
      "usuario_id": "NULL — consulta anónima",
      "accion": "PUBLIC_QUERY",
      "entidad_tipo": "CARRERA",
      "entidad_id": "id de la carrera consultada",
      "ip_origen": "IP del cliente",
      "detalle": {"endpoint": "string", "params": "object"}
    },
    "invariants": [
      "Ningún endpoint público retorna datos del expediente interno: evidencias, versiones, hashes, rutas, usuarios, justificaciones ni % de avance",
      "El usuario_id en LOG_AUDITORIA es siempre NULL para consultas públicas",
      "El PDF público y el PDF interno tienen marcas de agua distintas e inconfundibles",
      "El portal puede deshabilitarse en caliente sin reiniciar el servidor; los demás módulos no se ven afectados",
      "El rate limiting se aplica por IP, no por sesión; no puede bypassearse con tokens",
      "La caché de 5 minutos en /publico/carreras nunca expone un estado que haya sido revertido internamente en ese intervalo (TTL aceptable por política pública)"
    ],
    "failure_modes": [
      {
        "code": "PUB-001",
        "condition": "Portal público deshabilitado por el administrador",
        "http_status": 503,
        "message": "El portal de consulta pública está temporalmente deshabilitado. Intente más tarde."
      },
      {
        "code": "PUB-002",
        "condition": "Carrera sin estado registrado",
        "http_status": 200,
        "body": {"estado": "SIN_INFORMACION"},
        "message_ui": "Información no disponible aún."
      },
      {
        "code": "PUB-003",
        "condition": "Rate limit superado (> 100 req/hora desde la misma IP)",
        "http_status": 429,
        "headers": {"Retry-After": "segundos hasta reset"},
        "message": "Demasiadas solicitudes. Intente nuevamente en {N} minutos."
      },
      {
        "code": "PUB-004",
        "condition": "Error en generación de PDF público",
        "http_status": 503,
        "message": "No fue posible generar el resumen. Consulte el estado en pantalla.",
        "fallback": "Redirigir al usuario a GET /publico/carreras/{id} para vista en pantalla"
      },
      {
        "code": "PUB-005",
        "condition": "Carrera con id inexistente",
        "http_status": 404,
        "message": "La carrera solicitada no existe en el registro público."
      }
    ],
    "acceptance_criteria_gherkin": "Ver FSD-UC-008 en casos-de-uso.md"
  }
}
```

---

## PC-009 — Emisión y Descarga de Certificados de Acreditación (FSD-UC-009)

```json
{
  "id": "PC-009",
  "fsd_uc": "FSD-UC-009",
  "role": "Eres un ingeniero backend senior especializado en emisión de documentos oficiales con firma digital, códigos de verificación QR y trazabilidad inmutable para sistemas universitarios bolivianos con normativa CEUB y ARCU-SUR.",
  "task": "Especifica el módulo de emisión de certificados de acreditación de SIGESA: validación de elegibilidad (estado ACREDITADA + vigencia), generación del PDF oficial con número único, QR de verificación público, firma digital de la DUEA, registro inmutable en LOG_AUDITORIA y endpoint de verificación pública del QR.",
  "context": {
    "br_aplicables": ["BR-011"],
    "nfr_aplicables": ["NFR-003", "NFR-004"],
    "actor_emisor": "[JD] Jefe de Departamento — rol JEFATURA",
    "condicion_elegibilidad": [
      "PROCESO_ACREDITACION.estado = 'ACREDITADA'",
      "Fecha actual <= PROCESO_ACREDITACION.fecha_fin (vigencia no expirada)",
      "Todos los indicadores del proceso en estado APROBADO_FINAL"
    ],
    "contenido_certificado_pdf": [
      "Encabezado institucional UMSS / DUEA",
      "Nombre oficial de la carrera",
      "Facultad",
      "Período de acreditación (fecha_inicio — fecha_fin)",
      "Marco normativo (CEUB / ARCU-SUR)",
      "Número de certificado único — formato: CERT-{YYYY}-{CARRERA_ID}-{SEQ}",
      "Fecha de emisión",
      "Nombre y firma digital del [JD] emisor",
      "Sello digital DUEA-UMSS",
      "Código QR de verificación pública (URL: /verificar/{codigo_qr})"
    ],
    "numero_certificado_formato": "CERT-{YYYY}-{CARRERA_ID}-{SEQ_PADDED_4}",
    "qr_url_base": "https://sigesa.umss.edu.bo/verificar/",
    "inmutabilidad": "El certificado emitido no puede modificarse ni eliminarse; solo puede emitirse uno nuevo si la acreditación se renueva"
  },
  "reasoning": [
    "1. Validar JWT con rol JEFATURA",
    "2. Consultar PROCESO_ACREDITACION: verificar estado='ACREDITADA' Y fecha_fin >= fecha_actual; si no cumple, retornar 422 con motivo específico",
    "3. Verificar que no exista ya un certificado ACTIVO para el mismo proceso y período; si existe, retornar el existente sin crear duplicado",
    "4. Generar número de certificado único: CERT-{YYYY}-{CARRERA_ID}-{SEQ} donde SEQ es auto-incremental por año con padding de 4 dígitos",
    "5. Generar código QR único (UUID v4) que apunta a GET /verificar/{uuid}",
    "6. Construir el PDF oficial con todos los campos del contenido definido; aplicar firma digital del [JD] emisor",
    "7. Calcular hash SHA-256 del PDF generado para verificación de integridad futura",
    "8. Almacenar en /data/certificados/{YYYY}/{numero_cert}.pdf",
    "9. Insertar registro en tabla CERTIFICADO con: numero_cert, proceso_id, emisor_id, hash_sha256, codigo_qr, fecha_emision, estado='ACTIVO'",
    "10. Registrar en LOG_AUDITORIA acción=CERTIFICATE_ISSUED con entidad_tipo='CERTIFICADO', entidad_id, detalle: {numero_cert, carrera, periodo}",
    "11. Retornar URL de descarga del certificado con TTL de 24 horas"
  ],
  "stop_condition": "Completo cuando: el número de certificado es único e irrepetible, el QR resuelve a un endpoint público de verificación, el LOG_AUDITORIA registra la emisión de forma inmutable, no se puede emitir un duplicado para el mismo proceso activo y el PDF lleva firma digital del emisor.",
  "output": {
    "endpoints": [
      {
        "method": "POST",
        "path": "/certificados/emitir",
        "auth": "JWT — rol JEFATURA",
        "body": {
          "proceso_id": "int",
          "periodo": "string — ej: 2026-I"
        },
        "response_201": {
          "numero_certificado": "string — CERT-2026-042-0001",
          "descarga_url": "string — TTL 24h",
          "codigo_qr": "uuid",
          "fecha_emision": "ISO8601"
        }
      },
      {
        "method": "GET",
        "path": "/verificar/{codigo_qr}",
        "auth": "ninguna — endpoint público",
        "response_200": {
          "numero_certificado": "string",
          "carrera": "string",
          "facultad": "string",
          "periodo": "string",
          "organismo": "CEUB | ARCU-SUR",
          "estado": "ACTIVO | VENCIDO | REVOCADO",
          "fecha_emision": "ISO8601",
          "fecha_vencimiento": "ISO8601"
        }
      },
      {
        "method": "GET",
        "path": "/certificados/{numero_certificado}/descargar",
        "auth": "JWT — rol JEFATURA o TECNICO",
        "response_200": "application/pdf"
      }
    ],
    "tabla_certificado_ddl": {
      "id": "SERIAL PK",
      "numero_cert": "VARCHAR(30) UNIQUE NOT NULL",
      "proceso_id": "INT FK → PROCESO_ACREDITACION.id NOT NULL",
      "emisor_id": "INT FK → USUARIO.id NOT NULL",
      "hash_sha256": "CHAR(64) NOT NULL",
      "codigo_qr": "UUID UNIQUE NOT NULL DEFAULT gen_random_uuid()",
      "ruta_relativa": "VARCHAR(500) NOT NULL",
      "fecha_emision": "TIMESTAMP NOT NULL DEFAULT NOW()",
      "estado": "ENUM('ACTIVO','VENCIDO','REVOCADO') NOT NULL DEFAULT 'ACTIVO'"
    },
    "invariants": [
      "El número de certificado es único globalmente; la constraint UNIQUE en BD lo garantiza a nivel de datos",
      "No puede existir más de un certificado en estado ACTIVO para el mismo proceso_id",
      "El endpoint GET /verificar/{codigo_qr} es siempre público, sin autenticación, sin rate limit agresivo (1000 req/hora por IP)",
      "El PDF del certificado nunca se regenera; el archivo original es inmutable una vez emitido",
      "Si la acreditación vence, el certificado pasa a estado VENCIDO automáticamente por un job nocturno; no se elimina",
      "El hash SHA-256 del certificado se verifica en cada descarga; si difiere del almacenado, se bloquea la descarga y se alerta al [JD]"
    ],
    "failure_modes": [
      {
        "code": "CERT-001",
        "condition": "Proceso con estado distinto de ACREDITADA",
        "http_status": 422,
        "message": "La carrera no tiene acreditación vigente. Estado actual: {estado}."
      },
      {
        "code": "CERT-002",
        "condition": "Acreditación vencida (fecha_fin < fecha_actual)",
        "http_status": 422,
        "message": "La acreditación venció el {fecha_fin}. Inicie el proceso de renovación para emitir un nuevo certificado."
      },
      {
        "code": "CERT-003",
        "condition": "Ya existe un certificado ACTIVO para el mismo proceso",
        "http_status": 200,
        "action": "Retornar el certificado existente sin crear duplicado",
        "message": "Ya existe un certificado activo para este proceso. Se retorna el certificado emitido el {fecha_emision}."
      },
      {
        "code": "CERT-004",
        "condition": "Error en generación del PDF o firma digital",
        "http_status": 500,
        "message": "No fue posible generar el certificado. El incidente ha sido registrado. Intente nuevamente en 5 minutos.",
        "action": "Registrar fallo en LOG_AUDITORIA con detalle del error; NO registrar CERTIFICATE_ISSUED"
      },
      {
        "code": "CERT-005",
        "condition": "QR apunta a certificado inexistente o código inválido",
        "http_status": 404,
        "message": "El código de verificación no corresponde a ningún certificado registrado en SIGESA."
      },
      {
        "code": "CERT-006",
        "condition": "Hash del PDF descargado no coincide con el almacenado en BD",
        "http_status": 409,
        "message": "El archivo del certificado no puede ser verificado. Contacte a la DUEA.",
        "action": "Bloquear descarga + insertar alerta crítica para [JD] en tabla NOTIFICACION"
      },
      {
        "code": "CERT-007",
        "condition": "Usuario sin rol JEFATURA intenta emitir certificado",
        "http_status": 403,
        "message": "Solo la Jefatura DUEA puede emitir certificados de acreditación."
      }
    ],
    "acceptance_criteria_gherkin": "Ver FSD-UC-009 en casos-de-uso.md"
  }
}
```

---

## PC-010 — Respaldo Automático Diario Verificable (FSD-UC-010)

```json
{
  "id": "PC-010",
  "fsd_uc": "FSD-UC-010",
  "role": "Eres un ingeniero de infraestructura senior especializado en estrategias de backup y recuperación ante desastres con Docker, PostgreSQL y verificación de integridad SHA-256 para sistemas universitarios con datos críticos normativa CEUB/ARCU-SUR.",
  "task": "Especifica el proceso de respaldo automático diario de SIGESA: scheduler a las 02:00 BOT, dump SQL de PostgreSQL, respaldo del volumen de evidencias y certificados, cálculo de hash SHA-256 del paquete completo, almacenamiento en ubicación secundaria, política de retención, verificación de integridad y notificación al administrador solo en caso de fallo.",
  "context": {
    "br_aplicables": ["BR-012"],
    "nfr_aplicables": ["NFR-013"],
    "scheduler_hora": "02:00 BOT (UTC-4) — diario",
    "componentes_a_respaldar": [
      "Base de datos PostgreSQL — dump SQL completo con pg_dump",
      "Volumen /data/evidencias/ — archivos de evidencia de todos los procesos",
      "Volumen /data/certificados/ — PDFs de certificados emitidos",
      "Volumen /data/reportes/ — PDFs de reportes ejecutivos generados"
    ],
    "ubicacion_primaria": "/data/ (volumen Docker principal)",
    "ubicacion_secundaria": "/data/backups/{YYYY}/{MM}/{DD}/ (volumen Docker separado o NFS)",
    "formato_paquete": "sigesa_backup_{YYYYMMDD_HHMMSS}.tar.gz",
    "politica_retencion": "30 días de respaldos diarios; el respaldo del día 1 de cada mes se conserva 12 meses",
    "notificacion_destinatario": "Administrador del sistema — correo institucional configurado en variables de entorno",
    "ventana_maxima_backup_min": 60,
    "confirmacion_exito": false
  },
  "reasoning": [
    "1. El scheduler (cron o node-cron) dispara el job BACKUP_JOB a las 02:00 BOT exactos",
    "2. El job registra BACKUP_STARTED en LOG_AUDITORIA con timestamp de inicio",
    "3. Ejecutar pg_dump con compresión: pg_dump -Fc sigesa_db > /tmp/sigesa_db_{timestamp}.dump",
    "4. Verificar exit code de pg_dump; si != 0, marcar etapa DB como FAILED y continuar con archivos (respaldo parcial mejor que ninguno)",
    "5. Comprimir volúmenes de archivos: tar -czf /tmp/sigesa_files_{timestamp}.tar.gz /data/evidencias/ /data/certificados/ /data/reportes/",
    "6. Empaquetar ambos en un archivo final: sigesa_backup_{YYYYMMDD_HHMMSS}.tar.gz",
    "7. Calcular hash SHA-256 del paquete final: sha256sum sigesa_backup_{timestamp}.tar.gz > sigesa_backup_{timestamp}.sha256",
    "8. Mover paquete + archivo .sha256 a la ubicación secundaria /data/backups/{YYYY}/{MM}/{DD}/",
    "9. Verificar que el archivo en destino existe y su hash coincide con el calculado (verificación post-copia)",
    "10. Registrar en LOG_AUDITORIA acción=BACKUP_COMPLETED con estado SUCCESS|FAILED, tamaño_bytes, hash_sha256, duracion_segundos, componentes_respaldados",
    "11. Aplicar política de retención: eliminar respaldos de más de 30 días (excepto los del día 1 de cada mes)",
    "12. Solo si estado=FAILED: enviar correo de alerta al administrador en <= 15 min con detalle del componente fallido",
    "13. Si la ventana de backup supera 60 minutos, marcar como TIMEOUT y alertar al administrador"
  ],
  "stop_condition": "Completo cuando: el backup se ejecuta sin intervención humana, el hash SHA-256 se verifica post-copia en destino, el LOG_AUDITORIA registra el resultado con todos los metadatos, el administrador solo recibe correo en caso de fallo y la política de retención elimina automáticamente backups vencidos.",
  "output": {
    "endpoints": [
      {
        "method": "GET",
        "path": "/admin/backups",
        "auth": "JWT — rol JEFATURA o ADMIN",
        "description": "Lista los últimos N respaldos con estado, tamaño, hash y timestamp",
        "response_200": {
          "backups": [
            {
              "fecha": "ISO8601",
              "archivo": "string",
              "tamaño_mb": "float",
              "hash_sha256": "string",
              "estado": "SUCCESS | FAILED | TIMEOUT",
              "duracion_segundos": "int",
              "componentes": ["DB", "EVIDENCIAS", "CERTIFICADOS", "REPORTES"]
            }
          ]
        }
      },
      {
        "method": "POST",
        "path": "/admin/backups/verificar/{fecha}",
        "auth": "JWT — rol JEFATURA o ADMIN",
        "description": "Recalcula el hash SHA-256 del paquete de respaldo de la fecha indicada y compara con el registrado en BD",
        "response_200": {
          "fecha": "string",
          "hash_registrado": "string",
          "hash_recalculado": "string",
          "integridad": "VERIFICADA | COMPROMETIDA"
        }
      },
      {
        "method": "POST",
        "path": "/admin/backups/ejecutar-ahora",
        "auth": "JWT — rol JEFATURA o ADMIN",
        "description": "Dispara un backup inmediato fuera del scheduler (uso en mantenimiento o pre-despliegue)",
        "response_202": {
          "job_id": "uuid",
          "inicio": "ISO8601",
          "mensaje": "Respaldo iniciado manualmente. Recibirá confirmación por correo si ocurre algún fallo."
        }
      }
    ],
    "log_auditoria_campos": {
      "accion": "BACKUP_COMPLETED",
      "entidad_tipo": "SISTEMA",
      "entidad_id": 0,
      "detalle": {
        "estado": "SUCCESS | FAILED | TIMEOUT",
        "componentes": {
          "db": "SUCCESS | FAILED",
          "evidencias": "SUCCESS | FAILED",
          "certificados": "SUCCESS | FAILED",
          "reportes": "SUCCESS | FAILED"
        },
        "archivo": "sigesa_backup_{timestamp}.tar.gz",
        "tamaño_bytes": "int",
        "hash_sha256": "string",
        "duracion_segundos": "int",
        "ubicacion_destino": "string"
      },
      "ip_origen": "127.0.0.1 — proceso interno"
    },
    "politica_retencion_sql": "DELETE FROM registro_backups WHERE fecha < NOW() - INTERVAL '30 days' AND EXTRACT(DAY FROM fecha) != 1; -- Los del día 1 se conservan 12 meses",
    "invariants": [
      "El backup nunca sobreescribe un respaldo anterior válido si falta espacio; en ese caso falla con CERT-storage-full y alerta al administrador",
      "La verificación de integridad post-copia es obligatoria; un backup sin hash verificado en destino se marca como FAILED aunque el archivo exista",
      "El LOG_AUDITORIA registra BACKUP_COMPLETED siempre, incluso si el estado es FAILED; el registro es append-only e inmutable",
      "El administrador no recibe correo de confirmación en éxito — solo en fallo; esto previene fatiga de alertas",
      "Un respaldo parcial (DB exitosa, archivos fallidos) se registra como FAILED con detalle por componente; es preferible a no registrar nada",
      "El endpoint /admin/backups/ejecutar-ahora no puede ejecutarse si ya hay un job de backup activo; retorna 409 con ETA del job en curso"
    ],
    "failure_modes": [
      {
        "code": "BCK-001",
        "condition": "pg_dump falla (BD no disponible o permisos insuficientes)",
        "action": "Marcar componente DB como FAILED; continuar con respaldo de archivos; registrar BACKUP_COMPLETED con estado=FAILED; alertar administrador"
      },
      {
        "code": "BCK-002",
        "condition": "Almacenamiento secundario sin espacio suficiente",
        "action": "No iniciar la copia; registrar BACKUP_COMPLETED con estado=FAILED; alertar administrador con espacio disponible actual; NO eliminar respaldo anterior válido"
      },
      {
        "code": "BCK-003",
        "condition": "Hash del archivo en destino no coincide con el calculado pre-copia",
        "action": "Marcar backup como FAILED (corrupción en transferencia); eliminar el archivo corrupto del destino; alertar administrador; NO aplicar política de retención en este ciclo"
      },
      {
        "code": "BCK-004",
        "condition": "Job supera 60 minutos sin completarse",
        "action": "Terminar el proceso forzosamente (SIGTERM); registrar BACKUP_COMPLETED con estado=TIMEOUT; alertar administrador con duración y último componente en proceso"
      },
      {
        "code": "BCK-005",
        "condition": "Intento de backup manual cuando ya hay un job activo",
        "http_status": 409,
        "message": "Ya hay un proceso de respaldo en ejecución. Se estima completar en {ETA} minutos."
      },
      {
        "code": "BCK-006",
        "condition": "Correo de alerta al administrador falla (SMTP no disponible)",
        "action": "Registrar el fallo del correo en LOG_AUDITORIA con accion=NOTIFICATION_FAILED; el backup ya está registrado como FAILED independientemente del correo"
      }
    ],
    "acceptance_criteria_gherkin": "Ver FSD-UC-010 en casos-de-uso.md"
  }
}
```

---

## Trazabilidad completa — §7 cerrado (PC-001 a PC-010)

| PC | FSD-UC (casos-de-uso.md) | FSD-UC (FSD_v2.md) | Módulo | Archivo origen | Estado |
|----|--------------------------|---------------------|--------|----------------|--------|
| PC-001 | FSD-UC-006 Autenticación | FSD-UC-001 | MOD-01 | FSD_v2.md | ✅ |
| PC-002 | FSD-UC-001 Carga evidencias | FSD-UC-002 | MOD-02 | FSD_v2.md | ✅ |
| PC-003 | FSD-UC-003 Flujo aprobación | FSD-UC-003 | MOD-03 | FSD_v2.md | ✅ |
| PC-004 | *(Dashboard — sin UC en casos-de-uso.md)* | FSD-UC-004 | MOD-05 | FSD_v2.md | ✅ |
| PC-005 | FSD-UC-005 Reportes PDF | FSD-UC-005 | MOD-06 | prompt-contracts v1.1 | ✅ |
| PC-006 | FSD-UC-004 Notificaciones | FSD-UC-006 | MOD-07 | prompt-contracts v1.1 | ✅ |
| PC-007 | FSD-UC-007 Búsqueda | FSD-UC-007 | MOD-08 | prompt-contracts v1.1 | ✅ |
| **PC-008** | **FSD-UC-008 Portal público** | **GAP-001 cerrado** | **MOD-10** | **Este archivo** | **✅** |
| **PC-009** | **FSD-UC-009 Certificados** | **GAP-002 cerrado** | **MOD-11** | **Este archivo** | **✅** |
| **PC-010** | **FSD-UC-010 Respaldo automático** | **MOD-12** | **MOD-12** | **Este archivo** | **✅** |

> **Cobertura final: 10/10 casos de uso tienen prompt-contract.**
> Los GAP-001 y GAP-002 declarados en `FSD_v2.md` §11 quedan formalmente cerrados.

---

## Tabla de reconciliación de IDs

> Los IDs de `casos-de-uso.md` y `FSD_v2.md` difieren por orden de numeración.
> Esta tabla es la referencia canónica para evitar confusión entre documentos.

| Concepto | ID en FSD_v2.md | ID en casos-de-uso.md | PC asignado |
|---|---|---|---|
| Autenticación y roles | FSD-UC-001 | FSD-UC-006 | PC-001 |
| Carga de evidencias | FSD-UC-002 | FSD-UC-001 | PC-002 |
| Control de versiones | FSD-UC-002 (incluido) | FSD-UC-002 | PC-002 |
| Flujo de aprobación | FSD-UC-003 | FSD-UC-003 | PC-003 |
| Dashboard gerencial | FSD-UC-004 | *(no tiene UC)* | PC-004 |
| Notificaciones | FSD-UC-006 | FSD-UC-004 | PC-006 |
| Reportes PDF | FSD-UC-005 | FSD-UC-005 | PC-005 |
| Búsqueda multifiltro | FSD-UC-007 | FSD-UC-007 | PC-007 |
| Portal público | *(GAP-001)* | FSD-UC-008 | PC-008 |
| Certificados | *(GAP-002)* | FSD-UC-009 | PC-009 |
| Respaldo automático | MOD-12 (sin UC) | FSD-UC-010 | PC-010 |

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 14/05/2026 | Aylen Mariangel Gonzales Alvino | PC-001 a PC-004 en FSD_v2.md |
| v1.1 | 15/05/2026 | Aylen Mariangel Gonzales Alvino | PC-005, PC-006, PC-007 — cobertura de los 7 UC del FSD_v2 |
| v1.2 | 15/05/2026 | Aylen Mariangel Gonzales Alvino | PC-008, PC-009, PC-010 — cierre de GAP-001, GAP-002 y cobertura total de casos-de-uso.md |

---

*Documento elaborado por el equipo AcredIA — UMSS, Cochabamba, Bolivia, 2026.*
*Con esta versión v1.2, el §7 del FSD queda con cobertura completa: 10 prompt-contratos para 10 casos de uso.*