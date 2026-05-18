# Definición de producto — SIGESA / AcredIA · UMSS

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Ubicación** | `team/Marlene/00_overview/definicion_producto.md` |
| **Documentos relacionados** | `alcance_proyecto.md` · `02_vision_negocio_v2.md` · `03_prd/PRD.md` · `04_fsd/glosario.md` |

---

## 1. Qué es SIGESA

**SIGESA** (*Sistema de Evaluación y Acreditación de Carreras*) es la **plataforma web institucional** de la Universidad Mayor de San Simón (UMSS), operada por la **Dirección Universitaria de Evaluación y Acreditación (DUEA)**, para gestionar de punta a punta los **procesos de acreditación de carreras** bajo los marcos **CEUB** (nacional) y **ARCU-SUR** (regional).

| Atributo | Definición |
|----------|------------|
| **Tipo** | Software como servicio institucional (web, multi-rol) |
| **Cliente interno** | DUEA UMSS |
| **Usuarios** | Coordinación de carrera, técnicos DUEA, jefatura DUEA, consulta pública |
| **Objeto de gestión** | Procesos de acreditación → fases → subfases → indicadores → **evidencias** versionadas |
| **Marca iniciativa** | **AcredIA** (modernización digital del ciclo de acreditación) |

### 1.1 Qué NO es SIGESA

| No es | Por qué |
|-------|---------|
| Un repositorio genérico de archivos (“Drive universitario”) | Cada evidencia está ligada a un **indicador normativo** (BR-015) |
| Un LMS o sistema académico | No gestiona notas, matrícula ni aulas |
| Un sustituto del juicio del [TD] o de [JD] | Automatiza flujo y trazabilidad; **no** el dictamen institucional |
| Un sistema de ranking internacional | No compara universidades en rankings globales |
| Un ERP de la UMSS | Sin nómina, compras ni contabilidad |

---

## 2. Declaración de producto (elevator pitch)

> Para la UMSS, donde la acreditación de carreras aún depende de canales dispersos y poco auditables, **SIGESA** es la **plataforma que centraliza evidencias, validaciones y reportes** con trazabilidad **CEUB/ARCU-SUR**, de modo que la DUEA y las carreras **defiendan la calidad académica** ante auditores y **comuniquen el estado oficial** a la comunidad.

---

## 3. Problema que resuelve

| Dolor actual | Cómo lo aborda SIGESA |
|--------------|------------------------|
| Evidencias en correo, Excel y pendrives | **Fuente única de verdad** con versiones y estados |
| “¿Cuál es la versión válida?” | Historial **append-only**; versión vigente explícita |
| Observaciones desvinculadas de correcciones | Rechazo con causa; nueva carga retoma **EN_REVISION** |
| [JD] sin panorama en tiempo real | **Dashboard** semáforos y reporte PDF |
| Comunidad sin referencia oficial | **Portal público** solo con datos publicados por [JD] |
| Riesgo en auditoría CEUB | Log de auditoría y cadena REQ→UC→TC documentada |

**Línea base de referencia (2026):** búsqueda de documento >20 min/sesión; reportes ejecutivos en horas o días.

---

## 4. Propuesta de valor por segmento

| Segmento | Usuario | Valor principal | Capacidad clave |
|----------|---------|-----------------|-----------------|
| **S1** Ejecución carrera | [CC] | “Sé qué falta y dónde subirlo” | Checklist por indicador + carga guiada |
| **S2** Auditoría DUEA | [TD] | “Defiendo cada decisión con trazabilidad” | Cola de revisión + dictamen + buscador |
| **S3** Gobierno | [JD] | “Veo el estado en minutos, no en días” | Dashboard + PDF + configuración |
| **S4** Comunidad | [P] | “Lo publicado en la web UMSS es oficial” | Portal de consulta controlado |

---

## 5. Principios de producto

| # | Principio | Implicación en diseño |
|---|-----------|------------------------|
| P1 | **Orientación a proceso normativo** | Navegación por proceso/fase/indicador, no por carpetas libres |
| P2 | **Trazabilidad por defecto** | Quién, cuándo, qué versión; sin borrado de aprobados |
| P3 | **Humano en decisiones críticas** | [TD] dictamina; IA solo asiste (RB-11) |
| P4 | **Transparencia gobernada** | Nada sensible en portal sin acción explícita [JD] |
| P5 | **Normativa como configuración** | Plantillas CEUB/ARCU-SUR versionadas, no hardcode frágil |
| P6 | **Accesibilidad operativa** | [CC] puede cargar desde dispositivo móvil (NFR-012) |
| P7 | **Soberanía institucional** | Dominio `@umss.edu.bo`; datos bajo políticas UMSS |

---

## 6. Capacidades núcleo (definición funcional)

```text
                    ┌─────────────────────────────────────┐
                    │           SIGESA (plataforma)        │
                    └─────────────────────────────────────┘
         ┌──────────────┬──────────────┬──────────────┬──────────────┐
         ▼              ▼              ▼              ▼              ▼
    Identidad      Gestión         Workflow      Inteligencia    Transparencia
    y acceso       documental      acreditación  y reportes      pública
    (IAM)          (evidencias)    (dictamen)    (dashboard)     (portal)
```

