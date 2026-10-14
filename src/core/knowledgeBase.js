/**
 * @fileoverview Bangka Lungshan Temple Authoritative Multilingual Knowledge Base
 * Structured according to Skill Architecture (RAG Dual-Tier + HITL) & Cultural Heritage Guidelines.
 * Languages: Traditional Chinese (zh-TW), English (en), Japanese (ja), Korean (ko)
 */

export const TEMPLE_METADATA = {
  foundedYear: 1738,
  eraName: "清乾隆三年",
  heritageStatus: "國定古蹟 (National Historic Monument)",
  UpgradeYear: 2018,
  openingHours: "06:00 - 22:00",
  interpretHours: "10:00 - 19:00",
  ecoPolicyYear: 2020,
  coordinates: { lat: 25.03716, lng: 121.4999 }
};

export const templeHistory = {
  "zh-TW": {
    title: "艋舺龍山寺 歷史沿革與建築藝術",
    era: "清乾隆三年（西元 1738 年）創建",
    heritage: "文化部指定國定古蹟",
    summary:
      "艋舺龍山寺創建於清乾隆三年（西元 1738 年），是台北地區極具代表性的信仰與文化中心。早期來台開墾的福建泉州三邑（晉江、南安、惠安）先民，因渡海與拓墾環境險惡，特從故鄉泉州晉江安海龍山寺迎請觀世音菩薩分靈來台，祈求合境平安。龍山寺於 2018 年由文化部升格為「國定古蹟」，其宮殿式三進四合院格局、全臺唯一銅鑄蟠龍柱、螺旋藻井及交趾陶剪黏，堪稱一部立體的台灣近代建築史。寺內佛道共祀百餘尊神明，展現台灣多元包容的宗教人文精神。",
    highlights: [
      { label: "創建年代", value: "西元 1738 年（清乾隆三年）" },
      { label: "主祀本尊", value: "觀世音菩薩（佛、道、儒百神共祀）" },
      { label: "古蹟地位", value: "中華民國國定古蹟（2018 年升格）" },
      { label: "建築瑰寶", value: "三川殿青斗石獅、全臺唯一銅鑄龍柱、無釘螺旋藻井" },
      { label: "環保參拜", value: "2020 年起全面停止燒香，雙手合十誠心參拜" }
    ],
    audioScript:
      "歡迎蒞臨國定古蹟艋舺龍山寺！本寺創建於西元 1738 年清乾隆年間，由泉州先民自安海龍山寺迎請觀世音菩薩分靈來台。歷經兩百八十餘年歲月，不僅擁有全台灣唯一的銅鑄龍柱與精雕石獅，更在二戰空襲中締造菩薩金身毫髮無損的傳奇。寺內佛道共奉百餘尊神明，自 2020 年起全面實施環保停香，您只需雙手合十、至誠祈願，必蒙神佛慈悲護佑。"
  },
  "en": {
    title: "Bangka Lungshan Temple: History & Architecture",
    era: "Founded in 1738 (3rd Year of Qianlong Reign, Qing Dynasty)",
    heritage: "Designated National Historic Monument of Taiwan",
    summary:
      "Founded in 1738 by early pioneers from Quanzhou (Jinjiang, Nan'an, and Hui'an) in Fujian, Bangka Lungshan Temple enshrines the sacred spirit of Guanyin Bodhisattva invited from Anhai Lungshan Temple to protect settlers amid treacherous seas and frontier hardships. Elevated to a National Historic Monument in 2018, its three-courtyard palace layout, Taiwan's sole cast-bronze dragon columns, mortise-and-tenon spiral caisson ceilings, and intricate Koji pottery make it a living museum of Taiwanese craftsmanship. Enshrining over 100 Buddhist, Taoist, and folk deities, it exemplifies religious harmony.",
    highlights: [
      { label: "Established", value: "1738 AD (Qing Dynasty)" },
      { label: "Principal Deity", value: "Guanyin Bodhisattva (Over 100 Deities Co-enshrined)" },
      { label: "Heritage Status", value: "National Historic Monument (Elevated 2018)" },
      { label: "Masterpieces", value: "Qingdou Stone Lions, Bronze Dragon Columns, Spiral Caisson Ceiling" },
      { label: "Eco-Worship", value: "Incense-free since 2020; sincere prayer with palms joined" }
    ],
    audioScript:
      "Welcome to Bangka Lungshan Temple, a National Historic Monument of Taiwan! Founded in 1738 by pioneers from Fujian, this sanctuary enshrines Guanyin Bodhisattva along with over a hundred Buddhist and Taoist deities. Admire our Qing Dynasty granite guardian lions, Taiwan's only cast-bronze dragon pillars, and nail-free spiral caisson ceilings. Since 2020, the temple has been completely incense-free. Simply press your palms together with a sincere heart as you explore."
  },
  "ja": {
    title: "艋舺龍山寺（バンカ・リュウサンジ）の歴史と建築美",
    era: "清朝乾隆3年（1738年）創建",
    heritage: "中華民国 国定古跡（国宝級重要文化財）",
    summary:
      "艋舺龍山寺は清朝乾隆3年（1738年）、福建省泉州（晋江・南安・恵安）から台湾へ渡った開拓先民が、故郷の安海龍山寺より観世音菩薩の分霊を奉迎して創建した台北最古の名刹です。2018年に国の最高文化財である「国定古跡」に昇格しました。三川殿・正殿・後殿からなる伝統的な三進四合院の宮殿建築には、台湾唯一の鋳銅製龍柱、釘を一本も使わない螺旋藻井（天井組物）、清代の青斗石獅子など、台湾建築史の粋が集められています。仏教・道教・民間信仰の百尊以上の神仏が共に祀られています。",
    highlights: [
      { label: "創建年代", value: "西暦 1738年（清朝乾隆3年）" },
      { label: "ご本尊", value: "観世音菩薩（仏教・道教の百神合祀）" },
      { label: "文化財指定", value: "中華民国 国定古跡（2018年昇格）" },
      { label: "建築の至宝", value: "青斗石獅子、台湾唯一の鋳銅龍柱、木組み螺旋藻井" },
      { label: "エコ参拝", value: "2020年より線香全面廃止、合掌による清浄参拝" }
    ],
    audioScript:
      "国定古跡・艋舺龍山寺へようこそ！当寺は1738年、福建省泉州からの開拓民が安海龍山寺より観世音菩薩の分霊を迎えて創建した台北最古の名刹です。台湾唯一の鋳銅龍柱や清代の石獅子、精巧な木組み天井など見どころが満載です。寺内には100尊以上の神仏が祀られており、2020年からは環境保護のためお線香を全廃しております。両手を合わせた真心の合掌でお参りください。"
  },
  "ko": {
    title: "멍자 롱산사(용산사) 역사 및 건축 예술",
    era: "청나라 건륭 3년(1738년) 창건",
    heritage: "대만 문화부 지정 국가지정고적",
    summary:
      "멍자 롱산사는 청 건륭 3년(1738년) 푸젠성 취안저우 출신 개척민들이 고향 안하이 롱산사에서 관세음보살의 분령을 모셔와 창건한 타이베이 최고의 유서 깊은 사찰입니다. 2018년 대만 최고 등급 문화재인 '국가지정고적'으로 승격되었으며, 대만 유일의 청동 주조 용기둥, 못을 쓰지 않은 나선형 조우징(천장 공포), 청대 청두석 사자상 등 대만 건축 예술의 정수를 담고 있습니다. 불교와 도교, 민간 신앙의 100여 위 신령을 함께 모셔 종교적 포용과 조화를 보여줍니다.",
    highlights: [
      { label: "창건 연도", value: "서기 1738년 (청 건륭 3년)" },
      { label: "주신(본존)", value: "관세음보살 (불교·도교 100여 신령 공봉)" },
      { label: "문화재 등급", value: "대만 국가지정고적 (2018년 승격)" },
      { label: "건축 명작", value: "삼천전 청두 석사자, 대만 유일 청동 용기둥, 나선형 조우징" },
      { label: "친환경 참배", value: "2020년부터 향 전면 중단, 두 손 모은 합장 참배" }
    ],
    audioScript:
      "국가지정고적 멍자 롱산사에 오신 것을 환영합니다! 1738년 창건된 롱산사는 초기 개척민들이 고향에서 관세음보살님을 모셔와 세운 타이베이 대표 사찰입니다. 대만 유일의 청동 용기둥과 청대 석사자, 못 없이 짜 맞춘 나선형 천장 등 뛰어난 건축미를 자랑합니다. 2020년부터는 친환경 정책으로 향을 피우지 않으니, 두 손을 모아 정성껏 합장하며 참배해 주시기 바랍니다."
  }
};

