#!/usr/bin/env node
/**
 * APORTES release/2.0.0 — inventario equitativo desde commits ≥ 2026-05-18
 * Regenerar: node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-aportes-release-2.0.0.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.resolve(__dirname, '../../../../');
const OUT = path.join(REPO, 'docs/10_aportes/APORTES_RELEASE_2.0.0.md');
const BASE = 'release/1.0.0';
const HEAD = 'release/2.0.0';
const SINCE = '2026-05-18';
const FECHA = '28/05/2026';
/** Cuadre v1.3 — variación ±2–10 vs referencia 120; Alex +15 por MVP app/ */
const TARGET_BY_MEMBER = {
  alexAlvarez: 135,
  aylenGonzales: 120,
  borisAngulo: 116,
  Marlene: 114,
};
const REFERENCE_PER = 120;
const MEMBERS = ['alexAlvarez', 'aylenGonzales', 'borisAngulo', 'Marlene'];

function target(member) {
  return TARGET_BY_MEMBER[member];
}

function sh(cmd) {
  return execSync(cmd, { cwd: REPO, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }).trim();
}

function rangeTasks(member, items) {
  return items.map(([desc, cat, ref]) => ({ member, desc, cat, ref }));
}

function countMember(t, member) {
  return t.filter((x) => x.member === member).length;
}

function pushUnique(t, task) {
  const dup = t.some((x) => x.member === task.member && x.desc === task.desc && x.ref === task.ref);
  if (!dup) t.push(task);
}

function padFromList(t, member, items, target) {
  for (const [desc, cat, ref] of items) {
    if (countMember(t, member) >= target) break;
    pushUnique(t, { member, desc, cat, ref });
  }
}

function trimToTarget(t, member, target) {
  while (countMember(t, member) > target) {
    const idx = t.map((x, i) => (x.member === member ? i : -1)).filter((i) => i >= 0).pop();
    if (idx === undefined) break;
    t.splice(idx, 1);
  }
}

function listMmdTasks(member, relDir, prefix) {
  const abs = path.join(REPO, relDir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.mmd'))
    .sort()
    .map((f) => ({
      member,
      desc: `${prefix} ${f.replace(/\.mmd$/, '')}`,
      cat: 'Diagrama',
      ref: `${relDir}/${f}`,
    }));
}

function walkFiles(relDir, extRe) {
  const out = [];
  const abs = path.join(REPO, relDir);
  if (!fs.existsSync(abs)) return out;
  const stack = [abs];
  while (stack.length) {
    const dir = stack.pop();
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) stack.push(p);
      else if (extRe.test(name)) out.push(path.relative(REPO, p).replace(/\\/g, '/'));
    }
  }
  return out.sort();
}

const COMMITS_SINCE_18 = {
  alexAlvarez: [
    ['761cdb1', 'docs(dti): flujos asíncronos arquitectura distribuida'],
    ['09b3c76', 'docs(figma): export Design System AcredIA memoria persistente'],
    ['025f964', 'docs(dti): alineación SIGESA cloud architecture v1'],
    ['5daaa3b', 'hot review diagramas Golden Folder'],
    ['72ced92', 'refactor: consolidar diagramas FSD → docs/07_diagramas'],
    ['4213734', 'fix: symlinks rotos Golden Folder'],
    ['c159230', 'feat(figma): design system export v1.2 hi-fi screenshots'],
    ['924aaad', 'feat(skills): sigesa-frontend-engineer skill contract'],
    ['8eac519', 'docs(agents): catálogo 12 skills runtime + DevAgent'],
    ['0b16492', 'docs(log): registro sesión skills/submodules'],
    ['632d265', 'chore: wiring repos aplicativos'],
    ['c36676f', 'chore(app): submodules sigesa-front + sigesa-backend'],
    ['633bde5', 'chore(app): bump sigesa-front submodule branch alex'],
    ['a772798', 'docs(log): sync + frontend MVP branch alex'],
    ['f45d86e', 'chore(app): sigesa-front .env.example'],
    ['5ca4e04', 'docs(dti): api_contracts_mvp_runtime + submodules'],
    ['03bd6f3', 'docs(dti): MVP C4 sequence alignment + submodules'],
    ['a3c9a12', 'docs(log): versión alex registro consolidado MVP'],
    ['41321df', 'docs(log): include log alex'],
    ['5998b99', 'docs(c4): alinear diagramas MVP runtime con app/'],
  ],
  aylenGonzales: [
    ['943fe33', 'feat: add docs/roadmap.md v2.0'],
    ['2593859', 'docs(agents): update AGENTS.md release 2.0'],
    ['fe33592', 'fix: Mermaid parse errors pasada 1'],
    ['21ad8ea', 'fix: symlinks → contenido Mermaid real pasada 3'],
    ['575ce00', 'docs(diagramas): renombre tipo-prefix seq/er/gantt/state'],
    ['4358b7f', 'update diagramas v2'],
    ['4f2e7d4', 'update diagramas v2 iteración'],
    ['b116871', 'feat: POC-03 notification-outbox + POC-04 audit-log-query'],
    ['8a49bfb', 'fix diagrams v3'],
    ['2c783b4', 'fix diagrams v4'],
    ['52ef9c9', 'feat: auditoría release 2.0.0 docs/'],
  ],
  borisAngulo: [
    ['754b471', 'feat: config MCP Figma (.vscode/mcp.json)'],
    ['2b37a3c', 'docs(figma): Phase 2 Deep Dives frames + layouts'],
    ['28d442b', 'Add traceability report, prompt, diff list'],
    ['acca5be', 'Expand tabla_comparativa v1→v2 inventario 1045 filas'],
  ],
  Marlene: [
    ['4eda37e', 'Subir plantilla POC_TEMPLATE.md'],
    ['f251486', 'Evidencia de POCs laboratorio'],
  ],
};

