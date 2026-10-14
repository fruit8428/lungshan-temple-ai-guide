/**
 * @fileoverview Enterprise Multilingual Speech Synthesis (TTS), Web Audio Temple Chime & Voice Recognition (ASR)
 * Engineered for iOS Safari, Android Chrome, and Desktop browsers with sentence-chunking to prevent cutoff.
 */

const VOICE_LANG_MAP = {
  "zh-TW": "zh-TW",
  en: "en-US",
  ja: "ja-JP",
  ko: "ko-KR"
};

/**
 * Splits a paragraph into natural sentences so Web Speech API never cuts off long utterances
 */
function splitIntoSentences(text) {
  if (!text || !text.trim()) return [];
  const raw = text
    .replace(/\r\n/g, "\n")
    .split(/(?<=[。！？.!?\n])\s*/)
    .map(s => s.trim())
    .filter(Boolean);
  return raw.length > 0 ? raw : [text.trim()];
}

class SpeechManager {
  constructor() {
    this.synth =
      typeof window !== "undefined" && "speechSynthesis" in window
        ? window.speechSynthesis
        : null;
    this.audioCtx = null;
    this.voices = [];
    this.queue = [];
    this.currentIndex = 0;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentText = "";
    this.currentLang = "zh-TW";
    this.currentRate = 1.0;
    this.listeners = new Set();
    this.isUnlocked = false;
    this.speakTimer = null;

    if (typeof window !== "undefined") {
      this.initUnlocker();
      if (this.synth) {
        this.loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
      }
    }
  }

  initUnlocker() {
    const unlock = () => {
      if (this.isUnlocked) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          if (!this.audioCtx) this.audioCtx = new AudioContext();
          if (this.audioCtx.state === "suspended") {
            this.audioCtx.resume();
          }
          const buffer = this.audioCtx.createBuffer(1, 1, 22050);
          const source = this.audioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(this.audioCtx.destination);
          source.start(0);
        }

        if (this.synth) {
          const silentUtterance = new SpeechSynthesisUtterance(" ");
          silentUtterance.volume = 0.01;
          this.synth.speak(silentUtterance);
        }

        this.isUnlocked = true;
      } catch (e) {
        console.warn("Audio unlock warning:", e);
      }
    };

    ["touchstart", "touchend", "click", "pointerdown"].forEach(evt => {
      window.addEventListener(evt, unlock, { once: true, passive: true });
    });
  }

  /**
   * Plays a warm 528Hz harmonic temple singing bowl chime using Web Audio API
   */
  playTempleChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) this.audioCtx = new AudioContext();
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      const ctx = this.audioCtx;
      const now = ctx.currentTime;
      const harmonics = [
        { freq: 528, gain: 0.22, duration: 1.3, type: "sine" },
        { freq: 1056, gain: 0.08, duration: 1.0, type: "triangle" },
        { freq: 1584, gain: 0.04, duration: 0.7, type: "sine" }
      ];

      harmonics.forEach(h => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = h.type;
        osc.frequency.setValueAtTime(h.freq, now);

        gain.gain.setValueAtTime(h.gain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + h.duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + h.duration);
      });
    } catch (e) {
      console.warn("Chime audio error:", e);
    }
  }

  loadVoices() {
    if (!this.synth) return;
    try {
      this.voices = this.synth.getVoices() || [];
    } catch {
      this.voices = [];
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const total = this.queue.length || 1;
    const progress = this.isPlaying
      ? Math.min(100, Math.round(((this.currentIndex + 1) / total) * 100))
      : 0;
    const activeSentence = this.queue[this.currentIndex] || this.currentText;

    this.listeners.forEach(fn =>
      fn({
        isPlaying: this.isPlaying,
        isPaused: this.isPaused,
        currentText: this.currentText,
        activeSentence,
        progress,
        rate: this.currentRate
      })
    );
  }

  getBestVoice(langCode) {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }
    if (!this.voices || this.voices.length === 0) return null;

    // On iOS Safari, setting utterance.voice explicitly can cause silent playback; rely on utterance.lang
    if (
      typeof navigator !== "undefined" &&
      /iPhone|iPad|iPod/i.test(navigator.userAgent)
    ) {
      return null;
    }

    const langVoiceMap = {
      "zh-TW": ["zh-TW", "zh-HK", "zh"],
      en: ["en-US", "en-GB", "en"],
      ja: ["ja-JP", "ja"],
      ko: ["ko-KR", "ko"]
    };

    const targetCodes = langVoiceMap[langCode] || [langCode];

    for (const code of targetCodes) {
      const matched = this.voices.filter(
        v =>
          v.lang &&
          v.lang
            .replace("_", "-")
            .toLowerCase()
            .startsWith(code.toLowerCase())
      );
      if (matched.length > 0) {
        // Prefer natural / premium voices if available
        const premium = matched.find(v =>
          /natural|premium|google|siri|meijia|kyoko|yuna/i.test(v.name)
        );
        return premium || matched[0];
      }
    }

    return null;
  }

  speak(text, langCode = "zh-TW", rate = 1.0, onFinish = null) {
    if (!this.synth || !text || !text.trim()) return false;

    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }

    this.playTempleChime();

    this.currentText = text.trim();
    this.currentLang = langCode;
    this.currentRate = rate;
    this.queue = splitIntoSentences(this.currentText);
    this.currentIndex = 0;

    if (this.synth.speaking || this.synth.pending) {
      try {
        this.synth.cancel();
      } catch {}
    }

    const speakNextSentence = () => {
      if (this.currentIndex >= this.queue.length) {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentUtterance = null;
        this.notify();
        if (onFinish) onFinish();
        return;
      }

      const sentence = this.queue[this.currentIndex];
      const targetLang = VOICE_LANG_MAP[langCode] || "zh-TW";

      try {
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = targetLang;
        utterance.rate = this.currentRate;
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
          this.currentIndex += 1;
          speakNextSentence();
        };

        utterance.onerror = () => {
          this.isPlaying = false;
          this.isPaused = false;
          this.currentUtterance = null;
          this.notify();
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);

        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch (err) {
        console.error("TTS sentence error:", err);
      }
    };

    // 35ms delay avoids WebKit cancel/speak race condition
    this.speakTimer = setTimeout(speakNextSentence, 35);
    return true;
  }

  pause() {
    if (this.synth && this.isPlaying && !this.isPaused) {
      try {
        this.synth.pause();
        this.isPaused = true;
        this.notify();
      } catch {}
    }
  }

  resume() {
    if (this.synth && this.isPlaying && this.isPaused) {
      try {
        this.synth.resume();
        this.isPaused = false;
        this.notify();
      } catch {}
    }
  }

  stop() {
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
    }
    this.queue = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.notify();
  }

  setRate(rate) {
    this.currentRate = rate;
    if (this.isPlaying && this.currentText) {
      this.speak(this.currentText, this.currentLang, rate);
    } else {
      this.notify();
    }
  }
}

export const speechManager = new SpeechManager();

/**
 * Web Speech Recognition (ASR) Helper for Multilingual Voice Input in AI Chat
 */
export function createVoiceRecognizer(langCode = "zh-TW", { onResult, onError, onEnd }) {
  if (typeof window === "undefined") return null;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.lang = VOICE_LANG_MAP[langCode] || "zh-TW";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = event => {
    const transcript = event.results?.[0]?.[0]?.transcript;
    if (transcript && onResult) {
      onResult(transcript);
    }
  };

  recognition.onerror = event => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
}