export const visitingRouteSteps = {
  "zh-TW": [
    {
      step: 1,
      id: "step_dragon_gate",
      name: "龍門進入（入龍喉迎吉祥）",
      location: "三川殿右側入口",
      rule: "由右門進、左腳先跨入，切勿踩踏木門檻",
      deityFocus: "三川殿守護神（哼哈二將、門神）",
      description:
        "參拜需依「由外到內、由右而左（尊龍邊）」的傳統禮制。面對三川殿時，右手邊為「龍門」，象徵迎祥納福、魚躍龍門。跨入時請提步跨過門檻，忌諱直接踩踏於門檻之上。",
      audioScript:
        "第一步，請從面對廟宇右手邊的「龍門」進入。傳統禮俗中「入龍門」代表迎祥納福。進門時請提起腳步跨過門檻，千萬不要踩在木門檻上喔！"
    },
    {
      step: 2,
      id: "step_main_hall",
      name: "正殿禮拜觀世音菩薩",
      location: "正殿（圓通寶殿）",
      rule: "雙手合十，默念姓名、生辰、住址與祈願",
      deityFocus: "觀世音菩薩、文殊菩薩、普賢菩薩、十八羅漢",
      description:
        "步入中庭面向圓通寶殿，先朝拜中央主神「觀世音菩薩」（祈求平安慈悲護佑），接著向龍邊（右側）的「文殊菩薩」（開啟智慧）與虎邊（左側）的「普賢菩薩」（實踐行願）及殿內十八羅漢行禮。",
      audioScript:
        "第二步來到正殿圓通寶殿。請面向中央主神觀世音菩薩，雙手合十，在心中默念您的姓名、生日與心願；接著向兩旁的文殊菩薩與普賢菩薩致敬，祈求智慧與平安。"
    },
    {
      step: 3,
      id: "step_tian_gong",
      name: "轉身朝拜天公（玉皇大帝）",
      location: "中庭天井向天處",
      rule: "轉身面向前庭天空，虔誠三拜",
      deityFocus: "玉皇上帝（天公）",
      description:
        "參拜完正殿菩薩後，請轉身 180 度面向三川殿方向的天空，朝拜統領三界的「天公（玉皇大帝）」，感謝上天庇佑風調雨順、闔家安康。",
      audioScript:
        "第三步，請轉過身面向中庭開闊的天空，向至高無上的天公、也就是玉皇大帝行三拜禮，感謝上天恩德與四季平安。"
    },
    {
      step: 4,
      id: "step_rear_hall",
      name: "後殿眾神依序參拜",
      location: "後殿聖母殿及左右兩翼神廳",
      rule: "由中央往兩旁（先龍邊右翼、後虎邊左翼）",
      deityFocus: "天上聖母、文昌帝君、華陀仙師、關聖帝君、月下老人",
      description:
        "進入後殿，參拜順序為：中央「天上聖母殿（媽祖）」➔ 右側「水仙尊王、註生娘娘、池頭夫人」➔「文昌帝君廳」（考運功名）➔「華陀廳」（健康醫藥）➔ 左側「關聖帝君廳」（事業財運）➔「月老廳」（良緣紅線）➔ 福智大師紀念堂與開山廳。",
      audioScript:
        "第四步走入後殿，依序由中間往兩旁參拜：先拜正中央的天上聖母媽祖與註生娘娘，接著往右邊拜掌管考運的文昌帝君、保佑健康的華陀仙師；再往左邊拜求事業財運的關聖帝君，以及人氣最旺、牽起美好姻緣的月下老人！"
    },
    {
      step: 5,
      id: "step_tiger_gate",
      name: "虎門離開（出虎口消災厄）",
      location: "三川殿左側出口",
      rule: "由左側虎門出，象徵脫離厄運、化險為夷",
      deityFocus: "圓滿賦歸、前庭淨手瀑布池",
      description:
        "全寺參拜圓滿後，請順著動線由面對廟門左側的「虎門」離開。民俗中「入龍門、出虎口」象徵將一切煩惱與穢氣留在身後，消災解厄、平安順遂。切記勿由虎門逆向進入。",
      audioScript:
        "第五步也是最後一步，參拜圓滿後，請由面對廟宇左邊的「虎門」離開。走出虎門象徵「出虎口、消災解厄」，把晦氣都拋在腦後。祝您萬事如意、平安喜樂！"
    }
  ],
  "en": [
    {
      step: 1,
      id: "step_dragon_gate",
      name: "Enter via the Dragon Gate",
      location: "Right Entrance of Sanchuan Front Hall",
      rule: "Enter from the right; step cleanly over the wooden threshold",
      deityFocus: "Temple Door Guardians (Heng & Ha Generals)",
      description:
        "Traditional etiquette follows 'Outside-In, Right-to-Left'. Facing the temple, the right-hand entrance is the Dragon Gate, symbolizing auspicious fortune and advancement. Step over the high wooden threshold—never tread directly on it.",
      audioScript:
        "Step one: Facing the temple, please enter through the Dragon Gate on your right. In Taiwanese tradition, entering the Dragon's throat brings good fortune. Remember to step cleanly over the wooden threshold rather than stepping on it."
    },
    {
      step: 2,
      id: "step_main_hall",
      name: "Worship Guanyin in the Main Hall",
      location: "Main Hall (Yuantong Treasure Hall)",
      rule: "Join palms together; silently state your name, birthday & wish",
      deityFocus: "Guanyin Bodhisattva, Manjushri, Samantabhadra, 18 Arhats",
      description:
        "In the courtyard facing the Main Hall, pay respects first to Guanyin Bodhisattva (Goddess of Mercy) at the center, followed by Manjushri (Wisdom) on the right, Samantabhadra (Practice) on the left, and the 18 Arhats.",
      audioScript:
        "Step two: Stand before the Main Hall and press your palms together toward Guanyin Bodhisattva in the center. Silently introduce your name and heartfelt wishes, then bow to Manjushri and Samantabhadra Bodhisattvas on either side."
    },
    {
      step: 3,
      id: "step_tian_gong",
      name: "Salute the Jade Emperor (Tian Gong)",
      location: "Central Courtyard Facing the Sky",
      rule: "Turn 180° toward the open sky and bow three times",
      deityFocus: "Jade Emperor (Supreme Ruler of Heaven)",
      description:
        "Turn around from the Main Hall to face the open sky above the front courtyard. Bow three times to Tian Gong (the Jade Emperor), expressing gratitude for heaven's protection and harmony.",
      audioScript:
        "Step three: Turn around to face the open sky above the courtyard. Bow three times with palms joined toward Tian Gong, the Supreme Jade Emperor of Heaven, giving thanks for peace and protection."
    },
    {
      step: 4,
      id: "step_rear_hall",
      name: "Worship Deities of the Rear Hall",
      location: "Rear Hall: Mazu Shrine & Side Altars",
      rule: "Start from the center, then right wing, then left wing",
      deityFocus: "Mazu, Wenchang, Hua Tuo, Guan Gong, Yue Lao",
      description:
        "Proceed to the Rear Hall in this sequence: Mazu (Goddess of the Sea) & Zhusheng Niangniang (Childbirth) at center ➔ Right wing: Emperor Wenchang (Exams & Study) & Hua Tuo (Health & Medicine) ➔ Left wing: Guan Gong (Career & Business) & Yue Lao (God of Love & Marriage).",
      audioScript:
        "Step four: Enter the Rear Hall. Worship Mazu at the center first, then visit the right wing for Emperor Wenchang for academic success and Hua Tuo for good health. Next, move to the left wing for Guan Gong for career prosperity, and Yue Lao, the beloved Matchmaking God of Love!"
    },
    {
      step: 5,
      id: "step_tiger_gate",
      name: "Exit via the Tiger Gate",
      location: "Left Exit of Sanchuan Front Hall",
      rule: "Exit from the left to leave misfortune behind",
      deityFocus: "Peaceful Departure",
      description:
        "After completing your prayers, exit through the Tiger Gate on the left side (as seen when facing the temple from outside). 'Entering the Dragon Gate and exiting the Tiger Jaws' symbolizes dispelling bad luck and walking into peace.",
      audioScript:
        "Step five: Conclude your visit by exiting through the Tiger Gate on the left. Exiting the Tiger Gate symbolizes escaping danger and leaving all bad luck behind. May peace and happiness stay with you!"
    }
  ],
  "ja": [
    {
      step: 1,
      id: "step_dragon_gate",
      name: "龍門（りゅうもん）より入場",
      location: "三川殿 正面向かって右側入口",
      rule: "右門より入り、木製の敷居（しきい）は踏まずにまたぐ",
      deityFocus: "三川殿 門神・守護神将",
      description:
        "参拝は「外から内へ、右から左へ」が伝統の作法です。正面に向かって右側の「龍門」から入ることで吉祥と福徳を招き入れます。入口の高い木製の敷居は神聖な境界ですので、踏まずにまたいでお進みください。",
      audioScript:
        "ステップ1：お寺の正面に向かって右手にある「龍門」からお入りください。龍門から入ることは幸運を招く意味があります。入口の木製の敷居は踏まずに、またいで通りましょう。"
    },
    {
      step: 2,
      id: "step_main_hall",
      name: "正殿の本尊・観世音菩薩に参拝",
      location: "正殿（円通宝殿）",
      rule: "両手を合掌し、心の中で氏名・生年月日・願い事を伝える",
      deityFocus: "観世音菩薩、文殊菩薩、普賢菩薩、十八羅漢",
      description:
        "中庭から正殿に向かい、まず中央の本尊・観世音菩薩に両手を合わせて参拝します。続いて右側の文殊菩薩（知恵）、左側の普賢菩薩（行願）、そして両脇の十八羅漢へ一礼します。",
      audioScript:
        "ステップ2：正殿の円通宝殿に向かい、中央の本尊・観世音菩薩に両手を合わせて合掌します。心の中でご自身の名前と願い事を伝え、続いて左右の文殊菩薩と普賢菩薩にも一礼しましょう。"
    },
    {
      step: 3,
      id: "step_tian_gong",
      name: "天公（玉皇大帝）への拝礼",
      location: "中庭より空を仰ぐ場所",
      rule: "後ろを振り返り、広い空に向かって三拝する",
      deityFocus: "玉皇上帝（天公・天界の最高神）",
      description:
        "正殿の参拝後、180度振り返って三川殿側の空を仰ぎ、天地万物を統べる最高神「天公（玉皇大帝）」に感謝と平穏を祈り三拝します。",
      audioScript:
        "ステップ3：後ろを振り返り、中庭の広い空に向かって立ちます。天界の最高神である天公（玉皇大帝）に日々の感謝を込め、合掌して三回お辞儀をします。"
    },
    {
      step: 4,
      id: "step_rear_hall",
      name: "後殿の諸神を順番に参拝",
      location: "後殿（天上聖母殿および左右の各庁）",
      rule: "中央から右側（龍側）、次に左側（虎側）の順で回る",
      deityFocus: "天上聖母（媽祖）、文昌帝君、華陀仙師、関聖帝君、月下老人",
      description:
        "後殿へ進み、まず中央の「天上聖母（媽祖）」と「註生娘娘（安産・子宝）」に参拝。次に右翼の「文昌帝君（学業・合格祈願）」「華陀仙師（健康・病気平癒）」へ。続いて左翼の「関聖帝君（仕事運・商売繁盛）」、そして縁結びの神様「月下老人（良縁・恋愛成就）」へと巡ります。",
      audioScript:
        "ステップ4：後殿へ進みます。まず中央の媽祖様にお参りし、続いて右側の学問の神・文昌帝君と医薬の神・華陀仙師へ。その後、左側の商売繁盛の神・関聖帝君、そして大人気の縁結びの神様・月下老人へとお参りください！"
    },
    {
      step: 5,
      id: "step_tiger_gate",
      name: "虎門（こもん）より退出",
      location: "三川殿 正面向かって左側出口",
      rule: "左側の虎門から出て、厄災を振り払う",
      deityFocus: "円満退出・浄心滝池",
      description:
        "すべての参拝を終えたら、正面向かって左側の「虎門」から退出します。「龍門より入り、虎口を脱する」ことで、あらゆる災厄を払い除け無病息災を得るとされています。虎門からの逆入場は控えましょう。",
      audioScript:
        "ステップ5：すべての参拝が終わりましたら、左側の「虎門」からお帰りください。虎門を出ることは「虎の口から脱して厄を払う」という縁起の良い意味があります。素晴らしい一日となりますように！"
    }
  ],
  "ko": [
    {
      step: 1,
      id: "step_dragon_gate",
      name: "용문(龍門)으로 입장",
      location: "삼천전 정면 우측 입구",
      rule: "우측 문으로 입장하며 나무 문턱을 밟지 않고 건넘",
      deityFocus: "삼천전 문신 및 수호신장",
      description:
        "참배는 '밖에서 안으로, 오른쪽에서 왼쪽으로' 이동하는 전통 예법을 따릅니다. 사찰을 바라보고 오른쪽 문인 '용문'으로 들어가면 길운과 복을 맞이하게 됩니다. 출입구의 높은 나무 문턱은 밟지 말고 넘어 들어가세요.",
      audioScript:
        "1단계: 사찰 정면을 바라보고 오른쪽에 있는 '용문'으로 입장해 주세요. 용문으로 들어가는 것은 복과 행운을 맞이한다는 뜻입니다. 나무 문턱은 밟지 마시고 가볍게 넘어 들어가세요."
    },
    {
      step: 2,
      id: "step_main_hall",
      name: "정전 본존 관세음보살 참배",
      location: "정전 (원통보전)",
      rule: "두 손을 모아 합장하고 이름, 생년월일, 소원을 마음속으로 아룀",
      deityFocus: "관세음보살, 문수보살, 보현보살, 십팔나한",
      description:
        "안뜰에서 정전을 향해 서서 중앙의 주신이신 관세음보살께 먼저 합장 참배합니다. 이어 우측의 문수보살(지혜)과 좌측의 보현보살(실천), 그리고 십팔나한께 예를 표합니다.",
      audioScript:
        "2단계: 정전 원통보전을 향해 서서 중앙의 관세음보살님께 두 손을 모아 합장합니다. 마음속으로 이름과 소원을 말씀드린 뒤, 양옆의 문수보살님과 보현보살님께도 인사드립니다."
    },
    {
      step: 3,
      id: "step_tian_gong",
      name: "천공(옥황상제) 참배",
      location: "중정 안뜰에서 하늘을 향함",
      rule: "뒤로 돌아 열린 하늘을 향해 세 번 목례",
      deityFocus: "옥황상제 (천공)",
      description:
        "정전 참배를 마친 후 180도 뒤돌아 안뜰 위쪽 하늘을 바라보며 천지신명의 최고신인 '천공(옥황상제)'께 감사와 평안을 기원하며 세 번 절합니다.",
      audioScript:
        "3단계: 뒤로 돌아 안뜰의 열린 하늘을 바라봅니다. 하늘의 최고신이신 천공, 즉 옥황상제님께 평안과 감사를 올리며 세 번 절합니다."
    },
    {
      step: 4,
      id: "step_rear_hall",
      name: "후전 신령 순차 참배",
      location: "후전 천상성모전 및 좌우 각 전각",
      rule: "중앙에서 우측(용변), 이어 좌측(호변) 순서로 참배",
      deityFocus: "천상성모(마조), 문창제군, 화타선사, 관성제군, 월하노인",
      description:
        "후전으로 이동하여 중앙의 '천상성모(마조)'와 '주생낭랑(출산·자녀)'께 먼저 참배합니다. 이어 우측의 '문창제군(학업·시험 합격)'과 '화타선사(건강·치유)'를 뵙고, 좌측의 '관성제군(사업·재물운)'과 인연의 신 '월하노인(연애·결혼)' 순서로 참배합니다.",
      audioScript:
        "4단계: 후전으로 들어가 중앙의 바다의 여신 마조님께 먼저 참배합니다. 이어 오른쪽의 시험운의 신 문창제군과 건강의 신 화타선사를 뵙고, 왼쪽의 재물과 의리의 신 관성제군, 그리고 붉은 실로 좋은 인연을 맺어주는 월하노인께 참배하세요!"
    },
    {
      step: 5,
      id: "step_tiger_gate",
      name: "호문(虎門)으로 퇴장",
      location: "삼천전 정면 좌측 출구",
      rule: "좌측 호문으로 퇴장하여 액운을 떨쳐냄",
      deityFocus: "원만한 귀가 및 액운 소멸",
      description:
        "모든 참배를 마친 후에는 사찰 정면 기준 왼쪽 출구인 '호문'으로 나갑니다. '용문으로 들어가 호랑이 입에서 빠져나온다'는 것은 모든 액운과 근심을 털어내고 평안을 얻는다는 길상한 의미를 담고 있습니다.",
      audioScript:
        "5단계: 모든 참배를 마치셨다면 왼쪽의 '호문'을 통해 밖으로 나갑니다. 호문을 나서는 것은 나쁜 액운을 물리치고 행운만 가져간다는 뜻입니다. 늘 건강과 행복이 가득하시길 바랍니다!"
    }
  ]
};

