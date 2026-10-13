# 艋舺龍山寺多語系 AI 語音導覽系統 (Bangka Lungshan Temple Multilingual AI Tour Guide)

🌐 **線上公開網頁版（手機直接開啟測試）**：  
👉 [https://fruit8428.github.io/lungshan-temple-ai-guide/](https://fruit8428.github.io/lungshan-temple-ai-guide/)

📂 **GitHub 開源儲存庫**：  
👉 [https://github.com/fruit8428/lungshan-temple-ai-guide](https://github.com/fruit8428/lungshan-temple-ai-guide)

---
1. **`gemini-code-1791858700624.md` (skill.md)**：廟宇 AI 語音導覽系統核心架構指南（RAG 雙層分流 + Human-in-the-Loop 飛輪 + 多語系自動偵測）。
2. **`gemini-code-1791858777441.md`**：艋舺龍山寺歷史背景、建議參拜順序（龍門進、虎門出）與 4 大前端按鍵式常見問題（文字解答 + TTS 語音腳本）。

---

## 🌟 核心架構特點與實作亮點

### 1. 前端多語系自動偵測與按鈕 Payload 驅動 (Skill.md 第 1 節)
- **自動偵測**：系統載入時透過 `navigator.language` 自動識別信眾手機語系（繁體中文 `zh-TW`、英文 `en`、日文 `ja`、韓文 `ko`）。
- **零人工設定**：語系自動套用，亦可隨時於頂部切換。
- **Payload 代碼機制**：按鍵不傳遞冗長文字，而是傳送標準 Action 代碼（如 `{"action": "guide_draw_fortune", "lang": "ja"}`），大幅節省傳輸量與延遲。

### 2. 雙層分流路由 (Backend Routing - Skill.md 第 2 節)
- **⚡ 90% 常見問題（命中知識庫）**：
  - 涵蓋 4 大常見核心按鈕（開放時間與交通、香火規範、月老紅線、抽籤解籤）以及參拜五步驟。
  - 直接回傳預錄文字與自然 TTS 語音腳本。
  - **極低延遲（<0.5 秒，實測 <20ms）**、**零 LLM 推論成本 ($0.00)**。
- **🧠 10% 複雜問題（未命中知識庫）**：
  - 由「AI 智慧解說員」進行即時推論與語音答覆（如求考運文昌帝君、求健康華陀仙師、求財運關聖帝君等特殊問答）。
  - 若偵測為低信心或敏感事項（如寺務爭議、私人隱私），回覆委婉說明，並自動標記為「待處理 (Pending)」，推送至人工介入審核。

### 3. 人工介入飛輪 (Human-in-the-Loop via n8n - Skill.md 第 3 節)
- **待處理問題自動收錄**：信眾提問若未命中或信心不足，自動沉澱至 `server/data/pending_questions.json`。
- **廟方管理後台 (HITL Modal)**：廟方管理人員可即時檢視信眾疑問，輸入官方標準解答。
- **雙向 Webhook 同調**：提供 `POST /api/webhook/n8n` 與 `POST /api/admin/resolve`。核准後自動將新 QA 寫入 `dynamic_faqs.json`，**直接擴充 90% 的即時快取知識庫**！

### 4. 成本優化與語音引擎 (Skill.md 第 4 節)
- 90% 流量皆為靜態/快取語音腳本，相較全端到端模型**節省 85% 以上推論成本**。
- 語音播放整合 Web Speech Synthesis API 與動態聲波可視化動畫（Waveform Visualizer），並支援 0.85x ~ 1.2x 語速調節。

---

## 🏛️ 龍山寺文化與導覽功能 (Document 2 實作)

1. **歷史沿革故事**：
   - 清乾隆三年（1738 年）創建歷史。
   - 泉州晉江安海龍山寺迎請觀世音菩薩分靈緣由。
   - 2018 年升格國定古蹟與百餘尊佛道融合神明信仰。
2. **建議參拜順序（五步導覽，龍門進、虎門出）**：
   - **步驟 1**：從右側「龍門」進入（跨門檻、迎福祥瑞）。
   - **步驟 2**：正殿禮拜觀世音菩薩、文殊菩薩、普賢菩薩。
   - **步驟 3**：轉身面向天井天空朝拜天公（玉皇大帝）。
   - **步驟 4**：後殿殿廳依序參拜（天上聖母 ➔ 文昌帝君 ➔ 華陀廳 ➔ 關聖帝君 ➔ 月老廳 ➔ 開山廳）。
   - **步驟 5**：從左側「虎門」離開（化險為夷、消災解厄）。
3. **四大核心快速提問按鈕（文字解答 + TTS 語音）**：
   - 🔘 按鈕 1：【開放時間與交通方式】(`guide_opening_hours`)
   - 🔘 按鈕 2：【來拜拜需要自己準備香嗎？】(`guide_incense_rules`)
   - 🔘 按鈕 3：【月老怎麼拜？紅線怎麼求？】(`guide_yue_lao`)
   - 🔘 按鈕 4：【如何求籤與解籤？】(`guide_draw_fortune`)

---

## 🚀 快速啟動與開發指南

### 1. 安裝依賴
```bash
npm install
```

### 2. 本地開發環境
```bash
# 同時啟動 Vite 前端 (http://localhost:5173) 與 Express 後端 (http://localhost:3001)
npm run dev
```

### 3. 編譯與生產環境執行
```bash
# 建置前端靜態資源
npm run build

# 啟動生產伺服器 (整合提供 API 與前端頁面)
npm start
```
開啟瀏覽器訪問：`http://localhost:3001`

---

## 📡 API 路由規範 (REST Endpoints)

| 方法 | 路徑 | 說明 | 關鍵參數 |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/route` | **雙層分流核心路由** | `{ action, query, lang }` |
| `GET` | `/api/faqs` | 獲取常見問題清單 | `?lang=zh-TW\|en\|ja\|ko` |
| `GET` | `/api/guide/history` | 獲取寺廟歷史背景 | `?lang=zh-TW\|en\|ja\|ko` |
| `GET` | `/api/guide/route` | 獲取 5 步參拜路線 | `?lang=zh-TW\|en\|ja\|ko` |
| `GET` | `/api/admin/pending` | 獲取待處理問題 (HITL) | - |
| `POST` | `/api/admin/resolve` | 廟方審核並寫入知識庫 | `{ id, answer, title, lang }` |
| `POST` | `/api/webhook/n8n` | n8n 自動化雙向 Webhook | `{ action, query, answer }` |
