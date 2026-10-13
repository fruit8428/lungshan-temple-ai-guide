// Speech Synthesis & Web Audio Utility for Multilingual Voice Guides
// Specially optimized for iOS Safari, Android Chrome, and Desktop browsers

class SpeechManager {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.audioCtx = null;
    this.voices = [];
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentText = '';
    this.currentRate = 1.0;
    this.listeners = new Set();
    this.isUnlocked = false;

    if (typeof window !== 'undefined') {
      this.initUnlocker();
      if (this.synth) {
        this.loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
      }
    }
  }

  // Audio Context unlocker for iOS / Mobile autoplay policy
  initUnlocker() {
    const unlock = () => {
      if (this.isUnlocked) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
          if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
          }
          // Play silent buffer to unlock audio hardware on iOS
          const buffer = this.audioCtx.createBuffer(1, 1, 22050);
          const source = this.audioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(this.audioCtx.destination);
          source.start(0);
        }

        // Unlock SpeechSynthesis on iOS by speaking a tiny empty utterance
        if (this.synth) {
          const silentUtterance = new SpeechSynthesisUtterance(' ');
          silentUtterance.volume = 0.01;
          this.synth.speak(silentUtterance);
        }

        this.isUnlocked = true;
      } catch (e) {
        console.warn('Audio unlock error:', e);
      }
    };

    ['touchstart', 'touchend', 'click', 'pointerdown'].forEach(evt => {
      window.addEventListener(evt, unlock, { once: true, passive: true });
    });
  }

  // Plays an authentic temple chime bell sound via Web Audio API (Guaranteed audio feedback)
  playTempleChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) this.audioCtx = new AudioContext();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Temple singing bowl harmonic frequencies (528 Hz base)
      const freqs = [528, 1056, 1584];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(idx === 0 ? 0.25 : 0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
      });
    } catch (e) {
      console.warn('Chime audio error:', e);
    }
  }

  loadVoices() {
    if (!this.synth) return;
    try {
      this.voices = this.synth.getVoices() || [];
    } catch (e) {
      this.voices = [];
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentText: this.currentText,
      rate: this.currentRate
    }));
  }

  getBestVoice(langCode) {
    // Only search voice on desktop or if voices list is populated
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }
    if (!this.voices || this.voices.length === 0) return null;

    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // On iOS Safari, forcing voice object often causes silent failure; rely on utterance.lang
    if (isMobile && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      return null;
    }

    const langVoiceMap = {
      'zh-TW': ['zh-TW', 'zh-HK', 'zh'],
      'en': ['en-US', 'en-GB', 'en'],
      'ja': ['ja-JP', 'ja'],
      'ko': ['ko-KR', 'ko']
    };

    const targetCodes = langVoiceMap[langCode] || [langCode];

    for (const code of targetCodes) {
      const matched = this.voices.filter(v => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith(code.toLowerCase()));
      if (matched.length > 0) {
        return matched[0];
      }
    }

    return null;
  }

  speak(text, langCode = 'zh-TW', rate = 1.0, onFinish = null) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported on this browser.');
      return false;
    }

    if (!text || !text.trim()) return false;

    // 1. Play immediate audible chime so visitor immediately hears audio confirmation
    this.playTempleChime();

    this.currentText = text;
    this.currentRate = rate;

    const voiceLangMap = {
      'zh-TW': 'zh-TW',
      'en': 'en-US',
      'ja': 'ja-JP',
      'ko': 'ko-KR'
    };
    const targetLang = voiceLangMap[langCode] || 'zh-TW';

    // Avoid immediate cancel-then-speak bug on WebKit:
    // Only cancel if actively speaking
    if (this.synth.speaking || this.synth.pending) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }

    const executeSpeak = () => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLang;
        utterance.rate = rate;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        const voice = this.getBestVoice(langCode);
        if (voice) {
          utterance.voice = voice;
        }

        utterance.onstart = () => {
          this.isPlaying = true;
          this.isPaused = false;
          this.notify();
        };

        utterance.onend = () => {
          this.isPlaying = false;
          this.isPaused = false;
          this.currentUtterance = null;
          this.notify();
          if (onFinish) onFinish();
        };

        utterance.onerror = (e) => {
          console.warn('Speech synthesis utterance error:', e);
          this.isPlaying = false;
          this.isPaused = false;
          this.currentUtterance = null;
          this.notify();
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);
        
        // iOS workaround: resume if synth paused
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (err) {
        console.error('Speech execute failed:', err);
      }
    };

    // A tiny 30ms delay avoids the iOS cancel-race condition
    setTimeout(executeSpeak, 40);
    return true;
  }

  pause() {
    if (this.synth && this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  resume() {
    if (this.synth && this.isPlaying && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.notify();
  }

  setRate(rate) {
    this.currentRate = rate;
    if (this.isPlaying && this.currentText) {
      const current = this.currentText;
      const lang = this.currentUtterance ? this.currentUtterance.lang : 'zh-TW';
      this.speak(current, lang, rate);
    } else {
      this.notify();
    }
  }
}

export const speechManager = new SpeechManager();
