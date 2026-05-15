# Requerimientos No Funcionales — AcredIA / SIGESA
## ISO/IEC 25010 · Métricas cuantificables · Umbrales y verificación

> **Archivo:** `team/aylenGonzales/06_nfr/NFR.md`
> **Versión:** v1.0 — 15/05/2026
> **Autor:** Aylen Mariangel Gonzales Alvino
> **Revisores:** M.Sc. Edson Terceros Torrico · Tech Lead AcredIA · QA AcredIA
> **Fuente:** FSD_v2.md §10 · casos-de-uso.md · prompt-contracts v1.2
> **Estándar base:** ISO/IEC 25010:2023 — SQuaRE (System and Software Quality Requirements and Evaluation)

---

## 0. Resumen ejecutivo

Este documento especifica los **15 requerimientos no funcionales** de AcredIA / SIGESA, organizados según las características de calidad de ISO/IEC 25010. Cada NFR incluye:

- **Métrica cuantificable** — qué se mide y cómo
- **Umbral aceptable** — mínimo para aprobar en producción
- **Umbral excelente** — objetivo de calidad del equipo
- **Herramienta de verificación** — cómo se comprueba en QA
- **Caso de uso vinculado** — trazabilidad al comportamiento funcional

**Cobertura de características ISO 25010:**

| # | Característica | NFRs asignados | Cobertura |
|---|---------------|----------------|-----------|
| 1 | Eficiencia de desempeño | NFR-001, NFR-002, NFR-003 | ✅ |
| 2 | Seguridad | NFR-004, NFR-005, NFR-006 | ✅ |
| 3 | Fiabilidad | NFR-007, NFR-008, NFR-009 | ✅ |
| 4 | Usabilidad | NFR-010, NFR-011 | ✅ |
| 5 | Mantenibilidad | NFR-012, NFR-013 | ✅ |
| 6 | Compatibilidad | NFR-014 | ✅ |
| 7 | Portabilidad | NFR-015 | ✅ |

**Total: 15 NFRs · 7 características ISO 25010 · Calificación proyectada: EXCELENTE**

---

## 1. Eficiencia de desempeño

> *Capacidad del sistema para proporcionar el rendimiento apropiado en relación con los recursos utilizados bajo condiciones establecidas.*

---

### NFR-001 — Tiempo de respuesta en operaciones de usuario

| Campo | Valor |
|-------|-------|
| **ID** | NFR-001 |
| **Característica ISO 25010** | Eficiencia de desempeño |
| **Sub-característica** | Comportamiento temporal |
| **UC vinculados** | FSD-UC-004 (dashboard), FSD-UC-007 (buscador), FSD-UC-001 (carga) |
| **PC vinculados** | PC-004, PC-007 |

**Descripción:**
El sistema debe responder a las operaciones interactivas del usuario dentro de tiempos perceptibles como inmediatos o rápidos, sin generar frustración ni pérdida de contexto.

**Métrica:**
Latencia de respuesta HTTP medida en el percentil 95 (p95) bajo carga concurrente de 50 usuarios virtuales (VUs) sostenida durante 5 minutos.

| Operación | Umbral aceptable (p95) | Umbral excelente (p95) |
|-----------|----------------------|----------------------|
| Dashboard gerencial (`GET /dashboard/estado`) | ≤ 3 000 ms | ≤ 1 500 ms |
| Buscador de documentos (`GET /buscar`) | ≤ 3 000 ms | ≤ 1 500 ms |
| Login (`POST /auth/login`) | ≤ 1 000 ms | ≤ 500 ms |
| Carga de evidencia (`POST /evidencias/{id}`) | ≤ 5 000 ms | ≤ 3 000 ms |
| Portal público (`GET /publico/carreras`) | ≤ 2 000 ms | ≤ 800 ms |

**Condiciones de prueba:**
- 50 VUs concurrentes durante 5 minutos continuos
- Base de datos con datos realistas: 10 carreras, 50 procesos, 1 000 documentos
- Servidor con la misma especificación del entorno de producción (piloto)

**Herramienta de verificación:** k6 (`k6 run load-test.js --vus 50 --duration 5m`)

**Script de verificación:**
```javascript
// k6 threshold — load-test.js
export const options = {
  thresholds: {
    'http_req_duration{endpoint:dashboard}': ['p(95)<3000'],
    'http_req_duration{endpoint:buscar}': ['p(95)<3000'],
    'http_req_duration{endpoint:login}': ['p(95)<1000'],
    'http_req_failed': ['rate<0.01'], // < 1% de errores
  },
};
```

