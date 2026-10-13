import React from 'react';
import { Cpu, Zap, Bot, ArrowRight, Sliders, CheckCircle2, ShieldAlert, DollarSign, X } from 'lucide-react';

export default function ArchitectureInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-temple-parchment rounded-2xl shadow-2xl border-2 border-temple-gold overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-temple-charcoal px-5 py-4 text-white border-b border-temple-gold/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-amber-50">
                廟宇 AI 語音導覽系統架構 (Skill.md Specification)
              </h3>
              <p className="text-[11px] text-zinc-300 font-sans mt-0.5">
                RAG 檢索增強生成 + Human-in-the-Loop (n8n) 雙層分流系統
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-zinc-800">
          {/* Architecture Flow Diagram */}
          <div className="bg-zinc-900 text-zinc-200 p-4 rounded-xl border border-zinc-700 font-mono text-[11px] space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center space-x-1.5">
              <span>🔀 雙層分流架構流程圖 (Two-Tier Routing Flowchart)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                <span className="text-blue-300 font-bold block mb-1">1. 前端多語系自動偵測</span>
                <p className="text-[10px] text-zinc-400">
                  • 依 `navigator.language` 自動配適<br />
                  • 點擊傳遞 Payload 代碼：<br />
                  <code className="text-amber-300">{"{action:'...', lang:'ja'}"}</code>
                </p>
              </div>

              <div className="bg-emerald-950/70 p-3 rounded-lg border border-emerald-700/60">
                <span className="text-emerald-300 font-bold block mb-1">2. 90% 常見問題（命中）</span>
                <p className="text-[10px] text-zinc-300">
                  • 命中向量/快取知識庫<br />
                  • 極低延遲（&lt;0.5秒）<br />
                  • 零 LLM 推論成本 ($0.00)
                </p>
              </div>

              <div className="bg-indigo-950/70 p-3 rounded-lg border border-indigo-700/60">
                <span className="text-indigo-300 font-bold block mb-1">3. 10% 複雜問題（未命中）</span>
                <p className="text-[10px] text-zinc-300">
                  • GPT-realtime / Gemini 即時推論<br />
                  • 低信心/敏感問題委婉回覆<br />
                  • 標記「待處理」推至 n8n 飛輪
                </p>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-2xs">
              <div className="flex items-center space-x-2 text-temple-red font-bold text-xs mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. 前端介面與多語系切換</span>
              </div>
              <ul className="space-y-1 text-zinc-600 pl-5 list-disc text-[11px]">
                <li><strong>自動偵測</strong>：`navigator.language` 偵測信眾手機語系。</li>
                <li><strong>動態渲染</strong>：支援繁中、英文、日文、韓文，零人工設定。</li>
                <li><strong>Payload 傳遞</strong>：傳送 action 代碼而非長文字，節省傳輸量。</li>
              </ul>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-2xs">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs mb-1.5">
                <Zap className="w-4 h-4" />
                <span>2. 後端分流邏輯 (Backend Routing)</span>
              </div>
              <ul className="space-y-1 text-zinc-600 pl-5 list-disc text-[11px]">
                <li><strong>90% 常見問題</strong>：標準化問題（參拜順序、月老求紅線等）直接回傳快取文字與音訊。</li>
                <li><strong>10% 複雜問題</strong>：轉交 AI 進行即時推理與問答。</li>
                <li><strong>敏感問題防護</strong>：自動轉交服務處審核。</li>
              </ul>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-2xs">
              <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs mb-1.5">
                <Sliders className="w-4 h-4" />
                <span>3. 人工介入飛輪 (HITL via n8n)</span>
              </div>
              <ul className="space-y-1 text-zinc-600 pl-5 list-disc text-[11px]">
                <li>透過 n8n 自動化工作流將待處理問題推播至管理群組。</li>
                <li>廟方人員填寫標準回覆後，Webhook 自動寫入知識庫。</li>
                <li>持續擴充 90% 的常見問題庫，使 AI 越用越聰明、成本越低。</li>
              </ul>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-zinc-200 shadow-2xs">
              <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs mb-1.5">
                <DollarSign className="w-4 h-4" />
                <span>4. 成本優化與效益分析</span>
              </div>
              <ul className="space-y-1 text-zinc-600 pl-5 list-disc text-[11px]">
                <li>90% 常見問題預先生成/快取，零 Token 消耗。</li>
                <li>僅 10% 走即時推論，相比全端到端模型節省 <strong>85%+ 成本</strong>。</li>
                <li>結合 Web Speech Synthesis 與快取音訊，維持極高穩定性。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
