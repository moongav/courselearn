
export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  content: string;
}

export enum MessageSender {
    USER = 'user',
    AI = 'ai'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  isStreaming?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}
