# Máquina de Estados y Flujos de Proceso (State Machine & Process Flows)

Este documento define la orquestación lógica del sistema SIGESA mediante diagramas de flujo. El sistema se divide en el **Flujo de Proceso Macro** (el ciclo de vida completo de la acreditación) y la **Máquina de Estados Micro** (el ciclo de revisión de un indicador individual).

---

## 1. Flujo Macro de Acreditación (The Accreditation Lifecycle)

El proceso general sigue una ruta estricta gobernada por las decisiones administrativas y la normativa. El flujo comienza con la creación administrativa y finaliza con la certificación pública.

```mermaid
flowchart TD
    %% Nodos iniciales
    Start([Recepción de Solicitud de Acreditación]) --> CreateProcess[Jefatura DUEA crea el Proceso]
    CreateProcess --> SelectModality{Selección de Modalidad}
    
    %% Ramificación de plantillas
    SelectModality -->|CEUB| LoadCEUB[El sistema carga la estructura estática CEUB]
    SelectModality -->|ARCU-SUR| LoadARCU[El sistema carga la estructura estática ARCU-SUR]
    
    %% Fase 1
    LoadCEUB --> Fase1[Fase 1: Autoevaluación]
    LoadARCU --> Fase1
    Fase1 --> Upload[Coordinador de Carrera carga evidencias en Indicadores]
    
    %% Transición a revisión
    Upload --> SendToReview[Coordinador envía Fase 1 a revisión]
    SendToReview --> Review{Técnico DUEA audita evidencias}
    
    %% Fase 2 (Bucle de Subsanación)
    Review -->|Rechaza Evidencias| Fase2[Fase 2: Evaluación Interna / Subsanaciones]
    Fase2 --> Subsanacion[Coordinador carga nuevas versiones ancladas a las observaciones]
    Subsanacion --> Review
    
    %% Fase 3 y cierre
    Review -->|Todo Aprobado| Fase3[Fase 3: Evaluación Externa]
    Fase3 --> Visita[Visita de Pares Evaluadores Externos]
    Visita --> Dictamen[Jefatura registra Dictamen Final]
    Dictamen --> End([Emisión de Certificado y Publicación])
```

---

## 2. Máquina de Estados del Indicador (Micro-Nivel)

La máquina de estados principal reside a nivel del `Indicador`. El estado de toda una `Fase` depende enteramente de la agregación de los estados de sus respectivos indicadores.

El siguiente diagrama muestra el ciclo de vida de un indicador aislado durante las interacciones entre el Coordinador de Carrera (CC) y el Técnico DUEA (TD).

```mermaid
stateDiagram-v2
    direction TB
    
    [*] --> PENDIENTE : Creación del Proceso
    
    PENDIENTE --> SUBIDO : CC carga evidencia inicial
    
    state Revisión_TD {
        SUBIDO --> APROBADO : TD valida evidencia
        SUBIDO --> OBSERVADO : TD rechaza (Genera Observación)
    }
    
    OBSERVADO --> SUBSANADO : CC carga nueva versión (v2) de la evidencia
    
    state Reevaluación_TD {
        SUBSANADO --> APROBADO : TD valida nueva versión
        SUBSANADO --> OBSERVADO : TD rechaza nueva versión (Iteración)
    }
    
    APROBADO --> [*] : Cierre del Indicador
```

### Descripción de Estados Válidos
* **PENDIENTE:** Estado inactivo inicial. El indicador requiere acción por parte del Coordinador de Carrera.
* **SUBIDO:** La evidencia ha sido provista y está en la bandeja de entrada virtual del Técnico DUEA esperando auditoría.
* **OBSERVADO:** El indicador fue evaluado y reprobado. El sistema bloquea el avance del proceso y exige acción inmediata por parte del Coordinador de Carrera.
* **SUBSANADO:** El Coordinador de Carrera ha enviado una corrección. Retorna la responsabilidad de revisión al Técnico DUEA.
* **APROBADO:** Resolución final afirmativa. El indicador ha cumplido la métrica normativa.

---

## 3. Reglas Críticas de Transición (Hard Constraints)

La arquitectura de software debe aplicar la siguiente regla infranqueable a nivel de backend:

**Regla de Cierre de Fase:**
Una `Fase` transiciona a estado `COMPLETADA` (permitiendo abrir la subsecuente) **SI Y SÓLO SI**:
* La cantidad total de Indicadores pertenecientes a la Modalidad es igual a la cantidad de Indicadores en estado `APROBADO`.
* Matemáticamente en base de datos: `COUNT(Total_Indicadores) == COUNT(Indicadores WHERE estado = 'APROBADO')`.

Cualquier indicador que permanezca en `PENDIENTE`, `SUBIDO`, `OBSERVADO` o `SUBSANADO` disparará una excepción de validación que impedirá el cambio de estado de la Fase macro.

