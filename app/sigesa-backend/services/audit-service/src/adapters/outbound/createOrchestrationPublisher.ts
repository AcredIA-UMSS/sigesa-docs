import type { DomainEventEnvelope, EventPublisherPort } from '@sigesa/shared';
import { HttpWebhookEventPublisher } from '@sigesa/shared';

export function createOrchestrationPublisher(): EventPublisherPort {
  const url = process.env.ORCHESTRATION_INTERNAL_EVENTS_URL;
  const secret = process.env.INTERNAL_EVENTS_SECRET ?? 'dev-internal-secret';
  if (!url) {
    return {
      async publish(event: DomainEventEnvelope) {
        console.warn('[OrchestrationPublisher] dropped:', event.type);
      },
    };
  }
  return new HttpWebhookEventPublisher(url, secret);
}
