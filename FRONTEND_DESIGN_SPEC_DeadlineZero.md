# 🎨 Frontend Design & UI Specification

## Project: **DeadlineZero** — The Last-Minute Life Saver
### Version: 1.0.0 | Type: Frontend Design Specification
### Hackathon: Vibe2Ship by Coding Ninjas × Google for Developers

> *"A productivity app that feels like it's already working for you."*

---

## 📑 Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Design Token System](#2-design-token-system)
3. [Typography System](#3-typography-system)
4. [Component Library](#4-component-library)
5. [Animation & Motion System](#5-animation--motion-system)
6. [Page-by-Page UI Specification](#6-page-by-page-ui-specification)
7. [Micro-interactions & Effects](#7-micro-interactions--effects)
8. [Layout System & Grid](#8-layout-system--grid)
9. [Iconography & Visual Language](#9-iconography--visual-language)
10. [Responsive Design Specification](#10-responsive-design-specification)
11. [Accessibility Specification](#11-accessibility-specification)
12. [Implementation Code Reference](#12-implementation-code-reference)

---

## 1. Design Philosophy

### 1.1 The Aesthetic Direction

DeadlineZero lives in the space between **control room** and **focus studio**. Its users are under pressure — they don't want whimsy, they want clarity with urgency baked into the UI itself. The visual language should feel like a Bloomberg terminal met a Notion doc and decided to actually help you.

**The signature element:** A live-breathing **risk pulse** — every task card has a subtle ambient glow whose color and intensity directly encodes the risk score. No numbers needed at a glance. The UI literally tells you what's on fire.

**Three emotional jobs the UI must do:**
1. **Calm the chaos** — dark surfaces, generous spacing, readable hierarchy
2. **Signal urgency without panic** — color semantics are precise, never noisy
3. **Make AI feel like a co-pilot** — AI responses have their own distinct visual texture

### 1.2 Design Principles

| Principle | Application |
|-----------|-------------|
| **Information density without clutter** | Every pixel earns its place; no decorative elements |
| **Color as data** | Red/amber/green always means risk level, never decoration |
| **Motion as feedback** | Animations confirm actions, never distract from them |
| **AI has its own voice** | AI-generated content has a distinct surface treatment |
| **Dark-first** | Primary theme is dark; light mode is a secondary variant |

---

## 2. Design Token System

### 2.1 Color Palette

```css
/* === BRAND CORE === */
--color-brand-primary:    #6366F1;   /* Indigo — primary actions, active states */
--color-brand-glow:       #818CF8;   /* Indigo light — glow effects, highlights */
--color-brand-muted:      #312E81;   /* Indigo deep — subtle backgrounds */

/* === SURFACE SYSTEM (Dark Theme) === */
--color-bg-base:          #0A0A0F;   /* Near-black canvas — main background */
--color-bg-elevated:      #111118;   /* Sidebar, nav */
--color-bg-surface:       #16161F;   /* Cards, panels */
--color-bg-raised:        #1C1C28;   /* Hover states, inputs */
--color-bg-overlay:       #22223A;   /* Modals, dropdowns */

/* === SEMANTIC RISK COLORS (The UI's language) === */
--color-risk-critical:    #EF4444;   /* Risk 76–100 */
--color-risk-critical-glow: rgba(239, 68, 68, 0.15);
--color-risk-high:        #F97316;   /* Risk 51–75 */
--color-risk-high-glow:   rgba(249, 115, 22, 0.12);
--color-risk-medium:      #EAB308;   /* Risk 26–50 */
--color-risk-medium-glow: rgba(234, 179, 8, 0.10);
--color-risk-low:         #22C55E;   /* Risk 0–25 */
--color-risk-low-glow:    rgba(34, 197, 94, 0.10);

/* === AI SURFACE COLOR (Distinct from user content) === */
--color-ai-surface:       #0F1729;   /* AI message / plan card background */
--color-ai-border:        rgba(99, 102, 241, 0.25);
--color-ai-glow:          rgba(99, 102, 241, 0.08);
--color-ai-text-accent:   #A5B4FC;   /* AI-generated text highlight */

/* === TEXT SYSTEM === */
--color-text-primary:     #F1F5F9;   /* Main content */
--color-text-secondary:   #94A3B8;   /* Labels, metadata */
--color-text-muted:       #475569;   /* Placeholders, disabled */
--color-text-inverse:     #0A0A0F;   /* Text on light backgrounds */

/* === BORDERS === */
--color-border-subtle:    rgba(255, 255, 255, 0.06);
--color-border-default:   rgba(255, 255, 255, 0.10);
--color-border-strong:    rgba(255, 255, 255, 0.18);
--color-border-focus:     #6366F1;

/* === STATUS COLORS === */
--color-success:          #22C55E;
--color-warning:          #EAB308;
--color-error:            #EF4444;
--color-info:             #38BDF8;
```

### 2.2 Spacing Scale

```css
/* Base: 4px grid */
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
```

### 2.3 Border Radius Scale

```css
--radius-sm:   4px;     /* Tags, badges */
--radius-md:   8px;     /* Inputs, small cards */
--radius-lg:   12px;    /* Cards, panels */
--radius-xl:   16px;    /* Modals, large cards */
--radius-2xl:  24px;    /* Bottom sheets, featured cards */
--radius-full: 9999px;  /* Pills, avatars */
```

### 2.4 Shadow & Glow System

```css
/* Elevation shadows */
--shadow-sm:    0 1px 3px rgba(0,0,0,0.4);
--shadow-md:    0 4px 16px rgba(0,0,0,0.5);
--shadow-lg:    0 8px 32px rgba(0,0,0,0.6);
--shadow-xl:    0 16px 48px rgba(0,0,0,0.7);

/* Risk-coded glows (applied to task cards) */
--glow-critical: 0 0 20px rgba(239,68,68,0.20),
                 0 0 40px rgba(239,68,68,0.08);
--glow-high:     0 0 20px rgba(249,115,22,0.16),
                 0 0 40px rgba(249,115,22,0.06);
--glow-medium:   0 0 16px rgba(234,179,8,0.14),
                 0 0 32px rgba(234,179,8,0.05);
--glow-low:      0 0 16px rgba(34,197,94,0.12),
                 0 0 32px rgba(34,197,94,0.04);

/* Brand glow (buttons, active elements) */
--glow-brand:    0 0 24px rgba(99,102,241,0.30),
                 0 0 48px rgba(99,102,241,0.10);

/* AI card glow */
--glow-ai:       0 0 32px rgba(99,102,241,0.12),
                 inset 0 1px 0 rgba(99,102,241,0.15);
```

### 2.5 Transition Tokens

```css
--transition-instant:   100ms ease;
--transition-fast:      150ms ease;
--transition-normal:    200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-smooth:    300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce:    400ms cubic-bezier(0.34, 1.56, 0.64, 1);
--transition-elastic:   500ms cubic-bezier(0.68, -0.6, 0.32, 1.6);
```

---

## 3. Typography System

### 3.1 Font Pairing

```css
/* Display / Headings: Space Grotesk
   — geometric, slightly technical, confident
   — NOT Inter/DM Sans (too generic for a productivity tool)
   — conveys precision without coldness
*/
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

/* Body / UI: Inter
   — battle-tested for dense UI
   — exceptional legibility at small sizes
   — complementary to Space Grotesk's geometric character
*/
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

/* Monospace: JetBrains Mono
   — used exclusively for: risk scores, time values, task IDs
   — tabular figures → numbers align perfectly in lists
   — signals "live data" visually
*/
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

### 3.2 Type Scale

```css
/* --- DISPLAY --- */
--text-display-xl:  clamp(36px, 5vw, 56px);  /* Hero headings */
--text-display-lg:  clamp(28px, 4vw, 40px);  /* Page titles */
--text-display-md:  clamp(22px, 3vw, 30px);  /* Section titles */

/* --- HEADING --- */
--text-h1: 24px;   font-weight: 700;  letter-spacing: -0.02em;
--text-h2: 20px;   font-weight: 600;  letter-spacing: -0.015em;
--text-h3: 16px;   font-weight: 600;  letter-spacing: -0.01em;
--text-h4: 14px;   font-weight: 600;  letter-spacing: 0;

/* --- BODY --- */
--text-body-lg:  16px;  line-height: 1.6;  font-weight: 400;
--text-body-md:  14px;  line-height: 1.5;  font-weight: 400;
--text-body-sm:  13px;  line-height: 1.5;  font-weight: 400;

/* --- UI --- */
--text-label:    12px;  font-weight: 500;  letter-spacing: 0.06em;  text-transform: uppercase;
--text-caption:  11px;  font-weight: 400;  letter-spacing: 0.01em;

/* --- DATA (JetBrains Mono) --- */
--text-score:    32px;  font-weight: 500;  font-family: 'JetBrains Mono';
--text-data-lg:  18px;  font-weight: 400;  font-family: 'JetBrains Mono';
--text-data-md:  14px;  font-weight: 400;  font-family: 'JetBrains Mono';
--text-data-sm:  12px;  font-weight: 400;  font-family: 'JetBrains Mono';
```

### 3.3 Typography Usage Rules

- **Space Grotesk** → All headings (h1–h4), card titles, modal titles, navigation labels
- **Inter** → All body copy, descriptions, button text, form labels, tooltips
- **JetBrains Mono** → Risk scores, countdowns, time estimates, task IDs, code snippets
- Letter spacing on labels: always `0.06em` + `uppercase` — creates clear visual separation from body
- Negative letter spacing on headings (–0.02em to –0.015em): tighter, more editorial feel

---

## 4. Component Library

### 4.1 TaskCard Component

The most important UI element. Every detail is intentional.

```
┌─────────────────────────────────────────────────────────┐
│  ░ glow border (color = risk level)                     │
│                                                         │
│  ┌─ RISK PULSE (left border, 3px) ──────────────────┐  │
│  │                                                   │  │
│  │  [●] Category Tag          [RISK: 82] ⚡         │  │
│  │                            ^^ JetBrains Mono      │  │
│  │  Submit Final Report                              │  │
│  │  ─────────────────────────────────────────────   │  │
│  │  Due in 14h 23m  ·  ~4h work remaining           │  │
│  │  ^^^ countdown ticks every second                │  │
│  │                                                   │  │
│  │  ████████████░░░░  62% subtasks done              │  │
│  │                                                   │  │
│  │  [✓ Mark Done]  [AI Break Down ✨]  [⋯ More]    │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**CSS Implementation:**
```css
.task-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  border-left: 3px solid var(--risk-color);       /* Dynamic risk color */
  box-shadow: var(--glow-level);                   /* Dynamic glow */
  transition: transform var(--transition-smooth),
              box-shadow var(--transition-smooth);
  position: relative;
  overflow: hidden;
}

/* Subtle gradient shimmer on card surface */
.task-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.02) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--glow-level-hover);
  border-color: var(--color-border-default);
}

/* Risk Pulse Animation (ambient breathing glow) */
@keyframes riskPulse {
  0%, 100% { box-shadow: var(--glow-level); }
  50%       { box-shadow: var(--glow-level-intense); }
}

.task-card[data-risk="critical"] {
  animation: riskPulse 2s ease-in-out infinite;
}
.task-card[data-risk="high"] {
  animation: riskPulse 3s ease-in-out infinite;
}
/* Medium and low: no pulse — only animate urgency */
```

**React Component Spec:**
```tsx
interface TaskCardProps {
  task: Task;
  view: 'list' | 'kanban' | 'matrix';
  onComplete: (id: string) => void;
  onDecompose: (id: string) => void;
}

// Risk score → visual tokens mapping
const riskConfig = {
  critical: { color: '#EF4444', glow: 'var(--glow-critical)', label: 'CRITICAL', pulse: true },
  high:     { color: '#F97316', glow: 'var(--glow-high)',     label: 'HIGH RISK', pulse: true },
  medium:   { color: '#EAB308', glow: 'var(--glow-medium)',   label: 'MODERATE',  pulse: false },
  low:      { color: '#22C55E', glow: 'var(--glow-low)',      label: 'ON TRACK',  pulse: false },
};
```

---

### 4.2 AI Chat Bubble Component

AI messages must look categorically different from user messages.

```
USER MESSAGE:
                               ┌────────────────────────────┐
                               │ What should I focus on now?│
                               └──────────────────── [you] ─┘

AI MESSAGE:
┌──────────────────────────────────────────────────────┐
│ ✦ ──────────────────────────────────────────────── │  ← indigo top border
│                                                      │
│  Based on your workload and the 2 high-risk tasks,  │
│  I'd start with the **Project Report** right now.   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  📌 Submit Project Report          [RISK: 87] │   │  ← inline task card
│  │  Due in 11h · 4h of work remaining           │   │
│  │  [▶ Start Focus Mode]  [📅 Block Calendar]   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ✦ DeadlineZero AI  ·  just now                     │
└──────────────────────────────────────────────────────┘
```

```css
.ai-message {
  background: var(--color-ai-surface);
  border: 1px solid var(--color-ai-border);
  border-top: 2px solid var(--color-brand-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--glow-ai);
  position: relative;
}

/* Streaming text effect — text appears word by word */
.ai-message.streaming .ai-text {
  /* Applied via JS — each word fades in with 30ms stagger */
  animation: wordReveal 0.15s ease forwards;
}

@keyframes wordReveal {
  from { opacity: 0; filter: blur(4px); transform: translateY(4px); }
  to   { opacity: 1; filter: blur(0);   transform: translateY(0); }
}

/* Typing indicator (3 dots) */
.typing-indicator span {
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-brand-glow);
  animation: typingBounce 1.2s ease-in-out infinite;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30%           { transform: translateY(-6px); opacity: 1; }
}
```

---

### 4.3 Risk Score Badge

```css
.risk-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  letter-spacing: 0.08em;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  position: relative;
}

/* Score counter animates up from 0 on mount */
.risk-score-number {
  transition: color 600ms ease;
  /* animated via CountUp.js or custom requestAnimationFrame */
}

/* Blinking dot for critical tasks */
.risk-badge[data-level="critical"]::before {
  content: '';
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
  animation: criticalBlink 1s step-end infinite;
}

@keyframes criticalBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
```

---

### 4.4 Primary Button

```css
.btn-primary {
  background: var(--color-brand-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 10px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform var(--transition-fast),
              box-shadow var(--transition-smooth);

  /* Inset highlight — gives depth */
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.15),
              0 1px 3px rgba(0,0,0,0.3);
}

/* Ripple on click */
.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x) var(--y),
    rgba(255,255,255,0.25) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}
.btn-primary:active::after {
  opacity: 1;
  transition: opacity 0s;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--glow-brand),
              inset 0 1px 0 rgba(255,255,255,0.15);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
```

**Loading state:**
```css
.btn-primary.loading {
  pointer-events: none;
  position: relative;
}
.btn-primary.loading .btn-text { opacity: 0; }
.btn-primary.loading::before {
  content: '';
  position: absolute;
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
```

---

### 4.5 Progress Bar

```css
.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--color-bg-raised);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: linear-gradient(
    90deg,
    var(--risk-color) 0%,
    color-mix(in srgb, var(--risk-color) 70%, white) 100%
  );
  transition: width 600ms cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

/* Shimmer sweep on fill */
.progress-fill::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  left: -100%;
  width: 60%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.25),
    transparent
  );
  animation: progressShimmer 2s ease-in-out infinite;
}

@keyframes progressShimmer {
  from { left: -100%; }
  to   { left: 200%; }
}
```

---

### 4.6 Input Fields

```css
.input {
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  color: var(--color-text-primary);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color var(--transition-fast),
              box-shadow var(--transition-fast),
              background var(--transition-fast);
  width: 100%;
}

.input::placeholder {
  color: var(--color-text-muted);
}

.input:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-overlay);
}

.input:focus {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  background: var(--color-bg-overlay);
}

/* Error state */
.input.error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12);
}

/* Floating label animation */
.input-group {
  position: relative;
}
.input-label {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  font-size: 14px;
  transition: all var(--transition-smooth);
  pointer-events: none;
  background: var(--color-bg-raised);
  padding: 0 4px;
}
.input:focus ~ .input-label,
.input:not(:placeholder-shown) ~ .input-label {
  top: -1px;
  font-size: 11px;
  color: var(--color-brand-glow);
  letter-spacing: 0.04em;
}
```

---

### 4.7 Sidebar Navigation

```
┌────────────────────────┐
│  ◆ DeadlineZero        │  ← logo, Space Grotesk 600
│                        │
│  ── TODAY ──           │  ← eyebrow label
│  ⊞  Dashboard          │  ← active: indigo pill bg + left accent
│                        │
│  ── WORK ──            │
│  ◻  Tasks              │
│  ⊟  Calendar           │
│  ◎  Goals              │
│                        │
│  ── INSIGHTS ──        │
│  ◈  Analytics          │
│  ◉  Chat with AI       │  ← pulsing dot when AI has new insight
│                        │
│  ───────────────────   │
│  ⚙  Settings           │
│  [avatar] Aryan        │
└────────────────────────┘
```

```css
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 9px 12px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 450;
  cursor: pointer;
  transition: background var(--transition-fast),
              color var(--transition-fast),
              padding-left var(--transition-smooth);
  position: relative;
}

.nav-item:hover {
  background: var(--color-bg-raised);
  color: var(--color-text-primary);
  padding-left: 16px;  /* subtle indent on hover */
}

.nav-item.active {
  background: rgba(99, 102, 241, 0.12);
  color: var(--color-brand-glow);
  font-weight: 500;
}

/* Left accent line for active state */
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 20%; bottom: 20%;
  width: 3px;
  background: var(--color-brand-primary);
  border-radius: 0 2px 2px 0;
}

/* AI pulse dot */
.nav-ai-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-brand-primary);
  animation: navAiPulse 2s ease-in-out infinite;
  margin-left: auto;
}

@keyframes navAiPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.8); }
}
```

---

### 4.8 Toast Notifications

```css
.toast {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-default);
  border-left: 3px solid var(--toast-accent);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  max-width: 360px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;

  /* Entry animation */
  animation: toastSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Exit animation (added via JS on dismiss) */
.toast.dismissing {
  animation: toastSlideOut 0.2s ease-in forwards;
}

@keyframes toastSlideOut {
  to {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
    margin-bottom: -60px;
  }
}
```

---

## 5. Animation & Motion System

### 5.1 Motion Philosophy

> Animate to confirm, not to entertain. Every animation has one job: make the UI feel responsive and the data feel alive.

**Three animation categories:**

| Category | Purpose | Duration Range | Easing |
|----------|---------|----------------|--------|
| **Feedback** | Confirms a user action happened | 100–200ms | ease |
| **Transition** | Moves between states or views | 200–350ms | cubic-bezier(0.4,0,0.2,1) |
| **Ambient** | Communicates live data (risk pulse, AI thinking) | 1.5–3s | ease-in-out, infinite |

---

### 5.2 Page Load Sequence

The dashboard doesn't just appear — it **assembles**.

```
Timeline (ms):
 0ms   → Background fades in (opacity 0 → 1, 200ms)
100ms  → Sidebar slides in from left (translateX(-100%) → 0, 300ms, bounce)
200ms  → Top bar drops in (translateY(-20px) → 0, 250ms, ease)
350ms  → "Today's AI Plan" card fades + rises (opacity 0, translateY(16px) → normal, 300ms)
500ms  → Task cards stagger in, 60ms apart each
         Card 1: 500ms
         Card 2: 560ms
         Card 3: 620ms ...
700ms  → Risk scores count up from 0 (number animation, 600ms, ease-out)
900ms  → Analytics mini-charts draw (SVG stroke-dashoffset animation, 800ms)
```

```css
/* Staggered card entrance */
.task-card {
  opacity: 0;
  transform: translateY(16px);
  animation: cardEnter 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.task-card:nth-child(1) { animation-delay: 0.50s; }
.task-card:nth-child(2) { animation-delay: 0.56s; }
.task-card:nth-child(3) { animation-delay: 0.62s; }
.task-card:nth-child(4) { animation-delay: 0.68s; }
.task-card:nth-child(5) { animation-delay: 0.74s; }

@keyframes cardEnter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### 5.3 Risk Score Count-Up Animation

```typescript
// Fires when TaskCard mounts or risk score changes
function animateRiskScore(element: HTMLElement, target: number, duration = 600) {
  const start = performance.now();
  const startValue = 0;

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out: fast start, slows as it approaches target
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startValue + (target - startValue) * eased);
    element.textContent = current.toString();
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
```

---

### 5.4 AI Streaming Text Effect

```typescript
// Words appear one by one as Gemini streams its response
function streamText(container: HTMLElement, fullText: string) {
  const words = fullText.split(' ');
  container.innerHTML = '';

  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.textContent = word + ' ';
    span.style.opacity = '0';
    span.style.filter = 'blur(4px)';
    span.style.transform = 'translateY(4px)';
    span.style.display = 'inline-block';
    span.style.transition = `all 0.15s ease ${i * 30}ms`;
    container.appendChild(span);

    // Trigger reflow before applying transition
    requestAnimationFrame(() => {
      span.style.opacity = '1';
      span.style.filter = 'blur(0)';
      span.style.transform = 'translateY(0)';
    });
  });
}
```

---

### 5.5 View Mode Switch Animations

When switching between List / Kanban / Calendar / Matrix views:

```typescript
// Framer Motion variants for view transitions
const viewVariants = {
  enter: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    filter: 'blur(2px)',
    transition: { duration: 0.15 },
  },
};
```

---

### 5.6 Task Completion Celebration

When a task is marked done — a single satisfying moment, not a fireworks show:

```typescript
// Framer Motion sequence on task completion
const completeSequence = async (taskCard: Element) => {
  // 1. Scale down briefly (tactile press feedback)
  await animate(taskCard, { scale: 0.97 }, { duration: 0.08 });

  // 2. Green flash + check mark
  await animate(taskCard, {
    scale: 1,
    borderColor: '#22C55E',
    boxShadow: '0 0 24px rgba(34,197,94,0.35)',
  }, { duration: 0.2 });

  // 3. Strikethrough title text
  // (CSS class applied: .task-title { text-decoration: line-through })

  // 4. Card collapses out of list
  await animate(taskCard, {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  }, { duration: 0.3, ease: [0.4, 0, 1, 1] });
};
```

---

### 5.7 Kanban Drag-and-Drop

```typescript
// Using @dnd-kit/core — most accessible DnD library

// Visual feedback during drag:
const dragStyle = {
  opacity: 0.5,
  cursor: 'grabbing',
  transform: 'scale(1.02) rotate(1.5deg)',
  boxShadow: 'var(--shadow-xl)',
  zIndex: 999,
};

// Drop zone highlight
const dropZoneActive = {
  background: 'rgba(99, 102, 241, 0.06)',
  borderColor: 'rgba(99, 102, 241, 0.30)',
  transition: 'all 0.15s ease',
};
```

---

### 5.8 Voice Input Animation

```css
/* Microphone button states */
.voice-btn {
  width: 48px; height: 48px;
  border-radius: var(--radius-full);
  background: var(--color-bg-raised);
  border: 1px solid var(--color-border-default);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-smooth);
}

.voice-btn:hover {
  background: rgba(99, 102, 241, 0.12);
  border-color: var(--color-brand-primary);
}

/* Recording state: two concentric ripple rings */
.voice-btn.recording {
  background: rgba(239, 68, 68, 0.12);
  border-color: var(--color-risk-critical);
}

.voice-btn.recording::before,
.voice-btn.recording::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid var(--color-risk-critical);
  animation: voiceRipple 1.5s ease-out infinite;
}

.voice-btn.recording::after {
  animation-delay: 0.5s;
}

@keyframes voiceRipple {
  from {
    width: 100%; height: 100%;
    opacity: 0.6;
  }
  to {
    width: 220%; height: 220%;
    opacity: 0;
  }
}
```

---

### 5.9 Skeleton Loading States

```css
/* Used while data loads — prevents layout shift */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-surface) 0%,
    var(--color-bg-raised) 50%,
    var(--color-bg-surface) 100%
  );
  background-size: 200% 100%;
  border-radius: var(--radius-md);
  animation: skeletonSweep 1.5s ease-in-out infinite;
}

@keyframes skeletonSweep {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* Skeleton card */
.skeleton-card {
  height: 120px;
  border-radius: var(--radius-lg);
}
.skeleton-title  { height: 16px; width: 60%; margin-bottom: 8px; }
.skeleton-meta   { height: 12px; width: 40%; }
.skeleton-badge  { height: 24px; width: 80px; border-radius: var(--radius-full); }
```

---

## 6. Page-by-Page UI Specification

### 6.1 Dashboard Page

**Layout:**
```
┌───────────────────────────────────────────────────────────────────┐
│  SIDEBAR  │           MAIN CONTENT                                │
│   240px   │                                                       │
│           │  ┌─ HEADER ────────────────────────────────────────┐ │
│  ◆ DZ     │  │  Good morning, Aryan ·  Friday, June 27         │ │
│           │  │  You have 3 high-risk tasks today               │ │
│  Dashboard│  └─────────────────────────────────────────────────┘ │
│  Tasks    │                                                       │
│  Calendar │  ┌─ AI ACTION PLAN ─────────────────────────────────┐ │
│  Goals    │  │ ✦ Today's Focus — generated at 6:02 AM          │ │
│  Analytics│  │                                                   │ │
│  Chat AI  │  │  "You have 8h of tasks and 5h of calendar        │ │
│           │  │   commitments. Start with the project report."   │ │
│  ─────    │  │                                                   │ │
│  Settings │  │  [1] Submit Report   09:00–11:00   [RISK: 87] ⚡ │ │
│  [avatar] │  │  [2] Review PRD      11:30–12:30   [RISK: 61]   │ │
│           │  │  [3] Client Email    14:00–14:30   [RISK: 43]   │ │
│           │  │                                                   │ │
│           │  │  [✓ Apply to Calendar]                           │ │
│           │  └───────────────────────────────────────────────────┘ │
│           │                                                       │
│           │  ┌─ UPCOMING TASKS ─────────────┐ ┌─ QUICK STATS ─┐ │
│           │  │  [TaskCard x3]               │ │  Done today: 2 │ │
│           │  │  + 5 more tasks              │ │  Risk avg: 58  │ │
│           │  └──────────────────────────────┘ │  Streak: 4d   │ │
│           │                                   └────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

**AI Action Plan Card** — special treatment:
```css
.ai-plan-card {
  background: var(--color-ai-surface);
  border: 1px solid var(--color-ai-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--glow-ai);
  position: relative;
  overflow: hidden;
}

/* Animated gradient mesh background — subtle, not distracting */
.ai-plan-card::before {
  content: '';
  position: absolute;
  width: 300px; height: 300px;
  top: -100px; right: -100px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.08) 0%,
    transparent 70%
  );
  animation: meshFloat 8s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes meshFloat {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-20px, 20px) scale(1.1); }
}
```

---

### 6.2 Tasks Page

**View Toggle Bar:**
```
[⊞ List] [◫ Kanban] [📅 Calendar] [⊠ Matrix]
  ↑ active view has indigo pill background
```

**Eisenhower Matrix View:**
```
┌─────────────────────┬─────────────────────┐
│  URGENT + IMPORTANT │  NOT URGENT +       │
│  ← Do now           │  IMPORTANT          │
│                     │  ← Schedule         │
│  [Task card]        │                     │
│  [Task card]        │  [Task card]        │
├─────────────────────┼─────────────────────┤
│  URGENT +           │  NOT URGENT +       │
│  NOT IMPORTANT      │  NOT IMPORTANT      │
│  ← Delegate         │  ← Eliminate        │
│                     │                     │
│  [Task card]        │                     │
└─────────────────────┴─────────────────────┘
```
Each quadrant has a distinct subtle background tint to aid spatial memory.

---

### 6.3 AI Chat Page

```
┌─────────────────────────────────────────────┐
│  ✦ Chat with DeadlineZero AI                │
│  Your personal productivity co-pilot        │
├─────────────────────────────────────────────┤
│                                             │
│  [AI greeting bubble — onboarding prompt]  │
│                                             │
│              [User message bubble] ──────► │
│                                             │
│  [AI response with inline task cards]      │
│                                             │
│  [AI response streaming...  ●●● ]          │
│                                             │
├─────────────────────────────────────────────┤
│  [🎤 voice]  ┌─────────────────────┐ [↑]  │
│              │ Ask anything...      │      │
│              └─────────────────────┘      │
│                                             │
│  Quick: [What's urgent?] [Plan my day]     │
│          [Add task ✚] [Block calendar 📅]  │
└─────────────────────────────────────────────┘
```

**Quick suggestion chips** — pill buttons with indigo border, fade in beneath input. Disappear after user types.

---

### 6.4 Analytics Dashboard

```
┌─────────────────────────────────────────────────────┐
│  PRODUCTIVITY OVERVIEW  ·  This Week                │
│                                                     │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐        │
│  │   12      │ │   87%     │ │   4 days  │        │
│  │  tasks    │ │ on-time   │ │  streak   │        │
│  │  done     │ │ rate      │ │           │        │
│  └───────────┘ └───────────┘ └───────────┘        │
│  ↑ each number counts up on page enter             │
│                                                     │
│  ┌─ COMPLETION TREND ─────────────────────────────┐ │
│  │  [Area chart — 4-week history, Recharts]       │ │
│  │  Gradient fill: brand indigo → transparent     │ │
│  │  Line: 2px solid brand-glow                    │ │
│  │  Animated draw on mount (1s, ease-out)         │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  ┌─ MOST PRODUCTIVE HOURS ──┐ ┌─ CATEGORY ───────┐ │
│  │  Bar chart (hourly)      │ │  Donut chart     │ │
│  │  Peak bar highlighted    │ │  Work/Personal   │ │
│  └──────────────────────────┘ └──────────────────┘ │
│                                                     │
│  ┌─ AI WEEKLY INSIGHT ─────────────────────────────┐ │
│  │ ✦ "You complete 40% more tasks on Tuesday..."  │ │
│  │   AI-generated text, streamed in on load       │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Stat cards** — numbers animate up from 0 using count-up animation on page enter.
**Charts** — draw animation: paths trace from left to right on mount.

---

### 6.5 Login Page

```
┌─────────────────────────────────────────────┐
│                                             │
│     ◆                                       │
│     DeadlineZero                            │
│                                             │
│     Stop missing deadlines.                 │
│     Start finishing things.                 │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  [G]  Continue with Google          │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Built for students, professionals,         │
│  and founders who have too much to do.      │
│                                             │
└─────────────────────────────────────────────┘
```

**Background:** Slow-moving radial gradient orbs (pure CSS, no JS):
```css
.login-bg {
  position: fixed;
  inset: 0;
  background: var(--color-bg-base);
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: orbDrift var(--duration) ease-in-out infinite alternate;
}

.orb-1 {
  width: 400px; height: 400px;
  top: -100px; left: -100px;
  background: var(--color-brand-primary);
  --duration: 12s;
}

.orb-2 {
  width: 300px; height: 300px;
  bottom: -80px; right: -80px;
  background: #8B5CF6;
  --duration: 15s;
  animation-delay: -5s;
}

@keyframes orbDrift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, 30px) scale(1.15); }
}
```

---

## 7. Micro-interactions & Effects

### 7.1 Complete Interaction Map

| Element | Trigger | Effect | Duration |
|---------|---------|--------|----------|
| Task card | Hover | Lift: translateY(-2px) + glow intensifies | 200ms |
| Task card | Click drag | Scale 1.02, rotate 1.5deg, shadow XL | 100ms |
| Complete button | Click | Scale pulse → green flash → card collapse | 500ms total |
| Risk badge | Score change | Number count-up animation | 600ms |
| Nav item | Hover | Indent left: padding-left increases | 200ms |
| Primary button | Hover | Lift + brand glow expands | 150ms |
| Primary button | Click | Scale 0.98 + ripple from click point | 150ms |
| Input | Focus | Border → indigo + 3px glow ring | 150ms |
| Voice button | Hold | Red pulse rings expand outward | continuous |
| AI card | Mount | Fade + translateY(12px) → normal | 300ms |
| Modal | Open | Scale 0.95 → 1, blur backdrop fades in | 250ms |
| Modal | Close | Scale 0.97, opacity 0 | 200ms |
| Toast | Appear | Slide from right with bounce | 300ms |
| Toast | Dismiss | Slide right, height collapse | 200ms |
| Progress bar | Value change | Width smooth transition | 600ms |
| Sidebar | Collapse | Width 240 → 64px, labels fade | 300ms |
| Chart | Mount | Draw from left, gradient fill rises | 800ms |
| Kanban drop | Release | Target column highlight fades | 200ms |
| Score stat | Page enter | Count from 0 to value, ease-out | 600ms |
| Streak counter | View | Number bounces on reach | 400ms bounce |

---

### 7.2 Scroll Behaviors

```css
/* Page scroll: smooth native */
html { scroll-behavior: smooth; }

