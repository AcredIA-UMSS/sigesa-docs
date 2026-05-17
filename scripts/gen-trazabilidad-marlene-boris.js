#!/usr/bin/env node
/** @deprecated Usar gen-auditoria-inventario.js en la skill sigesa-auditoria-excelente-equipo */
const { spawnSync } = require('child_process');
const path = require('path');

const script = path.join(
  __dirname,
  '../.cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-auditoria-inventario.js'
);
const r = spawnSync(process.execPath, [script, 'Marlene', 'borisAngulo'], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});
process.exit(r.status ?? 1);
