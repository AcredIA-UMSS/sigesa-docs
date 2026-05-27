import express from 'express';
import {
  correlationIdMiddleware,
  errorHandler,
  verifyInternalSecret,
} from '@sigesa/shared';
import type { DomainEventEnvelope, IndicatorApprovedPayload } from '@sigesa/shared';
import { HandleIndicatorApprovedEvent } from './application/HandleIndicatorApproved.js';

const app = express();
const port = Number(process.env.PORT ?? 3003);
const handler = new HandleIndicatorApprovedEvent();

app.use(correlationIdMiddleware);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'orchestration-service' });
});

app.post('/internal/events', async (req, res, next) => {
  try {
    if (!verifyInternalSecret(req)) {
      res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Invalid secret' } });
      return;
    }
    await handler.execute(
      req.body as DomainEventEnvelope<IndicatorApprovedPayload>,
    );
    res.status(202).json({ accepted: true });
  } catch (e) {
    next(e);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`orchestration-service listening on :${port}`);
});