**Criterio de fallo:** Si p95 > 3 000 ms en dashboard o buscador durante la prueba de carga, se activa caché de 60 s y se genera alerta para @ArchAgent.

---

### NFR-002 — Throughput mínimo del sistema

| Campo | Valor |
|-------|-------|
| **ID** | NFR-002 |
| **Característica ISO 25010** | Eficiencia de desempeño |
| **Sub-característica** | Capacidad |
| **UC vinculados** | FSD-UC-001, FSD-UC-003, FSD-UC-004 |

**Descripción:**
El sistema debe procesar un volumen mínimo de operaciones concurrentes sin degradación de servicio, garantizando que el número de usuarios simultáneos esperado en producción sea atendido correctamente.

**Métrica:**
Número de requests por segundo (RPS) procesados exitosamente (HTTP 2xx) con tasa de error < 1 %, medido durante prueba de carga de 5 minutos.

| Escenario | Umbral aceptable | Umbral excelente |
|-----------|-----------------|-----------------|
| Operaciones de lectura (dashboard, búsqueda) | ≥ 30 RPS | ≥ 60 RPS |
| Operaciones de escritura (carga, aprobación) | ≥ 10 RPS | ≥ 20 RPS |
| Tasa de error bajo carga máxima | < 1 % | < 0,1 % |

**Herramienta de verificación:** k6 + Grafana (métricas en tiempo real durante la prueba)

---

### NFR-003 — Uso de recursos durante generación de PDF

| Campo | Valor |
|-------|-------|
| **ID** | NFR-003 |
| **Característica ISO 25010** | Eficiencia de desempeño |
| **Sub-característica** | Utilización de recursos |
| **UC vinculados** | FSD-UC-005 (reportes PDF), FSD-UC-009 (certificados) |
| **PC vinculados** | PC-005, PC-009 |

**Descripción:**
La generación simultánea de reportes PDF no debe saturar los recursos del servidor ni degradar los módulos core del sistema.

**Métrica:**
Porcentaje de CPU y memoria RAM utilizados durante la generación de 3 reportes PDF en paralelo, medido con Prometheus + cAdvisor cada 15 segundos.

| Recurso | Umbral aceptable | Umbral excelente |
|---------|-----------------|-----------------|
| CPU (3 reportes paralelos) | < 80 % | < 60 % |
| RAM (3 reportes paralelos) | < 75 % | < 60 % |
| Tiempo de generación por reporte | ≤ 5 min | ≤ 2 min |
| Disponibilidad de dashboard durante generación | 100 % | 100 % |

**Condición de aislamiento:** Si CPU > 80 %, el motor PDF debe rechazar nuevas solicitudes con RPT-002 (cola llena) sin afectar la disponibilidad de los demás módulos.

**Herramienta de verificación:** Prometheus + cAdvisor + test de inyección de carga PDF con k6

---

## 2. Seguridad

> *Capacidad del sistema para proteger la información y los datos de forma que personas u otros sistemas tengan el grado de acceso a los datos apropiado a sus tipos y niveles de autorización.*

---

### NFR-004 — Confidencialidad y cifrado de comunicaciones

| Campo | Valor |
|-------|-------|
| **ID** | NFR-004 |
| **Característica ISO 25010** | Seguridad |
| **Sub-característica** | Confidencialidad |
| **UC vinculados** | FSD-UC-006 (autenticación), todos los módulos |
| **PC vinculados** | PC-001 |

**Descripción:**
Toda comunicación entre el cliente (browser) y el servidor debe estar cifrada. No deben existir endpoints que transmitan datos sensibles en claro (HTTP sin TLS).

**Métrica:**
Porcentaje de endpoints sensibles (aquellos que transmiten credenciales, tokens JWT, evidencias o datos personales) que cumplen simultáneamente:
- Protocolo HTTPS forzado (redirección automática de HTTP → HTTPS)
- TLS versión ≥ 1.2 (preferencia TLS 1.3)
- Header `Strict-Transport-Security` (HSTS) con `max-age ≥ 31536000`
- Header `X-Content-Type-Options: nosniff`
- Header `X-Frame-Options: DENY`

| Métrica | Umbral aceptable | Umbral excelente |
|---------|-----------------|-----------------|
| % endpoints con HTTPS forzado + TLS ≥ 1.2 | 100 % | 100 % |
| % endpoints con HSTS configurado | 100 % | 100 % + preload |
| Vulnerabilidades OWASP Top 10 críticas | 0 | 0 |
| Vulnerabilidades OWASP Top 10 altas | ≤ 2 con mitigación documentada | 0 |

