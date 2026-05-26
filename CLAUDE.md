# CLAUDE.md
## Project Context

This repository contains a SvelteKit prototype for the Prototyping module.

**Project name:** StudyStreak – Learning Habit Tracker

The goal of the application is to help students build consistent learning habits by logging study sessions, visualising progress, and motivating them through gamification (streaks, levels, badges). The project is developed as an individual university project at ZHAW and must follow the phases from the Prototyping module:

- Understand / Define
- Sketch (Crazy 8s)
- Decide
- Prototype
- Validate

The focus is not only on implementation, but also on documenting the process, decisions, artefacts, evaluation, and AI usage.

---

## Product Goal

The application should support students who want to:

- log a study session in under 30 seconds
- track learning time per module (Prototyping, ITPM, Statistics, English)
- see their current streak and level progress
- earn badges for consistent learning
- add a daily reflection (mood + notes)
- view weekly/monthly statistics

The app should stay **simple, fast to use, and motivating**. Do not over-engineer the prototype.

---

## Target Users

**Primary target users:**
- ZHAW students in semester 1–3 (Informatics, Business Informatics)
- Students managing multiple modules simultaneously
- People who benefit from habit-tracking with gamification (like Duolingo)

**User needs:**
- Log sessions retrospectively (after studying, not during)
- Quick input without opening a keyboard where possible
- Immediate visual feedback (streak update, badge notification)
- Module-specific time breakdown
- Mobile-friendly usage (on-the-go)

---

## Core Workflows

The prototype must support these core workflows:

### Workflow 1: Log a Study Session (Main Workflow)
1. User opens the dashboard.
2. User taps "+ Lernsession erfassen".
3. User selects module chip (e.g. Statistik).
4. User selects duration preset (15/30/45/60 min) or enters custom time.
5. User optionally adds topic text and focus rating (1–5 stars).
6. User taps "Session speichern" → confirmation screen with streak update.
7. User returns to dashboard and sees the new session.

### Workflow 2: Edit / Delete a Session
1. User opens the dashboard.
2. User clicks on a session card → navigates to /sessions/[id].
3. User edits fields and saves, or deletes the session.

### Workflow 3: Daily Reflection
1. User taps "Reflexion" in bottom navigation.
2. User selects mood rating (1–5).
3. User fills in "Was lief gut?" and "Was will ich verbessern?".
4. User saves → upsert (one entry per day).

### Workflow 4: View Statistics
1. User taps "Statistik" in bottom navigation.
2. User selects time filter (Woche / Monat / Gesamt).
3. User reads bar chart (learning time per day) and module breakdown.

---

## Scope

### Minimum Scope

Implement a functional SvelteKit prototype with:
- multiple pages/routes
- session logging (create, edit, delete)
- session overview on dashboard
- stored data loaded and displayed from MongoDB
- documentation in README.md
- deployed online version
- screenshots of the finished app
- declared AI usage

### Recommended Scope (implemented)

- Dashboard with KPI tiles (streak, level, sessions, weekly minutes)
- Session logging with module chips and duration presets
- Session detail edit and delete
- Daily reflection (mood + text, upsert per day)
- Statistics page with SVG bar chart and module breakdown
- Gamification: streak algorithm, level system, 7 badges
- Badge gallery
- Server-side validation with field-level error display
- Progressive Enhancement (form actions work without JavaScript)

### Out of Scope

Avoid unless minimum scope is already stable:
- Live Pomodoro timer
- Social features (friends, leaderboards)
- Push notifications
- Custom module creation (predefined modules are sufficient for prototype)
- Authentication / login
- AI-powered study recommendations
- Native mobile app

---

## Technology Stack

**Required stack:**
- SvelteKit 2 (Svelte 4)
- HTML / CSS / JavaScript
- Visual Studio Code with GitHub Copilot
- Git and GitHub
- Vite as build tool

**Additional tools used:**
- MongoDB Atlas (Free Tier M0) — cloud-hosted database
- @sveltejs/adapter-netlify — deployment
- Figma — mockup and prototyping (Übung 10)

**Do not introduce** unnecessary frameworks or UI libraries. All styling uses handwritten CSS with CSS variables.

---

## Suggested Routes

```
src/routes/
  +layout.svelte          ← App header, bottom nav, slot
  +layout.server.js       ← Global stats for header (streak, level)
  +page.svelte            ← Dashboard (last sessions, KPI tiles)
  +page.server.js
  +error.svelte
  sessions/
    new/
      +page.svelte        ← Log session (module chips, duration presets)
      +page.server.js
    [id]/
      +page.svelte        ← Session detail + edit + delete
      +page.server.js
  stats/
    +page.svelte          ← Statistics (bar chart, module breakdown, filter)
    +page.server.js
  badges/
    +page.svelte          ← Badge gallery
    +page.server.js
  reflection/
    +page.svelte          ← Daily reflection (upsert per day)
    +page.server.js
```

---

## Data Model

### sessions collection
```
{
  _id: ObjectId,
  module: String,          // "prototyping" | "itpm" | "statistik" | "englisch"
  duration: Number,        // minutes
  date: Date,
  topic: String?,          // optional free text
  focus: Number?,          // 1–5, optional
  notes: String?,          // optional
  createdAt: Date,
  updatedAt: Date
}
```

