# Métricas AI-SDLC y gobernanza de componentes inteligentes — SIGESA / UMSS

> **Métricas de rúbrica (M-RUB-PC/SF/AE):** [`docs/09_trazabilidad/metricas_ai_sdlc.md`](docs/09_trazabilidad/metricas_ai_sdlc.md)  
> **Matriz e informe:** [`docs/09_trazabilidad/`](docs/09_trazabilidad/)

---

| Metadato | Valor |
|----------|-------|
| **Versión** | v1.0 |
| **Fecha** | 14/05/2026 |
| **Normas de referencia** | ISO/IEC 25010 (calidad del producto), ISO/IEC 23894 (IA — gestión de riesgos), LFSD `RB-11` (IA explicable y supervisada v2) |
| **Alcance** | Ciclo de vida de software asistido por IA (prompts, agentes, generación de reportes, clasificación asistida futura) |
| **Paquete AcredIA (PCOV/SFID/TII, mapa UC)** | `team/Marlene/09_trazabilidad/metricas_ai_sdlc.md` |

---

## 1. Marco de medición

| Dimensión | Propósito |
|-----------|-----------|
| **Calidad del prompt** | Reducir ambigüedad y deriva respecto a `docs/LFSD.md` |
| **Calidad de salida IA** | Precisión, completitud, alineación normativa CEUB/ARCU-SUR |
| **Robustez** | Comportamiento ante entradas inválidas o adversariales |
| **Operación** | Latencia, costo, disponibilidad de pipelines IA |
| **Gobernanza** | Trazabilidad, auditabilidad, explicabilidad, cumplimiento |
| **DevSecOps** | Secretos, supply chain de modelos, políticas de despliegue |

---

## 2. Catálogo de métricas (formato estándar)

**Leyenda frecuencia:** `RT` tiempo real · `D` diaria · `W` semanal · `M` mensual · `REL` por release.

### M-AI-001 — Score de claridad del prompt (prompt clarity index)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Índice de claridad del prompt |
| **Descripción** | Mide si el prompt incluye rol, contexto UMSS, restricciones de salida, formato y referencia explícita al LFSD/PRD. |
| **Fórmula** | `PCI = (checks_ok / 10) * 100`, donde checks incluyen: objetivo, actor, precondiciones, formato salida, citas documentales, prohibición de datos ficticios, idioma, longitud máxima, política de hallazgos, escalamiento. |
| **Fuente de datos** | Repositorio `PROMPT_MAPPING.md`, PR en `.cursor/rules`, registro en ADR de prompts productivos. |
| **Frecuencia** | W |
| **Umbral objetivo** | PCI ≥ 85 % en prompts productivos |
| **Riesgo asociado** | Salidas inventadas o inconsistentes con acreditación (RISK-DAT-01). |
| **Acción correctiva** | Plantilla obligatoria de prompt-contrato (LFSD §7); revisión por par [TD]/Tech Lead. |

### M-AI-002 — Precisión factual en dominio acreditación (domain accuracy)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Precisión de contenido en dominio CEUB/ARCU-SUR |
| **Descripción** | % de afirmaciones verificables contra `docs/LFSD.md` o fuentes normativas aprobadas por DUEA. |
| **Fórmula** | `Acc = V / (V + E + H)` · V=verificadas correctas, E=erróneas, H=alucinación (sin fuente). |
| **Fuente de datos** | Dataset de evaluación interno (golden set por UC), revisión humana muestreada. |
| **Frecuencia** | M + REL |
| **Umbral objetivo** | Acc ≥ 95 % en golden set; 0 tolerancia en BR-015 / RB-03 |
| **Riesgo asociado** | Dictamen o texto orientador incorrecto para carrera. |
| **Acción correctiva** | RAG restringido a corpus aprobado; bloqueo de publicación sin “human-in-the-loop”. |

