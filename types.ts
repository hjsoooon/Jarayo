
export type CoachRole = 'PSYCHOLOGY' | 'SLEEP_EXPERT' | 'POOP_GUIDE' | 'NUTRITION' | 'DEVELOPMENT_COACH' | 'FEEDING_COACH';

export type AppTab = 'RECORDS' | 'CHATS';

export type RecordType = 'FEED' | 'SLEEP' | 'POOP' | 'BATH';

export interface ParentingRecord {
  id: string;
  type: RecordType;
  timestamp: Date;
  note?: string;
  subType?: string;
  value?: string;
}

export interface ActionTip {
  icon: string;
  title: string;
  description: string;
  type: 'SUCCESS' | 'WARNING' | 'INFO';
}

export interface CarouselTip {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: string;
  tips?: ActionTip[];
}

export interface Coach {
  id: CoachRole;
  name: string;
  title: string;
  description: string;
  avatar: string;
  bgColor: string;
  badge: string;
  statusPreview: string;
  lastTime: string;
  unreadCount?: number;
  systemPrompt: string;
  welcomeMessage: string;
  accentColor: string;
  quickQuestions?: string[];
}