### reflections collection
```
{
  _id: ObjectId,
  dateKey: String,         // "YYYY-MM-DD", unique index → one per day
  mood: Number,            // 1–5
  wentWell: String?,       // optional
  improve: String?,        // optional
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**No separate users collection** — the prototype does not require authentication.

**Streak / Level / Stats** are calculated at request time from the sessions collection (no caching in DB) to ensure a single source of truth.

---

## UI Guidelines

**Design principles:**
- Mobile-first layout (max-width 480px)
- Bottom navigation with 4 tabs: Home, Statistik, Badges, Reflexion
- Chip/pill buttons for module and duration selection (no keyboard required)
- Large primary action button always visible
- Gamification elements prominent (streak in header, level progress bar)
- Consistent card-based layout for sessions and badges
- Readable font sizes, consistent spacing
- Immediate feedback after save (confirmation screen with streak update)

**Colour system (CSS variables):**
- Primary blue: `#3A5ACC`
- Streak orange: `#FF8C00`
- Success green: `#28A745`
- Module colours: Prototyping = violet, ITPM = green, Statistics = yellow, English = red

**Navigation:**
- Header: App title + streak pill
- Bottom Nav: Home | Statistik | Badges | Reflexion
- Back navigation: "← Zurück" link in header row

---

## Gamification Logic (src/lib/utils/gamification.js)

- **Streak:** Count consecutive days (today or yesterday must have a session). Reset to 0 if last session is older than yesterday.
- **Level:** 1 level per 300 minutes of total study time. Level = floor(totalMinutes / 300) + 1.
- **Badges (7 total):** Rule-based, e.g. "3-Tage-Streak", "10 Stunden", "50 Sessions".
- All calculations happen on the server at request time — no persistence needed.

---

## Validation Rules (src/lib/utils/validation.js)

### validateSession
- module: required, must be in allowed list
- duration: required, number 1–480
- date: required, not in future
- topic: optional, max 200 chars
- focus: optional, 1–5
- notes: optional, max 500 chars

### validateReflection
- mood: required, 1–5
- wentWell: optional, max 1000 chars
- improve: optional, max 1000 chars

---

## Implementation Rules

Always prioritise:
1. A stable working prototype
2. Fast session logging (core promise: < 30 seconds)
3. Clear user workflows
4. Simple, readable code
5. Good documentation

Avoid:
- Unnecessary complexity or dependencies
- Features not visible in the final walkthrough
- Unfinished advanced features
- Hardcoded secrets or connection strings (always use `$env/dynamic/private`)

---

## Environment Variables

Required in `.env` (copy from `.env.example`):

```
MONGODB_URI=mongodb+srv://...   # MongoDB Atlas connection string
```

Must also be set in Netlify environment variables for production.

---

## Development Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:5173
npm run build        # production build
npm run preview      # preview production build locally
npm run check        # Svelte type-check (run after editing .svelte files)
```

---

## Project Requirements to Keep in Mind

The project must satisfy:
- Minimum scope from exercises fulfilled and documented
- App must be online accessible (Netlify)
- GitHub repository must contain code and documentation
- Evaluation with users must be conducted and documented (docs/usability-test-skript.md)
- Legal conditions (copyright) must be respected
- AI usage must be declared transparently in README section 6

**Assessment-relevant focus areas:**
- Core functionality and technical quality
- Usability and clear workflows
- Methodical process and artefacts (Crazy 8s, Figma mockup)
- Evaluation and derived improvements
- Documentation and video walkthrough
- Repository hygiene and meaningful commits

---

## Documentation Requirements

The README.md must follow the provided course template with:
1. Ausgangslage
2. Lösungsidee
3. Vorgehen & Artefakte (Understand/Define, Sketch, Decide, Prototype, Validate)
4. Erweiterungen
5. Projektorganisation
6. KI-Deklaration
7. Anhang

**Important content:**
- Screenshots of the finished app (under docs/screenshots/)
- Explanation of design decisions
- End-to-end workflow documentation
- Evaluation plan and results (docs/usability-test-skript.md)
- Improvements derived from evaluation
- Prompt approach and AI tool usage

---

## Git and Repository Rules

Use clear, imperative commit messages, e.g.:
- `init sveltekit + mongodb prototype`
- `add session logging with module chips`
- `add gamification: streak, level, badges`
- `add statistics page with svg bar chart`
- `fix streak calculation around midnight`
- `docs: add usability test script`

Keep commits small and focused. Push after each meaningful step.

---

## Definition of Done

A feature is done when:
- It works in the browser
- It supports the required workflow
- Basic user input is handled clearly (validation, error messages)
- Navigation is not broken
- It is committed to Git

The project is done when:
- All core workflows are implemented
- Data can be created, edited, deleted, and displayed
- The app is deployed online
- README.md is complete with all required sections
- Evaluation is documented with findings and improvements
- Screenshots are included in README
- Video walkthrough can demonstrate all workflows
- AI usage is declared
