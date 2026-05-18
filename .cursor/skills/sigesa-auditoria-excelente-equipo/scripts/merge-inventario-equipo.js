#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '../../../../');
const members = [
  { name: 'alexAlvarez', file: 'team/alexAlvarez/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md' },
  { name: 'aylenGonzales', file: 'team/aylenGonzales/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md' },
  { name: 'borisAngulo', file: 'team/borisAngulo/docs/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md' },
  { name: 'Marlene', file: 'team/Marlene/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md' },
];

const rowRe = /^\| (T-\d{3}) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]*) \|$/;

function parseRows(file) {
  const lines = fs.readFileSync(path.join(REPO, file), 'utf8').split(/\r?\n/);
  const rows = [];
  let inT = false;
  for (const line of lines) {
    if (line.startsWith('| ID | Categoria')) inT = true;
    else if (inT && line.match(rowRe)) {
      const m = line.match(rowRe);
      rows.push({
        id: m[1],
        cat: m[2].trim(),
        desc: m[3].trim(),
        ref: m[4].trim(),
        est: m[5].trim(),
        obs: m[6].trim(),
      });
    } else if (inT && line.trim() && !line.startsWith('|')) break;
  }
  return rows;
}

const summary = [];
const allRows = [];
for (const m of members) {
  const rows = parseRows(m.file);
  summary.push({ name: m.name, count: rows.length });
  for (const r of rows) {
    allRows.push(
      `| ${r.id} | ${m.name} | ${r.cat} | ${r.desc} | ${r.ref} | ${r.est} | ${r.obs} |`
    );
  }
}

const total = allRows.length;
const summaryTable = summary.map((s) => `| ${s.name} | ${s.count} |`).join('\n');

const header = `# Inventario grupal de tareas — Equipo AcredIA v1.1

| Metadato | Valor |
|----------|-------|
| **Fecha** | 17/05/2026 |
| **Integrantes** | alexAlvarez · aylenGonzales · borisAngulo · Marlene |
| **Total tareas** | ${total} |
| **Fuentes** | Inventarios individuales v1.1+ (Marlene v1.2; boris v1.1) |
| **Auditoría grupal** | [\`AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md\`](AUDITORIA_RUBRICAS_EXCELENTE_EQUIPO.md) |

## Resumen por integrante

| Integrante | Total tareas |
|------------|-------------|
${summaryTable}

## Reglas de conteo

Ver \`templates/APORTES_TEMPLATE.md\`, \`docs/10_aportes/APORTES_RELEASE_1.0.0.md\` §4 y \`.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md\`.

## Registro consolidado

| ID local | Integrante | Categoria | Descripcion | Referencia | Estado | Observacion |
|----------|------------|-----------|-------------|------------|--------|-------------|
`;

const outPath = path.join(REPO, 'docs/09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md');
fs.writeFileSync(outPath, header + allRows.join('\n') + '\n', 'utf8');
console.log(JSON.stringify({ total, summary, outPath: outPath.replace(REPO, '.') }));
