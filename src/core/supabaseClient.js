/**
 * @fileoverview Multi-Tenant Supabase Cloud Client & Smart Audio Path Resolver
 * Connects to project: https://eetcsgkowxvositnkran.supabase.co
 * Automatically falls back to local knowledgeBase.js if offline or before SQL setup.
 */

export const SUPABASE_URL =
  import.meta.env?.VITE_SUPABASE_URL ||
  "https://eetcsgkowxvositnkran.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_QCKI8caeOGeYVk7JZOJC0A_WtT90gXN";

const STORAGE_BUCKET = "temple-audio";

/**
 * Resolves the active temple slug from URL query (?temple=hesheng) or pathname (/hesheng)
 */
export function getActiveTempleSlug() {
  if (typeof window === "undefined") return "lungshan";
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("temple");
    if (fromQuery && /^[a-z0-9_-]+$/i.test(fromQuery.trim())) {
      return fromQuery.trim().toLowerCase();
    }
    const pathname = (window.location.pathname || "").toLowerCase();
    if (pathname.includes("/hesheng")) {
      return "hesheng";
    }
    const hostname = (window.location.hostname || "").toLowerCase();
    if (hostname.includes("hesheng")) {
      return "hesheng";
    }
  } catch {}
  return "lungshan";
}

/**
 * Smart Audio URL Resolver (Convention over Configuration)
 * Formula: https://<project>.supabase.co/storage/v1/object/public/temple-audio/{temple_slug}/{lang}/{code}.mp3
 */
export function resolveSmartAudioUrl(templeSlug, lang, code, explicitUrl = null) {
  if (explicitUrl && explicitUrl.startsWith("http")) {
    return explicitUrl;
  }
  const cleanTemple = (templeSlug || "lungshan").trim().toLowerCase();
  const cleanLang = ["zh-TW", "en", "ja", "ko"].includes(lang) ? lang : "zh-TW";
  const cleanCode = (code || "spot_01").trim().toLowerCase();
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${cleanTemple}/${cleanLang}/${cleanCode}.mp3`;
}

/**
 * Generic helper to query Supabase PostgREST API
 */
async function supabaseFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    throw new Error(`Supabase HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * Helper to pick localized field from a flat row (e.g., title_zh, title_en, title_ja, title_ko)
 */
export function pickLocalized(row, prefix, lang = "zh-TW") {
  if (!row) return "";
  const suffixMap = {
    "zh-TW": "zh",
    en: "en",
    ja: "ja",
    ko: "ko"
  };
  const suffix = suffixMap[lang] || "zh";
  return row[`${prefix}_${suffix}`] || row[`${prefix}_zh`] || "";
}

// In-memory cache per temple_slug to keep interactions <10ms after initial load
const templeCache = new Map();

/**
 * Fetches full configuration for a temple (metadata, hotspots, route steps, FAQs) from Supabase
 */
export async function fetchTempleBundleFromSupabase(templeSlug = "lungshan") {
  const slug = (templeSlug || "lungshan").trim().toLowerCase();
  if (templeCache.has(slug)) {
    return templeCache.get(slug);
  }

  const [temples, hotspots, steps, faqs] = await Promise.all([
    supabaseFetch(`temples?temple_slug=eq.${encodeURIComponent(slug)}&select=*`),
    supabaseFetch(
      `hotspots?temple_slug=eq.${encodeURIComponent(slug)}&select=*&order=spot_id.asc`
    ),
    supabaseFetch(
      `route_steps?temple_slug=eq.${encodeURIComponent(slug)}&select=*&order=step_no.asc`
    ),
    supabaseFetch(
      `knowledge_faqs?temple_slug=eq.${encodeURIComponent(slug)}&select=*&order=faq_code.asc`
    )
  ]);

  if (!Array.isArray(temples) || temples.length === 0) {
    return null;
  }

  const bundle = {
    temple: temples[0],
    hotspots: hotspots || [],
    steps: steps || [],
    faqs: faqs || []
  };

  templeCache.set(slug, bundle);
  return bundle;
}

/**
 * Fetches list of all available temples in Supabase (for quick switching / demo)
 */
export async function fetchAllTemplesList() {
  try {
    const rows = await supabaseFetch(
      "temples?select=temple_slug,name_zh,name_en,name_ja,name_ko,gothru_url&order=id.asc"
    );
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

/**
 * Logs a visitor's uncataloged/HITL question to Supabase cloud table
 */
export async function insertHitlQuestionToSupabase({
  templeSlug = "lungshan",
  query,
  lang = "zh-TW",
  confidence = 0.4,
  reason = "uncataloged_visitor_query",
  suggestedAnswer = ""
}) {
  try {
    await supabaseFetch("hitl_pending_questions", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        temple_slug: templeSlug,
        query,
        lang,
        confidence,
        reason,
        suggested_answer: suggestedAnswer,
        status: "pending"
      })
    });
    return true;
  } catch {
    return false;
  }
}
