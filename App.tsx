
import React, { useState, useEffect, useRef } from 'react';
import { COACHES, ILLUSTRATION_CARDS, COACH_TO_CATEGORY } from './constants';
import { Message, CoachRole, AppTab, ChecklistItem, InsightReport } from './types';
import { getGeminiResponse } from './geminiService';

const ConfettiEffect = () => (
  <div className="fixed inset-0 pointer-events-none z-[200] flex items-center justify-center">
    <div className="animate-ping absolute w-48 h-48 bg-yellow-400/20 rounded-full"></div>
    <div className="text-5xl animate-bounce">✨🎊✨</div>
    <div className="absolute top-1/4 left-1/4 animate-ping text-2xl">⭐</div>
    <div className="absolute bottom-1/4 right-1/4 animate-ping text-2xl delay-75">⭐</div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('CHATS');
  const [timeFilter, setTimeFilter] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');
  const [forcedCoachId, setForcedCoachId] = useState<CoachRole | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<{
    title: string;
    description: string;
    emoji: string;
    gradient: string;
    category: string;
    tips?: string[];
    fullGuide?: {
      intro: string;
      steps: { icon: string; title: string; desc: string; }[];
      tips: string[];
      relatedQuestion: string;
    };
  } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const insightsContainerRef = useRef<HTMLDivElement>(null);

  const dateReviver = (key: string, value: any) => {
    if (key === 'timestamp' && typeof value === 'string') return new Date(value);
    return value;
  };

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('parenting_unified_messages_v3');
    return saved ? JSON.parse(saved, dateReviver) : [];
  });

  // 체크리스트 완료 상태 저장
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('parenting_checklist_completed');
    return saved ? JSON.parse(saved) : {};
  });

  // 채팅에서 추출한 동적 체크리스트 생성
  const dynamicChecklist = React.useMemo(() => {
    const allTips = messages
      .filter(m => m.role === 'assistant' && m.tips && m.tips.length > 0)
      .flatMap(m => m.tips || [])
      .filter(tip => tip.type === 'SUCCESS'); // 추천 타입만 체크리스트로
    
    // title 기준으로 중복 제거 (최신 것 유지)
    const uniqueTips = allTips.reduce((acc, tip) => {
      acc.set(tip.title, tip);
      return acc;
    }, new Map());
    
    const tipsFromChat = Array.from(uniqueTips.values())
      .slice(-6) // 최근 6개만
      .map((tip) => ({
        id: `tip-${tip.title.replace(/\s/g, '-')}`,
        text: tip.title,
        description: tip.description,
        completed: completedChecklist[`tip-${tip.title.replace(/\s/g, '-')}`] || false,
        category: tip.category || 'GENERAL',
        icon: tip.icon
      }));
    
    // 채팅 기반 체크리스트가 없으면 기본값
    if (tipsFromChat.length === 0) {
      return [
        { id: 'default-1', text: 'AI 코치에게 첫 질문하기', description: '육아 고민을 물어보세요!', completed: completedChecklist['default-1'] || false, category: 'GENERAL', icon: '💬' },
        { id: 'default-2', text: '수면 루틴 상담받기', description: '아이 수면 패턴을 체크해보세요', completed: completedChecklist['default-2'] || false, category: 'SLEEP', icon: '😴' },
        { id: 'default-3', text: '이유식 시기 확인하기', description: '영양 코치에게 물어보세요', completed: completedChecklist['default-3'] || false, category: 'NUTRITION', icon: '🥣' }
      ];
    }
    
    return tipsFromChat;
  }, [messages, completedChecklist]);

  const [insightData, setInsightData] = useState<InsightReport>({
    summary: "생후 52일, 민준이는 오늘 7시간 통잠에 성공했어요! 수면 의식이 자리를 잡아가고 있네요.",
    statusIcon: "🌙",
    solutions: [
      { coachId: 'SLEEP_EXPERT', title: '꿀잠 솔루션 리포트', summary: '밤중 수유 횟수를 1회로 줄이고, 화이트 노이즈 볼륨을 50%로 고정하는 것이 숙면에 도움됩니다.', tags: ['#통잠성공', '#수면의식'] },
      { coachId: 'NUTRITION', title: '성장 영양 가이드', summary: '오전 10시 수유량을 20ml 늘려보세요. 낮 동안의 에너지가 보충되어 밤잠이 더 깊어집니다.', tags: ['#수유량조절', '#영양설계'] },
      { coachId: 'PSYCHOLOGY', title: '정서 발달 인사이트', summary: '눈맞춤 시간이 15% 증가했습니다. 옹알이에 적극적으로 반응해 주시는 것이 애착 형성에 매우 좋습니다.', tags: ['#정서교감', '#애착형성'] }
    ],
    checklist: [],
    trends: [
      { label: '월', value: 45, compareText: '평균' }, { label: '화', value: 55, compareText: '+10%' },
      { label: '수', value: 85, compareText: '최고' }, { label: '목', value: 40, compareText: '-15%' },
      { label: '금', value: 65, compareText: '+20%' }, { label: '토', value: 95, compareText: '달성' },
      { label: '일', value: 75, compareText: '유지' }
    ],
    growthMetrics: [
      { id: 'sleep', icon: '😴', label: '총 수면', value: '14.5', unit: '시간', progress: 90, status: 'good', trend: 'up', trendText: '+30분' },
      { id: 'feed', icon: '🍼', label: '수유량', value: '850', unit: 'ml', progress: 85, status: 'good', trend: 'stable', trendText: '유지중' },
      { id: 'tummy', icon: '💪', label: '터미타임', value: '15', unit: '분', progress: 75, status: 'normal', trend: 'up', trendText: '+5분' },
      { id: 'poop', icon: '💩', label: '배변', value: '5', unit: '회', progress: 100, status: 'good', trend: 'stable', trendText: '정상' },
      { id: 'weight', icon: '⚖️', label: '체중', value: '5.2', unit: 'kg', progress: 80, status: 'good', trend: 'up', trendText: '+150g' },
      { id: 'mood', icon: '😊', label: '기분', value: '좋음', unit: '', progress: 95, status: 'good', trend: 'up', trendText: '안정적' }
    ]
  });

  useEffect(() => {
    localStorage.setItem('parenting_unified_messages_v3', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (activeTab === 'CHATS') {
      // 탭 전환 시 DOM 렌더링 후 스크롤 이동을 위한 지연
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping, activeTab]);

  useEffect(() => {
    if (activeTab === 'INSIGHTS' && insightsContainerRef.current) {
      insightsContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isTyping) return;
    
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    try {
      const response = await getGeminiResponse(messages, textToSend, forcedCoachId || undefined);
      const assistantMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: response.text, 
        coachId: response.selectedCoachId,
        timestamp: new Date(),
        tips: response.tips
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) { 
      console.error(error); 
    } finally { 
      setIsTyping(false); 
    }
  };

  const toggleChecklist = (id: string) => {
    const newCompleted = !completedChecklist[id];
    if (newCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    const updated = { ...completedChecklist, [id]: newCompleted };
    setCompletedChecklist(updated);
    localStorage.setItem('parenting_checklist_completed', JSON.stringify(updated));
  };

  const navigateToCoach = (coachId: CoachRole) => {
    setForcedCoachId(coachId);
    setActiveTab('CHATS');
  };

  return (
    <div className="w-full max-w-md mx-auto h-[100dvh] bg-[#FDFBFA] flex flex-col relative overflow-x-hidden shadow-2xl">
      {showConfetti && <ConfettiEffect />}
      
      {/* 가이드 상세 보기 모달 */}
      {selectedGuide && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedGuide(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-t-[32px] shadow-2xl animate-slide-up overflow-hidden max-h-[70vh] flex flex-col mb-0" style={{ marginTop: 'env(safe-area-inset-top, 20px)' }}>
            {/* 드래그 핸들 */}
            <div className="flex justify-center pt-3 pb-1 bg-white shrink-0">
              <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
            </div>
            
            {/* 헤더 - 채팅창 카드와 동일한 스타일 */}
            <div className="relative px-5 pt-2 pb-4 bg-white shrink-0 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedGuide.gradient} flex items-center justify-center text-3xl shadow-lg shrink-0`}>
                  {selectedGuide.emoji}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold mb-1.5 ${
                    selectedGuide.category === 'SLEEP' ? 'bg-indigo-50 text-indigo-600' : 
                    selectedGuide.category === 'NUTRITION' ? 'bg-teal-50 text-teal-600' : 
                    selectedGuide.category === 'PSYCHOLOGY' ? 'bg-pink-50 text-pink-600' : 
                    selectedGuide.category === 'DEVELOPMENT' ? 'bg-green-50 text-green-600' : 
                    selectedGuide.category === 'POOP' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {selectedGuide.category === 'SLEEP' ? '💤 수면 가이드' : 
                     selectedGuide.category === 'NUTRITION' ? '🥣 영양 가이드' : 
                     selectedGuide.category === 'PSYCHOLOGY' ? '🧠 심리 가이드' : 
                     selectedGuide.category === 'DEVELOPMENT' ? '🌱 발달 가이드' : 
                     selectedGuide.category === 'POOP' ? '🚽 배변 가이드' : '💡 육아 팁'}
                  </span>
                  <h2 className="text-[16px] font-black text-[#222] leading-tight">{selectedGuide.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedGuide(null)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-400 transition-colors shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* 스크롤 가능한 콘텐츠 */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <div className="p-5 pb-6">
                {/* 상세 가이드가 있는 경우 */}
                {selectedGuide.fullGuide ? (
                  <>
                    {/* 인트로 */}
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-5 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                      {selectedGuide.fullGuide.intro}
                    </p>
                    
                    {/* 단계별 가이드 */}
                    <div className="mb-5">
                      <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-wider mb-3">📋 실천 가이드</h3>
                      <div className="space-y-2.5">
                        {selectedGuide.fullGuide.steps.map((step, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-lg shrink-0">
                              {step.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[13px] font-bold text-[#333] mb-0.5">{step.title}</h4>
                              <p className="text-[11px] text-gray-500 leading-snug">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* 팁 */}
                    <div className="mb-5">
                      <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-wider mb-3">💡 꿀팁</h3>
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-xl border border-amber-100">
                        <ul className="space-y-1.5">
                          {selectedGuide.fullGuide.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-[12px] text-gray-700">
                              <span className="text-amber-500 mt-0.5">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* 관련 질문 버튼 */}
                    <button 
                      onClick={() => {
                        const question = selectedGuide.fullGuide?.relatedQuestion || '';
                        setSelectedGuide(null);
                        setActiveTab('CHATS');
                        setTimeout(() => handleSendMessage(question), 150);
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-[#7EA1FF] to-[#A29BFE] text-white font-bold text-[13px] rounded-xl shadow-lg shadow-blue-200/50 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      "{selectedGuide.fullGuide.relatedQuestion}" 질문하기
                    </button>
                  </>
                ) : (
                  <>
                    {/* 기본 팁 목록 (fullGuide가 없는 경우) */}
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-4">{selectedGuide.description}</p>
                    <div className="space-y-2 mb-5">
                      {selectedGuide.tips?.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl">
                          <span className="text-base">{i === 0 ? '✅' : '💡'}</span>
                          <p className="text-[12px] text-gray-700 leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* 액션 버튼 */}
                    <button 
                      onClick={() => {
                        setSelectedGuide(null);
                        setActiveTab('CHATS');
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-[#7EA1FF] to-[#A29BFE] text-white font-bold text-[13px] rounded-xl shadow-lg shadow-blue-200/50 active:scale-[0.98] transition-transform"
                    >
                      AI 코치에게 더 물어보기 →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'CHATS' ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden chat-container w-full">
            <header className="px-4 pt-[env(safe-area-inset-top,12px)] pb-3 bg-white/95 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40 shrink-0">
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {COACHES.slice(0, 3).map(c => (
                      <div key={c.id} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] shadow-sm" style={{ background: c.bgColor }}>{c.avatar}</div>
                    ))}
                  </div>
                  <div>
                    <h1 className="header-title text-[18px] leading-tight">ZARAYO team</h1>
                    <span className="text-[10px] text-gray-400">AI 육아 코치</span>
                  </div>
                </div>
                <div className="bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-bold text-green-600">온라인</span>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar px-4 py-4 space-y-4 flex flex-col w-full">
              {messages.length === 0 && (
                <div className="flex flex-col items-center py-8 bubble-pop">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl border border-gray-50">👶</div>
                  </div>
                  <h2 className="text-[17px] font-black text-[#333] mb-1 text-center">육아 고민, 물어보세요!</h2>
                  <p className="text-[13px] text-[#888] text-center mb-6">수면, 이유식, 발달, 심리 전문가가 답변해요</p>
                  
                  <div className="w-full space-y-2">
                    {COACHES.slice(0, 3).map((coach, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSendMessage(coach.quickQuestions?.[0])} 
                        className="w-full p-3 rounded-2xl border border-gray-100 bg-white flex items-center gap-3 text-left active:scale-[0.98] active:bg-gray-50 transition-all"
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: coach.bgColor }}>{coach.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">{coach.name}</span>
                          <p className="text-[13px] font-medium text-[#333] truncate">{coach.quickQuestions?.[0]}</p>
                        </div>
                        <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, index) => {
                const coach = msg.coachId ? COACHES.find(c => c.id === msg.coachId) : null;
                return (
                  <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} bubble-pop`}>
                    {msg.role === 'assistant' && coach && (
                      <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]" style={{ background: coach.bgColor }}>{coach.avatar}</div>
                        <span className="text-[10px] font-bold text-gray-500">{coach.name} 코치</span>
                      </div>
                    )}
                    <div className={`px-3.5 py-2.5 rounded-2xl max-w-[85%] text-[14px] leading-relaxed ${msg.role === 'user' ? 'bg-[#7EA1FF] text-white rounded-tr-sm' : 'bg-white text-[#3D3D3D] border border-gray-100 rounded-tl-sm'}`}>
                      {msg.content}
                    </div>
                    {msg.tips && (
                      <div className="w-full mt-4">
                        {/* 컴팩트한 팁 카드 */}
                        <div className="space-y-2">
                          {msg.tips.slice(0, 2).map((tip, tIdx) => {
                            const category = tip.category || COACH_TO_CATEGORY[msg.coachId || 'ROUTER'] || 'GENERAL';
                            const illustrationCards = ILLUSTRATION_CARDS[category as keyof typeof ILLUSTRATION_CARDS] || ILLUSTRATION_CARDS.GENERAL;
                            const illustCard = illustrationCards[tIdx % illustrationCards.length] as any;
                            
                            return (
                              <div 
                                key={tIdx} 
                                onClick={() => setSelectedGuide({
                                  title: illustCard.title || tip.title,
                                  description: illustCard.description || tip.description,
                                  emoji: illustCard.emoji || tip.icon,
                                  gradient: illustCard.gradient,
                                  category: category,
                                  tips: [
                                    '✓ ' + tip.description,
                                    '💡 관련된 다른 팁들도 AI 코치에게 물어보세요!'
                                  ],
                                  fullGuide: illustCard.fullGuide
                                })}
                                className="w-full bg-white rounded-2xl p-3 shadow-sm border border-gray-50 fade-in cursor-pointer hover:shadow-md hover:border-gray-100 transition-all active:scale-[0.98]"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${illustCard.gradient} flex items-center justify-center text-2xl shrink-0`}>
                                    {(illustCard as any).emoji || tip.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <h4 className="text-[13px] font-bold text-[#222] truncate">{tip.title}</h4>
                                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                        tip.type === 'SUCCESS' ? 'bg-green-50 text-green-600' : 
                                        tip.type === 'WARNING' ? 'bg-amber-50 text-amber-600' : 
                                        'bg-blue-50 text-blue-600'
                                      }`}>
                                        {tip.type === 'SUCCESS' ? '추천' : tip.type === 'WARNING' ? '주의' : '참고'}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 line-clamp-1">{tip.description}</p>
                                  </div>
                                  <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                  </svg>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* 관련 가이드 (간소화) */}
                        {(() => {
                          const mainCategory = msg.tips[0]?.category || COACH_TO_CATEGORY[msg.coachId || 'ROUTER'] || 'GENERAL';
                          const relatedCards = ILLUSTRATION_CARDS[mainCategory as keyof typeof ILLUSTRATION_CARDS] || ILLUSTRATION_CARDS.GENERAL;
                          
                          return (
                            <div className="mt-3 overflow-x-auto hide-scrollbar w-full">
                              <div className="flex gap-2 pb-1" style={{ minWidth: 'min-content' }}>
                                {relatedCards.slice(0, 3).map((card: any) => (
                                  <button 
                                    key={card.id}
                                    onClick={() => setSelectedGuide({
                                      title: card.title,
                                      description: card.description,
                                      emoji: card.emoji || '📚',
                                      gradient: card.gradient,
                                      category: mainCategory,
                                      tips: [
                                        '📖 ' + card.description,
                                        '💬 더 자세한 내용은 AI 코치에게 질문해보세요!'
                                      ],
                                      fullGuide: card.fullGuide
                                    })}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                                  >
                                    <span className="text-base">{(card as any).emoji || '📚'}</span>
                                    <span className="text-[11px] font-medium text-gray-600 whitespace-nowrap">{card.title}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex flex-col items-start gap-2 mb-6">
                  <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-[32px] border border-gray-100 flex items-center gap-5 shadow-lg rounded-tl-none">
                    <div className="flex gap-1"><div className="w-2 h-2 bg-[#7EA1FF] rounded-full animate-bounce"></div><div className="w-2 h-2 bg-[#7EA1FF] rounded-full animate-bounce delay-75"></div><div className="w-2 h-2 bg-[#7EA1FF] rounded-full animate-bounce delay-150"></div></div>
                    <span className="text-[13px] font-bold text-gray-600">전문 코치가 답변을 준비 중입니다...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-0 shrink-0" />
            </div>

            {/* 하단 입력 영역 */}
            <div className="bg-white border-t border-gray-100 shrink-0 z-50">
              {/* 코치 선택 탭 */}
              <div className="overflow-x-auto hide-scrollbar py-2 border-b border-gray-50">
                <div className="flex gap-1.5 px-3 min-w-max">
                  <button 
                    onClick={() => setForcedCoachId(null)} 
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${!forcedCoachId ? 'bg-[#7EA1FF] text-white' : 'bg-gray-100 text-gray-500'}`}
                  >
                    전체
                  </button>
                  {COACHES.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => setForcedCoachId(c.id)} 
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${forcedCoachId === c.id ? 'text-white' : 'bg-gray-100 text-gray-500'}`} 
                      style={{ background: forcedCoachId === c.id ? c.bgColor : undefined }}
                    >
                      <span className="text-xs">{c.avatar}</span>{c.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* 입력창 */}
              <div className="px-3 py-2 pb-[env(safe-area-inset-bottom,8px)]">
                <div className="bg-gray-100 rounded-full flex items-center gap-2 pr-1.5">
                  <input 
                    ref={inputRef} 
                    type="text" 
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                    placeholder={forcedCoachId ? `${COACHES.find(c => c.id === forcedCoachId)?.name} 코치에게 질문` : "무엇이든 물어보세요"} 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-[#333] pl-4 py-2.5 text-[14px] outline-none placeholder:text-gray-400" 
                  />
                  <button 
                    onClick={() => handleSendMessage()} 
                    disabled={!inputText.trim() || isTyping} 
                    className={`p-2.5 rounded-full transition-all shrink-0 ${inputText.trim() ? 'bg-[#7EA1FF] text-white active:scale-90' : 'bg-gray-300 text-white'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14m-7-7l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FD] tab-content-enter">
            <header className="bg-white px-4 pt-[env(safe-area-inset-top,12px)] pb-4 rounded-b-[32px] shadow-sm z-20">
              <div className="flex items-center justify-between pt-2 mb-4">
                <div>
                   <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Report</span>
                   <h1 className="text-[20px] font-black text-[#222]">상담 리포트</h1>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7EA1FF] to-[#A29BFE] flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
              </div>
              {/* 채팅 요약 카드 */}
              {(() => {
                const userMessages = messages.filter(m => m.role === 'user');
                const assistantMessages = messages.filter(m => m.role === 'assistant');
                const lastAssistant = assistantMessages[assistantMessages.length - 1];
                const lastCoach = lastAssistant?.coachId ? COACHES.find(c => c.id === lastAssistant.coachId) : null;
                
                return (
                  <div 
                    onClick={() => setActiveTab('CHATS')}
                    className="bg-gradient-to-br from-[#7EA1FF] via-[#8E9CFF] to-[#A29BFE] p-4 rounded-2xl text-white shadow-lg relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className="absolute -right-2 -bottom-2 text-[60px] opacity-10">💬</div>
                    <div className="relative z-10">
                      {userMessages.length > 0 ? (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-bold uppercase tracking-wider">
                                최근 상담
                              </div>
                              {lastCoach && (
                                <div className="px-1.5 py-0.5 bg-white/15 rounded text-[9px] font-medium flex items-center gap-1">
                                  <span className="text-xs">{lastCoach.avatar}</span>
                                  <span>{lastCoach.name}</span>
                                </div>
                              )}
                            </div>
                            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>
                          </div>
                          <p className="text-[13px] font-medium leading-snug mb-2 line-clamp-1">
                            "{userMessages[userMessages.length - 1]?.content}"
                          </p>
                          <div className="flex items-center gap-1.5 text-white/80">
                            <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-medium">총 {userMessages.length}개 질문 답변 완료</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[13px] font-medium leading-snug mb-1">
                              AI 코치에게 첫 질문을 해보세요! 🎉
                            </p>
                            <span className="text-[10px] text-white/70">수면, 이유식, 발달, 심리, 배변</span>
                          </div>
                          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </header>

            <div ref={insightsContainerRef} className="flex-1 overflow-y-auto hide-scrollbar p-7 space-y-10 pb-20">
              <section className="fade-in">
                <h3 className="text-[15px] font-black text-[#222] uppercase tracking-[0.15em] mono mb-5">Chat Insights</h3>
                {(() => {
                  // 채팅 메시지 분석
                  const assistantMessages = messages.filter(m => m.role === 'assistant');
                  const totalChats = messages.filter(m => m.role === 'user').length;
                  
                  // 코치별 상담 횟수 계산
                  const coachStats: Record<string, number> = {};
                  assistantMessages.forEach(m => {
                    if (m.coachId) {
                      coachStats[m.coachId] = (coachStats[m.coachId] || 0) + 1;
                    }
                  });
                  
                  // 가장 많이 상담한 코치 찾기
                  const topCoaches = Object.entries(coachStats)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5);
                  
                  const maxCount = topCoaches[0]?.[1] || 1;
                  
                  return (
                    <div className="space-y-4">
                      {/* 총 상담 통계 */}
                      <div className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7EA1FF] to-[#A29BFE] flex items-center justify-center text-2xl text-white">
                              💬
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-gray-400">총 상담 횟수</p>
                              <p className="text-[28px] font-black text-[#222] leading-tight">{totalChats}<span className="text-[14px] text-gray-400 ml-1">회</span></p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-gray-400">받은 답변</p>
                            <p className="text-[18px] font-black text-[#7EA1FF]">{assistantMessages.length}개</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 코치별 상담 비율 */}
                      <div className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-50">
                        <p className="text-[12px] font-black text-gray-500 mb-4">🏆 코치별 상담 현황</p>
                        {topCoaches.length > 0 ? (
                          <div className="space-y-3">
                            {topCoaches.map(([coachId, count]) => {
                              const coach = COACHES.find(c => c.id === coachId);
                              if (!coach) return null;
                              const percentage = Math.round((count / maxCount) * 100);
                              return (
                                <div key={coachId} className="flex items-center gap-3">
                                  <div 
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                                    style={{ background: coach.bgColor }}
                                  >
                                    {coach.avatar}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-[12px] font-bold text-[#333]">{coach.name}</span>
                                      <span className="text-[11px] font-black text-gray-400">{count}회</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{ 
                                          width: `${percentage}%`,
                                          background: coach.bgColor 
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-3xl mb-2">🤔</p>
                            <p className="text-[13px] text-gray-400 font-medium">아직 상담 내역이 없어요</p>
                            <p className="text-[11px] text-gray-300 mt-1">AI 코치에게 질문해보세요!</p>
                          </div>
                        )}
                      </div>
                      
                      {/* 최근 상담 키워드 */}
                      {assistantMessages.length > 0 && (
                        <div className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-50">
                          <p className="text-[12px] font-black text-gray-500 mb-3">🔍 최근 관심 주제</p>
                          <div className="flex flex-wrap gap-2">
                            {(() => {
                              const keywords: string[] = [];
                              messages.filter(m => m.role === 'user').slice(-5).forEach(m => {
                                if (m.content.includes('잠') || m.content.includes('수면')) keywords.push('수면');
                                if (m.content.includes('이유식') || m.content.includes('먹') || m.content.includes('수유')) keywords.push('이유식');
                                if (m.content.includes('울') || m.content.includes('떼') || m.content.includes('애착')) keywords.push('심리');
                                if (m.content.includes('발달') || m.content.includes('뒤집') || m.content.includes('기어')) keywords.push('발달');
                                if (m.content.includes('기저귀') || m.content.includes('배변') || m.content.includes('똥')) keywords.push('배변');
                              });
                              const uniqueKeywords = [...new Set(keywords)];
                              if (uniqueKeywords.length === 0) uniqueKeywords.push('육아 전반');
                              
                              return uniqueKeywords.map((kw, i) => (
                                <span 
                                  key={i}
                                  className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-[11px] font-bold text-[#7EA1FF] rounded-xl border border-blue-100"
                                >
                                  #{kw}
                                </span>
                              ));
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </section>

              <section className="fade-in">
                <h3 className="text-[15px] font-black text-[#222] uppercase tracking-[0.15em] mono mb-5">Recent Tips</h3>
                {(() => {
                  // 최근 메시지에서 팁 수집
                  const recentTips = messages
                    .filter(m => m.role === 'assistant' && m.tips && m.tips.length > 0)
                    .slice(-3)
                    .flatMap(m => m.tips?.map(tip => ({ ...tip, coachId: m.coachId })) || [])
                    .slice(-4);
                  
                  if (recentTips.length === 0) {
                    return (
                      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50 text-center">
                        <p className="text-4xl mb-3">💡</p>
                        <p className="text-[14px] font-bold text-gray-400">아직 받은 팁이 없어요</p>
                        <p className="text-[12px] text-gray-300 mt-1">AI 코치에게 질문하면 실천 팁을 받을 수 있어요!</p>
                        <button 
                          onClick={() => setActiveTab('CHATS')}
                          className="mt-4 px-5 py-2.5 bg-gradient-to-r from-[#7EA1FF] to-[#A29BFE] text-white text-[12px] font-bold rounded-2xl shadow-lg"
                        >
                          질문하러 가기 →
                        </button>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="grid grid-cols-1 gap-4">
                      {recentTips.map((tip, i) => {
                        const coach = COACHES.find(c => c.id === tip.coachId);
                        const category = tip.category || COACH_TO_CATEGORY[tip.coachId || 'ROUTER'] || 'GENERAL';
                        const categoryCards = ILLUSTRATION_CARDS[category as keyof typeof ILLUSTRATION_CARDS] || ILLUSTRATION_CARDS.GENERAL;
                        const matchingCard = categoryCards.find((c: any) => c.title.includes(tip.title.split(' ')[0])) || categoryCards[0];
                        
                        return (
                          <button 
                            key={i} 
                            onClick={() => setSelectedGuide({
                              title: tip.title,
                              description: tip.description,
                              emoji: tip.icon,
                              gradient: coach?.bgColor?.includes('gradient') 
                                ? coach.bgColor.replace('linear-gradient(135deg, ', 'from-').replace(',', ' to-').replace(')', '') 
                                : 'from-blue-400 to-purple-500',
                              category: category,
                              tips: [
                                `📖 ${tip.description}`,
                                coach ? `💬 ${coach.name} 코치의 조언이에요!` : '💬 더 자세한 내용은 AI 코치에게 질문해보세요!'
                              ],
                              fullGuide: (matchingCard as any)?.fullGuide
                            })}
                            className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-50 text-left active:scale-[0.98] transition-all"
                          >
                            <div className="flex items-start gap-4">
                              <div 
                                className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                                style={{ background: coach?.bgColor || 'linear-gradient(135deg, #7EA1FF, #A29BFE)' }}
                              >
                                {tip.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[14px] font-black text-[#222]">{tip.title}</span>
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                                    tip.type === 'SUCCESS' ? 'bg-green-50 text-green-600' : 
                                    tip.type === 'WARNING' ? 'bg-amber-50 text-amber-600' : 
                                    'bg-blue-50 text-blue-600'
                                  }`}>
                                    {tip.type === 'SUCCESS' ? '추천' : tip.type === 'WARNING' ? '주의' : '참고'}
                                  </span>
                                </div>
                                <p className="text-[12px] text-gray-500 leading-relaxed">{tip.description}</p>
                                {coach && (
                                  <p className="text-[10px] text-gray-400 mt-2 font-medium">
                                    {coach.avatar} {coach.name} 코치 제공
                                  </p>
                                )}
                              </div>
                              <svg className="w-4 h-4 text-gray-300 shrink-0 self-center" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                              </svg>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </section>

              <section className="fade-in">
                <h3 className="text-[15px] font-black text-[#222] uppercase tracking-[0.15em] mono mb-5">Action Checklist</h3>
                <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50">
                  {dynamicChecklist.map((item) => (
                    <div key={item.id} onClick={() => toggleChecklist(item.id)} className={`flex items-center gap-4 p-5 cursor-pointer border-b border-gray-50 last:border-none transition-all ${item.completed ? 'bg-gray-50/40' : 'hover:bg-gray-50/50'}`}>
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${item.completed ? 'bg-[#7EA1FF] border-transparent' : 'border-gray-200'}`}>
                        {item.completed && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{item.icon}</span>
                          <span className={`text-[14px] font-bold ${item.completed ? 'text-gray-300 line-through' : 'text-[#333]'}`}>{item.text}</span>
                        </div>
                        {item.description && (
                          <p className={`text-[11px] mt-0.5 ${item.completed ? 'text-gray-300' : 'text-gray-400'}`}>{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      <nav className="bg-white border-t border-gray-200 shrink-0 z-50">
        <div className="flex items-center justify-around py-1.5 pb-[max(6px,env(safe-area-inset-bottom))]">
          <button 
            onClick={() => setActiveTab('CHATS')} 
            className={`flex flex-col items-center gap-0.5 px-6 py-1.5 rounded-xl transition-colors ${
              activeTab === 'CHATS' ? 'text-[#7EA1FF]' : 'text-gray-400'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
            <span className="text-[10px] font-bold">AI코치</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('INSIGHTS')} 
            className={`flex flex-col items-center gap-0.5 px-6 py-1.5 rounded-xl transition-colors ${
              activeTab === 'INSIGHTS' ? 'text-[#7EA1FF]' : 'text-gray-400'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <span className="text-[10px] font-bold">리포트</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
