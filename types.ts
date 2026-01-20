
export type Language = 'python' | 'cpp';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

// Unified Interface for easier editing
export interface Lesson {
  id: string;
  title: string;
  description: string; // Short description for the menu
  category: string; 
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Project';
  content: string; // Full markdown content
  starterCode: string;
  quiz?: QuizQuestion[];
  isProject?: boolean;
}

export interface SyllabusItem {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system' | 'success' | 'info';
  content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppState {
  ONBOARDING,
  LOADING_SYLLABUS,
  DASHBOARD,
  LESSON_VIEW,
  CTF_ARENA,
  LEADERBOARD,
  CERTIFICATE,
  CIPHER_ROOM,
  PROFILE_SETTINGS,
  FINAL_EXAM 
}

export interface CTFChallenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Insane';
  description: string;
  hint: string;
  walkthrough?: string;
  targetIP: string;
  flag: string;
  xpReward: number;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'attacker' | 'router' | 'firewall' | 'target' | 'database';
  status: 'idle' | 'scanning' | 'breached' | 'secure';
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  xp: number;
  badge: string;
  isUser: boolean;
}

export interface ReverseChallenge {
  id: string;
  title: string;
  description: string;
  inputs: number[];
  hiddenLogic: (x: number) => number;
  targetAnswer: string;
  hint: string;
  difficulty: 'Easy' | 'Hard' | 'Insane';
  rewardXP: number;
  solved: boolean;
}

export interface CryptoChallenge {
  id: string;
  title: string;
  description: string;
  ciphertext: string;
  solution: string;
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  rewardXP: number;
  solved: boolean;
}

export interface VulnChallenge {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  vulnerability: string; 
  options: string[]; 
  explanation: string;
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  rewardXP: number;
  solved: boolean;
}

export interface SocialChallenge {
  id: string;
  title: string;
  description: string;
  scenario: {
    from: string;
    subject: string;
    body: string;
    attachment?: string;
  };
  attackType: string;
  options: string[];
  explanation: string;
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  rewardXP: number;
  solved: boolean;
}

export interface SignalChallenge {
  id: string;
  title: string;
  description: string;
  logData: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  rewardXP: number;
  solved: boolean;
}

export interface UserProfile {
  userId: string;
  username: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
  xp: number;
  level: number;
  rankTitle: string;
  streak: number;
  lastLogin: string;
  ctfSolved: string[];
  isBeginner?: boolean;
  money: number;
  inventory: string[];
  jobsCompleted: string[];
  reverseSolved: string[];
  cryptoSolved: string[];
  vulnSolved: string[];
  socialSolved: string[];
  signalSolved: string[];
  isCertified?: boolean;
  examScore?: number;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt: string;
}

export interface Job {
  id: string;
  client: string;
  title: string;
  description: string;
  difficulty: number;
  reward: number;
  requiredLevel: number;
  completed: boolean;
  userStarterCode: string;
  validationCode: string;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  owned: boolean;
}
