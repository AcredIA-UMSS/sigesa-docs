#!/usr/bin/env node
/**
 * Genera INVENTARIO_TAREAS_APORTES_v1.md (base) y AUDITORIA_RUBRICAS_EXCELENTE.md (borrador métricas)
 * para integrantes bajo team/<nombre>/.
 *
 * Uso (desde raíz del repo):
 *   node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-auditoria-inventario.js Marlene borisAngulo
 *   node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-auditoria-inventario.js --all
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '../../../../');
const COUNTS_PATH = path.join(REPO, '_aportes_counts.json');

const THRESHOLDS = {
  prdUs: 20,
  fsdUc: 12,
  nfrIso: 15,
  nfrIsoMinPartial: 10,
  pc: 10,
  diagrams: 10,
  skills: 7,
  fsdElements: 30,
};

function today() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function resolveTeamLayout(member) {
  const base = path.join(REPO, 'team', member);
  if (!fs.existsSync(base)) {
    throw new Error(`No existe team/${member}/`);
  }
  const docs = path.join(base, 'docs');
  const hasDocs =
    fs.existsSync(docs) &&
    (fs.existsSync(path.join(docs, '01_brd')) || fs.existsSync(path.join(docs, '03_prd')));
  return {
    member,
    teamRoot: base,
    workRoot: hasDocs ? docs : base,
    trazDir: hasDocs ? path.join(docs, '08_trazabilidad') : path.join(base, '08_trazabilidad'),
    scopeLabel: hasDocs ? `team/${member}/` + ' (canónico en `docs/` + raíz `team/' + member + '/`)' : `team/${member}/`,
    alcanceInv: hasDocs ? `\`team/${member}/docs/\` (+ archivos en \`team/${member}/\` fuera de docs/)` : `\`team/${member}/\``,
  };
}

function walkFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(p, acc);
    else acc.push(p);
  }
  return acc;
}

function readText(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return '';
  }
}

function unique(arr) {
  return [...new Set(arr)];
}

function scanMetrics(layout) {
  const { workRoot, teamRoot } = layout;
  const files = walkFiles(workRoot).concat(walkFiles(teamRoot).filter((p) => !p.startsWith(workRoot)));
  const mdFiles = files.filter((f) => /\.(md|prompt\.md)$/i.test(f));
  const mmdFiles = files.filter((f) => f.endsWith('.mmd'));

  let blob = '';
  for (const f of [...mdFiles, ...mmdFiles]) {
    blob += readText(f) + '\n';
  }

  const prdUs = unique((blob.match(/PRD-US-\d{3}/g) || []).map((x) => x));
  const prdReq = unique((blob.match(/PRD-REQ-\d{3}/g) || []).map((x) => x));
  const fsdUc = unique((blob.match(/FSD-UC-\d{3}/g) || []).map((x) => x));
  const nfr001 = unique((blob.match(/NFR-\d{3}/g) || []).filter((x) => /^NFR-\d{3}$/.test(x)));
  const nfrNamed = unique((blob.match(/NFR-[A-Z]{2,3}-\d{2}/g) || []));
  const nfrIa = unique((blob.match(/NFR-IA-\d{2}/g) || []));
  const pcSections = unique((blob.match(/## PC-\d{3}/g) || []));
  const pcFiles = files.filter((f) => f.endsWith('.prompt.md'));

  const diagDir = path.join(workRoot, '07_diagramas');
  const officialMmd = mmdFiles.filter((f) => {
    if (!f.includes('07_diagramas')) return false;
    if (f.includes(`${path.sep}mmd${path.sep}`) || f.includes('/mmd/')) return false;
    return true;
  });

  const skillsDir = files.filter(
    (f) => /skills[\\/]skill/i.test(f) && f.endsWith('.md')
  );
  let skillCount = skillsDir.length;
  const skillsMd = files.find((f) => /SKILLS\.md$/i.test(f));
  if (skillsMd) {
    const names = (readText(skillsMd).match(/^name:\s*.+$/gm) || []).length;
    skillCount = Math.max(skillCount, names);
  }

  const has = (rel) => fs.existsSync(path.join(workRoot, rel)) || fs.existsSync(path.join(teamRoot, rel));
  const trazRel = layout.workRoot === layout.teamRoot ? '08_trazabilidad' : path.join('docs', '08_trazabilidad').replace(/\\/g, '/');

  return {
    fileCount: unique(mdFiles.concat(mmdFiles)).length,
    prdUs: prdUs.length,
    prdReq: prdReq.length,
    fsdUc: fsdUc.length,
    nfrIso: nfr001.length || nfrNamed.length,
    nfrIa: nfrIa.length,
    pcCount: Math.max(pcSections.length, pcFiles.length),
    diagrams: officialMmd.length,
    skills: skillCount,
    hasMatriz: has('08_trazabilidad/matriz_trazabilidad.md'),
    hasMetricas: has('08_trazabilidad/metricas_ai_sdlc.md'),
    hasTrazNarrativa: has('08_trazabilidad/trazabilidad-sigesa.md'),
    hasLog: fs.existsSync(path.join(teamRoot, 'log_interno.md')),
    logEmpty: (() => {
      const p = path.join(teamRoot, 'log_interno.md');
      return fs.existsSync(p) && readText(p).trim().length < 20;
    })(),
    hasPoc: fs.existsSync(path.join(workRoot, '11_pocs')) || fs.existsSync(path.join(teamRoot, '11_pocs')),
    trazRel,
  };
}

function verdict(cond, partial) {
  if (cond) return 'CUMPLE';
  if (partial) return 'PARCIAL';
  return 'NO CUMPLE';
}

function scoreCriteria(m) {
  const brd = verdict(m.fileCount > 5, false);
  const mrd = brd;
  const prd = verdict(m.prdUs >= THRESHOLDS.prdUs, m.prdUs >= 15);
  const fsd = verdict(m.fsdUc >= THRESHOLDS.fsdUc, m.fsdUc >= 3);
  const ucGherkin = verdict(m.fsdUc >= THRESHOLDS.fsdUc, m.fsdUc >= 6);
  const nfr = verdict(
    m.nfrIso >= THRESHOLDS.nfrIso,
    m.nfrIso >= THRESHOLDS.nfrIsoMinPartial || m.nfrIa >= 8
  );
  const pc = verdict(m.pcCount >= THRESHOLDS.pc, m.pcCount >= 6);
  const diag = verdict(m.diagrams >= THRESHOLDS.diagrams, m.diagrams >= 6);
  const agents = verdict(m.skills >= THRESHOLDS.skills, m.skills >= 2);
  const traz = verdict(
    m.hasMatriz && m.hasMetricas,
    m.hasTrazNarrativa || m.hasMatriz
  );

  const rows = [
    ['BRD', '5 %', brd],
    ['MRD', '5 %', mrd],
    ['PRD', '10 %', prd],
    ['FSD', '15 %', fsd],
    ['UC + Gherkin', '10 %', ucGherkin],
    ['NFR ISO 25010', '10 %', nfr],
    ['Prompt-contracts', '10 %', pc],
    ['Diagramas Mermaid', '10 %', diag],
    ['AGENTS + Skills', '15 %', agents],
    ['Trazabilidad + métricas', '10 %', traz],
  ];
  const cumple = rows.filter((r) => r[2] === 'CUMPLE').length;
  return { rows, cumple, total: 10 };
}

function invRows(items) {
  return items
    .map((it, i) => {
      const id = `T-${String(i + 1).padStart(3, '0')}`;
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

function defaultExtras(layout, m) {
  const prefix = layout.workRoot.replace(/\\/g, '/').replace(REPO.replace(/\\/g, '/') + '/', '');
  const traz = layout.trazDir.replace(/\\/g, '/').replace(REPO.replace(/\\/g, '/') + '/', '');
  const extras = [
    {
      cat: 'Trazabilidad',
      desc: 'AUDITORIA_RUBRICAS_EXCELENTE.md',
      ref: `${traz}/AUDITORIA_RUBRICAS_EXCELENTE.md`,
      estado: 'Entregada',
      obs: 'Generado por skill auditoria-excelente-equipo',
    },
    {
      cat: 'Trazabilidad',
      desc: 'INVENTARIO_TAREAS_APORTES_v1.md',
      ref: `${traz}/INVENTARIO_TAREAS_APORTES_v1.md`,
      estado: 'Entregada',
      obs: '',
    },
  ];
  if (!m.hasMatriz) {
    extras.push({
      cat: 'Matriz trazabilidad',
      desc: 'matriz_trazabilidad.md',
      ref: `${traz}/matriz_trazabilidad.md`,
      estado: 'Recomendada',
      obs: 'GAP trazabilidad',
    });
  }
  if (!m.hasMetricas) {
    extras.push({
      cat: 'Metricas AI-SDLC',
      desc: 'metricas_ai_sdlc.md',
      ref: `${traz}/metricas_ai_sdlc.md`,
      estado: 'Recomendada',
      obs: 'GAP metricas',
    });
  }
  if (!m.hasLog) {
    extras.push({
      cat: 'Bitacora',
      desc: 'log_interno.md',
      ref: `team/${layout.member}/log_interno.md`,
      estado: 'Recomendada',
      obs: '',
    });
  } else if (m.logEmpty) {
    extras.push({
      cat: 'Bitacora',
      desc: 'log_interno.md poblado',
      ref: `team/${layout.member}/log_interno.md`,
      estado: 'Entregada parcial',
      obs: 'Archivo vacío',
    });
  }
  if (!m.hasPoc) {
    extras.push({
      cat: 'POC',
      desc: 'POC ejecutada con evidencia',
      ref: `${prefix}/11_pocs/`,
      estado: 'Recomendada',
      obs: '',
    });
  }
  return extras;
}

function buildAudit(layout, m, score, totalTasks) {
  const fecha = today();
  const execRows = score.rows
    .map(
      ([name, peso, v]) =>
        `| ${name} | ${peso} | **${v}** | Ver métricas escaneadas | Revisar manualmente en carpeta |`
    )
    .join('\n');

  return `# Auditoría rúbricas «Excelente» — \`team/${layout.member}\`

| Metadato | Valor |
|----------|-------|
| **Autor auditoría** | Agente IA (skill \`sigesa-auditoria-excelente-equipo\`) |
| **Fecha verificación** | ${fecha} |
| **Alcance** | **Únicamente** ${layout.scopeLabel} (sin \`docs/\` raíz institucional, \`templates/\`, \`context/\`) |
| **Inventario** | \`INVENTARIO_TAREAS_APORTES_v1.md\` (${totalTasks} ítems) |
| **Método** | Escaneo \`${layout.workRoot.replace(/\\/g, '/')}\` + \`_aportes_counts.json\` + revisión manual recomendada |

---

## Resumen ejecutivo

| Criterio | Peso | Veredicto | Evidencia (escaneo) | Observación |
|----------|------|-----------|---------------------|-------------|
${execRows}

**Métricas escaneadas:** PRD-US=${m.prdUs} · FSD-UC=${m.fsdUc} · NFR=${m.nfrIso} (+IA ${m.nfrIa}) · PC=${m.pcCount} · \`.mmd\`=${m.diagrams} · skills=${m.skills} · archivos=${m.fileCount}

**Puntuación automática:** **${score.cumple}/${score.total}** criterios «CUMPLE». **Revisar y ajustar** veredictos tras lectura de BRD/PRD/FSD (el agente debe enriquecer §1–§11 y gaps).

---

## Acción requerida del agente

1. Abrir BRD/MRD/PRD/FSD canónicos y **confirmar o corregir** cada veredicto.
2. Completar secciones §1–§10 con rutas y evidencia literal (como \`team/aylenGonzales/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md\`).
3. Añadir tabla **Gaps** \`GAP-${layout.member.slice(0, 3).toUpperCase()}xx\`.
4. Registrar en \`PROMPT_MAPPING.md\` si el usuario lo solicita.

---

## Referencias

- Inventario: \`INVENTARIO_TAREAS_APORTES_v1.md\`
- Rúbrica: \`.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md\`
- Plantilla referencia: \`team/aylenGonzales/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md\`
`;
}

function buildInventory(layout, m, items, extras) {
  const fecha = today();
  const total = items.length + extras.length;
  let rows = invRows(items);
  extras.forEach((e, i) => {
    const id = `T-${String(items.length + i + 1).padStart(3, '0')}`;
    rows += `\n| ${id} | ${e.cat} | ${e.desc} | ${e.ref} | ${e.estado} | ${e.obs || ''} |`;
  });

  const entregada = items.length + extras.filter((e) => e.estado === 'Entregada').length;
  const recomendada = extras.filter((e) => e.estado === 'Recomendada').length;
  const parcial = extras.filter((e) => e.estado === 'Entregada parcial').length;

  return `# Inventario de tareas (aportes) — ${layout.member} v1.0

| Metadato | Valor |
|----------|-------|
| **Total tareas** | ${total} (T-001…T-${String(total).padStart(3, '0')}) |
| **Autor** | ${layout.member} (equipo AcredIA) |
| **Fecha inventario** | ${fecha} |
| **Alcance** | ${layout.alcanceInv} |
| **Auditoría** | \`08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md\` |

## Resumen de verificación

| Estado | Cantidad |
|--------|----------|
| **Entregada** | ${entregada} |
| **Entregada parcial** | ${parcial} |
| **Recomendada** | ${recomendada} |

**Métricas escaneadas:** PRD-US=${m.prdUs} · FSD-UC=${m.fsdUc} · diagramas=${m.diagrams} · PC=${m.pcCount}

## Reglas de conteo

Ver \`templates/APORTES_TEMPLATE.md\`, \`docs/10_aportes/APORTES_RELEASE_1.0.0.md\` y \`.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md\`.

## Cuadre estricto (orientativo)

| Tipo | Esperado ref. | Detectado | Notas |
|------|---------------|-----------|-------|
| PRD-US | ≥20 | ${m.prdUs} | |
| FSD-UC | ≥12 | ${m.fsdUc} | No duplicar CU extendido |
| Diagramas oficiales | ≥10 | ${m.diagrams} | Excluir \`07_diagramas/mmd/\` borradores |
| NFR ISO | ≥15 | ${m.nfrIso} | + NFR-IA: ${m.nfrIa} |
| Skills | ≥7 | ${m.skills} | |
| Matriz + métricas | 2 archivos | ${m.hasMatriz ? 'matriz sí' : 'matriz no'} / ${m.hasMetricas ? 'métricas sí' : 'métricas no'} | |

## Registro T-001 a T-${String(total).padStart(3, '0')}

| ID | Categoria | Descripcion | Referencia | Estado | Observacion |
|----|-----------|-------------|------------|--------|-------------|
${rows}
`;
}

function generateMember(member, counts) {
  const layout = resolveTeamLayout(member);
  const m = scanMetrics(layout);
  const score = scoreCriteria(m);

  const items = counts[member] || [];
  if (!items.length) {
    console.warn(`WARN: sin entradas en _aportes_counts.json para "${member}" — inventario solo con extras.`);
  }

  const extras = defaultExtras(layout, m);
  const totalTasks = items.length + extras.length;

  fs.mkdirSync(layout.trazDir, { recursive: true });
  fs.writeFileSync(path.join(layout.trazDir, 'AUDITORIA_RUBRICAS_EXCELENTE.md'), buildAudit(layout, m, score, totalTasks), 'utf8');
  fs.writeFileSync(
    path.join(layout.trazDir, 'INVENTARIO_TAREAS_APORTES_v1.md'),
    buildInventory(layout, m, items, extras),
    'utf8'
  );

  console.log(
    JSON.stringify({
      member,
      cumple: score.cumple,
      total: score.total,
      tasks: totalTasks,
      trazDir: layout.trazDir.replace(REPO, '.').replace(/\\/g, '/'),
    })
  );
}

function listTeamMembers() {
  const teamDir = path.join(REPO, 'team');
  return fs.readdirSync(teamDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
}

function main() {
  const args = process.argv.slice(2);
  let members = args.filter((a) => !a.startsWith('-'));
  if (args.includes('--all')) {
    members = listTeamMembers();
  }
  if (!members.length) {
    console.error('Uso: node gen-auditoria-inventario.js <Miembro> [Miembro2 ...] | --all');
    process.exit(1);
  }

  let counts = {};
  if (fs.existsSync(COUNTS_PATH)) {
    counts = require(COUNTS_PATH);
  }

  for (const member of members) {
    generateMember(member, counts);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateMember, resolveTeamLayout, scanMetrics, scoreCriteria };
