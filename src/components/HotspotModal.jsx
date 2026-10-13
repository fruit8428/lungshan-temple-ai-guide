import React from 'react';
import { uiStrings } from '../i18n/translations';
import { Volume2, Sparkles, MapPin, CheckCircle2, X, Compass, ExternalLink } from 'lucide-react';
import { speechManager } from '../utils/tts';

export default function HotspotModal({ 
  isOpen, 
  onClose, 
  currentLang, 
  hotspotData, 
  onPlayAudio 
}) {
  const strings = uiStrings[currentLang] || uiStrings['zh-TW'];
  if (!isOpen || !hotspotData) return null;

  const handlePlayVoice = () => {
    if (hotspotData.audioScript) {
      speechManager.speak(hotspotData.audioScript, currentLang, 1.0);
      if (onPlayAudio) {
        onPlayAudio({
          topic: hotspotData.title,
          script: hotspotData.audioScript,
          tier: '90%_knowledge_base',
          latency: 6
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-temple-parchment rounded-3xl shadow-2xl border-2 border-temple-gold overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with traditional temple gradient */}
        <div className="bg-gradient-to-r from-temple-charcoal via-temple-stone to-temple-darkred px-5 py-4 text-white border-b border-temple-gold/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-temple-red border border-temple-gold flex items-center justify-center shadow-md shrink-0">
              <span className="text-xl">🦁</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono">
                  360° postMessage 連動成功
                </span>
                <span className="text-xs text-amber-300 font-mono">
                  ID: {hotspotData.id || 'guanyin_hall'}
                </span>
              </div>
              <h3 className="font-serif font-black text-lg text-amber-50 mt-0.5">
                {hotspotData.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Audio Playback Hero Banner */}
          <div className="p-4 bg-gradient-to-r from-amber-100 via-amber-50 to-orange-50 border-2 border-amber-300/80 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-temple-red text-white flex items-center justify-center shadow">
                <Volume2 className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-temple-darkred">
                  {currentLang === 'zh-TW' && "點擊聆聽「青斗石獅」專屬多語系導覽"}
                  {currentLang === 'en' && "Listen to Stone Lions Multilingual Audio Guide"}
                  {currentLang === 'ja' && "青斗石獅子の多言語音声ガイドを再生"}
                  {currentLang === 'ko' && "청두 석사자 다국어 음성 가이드 듣기"}
                </p>
                <p className="text-xs text-zinc-600 font-sans">
                  {currentLang === 'zh-TW' && "已依據您的語系自動載入對應發音"}
                  {currentLang === 'en' && "Automatically adapted to your language voice"}
                  {currentLang === 'ja' && "ご選択の言語に合わせて音声案内が流れます"}
                  {currentLang === 'ko' && "현재 설정된 언어의 음성으로 자동 안내됩니다"}
                </p>
              </div>
            </div>

            <button
              onClick={handlePlayVoice}
              className="px-4 py-2 rounded-xl bg-temple-red hover:bg-temple-darkred text-white text-xs font-serif font-bold flex items-center space-x-1.5 shadow-md transition active:scale-95 shrink-0"
            >
              <Volume2 className="w-4 h-4 fill-current" />
              <span>
                {currentLang === 'zh-TW' && "播放語音導覽"}
                {currentLang === 'en' && "Play Audio Guide"}
                {currentLang === 'ja' && "音声を再生"}
                {currentLang === 'ko' && "음성 재생"}
              </span>
            </button>
          </div>

          {/* Location badge */}
          {hotspotData.location && (
            <div className="flex items-center space-x-1.5 text-xs text-zinc-600 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 w-fit">
              <MapPin className="w-3.5 h-3.5 text-temple-red" />
              <span className="font-medium">
                {currentLang === 'zh-TW' ? "實景位置：" : "Location: "} {hotspotData.location}
              </span>
            </div>
          )}

          {/* Main Description */}
          <div className="bg-white p-4 rounded-2xl border border-temple-border shadow-xs text-sm text-zinc-800 leading-relaxed font-sans whitespace-pre-line">
            {hotspotData.textContent}
          </div>

          {/* Highlights Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200">
              <span className="font-serif font-bold text-temple-darkred block mb-1">
                🦁 右側雄獅（公獅）
              </span>
              <p className="text-zinc-700 leading-normal">
                {currentLang === 'zh-TW' && "張口咆哮、腳踩繡球與彩帶。象徵開口迎財納祥、威震四方辟除穢氣。"}
                {currentLang === 'en' && "Open mouth with embroidered ball. Symbolizes welcoming wealth, authority and clearing bad omens."}
                {currentLang === 'ja' && "口を開けて球を踏み、招福・開運・邪気払いの威厳を示します。"}
                {currentLang === 'ko' && "입을 크게 벌리고 구슬을 굴리며 복과 재물을 맞이하고 액운을 물리칩니다."}
              </p>
            </div>

            <div className="p-3.5 bg-rose-50/70 rounded-xl border border-rose-200">
              <span className="font-serif font-bold text-temple-darkred block mb-1">
                🦁 左側雌獅（母獅）
              </span>
              <p className="text-zinc-700 leading-normal">
                {currentLang === 'zh-TW' && "閉口溫柔、爪下懷抱逗弄幼獅。象徵慈悲守護、子孫繁衍、世代平安。"}
                {currentLang === 'en' && "Closed mouth gently holding cub. Symbolizes maternal love, family longevity and harmony."}
                {currentLang === 'ja' && "口を優しく結び、子獅子を抱いて慈悲と一族の繁栄を見守ります。"}
                {currentLang === 'ko' && "입을 다물고 새끼를 보듬어 자애로운 사랑과 집안의 번영을 기원합니다."}
              </p>
            </div>
          </div>

          {/* Transcript block */}
          {hotspotData.audioScript && (
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 space-y-1">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                語音文稿 (Spoken Transcript)
              </span>
              <p className="italic text-zinc-700 font-sans">
                "{hotspotData.audioScript}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
