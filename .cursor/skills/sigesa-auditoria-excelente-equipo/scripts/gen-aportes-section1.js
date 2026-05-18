#!/usr/bin/env node
/**
 * Regenera §1 de docs/10_aportes/APORTES_RELEASE_1.0.0.md desde
 * docs/09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md (965 tareas v1.2).
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '../../../../');
const INV_PATH = path.join(REPO, 'docs/09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md');
const APORTES_PATH = path.join(REPO, 'docs/10_aportes/APORTES_RELEASE_1.0.0.md');
const FECHA = '17/05/2026';

const rowRe =
  /^\| (T-\d{3}) \| (alexAlvarez|aylenGonzales|borisAngulo|Marlene) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]*) \|$/;

function mapCategoria(cat) {
  const c = cat.toLowerCase();
  if (c.startsWith('brd')) return 'BRD';
  if (c.startsWith('mrd')) return 'MRD';
  if (c.includes('user story') || c.includes('journey') || c.startsWith('prd') || c.includes('roadmap'))
    return 'PRD';
  if (c.startsWith('fsd') || c.includes('lfsl')) return 'FSD';
  if (c.includes('caso de uso') || c === 'uc') return 'UC';
  if (c.includes('gherkin')) return 'Gherkin';
  if (c.includes('nfr')) return 'NFR';
  if (c.includes('diagrama')) return 'Diagrama';
  if (c.includes('prompt')) return 'Prompt';
  if (c.includes('adr')) return 'ADR';
  if (c.includes('skill')) return 'Skill';
  if (c.includes('rule') || c.includes('cursor rule')) return 'Rule';
  if (c.includes('agents')) return 'AGENTS';
  if (c.includes('poc')) return 'POC';
  if (c.includes('bitacora')) return 'Bitácora';
  if (c.includes('trazabilidad') || c.includes('metricas') || c.includes('indice') || c.includes('golden'))
    return 'Otro';
  if (c.includes('overview') || c.includes('contexto')) return 'Otro';
  return 'Otro';
}

function esc(s) {
  return s.replace(/\|/g, '/').trim();
}

function parseInventory() {
  const lines = fs.readFileSync(INV_PATH, 'utf8').split(/\r?\n/);
  const rows = [];
  let inTable = false;
  for (const line of lines) {
    if (line.startsWith('| ID local | Integrante')) inTable = true;
    else if (inTable && line.match(rowRe)) {
      const m = line.match(rowRe);
      rows.push({
        member: m[2],
        cat: m[3].trim(),
        desc: m[4].trim(),
        ref: m[5].trim(),
        est: m[6].trim(),
        obs: m[7].trim(),
      });
    } else if (inTable && line.trim() && !line.startsWith('|')) break;
  }
  return rows;
}

function buildSection1(rows) {
  const byMember = {};
  for (const r of rows) {
    if (!byMember[r.member]) byMember[r.member] = [];
    byMember[r.member].push(r);
  }

  const order = ['alexAlvarez', 'aylenGonzales', 'borisAngulo', 'Marlene'];
  let globalNum = 0;
  const lines = [
    '## 1. Tabla de tareas atribuidas',
    '',
    `> **${rows.length} filas** — inventario verificado v1.2 desde [` +
      'INVENTARIO_TAREAS_APORTES_EQUIPO.md' +
      '](../09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md). Columna **Fecha verif.** = cierre de cuadre, no fecha de autoría (ver nota §1).',
    '',
  ];

  for (const member of order) {
    const items = byMember[member] || [];
    const cats = new Set(items.map((i) => mapCategoria(i.cat)));
    lines.push(`### ${member} (${items.length} tareas · ${cats.size} categorías)`);
    lines.push('');
    lines.push('| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |');
    lines.push('|---|------------|----------------|-----------|------------|--------------|');
    for (const it of items) {
      globalNum++;
      const ref = it.ref.startsWith('`') ? it.ref : `\`${it.ref}\``;
      const obs = it.obs ? ` (${it.obs})` : '';
      const task = esc(it.desc) + (it.est !== 'Entregada' ? ` [${it.est}]` : '') + obs;
      lines.push(
        `| ${globalNum} | ${member} | ${task.slice(0, 120)} | ${mapCategoria(it.cat)} | ${ref} | ${FECHA} |`
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  const rows = parseInventory();
  if (rows.length !== 965) {
    console.warn(`WARN: esperadas 965 filas, parseadas ${rows.length}`);
  }

  const section1 = buildSection1(rows);
  const aportes = fs.readFileSync(APORTES_PATH, 'utf8');
  const start = aportes.indexOf('## 1. Tabla de tareas');
  const end = aportes.indexOf('## 2. Resumen por integrante');
  if (start < 0 || end < 0) {
    throw new Error('No se encontraron delimitadores §1 / §2 en APORTES_RELEASE_1.0.0.md');
  }

  const newContent =
    aportes.slice(0, start) + section1 + '\n---\n\n' + aportes.slice(end);
  fs.writeFileSync(APORTES_PATH, newContent, 'utf8');

  console.log(
    JSON.stringify({
      rows: rows.length,
      section1Lines: section1.split('\n').length,
      file: APORTES_PATH.replace(REPO, '.'),
    })
  );
}

main();
