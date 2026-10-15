import React, { useState, useEffect, useRef } from 'react';
import { uiStrings } from '../i18n/translations';
import {
  Sparkles,
  Send,
  Volume2,
  Bot,
  User,
  AlertTriangle,
  Mic,
  MicOff,
  X
} from 'lucide-react';
import { fetchRoute } from '../utils/api';
import { speechManager, createVoiceRecognizer } from '../utils/tts';
import { getActiveTempleSlug } from '../core/supabaseClient';

const WELCOME_MESSAGES_BY_TEMPLE = {
  hesheng: {
    'zh-TW':
      '信眾您好！我是五股賀聖宮的 AI 智慧導覽員。您可以透過「文字」或「語音麥克風」向我詢問北極玄天上帝（上帝公）參拜方式、點光明燈與安太歲、求籤擲筊流程、註生娘娘與福德正神祈願或洲子洋交通資訊，很榮幸為您服務！',
    en: 'Welcome! I am the Wugu Hesheng Temple AI Docent. You may type or use the microphone to ask about worshipping Xuanwu (Emperor Xuantian), blessing lanterns & Tai Sui, drawing fortune sticks, or transportation!',
    ja: 'こんにちは！五股賀聖宮のAIスマート案内員です。テキストまたは音声マイクで、主神・北極玄天上帝の参拝方法、光明燈・安太歳、おみくじの引き方、アクセス方法など何でもお尋ねください！',
    ko: '안녕하세요! 우구 허성궁 AI 스마트 도슨트입니다. 텍스트나 음성 마이크를 통해 주신 북극현천상제 참배법, 광명등·안태세 신청, 점괘 뽑는 법, 교통편 등 무엇이든 질문해 주세요!'
  },
  lungshan: {
    'zh-TW':
      '信眾您好！我是艋舺龍山寺的 AI 智慧導覽員。您可以透過「文字」或「語音麥克風」向我詢問各殿神明祈願方式（如文昌考運、華陀健康、關公財運、月老紅線還願、二戰不壞觀音傳奇或周邊艋舺美食），很榮幸為您服務！',
    en: 'Welcome! I am the Bangka Lungshan Temple AI Docent. You may type or use the microphone to ask about deity worship (Exams, Health, Career, Love/Red String), the 1945 Air Raid Miracle, or nearby Bangka street food!',
    ja: 'こんにちは！艋舺龍山寺のAIスマート案内員です。テキスト入力または音声マイクを使って、各神様のご利益（合格祈願・健康・金運・良縁のお礼参り）や、1945年大空襲の奇跡、周辺グルメなど何でもお尋ねください！',
    ko: '안녕하세요! 멍자 롱산사 AI 스마트 도슨트입니다. 텍스트나 음성 마이크를 통해 신령별 참배법(시험운, 건강, 재물, 붉은 실 보답), 1945년 대공습의 기적, 주변 맛집 등 무엇이든 질문해 주세요!'
  }
};