/**
 * 4 Core Pre-recorded FAQ Buttons (90% Fast-Tier Cache Hit)
 * Strictly aligned with gemini-code-1791858700624.md & gemini-code-1791858777441.md
 */
export const coreFaqs = [
  {
    id: "opening_hours_traffic",
    action: "guide_opening_hours",
    category: "general",
    keywords: [
      "開放時間", "幾點開", "幾點關", "交通", "捷運", "怎麼去", "地址", "停車", "公車", "龍山寺站", "出口",
      "opening hours", "open", "close", "time", "mrt", "subway", "transit", "direction", "address", "location", "exit",
      "開門時間", "営業時間", "何時から", "アクセス", "地下鉄", "行き方", "駅", "出口",
      "운영 시간", "몇 시", "오픈", "가는 법", "지하철", "역", "출구", "교통", "위치"
    ],
    title: {
      "zh-TW": "開放時間與交通方式",
      "en": "Opening Hours & Transit",
      "ja": "開門時間とアクセス方法",
      "ko": "운영 시간 및 찾아오는 길"
    },
    shortDesc: {
      "zh-TW": "每日 06:00 - 22:00 • 捷運龍山寺站 1 號出口步行 1 分鐘",
      "en": "Daily 06:00 - 22:00 • MRT Longshan Temple Station Exit 1",
      "ja": "毎日 06:00〜22:00 • MRT龍山寺駅1番出口より徒歩1分",
      "ko": "매일 06:00 - 22:00 • MRT 롱산사역 1번 출구 도보 1분"
    },
    textContent: {
      "zh-TW":
        "龍山寺的開放時間為每日早上 06:00 至晚上 10:00（如有調整依官網為主）。\n\n交通方面，您可以搭乘捷運板南線（藍線），在「龍山寺站」下車，從 1 號出口出站，穿過艋舺公園步行約 1 分鐘即可抵達（地址：台北市萬華區廣州街 211 號）。",
      "en":
        "Lungshan Temple is open daily from 06:00 AM to 10:00 PM (subject to official announcements).\n\nFor transportation, take the Taipei MRT Bannan Line (Blue Line) to 'Longshan Temple Station' (BL10). Exit via Exit 1, walk north through Bangka Park, and you will arrive in about 1 minute (Address: No. 211, Guangzhou St., Wanhua Dist., Taipei).",
      "ja":
        "龍山寺の開門時間は、毎日朝 06:00 から夜 10:00（22:00）までです（行事等による変更は公式サイトに準じます）。\n\nアクセスは、台北MRT板南線（ブルーライン）の「龍山寺駅」で下車し、1番出口を出て目の前の艋舺公園を抜けると徒歩約1分で到着します。",
      "ko":
        "롱산사의 개방 시간은 매일 오전 06:00부터 밤 10:00(22:00)까지입니다.\n\n교통편은 타이베이 MRT 반난선(파란색 노선) '롱산사(Longshan Temple)역'에서 하차하신 후, 1번 출구로 나와 앞쪽의 멍자 공원을 가로질러 걸으시면 약 1분 만에 도착합니다."
    },
    audioScript: {
      "zh-TW":
        "您好！龍山寺每天早上六點到晚上十點開放。搭乘捷運板南線到龍山寺站，走 1 號出口，經過前面的艋舺公園，大約一分鐘就到了喔！",
      "en":
        "Hello! Lungshan Temple is open daily from 6:00 AM to 10:00 PM. Take the MRT Blue Line to Longshan Temple Station, take Exit 1, walk across Bangka Park, and you'll arrive in about one minute!",
      "ja":
        "こんにちは！龍山寺は毎日朝6時から夜10時まで開門しています。MRT板南線の龍山寺駅1番出口から、前の艋舺公園を抜けて徒歩1分ほどで到着しますよ！",
      "ko":
        "안녕하세요! 롱산사는 매일 아침 6시부터 밤 10시까지 운영합니다. MRT 반난선 롱산사역 1번 출구로 나오셔서 앞쪽 공원을 지나면 약 1분 만에 도착합니다!"
    },
    followUps: ["incense_rules", "yue_lao_guide"]
  },
  {
    id: "incense_rules",
    action: "guide_incense_rules",
    category: "worship",
    keywords: [
      "香", "燒香", "買香", "點香", "幾支香", "幾柱香", "拿香", "帶香", "停香", "金紙", "供品", "甜食", "糖果", "鮮花", "環保",
      "incense", "burn", "offerings", "flowers", "sweets", "candy", "joss paper", "eco",
      "線香", "お線香", "お供え", "供物", "お菓子", "花",
      "향", "분향", "공양물", "과자", "사탕", "꽃"
    ],
    title: {
      "zh-TW": "來拜拜需要自己準備香嗎？",
      "en": "Do I need to bring my own incense?",
      "ja": "お参りに線香の持参は必要ですか？",
      "ko": "참배할 때 향을 직접 준비해야 하나요?"
    },
    shortDesc: {
      "zh-TW": "全面停香 • 雙手合十誠心即可 • 拜月老可備喜糖甜食",
      "en": "No incense needed • Palms joined sincerely • Sweets for Yue Lao",
      "ja": "線香は持参不要 • 合掌のみで参拝 • 月老にはお菓子のお供え可",
      "ko": "향 지참 불필요 • 두 손 모아 합장 참배 • 월하노인은 단 과자 가능"
    },
    textContent: {
      "zh-TW":
        "不需要喔！為響應環保與維護古蹟空氣品質，龍山寺自 2020 年 3 月起已經全面停止供香，也不開放信眾自帶線香或焚燒金紙。\n\n您只要帶著一顆虔誠的心，雙手合十參拜即可。如果您想拜月老求良緣，可以準備一點喜糖、巧克力或甜食作為供品；參拜完畢後記得將供品帶回享用，沾沾神明賜予的喜氣！",
      "en":
        "No, you do not need any incense! To protect the environment and preserve the historic monument, Lungshan Temple completely ceased burning incense and joss paper in March 2020, and visitors may not bring their own.\n\nSimply bring a sincere heart and join your palms in prayer. If you are praying to Yue Lao for romance, you are welcome to bring sweet treats or chocolates as offerings, and take them home afterward for good luck!",
      "ja":
        "いいえ、お線香は必要ありません！環境保護と文化財保全のため、龍山寺では2020年3月よりお線香の配布および持ち込みを全面的に停止しております。\n\n清らかな心で両手を合わせて合掌するだけで十分思いが通じます。もし縁結びの「月下老人」にお参りされる場合は、キャンディやチョコレートなどの甘いお菓子をお供えとして持参いただけます。",
      "ko":
        "아니요, 준비하실 필요가 없습니다! 환경 보호와 고적 보존을 위해 롱산사는 2020년 3월부터 향 피우기를 전면 중단했으며 외부 향 반입도 금지하고 있습니다.\n\n경건한 마음으로 두 손을 모아 합장하시는 것만으로 충분합니다. 만약 인연의 신 월하노인께 참배하신다면 사탕이나 초콜릿 같은 달콤한 간식을 공양물로 올리신 뒤 다시 챙겨 가시면 좋습니다."
    },
    audioScript: {
      "zh-TW":
        "不用帶香喔！龍山寺現在已經全面停止燒香了，只要雙手合十誠心拜拜就可以了。如果是來求姻緣拜月老，可以自己帶一點甜食或糖果來當作供品。",
      "en":
        "No need to bring incense! Lungshan Temple has completely stopped burning incense. Sincere prayers with palms joined together are all you need. If you're visiting Yue Lao for romance, feel free to bring some sweets or candies as offerings.",
      "ja":
        "お線香は必要ありませんよ！龍山寺は現在お線香を全面停止しており、両手を合わせた合掌だけでお参りいただけます。縁結びの月下老人へのお参りなら、甘いお菓子やキャンディをお供えに持参できますよ。",
      "ko":
        "향은 가져오지 않으셔도 됩니다! 롱산사는 현재 향 피우기를 전면 중단하여 두 손 모아 합장만 하시면 됩니다. 월하노인께 인연을 비실 때는 달콤한 사탕이나 과자를 공양물로 준비하셔도 좋습니다."
    },
    followUps: ["yue_lao_guide", "draw_fortune"]
  },
  {
    id: "yue_lao_guide",
    action: "guide_yue_lao",
    category: "worship",
    keywords: [
      "月老", "月下老人", "紅線", "姻緣", "桃花", "戀愛", "結婚", "男朋友", "女朋友", "對象", "脫單", "喜糖", "還願",
      "yue lao", "matchmaker", "red string", "red thread", "love", "romance", "marriage", "relationship", "partner", "cupid",
      "月下老人", "月老", "赤い糸", "縁結び", "恋愛", "結婚", "良縁", "恋人",
      "월하노인", "월노", "붉은 실", "홍선", "인연", "연애", "결혼", "애인", "이상형"
    ],
    title: {
      "zh-TW": "月老怎麼拜？紅線怎麼求？",
      "en": "How to worship Yue Lao & request the Red String?",
      "ja": "月下老人の参拝方法と赤い糸の授かり方は？",
      "ko": "월하노인 참배 방법과 붉은 실(인연의 실) 받는 법은?"
    },
    shortDesc: {
      "zh-TW": "先拜全寺神明 • 向月老稟明條件 • 連續三聖筊領紅線過爐",
      "en": "Worship main deities first • State ideal traits • Toss 3 Sheng-Jiao",
      "ja": "全神仏を参拝後、月老へ条件を奏上 • 3回連続聖筊で赤い糸授与",
      "ko": "전체 신령 참배 후 월하노인께 이상형 고함 • 3연속 성교 후 붉은 실 수령"
    },
    textContent: {
      "zh-TW":
        "求取月老紅線的標準流程如下：\n1. 【依序禮敬】：請務必先從龍門進入，完成正殿觀世音菩薩、天公及後殿各神明的參拜，最後再來到後殿左側的「月老廳」。\n2. 【稟明心願】：雙手合十，向月下老人清楚稟告自己的「姓名、農曆/國曆生日、現居地址」，以及「心儀對象的具體條件（外觀、性格、價值觀等越清楚越好）」。\n3. 【擲筊請示】：拿起木筊請示月老是否願意賜予紅線。若擲出「連續三個聖筊（一正一反）」，即可從神尊旁領取一條紅線。\n4. 【過爐隨身】：持紅線至大殿香爐順時針繞三圈，隨身收納於皮夾或枕頭下。日後若締結良緣，記得攜帶喜餅或喜糖回來向月老還願！",
      "en":
        "How to worship Yue Lao and request the Red String of Fate:\n1. [Complete the Route First]: Out of respect, finish worshiping Guanyin Bodhisattva, the Jade Emperor, and Rear Hall deities before arriving at Yue Lao Hall on the left wing.\n2. [State Details Clearly]: Press palms together and tell Yue Lao your full name, date of birth, residential address, and detailed qualities of your ideal partner.\n3. [Toss 3 Sheng-Jiao]: Cast the crescent wooden divination blocks (Jiao-bei). If you obtain three consecutive 'Sheng-Jiao' (one flat side up, one rounded side up), you are granted permission to take ONE red thread.\n4. [Bless & Carry]: Circle the red thread clockwise 3 times over the main censer and keep it inside your wallet. When your wish comes true, return with wedding cookies or sweets to give thanks!",
      "ja":
        "月下老人の参拝と「赤い糸」を授かる手順：\n1. 【全堂の参拝を先に】：礼儀として、正殿の観世音菩薩、天公、後殿の諸神を順番に参拝してから、後殿左奥の「月老庁」へ向かいます。\n2. 【詳細に自己紹介と願いを】：合掌し、ご自身の「氏名・生年月日・現住所」と「理想のお相手の具体的な条件（性格・価値観など詳しく）」を心の中で伝えます。\n3. 【三連続の聖筊】：三日月形の木札（ポエ）を投げ、「3回連続で聖筊（表と裏の組み合わせ）」が出れば、赤い糸を1本いただくことができます。\n4. 【香炉で清めて携帯】：赤い糸を香炉の上で時計回りに3回くぐらせ、お財布などに入れて大切に持ち歩きましょう。良縁が結ばれたらお菓子を持って御礼参りへ！",
      "ko":
        "월하노인 참배 및 인연의 '붉은 실(홍선)' 받는 순서:\n1. [전체 신령 먼저 참배]: 예법에 따라 정전의 관세음보살, 천공, 후전의 다른 신령들을 먼저 참배한 후 후전 좌측 끝의 '월하노인전'으로 이동합니다.\n2. [구체적인 소원 고하기]: 합장하고 자신의 '이름, 생년월일, 현주소'와 '이상형의 구체적인 조건(성격, 외모, 가치관 등)'을 명확히 말씀드립니다.\n3. [연속 3번 성교 받기]: 반달 모양 나무패(즈이자오)를 던져 '연속 3회 성교(평평한 면 1개 + 둥근 면 1개)'가 나오면 붉은 실 한 가닥을 가져갈 수 있습니다.\n4. [향로에 돌린 후 소지]: 붉은 실을 향로 위에서 시계 방향으로 3바퀴 돌린 후 지갑에 소중히 넣어 다니세요."
    },
    audioScript: {
      "zh-TW":
        "拜月老之前，記得要先拜過寺裡其他的神明以示尊重。到了月老廳，清楚告訴月老您的名字、生日、住址和理想對象的條件。接著擲筊，如果連續擲出三個聖筊，就可以拿一條紅線，到香爐順時針繞三圈後放在皮夾裡隨身攜帶，祝您早日結成良緣！",
      "en":
        "Before praying to Yue Lao, remember to pay respects to the other deities first. At Yue Lao Hall, clearly state your name, birthday, address, and ideal partner traits. Then cast the moon blocks. If you toss three consecutive Sheng-Jiao, take one red thread, circle it clockwise three times over the censer, and keep it in your wallet. Wishing you a blessed romance!",
      "ja":
        "月下老人をお参りする前に、礼儀として寺内の他の神様を先にお参りしましょう。月老庁に着いたら、お名前・生年月日・住所・理想の相手の条件を詳しく伝えます。木札を投げて3回連続で聖筊が出れば、赤い糸を1本授かり、香炉の上で時計回りに3回くぐらせてお財布に入れてお持ちください。良縁に恵まれますように！",
      "ko":
        "월하노인을 뵙기 전에는 먼저 다른 신령들을 참배하셔야 합니다. 월하노인전에 도착하면 이름, 생년월일, 주소와 이상형의 조건을 똑똑히 전하세요. 나무패를 던져 세 번 연속 성교가 나오면 붉은 실을 받아 향로 위로 시계방향 세 바퀴 돌린 뒤 지갑에 지니시면 됩니다. 좋은 인연 맺으시길 바랍니다!"
    },
    followUps: ["draw_fortune", "incense_rules"]
  },
  {
    id: "draw_fortune",
    action: "guide_draw_fortune",
    category: "worship",
    keywords: [
      "求籤", "抽籤", "解籤", "籤詩", "擲筊", "聖筊", "笑筊", "陰筊", "怒筊", "蓋筊", "籤筒", "運勢",
      "fortune", "poem", "poetry", "divination", "blocks", "jiaobei", "sheng jiao", "bamboo stick", "lot", "interpret",
      "おみくじ", "求籤", "解籤", "引き方", "木札", "ポエ", "聖筊", "運勢",
      "점괘", "시구", "운세", "즈이자오", "나무패", "성교", "해설"
    ],
    title: {
      "zh-TW": "如何求籤與解籤？",
      "en": "How to draw & interpret fortune poetry?",
      "ja": "おみくじ（求籤）の引き方と解籤の手順は？",
      "ko": "점괘(시구) 뽑는 법과 해설 받는 법은?"
    },
    shortDesc: {
      "zh-TW": "一事一問 • 擲筊請示抽籤 • 三聖筊確認籤號 • 10:00-19:00 解籤",
      "en": "One topic per stick • Confirm with 3 Sheng-Jiao • 10:00-19:00 Interpreter",
      "ja": "一問一籤 • 3回連続聖筊で確定 • 10:00〜19:00 専門解説サービス",
      "ko": "한 가지 질문만 • 3회 연속 성교로 확정 • 10:00~19:00 전문 해설"
    },
    textContent: {
      "zh-TW":
        "龍山寺主要有「觀音靈籤（正殿）」與「關帝靈籤（後殿）」，求籤五步驟如下：\n1. 【全寺參拜】：請先完成全寺神明參拜，再回到想請示的神明（觀世音菩薩或關聖帝君）殿前。\n2. 【擲筊請示】：稟明姓名、生辰、住址與「單一明確的問題（一事一籤）」，擲筊請示神明是否准許抽籤（需一聖筊）。\n3. 【抽取籤支】：從籤筒抽出一支竹籤，看清上面的號碼。\n4. 【三筊確認】：再次擲筊詢問神明「是否為此支籤？」。必須擲出「連續三個聖筊」才算定籤！若中間出現笑筊（兩平面向上）或陰筊（兩凸面向上），則需將竹籤放回重新抽取。\n5. 【領籤與解籤】：憑確認的籤號至籤詩櫃領取籤詩。寺內設有免費專業解籤處，服務時間為每日 10:00 至 19:00。",
      "en":
        "Lungshan Temple offers 'Guanyin Fortune Poems' (Main Hall) and 'Guan Di Fortune Poems' (Rear Hall):\n1. [Complete Worship]: Finish praying to all deities first, then return to Guanyin or Guan Gong.\n2. [Ask Permission]: State your name, birthday, address, and ONE specific question (one question per poem). Toss the blocks for 1 Sheng-Jiao to receive permission.\n3. [Draw a Stick]: Draw one numbered bamboo stick from the cylinder.\n4. [Confirm with 3 Sheng-Jiao]: Ask if this stick is the deity's true message. You must toss THREE consecutive Sheng-Jiao (one flat, one round). If not, return the stick and draw again.\n5. [Collect & Interpret]: Take the matching poem sheet from the wooden cabinet. Free interpretation service is available daily from 10:00 AM to 7:00 PM.",
      "ja":
        "龍山寺のおみくじ（観音百首・関帝百首）の正しい引き方：\n1. 【全堂参拝の後に】：まず全神仏への参拝を終えてから、本尊・観世音菩薩（または後殿の関聖帝君）の前に戻ります。\n2. 【お許しを請う】：氏名・生年月日・住所と「具体的な1つの質問（1つの質問につき1本）」を伝え、木札を投げて1回「聖筊（表裏）」が出れば引いてよい合図です。\n3. 【籤を引く】：籤筒から竹の棒を1本引き、番号を確認します。\n4. 【3回連続の聖筊で確定】：その番号で正しいか木札を投げます。「3回連続で聖筊」が出れば確定です。途中で笑筊（裏裏）や陰筊（表表）が出たら、棒を戻して引き直します。\n5. 【籤詩の受領と解説】：番号の引き出しから紙を受け取ります。毎日 10:00〜19:00 まで無料の専門解籤（解説）カウンターをご利用いただけます。",
      "ko":
        "롱산사 점괘(관음영첨·관제영첨) 뽑는 5단계 방법:\n1. [전체 참배 완료]: 먼저 모든 신령께 참배한 후 관세음보살(또는 관성제군) 앞으로 돌아옵니다.\n2. [추첨 허락받기]: 이름, 생년월일, 주소와 '구체적인 한 가지 질문(1질문 1점괘)'을 아뢰고 나무패를 던져 성교가 1번 나오면 뽑으실 수 있습니다.\n3. [대나무 산가지 뽑기]: 통에서 막대 하나를 뽑아 번호를 확인합니다.\n4. [3연속 성교 확정]: 이 번호가 신령님의 뜻이 맞는지 나무패를 던져 '연속 3번 성교'가 나와야 최종 확정됩니다. 실패 시 막대를 넣고 다시 뽑습니다.\n5. [시구 수령 및 해설]: 서랍장에서 해당 번호의 종이를 꺼냅니다. 매일 10:00~19:00 무료 해설소에서 설명을 들으실 수 있습니다."
    },
    audioScript: {
      "zh-TW":
        "求籤前要先拜完所有神明喔！接著向神明稟明一個具體問題，擲出一個聖筊同意後抽一支籤；再擲筊確認這支籤對不對，要連續三個聖筊才是神明賜的籤喔！拿到籤詩後，早上十點到晚上七點，旁邊都有專業人員免費為您解籤。",
      "en":
        "Before drawing a fortune poem, complete your prayers around the temple! Ask one specific question and toss the blocks for permission. Draw a bamboo stick, then verify it by tossing three consecutive Sheng-Jiao. Once confirmed, pick up your poem sheet. Professional interpreters are available from 10:00 AM to 7:00 PM!",
      "ja":
        "おみくじを引く前に、全神仏への参拝を済ませましょう！1つの具体的な質問を伝えてお許しを得たら、棒を1本引き、木札を投げて3回連続で聖筊が出れば確定です。朝10時から夜7時まで、専門の解説員が運勢を詳しく解き明かしてくれますよ。",
      "ko":
        "점괘를 뽑기 전에 먼저 모든 신령님을 참배하셔야 합니다! 구체적인 질문 하나를 아뢰고 허락을 받은 뒤 막대를 뽑고, 3회 연속 성교가 나오면 확정됩니다. 시구를 받으신 후 오전 10시부터 저녁 7시까지 전문 해설사에게 무료로 해석을 들으실 수 있습니다."
    },
    followUps: ["yue_lao_guide", "deity_wenchang"]
  }
];

