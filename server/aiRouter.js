import { allKnowledgeFaqs, templeHistory, visitingRouteSteps } from './knowledgeBase.js';
import { getDynamicFaqs, addPendingQuestion } from './pendingStore.js';

// Polite fallback message for low confidence or sensitive topics across 4 languages
const POLITE_FALLBACK = {
  "zh-TW": "感謝您的提問。此問題涉及較深度的寺廟專案或個別事項，AI 導覽員已將您的問題標記並登記轉交「龍山寺總務服務處」審核。如有即時急需，建議您可移步至三川殿前庭服務台，由值班師兄姊為您詳細解答。阿彌陀佛！",
  "en": "Thank you for asking. This inquiry involves specific or sensitive matters outside standard guidance. The AI guide has logged this question for review by the Lungshan Temple Administration Office. For immediate assistance, please visit the Service Counter in the front courtyard.",
  "ja": "ご質問ありがとうございます。こちらのご質問は専門的な確認を要するため、AIガイドにて記録し、龍山寺管理事務所の確認事項として引き継ぎいたしました。お急ぎの場合は、三川殿前庭の総合案内所（サービスカウンター）にて係員にお尋ねください。",
  "ko": "질문해 주셔서 감사합니다. 해당 문의는 사찰 관리실의 추가 확인이 필요한 내용으로, AI 도슨트가 기록하여 '용산사 총무 사무처'로 전달 등록하였습니다. 즉시 도움이 필요하신 경우, 삼천전 앞뜰 안내 데스크의 직원에게 문의해 주시기 바랍니다."
};

// Sensitive keywords trigger human-in-the-loop review
const SENSITIVE_KEYWORDS = [
  '政治', '政客', '選舉', '退費', '投訴', '香油錢明細', '密碼', '隱私', '違法', '抗議',
  'politics', 'election', 'refund', 'complaint', 'financial audit', 'protest',
  '政治', '選挙', '返金', 'クレーム', '財務明細',
  '정치', '선거', '환불', '민원', '장부'
];

/**
 * Semantic/keyword similarity calculation supporting CJK and Latin languages
 */
function calculateSimilarity(query, targetText) {
  if (!query || !targetText) return 0;
  const q = query.trim().toLowerCase();
  const t = targetText.toLowerCase();

  // Direct substring inclusion
  if (t.includes(q)) return 0.96;

  // Extract English/Latin words (length >= 3)
  const qWords = q.match(/[a-z0-9]+/g) || [];
  const tWords = new Set(t.match(/[a-z0-9]+/g) || []);

  if (qWords.length > 0) {
    let matchedWords = 0;
    for (const w of qWords) {
      if (tWords.has(w)) matchedWords++;
    }
    const wordScore = matchedWords / qWords.length;
    if (wordScore > 0.5) return wordScore * 0.9;
  }

  // CJK character matching (ignoring punctuation and whitespace)
  const qCjk = (q.match(/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/g) || []);
  if (qCjk.length > 0) {
    let common = 0;
    const uniqueChars = Array.from(new Set(qCjk));
    for (const ch of uniqueChars) {
      if (t.includes(ch)) common++;
    }
    const cjkScore = common / uniqueChars.length;
    return cjkScore * 0.85;
  }

  return 0;
}

/**
 * Core Dual-tier routing logic
 */
