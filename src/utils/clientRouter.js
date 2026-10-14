/**
 * @fileoverview Client-Side Autonomous Router & Local Storage Persistence
 * Guarantees 100% full functionality on GitHub Pages / mobile static hosting without requiring a live backend.
 */

import {
  allKnowledgeFaqs,
  templeHistory,
  visitingRouteSteps
} from "../core/knowledgeBase.js";
import {
  evaluateTourRequest,
  resolveHotspotGuide,
  getAllHotspotsSummary
} from "../core/semanticEngine.js";

const STORAGE_KEY_PENDING = "lungshan_pending_questions_v2";
const STORAGE_KEY_DYNAMIC = "lungshan_dynamic_faqs_v2";

function getStoredDynamicFaqs() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DYNAMIC);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getStoredPendingQuestions() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PENDING);
    if (!raw) {
      const initial = [
        {
          id: "pending_sample_01",
          query: "可以在寺廟中庭吃素食便當或喝手搖飲嗎？",
          lang: "zh-TW",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          confidence: 0.38,
          reason: "low_confidence_dietary_rule",
          status: "pending",
          suggestedAnswer:
            "為維護國定古蹟環境整潔與宗教莊嚴，三川殿與正殿、後殿參拜區內請勿飲食（飲用白開水除外）。"
        }
      ];
      localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function clientAddPendingQuestion(item) {
  try {
    const list = getStoredPendingQuestions();
    const newItem = {
      id: `pending_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      status: "pending",
      ...item
    };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(list));
    return newItem;
  } catch {
    return null;
  }
}

export function clientResolveQuestion({
  id,
  answer,
  action,
  title,
  audioScript
}) {
  try {
    const pendingList = getStoredPendingQuestions();
    const targetIdx = pendingList.findIndex(p => p.id === id);
    let originalQuery = "";

    if (targetIdx !== -1) {
      originalQuery = pendingList[targetIdx].query;
      pendingList[targetIdx].status = "resolved";
      pendingList[targetIdx].resolvedAt = new Date().toISOString();
      pendingList[targetIdx].resolvedAnswer = answer;
      localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(pendingList));
    }

    const dynamicList = getStoredDynamicFaqs();
    const newFaqId = action || `custom_${Date.now()}`;
    const resolvedTitle = title || originalQuery || "廟方審核補充解答";

    const newFaq = {
      id: newFaqId,
      action: newFaqId,
      category: "community_approved",
      keywords: [resolvedTitle, originalQuery].filter(Boolean),
      title: {
        "zh-TW": resolvedTitle,
        en: resolvedTitle,
        ja: resolvedTitle,
        ko: resolvedTitle
      },
      shortDesc: {
        "zh-TW": answer.slice(0, 48),
        en: answer.slice(0, 48),
        ja: answer.slice(0, 48),
        ko: answer.slice(0, 48)
      },
      textContent: {
        "zh-TW": answer,
        en: answer,
        ja: answer,
        ko: answer
      },
      audioScript: {
        "zh-TW": audioScript || answer,
        en: audioScript || answer,
        ja: audioScript || answer,
        ko: audioScript || answer
      },
      addedAt: new Date().toISOString()
    };

    dynamicList.unshift(newFaq);
    localStorage.setItem(STORAGE_KEY_DYNAMIC, JSON.stringify(dynamicList));
    return { success: true, faq: newFaq };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export function clientHandleTourRequest({ action, query, lang = "zh-TW" }) {
  return evaluateTourRequest({
    action,
    query,
    lang,
    dynamicFaqs: getStoredDynamicFaqs(),
    onFlagPending: item => clientAddPendingQuestion(item)
  });
}

export function clientGetFaqs(lang = "zh-TW") {
  const dynamicFaqs = getStoredDynamicFaqs();
  const all = [...allKnowledgeFaqs, ...dynamicFaqs];
  return all.map(f => ({
    id: f.id,
    action: f.action,
    category: f.category,
    title: f.title[lang] || f.title["zh-TW"],
    shortDesc: f.shortDesc ? f.shortDesc[lang] || f.shortDesc["zh-TW"] : "",
    textContent: f.textContent[lang] || f.textContent["zh-TW"],
    audioScript: f.audioScript
      ? f.audioScript[lang] || f.audioScript["zh-TW"]
      : ""
  }));
}

export function clientGetHistory(lang = "zh-TW") {
  return templeHistory[lang] || templeHistory["zh-TW"];
}

export function clientGetVisitingSteps(lang = "zh-TW") {
  return visitingRouteSteps[lang] || visitingRouteSteps["zh-TW"];
}

export function clientGetPendingQuestions() {
  return getStoredPendingQuestions();
}

export function clientGetHotspotGuide(hotspotId = "guanyin_hall", lang = "zh-TW") {
  return resolveHotspotGuide(hotspotId, lang);
}

export function clientGetAllHotspots(lang = "zh-TW") {
  return getAllHotspotsSummary(lang);
}
