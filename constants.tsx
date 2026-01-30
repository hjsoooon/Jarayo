
import { Coach, CarouselTip } from './types';

export const COACHES: Coach[] = [
  {
    id: 'DEVELOPMENT_COACH',
    name: '발달',
    title: '아동 발달 체크리스트 전문가',
    description: '아이의 성장이 올바른 방향인지 체크해 드려요.',
    avatar: '🌱',
    bgColor: 'linear-gradient(135deg, #00B894 0%, #55EFC4 100%)',
    accentColor: '#00B894',
    welcomeMessage: '안녕하세요! 🌱 아이의 성장은 매일매일이 기적이죠. 월령별 발달 과업이나 놀이법에 대해 궁금한 점을 물어봐주세요!',
    systemPrompt: `당신은 아동 발달 전문가입니다. 팩트 기반의 따뜻한 조언을 제공하세요.`,
    quickQuestions: ['뒤집기 시기가 궁금해요', '터미타임 연습 방법', '언어 발달 체크리스트']
  },
  {
    id: 'PSYCHOLOGY',
    name: '심리',
    title: '아이 마음 이해 전문가',
    description: '아이의 행동 뒤에 숨겨진 마음을 읽어드립니다.',
    avatar: '🧠',
    bgColor: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
    accentColor: '#6C5CE7',
    welcomeMessage: '반가워요. 🧠 아이와 부모의 정서적 교감을 돕는 심리상담사입니다. 떼쓰기나 분리불안 등 마음의 고민을 나누어주세요.',
    systemPrompt: `당신은 아동 심리 전문가입니다. 공감과 경청을 최우선으로 하여 답변하세요.`,
    quickQuestions: ['떼쓰는 아이 훈육법', '애착 형성 방법', '밤에 자주 울며 깨요']
  },
  {
    id: 'NUTRITION',
    name: '이유식',
    title: '영유아 영양 설계사',
    description: '맛있고 건강한 이유식 식단을 설계합니다.',
    avatar: '🥣',
    bgColor: 'linear-gradient(135deg, #00CEC9 0%, #81ECEC 100%)',
    accentColor: '#00CEC9',
    welcomeMessage: '안녕하세요! 🥣 즐거운 식사 시간을 만들어 드릴 영양 코치입니다. 이유식 단계와 알레르기 고민을 해결해 드릴게요.',
    systemPrompt: `당신은 영유아 영양 전문가입니다. 실용적인 레시피와 영양 정보를 제공하세요.`,
    quickQuestions: ['초기 이유식 시작', '알레르기 주의 식품', '자기주도 이유식 팁']
  },
  {
    id: 'SLEEP_EXPERT',
    name: '수면',
    title: '꿀잠 패턴 루틴 설계자',
    description: '아이와 부모 모두를 위한 수면 솔루션.',
    avatar: '😴',
    bgColor: 'linear-gradient(135deg, #74B9FF 0%, #A29BFE 100%)',
    accentColor: '#74B9FF',
    welcomeMessage: '안녕하세요. 😴 푹 자는 아이가 건강하게 자랍니다. 수면 교육과 규칙적인 수면 루틴 형성을 도와드릴게요.',
    systemPrompt: `당신은 영유아 수면 전문가입니다. 차분하고 논리적인 해결책을 제시하세요.`,
    quickQuestions: ['통잠 자는 법', '낮잠 횟수 조절', '수면 의식 만들기']
  },
  {
    id: 'POOP_GUIDE',
    name: '배변',
    title: '배변 훈련 가이드',
    description: '유쾌하고 스트레스 없는 기저귀 졸업.',
    avatar: '🚽',
    bgColor: 'linear-gradient(135deg, #FDCB6E 0%, #F8B739 100%)',
    accentColor: '#FDCB6E',
    welcomeMessage: '반갑습니다! 🚽 아이가 변기와 친해지는 과정을 즐겁게 도와드려요. 배변 훈련 준비부터 성공까지 함께합니다!',
    systemPrompt: `당신은 배변 훈련 전문가입니다. 아이를 재촉하지 않는 긍정적인 코칭을 제공하세요.`,
    quickQuestions: ['기저귀 떼기 시작 신호', '변기 거부 해결법', '밤 기저귀 졸업']
  }
];

export const CAROUSEL_TIPS: CarouselTip[] = [
  {
    id: '1',
    category: '가이드',
    title: '신생아 배앓이 대처법',
    description: '효과적인 하늘 자전거 자세 가이드.',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800'
  }
];