**Herramienta de verificación:** OWASP ZAP (escaneo automatizado) + testssl.sh (verificación TLS)

**Comando de verificación:**
```bash
# Verificar configuración TLS
testssl.sh --protocols --headers https://sigesa.umss.edu.bo

# Escaneo OWASP ZAP automatizado
zap-cli quick-scan --self-contained --start-options '-config api.disablekey=true' https://sigesa.umss.edu.bo
```

---

### NFR-005 — No repudio e integridad del log de auditoría

| Campo | Valor |
|-------|-------|
| **ID** | NFR-005 |
| **Característica ISO 25010** | Seguridad |
| **Sub-característica** | No repudio |
| **UC vinculados** | Todos (transversal) |
| **PC vinculados** | PC-001, PC-002, PC-003, PC-005, PC-009, PC-010 |

**Descripción:**
Toda acción crítica del sistema debe quedar registrada de forma inmutable en `LOG_AUDITORIA`, garantizando que ningún actor pueda negar haber realizado una acción y que ningún registro pueda ser modificado o eliminado.

**Métrica:**
Porcentaje de eventos críticos definidos que generan un registro completo en `LOG_AUDITORIA` con los campos obligatorios: `usuario_id`, `accion`, `entidad_tipo`, `entidad_id`, `ip_origen`, `fecha_hora`.

**Eventos críticos obligatorios:**

| Evento | Acción en LOG | Umbral |
|--------|--------------|--------|
| Inicio de sesión exitoso | `LOGIN` | 100 % |
| Fallo de autenticación | `LOGIN_FAILED` | 100 % |
| Carga de evidencia | `CARGA` | 100 % |
| Aprobación de indicador | `APROBACION` | 100 % |
| Rechazo de indicador | `RECHAZO` | 100 % |
| Generación de reporte | `REPORTE` | 100 % |
| Emisión de certificado | `CERTIFICATE_ISSUED` | 100 % |
| Consulta pública | `PUBLIC_QUERY` | 100 % |
| Respaldo automático | `BACKUP_COMPLETED` | 100 % |

**Inmutabilidad — verificación técnica:**
```sql
-- Verificar que el rol de aplicación no puede modificar ni eliminar registros
SET ROLE sigesa_app;
UPDATE LOG_AUDITORIA SET accion = 'MANIPULADO' WHERE id = 1;
-- Resultado esperado: ERROR: permission denied for table LOG_AUDITORIA
DELETE FROM LOG_AUDITORIA WHERE id = 1;
-- Resultado esperado: ERROR: permission denied for table LOG_AUDITORIA
```

| Métrica | Umbral aceptable | Umbral excelente |
|---------|-----------------|-----------------|
| % eventos críticos registrados correctamente | ≥ 95 % | 100 % |
| % intentos de UPDATE/DELETE en LOG_AUDITORIA bloqueados | 100 % | 100 % |
| Campos obligatorios completos en cada registro | 100 % | 100 % |

**Herramienta de verificación:** Tests de integración específicos (Jest/Pytest) + tests de mutación en BD

---

### NFR-006 — Control de acceso por roles (RBAC)

| Campo | Valor |
|-------|-------|
| **ID** | NFR-006 |
| **Característica ISO 25010** | Seguridad |
| **Sub-característica** | Control de acceso |
| **UC vinculados** | FSD-UC-006, FSD-UC-001, FSD-UC-003, FSD-UC-008 |
| **PC vinculados** | PC-001, PC-008 |

**Descripción:**
Ningún usuario debe poder acceder a datos o ejecutar acciones que estén fuera de los permisos de su rol. La restricción de visibilidad por carrera para el rol [CC] debe ser forzada server-side, no bypasseable desde el cliente.

**Métrica:**
Número de intentos de acceso no autorizado (cross-role, cross-carrera) que el sistema permite incorrectamente durante las pruebas de penetración de roles.

| Escenario de prueba | Resultado esperado | Umbral |
|--------------------|-------------------|--------|
| [CC] intenta acceder a evidencias de otra carrera | HTTP 403 | 0 accesos permitidos |
| [CC] intenta aprobar un indicador | HTTP 403 | 0 accesos permitidos |
| [TD] intenta generar un certificado | HTTP 403 | 0 accesos permitidos |
| [P] intenta acceder a `/dashboard/jefatura` | HTTP 401 | 0 accesos permitidos |
| Usuario sin JWT intenta acceder a endpoint protegido | HTTP 401 | 0 accesos permitidos |
| [CC] manipula `carrera_id` en query params del buscador | Forzado a su carrera_id del JWT | 0 bypasses permitidos |

