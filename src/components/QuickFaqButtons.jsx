import React, { useState } from 'react';
import { uiStrings } from '../i18n/translations';
import { Clock, Flame, Heart, Scroll, Volume2, Sparkles, Zap, Check, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { fetchRoute } from '../utils/api';
import { speechManager } from '../utils/tts';

export default function QuickFaqButtons({ currentLang, onPlayAudio, activeFaqId, faqs = [] }) {
  const strings = uiStrings[currentLang] || uiStrings['zh-TW'];
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const [copied, setCopied] = useState(false);

  // Core 4 Action Items as explicitly defined in Document 1 & 2
  const coreActions = [
    {
      id: "opening_hours_traffic",
      action: "guide_opening_hours",
      icon: Clock,
      color: "from-amber-600/20 to-amber-700/30 border-amber-600/40 text-amber-900",
      accent: "bg-amber-600",
      tag: currentLang === 'en' ? 'Hours & Transit' : (currentLang === 'ja' ? '開門・交通' : (currentLang === 'ko' ? '운영·교통' : '開放與交通')),
      title: {
        'zh-TW': '開放時間與交通方式',
        'en': 'Opening Hours & Transit',
        'ja': '開門時間とアクセス方法',
        'ko': '운영 시간 및 찾아오는 길'
      },
      preview: {
        'zh-TW': '每日 06:00 - 22:00 • 捷運龍山寺站 1 號出口步行 1 分鐘',
        'en': 'Daily 06:00 - 22:00 • MRT Longshan Station Exit 1 (1 min)',
        'ja': '毎日 06:00〜22:00 • MRT龍山寺駅1番出口より徒歩1分',
        'ko': '매일 06:00 - 22:00 • MRT 롱산사역 1번 출구 도보 1분'
      }
    },
    {
      id: "incense_rules",
      action: "guide_incense_rules",
      icon: Flame,
      color: "from-emerald-600/20 to-emerald-700/30 border-emerald-600/40 text-emerald-900",
      accent: "bg-emerald-600",
      tag: currentLang === 'en' ? 'Eco Rules' : (currentLang === 'ja' ? '環境参拝' : (currentLang === 'ko' ? '친환경' : '香火規範')),
      title: {
        'zh-TW': '來拜拜需要自己準備香嗎？',
        'en': 'Do I need to bring my own incense?',
        'ja': 'お参りに線香の持参は必要ですか？',
        'ko': '참배할 때 향을 직접 준비해야 하나요?'
      },
      preview: {
        'zh-TW': '全面停香 • 雙手合十誠心即可 • 求月老可備甜食喜糖',
        'en': 'No incense needed • Palms joined sincerely • Sweets for Yue Lao',
        'ja': '持参不要 • 2020年より全面停香 • 合掌のみでお参り',
        'ko': '향 지참 불필요 • 2020년부터 향 전면 중단 • 합장 참배'
      }
    },
    {
      id: "yue_lao_guide",
      action: "guide_yue_lao",
      icon: Heart,
      color: "from-rose-600/20 to-rose-700/30 border-rose-600/40 text-rose-900",
      accent: "bg-rose-600",
      tag: currentLang === 'en' ? 'Love & Matchmaking' : (currentLang === 'ja' ? '良縁・縁結び' : (currentLang === 'ko' ? '인연·월하노인' : '月老良緣')),
      title: {
        'zh-TW': '月老怎麼拜？紅線怎麼求？',
        'en': 'How to worship Yue Lao & get the Red String?',
        'ja': '月下老人の参拝方法と赤い糸の授かり方は？',
        'ko': '월하노인 참배 방법과 붉은 실 받는 법은?'
      },
      preview: {
        'zh-TW': '先拜全寺神明 • 向月老稟明條件 • 連續三聖筊獲紅線',
        'en': 'Worship all deities first • State ideal traits • 3 Sheng-Jiao',
        'ja': '全神仏を参拝後に月老へ • 3回連続聖筊で赤い糸を授与',
        'ko': '전체 참배 후 월하노인전 이동 • 이상형 고하고 3연속 성교'
      }
    },
    {
      id: "draw_fortune",
      action: "guide_draw_fortune",
      icon: Scroll,
      color: "from-indigo-600/20 to-indigo-700/30 border-indigo-600/40 text-indigo-900",
      accent: "bg-indigo-600",
      tag: currentLang === 'en' ? 'Poem & Divination' : (currentLang === 'ja' ? 'おみくじ・解籤' : (currentLang === 'ko' ? '점괘·해설' : '求籤解籤')),
      title: {
        'zh-TW': '如何求籤與解籤？',
        'en': 'How to draw & interpret fortune poetry?',
        'ja': 'おみくじ（求籤）の引き方と解籤の手順は？',
        'ko': '점괘(시구) 뽑는 법과 해설 받는 법은?'
      },
      preview: {
        'zh-TW': '擲筊請示求籤 • 三聖筊定籤 • 10:00-19:00 專人解籤服務',
        'en': 'Cast moon blocks • 3 Sheng-Jiao confirm • Interpretation service',
        'ja': '神託を仰ぎ籤筒より引く • 3連続聖筊で確定 • 専属解説員あり',
        'ko': '나무패로 허락 받기 • 3회 연속 성교 확인 • 전담 해설사 상주'
      }
    }
  ];

  const handleActionClick = async (actionItem) => {
    setLoadingAction(actionItem.action);
    try {
      // 1. Send Payload code strictly as specified in Document 1:
      // {"action": "guide_draw_fortune", "lang": "ja"}
      const payload = {
        action: actionItem.action,
        lang: currentLang
      };
      
      const response = await fetchRoute(payload);

      if (response && response.success) {
        setSelectedFaq({
          ...response.data,
          tier: response.tier,
          latency_ms: response.latency_ms,
          source: response.source
        });

        // Trigger Audio Playback via TTS or audioScript
        if (response.data.audioScript) {
          speechManager.speak(response.data.audioScript, currentLang, 1.0);
          if (onPlayAudio) {
            onPlayAudio({
              topic: response.data.title,
              script: response.data.audioScript,
              tier: response.tier,
              latency: response.latency_ms
            });
          }
        }
      }
    } catch (err) {
      console.error('Failed to trigger payload action:', err);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCopyText = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="my-6">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-temple-red rounded-full"></span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-temple-stone">
              {strings.quickFaqTitle}
            </h2>
          </div>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            {strings.quickFaqSubtitle}
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-mono">
          <Zap className="w-3 h-3 text-emerald-600" />
          <span>&lt;0.5s 響應</span>
        </span>
      </div>

      {/* 4 Quick Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {coreActions.map((item, idx) => {
          const Icon = item.icon;
          const dynamicFaq = Array.isArray(faqs) ? (faqs.find(f => f.action === item.action) || faqs[idx]) : null;
          const displayTitle = dynamicFaq?.title || item.title[currentLang] || item.title['zh-TW'];
          const displayPreview = dynamicFaq?.shortDesc || item.preview[currentLang] || item.preview['zh-TW'];
          const isCurrentActive = selectedFaq && selectedFaq.action === item.action;
          const isLoading = loadingAction === item.action;

          return (
            <button
              key={item.id}
              onClick={() => handleActionClick(item)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden group shadow-sm hover:shadow-md active:scale-[0.99] ${
                isCurrentActive
                  ? 'bg-amber-50/90 border-temple-red ring-2 ring-temple-red/30'
                  : 'bg-white/95 border-temple-border hover:border-temple-gold'
              }`}
            >
              {/* Top Accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${item.accent}`}></div>

              <div className="flex items-start space-x-3.5">
                {/* Icon badge */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 border mt-0.5 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5 text-temple-darkred" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-sans">
                      🔘 {currentLang === 'zh-TW' ? `常見問題 ${idx + 1}` : `FAQ ${idx + 1}`}
                    </span>
                    <span className="text-[11px] text-temple-gold flex items-center space-x-1 font-mono">
                      <Volume2 className="w-3.5 h-3.5 text-temple-red shrink-0" />
                      <span className="hidden xs:inline">TTS</span>
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm sm:text-base text-temple-stone leading-snug group-hover:text-temple-red transition-colors">
                    【{displayTitle}】
                  </h3>

                  <p className="text-xs text-zinc-600 mt-1 line-clamp-1">
                    {displayPreview}
                  </p>
                </div>
              </div>

              {/* Status footer pill */}
              <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span className="text-emerald-700 flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-emerald-500" />
                  <span>Payload: {item.action}</span>
                </span>
                <span className="text-temple-red font-medium group-hover:translate-x-0.5 transition-transform">
                  {isLoading ? '載入中...' : '點擊聆聽導覽 →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Active FAQ Details Card */}
      {selectedFaq && (
        <div className="mt-4 p-5 bg-white border-2 border-temple-gold/60 rounded-2xl shadow-xl animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl pointer-events-none"></div>

          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-200">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                ⚡ 90% 知識庫快取命中（延遲 {selectedFaq.latency_ms || 12}ms • $0.00 成本）
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => speechManager.speak(selectedFaq.audioScript, currentLang, 1.0)}
                className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-medium flex items-center space-x-1 transition"
                title="重新播放語音"
              >
                <Volume2 className="w-3.5 h-3.5 text-temple-red" />
                <span>重播語音</span>
              </button>

              <button
                onClick={() => handleCopyText(selectedFaq.text)}
                className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-xs font-medium flex items-center space-x-1 transition"
                title="複製解說文字"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? strings.copied : strings.copy}</span>
              </button>

              <button
                onClick={() => setSelectedFaq(null)}
                className="text-zinc-400 hover:text-zinc-600 text-sm px-1.5 py-0.5"
                title="收合"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif font-black text-lg text-temple-darkred mt-3 mb-2 flex items-center space-x-2">
            <span>【{selectedFaq.title}】</span>
          </h3>

          {/* Main Text Content */}
          <div className="text-sm text-zinc-800 leading-relaxed font-sans whitespace-pre-line bg-amber-50/40 p-4 rounded-xl border border-amber-200/50">
            {selectedFaq.text}
          </div>

          {/* Voice Script Note */}
          {selectedFaq.audioScript && (
            <div className="mt-3 p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 flex items-start space-x-2">
              <span className="px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-700 font-mono text-[10px] font-semibold shrink-0">
                語音腳本 (TTS)
              </span>
              <p className="italic leading-normal text-zinc-700">
                "{selectedFaq.audioScript}"
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