export async function handleTourRequest({ action, query, lang = 'zh-TW' }) {
  const startTime = Date.now();
  const validLang = ['zh-TW', 'en', 'ja', 'ko'].includes(lang) ? lang : 'zh-TW';

  // 1. TIER 1: 90% Route - Direct Payload Action Match (Fast Cache, <0.5s, 0 LLM Cost)
  const combinedFaqs = [...allKnowledgeFaqs, ...getDynamicFaqs()];

  if (action) {
    const matchedFaq = combinedFaqs.find(f => f.action === action || f.id === action);
    if (matchedFaq) {
      const text = matchedFaq.textContent[validLang] || matchedFaq.textContent['zh-TW'];
      const audio = matchedFaq.audioScript[validLang] || matchedFaq.audioScript['zh-TW'] || text;
      const title = matchedFaq.title[validLang] || matchedFaq.title['zh-TW'];
      const latency = Date.now() - startTime;

      return {
        success: true,
        tier: '90%_knowledge_base',
        source: 'cached_knowledge_base',
        latency_ms: latency,
        cost_usd: 0.00,
        confidence: 1.0,
        data: {
          id: matchedFaq.id,
          action: matchedFaq.action,
          title,
          text,
          audioScript: audio,
          category: matchedFaq.category || 'general'
        }
      };
    }
  }

  // 2. If Query string is sent, search Knowledge Base first
  if (query && query.trim()) {
    const q = query.trim();

    // Check sensitive filters
    const isSensitive = SENSITIVE_KEYWORDS.some(kw => q.toLowerCase().includes(kw.toLowerCase()));
    if (isSensitive) {
      addPendingQuestion({
        query: q,
        lang: validLang,
        confidence: 0.1,
        reason: 'sensitive_topic_detected',
        status: 'pending'
      });

      return {
        success: true,
        tier: 'human_in_the_loop',
        source: 'hitl_flagged',
        latency_ms: Date.now() - startTime,
        cost_usd: 0.00,
        confidence: 0.1,
        data: {
          title: validLang === 'en' ? 'Review Needed' : '待廟方審核',
          text: POLITE_FALLBACK[validLang],
          audioScript: POLITE_FALLBACK[validLang],
          status: 'pending_review'
        }
      };
    }

    // Knowledge base matching
    let bestMatch = null;
    let highestScore = 0;

    for (const faq of combinedFaqs) {
      const titleMatch = calculateSimilarity(q, faq.title[validLang] || faq.title['zh-TW']);
      const textMatch = calculateSimilarity(q, faq.textContent[validLang] || faq.textContent['zh-TW']) * 0.7;
      const score = Math.max(titleMatch, textMatch);

      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    }

    // High confidence hit (> 0.65) -> return directly from knowledge base!
    if (bestMatch && highestScore >= 0.65) {
      const text = bestMatch.textContent[validLang] || bestMatch.textContent['zh-TW'];
      const audio = bestMatch.audioScript[validLang] || bestMatch.audioScript['zh-TW'] || text;
      const title = bestMatch.title[validLang] || bestMatch.title['zh-TW'];

      return {
        success: true,
        tier: '90%_knowledge_base',
        source: 'fuzzy_knowledge_match',
        latency_ms: Date.now() - startTime,
        cost_usd: 0.00,
        confidence: Math.min(1.0, highestScore + 0.15),
        data: {
          id: bestMatch.id,
          action: bestMatch.action,
          title,
          text,
          audioScript: audio,
          category: bestMatch.category
        }
      };
    }

    // 3. TIER 2: 10% Route - AI Reasoning / Complex Question
    // Built-in intelligent context-aware reasoning for temple visitors
    const aiAnswer = generateContextualAiResponse(q, validLang);

    if (aiAnswer.confidence < 0.5) {
      // Mark as pending question for Human-in-the-loop Flywheel
      addPendingQuestion({
        query: q,
        lang: validLang,
        confidence: aiAnswer.confidence,
        reason: 'low_confidence_general_query',
        suggestedAnswer: aiAnswer.text,
        status: 'pending'
      });
    }

    return {
      success: true,
      tier: '10%_ai_inference',
      source: 'gpt_realtime_mini_engine',
      latency_ms: Math.max(Date.now() - startTime, 180),
      cost_usd: 0.00004, // simulated fractional cent
      confidence: aiAnswer.confidence,
      data: {
        title: aiAnswer.title,
        text: aiAnswer.text,
        audioScript: aiAnswer.audioScript,
        status: aiAnswer.confidence < 0.5 ? 'pending_review' : 'answered'
      }
    };
  }

  // Default fallback if neither action nor query
  return {
    success: false,
    error: 'Missing action or query parameter',
    latency_ms: Date.now() - startTime
  };
}

/**
 * Contextual AI Answer Generator with temple domain knowledge
 */