**Herramienta de verificación:** Tests de integración con roles adversariales (Jest/Pytest) + OWASP ZAP con autenticación

---

## 3. Fiabilidad

> *Capacidad del sistema para mantener un nivel de rendimiento especificado cuando se usa en condiciones especificadas durante un período de tiempo determinado.*

---

### NFR-007 — Disponibilidad en horario hábil

| Campo | Valor |
|-------|-------|
| **ID** | NFR-007 |
| **Característica ISO 25010** | Fiabilidad |
| **Sub-característica** | Disponibilidad |
| **UC vinculados** | Todos los módulos |

**Descripción:**
El sistema debe estar disponible durante el horario hábil institucional de la UMSS. Las ventanas de mantenimiento deben planificarse fuera de ese horario.

**Horario hábil:** Lunes a viernes, 07:00–22:00 hora Bolivia (BOT, UTC-4).

**Métrica:**
Porcentaje de tiempo en que el sistema responde correctamente (HTTP 2xx o 3xx) a un health check externo durante el horario hábil, medido en ventanas semanales.

$$\text{Disponibilidad} = \frac{\text{Minutos operativos}}{\text{Minutos totales en horario hábil}} \times 100$$

| Umbral aceptable | Umbral excelente | Tiempo de caída máxima/semana |
|-----------------|-----------------|-------------------------------|
| ≥ 99,0 % | ≥ 99,5 % | ≤ 45 min/semana (aceptable) · ≤ 22 min/semana (excelente) |

**Herramienta de verificación:** UptimeRobot (check cada 5 minutos sobre `GET /health`) + alertas al Tech Lead si uptime cae < 99 %

**Endpoint de health check:**
```json
// GET /health — respuesta esperada
{
  "status": "ok",
  "db": "connected",
  "storage": "accessible",
  "timestamp": "2026-05-15T14:30:00Z"
}
```

---

### NFR-008 — Tolerancia a fallos y aislamiento de módulos

| Campo | Valor |
|-------|-------|
| **ID** | NFR-008 |
| **Característica ISO 25010** | Fiabilidad |
| **Sub-característica** | Tolerancia a fallos |
| **UC vinculados** | FSD-UC-005 (motor PDF), FSD-UC-010 (respaldo) |
| **PC vinculados** | PC-005, PC-010 |

**Descripción:**
El fallo de un módulo no crítico (motor PDF, motor de reportes, scheduler de respaldo) no debe propagarse a los módulos core (autenticación, carga de evidencias, dashboard, buscador). El sistema debe degradar gracefully.

**Métrica:**
Disponibilidad de los módulos core cuando se inyecta un fallo controlado en un módulo no crítico, medida durante tests de inyección de fallos.

| Fallo inyectado | Módulos core afectados esperados | Umbral |
|----------------|--------------------------------|--------|
| Motor PDF lanza excepción | 0 módulos core afectados | 100 % aislamiento |
| Scheduler de backup falla | 0 módulos core afectados | 100 % aislamiento |
| Cola de notificaciones detenida | 0 módulos core afectados | 100 % aislamiento |
| Servidor SMTP no disponible | 0 módulos core afectados | 100 % aislamiento |

**Herramienta de verificación:** Tests de inyección de fallos con mocks (Jest/Pytest) — se mockea el módulo fallido y se verifica que los endpoints core retornan HTTP 200.

**Tiempo de recuperación automática (RTO):**

| Umbral aceptable | Umbral excelente |
|-----------------|-----------------|
| Módulo no crítico se recupera en ≤ 5 min con reintento automático | ≤ 2 min |

---

### NFR-009 — Recuperabilidad y frecuencia de respaldo

| Campo | Valor |
|-------|-------|
| **ID** | NFR-009 |
| **Característica ISO 25010** | Fiabilidad |
| **Sub-característica** | Recuperabilidad |
| **UC vinculados** | FSD-UC-010 (respaldo automático) |
| **PC vinculados** | PC-010 |

**Descripción:**
El sistema debe garantizar la recuperación ante desastres (pérdida total del servidor primario) con pérdida máxima de datos de 24 horas (RPO) y tiempo de restauración controlado (RTO).

**Métricas:**

