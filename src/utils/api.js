// API Client for Bangka Lungshan Temple AI System

const API_BASE = '/api';

export async function fetchRoute({ action, query, lang = 'zh-TW' }) {
  try {
    const res = await fetch(`${API_BASE}/route`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, query, lang })
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('API error, falling back:', err);
    return {
      success: false,
      error: err.message
    };
  }
}

export async function fetchFaqs(lang = 'zh-TW') {
  try {
    const res = await fetch(`${API_BASE}/faqs?lang=${encodeURIComponent(lang)}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch FAQs:', err);
    return [];
  }
}

export async function fetchHistory(lang = 'zh-TW') {
  try {
    const res = await fetch(`${API_BASE}/guide/history?lang=${encodeURIComponent(lang)}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch history:', err);
    return null;
  }
}

export async function fetchVisitingSteps(lang = 'zh-TW') {
  try {
    const res = await fetch(`${API_BASE}/guide/route?lang=${encodeURIComponent(lang)}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch route steps:', err);
    return [];
  }
}

export async function fetchPendingQuestions() {
  try {
    const res = await fetch(`${API_BASE}/admin/pending`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch pending questions:', err);
    return [];
  }
}

export async function resolvePendingQuestion(payload) {
  try {
    const res = await fetch(`${API_BASE}/admin/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to resolve question:', err);
    return { success: false, error: err.message };
  }
}

export async function triggerN8nWebhook(payload) {
  try {
    const res = await fetch(`${API_BASE}/webhook/n8n`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to trigger n8n webhook:', err);
    return { success: false, error: err.message };
  }
}