// 각 코치별 일러스트 카드 콘텐츠
export const ILLUSTRATION_CARDS = {
  SLEEP: [
    {
      id: 'sleep-1',
      title: '꿀잠 수면 의식 가이드',
      description: '아이가 스스로 잠들 수 있는 루틴을 만들어보세요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3094/3094837.png',
      gradient: 'from-indigo-400 to-purple-500',
      emoji: '🌙'
    },
    {
      id: 'sleep-2',
      title: '화이트노이즈 활용법',
      description: '엄마 뱃속 소리와 비슷한 환경을 만들어줘요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2913/2913465.png',
      gradient: 'from-blue-400 to-indigo-500',
      emoji: '🎵'
    },
    {
      id: 'sleep-3',
      title: '수면 환경 체크리스트',
      description: '온도, 습도, 조명을 최적화해보세요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3094/3094825.png',
      gradient: 'from-violet-400 to-purple-500',
      emoji: '🛏️'
    }
  ],
  NUTRITION: [
    {
      id: 'nutrition-1',
      title: '초기 이유식 시작하기',
      description: '생후 6개월, 첫 이유식 시작 가이드',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2515/2515183.png',
      gradient: 'from-emerald-400 to-teal-500',
      emoji: '🥣'
    },
    {
      id: 'nutrition-2',
      title: '영양 균형 맞추기',
      description: '단백질, 철분, 비타민을 골고루 섭취해요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
      gradient: 'from-cyan-400 to-teal-500',
      emoji: '🥗'
    },
    {
      id: 'nutrition-3',
      title: '알레르기 체크 가이드',
      description: '새로운 식재료는 3일 규칙으로 시작해요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
      gradient: 'from-teal-400 to-cyan-500',
      emoji: '📋'
    }
  ],
  PSYCHOLOGY: [
    {
      id: 'psych-1',
      title: '애착 형성 놀이법',
      description: '눈맞춤과 스킨십으로 유대감을 키워요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/4213/4213958.png',
      gradient: 'from-pink-400 to-rose-500',
      emoji: '💕'
    },
    {
      id: 'psych-2',
      title: '떼쓰기 대응 전략',
      description: '감정 코칭으로 아이의 마음을 읽어요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3997/3997872.png',
      gradient: 'from-purple-400 to-pink-500',
      emoji: '🧠'
    },
    {
      id: 'psych-3',
      title: '분리불안 극복하기',
      description: '작은 이별 연습으로 자신감을 키워요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/4213/4213732.png',
      gradient: 'from-fuchsia-400 to-purple-500',
      emoji: '🤗'
    }
  ],
  DEVELOPMENT: [
    {
      id: 'dev-1',
      title: '월령별 발달 체크',
      description: '아이의 성장 마일스톤을 확인해보세요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3997/3997593.png',
      gradient: 'from-green-400 to-emerald-500',
      emoji: '📊'
    },
    {
      id: 'dev-2',
      title: '터미타임 가이드',
      description: '목과 등 근육 발달을 도와주는 놀이',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png',
      gradient: 'from-lime-400 to-green-500',
      emoji: '💪'
    },
    {
      id: 'dev-3',
      title: '소근육 발달 놀이',
      description: '손가락 힘을 키우는 재미있는 활동',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3468/3468377.png',
      gradient: 'from-emerald-400 to-green-500',
      emoji: '✋'
    }
  ],
  POOP: [
    {
      id: 'poop-1',
      title: '배변 훈련 시작 신호',
      description: '아이가 준비된 신호를 확인해보세요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3468/3468292.png',
      gradient: 'from-amber-400 to-orange-500',
      emoji: '🚽'
    },
    {
      id: 'poop-2',
      title: '변기 친해지기 놀이',
      description: '재미있는 변기 탐색 시간을 가져요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3468/3468215.png',
      gradient: 'from-yellow-400 to-amber-500',
      emoji: '🎮'
    },
    {
      id: 'poop-3',
      title: '기저귀 졸업 응원',
      description: '칭찬과 격려로 성공 경험을 쌓아요',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3468/3468550.png',
      gradient: 'from-orange-400 to-yellow-500',
      emoji: '🎉'
    }
  ],
  GENERAL: [
    {
      id: 'gen-1',
      title: '육아 꿀팁 모음',
      description: '초보 부모를 위한 알찬 정보',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3997/3997761.png',
      gradient: 'from-blue-400 to-purple-500',
      emoji: '💡'
    },
    {
      id: 'gen-2',
      title: '부모 힐링 가이드',
      description: '지친 마음을 위로하는 시간',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/4213/4213618.png',
      gradient: 'from-rose-400 to-pink-500',
      emoji: '☕'
    }
  ]
};

// 코치 ID를 카테고리에 매핑
export const COACH_TO_CATEGORY: Record<string, keyof typeof ILLUSTRATION_CARDS> = {
  'SLEEP_EXPERT': 'SLEEP',
  'NUTRITION': 'NUTRITION',
  'PSYCHOLOGY': 'PSYCHOLOGY',
  'DEVELOPMENT_COACH': 'DEVELOPMENT',
  'POOP_GUIDE': 'POOP',
  'FEEDING_COACH': 'NUTRITION',
  'ROUTER': 'GENERAL'
};

