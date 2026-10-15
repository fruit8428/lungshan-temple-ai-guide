import React from 'react';
import { SUPPORTED_LANGUAGES, uiStrings } from '../i18n/translations';
import { Globe, BookOpen, Cpu, Sliders, Sparkles, Volume2 } from 'lucide-react';

export default function Header({ 
  currentLang, 
  onSelectLang, 
  onOpenHistory, 
  onOpenArch, 
  onOpenHitl, 
  onOpenAiChat,
  isAudioActive,
  autoDetected,
  templeName,
  templeBadge
}) {
  const strings = uiStrings[currentLang] || uiStrings['zh-TW'];
  const displayTitle = templeName || strings.appTitle;
  const emblemChar = displayTitle.includes('賀聖') ? '賀' : displayTitle.includes('龍山') ? '龍' : displayTitle.charAt(0);

  return (
    <header className="sticky top-0 z-40 bg-temple-charcoal/95 backdrop-blur-md border-b border-temple-gold/20 shadow-lg text-white">
      {/* Top micro banner */}
      <div className="bg-temple-darkred/90 px-3 py-1 text-[11px] flex justify-between items-center text-amber-100 border-b border-temple-gold/30">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-temple-gold animate-pulse"></span>
          <span className="font-medium tracking-wide">
            {templeBadge || (
              <>
                {currentLang === 'zh-TW' && "文化部指定國定古蹟 • 創建於清乾隆三年 (1738)"}
                {currentLang === 'en' && "National Historic Monument • Founded in 1738"}
                {currentLang === 'ja' && "中華民国国定古跡 • 1738年創建の名刹"}
                {currentLang === 'ko' && "대만 국가지정고적 • 1738년 창건된 유서 깊은 사찰"}
              </>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          {autoDetected && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-amber-900/60 border border-amber-500/40 text-[10px] text-amber-200">
              🌐 Auto-Detected
            </span>
          )}
          <span className="text-amber-200/80 font-mono text-[10px]">
            Supabase Cloud + RAG
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Emblem */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-temple-red to-temple-darkred border border-temple-gold flex items-center justify-center shadow-md">
            <span className="text-temple-gold font-serif font-black text-xl">{emblemChar}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg md:text-xl font-serif font-bold text-amber-50 tracking-wider">
                {displayTitle}
              </h1>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 font-medium">
                AI 導覽
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 font-sans tracking-tight">
              {strings.appSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls & Language Switcher */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Language Switcher Buttons */}
          <div className="flex items-center bg-zinc-800/90 rounded-lg p-0.5 border border-zinc-700">
            <Globe className="w-3.5 h-3.5 text-zinc-400 ml-1.5 mr-1" />
            <div className="flex space-x-0.5">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLang(lang.code)}
                  className={`px-2 py-1 text-xs rounded font-medium transition-all flex items-center space-x-1 ${
                    currentLang === lang.code
                      ? 'bg-temple-red text-white shadow-sm font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-700/60'
                  }`}
                  title={lang.label}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={onOpenHistory}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-xs text-zinc-200 flex items-center space-x-1.5 transition"
              title={strings.historyBtn}
            >
              <BookOpen className="w-3.5 h-3.5 text-temple-gold" />
              <span className="hidden md:inline">{strings.historyBtn}</span>
            </button>

            <button
              onClick={onOpenArch}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-xs text-zinc-200 flex items-center space-x-1.5 transition"
              title={strings.architectureBtn}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">{strings.architectureBtn}</span>
            </button>

            <button
              onClick={onOpenHitl}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-xs text-amber-300 flex items-center space-x-1.5 transition"
              title={strings.adminFlywheelBtn}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">HITL 飛輪</span>
            </button>

            <button
              onClick={onOpenAiChat}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-temple-red hover:from-amber-500 hover:to-red-600 border border-amber-400/40 text-xs text-white font-medium flex items-center space-x-1.5 shadow-md shadow-red-950/40 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{strings.askAiBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