/* Task list scroll area */
.task-list {
  overflow-y: auto;
  scroll-padding-top: 16px;

  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--color-border-default) transparent;
}

.task-list::-webkit-scrollbar { width: 4px; }
.task-list::-webkit-scrollbar-track { background: transparent; }
.task-list::-webkit-scrollbar-thumb {
  background: var(--color-border-default);
  border-radius: 2px;
}
.task-list::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-strong);
}
```

---

### 7.3 Focus Mode Overlay

When "Focus Mode" is activated — everything dims except the active task:

```css
.focus-mode-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 100;
  animation: focusOverlayIn 0.4s ease forwards;
}

@keyframes focusOverlayIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* The focused task card floats above */
.focus-task-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  width: min(600px, 90vw);
  animation: focusCardRise 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes focusCardRise {
  from { transform: translate(-50%, -40%); opacity: 0; }
  to   { transform: translate(-50%, -50%); opacity: 1; }
}
```

---

### 7.4 Countdown Timer

Live countdown on high-risk tasks:

```typescript
// Renders as: "11h 43m" → "43m 12s" → "12s" (escalates format as deadline approaches)
function formatCountdown(msRemaining: number): string {
  const hours   = Math.floor(msRemaining / 3_600_000);
  const minutes = Math.floor((msRemaining % 3_600_000) / 60_000);
  const seconds = Math.floor((msRemaining % 60_000) / 1000);

  if (hours > 24) return `${Math.floor(hours/24)}d ${hours%24}h`;
  if (hours >  1) return `${hours}h ${minutes}m`;
  if (minutes > 5) return `${minutes}m ${seconds}s`;
  // Critical: shows full seconds, text turns red
  return `${minutes}m ${seconds}s`;
}
```

```css
/* Countdown text styling by urgency */
.countdown[data-urgency="normal"]   { color: var(--color-text-secondary); }
.countdown[data-urgency="soon"]     { color: var(--color-risk-medium); }
.countdown[data-urgency="urgent"]   { color: var(--color-risk-high); }
.countdown[data-urgency="critical"] {
  color: var(--color-risk-critical);
  font-family: 'JetBrains Mono', monospace;
  animation: countdownFlicker 1s step-end infinite;
}