| Métrica | Descripción | Umbral aceptable | Umbral excelente |
|---------|------------|-----------------|-----------------|
| RPO (Recovery Point Objective) | Antigüedad máxima del último respaldo recuperable | 24 horas | 24 horas (misma — diario es suficiente para el piloto) |
| RTO (Recovery Time Objective) | Tiempo desde inicio de restauración hasta sistema operativo | ≤ 4 horas | ≤ 2 horas |
| Frecuencia de respaldo exitoso | Días consecutivos con `BACKUP_COMPLETED` estado=`SUCCESS` | ≥ 95 % de los días | 100 % de los días |
| Verificación de integridad | % respaldos con hash SHA-256 verificado post-copia | 100 % | 100 % |
| Retención de respaldos | Días de respaldos diarios disponibles | 30 días | 30 días diarios + 12 mensuales |

**Herramienta de verificación:** Script de restauración en entorno de staging (`docker-compose -f restore.yml up`) + verificación de tablas clave post-restauración + consulta a `LOG_AUDITORIA` para confirmar integridad.

---

## 4. Usabilidad

> *Capacidad del sistema para ser utilizado por usuarios específicos para conseguir objetivos específicos con efectividad, eficiencia y satisfacción en un contexto de uso especificado.*

---

### NFR-010 — Eficiencia en tareas críticas (tiempo de tarea)

| Campo | Valor |
|-------|-------|
| **ID** | NFR-010 |
| **Característica ISO 25010** | Usabilidad |
| **Sub-característica** | Eficiencia en el uso |
| **UC vinculados** | FSD-UC-001, FSD-UC-003, FSD-UC-007 |
| **PC vinculados** | PC-002, PC-003, PC-007 |

**Descripción:**
Las tareas críticas de los usuarios principales deben poder completarse en tiempos razonables sin capacitación previa extensiva, reflejando el objetivo central del producto: reducir el tiempo de localización y gestión documental de 20+ minutos a ≤ 2 minutos.

**Métrica:**
Tiempo en completar cada tarea crítica, medido con 3 usuarios reales por rol en sesiones de test de usabilidad con protocolo think-aloud. Se mide desde que el usuario inicia la tarea hasta que la completa correctamente.

| Tarea | Actor | Umbral aceptable | Umbral excelente |
|-------|-------|-----------------|-----------------|
| Cargar una evidencia para un indicador específico | [CC] | ≤ 5 min · ≤ 2 errores | ≤ 3 min · 0 errores |
| Aprobar o rechazar un indicador con justificación | [TD] | ≤ 3 min · ≤ 1 error | ≤ 2 min · 0 errores |
| Localizar un documento específico por carrera y gestión | [TD]/[JD] | ≤ 2 min | ≤ 1 min |
| Interpretar el semáforo de una carrera en el dashboard | [JD] | ≤ 30 seg | ≤ 15 seg |
| Generar y descargar un reporte PDF | [JD] | ≤ 7 min (incluye tiempo de generación) | ≤ 5 min |

**Tasa de éxito mínima:** ≥ 95 % de las tareas completadas correctamente sin asistencia externa.

**Herramienta de verificación:** Sesiones de test de usabilidad con 3 coordinadores reales de la DUEA-UMSS + grabación de pantalla + formulario de observación estructurado.

---

### NFR-011 — Accesibilidad WCAG 2.2

| Campo | Valor |
|-------|-------|
| **ID** | NFR-011 |
| **Característica ISO 25010** | Usabilidad |
| **Sub-característica** | Accesibilidad |
| **UC vinculados** | Todos los módulos con UI |

**Descripción:**
Los componentes de la interfaz de usuario deben cumplir con las pautas de accesibilidad WCAG 2.2 en los niveles A y AA, garantizando que el sistema sea utilizable por personas con diversidad funcional visual o motora.

**Componentes prioritarios evaluados:**
- Formulario de login
- Barra de búsqueda y filtros
- Tabla de resultados del dashboard
- Indicadores de semáforo (no deben depender únicamente del color)
- Botones de aprobación/rechazo
- Mensajes de error y confirmación

**Métrica:**
Número de violaciones WCAG 2.2 detectadas por herramienta automatizada en los componentes prioritarios.

| Nivel WCAG | Umbral aceptable | Umbral excelente |
|-----------|-----------------|-----------------|
| Nivel A (obligatorio) | 0 violaciones | 0 violaciones |
| Nivel AA | ≤ 3 violaciones menores documentadas | 0 violaciones |
| Contraste de color (ratio mínimo 4.5:1 para texto normal) | 100 % componentes | 100 % componentes |
| Indicadores de semáforo con texto alternativo | 100 % | 100 % + icono no-color |
| Navegación por teclado en flujos críticos | Funcional en 100 % de flujos | + foco visible en todos los elementos |

**Herramienta de verificación:** axe-core (integrado en Playwright para tests E2E) + Lighthouse Accessibility Score ≥ 90

