# Arquitectura Funcional y Diagramas Mermaid — SIGESA / UMSS

## Trazabilidad con FSD y documentación de procesos

| Campo | Valor |
|-------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Estado** | Aprobación técnica pendiente |
| **Fuente normativa funcional** | `docs/LFSD.md` (FSD / LFSD AcredIA · SIGESA UMSS; duplicado en `docs/FSD_v1.md`) |
| **Casos de uso FSD** | FSD-UC-001 … FSD-UC-005 (§4 detallado); capacidades adicionales §2.1 (portal, auditoría, respaldos, plan de mejora) trazadas vía PRD / tareas T-00x |
| **Reglas de negocio** | RB-01 … RB-10, BR-013 … BR-015 (`docs/LFSD.md` §5) |
| **Requerimientos funcionales** | PRD-REQ-001 … PRD-REQ-009 (trazabilidad LFSD §12; no numeración FR-xxx en LFSD) |
| **Archivos `.mmd` ejecutables** | Carpeta `08_mermaid/mmd/` (mismo contenido que bloques aquí) |

---

## 1. Introducción y propósito de los diagramas

Los diagramas modelan el comportamiento y la estructura de **SIGESA** para: (1) alinear **desarrollo** y **pruebas** con el FSD; (2) comunicar a **stakeholders** académicos los flujos CEUB/ARCU-SUR; (3) soportar **revisiones arquitectónicas** y **onboarding** de equipos; (4) servir de **baseline** para detectar deriva (*drift*) entre implementación y especificación.

---

## 2. Relación entre diagramas y FSD

| Artefacto FSD | Diagramas que lo materializan |
|---------------|-------------------------------|
| FSD-UC-001 Autenticación | D-SEQ-001, D-CLASS-001 |
| FSD-UC-002 Carga evidencia | D-SEQ-002, D-STA-001, D-ER-001, D-JOURNEY-001 |
| FSD-UC-003 Aprobación / avance | D-SEQ-003, D-STA-001, D-FLOW-001, D-ACT-001 |
| FSD-UC-004 Dashboard y portal | D-COMP-001, D-ARCH-001 |
| FSD-UC-005 Reporte PDF | D-SEQ-004 |
| Notificaciones (PRD-REQ-008; T-007) | D-SEQ-002, D-SEQ-003 |
| Buscador (PRD-REQ-009; T-008) | D-COMP-001 |
| Log auditoría (§2.1; NFR-013) | D-ER-001, D-CLASS-001, D-SEQ-002 |
| Taxonomías CEUB/ARCU-SUR (T-012) | D-STA-002, D-GANTT-002, D-ER-001 |
| Respaldo automático (§2.1) | D-ARCH-001 |
| Plan de mejora (§2.1) | D-ACT-001 |
| Integración SIIS (§2.2 fuera alcance v1) | D-SEQ-005 (futuro v2) |
| Roadmap / despliegue | D-GANTT-001 |

---

## 3. Convenciones y estándares Mermaid

| Convención | Descripción |
|-------------|-------------|
| **IDs de diagrama** | `D-<tipo>-<NNN>-<slug>` en metadatos; archivos `mmd/D-*.mmd` |
| **Idioma en nodos** | Español en etiquetas visibles; **sin tildes** en identificadores técnicos (`EN_REVISION` no `EN REVISIÓN` como ID) |
| **Actores** | `CC` Coordinador carrera · `TD` Técnico DUEA · `JD` Jefatura DUEA · `API` · `DB` · `OBJ` Object storage · `SMTP` · `WORK` Worker |
| **Versionado** | Cada cambio que altere semántica del diagrama incrementa versión del `.mmd` en cabecera comentario |
| **Herramientas** | Mermaid **10.x+** (GitHub, GitLab, VS Code extension, mermaid.live) |

---

## 4. Matriz de trazabilidad (UC · RB · FR · Diagrama)