function generateContextualAiResponse(query, lang) {
  const q = query.toLowerCase();

  // Route: Praying for studies / exams (文昌帝君)
  if (q.includes('文昌') || q.includes('考試') || q.includes('學業') || q.includes('exam') || q.includes('study') || q.includes('試験') || q.includes('합격')) {
    const textMap = {
      "zh-TW": "祈求學業進步與考試順利，請至後殿參拜「文昌帝君」。信眾常準備蔥（聰明）、芹菜（勤奮）、包子及粽子（包中）作為供品，並攜帶准考證影本在神案前稟告祈福。",
      "en": "For academic success and exam blessings, worship Emperor Wenchang in the Rear Hall. Visitors often offer scallions (cleverness), celery (diligence), and sticky rice dumplings ('Bao-zhong', meaning passing), bringing exam admission slips for blessings.",
      "ja": "学業成就や合格祈願は、後殿に祀られている「文昌帝君」へお参りください。ネギ（聡明）、セロリ（勤勉）、ちまき（合格の意味）などをお供えし、受験票のコピーを持参して祈願する習慣があります。",
      "ko": "학업 성취 및 시험 합격을 기원하시려면 후전의 '문창제군'께 참배하세요. 대만에서는 총명함을 뜻하는 파, 근면을 뜻하는 미나리, 합격을 상징하는 쫑즈(찰밥만두)를 공양하고 수험표 사본을 올려 기도합니다."
    };
    return {
      title: lang === 'en' ? 'Emperor Wenchang (Exams)' : '文昌帝君（求考運）',
      text: textMap[lang] || textMap['zh-TW'],
      audioScript: textMap[lang] || textMap['zh-TW'],
      confidence: 0.88
    };
  }

  // Route: Health & Medicine (華陀仙師)
  if (q.includes('健康') || q.includes('身體') || q.includes('生病') || q.includes('華陀') || q.includes('health') || q.includes('sick') || q.includes('病気') || q.includes('건강')) {
    const textMap = {
      "zh-TW": "祈求身體安康或家人早日康復，請至後殿參拜醫藥之神「華陀仙師」。雙手合十向仙師稟明患者姓名、生辰、居住地及病況，誠心祈求身心安泰。",
      "en": "For health, healing, and recovery of family members, worship Master Hua Tuo (the patron deity of medicine) in the Rear Hall. Press your palms together, clearly stating the patient's name, birthdate, address, and condition.",
      "ja": "無病息災や病気平癒のご祈願は、後殿の「華陀仙師（医道の祖神）」へ。合掌してご自身やご家族のお名前、生年月日、現在の病状を詳しく心の中で申し上げ、ご加護を祈りましょう。",
      "ko": "건강과 질병 쾌유를 비실 때는 후전의 의학의 신 '화타선생'께 참배하세요. 환자의 성함, 생년월일, 주소 및 병세를 상세히 아뢰며 평안과 회복을 기원하시면 됩니다."
    };
    return {
      title: lang === 'en' ? 'Master Hua Tuo (Health)' : '華陀仙師（求健康）',
      text: textMap[lang] || textMap['zh-TW'],
      audioScript: textMap[lang] || textMap['zh-TW'],
      confidence: 0.86
    };
  }

  // Route: Business & Wealth (關聖帝君)
  if (q.includes('財運') || q.includes('生意') || q.includes('工作') || q.includes('關公') || q.includes('career') || q.includes('wealth') || q.includes('商売') || q.includes('재물')) {
    const textMap = {
      "zh-TW": "求財運與事業順利，後殿供奉有「關聖帝君（關公）」。關聖帝君代表忠義、誠信，被商業界奉為武財神。參拜時請稟報公司行號、職稱與祈願內容，祈求誠信致富、步步高升。",
      "en": "For career growth, ethical business, and prosperity, worship Guan Sheng Di Jun (Guan Gong) in the Rear Hall. Venerated for integrity and loyalty, he is honored as a Martial God of Wealth by merchants.",
      "ja": "仕事運や商売繁盛、財運向上には、後殿の「関聖帝君（関羽公）」へお参りください。信義と忠誠の神であり、商人から武財神（商売の神）として広く崇敬されています。",
      "ko": "직장 운과 사업 번창, 재물운을 기원하실 때는 후전의 '관성제군(관우)'을 참배하세요. 신의와 정의의 상징으로 상인들에게는 '무재신(재물의 신)'으로 모셔집니다."
    };
    return {
      title: lang === 'en' ? 'Guan Gong (Career & Wealth)' : '關聖帝君（求財運事業）',
      text: textMap[lang] || textMap['zh-TW'],
      audioScript: textMap[lang] || textMap['zh-TW'],
      confidence: 0.85
    };
  }

  // Route: General polite temple response with slightly lower confidence
  const generalMap = {
    "zh-TW": "龍山寺是融合佛、道、民間信仰的國家古蹟，殿內神明眾多各司所職。您若有特別祈願，可依照「由右而左、由外而內」的順序參拜；雙手合十、心誠則靈。若有更詳盡的儀軌疑問，隨時歡迎詢問服務台值班人員。",
    "en": "Bangka Lungshan Temple harmoniously embraces Buddhist, Taoist, and folk traditions. Deities each oversee specific aspects of life. Sincere prayers with palms together are heard. For specific ceremonial requests, please consult our volunteers at the central counter.",
    "ja": "龍山寺は仏教・道教・民間信仰が調和した国家古跡です。すべての願いは真心の合掌に通じます。詳しい儀式やご祈祷のお手続きは、中央案内カウンターのスタッフへもお気軽にお尋ねください。",
    "ko": "롱산사는 불교와 도교, 민간 신앙이 조화를 이룬 역사 깊은 국가지정고적입니다. 두 손 모아 정성을 다하는 기도는 반드시 전해집니다. 상세한 의례 문의는 사찰 중앙 안내데스크에 문의하실 수 있습니다."
  };

  return {
    title: lang === 'en' ? 'Temple Guide Information' : '龍山寺導覽解答',
    text: generalMap[lang] || generalMap['zh-TW'],
    audioScript: generalMap[lang] || generalMap['zh-TW'],
    confidence: 0.48 // Under 0.5 triggers HITL recording
  };
}