### M-AI-003 — Cobertura de pruebas automatizadas en flujos IA-asistidos

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Cobertura de tests en código tocado por agentes IA |
| **Descripción** | Evita regresiones en módulos donde la IA propuso parches. |
| **Fórmula** | `Cov_IA = líneas_cubiertas_módulos_tocados_IA / líneas_totales_mismos_módulos` (o rama Cobertura jest/pytest acordada). |
| **Fuente de datos** | CI (GitHub Actions / GitLab CI), informe coverage. |
| **Frecuencia** | REL |
| **Umbral objetivo** | ≥ 80 % dominio core (LFSD §12 plan de pruebas) |
| **Riesgo asociado** | Merge de código no validado por suites. |
| **Acción correctiva** | Gate de CI obligatorio; rechazo merge si Cov_IA cae > 5 pp sin ADR. |

### M-AI-004 — Deriva semántica entre prompts versionados (semantic drift)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Drift semántico inter-versiones |
| **Descripción** | Mide cambio de intención entre versiones consecutivas del mismo prompt-contrato. |
| **Fórmula** | `Drift = 1 - cos_sim(embedding(P_n), embedding(P_{n-1}))` (umbral operativo calibrado localmente) **o** score manual 1–5 en revisión. |
| **Fuente de datos** | Historial Git de prompts; opcional embeddings on-prem. |
| **Frecuencia** | W |
| **Umbral objetivo** | Drift manual ≤ 2/5 o cos_sim ≥ 0,92 si se usa embedding |
| **Riesgo asociado** | Comportamiento impredecible del agente en producción. |
| **Acción correctiva** | Congelar versión golden; changelog de prompts obligatorio. |

### M-AI-005 — Robustez ante entradas inválidas (invalid input robustness)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Tasa de rechazo seguro ante entradas fuera de política |
| **Descripción** | El sistema o el agente no deben ejecutar acciones ni filtrar datos sensibles ante prompts de usuario maliciosos. |
| **Fórmula** | `IRR = respuestas_seguras / intentos_adversariales_red_team` |
| **Fuente de datos** | Batería red-team interna (OWASP LLM Top 10 adaptada). |
| **Frecuencia** | M |
| **Umbral objetivo** | IRR = 100 % en casos P0 (filtrado secretos, no SQL desde LLM) |
| **Riesgo asociado** | Exfiltración o bypass de controles. |
| **Acción correctiva** | Sandboxing; políticas de herramienta; sin credenciales en contexto LLM. |

### M-AI-006 — Latencia de respuesta asistida (AI response latency)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | p95 latencia inferencia asistiva |
| **Descripción** | Tiempo desde solicitud hasta respuesta completa en asistentes internos (no bloqueante para UC críticos si es async). |
| **Fórmula** | `L_p95 = percentile(latencias, 0.95)` |
| **Fuente de datos** | APM / logs del gateway de inferencia. |
| **Frecuencia** | RT (agregación D) |
| **Umbral objetivo** | p95 ≤ 8 s asistente interno; operaciones UC síncronos sin dependencia obligatoria de LLM |
| **Riesgo asociado** | Degradación UX coordinador en campo. |
| **Acción correctiva** | Colas async, streaming, modelo más pequeño para clasificación. |

### M-AI-007 — Tasa de falsos positivos en clasificación asistida (v2)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | FPR clasificación evidencias/indicadores |
| **Descripción** | Proporción de sugerencias “cumple” cuando el [TD] marca no cumple. |
| **Fórmula** | `FPR = FP / (FP + TN)` |
| **Fuente de datos** | Tabla de disputas TD vs sugerencia IA (futuro módulo). |
| **Frecuencia** | M |
| **Umbral objetivo** | FPR ≤ 5 % |
| **Riesgo asociado** | Confianza errónea en semáforo o informe. |
| **Acción correctiva** | Umbral de confianza; exigir segunda lectura humana si score < τ. |

### M-AI-008 — Tasa de falsos negativos en clasificación asistida (v2)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | FNR clasificación evidencias/indicadores |
| **Descripción** | Sugerencias “no cumple” cuando el TD valida cumple. |
| **Fórmula** | `FNR = FN / (FN + TP)` |
| **Fuente de datos** | Mismo dataset de disputas. |
| **Frecuencia** | M |
| **Umbral objetivo** | FNR ≤ 8 % |
| **Riesgo asociado** | Retrabajo CC y retraso convocatoria. |
| **Acción correctiva** | Reentrenamiento / few-shot con ejemplos aprobados UMSS. |

