// API Client for Bangka Lungshan Temple AI System
// Supports both backend Express server and standalone GitHub Pages static deployment

import {
  clientHandleTourRequest,
  clientGetFaqs,
  clientGetHistory,
  clientGetVisitingSteps,
  clientGetPendingQuestions,
  clientResolveQuestion
} from './clientRouter.js';

const isStaticHosting = typeof window !== 'undefined' && (
  window.location.hostname.includes('github.io') ||
  window.location.protocol === 'file:'
);

const API_BASE = '/api';

export async function fetchRoute({ action, query, lang = 'zh-TW' }) {
  if (isStaticHosting) {
    return clientHandleTourRequest({ action, query, lang });
  }

  try {
    const res = await fetch(`${API_BASE}/route`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, query, lang })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // Graceful fallback to client engine
    return clientHandleTourRequest({ action, query, lang });
  }
}

export async function fetchFaqs(lang = 'zh-TW') {
  if (isStaticHosting) {
    return clientGetFaqs(lang);
  }

  try {
    const res = await fetch(`${API_BASE}/faqs?lang=${encodeURIComponent(lang)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return clientGetFaqs(lang);
  }
}

export async function fetchHistory(lang = 'zh-TW') {
  if (isStaticHosting) {
    return clientGetHistory(lang);
  }

  try {
    const res = await fetch(`${API_BASE}/guide/history?lang=${encodeURIComponent(lang)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return clientGetHistory(lang);
  }
}

export async function fetchVisitingSteps(lang = 'zh-TW') {
  if (isStaticHosting) {
    return clientGetVisitingSteps(lang);
  }

  try {
    const res = await fetch(`${API_BASE}/guide/route?lang=${encodeURIComponent(lang)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return clientGetVisitingSteps(lang);
  }
}

export async function fetchPendingQuestions() {
  if (isStaticHosting) {
    return clientGetPendingQuestions();
  }

  try {
    const res = await fetch(`${API_BASE}/admin/pending`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return clientGetPendingQuestions();
  }
}

export async function resolvePendingQuestion(payload) {
  if (isStaticHosting) {
    return clientResolveQuestion(payload);
  }

  try {
    const res = await fetch(`${API_BASE}/admin/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return clientResolveQuestion(payload);
  }
}

export async function triggerN8nWebhook(payload) {
  if (isStaticHosting) {
    return {
      status: 'success',
      synced: true,
      message: 'Simulated n8n webhook on static deployment'
    };
  }

  try {
    const res = await fetch(`${API_BASE}/webhook/n8n`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      status: 'simulated',
      message: 'Simulated local webhook triggered'
    };
  }
}