// 키워드 기반 답변 시스템
export const KEYWORD_RESPONSES = {
  // 수면 관련
  SLEEP: {
    keywords: ['잠', '수면', '통잠', '낮잠', '밤잠', '잠투정', '재우', '깨', '자다', '눕히', '수면교육', '백색소음', '화이트노이즈', '자장가'],
    greetingKeywords: ['안녕', '하이', '헬로', 'hi', 'hello', '반가', '처음', '시작', '뭐해', '계세요', '누구'],
    coachId: 'SLEEP_EXPERT' as const,
    greetingResponse: {
      text: "안녕하세요! 😴 저는 수면 전문 코치예요. 아이의 꿀잠을 책임지는 전문가랍니다! 통잠, 낮잠, 수면 교육, 잠투정 등 수면과 관련된 모든 고민을 도와드릴게요. 어떤 수면 고민이 있으신가요?",
      tips: [
        { icon: '💤', title: '수면 코치 전문 분야', description: '통잠 재우기, 수면 교육, 낮잠 조절, 잠투정 해결 등', type: 'INFO' as const, category: 'SLEEP' as const },
        { icon: '🌙', title: '이런 걸 물어보세요', description: '"통잠 자는 법", "낮잠 횟수", "수면 의식 만들기" 등', type: 'SUCCESS' as const, category: 'SLEEP' as const }
      ]
    },
    responses: [
      {
        text: "안녕하세요, 수면 전문가입니다 😴 아이의 수면은 성장에 정말 중요한 부분이에요. 일정한 수면 루틴을 만들어주시는 것이 가장 중요합니다. 매일 같은 시간에 목욕 → 수유 → 자장가 순서로 진행해보세요. 아이가 '이제 잘 시간이구나'를 자연스럽게 인식하게 됩니다.",
        tips: [
          { icon: '🌙', title: '수면 의식 3단계 루틴', description: '목욕(10분) → 수유(20분) → 자장가(5분)로 매일 같은 순서를 유지하세요.', type: 'SUCCESS' as const, category: 'SLEEP' as const },
          { icon: '🔇', title: '백색소음 활용 팁', description: '엄마 뱃속 소리와 비슷한 50dB 정도의 화이트노이즈를 틀어주세요.', type: 'INFO' as const, category: 'SLEEP' as const }
        ]
      },
      {
        text: "수면 코치입니다 💤 통잠을 재우고 싶으시군요! 아이가 통잠을 자려면 낮 동안 충분한 수유량을 확보하는 것이 핵심이에요. 밤에 배고파서 깨는 것을 예방할 수 있습니다. 또한, 잠들기 전 과자극을 피하고 조용하고 어두운 환경을 만들어주세요.",
        tips: [
          { icon: '🍼', title: '드림피딩 시도하기', description: '밤 10-11시에 깨우지 않고 살짝 수유해주면 새벽 기상을 줄일 수 있어요.', type: 'SUCCESS' as const, category: 'SLEEP' as const },
          { icon: '🌡️', title: '최적의 수면 환경', description: '실내 온도 20-22도, 습도 50-60%를 유지해주세요.', type: 'INFO' as const, category: 'SLEEP' as const }
        ]
      },
      {
        text: "반가워요! 수면 전문가예요 😴 아이가 자주 깨서 힘드시죠? 이 시기에는 정상적인 현상이에요. 아이가 깼을 때 바로 안아주기보다 1-2분 정도 기다려보세요. 스스로 다시 잠드는 연습이 필요합니다. 점차 밤중 기상 횟수가 줄어들 거예요.",
        tips: [
          { icon: '⏰', title: '페이드아웃 기법', description: '아이가 깼을 때 1-2분 기다린 후 토닥여주고, 점차 개입 시간을 늘려보세요.', type: 'INFO' as const, category: 'SLEEP' as const },
          { icon: '🧸', title: '애착 물건 활용', description: '엄마 냄새가 배인 손수건이나 인형을 곁에 두면 안정감을 느껴요.', type: 'SUCCESS' as const, category: 'SLEEP' as const }
        ]
      }
    ]
  },
  
  // 이유식/영양 관련
  NUTRITION: {
    keywords: ['이유식', '밥', '먹', '수유', '분유', '모유', '젖', '영양', '식단', '레시피', '알레르기', '거부', '편식', '간식', '과일', '야채', '단백질', '철분'],
    greetingKeywords: ['안녕', '하이', '헬로', 'hi', 'hello', '반가', '처음', '시작', '뭐해', '계세요', '누구'],
    coachId: 'NUTRITION' as const,
    greetingResponse: {
      text: "안녕하세요! 🥣 저는 영양/이유식 전문 코치예요. 아이의 건강한 식습관과 영양 균형을 책임지는 전문가랍니다! 이유식 시작, 수유량, 알레르기, 편식 등 먹는 것과 관련된 모든 고민을 도와드릴게요. 어떤 영양 고민이 있으신가요?",
      tips: [
        { icon: '🥗', title: '영양 코치 전문 분야', description: '이유식 단계별 가이드, 영양 균형, 알레르기 대처, 편식 해결 등', type: 'INFO' as const, category: 'NUTRITION' as const },
        { icon: '🍼', title: '이런 걸 물어보세요', description: '"이유식 시작 시기", "철분 보충법", "수유량 조절" 등', type: 'SUCCESS' as const, category: 'NUTRITION' as const }
      ]
    },
    responses: [
      {
        text: "안녕하세요, 영양 전문가입니다 🥣 이유식 시작은 생후 6개월 전후가 적당해요. 처음에는 쌀미음부터 시작해서, 한 가지 재료씩 3일 간격으로 새로운 식재료를 추가해보세요. 알레르기 반응을 확인하기 좋은 방법이에요!",
        tips: [
          { icon: '🍚', title: '초기 이유식 시작법', description: '10배죽(쌀미음)으로 시작해서 하루 1회, 1-2스푼부터 시작하세요.', type: 'SUCCESS' as const, category: 'NUTRITION' as const },
          { icon: '📅', title: '3일 규칙 지키기', description: '새로운 식재료는 3일간 같은 것만 주고 알레르기 반응을 확인하세요.', type: 'WARNING' as const, category: 'NUTRITION' as const }
        ]
      },
      {
        text: "이유식 코치예요 🥄 아이가 이유식을 거부하나요? 걱정 마세요, 아주 흔한 일이에요! 같은 음식도 10-15번은 노출시켜야 익숙해진답니다. 억지로 먹이기보다 즐거운 식사 분위기를 만들어주세요. 아이 앞에서 맛있게 먹는 모습을 보여주는 것도 좋아요.",
        tips: [
          { icon: '😊', title: '즐거운 식사 환경', description: '강요하지 말고, 부모가 맛있게 먹는 모습을 보여주세요.', type: 'INFO' as const, category: 'NUTRITION' as const },
          { icon: '🎨', title: '다양한 질감 시도', description: '같은 재료도 으깨기, 다지기, 핑거푸드 등 형태를 바꿔보세요.', type: 'SUCCESS' as const, category: 'NUTRITION' as const }
        ]
      },
      {
        text: "영양 설계사입니다 🥗 균형 잡힌 영양 섭취가 궁금하시군요! 이유식 중기부터는 탄수화물, 단백질, 채소를 1:1:1 비율로 구성해주세요. 특히 철분이 풍부한 소고기, 달걀 노른자를 꼭 포함시켜 주세요. 철분은 두뇌 발달에 필수랍니다!",
        tips: [
          { icon: '🥩', title: '철분 섭취 필수!', description: '생후 6개월부터는 소고기, 달걀 노른자로 철분을 보충해주세요.', type: 'WARNING' as const, category: 'NUTRITION' as const },
          { icon: '⚖️', title: '영양 균형 1:1:1', description: '탄수화물:단백질:채소 = 1:1:1 비율로 식단을 구성하세요.', type: 'SUCCESS' as const, category: 'NUTRITION' as const }
        ]
      }
    ]
  },
  
  // 심리/정서 관련
  PSYCHOLOGY: {
    keywords: ['울', '떼', '짜증', '화', '불안', '분리불안', '애착', '훈육', '감정', '마음', '스트레스', '칭찬', '혼', '버릇', '고집', '떼쓰'],
    greetingKeywords: ['안녕', '하이', '헬로', 'hi', 'hello', '반가', '처음', '시작', '뭐해', '계세요', '누구'],
    coachId: 'PSYCHOLOGY' as const,
    greetingResponse: {
      text: "안녕하세요! 🧠 저는 아동 심리 전문 코치예요. 아이의 마음을 읽고 정서 발달을 돕는 전문가랍니다! 떼쓰기, 분리불안, 애착 형성, 훈육 방법 등 마음과 관련된 모든 고민을 도와드릴게요. 어떤 심리 고민이 있으신가요?",
      tips: [
        { icon: '💜', title: '심리 코치 전문 분야', description: '감정 코칭, 떼쓰기 대응, 분리불안, 애착 형성, 훈육법 등', type: 'INFO' as const, category: 'PSYCHOLOGY' as const },
        { icon: '🤗', title: '이런 걸 물어보세요', description: '"떼쓸 때 어떻게 해요", "애착 형성 방법", "훈육은 어떻게" 등', type: 'SUCCESS' as const, category: 'PSYCHOLOGY' as const }
      ]
    },
    responses: [
      {
        text: "안녕하세요, 아동 심리 전문가입니다 🧠 아이가 떼를 쓸 때 정말 힘드시죠. 하지만 이건 아이가 감정을 표현하는 자연스러운 과정이에요. 먼저 아이의 감정을 인정해주세요. \"화가 났구나, 속상했구나\"라고 말해주는 것만으로도 아이는 이해받는다고 느껴요.",
        tips: [
          { icon: '💬', title: '감정 코칭 3단계', description: '1)감정 인정 → 2)공감 표현 → 3)대안 제시 순서로 대화하세요.', type: 'SUCCESS' as const, category: 'PSYCHOLOGY' as const },
          { icon: '🤗', title: '안아주기의 힘', description: '말보다 따뜻한 포옹이 아이의 흥분을 가라앉히는 데 효과적이에요.', type: 'INFO' as const, category: 'PSYCHOLOGY' as const }
        ]
      },
      {
        text: "심리 상담사예요 💜 분리불안이 걱정되시나요? 아이에게 분리불안은 애착이 잘 형성되었다는 증거이기도 해요. 갑자기 사라지지 말고, 짧은 이별부터 연습해보세요. \"엄마 화장실 다녀올게, 금방 올게\"처럼 예고하고 돌아오는 경험을 반복하면 신뢰가 쌓여요.",
        tips: [
          { icon: '👋', title: '이별 의식 만들기', description: '\"뽀뽀하고 안녕!\" 같은 짧은 이별 의식을 만들어 예측 가능하게 해주세요.', type: 'SUCCESS' as const, category: 'PSYCHOLOGY' as const },
          { icon: '⏱️', title: '점진적 분리 연습', description: '5분 → 10분 → 30분 순으로 떨어져 있는 시간을 점차 늘려보세요.', type: 'INFO' as const, category: 'PSYCHOLOGY' as const }
        ]
      },
      {
        text: "정서 발달 전문가입니다 🌈 아이와의 애착 형성이 궁금하시군요! 가장 중요한 건 '일관된 반응'이에요. 아이가 울 때 매번 다르게 반응하면 혼란스러워해요. 눈 맞추기, 미소 짓기, 부드러운 목소리로 말하기 - 이 세 가지만 꾸준히 해주셔도 안정 애착이 형성됩니다.",
        tips: [
          { icon: '👀', title: '눈 맞춤의 마법', description: '수유할 때, 놀 때 아이와 눈을 맞추며 미소 지어주세요.', type: 'SUCCESS' as const, category: 'PSYCHOLOGY' as const },
          { icon: '🎵', title: '목소리로 교감하기', description: '아이의 옹알이에 같은 톤으로 대답해주면 소통 능력이 발달해요.', type: 'INFO' as const, category: 'PSYCHOLOGY' as const }
        ]
      }
    ]
  },
  
  // 발달 관련
  DEVELOPMENT: {
    keywords: ['발달', '성장', '뒤집', '기어', '앉', '서', '걷', '말', '옹알이', '대근육', '소근육', '인지', '월령', '또래', '느린', '빠른', '터미타임'],
    greetingKeywords: ['안녕', '하이', '헬로', 'hi', 'hello', '반가', '처음', '시작', '뭐해', '계세요', '누구'],
    coachId: 'DEVELOPMENT_COACH' as const,
    greetingResponse: {
      text: "안녕하세요! 🌱 저는 아동 발달 전문 코치예요. 아이의 건강한 성장과 발달을 돕는 전문가랍니다! 뒤집기, 기어가기, 걷기 같은 대근육 발달부터 소근육, 인지 발달까지 모든 성장 고민을 도와드릴게요. 어떤 발달 고민이 있으신가요?",
      tips: [
        { icon: '🌿', title: '발달 코치 전문 분야', description: '월령별 발달 체크, 대근육/소근육 발달, 터미타임, 놀이법 등', type: 'INFO' as const, category: 'DEVELOPMENT' as const },
        { icon: '🎯', title: '이런 걸 물어보세요', description: '"뒤집기 시기", "터미타임 방법", "언어 발달 체크" 등', type: 'SUCCESS' as const, category: 'DEVELOPMENT' as const }
      ]
    },
    responses: [
      {
        text: "안녕하세요, 발달 전문가입니다 🌱 아이의 성장 발달이 궁금하시군요! 모든 아이는 자기만의 속도가 있어요. 일반적인 발달 이정표는 참고용일 뿐, 1-2개월 차이는 정상 범위입니다. 다만, 꾸준한 자극과 놀이는 발달에 큰 도움이 됩니다!",
        tips: [
          { icon: '📊', title: '발달은 개인차가 있어요', description: '또래보다 1-2개월 느려도 정상 범위예요. 비교보다 관찰이 중요해요.', type: 'INFO' as const, category: 'DEVELOPMENT' as const },
          { icon: '🎯', title: '매일 10분 놀이 자극', description: '하루 10분이라도 아이 눈높이에서 함께 놀아주세요.', type: 'SUCCESS' as const, category: 'DEVELOPMENT' as const }
        ]
      },
      {
        text: "발달 체크 전문가예요 🌿 뒤집기가 걱정되시나요? 보통 생후 4-6개월 사이에 뒤집기를 시작해요. 터미타임(엎드려 놀기)을 자주 해주시면 목과 등 근육이 발달해서 뒤집기에 도움이 됩니다. 하루에 3-5분씩, 여러 번 나눠서 해주세요!",
        tips: [
          { icon: '💪', title: '터미타임 가이드', description: '하루 3-5분씩, 5회 정도 엎드려 놀기를 해주세요.', type: 'SUCCESS' as const, category: 'DEVELOPMENT' as const },
          { icon: '🧸', title: '흥미 유발 장난감', description: '엎드린 아이 앞에 장난감을 두고 고개를 들도록 유도하세요.', type: 'INFO' as const, category: 'DEVELOPMENT' as const }
        ]
      },
      {
        text: "성장 발달 코치입니다 🚀 소근육 발달이 궁금하시군요! 손가락 힘과 협응력은 놀이를 통해 자연스럽게 발달해요. 블록 쌓기, 공 굴리기, 숟가락 쥐기 등 일상 속 활동이 모두 소근육 운동이에요. 다양한 질감의 물건을 만져보게 해주세요.",
        tips: [
          { icon: '✋', title: '손가락 놀이 추천', description: '콩 옮기기, 스티커 붙이기, 클레이 놀이로 소근육을 발달시켜요.', type: 'SUCCESS' as const, category: 'DEVELOPMENT' as const },
          { icon: '🎨', title: '감각 놀이 중요', description: '다양한 질감(부드러운, 거친, 물렁한)을 경험하게 해주세요.', type: 'INFO' as const, category: 'DEVELOPMENT' as const }
        ]
      }
    ]
  },
  
  // 배변 관련
  POOP: {
    keywords: ['똥', '응가', '변', '기저귀', '배변', '변비', '설사', '대변', '소변', '쉬', '화장실', '변기', '훈련'],
    greetingKeywords: ['안녕', '하이', '헬로', 'hi', 'hello', '반가', '처음', '시작', '뭐해', '계세요', '누구'],
    coachId: 'POOP_GUIDE' as const,
    greetingResponse: {
      text: "안녕하세요! 🚽 저는 배변 훈련 전문 코치예요. 스트레스 없는 기저귀 졸업을 돕는 전문가랍니다! 배변 훈련 시작 시기, 변비 해결, 변기 거부 등 배변과 관련된 모든 고민을 도와드릴게요. 어떤 배변 고민이 있으신가요?",
      tips: [
        { icon: '🎉', title: '배변 코치 전문 분야', description: '배변 훈련, 기저귀 졸업, 변비/설사 대처, 변기 친해지기 등', type: 'INFO' as const, category: 'POOP' as const },
        { icon: '💩', title: '이런 걸 물어보세요', description: '"기저귀 떼는 시기", "변기 거부할 때", "변비 해결법" 등', type: 'SUCCESS' as const, category: 'POOP' as const }
      ]
    },
    responses: [
      {
        text: "안녕하세요, 배변 훈련 전문가입니다 🚽 기저귀 졸업이 고민이시군요! 배변 훈련은 보통 18-24개월 사이에 시작하지만, 아이가 준비됐다는 신호를 보여야 해요. 기저귀가 젖은 걸 불편해하거나, 규칙적인 배변 패턴이 생기면 시작해볼 수 있어요!",
        tips: [
          { icon: '📋', title: '배변 훈련 준비 신호', description: '2시간 이상 기저귀가 마르거나, 배변 시 숨는 행동을 보이면 준비 완료!', type: 'INFO' as const, category: 'POOP' as const },
          { icon: '🪑', title: '유아 변기 친해지기', description: '먼저 옷 입은 채로 변기에 앉아보는 연습부터 시작하세요.', type: 'SUCCESS' as const, category: 'POOP' as const }
        ]
      },
      {
        text: "배변 가이드예요 💩 아이 변비가 걱정되시나요? 충분한 수분 섭취와 식이섬유가 중요해요. 물, 배즙, 자두즙을 자주 주시고, 채소와 과일을 충분히 먹이세요. 배 마사지도 효과적이에요 - 배꼽 주위를 시계방향으로 부드럽게 문질러주세요.",
        tips: [
          { icon: '💧', title: '수분 섭취 늘리기', description: '물, 배즙, 자두즙을 자주 주시고 변을 부드럽게 해주세요.', type: 'SUCCESS' as const, category: 'POOP' as const },
          { icon: '🌀', title: '배 마사지 방법', description: '배꼽 주위를 시계방향으로 부드럽게 원을 그리며 마사지해주세요.', type: 'INFO' as const, category: 'POOP' as const }
        ]
      },
      {
        text: "배변 훈련 코치입니다 🎉 변기 거부가 심하시군요? 아이에게 변기는 무서운 존재일 수 있어요. 절대 강요하지 마시고, 변기와 친해지는 시간을 먼저 가져보세요. 좋아하는 캐릭터 변기 시트를 사용하거나, 인형에게 시범을 보여주는 것도 좋아요!",
        tips: [
          { icon: '🧸', title: '인형 놀이 활용', description: '인형이 변기에 앉는 놀이를 통해 거부감을 줄여보세요.', type: 'SUCCESS' as const, category: 'POOP' as const },
          { icon: '🎁', title: '작은 보상 시스템', description: '변기에 앉기만 해도 스티커를 주는 등 긍정적 경험을 만들어주세요.', type: 'INFO' as const, category: 'POOP' as const }
        ]
      }
    ]
  },
  
  // 인사/일반 대화
  GREETING: {
    keywords: ['안녕', '하이', '헬로', 'hi', 'hello', '반가', '처음', '시작', '뭐해', '있어', '계세요', '누구', '소개', '도움', '도와', '알려', '가르쳐', '추천', '어떻게', '뭘', '무엇', '언제', '왜', '어디', '몇'],
    coachId: 'PSYCHOLOGY' as const,
    responses: [
      {
        text: "안녕하세요! 👋 Team JARAYO의 AI 육아 코치입니다. 만나서 반가워요! 저는 수면, 이유식, 발달, 심리, 배변 등 육아의 다양한 분야를 도와드리는 전문가 팀이에요. 어떤 고민이 있으신가요? 편하게 말씀해 주세요! 😊",
        tips: [
          { icon: '👶', title: '이렇게 질문해보세요', description: '"아이가 잠을 안 자요", "이유식 거부해요" 등 구체적으로 물어보시면 더 정확한 답변을 드릴 수 있어요!', type: 'INFO' as const, category: 'GENERAL' as const },
          { icon: '🌟', title: '5명의 전문 코치', description: '수면, 영양, 심리, 발달, 배변 전문가가 대기 중이에요.', type: 'SUCCESS' as const, category: 'GENERAL' as const }
        ]
      },
      {
        text: "반갑습니다! 🎉 JARAYO 육아 AI 코치예요. 오늘 하루도 육아하시느라 정말 수고 많으셨어요. 저희가 조금이나마 도움이 되고 싶어요. 아이에 대해 궁금한 점이나 고민이 있으시면 언제든 편하게 물어봐 주세요!",
        tips: [
          { icon: '💬', title: '자유롭게 대화하세요', description: '질문 형식에 구애받지 않고 편하게 말씀해 주시면 됩니다.', type: 'INFO' as const, category: 'GENERAL' as const },
          { icon: '❤️', title: '육아는 함께할 때 더 쉬워져요', description: '혼자 고민하지 마세요. 언제나 여기 있을게요.', type: 'SUCCESS' as const, category: 'GENERAL' as const }
        ]
      },
      {
        text: "안녕하세요! ✨ 저는 당신의 육아를 도와줄 AI 코치 JARAYO예요. 아기의 수면 패턴, 이유식, 성장 발달, 정서 케어, 배변 훈련까지 - 무엇이든 물어봐 주세요. 전문가의 따뜻하고 실용적인 조언을 드릴게요!",
        tips: [
          { icon: '🤖', title: '24시간 상담 가능', description: '새벽에 아이가 울어도 괜찮아요. 언제든 물어보세요!', type: 'INFO' as const, category: 'GENERAL' as const },
          { icon: '📚', title: '맞춤형 육아 가이드', description: '질문에 맞는 실천 팁을 카드로 제공해드려요.', type: 'SUCCESS' as const, category: 'GENERAL' as const }
        ]
      }
    ]
  },

  // 감사/긍정 표현
  THANKS: {
    keywords: ['고마', '감사', '땡큐', 'thank', '좋아', '좋네', '좋았', '도움됐', '도움이 됐', '알겠', '이해했', '그렇구나', '오케이', 'ok', '네', '응', '그래'],
    coachId: 'PSYCHOLOGY' as const,
    responses: [
      {
        text: "도움이 되셨다니 정말 기뻐요! 😊 육아는 매일이 새로운 도전이지만, 이렇게 열심히 알아보시는 부모님 덕분에 아이도 행복하게 자랄 거예요. 또 궁금한 게 생기시면 언제든 물어봐 주세요! 항상 응원하고 있어요 💪",
        tips: [
          { icon: '🌱', title: '오늘도 수고하셨어요', description: '아이를 위해 고민하는 그 마음이 최고의 육아입니다.', type: 'SUCCESS' as const, category: 'GENERAL' as const }
        ]
      },
      {
        text: "천만에요! 🥰 저야말로 함께해 주셔서 감사해요. 육아하시면서 힘드실 때, 궁금한 게 있을 때 언제든 찾아와 주세요. 항상 여기서 기다리고 있을게요. 오늘 하루도 파이팅! ✨",
        tips: [
          { icon: '☕', title: '잠깐 쉬어가세요', description: '부모님의 휴식도 중요해요. 아이가 자는 틈에 잠깐이라도 쉬세요.', type: 'INFO' as const, category: 'GENERAL' as const }
        ]
      }
    ]
  },

  // 힘듦/걱정 표현
  CONCERN: {
    keywords: ['힘들', '지치', '피곤', '걱정', '불안', '모르겠', '어렵', '어려워', '못하겠', '안돼', '안되', '실패', '잘못', '미안', '죄책감', '우울', '답답', '짜증', '화나', '미치겠', '포기'],
    coachId: 'PSYCHOLOGY' as const,
    responses: [
      {
        text: "많이 힘드시죠... 🤗 그 마음 충분히 이해해요. 육아는 세상에서 가장 힘든 일 중 하나예요. 완벽하지 않아도 괜찮아요. 지금 이렇게 고민하고 계시는 것 자체가 좋은 부모의 증거랍니다. 조금이라도 도움이 될 수 있도록 구체적으로 어떤 부분이 힘드신지 말씀해 주시겠어요?",
        tips: [
          { icon: '💆', title: '부모도 쉬어야 해요', description: '잠깐이라도 나만의 시간을 갖는 것이 중요해요.', type: 'WARNING' as const, category: 'GENERAL' as const },
          { icon: '🆘', title: '도움을 요청하세요', description: '가족이나 주변에 도움을 요청하는 것도 좋은 방법이에요.', type: 'INFO' as const, category: 'GENERAL' as const }
        ]
      },
      {
        text: "정말 수고 많으셨어요 💕 육아하면서 지치고 힘든 건 너무나 자연스러운 거예요. 절대 자책하지 마세요. 모든 부모가 겪는 일이에요. 어떤 부분이 가장 힘드신가요? 함께 해결책을 찾아볼게요. 혼자가 아니에요, 제가 옆에 있을게요.",
        tips: [
          { icon: '❤️', title: '당신은 좋은 부모예요', description: '힘들어도 아이를 위해 고민하는 당신은 이미 최고의 부모입니다.', type: 'SUCCESS' as const, category: 'GENERAL' as const },
          { icon: '💬', title: '구체적으로 말해주세요', description: '어떤 상황인지 자세히 알려주시면 더 도움이 될 수 있어요.', type: 'INFO' as const, category: 'GENERAL' as const }
        ]
      }
    ]
  },

  // 아기 정보 관련
  BABY_INFO: {
    keywords: ['개월', '생후', '신생아', '돌', '백일', '아기', '애기', '아이', '우리 아이', '우리아이', '첫째', '둘째', '딸', '아들', '남아', '여아', '쌍둥이'],
    coachId: 'DEVELOPMENT_COACH' as const,
    responses: [
      {
        text: "아이에 대해 알려주셔서 감사해요! 🌱 월령에 따라 발달 단계와 필요한 케어가 달라지거든요. 아이의 현재 상황에 맞는 맞춤 조언을 드릴 수 있어요. 어떤 부분이 궁금하세요? 수면, 수유, 발달, 어떤 것이든 물어봐 주세요!",
        tips: [
          { icon: '📊', title: '월령별 맞춤 조언', description: '아이의 월령을 알려주시면 더 정확한 정보를 드릴 수 있어요.', type: 'INFO' as const, category: 'DEVELOPMENT' as const },
          { icon: '🎯', title: '발달 이정표 확인', description: '해당 월령의 발달 체크리스트가 궁금하시면 물어봐 주세요!', type: 'SUCCESS' as const, category: 'DEVELOPMENT' as const }
        ]
      }
    ]
  },
  
  // 일반/기타 (fallback)
  GENERAL: {
    keywords: [],
    coachId: 'PSYCHOLOGY' as const,
    responses: [
      {
        text: "네, 말씀해 주세요! 😊 어떤 부분이 궁금하신가요? 저희 JARAYO 팀은 수면, 이유식, 발달, 심리, 배변 등 육아의 다양한 영역을 도와드리고 있어요. 조금 더 구체적으로 말씀해 주시면 정확한 답변을 드릴 수 있어요!",
        tips: [
          { icon: '💡', title: '이런 질문을 해보세요', description: '"통잠 자는 법", "이유식 시작 시기", "떼쓸 때 어떻게 해요?" 등', type: 'INFO' as const, category: 'GENERAL' as const },
          { icon: '❤️', title: '함께해요', description: '육아의 모든 순간, 저희가 함께합니다.', type: 'SUCCESS' as const, category: 'GENERAL' as const }
        ]
      },
      {
        text: "궁금하신 게 있으시군요! 🤔 좀 더 자세히 말씀해 주시겠어요? 예를 들어 '아이가 밤에 자주 깨요', '이유식을 거부해요' 처럼 상황을 설명해 주시면 더 정확한 도움을 드릴 수 있어요. 어떤 고민이든 편하게 이야기해 주세요!",
        tips: [
          { icon: '🎯', title: '구체적일수록 좋아요', description: '아이의 월령, 상황, 증상 등을 함께 알려주시면 맞춤 답변을 드려요.', type: 'INFO' as const, category: 'GENERAL' as const }
        ]
      }
    ]
  }
};