### M-AI-009 — Cobertura de observabilidad (OTel completeness)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Cobertura de trazas en endpoints que invocan IA |
| **Descripción** | Trazas con `trace_id`, `span_id`, `model_id`, `prompt_version`, hash de salida (no contenido PII). |
| **Fórmula** | `OtelCov = spans_con_atributos_IA / spans_totales_IA` |
| **Fuente de datos** | OpenTelemetry collector + backend (Jaeger/Tempo). |
| **Frecuencia** | D |
| **Umbral objetivo** | OtelCov = 100 % |
| **Riesgo asociado** | Incidentes no reproducibles. |
| **Acción correctiva** | Middleware estándar en API gateway. |

### M-AI-010 — MTTR incidentes IA (mean time to restore)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | MTTR incidentes relacionados con pipeline IA |
| **Descripción** | Tiempo medio de restauración tras fallo de proveedor modelo o bug en orquestación. |
| **Fórmula** | `MTTR = sum(t_resolve - t_detect) / N_incidentes` |
| **Fuente de datos** | ITSM / etiquetas incidentes “ia-pipeline”. |
| **Frecuencia** | M |
| **Umbral objetivo** | MTTR ≤ 4 h hábiles UMSS para severidad S2 |
| **Riesgo asociado** | Parálisis operativa DUEA en ventana CEUB. |
| **Acción correctiva** | Feature flag kill-switch IA; degradación a flujo 100 % manual. |

### M-AI-011 — Vulnerabilidades dependencias ML/DevSecOps

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Densidad de CVE críticos en imágenes y SDKs IA |
| **Descripción** | Supply chain de contenedores y librerías (`openai`, `langchain`, etc.). |
| **Fórmula** | `CVE_crit = count(CVE_severity>=HIGH)` en imagen release |
| **Fuente de datos** | Trivy / Grype en CI. |
| **Frecuencia** | REL |
| **Umbral objetivo** | 0 CVE críticos sin excepción documentada (ADR) |
| **Riesgo asociado** | Compromiso de entorno DUEA. |
| **Acción correctiva** | Bloqueo de pipeline; actualización base image. |

### M-AI-012 — Cumplimiento trazabilidad salida IA (audit linkage rate)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Tasa de salidas IA vinculadas a ticket/PR/commit |
| **Descripción** | Toda recomendación persistida debe referenciar `trace_id` o `PR#`. |
| **Fórmula** | `ALR = salidas_con_referencia / salidas_persistidas` |
| **Fuente de datos** | BD `ai_suggestions` o comentarios Git con metadatos. |
| **Frecuencia** | W |
| **Umbral objetivo** | ALR = 100 % |
| **Riesgo asociado** | Pérdida de defensa ante auditoría CEUB. |
| **Acción correctiva** | Hook pre-merge que exige metadatos. |

### M-AI-013 — Explicabilidad mínima (explainability coverage)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Cobertura de explicación breve obligatoria |
| **Descripción** | Cada sugerencia IA incluye “por qué” en ≤ 280 caracteres citando indicador o documento. |
| **Fórmula** | `ExplCov = sugerencias_con_why / sugerencias_totales` |
| **Fuente de datos** | Esquema de respuesta JSON validado por JSON Schema. |
| **Frecuencia** | RT |
| **Umbral objetivo** | ExplCov = 100 % |
| **Riesgo asociado** | Violación espíritu RB-11. |
| **Acción correctiva** | Rechazo automático de respuesta sin campo `rationale[]`. |

### M-AI-014 — Costo inferencia por 1000 solicitudes (cost KPI)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | Costo marginal IA |
| **Descripción** | Control presupuestario DUEA / proyecto AcredIA. |
| **Fórmula** | `C_1k = costo_total_inferencia / (requests/1000)` |
| **Fuente de datos** | Facturación proveedor + token contadores. |
| **Frecuencia** | M |
| **Umbral objetivo** | Dentro de partida aprobada en acta; alerta al 80 % |
| **Riesgo asociado** | Sobreuso automatizado. |
| **Acción correctiva** | Rate limit por rol; desactivación funciones no esenciales. |

