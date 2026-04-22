export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
}

export type AppTab = 'journal' | 'breathing' | 'meditation' | 'home';

export interface MeditationSession {
  title: string;
  duration: number; // minutes
  description: string;
  instruction: string;
}
