export type UserRole = 'student' | 'professional' | 'entrepreneur';

export interface UserPreferences {
  workingHours: {
    start: string; // e.g., "09:00"
    end: string;   // e.g., "18:00"
  };
  timezone: string;
  focusDuration: number; // in minutes, e.g., 120
  quietHours: {
    start: string; // e.g., "22:00"
    end: string;   // e.g., "07:00"
  };
  emailDigestEnabled: boolean;
}

export interface UserBehaviorProfile {
  mostProductiveHours: number[]; // 0-23
  avgEstimationError: number;    // e.g., 1.25 (takes 25% longer than estimated)
  procrastinationIndex: number;  // 0-100
  strongestCategories: string[];
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
  createdAt: string;
  preferences: UserPreferences;
  behaviorProfile: UserBehaviorProfile;
}

export interface SubTask {
  id: string;
  title: string;
  estimatedHours: number;
  deadline: string; // ISO string
  completed: boolean;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  deadline: string; // ISO string
  estimatedHours: number;
  actualHours: number;
  status: TaskStatus;
  priority: TaskPriority;
  riskScore: number; // 0-100
  category: string;
  goalId?: string | null;
  calendarEventId?: string | null;
  aiDecomposed: boolean;
  subtasks: SubTask[];
  updatedAt?: string; // ISO string
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // ISO string
  taskCards?: Task[];
}

export interface ChatSession {
  id: string;
  userId: string;
  startedAt: string; // ISO string
  messages: ChatMessage[];
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  targetDate: string; // ISO string
  linkedTaskIds: string[];
  progress: number; // 0-100
}

export interface Habit {
  id: string;
  userId: string;
  title: string;
  frequency: 'daily' | 'weekly' | 'custom';
  streak: number;
  completionLog: { date: string; done: boolean }[];
}

export interface NotificationItem {
  id: string;
  userId: string;
  taskId?: string;
  type: 'gentle' | 'moderate' | 'urgent' | 'critical';
  message: string;
  read: boolean;
  createdAt: string; // ISO string
}

export interface TimeBlock {
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  taskId?: string;
}

export interface DailyPlan {
  generatedAt: string; // ISO string
  aiSummary: string;
  scheduledBlocks: TimeBlock[];
}

export type AgentType =
  | 'TaskDecomposer'
  | 'RiskAnalyzer'
  | 'DailyPlanner'
  | 'SmartScheduler'
  | 'BehaviorLearner'
  | 'ChatActionAgent';

export interface AgentActionPayload {
  type: string;
  payload: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    statusCode: number;
  };
  meta?: {
    timestamp: string;
    requestId: string;
  };
}
