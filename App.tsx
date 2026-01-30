
import React, { useState, useEffect, useRef } from 'react';
import { COACHES } from './constants';
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
  const [activeTab, setActiveTab] = useState<AppTab>('INSIGHTS');
  const [timeFilter, setTimeFilter] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');
  const [forcedCoachId, setForcedCoachId] = useState<CoachRole | null>(null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const dateReviver = (key: string, value: any) => {
    if (key === 'timestamp' && typeof value === 'string') return new Date(value);
    return value;
  };

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('parenting_unified_messages_v3');
    return saved ? JSON.parse(saved, dateReviver) : [];
  });

  const [insightData, setInsightData] = useState<InsightReport>({
    summary: "생후 52일, 민준이는 오늘 7시간 통잠에 성공했어요! 수면 의식이 자리를 잡아가고 있네요.",
    statusIcon: "🌙",
    solutions: [
      { coachId: 'SLEEP_EXPERT', title: '꿀잠 솔루션 리포트', summary: '밤중 수유 횟수를 1회로 줄이고, 화이트 노이즈 볼륨을 50%로 고정하는 것이 숙면에 도움됩니다.', tags: ['#통잠성공', '#수면의식'] },
      { coachId: 'NUTRITION', title: '성장 영양 가이드', summary: '오전 10시 수유량을 20ml 늘려보세요. 낮 동안의 에너지가 보충되어 밤잠이 더 깊어집니다.', tags: ['#수유량조절', '#영양설계'] },
      { coachId: 'PSYCHOLOGY', title: '정서 발달 인사이트', summary: '눈맞춤 시간이 15% 증가했습니다. 옹알이에 적극적으로 반응해 주시는 것이 애착 형성에 매우 좋습니다.', tags: ['#정서교감', '#애착형성'] }
    ],
    checklist: [
      { id: '1', text: '저녁 7시 따뜻한 물로 목욕시키기', completed: false, category: 'SLEEP' },
      { id: '2', text: '비타민 D 영양제 챙겨주기', completed: true, category: 'NUTRITION' },
      { id: '3', text: '방 안 온도 22.5도 유지하기', completed: false, category: 'ENV' },
      { id: '4', text: '터미타임 5분 2회 실시하기', completed: false, category: 'DEV' }
    ],
    trends: [
      { label: '월', value: 45, compareText: '평균' }, { label: '화', value: 55, compareText: '+10%' },
      { label: '수', value: 85, compareText: '최고' }, { label: '목', value: 40, compareText: '-15%' },
      { label: '금', value: 65, compareText: '+20%' }, { label: '토', value: 95, compareText: '달성' },
      { label: '일', value: 75, compareText: '유지' }
    ]
  });

  useEffect(() => {
    localStorage.setItem('parenting_unified_messages_v3', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (activeTab === 'CHATS') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

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
    setInsightData(prev => ({
      ...prev, checklist: prev.checklist.map(item => {
        if (item.id === id) {
          if (!item.completed) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 2000); }
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    }));
  };

  const navigateToCoach = (coachId: CoachRole) => {
    setForcedCoachId(coachId);
    setActiveTab('CHATS');
  };

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-[#FDFBFA] flex flex-col relative overflow-hidden shadow-2xl">
      {showConfetti && <ConfettiEffect />}

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'CHATS' ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden chat-container">
            <header className="p-6 pt-10 bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="header-title text-[26px]">Team JARAYO</h1>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex -space-x-2.5">
                      {COACHES.map(c => (
                        <div key={c.id} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[11px] shadow-sm overflow-hidden" style={{ background: c.bgColor }}>{c.avatar}</div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 mono ml-2 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">AI 전문가 그룹</span>
                  </div>
                </div>
                <div className="bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/50 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-blue-600 mono">LIVE</span>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8 flex flex-col">
              {messages.length === 0 && (
                <div className="flex flex-col items-center py-12 bubble-pop">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-white rounded-[40px] shadow-xl flex items-center justify-center text-5xl border border-gray-50">👶</div>
                  </div>
                  <h2 className="text-[20px] font-black text-[#333] mb-2 text-center tracking-tight">당신의 육아 파트너입니다</h2>
                  <p className="text-[14px] font-medium text-[#888] text-center px-10 leading-relaxed mb-10">아이의 성장과 부모의 행복을 위해<br/>최적의 솔루션을 제공합니다.</p>
                  
                  <div className="w-full grid grid-cols-1 gap-4 max-w-sm px-4">
                    {COACHES.slice(0, 3).map((coach, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSendMessage(coach.quickQuestions?.[0])} 
                        className="w-full p-4 rounded-3xl border border-gray-100 bg-white shadow-sm flex items-center gap-4 text-left transition-all active:scale-95"
                      >
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: coach.bgColor }}>{coach.avatar}</div>
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{coach.name}</span>
                          <span className="text-[15px] font-bold text-[#444] truncate">{coach.quickQuestions?.[0]}</span>
                        </div>
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
                      <div className="flex items-center gap-2 mb-2 ml-1">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] text-white shadow-sm" style={{ background: coach.bgColor }}>{coach.avatar}</div>
                        <span className="text-[11px] font-black text-gray-500 tracking-tighter uppercase">{coach.name} 코치</span>
                      </div>
                    )}
                    <div className={`px-5 py-4 rounded-[28px] max-w-[92%] text-[15px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#7EA1FF] text-white rounded-tr-none' : 'bg-white text-[#3D3D3D] border border-gray-50 rounded-tl-none'}`}>
                      {msg.content}
                    </div>
                    {msg.tips && (
                      <div className="w-full space-y-4 mt-5">
                        {msg.tips.map((tip, tIdx) => (
                          <div key={tIdx} className="w-[94%] bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-50 fade-in group">
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-2xl bg-gray-50 flex items-center justify-center text-lg">{tip.icon}</div>
                                <h4 className="text-[16px] font-black text-[#222]">{tip.title}</h4>
                              </div>
                              <p className="text-[13px] font-medium text-[#666] leading-relaxed">{tip.description}</p>
                            </div>
                          </div>
                        ))}
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
              <div ref={messagesEndRef} className="h-10 shrink-0" />
            </div>

            {/* Coach Expert Tabs - Reconfigured */}
            <div className="bg-white border-t border-gray-50 shrink-0 pb-8 shadow-[0_-15px_40px_rgba(0,0,0,0.04)] z-50">
              <div className="overflow-x-auto hide-scrollbar shrink-0 py-4">
                <div className="flex gap-2.5 px-6 min-w-max">
                  <button 
                    onClick={() => setForcedCoachId(null)} 
                    className={`px-5 py-2.5 rounded-2xl text-[12px] font-black border transition-all ${!forcedCoachId ? 'bg-[#7EA1FF] text-white border-transparent shadow-lg shadow-[#7EA1FF]/30' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'}`}
                  >
                    ALL
                  </button>
                  {COACHES.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => setForcedCoachId(c.id)} 
                      className={`px-5 py-2.5 rounded-2xl text-[12px] font-black border flex items-center gap-2 transition-all ${forcedCoachId === c.id ? 'text-white border-transparent shadow-lg' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'}`} 
                      style={{ background: forcedCoachId === c.id ? c.bgColor : undefined }}
                    >
                      <span className="text-sm">{c.avatar}</span><span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-6">
                <div className="bg-gray-50 rounded-[32px] p-2 flex items-center gap-1 border border-gray-100 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#7EA1FF]/5 transition-all">
                  <input 
                    ref={inputRef} 
                    type="text" 
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                    placeholder={forcedCoachId ? `${COACHES.find(c => c.id === forcedCoachId)?.name} 코치에게 상담하기` : "궁금한 점을 물어보세요"} 
                    className="flex-1 bg-transparent border-none focus:ring-0 font-bold text-[#333] px-5 py-3.5 text-[15px] outline-none placeholder:text-gray-300" 
                  />
                  <button onClick={() => handleSendMessage()} disabled={!inputText.trim() || isTyping} className={`p-4 rounded-[24px] transition-all ${inputText.trim() ? 'bg-[#7EA1FF] text-white shadow-xl shadow-[#7EA1FF]/30 active:scale-90' : 'bg-gray-200 text-gray-300'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14m-7-7l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FD] tab-content-enter">
            <header className="bg-white px-7 pt-12 pb-8 rounded-b-[48px] shadow-sm z-20">
              <div className="flex items-center justify-between mb-10">
                <div className="flex flex-col">
                   <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1 mono">Intelligence</span>
                   <h1 className="text-[28px] font-black outfit text-[#222] tracking-tighter">Report Hub</h1>
                </div>
                <div className="bg-gray-50 p-1.5 rounded-[22px] flex gap-1 border border-gray-100">
                  {(['DAILY', 'WEEKLY', 'MONTHLY'] as const).map(t => (
                    <button key={t} onClick={() => setTimeFilter(t)} className={`px-4 py-2 rounded-[18px] text-[11px] font-black transition-all ${timeFilter === t ? 'bg-white text-[#7EA1FF] shadow-md border border-gray-50' : 'text-gray-400'}`}>{t === 'DAILY' ? '일간' : t === 'WEEKLY' ? '주간' : '월간'}</button>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#7EA1FF] via-[#8E9CFF] to-[#A29BFE] p-7 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 text-[120px] opacity-15 transform rotate-12">{insightData.statusIcon}</div>
                <div className="relative z-10">
                   <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/30 mb-4 inline-block">Insight Today</div>
                   <h2 className="text-[19px] font-black leading-snug tracking-tight mb-4 pr-10">{insightData.summary}</h2>
                   <div className="flex items-center gap-2 text-white/80"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span><span className="text-[11px] font-bold">민준이의 성장 지표가 안정적입니다</span></div>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto hide-scrollbar p-7 space-y-10 pb-20">
              <section className="fade-in">
                <h3 className="text-[15px] font-black text-[#222] uppercase tracking-[0.15em] mono mb-5">Vital Trends</h3>
                <div className="bg-white p-7 rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
                  <div className="flex items-end justify-between h-28 gap-2">
                    {insightData.trends.map((t, i) => (
                      <div key={i} className="flex flex-col items-center flex-1 gap-3">
                        <div className="w-full bg-gray-50 rounded-2xl h-24 relative overflow-hidden">
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#7EA1FF] to-[#A29BFE] transition-all duration-1000 ease-out" style={{ height: `${t.value}%`, opacity: t.value > 80 ? 1 : 0.4 }}></div>
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="fade-in">
                <h3 className="text-[15px] font-black text-[#222] uppercase tracking-[0.15em] mono mb-5">Expert Summaries</h3>
                <div className="grid grid-cols-1 gap-5">
                  {insightData.solutions.map((sol, i) => (
                    <div key={i} onClick={() => navigateToCoach(sol.coachId)} className="bg-white p-6 rounded-[40px] shadow-sm border border-gray-50 group active:scale-[0.97] transition-all cursor-pointer">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-inner" style={{ background: COACHES.find(c=>c.id===sol.coachId)?.bgColor }}>{COACHES.find(c=>c.id===sol.coachId)?.avatar}</div>
                        <span className="text-[15px] font-black text-[#222]">{sol.title}</span>
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed mb-5 font-medium">{sol.summary}</p>
                      <div className="flex flex-wrap gap-2">{sol.tags.map(tag => <span key={tag} className="px-3 py-1 bg-gray-50 text-[10px] font-black text-gray-400 rounded-xl">{tag}</span>)}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="fade-in">
                <h3 className="text-[15px] font-black text-[#222] uppercase tracking-[0.15em] mono mb-5">Action Checklist</h3>
                <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-50">
                  {insightData.checklist.map((item, i) => (
                    <div key={item.id} onClick={() => toggleChecklist(item.id)} className={`flex items-center gap-5 p-6 cursor-pointer border-b border-gray-50 last:border-none ${item.completed ? 'bg-gray-50/40 opacity-50' : ''}`}>
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${item.completed ? 'bg-[#7EA1FF] border-transparent' : 'border-gray-200'}`}>{item.completed && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>}</div>
                      <span className={`flex-1 text-[14px] font-bold ${item.completed ? 'text-gray-300 line-through' : 'text-[#444]'}`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      <nav className="bg-white/95 backdrop-blur-3xl border-t border-gray-100 shrink-0 h-[100px] flex items-start px-12 rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.04)] z-50">
        <div className="nav-active-pill" style={{ transform: activeTab === 'CHATS' ? 'translateX(0)' : 'translateX(100%)', width: '50%', left: '0' }}>
           <div className="bg-gradient-to-br from-[#7EA1FF] to-[#A29BFE] w-[84px] h-[52px] rounded-[24px] mx-auto opacity-10"></div>
        </div>
        <button onClick={() => setActiveTab('CHATS')} className={`relative z-10 flex-1 flex flex-col items-center justify-center h-[90px] gap-1.5 transition-all ${activeTab === 'CHATS' ? 'text-[#7EA1FF] scale-110' : 'text-gray-300'}`}>
          <div className={`p-2 rounded-xl transition-colors ${activeTab === 'CHATS' ? 'bg-blue-50' : ''}`}><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></div>
          <span className="text-[10px] font-black uppercase tracking-widest mono">COACH</span>
        </button>
        <button onClick={() => setActiveTab('INSIGHTS')} className={`relative z-10 flex-1 flex flex-col items-center justify-center h-[90px] gap-1.5 transition-all ${activeTab === 'INSIGHTS' ? 'text-[#7EA1FF] scale-110' : 'text-gray-300'}`}>
          <div className={`p-2 rounded-xl transition-colors ${activeTab === 'INSIGHTS' ? 'bg-blue-50' : ''}`}><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg></div>
          <span className="text-[10px] font-black uppercase tracking-widest mono">INSIGHT</span>
        </button>
      </nav>
    </div>
  );
}
