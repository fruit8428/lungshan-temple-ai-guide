import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PENDING_FILE = path.join(DATA_DIR, 'pending_questions.json');
const DYNAMIC_FAQS_FILE = path.join(DATA_DIR, 'dynamic_faqs.json');

// Initialize initial sample questions if file doesn't exist
if (!fs.existsSync(PENDING_FILE)) {
  const initialPending = [
    {
      id: "pending_sample_01",
      query: "可以在寺廟裡吃素食便當或喝奶茶嗎？",
      lang: "zh-TW",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      confidence: 0.35,
      reason: "low_confidence_dietary_rule",
      status: "pending",
      suggestedAnswer: "為維護古蹟整潔與宗教莊嚴，正殿與各殿內嚴禁飲食。若有飲水需求可至側廊休息區。"
    },
    {
      id: "pending_sample_02",
      query: "Can I bring my guide dog inside the temple?",
      lang: "en",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      confidence: 0.42,
      reason: "special_accessibility_query",
      status: "pending",
      suggestedAnswer: "Certified guide dogs and service animals assisting persons with disabilities are welcome throughout the temple grounds."
    }
  ];
  fs.writeFileSync(PENDING_FILE, JSON.stringify(initialPending, null, 2), 'utf-8');
}

if (!fs.existsSync(DYNAMIC_FAQS_FILE)) {
  fs.writeFileSync(DYNAMIC_FAQS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

export function getPendingQuestions() {
  try {
    const raw = fs.readFileSync(PENDING_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read pending questions:', err);
    return [];
  }
}

export function addPendingQuestion(item) {
  try {
    const list = getPendingQuestions();
    const newItem = {
      id: `pending_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...item
    };
    list.unshift(newItem);
    fs.writeFileSync(PENDING_FILE, JSON.stringify(list, null, 2), 'utf-8');
    return newItem;
  } catch (err) {
    console.error('Failed to add pending question:', err);
    return null;
  }
}

export function getDynamicFaqs() {
  try {
    const raw = fs.readFileSync(DYNAMIC_FAQS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read dynamic faqs:', err);
    return [];
  }
}

export function resolveQuestion({ id, answer, action, title, lang = 'zh-TW', audioScript }) {
  try {
    const pendingList = getPendingQuestions();
    const targetIdx = pendingList.findIndex(p => p.id === id);
    let originalQuery = '';
    
    if (targetIdx !== -1) {
      originalQuery = pendingList[targetIdx].query;
      pendingList[targetIdx].status = 'resolved';
      pendingList[targetIdx].resolvedAt = new Date().toISOString();
      pendingList[targetIdx].resolvedAnswer = answer;
      fs.writeFileSync(PENDING_FILE, JSON.stringify(pendingList, null, 2), 'utf-8');
    }

    // Add to Dynamic FAQs (90% cache expansion flywheel)
    const dynamicList = getDynamicFaqs();
    const newFaqId = action || `custom_${Date.now()}`;
    const newFaq = {
      id: newFaqId,
      action: newFaqId,
      category: 'community_approved',
      title: {
        'zh-TW': title || originalQuery || '廟方補充解答',
        'en': title || originalQuery,
        'ja': title || originalQuery,
        'ko': title || originalQuery
      },
      textContent: {
        'zh-TW': answer,
        'en': answer,
        'ja': answer,
        'ko': answer
      },
      audioScript: {
        'zh-TW': audioScript || answer,
        'en': audioScript || answer,
        'ja': audioScript || answer,
        'ko': audioScript || answer
      },
      addedAt: new Date().toISOString()
    };
    dynamicList.unshift(newFaq);
    fs.writeFileSync(DYNAMIC_FAQS_FILE, JSON.stringify(dynamicList, null, 2), 'utf-8');

    return { success: true, faq: newFaq };
  } catch (err) {
    console.error('Failed to resolve question:', err);
    return { success: false, error: err.message };
  }
}
