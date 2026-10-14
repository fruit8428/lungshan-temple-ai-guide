import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Gauge, Sparkles, CheckCircle2 } from 'lucide-react';
import { speechManager } from '../utils/tts';

export default function AudioPlayer({
  currentTopic,
  currentScript,
  tier = '90%_knowledge_base',
  currentLang = 'zh-TW',
  onClose
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [progress, setProgress] = useState(0);
  const [activeSentence, setActiveSentence] = useState('');

  useEffect(() => {
    const unsubscribe = speechManager.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsPaused(state.isPaused);
      setRate(state.rate);
      setProgress(state.progress || 0);
      setActiveSentence(state.activeSentence || '');
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying && !isPaused) {
      speechManager.pause();
    } else if (isPaused) {
      speechManager.resume();
    } else if (currentScript) {
      speechManager.speak(currentScript, currentLang, rate);
    }
  };

  const handleStop = () => {
    speechManager.stop();
  };

  const handleCycleRate = () => {
    const rates = [1.0, 1.2, 0.85];
    const nextIdx = (rates.indexOf(rate) + 1) % rates.length;
    speechManager.setRate(rates[nextIdx]);
  };

  if (!currentScript && !isPlaying) {
    return null;
  }

  const isAi = tier === '10%_ai_inference';

  return (
    <div className="fixed bottom-3 left-3 right-3 md:left-auto md:right-6 md:w-[480px] z-50 animate-bounce-in">
      <div className="bg-temple-charcoal/95 border-2 border-temple-gold/70 rounded-2xl shadow-2xl backdrop-blur-md p-3.5 text-white overflow-hidden relative">
        {/* Progress bar at very top of player */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-temple-red via-amber-500 to-temple-gold transition-all duration-300"
            style={{ width: `${isPlaying ? Math.max(8, progress) : 0}%` }}
          />
        </div>

        {/* Top Info Bar */}
        <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-800">
          <div className="flex items-center space-x-2 truncate pr-2">
            <span className="flex h-2 w-2 relative shrink-0">
              {isPlaying && !isPaused && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-temple-gold opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isPlaying ? 'bg-amber-400' : 'bg-zinc-500'
                }`}
              ></span>
            </span>
            <span className="font-serif font-semibold text-amber-200 truncate">
              {currentTopic || '語音導覽解說'}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {isAi ? (
              <span className="px-2 py-0.5 rounded-full bg-blue-900/60 border border-blue-400/40 text-[10px] text-blue-300 font-mono flex items-center space-x-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>10% AI 推論</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/40 text-[10px] text-emerald-300 font-mono flex items-center space-x-1">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>90% 快取 (&lt;0.5s)</span>
              </span>
            )}

            <button
              onClick={() => {
                handleStop();
                if (onClose) onClose();
              }}
              className="text-zinc-400 hover:text-zinc-200 text-xs px-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Player Controls & Waveform */}
        <div className="pt-2.5 flex items-center justify-between gap-3">
          <button
            onClick={handleTogglePlay}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-temple-red to-amber-600 hover:from-red-600 hover:to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-900/40 transition active:scale-90 shrink-0"
            title={isPlaying && !isPaused ? '暫停' : '播放'}
          >
            {isPlaying && !isPaused ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Sound Wave Animation */}
          <div className="flex-1 flex items-center justify-center space-x-1 h-8 bg-zinc-900/80 rounded-lg px-3 border border-zinc-800">
            {[40, 75, 55, 95, 30, 80, 60, 100, 45, 85, 35, 70].map(
              (height, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying && !isPaused
                      ? 'bg-temple-gold animate-pulse'
                      : 'bg-zinc-700'
                  }`}
                  style={{
                    height:
                      isPlaying && !isPaused
                        ? `${Math.max(20, height * 0.28)}px`
                        : '4px',
                    animationDelay: `${(i % 5) * 120}ms`
                  }}
                />
              )
            )}
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={handleCycleRate}
              className="px-2 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[11px] font-mono text-amber-200 flex items-center space-x-1"
              title="調整語速"
            >
              <Gauge className="w-3 h-3 text-zinc-400" />
              <span>{rate}x</span>
            </button>

            <button
              onClick={handleStop}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-zinc-200"
              title="停止播放"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Subtitle Preview */}
        {(activeSentence || currentScript) && (
          <p className="mt-2 text-[11px] text-amber-100/90 line-clamp-2 italic bg-zinc-900/70 p-2 rounded-lg border border-zinc-800/80 font-sans">
            "{isPlaying && activeSentence ? activeSentence : currentScript}"
          </p>
        )}
      </div>
    </div>
  );
}
