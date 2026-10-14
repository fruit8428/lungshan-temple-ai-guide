import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { templeHistory, visitingRouteSteps, allKnowledgeFaqs } from './knowledgeBase.js';
import { resolveHotspotGuide } from '../src/core/semanticEngine.js';
import { handleTourRequest } from './aiRouter.js';
import { getPendingQuestions, resolveQuestion, getDynamicFaqs } from './pendingStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Bangka Lungshan Temple Multilingual AI Guide',
    timestamp: new Date().toISOString()
  });
});

// 2. Core Dual-Tier Router Endpoint (Skill Guide Spec)
app.post('/api/route', async (req, res) => {
  try {
    const { action, query, lang } = req.body;
    const result = await handleTourRequest({ action, query, lang });
    res.json(result);
  } catch (err) {
    console.error('Error handling tour request:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 3. FAQs endpoint
app.get('/api/faqs', (req, res) => {
  const lang = req.query.lang || 'zh-TW';
  const dynamicFaqs = getDynamicFaqs();
  const all = [...allKnowledgeFaqs, ...dynamicFaqs];
  
  const mapped = all.map(f => ({
    id: f.id,
    action: f.action,
    category: f.category,
    title: f.title[lang] || f.title['zh-TW'],
    shortDesc: f.shortDesc ? (f.shortDesc[lang] || f.shortDesc['zh-TW']) : '',
    textContent: f.textContent[lang] || f.textContent['zh-TW'],
    audioScript: f.audioScript ? (f.audioScript[lang] || f.audioScript['zh-TW']) : ''
  }));
  res.json(mapped);
});

// 4. Temple History endpoint
app.get('/api/guide/history', (req, res) => {
  const lang = req.query.lang || 'zh-TW';
  const hist = templeHistory[lang] || templeHistory['zh-TW'];
  res.json(hist);
});

// 5. Visiting Sequence endpoint (5 steps)
app.get('/api/guide/route', (req, res) => {
  const lang = req.query.lang || 'zh-TW';
  const steps = visitingRouteSteps[lang] || visitingRouteSteps['zh-TW'];
  res.json(steps);
});

// 5.1 360 Panorama Hotspot Guide endpoint
app.get('/api/guide/hotspot/:id', (req, res) => {
  const lang = req.query.lang || 'zh-TW';
  const hotspotId = req.params.id;
  res.json(resolveHotspotGuide(hotspotId, lang));
});

// 6. Admin / HITL: Get pending questions
app.get('/api/admin/pending', (req, res) => {
  const list = getPendingQuestions();
  res.json(list);
});

// 7. Admin / HITL: Resolve question & expand 90% knowledge base
app.post('/api/admin/resolve', (req, res) => {
  const { id, answer, action, title, lang, audioScript } = req.body;
  if (!answer) {
    return res.status(400).json({ error: 'Answer content is required' });
  }
  const result = resolveQuestion({ id, answer, action, title, lang, audioScript });
  res.json(result);
});

// 8. n8n Automation Webhook Endpoint (Flywheel Integration)
app.post('/api/webhook/n8n', (req, res) => {
  const { action, query, answer, source = 'n8n_workflow' } = req.body;
  console.log(`[n8n Webhook Received from ${source}]:`, req.body);
  
  if (answer) {
    const result = resolveQuestion({
      id: req.body.pendingId || `n8n_${Date.now()}`,
      answer,
      title: query || action,
      action: action || `faq_n8n_${Date.now()}`
    });
    return res.json({ status: 'success', synced: true, result });
  }

  res.json({
    status: 'acknowledged',
    message: 'n8n webhook received and processed',
    receivedAt: new Date().toISOString()
  });
});

// Serve frontend build if exists
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.send('Bangka Lungshan Temple AI Guide API Server is Running. Please start Vite dev client or run npm run build.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🛕 Bangka Lungshan Temple AI Server listening on http://localhost:${PORT}`);
});
