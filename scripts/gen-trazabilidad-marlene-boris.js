const fs = require('fs');
const path = require('path');

const counts = require('../_aportes_counts.json');

function invRows(items, startId = 1) {
  return items
    .map((it, i) => {
      const id = `T-${String(startId + i).padStart(3, '0')}`;
      const cat = (it.cat || it[0] || 'Doc').replace(/\|/g, '/');
      const desc = (it.desc || it[1] || '')
        .replace(/\|/g, '/')
        .replace(/\r?\n/g, ' ')
        .trim()
        .slice(0, 72);
      const ref = (it.ref || '').replace(/\\/g, '/');
      return `| ${id} | ${cat} | ${desc} | ${ref} | Entregada |  |`;
    })
    .join('\n');
}

function writeMarlene() {
  const base = 'team/Marlene';
  const items = counts.Marlene;
  const extra = [
    {
      cat: 'Trazabilidad',
      desc: 'AUDITORIA_RUBRICAS_EXCELENTE.md v1.0',
      ref: `${base}/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`,
      estado: 'Entregada',
      obs: 'Sesion 16/05/2026',
    },
    {
      cat: 'Trazabilidad',
      desc: 'INVENTARIO_TAREAS_APORTES_v1.md v1.0',
      ref: `${base}/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md`,
      estado: 'Entregada',
      obs: 'Cuadre _aportes_counts + gaps',
    },
    {
      cat: 'Matriz trazabilidad',
      desc: 'matriz_trazabilidad.md canonica',
      ref: `${base}/08_trazabilidad/matriz_trazabilidad.md`,
      estado: 'Recomendada',
      obs: 'GAP-M01',
    },
    {
      cat: 'Metricas AI-SDLC',
      desc: 'metricas_ai_sdlc.md en carpeta equipo',
      ref: `${base}/08_trazabilidad/metricas_ai_sdlc.md`,
      estado: 'Recomendada',
      obs: 'GAP-M02',
    },
    {
      cat: 'Bitacora',
      desc: 'log_interno.md con entradas de sesion',
      ref: `${base}/log_interno.md`,
      estado: 'Entregada parcial',
      obs: 'Archivo existe; vacio',
    },
    {
      cat: 'POC',
      desc: 'POC ejecutada con evidencia',
      ref: `${base}/11_pocs/`,
      estado: 'Recomendada',
      obs: 'GAP-M06',
    },
  ];

  let rows = invRows(items);
  const startExtra = items.length + 1;
  extra.forEach((e, i) => {
    const id = `T-${String(startExtra + i).padStart(3, '0')}`;
    rows += `\n| ${id} | ${e.cat} | ${e.desc} | ${e.ref} | ${e.estado} | ${e.obs} |`;
  });
  const total = items.length + extra.length;

  const audit = `# Auditoría rúbricas «Excelente» — \`team/Marlene\`

| Metadato | Valor |
|----------|-------|
| **Autor auditoría** | Agente IA |
| **Fecha verificación** | 16/05/2026 |
| **Alcance** | **Únicamente** \`team/Marlene/\` (sin \`docs/\` raíz, \`templates/\`, \`context/\`) |
| **Inventario** | \`INVENTARIO_TAREAS_APORTES_v1.md\` (${total} ítems T-001…T-${String(total).padStart(3, '0')}) |
| **Método** | Conteo archivos, grep IDs, revisión \`07_diagramas/MAR-*\`, \`_aportes_counts.json\` |

---

## Resumen ejecutivo

| Criterio | Peso | Veredicto | Evidencia principal | Observación |
|----------|------|-----------|---------------------|-------------|
| BRD — volumen y profundidad | 5 % | **CUMPLE** | \`01_brd/BRD.md\` (22 §\`##\`, SMART §5, ROI §7) | Firmas institucionales pendientes |
| MRD — volumen y profundidad | 5 % | **CUMPLE** | \`02_mrd/MRD.md\` — segmentos, JTBD, VoC | — |
| PRD — volumen y profundidad | 10 % | **CUMPLE** | **22** \`PRD-US-001…022\`; journeys §11; roadmap §12 | §19 cita FSD-UC-013/014 inexistentes |
| FSD — volumen y profundidad | 15 % | **CUMPLE** | \`04_fsd/FSD.md\` — **12** \`FSD-UC\`, >45 elementos | 1029+ líneas |
| Casos de uso + Gherkin | 10 % | **PARCIAL** | \`05_nfr/CU_BDD.md\` (11 UC-SIG); FSD §12 agregado | Sin §4.1 camino triste por UC en FSD |
| NFR ISO 25010 | 10 % | **PARCIAL** | **10** \`NFR-ED/SEG/FIA/…\` en \`06_prompt_contracts/NFR.md\` | Naming distinto a \`NFR-001…015\`; +10 \`NFR_IA\` |
| Prompt-contracts | 10 % | **PARCIAL** | **20** \`PC-NFR-*.prompt.md\` | Orientados a verificación NFR, no \`PC-001\` por UC |
| Diagramas Mermaid | 10 % | **CUMPLE** | **18** \`MAR-*\` en \`07_diagramas/\`; 12/12 UC | 16 borradores \`mmd/D-*\` no canónicos |
| AGENTS + Skills + Rules | 15 % | **PARCIAL** | \`08_agents/agents/AGENTS.md\` + **2** skills en \`SKILLS.md\` | Umbral ref. 7 skills |
| Trazabilidad + métricas AI-SDLC | 10 % | **NO CUMPLE** | \`10_aportes/release-1.0.0.md\`; sin matriz/métricas canónicas | Este inventario + auditoría cierran gap parcial |

**Puntuación:** **7/10** criterios «Excelente» en alcance \`team/Marlene/\`.

---

## 1. BRD (5 %) — CUMPLE

**Fuente:** \`01_brd/BRD.md\`

| # | Elemento rúbrica | ¿Cumple? |
|---|------------------|:--------:|
| 1–10 | Objetivos SMART, stakeholders, business case, alcance, KPIs, restricciones, supuestos, riesgos, gobernanza, criterios de éxito | Sí (§5–§19) |

---

## 2. MRD (5 %) — CUMPLE

**Fuente:** \`02_mrd/MRD.md\` — segmentos §4, JTBD §5, trazabilidad §14.

---

## 3. PRD (10 %) — CUMPLE

| Requisito | Estado |
|-----------|--------|
| ≥20 user stories | **22/22** \`PRD-US-001…022\` |
| ≥2 journeys | **2** (§11 J-01, J-02) |
| Roadmap | §12 |

---

## 4. FSD (15 %) — CUMPLE

| Tipo | Cantidad |
|------|----------|
| Casos de uso | **12** \`FSD-UC-001…012\` §10 |
| Reglas / API / modelo | §11–§18 |
| Gherkin | §12 + \`CU_BDD.md\` |

---

## 5. UC + Gherkin (10 %) — PARCIAL

\`CU_BDD.md\`: 11 bloques UC-SIG con escenarios BDD. FSD no incluye bloque §4.1 «camino triste» por cada UC.

---

## 6. NFR ISO (10 %) — PARCIAL

| Archivo | Contenido |
|---------|-----------|
| \`06_prompt_contracts/NFR.md\` | 10 NFR con matriz ISO |
| \`06_prompt_contracts/NFR_IA.md\` | 10 \`NFR-IA-01…10\` |

Umbral referencia aylen: 15 \`NFR-001…015\`.

---

## 7. Prompt-contracts (10 %) — PARCIAL

**20** archivos \`PC-NFR-*.prompt.md\` con estructura de contrato; índice \`07_diagramas/Prompt_Contracts_SIGESA_IA_v1.md\`.

---

## 8. Diagramas (10 %) — CUMPLE

**18** \`MAR-*\` oficiales (11 seq, 3 state, 2 ER, 2 Gantt); \`07_diagramas/README.md\`.

---

## 9. AGENTS + Skills (15 %) — PARCIAL

| Artefacto | Cantidad |
|-----------|----------|
| AGENTS.md | \`08_agents/agents/AGENTS.md\` |
| Skills | **2** (\`sigesa-generacion-historias-usuario\`, \`sigesa-validacion-maquina-estados\`) |

---

## 10. Trazabilidad (10 %) — NO CUMPLE

| Entregable | Estado |
|------------|--------|
| \`matriz_trazabilidad.md\` | Ausente |
| \`metricas_ai_sdlc.md\` | Ausente en carpeta |
| \`INVENTARIO_TAREAS_APORTES_v1.md\` | **Este documento + inventario v1.0** |
| \`10_aportes/release-1.0.0.md\` | Matriz TR-xx densa (sustituto parcial) |

---

## 11. Gaps (solo Marlene)

| ID | Área | Descripción | Severidad |
|----|------|-------------|-----------|
| GAP-M01 | Trazabilidad | Crear \`matriz_trazabilidad.md\` | Alta |
| GAP-M02 | Métricas | \`metricas_ai_sdlc.md\` local | Media |
| GAP-M03 | PRD/FSD | Corregir refs UC-013/014 en PRD §19 | Baja |
| GAP-M04 | Skills | Ampliar a 7 skills accionables | Media |
| GAP-M05 | Gherkin | §4.1 caminos tristes por UC en FSD | Media |
| GAP-M06 | POC | Carpeta \`11_pocs/\` con ejecución | Media |
| GAP-M07 | Repo | Consolidar duplicados \`07_diagramas/mmd/D-*\` | Baja |
| GAP-M08 | Bitácora | Poblar \`log_interno.md\` | Baja |

---

## Referencias

- Inventario: \`INVENTARIO_TAREAS_APORTES_v1.md\`
- Índice diagramas: \`07_diagramas/README.md\`
- Registro global: \`PROMPT_MAPPING.md\`
`;

  const inv = `# Inventario de tareas (aportes) — Marlene v1.0

| Metadato | Valor |
|----------|-------|
| **Total tareas** | ${total} (T-001…T-${String(total).padStart(3, '0')}) |
| **Autor** | Marlene (equipo AcredIA) |
| **Fecha inventario** | 16/05/2026 |
| **Última verificación** | 16/05/2026 — solo \`team/Marlene/\` |
| **Auditoría** | \`08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md\` |

## Resumen de verificación

| Estado | Cantidad | % |
|--------|----------|---|
| **Entregada** | ${items.length} | ${((items.length / total) * 100).toFixed(1)} % |
| **Entregada parcial** | 1 | — |
| **Recomendada** | ${extra.filter((e) => e.estado === 'Recomendada').length} | — |

**Artefactos físicos:** ~60 archivos \`.md\` / \`.mmd\` / \`.prompt.md\` bajo \`team/Marlene/\` (excl. duplicados \`08_agents/mmd/\`).

## Reglas de conteo (oficial APORTES / release 1.0.0)

Ver \`templates/APORTES_TEMPLATE.md\` y \`docs/10_aportes/APORTES_RELEASE_1.0.0.md\`.

**Alcance v1.0:** solo rutas bajo \`team/Marlene/\`.

## Cuadre estricto vs reglas

| Tipo | Esperado | Inventario | ¿Completo? |
|------|----------|------------|------------|
| User story | 22 | T-063…084 (aprox.) | **Sí** |
| FSD-UC | 12 | filas FSD en inventario | **Sí** |
| Diagrama \`MAR-*\` | 18 | filas Diagrama | **Sí** (no sumar \`D-*\` borrador) |
| NFR ISO | 10 (+10 IA) | NFR.md + NFR_IA | **Parcial** vs 15 ISO ref. |
| PC \`.prompt.md\` | 20 | \`06_prompt_contracts/\` | **Sí** (tipo NFR) |
| Skills | 7 ref. | 2 en SKILLS.md | **No** |
| Matriz + métricas | 2 | pendiente | **No** |
| POC ejecutada | 2 | 0 | **No** |

**Tareas únicas alineadas a reglas (estricto):** **~115–120** (base ${items.length} menos duplicados lógicos de secciones repetidas en aportes).

## Registro T-001 a T-${String(total).padStart(3, '0')}

| ID | Categoria | Descripcion | Referencia | Estado | Observacion |
|----|-----------|-------------|------------|--------|-------------|
${rows}
`;

  fs.mkdirSync(`${base}/08_trazabilidad`, { recursive: true });
  fs.writeFileSync(`${base}/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`, audit, 'utf8');
  fs.writeFileSync(`${base}/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md`, inv, 'utf8');
  console.log('Marlene OK', total);
}

