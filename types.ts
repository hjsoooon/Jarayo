
export type CoachRole = 'PSYCHOLOGY' | 'SLEEP_EXPERT' | 'POOP_GUIDE' | 'NUTRITION' | 'DEVELOPMENT_COACH' | 'FEEDING_COACH' | 'ROUTER';

export type AppTab = 'INSIGHTS' | 'CHATS';

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
  coachId?: CoachRole;
  tips?: ActionTip[];
}

export interface Coach {
  id: CoachRole;
  name: string;
  title: string;
  description: string;
  avatar: string;
  bgColor: string;
  accentColor: string;
  systemPrompt: string;
  welcomeMessage: string;
  quickQuestions?: string[];
  badge?: string;
  statusPreview?: string;
  lastTime?: string;
  unreadCount?: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

export interface InsightReport {
  summary: string;
  statusIcon: string;
  solutions: {
    coachId: CoachRole;
    title: string;
    summary: string;
    tags: string[];
  }[];
  checklist: ChecklistItem[];
  trends: {
    label: string;
    value: number;
    compareText: string;
  }[];
}