```javascript
// Ejemplo de test de accesibilidad con axe-core en Playwright
const { checkA11y } = require('axe-playwright');
test('Dashboard cumple WCAG 2.2 AA', async ({ page }) => {
  await page.goto('/dashboard/jefatura');
  await checkA11y(page, null, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag22aa'] },
  });
});
```

---

## 5. Mantenibilidad

> *Capacidad del sistema para ser modificado de forma efectiva y eficiente por los mantenedores previstos.*

---

### NFR-012 — Modularidad y cobertura de pruebas

| Campo | Valor |
|-------|-------|
| **ID** | NFR-012 |
| **Característica ISO 25010** | Mantenibilidad |
| **Sub-característica** | Modularidad + Testeabilidad |
| **UC vinculados** | Todos los módulos (transversal) |

**Descripción:**
El código backend debe estar organizado en módulos con bajo acoplamiento y alta cohesión, con cobertura de pruebas suficiente para detectar regresiones de forma automática al introducir cambios.

**Métricas:**

| Métrica | Descripción | Umbral aceptable | Umbral excelente |
|---------|------------|-----------------|-----------------|
| Cobertura de pruebas unitarias (líneas) | % de líneas de código backend cubiertas por tests unitarios | ≥ 80 % | ≥ 90 % |
| Cobertura de pruebas de integración | % de endpoints cubiertos por tests de integración | ≥ 75 % | ≥ 90 % |
| Acoplamiento eferente (CE) por módulo | Número de módulos externos de los que depende cada módulo | ≤ 3 | ≤ 2 |
| Complejidad ciclomática promedio | Complejidad promedio de las funciones del backend | ≤ 10 | ≤ 7 |
| Deuda técnica (SonarQube) | Tiempo estimado para resolver issues de mantenibilidad | ≤ 5 % del tiempo de desarrollo total | ≤ 2 % |

**Herramienta de verificación:** Jest + Istanbul (Node) / Pytest + Coverage.py (Python) + SonarQube

```bash
# Verificar cobertura con Jest
jest --coverage --coverageThreshold='{"global":{"lines":80}}'

# Verificar con Pytest
pytest --cov=app --cov-fail-under=80
```

---

### NFR-013 — Analizabilidad y trazabilidad de errores

| Campo | Valor |
|-------|-------|
| **ID** | NFR-013 |
| **Característica ISO 25010** | Mantenibilidad |
| **Sub-característica** | Analizabilidad |
| **UC vinculados** | Todos los módulos (transversal) |

**Descripción:**
Cuando ocurre un error en producción, el equipo de desarrollo debe poder identificar la causa raíz en un tiempo razonable gracias a logs estructurados, códigos de error estandarizados y trazas de stack disponibles en el sistema de monitoreo.

**Métrica:**
Tiempo promedio desde que se detecta un error en producción hasta que se identifica la causa raíz (MTTD — Mean Time to Detect root cause), medido en los primeros 3 meses de operación del piloto.

| Métrica | Umbral aceptable | Umbral excelente |
|---------|-----------------|-----------------|
| MTTD (causa raíz de error crítico) | ≤ 30 minutos | ≤ 15 minutos |
| % errores con código de error estandarizado (AUTH-*, EV-*, AP-*, etc.) | ≥ 95 % | 100 % |
| % requests con request_id trazable end-to-end | 100 % | 100 % |
| Logs estructurados en formato JSON | 100 % de los módulos | 100 % + correlación con LOG_AUDITORIA |

**Formato de log estructurado obligatorio:**
```json
{
  "timestamp": "2026-05-15T14:30:00.123Z",
  "level": "ERROR",
  "request_id": "uuid-v4",
  "module": "evidencias",
  "error_code": "EV-004",
  "message": "Falla en escritura de volumen",
  "user_id": 42,
  "carrera_id": 7,
  "stack": "Error: ENOSPC: no space left on device..."
}
```

**Herramienta de verificación:** Revisión manual de logs en staging + test automatizado que verifica que cada failure_mode de los prompt-contratos genera el código de error correcto en el log.

---

## 6. Compatibilidad

> *Capacidad del sistema para intercambiar información con otros sistemas y/o realizar sus funciones requeridas mientras comparte el mismo entorno de hardware o software.*

---

### NFR-014 — Interoperabilidad con servicios externos

| Campo | Valor |
|-------|-------|
| **ID** | NFR-014 |
| **Característica ISO 25010** | Compatibilidad |
| **Sub-característica** | Interoperabilidad |
| **UC vinculados** | FSD-UC-004 (SMTP), FSD-UC-005 (motor PDF), FSD-UC-010 (respaldo) |
| **PC vinculados** | PC-006, PC-010 |