| FSD-UC / capacidad | Reglas (LFSD §5) | PRD-REQ (LFSD §12) | Diagramas |
|--------------------|----------------|---------------------|-------------|
| UC-001 | RB-06 | PRD-REQ-001, PRD-REQ-002 | D-SEQ-001, D-CLASS-001 |
| UC-002 | RB-02, RB-04, BR-015 | PRD-REQ-003, PRD-REQ-004 | D-SEQ-002, D-STA-001, D-ER-001, D-JOURNEY-001 |
| UC-003 | RB-03, BR-013, BR-014 | PRD-REQ-005 | D-SEQ-003, D-STA-001, D-FLOW-001, D-ACT-001 |
| UC-004 | RB-09, RB-05 | PRD-REQ-006 | D-COMP-001, D-ARCH-001 |
| UC-005 | RB-07 | PRD-REQ-007 | D-SEQ-004 |
| Notificaciones | — | PRD-REQ-008 | D-SEQ-002, D-SEQ-003 |
| Buscador | — | PRD-REQ-009 | D-COMP-001 |
| Auditoría / trazabilidad | RB-04 | NFR-013 (cobertura) | D-ER-001, D-CLASS-001 |
| Plan de mejora (§2.1) | — | Alcance PRD vinculado | D-ACT-001 |
| Integración v2 (§2.2) | — | Fuera alcance v1 | D-SEQ-005 |

---

## 5. Catálogo de diagramas (14)

> Cada subsección incluye: **ID**, **Nombre**, **Objetivo**, **Descripción técnica**, **Actores/componentes**, **Flujo**, **ruta `.mmd`**, y **código Mermaid**.

---

### D-SEQ-001 — Secuencia: autenticación JWT dominio UMSS

| Campo | Valor |
|-------|-------|
| **Objetivo** | Modelar FSD-UC-001 / RB-06 / PRD-REQ-001, PRD-REQ-002 |
| **Actores** | Usuario interno, API Auth, DB Usuario, Auditoría |
| **Flujo** | Credenciales → validación dominio @umss.edu.bo → bcrypt → JWT → log LOGIN |
| **Archivo** | `mmd/D-SEQ-001-auth-jwt.mmd` |

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario_CC_TD_JD
    participant API as API_Auth
    participant DB as PostgreSQL
    participant AUD as Log_Auditoria

    U->>API: POST /auth/login email password
    API->>API: validar dominio umss.edu.bo
    alt dominio invalido
        API-->>U: 403 AUTH_DOMAIN
    else dominio valido
        API->>DB: buscar usuario por email activo
        DB-->>API: usuario hash rol
        alt credencial invalida
            API-->>U: 401 AUTH_INVALID
        else credencial valida
            API->>AUD: append LOGIN exitoso
            API-->>U: 200 JWT accessToken claims rol
        end
    end
```

---

### D-SEQ-002 — Secuencia: carga de evidencia y notificación TD

| Campo | Valor |
|-------|-------|
| **Objetivo** | FSD-UC-002 / RB-02, RB-04, BR-015 / PRD-REQ-003, PRD-REQ-004 |
| **Flujo** | Multipart → validación → hash → S3 → versión → estado EN_REVISION → outbox notificación |
| **Archivo** | `mmd/D-SEQ-002-carga-evidencia.mmd` |

```mermaid
sequenceDiagram
    autonumber
    actor CC as Coordinador_CC
    participant API as API_Documentos
    participant S3 as Object_Storage
    participant DB as PostgreSQL
    participant OUT as Outbox_Notificaciones
    participant WORK as Worker_SMTP

    CC->>API: POST /documentos multipart
    API->>API: validar MIME tamano RB02
    alt error validacion
        API-->>CC: 413 415 403
    else ok
        API->>S3: PUT objeto binario
        S3-->>API: storageKey
        API->>DB: transaccion insert DOCUMENTO version++
        API->>DB: update INDICADOR EN_REVISION
        API->>DB: append AUDITORIA CARGA
        API->>OUT: evento NOTIF_CARGA
        API-->>CC: 201 documentoId version hash
        OUT-->>WORK: async consume
        WORK->>WORK: SMTP a TD asignado
    end
```

---

### D-SEQ-003 — Secuencia: dictamen TD y notificación CC

| Campo | Valor |
|-------|-------|
| **Objetivo** | FSD-UC-003 / RB-03, BR-014 / PRD-REQ-005 |
| **Archivo** | `mmd/D-SEQ-003-dictamen-td.mmd` |

```mermaid
sequenceDiagram
    autonumber
    actor TD as Tecnico_TD
    participant API as API_Workflow
    participant DB as PostgreSQL
    participant OUT as Outbox_Notificaciones

    TD->>API: PATCH /indicadores/id/decision APROBAR o RECHAZAR
    alt RECHAZAR sin justificacion suficiente
        API-->>TD: 422 VAL_JUSTIFICATION_SHORT
    else decision valida
        API->>DB: update INDICADOR estado
        API->>DB: append AUDITORIA APROBACION o RECHAZO
        API->>OUT: NOTIF_DICTAMEN a CC
        API-->>TD: 200 nuevoEstado
    end
