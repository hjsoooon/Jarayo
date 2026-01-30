
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