/**
 * Extended Knowledge Base FAQs (Comprehensive Deities, Etiquette, Services & Rituals)
 * Elevating 90% Knowledge Base coverage to answer diverse visitor queries with zero latency
 */
export const extendedFaqs = [
  {
    id: "deity_wenchang",
    action: "guide_wenchang",
    category: "deities",
    keywords: [
      "文昌", "文昌帝君", "考試", "考運", "學業", "升學", "國考", "證照", "面試", "准考證", "蔥", "芹菜", "粽子", "讀書",
      "wenchang", "exam", "study", "academic", "test", "admission", "interview", "scholar", "scallion", "celery",
      "文昌帝君", "合格祈願", "学業", "試験", "受験", "資格", "ネギ", "セロリ",
      "문창제군", "시험", "합격", "학업", "수험표", "공부", "면접", "자격증"
    ],
    title: {
      "zh-TW": "求考運與學業：文昌帝君參拜指南",
      "en": "Academic & Exam Blessings: Emperor Wenchang",
      "ja": "合格祈願・学業成就：文昌帝君の参拝ガイド",
      "ko": "시험 합격 및 학업 성취: 문창제군 참배 가이드"
    },
    shortDesc: {
      "zh-TW": "後殿右翼文昌廳 • 備准考證影本 • 蔥（聰明）芹菜（勤學）粽子（包中）",
      "en": "Rear Hall Right Wing • Bring admission copy • Scallions, celery, dumplings",
      "ja": "後殿右翼・文昌庁 • 受験票のコピーを持参 • ネギ・セロリ・ちまき",
      "ko": "후전 우측 문창청 • 수험표 사본 지참 • 파(총명), 미나리(근면), 쫑즈(합격)"
    },
    textContent: {
      "zh-TW":
        "祈求考試金榜題名、升學面試或職場考證順利，請至後殿右側（龍邊）參拜掌管文運與功名的「文昌帝君」（同祀大魁夫子、紫陽夫子）。\n\n【推薦吉祥供品】：\n• 青蔥（諧音「聰明」、一舉衝天）\n• 芹菜（諧音「勤奮好學」）\n• 菜頭／白蘿蔔（諧音「好彩頭」）\n• 包子與粽子（寓意「包中」）\n• 礦泉水與文具（象徵文思泉湧）\n\n【參拜秘訣】：可攜帶「准考證影本」與考試用筆，向文昌帝君清楚稟報考生姓名、考場、考科與准考證號碼，將准考證影本投入殿前准考證箱，並將應考文具在香爐上順時針繞三圈加持。",
      "en":
        "For academic success, entrance exams, professional certifications, or job interviews, worship 'Emperor Wenchang' (God of Literature and Culture) located on the right wing of the Rear Hall.\n\n[Auspicious Offerings]:\n• Scallions (sounds like 'cleverness' in Chinese)\n• Celery (symbolizes 'diligence')\n• White radish (symbolizes 'good omen')\n• Steamed buns & sticky rice dumplings ('Bao-Zhong' = guaranteed pass)\n\n[Ritual Tip]: Bring a photocopy of your exam admission ticket and your exam pens. State the candidate's name, exam date, and seat number, place the copy in the blessing box, and circle your pens clockwise 3 times over the censer.",
      "ja":
        "受験合格・資格試験・就職面接の成功を願う方は、後殿右側（龍側）の「文昌帝君（学問と科挙の神）」へお参りください。\n\n【縁起の良いお供え物】：\n• 青ネギ（中国語で「聡明」と同音）\n• セロリ（「勤勉」と同音）\n• 大根（縁起が良い「好彩頭」）\n• 肉まんとちまき（「包中＝必ず合格する」の語呂合わせ）\n\n【参拝のコツ】：受験票のコピーと試験当日使う筆記用具を持参し、氏名・試験名・受験番号を伝えてお祈りした後、筆記用具を香炉の上で時計回りに3回くぐらせると知恵を授かれます。",
      "ko":
        "입시, 자격증 시험, 공무원 시험 및 면접 합격을 기원하신다면 후전 우측(용변)에 모셔진 학문과 과거 급제의 신 '문창제군'께 참배하세요.\n\n[길상 공양물]:\n• 대파 (중국어 발음상 '총명'과 유사)\n• 미나리/셀러리 ('근면 성실'을 상징)\n• 무 (좋은 징조인 '호채두' 상징)\n• 만두와 쫑즈 ('바오중=반드시 합격함'을 의미)\n\n[참배 팁]: 수험표 사본과 시험용 필기구를 지참하여 수험생 이름, 시험명, 수험번호를 아뢰고 수험표함에 넣은 뒤, 필기구를 향로 위로 시계방향 3바퀴 돌려 기운을 받으세요."
    },
    audioScript: {
      "zh-TW":
        "想求考運順利或工作升遷考試，請到後殿右邊參拜文昌帝君。您可以準備青蔥代表聰明、芹菜代表勤奮、包子和粽子代表包中，並帶著准考證影本與考試用的筆向帝君稟報祈福喔！",
      "en":
        "For exam success and academic blessings, visit Emperor Wenchang on the right wing of the Rear Hall. Visitors traditionally offer scallions for cleverness, celery for diligence, and dumplings for passing, along with a copy of their exam admission slip!",
      "ja":
        "学業成就や合格祈願は、後殿右側の文昌帝君へお参りください。聡明を表すネギや勤勉を表すセロリ、合格を意味するちまきをお供えし、受験票のコピーと筆記用具を持参して祈願するのが台湾の伝統です。",
      "ko":
        "시험 합격과 학업 성취를 원하신다면 후전 오른쪽의 문창제군께 참배하세요. 총명함을 뜻하는 파, 근면을 뜻하는 미나리, 합격을 상징하는 쫑즈와 함께 수험표 사본을 올리며 기도하시면 큰 힘을 얻으실 수 있습니다."
    },
    followUps: ["draw_fortune", "amulets_stamps"]
  },
  {
    id: "deity_huatuo",
    action: "guide_huatuo",
    category: "deities",
    keywords: [
      "華陀", "華佗", "華陀仙師", "健康", "生病", "住院", "開刀", "手術", "身體", "醫藥", "康復", "平安",
      "hua tuo", "health", "sick", "illness", "surgery", "hospital", "medicine", "recovery", "healing", "doctor",
      "華陀", "健康", "病気", "手術", "病気平癒", "無病息災", "医療", "快気",
      "화타", "건강", "질병", "수술", "병원", "쾌유", "무병장수", "몸"
    ],
    title: {
      "zh-TW": "求身體健康與手術平安：華陀仙師",
      "en": "Health, Healing & Surgery: Master Hua Tuo",
      "ja": "無病息災・病気平癒：医薬の祖神「華陀仙師」",
      "ko": "건강 기원 및 질병 쾌유: 의학의 신 화타선사"
    },
    shortDesc: {
      "zh-TW": "後殿右翼華陀廳 • 保佑疾病康復、手術順利、醫護人員平安",
      "en": "Rear Hall Right Wing • Blessings for recovery, surgery & medical workers",
      "ja": "後殿右翼・華陀庁 • 病気平癒・手術成功・医療従事者の守護神",
      "ko": "후전 우측 화타청 • 질병 치유, 수술 무사 성공 및 의료진 수호"
    },
    textContent: {
      "zh-TW":
        "若為自己或長輩家人祈求身體健康、慢性調養、手術開刀順利或早日康復，請至後殿右側參拜神醫「華陀仙師」。此外，許多醫師、護理師、藥師與養生保健從業人員也會特地前來參拜。\n\n【參拜方式】：雙手合十，向華陀仙師詳細稟明患者之姓名、生辰、現居地址，以及目前就診的醫院、預計手術日期或身體不適部位，祈求良醫貴人相助、妙手回春、早日康復。亦可至前庭流通處請領「健康平安符」過爐隨身佩帶。",
      "en":
        "To pray for physical health, smooth surgeries, or the speedy recovery of loved ones, visit 'Master Hua Tuo' (the legendary divine physician) on the right wing of the Rear Hall. Many doctors, nurses, and pharmacists also worship him as their patron saint.\n\n[How to Pray]: Join your palms and clearly state the patient's name, birth date, residential address, hospital name, and specific medical condition or surgery date, praying for skilled medical care and swift recovery.",
      "ja":
        "ご自身やご家族の健康長寿、病気平癒、手術の無事成功を祈願される方は、後殿右側の医薬の神「華陀仙師」へお参りください。医師や看護師、薬剤師の方々からも厚く信仰されています。\n\n【参拝方法】：合掌し、療養中の方の氏名・生年月日・住所、および通院先の病院名や手術日・症状を詳しく心の中で伝え、良き医療と順調な快復をお祈りください。",
      "ko":
        "본인이나 가족의 건강, 질병 쾌유, 무사한 수술을 기원하신다면 후전 우측의 전설적인 명의 '화타선사'께 참배하세요. 의사, 간호사, 약사 등 의료계 종사자들의 수호신으로도 깊이 추앙받고 있습니다.\n\n[참배 방법]: 두 손을 모으고 환자의 성함, 생년월일, 주소 및 입원 중인 병원과 수술 일정, 증상을 상세히 아뢰며 훌륭한 의료진과의 만남과 빠른 회복을 기원하세요."
    },
    audioScript: {
      "zh-TW":
        "祈求身體安康或家人手術順利、早日康復，請到後殿右側參拜醫藥之神華陀仙師。雙手合十向仙師稟明患者的姓名、生日、住址與就醫狀況，誠心祈求良醫相助、身心安泰。",
      "en":
        "For health, smooth surgery, and speedy recovery of family members, worship Master Hua Tuo, the divine physician, in the Rear Hall. State the patient's name, birthday, and condition with sincere palms joined.",
      "ja":
        "無病息災や病気平癒、手術の成功を願う方は、後殿右側の華陀仙師へお参りください。患者様のお名前や生年月日、症状を心の中で詳しく伝え、順調な快復をお祈りしましょう。",
      "ko":
        "건강과 수술 성공, 질병 쾌유를 비실 때는 후전 우측의 의학의 신 화타선사께 참배하세요. 환자의 성함과 생년월일, 병세를 상세히 아뢰며 빠른 회복을 기원하시면 됩니다."
    },
    followUps: ["amulets_stamps", "deity_mazu_zhusheng"]
  },
  {
    id: "deity_guangong",
    action: "guide_guangong",
    category: "deities",
    keywords: [
      "關公", "關聖帝君", "關羽", "財神", "武財神", "財運", "事業", "工作", "升遷", "找工作", "求職", "生意", "創業", "投資", "小人",
      "guan gong", "guan yu", "wealth", "career", "business", "job", "promotion", "money", "prosperity", "finance",
      "関聖帝君", "関羽", "仕事運", "商売繁盛", "金運", "財運", "就職", "転職", "出世",
      "관성제군", "관우", "재물운", "사업", "직장", "취업", "승진", "돈", "장사"
    ],
    title: {
      "zh-TW": "求事業財運與防小人：關聖帝君（武財神）",
      "en": "Career, Business & Prosperity: Guan Sheng Di Jun",
      "ja": "仕事運・商売繁盛・金運：関聖帝君（武財神）",
      "ko": "사업 번창·취업·재물운: 관성제군(관우)"
    },
    shortDesc: {
      "zh-TW": "後殿左翼關帝廳 • 忠義誠信武財神 • 保佑職場升遷、創業興隆、貴人相助",
      "en": "Rear Hall Left Wing • Martial God of Wealth • Career growth & business integrity",
      "ja": "後殿左翼・関帝庁 • 信義の武財神 • 商売繁盛・キャリアアップ・悪縁切り",
      "ko": "후전 좌측 관제청 • 신의의 무재신 • 직장 승진, 사업 번창 및 귀인 상봉"
    },
    textContent: {
      "zh-TW":
        "祈求事業發展、求職轉職、業績長紅、店面生意興隆或職場遠離小人，請至後殿左側（虎邊）參拜「關聖帝君（關公）」。關聖帝君象徵忠義與誠信，被廣大商界與上班族奉為強而有力的「武財神」與正義守護神。\n\n【參拜要領】：雙手合十，清楚稟報您的姓名、生辰、任職公司名稱、職稱（或欲應徵之職位／經營之行業），說明具體的事業目標，祈求關聖帝君賜予正財亨通、貴人扶持、是非遠離。若有重大商業決策，亦可於關聖帝君殿前求取「關帝百首靈籤」。",
      "en":
        "For career advancement, job hunting, business prosperity, and protection against workplace politics, worship 'Guan Sheng Di Jun' (General Guan Yu) on the left wing of the Rear Hall. Revered for his unwavering loyalty and righteousness, he is venerated as a powerful 'Martial God of Wealth'.\n\n[How to Pray]: State your name, birthdate, company name, job title (or target industry), and specific career goals. Pray for righteous wealth, trustworthy partners, and noble mentors. You may also draw from the 'Guan Di Fortune Poems' here for career decisions.",
      "ja":
        "仕事運の向上、就職・転職の成功、商売繁盛や職場の人間関係改善（悪縁・トラブル除け）には、後殿左側の「関聖帝君（三国志の関羽公）」へお参りください。忠義と信義の象徴であり、実業界から最強の「武財神（商売と財運の神）」として崇敬されています。\n\n【参拝のポイント】：氏名・生年月日に加え、勤務先の会社名や役職（または志望業界・経営内容）を具体的に伝え、正道による繁栄と良きビジネスパートナーとの出会いを祈願しましょう。",
      "ko":
        "직장 승진, 취업·이직, 사업 번창, 매출 증대 및 직장 내 구설수 방지를 원하신다면 후전 좌측의 '관성제군(삼국지의 관우 장군)'께 참배하세요. 충의와 신의의 상징으로서 상공인과 직장인들에게 강력한 '무재신(재물의 신)'으로 모셔집니다.\n\n[참배 요령]: 이름과 생년월일, 재직 중인 회사명과 직책(또는 희망 직무/업종)을 구체적으로 아뢰고 정당한 재물운과 귀인의 도움을 기원하세요."
    },
    audioScript: {
      "zh-TW":
        "想求事業順利、找工作、業績成長或財運亨通，請到後殿左邊參拜關聖帝君。關公是代表忠義誠信的武財神，參拜時請稟報您的公司行號、職稱與工作目標，祈求貴人相助、步步高升！",
      "en":
        "For career growth, job hunting, and business prosperity, worship Guan Sheng Di Jun on the left wing of the Rear Hall. Honored as the Martial God of Wealth, state your company, role, and goals to pray for noble mentors and success!",
      "ja":
        "仕事運アップや商売繁盛、転職の成功を願うなら、後殿左側の関聖帝君へお参りください。信義を重んじる武財神として、会社名や目標を具体的に伝えて祈願すると、力強いご加護をいただけますよ。",
      "ko":
        "직장 승진과 취업, 사업 번창과 재물운을 원하신다면 후전 왼쪽의 관성제군께 참배하세요. 신의를 상징하는 무재신이신 관우 장군께 회사명과 목표를 자세히 아뢰면 귀인의 도움과 번영을 얻으실 수 있습니다."
    },
    followUps: ["draw_fortune", "deity_wenchang"]
  },
  {
    id: "deity_mazu_zhusheng",
    action: "guide_mazu_zhusheng",
    category: "deities",
    keywords: [
      "媽祖", "天上聖母", "註生娘娘", "求子", "懷孕", "生產", "順產", "小孩", "育兒", "臨水夫人", "池頭夫人", "行車平安", "出國",
      "mazu", "goddess of sea", "pregnancy", "baby", "childbirth", "children", "fertility", "travel safety",
      "媽祖", "天上聖母", "註生娘娘", "子宝", "安産", "妊娠", "子供", "旅行安全",
      "마조", "천상성모", "주생낭랑", "임신", "출산", "자녀", "순산", "여행 안전"
    ],
    title: {
      "zh-TW": "求航海出國平安與求子順產：天上聖母與註生娘娘",
      "en": "Safe Travel, Fertility & Childbirth: Mazu & Zhusheng Niangniang",
      "ja": "旅の安全・子宝・安産祈願：天上聖母（媽祖）と註生娘娘",
      "ko": "여행 안전 및 임신·순산 기원: 천상성모(마조)와 주생낭랑"
    },
    shortDesc: {
      "zh-TW": "後殿中央聖母殿 • 媽祖保佑出國遠行平安 • 註生娘娘與池頭夫人保佑求子安產",
      "en": "Rear Hall Center • Mazu for safe travels • Zhusheng Niangniang for safe childbirth",
      "ja": "後殿中央・聖母殿 • 媽祖は渡航安全 • 註生娘娘は子授け・安産の守護神",
      "ko": "후전 중앙 성모전 • 마조는 여행·출국 안전 • 주생낭랑은 임신·순산 수호"
    },
    textContent: {
      "zh-TW":
        "後殿正中央為「天上聖母殿」：\n• 【天上聖母（媽祖）】：台灣最具代表性的海神與慈悲母親，凡出國旅遊、留學、移民、搭機航行或行車外出，皆可向媽祖祈求一路順風、出入平安。\n• 【註生娘娘與十二婆姐】：位於聖母殿龍邊（右側），專門掌管懷孕、求子、育兒與良善子嗣，求子夫妻可誠心祈願。\n• 【池頭夫人】：位於聖母殿虎邊（左側），為艋舺龍山寺特有的安產守護神，保佑孕婦生產過程平安順遂（順產）、母子均安。",
      "en":
        "The central shrine of the Rear Hall is the 'Mazu Hall':\n• [Mazu (Heavenly Mother)]: Protector of seafarers and travelers. Pray to Mazu for safe flights, overseas study, road trips, and family peace.\n• [Zhusheng Niangniang (Goddess of Birth)]: Located to Mazu's right, she blesses couples seeking conception, fertility, and healthy growth of children.\n• [Lady Chitou (Chitou Furen)]: Located to Mazu's left, she specifically protects pregnant mothers for a smooth, safe delivery and maternal-infant safety.",
      "ja":
        "後殿の中央は「天上聖母殿」です：\n• 【天上聖母（媽祖）】：航海と旅の守護神であり、海外旅行・留学・出張や日々の交通安全を温かく見守ります。\n• 【註生娘娘（ちゅうせいニャンニャン）】：中央右側に祀られ、子宝（妊娠祈願）と子供の健やかな成長を司る神様です。\n• 【池頭夫人（ちとうふじん）】：中央左側に祀られる安産の守護神で、母子ともに無事な出産（安産）を守護してくださいます。",
      "ko":
        "후전 정중앙은 '천상성모전'입니다:\n• [천상성모(마조)]: 항해와 여정의 수호신으로, 해외여행·유학·출장 및 일상 교통안전을 보살펴 주십니다.\n• [주생낭랑(註生娘娘)]: 성모전 우측에 모셔져 있으며, 자녀를 바라는 부부의 임신(잉태)과 아이들의 건강한 성장을 주관합니다.\n• [지두부인(池頭夫人)]: 성모전 좌측에 모셔진 순산의 수호신으로, 임산부의 안전한 출산과 산모·아기의 건강을 지켜주십니다."
    },
    audioScript: {
      "zh-TW":
        "後殿正中間供奉的是天上聖母媽祖，出國旅遊或行車外出的信眾都會來求媽祖保佑平安。媽祖兩旁則有掌管求子育兒的註生娘娘，以及保佑孕婦平安順產的池頭夫人喔！",
      "en":
        "In the center of the Rear Hall sits Mazu, Goddess of the Sea, who blesses travelers with safe journeys. Flanking her are Zhusheng Niangniang, who blesses couples hoping to conceive, and Lady Chitou, who protects mothers during childbirth!",
      "ja":
        "後殿の中央には旅と航海の守り神・媽祖様が祀られています。その両脇には、子宝を授ける註生娘娘と、妊婦さんの安産を見守る池頭夫人が祀られていますよ。",
      "ko":
        "후전 중앙에는 안전한 여행을 지켜주시는 마조 여신이 모셔져 있습니다. 양옆으로는 아기를 점지해 주시는 주생낭랑과 임산부의 순산을 돕는 지두부인이 함께 계십니다."
    },
    followUps: ["deity_huatuo", "amulets_stamps"]
  },
  {
    id: "dress_code_etiquette",
    action: "guide_dress_code",
    category: "etiquette",
    keywords: [
      "穿著", "服裝", "禮儀", "禁忌", "短褲", "拖鞋", "拍照", "攝影", "寵物", "狗", "貓", "導盲犬", "生理期", "月經",
      "dress code", "clothes", "etiquette", "taboo", "rules", "photo", "camera", "pet", "dog", "cat", "period", "menstruation",
      "服装", "マナー", "タブー", "写真", "撮影", "ペット", "犬", "生理",
      "복장", "예절", "금기", "사진", "촬영", "반려동물", "강아지", "생리"
    ],
    title: {
      "zh-TW": "參拜禮儀、拍照規範與常見禁忌（生理期／寵物）",
      "en": "Etiquette, Photography, Pets & Common Taboos",
      "ja": "参拝マナー・写真撮影・よくある質問（生理中・ペット）",
      "ko": "참배 예절, 사진 촬영 및 자주 묻는 금기(생리·반려동물)"
    },
    shortDesc: {
      "zh-TW": "服裝整潔 • 拍照勿開閃光燈 • 導盲犬可入／寵物不落地 • 生理期可合十參拜",
      "en": "Neat attire • No flash photography • Pets in carriers • Menstruating visitors welcome",
      "ja": "清潔な服装 • フラッシュ禁止 • ペットはキャリーへ • 生理中も合掌参拝可能",
      "ko": "단정한 복장 • 플래시 금지 • 반려동물은 이동장 이용 • 생리 중에도 합장 가능"
    },
    textContent: {
      "zh-TW":
        "1. 【服裝與門檻】：請穿著整潔得體。進出殿門時請遵守「龍門進、虎門出」，跨過木門檻切勿踩踏。\n2. 【拍照與攝影】：建築與庭園歡迎拍照留念，但請「關閉閃光燈」，且勿直接對著神明金身正臉近距離特寫，亦避免拍打擾正在虔誠祈禱的信眾。\n3. 【寵物與導盲犬】：合格「導盲犬、導聾犬、肢體輔助犬」可全程陪同進入；一般犬貓寵物請置於「封閉式寵物推車或提袋」內，全程不落地、不露頭即可入寺。\n4. 【女性生理期可以拜嗎？】：完全可以！現代龍山寺倡導「心誠則靈、眾生平等」，且已全面停香，女性生理期期間只需雙手合十誠心禮拜即可，無須顧慮。",
      "en":
        "1. [Attire & Thresholds]: Dress neatly and respectfully. Enter via the Dragon Gate (right), exit via the Tiger Gate (left), and never step on the wooden door thresholds.\n2. [Photography]: Photography of the architecture is welcome, but please TURN OFF FLASH and avoid intrusive close-up shots directly in front of deity statues or worshipers.\n3. [Pets & Service Dogs]: Certified service/guide dogs are fully welcome. Regular pets must be kept inside enclosed pet strollers or carriers without touching the ground.\n4. [Menstruation]: Women on their period are completely welcome to worship! With palms joined in sincere devotion, all visitors are embraced equally by the Bodhisattvas.",
      "ja":
        "1. 【服装と敷居】：清潔で落ち着いた服装でお越しください。「龍門から入り虎門から出る」を守り、木製の敷居は踏まないようにします。\n2. 【写真撮影】：境内の撮影は可能ですが、「フラッシュ撮影は厳禁」です。また神仏の正面至近距離での撮影や、祈願中の参拝者の妨げになる撮影はお控えください。\n3. 【ペット・盲導犬】：盲導犬・介助犬は同伴可能です。一般のペットは全身が入るキャリーバッグやペットカートに入れ、地面に下ろさなければ入場可能です。\n4. 【生理中の参拝】：問題なくご参拝いただけます！現在は線香も廃止されており、真心の合掌であればどなたでも平等に神仏のご加護を受けられます。",
      "ko":
        "1. [복장 및 문턱]: 단정한 복장을 권장합니다. '용문 입장, 호문 퇴장'을 지키고 나무 문턱은 밟지 마세요.\n2. [사진 촬영]: 건축물 촬영은 가능하나 '플래시 사용은 엄격히 금지'됩니다. 신상 정면 초근접 촬영이나 기도 중인 신도에게 방해가 되는 촬영은 삼가주세요.\n3. [반려동물 및 안내견]: 장애인 보조견·안내견은 동반 입장이 가능합니다. 일반 반려동물은 바닥에 내려놓지 않고 이동장이나 유모차 안에 완전히 넣은 상태에서만 입장할 수 있습니다.\n4. [생리 중 참배]: 전혀 문제없습니다! 정성스러운 마음으로 두 손 모아 합장하는 참배는 누구나 평등하게 하실 수 있습니다."
    },
    audioScript: {
      "zh-TW":
        "參拜時請穿著整潔、跨過門檻不要踩踏，拍照請關閉閃光燈。導盲犬可以進入，一般寵物只要放在推車或提袋不落地就可以。另外女性生理期期間也完全可以雙手合十誠心參拜，請放心喔！",
      "en":
        "Please dress respectfully, step over thresholds, and turn off camera flash. Service dogs are welcome, and pets may enter inside enclosed carriers. Also, women on their menstrual period are completely welcome to join palms and pray!",
      "ja":
        "参拝時は敷居を踏まないようにし、撮影時のフラッシュはお控えください。ペットはカートやバッグに入れれば入場可能です。また、生理中の方も変わらず合掌してお参りいただけますのでご安心ください。",
      "ko":
        "참배 시 문턱을 밟지 마시고 사진 촬영 시 플래시는 꺼주세요. 반려동물은 이동장에 넣으면 동반 가능하며, 생리 중인 여성분도 아무 걱정 없이 합장 참배하실 수 있습니다."
    },
    followUps: ["incense_rules", "opening_hours_traffic"]
  },
  {
    id: "amulets_stamps",
    action: "guide_amulets",
    category: "services",
    keywords: [
      "平安符", "香火袋", "御守", "護身符", "紀念品", "紀念章", "印章", "蓋章", "點燈", "光明燈", "安太歲", "太歲燈", "過爐",
      "amulet", "charm", "talisman", "souvenir", "stamp", "blessing light", "tai sui", "lantern", "shop",
      "お守り", "御守", "記念スタンプ", "スタンプ", "光明燈", "安太歳", "授与所", "お土産",
      "부적", "오마모리", "호신부", "기념품", "스탬프", "도장", "광명등", "태세등"
    ],
    title: {
      "zh-TW": "平安符御守、光明燈與古蹟紀念章指南",
      "en": "Blessed Amulets, Lanterns & Memorial Stamps",
      "ja": "お守り（御守）・光明燈・記念スタンプのご案内",
      "ko": "행운 부적(오마모리), 광명등 및 기념 스탬프 안내"
    },
    shortDesc: {
      "zh-TW": "三川殿虎門側流通處請購平安符 • 香爐順時針過爐三圈 • 服務台可蓋紀念章",
      "en": "Amulet Counter by Tiger Gate • Circle censer 3 times • Free stamps at desk",
      "ja": "虎門横の授与所で各種お守り販売 • 香炉の上で時計回りに3周 • スタンプあり",
      "ko": "호문 옆 판매소에서 부적 구매 • 향로 위 시계방향 3바퀴 • 안내소 기념 스탬프"
    },
    textContent: {
      "zh-TW":
        "1. 【請購平安符／御守】：龍山寺於三川殿內左側（靠近虎門出口處）設有「幸運符令／佛教文物流通處」，提供超過數十款精緻御守（如：月老良緣御守、文昌金榜御守、華陀健康符、行車平安符、寵物平安符等）。\n2. 【平安符開光過爐】：請購平安符後，請至正殿或對應神明殿前，雙手合十稟報佩帶者姓名與心願，將平安符於香爐上方「順時針繞三圈」加持。\n3. 【點燈祈福（光明燈／安太歲）】：可於後殿辦事處或線上辦理光明燈、文昌燈、藥師燈、財神燈及安太歲。\n4. 【古蹟紀念章】：三川殿服務台備有「國定古蹟艋舺龍山寺紀念章」，歡迎旅人集章留念。",
      "en":
        "1. [Blessed Amulets & Charms]: Located inside the Front Hall near the Tiger Gate exit, the Official Amulet Counter offers dozens of exquisite charms (for love, exams, health, safe driving, and even pet protection).\n2. [How to Activate Your Amulet]: After purchasing, stand before the deity, state the wearer's name and wish, and circle the amulet CLOCKWISE 3 times above the main censer.\n3. [Blessing Lanterns]: Registration for Bright Lanterns (Guangming Deng) and Tai Sui blessings is available at the administrative office.\n4. [Memorial Stamps]: Free ink stamps for travel journals are located at the Sanchuan Hall service desk.",
      "ja":
        "1. 【お守り（御守）授与所】：三川殿の左側（虎門出口の近く）に公式のお守り授与所があり、恋愛成就・合格祈願・健康長寿・交通安全・ペット守護など数十種類の美しい台湾御守をお求めいただけます。\n2. 【お守りの加持（過炉）】：お守りを授かったら、神仏の前で名前と願いを伝え、香炉の上で「時計回りに3回」くぐらせて霊気を込めましょう。\n3. 【記念スタンプ】：三川殿の案内カウンターに記念スタンプが設置されており、ご自由に押印いただけます。",
      "ko":
        "1. [부적(오마모리) 판매소]: 삼천전 좌측(호문 출구 근처)에 공식 부적 판매소가 있으며, 연애운·합격운·건강·교통안전·반려동물 수호 등 수십 종의 아름다운 부적을 구입하실 수 있습니다.\n2. [부적 기운 넣기(과로)]: 부적을 구하신 후 신령님 앞에서 이름과 소원을 말하고, 중앙 향로 위에서 '시계 방향으로 세 바퀴' 돌려 영험한 기운을 담으세요.\n3. [기념 스탬프]: 삼천전 안내데스크에 방문 기념 스탬프가 비치되어 있습니다."
    },
    audioScript: {
      "zh-TW":
        "如果您想請購精美的平安符或月老、文昌、健康御守，就在三川殿左邊靠近虎門的文物流通處！拿到平安符後，記得去香爐上方順時針繞三圈加持。另外服務台還有古蹟紀念章可以蓋章留念喔！",
      "en":
        "Exquisite blessed amulets for romance, exams, health, and pets are available at the counter near the Tiger Gate exit! After choosing your amulet, remember to circle it clockwise three times above the censer. Free memorial stamps are also at the service desk!",
      "ja":
        "大人気のお守りは、三川殿左側の虎門近くにある授与所でお求めいただけます！お守りを手に入れたら、香炉の上で時計回りに3回くぐらせてパワーを授かりましょう。案内カウンターには記念スタンプもありますよ！",
      "ko":
        "인기 만점인 연애, 학업, 건강 부적은 삼천전 왼쪽 호문 근처 판매소에서 구입하실 수 있습니다! 부적을 받으신 후에는 향로 위에서 시계 방향으로 세 바퀴 돌려 기운을 받아 가세요. 안내소에는 기념 스탬프도 준비되어 있습니다!"
    },
    followUps: ["yue_lao_guide", "deity_wenchang"]
  }
];

