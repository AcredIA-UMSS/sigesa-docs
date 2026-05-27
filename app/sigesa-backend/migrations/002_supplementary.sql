-- Supplementary tables for MVP (idempotency, event idempotency)
BEGIN;

CREATE TABLE IF NOT EXISTS idempotency_cache (
  idempotency_key UUID PRIMARY KEY,
  method          VARCHAR(16) NOT NULL,
  path            TEXT NOT NULL,
  status_code     INTEGER NOT NULL,
  response_body   JSONB NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at      TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '24 hours')
);

CREATE INDEX IF NOT EXISTS idx_idempotency_expires ON idempotency_cache (expires_at);

CREATE TABLE IF NOT EXISTS processed_events (
  correlation_id UUID PRIMARY KEY,
  event_type     VARCHAR(64) NOT NULL,
  processed_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;
