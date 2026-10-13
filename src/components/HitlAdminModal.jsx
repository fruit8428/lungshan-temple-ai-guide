import React, { useState, useEffect } from 'react';
import { uiStrings } from '../i18n/translations';
import { Sliders, CheckCircle, Clock, Send, AlertCircle, RefreshCw, Database, Webhook, X } from 'lucide-react';
import { fetchPendingQuestions, resolvePendingQuestion, triggerN8nWebhook } from '../utils/api';

export default function HitlAdminModal({ isOpen, onClose, currentLang, onFaqUpdated }) {
  const strings = uiStrings[currentLang] || uiStrings['zh-TW'];
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [successNotice, setSuccessNotice] = useState('');
  const [n8nStatus, setN8nStatus] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchPendingQuestions();
      setPendingList(data || []);
      // pre-fill suggested answers
      const initialAnswers = {};
      (data || []).forEach(item => {
        if (item.suggestedAnswer) {
          initialAnswers[item.id] = item.suggestedAnswer;
        }
      });
      setAnswers(prev => ({ ...initialAnswers, ...prev }));
    } catch (err) {
      console.error('Failed to load pending questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleAnswerChange = (id, text) => {
    setAnswers(prev => ({ ...prev, [id]: text }));
  };

  const handleResolve = async (item) => {
    const answerText = answers[item.id];
    if (!answerText || !answerText.trim()) {
      alert('請先輸入標準官方解答內容');
      return;
    }

    try {
      const res = await resolvePendingQuestion({
        id: item.id,
        answer: answerText.trim(),
        title: item.query,
        lang: item.lang,
        audioScript: answerText.trim()
      });

      if (res && res.success) {
        setSuccessNotice(`已成功審核！問題「${item.query.substring(0, 15)}...」已寫入 90% 知識庫！`);
        setTimeout(() => setSuccessNotice(''), 4000);
        loadData();
        if (onFaqUpdated) onFaqUpdated();
      }
    } catch (err) {
      console.error('Failed to resolve question:', err);
    }
  };

  const handleSimulateN8n = async () => {
    setN8nStatus('正在觸發 n8n Webhook 自動化管道...');
    try {
      const res = await triggerN8nWebhook({
        action: `n8n_sync_${Date.now()}`,
        query: '寺廟是否有提供輪椅無障礙坡道？',
        answer: '有的！龍山寺山門右側龍門旁設有無障礙坡道，服務台亦提供愛心輪椅借用服務。',
        source: 'n8n_line_management_group'
      });
      setN8nStatus('✅ n8n Webhook 模擬成功！已由管理群組自動同調擴充一筆新常見問題！');
      setTimeout(() => {
        setN8nStatus('');
        loadData();
        if (onFaqUpdated) onFaqUpdated();
      }, 3500);
    } catch (err) {
      setN8nStatus('❌ Webhook 觸發失敗');
    }
  };

  if (!isOpen) return null;

  const unresolved = pendingList.filter(p => p.status !== 'resolved');
  const resolved = pendingList.filter(p => p.status === 'resolved');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-temple-parchment rounded-2xl shadow-2xl border-2 border-temple-gold overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-temple-charcoal px-5 py-4 text-white border-b border-temple-gold/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600/30 border border-amber-400/40 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-base text-amber-50">
                  {strings.hitlTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono">
                  Skill.md 架構第 3 節
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 font-sans mt-0.5">
                {strings.hitlDesc}
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

        {/* Action Toolbars */}
        <div className="px-5 py-3 bg-zinc-100 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-zinc-700 font-medium">
              待審核：<strong className="text-amber-700">{unresolved.length}</strong> 則 | 
              已通過：<strong className="text-emerald-700">{resolved.length}</strong> 則
            </span>
            <button
              onClick={loadData}
              className="text-zinc-600 hover:text-zinc-900 flex items-center space-x-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>重新整理</span>
            </button>
          </div>

          {/* n8n Webhook Test Button */}
          <button
            onClick={handleSimulateN8n}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center space-x-1.5 shadow-sm transition active:scale-95"
          >
            <Webhook className="w-3.5 h-3.5 text-indigo-200" />
            <span>{strings.simulatedN8n}</span>
          </button>
        </div>

        {/* Notices */}
        {successNotice && (
          <div className="mx-5 mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center space-x-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {n8nStatus && (
          <div className="mx-5 mt-3 p-3 rounded-xl bg-indigo-50 border border-indigo-300 text-indigo-900 text-xs flex items-center space-x-2 animate-fade-in">
            <Webhook className="w-4 h-4 text-indigo-600 shrink-0 animate-pulse" />
            <span>{n8nStatus}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <h4 className="font-serif font-bold text-sm text-temple-stone flex items-center space-x-2">
            <span>{strings.pendingList}</span>
            <span className="text-xs font-normal text-zinc-500 font-sans">
              （信眾在 AI 導覽中觸發未命中或低信心之問題）
            </span>
          </h4>

          {unresolved.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 text-xs bg-white rounded-xl border border-dashed border-zinc-300">
              <Database className="w-8 h-8 mx-auto text-zinc-400 mb-2 opacity-70" />
              <p>{strings.noPending}</p>
            </div>
          ) : (
            unresolved.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border-2 border-amber-300/80 shadow-sm space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold">
                      {strings.pendingBadge}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      語系: {item.lang || 'zh-TW'}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      信心度: {item.confidence ? (item.confidence * 100).toFixed(0) + '%' : '未知'}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                  <span className="text-[11px] text-zinc-500 font-bold block mb-0.5">信眾原提問：</span>
                  <p className="text-sm font-semibold text-zinc-900 font-serif">
                    ❓ "{item.query}"
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-600 block mb-1">
                    廟方標準解答（核准後將自動轉為預錄文字與 TTS 音訊，擴充進 90% 知識庫）：
                  </label>
                  <textarea
                    rows={2}
                    value={answers[item.id] || ''}
                    onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                    placeholder={strings.answerPlaceholder}
                    className="w-full text-xs p-2.5 bg-zinc-50 border border-zinc-300 focus:border-temple-red focus:ring-1 focus:ring-temple-red rounded-lg outline-none"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleResolve(item)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center space-x-1.5 shadow transition active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{strings.resolveAction}</span>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Resolved History Archive */}
          {resolved.length > 0 && (
            <div className="mt-6 pt-4 border-t border-zinc-200">
              <h5 className="font-serif font-bold text-xs text-zinc-600 mb-2">
                已通過並寫入知識庫的歷史紀錄（{resolved.length}）
              </h5>
              <div className="space-y-2">
                {resolved.map(item => (
                  <div key={item.id} className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 text-xs space-y-1">
                    <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                      <span className="text-emerald-700 font-bold">✓ {strings.approvedBadge}</span>
                      <span>{new Date(item.resolvedAt || item.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="font-medium text-zinc-800">Q: {item.query}</p>
                    <p className="text-zinc-600">A: {item.resolvedAnswer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