const QUICK_SAMPLE_QUESTIONS_BY_TEMPLE = {
  hesheng: {
    'zh-TW': [
      '賀聖宮主祀的北極玄天上帝（上帝公）保佑什麼？怎麼拜？',
      '請問如何在賀聖宮點光明燈、太歲燈或文昌財利燈？',
      '在賀聖宮求籤與擲筊（三聖筊）的完整步驟是什麼？',
      '請問五股賀聖宮的地址、開放時間與交通方式？',
      '想求考運功名或事業財運，殿內有哪些神明可以參拜？'
    ],
    en: [
      'What does Emperor Xuantian (Xuanwu) bless and how do I worship?',
      'How do I register for Blessing Lanterns or Tai Sui at Hesheng Temple?',
      'What is the step-by-step process for drawing fortune sticks here?',
      'What are Hesheng Temple’s address, opening hours, and directions?',
      'Which deities in the temple bless exams, career, and wealth?'
    ],
    ja: [
      '主神・北極玄天上帝（上帝公）のご利益と参拝方法は？',
      '賀聖宮で光明燈や安太歳を申し込むにはどうすればいいですか？',
      'おみくじ（霊籤）と聖筊（ポエ）の正しい手順を教えてください',
      '五股賀聖宮の住所・参拝時間・アクセス方法を教えてください',
      '学業成就や仕事運・金運はどの神様をお参りすれば良いですか？'
    ],
    ko: [
      '주신 북극현천상제(상제공)께서는 어떤 복을 주시며 어떻게 참배하나요?',
      '허성궁에서 광명등이나 안태세를 신청하려면 어떻게 하나요?',
      '점괘(영첨) 뽑기와 즈이자오(3연속 성교)의 순서는 어떻게 되나요?',
      '우구 허성궁의 주소, 개방 시간, 대중교통 이용법은?',
      '시험 합격이나 사업 재물운을 빌려면 어느 전각을 참배하나요?'
    ]
  },
  lungshan: {
    'zh-TW': [
      '我想求考運，文昌帝君要準備什麼供品？',
      '擲筊一直擲不出聖筊（笑筊／陰筊）怎麼辦？',
      '月老紅線不見了怎麼辦？結婚後如何還願？',
      '求事業升遷與財運要拜哪一尊神明？',
      '為什麼二戰空襲正殿全毀，觀音菩薩卻毫髮無損？',
      '參拜完附近有哪些必吃的艋舺美食與古蹟？'
    ],
    en: [
      'What offerings should I bring to Emperor Wenchang for exams?',
      'What if I cannot throw three Sheng-Jiao (Laughing/Negative blocks)?',
      'What if I lose my Yue Lao red string, and how do I return thanks?',
      'Which deity should I worship for career and business wealth?',
      'Tell me the story of the 1945 Air Raid Miracle of Guanyin!',
      'What famous local street foods and heritage sites are nearby?'
    ],
    ja: [
      '合格祈願の文昌帝君にはどんなお供え物が良いですか？',
      '聖筊がなかなか出ない時（笑筊・陰筊）はどうすればいい？',
      '赤い糸をなくした場合は？お礼参り（還願）の作法は？',
      '仕事運や商売繁盛・金運はどの神様をお参りしますか？',
      '1945年の台北大空襲で観音様が無傷だった奇跡とは？',
      '参拝後に立ち寄れる周辺のグルメや観光スポットは？'
    ],
    ko: [
      '시험 합격을 위해 문창제군께 어떤 공양물을 올리나요?',
      '성교가 계속 나오지 않을 때(소교·음교)는 어떻게 하나요?',
      '월하노인 붉은 실을 잃어버렸거나 소원 성취 후 보답하려면?',
      '직장 승진과 사업 재물운을 위해서는 어느 신령께 참배하나요?',
      '1945년 대공습 때 관세음보살님이 무사했던 기적 이야기란?',
      '참배 후 가볼 만한 주변 맛집과 역사 명소는 어디인가요?'
    ]
  }
};

