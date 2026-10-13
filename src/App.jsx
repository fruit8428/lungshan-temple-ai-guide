import React, { useState, useEffect } from 'react';
import { detectBrowserLanguage, uiStrings, SUPPORTED_LANGUAGES } from './i18n/translations';
import Header from './components/Header';
import AudioPlayer from './components/AudioPlayer';
import QuickFaqButtons from './components/QuickFaqButtons';
import RouteTour from './components/RouteTour';
import HistoryModal from './components/HistoryModal';
import HitlAdminModal from './components/HitlAdminModal';
import ArchitectureInfoModal from './components/ArchitectureInfoModal';
import AiChatDrawer from './components/AiChatDrawer';
import PanoramaViewer from './components/PanoramaViewer';
import HotspotModal from './components/HotspotModal';
import { fetchHistory, fetchVisitingSteps, fetchFaqs, fetchHotspotGuide } from './utils/api';
import { speechManager } from './utils/tts';
import { Volume2, Sparkles, Sliders, ShieldCheck, Heart, Scroll, Compass, MapPin, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('zh-TW');
  const [autoDetected, setAutoDetected] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [visitingSteps, setVisitingSteps] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // 360 Panorama Hotspot state
  const [hotspotData, setHotspotData] = useState(null);
  const [isHotspotOpen, setIsHotspotOpen] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState(null);

  // Active audio player state
  const [activeAudio, setActiveAudio] = useState(null);

  // Modals state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isArchOpen, setIsArchOpen] = useState(false);
  const [isHitlOpen, setIsHitlOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // 1. Initial Language Auto-detection (Skill Guide Spec 1)
  useEffect(() => {
    const detected = detectBrowserLanguage();
    if (detected) {
      setCurrentLang(detected);
      setAutoDetected(true);
    }
  }, []);

  // 2. Fetch data whenever language changes
  const loadData = async (lang) => {
    try {
      const [hist, steps, faqList] = await Promise.all([
        fetchHistory(lang),
        fetchVisitingSteps(lang),
        fetchFaqs(lang)
      ]);
      if (hist) setHistoryData(hist);
      if (steps) setVisitingSteps(steps);
      if (faqList) setFaqs(faqList);

      if (activeHotspotId) {
        const guide = await fetchHotspotGuide(activeHotspotId, lang);
        if (guide) setHotspotData(guide);
      }
    } catch (err) {
      console.error('Failed to load localized content:', err);
    }
  };

  useEffect(() => {
    loadData(currentLang);
  }, [currentLang]);

  const handleHotspotTriggered = async (hotspotId = 'guanyin_hall') => {
    setActiveHotspotId(hotspotId);
    try {
      const guide = await fetchHotspotGuide(hotspotId, currentLang);
      if (guide) {
        setHotspotData(guide);
        setIsHotspotOpen(true);
        if (guide.audioScript) {
          speechManager.speak(guide.audioScript, currentLang, 1.0);
          handlePlayAudio({
            topic: guide.title,
            script: guide.audioScript,
            tier: '90%_knowledge_base',
            latency: 6
          });
        }
      }
    } catch (err) {
      console.error('Failed to trigger hotspot:', err);
    }
  };

  const handleSelectLanguage = (langCode) => {
    setCurrentLang(langCode);
    setAutoDetected(false);
    // If audio is playing in previous language, stop it
    speechManager.stop();
  };

  const handlePlayAudio = ({ topic, script, tier, latency }) => {
    setActiveAudio({
      topic,
      script,
      tier: tier || '90%_knowledge_base',
      latency: latency || 10
    });
  };

  const handlePlayOverview = () => {
    if (historyData && historyData.audioScript) {
      speechManager.speak(historyData.audioScript, currentLang, 1.0);
      handlePlayAudio({
        topic: historyData.title,
        script: historyData.audioScript,
        tier: '90%_knowledge_base',
        latency: 12
      });
    }
  };

  const strings = uiStrings[currentLang] || uiStrings['zh-TW'];

  return (
    <div className="min-h-screen bg-temple-parchment text-temple-stone flex flex-col font-sans selection:bg-temple-red selection:text-white">
      {/* Header */}
      <Header
        currentLang={currentLang}
        onSelectLang={handleSelectLanguage}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenArch={() => setIsArchOpen(true)}
        onOpenHitl={() => setIsHitlOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        isAudioActive={!!activeAudio}
        autoDetected={autoDetected}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full pb-28">
        {/* Hero Atmosphere Card */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-temple-charcoal via-temple-stone to-temple-darkred text-white p-6 sm:p-8 shadow-xl border-2 border-temple-gold/40 mb-8">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-60 h-60 bg-temple-red/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-60 h-60 bg-temple-gold/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-xs font-serif font-bold">
                艋舺香火 • 國定古蹟
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-mono">
                90% 快取 / 10% AI 雙層架構
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wide text-amber-50 mb-2 leading-tight">
              {strings.appTitle}
            </h1>

            <p className="text-sm sm:text-base text-zinc-200 font-sans max-w-2xl leading-relaxed mb-6">
              {currentLang === 'zh-TW' && "創建於 1738 年，供奉觀世音菩薩及百餘尊神明。本系統依據信眾手機語言自動配適，點擊按鈕即享零延遲語音解說；亦可向 AI 導覽員隨時提問。"}
              {currentLang === 'en' && "Founded in 1738, enshrining Guanyin Bodhisattva and over 100 deities. Automatically adapted to your language with zero-latency cached voice tours and interactive AI docent."}
              {currentLang === 'ja' && "1738年創建、観世音菩薩と100尊以上の神仏を祀る台北最古の名刹。スマートフォンの言語を自動判別し、ボタン一つで瞬時に多言語音声ガイドをお届けします。"}
              {currentLang === 'ko' && "1738년 창건되어 관세음보살과 100여 위의 신령을 모신 타이베이 대표 사찰입니다. 기기 언어를 자동 감지하여 지연 없이 즉시 음성 가이드를 제공합니다."}
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePlayOverview}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition active:scale-95"
              >
                <Volume2 className="w-4 h-4 fill-current" />
                <span>
                  {currentLang === 'zh-TW' && "聆聽全寺總覽導覽"}
                  {currentLang === 'en' && "Listen to Temple Overview"}
                  {currentLang === 'ja' && "寺院全景の解説を聞く"}
                  {currentLang === 'ko' && "사찰 전체 개요 듣기"}
                </span>
              </button>

              <button
                onClick={() => setIsHistoryOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm flex items-center space-x-2 transition"
              >
                <span>{strings.historyBtn}</span>
              </button>

              <button
                onClick={() => setIsAiChatOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-temple-red/80 hover:bg-temple-red border border-red-400/40 text-white font-medium text-xs sm:text-sm flex items-center space-x-1.5 transition ml-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{strings.askAiBtn}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 360 Panorama Tour (GoThru iframe with postMessage Hotspot Integration) */}
        <PanoramaViewer
          currentLang={currentLang}
          onHotspotTriggered={handleHotspotTriggered}
          activeHotspot={activeHotspotId}
        />

        {/* SECTION 1: 4 Core FAQ Buttons (90% Fast-tier Route as specified in Doc 1 & Doc 2) */}
        <QuickFaqButtons
          currentLang={currentLang}
          onPlayAudio={handlePlayAudio}
          activeFaqId={activeAudio?.topic}
        />

        {/* SECTION 2: 5-Step Visiting Sequence Route (Doc 2) */}
        <RouteTour
          currentLang={currentLang}
          steps={visitingSteps}
          onPlayAudio={handlePlayAudio}
        />

        {/* SECTION 3: AI Docent Interactive Callout Banner (10% Tier) */}
        <section className="my-8 p-6 rounded-2xl bg-gradient-to-r from-amber-950/10 via-amber-900/10 to-red-950/10 border-2 border-temple-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-temple-red flex items-center justify-center text-white shadow-lg shrink-0">
              <Sparkles className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-temple-stone">
                {strings.askAiTitle}
              </h3>
              <p className="text-xs text-zinc-600 font-sans mt-0.5 max-w-md">
                遇到特殊的祈願問題、神明由來或不知如何參拜？AI 導覽員隨時為您在線解答！
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiChatOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-temple-red hover:bg-temple-darkred text-white font-medium text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>立即開啟 AI 對話</span>
          </button>
        </section>

        {/* SECTION 4: Architecture & HITL Flywheel Badges info */}
        <section className="my-8 p-4 rounded-xl bg-white border border-temple-border shadow-xs text-xs text-zinc-600 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-zinc-800">
              系統運行規範符合 Skill.md 雙層分流標準
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsArchOpen(true)}
              className="text-blue-700 hover:underline flex items-center space-x-1"
            >
              <span>檢視架構說明</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <span>•</span>
            <button
              onClick={() => setIsHitlOpen(true)}
              className="text-amber-800 hover:underline flex items-center space-x-1"
            >
              <span>開啟 n8n 飛輪後台</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </section>
      </main>

      {/* Persistent Audio Player Bar */}
      {activeAudio && (
        <AudioPlayer
          currentTopic={activeAudio.topic}
          currentScript={activeAudio.script}
          tier={activeAudio.tier}
          latency={activeAudio.latency}
          currentLang={currentLang}
          onClose={() => setActiveAudio(null)}
        />
      )}

      {/* Modals & Drawers */}
      <HotspotModal
        isOpen={isHotspotOpen}
        onClose={() => setIsHotspotOpen(false)}
        currentLang={currentLang}
        hotspotData={hotspotData}
        onPlayAudio={handlePlayAudio}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        currentLang={currentLang}
        historyData={historyData}
        onPlayAudio={handlePlayAudio}
      />

      <ArchitectureInfoModal
        isOpen={isArchOpen}
        onClose={() => setIsArchOpen(false)}
      />

      <HitlAdminModal
        isOpen={isHitlOpen}
        onClose={() => setIsHitlOpen(false)}
        currentLang={currentLang}
        onFaqUpdated={() => loadData(currentLang)}
      />

      <AiChatDrawer
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        currentLang={currentLang}
        onPlayAudio={handlePlayAudio}
      />

      {/* Footer */}
      <footer className="bg-temple-charcoal text-zinc-400 py-6 border-t border-temple-gold/20 text-xs">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-serif text-amber-200 font-semibold">
              國定古蹟 艋舺龍山寺 (Bangka Lungshan Temple)
            </p>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              地址：台北市萬華區廣州街 211 號 • 開放時間：每日 06:00 - 22:00
            </p>
          </div>
          <div className="text-[11px] text-zinc-500 font-mono">
            RAG + Human-in-the-Loop AI Tour Guide
          </div>
        </div>
      </footer>
    </div>
  );
}
