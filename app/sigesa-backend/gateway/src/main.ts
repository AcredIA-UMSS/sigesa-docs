import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = Number(process.env.PORT ?? 8080);

const evidenceUrl = process.env.EVIDENCE_SERVICE_URL ?? 'http://localhost:3001';
const auditUrl = process.env.AUDIT_SERVICE_URL ?? 'http://localhost:3002';

app.use(cors());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

const evidenceProxy = createProxyMiddleware({
  target: evidenceUrl,
  changeOrigin: true,
});

const auditProxy = createProxyMiddleware({
  target: auditUrl,
  changeOrigin: true,
});

app.use('/api/v1', (req, res, next) => {
  const path = req.originalUrl ?? req.url;
  if (/\/indicators\/[^/]+\/evidences/.test(path)) {
    return evidenceProxy(req, res, next);
  }
  return auditProxy(req, res, next);
});

app.listen(port, () => {
  console.log(`api-gateway :${port} -> evidence ${evidenceUrl}, audit ${auditUrl}`);
});
