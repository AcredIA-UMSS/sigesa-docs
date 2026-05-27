import express from 'express';
import cors from 'cors';
import {
  correlationIdMiddleware,
  errorHandler,
} from '@sigesa/shared';
import { auditRouter, internalRouter } from './adapters/inbound/http/routes.js';

const app = express();
const port = Number(process.env.PORT ?? 3002);

app.use(cors());
app.use(correlationIdMiddleware);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'audit-service' });
});

app.use('/internal', internalRouter);
app.use('/api/v1', auditRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`audit-service listening on :${port}`);
});
