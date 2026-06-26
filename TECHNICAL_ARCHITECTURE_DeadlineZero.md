# 🏗️ Technical Architecture Document

## Project: **DeadlineZero** — The Last-Minute Life Saver
### Version: 1.0.0 | Type: Technical Architecture Specification
### Hackathon: Vibe2Ship by Coding Ninjas × Google for Developers
### Deadline: June 29, 2026 | Status: APPROVED FOR BUILD

> *"Built to win. Engineered to scale. Powered by Google."*

---

## 📑 Table of Contents

1. [Architecture Philosophy](#1-architecture-philosophy)
2. [System Overview Diagram](#2-system-overview-diagram)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Backend Architecture](#4-backend-architecture)
5. [AI Agent Architecture](#5-ai-agent-architecture)
6. [Database Architecture](#6-database-architecture)
7. [Google Cloud Infrastructure](#7-google-cloud-infrastructure)
8. [API Architecture](#8-api-architecture)
9. [Authentication & Authorization Flow](#9-authentication--authorization-flow)
10. [Real-Time & Background Processing](#10-real-time--background-processing)
11. [Security Architecture](#11-security-architecture)
12. [Deployment Architecture](#12-deployment-architecture)
13. [Performance & Scalability Design](#13-performance--scalability-design)
14. [Evaluation Criteria Mapping](#14-evaluation-criteria-mapping)
15. [Component Interaction Flows](#15-component-interaction-flows)
16. [Technology Decision Log](#16-technology-decision-log)

---

## 1. Architecture Philosophy

DeadlineZero is designed around **three architectural pillars** that directly align with the hackathon's evaluation criteria:

| Pillar | Description | Criteria Served |
|--------|-------------|-----------------|
| **Agentic-First** | AI doesn't just respond — it plans, decides, and acts autonomously | Agentic Depth (20%) |
| **Google-Native** | Every major system component is a Google Cloud service | Google Technologies (15%) |
| **User-Outcome Driven** | Architecture optimizes for task completion, not just task storage | Problem Solving & Impact (20%) |

### 1.1 Core Design Principles

- **Stateless Backend** → Cloud Run auto-scales horizontally without session state
- **Event-Driven AI** → Agents are triggered by events (task creation, deadline approach, morning cron), not just user requests
- **Context-Persistent Memory** → Firestore stores user behavioral patterns so Gemini gets richer context every call
- **Fail-Graceful** → Every AI call has a non-AI fallback; every external API has error boundaries
- **Security by Default** → Zero trust: all access is authenticated, all secrets are managed, all data is user-scoped

---

## 2. System Overview Diagram

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                            CLIENT LAYER                                      ║
║   ┌──────────────────────────────────────────────────────────────────────┐   ║
║   │         Next.js 14 App (SSR + CSR Hybrid)                           │   ║
║   │   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │   ║
║   │   │Dashboard │ │ AI Chat  │ │Calendar  │ │Analytics │ │ Voice  │  │   ║
║   │   │   View   │ │Interface │ │  View    │ │Dashboard │ │ Input  │  │   ║
║   │   └──────────┘ └──────────┘ └──────────┘ └──────────┘ └────────┘  │   ║
║   └─────────────────────────┬────────────────────────────────────────┬─┘   ║
╚═════════════════════════════╪════════════════════════════════════════╪═════╝
                              │ HTTPS / REST                           │ WebSocket
                              ▼                                        ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║                         GOOGLE CLOUD RUN (Backend)                           ║
║   ┌──────────────────────────────────────────────────────────────────────┐   ║
║   │              Node.js + Express API Gateway                           │   ║
║   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │   ║
║   │  │ Auth API │ │ Task API │ │Agent API │ │Calendar  │ │Analytics │  │   ║
║   │  │ /auth/*  │ │/tasks/*  │ │/agent/*  │ │   API    │ │   API    │  │   ║
║   │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │   ║
║   └─────────┬────────────┬──────────────┬───────────────────────────────┘   ║
╚═════════════╪════════════╪══════════════╪═══════════════════════════════════╝
              │            │              │
    ┌─────────▼──┐  ┌──────▼────┐  ┌─────▼──────────────────────────────┐
    │  Firebase  │  │ Firestore │  │        AI AGENT CORE               │
    │    Auth    │  │  (NoSQL)  │  │   Gemini 1.5 Pro + Flash           │
    └────────────┘  └───────────┘  │  (Task Decomposer, Risk Analyzer,  │
                                   │   Daily Planner, Scheduler,        │
                                   │   Behavior Learner, Chat Agent)    │
                                   └────────────────────────────────────┘
                                              │
╔═════════════════════════════════════════════▼══════════════════════════════╗
║                      GOOGLE SERVICES LAYER                                  ║
║  ┌─────────────────┐ ┌──────────┐ ┌─────────────────┐ ┌────────────────┐  ║
║  │ Google Calendar │ │ Gmail    │ │ Cloud Scheduler │ │ Secret Manager │  ║
║  │     API v3      │ │   API    │ │  (Cron Jobs)    │ │  (API Keys)    │  ║
║  └─────────────────┘ └──────────┘ └─────────────────┘ └────────────────┘  ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## 3. Frontend Architecture

### 3.1 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | **Next.js 14** (App Router) | SSR for fast initial load, CSR for interactivity, built-in API routes |
| Styling | **Tailwind CSS + shadcn/ui** | Rapid design-system-quality UI; dark mode built-in |
| Animation | **Framer Motion** | Smooth transitions for task cards, modals, AI responses |
| State Management | **Zustand** | Lightweight, no-boilerplate global state for tasks, user, chat |
| Data Fetching | **TanStack Query (React Query)** | Caching, background refetch, optimistic updates |
| Charts | **Recharts** | Analytics dashboard visualizations |
| Calendar UI | **react-big-calendar** | Full-featured calendar overlay for task + event view |
| Notifications | **react-hot-toast** | Non-blocking toast system for AI action confirmations |
| Voice | **Web Speech API** (browser native) | Voice input without external dependency |

### 3.2 Page & Component Map

```
app/
├── (auth)/
│   └── login/              → Google OAuth entry point
├── (app)/
│   ├── dashboard/          → Main view: Today's AI Plan + Task Priority Matrix
│   ├── tasks/              → Full task manager (List / Kanban / Calendar / Matrix views)
│   ├── chat/               → Full-page AI Chat Interface
│   ├── calendar/           → Calendar view with Google Calendar sync overlay
│   ├── analytics/          → Productivity dashboard + trend charts
│   ├── goals/              → Goal & Habit Tracking
│   └── settings/           → User preferences, working hours, integrations
│
components/
├── ai/
│   ├── ChatBubble.tsx       → AI message renderer with inline task cards
│   ├── ActionPlanCard.tsx   → Daily AI-generated action plan display
│   ├── RiskBadge.tsx        → Color-coded risk score (0–100)
│   └── VoiceInput.tsx       → Microphone button + Web Speech API handler
├── tasks/
│   ├── TaskCard.tsx         → Single task with urgency score, subtask toggle
│   ├── KanbanBoard.tsx      → Drag-and-drop Kanban view
│   ├── EisenhowerMatrix.tsx → 2×2 priority quadrant view
│   └── SubtaskList.tsx      → AI-generated subtask accordion
├── calendar/
│   └── CalendarOverlay.tsx  → Tasks overlaid on Google Calendar events
└── layout/
    ├── Sidebar.tsx
    └── NotificationCenter.tsx
```

### 3.3 State Architecture

```
Zustand Stores:
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   taskStore     │   │   userStore     │   │   chatStore     │
│                 │   │                 │   │                 │
│ tasks[]         │   │ profile         │   │ messages[]      │
│ subtasks{}      │   │ workingHours    │   │ isStreaming     │
│ selectedTask    │   │ behaviorPattern │   │ sessionId       │
│ viewMode        │   │ oauthTokens     │   │ pendingActions  │
│ filters         │   │ preferences     │   │                 │
└─────────────────┘   └─────────────────┘   └─────────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │ React Query (server state)
                     ┌────────▼────────┐
                     │  API Cache      │
                     │  (TanStack Q)   │
                     └─────────────────┘
```

### 3.4 PWA Configuration

- Service Worker via `next-pwa` → offline task viewing
- Web App Manifest → installable on mobile
- Push Notification subscription via `PushManager` API → browser alerts

---

## 4. Backend Architecture

### 4.1 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Runtime | **Node.js 20 LTS** | Stable, async-native, best Google SDK support |
| Framework | **Express.js** | Lightweight, middleware-driven, easy routing |
| Hosting | **Google Cloud Run** | Serverless containers, auto-scaling, pay-per-request |
| Language | **TypeScript** | Type safety across API contracts and Firestore models |
| Validation | **Zod** | Schema validation for all API inputs |
| AI SDK | **@google/generative-ai** | Official Gemini SDK |
| Google APIs | **googleapis** | Calendar v3, Gmail API |

### 4.2 Backend Module Structure

```
server/
├── index.ts                 → Express app entry, middleware setup
├── routes/
│   ├── auth.routes.ts       → /auth/* (Google OAuth callback, token refresh)
│   ├── tasks.routes.ts      → /tasks/* (CRUD, subtasks, urgency update)
│   ├── agent.routes.ts      → /agent/* (decompose, plan, schedule, analyze)
│   ├── calendar.routes.ts   → /calendar/* (events, block, slots)
│   ├── analytics.routes.ts  → /analytics/* (summary, trends, AI report)
│   └── notifications.routes.ts → /notifications/* (preferences, history)
├── agents/
│   ├── TaskDecomposerAgent.ts
│   ├── RiskAnalyzerAgent.ts
│   ├── DailyPlannerAgent.ts
│   ├── SmartSchedulerAgent.ts
│   ├── BehaviorLearnerAgent.ts
│   └── ChatActionAgent.ts
├── services/
│   ├── gemini.service.ts    → Gemini API wrapper (Pro + Flash routing)
│   ├── firestore.service.ts → Typed Firestore operations
│   ├── calendar.service.ts  → Google Calendar API wrapper
│   ├── gmail.service.ts     → Gmail API wrapper (send digest)
│   └── auth.service.ts      → Firebase Admin SDK auth verification
├── middleware/
│   ├── auth.middleware.ts   → JWT verification on every protected route
│   ├── rateLimit.middleware.ts → Per-user rate limiting for AI endpoints
│   └── error.middleware.ts  → Global error handler + Sentry-style logging
├── models/
│   └── types.ts             → Shared TypeScript interfaces (Task, User, Agent*)
└── config/
    └── secrets.ts           → Google Secret Manager loader
```

### 4.3 Middleware Pipeline

```
Incoming Request
      │
      ▼
┌─────────────────────────────────────────┐
│  CORS + Helmet (security headers)        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  Rate Limiter (express-rate-limit)       │
│  → 100 req/min general                  │
│  → 20 req/min for /agent/* endpoints    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  Auth Middleware                         │
│  → Verify Firebase JWT                  │
│  → Attach req.user to request           │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  Zod Schema Validation                  │
│  → Reject malformed inputs early        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
           Route Handler
                  │
                  ▼
┌─────────────────────────────────────────┐
│  Global Error Handler                   │
│  → Structured JSON error responses      │
└─────────────────────────────────────────┘
```

---

## 5. AI Agent Architecture

This is the **core differentiator** of DeadlineZero and maps directly to **Agentic Depth (20%)** and **Innovation & Creativity (20%)** criteria.

### 5.1 Agent Roster & Responsibilities

```
╔══════════════════════════════════════════════════════════╗
║               AI AGENT CORE (DeadlineZero Brain)         ║
║                                                          ║
║  ┌────────────────────┐   ┌────────────────────────────┐ ║
║  │  PLANNER LAYER     │   │    MEMORY STORE            │ ║
║  │  Gemini 1.5 Pro    │◄──│    Firestore               │ ║
║  │  (Orchestrator)    │   │    (User patterns,         │ ║
║  └────────┬───────────┘   │     session context,       │ ║
║           │               │     behavior history)      │ ║
║           │               └────────────────────────────┘ ║
║  ┌────────▼───────────────────────────────────────────┐  ║
║  │               TOOL EXECUTOR LAYER                  │  ║
║  │                                                    │  ║
║  │  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │  ║
║  │  │  Agent 1    │  │  Agent 2    │  │  Agent 3  │  │  ║
║  │  │  Task       │  │  Risk       │  │  Daily    │  │  ║
║  │  │  Decomposer │  │  Analyzer   │  │  Planner  │  │  ║
║  │  └─────────────┘  └─────────────┘  └───────────┘  │  ║
║  │  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │  ║
║  │  │  Agent 4    │  │  Agent 5    │  │  Agent 6  │  │  ║
║  │  │  Smart      │  │  Behavior   │  │  Chat     │  │  ║
║  │  │  Scheduler  │  │  Learner    │  │  Action   │  │  ║
║  │  └─────────────┘  └─────────────┘  └───────────┘  │  ║
║  └────────────────────────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════╝
```

### 5.2 Agent Specifications

#### Agent 1: Task Decomposer
```
Trigger:     POST /agent/decompose (fires when task is created)
Model:       Gemini 1.5 Pro
Input:       Task title, description, deadline, estimated hours
Output:      Array of 3–7 subtasks with:
             - Title, estimated duration, individual deadline
             - Logical sequence order
             - First action recommendation
Action:      Auto-writes subtasks to Firestore under parent task
Prompt Type: Structured output (JSON schema enforced)
Fallback:    If Gemini times out, return 3 generic subtasks
             based on task title keywords
```

#### Agent 2: Risk Analyzer
```
Trigger:     On task creation, on task update, on cron (every 6 hrs)
Model:       Gemini 1.5 Flash (speed-optimized)
Input:       Task deadline, estimated hours, completed subtasks,
             user historical completion rate, current workload count
Output:      Risk score 0–100 with reasoning string
Formula:     score = f(time_remaining, hours_needed,
                       workload_pressure, user_procrastination_index)
Action:      Updates riskScore field in Firestore task document
             Triggers proactive alert if score > 75
```

#### Agent 3: Daily Planner
```
Trigger:     Google Cloud Scheduler → every day at 06:00 AM (user TZ)
Model:       Gemini 1.5 Pro
Input:       All user tasks (next 7 days), Google Calendar events,
             user working hours, behavior patterns
Output:      Ordered "Today's Action Plan" with:
             - Top 5 tasks to focus on
             - Suggested time blocks
             - Natural language daily briefing
Action:      Stores plan in Firestore /dailyPlans/{userId}/{date}
             Triggers morning email digest via Gmail API
```

#### Agent 4: Smart Scheduler
```
Trigger:     POST /agent/schedule (user-initiated or Daily Planner)
Model:       Gemini 1.5 Pro
Input:       Task list, free slots from Google Calendar, user preferences
Output:      Calendar blocking suggestions:
             - Event title, start time, end time, task ID
Action:      On user approval → POST to Google Calendar API
             Creates events with DeadlineZero metadata tag
```

#### Agent 5: Behavior Learner
```
Trigger:     On task completion, on task overdue
Model:       Rule-based + Gemini 1.5 Flash for pattern summary
Input:       Last 30 days completion history: time of completion,
             actual vs estimated duration, task categories,
             day-of-week patterns
Output:      Behavior profile:
             - Most productive hours
             - Estimation accuracy per category
             - Procrastination triggers
             - Recommended focus session duration
Action:      Updates user/behaviorProfile in Firestore
             Feeds into Daily Planner and Risk Analyzer prompts
```

#### Agent 6: Chat Action Agent
```
Trigger:     POST /agent/chat (user sends message in chat UI)
Model:       Gemini 1.5 Pro (multi-turn with context window)
Input:       Full conversation history + user task context +
             Google Calendar snapshot
Capabilities:
  - Intent: CREATE_TASK    → Creates task via Task API
  - Intent: UPDATE_TASK    → Updates priority/deadline
  - Intent: QUERY_SCHEDULE → Returns today's/week's plan
  - Intent: DECOMPOSE      → Triggers Agent 1
  - Intent: ANALYZE_RISK   → Triggers Agent 2
  - Intent: BLOCK_CALENDAR → Triggers Agent 4
  - Intent: MARK_DONE      → Updates task status
  - Intent: GENERATE_REPORT → Triggers analytics summary
Output:      Text response + optional structured action payload
             displayed as inline task cards in chat UI
```

### 5.3 Agent Communication Pattern

```
User Action / Scheduled Trigger
          │
          ▼
    API Route Handler
          │
          ▼
   ┌──────────────────────────────────────────┐
   │  Agent Orchestrator                      │
   │  1. Load user context from Firestore     │
   │  2. Load behavior profile                │
   │  3. Load Google Calendar snapshot        │
   │  4. Construct enriched Gemini prompt     │
   │  5. Call Gemini API (Pro or Flash)       │
   │  6. Parse structured response            │
   │  7. Execute tool actions (Firestore,     │
   │     Calendar API, Gmail API)             │
   │  8. Return result to frontend            │
   └──────────────────────────────────────────┘
```

### 5.4 Gemini Model Routing Logic

```typescript
function selectModel(agentType: AgentType): GeminiModel {
  const FLASH_AGENTS = ['RiskAnalyzer', 'BehaviorLearner'];
  const PRO_AGENTS   = ['TaskDecomposer', 'DailyPlanner',
                        'SmartScheduler', 'ChatActionAgent'];

  // Flash: fast + cost-efficient for background processing
  if (FLASH_AGENTS.includes(agentType)) return 'gemini-1.5-flash';

  // Pro: deep reasoning for user-facing intelligence
  return 'gemini-1.5-pro';
}
```

### 5.5 Prompt Engineering Strategy

Every agent prompt uses a **CRSJ framework**:
- **C** — Context: User profile, behavior patterns, current workload
- **R** — Role: Specific agent persona ("You are a senior productivity coach...")
- **S** — Structure: JSON output schema defined inline
- **J** — Judgment Constraints: What the AI must NOT do (no hallucinated dates, always respect working hours)

---

## 6. Database Architecture

### 6.1 Firestore Collections Schema

```
Firestore (NoSQL Document Database)
│
├── users/
│   └── {userId}/
│       ├── profile: { name, email, role, photoURL, createdAt }
│       ├── preferences: { workingHours, timezone, focusDuration,
│       │                  quietHours, emailDigestEnabled }
│       ├── behaviorProfile: { mostProductiveHours[], avgEstimationError,
│       │                       procrastinationIndex, strongestCategories[] }
│       └── calendarTokens: { accessToken, refreshToken, expiry }  [encrypted]
│
├── tasks/
│   └── {taskId}/
│       ├── userId: string
│       ├── title: string
│       ├── description: string
│       ├── deadline: Timestamp
│       ├── estimatedHours: number
│       ├── actualHours: number
│       ├── status: 'pending' | 'in_progress' | 'completed' | 'overdue'
│       ├── priority: 'critical' | 'high' | 'medium' | 'low'
│       ├── riskScore: number (0–100, updated by Agent 2)
│       ├── category: string
│       ├── goalId: string | null
│       ├── calendarEventId: string | null
│       ├── aiDecomposed: boolean
│       └── subtasks: SubTask[]
│
├── dailyPlans/
│   └── {userId}/
│       └── {YYYY-MM-DD}/
│           ├── generatedAt: Timestamp
│           ├── aiSummary: string
│           └── scheduledBlocks: TimeBlock[]
│
├── chatSessions/
│   └── {sessionId}/
│       ├── userId: string
│       ├── startedAt: Timestamp
│       └── messages: Message[]
│
├── goals/
│   └── {goalId}/
│       ├── userId: string
│       ├── title: string
│       ├── targetDate: Timestamp
│       ├── linkedTaskIds: string[]
│       └── progress: number (0–100)
│
├── habits/
│   └── {habitId}/
│       ├── userId: string
│       ├── title: string
│       ├── frequency: 'daily' | 'weekly' | custom
│       ├── streak: number
│       └── completionLog: { date: string, done: boolean }[]
│
└── notifications/
    └── {notificationId}/
        ├── userId: string
        ├── taskId: string
        ├── type: 'gentle' | 'moderate' | 'urgent' | 'critical'
        ├── message: string
        ├── read: boolean
        └── createdAt: Timestamp
```

### 6.2 Firestore Indexing Strategy

```
Composite Indexes (required for filtered queries):

tasks:
  [userId ASC, status ASC, deadline ASC]     → Today's pending tasks
  [userId ASC, riskScore DESC]               → High-risk task list
  [userId ASC, category ASC, status ASC]     → Category analytics
  [userId ASC, deadline ASC, status ASC]     → Upcoming deadline view

notifications:
  [userId ASC, read ASC, createdAt DESC]     → Unread notifications

habits:
  [userId ASC, frequency ASC]               → Habit list per schedule
```

### 6.3 Data Access Patterns

| Query | Collection | Index Used | Frequency |
|-------|------------|------------|-----------|
| Today's tasks | tasks | userId + deadline | Every page load |
| High-risk tasks | tasks | userId + riskScore | Dashboard render |
| User behavior profile | users | Direct document read | Agent context load |
| Chat history | chatSessions | sessionId (direct) | Chat page load |
| Daily plan | dailyPlans | userId + date | Dashboard |

---

## 7. Google Cloud Infrastructure

### 7.1 Services Map

```
┌─────────────────────────────────────────────────────────────────┐
│                   GOOGLE CLOUD PROJECT                          │
│                                                                 │
│  ┌─────────────────┐    ┌──────────────────────────────────┐   │
│  │  Cloud Run      │    │  Firebase                        │   │
│  │  (Backend API)  │    │  ┌─────────────────────────────┐ │   │
│  │                 │    │  │  Firebase Authentication     │ │   │
│  │  Node.js 20     │    │  │  (Google OAuth 2.0)          │ │   │
│  │  Container      │    │  └─────────────────────────────┘ │   │
│  │  Auto-scale:    │    │  ┌─────────────────────────────┐ │   │
│  │  0 → 10 inst.   │    │  │  Cloud Firestore             │ │   │
│  │                 │    │  │  (Primary Database)          │ │   │
│  └─────────────────┘    │  └─────────────────────────────┘ │   │
│                         └──────────────────────────────────┘   │
│  ┌─────────────────┐    ┌──────────────────────────────────┐   │
│  │  Google AI      │    │  Google Workspace APIs           │   │
│  │  ┌───────────┐  │    │  ┌─────────────────────────────┐ │   │
│  │  │Gemini 1.5 │  │    │  │  Calendar API v3             │ │   │
│  │  │Pro        │  │    │  └─────────────────────────────┘ │   │
│  │  └───────────┘  │    │  ┌─────────────────────────────┐ │   │
│  │  ┌───────────┐  │    │  │  Gmail API                  │ │   │
│  │  │Gemini 1.5 │  │    │  └─────────────────────────────┘ │   │
│  │  │Flash      │  │    └──────────────────────────────────┘   │
│  │  └───────────┘  │                                           │
│  └─────────────────┘    ┌──────────────────────────────────┐   │
│                         │  Infrastructure Services         │   │
│  ┌─────────────────┐    │  ┌─────────────────────────────┐ │   │
│  │  Cloud          │    │  │  Secret Manager              │ │   │
│  │  Scheduler      │    │  │  (API keys, OAuth secrets)   │ │   │
│  │  (Cron Jobs)    │    │  └─────────────────────────────┘ │   │
│  │                 │    │  ┌─────────────────────────────┐ │   │
│  │  06:00 → Daily  │    │  │  Cloud Storage              │ │   │
│  │  Planner Agent  │    │  │  (User exports, reports)     │ │   │
│  │  00:00 → Risk   │    │  └─────────────────────────────┘ │   │
│  │  Score Update   │    └──────────────────────────────────┘   │
│  └─────────────────┘                                           │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Google Technologies Usage Summary

| Google Technology | Usage in DeadlineZero | Criteria Impact |
|------------------|-----------------------|-----------------|
| **Gemini 1.5 Pro** | Chat Agent, Task Decomposer, Daily Planner, Smart Scheduler | Core AI engine |
| **Gemini 1.5 Flash** | Risk Analyzer, Behavior Learner (background, cost-efficient) | Background intelligence |
| **Firebase Auth** | Google OAuth 2.0 sign-in, JWT management | Secure auth |
| **Cloud Firestore** | Primary NoSQL database for all user data | Data persistence |
| **Google Cloud Run** | Serverless backend hosting, auto-scaling | Deployment |
| **Google Calendar API v3** | Read events, write calendar blocks for tasks | Deep integration |
| **Gmail API** | Daily digest emails, urgent deadline alerts | Proactive UX |
| **Cloud Scheduler** | Daily Planner trigger (6AM), Risk update cron | Autonomous agents |
| **Secret Manager** | Gemini API key, Gmail OAuth, Calendar OAuth | Security |
| **Cloud Storage** | Exported PDF reports, analytics data | File management |

---

## 8. API Architecture

### 8.1 Complete API Contract

#### Auth Endpoints
```
POST  /api/auth/google          → Exchange Google auth code for JWT
POST  /api/auth/refresh         → Refresh JWT using refresh token
POST  /api/auth/logout          → Invalidate session
GET   /api/auth/me              → Get authenticated user profile
PUT   /api/auth/preferences     → Update user working hours/preferences
```

#### Task Endpoints
```
GET   /api/tasks                → List tasks (filters: status, priority, deadline range)
POST  /api/tasks                → Create task (triggers TaskDecomposer agent async)
GET   /api/tasks/:id            → Get single task with subtasks
PUT   /api/tasks/:id            → Update task fields
DELETE /api/tasks/:id           → Soft delete task
PATCH /api/tasks/:id/complete   → Mark task complete (triggers BehaviorLearner)
PATCH /api/tasks/:id/priority   → Update priority + re-run RiskAnalyzer
POST  /api/tasks/:id/subtasks   → Add manual subtask
PATCH /api/tasks/:id/subtasks/:subId → Complete subtask
```

#### AI Agent Endpoints
```
POST  /api/agent/decompose      → TaskDecomposer: Break task into subtasks
POST  /api/agent/analyze        → RiskAnalyzer: Compute/refresh risk score
POST  /api/agent/plan           → DailyPlanner: Generate today's action plan
POST  /api/agent/schedule       → SmartScheduler: Suggest + block calendar slots
GET   /api/agent/insights       → BehaviorLearner: Get personalized insights
POST  /api/agent/chat           → ChatActionAgent: Multi-turn AI conversation
```

#### Calendar Endpoints
```
GET   /api/calendar/events      → Fetch Google Calendar events (7-day window)
POST  /api/calendar/block       → Create calendar event for a task
DELETE /api/calendar/block/:id  → Remove calendar block
GET   /api/calendar/slots       → Available time slots for scheduling
```

#### Analytics Endpoints
```
GET   /api/analytics/summary    → This-week productivity summary
GET   /api/analytics/trends     → 4-week completion trend data
GET   /api/analytics/report     → AI-generated natural language weekly report
GET   /api/analytics/export     → Export data as PDF (Cloud Storage URL)
```

#### Notification Endpoints
```
GET   /api/notifications        → Get notification history
PATCH /api/notifications/:id/read → Mark as read
PUT   /api/notifications/preferences → Update notification settings
```

### 8.2 API Response Standard

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-06-22T06:00:00Z",
    "requestId": "req_abc123"
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task with ID task_001 does not exist",
    "statusCode": 404
  }
}

// AI Agent Response (with action payload)
{
  "success": true,
  "data": {
    "response": "I've broken down your task into 5 subtasks...",
    "agentActions": [
      {
        "type": "SUBTASKS_CREATED",
        "payload": { "subtasks": [...] }
      }
    ],
    "taskCards": [...]  // Inline task cards for chat UI
  }
}
```

---

## 9. Authentication & Authorization Flow

### 9.1 Google OAuth 2.0 + Firebase Auth Flow

```
User clicks "Sign in with Google"
          │
          ▼
Frontend → Firebase Auth SDK
  signInWithPopup(GoogleAuthProvider)
          │
          ▼
Google OAuth 2.0 Authorization Screen
  (Scopes: profile, email,
   calendar.events, gmail.send)
          │
          ▼
Firebase Auth receives ID Token
  + Google OAuth tokens (access + refresh)
          │
          ▼
Frontend stores Firebase JWT
Frontend sends OAuth tokens to backend:
  POST /api/auth/google
  { firebaseToken, googleAccessToken, googleRefreshToken }
          │
          ▼
Backend:
  1. Verifies Firebase JWT via Firebase Admin SDK
  2. Encrypts and stores OAuth tokens in Firestore
     under users/{userId}/calendarTokens
  3. Returns session-level JWT (24hr expiry)
          │
          ▼
All subsequent API calls:
  Authorization: Bearer <sessionJWT>
          │
          ▼
auth.middleware.ts:
  1. Verifies JWT signature
  2. Attaches req.user = { uid, email, role }
  3. Route handler proceeds with user context
```

### 9.2 Calendar API Token Refresh Pattern

```typescript
async function getValidCalendarToken(userId: string): Promise<string> {
  const tokens = await getCalendarTokens(userId); // from Firestore
  
  if (isExpired(tokens.expiry)) {
    const newTokens = await oauth2Client.refreshAccessToken();
    await updateCalendarTokens(userId, newTokens);
    return newTokens.access_token;
  }
  
  return tokens.accessToken;
}
```

---

## 10. Real-Time & Background Processing

### 10.1 Real-Time Updates

```
Firestore Real-Time Listeners (client-side):

tasks collection → onSnapshot({ userId == currentUser })
  → React Query cache invalidated → UI re-renders

notifications → onSnapshot({ userId, read == false })
  → NotificationCenter badge updates live

dailyPlans → onSnapshot({ userId, date == today })
  → Dashboard Action Plan updates when agent completes
```

### 10.2 Background Processing (Cloud Scheduler)

```
Job 1: Daily Planner Cron
  Schedule:  0 6 * * *  (6:00 AM daily, user timezone-aware)
  Endpoint:  POST /internal/agent/daily-plan-all-users
  Action:    → Runs DailyPlanner agent for all active users
             → Stores plan in Firestore
             → Sends Gmail digest via Gmail API

Job 2: Risk Score Refresh
  Schedule:  0 */6 * * *  (every 6 hours)
  Endpoint:  POST /internal/agent/refresh-risk-scores
  Action:    → Runs RiskAnalyzer for all pending tasks
             → Updates riskScore in Firestore
             → Sends proactive alert notifications for score > 75

Job 3: Overdue Task Detection
  Schedule:  0 9 * * *  (9:00 AM daily)
  Endpoint:  POST /internal/tasks/mark-overdue
  Action:    → Finds tasks past deadline with status != completed
             → Marks as 'overdue'
             → Triggers high-priority notification
```

### 10.3 Event-Driven Agent Triggers

```
Task Created     → async TaskDecomposer.run(taskId)
Task Completed   → async BehaviorLearner.recordCompletion(taskId)
Task Overdue     → async BehaviorLearner.recordMiss(taskId)
                   + NotificationService.sendCritical(userId)
Risk Score > 75  → NotificationService.sendUrgent(userId, taskId)
Calendar Blocked → async CalendarService.createEvent(block)
```

---

## 11. Security Architecture

### 11.1 Secret Management

```
Google Secret Manager secrets:
  - GEMINI_API_KEY
  - GMAIL_CLIENT_SECRET
  - CALENDAR_CLIENT_SECRET
  - FIREBASE_SERVICE_ACCOUNT_JSON
  - JWT_SECRET
  - ENCRYPTION_KEY (for OAuth token storage)

Access pattern:
  Cloud Run service account → IAM role: roles/secretmanager.secretAccessor
  Secrets loaded at container startup, not in environment variables
```

### 11.2 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only access their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Tasks are user-scoped
    match /tasks/{taskId} {
      allow read, write: if request.auth != null
        && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;
    }

    // Chat sessions are user-scoped
    match /chatSessions/{sessionId} {
      allow read, write: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }

    // Notifications are read-only for users (written by server only)
    match /notifications/{notifId} {
      allow read: if request.auth != null
        && resource.data.userId == request.auth.uid;
      allow write: if false; // Server-side only
    }

    // Daily plans are read-only for users
    match /dailyPlans/{userId}/{date} {
      allow read: if request.auth.uid == userId;
      allow write: if false; // Agent only
    }
  }
}
```

### 11.3 Security Checklist

| Concern | Mitigation |
|---------|------------|
| API Key Exposure | Google Secret Manager; never in client code or Git |
| SQL Injection | N/A (Firestore NoSQL; no raw queries) |
| XSS | Next.js built-in sanitization; CSP headers via Helmet |
| CSRF | SameSite cookies; JWT Bearer token authentication |
| Data Leakage | Firestore rules enforce userId isolation |
| OAuth Token Storage | Tokens encrypted with AES-256 before Firestore write |
| Rate Limiting | Per-user rate limit on AI endpoints (20 req/min) |

---

## 12. Deployment Architecture

### 12.1 Deployment Stack

```
┌─────────────────────────────────────────────────────────────┐
│                  PRODUCTION DEPLOYMENT                      │
│                                                             │
│  Frontend                    Backend                        │
│  ┌──────────────────┐        ┌───────────────────────────┐  │
│  │  Next.js App     │        │  Google Cloud Run         │  │
│  │  (Vercel OR      │        │                           │  │
│  │   Cloud Run)     │  HTTPS │  Docker Container         │  │
│  │                  │ ──────►│  node:20-slim             │  │
│  │  Domain:         │        │  PORT: 8080               │  │
│  │  deadlinezero.   │        │                           │  │
│  │  app             │        │  Min instances: 0         │  │
│  └──────────────────┘        │  Max instances: 10        │  │
│                              │  Memory: 512Mi            │  │
│                              │  CPU: 1 vCPU              │  │
│                              └───────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 12.2 Dockerfile

```dockerfile
FROM node:20-slim

WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Cloud Run listens on PORT env variable
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]
```

### 12.3 Cloud Run Deployment Command

```bash
# Build and push container
gcloud builds submit --tag gcr.io/PROJECT_ID/deadlinezero-api

# Deploy to Cloud Run
gcloud run deploy deadlinezero-api \
  --image gcr.io/PROJECT_ID/deadlinezero-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 10 \
  --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest \
  --set-secrets JWT_SECRET=JWT_SECRET:latest
```

### 12.4 CI/CD Pipeline

```
GitHub Push to main
        │
        ▼
GitHub Actions Workflow:
  1. npm install
  2. TypeScript type-check
  3. Run unit tests (Jest)
  4. Build Docker image
  5. Push to Google Container Registry
  6. Deploy to Cloud Run (zero-downtime)
  7. Run smoke test against /health endpoint
```

---

## 13. Performance & Scalability Design

### 13.1 Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP (Largest Contentful Paint) | < 2s | Next.js SSR + static shell |
| Gemini AI response | < 3s | Flash model for background tasks; streaming for chat |
| API CRUD latency | < 500ms | Firestore direct access; no ORM overhead |
| Dashboard render | < 1s | Zustand pre-loaded state; React Query cache |

### 13.2 Caching Strategy

```
Layer 1: TanStack Query (client)
  - Task list: stale after 30s, background refetch
  - Daily plan: stale after 1hr (regenerated by cron)
  - Analytics: stale after 5min

Layer 2: Cloud Run instance memory
  - Gemini system prompts cached per agent type
  - Behavior profiles cached per user (5min TTL)

Layer 3: Firestore
  - Firestore offline persistence enabled (client SDK)
  - Index-optimized queries (< 100ms on indexed fields)
```

### 13.3 Gemini API Optimization

```typescript
// Request queue to prevent rate limit errors
class GeminiRequestQueue {
  private queue: QueuedRequest[] = [];
  private processing = false;
  private readonly RATE_LIMIT = 60; // requests per minute

  async add(request: GeminiRequest): Promise<GeminiResponse> {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      this.process();
    });
  }

  // Automatic fallback: Pro → Flash on timeout
  private async callWithFallback(req: GeminiRequest) {
    try {
      return await callGemini(req, 'gemini-1.5-pro');
    } catch (e) {
      if (e.code === 'TIMEOUT' || e.code === 'QUOTA_EXCEEDED') {
        return await callGemini(req, 'gemini-1.5-flash');
      }
      throw e;
    }
  }
}
```

---

## 14. Evaluation Criteria Mapping

This section explicitly maps every hackathon evaluation criterion to concrete architectural decisions.

### 14.1 Scoring Architecture

| Criterion | Weight | Architectural Evidence | Target Score |
|-----------|--------|----------------------|--------------|
| **Problem Solving & Impact** | 20% | 6 agents solve the core problem autonomously. Risk scoring + proactive alerts prevent deadline misses. Behavioral learning improves accuracy over time. | **19/20** |
| **Agentic Depth** | 20% | 6 distinct AI agents with autonomous tool execution: create Firestore records, call Calendar API, send Gmail, reschedule tasks — all without user input. Cloud Scheduler triggers agents daily. | **20/20** |
| **Innovation & Creativity** | 20% | Dynamic risk score (0–100) with real-time update. Behavioral learning profile. Eisenhower Matrix + Kanban + Calendar views. Voice-driven task creation. AI inline task cards in chat. | **18/20** |
| **Google Technologies** | 15% | 10 Google technologies used: Gemini 1.5 Pro, Gemini 1.5 Flash, Firebase Auth, Firestore, Cloud Run, Calendar API, Gmail API, Cloud Scheduler, Secret Manager, Cloud Storage | **15/15** |
| **Product Experience & Design** | 10% | Dark mode UI, animated transitions (Framer Motion), one-click AI approvals, voice input, streaming AI responses, mobile-responsive PWA | **9/10** |
| **Technical Implementation** | 10% | TypeScript throughout, Zod validation, Firestore security rules, Secret Manager, CI/CD pipeline, rate limiting, error boundaries, proper HTTP status codes | **10/10** |
| **Completeness & Usability** | 5% | All 9 modules shipped. Deployed on Cloud Run. Public GitHub repo. README with setup. Google Doc description. All submission links active. | **5/5** |
| **TOTAL** | **100%** | | **96/100** |

### 14.2 Agentic Depth Proof Points (Judge Checklist)

For the judges evaluating Agentic Depth (the hardest criterion to score), DeadlineZero demonstrates:

1. ✅ **Autonomous Action** — Agents write to Firestore, Calendar, Gmail without user prompting
2. ✅ **Tool Use** — ChatActionAgent uses function-calling pattern with multiple tools
3. ✅ **Planning** — DailyPlanner reasons across tasks, calendar, and preferences
4. ✅ **Memory** — BehaviorLearner persists patterns across sessions
5. ✅ **Multi-Agent** — 6 specialized agents with distinct responsibilities
6. ✅ **Event-Driven** — Cloud Scheduler triggers autonomous daily execution
7. ✅ **Feedback Loop** — Task completion → BehaviorLearner → Better DailyPlanner prompts

---

## 15. Component Interaction Flows

### 15.1 Task Creation → AI Decomposition Flow

```
User types task + deadline → clicks "Add Task"
                │
                ▼
    POST /api/tasks { title, deadline, estimatedHours }
                │
                ▼
    Task written to Firestore (status: pending)
                │
                ▼
    Async: TaskDecomposerAgent.run(taskId)
    │  Load task context
    │  Load user behavior profile
    │  Construct Gemini Pro prompt (CRSJ framework)
    │  Call Gemini 1.5 Pro
    │  Parse JSON response → subtasks[]
    │  Write subtasks to Firestore
    │  Async: RiskAnalyzerAgent.run(taskId)
                │
                ▼
    Firestore onSnapshot fires on client
                │
                ▼
    TaskCard updates: subtasks appear, riskScore appears
    UI shows "AI has broken this down for you ✨"
```

### 15.2 Morning Daily Briefing Flow

```
06:00 AM — Cloud Scheduler fires
                │
                ▼
    POST /internal/agent/daily-plan-all-users
                │
                ▼
    For each active user:
    │  Fetch tasks (next 7 days) from Firestore
    │  Fetch Google Calendar events (OAuth token refresh if needed)
    │  Fetch user behavior profile
    │  Construct DailyPlanner prompt
    │  Call Gemini 1.5 Pro
    │  Parse: top tasks, time blocks, AI summary
    │  Write to Firestore dailyPlans/{userId}/{today}
    │  Build digest email HTML
    │  Send via Gmail API
                │
                ▼
    User opens app → Dashboard shows "Today's AI Plan"
    User opens email → Morning digest with priorities
```

### 15.3 AI Chat → Calendar Block Flow

```
User types: "Block 2 hours for my thesis tomorrow morning"
                │
                ▼
    POST /api/agent/chat { message, sessionHistory }
                │
                ▼
    ChatActionAgent detects intent: BLOCK_CALENDAR
                │
                ▼
    SmartSchedulerAgent.findSlots({
      date: tomorrow,
      duration: 120,
      calendarToken: user.calendarTokens
    })
                │
                ▼
    GET /calendar/events → Google Calendar API
    Identifies free slot: 09:00–11:00 AM
                │
                ▼
    Agent response: "I found a free slot at 9AM tomorrow.
                    Shall I block it for your thesis?"
    + ActionCard shown in chat UI with [✓ Confirm] button
                │
                ▼
    User clicks Confirm
                │
                ▼
    POST /api/calendar/block → Google Calendar API
    Calendar event created: "🎯 DeadlineZero: Thesis Writing"
    Task.calendarEventId updated in Firestore
```

---

## 16. Technology Decision Log

| Decision | Chosen | Alternatives Considered | Reason |
|----------|--------|------------------------|--------|
| Frontend Framework | Next.js 14 | React (Vite), Remix | SSR for performance, file-based routing, Vercel/Cloud Run compatible |
| Backend Framework | Express.js | Fastify, NestJS | Simplest setup, most Cloud Run examples, team familiarity |
| Database | Firestore | PostgreSQL (Cloud SQL), MongoDB Atlas | Real-time listeners, Firebase Auth integration, serverless-native |
| AI Model (complex) | Gemini 1.5 Pro | Claude, GPT-4 | Google-native (evaluation criteria), long context window |
| AI Model (fast) | Gemini 1.5 Flash | Gemini Pro only | Cost efficiency for background cron agents |
| State Management | Zustand | Redux, Jotai | Minimal boilerplate, works well with React Query |
| Deployment | Cloud Run | App Engine, GKE, AI Studio | True containerized, auto-scale to zero, evaluator-familiar |
| Auth | Firebase Auth | Auth0, NextAuth | Google OAuth built-in, free tier, Firestore integration |
| Calendar | Google Calendar API v3 | iCal parsing | Mandatory Google tech usage for evaluation |
| Scheduling | Cloud Scheduler | Vercel Cron, node-cron | Google-native, reliable at scale, evaluation criteria |

---

## Appendix A: Environment Variables

```bash
# .env.example (no real values — all secrets in Secret Manager)

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Backend (loaded from Secret Manager at runtime)
GEMINI_API_KEY=         # from Secret Manager
JWT_SECRET=             # from Secret Manager
ENCRYPTION_KEY=         # for OAuth token encryption

# Google OAuth (server-side)
GOOGLE_CLIENT_ID=
GOOGLE_REDIRECT_URI=

# App Config
PORT=8080
NODE_ENV=production
```

## Appendix B: Repository Structure

```
deadlinezero/
├── apps/
│   ├── web/              → Next.js frontend
│   └── api/              → Express.js backend
├── packages/
│   └── shared/           → Shared TypeScript types
├── .github/
│   └── workflows/
│       └── deploy.yml    → CI/CD to Cloud Run
├── Dockerfile
├── .dockerignore
├── README.md             → Setup instructions
├── .env.example
└── ARCHITECTURE.md       → This document
```

## Appendix C: Demo Script (Judge Walkthrough)

```
[00:00] Open app → Show Google Sign In
[00:30] Dashboard → "Today's AI Plan" (pre-loaded by 6AM cron)
[01:00] Add task: "Submit Final Report" due tomorrow 5PM
[01:30] AI auto-decomposes into 5 subtasks (live demo)
[02:00] Show risk score: 82/100 (HIGH RISK) with reasoning
[02:30] Open AI Chat: "Block 2 hours for this task today"
[03:00] Agent finds free slot, shows confirmation card
[03:30] Click confirm → Google Calendar event created live
[04:00] Calendar view → Show task overlaid on calendar
[04:30] Analytics dashboard → Productivity trend charts
[05:00] Voice input demo: "Add task: Review investor deck by Friday"
[05:30] Show task created from voice + auto-decomposition
[06:00] Notifications panel → Show smart escalation reminders
```

---

*Technical Architecture Document v1.0.0*
*DeadlineZero | Vibe2Ship Hackathon 2026*
*Status: APPROVED FOR IMPLEMENTATION*
