# 🎯 VIBE2SHIP HACKATHON — WINNING RULES

## DeadlineZero | Problem Statement 1 | Evaluation Matrix: 100/100

---

## 📊 EVALUATION BREAKDOWN (100 Points Total)

| Criteria | Weight | Target Score | Rules to Follow |
|----------|--------|--------------|-----------------|
| **Problem Solving & Impact** | 20% | 20/20 | Rules 1-4 |
| **Agentic Depth** | 20% | 20/20 | Rules 5-8 |
| **Innovation & Creativity** | 20% | 20/20 | Rules 9-12 |
| **Google Technologies** | 15% | 15/15 | Rules 13-16 |
| **Product Experience & Design** | 10% | 10/10 | Rules 17-20 |
| **Technical Implementation** | 10% | 10/10 | Rules 21-24 |
| **Completeness & Usability** | 5% | 5/5 | Rules 25-27 |

---

## 🎯 PROBLEM SOLVING & IMPACT (20 Points)

### Rule 1: Solve the EXACT Problem
✓ Build for missed deadlines (students/professionals/entrepreneurs)
✓ Demo must show: User adds task → AI prevents deadline miss
✓ Prove impact with before/after scenario in demo

text


### Rule 2: Show Measurable Impact
✓ Display "Risk Score" for every task (0-100)
✓ Show "On-time completion rate %" in analytics
✓ Demo: "Without AI = 50% on-time | With AI = 85% on-time"

text


### Rule 3: Target Real Users
✓ Onboarding asks: Student / Professional / Entrepreneur
✓ UI language matches user persona (e.g., "assignments" for students)
✓ Demo with realistic task examples (not "Test Task 1")

text


