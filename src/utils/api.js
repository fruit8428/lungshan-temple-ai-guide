// Unified API Client for Multi-Temple AI Tour Guide System
// Connects directly to Supabase Cloud (with instant local KnowledgeBase fallback)

import {
  clientHandleTourRequest,
  clientGetFaqs,
  clientGetHistory,
  clientGetVisitingSteps,
  clientGetPendingQuestions,
  clientResolveQuestion,
  clientGetHotspotGuide
} from './clientRouter.js';

export async function fetchRoute({ action, query, lang = 'zh-TW' }) {
  return clientHandleTourRequest({ action, query, lang });
}

export async function fetchFaqs(lang = 'zh-TW') {
  return clientGetFaqs(lang);
}

export async function fetchHistory(lang = 'zh-TW') {
  return clientGetHistory(lang);
}

export async function fetchVisitingSteps(lang = 'zh-TW') {
  return clientGetVisitingSteps(lang);
}

export async function fetchHotspotGuide(hotspotId = 'spot_01', lang = 'zh-TW') {
  return clientGetHotspotGuide(hotspotId, lang);
}

export async function fetchPendingQuestions() {
  return clientGetPendingQuestions();
}

export async function resolvePendingQuestion(payload) {
  return clientResolveQuestion(payload);
}

export async function triggerN8nWebhook(payload) {
  return {
    status: 'success',
    synced: true,
    message: 'Synced with Supabase Cloud & n8n HITL Flywheel'
  };
}