```

---

### D-SEQ-004 — Secuencia: generación asíncrona reporte PDF

| Campo | Valor |
|-------|-------|
| **Objetivo** | FSD-UC-005 / RB-07 / PRD-REQ-007 |
| **Archivo** | `mmd/D-SEQ-004-reporte-pdf.mmd` |

```mermaid
sequenceDiagram
    autonumber
    actor JD as Jefatura_JD
    participant API as API_Reportes
    participant DB as PostgreSQL
    participant JOB as Cola_Jobs
    participant WRK as Worker_PDF
    participant OBJ as Object_Storage

    JD->>API: POST /reportes/pdf alcance gestion
    API->>DB: crear job REPORTE ENCOLADO
    API-->>JD: 202 jobId
    JOB->>WRK: consumir job
    WRK->>DB: leer agregados dashboard
    WRK->>WRK: render plantilla RB07 USO_INTERNO
    WRK->>OBJ: guardar PDF temporal TTL
    WRK->>DB: append AUDITORIA REPORTE
    WRK-->>JD: notificacion enlace descarga opcional
```

---

### D-SEQ-005 — Secuencia: integración futura datos maestros (SIIS / ESB)

| Campo | Valor |
|-------|-------|
| **Objetivo** | LFSD §2.2 integración SIIS v2 (fuera alcance v1.0) |
| **Archivo** | `mmd/D-SEQ-005-integracion-siis-futuro.mmd` |

```mermaid
sequenceDiagram
    autonumber
    participant API as SIGESA_API
    participant ESB as Bus_Institucional_Futuro
    participant SIIS as SIIS_UMSS

    Note over API,SIIS: v2 solo lectura enriquecimiento catalogo
    API->>ESB: GET carrera oferta resumida
    alt ESB disponible
        ESB->>SIIS: consulta interna
        SIIS-->>ESB: JSON malla resumen
        ESB-->>API: 200 datos no sensibles
    else indisponible
        ESB-->>API: 503 degradacion sin bloquear carga evidencias
    end
```

---

### D-STA-001 — Estado: ciclo de vida del indicador

| Campo | Valor |
|-------|-------|
| **Objetivo** | Estados coherente con UC-002 y UC-003 |
| **Archivo** | `mmd/D-STA-001-indicador.mmd` |

```mermaid
stateDiagram-v2
    [*] --> PENDIENTE
    PENDIENTE --> EN_REVISION: CC carga documento
    EN_REVISION --> APROBADO: TD aprueba
    EN_REVISION --> RECHAZADO: TD rechaza con causa
    RECHAZADO --> EN_REVISION: CC nueva version
    APROBADO --> EN_REVISION: nueva version permitida RB04
    APROBADO --> [*]: subfase cerrada si todos aprobados
```

---

### D-STA-002 — Estado: proceso de acreditación instancia

| Campo | Valor |
|-------|-------|
| **Objetivo** | Taxonomías proceso CEUB/ARCU-SUR (T-012 LFSD §3; RB-01, RB-08) |
| **Archivo** | `mmd/D-STA-002-proceso-acreditacion.mmd` |

```mermaid
stateDiagram-v2
    [*] --> BORRADOR
    BORRADOR --> EN_PROCESO: JD activa proceso
    EN_PROCESO --> EN_EVALUACION_EXTERNA: convocatoria CEUB fase externa
    EN_EVALUACION_EXTERNA --> ACREDITADO: dictamen favorable
    EN_PROCESO --> NO_ACREDITADO: cierre sin acreditacion
    ACREDITADO --> VENCIDO: fin vigencia resolucion
    EN_PROCESO --> SUSPENDIDO: causa administrativa
    SUSPENDIDO --> EN_PROCESO: reanudacion JD
