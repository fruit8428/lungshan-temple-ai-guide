import React, { useState } from 'react';
import { uiStrings } from '../i18n/translations';
import { Sparkles, Send, Volume2, Bot, User, Clock, AlertTriangle, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { fetchRoute } from '../utils/api';
import { speechManager } from '../utils/tts';

export default function AiChatDrawer({ isOpen, onClose, currentLang, onPlayAudio }) {
  const strings = uiStrings[currentLang] || uiStrings['zh-TW'];
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: currentLang === 'en'
        ? "Hello! I am the Bangka Lungshan Temple AI Docent. I can answer complex questions about deity worship, offerings, taboo rules, and temple history. How may I assist you today?"
        : (currentLang === 'ja'
          ? "こんにちは！艋舺龍山寺のAI案内員です。諸神への参拝方法、お供え物、タブー、寺院の歴史など、何でもご質問ください。"
          : (currentLang === 'ko'
            ? "안녕하세요! 멍자 롱산사 AI 도슨트입니다. 신령 참배법, 공양물 준비, 사찰 예절 및 역사에 대해 궁금한 점을 편하게 질문해 주세요."
            : "信眾您好！我是艋舺龍山寺的 AI 智慧導覽員。除了首頁的常見問題，您也可以隨時向我詢問關於神明職掌、祈願供品、禁忌禮節或籤詩疑問，很榮幸為您服務！")),
      tier: 'ai_welcome',
      confidence: 1.0,
      timestamp: '剛剛'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Preset quick questions across languages
  const quickSampleQuestions = {
    "zh-TW": [
      "我想求考運，文昌帝君要準備什麼供品？",
      "如果擲筊一直擲不出聖筊怎麼辦？",
      "參拜時可以帶寵物或導盲犬嗎？",
      "生病求健康要拜哪尊神明？"
    ],
    "en": [
      "What offerings should I bring for exam blessings?",
      "What if I cannot throw three Sheng-Jiao?",
      "Are pets or guide dogs allowed inside?",
      "Which deity should I pray to for health and recovery?"
    ],
    "ja": [
      "合格祈願にはどんなお供え物が適していますか？",
      "聖筊（表裏）がなかなか出ない時はどうすればよいですか？",
      "盲導犬やペットを連れて入ることはできますか？",
      "病気平癒や健康祈願にはどの神様をお参りしますか？"
    ],
    "ko": [
      "시험 합격을 기원할 때 어떤 공양물을 준비해야 하나요?",
      "점괘 나무패에서 성교가 계속 나오지 않으면 어떻게 하나요?",
      "안내견이나 반려동물 동반이 가능한가요?",
      "건강과 질병 쾌유를 위해서는 어떤 신령께 기도하나요?"
    ]
  };

  const handleSend = async (queryText) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    // Append user message
    const userMsg = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetchRoute({
        query: textToSend,
        lang: currentLang
      });

      if (response && response.success) {
        const aiMsg = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          title: response.data.title,
          text: response.data.text,
          audioScript: response.data.audioScript,
          tier: response.tier,
          source: response.source,
          latency_ms: response.latency_ms,
          confidence: response.confidence,
          status: response.data.status,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiMsg]);

        // Auto play speech
        if (response.data.audioScript) {
          speechManager.speak(response.data.audioScript, currentLang, 1.0);
          if (onPlayAudio) {
            onPlayAudio({
              topic: response.data.title || textToSend,
              script: response.data.audioScript,
              tier: response.tier,
              latency: response.latency_ms
            });
          }
        }
      }
    } catch (err) {
      console.error('AI chat failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-temple-parchment h-full shadow-2xl flex flex-col border-l border-temple-gold/40 animate-slide-left">
        {/* Drawer Header */}
        <div className="bg-temple-charcoal px-4 py-3.5 border-b border-temple-gold/30 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-temple-red border border-temple-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-base text-amber-50">
                  {strings.askAiTitle}
                </h3>
                <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-400/30 text-[10px] font-mono">
                  10% AI 即時推論
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                {strings.askAiSubtitle}
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

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isHitl = msg.tier === 'human_in_the_loop' || msg.status === 'pending_review';

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-temple-red text-white shadow'
                    : 'bg-gradient-to-br from-amber-600 to-temple-darkred text-temple-gold border border-temple-gold/60 shadow'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-sm ${
                  isUser
                    ? 'bg-temple-red text-white rounded-tr-none'
                    : 'bg-white text-zinc-800 border border-temple-border rounded-tl-none'
                }`}>
                  {/* Assistant Message Header Pill */}
                  {!isUser && (
                    <div className="flex items-center justify-between gap-1 mb-1.5 pb-1.5 border-b border-zinc-100 text-[10px] font-mono">
                      <span className="font-semibold text-temple-stone">
                        {msg.title || 'AI 導覽答覆'}
                      </span>
                      {msg.tier && (
                        <span className={`px-1.5 py-0.2 rounded ${
                          msg.tier === '90%_knowledge_base'
                            ? 'bg-emerald-100 text-emerald-800'
                            : (isHitl ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800')
                        }`}>
                          {msg.tier === '90%_knowledge_base' ? '90% 快取' : (isHitl ? '待廟方審核' : '10% AI推論')}
                          {msg.latency_ms ? ` (${msg.latency_ms}ms)` : ''}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Body text */}
                  <p className="leading-relaxed whitespace-pre-line font-sans">
                    {msg.text}
                  </p>

                  {/* HITL Notice Banner */}
                  {isHitl && (
                    <div className="mt-2.5 p-2 rounded-lg bg-amber-50 border border-amber-300 text-[11px] text-amber-900 flex items-start space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Human-in-the-Loop 已觸發：</span>
                        <span> 本問題已登記至後台待處理佇列，待廟方審核標準答案後將自動寫回知識庫。</span>
                      </div>
                    </div>
                  )}

                  {/* Assistant Audio Action Button */}
                  {!isUser && msg.audioScript && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => speechManager.speak(msg.audioScript, currentLang, 1.0)}
                        className="text-temple-red hover:text-temple-darkred font-medium flex items-center space-x-1 text-xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>重新朗讀</span>
                      </button>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading bubble */}
          {isLoading && (
            <div className="flex items-center space-x-2 text-zinc-500 text-xs italic p-2 bg-white/70 rounded-xl border border-zinc-200 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>AI 導覽員即時推論中（檢索廟宇規範典籍）...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-zinc-100/90 border-t border-zinc-200">
          <p className="text-[11px] text-zinc-500 mb-1.5 font-medium flex items-center space-x-1">
            <span>💡 常見信眾提問靈感：</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(quickSampleQuestions[currentLang] || quickSampleQuestions['zh-TW']).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-[11px] bg-white hover:bg-amber-50 text-zinc-700 hover:text-temple-red px-2.5 py-1 rounded-full border border-zinc-300 hover:border-temple-gold transition shadow-2xs truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-zinc-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={strings.askAiPlaceholder}
              disabled={isLoading}
              className="flex-1 bg-zinc-50 border border-zinc-300 focus:border-temple-red focus:ring-1 focus:ring-temple-red rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="w-10 h-10 rounded-xl bg-temple-red hover:bg-temple-darkred disabled:opacity-50 text-white flex items-center justify-center shadow transition shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
