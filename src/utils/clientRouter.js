/**
 * @fileoverview Cloud-First (Supabase) + Offline-Capable Router
 * Priority 1: Live Supabase Multi-Tenant Database (https://eetcsgkowxvositnkran.supabase.co)
 * Priority 2: Local KnowledgeBase Fallback (zero downtime guarantee)
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
import {
  getActiveTempleSlug,
  fetchTempleBundleFromSupabase,
  pickLocalized,
  insertHitlQuestionToSupabase
} from "../core/supabaseClient.js";

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
    const templeSlug = getActiveTempleSlug();
    // Sync to Supabase Cloud HITL table asynchronously
    insertHitlQuestionToSupabase({
      templeSlug,
      query: item.query,
      lang: item.lang,
      confidence: item.confidence,
      reason: item.reason,
      suggestedAnswer: item.suggestedAnswer
    });

    const list = getStoredPendingQuestions();
    const newItem = {
      id: `pending_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      temple_slug: templeSlug,
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

/**
 * Converts a Supabase `knowledge_faqs` row into the standard internal FAQ format
 */
function mapSupabaseFaqRow(row) {
  const kwArray =
    typeof row.keywords === "string"
      ? row.keywords
          .split(",")
          .map(s => s.trim())
          .filter(Boolean)
      : Array.isArray(row.keywords)
      ? row.keywords
      : [];

  return {
    id: row.faq_code || `faq_${row.id}`,
    action: row.action_code || row.faq_code || `faq_${row.id}`,
    category: row.category || "general",
    isQuickButton: row.is_quick_button !== false,
    keywords: kwArray,
    title: {
      "zh-TW": row.title_zh || "",
      en: row.title_en || row.title_zh || "",
      ja: row.title_ja || row.title_zh || "",
      ko: row.title_ko || row.title_zh || ""
    },
    shortDesc: {
      "zh-TW": row.short_desc_zh || "",
      en: row.short_desc_en || row.short_desc_zh || "",
      ja: row.short_desc_ja || row.short_desc_zh || "",
      ko: row.short_desc_ko || row.short_desc_zh || ""
    },
    textContent: {
      "zh-TW": row.content_zh || "",
      en: row.content_en || row.content_zh || "",
      ja: row.content_ja || row.content_zh || "",
      ko: row.content_ko || row.content_zh || ""
    },
    audioScript: {
      "zh-TW": row.script_zh || row.content_zh || "",
      en: row.script_en || row.content_en || "",
      ja: row.script_ja || row.content_ja || "",
      ko: row.script_ko || row.content_ko || ""
    }
  };
}

export async function clientHandleTourRequest({
  action,
  query,
  lang = "zh-TW"
}) {
  const templeSlug = getActiveTempleSlug();
  let cloudFaqs = [];
  try {
    const bundle = await fetchTempleBundleFromSupabase(templeSlug);
    if (bundle && Array.isArray(bundle.faqs) && bundle.faqs.length > 0) {
      cloudFaqs = bundle.faqs.map(mapSupabaseFaqRow);
    }
  } catch {}

  return evaluateTourRequest({
    action,
    query,
    lang,
    dynamicFaqs: [...cloudFaqs, ...getStoredDynamicFaqs()],
    onFlagPending: item => clientAddPendingQuestion(item)
  });
}

