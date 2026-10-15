import React from 'react';
import { Volume2, MapPin, X } from 'lucide-react';
import { speechManager } from '../utils/tts';
import { getAllHotspotsSummary } from '../core/semanticEngine';

export default function HotspotModal({
  isOpen,
  onClose,
  currentLang,
  hotspotData,
  onPlayAudio,
  onSwitchHotspot
}) {
  if (!isOpen || !hotspotData) return null;

  const hotspotSummaries = hotspotData.allHotspots || getAllHotspotsSummary(currentLang);

  const handlePlayVoice = () => {
    if (hotspotData.audioScript) {
      speechManager.speak(hotspotData.audioScript, currentLang, 1.0);
      if (onPlayAudio) {
        onPlayAudio({
          topic: hotspotData.title,
          script: hotspotData.audioScript,
          tier: '90%_knowledge_base',
          latency: 4
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-temple-parchment rounded-3xl shadow-2xl border-2 border-temple-gold overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-temple-charcoal via-temple-stone to-temple-darkred px-5 py-4 text-white border-b border-temple-gold/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-temple-red border border-temple-gold flex items-center justify-center shadow-md shrink-0">
              <span className="text-2xl">{hotspotData.icon || '🦁'}</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono">
                  {hotspotData.badge || '360° 實景熱點連動'}
                </span>
                <span className="text-[11px] text-amber-300/90 font-sans">
                  {hotspotData.subtitle}
                </span>
              </div>
              <h3 className="font-serif font-black text-lg sm:text-xl text-amber-50 mt-0.5">
                {hotspotData.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Hotspot Switcher Tabs */}
        {onSwitchHotspot && (
          <div className="bg-zinc-900/95 px-4 py-2 border-b border-temple-gold/20 flex items-center space-x-2 overflow-x-auto scrollbar-none">
            {hotspotSummaries.map((spot) => {
              const isCurrent = hotspotData.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => onSwitchHotspot(spot.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-serif whitespace-nowrap flex items-center space-x-1.5 transition ${
                    isCurrent
                      ? 'bg-temple-red text-amber-100 font-bold border border-temple-gold'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                  }`}
                >
                  <span>{spot.icon}</span>
                  <span>{spot.title}</span>
                </button>
              );
            })}
          </div>
        )}

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
                  {currentLang === 'zh-TW' && `聆聽「${hotspotData.title}」語音解說`}
                  {currentLang === 'en' && `Listen: ${hotspotData.title}`}
                  {currentLang === 'ja' && `「${hotspotData.title}」音声ガイドを再生`}
                  {currentLang === 'ko' && `'${hotspotData.title}' 음성 가이드 듣기`}
                </p>
                <p className="text-xs text-zinc-600 font-sans">
                  {currentLang === 'zh-TW' && '已依據您的語系自動配適自然語音'}
                  {currentLang === 'en' && 'Adapted to your selected language'}
                  {currentLang === 'ja' && '選択された言語で音声案内いたします'}
                  {currentLang === 'ko' && '선택하신 언어로 음성 안내가 제공됩니다'}
                </p>
              </div>
            </div>

            <button
              onClick={handlePlayVoice}
              className="px-4 py-2 rounded-xl bg-temple-red hover:bg-temple-darkred text-white text-xs font-serif font-bold flex items-center space-x-1.5 shadow-md transition active:scale-95 shrink-0"
            >
              <Volume2 className="w-4 h-4 fill-current" />
              <span>
                {currentLang === 'zh-TW' && '播放語音導覽'}
                {currentLang === 'en' && 'Play Audio Guide'}
                {currentLang === 'ja' && '音声を再生'}
                {currentLang === 'ko' && '음성 재생'}
              </span>
            </button>
          </div>

          {/* Location badge */}
          {hotspotData.location && (
            <div className="flex items-center space-x-1.5 text-xs text-zinc-600 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 w-fit">
              <MapPin className="w-3.5 h-3.5 text-temple-red" />
              <span className="font-medium">
                {currentLang === 'zh-TW' ? '實景位置：' : 'Location: '}
                {hotspotData.location}
              </span>
            </div>
          )}

          {/* Main Description */}
          <div className="bg-white p-4 rounded-2xl border border-temple-border shadow-xs text-sm text-zinc-800 leading-relaxed font-sans whitespace-pre-line">
            {hotspotData.textContent}
          </div>

          {/* Dynamic Comparison Card (e.g. Male vs Female Stone Lion) */}
          {hotspotData.comparison && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200">
                <span className="font-serif font-bold text-temple-darkred block mb-1">
                  {hotspotData.comparison.leftTitle}
                </span>
                <p className="text-zinc-700 leading-normal">
                  {hotspotData.comparison.leftDesc}
                </p>
              </div>

              <div className="p-3.5 bg-rose-50/80 rounded-xl border border-rose-200">
                <span className="font-serif font-bold text-temple-darkred block mb-1">
                  {hotspotData.comparison.rightTitle}
                </span>
                <p className="text-zinc-700 leading-normal">
                  {hotspotData.comparison.rightDesc}
                </p>
              </div>
            </div>
          )}

          {/* Transcript block */}
          {hotspotData.audioScript && (
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 space-y-1">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                語音導覽文稿 (Spoken Audio Script)
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