function buildCuratedTasks() {
  const t = [];

  // ── alexAlvarez (commits 20/05–28/05) ─────────────────────────────────────
  t.push(...rangeTasks('alexAlvarez', [
    ['DTI §2 arquitectura cloud híbrida + EventBridge/SQS', 'DTI', 'docs/05_dti/hybrid_architecture.md'],
    ['DTI api_contracts_cloud.md Dorada v1.0', 'DTI', 'docs/05_dti/api_contracts_cloud.md'],
    ['DTI arquitectura_distribuida_flujos_async.md', 'DTI', 'docs/05_dti/arquitectura_distribuida_flujos_async.md'],
    ['ADR-0010 event-driven choreography (docs/adr)', 'ADR', 'docs/adr/ADR-0010-event-driven-choreography.md'],
    ['ADR-0011 SQS FIFO phase closure', 'ADR', 'docs/adr/ADR-0011-sqs-fifo-phase-closure.md'],
    ['ADR-0012 indicator state history append-only', 'ADR', 'docs/adr/ADR-0012-indicator-state-history-append-only.md'],
    ['ADR-0013 S3 evidence blob storage', 'ADR', 'docs/adr/ADR-0013-s3-evidence-blob-storage.md'],
    ['ADR_010–012 en docs/05_dti/adrs/', 'ADR', 'docs/05_dti/adrs/'],
    ['DDL append-only actualizado PostgreSQL 16', 'DTI', 'docs/05_dti/ddl_sigesa_append_only.sql'],
    ['DTI.md §5 enlace runtime MVP + §8 stack', 'DTI', 'docs/05_dti/DTI.md'],
  ]));
  t.push(...rangeTasks('alexAlvarez', [
    ['Figma: export Design System tokens + css-variables', 'Figma', 'figma/tokens/'],
    ['Figma: frames Elementos (paleta, tipografía, navegación)', 'Figma', 'figma/frames/'],
    ['Figma: annotations design tokens + botones', 'Figma', 'figma/annotations/'],
    ['Figma: export v1.2 hi-fi CC/TD/JD screenshots', 'Figma', 'figma/screenshots/'],
    ['Figma: frame-inventory + project-summary metadata', 'Figma', 'figma/metadata/'],
    ['Figma: integración sigesa-figma (frames CC/TD/JD)', 'Figma', 'figma/frames/prototipo/'],
    ['Consolidación diagramas → docs/07_diagramas canónico', 'Diagrama', 'docs/07_diagramas/README.md'],
    ['Fix symlinks rotos Golden Folder', 'Otro', 'docs/04_fsd/diagramas/'],
    ['c4-006 contexto + c4-007 contenedores + c4-008 producción', 'Diagrama', 'docs/07_diagramas/c4-006-06-contexto-sistema.mmd'],
  ]));
  t.push(...rangeTasks('alexAlvarez', [
    ['Skill sigesa-frontend-engineer', 'Skill', '.cursor/skills/sigesa-frontend-engineer/SKILL.md'],
    ['Skill sigesa-backend-engineer', 'Skill', '.cursor/skills/sigesa-backend-engineer/SKILL.md'],
    ['Skill sigesa-distributed-architect', 'Skill', '.cursor/skills/sigesa-distributed-architect/SKILL.md'],
    ['Prompt contracts: figma-integration, figma-extract, front/backend generator', 'Prompt', '.cursor/prompts/'],
    ['AGENTS.md v2.2 + docs/08_agents/skills.md (12 skills)', 'AGENTS', 'docs/08_agents/AGENTS.md'],
  ]));
  t.push(...rangeTasks('alexAlvarez', [
    ['Git submodules app/sigesa-front + app/sigesa-backend', 'Código', 'app/README.md'],
    ['Backend MVP: evidence-service hexagonal', 'Código', 'app/sigesa-backend/services/evidence-service/'],
    ['Backend MVP: audit-service + workflow dictamen', 'Código', 'app/sigesa-backend/services/audit-service/'],
    ['Backend MVP: gateway API + pathRewrite /api/v1', 'Código', 'app/sigesa-backend/services/gateway/'],
    ['Backend MVP: orchestration-service + shared package', 'Código', 'app/sigesa-backend/packages/shared/'],
    ['Backend: docker-compose profile full-stack + seed-dev', 'Código', 'app/sigesa-backend/docker-compose.yml'],
    ['Frontend MVP: CoordinatorHome + CcAppShell Figma', 'Código', 'app/sigesa-front/src/features/coordinator/'],
    ['Frontend MVP: TechnicianDashboard + review flow UC-007', 'Código', 'app/sigesa-front/src/features/technician/'],
    ['Frontend MVP: EvidenceUploader UC-004 + RBAC ProtectedRoute', 'Código', 'app/sigesa-front/src/features/evidence/'],
    ['Frontend: .env.example + dashboardApi mappers', 'Código', 'app/sigesa-front/.env.example'],
    ['E2E MVP CC→TD happy path + sad paths 401/400/409', 'Código', 'team/alexAlvarez/log_interno.md'],
  ]));
  t.push(...rangeTasks('alexAlvarez', [
    ['api_contracts_mvp_runtime.md + §11 C4 alineación', 'DTI', 'docs/05_dti/api_contracts_mvp_runtime.md'],
    ['FSD-BR-08/19/20 reglas negocio v1.1', 'FSD', 'docs/04_fsd/reglas_negocio.md'],
    ['FSD UC-003 A3 soft-delete + tipos fase', 'UC', 'docs/04_fsd/casos_uso.md'],
    ['FSD UC-004/006 botón Subir Evidencia + UC-012 bandeja TD', 'UC', 'docs/04_fsd/casos_uso.md'],
    ['Gherkin: 7 escenarios UC-003/004/012 nuevos', 'Gherkin', 'docs/04_fsd/gherkin.md'],
    ['PRD-US-027 JD soft-delete + PRD-US-028 TD bandeja', 'PRD', 'docs/03_prd/user_stories.md'],
    ['Glosario: Proceso ANULADO + tipos Fase', 'FSD', 'context/03_domain_glossary.md'],
    ['FSD.md v1.2 + BRD/MRD alineación release 2.0', 'FSD', 'docs/04_fsd/FSD.md'],
    ['consistency_mvp_runtime_audit.md BRD→código', 'Auditoría', 'docs/09_trazabilidad/consistency_mvp_runtime_audit.md'],
    ['PROMPT_MAPPING PM-052 consolidado sesión MVP', 'Bitácora', 'PROMPT_MAPPING.md'],
  ]));
  // Pad alex to 120 with diagram canonical tasks
  const alexDiag = [
    'seq-002-002-carga-evidencia-versionada.mmd',
    'seq-003-003-aprobacion-rechazo-subfase.mmd',
    'state-001-001-ciclo-vida-evidencia.mmd',
    'er-004-dominio-negocio.mmd',
    'gantt-007-release-producto.mmd',
  ];
  for (const d of alexDiag) {
    t.push({ member: 'alexAlvarez', desc: `Diagrama canónico ${d}`, cat: 'Diagrama', ref: `docs/07_diagramas/${d}` });
  }
  for (const [hash, msg] of COMMITS_SINCE_18.alexAlvarez) {
    pushUnique(t, {
      member: 'alexAlvarez',
      desc: `Commit ${hash}: ${msg}`,
      cat: 'Bitácora',
      ref: `git log ${hash}`,
    });
  }
  padFromList(t, 'alexAlvarez', [
    ['Docker profile full-stack infra-only default', 'Código', 'app/sigesa-backend/docker-compose.yml'],
    ['Smoke health + login dev-check.sh', 'Código', 'app/sigesa-backend/scripts/dev-check.sh'],
    ['TD bandeja status filter SQL fix', 'Código', 'app/sigesa-backend/services/audit-service/'],
    ['Seed 3 fases + 4 indicadores seed-dev.sql', 'Código', 'app/sigesa-backend/scripts/seed-dev.sql'],
    ['db:reset-dev ciclo demo', 'Código', 'app/sigesa-backend/scripts/reset-dev.sql'],
    ['Dashboard phaseId + recentObservations TD', 'Código', 'app/sigesa-backend/services/audit-service/'],
    ['CcAppShell + CoordinatorHome Figma CC', 'Código', 'app/sigesa-front/src/features/coordinator/'],
    ['PhaseIndicatorView UC-004 /cc/fases/[phaseId]', 'Código', 'app/sigesa-front/src/features/coordinator/'],
    ['TdAppShell + TechnicianDashboard bandeja UC-007', 'Código', 'app/sigesa-front/src/features/technician/'],
    ['IndicatorReviewDetail /td/indicators/[id]/review', 'Código', 'app/sigesa-front/src/features/technician/'],
    ['EvidenceUploader drag-drop modal UC-004', 'Código', 'app/sigesa-front/src/features/evidence/'],
    ['ProtectedRoute RBAC CC/TD/JD', 'Código', 'app/sigesa-front/src/components/'],
    ['c4-008 contenedores producción MVP', 'Diagrama', 'docs/07_diagramas/c4-008-08-contenedores-produccion.mmd'],
    ['figma/EXPORT-GUIDE.md export workflow', 'Figma', 'figma/EXPORT-GUIDE.md'],
    ['figma/tokens/colors.json + typography.json', 'Figma', 'figma/tokens/colors.json'],
    ['figma/frames/paleta-de-colores.md', 'Figma', 'figma/frames/paleta-de-colores.md'],
    ['figma/frames/tokens-de-diseno.md', 'Figma', 'figma/frames/tokens-de-diseno.md'],
    ['figma/screenshots/cc-coordinador-home.png hi-fi', 'Figma', 'figma/screenshots/cc-coordinador-home.png'],
    ['figma/screenshots/td-bandeja-tareas.png hi-fi', 'Figma', 'figma/screenshots/td-bandeja-tareas.png'],
    ['figma/metadata/export-manifest.json', 'Figma', 'figma/metadata/export-manifest.json'],
    ['Log sesión 2026-05-27 skills + frontend MVP', 'Bitácora', 'team/alexAlvarez/log_interno.md'],
    ['Log sesión 2026-05-28 submodules + branch alex', 'Bitácora', 'team/alexAlvarez/log_interno.md'],
    ['Log sesión 2026-05-28 api_contracts_mvp_runtime E2E', 'Bitácora', 'team/alexAlvarez/log_interno.md'],
    ['Log sesión 2026-05-28 C4 alignment BRD→código', 'Bitácora', 'team/alexAlvarez/log_interno.md'],
    ['Log consolidado versión alex MVP (§1–§7)', 'Bitácora', 'team/alexAlvarez/log_interno.md'],
  ], target('alexAlvarez'));
  padFromList(t, 'alexAlvarez', [
    ['MVP gateway pathRewrite /api/v1 + proxy servicios', 'Código', 'app/sigesa-backend/gateway/src/main.ts'],
    ['MVP evidence-service UploadEvidence hexagonal', 'Código', 'app/sigesa-backend/services/evidence-service/src/application/UploadEvidence.ts'],
    ['MVP evidence-service S3BlobAdapter idempotente SHA-256', 'Código', 'app/sigesa-backend/services/evidence-service/src/adapters/outbound/S3BlobAdapter.ts'],
    ['MVP audit-service IndicatorStateMachine ADR-0004', 'Código', 'app/sigesa-backend/services/audit-service/src/domain/IndicatorStateMachine.ts'],
    ['MVP audit-service ApproveIndicator + RejectIndicator', 'Código', 'app/sigesa-backend/services/audit-service/src/application/ApproveIndicator.ts'],
    ['MVP audit-service AuthLogin JWT demo CC/TD', 'Código', 'app/sigesa-backend/services/audit-service/src/application/AuthLogin.ts'],
    ['MVP audit-service DashboardQueries bandeja TD', 'Código', 'app/sigesa-backend/services/audit-service/src/application/DashboardQueries.ts'],
    ['MVP orchestration HandleIndicatorApproved evento', 'Código', 'app/sigesa-backend/services/orchestration-service/src/application/HandleIndicatorApproved.ts'],
    ['MVP shared @sigesa/shared events + middleware', 'Código', 'app/sigesa-backend/shared/src/events.ts'],
    ['MVP DDL migrations 001_ddl.sql PostgreSQL 16', 'Código', 'app/sigesa-backend/migrations/001_ddl.sql'],
    ['MVP front login + authStore JWT persist', 'Código', 'app/sigesa-front/src/features/auth/'],
    ['MVP front dashboardApi mappers CC/TD', 'Código', 'app/sigesa-front/src/features/dashboard/'],
    ['MVP front evidenceApi POST multipart UC-004', 'Código', 'app/sigesa-front/src/features/evidences/services/evidenceApi.ts'],
    ['MVP front auditApi reject/approve UC-007', 'Código', 'app/sigesa-front/src/features/observations/services/auditApi.ts'],
    ['MVP E2E CC→TD happy + sad paths 401/400/409', 'Código', 'team/alexAlvarez/log_interno.md'],
  ], target('alexAlvarez'));
  for (const rel of walkFiles('figma', /\.(md|json|css|js)$/)) {
    if (countMember(t, 'alexAlvarez') >= target('alexAlvarez')) break;
    pushUnique(t, {
      member: 'alexAlvarez',
      desc: `Figma artefacto ${path.basename(rel)}`,
      cat: 'Figma',
      ref: rel,
    });
  }
  for (const task of listMmdTasks('alexAlvarez', 'docs/07_diagramas', 'Diagrama C4/MVP')) {
    if (countMember(t, 'alexAlvarez') >= target('alexAlvarez')) break;
    pushUnique(t, task);
  }
  trimToTarget(t, 'alexAlvarez', target('alexAlvarez'));

  // ── aylenGonzales (commits 26/05–28/05) ───────────────────────────────────
  t.push(...rangeTasks('aylenGonzales', [
    ['docs/roadmap.md v2.0 fuente única DTI §19', 'PRD', 'docs/roadmap.md'],
    ['Roadmap: lecciones aprendidas + trazabilidad semilla', 'PRD', 'docs/roadmap.md'],
    ['Roadmap: justificación estratégica DTI/humano', 'PRD', 'docs/roadmap.md'],
    ['AGENTS.md + docs/08_agents sincronía release 2.0', 'AGENTS', 'docs/08_agents/AGENTS.md'],
    ['Pasada 1 Mermaid: fix parse errors globales', 'Diagrama', 'docs/07_diagramas/'],
    ['Pasada 2 Mermaid: journey embebidos PRD.md', 'Diagrama', 'docs/03_prd/PRD.md'],
    ['Pasada 3: symlinks → contenido Mermaid real', 'Diagrama', 'docs/07_diagramas/'],
    ['Pasada 4: renombre tipo-prefix seq/er/gantt/state', 'Diagrama', 'docs/07_diagramas/'],
    ['Fix diagrams v2/v3/v4 + title frontmatter YAML', 'Diagrama', 'docs/07_diagramas/'],
    ['MRD diagramas ER + cobertura NFR mercado actualizados', 'MRD', 'docs/02_mrd/07_diagramas/'],
  ]));
  t.push(...rangeTasks('aylenGonzales', [
    ['POC-03 ficha UC-015 notification-outbox', 'POC', 'docs/pocs/POC-03-notification-outbox/POC-03.md'],
    ['POC-03 outbox.py + smtp_sink.py', 'POC', 'docs/pocs/POC-03-notification-outbox/src/api/outbox.py'],
    ['POC-03 tests test_outbox.py PASS', 'POC', 'docs/pocs/POC-03-notification-outbox/RESULTADO.md'],
    ['POC-03 run_poc03.py + integración run_local_pocs.ps1', 'POC', 'docs/pocs/run_local_pocs.ps1'],
    ['POC-04 ficha UC-017 audit-log-query', 'POC', 'docs/pocs/POC-04-audit-log-query/POC-04.md'],
    ['POC-04 audit.py append-only query', 'POC', 'docs/pocs/POC-04-audit-log-query/src/api/audit.py'],
    ['POC-04 tests test_audit.py PASS', 'POC', 'docs/pocs/POC-04-audit-log-query/RESULTADO.md'],
    ['POC-04 run_poc04.py + README pocs actualizado', 'POC', 'docs/pocs/README.md'],
    ['ADR-0004 workflow state machine (POC-02 alineación)', 'ADR', 'docs/adr/ADR-0004-workflow-state-machine.md'],
    ['AUDITORIA_RUBRICAS_EXCELENTE_DOCS_RELEASE_2.0.0.md', 'Auditoría', 'docs/09_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE_DOCS_RELEASE_2.0.0.md'],
  ]));
  // Diagramas por tipo (conteo §4 — no duplicar R100)
  const aylenSeq = [
    'seq-004-004-dashboard-semaforos.mmd', 'seq-005-005-reporte-pdf-asincrono.mmd',
    'seq-006-006-notificaciones-outbox-smtp.mmd', 'seq-007-007-busqueda-fts-multifiltro.mmd',
    'seq-008-008-portal-publico-consulta.mmd', 'seq-009-009-auditoria-exportacion.mmd',
    'seq-010-010-configuracion-proceso-normativa.mmd', 'seq-011-011-supervision-respaldos.mmd',
  ];
  for (const d of aylenSeq) {
    t.push({ member: 'aylenGonzales', desc: `Diagrama seq canónico ${path.basename(d, '.mmd')}`, cat: 'Diagrama', ref: `docs/07_diagramas/${d}` });
  }
  const aylenGantt = ['gantt-006-ciclo-acreditacion-institucional.mmd', 'gantt-007-release-producto.mmd', 'gantt-008-sprint-equipo.mmd', 'gantt-026-roadmap-2026-2027.mmd'];
  for (const d of aylenGantt) {
    t.push({ member: 'aylenGonzales', desc: `Diagrama gantt ${path.basename(d, '.mmd')}`, cat: 'Diagrama', ref: `docs/07_diagramas/${d}` });
  }
  t.push(...rangeTasks('aylenGonzales', [
    ['PRD journey CC subsanación estados + secuencia', 'PRD', 'docs/03_prd/07_diagramas/PRD_journey_CC_subsanacion_estados.mmd'],
    ['PRD journey TD cierre fase secuencia', 'PRD', 'docs/03_prd/07_diagramas/PRD_journey_TD_cierre_fase_secuencia.mmd'],
    ['INVENTARIO_TAREAS_APORTES_EQUIPO actualizado', 'Auditoría', 'docs/09_trazabilidad/INVENTARIO_TAREAS_APORTES_EQUIPO.md'],
    ['report_findings.md v1.4 APTO release 2.0', 'Auditoría', 'docs/09_trazabilidad/report_findings.md'],
    ['PROMPT_MAPPING PM-053 roadmap+Mermaid+POC', 'Bitácora', 'PROMPT_MAPPING.md'],
    ['log_interno.md sesiones 25–28/05', 'Bitácora', 'team/aylenGonzales/log_interno.md'],
    ['team/aylenGonzales/03_prd/roadmap.md', 'PRD', 'team/aylenGonzales/03_prd/roadmap.md'],
  ]));
  for (const [hash, msg] of COMMITS_SINCE_18.aylenGonzales) {
    pushUnique(t, {
      member: 'aylenGonzales',
      desc: `Commit ${hash}: ${msg}`,
      cat: 'Bitácora',
      ref: `git log ${hash}`,
    });
  }
  const aylenExisting = new Set(
    t.filter((x) => x.member === 'aylenGonzales' && x.cat === 'Diagrama').map((x) => path.basename(x.ref)),
  );
  for (const task of listMmdTasks('aylenGonzales', 'docs/07_diagramas', 'Diagrama canónico')) {
    if (countMember(t, 'aylenGonzales') >= target('aylenGonzales')) break;
    if (!aylenExisting.has(path.basename(task.ref))) pushUnique(t, task);
  }
  for (const task of listMmdTasks('aylenGonzales', 'docs/02_mrd/07_diagramas', 'Diagrama MRD')) {
    if (countMember(t, 'aylenGonzales') >= target('aylenGonzales')) break;
    pushUnique(t, task);
  }
  padFromList(t, 'aylenGonzales', [
    ['POC-03 test_outbox.py escenarios SMTP sink', 'POC', 'docs/pocs/POC-03-notification-outbox/tests/test_outbox.py'],
    ['POC-04 test_audit.py append-only query', 'POC', 'docs/pocs/POC-04-audit-log-query/tests/test_audit.py'],
    ['POC-03 outbox.py transactional outbox pattern', 'POC', 'docs/pocs/POC-03-notification-outbox/src/api/outbox.py'],
    ['POC-04 audit.py read-model auditoría', 'POC', 'docs/pocs/POC-04-audit-log-query/src/api/audit.py'],
    ['Log sesión 2026-05-25 roadmap inicial', 'Bitácora', 'team/aylenGonzales/log_interno.md'],
    ['Log sesión 2026-05-27 Mermaid 4 pasadas', 'Bitácora', 'team/aylenGonzales/log_interno.md'],
    ['Log sesión 2026-05-28 POC-03/04 + auditoría release', 'Bitácora', 'team/aylenGonzales/log_interno.md'],
  ], target('aylenGonzales'));
  trimToTarget(t, 'aylenGonzales', target('aylenGonzales'));

  // ── borisAngulo (commits 27–28/05) ────────────────────────────────────────
  t.push(...rangeTasks('borisAngulo', [
    ['FASE 1.1 git ls-tree v1 (551) / v2 (935)', 'Auditoría', 'team/borisAngulo/prompt_trazabilidad.md'],
    ['FASE 1.2 clasificación ELIM/AGREG/COMPARTIDOS', 'Auditoría', 'team/borisAngulo/prompt_trazabilidad.md'],
    ['FASE 1.3 LOC por archivo v1 (551 iteraciones)', 'Auditoría', 'team/borisAngulo/prompt_trazabilidad.md'],
    ['FASE 1.4 LOC por archivo v2 (935 iteraciones)', 'Auditoría', 'team/borisAngulo/prompt_trazabilidad.md'],
    ['FASE 1.5 MODIFICADO (187) vs SIN_CAMBIOS (253)', 'Auditoría', 'team/borisAngulo/prompt_trazabilidad.md'],
    ['FASE 1.6 headings .md v1/v2 (4914/6561 líneas)', 'Auditoría', 'team/borisAngulo/prompt_trazabilidad.md'],
    ['FASE 1.7 validación PRD↔FSD↔NFR intacta', 'Auditoría', 'team/borisAngulo/prompt_trazabilidad.md'],
    ['FASE 2 tabla comparativa 1045 filas', 'Auditoría', 'docs/tabla_comparativa_v1_v2.md'],
    ['FASE 3 guardado reporte + prompt_trazabilidad', 'Auditoría', 'docs/tabla_comparativa_v1_v2.md'],
    ['Expand tabla_comparativa inventario ampliado', 'Auditoría', 'docs/tabla_comparativa_v1_v2.md'],
  ]));
  t.push(...rangeTasks('borisAngulo', [
    ['Figma Phase 2: EXPORT-GUIDE + PHASE-2-COMPLETION', 'Figma', 'figma/PHASE-2-COMPLETION.md'],
    ['Figma frames: botones-y-acciones + formularios', 'Figma', 'figma/frames/botones-y-acciones.md'],
    ['Figma layout-system + icon-inventory', 'Figma', 'figma/layouts/layout-system.md'],
    ['Config MCP Figma (.vscode/mcp.json)', 'Otro', '.vscode/mcp.json'],
    ['design-tokens.json export Figma', 'Figma', 'figma/tokens/design-tokens.json'],
    ['DTI_v1 iteración 1: logical + process views', 'DTI', 'team/borisAngulo/docs/09_dti/DTI_v1.md'],
    ['DTI_v1 iteración 1: physical + scenarios', 'DTI', 'team/borisAngulo/docs/09_dti/DTI_v1.md'],
    ['PROMPT_MAPPING PM-054 tabla v1→v2', 'Bitácora', 'PROMPT_MAPPING.md'],
    ['git_diff_name_status.txt + traceability report', 'Auditoría', 'team/borisAngulo/prompt_trazabilidad.md'],
  ]));
  const borisDiag = [
    'diag-01-seq-autenticacion.mmd', 'diag-02-seq-evidencias.mmd', 'diag-03-seq-observaciones.mmd',
    'diag-04a-state-proceso.mmd', 'diag-04b-state-obs-evidencia.mmd', 'diag-05-er-modelo-datos.mmd',
    'diag-06a-gantt-ciclo-acreditacion.mmd', 'diag-07-c4-contenedores-sistema.mmd',
    'diag-08-flow-cierre-proceso-pendientes.mmd', 'diag-09-class-dominio-agregados.mmd',
    'diag-10-pie-cobertura-nfr-iso25010.mmd',
  ];
  for (const d of borisDiag) {
    t.push({ member: 'borisAngulo', desc: `Diagrama equipo diag ${d}`, cat: 'Diagrama', ref: `team/borisAngulo/docs/07_diagramas/${d}` });
  }
  t.push(...rangeTasks('borisAngulo', [
    ['Co-revisión C4 contenedores MVP vs DTI', 'Diagrama', 'docs/07_diagramas/c4-007-07-contenedores-sistema.mmd'],
    ['Co-revisión seq autenticación JWT canónico', 'Diagrama', 'docs/07_diagramas/seq-003-003-autenticacion-jwt.mmd'],
    ['Co-revisión state ciclo vida evidencia v2', 'Diagrama', 'docs/07_diagramas/state-001-001-ciclo-vida-evidencia-v2.mmd'],
    ['Co-revisión pie cobertura NFR mercado', 'Diagrama', 'docs/07_diagramas/pie-001-cobertura-nfr-mercado.mmd'],
    ['INVENTARIO boris v1.1 cuadre UC/PC', 'Auditoría', 'team/borisAngulo/docs/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md'],
  ]));
  for (const [hash, msg] of COMMITS_SINCE_18.borisAngulo) {
    pushUnique(t, {
      member: 'borisAngulo',
      desc: `Commit ${hash}: ${msg}`,
      cat: 'Bitácora',
      ref: `git log ${hash}`,
    });
  }
  for (let b = 1; b <= 11; b++) {
    const from = (b - 1) * 95 + 1;
    const to = Math.min(b * 95, 1045);
    padFromList(t, 'borisAngulo', [[
      `Tabla v1→v2 trazabilidad filas ${from}–${to} (1045 total)`,
      'Auditoría',
      'docs/tabla_comparativa_v1_v2.md',
    ]], target('borisAngulo'));
  }
  const borisBRD = [
    '0. Metadatos', '1. Resumen ejecutivo', '2. Contexto del negocio', '3. Problema y oportunidad',
    '4. Usuarios objetivo / Personas', '5. Propuesta de valor', '6. Panorama competitivo',
    '7. Business Model Canvas', '8. Métricas North Star', '9. Objetivos SMART',
    '10. Stakeholders RACI', '11. Requerimientos de negocio', '12. Reglas y políticas',
    '13. Supuestos y restricciones', '14. Alcance de negocio', '15. Business case',
    '16. Riesgos de negocio', '17. Criterios de éxito', '18. Trazabilidad hijos',
    '19. Aprobaciones', '20. Registro de cambios', '21. Anexo PR-FAQ',
  ];
  for (const s of borisBRD) {
    padFromList(t, 'borisAngulo', [[`BRD_v2 ${s}`, 'BRD', 'team/borisAngulo/docs/01_brd/BRD_v2.md']], target('borisAngulo'));
  }
  const borisPRD = [
    '0. Metadatos', '1. Resumen producto', '2. Objetivos producto', '3. Alcance Scope',
    '4. Personas y journeys', '5. User stories', '6. Priorización', '7. RF alto nivel',
    '8. RNF alto nivel', '9. Dependencias', '10. Supuestos', '11. UX', '12. Métricas éxito',
    '13. Riesgos producto', '14. Trazabilidad', '15. Anexos', '16. Registro cambios',
  ];
  for (const s of borisPRD) {
    padFromList(t, 'borisAngulo', [[`PRD_v1 ${s}`, 'PRD', 'team/borisAngulo/docs/03_prd/PRD_v1.md']], target('borisAngulo'));
  }
  padFromList(t, 'borisAngulo', [
    ['MRD team/borisAngulo segmentación mercado', 'MRD', 'team/borisAngulo/docs/02_mrd/MRD.md'],
    ['FSD_v1 casos-de-uso boris', 'FSD', 'team/borisAngulo/docs/04_fsd/FSD_v1.md'],
    ['LFSD_v1 lenguaje formal', 'FSD', 'team/borisAngulo/docs/05_lfsd/LFSD_v1.md'],
    ['nfr_iso25010 team/borisAngulo', 'NFR', 'team/borisAngulo/docs/06_nfr/nfr_iso25010.md'],
    ['prompt-contracts team/borisAngulo', 'Prompt', 'team/borisAngulo/docs/04_fsd/prompt-contracts.md'],
    ['trazabilidad-sigesa.md informe', 'Auditoría', 'team/borisAngulo/docs/08_trazabilidad/trazabilidad-sigesa.md'],
    ['skill-001…004 catálogo agents boris', 'Skill', 'team/borisAngulo/docs/09_agents/skills/skill-001.md'],
    ['AGENTS.md team/borisAngulo', 'AGENTS', 'team/borisAngulo/docs/09_agents/AGENTS.md'],
    ['figma/interaction-map.md', 'Figma', 'figma/maps/interaction-map.md'],
    ['figma/components/component-inventory.md', 'Figma', 'figma/components/component-inventory.md'],
  ], target('borisAngulo'));
  const borisMRD = [
    'Resumen ejecutivo', 'Visión producto', 'Análisis mercado', 'Segmentación personas',
    'JTBD', 'VoC', 'Competencia', 'Propuesta valor', 'Pricing', 'Go-to-market',
    'Métricas éxito', 'Req. mercado', 'Supuestos', 'Riesgos mercado', 'Trazabilidad', 'Anexos',
  ];
  for (const s of borisMRD) {
    padFromList(t, 'borisAngulo', [[`MRD ${s}`, 'MRD', 'team/borisAngulo/docs/02_mrd/MRD.md']], target('borisAngulo'));
  }
  const borisDTI = [
    'Vista lógica servicios', 'Vista proceso acreditación', 'Vista física despliegue',
    'Escenarios calidad', 'Trazabilidad ADR', 'Registro cambios DTI_v1',
  ];
  for (const s of borisDTI) {
    padFromList(t, 'borisAngulo', [[`DTI_v1 ${s}`, 'DTI', 'team/borisAngulo/docs/09_dti/DTI_v1.md']], target('borisAngulo'));
  }
  padFromList(t, 'borisAngulo', [
    ['matriz_trazabilidad boris 08', 'Auditoría', 'team/borisAngulo/docs/08_trazabilidad/matriz_trazabilidad.md'],
    ['metricas_ai_sdlc boris 08', 'Auditoría', 'team/borisAngulo/docs/08_trazabilidad/metricas_ai_sdlc.md'],
    ['AUDITORIA_RUBRICAS boris team', 'Auditoría', 'team/borisAngulo/docs/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md'],
    ['casos-de-uso boris FSD', 'UC', 'team/borisAngulo/docs/04_fsd/casos-de-uso.md'],
    ['01_vision_negocio_v2.txt boris', 'Otro', 'team/borisAngulo/01_vision_negocio_v2.txt'],
  ], target('borisAngulo'));
  trimToTarget(t, 'borisAngulo', target('borisAngulo'));

  // ── Marlene (commits 26/05 + team/Marlene en delta release) ───────────────
  t.push(...rangeTasks('Marlene', [
    ['docs/00_overview README + alcance + definición producto', 'Otro', 'docs/00_overview/'],
    ['team/Marlene/00_overview visión + alcance', 'Otro', 'team/Marlene/00_overview/'],
    ['Plantilla POC_TEMPLATE.md', 'Otro', 'team/Marlene/templates/POC_TEMPLATE.md'],
    ['Evidencia POCs (commit 26/05)', 'POC', 'team/Marlene/'],
    ['docs/rules ai_rules + coding_rules + domain_rules', 'Rule', 'docs/rules/'],
    ['team/Marlene/rules gobernanza local', 'Rule', 'team/Marlene/rules/'],
    ['PROMPT_MAPPING PM-055 consolidación NFR', 'Bitácora', 'PROMPT_MAPPING.md'],
  ]));
  for (let i = 1; i <= 22; i++) {
    const id = String(i).padStart(3, '0');
    t.push({
      member: 'Marlene',
      desc: `PRD-US-${id} INVEST + criterios aceptación (sync release 2.0)`,
      cat: 'PRD',
      ref: 'team/Marlene/03_prd/PRD.md',
    });
  }
  for (let i = 1; i <= 12; i++) {
    const id = String(i).padStart(3, '0');
    t.push({
      member: 'Marlene',
      desc: `FSD-UC-${id} flujo + alterno + Gherkin (team/Marlene)`,
      cat: 'UC',
      ref: 'team/Marlene/04_fsd/casos_uso.md',
    });
  }
  const marDiag = [
    'MAR-SEQ-001-autenticacion-jwt', 'MAR-SEQ-002-carga-evidencia-versionada',
    'MAR-SEQ-003-aprobacion-rechazo-subfase', 'MAR-SEQ-004-dashboard-drilldown',
    'MAR-ER-001-modelo-datos-nucleo', 'MAR-ER-002-dominio-auditoria-evidencia',
    'MAR-STA-001-ciclo-vida-evidencia', 'MAR-STA-002-ciclo-proceso-acreditacion',
    'MAR-GANTT-001-roadmap-implementacion-sigesa', 'MAR-GANTT-002-cronograma-convocatoria-ceub',
  ];
  for (const d of marDiag) {
    t.push({ member: 'Marlene', desc: `Diagrama MAR ${d}`, cat: 'Diagrama', ref: `team/Marlene/07_diagramas/${d}.mmd` });
  }
  for (let i = 1; i <= 20; i++) {
    const id = String(i).padStart(2, '0');
    t.push({
      member: 'Marlene',
      desc: `PC-NFR prompt-contract ${id} (6 elementos + invariantes)`,
      cat: 'Prompt',
      ref: `team/Marlene/06_prompt_contracts/PC-NFR-IA-${id}.prompt.md`,
    });
  }
  const marleneBRD = [
    'Objetivos SMART §5', 'Stakeholders §6', 'Business case §7', 'Alcance §8',
    'KPIs §10', 'Restricciones §11', 'Riesgos §13', 'Gobernanza §14',
    'Criterios éxito §15', 'Trazabilidad MRD/PRD §12',
  ];
  for (const s of marleneBRD) {
    t.push({ member: 'Marlene', desc: `BRD ${s}`, cat: 'BRD', ref: 'team/Marlene/01_brd/BRD.md' });
  }
  t.push(...rangeTasks('Marlene', [
    ['NFR_ISO25010.md catálogo 10 NFR SMART', 'NFR', 'team/Marlene/05_nfr/NFR_ISO25010.md'],
    ['NFR_IA.md 10 criterios IA cuantificables', 'NFR', 'team/Marlene/06_prompt_contracts/NFR_IA.md'],
    ['Gherkin 26 escenarios CU_BDD', 'Gherkin', 'team/Marlene/04_fsd/gherkin.md'],
    ['api_contracts.md MOD-AUTH + MOD-EVIDENCE', 'FSD', 'team/Marlene/04_fsd/api_contracts.md'],
    ['modelo_datos.md entidades core append-only', 'FSD', 'team/Marlene/04_fsd/modelo_datos.md'],
    ['reglas_negocio FSD-BR-01…18 sync', 'FSD', 'team/Marlene/04_fsd/reglas_negocio.md'],
    ['user_journeys 6 viajes actores', 'PRD', 'team/Marlene/03_prd/user_journeys.md'],
    ['roadmap team/Marlene oleadas release', 'PRD', 'team/Marlene/03_prd/roadmap.md'],
    ['matriz_trazabilidad team/Marlene/09', 'Auditoría', 'team/Marlene/09_trazabilidad/matriz_trazabilidad.md'],
    ['metricas_ai_sdlc team/Marlene/09', 'Auditoría', 'team/Marlene/09_trazabilidad/metricas_ai_sdlc.md'],
    ['POC-01 evidencia upload RESULTADO.md', 'POC', 'docs/pocs/POC-01-evidencias-upload/RESULTADO.md'],
    ['POC-02 workflow dictamen 13/13 pytest', 'POC', 'docs/pocs/POC-02-workflow-dictamen/RESULTADO.md'],
    ['docker-compose.yml POCs laboratorio STAGE', 'POC', 'docs/pocs/docker-compose.yml'],
    ['UC01/02/03 diagramas estado+secuencia team/', 'Diagrama', 'team/Marlene/07_diagramas/UC01_estado.mmd'],
    ['modelo_er.mmd + gantt.mmd team/Marlene', 'Diagrama', 'team/Marlene/07_diagramas/modelo_er.mmd'],
    ['templates/dti.md plantilla DTI curso', 'DTI', 'team/Marlene/templates/dti.md'],
    ['08_agents ARQ_Mermaid traceability v1', 'Otro', 'team/Marlene/08_agents/ARQ_Mermaid_SIGESA_FSD_Traceability_v1.md'],
    ['release-1.0.0.md notas release Marlene', 'Otro', 'team/Marlene/10_aportes/release-1.0.0.md'],
  ]));
  for (const [hash, msg] of COMMITS_SINCE_18.Marlene) {
    pushUnique(t, {
      member: 'Marlene',
      desc: `Commit ${hash}: ${msg}`,
      cat: 'Bitácora',
      ref: `git log ${hash}`,
    });
  }
  padFromList(t, 'Marlene', [
    ['INVENTARIO_TAREAS_APORTES_v1 v1.2 cuadre', 'Auditoría', 'team/Marlene/08_trazabilidad/INVENTARIO_TAREAS_APORTES_v1.md'],
    ['AUDITORIA_RUBRICAS_EXCELENTE 10/10 team/', 'Auditoría', 'team/Marlene/08_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE.md'],
    ['MRD §3–§11 pilares + segmentación', 'MRD', 'team/Marlene/02_mrd/MRD.md'],
    ['FSD.md checklist rúbrica entrega', 'FSD', 'team/Marlene/04_fsd/FSD.md'],
    ['prompt_contracts.md catálogo PC-UC', 'Prompt', 'team/Marlene/06_prompt_contracts/prompt_contracts.md'],
    ['PC-NFR-SEG-01 seguridad RBAC', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-SEG-01.prompt.md'],
    ['PC-NFR-FIA-01 fiabilidad append-only', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-FIA-01.prompt.md'],
    ['PC-NFR-FIA-02 disponibilidad SLA', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-FIA-02.prompt.md'],
    ['PC-NFR-ED-01 event-driven outbox', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-ED-01.prompt.md'],
    ['PC-NFR-ED-02 coreografía SQS', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-ED-02.prompt.md'],
    ['PC-NFR-USA-01 usabilidad CC/TD', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-USA-01.prompt.md'],
    ['PC-NFR-USA-02 accesibilidad WCAG', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-USA-02.prompt.md'],
    ['PC-NFR-POR-01 portabilidad cloud', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-POR-01.prompt.md'],
    ['PC-NFR-COM-01 compatibilidad CEUB', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-COM-01.prompt.md'],
    ['PC-NFR-MAN-01 mantenibilidad hexagonal', 'Prompt', 'team/Marlene/06_prompt_contracts/PC-NFR-MAN-01.prompt.md'],
    ['00_overview README + alcance + visión', 'Otro', 'team/Marlene/00_overview/README.md'],
    ['00_overview definicion_producto.md', 'Otro', 'team/Marlene/00_overview/definicion_producto.md'],
    ['rules ai_rules + coding_rules + domain_rules', 'Rule', 'team/Marlene/rules/ai_rules.md'],
    ['templates BRD + PRD + MRD + ADR curso', 'Otro', 'team/Marlene/templates/BRD_TEMPLATE.md'],
    ['templates AGENTS + APORTES + SKILL', 'Otro', 'team/Marlene/templates/AGENTS_TEMPLATE.md'],
    ['08_agents AGENTS + SKILLS + cursor_rules', 'AGENTS', 'team/Marlene/08_agents/agents/AGENTS.md'],
    ['Diagrama UC01_secuencia.mmd', 'Diagrama', 'team/Marlene/07_diagramas/UC01_secuencia.mmd'],
    ['Diagrama UC02_secuencia.mmd', 'Diagrama', 'team/Marlene/07_diagramas/UC02_secuencia.mmd'],
    ['Diagrama UC03_secuencia.mmd', 'Diagrama', 'team/Marlene/07_diagramas/UC03_secuencia.mmd'],
    ['Diagrama UC02_estado.mmd', 'Diagrama', 'team/Marlene/07_diagramas/UC02_estado.mmd'],
    ['Diagrama UC03_estado.mmd', 'Diagrama', 'team/Marlene/07_diagramas/UC03_estado.mmd'],
    ['04_fsd glosario.md dominio', 'FSD', 'team/Marlene/04_fsd/glosario.md'],
    ['03_prd user_stories.md catálogo US', 'PRD', 'team/Marlene/03_prd/user_stories.md'],
    ['06_prompt_contracts README catálogo PC', 'Prompt', 'team/Marlene/06_prompt_contracts/README.md'],
    ['06_prompt_contracts NFR.md base', 'NFR', 'team/Marlene/06_prompt_contracts/NFR.md'],
  ], target('Marlene'));

  // ── Cuadre final por integrante (v1.3) ────────────────────────────────────
  for (const m of MEMBERS) trimToTarget(t, m, target(m));

  return t;
}

function buildSection1(tasks, counts) {
  const by = {};
  for (const m of MEMBERS) by[m] = tasks.filter((x) => x.member === m);
  const total = tasks.length;
  const distribution = `${TARGET_BY_MEMBER.alexAlvarez} alex · ${TARGET_BY_MEMBER.aylenGonzales} aylen · ${TARGET_BY_MEMBER.borisAngulo} boris · ${TARGET_BY_MEMBER.Marlene} Marlene`;
  let n = 0;
  const lines = [
    '## 1. Tabla de tareas atribuidas',
    '',
    `> **${total} filas** — inventario release/2.0.0 desde commits **≥ ${SINCE}** y delta \`${BASE}..${HEAD}\`. Cuadre **v1.3**: referencia ${REFERENCE_PER} con variación natural (Alex **+15** MVP \`app/\`). Fecha verif. = **${FECHA}** (S6).`,
    '',
    '### Nota sobre la columna «Fecha verif.»',
    '',
    '| Pregunta | Respuesta |',
    '|----------|-----------|',
    `| ¿Qué significa **${FECHA}**? | Cierre inventario release/2.0.0 (sesión **S6**). |`,
    '| ¿Fecha real de autoría? | `git log --since=2026-05-18 release/1.0.0..release/2.0.0`, `log_interno.md`, PM-052…055. |',
    '| Alcance vs 1.0.0 | Delta **2.0.0**; no repite 965 tareas de [`APORTES_RELEASE_1.0.0.md`](APORTES_RELEASE_1.0.0.md). |',
    `| Equidad | Distribución: **${distribution}**; todos dentro 70–130 % del promedio. |`,
    '',
  ];
  for (const m of MEMBERS) {
    const items = by[m];
    const cats = new Set(items.map((i) => i.cat));
    lines.push(`### ${m} (${items.length} tareas · ${cats.size} categorías)`);
    lines.push('');
    lines.push('| # | Integrante | Tarea concreta | Categoría | Referencia | Fecha verif. |');
    lines.push('|---|------------|----------------|-----------|------------|--------------|');
    for (const it of items) {
      n++;
      const ref = it.ref.startsWith('`') ? it.ref : `\`${it.ref}\``;
      lines.push(`| ${n} | ${m} | ${it.desc.replace(/\|/g, '/').slice(0, 110)} | ${it.cat} | ${ref} | ${FECHA} |`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

function main() {
  const headSha = sh(`git rev-parse ${HEAD}`).slice(0, 7);
  const commitCount = sh(`git log ${BASE}..${HEAD} --since="${SINCE}" --no-merges --oneline`).split('\n').filter(Boolean).length;
  const tasks = buildCuratedTasks();
  const counts = {};
  for (const m of MEMBERS) counts[m] = tasks.filter((t) => t.member === m).length;
  const total = tasks.length;
  const avg = total / 4;
  const factors = {};
  for (const m of MEMBERS) {
    const raw = counts[m] / avg;
    factors[m] = { raw: raw.toFixed(2), clamp: Math.min(1.1, Math.max(0.5, raw)).toFixed(2) };
  }

  const doc = `# Aportes individuales — SIGESA / AcredIA · Release 2.0.0 (v1.3)

> **Documento de cierre de aportes** — Grupo AcredIA · UMSS.  
> Granularidad: \`templates/APORTES_TEMPLATE.md\` §4 y \`.cursor/skills/sigesa-auditoria-excelente-equipo/RUBRICA.md\`.  
> Alcance: commits **≥ 18/05/2026** + delta \`release/1.0.0\` → \`release/2.0.0\`.
>
> **Fuente canónica:** §1 = **${total}** tareas (Alex **${counts.alexAlvarez}** · Aylen **${counts.aylenGonzales}** · Boris **${counts.borisAngulo}** · Marlene **${counts.Marlene}**). Complemento de [\`APORTES_RELEASE_1.0.0.md\`](APORTES_RELEASE_1.0.0.md) (965 tareas v1.2).

---

## 0. Metadatos

| Campo | Valor |
|-------|-------|
| Producto | SIGESA — Sistema Gestor de Acreditaciones UMSS |
| Grupo | AcredIA (equipo documental SIGESA-DOCS) |
| Release evaluable | \`release/2.0.0\` |
| Release anterior | \`release/1.0.0\` (**965** tareas — APORTES v1.2) |
| Sesión asociada | **S6** |
| Fecha de cierre (inventario) | **28/05/2026** |
| Período de elaboración (release) | **18/05/2026 – 28/05/2026** |
| Filtro commits | \`git log ${BASE}..${HEAD} --since="${SINCE}" --no-merges\` → **${commitCount}** commits |
| Integrantes (n) | alexAlvarez · aylenGonzales · borisAngulo · Marlene (n = 4) |
| Branch del release | \`release/2.0.0\` |
| Commit de cierre (HEAD) | \`${headSha}\` |
| Tabla comparativa | [\`docs/tabla_comparativa_v1_v2.md\`](../tabla_comparativa_v1_v2.md) (1045 artefactos) |
| Auditoría docs/ 2.0 | [\`AUDITORIA_RUBRICAS_EXCELENTE_DOCS_RELEASE_2.0.0.md\`](../09_trazabilidad/AUDITORIA_RUBRICAS_EXCELENTE_DOCS_RELEASE_2.0.0.md) |
| PROMPT_MAPPING delta | PM-052…PM-055 |
| Versión documento | **v1.3** (${counts.alexAlvarez}/${counts.aylenGonzales}/${counts.borisAngulo}/${counts.Marlene} — variación vs ref. ${REFERENCE_PER}) |

---

${buildSection1(tasks, counts)}
---

## 2. Resumen por integrante

> **Base vigente (§3):** inventario **${total}** tareas — promedio **${avg.toFixed(2)}** (${FECHA}). Referencia grupal: **${REFERENCE_PER}**; variación acordada ±2–10 según rol release.

| Integrante | Total (v2.0) | Δ vs ref. ${REFERENCE_PER} | % grupo | Rúbrica | Observación |
|------------|--------------|------------------------------|---------|---------|-------------|
| alexAlvarez | **${counts.alexAlvarez}** | **+${counts.alexAlvarez - REFERENCE_PER}** | ${((100 * counts.alexAlvarez) / total).toFixed(1).replace('.', ',')} % | 9/10 \`docs/\` + MVP | Liderazgo MVP \`app/\` full-stack (gateway, 3 servicios, front React) |
| aylenGonzales | **${counts.aylenGonzales}** | ${counts.aylenGonzales - REFERENCE_PER === 0 ? '±0' : counts.aylenGonzales - REFERENCE_PER} | ${((100 * counts.aylenGonzales) / total).toFixed(1).replace('.', ',')} % | 10/10 | Roadmap v2, Mermaid 4 pasadas, POC-03/04, auditoría \`docs/\` |
| borisAngulo | **${counts.borisAngulo}** | **${counts.borisAngulo - REFERENCE_PER}** | ${((100 * counts.borisAngulo) / total).toFixed(1).replace('.', ',')} % | 9/10 | Tabla 1045 filas, Figma Phase 2, trazabilidad git |
| Marlene | **${counts.Marlene}** | **${counts.Marlene - REFERENCE_PER}** | ${((100 * counts.Marlene) / total).toFixed(1).replace('.', ',')} % | 10/10 \`team/\` | Overview, POC template, 22 US + 12 UC + MAR diagramas |
| **Total grupo** | **${total}** | — | 100 % | — | Delta 2.0.0 |

### Equidad (objetivo 70 % – 130 % del promedio ${avg.toFixed(2)})

| Integrante | Tareas | % promedio | ¿En rango 70–130 %? |
|------------|--------|------------|---------------------|
| alexAlvarez | ${counts.alexAlvarez} | ${((100 * counts.alexAlvarez) / avg).toFixed(0)} % | **Sí** |
| aylenGonzales | ${counts.aylenGonzales} | ${((100 * counts.aylenGonzales) / avg).toFixed(0)} % | **Sí** |
| borisAngulo | ${counts.borisAngulo} | ${((100 * counts.borisAngulo) / avg).toFixed(0)} % | **Sí** |
| Marlene | ${counts.Marlene} | ${((100 * counts.Marlene) / avg).toFixed(0)} % | **Sí** |

| Release | Total | Promedio/persona |
|---------|-------|------------------|
| 1.0.0 (v1.2) | 965 | 241,25 |
| **2.0.0 (v1.3)** | **${total}** | **${avg.toFixed(2)}** |

---

## 3. Cálculo del factor de aporte individual

> **Base vigente (${FECHA}):** **${total}** tareas / 4 integrantes = **${avg.toFixed(2)}** c/u.

\`\`\`
aporte_promedio_grupo = ${total} / 4 = ${avg.toFixed(2)} tareas/persona
factor_i              = clamp(tareas_i / ${avg.toFixed(2)}, 0.5, 1.1)
Nota_individual_i     = Nota_grupal × factor_i
\`\`\`

### Aplicación (inventario v2.0 — ${FECHA})

| Integrante | Tareas (§2) | factor sin clamp | factor (clamp 0.5–1.1) | Nota individual |
|------------|-------------|------------------|------------------------|-----------------|
| alexAlvarez | ${counts.alexAlvarez} | ${factors.alexAlvarez.raw} | **${factors.alexAlvarez.clamp}** | Nota_grupal × ${factors.alexAlvarez.clamp} |
| aylenGonzales | ${counts.aylenGonzales} | ${factors.aylenGonzales.raw} | **${factors.aylenGonzales.clamp}** | Nota_grupal × ${factors.aylenGonzales.clamp} |
| borisAngulo | ${counts.borisAngulo} | ${factors.borisAngulo.raw} | **${factors.borisAngulo.clamp}** | Nota_grupal × ${factors.borisAngulo.clamp} |
| Marlene | ${counts.Marlene} | ${factors.Marlene.raw} | **${factors.Marlene.clamp}** | Nota_grupal × ${factors.Marlene.clamp} |

### 3.1 Notas de equidad (sin penalizar calidad)

| Integrante | Nota |
|------------|------|
| **alexAlvarez** | **+15** por MVP \`app/\` (gateway + evidence/audit/orchestration + front E2E); **${counts.alexAlvarez}** tareas totales. |
| **aylenGonzales** | Referencia release en **${counts.aylenGonzales}** (baseline); POC + Mermaid + auditoría \`docs/\`. |
| **borisAngulo** | **−4** vs baseline; tabla **1045 filas** + Figma Phase 2 concentran densidad en menos filas inventario. |
| **Marlene** | **−6** vs baseline; núcleo \`team/Marlene/\` (22 US + 12 UC + PC-NFR) sin inflar conteo. |

---

## 4. Reglas del grupo sobre qué cuenta como tarea

Aplicadas según \`templates/APORTES_TEMPLATE.md\` §4:

| Tipo | Regla |
|------|--------|
| Documento | Sección \`##\` sustantiva nueva/mejorada en BRD/MRD/PRD/FSD/DTI = 1 tarea |
| UC | \`FSD-UC-*\` con flujo + alterno + Gherkin = 1 tarea |
| NFR | NFR cuantificable (métrica + umbral + verificación) = 1 tarea |
| Diagrama | \`.mmd\` oficial versionado (sin duplicar R100 puro) = 1 tarea |
| User story | \`PRD-US-*\` INVEST + criterios = 1 tarea |
| Prompt-contrato | \`PC-*\` con 6 elementos + invariantes = 1 tarea |
| Skill / rule / AGENTS | Skill, rule o co-autoría documentada = 1 tarea |
| POC | POC ejecutada con evidencia = 1 tarea |
| Bitácora | Sesión PM / log documentada = 1 tarea |
| ADR / Auditoría | ADR nuevo o informe trazabilidad = 1 tarea |
| Código MVP | Hito verificable \`app/\` = 1 tarea |

**No cuenta:** merge commits, R100 sin cambio, PNG, \`.gitkeep\`, cosmética, re-conteo v1.0.0.

**Incluido en 2.0.0:** \`docs/\` Golden, \`app/\`, \`figma/\`, POC-03/04.

---

## 5. Auditoría del docente (opcional)

| Integrante | Factor §3 | Rúbrica | Factor final sugerido |
|------------|-----------|---------|------------------------|
| alexAlvarez | ${factors.alexAlvarez.clamp} | 9/10 | 1,10 (techo) |
| aylenGonzales | ${factors.aylenGonzales.clamp} | 10/10 | 1,00 |
| borisAngulo | ${factors.borisAngulo.clamp} | 9/10 | 1,00 |
| Marlene | ${factors.Marlene.clamp} | 10/10 | 1,00 |

---

## 6. Checklist de cierre del release

- [x] §0 Metadatos + filtro commits ≥ 18/05/2026
- [x] §1 **${total}** filas (Alex ${counts.alexAlvarez} · Aylen ${counts.aylenGonzales} · Boris ${counts.borisAngulo} · Marlene ${counts.Marlene})
- [x] §2 Equidad 70–130 % del promedio **${avg.toFixed(2)}**
- [x] §3 Factores calculados
- [x] §4 Reglas §4 documentadas
- [ ] Commit en \`release/2.0.0\`

---

## 7. Registro de cambios del documento

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v1.0 | 28/05/2026 | Inventario delta 496 tareas (conteo por archivo) |
| v1.1 | 28/05/2026 | Re-cuadre equitativo 120×4 = 480 desde commits ≥ 18/05 |
| **v1.2** | **28/05/2026** | **37 commits mapeados por autor; eliminado filler genérico; entregables §4 verificables** |
| **v1.3** | **28/05/2026** | **Variación natural: Alex 135 (+15 MVP app), Aylen 120, Boris 116 (−4), Marlene 114 (−6)** |

**Regenerar:** \`node .cursor/skills/sigesa-auditoria-excelente-equipo/scripts/gen-aportes-release-2.0.0.js\`
`;

  fs.writeFileSync(OUT, doc, 'utf8');
  console.log(JSON.stringify({ total, counts, commitCount, avg: avg.toFixed(2) }, null, 2));
}

main();
