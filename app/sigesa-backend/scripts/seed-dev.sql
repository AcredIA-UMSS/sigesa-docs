-- Dev seed: CC, TD, one indicator in PENDIENTE (run after 001_ddl + 002_supplementary)
BEGIN;

-- Users (password for all: Password123! — bcrypt hash below is placeholder; auth uses email match in dev)
INSERT INTO app_user (id, email, display_name) VALUES
  ('11111111-1111-1111-1111-111111111101', 'cc.demo@umss.edu.bo', 'Coordinador Demo CC'),
  ('22222222-2222-2222-2222-222222222201', 'td.demo@umss.edu.bo', 'Técnico Demo TD'),
  ('33333333-3333-3333-3333-333333333301', 'jd.demo@umss.edu.bo', 'Jefatura Demo JD')
ON CONFLICT (email) DO NOTHING;

INSERT INTO faculty (id, code, name) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'ING', 'Facultad de Ingeniería')
ON CONFLICT (code) DO NOTHING;

INSERT INTO academic_program (id, faculty_id, code, name) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'INF-SIS', 'Ingeniería de Sistemas')
ON CONFLICT (code) DO NOTHING;

INSERT INTO user_program_assignment (id, user_id, program_id, role_code, created_by, created_by_role) VALUES
  ('cccccccc-cccc-cccc-cccc-ccccccccccc1', '11111111-1111-1111-1111-111111111101', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'CC', '33333333-3333-3333-3333-333333333301', 'JD'),
  ('cccccccc-cccc-cccc-cccc-ccccccccccc2', '22222222-2222-2222-2222-222222222201', NULL, 'TD', '33333333-3333-3333-3333-333333333301', 'JD')
ON CONFLICT DO NOTHING;

INSERT INTO accreditation_template (id, modality, version, estado, created_by, created_by_role) VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd1', 'CEUB', 1, 'ACTIVO', '33333333-3333-3333-3333-333333333301', 'JD')
ON CONFLICT (modality, version) DO NOTHING;

INSERT INTO template_phase (id, template_id, sequence_no, name) VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1', 'dddddddd-dddd-dddd-dddd-dddddddddddd1', 1, 'Autoevaluación')
ON CONFLICT (template_id, sequence_no) DO NOTHING;

INSERT INTO evaluation_dimension (id, template_id, code, name) VALUES
  ('ffffffff-ffff-ffff-ffff-fffffffffff1', 'dddddddd-dddd-dddd-dddd-dddddddddddd1', 'DIM-01', 'Contexto Institucional')
ON CONFLICT (template_id, code) DO NOTHING;

INSERT INTO evaluation_criterion (id, dimension_id, code, description) VALUES
  ('10101010-1010-1010-1010-101010101010', 'ffffffff-ffff-ffff-ffff-fffffffffff1', 'CRIT-01', 'Criterio demo')
ON CONFLICT (dimension_id, code) DO NOTHING;

INSERT INTO indicator_catalog (id, template_phase_id, criterion_id, code, requirement_text) VALUES
  ('20202020-2020-2020-2020-202020202020', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1', '10101010-1010-1010-1010-101010101010', 'IND-1.2', 'Indicador demo 1.2')
ON CONFLICT (template_phase_id, code) DO NOTHING;

INSERT INTO accreditation_process (id, program_id, template_id, management_year, started_on, created_by, created_by_role) VALUES
  ('30303030-3030-3030-3030-303030303030', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'dddddddd-dddd-dddd-dddd-dddddddddddd1', 2026, CURRENT_DATE, '33333333-3333-3333-3333-333333333301', 'JD')
ON CONFLICT DO NOTHING;

INSERT INTO phase (id, process_id, template_phase_id, created_by, created_by_role) VALUES
  ('40404040-4040-4040-4040-404040404040', '30303030-3030-3030-3030-303030303030', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1', '33333333-3333-3333-3333-333333333301', 'JD')
ON CONFLICT (process_id, template_phase_id) DO NOTHING;

INSERT INTO indicator (id, phase_id, catalog_id, created_by, created_by_role) VALUES
  ('50505050-5050-5050-5050-505050505050', '40404040-4040-4040-4040-404040404040', '20202020-2020-2020-2020-202020202020', '33333333-3333-3333-3333-333333333301', 'SYSTEM')
ON CONFLICT (phase_id, catalog_id) DO NOTHING;

-- Initial state PENDIENTE via history (append-only)
INSERT INTO indicator_state_history (id, indicator_id, previous_state, new_state, reason, correlation_id, created_by, created_by_role)
SELECT gen_random_uuid(), '50505050-5050-5050-5050-505050505050', 'PENDIENTE', 'PENDIENTE', 'Seed inicial', gen_random_uuid(), '33333333-3333-3333-3333-333333333301', 'SYSTEM'
WHERE NOT EXISTS (
  SELECT 1 FROM indicator_state_history WHERE indicator_id = '50505050-5050-5050-5050-505050505050'
);

COMMIT;