```

---

### D-ER-001 — ER: núcleo carrera–proceso–indicador–documento–auditoría

| Campo | Valor |
|-------|-------|
| **Objetivo** | Modelo lógico coherente con entidades descritas en LFSD §2.1 y §4 |
| **Archivo** | `mmd/D-ER-001-nucleo-sigesa.mmd` |

```mermaid
erDiagram
    FACULTAD ||--o{ CARRERA : contiene
    CARRERA ||--o{ PROCESO_ACREDITACION : tiene
    PROCESO_ACREDITACION ||--o{ FASE : compone
    FASE ||--o{ SUBFASE : compone
    SUBFASE ||--o{ INDICADOR : define
    INDICADOR ||--o{ DOCUMENTO : evidencia
    USUARIO ||--o{ DOCUMENTO : carga
    USUARIO ||--o{ LOG_AUDITORIA : genera
    CARRERA {
        uuid id PK
        string nombre
        uuid facultad_id FK
    }
    INDICADOR {
        uuid id PK
        string codigo
        string estado
    }
    DOCUMENTO {
        uuid id PK
        int version
        string hash
    }
```

---

### D-GANTT-001 — Gantt: roadmap implementación y pruebas

| Campo | Valor |
|-------|-------|
| **Objetivo** | Plan despliegue alineado PRD/FSD |
| **Archivo** | `mmd/D-GANTT-001-roadmap-implementacion.mmd` |

```mermaid
gantt
    title SIGESA Roadmap implementacion y pruebas UMSS
    dateFormat YYYY-MM-DD
    section Fase0
    Descubrimiento datos maestros     :a1, 2026-06-01, 35d
    section MVP
    Auth roles y catalogo             :a2, after a1, 45d
    Carga evidencia y workflow TD     :a3, after a2, 50d
    section Piloto
    Piloto 1-2 facultades             :a4, after a3, 40d
    UAT firmado DUEA                    :milestone, m1, after a4, 0d
    section Institucional
    Despliegue multi facultad         :a5, after m1, 60d
```

---

### D-GANTT-002 — Gantt: cronograma tipo proceso CEUB (carrera)

| Campo | Valor |
|-------|-------|
| **Objetivo** | Visualizar autoevaluacion revision y cierre |
| **Archivo** | `mmd/D-GANTT-002-cronograma-ceub-carrera.mmd` |

```mermaid
gantt
    title Cronograma tipo acreditacion CEUB carrera UMSS
    dateFormat YYYY-MM-DD
    section Autoevaluacion
    Carga indicadores fase 1          :b1, 2026-08-01, 30d
    Carga indicadores fase 2          :b2, after b1, 25d
    section DUEA
    Revision TD ciclo 1               :b3, after b1, 20d
    Revision TD ciclo 2               :b4, after b2, 20d
    section Cierre
    Preparacion paquete auditoria     :b5, after b4, 15d
    Entrega convocatoria              :milestone, m2, after b5, 0d
```

---

### D-FLOW-001 — Flujo: workflow macro aprobación institucional

| Campo | Valor |
|-------|-------|
| **Objetivo** | Vista proceso CC TD JD |
| **Archivo** | `mmd/D-FLOW-001-workflow-aprobacion.mmd` |

```mermaid
flowchart TB
    subgraph Gestion_UMSS["Gestion acreditacion UMSS"]
        A[JD crea proceso CEUB o ARCU_SUR] --> B[CC carga evidencias por indicador]
        B --> C{TD revision}
        C -->|aprobar| D{Todos indicadores subfase OK RB03}
        C -->|rechazar| B
        D -->|si| E[TD cierra subfase avanza fase]
        D -->|no| B
        E --> F[JD dashboard y reporte PDF]
        F --> G[Publicacion portal controlada JD]
    end
```

---

### D-ARCH-001 — Arquitectura: capas lógicas del sistema

| Campo | Valor |
|-------|-------|
| **Objetivo** | Separación presentación API datos mensajería |
| **Archivo** | `mmd/D-ARCH-001-capas-sistema.mmd` |

```mermaid
flowchart LR
    subgraph Cliente
        SPA[SPA React UMSS]
    end
    subgraph Borde
        LB[Load Balancer TLS]
    end
    subgraph Aplicacion
        API[API REST SIGESA]
        W[Workers PDF SMTP]
    end
    subgraph Datos
        DB[(PostgreSQL)]
        OBJ[(S3 compatible)]
    end
    SPA --> LB --> API
    API --> DB
    API --> OBJ
    API --> W
```

---

### D-COMP-001 — Componentes: módulos y límites

| Campo | Valor |
|-------|-------|
| **Objetivo** | Mapeo FSD módulos M1–M11 |
| **Archivo** | `mmd/D-COMP-001-modulos-sigesa.mmd` |

```mermaid
flowchart TB
    subgraph M1["M1 IAM"]
        A1[Auth JWT]
    end
    subgraph M4["M4 Documentos"]
        A2[Upload versionado]
    end
    subgraph M5["M5 Workflow"]
        A3[Dictamen avance]
    end
    subgraph M7["M7 Reportes"]
        A4[PDF Jobs]
    end
    subgraph M9["M9 Auditoria"]
        A5[Log append only]
    end
    subgraph M10["M10 Publico"]
        A6[Consulta estado]
    end
    A1 --> A2
    A2 --> A3
    A3 --> A4
    A3 --> A5
    A4 --> A5
```

---

### D-CLASS-001 — Clases: dominio simplificado

| Campo | Valor |
|-------|-------|
| **Objetivo** | Responsabilidades y asociaciones clave (LFSD §2.1 auditoría / NFR-013) |
| **Archivo** | `mmd/D-CLASS-001-dominio-sigesa.mmd` |

```mermaid
classDiagram
    class Usuario {
        +UUID id
        +String email
        +Rol rol
        +Boolean activo
    }
    class Carrera {
        +UUID id
        +String nombre
    }
    class ProcesoAcreditacion {
        +UUID id
        +TipoAcreditacion tipo
        +Integer gestion
        +EstadoProceso estado
    }
    class Indicador {
        +UUID id
        +String codigo
        +EstadoIndicador estado
    }
    class Documento {
        +UUID id
        +Integer version
        +String hash
    }
    class LogAuditoria {
        +BigInt id
        +String accion
        +DateTime creadoEn
    }
    Usuario "1" --> "*" Documento : carga
    Carrera "1" --> "*" ProcesoAcreditacion
    ProcesoAcreditacion "1" --> "*" Indicador : contiene via subfase
    Indicador "1" --> "*" Documento : versiona
    Usuario "1" --> "*" LogAuditoria : genera
```

---

### D-JOURNEY-001 — User Journey: coordinador carga evidencia CEUB

| Campo | Valor |
|-------|-------|
| **Objetivo** | Experiencia CC en plazo convocatoria |
| **Archivo** | `mmd/D-JOURNEY-001-coordinador-carga.mmd` |

```mermaid
journey
    title Coordinador carrera UMSS carga evidencia CEUB
    section Preparacion
      Revisar lista indicadores pendientes: 4: CC
      Reunir PDFs en facultad: 3: CC
    section SIGESA
      Subir archivo y descripcion: 5: CC
      Recibir confirmacion version: 5: CC
    section DUEA
      Esperar revision TD: 2: CC
      Corregir si observado: 3: CC
```

---

### D-ACT-001 — Actividad: observaciones y plan de mejora

| Campo | Valor |
|-------|-------|
| **Objetivo** | Plan de mejora post-rechazo (LFSD §2.1 alcance) |
| **Archivo** | `mmd/D-ACT-001-observaciones-mejoras.mmd` |

```mermaid
flowchart TD
    Start([Indicador RECHAZADO]) --> CC1[CC crea plan mejora PROPUESTO]
    CC1 --> TD1[TD revisa plan]
    TD1 -->|requiere ajuste| CC1
    TD1 -->|acepta| EJ[CC ejecuta acciones en carrera]
    EJ --> EVID[CC adjunta evidencia cumplimiento]
    EVID --> TD2[TD marca EVIDENCIADO]
    TD2 --> CERR[TD cierra plan CERRADO]
    CERR --> End([Fin trazabilidad en auditoria])
```

---

## 6. Criterios de aceptación de la documentación gráfica

1. Los **14** diagramas renderizan sin error en **mermaid.live** y en GitLab/GitHub.  
2. La matriz §4 cubre los **cinco** casos de uso detallados en LFSD §4 (FSD-UC-001 … UC-005) y las capacidades transversales citadas en §2.1 / §12.  
3. Cada `.mmd` incluye comentario de cabecera con `diagramId`, `fsdTrace`, `version`.

---

## 7. Registro de cambios

| Versión | Fecha | Descripción |
|---------|-------|-------------|
| v1.0 | 14/05/2026 | 14 diagramas + matriz trazabilidad FSD |

---

*Documento maestro: `08_mermaid/ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md`*