@keyframes countdownFlicker {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.7; }
}
```

---

## 8. Layout System & Grid

### 8.1 App Shell Layout

```css
.app-shell {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 100vh;
  overflow: hidden;
}

/* Collapsed sidebar */
.app-shell.sidebar-collapsed {
  grid-template-columns: 64px 1fr;
}

.main-content {
  overflow-y: auto;
  padding: var(--space-8) var(--space-8);
  max-width: 1200px;
}

/* Inner content grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-6);
}

/* Dashboard-specific layout */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
```

### 8.2 Card Grid

```css
/* Task cards in list view */
.task-list-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Stats row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-4);
}
```

---

## 9. Iconography & Visual Language

### 9.1 Icon System

```
Library: Lucide React (v0.383.0 — already in artifact environment)
Style:   2px stroke, rounded joins, 20×20 default
Color:   Inherits currentColor (matches text color)
```

### 9.2 Icon Usage Map

| Icon | Usage | Color |
|------|-------|-------|
| `<Zap />` | Critical/high risk tasks | var(--color-risk-critical) |
| `<AlertTriangle />` | Warnings, overdue | var(--color-risk-high) |
| `<Clock />` | Time remaining, deadlines | var(--color-text-secondary) |
| `<Sparkles />` | AI features, AI-generated content | var(--color-brand-glow) |
| `<CheckCircle2 />` | Task complete | var(--color-success) |
| `<Calendar />` | Calendar integration | var(--color-text-secondary) |
| `<Mic />` | Voice input | var(--color-text-secondary) |
| `<TrendingUp />` | Analytics | var(--color-success) |
| `<Target />` | Goals | var(--color-brand-primary) |
| `<LayoutGrid />` | Kanban view | var(--color-text-secondary) |
| `<List />` | List view | var(--color-text-secondary) |

### 9.3 Visual Symbols

```
◆  (solid diamond) → DeadlineZero logo mark
✦  (four-pointed star) → AI-generated content marker
⚡  (lightning) → Critical urgency (used sparingly)
●  (filled circle) → Status indicator / live dot
```

---

## 10. Responsive Design Specification

### 10.1 Breakpoints

```css
/* Mobile first */
--bp-sm:  480px;   /* Large phone */
--bp-md:  768px;   /* Tablet */
--bp-lg:  1024px;  /* Desktop */
--bp-xl:  1280px;  /* Wide desktop */
```

### 10.2 Mobile Layout Adaptations

```css
@media (max-width: 768px) {
  /* App shell: sidebar becomes bottom tab bar */
  .app-shell {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 64px;
  }

  .sidebar {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid var(--color-border-subtle);
    background: var(--color-bg-elevated);
    z-index: 50;
  }

  /* Nav labels hidden, only icons on mobile */
  .nav-item .nav-label { display: none; }

  /* Cards full width */
  .task-card { border-radius: var(--radius-md); }

  /* Chat: input pinned to bottom */
  .chat-input-bar {
    position: fixed;
    bottom: 64px;
    left: 0; right: 0;
    padding: var(--space-3) var(--space-4);
    background: var(--color-bg-elevated);
    border-top: 1px solid var(--color-border-subtle);
  }

  /* Content grid: single column */
  .content-grid {
    grid-template-columns: 1fr;
  }

  /* Stats row: 2 columns on mobile */
  .stats-row {
    grid-template-columns: 1fr 1fr;
  }
}
```

### 10.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Keep purely functional transitions */
  .input:focus { transition: border-color 0ms; }
}
```

