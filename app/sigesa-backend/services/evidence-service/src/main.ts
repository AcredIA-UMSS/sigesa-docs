import express from 'express';
import {
  correlationIdMiddleware,
  errorHandler,
} from '@sigesa/shared';
import { evidenceRouter } from './adapters/inbound/http/routes.js';

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(correlationIdMiddleware);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'evidence-service' });
});

app.use('/api/v1', evidenceRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`evidence-service listening on :${port}`);
});
