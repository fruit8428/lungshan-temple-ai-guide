import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { getAllHotspotsSummary } from '../core/semanticEngine';

export default function PanoramaViewer({
  currentLang,
  onHotspotTriggered,
  activeHotspot
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [lastTriggeredTime, setLastTriggeredTime] = useState(null);
  const containerRef = useRef(null);

  const hotspotSummaries = getAllHotspotsSummary(currentLang);

  // Listen to postMessage from GoThru iframe
  useEffect(() => {
    const handleMessage = (event) => {
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          if (
            data.includes('guanyin') ||
            data.includes('stone') ||
            data.includes('lion') ||
            data.includes('gothru') ||
            data.includes('shishi')
          ) {
            data = { type: 'gothru_hotspot', hotspot_id: 'guanyin_hall' };
          }
        }
      }

      if (
        data &&
        (data.type === 'gothru_hotspot' ||
          data.hotspot_id ||
          data.action === 'guide_stone_lion' ||
          data.action === 'stone_lion' ||
          data.target === 'stone_lion' ||
          data.target === 'guanyin_hall')
      ) {
        const hotspotId =
          data.hotspot_id || data.action || data.target || 'guanyin_hall';
        setLastTriggeredTime(new Date().toLocaleTimeString());
        if (onHotspotTriggered) {
          onHotspotTriggered(hotspotId, data.lang);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onHotspotTriggered]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <section className="my-8" ref={containerRef}>
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-temple-red rounded-full"></span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-temple-stone flex items-center space-x-2">
              <span>
                {currentLang === 'zh-TW' && '艋舺龍山寺 360° 實景與建築國寶導覽'}
                {currentLang === 'en' && '360° Virtual Tour & Architectural Treasures'}
                {currentLang === 'ja' && '360°パノラマ＆国宝建築ガイド'}
                {currentLang === 'ko' && '360° 파노라마 및 국보 건축물 가이드'}
              </span>
            </h2>
          </div>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            {currentLang === 'zh-TW' &&
              '旋轉全景探索古蹟，點擊畫面中的熱點圖示即可聆聽多語系解說'}
            {currentLang === 'en' &&
              'Rotate the 360° tour and tap any hotspot icon for instant multilingual audio'}
            {currentLang === 'ja' &&
              'パノラマを回転させ、画面内のスポットアイコンをタップすると音声解説が流れます'}
            {currentLang === 'ko' &&
              '파노라마를 회전하며 화면 속 핫스팟 아이콘을 누르면 다국어 음성 해설이 재생됩니다'}
          </p>
        </div>

        {/* Status Badge, Hint Pill & Fullscreen */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-temple-charcoal text-white border border-temple-gold/60 px-3 py-1.5 rounded-xl shadow-xs text-xs flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-pulse" />
            <span className="font-serif">
              {currentLang === 'zh-TW' &&
                '點擊全景畫面中的熱點，即刻啟動語音導覽！'}
              {currentLang === 'en' &&
                'Tap any hotspot in the 360° view to start the audio guide!'}
              {currentLang === 'ja' &&
                'パノラマ内のスポットをタップして音声ガイドを再生！'}
              {currentLang === 'ko' &&
                '파노라마 화면 속 핫스팟을 눌러 음성 가이드를 시작하세요!'}
            </span>
          </div>

          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-mono shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>360° 雙向熱點連動</span>
            {lastTriggeredTime && (
              <span className="text-emerald-600 font-bold ml-1">
                ({lastTriggeredTime})
              </span>
            )}
          </span>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-700 hover:text-black transition"
            title={isFullscreen ? '離開全螢幕' : '全螢幕全景'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 360 Panorama Iframe Container */}
      <div
        className={`relative rounded-2xl overflow-hidden border-2 border-temple-gold shadow-xl bg-zinc-950 transition-all ${
          isFullscreen
            ? 'fixed inset-0 z-50 rounded-none border-0'
            : 'h-[380px] sm:h-[480px] md:h-[540px]'
        }`}
      >
        {/* Loading Spinner */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900/90 text-amber-200 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin text-temple-gold mb-2" />
            <span>載入 360° 實景導覽 (GoThru)...</span>
          </div>
        )}

        {/* Embedded Iframe */}
        <iframe
          src="https://tourmkr.com/F1vWDe52rp"
          title="艋舺龍山寺 360 全景導覽"
          className="w-full h-full border-0"
          allow="accelerometer; gyroscope; magnetometer; vr; xr; xr-spatial-tracking; fullscreen"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsIframeLoaded(true)}
        />
      </div>
    </section>
  );
}