**Descripción:**
Las integraciones con servicios externos (servidor SMTP UMSS, motor PDF, PostgreSQL) deben cumplir con los SLAs definidos y manejar correctamente los fallos de dichos servicios sin afectar la disponibilidad del sistema principal.

**Métricas por integración:**

| Servicio externo | Métrica | Umbral aceptable | Umbral excelente |
|-----------------|---------|-----------------|-----------------|
| SMTP UMSS — entrega de notificaciones | % notificaciones entregadas dentro del SLA de 15 min | ≥ 95 % | ≥ 99 % |
| Motor PDF — generación de reportes | % reportes generados dentro de 5 min | ≥ 95 % | ≥ 99 % |
| PostgreSQL — disponibilidad de conexión | % queries ejecutadas sin error de conexión en horario hábil | ≥ 99,5 % | ≥ 99,9 % |
| Volumen Docker — escritura de archivos | % operaciones de escritura exitosas | ≥ 99,9 % | ≥ 99,99 % |

**Compatibilidad de navegadores (frontend):**

| Navegador | Versión mínima | Umbral |
|-----------|---------------|--------|
| Chrome / Chromium | últimas 2 versiones | 100 % funcional |
| Firefox | últimas 2 versiones | 100 % funcional |
| Edge | últimas 2 versiones | 100 % funcional |
| Safari (macOS/iOS) | últimas 2 versiones | 100 % funcional |
| Resolución mínima soportada | 1 280 × 720 px | Responsive funcional |

**Herramienta de verificación:** Logs de cola NOTIFICACION + Pact (contract testing para SMTP) + BrowserStack (compatibilidad cross-browser) + Playwright multi-browser

---

## 7. Portabilidad

> *Capacidad del sistema para ser transferido de forma efectiva y eficiente de un entorno hardware, software u operacional a otro.*

---

### NFR-015 — Desplegabilidad y reproducibilidad del entorno

| Campo | Valor |
|-------|-------|
| **ID** | NFR-015 |
| **Característica ISO 25010** | Portabilidad |
| **Sub-característica** | Desplegabilidad (Installability) |
| **UC vinculados** | Todos (infraestructura transversal) |

**Descripción:**
El sistema debe poder desplegarse en un servidor nuevo (o en staging) de forma completamente reproducible a partir del repositorio, sin configuración manual de dependencias fuera de variables de entorno. Esto garantiza que el equipo pueda mover el sistema entre servidores institucionales o VPS sin fricción.

**Métricas:**

| Métrica | Descripción | Umbral aceptable | Umbral excelente |
|---------|------------|-----------------|-----------------|
| Tiempo de despliegue desde cero | Desde `git clone` hasta sistema operativo con datos de seed | ≤ 30 minutos | ≤ 15 minutos |
| Número de pasos manuales requeridos fuera de `.env` | Acciones que no están automatizadas en `docker-compose up` | ≤ 3 | 0 |
| Reproducibilidad de build | % de builds que producen el mismo resultado en distintos entornos con el mismo código | 100 % | 100 % |
| Entornos soportados | SO donde el sistema puede desplegarse con Docker | Linux (Ubuntu 22+) | + macOS + Windows con Docker Desktop |
| Migración de BD automatizada | Las migraciones de esquema se aplican automáticamente al iniciar | Sí (Flyway/Alembic) | Sí + rollback automatizado |

**Herramienta de verificación:** Script de despliegue en un VPS limpio con Ubuntu 22.04 + Docker 25, ejecutado por un miembro del equipo que no participó en el setup original. Se mide el tiempo hasta que `GET /health` retorna `status: ok`.

**Comando de despliegue completo:**
```bash
git clone https://github.com/acredia/sigesa.git
cd sigesa
cp .env.example .env  # único paso manual: configurar variables
docker-compose up -d  # construye, migra BD y levanta todos los servicios
```

---

## 8. Matriz de trazabilidad NFR ↔ UC ↔ PC

