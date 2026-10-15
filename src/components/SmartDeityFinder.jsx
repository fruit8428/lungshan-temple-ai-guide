import React, { useState } from 'react';
import {
  Heart,
  GraduationCap,
  Briefcase,
  Activity,
  Compass,
  ShieldCheck,
  Volume2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { fetchRoute } from '../utils/api';
import { speechManager } from '../utils/tts';
import { getActiveTempleSlug } from '../core/supabaseClient';

const LUNGSHAN_WISH_CARDS = [
  {
    id: 'wish_love',
    action: 'guide_yue_lao',
    icon: Heart,
    badge: '後殿左翼 • 月老廳',
    color: 'from-rose-500/15 to-pink-500/20 border-rose-300 text-rose-900',
    label: {
      'zh-TW': '求良緣紅線（月下老人）',
      en: 'Love & Red String (Yue Lao)',
      ja: '良縁・赤い糸（月下老人）',
      ko: '연애·붉은 실 (월하노인)'
    }
  },
  {
    id: 'wish_exam',
    action: 'guide_wenchang',
    icon: GraduationCap,
    badge: '後殿右翼 • 文昌廳',
    color: 'from-blue-500/15 to-indigo-500/20 border-blue-300 text-blue-900',
    label: {
      'zh-TW': '求考運功名（文昌帝君）',
      en: 'Exams & Study (Wenchang)',
      ja: '合格祈願・学業（文昌帝君）',
      ko: '시험 합격·학업 (문창제군)'
    }
  },
  {
    id: 'wish_wealth',
    action: 'guide_guangong',
    icon: Briefcase,
    badge: '後殿左翼 • 關帝廳',
    color: 'from-amber-500/15 to-orange-500/20 border-amber-300 text-amber-900',
    label: {
      'zh-TW': '求事業財運（關聖帝君）',
      en: 'Career & Wealth (Guan Gong)',
      ja: '仕事運・商売繁盛（関聖帝君）',
      ko: '사업·재물운 (관성제군)'
    }
  },
  {
    id: 'wish_health',
    action: 'guide_huatuo',
    icon: Activity,
    badge: '後殿右翼 • 華陀廳',
    color: 'from-emerald-500/15 to-teal-500/20 border-emerald-300 text-emerald-900',
    label: {
      'zh-TW': '求健康康復（華陀仙師）',
      en: 'Health & Healing (Hua Tuo)',
      ja: '無病息災・病気平癒（華陀仙師）',
      ko: '건강·질병 쾌유 (화타선사)'
    }
  },
  {
    id: 'wish_travel_child',
    action: 'guide_mazu_zhusheng',
    icon: Compass,
    badge: '後殿中央 • 聖母殿',
    color: 'from-purple-500/15 to-violet-500/20 border-purple-300 text-purple-900',
    label: {
      'zh-TW': '求出國平安／求子（媽祖•註生娘娘）',
      en: 'Safe Travel & Fertility (Mazu)',
      ja: '旅の安全・子宝安産（媽祖・註生）',
      ko: '여행 안전·임신 순산 (마조·주생)'
    }
  },
  {
    id: 'wish_amulet',
    action: 'guide_amulets',
    icon: ShieldCheck,
    badge: '三川殿虎門側 • 流通處',
    color: 'from-red-500/15 to-amber-500/20 border-red-300 text-red-900',
    label: {
      'zh-TW': '請購平安符御守與過爐指南',
      en: 'Blessed Amulets & Stamps',
      ja: 'お守り授与・過炉と記念スタンプ',
      ko: '행운 부적(오마모리) 및 스탬프'
    }
  }
];

const HESHENG_WISH_CARDS = [
  {
    id: 'hs_xuantian',
    action: 'guide_hs_xuantian',
    icon: ShieldCheck,
    badge: '一樓大堂正殿 • 主神殿',
    color: 'from-amber-500/15 to-red-500/20 border-amber-300 text-amber-900',
    label: {
      'zh-TW': '消災解厄與事業（北極玄天上帝）',
      en: 'Protection & Career (Emperor Xuantian)',
      ja: '厄除け・事業運（北極玄天上帝）',
      ko: '액운 타파·사업번창 (북극현천상제)'
    },
    directGuide: {
      'zh-TW': {
        title: '一樓大堂正殿：北極玄天上帝（上帝公）參拜指南',
        text: '• 殿堂位置：一樓大堂中央主殿\n• 神職護佑：斬妖除魔、消災解厄、事業開創、小人退散、闔家平安\n• 參拜秘訣：玄天上帝腳踏龜蛇、手持七星寶劍，正氣凜然。參拜時請誠心稟報姓名、農曆生日、住址與近期遇到的瓶頸，祈求上帝公撥雲見日、賜予智慧與貴人扶持。',
        audioScript: '一樓大堂中央奉祀主神北極玄天上帝，俗稱上帝公。玄天上帝手持七星寶劍、腳踏龜蛇，護佑信眾消災解厄、斬除小人並開創事業。參拜時請誠心稟報姓名、農曆生日與心願，祈求上帝公指點迷津、出入平安。'
      },
      en: {
        title: '1F Grand Hall: Emperor Xuantian (Xuanwu) Guide',
        text: '• Location: 1F Central Main Altar\n• Blessings: Warding off misfortune, career breakthroughs, and family peace\n• Ritual Tip: State your name, birth date, and wish sincerely before the main statue of Emperor Xuantian.',
        audioScript: 'The 1st floor Main Hall enshrines Emperor Xuantian, holding the Seven-Star Sword and stepping on the Tortoise and Snake. Pray here for protection against misfortune, career success, and family peace.'
      }
    }
  },
  {
    id: 'hs_zhusheng',
    action: 'guide_hs_zhusheng',
    icon: Heart,
    badge: '一樓大堂龍邊 • 註生殿',
    color: 'from-rose-500/15 to-pink-500/20 border-rose-300 text-rose-900',
    label: {
      'zh-TW': '求子安胎與良緣家庭（註生娘娘）',
      en: 'Fertility & Safe Childbirth (Zhusheng)',
      ja: '子宝・安産・家庭円満（註生娘娘）',
      ko: '임신·순산·가정 화목 (주생낭랑)'
    },
    directGuide: {
      'zh-TW': {
        title: '一樓大堂龍邊（右側）：註生娘娘參拜指南',
        text: '• 殿堂位置：一樓大堂龍邊（面對神明右手邊）側殿\n• 神職護佑：求子嗣、孕期安胎、順產平安、孩童健康成長\n• 參拜秘訣：可準備鮮花或水果誠心參拜，祈求良緣結晶、母子均安、家庭美滿。',
        audioScript: '一樓大堂龍邊奉祀註生娘娘，專門護佑求子嗣、孕期安胎、順產平安以及孩童健康成長。信眾可準備鮮花或水果誠心祈求家庭美滿。'
      },
      en: {
        title: '1F Dragon Side: Zhusheng Niangniang Guide',
        text: '• Location: 1F Dragon Side (Right side facing the altar)\n• Blessings: Fertility, safe pregnancy, and children’s health.',
        audioScript: 'On the Dragon side of the 1st floor hall sits Zhusheng Niangniang, blessing families with fertility, safe childbirth, and healthy children.'
      }
    }
  },
  {
    id: 'hs_fude',
    action: 'guide_hs_fude',
    icon: Briefcase,
    badge: '一樓大堂虎邊 • 福德殿',
    color: 'from-emerald-500/15 to-teal-500/20 border-emerald-300 text-emerald-900',
    label: {
      'zh-TW': '求正財偏財與生意（福德正神）',
      en: 'Wealth & Local Prosperity (Earth God)',
      ja: '金運・商売繁盛（福德正神・土地公）',
      ko: '재물운·상업 번창 (복덕정신·토지공)'
    },
    directGuide: {
      'zh-TW': {
        title: '一樓大堂虎邊（左側）：福德正神（土地公）參拜指南',
        text: '• 殿堂位置：一樓大堂虎邊（面對神明左手邊）側殿\n• 神職護佑：守護鄉里、賜予正財偏財、開店生意興隆、業績長紅\n• 參拜秘訣：土地公最喜愛麻糬、花生、甜食與水果。參拜時可稟報公司行號或工作地點，祈求財源廣進。',
        audioScript: '一樓大堂虎邊奉祀福德正神土地公。土地公守護鄉里並賜予正財與生意興隆，參拜時可準備麻糬、花生或水果，稟報工作地點，祈求財源廣進、業績長紅。'
      },
      en: {
        title: '1F Tiger Side: Fude Zhengshen (Earth God) Guide',
        text: '• Location: 1F Tiger Side (Left side facing the altar)\n• Blessings: Business prosperity, steady wealth, and neighborhood safety.',
        audioScript: 'On the Tiger side of the 1st floor hall sits Fude Zhengshen, the Earth God. Pray here for business success, career stability, and financial prosperity.'
      }
    }
  },
  {
    id: 'hs_wenchang',
    action: 'guide_hs_wenchang',
    icon: GraduationCap,
    badge: '樓上殿堂 • 文昌殿',
    color: 'from-blue-500/15 to-indigo-500/20 border-blue-300 text-blue-900',
    label: {
      'zh-TW': '求考運升學與功名（文昌帝君）',
      en: 'Exams & Academic Success (Wenchang)',
      ja: '合格祈願・学業成就（文昌帝君）',
      ko: '시험 합격·학업 성취 (문창제군)'
    },
    directGuide: {
      'zh-TW': {
        title: '賀聖宮樓上殿堂：文昌帝君考運功名指南',
        text: '• 殿堂位置：樓上殿堂文昌殿\n• 神職護佑：升學大考、國家公職考試、證照檢定、職場升遷與智慧開竅\n• 吉祥供品：芹菜（勤奮）、青蔥（聰明）、菜頭（好彩頭）、粽子（包中）。亦可於一樓服務台登記點「文昌燈」。',
        audioScript: '賀聖宮樓上奉祀文昌帝君，護佑學子升學大考、國考證照與職場升遷。考生可攜帶准考證影本參拜，並可於一樓服務台辦理文昌燈，祈求金榜題名、考運亨通。'
      },
      en: {
        title: 'Upper Hall: Emperor Wenchang Exam Blessing Guide',
        text: '• Location: Upper Floor Wenchang Hall\n• Blessings: Academic exams, certifications, and career promotion.',
        audioScript: 'The upper hall enshrines Emperor Wenchang, the deity of literature and examinations. Students and professionals pray here for exam success and wisdom.'
      }
    }
  },
  {
    id: 'hs_guangong',
    action: 'guide_hs_guangong',
    icon: Compass,
    badge: '樓上殿堂 • 武聖殿',
    color: 'from-purple-500/15 to-violet-500/20 border-purple-300 text-purple-900',
    label: {
      'zh-TW': '求貴人扶持與武財神（關聖帝君）',
      en: 'Righteousness & Business (Guan Gong)',
      ja: '商売繁盛・貴人運（関聖帝君）',
      ko: '귀인 상봉·무재신 (관성제군)'
    },
    directGuide: {
      'zh-TW': {
        title: '賀聖宮樓上殿堂：關聖帝君（恩主公）參拜指南',
        text: '• 殿堂位置：樓上殿堂\n• 神職護佑：忠義正氣、商業契約順利、貴人扶持、武財神招財\n• 參拜秘訣：祈求事業合夥誠信、遠離是非小人、業務拓展順利。',
        audioScript: '賀聖宮樓上奉祀關聖帝君，又稱恩主公與武財神。護佑信眾事業合夥誠信、貴人扶持與財運亨通。'
      },
      en: {
        title: 'Upper Hall: Guan Sheng Dijun (God of Martial Wealth)',
        text: '• Location: Upper Floor Hall\n• Blessings: Business integrity, benefactors, and martial wealth.',
        audioScript: 'Guan Sheng Dijun blesses worshippers with business integrity, helpful benefactors, and strong career fortune.'
      }
    }
  },
  {
    id: 'hs_lantern',
    action: 'guide_hs_lantern',
    icon: Activity,
    badge: '一樓大堂 • 服務台',
    color: 'from-red-500/15 to-amber-500/20 border-red-300 text-red-900',
    label: {
      'zh-TW': '點光明燈／安太歲／平安祈福',
      en: 'Blessing Lanterns & Tai Sui Service',
      ja: '光明燈・安太歳・祈祷のご案内',
      ko: '광명등·안태세·평안 기원 안내'
    },
    directGuide: {
      'zh-TW': {
        title: '一樓大堂服務台：點光明燈、安太歲與祈福指南',
        text: '• 辦理位置：一樓大堂服務台\n• 服務項目：光明燈、安太歲（太歲燈）、文昌燈、財利燈、平安祈福卡\n• 辦理方式：請準備祈福者之「姓名、農曆出生年月日、吉時與居住地址」，由服務台人員協助登記造冊，每逢初一、十五皆有誦經植福。',
        audioScript: '若欲辦理點光明燈、安太歲、文昌燈或財利燈，請至一樓大堂服務台。只需準備祈福者的姓名、農曆生日與地址即可登記，由北極玄天上帝全年護佑元辰光彩、出入平安。'
      },
      en: {
        title: '1F Service Desk: Blessing Lanterns & Tai Sui Registration',
        text: '• Location: 1F Grand Hall Service Desk\n• Services: Blessing Lanterns, Tai Sui, Wenchang, and Wealth Lanterns.',
        audioScript: 'Visit the 1st floor Service Desk to register for Blessing Lanterns or Tai Sui protection. Simply provide your name and birth date for year-round blessings.'
      }
    }
  }
];

const JIAOBEI_OUTCOMES = {
  sheng: {
    icon: '🌙✨',
    streakIncrement: true,
    title: {
      'zh-TW': '聖筊（一平一凸）— 神明應允吉祥！',
      en: 'Sheng-Jiao (One Flat, One Round) — Affirmative Blessing!',
      ja: '聖筊（表と裏）— 神仏のご承諾・大吉！',
      ko: '성교(聖筊, 평평한 면+둥근 면) — 신령님의 허락·길조!'
    },
    desc: {
      'zh-TW':
        '一正一反代表陰陽協調，表示神明贊同、准許您的祈願或確認此支籤詩。若求月老紅線或確認籤詩，需連續擲出三次聖筊！',
      en: 'Yin and Yang are in harmony! The deity approves your request. For Yue Lao red threads or fortune poems, 3 consecutive Sheng-Jiao are required.',
      ja: '陰陽が調和し、神様が願いを聞き届けてくださった合図です。赤い糸やおみくじの確定には3回連続の聖筊が必要です！',
      ko: '음양이 조화를 이루어 신령님께서 소원을 허락하셨다는 뜻입니다. 월하노인 붉은 실이나 점괘 확정을 위해서는 3회 연속 성교가 필요합니다!'
    }
  },
  xiao: {
    icon: '😊🙏',
    streakIncrement: false,
    title: {
      'zh-TW': '笑筊（兩平面朝上）— 神明微笑不語',
      en: 'Xiao-Jiao (Both Flat Sides Up) — Gentle Smile',
      ja: '笑筊（両方とも平らな面）— 神様の微笑み',
      ko: '소교(笑筊, 두 평평한 면이 위) — 온화한 미소'
    },
    desc: {
      'zh-TW':
        '代表神明和藹微笑。通常是因為您的問題還不夠具體，或是您心裡其實已經有答案了。請整理思緒、把條件講清楚後再擲一次！',
      en: 'The deity smiles warmly. Usually, your question was too broad or you already know the answer in your heart. Clarify your wish and toss again!',
      ja: '神様が優しく微笑んでおられます。質問が少し曖昧か、すでに心の中で答えが決まっているようです。条件を具体的に伝えてもう一度投げましょう。',
      ko: '신령님께서 온화하게 미소 짓고 계십니다. 질문이 다소 모호하거나 이미 마음속에 답을 알고 계신 경우입니다. 내용을 구체적으로 정리해 다시 던져보세요.'
    }
  },
  yin: {
    icon: '🛑🕯️',
    streakIncrement: false,
    title: {
      'zh-TW': '陰筊／蓋筊（兩凸面朝上）— 時機未到請再思量',
      en: 'Yin-Jiao (Both Round Sides Up) — Wait or Reconsider',
      ja: '陰筊（両方とも丸い面）— 時期尚早・再考のサイン',
      ko: '음교(陰筊, 두 둥근 면이 위) — 시기상조·재고 필요'
    },
    desc: {
      'zh-TW':
        '代表目前時機尚未成熟，或所抽竹籤並非神明要賜予的那支。請靜下心重新向神明稟明，或將竹籤放回重新抽取。',
      en: 'Indicates the timing is not yet right, or the drawn bamboo stick is not the matching one. Take a deep breath, re-state your prayer, and try again.',
      ja: '今はまだその時期ではないか、引いたおみくじの番号が違うという合図です。深呼吸してもう一度心を込めてお伺いしましょう。',
      ko: '아직 때가 이르거나 뽑은 점괘 번호가 아니라는 뜻입니다. 마음을 가다듬고 다시 정성껏 여쭤보세요.'
    }
  }
};

export default function SmartDeityFinder({ currentLang, onPlayAudio }) {
  const [activeGuide, setActiveGuide] = useState(null);
  const [jiaobeiResult, setJiaobeiResult] = useState(null);
  const [shengStreak, setShengStreak] = useState(0);
  const [isTossing, setIsTossing] = useState(false);

  const isHesheng = getActiveTempleSlug() === 'hesheng';
  const wishCards = isHesheng ? HESHENG_WISH_CARDS : LUNGSHAN_WISH_CARDS;

  const handleSelectWish = async (card) => {
    speechManager.playTempleChime();
    if (card.directGuide) {
      const content = card.directGuide[currentLang] || card.directGuide['zh-TW'];
      const guideData = {
        action: card.action,
        title: content.title,
        text: content.text,
        audioScript: content.audioScript
      };
      setActiveGuide(guideData);
      if (guideData.audioScript) {
        speechManager.speak(guideData.audioScript, currentLang, 1.0);
        if (onPlayAudio) {
          onPlayAudio({
            topic: guideData.title,
            script: guideData.audioScript,
            tier: '90%_knowledge_base',
            latency: 6
          });
        }
      }
      return;
    }

    const res = await fetchRoute({ action: card.action, lang: currentLang });
    if (res && res.success) {
      setActiveGuide(res.data);
      if (res.data.audioScript) {
        speechManager.speak(res.data.audioScript, currentLang, 1.0);
        if (onPlayAudio) {
          onPlayAudio({
            topic: res.data.title,
            script: res.data.audioScript,
            tier: res.tier,
            latency: res.latency_ms
          });
        }
      }
    }
  };

  const handleTossJiaobei = () => {
    setIsTossing(true);
    speechManager.playTempleChime();

    setTimeout(() => {
      // Weighted probability: 60% Sheng-Jiao for encouraging visitor experience, 20% Xiao, 20% Yin
      const r = Math.random();
      const key = r < 0.62 ? 'sheng' : r < 0.82 ? 'xiao' : 'yin';
      const outcome = JIAOBEI_OUTCOMES[key];

      setJiaobeiResult({ key, ...outcome });
      setShengStreak((prev) => (outcome.streakIncrement ? prev + 1 : 0));
      setIsTossing(false);

      const spoken =
        (outcome.title[currentLang] || outcome.title['zh-TW']) +
        '。' +
        (outcome.desc[currentLang] || outcome.desc['zh-TW']);
      speechManager.speak(spoken, currentLang, 1.0);
    }, 280);
  };

  return (
    <section className="my-8 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-4 bg-temple-red rounded-full"></span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-temple-stone">
              {currentLang === 'zh-TW' && '智慧祈願神明導航 ＆ 擲筊禮俗體驗'}
              {currentLang === 'en' &&
                'Smart Wish-to-Deity Navigator & Divination Blocks'}
              {currentLang === 'ja' && '願い事別・神様ナビ＆聖筊（ポエ）体験'}
              {currentLang === 'ko' && '소원별 신령 내비게이션 & 즈이자오(점괘) 체험'}
            </h2>
          </div>
          <p className="text-xs text-zinc-500 font-sans mt-0.5">
            {currentLang === 'zh-TW' &&
              '點選您的心願，系統自動指引對應殿廳、吉祥供品與參拜秘訣'}
            {currentLang === 'en' &&
              'Select your wish to discover the right deity, offerings, and ritual steps'}
            {currentLang === 'ja' &&
              '願い事を選ぶと、祀られている場所・お供え物・参拝のコツを音声で案内します'}
            {currentLang === 'ko' &&
              '소원을 선택하시면 해당 전각 위치, 공양물, 참배 비결을 음성으로 안내해 드립니다'}
          </p>
        </div>
      </div>

      {/* 6 Smart Wish Pills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {wishCards.map((card) => {
          const Icon = card.icon;
          const isSelected = activeGuide && activeGuide.action === card.action;

          return (
            <button
              key={card.id}
              onClick={() => handleSelectWish(card)}
              className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 shadow-2xs hover:shadow-md active:scale-[0.98] ${
                isSelected
                  ? 'bg-amber-50 border-temple-red ring-2 ring-temple-red/30'
                  : 'bg-white border-temple-border hover:border-temple-gold'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} border flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 block">
                    {card.badge}
                  </span>
                  <span className="font-serif font-bold text-xs sm:text-sm text-temple-stone truncate block">
                    {card.label[currentLang] || card.label['zh-TW']}
                  </span>
                </div>
              </div>
              <Volume2 className="w-4 h-4 text-temple-red shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Expanded Deity Guide Card */}
      {activeGuide && (
        <div className="p-5 bg-white border-2 border-temple-gold rounded-2xl shadow-lg animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <h3 className="font-serif font-black text-base sm:text-lg text-temple-darkred">
              ✨ {activeGuide.title}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  speechManager.speak(activeGuide.audioScript, currentLang, 1.0)
                }
                className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-medium flex items-center space-x-1"
              >
                <Volume2 className="w-3.5 h-3.5 text-temple-red" />
                <span>重播語音</span>
              </button>
              <button
                onClick={() => setActiveGuide(null)}
                className="text-zinc-400 hover:text-zinc-700 text-sm px-1.5"
              >
                ✕
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm text-zinc-800 leading-relaxed whitespace-pre-line font-sans bg-amber-50/40 p-4 rounded-xl border border-amber-200/50">
            {activeGuide.text}
          </p>
        </div>
      )}

      {/* Interactive Digital Jiao-Bei (Moon Blocks) Simulator */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-temple-charcoal via-zinc-900 to-temple-darkred text-white border border-temple-gold/50 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🌙</span>
              <h3 className="font-serif font-bold text-sm sm:text-base text-amber-100">
                {currentLang === 'zh-TW' &&
                  '互動式「擲筊（聖筊／笑筊／陰筊）」文化教學體驗'}
                {currentLang === 'en' &&
                  'Interactive Moon Blocks (Jiao-Bei) Cultural Simulator'}
                {currentLang === 'ja' &&
                  'インタラクティブ「擲筊（ポエ）」神託文化体験'}
                {currentLang === 'ko' &&
                  '인터랙티브 즈이자오(점괘 나무패) 문화 체험'}
              </h3>
              {shengStreak > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-[11px] font-mono">
                  🔥 連續聖筊: {shengStreak} / 3
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-300 font-sans">
              {currentLang === 'zh-TW' &&
                '外國旅客最常詢問「一正一反是什麼意思？」，點擊按鈕體驗擲筊並聆聽多語系解說！'}
              {currentLang === 'en' &&
                'Learn how temple divination blocks work! Toss the blocks to hear audio explanations.'}
              {currentLang === 'ja' &&
                '三日月形の木札（ポエ）の表裏の意味を体験！ボタンを押して音声解説を聞いてみましょう。'}
              {currentLang === 'ko' &&
                '반달 모양 나무패의 앞뒷면 의미를 체험해 보세요! 버튼을 눌러 음성 해설을 들어보세요.'}
            </p>
          </div>

          <button
            onClick={handleTossJiaobei}
            disabled={isTossing}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-temple-gold to-amber-500 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-serif font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg transition active:scale-95 shrink-0"
          >
            <RefreshCw
              className={`w-4 h-4 ${isTossing ? 'animate-spin' : ''}`}
            />
            <span>
              {currentLang === 'zh-TW' && '誠心擲筊一次'}
              {currentLang === 'en' && 'Toss Moon Blocks'}
              {currentLang === 'ja' && '木札（ポエ）を投げる'}
              {currentLang === 'ko' && '나무패 던지기'}
            </span>
          </button>
        </div>

        {jiaobeiResult && (
          <div className="mt-3.5 pt-3.5 border-t border-white/15 flex items-start space-x-3 animate-fade-in">
            <div className="text-2xl shrink-0">{jiaobeiResult.icon}</div>
            <div className="flex-1 text-xs">
              <p className="font-serif font-bold text-amber-300 text-sm">
                {jiaobeiResult.title[currentLang] ||
                  jiaobeiResult.title['zh-TW']}
                {shengStreak >= 3 && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-red-600 text-white text-[11px]">
                    🎉 恭喜達成連續三聖筊！
                  </span>
                )}
              </p>
              <p className="text-zinc-200 mt-1 leading-relaxed">
                {jiaobeiResult.desc[currentLang] || jiaobeiResult.desc['zh-TW']}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