export async function clientGetFaqs(lang = "zh-TW") {
  const templeSlug = getActiveTempleSlug();
  try {
    const bundle = await fetchTempleBundleFromSupabase(templeSlug);
    if (bundle && Array.isArray(bundle.faqs) && bundle.faqs.length > 0) {
      const mapped = bundle.faqs.map(mapSupabaseFaqRow);
      return mapped.map(f => ({
        id: f.id,
        action: f.action,
        category: f.category,
        title: f.title[lang] || f.title["zh-TW"],
        shortDesc: f.shortDesc[lang] || f.shortDesc["zh-TW"],
        textContent: f.textContent[lang] || f.textContent["zh-TW"],
        audioScript: f.audioScript[lang] || f.audioScript["zh-TW"]
      }));
    }
  } catch {}

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

export async function clientGetHistory(lang = "zh-TW") {
  const templeSlug = getActiveTempleSlug();
  try {
    const bundle = await fetchTempleBundleFromSupabase(templeSlug);
    if (bundle && bundle.temple) {
      const t = bundle.temple;
      const localFallback = templeHistory[lang] || templeHistory["zh-TW"];
      return {
        ...localFallback,
        templeSlug: t.temple_slug,
        gothruUrl: t.gothru_url || "https://tourmkr.com/F1vWDe52rp",
        badge: t.badge_zh || "國定古蹟 • 智慧導覽",
        templeName: pickLocalized(t, "name", lang) || localFallback.title,
        heroIntro: pickLocalized(t, "intro", lang),
        addressInfo: t.address_zh || "",
        title: pickLocalized(t, "name", lang) || localFallback.title,
        subtitle: t.badge_zh || localFallback.subtitle,
        audioScript:
          pickLocalized(t, "overview_script", lang) || localFallback.audioScript
      };
    }
  } catch {}

  return templeHistory[lang] || templeHistory["zh-TW"];
}

export async function clientGetVisitingSteps(lang = "zh-TW") {
  const templeSlug = getActiveTempleSlug();
  try {
    const bundle = await fetchTempleBundleFromSupabase(templeSlug);
    if (bundle && Array.isArray(bundle.steps) && bundle.steps.length > 0) {
      return bundle.steps.map(s => ({
        step: s.step_no,
        id: `step_${s.step_no}`,
        name: pickLocalized(s, "name", lang),
        location: pickLocalized(s, "location", lang),
        rule: pickLocalized(s, "rule", lang),
        deityFocus: pickLocalized(s, "deity", lang),
        description: pickLocalized(s, "desc", lang),
        audioScript: pickLocalized(s, "script", lang)
      }));
    }
  } catch {}

  return visitingRouteSteps[lang] || visitingRouteSteps["zh-TW"];
}

export function clientGetPendingQuestions() {
  return getStoredPendingQuestions();
}

export async function clientGetHotspotGuide(
  hotspotId = "spot_01",
  lang = "zh-TW"
) {
  const templeSlug = getActiveTempleSlug();
  const normalized = (hotspotId || "spot_01").trim().toLowerCase();

  // Map legacy IDs to standard spot_01 / spot_02 / spot_03 when querying Supabase
  const aliasToSpot = {
    guanyin_hall: "spot_01",
    stone_lion: "spot_01",
    shishi: "spot_01",
    bronze_dragon_pillar: "spot_02",
    dragon_pillar: "spot_02",
    spiral_caisson: "spot_03",
    caisson: "spot_03"
  };
  const targetSpotId = aliasToSpot[normalized] || normalized;

  try {
    const bundle = await fetchTempleBundleFromSupabase(templeSlug);
    if (bundle && Array.isArray(bundle.hotspots) && bundle.hotspots.length > 0) {
      const matched =
        bundle.hotspots.find(
          h =>
            h.spot_id?.toLowerCase() === targetSpotId ||
            h.spot_id?.toLowerCase() === normalized
        ) || bundle.hotspots[0];

      if (matched) {
        return {
          id: matched.spot_id,
          target: matched.spot_id,
          icon: matched.icon || "🦁",
          badge: pickLocalized(matched, "badge", lang),
          title: pickLocalized(matched, "title", lang),
          subtitle: `${pickLocalized(bundle.temple, "name", lang)} • 360° 實景熱點 (${matched.spot_id})`,
          location: pickLocalized(matched, "location", lang),
          textContent: pickLocalized(matched, "content", lang),
          audioScript: pickLocalized(matched, "script", lang),
          comparison: null
        };
      }
    }
  } catch {}

  return resolveHotspotGuide(hotspotId, lang);
}

export function clientGetAllHotspots(lang = "zh-TW") {
  return getAllHotspotsSummary(lang);
}