### M-AI-015 — Tasa de escalamiento humano (human escalation rate)

| Campo | Contenido |
|-------|-------------|
| **Nombre** | HER — Human Escalation Rate |
| **Descripción** | % de casos donde el operador rechaza la sugerencia IA y documenta causa. |
| **Fórmula** | `HER = escalados / sugerencias_presentadas` |
| **Fuente de datos** | UI feedback TD. |
| **Frecuencia** | W |
| **Umbral objetivo** | HER estable (sin picos > 2× media móvil); no un “mínimo” artificial |
| **Riesgo asociado** | HER→0 con confianza ciega o HER→1 con modelo inútil. |
| **Acción correctiva** | Análisis de causa raíz en ambos extremos. |

---

## 3. Dashboard conceptual (paneles)

| Panel | Audiencia | Widgets principales |
|-------|-----------|---------------------|
| **Calidad IA** | Tech Lead | PCI (M-AI-001), Acc (M-AI-002), Drift (M-AI-004) |
| **Operación** | DevOps | L_p95 (M-AI-006), MTTR (M-AI-010), CVE (M-AI-011) |
| **Gobernanza** | Oficial de cumplimiento DUEA | ALR (M-AI-012), ExplCov (M-AI-013), NFR-013 cruzado |
| **Negocio acreditación** | JD | KPI-EVID-COMPLETE, HER (M-AI-015), incidentes por carrera |

---

## 4. Estrategia de monitoreo continuo

1. **CI/CD:** gates M-AI-003, M-AI-011 en cada merge a `main`.  
2. **Staging:** red-team M-AI-005 semanal automatizado + manual mensual.  
3. **Producción:** M-AI-006, M-AI-009 en APM; alertas SLO alineadas NFR-004.  
4. **Revisión de prompts:** M-AI-001, M-AI-004 en comité de cambio previo a release.  
5. **Retención de logs:** conforme política UMSS; **no** almacenar contenido completo de prompts con PII en logs de terceros sin DPIA.

---

## 5. KPIs de IA responsable (resumen ejecutivo)

| KPI responsable | Métrica principal | Umbral |
|-----------------|-------------------|--------|
| No daño | IRR (M-AI-005) | 100 % P0 |
| Equidad / calidad | Acc (M-AI-002) | ≥ 95 % golden |
| Transparencia | ExplCov (M-AI-013) | 100 % |
| Rendición de cuentas | ALR (M-AI-012) | 100 % |
| Supervisión humana | RB-11 + HER monitoreado | Sin política de automatismo total en dictamen |

---

## 6. Métricas de explainability y auditabilidad (detalle)

| Concepto | Implementación recomendada |
|----------|----------------------------|
| **Explainability** | Campo `rationale`, citas a `indicador_id` / `documento_id`; limite de tokens; plantilla fija. |
| **Auditabilidad** | `LOG_AUDITORIA` append-only (LFSD); correlación `trace_id` con sugerencia IA; hash SHA-256 de salida. |
| **Reproducibilidad** | Versionar `model_id`, `temperature`, `prompt_hash` en metadatos. |

---

## 7. DevSecOps e IA (síntesis)

| Control | Métrica | Herramienta típica |
|---------|---------|-------------------|
| Secret scanning | 0 secretos en historial | Gitleaks |
| SCA | CVE policy M-AI-011 | Dependabot / Trivy |
| Política de datos | PII no en prompts de entrenamiento | Clasificación datos |
| Acceso modelo | IAM mínimo privilegio | Cloud IAM |

---

## 8. Registro de cambios

| Versión | Fecha | Nota |
|---------|-------|------|
| v1.0 | 14/05/2026 | Versión inicial SIGESA |

---

*Alineado con `docs/LFSD.md` (NFR §10, riesgos §13, RB-11 visión IA v2).*
