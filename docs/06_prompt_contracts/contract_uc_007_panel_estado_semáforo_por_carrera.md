---
source: team/borisAngulo/docs/04_fsd/prompt-contracts.md
id: PC-007
domain: fsd-uc-acredia
---

## PC-007 — Panel de estado con semáforo por carrera y facultad (agrupa FSD-UC-005 canónico)

```markdown
# Role
Eres un agente IA especializado en contratos de prompt para dashboards de seguimiento
con indicadores visuales de riesgo calculados a partir de datos de avance y fechas.

# Task
Especifica el contrato funcional del caso de uso FSD-UC-005 (canónico): panel de estado con
semáforo visual por carrera/facultad, cálculo de porcentaje de avance por criterios
cumplidos y visualización de fechas clave próximas.

# Context
- Entradas: usuario autenticado y rol (determina qué carreras/procesos puede ver).
- Cálculo de avance: actividades_completadas / actividades_totales por proceso.
- Lógica semáforo: Verde = avance ≥ 70 % y sin fecha crítica en < 7 días;
  Amarillo = avance 40–69 % o fecha crítica en < 15 días; Rojo = avance < 40 %
  o fecha crítica vencida.
- Referencias de dominio: BR-008.
- NFR: latencia p95 < 3 000 ms (NFR-001).
- Restricciones: cada usuario ve solo los procesos de su alcance por rol.

# Reasoning
Pasos obligatorios (ejecutar en orden):
1. Obtener procesos visibles para el usuario según rol.
2. Calcular porcentaje de avance por proceso.
3. Evaluar fechas críticas próximas.
4. Asignar color de semáforo según lógica definida.
5. Ordenar por riesgo (Rojo primero, luego Amarillo, luego Verde).
6. Listar invariantes, failure modes y Gherkin.

# Stop condition
Detente cuando: el output incluya invariants, failure_modes, semaphore_logic
y Gherkin para (a) panel con datos correctos y (b) filtrado por rol.

# Output
Formato: JSON
{
  "status": "ok",
  "data": {
    "invariants": [
      "El panel muestra únicamente procesos dentro del alcance del rol del usuario.",
      "El cálculo de avance usa actividades_completadas / actividades_totales del proceso.",
      "El semáforo se recalcula en cada carga del panel (no se cachea más de 5 min).",
      "La respuesta del endpoint del panel cumple NFR-001: p95 < 3 000 ms."
    ],
    "failure_modes": [
      { "code": "PANEL_NO_PROCESSES",    "condition": "Usuario sin procesos visibles en su alcance",             "message": "No hay procesos asignados a su alcance." },
      { "code": "PANEL_CALC_ERROR",      "condition": "División por cero en cálculo (proceso sin actividades)",  "message": "El proceso no tiene actividades registradas; avance = 0 %." },
      { "code": "PANEL_TIMEOUT",         "condition": "Respuesta supera 3 000 ms (NFR-001)",                    "message": "El panel tardó demasiado en cargar. Intente nuevamente." },
      { "code": "PANEL_UNAUTHORIZED",    "condition": "Usuario sin sesión válida accede al panel",               "message": "Sesión requerida para ver el panel." }
    ],
    "semaphore_logic": {
      "Verde":   "avance >= 70% AND días_para_fecha_critica > 15",
      "Amarillo":"(avance >= 40% AND avance < 70%) OR (días_para_fecha_critica <= 15 AND dias > 0)",
      "Rojo":    "avance < 40% OR días_para_fecha_critica <= 0"
    },
    "acceptance_criteria_gherkin": "
      Escenario 1 — Semáforo rojo por fecha vencida:
      Dado un proceso con fecha_fin vencida hace 2 días
      Cuando el Administrador DUEA carga el panel
      Entonces el proceso aparece con indicador Rojo
      Y aparece primero en la lista ordenada por riesgo

      Escenario 2 — Filtrado por rol:
      Dado un Coordinador de la carrera Ingeniería de Sistemas
      Cuando accede al panel
      Entonces ve únicamente los procesos de su carrera
      Y no ve procesos de otras carreras o facultades

      Escenario 3 — Panel sin procesos:
      Dado un Evaluador externo sin procesos asignados
      Cuando accede al panel
      Entonces el sistema responde PANEL_NO_PROCESSES
      Y muestra mensaje informativo sin error
    "
  }
}
```

---