---

## 11. Accessibility Specification

### 11.1 Focus Management

```css
/* Visible focus ring — always show on keyboard nav */
:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Never remove focus for accessibility */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 11.2 ARIA Patterns

```tsx
/* Risk badge with screen reader support */
<span
  className="risk-badge"
  role="status"
  aria-label={`Risk score: ${score} out of 100. ${riskLevel} risk.`}
>
  RISK: {score}
</span>

/* AI thinking indicator */
<div role="status" aria-live="polite" aria-label="AI is generating a response">
  <TypingIndicator />
</div>

/* Countdown timer */
<time
  dateTime={deadline.toISOString()}
  aria-label={`Due in ${formatCountdown(timeRemaining)}`}
>
  {formatCountdown(timeRemaining)}
</time>

/* Kanban drag-and-drop */
// @dnd-kit handles ARIA drag announcements automatically
// Configure: announcements.onDragStart, onDragOver, onDragEnd
```

---

## 12. Implementation Code Reference

### 12.1 Tailwind Config Extension

```typescript
// tailwind.config.ts
export default {
  content: ['./app/**/*.{tsx,ts}', './components/**/*.{tsx,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand:   { DEFAULT: '#6366F1', glow: '#818CF8', muted: '#312E81' },
        surface: { base: '#0A0A0F', elevated: '#111118', card: '#16161F',
                   raised: '#1C1C28', overlay: '#22223A' },
        risk:    { critical: '#EF4444', high: '#F97316',
                   medium: '#EAB308', low: '#22C55E' },
        ai:      { surface: '#0F1729', border: 'rgba(99,102,241,0.25)' },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'risk-pulse':     'riskPulse 2s ease-in-out infinite',
        'orb-drift':      'orbDrift 12s ease-in-out infinite alternate',
        'skeleton-sweep': 'skeletonSweep 1.5s ease-in-out infinite',
        'typing-bounce':  'typingBounce 1.2s ease-in-out infinite',
        'voice-ripple':   'voiceRipple 1.5s ease-out infinite',
      },
      boxShadow: {
        'glow-brand':    '0 0 24px rgba(99,102,241,0.30), 0 0 48px rgba(99,102,241,0.10)',
        'glow-critical': '0 0 20px rgba(239,68,68,0.20), 0 0 40px rgba(239,68,68,0.08)',
        'glow-high':     '0 0 20px rgba(249,115,22,0.16), 0 0 40px rgba(249,115,22,0.06)',
        'glow-medium':   '0 0 16px rgba(234,179,8,0.14), 0 0 32px rgba(234,179,8,0.05)',
        'glow-low':      '0 0 16px rgba(34,197,94,0.12), 0 0 32px rgba(34,197,94,0.04)',
        'glow-ai':       '0 0 32px rgba(99,102,241,0.12), inset 0 1px 0 rgba(99,102,241,0.15)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
};
```

### 12.2 Global CSS Base

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  font-family: 'Inter', sans-serif;
  background: #0A0A0F;
  color: #F1F5F9;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
}

/* Remove default button styles globally */
button { font-family: inherit; cursor: pointer; border: none; background: none; }
```

### 12.3 Key Framer Motion Patterns

```typescript
// components/shared/AnimatedCard.tsx
import { motion } from 'framer-motion';

export const cardVariants = {
  hidden:  { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1,
             transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -8, scale: 0.97,
             transition: { duration: 0.2 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// Usage:
<motion.ul variants={staggerContainer} initial="hidden" animate="visible">
  {tasks.map(task => (
    <motion.li key={task.id} variants={cardVariants} layout>
      <TaskCard task={task} />
    </motion.li>
  ))}
</motion.ul>
```

---

*Frontend Design Specification v1.0.0*
*DeadlineZero | Vibe2Ship Hackathon 2026*
*Status: APPROVED — READY TO IMPLEMENT*