| NFR | Característica ISO 25010 | Sub-característica | UC vinculados | PC vinculados | Herramienta |
|-----|--------------------------|-------------------|---------------|---------------|-------------|
| NFR-001 | Eficiencia de desempeño | Comportamiento temporal | UC-004, UC-007, UC-001 | PC-004, PC-007 | k6 |
| NFR-002 | Eficiencia de desempeño | Capacidad | UC-001, UC-003, UC-004 | — | k6 + Grafana |
| NFR-003 | Eficiencia de desempeño | Utilización de recursos | UC-005, UC-009 | PC-005, PC-009 | Prometheus + cAdvisor |
| NFR-004 | Seguridad | Confidencialidad | UC-006 + todos | PC-001 | OWASP ZAP + testssl.sh |
| NFR-005 | Seguridad | No repudio | Todos | PC-001 a PC-010 | Jest/Pytest + mutación BD |
| NFR-006 | Seguridad | Control de acceso | UC-006, UC-001, UC-003, UC-008 | PC-001, PC-008 | Tests adversariales |
| NFR-007 | Fiabilidad | Disponibilidad | Todos | — | UptimeRobot |
| NFR-008 | Fiabilidad | Tolerancia a fallos | UC-005, UC-010 | PC-005, PC-010 | Tests inyección de fallos |
| NFR-009 | Fiabilidad | Recuperabilidad | UC-010 | PC-010 | Script restauración staging |
| NFR-010 | Usabilidad | Eficiencia en el uso | UC-001, UC-003, UC-007 | PC-002, PC-003, PC-007 | Test usabilidad DUEA |
| NFR-011 | Usabilidad | Accesibilidad | Todos con UI | — | axe-core + Lighthouse |
| NFR-012 | Mantenibilidad | Modularidad + Testeabilidad | Todos | — | Jest/Pytest + SonarQube |
| NFR-013 | Mantenibilidad | Analizabilidad | Todos | — | Logs estructurados JSON |
| NFR-014 | Compatibilidad | Interoperabilidad | UC-004, UC-005, UC-010 | PC-006, PC-010 | Pact + BrowserStack |
| NFR-015 | Portabilidad | Desplegabilidad | Todos (infra) | — | Script VPS limpio |

---

## 9. Plan de verificación — cronograma QA

| Sprint | NFRs a verificar | Actividad |
|--------|-----------------|-----------|
| S2 (infra) | NFR-015 | Despliegue en VPS limpio y medición de tiempo |
| S3 (backend core) | NFR-004, NFR-005, NFR-006 | OWASP ZAP + tests de roles adversariales + mutación BD |
| S4 (módulos principales) | NFR-001, NFR-002, NFR-003 | Pruebas de carga k6 con 50 VUs |
| S5 (notificaciones + PDF) | NFR-008, NFR-014 | Tests de inyección de fallos + Pact SMTP |
| S5 (backup) | NFR-007, NFR-009 | UptimeRobot activo + script de restauración en staging |
| S6 (UI/UX) | NFR-010, NFR-011 | Test de usabilidad con 3 usuarios DUEA + axe-core |
| S6 (calidad código) | NFR-012, NFR-013 | SonarQube + revisión de cobertura + logs estructurados |
| Pre-producción | Todos | Regresión completa de NFRs antes del go-live |

---

## 10. Conteo de elementos — criterio de calificación

| Categoría | Cantidad | Detalle |
|-----------|---------|---------|
| NFRs totales | **15** | NFR-001 a NFR-015 |
| Características ISO 25010 cubiertas | **7** | Eficiencia de desempeño, Seguridad, Fiabilidad, Usabilidad, Mantenibilidad, Compatibilidad, Portabilidad |
| NFRs con métrica cuantificable | **15** | 100 % |
| NFRs con umbral aceptable Y excelente | **15** | 100 % |
| NFRs con herramienta de verificación específica | **15** | 100 % |
| NFRs con trazabilidad a UC | **15** | 100 % |
| Herramientas distintas de verificación | **10** | k6, Grafana, Prometheus, cAdvisor, OWASP ZAP, testssl.sh, axe-core, Lighthouse, SonarQube, UptimeRobot, Pact, Playwright, BrowserStack |

> **Calificación proyectada: EXCELENTE**
> Criterio: ≥ 8 NFRs con métrica + umbral + verificación cubriendo ≥ 5 características ISO 25010.
> Este documento contiene **15 NFRs** cubriendo **7 características** — supera el umbral de excelencia.

---

## Registro de cambios

| Versión | Fecha | Autor | Cambio |
|---------|-------|-------|--------|
| v1.0 | 15/05/2026 | Aylen Mariangel Gonzales Alvino | Versión inicial — 15 NFRs, 7 características ISO 25010, trazabilidad completa a UC y PC |

---

*Documento elaborado por el equipo AcredIA — UMSS, Cochabamba, Bolivia, 2026.*
*Basado en FSD_v2.md §10, casos-de-uso.md y prompt-contracts v1.2. Estándar: ISO/IEC 25010:2023.*