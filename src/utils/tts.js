// Speech Synthesis Utility for Multilingual Voice Guides

class SpeechManager {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentText = '';
    this.currentRate = 1.0;
    this.listeners = new Set();

    if (this.synth) {
      this.loadVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
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
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }

    const langVoiceMap = {
      'zh-TW': ['zh-TW', 'zh-HK', 'zh'],
      'en': ['en-US', 'en-GB', 'en'],
      'ja': ['ja-JP', 'ja'],
      'ko': ['ko-KR', 'ko']
    };

    const targetCodes = langVoiceMap[langCode] || [langCode];

    for (const code of targetCodes) {
      // Prefer high quality / natural local voices if present
      const matched = this.voices.filter(v => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith(code.toLowerCase()));
      if (matched.length > 0) {
        const preferred = matched.find(v => 
          v.name.includes('Natural') || 
          v.name.includes('Premium') || 
          v.name.includes('Siri') || 
          v.name.includes('Google') || 
          v.name.includes('Mei-Jia') ||
          v.name.includes('Yuna') ||
          v.name.includes('Kyoko')
        );
        return preferred || matched[0];
      }
    }

    return null;
  }

  speak(text, langCode = 'zh-TW', rate = 1.0, onFinish = null) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported on this browser.');
      return false;
    }

    this.stop();

    if (!text || !text.trim()) return false;

    this.currentText = text;
    this.currentRate = rate;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map lang
    const voiceLangMap = {
      'zh-TW': 'zh-TW',
      'en': 'en-US',
      'ja': 'ja-JP',
      'ko': 'ko-KR'
    };
    utterance.lang = voiceLangMap[langCode] || 'zh-TW';
    utterance.rate = rate;
    utterance.pitch = 1.0;

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
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.notify();
  }

  setRate(rate) {
    this.currentRate = rate;
    if (this.isPlaying && this.currentText) {
      // Re-speak with new rate from beginning or continue
      const current = this.currentText;
      const lang = this.currentUtterance ? this.currentUtterance.lang : 'zh-TW';
      this.speak(current, lang, rate);
    } else {
      this.notify();
    }
  }
}

export const speechManager = new SpeechManager();
