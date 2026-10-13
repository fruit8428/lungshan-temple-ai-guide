import React, { useState } from 'react';
import { uiStrings } from '../i18n/translations';
import { MapPin, Volume2, ShieldCheck, ArrowRight, CheckCircle, Navigation } from 'lucide-react';
import { speechManager } from '../utils/tts';

export default function RouteTour({ currentLang, steps = [], onPlayAudio }) {
  const strings = uiStrings[currentLang] || uiStrings['zh-TW'];
  const [activeStep, setActiveStep] = useState(1);

  const handleStepPlay = (item) => {
    setActiveStep(item.step);
    if (item.audioScript) {
      speechManager.speak(item.audioScript, currentLang, 1.0);
      if (onPlayAudio) {
        onPlayAudio({
          topic: `步驟 ${item.step}：${item.name}`,
          script: item.audioScript,
          tier: '90%_knowledge_base',
          latency: 8
        });
      }
    }
  };

  return (
    <section className="my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-temple-gold rounded-full"></span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-temple-stone">
              {strings.visitingRouteTitle}
            </h2>
          </div>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            {strings.visitingRouteSubtitle}
          </p>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-temple-red font-serif font-medium bg-red-50 border border-red-200 px-2 py-1 rounded-lg">
          <Navigation className="w-3.5 h-3.5" />
          <span>龍門進 • 虎門出</span>
        </div>
      </div>

      {/* Step Pills Navigation Bar */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
        {steps.map((item) => {
          const isSelected = activeStep === item.step;
          return (
            <button
              key={item.step}
              onClick={() => handleStepPlay(item)}
              className={`px-3 py-1.5 rounded-full text-xs font-serif whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-temple-red text-white shadow-md font-bold ring-2 ring-red-300'
                  : 'bg-white border border-temple-border text-zinc-700 hover:bg-amber-50'
              }`}
            >
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-sans ${
                isSelected ? 'bg-temple-gold text-zinc-950 font-bold' : 'bg-zinc-200 text-zinc-600'
              }`}>
                {item.step}
              </span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Step Details Cards */}
      <div className="space-y-3">
        {steps.map((item) => {
          const isSelected = activeStep === item.step;

          return (
            <div
              key={item.step}
              onClick={() => handleStepPlay(item)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-50/90 via-white to-amber-50/50 border-temple-red/60 shadow-md ring-1 ring-temple-red/20'
                  : 'bg-white/90 border-temple-border hover:border-temple-gold/60 shadow-sm'
              }`}
            >
              {/* Step indicator tag */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif font-black text-sm shrink-0 shadow-sm ${
                    isSelected
                      ? 'bg-temple-red text-amber-100 ring-2 ring-temple-gold'
                      : 'bg-zinc-100 text-zinc-700 border border-zinc-300'
                  }`}>
                    {item.step}
                  </div>

                  <div>
                    <div className="flex items-center flex-wrap gap-1.5 mb-1">
                      <span className="font-serif font-bold text-base text-temple-stone">
                        {item.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-temple-red" />
                        <span>{item.location}</span>
                      </span>
                    </div>

                    <p className="text-xs text-amber-900/80 font-medium bg-amber-100/60 inline-block px-2 py-0.5 rounded border border-amber-200/50 mb-1.5">
                      ⚠️ {item.rule}
                    </p>

                    <p className="text-xs text-zinc-700 leading-relaxed font-sans mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Audio Play Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStepPlay(item);
                  }}
                  className={`p-2.5 rounded-xl transition flex items-center space-x-1 text-xs font-medium shrink-0 ${
                    isSelected
                      ? 'bg-temple-red text-white hover:bg-temple-darkred shadow'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                  title="聆聽此步驟導覽"
                >
                  <Volume2 className="w-4 h-4 text-temple-gold" />
                  <span className="hidden sm:inline">播報</span>
                </button>
              </div>

              {/* Spoken TTS Script Preview if active */}
              {isSelected && item.audioScript && (
                <div className="mt-3 pt-2.5 border-t border-amber-200/50 flex items-start space-x-2 text-[11px] text-zinc-600 font-sans italic bg-amber-100/30 p-2.5 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-temple-red font-mono shrink-0">
                    [語音內容]
                  </span>
                  <span>"{item.audioScript}"</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
