# 📋 Product Requirements Document (PRD)

## Project: **DeadlineZero** — The Last-Minute Life Saver

### Version: 1.0.0 | Status: Draft | Date: June 2026

### Hackathon: Vibe2Ship by Coding Ninjas × Google for Developers

\---

> \*\*"Don't just remind. Act."\*\*

\---

## 📑 Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals \& Objectives](#3-goals--objectives)
4. [Target Users](#4-target-users)
5. [User Personas](#5-user-personas)
6. [User Stories \& Use Cases](#6-user-stories--use-cases)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [System Architecture](#9-system-architecture)
10. [AI \& Agentic Features](#10-ai--agentic-features)
11. [Google Technologies Stack](#11-google-technologies-stack)
12. [UI/UX Design Guidelines](#12-uiux-design-guidelines)
13. [Feature Prioritization (MoSCoW)](#13-feature-prioritization-moscow)
14. [Data Models \& Schema](#14-data-models--schema)
15. [API Design](#15-api-design)
16. [Security \& Privacy](#16-security--privacy)
17. [Evaluation Alignment](#17-evaluation-alignment)
18. [Success Metrics \& KPIs](#18-success-metrics--kpis)
19. [Risk \& Mitigation](#19-risk--mitigation)
20. [Timeline \& Milestones](#20-timeline--milestones)
21. [Submission Checklist](#21-submission-checklist)

\---

## 1\. Executive Summary

**DeadlineZero** is an AI-powered productivity companion that goes
beyond traditional reminder apps. It proactively understands the
user's workload, life context, and behavioral patterns to help them
plan, prioritize, and complete tasks — before deadlines are ever missed.

Unlike tools like Todoist, Notion, or Google Tasks that simply
notify users, DeadlineZero acts as an **autonomous AI agent** that:

* Breaks down complex goals into executable steps
* Schedules tasks intelligently around the user's calendar
* Adapts to procrastination patterns and nudges users proactively
* Takes autonomous actions (draft emails, create calendar blocks,
set sub-tasks) on behalf of the user

**Built on Google Cloud + Gemini AI**, DeadlineZero is a
web-first application designed to be fast, intuitive, and
genuinely helpful.

\---

## 2\. Problem Statement

### 2.1 The Core Problem

Students, professionals, and entrepreneurs consistently:

* Miss deadlines due to poor planning, not lack of effort
* Ignore passive reminders (notification fatigue)
* Underestimate task complexity and time required
* Fail to prioritize effectively under pressure
* Lose track of interdependent tasks and goals

### 2.2 Current Solution Gaps

|Existing Tool|Gap|
|-|-|
|Google Calendar|Only schedules, doesn't plan or prioritize|
|Todoist / TickTick|Passive task lists, no intelligence|
|Notion|Complex setup, no proactive assistance|
|Google Tasks|Too basic, no AI layer|
|ChatGPT|No persistent memory, no task execution|

### 2.3 The Opportunity

The market needs a tool that **thinks ahead**, **acts autonomously**,
and **adapts to human behavior** — not just a smarter notification
system.

\---

## 3\. Goals \& Objectives

### 3.1 Primary Goals

|Goal|Description|
|-|-|
|🎯 G1|Help users never miss a deadline again|
|🤖 G2|Build a deeply agentic AI that takes autonomous actions|
|📊 G3|Provide intelligent prioritization using context \& urgency|
|🔗 G4|Integrate deeply with Google ecosystem|
|🧠 G5|Learn from user behavior to personalize recommendations|

### 3.2 Hackathon-Specific Goals

* Score maximum on **Agentic Depth (20%)**
* Score maximum on **Problem Solving \& Impact (20%)**
* Score maximum on **Innovation \& Creativity (20%)**
* Leverage **Google Technologies (15%)** deeply
* Ship a **complete, working, deployed** product

\---

## 4\. Target Users

### 4.1 Primary Users

👨‍🎓 Students → Assignment deadlines, exam prep, project submissions
👩‍💼 Professionals → Work deliverables, meetings, client commitments
🧑‍💻 Entrepreneurs → Product launches, investor meetings, business tasks

### 4.2 Secondary Users

🏠 Individuals → Bill payments, personal goals, appointments
👩‍🏫 Educators → Grading deadlines, curriculum planning



### 4.3 User Demographics

* Age: 18–45
* Tech-savvy to moderate tech users
* Already use at least one productivity tool
* Frequently experience deadline anxiety

\---

## 5\. User Personas

### Persona 1 — "The Overwhelmed Student" 🎓Name: Aryan Sharma

Age: 21
Occupation: Engineering Student (3rd Year)
Pain Points:

Juggles 6+ subjects + internship applications
Forgets assignment deadlines until the night before
Procrastinates on large projects
Ignores calendar notifications
Goals:
Submit all assignments on time
Balance study and personal time
Get reminders that actually help him ACT
Quote: "I know I have work. I just don't know where to start."



### Persona 2 — "The Busy Professional" 💼

Name: Priya Menon
Age: 31
Occupation: Product Manager at a Tech Startup
Pain Points:

Back-to-back meetings leave no time to plan
Important emails get buried
Deadline conflicts across multiple projects
Relies on memory for too many commitments
Goals:
Stay on top of deliverables without burning out
Have AI handle scheduling grunt work
Get smart prioritization, not just reminders
Quote: "I need an assistant that thinks, not just pings."



### Persona 3 — "The Solo Entrepreneur" 🚀

Name: Karan Bhatia
Age: 27
Occupation: Founder of an EdTech Startup
Pain Points:

Wears multiple hats — sales, product, operations
Misses follow-ups with investors and clients
No team to delegate to
Poor work-life boundary
Goals:
Automate routine task planning
Never miss a follow-up or commitment
Have AI act as a virtual chief of staff
Quote: "Every missed deadline costs me money or trust."



\---

## 6\. User Stories \& Use Cases

### 6.1 Core User Stories

#### Epic 1: Task Management

US-001: As a user, I want to add tasks with deadlines so that
I can track what needs to be done.

US-002: As a user, I want the AI to automatically break down
large tasks into smaller steps so that I know
exactly how to start.

US-003: As a user, I want to see my tasks prioritized by
urgency and importance so that I focus on what
matters most.

US-004: As a user, I want to mark tasks as complete and
see my progress so that I feel motivated.

text



#### Epic 2: AI Assistance

US-005: As a user, I want the AI to suggest the best time
to work on each task based on my calendar so that
my schedule is optimized.

US-006: As a user, I want the AI to detect if I'm likely
to miss a deadline and warn me proactively so that
I can take corrective action early.

US-007: As a user, I want to chat with an AI assistant
about my tasks so that I can get instant planning
help in natural language.

US-008: As a user, I want the AI to autonomously create
calendar blocks for my tasks so that my time is
automatically protected.

text



#### Epic 3: Reminders \& Notifications

US-009: As a user, I want smart, context-aware reminders
that account for my current workload so that I'm
not overwhelmed.

US-010: As a user, I want escalating reminders for
critical deadlines so that urgent tasks get
appropriate attention.

text



#### Epic 4: Analytics \& Insights

US-011: As a user, I want to see my productivity trends
over time so that I can identify patterns and
improve.

US-012: As a user, I want personalized recommendations
based on my completion history so that I get
better over time.

text



#### Epic 5: Voice \& Multimodal

US-013: As a user, I want to add tasks by speaking so
that I can capture ideas without typing.

US-014: As a user, I want to ask the AI questions about
my schedule vocally so that I get hands-free help.

text



\---

## 7\. Functional Requirements

### 7.1 Module 1: User Authentication \& Onboarding

FR-001 User can sign up / log in via Google OAuth 2.0
FR-002 Onboarding flow captures user role
(Student / Professional / Entrepreneur)
FR-003 User can set working hours and preferred
focus times during onboarding
FR-004 User can connect Google Calendar during onboarding
FR-005 Onboarding includes a demo task to show
AI capabilities

text



### 7.2 Module 2: Task Management Engine

FR-010 User can create a task with:

* Title (required)
* Description (optional)
* Deadline date \& time (required)
* Priority level (auto-suggested by AI)
* Category / Tag
* Estimated time to complete

FR-011 User can edit, delete, archive tasks

FR-012 User can create subtasks under a parent task

FR-013 AI automatically suggests subtasks when a
task is created (Gemini-powered)

FR-014 Tasks display a dynamic urgency score
(0-100) updated in real-time

FR-015 User can view tasks in:

* List View
* Kanban Board View
* Calendar View
* Priority Matrix View (Eisenhower Matrix)

FR-016 User can filter and sort tasks by:

* Deadline
* Priority
* Category
* Completion Status
* Urgency Score

text



### 7.3 Module 3: AI Agent Core (The Brain)

FR-020 AI Agent analyzes all tasks and generates a
daily "Action Plan" every morning

FR-021 AI detects deadline risk for each task based on:

* Days remaining
* Estimated hours needed
* Current workload
* User's historical completion rate

FR-022 AI automatically reschedules tasks when
conflicts are detected

FR-023 AI generates a "Focus Mode" session with
the most critical tasks for the next 2 hours

FR-024 AI sends proactive alerts when deadline
risk crosses a threshold

FR-025 AI learns from task completion patterns
to improve future suggestions

FR-026 AI can draft a task breakdown plan in
natural language on user request

FR-027 AI agent can autonomously:

* Create Google Calendar events
* Set task reminders
* Reschedule lower-priority tasks
* Generate a daily digest email/summary

text



### 7.4 Module 4: AI Chat Interface

FR-030 Persistent AI chat interface accessible
from any screen

FR-031 User can ask natural language questions:

* "What should I work on now?"
* "Am I going to miss any deadlines this week?"
* "Add a task: Submit project by Friday 5pm"
* "Break down my thesis writing task"
* "Move all low priority tasks to next week"

FR-032 AI chat supports multi-turn conversation
with context memory within a session

FR-033 AI chat displays task cards inline in
the conversation

FR-034 AI can take actions from chat:

* Create/update/delete tasks
* Schedule calendar blocks
* Change priorities
* Generate reports

text



### 7.5 Module 5: Smart Reminders \& Notifications

FR-040 AI generates intelligent reminder schedule
per task (not fixed intervals)

FR-041 Reminder intensity escalates as deadline approaches:

* 7 days before: Gentle nudge
* 3 days before: Moderate reminder
* 1 day before: Urgent alert
* 2 hours before: Critical alarm

FR-042 Reminders are suppressed during focus
sessions or user-defined quiet hours

FR-043 In-app notification center with history

FR-044 Browser push notifications supported

FR-045 Email digest: Daily morning summary of
today's priorities (via Gmail API)

text



### 7.6 Module 6: Calendar Integration

FR-050 Full Google Calendar sync (read \& write)

FR-051 AI visualizes free slots and suggests
optimal task scheduling windows

FR-052 User can approve AI-suggested calendar
blocks with one click

FR-053 Conflict detection: AI warns when new
tasks clash with existing calendar events

FR-054 Calendar view within the app showing
tasks overlaid on calendar events

text



### 7.7 Module 7: Goal \& Habit Tracking

FR-060 User can create long-term goals with
target completion dates

FR-061 Goals can be linked to multiple tasks
(goal to tasks relationship)

FR-062 Goal progress bar shows % completion
based on linked task completion

FR-063 User can define recurring habits
(daily / weekly / custom)

FR-064 Habit streak tracking with visual
streak counter

FR-065 AI provides weekly goal review summary

text



### 7.8 Module 8: Analytics Dashboard

FR-070 Dashboard displays:

* Tasks completed this week vs target
* On-time completion rate (%)
* Deadline miss rate (%)
* Most productive time of day
* Task category distribution
* Streak \& consistency score

FR-071 AI generates weekly productivity insight
report in natural language

FR-072 Trend charts: 4-week completion history

FR-073 Exportable report (PDF / Google Doc)

text



### 7.9 Module 9: Voice Assistant

FR-080 Voice input button on main dashboard
and chat interface

FR-081 Powered by Web Speech API + Gemini
for intent understanding

FR-082 Voice commands supported:

* "Add task \[name] due \[date]"
* "What's my priority today?"
* "Mark \[task] as done"
* "How many tasks are due this week?"

FR-083 AI responds with text + optional
text-to-speech output

text



\---

## 8\. Non-Functional Requirements

### 8.1 Performance

NFR-001 Page load time < 2 seconds (LCP)
NFR-002 AI response time < 3 seconds for
standard queries
NFR-003 API response time < 500ms for
CRUD operations
NFR-004 App must support 100 concurrent users
(hackathon demo scale)

text



### 8.2 Reliability

NFR-005 Application uptime: 99.5% during
evaluation period
NFR-006 Graceful error handling with
user-friendly error messages
NFR-007 Offline-capable for task viewing
(PWA with service workers)
NFR-008 Auto-save for all user input

text



### 8.3 Scalability

NFR-009 Stateless backend architecture
for horizontal scaling
NFR-010 Google Cloud Run for auto-scaling
backend services
NFR-011 Firestore handles up to 1M documents
without config changes

text



### 8.4 Security

NFR-012 All API keys stored in
Google Secret Manager
NFR-013 HTTPS enforced across all endpoints
NFR-014 Google OAuth 2.0 for authentication
NFR-015 User data isolated by userId
(Firestore security rules)
NFR-016 No sensitive data in client-side code

text



### 8.5 Accessibility

NFR-017 WCAG 2.1 AA compliance
NFR-018 Keyboard navigable interface
NFR-019 Screen reader compatible
NFR-020 Minimum contrast ratio: 4.5:1

text



### 8.6 Compatibility

NFR-021 Supported browsers: Chrome, Firefox,
Safari, Edge (latest 2 versions)
NFR-022 Responsive design: Desktop, Tablet, Mobile
NFR-023 Mobile-first CSS approach

text



\---

## 9\. System Architecture

### 9.1 High-Level Architecture

+-----------------------------------------------------+
| CLIENT LAYER |
| React.js / Next.js (Web App) |
| \[Dashboard | Chat | Calendar | Analytics] |
+----------------------+------------------------------+
| HTTPS / REST / WebSocket
+----------------------v------------------------------+
| API GATEWAY |
| Google Cloud Run |
| (Node.js / Express Backend) |
+-------------+----------------+---------------------+
| Task API | Auth API | AI Agent API |
| /tasks/\* | /auth/\* | /agent/\* |
+------+------+-------+--------+----------+-----------+
| | |
+------v------+ +-----v------+ +--------v-----------+
| Firestore | | Firebase | | Gemini AI API |
| (Database) | | Auth | | (gemini-1.5-pro) |
+-------------+ +------------+ +--------------------+
| |
+------v----------------------------------v-----------+
| GOOGLE SERVICES LAYER |
| Google Calendar API | Gmail API | Cloud Scheduler |
| Google Secret Manager | Cloud Storage |
+-----------------------------------------------------+

text



### 9.2 AI Agent Architecture

+----------------------------------------------+
| AI AGENT CORE |
| |
| +--------------+ +-------------------+ |
| | Planner | | Memory Store | |
| | (Gemini) |<-->| (Firestore) | |
| +------+-------+ +-------------------+ |
| | |
| +------v-------------------------------+ |
| | Tool Executor | |
| | +----------+ +------------------+ | |
| | | Calendar | | Task Manager | | |
| | | Tool | | Tool | | |
| | +----------+ +------------------+ | |
| | +----------+ +------------------+ | |
| | | Notifier | | Analyzer Tool | | |
| | | Tool | | (Insights) | | |
| | +----------+ +------------------+ | |
| +--------------------------------------+ |
+----------------------------------------------+

text



### 9.3 Data Flow

User Input → Frontend → Cloud Run API →
Gemini AI (reasoning) → Tool Selection →
Tool Execution → Firestore Update →
Response to Frontend → UI Update

text



\---

## 10\. AI \& Agentic Features

### 10.1 Agentic Capabilities (Core Differentiator)

This is what separates DeadlineZero from every other
productivity app. The AI doesn't just suggest — it **acts**.

#### Agent Tool 1: Task Decomposer

Trigger: User creates a task with title + deadline
Action: AI analyzes task complexity and generates:

* 3-7 subtasks with individual deadlines
* Estimated time per subtask
* Logical sequencing of subtasks
* First action recommendation
Output: Subtasks auto-created in the system
Model: Gemini 1.5 Pro

text



#### Agent Tool 2: Deadline Risk Analyzer

Trigger: Runs every 6 hours via Cloud Scheduler
Action: For each incomplete task, AI calculates:

* Risk Score (0-100) based on:
* Time remaining vs estimated time
* User's historical velocity
* Current pending workload
* Calendar availability
Output: Risk scores updated,
alerts triggered for high-risk tasks
Model: Gemini 1.5 Flash (for speed)

text



#### Agent Tool 3: Daily Planner Agent

Trigger: Every morning at user's preferred time
Action: AI generates a personalized daily plan:

* Top 3 priority tasks for today
* Suggested time blocks
* Calendar slots pre-blocked
* Motivational context message
Output: Daily plan card on dashboard +
optional email digest
Model: Gemini 1.5 Pro

text



#### Agent Tool 4: Smart Scheduler

Trigger: User approves AI scheduling suggestion
OR AI auto-schedules in autonomous mode
Action: AI finds optimal calendar windows:

* Avoids existing meetings
* Respects user focus hours
* Groups similar tasks
* Creates Google Calendar events
Output: Google Calendar events created via API
Model: Gemini 1.5 Flash + Calendar API

text



#### Agent Tool 5: Behavioral Learning Engine

Trigger: Task marked complete / deadline missed
Action: AI logs completion data and learns:

* Actual time vs estimated time
* Time-of-day patterns
* Task category performance
* Procrastination triggers
Output: Future estimates become more accurate,
reminders adapt to user behavior
Model: Gemini + Firestore pattern storage

text



#### Agent Tool 6: Conversational Action Agent

Trigger: User sends message in chat
Action: AI understands intent and executes:

* Natural language to task creation
* Query to task search + display
* Command to priority change
* Request to report generation
Output: Real actions performed +
confirmation shown in chat
Model: Gemini 1.5 Pro (multi-turn)

text



### 10.2 AI Prompt Strategy

System Prompt Structure:
+---------------------------------------------+
| ROLE: You are DeadlineZero, an autonomous |
| productivity AI agent. |
| |
| CONTEXT: {user\_profile} + {current\_tasks} |
| + {calendar\_events} + {history} |
| |
| TOOLS AVAILABLE: \[list of tools] |
| |
| BEHAVIOR: |
| - Be proactive, not reactive |
| - Prefer action over suggestion |
| - Explain your reasoning briefly |
| - Always confirm before irreversible acts |
+---------------------------------------------+

text



\---

## 11\. Google Technologies Stack

|Technology|Usage|Why|
|-|-|-|
|**Gemini 1.5 Pro**|Core AI reasoning, chat, planning|Most capable, multimodal|
|**Gemini 1.5 Flash**|Background analysis, risk scoring|Fast \& cost-efficient|
|**Google AI Studio**|Development \& initial deployment|Hackathon-recommended|
|**Google Cloud Run**|Backend API hosting|Auto-scaling, serverless|
|**Firebase Auth**|User authentication|Easy Google OAuth|
|**Firestore**|Primary database|Real-time, scalable|
|**Google Calendar API**|Calendar read/write|Deep scheduling integration|
|**Gmail API**|Daily digest emails|Native email integration|
|**Cloud Scheduler**|Cron jobs for AI agent|Automated background tasks|
|**Secret Manager**|API key management|Security best practice|
|**Cloud Storage**|File uploads (future)|Scalable storage|

\---

## 12\. UI/UX Design Guidelines

### 12.1 Design Philosophy

Principle 1: CLARITY → User always knows what to do next
Principle 2: SPEED → Zero friction to add a task
Principle 3: TRUST → AI actions are transparent \& explainable
Principle 4: CALM → Design reduces anxiety, not adds to it
Principle 5: DELIGHT → Small moments of joy in the experience

text



### 12.2 Color System

Primary: #6366F1 (Indigo) - Trust, focus, intelligence
Secondary: #8B5CF6 (Purple) - AI, creativity, innovation
Success: #10B981 (Emerald) - Completion, progress
Warning: #F59E0B (Amber) - Approaching deadlines
Danger: #EF4444 (Red) - Missed / critical deadlines
Background: #0F172A (Dark Navy) - Dark mode primary
Surface: #1E293B (Slate) - Cards, panels
Text: #F8FAFC (Near-white) - Primary text

text



### 12.3 Screen Map

App Screens:
|
+-- Auth Screen
| +-- Login with Google
| +-- Onboarding Flow (3 steps)
|
+-- Dashboard (Main)
| +-- Daily AI Action Plan Card
| +-- Priority Task List
| +-- Upcoming Deadlines Widget
| +-- Streak \& Progress Widget
| +-- Quick Add Task Button (FAB)
|
+-- Tasks Screen
| +-- List View
| +-- Kanban View
| +-- Calendar View
| +-- Eisenhower Matrix View
|
+-- AI Chat Screen
| +-- Chat Interface
| +-- Quick Action Buttons
| +-- Voice Input Button
|
+-- Calendar Screen
| +-- Month / Week / Day View
| +-- Task Overlays
| +-- AI Scheduling Suggestions
|
+-- Goals Screen
| +-- Goal Cards with Progress
| +-- Linked Tasks
| +-- Habit Tracker
|
+-- Analytics Screen
| +-- Productivity Score
| +-- Completion Trends
| +-- Time Analysis
| +-- AI Weekly Report
|
+-- Settings Screen
+-- Profile \& Preferences
+-- Notification Settings
+-- Calendar Sync Settings
+-- AI Behavior Settings

text



### 12.4 Key UI Components

Component 1: Task Card
+---------------------------------+
| HIGH Submit Project Report |
| Due: Tomorrow, 5:00 PM |
| Risk Score: 87/100 |
| Progress: 60% |
| AI: "Start section 3 now" |
+---------------------------------+

Component 2: Daily AI Plan Card
+---------------------------------+
| Good Morning, Aryan! |
| Your AI Plan for Today |
| |
| 1st 9:00-11:00 Project Report |
| 2nd 11:30-12:30 Email follow-up|
| 3rd 2:00-3:00 Review PR |
| |
| 2 tasks at risk today |
| \[View Plan] \[Approve Schedule] |
+---------------------------------+

Component 3: AI Chat Bubble
+---------------------------------+
| AI: I've analyzed your workload.|
| You have 3 tasks due Friday |
| totaling \~8 hours of work, but |
| only 5 free hours available. |
| |
| Want me to reschedule the |
| lower-priority ones to Monday? |
| |
| \[Yes, do it] \[Show me first] |
+---------------------------------+

text



\---

## 13\. Feature Prioritization (MoSCoW)

### Must Have (MVP - Core)

M-01 User auth via Google OAuth
M-02 Task creation with deadline
M-03 AI task decomposition (subtask generation)
M-04 AI chat interface (Gemini-powered)
M-05 Daily AI action plan
M-06 Priority-based task list view
M-07 Deadline risk scoring
M-08 Smart notifications / reminders
M-09 Basic analytics dashboard
M-10 Google Cloud deployment

text



### Should Have (High Value)

S-01 Google Calendar integration (read + write)
S-02 AI autonomous calendar blocking
S-03 Kanban board view
S-04 Goal tracking with linked tasks
S-05 Voice input for task creation
S-06 Habit streak tracking
S-07 Daily email digest via Gmail API
S-08 Eisenhower Matrix view

text



### Could Have (Nice to Have)

C-01 Text-to-speech AI responses
C-02 Dark/Light mode toggle
C-03 Task export to PDF/Google Doc
C-04 Gamification (XP points, badges)
C-05 Team task sharing (collaborative)
C-06 Mobile PWA installable app
C-07 AI-generated weekly PDF report

text



### Won't Have (Out of Scope for Hackathon)

W-01 Native iOS/Android apps
W-02 Payment / subscription system
W-03 Third-party integrations (Slack, Jira)
W-04 Multi-language support
W-05 Enterprise admin dashboard

text



\---

## 14\. Data Models \& Schema

### 14.1 User Document

```javascript
// Firestore Collection: users/{userId}
{
  userId: "string",
  email: "string",
  displayName: "string",
  photoURL: "string",
  role: "student|professional|entrepreneur",
  preferences: {
    workingHours: {
      start: "09:00",
      end: "18:00"
    },
    focusHours: \["09:00-11:00", "14:00-16:00"],
    quietHours: \["22:00-08:00"],
    timezone: "Asia/Kolkata",
    notificationsEnabled: true,
    emailDigestEnabled: true,
    autonomousMode: false
  },
  stats: {
    tasksCompleted: 0,
    tasksOnTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    productivityScore: 0
  },
  calendarConnected: false,
  createdAt: "timestamp",
  lastActiveAt: "timestamp"
}
14.2 Task Document
JavaScript

// Firestore Collection: tasks/{taskId}
{
  taskId: "string",
  userId: "string",
  title: "string",
  description: "string",
  category: "work|study|personal|health|finance",
  status: "pending|in\_progress|completed|missed",
  priority: "critical|high|medium|low",

  deadline: "timestamp",
  estimatedMinutes: 120,
  actualMinutes: null,

  aiGenerated: {
    subtasks: \[
      {
        subtaskId: "string",
        title: "string",
        estimatedMinutes: 30,
        completed: false,
        deadline: "timestamp"
      }
    ],
    riskScore: 75,
    riskLevel: "high",
    suggestion: "Start with section 3 first",
    lastAnalyzedAt: "timestamp"
  },

  calendarEventId: "string|null",
  goalId: "string|null",

  completedAt: "timestamp|null",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
14.3 Goal Document
JavaScript

// Firestore Collection: goals/{goalId}
{
  goalId: "string",
  userId: "string",
  title: "string",
  description: "string",
  targetDate: "timestamp",
  category: "string",
  linkedTaskIds: \["taskId1", "taskId2"],
  progress: 45,
  status: "active|completed|abandoned",
  createdAt: "timestamp"
}
14.4 Habit Document
JavaScript

// Firestore Collection: habits/{habitId}
{
  habitId: "string",
  userId: "string",
  title: "string",
  frequency: "daily|weekly|custom",
  customDays: \["monday", "wednesday", "friday"],
  reminderTime: "07:00",
  currentStreak: 12,
  longestStreak: 30,
  completionHistory: {
    "2026-06-22": true,
    "2026-06-21": true,
    "2026-06-20": false
  },
  createdAt: "timestamp"
}
14.5 Chat Session Document
JavaScript

// Firestore Collection: chatSessions/{sessionId}
{
  sessionId: "string",
  userId: "string",
  messages: \[
    {
      role: "user|assistant",
      content: "string",
      timestamp: "timestamp",
      actions: \[]
    }
  ],
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
15. API Design
15.1 Authentication Endpoints
text

POST   /api/auth/google          → Google OAuth callback
POST   /api/auth/logout          → Clear session
GET    /api/auth/me              → Get current user profile
PUT    /api/auth/me              → Update user preferences
15.2 Task Endpoints
text

GET    /api/tasks                → Get all tasks (with filters)
POST   /api/tasks                → Create new task
GET    /api/tasks/:id            → Get single task
PUT    /api/tasks/:id            → Update task
DELETE /api/tasks/:id            → Delete task
POST   /api/tasks/:id/complete   → Mark task complete
POST   /api/tasks/:id/analyze    → Trigger AI risk analysis
GET    /api/tasks/today          → Get today's priority tasks
GET    /api/tasks/at-risk        → Get high-risk tasks
15.3 AI Agent Endpoints
text

POST   /api/agent/chat           → Send message to AI agent
POST   /api/agent/plan           → Generate daily action plan
POST   /api/agent/decompose      → Break task into subtasks
POST   /api/agent/schedule       → AI-powered scheduling
POST   /api/agent/analyze        → Full workload analysis
GET    /api/agent/insights       → Get AI productivity insights
15.4 Calendar Endpoints
text

GET    /api/calendar/events      → Get Google Calendar events
POST   /api/calendar/block       → Create calendar block for task
DELETE /api/calendar/block/:id   → Remove calendar block
GET    /api/calendar/slots       → Get available time slots
15.5 Analytics Endpoints
text

GET    /api/analytics/summary    → Productivity summary
GET    /api/analytics/trends     → Completion trend data
GET    /api/analytics/report     → AI-generated weekly report
15.6 Sample API Response
JSON

{
  "success": true,
  "data": {
    "date": "2026-06-22",
    "aiPlan": {
      "generatedAt": "2026-06-22T06:00:00Z",
      "summary": "You have 8 hours of work across 5 tasks. Focus on the project report first.",
      "topTasks": \[
        {
          "taskId": "task\_001",
          "title": "Submit Project Report",
          "suggestedTimeBlock": "09:00-11:00",
          "riskScore": 87,
          "aiReason": "Due tomorrow, 4 hours remaining work"
        }
      ]
    },
    "tasks": \[]
  }
}
16. Security \& Privacy
16.1 Authentication Security
text

- Google OAuth 2.0 only (no password storage)
- JWT tokens with 24-hour expiry
- Refresh token rotation
- Session invalidation on logout
16.2 Data Security
text

- Firestore security rules: Users can only access
  their own documents
- All API calls authenticated via Bearer token
- API keys stored in Google Secret Manager
- No sensitive data logged
16.3 Privacy
text

- Task data never used to train AI models
- User behavioral patterns stored locally in Firestore
- Google Calendar access: read+write (user-consented)
- Gmail access: send only (for digests)
- User can delete all data from settings
- GDPR-compliant data handling
16.4 Firestore Security Rules
JavaScript

rules\_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    match /tasks/{taskId} {
      allow read, write: if request.auth != null
        \&\& resource.data.userId == request.auth.uid;
    }

    match /chatSessions/{sessionId} {
      allow read, write: if request.auth != null
        \&\& resource.data.userId == request.auth.uid;
    }
  }
}
17. Evaluation Alignment
Criteria	Weight	Our Approach	Expected Score
Problem Solving \& Impact	20%	Directly solves deadline-missing for students, professionals, entrepreneurs with measurable impact	18-20/20
Agentic Depth	20%	6 autonomous AI agents: Decomposer, Risk Analyzer, Daily Planner, Smart Scheduler, Behavior Learner, Chat Action Agent	18-20/20
Innovation \& Creativity	20%	Risk scoring, behavioral learning, autonomous calendar blocking, conversational task management	16-20/20
Google Technologies	15%	Gemini 1.5 Pro+Flash, Firebase, Firestore, Cloud Run, Calendar API, Gmail API, Cloud Scheduler, Secret Manager	14-15/15
Product Experience	10%	Dark mode UI, intuitive flows, AI plan cards, Eisenhower matrix, one-click actions	8-10/10
Technical Implementation	10%	Clean architecture, proper error handling, secure, scalable Cloud Run deployment	8-10/10
Completeness \& Usability	5%	All MVP features working, deployed, documented	4-5/5
TOTAL	100%		86-100/100
18. Success Metrics \& KPIs
18.1 Hackathon Demo Metrics
text

- AI response time < 3 seconds
- Task decomposition accuracy (judge assessment)
- AI chat handles 10+ different intents correctly
- Calendar sync works live during demo
- Risk scores dynamically update
- Zero critical bugs during evaluation
18.2 Product Success Metrics (Post-Hackathon)
text

- Task on-time completion rate improvement: >30%
- Daily active usage rate: >60% of registered users
- AI suggestion acceptance rate: >50%
- Average session length: >5 minutes
- 7-day retention rate: >40%
- Net Promoter Score (NPS): >50
19. Risk \& Mitigation
Risk	Probability	Impact	Mitigation
Gemini API rate limits	Medium	High	Implement request queue + fallback to Flash model
Google Calendar OAuth complexity	High	Medium	Use simple read-only first, write later
Deployment issues on Cloud Run	Medium	High	Test deployment on Day 1 of build
Scope creep	High	High	Strict MoSCoW adherence, MVP first
AI response quality	Low	High	Well-crafted system prompts + testing
Data loss in Firestore	Low	High	Regular exports, proper error handling
Build time overrun	Medium	High	Parallel development + pre-built UI components
20. Timeline \& Milestones
Build Phase: June 22 (3 PM) to June 29 (2 PM)
text

DAY 1 — June 22 (3 PM - 11 PM) \[8 hours]
  - Project setup (Next.js + Firebase + Tailwind)
  - Google Auth integration
  - Basic Firestore schema setup
  - Deploy skeleton app to Cloud Run
  - Basic task CRUD API

DAY 2 — June 23 \[Full Day]
  - Task Management UI (List + Kanban view)
  - Gemini API integration (basic chat)
  - Task decomposition agent
  - AI risk scoring logic
  - Dashboard layout

DAY 3 — June 24 \[Full Day + Mentor Session 4-6 PM]
  - Daily AI Action Plan feature
  - Smart reminders system
  - Google Calendar API integration
  - Attend Mentor Session (4-6 PM)
  - Implement mentor feedback

DAY 4 — June 25 \[Full Day]
  - AI Chat interface (multi-turn)
  - Voice input feature
  - Autonomous scheduling feature
  - Analytics dashboard (basic)

DAY 5 — June 26 \[Full Day]
  - Goal \& Habit tracking
  - Email digest (Gmail API)
  - Behavioral learning logic
  - UI polish \& animations

DAY 6 — June 27 \[Full Day]
  - Full end-to-end testing
  - Bug fixes
  - Performance optimization
  - Mobile responsiveness

DAY 7 — June 28 \[Full Day]
  - Final deployment to Cloud Run
  - Google Doc submission write-up
  - GitHub cleanup \& README
  - Demo preparation \& practice

DAY 8 — June 29 \[Morning till 2 PM]
  - Final checks
  - Submit on BlockseBlock BEFORE 2:00 PM
  - Done!
21. Submission Checklist
Technical Checklist
text

\[ ] Application deployed on Google Cloud (Cloud Run / AI Studio)
\[ ] Deployed URL is publicly accessible
\[ ] All features tested on deployed URL
\[ ] GitHub repository is public
\[ ] README.md with setup instructions
\[ ] .env.example file (no real secrets)
\[ ] Clean, commented code
Submission Checklist
text

\[ ] BlockseBlock project created
\[ ] Problem Statement 1 selected
\[ ] Deployed Application Link submitted
\[ ] GitHub Repository Link submitted
\[ ] Google Doc submitted with:
    \[ ] Problem Statement Selected (PS1)
    \[ ] Solution Overview
    \[ ] Key Features list
    \[ ] Technologies Used
    \[ ] Google Technologies Utilized
\[ ] Google Doc is publicly accessible
\[ ] Final Submit clicked on BlockseBlock
\[ ] Submitted BEFORE June 29, 2026 2:00 PM
Demo Readiness Checklist
text

\[ ] Can add a task in under 10 seconds
\[ ] AI chat responds correctly to 5 demo queries
\[ ] Task decomposition works live
\[ ] Risk score visible and updates
\[ ] Calendar integration shows events
\[ ] Analytics dashboard has sample data
\[ ] No critical console errors
\[ ] Voice input works on demo device
Appendix
A. Tech Stack Summary
text

Frontend:   Next.js 14, Tailwind CSS, shadcn/ui, Framer Motion
Backend:    Node.js, Express.js, Google Cloud Run
Database:   Firebase Firestore
Auth:       Firebase Authentication (Google OAuth)
AI:         Gemini 1.5 Pro, Gemini 1.5 Flash (Google AI SDK)
Calendar:   Google Calendar API v3
Email:      Gmail API
Scheduler:  Google Cloud Scheduler
Secrets:    Google Secret Manager
Hosting:    Google Cloud Run
B. Gemini Model Selection Guide
text

Gemini 1.5 Pro   → Chat, Planning, Decomposition
                   (complex reasoning needed)
Gemini 1.5 Flash → Risk Analysis, Background tasks
                   (speed + cost efficiency)
C. Key Libraries
text

@google/generative-ai    → Gemini SDK
firebase-admin           → Firestore + Auth (server)
firebase                 → Client-side auth
googleapis               → Calendar + Gmail API
date-fns                 → Date manipulation
recharts                 → Analytics charts
react-big-calendar       → Calendar UI
framer-motion            → Animations
react-hot-toast          → Notifications
PRD Version 1.0.0 | Created for Vibe2Ship Hackathon 2026
Author: DeadlineZero Team | June 2026
Document Status: APPROVED FOR BUILD


