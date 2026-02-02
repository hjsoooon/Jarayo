
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

// 각 코치별 일러스트 카드 콘텐츠 (상세 가이드 포함)
export const ILLUSTRATION_CARDS = {
  SLEEP: [
    {
      id: 'sleep-1',
      title: '꿀잠 수면 의식 가이드',
      description: '아이가 스스로 잠들 수 있는 루틴을 만들어보세요',
      gradient: 'from-indigo-400 to-purple-500',
      emoji: '🌙',
      fullGuide: {
        intro: '수면 의식은 아이에게 "이제 잘 시간이야"라는 신호를 보내는 중요한 루틴이에요. 매일 같은 순서로 진행하면 아이가 자연스럽게 잠들 준비를 해요.',
        steps: [
          { icon: '🛁', title: '따뜻한 목욕', desc: '잠자기 30분 전, 38-40도 물로 10분간 목욕시켜요' },
          { icon: '👶', title: '마사지 & 로션', desc: '부드럽게 발 → 다리 → 배 → 팔 순서로 마사지해요' },
          { icon: '👕', title: '잠옷 갈아입기', desc: '편안한 잠옷으로 갈아입히며 "잠잘 시간"을 인지시켜요' },
          { icon: '🍼', title: '수유 또는 자장가', desc: '조용한 환경에서 수유하거나 자장가를 불러줘요' },
          { icon: '💤', title: '침대에 눕히기', desc: '졸린 상태에서 눕혀 스스로 잠드는 연습을 해요' }
        ],
        tips: ['매일 같은 시간에 시작하세요', '15-20분 내로 짧게 진행하세요', '잠들기 전 자극적인 놀이는 피하세요'],
        relatedQuestion: '수면 의식 루틴 만들기가 어려워요'
      }
    },
    {
      id: 'sleep-2',
      title: '화이트노이즈 활용법',
      description: '엄마 뱃속 소리와 비슷한 환경을 만들어줘요',
      gradient: 'from-blue-400 to-indigo-500',
      emoji: '🎵',
      fullGuide: {
        intro: '화이트노이즈는 엄마 뱃속에서 들었던 심장 소리, 혈류 소리와 비슷해서 신생아에게 안정감을 줘요. 수면 유도와 깊은 잠 유지에 효과적이에요.',
        steps: [
          { icon: '📱', title: '소리 선택', desc: '빗소리, 파도소리, 선풍기 소리 등 균일한 소리를 선택해요' },
          { icon: '🔊', title: '볼륨 조절', desc: '50-60dB (샤워기 소리 정도)로 맞춰요, 너무 크면 안돼요' },
          { icon: '📍', title: '위치 설정', desc: '아이 침대에서 1-2m 떨어진 곳에 배치해요' },
          { icon: '⏰', title: '타이머 설정', desc: '잠든 후 30-60분 뒤 꺼지도록 타이머를 설정해요' }
        ],
        tips: ['잠들 때뿐 아니라 낮잠에도 사용하면 좋아요', '12개월 이후에는 서서히 줄여나가세요', '직접 귀에 대지 마세요'],
        relatedQuestion: '화이트노이즈 언제까지 사용해도 될까요?'
      }
    },
    {
      id: 'sleep-3',
      title: '수면 환경 체크리스트',
      description: '온도, 습도, 조명을 최적화해보세요',
      gradient: 'from-violet-400 to-purple-500',
      emoji: '🛏️',
      fullGuide: {
        intro: '아이의 숙면을 위해 수면 환경은 매우 중요해요. 적정 온도, 습도, 조명만 잘 맞춰도 수면의 질이 확 달라져요.',
        steps: [
          { icon: '🌡️', title: '온도 체크', desc: '실내 온도 20-22도 유지 (아이 뒷목이 따뜻하면 OK)' },
          { icon: '💧', title: '습도 체크', desc: '습도 50-60% 유지 (가습기 or 젖은 수건 활용)' },
          { icon: '🌑', title: '조명 체크', desc: '암막 커튼으로 어둡게 (수유 시 간접 조명 사용)' },
          { icon: '🔇', title: '소음 체크', desc: '갑작스러운 소리 차단 (문틈 막기, 러그 깔기)' },
          { icon: '🛏️', title: '침구 체크', desc: '딱딱한 매트리스 + 가벼운 이불 (얼굴 덮이지 않게)' }
        ],
        tips: ['아이 손발이 차가워도 뒷목이 따뜻하면 괜찮아요', '해가 뜨기 전부터 방을 어둡게 유지하세요', '향이 강한 방향제는 피하세요'],
        relatedQuestion: '아이 방 적정 온도가 몇 도예요?'
      }
    }
  ],
  NUTRITION: [
    {
      id: 'nutrition-1',
      title: '초기 이유식 시작하기',
      description: '생후 6개월, 첫 이유식 시작 가이드',
      gradient: 'from-emerald-400 to-teal-500',
      emoji: '🥣',
      fullGuide: {
        intro: '이유식은 보통 생후 만 6개월에 시작해요. 아이가 고개를 가누고, 음식에 관심을 보이면 시작 신호예요!',
        steps: [
          { icon: '🍚', title: '쌀미음부터', desc: '10배죽으로 시작, 1티스푼부터 천천히 늘려요' },
          { icon: '⏰', title: '시간 선택', desc: '오전 10-11시, 아이 기분 좋을 때 시도해요' },
          { icon: '🥄', title: '숟가락 적응', desc: '실리콘 숟가락으로 입술에 살짝 대어 적응시켜요' },
          { icon: '📅', title: '3일 규칙', desc: '새 재료는 3일간 같은 것만, 알레르기 반응 확인해요' },
          { icon: '📈', title: '점차 증가', desc: '한 달 후 2가지 재료 혼합 가능, 양도 늘려요' }
        ],
        tips: ['처음엔 뱉어도 괜찮아요, 연습이에요', '수유량은 갑자기 줄이지 마세요', '식사 시간은 30분 이내로'],
        relatedQuestion: '이유식 시작 시기가 언제예요?'
      }
    },
    {
      id: 'nutrition-2',
      title: '영양 균형 맞추기',
      description: '단백질, 철분, 비타민을 골고루 섭취해요',
      gradient: 'from-cyan-400 to-teal-500',
      emoji: '🥗',
      fullGuide: {
        intro: '생후 6개월부터는 모유/분유만으로 철분이 부족해져요. 이유식으로 철분, 단백질, 비타민을 보충해야 해요.',
        steps: [
          { icon: '🥩', title: '철분 섭취', desc: '소고기, 달걀 노른자, 시금치로 철분 보충해요' },
          { icon: '🥚', title: '단백질 섭취', desc: '두부, 생선, 닭가슴살로 근육 발달을 도와요' },
          { icon: '🥕', title: '비타민 섭취', desc: '당근, 고구마, 브로콜리로 면역력을 키워요' },
          { icon: '⚖️', title: '비율 맞추기', desc: '곡류:단백질:채소 = 1:1:1 비율로 구성해요' }
        ],
        tips: ['하루 1번 소고기를 꼭 넣어주세요', '채소는 다양한 색깔로 골라주세요', '과일은 후식으로 조금만'],
        relatedQuestion: '철분 보충 어떻게 해야 해요?'
      }
    },
    {
      id: 'nutrition-3',
      title: '알레르기 체크 가이드',
      description: '새로운 식재료는 3일 규칙으로 시작해요',
      gradient: 'from-teal-400 to-cyan-500',
      emoji: '📋',
      fullGuide: {
        intro: '알레르기 반응은 보통 섭취 후 2시간 이내, 늦으면 2-3일 내에 나타나요. 새 재료는 신중하게 시도해요.',
        steps: [
          { icon: '📝', title: '기록하기', desc: '먹인 재료, 시간, 양을 모두 기록해요' },
          { icon: '👀', title: '반응 관찰', desc: '피부 발진, 구토, 설사, 얼굴 붓기를 확인해요' },
          { icon: '⏳', title: '3일 대기', desc: '같은 재료를 3일간 주고 반응을 관찰해요' },
          { icon: '🚨', title: '고위험 식품', desc: '계란흰자, 우유, 밀, 땅콩, 갑각류는 특히 주의해요' }
        ],
        tips: ['새 재료는 오전에 시도해 병원 갈 수 있게', '알레르기 이력 있으면 의사와 상담 후 시작', '형제에게 알레르기 있으면 더 주의'],
        relatedQuestion: '알레르기 반응이 어떻게 나타나요?'
      }
    }
  ],
  PSYCHOLOGY: [
    {
      id: 'psych-1',
      title: '애착 형성 놀이법',
      description: '눈맞춤과 스킨십으로 유대감을 키워요',
      gradient: 'from-pink-400 to-rose-500',
      emoji: '💕',
      fullGuide: {
        intro: '안정적인 애착은 평생의 정서 발달 기반이 돼요. 매일 10분씩이라도 아이와 집중해서 교감하면 충분해요.',
        steps: [
          { icon: '👀', title: '눈 맞추기', desc: '수유, 기저귀 교체 시 아이 눈을 바라보며 말 걸어요' },
          { icon: '🤗', title: '스킨십 하기', desc: '안아주기, 뽀뽀, 마사지로 피부 접촉을 늘려요' },
          { icon: '🗣️', title: '반응해 주기', desc: '아이 옹알이에 같은 톤으로 대답해줘요' },
          { icon: '🎭', title: '표정 놀이', desc: '웃기, 놀란 척, 슬픈 척 다양한 표정을 보여줘요' },
          { icon: '📖', title: '함께 읽기', desc: '그림책을 보며 손가락으로 가리키고 이야기해요' }
        ],
        tips: ['양보다 질! 10분이라도 집중해서', '아이가 외면해도 기다려주세요', '아빠와의 애착도 중요해요'],
        relatedQuestion: '애착 형성 어떻게 해야 해요?'
      }
    },
    {
      id: 'psych-2',
      title: '떼쓰기 대응 전략',
      description: '감정 코칭으로 아이의 마음을 읽어요',
      gradient: 'from-purple-400 to-pink-500',
      emoji: '🧠',
      fullGuide: {
        intro: '떼쓰기는 아이가 감정을 조절하는 법을 배우는 과정이에요. 훈육이 아닌 감정 코칭이 필요한 시기예요.',
        steps: [
          { icon: '🧘', title: '부모 먼저 진정', desc: '심호흡하고, 나도 감정 조절이 먼저예요' },
          { icon: '👂', title: '감정 인정', desc: '"화가 났구나", "속상했구나" 먼저 공감해요' },
          { icon: '🤲', title: '안전하게 기다리기', desc: '위험한 물건 치우고, 아이가 진정될 때까지 옆에 있어요' },
          { icon: '💬', title: '대화하기', desc: '진정 후 "왜 화났어?" 부드럽게 물어봐요' },
          { icon: '💡', title: '대안 제시', desc: '"다음엔 이렇게 말해볼까?" 방법을 알려줘요' }
        ],
        tips: ['떼쓸 때 요구를 들어주면 학습돼요', '공공장소에서도 일관되게 대응해요', '사후에 칭찬하는 것이 중요해요'],
        relatedQuestion: '아이가 떼쓸 때 어떻게 해요?'
      }
    },
    {
      id: 'psych-3',
      title: '분리불안 극복하기',
      description: '작은 이별 연습으로 자신감을 키워요',
      gradient: 'from-fuchsia-400 to-purple-500',
      emoji: '🤗',
      fullGuide: {
        intro: '분리불안은 애착이 잘 형성되었다는 증거예요. 보통 8-14개월에 심하고, 점차 나아져요. 연습이 필요해요.',
        steps: [
          { icon: '👋', title: '이별 의식 만들기', desc: '"엄마 금방 올게, 뽀뽀!" 짧은 인사말을 정해요' },
          { icon: '⏱️', title: '짧은 이별부터', desc: '5분 → 10분 → 30분 점차 시간을 늘려요' },
          { icon: '🧸', title: '애착 물건 주기', desc: '엄마 냄새 배인 손수건이나 인형을 줘요' },
          { icon: '🚪', title: '몰래 사라지지 않기', desc: '갑자기 사라지면 불안이 커져요, 꼭 인사해요' },
          { icon: '🎉', title: '돌아와서 환영', desc: '"엄마 왔어! 잘 기다렸네" 크게 환영해줘요' }
        ],
        tips: ['처음엔 5분도 어려워요, 천천히', '어린이집 적응도 같은 방법으로', '아이가 울어도 돌아가지 마세요'],
        relatedQuestion: '분리불안이 심해요'
      }
    }
  ],
  DEVELOPMENT: [
    {
      id: 'dev-1',
      title: '월령별 발달 체크',
      description: '아이의 성장 마일스톤을 확인해보세요',
      gradient: 'from-green-400 to-emerald-500',
      emoji: '📊',
      fullGuide: {
        intro: '모든 아이는 자기만의 속도로 자라요. 발달 이정표는 참고용이며, 1-2개월 차이는 정상 범위예요.',
        steps: [
          { icon: '👶', title: '0-3개월', desc: '고개 가누기, 눈 맞추기, 손에 물건 쥐기' },
          { icon: '🔄', title: '4-6개월', desc: '뒤집기, 손으로 물건 잡기, 옹알이 시작' },
          { icon: '🐛', title: '7-9개월', desc: '배밀이/기기, 앉기, "엄마" 소리 흉내' },
          { icon: '🧍', title: '10-12개월', desc: '붙잡고 서기, 걸음마 시도, 간단한 말 이해' }
        ],
        tips: ['비교보다 아이의 변화에 집중해요', '걱정되면 소아과 상담하세요', '많이 놀아주는 게 최고의 자극이에요'],
        relatedQuestion: '우리 아이 발달이 늦은 거 아닐까요?'
      }
    },
    {
      id: 'dev-2',
      title: '터미타임 가이드',
      description: '목과 등 근육 발달을 도와주는 놀이',
      gradient: 'from-lime-400 to-green-500',
      emoji: '💪',
      fullGuide: {
        intro: '터미타임(엎드려 놀기)은 목, 어깨, 등 근육을 강화해 뒤집기와 기기의 기초가 돼요. 매일 조금씩 연습해요.',
        steps: [
          { icon: '🕐', title: '시간 정하기', desc: '수유 30분 후, 기분 좋을 때 시작해요' },
          { icon: '🛋️', title: '자세 잡기', desc: '평평한 매트 위에 배를 대고 엎드려요' },
          { icon: '🧸', title: '흥미 유발', desc: '눈높이에 장난감 두고 고개 들도록 유도해요' },
          { icon: '⏱️', title: '시간 조절', desc: '처음 1-2분 → 점차 5분으로 늘려가요' },
          { icon: '👏', title: '격려하기', desc: '고개 들면 "잘했어!" 크게 칭찬해요' }
        ],
        tips: ['울면 바로 중단하고 다음에 다시', '하루 총 20-30분을 목표로', '엄마 배 위에서 시작해도 좋아요'],
        relatedQuestion: '터미타임 어떻게 해요?'
      }
    },
    {
      id: 'dev-3',
      title: '소근육 발달 놀이',
      description: '손가락 힘을 키우는 재미있는 활동',
      gradient: 'from-emerald-400 to-green-500',
      emoji: '✋',
      fullGuide: {
        intro: '소근육은 손가락을 정교하게 움직이는 능력이에요. 이후 젓가락질, 글씨 쓰기의 기초가 되니 놀이로 발달시켜요.',
        steps: [
          { icon: '🧱', title: '블록 쌓기', desc: '큰 블록부터 시작해 점점 작은 것으로' },
          { icon: '📦', title: '용기 놀이', desc: '뚜껑 열고 닫기, 공 넣고 빼기' },
          { icon: '🎨', title: '핑거 페인팅', desc: '안전한 물감으로 손가락 그림 그리기' },
          { icon: '🥢', title: '집기 연습', desc: '큰 뻥튀기나 과자 집어서 입에 넣기' },
          { icon: '📄', title: '종이 놀이', desc: '종이 찢기, 구기기로 손 힘 기르기' }
        ],
        tips: ['작은 물건은 삼킴 주의', '매일 10분씩 다양한 놀이를', '숟가락 쥐기도 좋은 연습이에요'],
        relatedQuestion: '소근육 발달 놀이 추천해주세요'
      }
    }
  ],
  POOP: [
    {
      id: 'poop-1',
      title: '배변 훈련 시작 신호',
      description: '아이가 준비된 신호를 확인해보세요',
      gradient: 'from-amber-400 to-orange-500',
      emoji: '🚽',
      fullGuide: {
        intro: '배변 훈련은 보통 18-24개월에 시작해요. 하지만 아이가 준비됐다는 신호를 보여야 성공률이 높아요.',
        steps: [
          { icon: '⏰', title: '기저귀 체크', desc: '2시간 이상 기저귀가 마른 상태로 있어요' },
          { icon: '🚶', title: '행동 신호', desc: '배변 시 숨거나 특정 자세를 취해요' },
          { icon: '💬', title: '언어 표현', desc: '"쉬" "응가" 등 배변 관련 단어를 알아요' },
          { icon: '👖', title: '옷 벗기', desc: '혼자 바지를 내릴 수 있어요' },
          { icon: '😣', title: '불편함 표현', desc: '기저귀가 젖으면 불편해해요' }
        ],
        tips: ['3가지 이상 해당되면 시작해도 OK', '동생이 태어나면 잠시 미뤄도 돼요', '아이가 거부하면 1-2개월 후 다시'],
        relatedQuestion: '배변 훈련 언제 시작해요?'
      }
    },
    {
      id: 'poop-2',
      title: '변기 친해지기 놀이',
      description: '재미있는 변기 탐색 시간을 가져요',
      gradient: 'from-yellow-400 to-amber-500',
      emoji: '🎮',
      fullGuide: {
        intro: '변기는 아이에게 무서운 존재일 수 있어요. 강요 없이 변기와 친해지는 시간을 먼저 가져요.',
        steps: [
          { icon: '🛒', title: '함께 고르기', desc: '아이와 함께 좋아하는 캐릭터 유아 변기 고르기' },
          { icon: '🧸', title: '인형 놀이', desc: '인형이 변기에 앉는 시범을 보여줘요' },
          { icon: '👕', title: '옷 입고 앉기', desc: '처음엔 옷 입은 채로 변기에 앉아보기만' },
          { icon: '📚', title: '변기 그림책', desc: '변기 관련 그림책을 함께 읽어요' },
          { icon: '🎵', title: '노래 부르기', desc: '변기에 앉아서 좋아하는 노래 부르기' }
        ],
        tips: ['절대 강요하지 마세요', '하루 5분씩 변기에 앉는 연습', '배변 성공하면 크게 칭찬해요'],
        relatedQuestion: '아이가 변기를 무서워해요'
      }
    },
    {
      id: 'poop-3',
      title: '기저귀 졸업 응원',
      description: '칭찬과 격려로 성공 경험을 쌓아요',
      gradient: 'from-orange-400 to-yellow-500',
      emoji: '🎉',
      fullGuide: {
        intro: '기저귀 졸업은 아이의 큰 성장이에요. 실수해도 절대 혼내지 말고, 작은 성공에 크게 칭찬해줘요.',
        steps: [
          { icon: '🩲', title: '팬티 입히기', desc: '낮에는 팬티, 밤에는 기저귀로 시작해요' },
          { icon: '⏰', title: '규칙적으로 앉히기', desc: '기상 후, 식사 후, 외출 전 변기에 앉혀요' },
          { icon: '🌟', title: '스티커 보상', desc: '성공할 때마다 스티커를 붙이게 해요' },
          { icon: '💪', title: '실수에 담담하게', desc: '"괜찮아, 다음엔 더 잘할 수 있어" 격려해요' },
          { icon: '🎊', title: '졸업식 하기', desc: '완전 성공하면 기저귀 졸업식 파티!' }
        ],
        tips: ['낮 훈련 성공 후 밤 기저귀 떼기', '외출 시 여분의 옷 꼭 챙기기', '퇴행해도 다그치지 마세요'],
        relatedQuestion: '기저귀 떼는 법 알려주세요'
      }
    }
  ],
  GENERAL: [
    {
      id: 'gen-1',
      title: '육아 꿀팁 모음',
      description: '초보 부모를 위한 알찬 정보',
      gradient: 'from-blue-400 to-purple-500',
      emoji: '💡',
      fullGuide: {
        intro: '육아는 매일이 새로운 도전이에요. 작은 팁들이 모여 큰 도움이 됩니다. 경험에서 나온 꿀팁을 모아봤어요.',
        steps: [
          { icon: '📱', title: '기록 습관', desc: '수유, 수면, 기저귀 시간을 기록해두면 패턴이 보여요' },
          { icon: '🧺', title: '미리 준비', desc: '외출 가방은 항상 문 앞에 준비해둬요' },
          { icon: '🤝', title: '도움 요청', desc: '혼자 다 하려 하지 말고, 주변에 도움을 요청해요' },
          { icon: '😴', title: '함께 자기', desc: '아이가 자면 엄마도 눈 붙여요, 집안일은 나중에' },
          { icon: '💬', title: '소통하기', desc: '아이에게 말 걸기, 설명하기를 습관화해요' }
        ],
        tips: ['완벽하지 않아도 괜찮아요', '매일 조금씩 나아지면 돼요', '힘들면 쉬어가도 괜찮아요'],
        relatedQuestion: '육아가 처음이라 막막해요'
      }
    },
    {
      id: 'gen-2',
      title: '부모 힐링 가이드',
      description: '지친 마음을 위로하는 시간',
      gradient: 'from-rose-400 to-pink-500',
      emoji: '☕',
      fullGuide: {
        intro: '좋은 부모가 되려면 먼저 내가 건강해야 해요. 지친 마음을 돌보는 것도 중요한 육아의 일부예요.',
        steps: [
          { icon: '🧘', title: '5분 명상', desc: '아이 낮잠 시간에 눈 감고 심호흡 5분' },
          { icon: '☕', title: '나만의 시간', desc: '따뜻한 음료 한 잔의 여유를 가져요' },
          { icon: '📞', title: '대화 나누기', desc: '친구나 가족과 통화하며 스트레스 해소' },
          { icon: '📝', title: '감정 일기', desc: '오늘 힘들었던 일, 기뻤던 일 적어보기' },
          { icon: '🌙', title: '수면 관리', desc: '가능하면 아이와 함께 일찍 자기' }
        ],
        tips: ['죄책감 갖지 마세요, 쉬는 것도 필요해요', '완벽한 부모는 없어요', '지금 이 순간 최선을 다하고 있어요'],
        relatedQuestion: '육아가 너무 힘들어요'
      }
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
    keywords: ['잠', '수면', '통잠', '낮잠', '밤잠', '잠투정', '재우', '깨', '자다', '눕히', '수면교육', '백색소음', '화이트노이즈', '자장가', '루틴', '의식', '온도', '방', '도', '습도', '어두'],
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
    keywords: ['발달', '성장', '뒤집', '기어', '앉', '서', '걷', '말', '옹알이', '대근육', '소근육', '인지', '월령', '또래', '느린', '빠른', '터미타임', '늦', '놀이', '추천'],
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
    keywords: ['똥', '응가', '변', '기저귀', '배변', '변비', '설사', '대변', '소변', '쉬', '화장실', '변기', '훈련', '무서', '떼는', '졸업'],
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
        text: "안녕하세요! 👋 Team ZARAYO의 AI 육아 코치입니다. 만나서 반가워요! 저는 수면, 이유식, 발달, 심리, 배변 등 육아의 다양한 분야를 도와드리는 전문가 팀이에요. 어떤 고민이 있으신가요? 편하게 말씀해 주세요! 😊",
        tips: [
          { icon: '👶', title: '이렇게 질문해보세요', description: '"아이가 잠을 안 자요", "이유식 거부해요" 등 구체적으로 물어보시면 더 정확한 답변을 드릴 수 있어요!', type: 'INFO' as const, category: 'GENERAL' as const },
          { icon: '🌟', title: '5명의 전문 코치', description: '수면, 영양, 심리, 발달, 배변 전문가가 대기 중이에요.', type: 'SUCCESS' as const, category: 'GENERAL' as const }
        ]
      },
      {
        text: "반갑습니다! 🎉 ZARAYO 육아 AI 코치예요. 오늘 하루도 육아하시느라 정말 수고 많으셨어요. 저희가 조금이나마 도움이 되고 싶어요. 아이에 대해 궁금한 점이나 고민이 있으시면 언제든 편하게 물어봐 주세요!",
        tips: [
          { icon: '💬', title: '자유롭게 대화하세요', description: '질문 형식에 구애받지 않고 편하게 말씀해 주시면 됩니다.', type: 'INFO' as const, category: 'GENERAL' as const },
          { icon: '❤️', title: '육아는 함께할 때 더 쉬워져요', description: '혼자 고민하지 마세요. 언제나 여기 있을게요.', type: 'SUCCESS' as const, category: 'GENERAL' as const }
        ]
      },
      {
        text: "안녕하세요! ✨ 저는 당신의 육아를 도와줄 AI 코치 ZARAYO예요. 아기의 수면 패턴, 이유식, 성장 발달, 정서 케어, 배변 훈련까지 - 무엇이든 물어봐 주세요. 전문가의 따뜻하고 실용적인 조언을 드릴게요!",
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
    keywords: ['힘들', '지치', '피곤', '걱정', '불안', '모르겠', '어렵', '어려워', '못하겠', '안돼', '안되', '실패', '잘못', '미안', '죄책감', '우울', '답답', '짜증', '화나', '미치겠', '포기', '막막', '처음이라'],
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
        text: "네, 말씀해 주세요! 😊 어떤 부분이 궁금하신가요? 저희 ZARAYO 팀은 수면, 이유식, 발달, 심리, 배변 등 육아의 다양한 영역을 도와드리고 있어요. 조금 더 구체적으로 말씀해 주시면 정확한 답변을 드릴 수 있어요!",
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
