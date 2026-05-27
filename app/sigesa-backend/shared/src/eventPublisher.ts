import type { DomainEventEnvelope } from './events.js';

export interface EventPublisherPort {
  publish(event: DomainEventEnvelope): Promise<void>;
}

/** Dev: HTTP webhook to audit/orchestration internal endpoints (infra, not business REST). */
export class HttpWebhookEventPublisher implements EventPublisherPort {
  constructor(
    private readonly targetUrl: string,
    private readonly secret: string,
  ) {}

  async publish(event: DomainEventEnvelope): Promise<void> {
    const res = await fetch(this.targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Events-Secret': this.secret,
      },
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Event publish failed: ${res.status} ${text}`);
    }
  }
}

export function createEventPublisher(): EventPublisherPort {
  const url = process.env.AUDIT_INTERNAL_EVENTS_URL;
  const secret = process.env.INTERNAL_EVENTS_SECRET ?? 'dev-internal-secret';
  if (!url) {
    return {
      async publish(event: DomainEventEnvelope) {
        console.warn('[EventPublisher] No AUDIT_INTERNAL_EVENTS_URL; event dropped:', event.type);
      },
    };
  }
  return new HttpWebhookEventPublisher(url, secret);
}

export function verifyInternalSecret(req: { headers: Record<string, unknown> }): boolean {
  const secret = process.env.INTERNAL_EVENTS_SECRET ?? 'dev-internal-secret';
  return req.headers['x-internal-events-secret'] === secret;
}