| Capacidad | Descripción breve | UC ref. |
|-----------|-------------------|---------|
| **Identidad** | Login UMSS, roles [CC]/[TD]/[JD] | UC-001 |
| **Catálogo** | Facultades, carreras, procesos | UC-010 |
| **Evidencias** | Carga, versionado, hash, S3 | UC-002 |
| **Dictamen** | Aprobar/rechazar, avance subfase | UC-003 |
| **Visibilidad** | Semáforos, filtros, drill-down | UC-004 |
| **Reporting** | PDF ejecutivo uso interno | UC-005 |
| **Alertas** | Correo en eventos críticos | UC-006 |
| **Búsqueda** | FTS/metadatos documentos | UC-007 |
| **Auditoría** | Log append-only | UC-009 |
| **Operación** | Respaldos y salud | UC-011 |
| **Mejora** | Plan vinculado a indicador | UC-012 |
| **Público** | Estado publicado + certificados (evolutivo) | UC-008 |

Detalle exhaustivo: `03_prd/PRD.md` §8 y `04_fsd/casos_uso.md`.

---

## 7. Diferenciadores respecto al proceso manual

| Aspecto | Proceso manual | SIGESA |
|---------|----------------|--------|
| Ubicación evidencia | Dispersa | Centralizada por indicador |
| Estado de revisión | Implícito / oral | Explícito (Pendiente → En revisión → Aprobado/Rechazado) |
| Cierre de fase | Negociación informal | Regla RB-03 en sistema |
| Reporte a autoridades | Compilación manual | PDF ≤ 5 min (objetivo NFR-002) |
| Defensa ante auditor | Carpetas físicas | Export + log + versiones |
| Transparencia externa | Informal / PDF suelto | Portal con publicación [JD] |

---

## 8. Modelo de negocio (institucional)

| Dimensión | Modelo |
|-----------|--------|
| **Comprador / sponsor** | DUEA UMSS (presupuesto institucional / proyecto AcredIA) |
| **Usuarios** | Internos UMSS + consulta pública anónima |
| **Monetización** | No aplica (servicio interno) |
| **Éxito** | Menos incidentes en auditoría, menos retrabajo, mayor confianza social |
| **Mantenimiento** | Evolución por releases (MVP → v1.0 → v2); plantillas normativas actualizables |

---

## 9. Personas resumidas

| Persona | Rol | Meta en SIGESA |
|---------|-----|----------------|
| **María Elena** | [CC] | Cumplir plazos de carga sin perder versiones |
| **Andrea** | [TD] | Revisar con orden y justificar rechazos |
| **Claudia** | [JD] | Decidir con datos agregados y reportar al Consejo |
| **Valeria** | [P] | Consultar estado oficial de la carrera |

Narrativa ampliada: `03_prd/PRD.md` §5 y `03_prd/user_journeys.md`.

---

## 10. Métricas de éxito del producto

| Métrica | Meta orientativa | Fuente |
|---------|------------------|--------|
| Tiempo localizar evidencia | ≤ 2 min (muestra UAT) | PRD OS-1 |
| Usuarios activos clave | ≥ 80 % MAU post go-live | PRD OS-2 |
| Generación reporte PDF | P95 ≤ 5 min | NFR-002 |
| Trazabilidad fases activas | 100 % cadena completa | PRD OS-4 |
| Notificaciones críticas | ≤ 15 min | NFR-003 |
| Incidentes pérdida documental por gestión | → 0 | BRD |

---

## 11. Roadmap de producto (visión)

| Oleada | Enfoque |
|--------|---------|
| **MVP** | Flujo CC→TD en piloto (auth, carga, dictamen, notificaciones) |
| **v1.0** | Institucional multi-facultad + dashboard + PDF + portal |
| **v1.x** | Excel, optimización picos CEUB, roles extendidos |
| **v2.0** | SIIS, IA asistida gobernada, evaluador externo |

Detalle: `03_prd/roadmap.md` · `alcance_proyecto.md`.

---

## 12. Relación con otros documentos

| Pregunta | Documento |
|----------|-----------|
| ¿Por qué institucionalmente? | `01_brd/BRD_v1.md` |
| ¿Qué mercado/estrategia? | `02_mrd/MRD.md` |
| ¿Qué construir (backlog)? | `03_prd/PRD.md` |
| ¿Cómo se comporta el sistema? | `04_fsd/FSD.md` |
| ¿Qué entra y qué no? | `alcance_proyecto.md` |
| ¿Cómo se llama cada cosa? | `04_fsd/glosario.md` |

**Jerarquía conceptual:**

```text
Visión de negocio → Definición de producto (este doc) → PRD → FSD → Implementación
```

---

## 13. Glosario mínimo

| Término | Significado |
|---------|-------------|
| **Evidencia** | Documento probatorio ligado a un indicador (no “archivo suelto”) |
| **Indicador** | Unidad mínima evaluable en plantilla CEUB/ARCU-SUR |
| **Proceso** | Ciclo de acreditación de una carrera en una gestión |
| **Dictamen** | Decisión formal del [TD] sobre un indicador |
| **CEUB / ARCU-SUR** | Marcos de acreditación nacional y regional |

Glosario completo: `04_fsd/glosario.md`.

---

## 14. Registro de cambios

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 14/05/2026 | Definición inicial alineada PRD v1.0 y BRD |

---

*SIGESA es el nombre funcional del sistema; **AcredIA** es la iniciativa de transformación digital de la DUEA en la UMSS.*