export default function AiChatDrawer({
  isOpen,
  onClose,
  currentLang,
  onPlayAudio
}) {
  const strings = uiStrings[currentLang] || uiStrings['zh-TW'];
  const templeSlug = getActiveTempleSlug() === 'hesheng' ? 'hesheng' : 'lungshan';
  const welcomeMap = WELCOME_MESSAGES_BY_TEMPLE[templeSlug];
  const sampleQuestionsMap = QUICK_SAMPLE_QUESTIONS_BY_TEMPLE[templeSlug];
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognizerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize or update welcome message when language changes
  useEffect(() => {
    setMessages((prev) => {
      const welcomeMsg = {
        id: 'welcome',
        role: 'assistant',
        title:
          currentLang === 'en'
            ? 'AI Docent Ready'
            : currentLang === 'ja'
            ? 'AI案内員オンライン'
            : currentLang === 'ko'
            ? 'AI 도슨트 대기 중'
            : 'AI 智慧導覽員線上服務中',
        text: welcomeMap[currentLang] || welcomeMap['zh-TW'],
        tier: 'ai_welcome',
        confidence: 1.0,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      if (prev.length <= 1) return [welcomeMsg];
      return [welcomeMsg, ...prev.slice(1)];
    });
  }, [currentLang, templeSlug]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (queryText) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    speechManager.playTempleChime();

    const userMsg = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages((prev) => [...prev, userMsg]);
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
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        setMessages((prev) => [...prev, aiMsg]);

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
      console.error('AI chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognizer = createVoiceRecognizer(currentLang, {
      onResult: (transcript) => {
        setIsListening(false);
        if (transcript && transcript.trim()) {
          handleSend(transcript.trim());
        }
      },
      onError: () => {
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    if (!recognizer) {
      alert(
        currentLang === 'en'
          ? 'Voice recognition is not supported on this browser.'
          : '您的瀏覽器不支援語音輸入，請直接輸入文字提問。'
      );
      return;
    }

    recognizerRef.current = recognizer;
    setIsListening(true);
    recognizer.start();
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
                  RAG + AI 雙引擎
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
            const isHitl =
              msg.tier === 'human_in_the_loop' ||
              msg.status === 'pending_review';

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${
                  isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-temple-red text-white shadow'
                      : 'bg-gradient-to-br from-amber-600 to-temple-darkred text-temple-gold border border-temple-gold/60 shadow'
                  }`}
                >
                  {isUser ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-sm ${
                    isUser
                      ? 'bg-temple-red text-white rounded-tr-none'
                      : 'bg-white text-zinc-800 border border-temple-border rounded-tl-none'
                  }`}
                >
                  {/* Assistant Message Header Pill */}
                  {!isUser && (
                    <div className="flex items-center justify-between gap-1 mb-1.5 pb-1.5 border-b border-zinc-100 text-[10px] font-mono">
                      <span className="font-semibold text-temple-stone truncate">
                        {msg.title || 'AI 導覽答覆'}
                      </span>
                      {msg.tier && msg.tier !== 'ai_welcome' && (
                        <span
                          className={`px-1.5 py-0.5 rounded shrink-0 ${
                            msg.tier === '90%_knowledge_base'
                              ? 'bg-emerald-100 text-emerald-800'
                              : isHitl
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {msg.tier === '90%_knowledge_base'
                            ? '90% 語義快取'
                            : isHitl
                            ? 'HITL 轉審核'
                            : '10% AI 推論'}
                          {msg.confidence
                            ? ` • ${Math.round(msg.confidence * 100)}%`
                            : ''}
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
                        <span className="font-bold">
                          Human-in-the-Loop 已觸發：
                        </span>
                        <span>
                          {' '}
                          此問題已自動加入「HITL 飛輪後台」，廟方人員審核補充後將自動擴充至 90% 知識庫。
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Assistant Audio Action Button */}
                  {!isUser && msg.audioScript && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() =>
                          speechManager.speak(
                            msg.audioScript,
                            currentLang,
                            1.0
                          )
                        }
                        className="text-temple-red hover:text-temple-darkred font-medium flex items-center space-x-1 text-xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>
                          {currentLang === 'en' ? 'Replay Audio' : '語音朗讀'}
                        </span>
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
            <div className="flex items-center space-x-2 text-zinc-500 text-xs italic p-2.5 bg-white/80 rounded-xl border border-zinc-200 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>AI 導覽員檢索典籍與推論中...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-zinc-100/90 border-t border-zinc-200 max-h-36 overflow-y-auto">
          <p className="text-[11px] text-zinc-500 mb-1.5 font-medium flex items-center space-x-1">
            <span>💡 點擊快速提問（支援多意圖與情境推論）：</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(
              sampleQuestionsMap[currentLang] ||
              sampleQuestionsMap['zh-TW']
            ).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-[11px] bg-white hover:bg-amber-50 text-zinc-700 hover:text-temple-red px-2.5 py-1 rounded-full border border-zinc-300 hover:border-temple-gold transition shadow-2xs text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with Voice Recognition Microphone */}
        <div className="p-3 bg-white border-t border-zinc-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition shrink-0 ${
                isListening
                  ? 'bg-red-600 text-white border-red-700 animate-pulse'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'
              }`}
              title={isListening ? '停止語音辨識' : '語音提問'}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isListening
                  ? '🎙️ 請開始說話...'
                  : strings.askAiPlaceholder
              }
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
