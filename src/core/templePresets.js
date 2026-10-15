/**
 * @fileoverview Built-in Multi-Tenant Temple Presets (merged with live Supabase data)
 * Ensures that when ?temple=hesheng is opened, 100% of the page (History, FAQs, Route Steps, Deities, Footer)
 * is tailored to Wugu Hesheng Temple (五股賀聖宮) with zero references to Lungshan Temple.
 */

export const HESHENG_PRESET = {
  history: {
    "zh-TW": {
      templeSlug: "hesheng",
      gothruUrl: "https://tourmkr.com/F1vWDe52rp",
      badge: "五股信仰中心 • 北極玄天上帝",
      templeName: "五股賀聖宮",
      heroIntro:
        "五股賀聖宮主祀北極玄天上帝（帝爺公），建築巍峨壯麗、雕樑畫棟，為北台灣重要道教信仰聖地。本系統依據香客手機語系自動切換中、英、日、韓多國語音導覽與 360° 實景探索。",
      addressInfo: "地址：新北市五股區新五路三段 1 號 • 開放時間：每日 06:00 - 21:30",
      title: "五股賀聖宮 建宮沿革與建築藝術",
      subtitle: "主祀北極玄天上帝 • 新北市五股區宗教文化地標",
      content: `五股賀聖宮座落於新北市五股區新五路三段 1 號，主祀「北極玄天上帝」（民間尊稱帝爺公、上帝公），靈源脈絡深厚，香火鼎盛。

【建宮精神與信仰核心】
賀聖宮秉持玄天上帝「慈悲救世、鎮煞除魔、濟弱扶傾」之精神，長年舉辦祈安禮斗、公益慈善與文化推廣活動，是五股及大台北地區信眾祈求闔家平安、事業亨通的重要心靈寄託。

【建築格局與藝術特色】
整座宮廟採傳統南式結合現代宏偉殿堂規制興建，共分多層殿宇：
• 一樓正門（三川殿）：精雕青斗石獅、九龍石柱與立體石雕故事牆，氣勢恢宏。
• 一樓大堂（玄天上帝主殿）：挑高金碧輝煌的藻井與雕花神龕，中央主祀北極玄天上帝，同祀註生娘娘與福德正神（土地公）。
• 高層殿宇：奉祀天上聖母、觀世音菩薩、關聖帝君、文昌帝君、太歲星君與玉皇上帝（凌霄寶殿），神威顯赫、庇佑十方。`,
      audioScript:
        "歡迎蒞臨新北市五股賀聖宮！賀聖宮主祀北極玄天上帝，也就是民間尊稱的帝爺公。整座廟宇建築巍峨壯麗，融合精湛的石雕、木雕與彩繪工藝。一樓大堂主祀北極玄天上帝，同祀註生娘娘與福德正神，護佑信眾消災解厄、闔家平安、事業興隆。現在就讓我們從正門右側的龍門開始參拜吧！"
    },
    en: {
      templeSlug: "hesheng",
      gothruUrl: "https://tourmkr.com/F1vWDe52rp",
      badge: "Wugu Faith Center • Xuantian Shangdi",
      templeName: "Wugu Hesheng Temple",
      heroIntro:
        "Wugu Hesheng Temple enshrines Beiji Xuantian Shangdi (Supreme Emperor of the Dark Heaven). Automatically adapted to your phone's language with instant voice tours and 360° virtual exploration.",
      addressInfo: "Address: No. 1, Sec. 3, Xinwu Rd., Wugu Dist., New Taipei City • Open Daily 06:00 - 21:30",
      title: "History & Architecture of Wugu Hesheng Temple",
      subtitle: "Enshrining Beiji Xuantian Shangdi • Cultural Landmark of New Taipei City",
      content: `Located at No. 1, Sec. 3, Xinwu Rd., Wugu District, New Taipei City, Wugu Hesheng Temple is a magnificent Taoist sanctuary dedicated to Beiji Xuantian Shangdi (the Supreme Emperor of the Dark Heaven).

[Spiritual Heritage]
Guided by Xuantian Shangdi's compassion and protective power, Hesheng Temple serves as a vital spiritual and charitable center in Northern Taiwan, blessing visitors with peace, health, and career prosperity.

[Architectural Highlights]
• Main Plaza & Gate: Guarded by majestic stone lions and intricately carved dragon columns.
• 1F Main Hall: Features a gilded caisson ceiling enshrining Beiji Xuantian Shangdi at the center, flanked by Zhusheng Niangniang (Goddess of Birth) and Fude Zhengshen (Earth God).`,
      audioScript:
        "Welcome to Wugu Hesheng Temple in New Taipei City! Dedicated to Beiji Xuantian Shangdi, this magnificent temple showcases exquisite stone and wood carvings. You may tap any hotspot in the 360-degree view or buttons below to enjoy our multilingual audio guide!"
    },
    ja: {
      templeSlug: "hesheng",
      gothruUrl: "https://tourmkr.com/F1vWDe52rp",
      badge: "五股の信仰中心 • 北極玄天上帝",
      templeName: "五股賀聖宮",
      heroIntro:
        "五股賀聖宮は北極玄天上帝（帝爺公）を主神として祀る壮麗な道教寺院です。スマートフォンの言語を自動判別し、多言語音声ガイドと360°パノラマをご案内します。",
      addressInfo: "所在地：新北市五股区新五路三段1号 • 開門時間：毎日 06:00 - 21:30",
      title: "五股賀聖宮の歴史と建築芸術",
      subtitle: "北極玄天上帝を祀る新北市五股の代表的寺院",
      content: `新北市五股区に位置する五股賀聖宮は、「北極玄天上帝（帝爺公）」を主神として祀る壮麗な道教寺院です。

【建築と信仰の魅力】
正面広場には威厳ある石獅子と精緻な龍柱が立ち並び、一階本殿（大堂）には北極玄天上帝を中心に、註生娘娘（安産・子宝の神）と福徳正神（土地公・財運の神）が祀られています。厄除け・家内安全・商売繁盛のご利益で広く信仰されています。`,
      audioScript:
        "新北市の五股賀聖宮へようこそ！北極玄天上帝を主神とし、精緻な石彫や木彫が施された壮麗な寺院です。パノラマ内のスポットや下のボタンをタップして音声解説をお聞きください！"
    },
    ko: {
      templeSlug: "hesheng",
      gothruUrl: "https://tourmkr.com/F1vWDe52rp",
      badge: "우구 신앙의 중심 • 북극현천상제",
      templeName: "우구 허성궁",
      heroIntro:
        "우구 허성궁은 북극현천상제를 주신으로 모신 웅장한 도교 사원입니다. 스마트폰 언어 설정에 맞춰 다국어 음성 가이드와 360° 파노라마 투어를 제공합니다.",
      addressInfo: "주소: 신베이시 우구구 신우로 3단 1호 • 운영 시간: 매일 06:00 - 21:30",
      title: "우구 허성궁 연혁 및 건축 예술",
      subtitle: "북극현천상제를 모신 신베이시 대표 성지",
      content: `신베이시 우구구에 위치한 우구 허성궁은 '북극현천상제(제야공)'를 주신으로 모신 웅장한 도교 사원입니다.

【건축 및 신앙 특징】
정문 광장에는 위엄 있는 석사자와 정교한 용기둥이 자리하고 있으며, 1층 대당 본전에는 북극현천상제를 중심으로 주생낭랑(출산·자녀)과 복덕정신(토지공·재물)을 모시고 있습니다.`,
      audioScript:
        "신베이시 우구 허성궁에 오신 것을 환영합니다! 북극현천상제를 모신 이 웅장한 사원은 정교한 석조와 목조 예술을 자랑합니다. 파노라마 속 핫스팟이나 아래 버튼을 눌러 음성 가이드를 들어보세요!"
    }
  },

  visitingSteps: {
    "zh-TW": [
      {
        step: 1,
        id: "hs_step_1",
        name: "龍門入場（右進左出）",
        location: "一樓正門右側（龍門）",
        rule: "面對廟門由右側龍門進入，跨過門檻不踩踏",
        deityFocus: "三川殿門神與守護石獅",
        description:
          "參拜賀聖宮請遵循傳統宮廟禮儀「龍門進、虎門出」。面對正門右手邊為「龍門」，從龍門進入象徵迎祥納福；跨過門檻時請抬腳跨過，切勿直接踩踏門檻。",
        audioScript:
          "步驟一：請從面對賀聖宮正門右手邊的「龍門」進入。從龍門入場代表迎祥納福，記得跨過門檻不要踩在上面喔。"
      },
      {
        step: 2,
        id: "hs_step_2",
        name: "敬拜天公（玉皇上帝）",
        location: "一樓前殿向外朝天公爐",
        rule: "面向廟外開闊天空，雙手合十誠心三拜",
        deityFocus: "玉皇上帝（天公）",
        description:
          "步入殿內後，先轉身面向廟門外開闊的天空與天公爐，向統御萬靈的最高神祇「玉皇上帝（天公）」雙手合十行三拜禮，稟報今日前來五股賀聖宮參拜祈福。",
        audioScript:
          "步驟二：進廟後請先面向廟外天空的天公爐，向玉皇大帝雙手合十誠心三拜，稟報您的姓名與今日前來參拜的心意。"
      },
      {
        step: 3,
        id: "hs_step_3",
        name: "一樓大堂主神：北極玄天上帝",
        location: "一樓大堂正殿中央",
        rule: "向主神帝爺公稟明姓名、生辰、住址與祈求願望",
        deityFocus: "北極玄天上帝（帝爺公）",
        description:
          "轉身面向一樓大堂中央主殿，參拜主神「北極玄天上帝（帝爺公）」。帝爺公腳踏龜蛇、威靈顯赫，能鎮煞除魔、消災解厄、護佑元辰光彩與事業順遂。",
        audioScript:
          "步驟三：來到一樓大堂正中央，參拜主神北極玄天上帝。請在心中清楚稟告您的姓名、生日、住址與心願，祈求帝爺公保佑平安順遂。"
      },
      {
        step: 4,
        id: "hs_step_4",
        name: "同祀神明：註生娘娘與福德正神",
        location: "一樓大堂左右兩側神龕",
        rule: "先拜右側（龍邊）註生娘娘，再拜左側（虎邊）福德正神",
        deityFocus: "註生娘娘（求子良緣）、福德正神（財運土地）",
        description:
          "參拜完中央主神後，依「由右至左（龍邊至虎邊）」順序，先參拜殿內龍邊的「註生娘娘」（祈求子嗣、幼兒健康與良緣），再參拜虎邊的「福德正神（土地公）」（祈求財源廣進、事業守成）。",
        audioScript:
          "步驟四：接著參拜大堂兩側神明，先拜龍邊掌管子嗣與良緣的註生娘娘，再拜虎邊掌管財庫與平安的福德正神土地公。"
      },
      {
        step: 5,
        id: "hs_step_5",
        name: "各樓層諸神參拜與虎門圓滿賦歸",
        location: "樓上諸殿及一樓左側（虎門）出口",
        rule: "參拜完各殿神明後，由面對廟門左側「虎門」離開",
        deityFocus: "文昌帝君、關聖帝君、觀音菩薩、太歲星君",
        description:
          "您可繼續搭乘電梯或循樓梯向上參拜觀音菩薩、文昌帝君（考運）、關聖帝君（事業）與凌霄寶殿。全數參拜圓滿後，請從一樓左側的「虎門」步出廟門，象徵脫離虎口、消災納福！",
        audioScript:
          "步驟五：完成各殿參拜後，請從一樓左手邊的「虎門」離開，象徵脫離虎口、消災解厄，祝您闔家平安、萬事如意！"
      }
    ],
    en: [
      {
        step: 1,
        id: "hs_step_1",
        name: "Enter via Dragon Gate (Right Side)",
        location: "1F Main Gate Right Entrance",
        rule: "Enter from the right gate and step over the threshold",
        deityFocus: "Door Gods & Stone Lion Guardians",
        description:
          "Follow traditional etiquette: 'Enter through the Dragon Gate (right), exit through the Tiger Gate (left)'. Step over the raised threshold without treading on it.",
        audioScript:
          "Step 1:Facing the temple, please enter through the Dragon Gate on the right side to welcome good fortune."
      },
      {
        step: 2,
        id: "hs_step_2",
        name: "Salute the Jade Emperor (Tian Gong)",
        location: "1F Front Hall facing outward toward the sky",
        rule: "Face the open sky and bow three times with palms joined",
        deityFocus: "Jade Emperor (Supreme Ruler of Heaven)",
        description:
          "Turn toward the open sky at the front censer and bow three times to the Jade Emperor, expressing gratitude and announcing your visit.",
        audioScript:
          "Step 2: Face outward toward the sky censer and bow three times with palms joined to pay respects to the Jade Emperor."
      },
      {
        step: 3,
        id: "hs_step_3",
        name: "Worship Main Deity: Beiji Xuantian Shangdi",
        location: "1F Main Hall Center Altar",
        rule: "Silently state your name, birthday, address, and wishes",
        deityFocus: "Beiji Xuantian Shangdi (Supreme Emperor of the Dark Heaven)",
        description:
          "Face the central altar of the 1F Main Hall to worship Beiji Xuantian Shangdi, praying for protection, health, peace, and career success.",
        audioScript:
          "Step 3: At the center of the Main Hall, join your palms before Beiji Xuantian Shangdi and share your name and wishes for peace and success."
      },
      {
        step: 4,
        id: "hs_step_4",
        name: "Worship Zhusheng Niangniang & Fude Zhengshen",
        location: "1F Main Hall Left & Right Altars",
        rule: "Worship Dragon Side first, then Tiger Side",
        deityFocus: "Zhusheng Niangniang (Children/Family) & Fude Zhengshen (Wealth/Earth God)",
        description:
          "Pay respects to Zhusheng Niangniang on the Dragon side for family and children's health, followed by Fude Zhengshen (Earth God) on the Tiger side for prosperity.",
        audioScript:
          "Step 4: Next, pay respects to Zhusheng Niangniang for family blessings and Fude Zhengshen the Earth God for financial prosperity."
      },
      {
        step: 5,
        id: "hs_step_5",
        name: "Upper Halls & Exit via Tiger Gate",
        location: "Upper Floors & 1F Left Exit (Tiger Gate)",
        rule: "Exit via the left Tiger Gate to ward off misfortune",
        deityFocus: "Guanyin, Wenchang, Guan Gong & Taisui",
        description:
          "After visiting the upper halls, exit through the Tiger Gate on the left side of the 1F entrance, symbolizing leaving all bad luck behind.",
        audioScript:
          "Step 5: When finished, exit through the Tiger Gate on the left to leave misfortune behind. Wishing you peace and prosperity!"
      }
    ]
  },

  faqs: [
    {
      id: "hs_opening_traffic",
      action: "guide_opening_hours",
      category: "general",
      keywords: [
        "開放時間", "幾點開", "幾點關", "交通", "怎麼去", "地址", "停車", "公車", "五股", "新五路",
        "opening hours", "open", "close", "address", "location", "parking", "bus",
        "開門時間", "アクセス", "住所", "운영 시간", "가는 법", "주소"
      ],
      title: {
        "zh-TW": "開放時間與交通停車資訊",
        en: "Opening Hours, Address & Parking",
        ja: "開門時間・アクセス・駐車場案内",
        ko: "운영 시간 및 교통·주차 안내"
      },
      shortDesc: {
        "zh-TW": "每日 06:00 - 21:30 • 新北市五股區新五路三段 1 號",
        en: "Daily 06:00 - 21:30 • No. 1, Sec. 3, Xinwu Rd., Wugu Dist.",
        ja: "毎日 06:00〜21:30 • 新北市五股区新五路三段1号",
        ko: "매일 06:00 - 21:30 • 신베이시 우구구 신우로 3단 1호"
      },
      textContent: {
        "zh-TW":
          "五股賀聖宮開放時間為每日早上 06:00 至晚上 21:30。\n\n• 【宮廟地址】：新北市五股區新五路三段 1 號（近洲后路、新五路交叉口）。\n• 【自行開車】：可經由國道一號五股交流道或台 64、台 65 線快速道路下五股，沿新五路三段即達，周邊設有信眾參拜停車空間。\n• 【大眾運輸】：可搭乘蘆洲／五股區公車路線至「賀聖宮（或洲仔站）」步行抵達。",
        en:
          "Wugu Hesheng Temple is open daily from 06:00 AM to 09:30 PM (21:30).\n\n• [Address]: No. 1, Sec. 3, Xinwu Rd., Wugu Dist., New Taipei City.\n• [By Car]: Easily accessible via National Freeway No. 1 (Wugu Interchange) or Provincial Highways 64 & 65.",
        ja:
          "五股賀聖宮の開門時間は毎日朝 06:00 から夜 21:30 までです。\n\n• 【所在地】：新北市五股区新五路三段1号。",
        ko:
          "우구 허성궁의 개방 시간은 매일 오전 06:00부터 밤 21:30까지입니다.\n\n• [주소]: 신베이시 우구구 신우로 3단 1호."
      },
      audioScript: {
        "zh-TW":
          "您好！五股賀聖宮每天早上六點到晚上九點半開放。地址在新北市五股區新五路三段 1 號，從五股交流道或台 64、65 快速道路過來都非常方便喔！",
        en:
          "Hello! Wugu Hesheng Temple is open daily from 6:00 AM to 9:30 PM, located at No. 1, Section 3, Xinwu Road in Wugu District, New Taipei City!",
        ja:
          "こんにちは！五股賀聖宮は毎日朝6時から夜9時半まで開門しています。所在地は新北市五股区新五路三段1号です。",
        ko:
          "안녕하세요! 우구 허성궁은 매일 아침 6시부터 밤 9시 30분까지 운영하며, 주소는 신베이시 우구구 신우로 3단 1호입니다."
      }
    },
    {
      id: "hs_xuantian_guide",
      action: "guide_incense_rules",
      category: "worship",
      keywords: [
        "玄天上帝", "帝爺公", "上帝公", "主神", "保佑", "什麼神", "香", "供品", "怎麼拜",
        "xuantian", "main deity", "incense", "offerings", "pray",
        "玄天上帝", "ご本尊", "お供え", "현천상제", "주신", "참배"
      ],
      title: {
        "zh-TW": "主神「北極玄天上帝」怎麼拜？保佑什麼？",
        en: "How to Worship Main Deity Beiji Xuantian Shangdi?",
        ja: "主神「北極玄天上帝（帝爺公）」の参拝方法とご利益は？",
        ko: "주신 '북극현천상제' 참배 방법과 수호 공덕은?"
      },
      shortDesc: {
        "zh-TW": "鎮煞除魔 • 消災解厄 • 護佑事業財運與元辰光彩",
        en: "Wards off evil • Blesses health, peace & career success",
        ja: "厄除け・開運 • 家内安全と商売繁盛の守護神",
        ko: "액운 소멸 • 건강과 가문 평안 및 사업 번창 수호"
      },
      textContent: {
        "zh-TW":
          "五股賀聖宮一樓大堂主祀「北極玄天上帝」（民間尊稱帝爺公、上帝公）：\n1. 【神明職司】：玄天上帝統領北方玄武星宿，腳踏龜蛇，法力無邊，最擅長「鎮煞除魔、消災解厄、斬斷小人是非」，並護佑信眾事業興隆、財源廣進與身體健康。\n2. 【參拜與供品】：可準備鮮花、素果（如蘋果代表平安、鳳梨代表旺來、橘子代表大吉）、壽麵或糕餅甜點，雙手合十誠心稟報姓名、農曆生日、住址與祈求事項即可。",
        en:
          "The 1F Main Hall enshrines Beiji Xuantian Shangdi (Supreme Emperor of the Dark Heaven):\n1. [Blessings]: Revered for warding off negative energy, dispelling misfortune, protecting health, and boosting career and business prosperity.\n2. [Offerings]: Fresh flowers, fruits (apples for peace, pineapples for prosperity, oranges for luck), or pastries are ideal offerings.",
        ja:
          "一階大堂のご本尊「北極玄天上帝（帝爺公）」は、北方の守護神であり、強力な厄除け・悪縁切り・健康長寿・商売繁盛の神様として篤く信仰されています。生花や果物をお供えし、お名前と願い事を誠心誠意お伝えください。",
        ko:
          "1층 대당의 주신 '북극현천상제(제야공)'는 액운과 사기를 물리치고 건강과 사업 번창, 재물운을 지켜주시는 강력한 수호신입니다. 과일이나 꽃을 올리고 이름과 소원을 정성껏 아뢰어 보세요."
      },
      audioScript: {
        "zh-TW":
          "賀聖宮的主神是北極玄天上帝，也就是大家熟悉的帝爺公！帝爺公最擅長消災解厄、鎮煞除魔、防小人，並保佑事業興隆與身體健康。參拜時可以準備鮮花素果，誠心向帝爺公稟報您的姓名與心願喔！",
        en:
          "Our main deity is Beiji Xuantian Shangdi! He is revered for dispelling misfortune, protecting health, and blessing your career and business. Simply state your name and wishes with a sincere heart!",
        ja:
          "賀聖宮のご本尊は北極玄天上帝です！厄除けや健康守護、商売繁盛に絶大なご利益があります。心を込めてお名前と願い事をお伝えしましょう。",
        ko:
          "허성궁의 주신은 북극현천상제이십니다! 액운을 물리치고 건강과 사업 번창을 도와주시니 정성껏 이름과 소원을 말씀드려 보세요."
      }
    },
    {
      id: "hs_taisui_lights",
      action: "guide_yue_lao",
      category: "worship",
      keywords: [
        "點燈", "光明燈", "太歲", "安太歲", "財神燈", "文昌燈", "元辰燈", "祈安", "法會",
        "light", "lantern", "taisui", "blessing", "lamp",
        "光明燈", "安太歳", "祈願", "광명등", "태세", "기원"
      ],
      title: {
        "zh-TW": "如何辦理安太歲、點光明燈與祈福法會？",
        en: "How to Register for Blessing Lamps & Taisui Protection?",
        ja: "安太歳・光明燈（祈願ランタン）の申し込み方法は？",
        ko: "안태세 및 광명등(소원등) 신청 방법은?"
      },
      shortDesc: {
        "zh-TW": "一樓服務台辦理 • 安太歲／光明燈／文昌燈／財利燈",
        en: "Available at 1F Service Desk • Peace, Career & Wisdom Lamps",
        ja: "1階案内カウンターにて受付 • 厄除け・学業・財運ランタン",
        ko: "1층 안내데스크 접수 • 평안·학업·재물 기원등"
      },
      textContent: {
        "zh-TW":
          "五股賀聖宮提供多項年度祈福點燈與安太歲服務：\n• 【服務項目】：太歲燈（犯太歲生肖消災解厄）、光明燈（元辰光彩、前途光明）、文昌燈（考運亨通、金榜題名）、財利燈（事業順利、財源廣進）。\n• 【辦理方式】：請攜帶祈福者之「姓名、農曆出生年月日、吉時與現居地址」，親洽一樓大堂服務台由專人為您登記辦理。",
        en:
          "Wugu Hesheng Temple offers annual Blessing Lamps (Taisui Lamp for zodiac protection, Bright Lamp for peace, Wenchang Lamp for exams, and Wealth Lamp for business). Please visit the 1F Service Counter with your name and date of birth to register.",
        ja:
          "五股賀聖宮では、安太歳（厄年のお祓い）、光明燈（家内安全）、文昌燈（合格祈願）、財利燈（金運・商売繁盛）の点灯を受け付けております。1階サービスカウンターにてお申し込みいただけます。",
        ko:
          "우구 허성궁에서는 안태세(액막이), 광명등(평안), 문창등(시험 합격), 재리등(재물운) 점등 서비스를 제공합니다. 1층 안내데스크에서 신청하실 수 있습니다."
      },
      audioScript: {
        "zh-TW":
          "如果您想點光明燈、安太歲、文昌燈或財利燈，只要準備好祈福者的姓名、農曆生日與住址，直接到一樓大堂的服務台，就會有服務人員親切為您辦理喔！",
        en:
          "To register for a Blessing Lamp or Taisui protection, simply bring your name and birth date to the 1F Service Counter, where our staff will gladly assist you!",
        ja:
          "光明燈や安太歳のお申し込みは、1階大堂の案内カウンターにてスタッフが丁寧にご案内いたします。",
        ko:
          "광명등이나 안태세 신청을 원하시면 1층 대당 안내데스크에 방문해 주세요. 직원이 친절히 안내해 드립니다."
      }
    },
    {
      id: "hs_draw_fortune",
      action: "guide_draw_fortune",
      category: "worship",
      keywords: [
        "求籤", "抽籤", "解籤", "籤詩", "擲筊", "聖筊", "笑筊", "陰筊", "運勢",
        "fortune", "poem", "divination", "blocks", "jiaobei",
        "おみくじ", "木札", "ポエ", "점괘", "즈이자오", "성교"
      ],
      title: {
        "zh-TW": "在賀聖宮如何向帝爺公求籤與擲筊？",
        en: "How to Cast Moon Blocks & Draw Fortune Poems?",
        ja: "賀聖宮でのおみくじ（求籤）と木札（ポエ）の手順は？",
        ko: "허성궁에서 점괘 뽑는 법과 나무패(즈이자오) 예절은?"
      },
      shortDesc: {
        "zh-TW": "稟明單一問題 • 擲一聖筊抽籤 • 連續三聖筊確認籤詩",
        en: "Ask one clear question • Confirm stick with 3 Sheng-Jiao",
        ja: "一問一籤 • 3回連続の聖筊でおみくじ番号を確定",
        ko: "한 가지 질문만 • 3회 연속 성교로 점괘 번호 확정"
      },
      textContent: {
        "zh-TW":
          "向北極玄天上帝（帝爺公）請示求籤的標準流程：\n1. 【誠心稟報】：先完成各殿參拜，回到一樓大堂主殿前，稟明姓名、生辰、住址與「想要請示的單一具體問題（一事一問）」。\n2. 【請示准籤】：拿起木筊擲出「一聖筊（一平一凸）」獲得帝爺公允准後，從籤筒抽出一支籤。\n3. 【三筊定籤】：報出籤號，再次擲筊詢問帝爺公是否為此支籤。若連續擲出「三個聖筊」，即可至籤詩櫃領取對應籤詩；若為笑筊或陰筊，請將竹籤放回重新抽取。",
        en:
          "How to draw a fortune poem from Beiji Xuantian Shangdi:\n1. State your name, birthday, address, and ONE specific question.\n2. Toss 1 Sheng-Jiao (one flat, one round) for permission, then draw a bamboo stick.\n3. Toss 3 consecutive Sheng-Jiao to confirm the number and take the matching poem sheet.",
        ja:
          "北極玄天上帝からおみくじを授かる手順：\n1. 氏名・生年月日・住所と「1つの具体的な質問」を伝えます。\n2. 木札（ポエ）を投げて聖筊が1回出たら、筒から棒を1本引きます。\n3. その番号で正しいか再度木札を投げ、3回連続で聖筊が出れば確定です。",
        ko:
          "북극현천상제께 점괘를 받는 순서:\n1. 이름, 생년월일, 주소와 구체적인 질문 한 가지를 아룁니다.\n2. 나무패를 던져 1번 성교가 나오면 대나무 산가지 하나를 뽑습니다.\n3. 다시 나무패를 던져 연속 3회 성교가 나오면 해당 번호의 점괘 종이를 가져오시면 됩니다."
      },
      audioScript: {
        "zh-TW":
          "向帝爺公求籤時，請先稟告您的姓名、生日、住址和一個具體問題，擲出一個聖筊後抽出一支籤。接著詢問帝爺公是不是這支籤，連續擲出三個聖筊就可以領取籤詩囉！",
        en:
          "When drawing a fortune stick before Xuantian Shangdi, state your name and one clear question. After getting one Sheng-Jiao, draw a stick and confirm it with three consecutive Sheng-Jiao!",
        ja:
          "おみくじを引く際は、お名前と一つの質問を伝え、聖筊が出たら棒を引きます。その後3回連続で聖筊が出れば番号確定です！",
        ko:
          "점괘를 뽑으실 때는 이름과 질문 한 가지를 말씀드리고 성교가 나오면 산가지를 뽑으세요. 이어 연속 세 번 성교가 나오면 확정됩니다!"
      }
    }
  ]
};
