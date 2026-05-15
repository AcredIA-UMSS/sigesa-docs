# User Journeys — SIGESA / AcredIA

> Narrativas visuales de viajes críticos de usuario, mapeadas con diagramas Mermaid journey para ilustrar experiencias clave.

## 1. Viaje del Coordinador de Carrera subsanando una evidencia rechazada

En un contexto de alta presión por fechas límite de acreditación, el [CC] enfrenta frustración y urgencia al recibir una notificación de rechazo en un Indicador clave. El problema central es la necesidad de corregir rápidamente una Evidencia sin perder versiones previas, asegurando que la Fase no se bloquee. Este flujo es crítico porque permite la subsanación append-only, manteniendo la trazabilidad auditada y liberando el proceso normativo sin interrupciones prolongadas.

```mermaid
journey
  title Journey Coordinador subsana evidencia rechazada
  section Descubrir
    Recibo notificacion de rechazo: 5: coordinador
    Entiendo la observacion con dificultad: 4: coordinador
  section Actuar
    Busco la Evidence en el dashboard: 3: coordinador
    Cargo la nueva version de Evidence: 2: coordinador
  section Validar
    Espero la revision del TD: 3: coordinador
    Recibo confirmacion de aprobacion: 5: coordinador
```

## 2. Viaje del Técnico DUEA revisando indicadores en un lote

El [TD] inicia con concentración técnica, pero puede sentir sobrecarga al manejar lotes grandes de Evidencias en múltiples Indicadores. El problema es filtrar eficientemente para auditar solo lo relevante, registrando rechazos con justificación clara para evitar disputas. Este viaje es crítico para la Máquina de Estados, ya que las decisiones del [TD] determinan si una Fase avanza, impactando directamente en el cumplimiento CEUB/ARCU-SUR y la eficiencia institucional.

```mermaid
journey
  title Journey Tecnico DUEA audita lote de indicadores
  section Iniciar
    Abro el panel de auditoria: 4: tecnico
    Selecciono filtros por Fase e Indicador: 3: tecnico
  section Revisar
    Reviso evidencia y versiones: 2: tecnico
    Registro rechazo con justificacion: 3: tecnico
  section Cerrar
    Apruebo indicadores validos: 4: tecnico
    Veo avance de fase actualizado: 5: tecnico
```

## 3. Viaje del Público consultando estado de acreditación

El usuario público, como estudiante o empleador, busca confianza y transparencia en un entorno de incertidumbre sobre la calidad educativa. El problema es acceder a información oficial verificada sin barreras, verificando la trazabilidad de Evidencias para tomar decisiones informadas. Este flujo es crítico para la reputación institucional, ya que la publicación de estados acreditados fomenta la confianza pública y cumple con normativas de transparencia universitaria.

```mermaid
journey
  title Journey Publico consulta estado de acreditacion
  section Acceder
    Ingreso al portal publico: 4: usuario
    Busco carrera especifica: 3: usuario
  section Explorar
    Veo estado actual de Fases: 4: usuario
    Descargo certificado si aprobado: 5: usuario
  section Confiar
    Verifico trazabilidad de Evidencias: 4: usuario
    Comparto informacion confiable: 5: usuario
```

## 4. Viaje de la Jefatura DUEA auditando estado general de facultades

La [JD] opera bajo responsabilidad estratégica, monitoreando el rendimiento institucional para asegurar la continuidad de procesos normativos. El problema es detectar cuellos de botella en una Modalidad como CEUB, revisando métricas consolidadas en un dashboard ejecutivo para intervenir proactivamente. Este viaje es crítico porque permite a la [JD] gestionar riesgos a nivel global, aprobando Procesos y configurando datos maestros, impactando en la eficiencia de todas las Carreras y el cumplimiento regulatorio.

```mermaid
journey
  title Journey Jefatura DUEA audita estado facultades
  section Monitorear
    Accedo dashboard ejecutivo: 4: jefatura
    Filtro por Modalidad CEUB: 3: jefatura
  section Analizar
    Reviso metricas de Indicadores: 2: jefatura
    Detecto cuellos de botella en Fase: 3: jefatura
  section Intervenir
    Apruebo procesos criticos: 4: jefatura
    Configuro alertas para TD: 5: jefatura
```
