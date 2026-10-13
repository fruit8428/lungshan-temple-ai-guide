import React, { useState, useEffect, useRef } from 'react';
import { Compass, Maximize2, Minimize2, Volume2, Sparkles, Eye, CheckCircle2, RefreshCw } from 'lucide-react';

export default function PanoramaViewer({ 
  currentLang, 
  onHotspotTriggered, 
  activeHotspot 
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [lastTriggeredTime, setLastTriggeredTime] = useState(null);
  const containerRef = useRef(null);

  // Listen to postMessage from GoThru iframe
  useEffect(() => {
    const handleMessage = (event) => {
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          // If the message is a raw string matching hotspot keywords
          if (typeof data === 'string' && (
            data.includes('guanyin') || 
            data.includes('stone') || 
            data.includes('lion') || 
            data.includes('gothru') ||
            data.includes('shishi')
          )) {
            data = { type: 'gothru_hotspot', hotspot_id: 'guanyin_hall' };
          }
        }
      }

      if (data && (
        data.type === 'gothru_hotspot' || 
        data.hotspot_id || 
        data.action === 'guide_stone_lion' ||
        data.action === 'stone_lion' ||
        data.target === 'stone_lion' ||
        data.target === 'guanyin_hall'
      )) {
        console.log('[GoThru postMessage received]:', data);
        const hotspotId = data.hotspot_id || data.action || data.target || 'guanyin_hall';
        setLastTriggeredTime(new Date().toLocaleTimeString());
        if (onHotspotTriggered) {
          onHotspotTriggered(hotspotId);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onHotspotTriggered]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <section className="my-8" ref={containerRef}>
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-temple-red rounded-full"></span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-temple-stone flex items-center space-x-2">
              <span>艋舺龍山寺 360° 實景導覽（GoThru 全景）</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            {currentLang === 'zh-TW' && "點擊全景圖中「石獅」或建築熱點，自動連動多語系語音導覽"}
            {currentLang === 'en' && "Tap the 'Stone Lion' or architectural hotspots in the 360° tour for multilingual audio"}
            {currentLang === 'ja' && "全景内の「石獅子」や各熱点をタップすると、自動で多言語音声ガイドが流れます"}
            {currentLang === 'ko' && "360° 파노라마의 '석사자' 또는 핫스팟을 터치하면 다국어 음성 가이드가 연동됩니다"}
          </p>
        </div>

        {/* Status Badge & Fullscreen */}
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-mono shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>postMessage 監聽中</span>
            {lastTriggeredTime && (
              <span className="text-emerald-600 font-bold ml-1">
                (已觸發: {lastTriggeredTime})
              </span>
            )}
          </span>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-700 hover:text-black transition"
            title={isFullscreen ? "離開全螢幕" : "全螢幕全景"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 360 Panorama Iframe Container */}
      <div className={`relative rounded-2xl overflow-hidden border-2 border-temple-gold shadow-xl bg-zinc-950 transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : 'h-[360px] sm:h-[480px] md:h-[540px]'
      }`}>
        {/* Loading Spinner */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900/90 text-amber-200 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin text-temple-gold mb-2" />
            <span>載入 360° 全景圖 (GoThru)...</span>
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

        {/* Overlay Hotspot Hint Pill */}
        <div className="absolute top-3 left-3 right-3 sm:right-auto z-20 pointer-events-none">
          <div className="bg-temple-charcoal/90 backdrop-blur-md border border-temple-gold/60 text-white px-3 py-2 rounded-xl shadow-lg text-xs flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
            <span className="font-serif">
              {currentLang === 'zh-TW' && "請在全景中旋轉找到「三川殿石獅」，點擊即自動以您的語言解說！"}
              {currentLang === 'en' && "Rotate to find the 'Stone Lions' and tap to trigger instant audio!"}
              {currentLang === 'ja' && "全景を回転して「石獅子」を探し、タップすると日本語で解説が流れます！"}
              {currentLang === 'ko' && "파노라마를 돌려 '석사자'를 찾아 터치하면 한국어 음성 해설이 시작됩니다!"}
            </span>
          </div>
        </div>

        {/* Hotspot Direct Test Buttons (at bottom of viewer for quick testing) */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center space-x-2">
          <button
            onClick={() => onHotspotTriggered('guanyin_hall')}
            className="px-3 py-1.5 rounded-xl bg-temple-red/90 hover:bg-temple-red text-white text-xs font-serif font-bold shadow-lg border border-temple-gold flex items-center space-x-1.5 transition active:scale-95 backdrop-blur-sm"
            title="模擬信眾點擊石獅熱點"
          >
            <Compass className="w-3.5 h-3.5 text-temple-gold" />
            <span>
              {currentLang === 'zh-TW' && "🦁 模擬點擊「石獅」熱點"}
              {currentLang === 'en' && "🦁 Simulate 'Stone Lion' Hotspot"}
              {currentLang === 'ja' && "🦁 「石獅子」熱点をテスト"}
              {currentLang === 'ko' && "🦁 '석사자' 핫스팟 테스트"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
