import React from 'react';
import { uiStrings } from '../i18n/translations';
import { BookOpen, Volume2, Landmark, Calendar, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { speechManager } from '../utils/tts';

export default function HistoryModal({ isOpen, onClose, currentLang, historyData, onPlayAudio }) {
  const strings = uiStrings[currentLang] || uiStrings['zh-TW'];
  if (!isOpen || !historyData) return null;

  const handlePlayHistory = () => {
    if (historyData.audioScript) {
      speechManager.speak(historyData.audioScript, currentLang, 1.0);
      if (onPlayAudio) {
        onPlayAudio({
          topic: historyData.title,
          script: historyData.audioScript,
          tier: '90%_knowledge_base',
          latency: 10
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-temple-parchment rounded-2xl shadow-2xl border-2 border-temple-gold overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-temple-charcoal px-5 py-4 text-white border-b border-temple-gold/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-temple-red border border-temple-gold flex items-center justify-center">
              <Landmark className="w-5 h-5 text-temple-gold" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-amber-50">
                {historyData.title}
              </h3>
              <p className="text-[11px] text-amber-200/80 font-sans">
                {historyData.era} • {historyData.heritage}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Audio Action Button */}
          <div className="p-3 bg-amber-50 border border-amber-300/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-amber-950 font-serif">
              <Volume2 className="w-4 h-4 text-temple-red" />
              <span>點擊聆聽歷史背景故事語音導覽</span>
            </div>
            <button
              onClick={handlePlayHistory}
              className="px-3 py-1.5 rounded-lg bg-temple-red hover:bg-temple-darkred text-white text-xs font-medium flex items-center space-x-1 shadow transition active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>播放導覽語音</span>
            </button>
          </div>

          {/* Main Narrative */}
          <div className="bg-white p-4 rounded-xl border border-temple-border shadow-xs text-sm text-zinc-800 leading-relaxed font-sans whitespace-pre-line">
            {historyData.summary}
          </div>

          {/* Highlights Grid */}
          <div>
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-temple-darkred mb-2">
              古蹟重點精華 (Key Highlights)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(historyData.highlights || []).map((h, i) => (
                <div key={i} className="p-3 bg-white rounded-lg border border-zinc-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-temple-gold block mb-0.5">
                    {h.label}
                  </span>
                  <span className="text-zinc-800 font-sans">
                    {h.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Spoken Script block */}
          {historyData.audioScript && (
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-600 space-y-1">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                語音文稿 (Spoken Guide Transcript)
              </span>
              <p className="italic text-zinc-700">
                "{historyData.audioScript}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
