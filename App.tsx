
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { COACHES } from './constants';
import { Coach, Message, CoachRole, AppTab, ParentingRecord, RecordType } from './types';
import { getGeminiResponse } from './geminiService';

const CoachIcon: React.FC<{ type: string; className?: string; isHeader?: boolean }> = ({ type, className = "w-6 h-6", isHeader = false }) => {
  const isEmoji = /\p{Emoji}/u.test(type);
  return (
    <div className={`relative ${isHeader ? 'ai-pulse-ring' : ''}`}>
      {isEmoji ? (
        <span className={`${className.replace('w-6 h-6', 'text-2xl')} flex items-center justify-center z-10 relative`}>{type}</span>
      ) : (
        <svg className={`${className} z-10 relative`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )}
    </div>
  );
};

const RecordIcon: React.FC<{ type: RecordType; className?: string }> = ({ type, className = "w-10 h-10" }) => {
  switch (type) {
    case 'FEED':
      return <div className={`flex items-center justify-center rounded-2xl bg-[#FFF5E9] ${className}`}><svg className="w-1/2 h-1/2 text-[#FFA83C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M3 12H2m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>;
    case 'SLEEP':
      return <div className={`flex items-center justify-center rounded-2xl bg-[#F3F0FF] ${className}`}><svg className="w-1/2 h-1/2 text-[#8A6EFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg></div>;
    case 'POOP':
      return <div className={`flex items-center justify-center rounded-2xl bg-[#EBF3FF] ${className}`}><svg className="w-1/2 h-1/2 text-[#629BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div>;
    case 'BATH':
      return <div className={`flex items-center justify-center rounded-2xl bg-[#FFF0F3] ${className}`}><svg className="w-1/2 h-1/2 text-[#FF7F9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg></div>;
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('CHATS');
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [editingRecord, setEditingRecord] = useState<ParentingRecord | null>(null);

  const [messages, setMessages] = useState<{ [key in CoachRole]?: Message[] }>(() => {
    const saved = localStorage.getItem('parenting_ai_messages_v14');
    return saved ? JSON.parse(saved) : {};
  });

  const [parentingRecords, setParentingRecords] = useState<ParentingRecord[]>(() => {
    const saved = localStorage.getItem('parenting_records_v14');
    if (!saved) return [];
    return JSON.parse(saved).map((r: any) => ({ ...r, timestamp: new Date(r.timestamp) }));
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('parenting_ai_messages_v14', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('parenting_records_v14', JSON.stringify(parentingRecords));
  }, [parentingRecords]);

  useEffect(() => {
    if (selectedCoach) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, selectedCoach]);

  const addRecord = (type: RecordType) => {
    const newRecord: ParentingRecord = {
      id: Date.now().toString(),
      type,
      timestamp: new Date(),
      subType: type === 'FEED' ? '분유' : type === 'POOP' ? '소변' : undefined,
      value: '',
    };
    setEditingRecord(newRecord);
  };

  const saveRecord = (record: ParentingRecord) => {
    setParentingRecords(prev => {
      const exists = prev.find(r => r.id === record.id);
      const updated = exists ? prev.map(r => r.id === record.id ? record : r) : [record, ...prev];
      return updated.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    });
    setEditingRecord(null);
  };

  const deleteRecord = (id: string) => {
    setParentingRecords(prev => prev.filter(r => r.id !== id));
    setEditingRecord(null);
  };

  const displayCoaches = useMemo(() => {
    return COACHES.map(coach => {
      const history = messages[coach.id] as Message[] | undefined;
      if (history && history.length > 0) {
        const lastMsg = history[history.length - 1];
        return {
          ...coach,
          statusPreview: lastMsg.content,
          lastTime: new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        };
      }
      return coach;
    });
  }, [messages]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || !selectedCoach || isTyping) return;
    
    const currentRole = selectedCoach.id;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: textToSend, timestamp: new Date() };
    
    setMessages(prev => ({ ...prev, [currentRole]: [...(prev[currentRole] || []), userMessage] }));
    setInputText('');
    setIsTyping(true);
    
    try {
      const response = await getGeminiResponse(selectedCoach, [...(messages[currentRole] || []), userMessage], textToSend);
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.text, timestamp: new Date() };
      setMessages(prev => ({ ...prev, [currentRole]: [...(prev[currentRole] || []), assistantMessage] }));
    } catch (error) { 
      console.error(error); 
    } finally { 
      setIsTyping(false); 
    }
  };

  const EditModal = () => {
    if (!editingRecord) return null;
    const r = editingRecord;
    const isNew = !parentingRecords.find(p => p.id === r.id);
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 fade-in">
        <div className="bg-white w-full max-sm:pb-10 max-w-sm rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl border border-gray-100">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="font-bold text-[18px] text-[#333]">
                {r.type === 'FEED' ? '수유 데이터 입력' : r.type === 'POOP' ? '배변 데이터 입력' : r.type === 'SLEEP' ? '수면 데이터 입력' : '목욕 데이터 입력'}
              </h3>
              <p className="text-[11px] text-[#AAA] font-bold mono uppercase mt-1">AI Growth Analysis System</p>
            </div>
            <button onClick={() => setEditingRecord(null)} className="p-2 bg-white rounded-full text-gray-400 outline-none hover:text-gray-600 shadow-sm transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="p-8 space-y-6">
            {(r.type === 'FEED' || r.type === 'POOP') && (
              <div>
                <label className="text-[12px] font-bold text-[#888] mb-3 block px-1 mono uppercase">Category</label>
                <div className="flex gap-2">
                  {(r.type === 'FEED' ? ['분유', '모유', '이유식'] : ['소변', '대변']).map(opt => (
                    <button key={opt} onClick={() => setEditingRecord({...r, subType: opt})} className={`flex-1 py-3.5 rounded-2xl text-[14px] font-bold border transition-all outline-none ${r.subType === opt ? 'bg-[#7EA1FF] text-white border-[#7EA1FF] shadow-lg shadow-[#7EA1FF]/30' : 'bg-white text-gray-400 border-gray-100'}`}>{opt}</button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="text-[12px] font-bold text-[#888] mb-3 block px-1 mono uppercase">Value / Note</label>
              <input 
                type="text" 
                autoFocus
                value={r.value} 
                onChange={(e) => setEditingRecord({...r, value: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-100 rounded-[20px] px-5 py-4 font-bold text-[#333] focus:ring-4 focus:ring-[#7EA1FF]/10 focus:border-[#7EA1FF]/30 outline-none transition-all" 
                placeholder={r.type === 'FEED' ? '예: 160ml' : r.type === 'SLEEP' ? '예: 2시간' : '기록 내용을 입력하세요'} 
              />
            </div>
            <div>
              <label className="text-[12px] font-bold text-[#888] mb-3 block px-1 mono uppercase">Timestamp</label>
              <input 
                type="time" 
                value={r.timestamp.toTimeString().slice(0, 5)} 
                onChange={(e) => {
                  const [h, m] = e.target.value.split(':');
                  const d = new Date(r.timestamp);
                  d.setHours(parseInt(h), parseInt(m));
                  setEditingRecord({...r, timestamp: d});
                }} 
                className="w-full bg-gray-50 border border-gray-100 rounded-[20px] px-5 py-4 font-bold text-[#333] focus:ring-4 focus:ring-[#7EA1FF]/10 outline-none mono" 
              />
            </div>
          </div>
          <div className="p-8 bg-gray-50/50 flex gap-3">
            {!isNew && (
              <button onClick={() => deleteRecord(r.id)} className="flex-1 py-4 bg-white text-red-400 font-bold rounded-2xl border border-red-50 outline-none hover:bg-red-50 transition-colors">DELETE</button>
            )}
            <button onClick={() => saveRecord(r)} className="flex-[2] py-4 bg-[#7EA1FF] text-white font-bold rounded-2xl shadow-xl shadow-[#7EA1FF]/20 outline-none active:scale-[0.98] transition-all uppercase tracking-widest mono">Save Data</button>
          </div>
        </div>
      </div>
    );
  };

  const RecordsTab = () => (
    <div className="flex-1 bg-[#FDFBFA] tab-content-enter flex flex-col p-6 pb-28 overflow-y-auto hide-scrollbar h-full">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <h2 className="text-[22px] font-bold text-[#333]">성장 기록</h2>
        <div className="bg-white/80 px-3 py-1 rounded-full border border-gray-100 text-[10px] font-bold text-[#7EA1FF] mono">LOGGING ENGINE v1.4</div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10 shrink-0">
        {[
          { type: 'FEED' as RecordType, label: '수유' },
          { type: 'POOP' as RecordType, label: '배변' },
          { type: 'SLEEP' as RecordType, label: '수면' },
          { type: 'BATH' as RecordType, label: '목욕' },
        ].map((item, idx) => (
          <button 
            key={item.type} 
            onClick={() => addRecord(item.type)} 
            className="flex flex-col items-center gap-2 group outline-none fade-in"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <RecordIcon type={item.type} className="w-14 h-14 transition-all active:scale-90 group-hover:shadow-md" />
            <span className="text-[13px] font-bold text-[#777]">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex-1 overflow-visible">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-[16px] font-bold text-[#555]">오늘의 타임라인</h3>
           <span className="text-[11px] text-[#BBB] font-bold mono">{new Date().toLocaleDateString()}</span>
        </div>
        
        <div className="space-y-6 relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-50" />
          {parentingRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-30">
               <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <p className="text-[13px] font-bold text-gray-400">분석할 데이터가 없습니다</p>
            </div>
          ) : parentingRecords.map((record, index) => (
            <button 
              key={record.id} 
              onClick={() => setEditingRecord(record)} 
              className="flex items-center w-full text-left group outline-none bubble-pop"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-10 h-10 rounded-full z-10 flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white ${
                record.type === 'FEED' ? 'bg-[#FFECDE]' :
                record.type === 'SLEEP' ? 'bg-[#EDE9FF]' :
                record.type === 'POOP' ? 'bg-[#E1F1FF]' : 'bg-[#FFF0F3]'
              }`}>
                <RecordIcon type={record.type} className="w-6 h-6 bg-transparent" />
              </div>
              <div className="ml-4 flex-1 flex justify-between items-center border-b border-gray-50 pb-5 group-last:border-none">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-[#333]">{record.subType || (record.type === 'BATH' ? '목욕' : '수면')}</span>
                    <span className="text-[11px] font-bold text-[#CCC] mono">{record.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                  </div>
                  <p className="text-[13px] text-[#888] mt-1 font-medium">{record.value || '상세 내용 없음'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-[#E0E0E0] mono">AI_VERIFIED</span>
                  <svg className="w-4 h-4 text-gray-200 transition-transform group-active:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (selectedCoach) {
    const currentChat = messages[selectedCoach.id] || [];
    return (
      <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col fade-in relative chat-container">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md p-5 flex items-center justify-between border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedCoach(null)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors outline-none"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
            <div className="flex items-center gap-3">
              <div 
                className={`w-10 h-10 rounded-2xl flex items-center justify-center border border-white/50 shadow-sm`}
                style={{ background: selectedCoach.bgColor }}
              >
                <CoachIcon type={selectedCoach.avatar} isHeader className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                   <h1 className="text-[16px] font-bold text-[#333] leading-none">{selectedCoach.name}</h1>
                   <span className="ai-badge text-[9px] text-white px-1.5 py-0.5 rounded font-bold tracking-widest mono">AI</span>
                </div>
                <p className="text-[10px] text-[#BBB] font-medium mt-1.5 mono uppercase tracking-tight">
                  Neural Engine Active • Latency 0.2s
                </p>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-6 flex flex-col">
          <div className="flex justify-center mb-4 shrink-0">
            <div className="bg-white/80 px-4 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold text-gray-400 shadow-sm mono uppercase tracking-wider">
              256-bit AES AI Encryption
            </div>
          </div>
          
          {currentChat.length === 0 && (
            <div className="flex flex-col items-center py-10 bubble-pop">
               <div 
                className={`w-20 h-20 rounded-[32px] flex items-center justify-center mb-6 shadow-sm ring-8 ring-gray-50 ai-pulse-ring`}
                style={{ background: selectedCoach.bgColor }}
               >
                 <CoachIcon type={selectedCoach.avatar} className="text-white !text-4xl" />
               </div>
               <p className="text-[17px] font-bold text-[#555] text-center px-10 leading-relaxed">
                 {selectedCoach.welcomeMessage}
               </p>
            </div>
          )}

          {currentChat.map((msg, index) => (
            <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} bubble-pop`} style={{ animationDelay: `${index * 0.05}s` }}>
              <div className={`px-5 py-4 rounded-[24px] max-w-[85%] text-[14.5px] leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#7EA1FF] text-white rounded-tr-none' 
                  : `bg-white text-[#3D3D3D] border border-gray-100 rounded-tl-none`
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start bubble-pop">
              <div className="bg-white px-5 py-3 rounded-[24px] border border-gray-100 flex items-center gap-3 shadow-sm rounded-tl-none">
                <span className="text-[11px] font-bold text-[#7EA1FF] mono animate-pulse">AI PROCESSING...</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-8 shrink-0" />
        </div>

        <div className="bg-white border-t border-gray-100 shrink-0 pb-8">
          {selectedCoach.quickQuestions && selectedCoach.quickQuestions.length > 0 && !isTyping && (
            <div className="overflow-x-auto hide-scrollbar shrink-0 py-3">
              <div className="flex gap-2 px-5 min-w-max">
                {selectedCoach.quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="whitespace-nowrap px-4 py-2.5 rounded-full bg-gray-50 border border-gray-100 text-[13px] font-bold text-[#666] shadow-sm active:scale-95 transition-all hover:bg-white hover:border-[#7EA1FF]/30 hover:text-[#7EA1FF]"
                  >
                    <span className="opacity-40 mr-1.5 mono text-[10px]">#</span>{q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="px-5">
            <div className="bg-gray-50 rounded-[28px] p-2 flex items-center gap-2 border border-gray-100 focus-within:ring-4 focus-within:ring-[#7EA1FF]/5 focus-within:border-[#7EA1FF]/20 transition-all">
              <button className="p-3 text-gray-300 hover:text-gray-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              </button>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="AI 코치와 상담하기..." 
                className="flex-1 bg-transparent border-none focus:ring-0 font-medium text-[#333] px-2 py-2 text-[15px] outline-none" 
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className={`p-3 rounded-full transition-all outline-none ${inputText.trim() ? 'bg-[#7EA1FF] text-white shadow-lg active:scale-95' : 'text-gray-300 bg-transparent'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen h-screen bg-[#FDFBFA] flex flex-col relative overflow-hidden">
      <EditModal />
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'CHATS' ? (
          <div key="chats" className="flex-1 flex flex-col tab-content-enter overflow-hidden h-full">
            <header className="p-6 pt-8 bg-white border-b border-gray-50 sticky top-0 z-40 shrink-0">
              <div className="flex items-center justify-between">
                <h1 className="header-title">JARAYO</h1>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-green-600 mono">AI ONLINE</span>
                </div>
              </div>
            </header>

            <div className="p-6 space-y-8 overflow-y-auto hide-scrollbar flex-1 pb-32">
              <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm flex items-center gap-4 group transition-all focus-within:border-[#7EA1FF]/30 focus-within:ring-4 focus-within:ring-[#7EA1FF]/5 shrink-0">
                <div className="w-10 h-10 bg-[#F0F4FF] rounded-2xl flex items-center justify-center text-[#7EA1FF]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input type="text" placeholder="AI 지식 베이스 검색..." className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] font-medium outline-none" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-5 px-1 shrink-0">
                   <h2 className="text-[16px] font-bold text-[#555]">분야별 AI 코칭 센터</h2>
                </div>
                <div className="space-y-4">
                  {displayCoaches.map((coach, index) => (
                    <button 
                      key={coach.id} 
                      onClick={() => setSelectedCoach(coach)} 
                      className="w-full bg-white p-5 rounded-[28px] flex gap-5 text-left shadow-sm border border-gray-100 hover:border-[#7EA1FF22] hover:bg-gray-50/50 transition-all active:scale-[0.98] outline-none fade-in relative overflow-hidden" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div 
                        className={`w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 border border-white shadow-sm relative z-10`}
                        style={{ background: coach.bgColor }}
                      >
                        <CoachIcon type={coach.avatar} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0 relative z-10">
                        <div className="flex justify-between items-start mb-1.5">
                          <div className="flex items-center gap-1.5">
                             <h3 className="font-bold text-[#333] text-[16px]">{coach.name}</h3>
                             <span className="text-[8px] bg-gray-100 text-gray-400 px-1 py-0.5 rounded font-bold mono">AI</span>
                          </div>
                          <span className="text-[10px] text-[#BBB] font-medium mono">ONLINE</span>
                        </div>
                        <p className="text-[13px] text-[#888] truncate leading-snug font-medium">{coach.statusPreview}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div key="records" className="flex-1 overflow-hidden h-full">
            <RecordsTab />
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center px-10 py-5 z-50 rounded-t-[36px] shadow-lg shrink-0">
        <div className={`nav-active-bg ${activeTab === 'CHATS' ? 'left-[calc(25%-40px)]' : 'left-[calc(75%-40px)]'}`}></div>
        
        <button onClick={() => setActiveTab('CHATS')} className={`relative flex flex-col items-center gap-1.5 group outline-none transition-all duration-300 ${activeTab === 'CHATS' ? 'text-[#7EA1FF] scale-105' : 'text-gray-300 hover:text-gray-400'}`}>
          <div className="transition-transform duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
          </div>
          <span className="text-[11px] font-bold mono">AI_COACH</span>
        </button>
        <button onClick={() => setActiveTab('RECORDS')} className={`relative flex flex-col items-center gap-1.5 group outline-none transition-all duration-300 ${activeTab === 'RECORDS' ? 'text-[#7EA1FF] scale-105' : 'text-gray-300 hover:text-gray-400'}`}>
          <div className="transition-transform duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </div>
          <span className="text-[11px] font-bold mono">RECORDS</span>
        </button>
      </nav>
    </div>
  );
}