export const allKnowledgeFaqs = [...coreFaqs, ...extendedFaqs];

/**
 * 360° Panorama & Architectural Hotspots Database
 * Supports both GoThru postMessage / URL triggers and interactive on-page exploration
 */
export const hotspotGuides = {
  guanyin_hall: {
    id: "guanyin_hall",
    target: "stone_lion_and_hall",
    icon: "🦁",
    badge: {
      "zh-TW": "三川殿正門守護",
      "en": "Sanchuan Gate Guardians",
      "ja": "三川殿・山門守護",
      "ko": "삼천전 정문 수호"
    },
    title: {
      "zh-TW": "三川殿青斗石獅與觀音正殿",
      "en": "Sanchuan Hall Stone Lions & Guanyin Main Hall",
      "ja": "三川殿の青斗石獅子と本尊観音正殿",
      "ko": "삼천전 청두 석사자 및 본존 관음전"
    },
    subtitle: {
      "zh-TW": "360° 實景熱點 • 清代泉州青斗石名雕與山門鎮守",
      "en": "360° Hotspot • Qing Dynasty Green Granite Guardians",
      "ja": "360°パノラマ連動 • 清朝石彫芸術と山門の守護神獣",
      "ko": "360° 파노라마 연동 • 청대 석조 예술과 사찰 수호신"
    },
    location: {
      "zh-TW": "三川殿正門兩側及圓通寶殿前庭",
      "en": "Both sides of Sanchuan Hall Main Gate & Courtyard",
      "ja": "三川殿正門両脇および正殿前庭",
      "ko": "삼천전 정문 양옆 및 정전 앞뜰"
    },
    textContent: {
      "zh-TW":
        "您目前探索的是三川殿正門兩側著名的「青斗石獅」！\n\n這對石獅採用堅硬溫潤的福建泉州青斗石精雕而成，依循傳統「左雄右雌（以建築自身面向外為準；信眾面對廟門則為右雄左雌）」配置：\n• 【面對廟門右側 — 雄獅】：張口咆哮、口含石珠，前足踏繡球與彩帶，象徵威震四方、開口納財迎福。\n• 【面對廟門左側 — 雌獅】：雙唇微閉、神態慈祥，爪下溫柔撫弄幼獅，象徵慈悲守護、子孫繁衍昌盛。\n\n穿過石獅鎮守的三川殿山門後，映入眼簾的即是供奉主神「觀世音菩薩」的圓通寶殿。",
      "en":
        "You are exploring the renowned 'Qingdou Green Granite Guardian Lions' flanking the Sanchuan Front Hall!\n\nCarved from dense Fujian green granite, this pair embodies traditional architectural symbolism:\n• [Right Side Facing Gate — Male Lion]: Open jaws holding a rolling stone pearl while treading on an embroidered silk ball, symbolizing authority and welcoming prosperity.\n• [Left Side Facing Gate — Female Lion]: Gently closed mouth with a serene expression, cradling a playful cub beneath her paw, symbolizing maternal compassion and family continuity.\n\nPassing beyond these guardians through the Dragon Gate leads directly to the Main Hall of Guanyin Bodhisattva.",
      "ja":
        "現在ご覧いただいているのは、三川殿の正門両脇に鎮座する名作「青斗石獅子（狛犬）」です！\n\n福建省産の銘石・青斗石（緑泥石片岩）から彫り出された一対の守護獣です：\n• 【正面向かって右 — 雄獅子】：口を大きく開けて玉を含み、足元で繍球（まり）を踏んで威厳と招福を表しています。\n• 【正面向かって左 — 雌獅子】：口を優しく結んで慈愛をたたえ、足元で子獅子を撫でながら家内安全と子孫繁栄を見守っています。\n\n邪気を払う石獅子の山門をくぐると、ご本尊・観世音菩薩が鎮座する「円通宝殿（正殿）」へと続きます。",
      "ko":
        "지금 보고 계신 곳은 삼천전 정문 양옆을 지키는 명작 '청두 석사자'입니다!\n\n푸젠성 특산 청두석(녹색 화강암)을 정교하게 깎아 만든 한 쌍의 수호 신수입니다:\n• [정면 기준 우측 — 수사자]: 입을 크게 벌려 여의주를 머금고 발로 비단 공(수구)을 밟고 있어, 사방의 사기를 물리치고 복과 재물을 맞이함을 상징합니다.\n• [정면 기준 좌측 — 암사자]: 입을 부드럽게 다문 온화한 표정으로 발아래 새끼 사자를 보듬고 있어, 자애로운 수호와 자손의 번영을 상징합니다.\n\n석사자가 지키는 산문을 지나 안으로 들어서면 주신 '관세음보살'을 모신 원통보전(정전)이 펼쳐집니다."
    },
    audioScript: {
      "zh-TW":
        "您好！您現在看到的是三川殿門前的清代青斗石獅！面對廟門右手邊張口的是公獅，腳踩繡球代表迎祥納福；左手邊閉口的是母獅，懷抱小獅子展現慈悲溫柔。穿過石獅守護的山門，就是主神觀世音菩薩的正殿喔！",
      "en":
        "Hello! You are looking at the Qing Dynasty green granite Guardian Stone Lions! Facing the gate, the open-mouthed male lion on the right treads on a silk ball to welcome fortune, while the gentle female lion on the left cradles her cub. Passing through them leads to the Main Hall of Guanyin Bodhisattva!",
      "ja":
        "こんにちは！こちらは三川殿正面の青斗石獅子です。向かって右の口を開けた雄獅子は玉を踏んで福を招き、左の口を結んだ雌獅子は子獅子を優しく守っています。この山門を抜けると、ご本尊・観世音菩薩の正殿ですよ。",
      "ko":
        "안녕하세요! 지금 보시는 것은 삼천전 앞의 청두 석사자입니다! 정면 오른쪽에 입을 벌린 수사자는 비단 공을 밟아 복을 부르고, 왼쪽에 입을 다문 암사자는 새끼 사자를 품어 자애로움을 나타냅니다. 이 산문을 지나면 관세음보살님의 정전으로 이어집니다!"
    },
    comparison: {
      leftTitle: {
        "zh-TW": "🦁 右側雄獅（公獅 • 龍邊）",
        "en": "🦁 Right: Male Lion (Dragon Side)",
        "ja": "🦁 右側：雄獅子（阿形・龍側）",
        "ko": "🦁 우측: 수사자 (용변)"
      },
      leftDesc: {
        "zh-TW": "張口含珠、腳踏繡球彩帶。象徵開口納福、威震四方、辟除一切穢氣。",
        "en": "Open mouth with pearl, treading on embroidered ball. Welcomes wealth & wards off evil.",
        "ja": "口を開け宝珠を含み、繍球を踏む。招福開運・邪気払いの威厳を示す。",
        "ko": "입을 벌려 구슬을 머금고 비단 공을 밟음. 복과 재물을 부르고 사기를 물리침."
      },
      rightTitle: {
        "zh-TW": "🦁 左側雌獅（母獅 • 虎邊）",
        "en": "🦁 Left: Female Lion (Tiger Side)",
        "ja": "🦁 左側：雌獅子（吽形・虎側）",
        "ko": "🦁 좌측: 암사자 (호변)"
      },
      rightDesc: {
        "zh-TW": "閉口含蓄、爪下逗弄幼獅。象徵慈悲守護、守財聚氣、子孫世代綿延。",
        "en": "Closed mouth, tenderly holding cub. Symbolizes maternal grace & family prosperity.",
        "ja": "口を優しく結び、子獅子を抱く。慈悲の守護と一族の繁栄・家内安全を象徴。",
        "ko": "입을 다물고 새끼 사자를 보듬음. 자애로운 사랑과 가문의 번영·평안을 상징."
      }
    }
  },
  bronze_dragon_pillar: {
    id: "bronze_dragon_pillar",
    target: "bronze_dragon_pillar",
    icon: "🐉",
    badge: {
      "zh-TW": "全臺唯一國寶工藝",
      "en": "Taiwan's Sole Bronze Pillar",
      "ja": "台湾唯一の鋳銅龍柱",
      "ko": "대만 유일 청동 용기둥"
    },
    title: {
      "zh-TW": "三川殿全臺唯一「銅鑄蟠龍柱」",
      "en": "Taiwan's Only Cast-Bronze Dragon Columns",
      "ja": "台湾唯一の「鋳銅製蟠龍柱（ばんりゅうちゅう）」",
      "ko": "대만 유일의 '청동 주조 반룡기둥(용기둥)'"
    },
    subtitle: {
      "zh-TW": "1920 年王益順大師設計 • 李祿星銅鑄名作",
      "en": "1920 Masterpiece by Architect Wang Yi-Shun & Sculptor Li Lu-Sing",
      "ja": "1920年名匠・王益順と李禄星による近代工芸の傑作",
      "ko": "1920년 명장 왕익순 설계 • 이록성 주조 걸작"
    },
    location: {
      "zh-TW": "三川殿前步口明間（正門中央兩側）",
      "en": "Front Porch of Sanchuan Hall (Flanking Central Door)",
      "ja": "三川殿 正門中央の両脇",
      "ko": "삼천전 정문 중앙 양옆"
    },
    textContent: {
      "zh-TW":
        "位於三川殿正門前的這對龍柱，是**全台灣唯一的一對銅鑄龍柱**！\n\n西元 1920 年龍山寺大修時，由泉州溪底派大木名師王益順設計，委託廈門剪黏與鑄銅名匠李祿星鑄造。柱身採「單龍盤柱」形式，巨龍昂首吐珠、雲紋翻騰，底部則有海浪拍擊岩石與鯉魚躍龍門的精緻浮雕，柱身還雕有封神榜人物故事，工藝細膩冠絕全臺！",
      "en":
        "Standing at the front porch of Sanchuan Hall is **Taiwan's ONLY pair of cast-bronze dragon columns**!\n\nCreated during the 1920 grand reconstruction directed by master architect Wang Yi-Shun and cast in bronze by artisan Li Lu-Sing, each column features a single coiling dragon rising amidst swirling clouds. At the base, waves crash against rocks where carp leap over the Dragon Gate, accompanied by intricate relief figures from classic mythology.",
      "ja":
        "三川殿の正面中央に立つこの一対の柱は、**台湾で唯一の「銅鋳造の龍柱」**です！\n\n1920年（大正9年）の大改修の際、名棟梁・王益順の設計のもと、彫金の名匠・李禄星によって鋳造されました。天へと昇る迫力ある一頭の龍が雲間を舞い、柱の根元には荒波と「鯉の滝登り（登竜門）」、さらに『封神演義』の物語が立体的に鋳出された国宝級の芸術品です。",
      "ko":
        "삼천전 정문 중앙에 자리한 이 한 쌍의 기둥은 **대만 전체에서 유일한 '청동 주조 용기둥'**입니다!\n\n1920년 대수리 당시 명장 왕익순의 설계로 주조 장인 이록성이 완성했습니다. 구름 사이로 승천하는 단일 용이 기둥을 휘감고 있으며, 기단부에는 파도와 바위, 잉어가 용문을 뛰어오르는 '등용문' 조각과 봉신연의 인물상이 정교하게 새겨져 있습니다."
    },
    audioScript: {
      "zh-TW":
        "請看三川殿正門中央這對閃耀古銅色澤的龍柱，這是全台灣唯一的一對銅鑄蟠龍柱！建於 1920 年，巨龍盤旋在雲海波濤之間，柱子下方還有鯉魚躍龍門與封神榜的立體雕飾，是龍山寺最珍貴的國寶級工藝之一！",
      "en":
        "Behold the bronze columns flanking the central gate of Sanchuan Hall—these are the only cast-bronze dragon pillars in all of Taiwan! Cast in 1920, majestic dragons coil through clouds above leaping carp, representing the pinnacle of temple craftsmanship!",
      "ja":
        "三川殿の中央にあるこちらの柱をご覧ください。台湾で唯一現存する銅鋳造の龍柱です！1920年に造られ、雲間を昇る龍と鯉の滝登りが精緻に表現された、龍山寺屈指の至宝です。",
      "ko":
        "삼천전 중앙의 이 기둥을 주목해 주세요. 대만에서 유일한 청동 주조 용기둥입니다! 1920년에 제작되어 구름을 가르는 용과 등용문의 잉어가 입체적으로 조각된 국보급 예술품입니다."
    }
  },
  spiral_caisson: {
    id: "spiral_caisson",
    target: "spiral_caisson",
    icon: "🏛️",
    badge: {
      "zh-TW": "無釘卡榫木構奇蹟",
      "en": "Nail-Free Timber Dome",
      "ja": "釘を使わない木組み天井",
      "ko": "못 없이 짜 맞춘 나선형 천장"
    },
    title: {
      "zh-TW": "三川殿八角藻井與正殿螺旋藻井",
      "en": "Octagonal & Spiral Caisson Ceilings (Zaojing)",
      "ja": "八角藻井と正殿の螺旋藻井（らせんそうせい）",
      "ko": "팔각 조우징 및 정전 나선형 조우징(천장 공포)"
    },
    subtitle: {
      "zh-TW": "全木榫卯結構 • 不費一釘一鐵的力學與美學結晶",
      "en": "Pure Mortise-and-Tenon Joinery Without a Single Nail",
      "ja": "釘を一本も使わない伝統木組み「斗栱（ときょう）」の極致",
      "ko": "단 하나의 못도 쓰지 않은 전통 목조 결구 기법의 극치"
    },
    location: {
      "zh-TW": "三川殿與圓通寶殿上方穹頂",
      "en": "Interior Domes of Sanchuan Hall & Main Hall",
      "ja": "三川殿および正殿の天井ドーム",
      "ko": "삼천전 및 정전 내부 천장 돔"
    },
    textContent: {
      "zh-TW":
        "抬頭仰望三川殿與正殿上方，可欣賞台灣傳統木構造最頂尖的「藻井（結網）」工藝！\n\n正殿圓通寶殿的「螺旋藻井」由王益順大師主持興建，全數採用斗栱層層出挑、以精準木榫卯卡合旋轉而上，**完全沒有使用任何一根鐵釘**。不僅在力學上能支撐巨大的重簷歇山頂，在聲學上更能匯聚誦經梵音，頂心明鏡繪有雙龍護八卦，寓意鎮邪護法。",
      "en":
        "Look up inside Sanchuan Hall and the Main Hall to witness the pinnacle of traditional timber architecture: the 'Caisson Ceiling' (Zaojing)!\n\nBuilt by master carpenter Wang Yi-Shun, thousands of interlocking wooden brackets (Dougong) spiral upward into a dome **without using a single iron nail**. Beyond its structural brilliance in supporting the heavy roof, it acts as a natural acoustic resonator for Buddhist chanting.",
      "ja":
        "三川殿や正殿に入ったら、ぜひ天井を見上げてください。名匠・王益順が手掛けた「螺旋藻井（らせんそうせい）」が広がっています！\n\n無数の木製パーツ（斗栱）をパズルのように組み上げ、渦を巻きながらドーム状に広がるこの天井は、**鉄釘を一本も使わずに**組まれています。屋根の荷重を支える力学的な強さだけでなく、読経の声を美しく響かせる音響効果も備えています。",
      "ko":
        "삼천전과 정전 내부에서 고개를 들어 천장을 올려다보시면 전통 목조 건축의 꽃인 '조우징(藻井)'을 감상하실 수 있습니다!\n\n명장 왕익순이 설계한 정전의 나선형 조우징은 수천 개의 나무 공포(두공)를 정밀한 장부맞춤으로 겹겹이 쌓아 올린 것으로, **철못을 단 한 개도 사용하지 않았습니다**. 거대한 지붕 하중을 지탱할 뿐 아니라 독경 소리를 아름답게 울려 퍼지게 하는 음향학적 설계가 담겨 있습니다."
    },
    audioScript: {
      "zh-TW":
        "走進殿內請抬頭往上看！正殿上方的螺旋藻井，是由無數木頭斗栱層層旋轉卡榫而成，完全沒有用到任何一根鐵釘！它不僅能支撐屋頂重量，還能讓誦經聲產生神聖的共鳴喔！",
      "en":
        "Look up at the ceiling inside the hall! This breathtaking spiral caisson dome is constructed from thousands of interlocking wooden brackets without a single iron nail, naturally amplifying the resonance of temple chants!",
      "ja":
        "殿内に入ったらぜひ天井を見上げてください！この美しい螺旋藻井は、釘を一本も使わずに木組みだけでドーム状に組まれており、読経の声を神聖に響かせる効果があるんですよ。",
      "ko":
        "전각 안에서 천장을 올려다보세요! 이 정교한 나선형 천장은 못을 단 하나도 쓰지 않고 나무 맞춤만으로 완성한 걸작으로, 독경 소리를 웅장하게 공명시키는 역할도 합니다."
    }
  }
};

// Alias mappings so any hotspot ID from GoThru resolves cleanly
export const HOTSPOT_ALIASES = {
  stone_lion: "guanyin_hall",
  shishi: "guanyin_hall",
  lion: "guanyin_hall",
  sanchuan_hall: "guanyin_hall",
  dragon: "bronze_dragon_pillar",
  pillar: "bronze_dragon_pillar",
  dragon_pillar: "bronze_dragon_pillar",
  caisson: "spiral_caisson",
  dome: "spiral_caisson",
  zaojing: "spiral_caisson"
};