function writeBoris() {
  const base = 'team/borisAngulo';
  const docsBase = `${base}/docs`;
  const items = counts.borisAngulo;
  const extra = [
    {
      cat: 'Trazabilidad',
      desc: 'AUDITORIA_RUBRICAS_EXCELENTE.md v1.0',
      ref: `${docsBase}/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`,
      estado: 'Entregada',
      obs: 'Sesion 16/05/2026',
    },
    {
      cat: 'Trazabilidad',
      desc: 'INVENTARIO_TAREAS_APORTES_v1.md v1.0',
      ref: `${docsBase}/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md`,
      estado: 'Entregada',
      obs: '',
    },
    {
      cat: 'Insumo negocio',
      desc: '01_vision_negocio_v2.txt',
      ref: `${base}/01_vision_negocio_v2.txt`,
      estado: 'Entregada',
      obs: 'Fuera de docs/; insumo BRD',
    },
    {
      cat: 'Matriz trazabilidad',
      desc: 'matriz_trazabilidad.md canonica',
      ref: `${docsBase}/08_trazabilidad/matriz_trazabilidad.md`,
      estado: 'Recomendada',
      obs: 'Formalizar trazabilidad-sigesa.md',
    },
    {
      cat: 'Metricas AI-SDLC',
      desc: 'metricas_ai_sdlc.md archivo fisico',
      ref: `${docsBase}/08_trazabilidad/metricas_ai_sdlc.md`,
      estado: 'Recomendada',
      obs: 'Citado en AGENTS §13',
    },
    {
      cat: 'Bitacora',
      desc: 'log_interno.md',
      ref: `${base}/log_interno.md`,
      estado: 'Recomendada',
      obs: 'GAP-B06',
    },
    {
      cat: 'NFR IA',
      desc: 'NFR_IA.md complemento',
      ref: `${docsBase}/06_nfr/NFR_IA.md`,
      estado: 'Recomendada',
      obs: 'GAP-B05',
    },
    {
      cat: 'POC',
      desc: 'POC ejecutada',
      ref: `${docsBase}/11_pocs/`,
      estado: 'Recomendada',
      obs: 'GAP-B08',
    },
  ];

  let rows = invRows(items);
  const startExtra = items.length + 1;
  extra.forEach((e, i) => {
    const id = `T-${String(startExtra + i).padStart(3, '0')}`;
    rows += `\n| ${id} | ${e.cat} | ${e.desc} | ${e.ref} | ${e.estado} | ${e.obs} |`;
  });
  const total = items.length + extra.length;

  const audit = `# Auditoría rúbricas «Excelente» — \`team/borisAngulo\`

| Metadato | Valor |
|----------|-------|
| **Autor auditoría** | Agente IA |
| **Fecha verificación** | 16/05/2026 |
| **Alcance** | \`team/borisAngulo/\` completo (canónico documental en \`docs/\` + insumo \`01_vision_negocio_v2.txt\`) |
| **Inventario** | \`docs/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md\` (${total} ítems) |
| **Método** | Conteo en \`docs/\`, grep IDs, 11 \`diag-*.mmd\`, \`_aportes_counts.json\` |

---

## Resumen ejecutivo

| Criterio | Peso | Veredicto | Evidencia principal | Observación |
|----------|------|-----------|---------------------|-------------|
| BRD | 5 % | **CUMPLE** | \`docs/01_brd/BRD_v2.md\` | Checklist + PR-FAQ |
| MRD | 5 % | **CUMPLE** | \`docs/02_mrd/MRD.md\` — MRD-N, hipótesis | — |
| PRD | 10 % | **CUMPLE** | **24** \`PRD-US\`; **13** \`PRD-REQ\`; journeys §4.2 | — |
| FSD | 15 % | **PARCIAL** | \`FSD_v1.md\`: 3 UC §4 completos; **12** en \`casos-de-uso.md\` | Modo LFSD mínimo vs detalle separado |
| UC + Gherkin | 10 % | **PARCIAL** | Gherkin fuerte en \`casos-de-uso.md\`; FSD §4 incompleto UC-004…007 | IDs \`CU-*\` vs \`FSD-UC-*\` |
| NFR ISO | 10 % | **PARCIAL** | **10** \`NFR-001…010\` en \`nfr_iso25010.md\` | Sin \`NFR_IA.md\`; umbral ref. 15 |
| Prompt-contracts | 10 % | **CUMPLE** | **14** \`PC-001…014\` en \`prompt-contracts.md\` | 0 \`.prompt.md\` sueltos |
| Diagramas | 10 % | **PARCIAL** | **11** \`diag-*.mmd\` | Faltan seq UC-005, 006, 007 |
| AGENTS + Skills | 15 % | **PARCIAL** | \`docs/09_agents/AGENTS.md\` v1.2 + **4** skills | Umbral ref. 7 |
| Trazabilidad + métricas | 10 % | **PARCIAL** | \`trazabilidad-sigesa.md\`; sin métricas/inventario previo | Inventario + auditoría nuevos |

**Puntuación:** **6/10** criterios «Excelente».

---

## 3. PRD — CUMPLE

24 user stories; 2 journeys Mermaid; roadmap §3; WSJF §6.

---

## 4. FSD — PARCIAL

| Fuente | UC desarrollados |
|--------|------------------|
| \`FSD_v1.md\` §4 | UC-001, UC-002, UC-003 |
| \`casos-de-uso.md\` | CU-001…012 (Gherkin) |
| Tabla tasks FSD | UC-004…007 referenciados |

---

## 6. NFR — PARCIAL

10 NFR cuantificados con verificación; trazas a FSD-UC y PRD-REQ.

---

## 7. PC — CUMPLE

14 contratos en \`docs/04_fsd/prompt-contracts.md\` (6 elementos + invariants + failure).

---

## 8. Diagramas — PARCIAL

11 archivos: seq (3), state (2), ER, Gantt, C4, flow, class, pie NFR.

---

## 9. AGENTS — PARCIAL

AGENTS.md con gobierno AI-SDLC; skills skill-001…004.

---

## 10. Trazabilidad — PARCIAL

\`trazabilidad-sigesa.md\` (gaps GAP-001…005); falta \`metricas_ai_sdlc.md\` físico.

---

## Gaps borisAngulo

| ID | Descripción | Severidad |
|----|-------------|-----------|
| GAP-B01 | Completar FSD §4 UC-004…007 | Alta |
| GAP-B02 | Unificar CU-* → FSD-UC-* | Media |
| GAP-B03 | \`matriz_trazabilidad.md\` | Media |
| GAP-B04 | Diagramas seq panel/alertas/PDF | Media |
| GAP-B05 | NFR-011…015 + NFR_IA | Media |
| GAP-B06 | \`log_interno.md\` | Baja |
| GAP-B07 | +3 skills (→7) | Media |
| GAP-B08 | POC con evidencia | Media |

---

## Referencias

- Inventario: \`INVENTARIO_TAREAS_APORTES_v1.md\`
- Trazabilidad narrativa: \`trazabilidad-sigesa.md\`
`;

  const inv = `# Inventario de tareas (aportes) — borisAngulo v1.0

| Metadato | Valor |
|----------|-------|
| **Total tareas** | ${total} (T-001…T-${String(total).padStart(3, '0')}) |
| **Autor** | Boris Angulo (equipo AcredIA) |
| **Fecha inventario** | 16/05/2026 |
| **Alcance** | \`team/borisAngulo/docs/\` (+ insumo raíz \`01_vision_negocio_v2.txt\`) |
| **Auditoría** | \`docs/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md\` |

## Resumen

| Estado | Cantidad |
|--------|----------|
| **Entregada** | ${items.length + 2} |
| **Recomendada** | ${extra.filter((e) => e.estado === 'Recomendada').length} |

Base automatizada: \`_aportes_counts.json\` → **${items.length}** filas documentales en \`docs/\`.

## Cuadre estricto

| Tipo | Esperado | ¿Completo? |
|------|----------|------------|
| PRD-US | 24 | **Sí** |
| FSD-UC en FSD canónico | 7 ref. / 3 §4 | **Parcial** |
| CU en casos-de-uso | 12 | **Sí** (no duplicar en factor) |
| Diagrama diag-* | 11 | **Sí** |
| PC-001…014 | 14 | **Sí** |
| NFR-001…010 | 10 | **Parcial** vs 15 |
| Skills | 4 | **Parcial** vs 7 |

**Tareas únicas (estricto):** **~185–195**.

## Registro T-001 a T-${String(total).padStart(3, '0')}

| ID | Categoria | Descripcion | Referencia | Estado | Observacion |
|----|-----------|-------------|------------|--------|-------------|
${rows}
`;

  fs.mkdirSync(`${docsBase}/08_trazabilidad`, { recursive: true });
  fs.writeFileSync(`${docsBase}/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md`, audit, 'utf8');
  fs.writeFileSync(`${docsBase}/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md`, inv, 'utf8');
  console.log('boris OK', total);
}

writeMarlene();
writeBoris();
