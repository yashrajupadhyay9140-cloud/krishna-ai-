
export enum Role {
  USER = 'user',
  KRISHNA = 'model'
}

export enum AppView {
  LANDING = 'landing',
  LOGIN = 'login',
  SIGNUP = 'signup',
  CHAT = 'chat'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string | null;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}