### Rule 4: Prove It's Better Than Existing Tools
✓ In Google Doc: Compare with Todoist/Google Tasks
✓ Highlight: "They remind. We ACT."
✓ Demo: Show AI auto-creating subtasks (competitors don't do this)

text


---

## 🤖 AGENTIC DEPTH (20 Points) — MOST CRITICAL

### Rule 5: Build 6 Autonomous Agents (Minimum 4 Must Work)
Agent 1: Task Decomposer → Auto-generate subtasks when task created
Agent 2: Risk Analyzer → Auto-calculate risk score every 6 hours
Agent 3: Daily Planner → Generate daily action plan every morning
Agent 4: Smart Scheduler → Auto-create Google Calendar blocks
Agent 5: Behavior Learner → Track actual vs estimated time
Agent 6: Chat Action Agent → Execute commands from natural language

text


### Rule 6: AI Must Take Actions, Not Just Suggest
✗ BAD: "AI suggests: Maybe break this task into 3 parts?"
✓ GOOD: "AI created 3 subtasks for you. [View] [Edit]"

✗ BAD: "You should work on this task now"
✓ GOOD: "I've blocked 2 hours on your calendar for this task"

text


### Rule 7: Show AI "Thinking Process" in UI
✓ Display: "AI Reasoning: This task is high-risk because..."
✓ Show: "AI Action Taken: Created calendar block at 2 PM"
✓ Demo: Chat shows "🤖 Analyzing your workload... Done!"

text


### Rule 8: AI Must Use Context (Not Random)
✓ AI considers: User's calendar, current workload, past behavior
✓ Demo: "AI knows you work best 9-11 AM, so I scheduled it then"
✓ Personalization: Risk score adapts to user's completion history

text


---

## 💡 INNOVATION & CREATIVITY (20 Points)

### Rule 9: Implement "Risk Score" Feature (Unique Differentiator)
✓ Every task shows: Risk Score (0-100) with color coding

0-30: Green (Low risk)
31-60: Yellow (Medium risk)
61-85: Orange (High risk)
86-100: Red (Critical - likely to miss)
✓ Formula includes:

Time remaining vs estimated time
User's historical completion rate
Current workload
text


### Rule 10: Behavioral Learning (Show It Improving)
✓ Track: Estimated time vs Actual time for completed tasks
✓ Display: "AI Accuracy: 78% → 89% (improving!)"
✓ Demo: Show task estimated 2 hours, took 3 hours →
Next similar task AI estimates 3 hours

text


### Rule 11: Conversational Task Management
✓ User types: "Add task: Submit project report by Friday 5pm"
→ AI creates task with deadline auto-parsed

✓ User asks: "Am I going to miss any deadlines?"
→ AI responds with analysis + actions

✓ User says: "Move all low priority tasks to next week"
→ AI executes bulk action

text


### Rule 12: Visual Innovation
✓ Daily AI Plan Card (morning greeting + top 3 tasks)
✓ Eisenhower Matrix view (Urgent/Important grid)
✓ Progress rings/animations for task completion
✓ AI chat with typing indicators

text


---

## 🔵 GOOGLE TECHNOLOGIES (15 Points) — MANDATORY

### Rule 13: Use Gemini PROMINENTLY
✓ Gemini 1.5 Pro: Chat, task decomposition, daily planning
✓ Gemini 1.5 Flash: Risk analysis (background jobs)
✓ Display "Powered by Gemini" badge in UI
✓ In Google Doc: List exact Gemini model usage per feature

text


### Rule 14: Deploy on Google Cloud Run
✓ Backend API hosted on Cloud Run (not Vercel/Netlify)
✓ Submitted link must be: https://[project].run.app
✓ In Google Doc: Screenshot of Cloud Run dashboard

text


### Rule 15: Use Firebase Deeply
✓ Firebase Auth (Google OAuth login)
✓ Firestore (all data storage)
✓ Show Firestore security rules in GitHub repo
✓ Optional: Firebase Hosting for frontend

text


### Rule 16: Integrate Google Calendar API
✓ Read user's calendar events
✓ AI creates calendar blocks for tasks
✓ Show calendar view with tasks overlaid
✓ Must work live in demo

text


**Bonus (not mandatory but helps):**
⭐ Gmail API for daily digest emails
⭐ Google Cloud Scheduler for cron jobs
⭐ Google Secret Manager for API keys

text


---

## 🎨 PRODUCT EXPERIENCE & DESIGN (10 Points)

### Rule 17: Dark Mode + Professional UI
✓ Use dark theme (modern, reduces eye strain)
✓ Color system:

Primary: Indigo (#6366F1)
Success: Emerald (#10B981)
Warning: Amber (#F59E0B)
Danger: Red (#EF4444)
✓ Use Tailwind CSS + shadcn/ui components

text


### Rule 18: Intuitive User Flow
✓ User can add a task in < 10 seconds
✓ Quick Add button (FAB) on every screen
✓ One-click actions: "Approve AI Plan", "Schedule Now"
✓ No screen should require > 3 clicks to reach

text


### Rule 19: Visual Feedback for AI Actions
✓ Loading states for AI processing
✓ Success toasts: "✓ AI created 3 subtasks"
✓ Animated transitions (Framer Motion)
✓ Progress indicators for long operations

text


### Rule 20: Mobile Responsive
✓ Test on mobile view (judges may check on phone)
✓ Touch-friendly buttons (min 44px tap targets)
✓ Collapsible sidebars for mobile

text


---

## 💻 TECHNICAL IMPLEMENTATION (10 Points)

### Rule 21: Clean Code Architecture
✓ Folder structure:
/pages → Next.js pages + API routes
/components → Reusable UI components
/lib → Utilities (gemini.js, firebase.js)
/hooks → Custom React hooks

✓ Code comments for complex logic
✓ Consistent naming conventions

text


### Rule 22: Error Handling
✓ Try-catch in all API routes
✓ User-friendly error messages (not technical jargon)
✓ Fallbacks: If Gemini fails, show cached response
✓ No white screens of death

text


### Rule 23: Performance
✓ API response time < 500ms (CRUD operations)
✓ Gemini response time < 3 seconds
✓ Page load time < 2 seconds
✓ Lazy load heavy components

text


### Rule 24: Security
✓ Firestore security rules (users can only access own data)
✓ API keys in environment variables (not hardcoded)
✓ HTTPS enforced
✓ No sensitive data in console.log

text


---

## ✅ COMPLETENESS & USABILITY (5 Points)

### Rule 25: All MVP Features Must Work
Must Have (Zero Bugs Allowed):
✓ Google OAuth login
✓ Task CRUD (Create, Read, Update, Delete)
✓ AI task decomposition (subtask generation)
✓ AI chat (responds to 5+ different queries)
✓ Daily AI plan generation
✓ Risk score calculation
✓ Basic analytics dashboard

Should Have (If Time Permits):
⭐ Google Calendar integration
⭐ Kanban board view
⭐ Voice input

text


### Rule 26: Demo Preparation
✓ Pre-create 1 demo user account
✓ Seed database with 5-7 realistic tasks
✓ Practice 3-minute demo flow:

Show dashboard with AI daily plan
Add new task → AI creates subtasks (live)
Ask AI chat: "What should I work on now?"
Show risk scores updating
Approve AI calendar scheduling
Show analytics dashboard
text


### Rule 27: Documentation Quality
✓ GitHub README.md includes:

Features list
Tech stack
Setup instructions
Screenshots (4-6 images)
Demo video link (optional but recommended)
✓ Google Doc includes:

Problem statement (copy from hackathon PDF)
Solution overview (2-3 paragraphs)
Key features (bullet list)
Technologies used (complete list)
Google technologies (highlight these)
text


---

## 🚨 SUBMISSION REQUIREMENTS (MUST DO)

### Mandatory Deliverables:
✓ Deployed link (Google Cloud Run / AI Studio)
→ Must be publicly accessible
→ Must stay live until evaluation ends

✓ GitHub repo (public)
→ Clean code
→ README.md
→ .env.example (no real secrets)

✓ Google Doc (public link, anyone can view)
→ Problem Statement Selected: PS1 - The Last-Minute Life Saver
→ Solution Overview
→ Key Features
→ Technologies Used
→ Google Technologies Utilized

text


### Submission Checklist:
[ ] Tested on deployed URL (not localhost)
[ ] Google OAuth works on deployed site
[ ] AI features work (Gemini API key set)
[ ] Calendar integration works (if implemented)
[ ] No console errors in browser
[ ] Mobile view works
[ ] All links in Google Doc are accessible
[ ] Submitted on BlockseBlock BEFORE June 29, 2:00 PM