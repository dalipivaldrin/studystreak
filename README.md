# Projektdokumentation - StudyStreak

> **Live-Demo:** https://clinquant-biscochitos-054278.netlify.app
> **Repository:** https://github.com/dalipivaldrin/studystreak

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
   1. [Understand & Define](#31-understand--define)
   2. [Sketch](#32-sketch)
   3. [Decide](#33-decide)
   4. [Prototype](#34-prototype)
   5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Ausgangslage

- **Problem:** Studierende im ersten Studienjahr an der ZHAW müssen parallel mehrere Module (Prototyping, ITPM, Statistik, Englisch u. a.) bearbeiten. Ein häufig beobachtetes Muster: In den ersten Wochen des Semesters wird wenig konsistent gelernt, kurz vor den Prüfungen entsteht eine chaotische, stressige Last-Minute-Phase. Die Lernpsychologie (Spacing Effect nach Ebbinghaus) zeigt, dass verteiltes Lernen signifikant bessere Langzeitergebnisse liefert als Cramming – dieses Wissen wird jedoch selten umgesetzt, weil ein einfaches, niedrigschwelliges Werkzeug fehlt, um Lerngewohnheiten zu etablieren und kleine tägliche Erfolge sichtbar zu machen.
- **Ziele:**
  - Regelmässiges, verteiltes Lernen durch Gamification-Elemente fördern (Streaks, Badges, XP, Level)
  - Lernsessions in unter 30 Sekunden erfassen können
  - Lernverhalten über Zeit sichtbar machen (Statistiken, Wochenziele pro Modul)
  - Intrinsische Motivation durch sichtbaren Fortschritt und Sofortbelohnung stärken
- **Primäre Zielgruppe:** ZHAW-Studierende im 1.–3. Semester Informatik und Wirtschaftsinformatik, die mehrere Module parallel betreuen und ihren Lernfortschritt strukturieren möchten.
- **Weitere Stakeholder:** Selbstlernende ausserhalb der Hochschule (Sprachkurse, Weiterbildung), die von Habit-Tracking profitieren.

---

## 2. Lösungsidee

- **Kernfunktionalität:**
  - **Session-Logging:** Formular mit Modul, Datum, Dauer (Minuten), Thema, Fokus-Rating (1–5) und optionalen Notizen. Vollständige CRUD-Operationen (Anlegen, Bearbeiten, Löschen).
  - **Modul-Verwaltung:** Vordefinierte Module mit Farbcodes (Prototyping, ITPM, Statistik, Englisch), später erweiterbar durch eigene Module.
  - **Wöchentliche Ziele pro Modul:** z. B. „mindestens 180 Minuten Statistik pro Woche", inklusive Status (aktiv / erledigt).
  - **Tägliche Reflexion:** Stimmung (1–5), „Was lief gut?" und „Was will ich verbessern?". Genau ein Eintrag pro Tag (Upsert).
  - **Dashboard:** KPI-Kacheln mit aktuellem Streak, Wochenminuten, Level mit Fortschrittsbalken, Anzahl Sessions und zuletzt erfassten Sessions.
  - **Statistik-Seite:** Balkendiagramm der letzten 14 Tage, Minuten pro Modul der letzten 30 Tage, Badge-Galerie mit erreichten und noch gesperrten Auszeichnungen.
  - **Gamification:** Streak-Logik (Tage in Folge), Level-System (alle 300 Minuten Lernzeit ein neues Level), sieben regelbasierte Badges (z. B. „3-Tage-Streak", „10 Stunden Lernzeit", „50 Sessions").
- **Annahmen:** Wenn das Dokumentieren fast nichts kostet (< 30 Sekunden) und der Fortschritt sofort sichtbar wird, entsteht eine stabile Lerngewohnheit.
- **Abgrenzung:**
  - Kein Live-Pomodoro-Timer (andere Apps lösen das besser)
  - Kein soziales Netzwerk (keine Freundeslisten, keine öffentlichen Rankings)
  - Keine Task-Management-App (StudyStreak denkt in Sessions, nicht in einzelnen Tasks)

| Tool | Fokus | Schwäche für unsere Zielgruppe |
|------|-------|-------------------------------|
| Notion | Sehr flexibler Workspace | Keine Lern-Spezialisierung, hohe Einstiegshürde |
| Habitica | Allgemeines Habit-Tracking mit Gamification | Kein Fach- oder Modulbezug |
| Forest / Flora | Live-Timer während des Lernens | Löst nicht das Reflektieren & Dokumentieren nach der Session |
| **StudyStreak** | Retrospektives Logging mit Modulbezug | – |

---

## 3. Vorgehen & Artefakte

Die Durchführung erfolgt phasenbasiert nach der im Modul behandelten Methodik (Design Sprint kombiniert mit Human-Centered Design, ISO 9241-210).

### 3.1 Understand & Define

- **Zielgruppenverständnis:**
  - Proto-Persona: Valdrin, 22 Jahre, Informatik-Student im 1. Semester, muss parallel mehrere Module betreuen. Lernt unregelmässig, vergisst oft was er wann gelernt hat. Nutzt bereits Apps wie Duolingo und schätzt den Streak-Mechanismus. Wünscht sich eine schnelle, nicht ablenkende Lösung.
  - Recherche: Kurz-Interviews und Analyse existierender Tools (Notion, Habitica, Forest/Flora). Habit-Tracking-Apps sind besonders erfolgreich, wenn sie kurzfristige Belohnungen mit langfristigen Zielen kombinieren (Gamification-Literatur).
- **Wesentliche Erkenntnisse:**
  - Studierende wollen eine möglichst schnelle Erfassung (< 30 Sekunden) – die App soll nicht während des Lernens stören
  - Sichtbarer Fortschritt (Streak, XP) erhöht die Motivation nachweislich
  - Modulbezogene Auswertungen sind relevanter als generelle Zeitstatistiken
  - Retrospektives Logging (nach der Session) ist für den Alltag geeigneter als ein Live-Timer

### 3.2 Sketch

- **Variantenüberblick (Crazy 8s):** Im Rahmen der Design-Sprint-Methodik (Day 2) wurden acht möglichst unterschiedliche Varianten des Kernfeatures „Lernsession in < 30 Sekunden erfassen" skizziert (je 1 Minute pro Variante):

| # | Variante | Kurzbeschreibung |
|---|----------|-----------------|
| 1 | Klassisches Formular | Modul-Dropdown, Zahlen-Input für Dauer, Fokus-Slider, Speichern-Button. Vertraut, aber viele Taps. |
| 2 | **Preset-Tap (3 Taps)** | Modul-Chips (Favoriten zuerst), Dauer-Chips (15/30/45/60), Thema/Fokus optional, Speichern. ≤ 3 Taps für den Happy Path. |
| 3 | Sprach-Eingabe | Mikrofon-Screen: Spracheingabe wird per Speech-to-Text geparst und bestätigt. |
| 4 | Live-Timer mit Auto-Log | Pomodoro-artiger Timer, der nach Stop automatisch eine Session anlegt. |
| 5 | Chat-Bot | Konversations-UI: Bot fragt nacheinander nach Modul, Dauer und Fokus. |
| 6 | Swipe-Karten | Pro Attribut eine Kartenspalte, die durchgewischt wird (Tinder-Style). |
| 7 | Kalender-Drag | Nutzer zieht einen Block im Tageskalender auf – Start/Ende = Dauer. |
| 8 | Home-Widget | iOS-Widget mit Quick-Log-Tasten, kein App-Öffnen nötig. |

- **Skizzen:** Crazy 8s auf Papier (Abb. 1) sowie ausgearbeitete Happy-Path-Skizze der gewählten Variante 2 (Abb. 2) – drei aufeinanderfolgende Mobile-Screens, jeder Pfeil entspricht einem Tap.

### 3.3 Decide

- **Gewählte Variante & Begründung:** **Variante 2 – Preset-Tap (3 Taps)**

  Die Preset-Tap-Variante erfüllt das Kernversprechen am kompromisslosesten:
  - **Geschwindigkeit:** Modul-Chip + Dauer-Chip + Speichern = 3 Taps, klar unter 30 Sekunden
  - **Retrospektiv:** Kein Timer, keine Push-Notifikation während des Lernens – passt zur bewussten Entscheidung, dass die App nicht stören soll
  - **Gamification-Anschluss:** Nach dem Speichern wird sofort Streak-/Badge-Rückmeldung auf einem eigenen Screen angezeigt – das ist der motivationale Kern
  - **Mobile-first:** Keine Eingabefelder, die die Tastatur aufziehen – alles läuft über Chips und Sterne, auch einhändig bedienbar
  - **Abgelehnte Varianten:** V3 (Sprache) – in Bibliotheken unrealistisch; V4 (Live-Timer) – widerspricht dem retrospektiven Konzept; V6/V7 (Swipe, Kalender) – zu viele Interaktionen für < 30 s; V8 (Widget) – für MVP-Phase zu früh

- **End-to-End-Ablauf:**
  1. Nutzer öffnet App → sieht Dashboard (Streak, letzte Sessions, Wochenziel)
  2. Tippt auf „+ Lernsession erfassen"
  3. Wählt Modul-Chip (Favoriten zuerst, sortiert nach Häufigkeit)
  4. Wählt Dauer-Chip (15 / 30 / 45 / 60 min oder eigene Zeit)
  5. Gibt optional Thema (Freitext) und Fokus-Level (Sternebewertung 1–5) an
  6. Tippt „Session speichern" → Bestätigungsscreen mit Streak +1, Badge und XP-Anzeige
  7. Alternativ: Nutzer wechselt über Bottom Nav zum Stats-Tab → Lernzeit-Auswertung nach Woche/Monat/Gesamt

- **Mockup:**
  - 🔗 [Figma Prototyp](https://www.figma.com/design/j1DknvMCZSoX9RgQLrpkPB/StudyStreak-%E2%80%93-Mockup-%C3%9Cbung-10?node-id=0-1&t=qSqyMOvAkoSqCBtx-1)
  - Der Prototyp umfasst sechs verlinkte Screens: Home, Modul wählen, Dauer & Details, Gespeichert, Statistik und Statistik (Stats-Tab)

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.

- **Informationsarchitektur:**
  - Bottom Navigation mit 4 Tabs: **Home**, **Stats**, **Badges**, **Reflexion**
  - Hauptflow (Session erfassen) wird vom Home-Tab über den CTA-Button gestartet und führt auf eine eigene Route `/sessions/new`
  - Stats-Tab öffnet direkt die Statistik-Ansicht mit Woche/Monat/Gesamt-Filter
  - Rücknavigation über „← Zurück"-Link in der Headerzeile oder über die Bottom Navigation
  - Detail-Ansicht (`/sessions/[id]`) erlaubt In-Place-Bearbeitung und Löschung einer Session

- **User Interface Design:**

| Screen | Beschreibung |
|--------|-------------|
| **Home / Dashboard** | Streak, Sessions gesamt, Level und Wochenfortschrittsbalken. Liste der letzten 5 Sessions. Grosser CTA-Button „+ Lernsession erfassen" am unteren Rand. |
| **Session erfassen** | Modul-Chips (farblich), Dauer-Presets (15/30/45/60 min), optionaler Freitext und Sternebewertung 1–5 für Fokus. |
| **Session gespeichert** | Erfolgsmeldung mit Session-Detailkarte inkl. Modul-Farbcode, Dauer, Fokus und Notizen. Buttons für Löschen und neue Session. |
| **Statistik** | Tab-Auswahl Woche / Monat / Gesamt. Balkendiagramm der Lernzeit pro Wochentag. Gesamtlernzeit im gewählten Zeitraum. Modul-Balken mit Farbcode. |
| **Badges** | Galerie aller 7 Badges; erreichte farbig, gesperrte mit reduzierter Sättigung. Zähler „X / 7 erreicht". |
| **Reflexion** | Tägliche Reflexion mit Stimmungs-Rating (1–5) und zwei Textfeldern. Upsert pro Tag. Liste der letzten Reflexionen darunter. |

**Screenshots der fertigen App:**

**Home / Dashboard**
![Home Screen](docs/screenshots/home.png)
*Dashboard mit Streak-Pill, KPI-Kacheln (Sessions, Level, Wochenminuten), Fortschrittsbalken und Liste der letzten Sessions.*

**Session erfassen**
![Session erfassen](docs/screenshots/session-new.png)
*Modul-Chips in Modulfarben, Dauer-Presets, optionaler Freitext und Fokus-Sternebewertung. Grüner Speichern-Button immer sichtbar.*

**Session gespeichert**
![Session gespeichert](docs/screenshots/session-saved.png)
*Erfolgsmeldung nach dem Speichern mit Session-Details, Streak-Anzeige und CTA-Button zum Dashboard.*

**Statistik**
![Statistik](docs/screenshots/stats.png)
*Balkendiagramm der Lernzeit pro Tag, filterbar nach Woche / Monat / Gesamt. Modul-Aufschlüsselung mit Farbcode.*

**Badges**
![Badges](docs/screenshots/badges.png)
*Badge-Galerie mit 7 Auszeichnungen. Erreichte Badges farbig, gesperrte mit Graustufen-Filter.*

**Reflexion**
![Reflexion](docs/screenshots/reflection.png)
*Tägliche Reflexion mit Stimmungs-Rating und zwei Freitextfeldern. Nur ein Eintrag pro Tag möglich (Upsert).*

> **Hinweis:** Die Screenshots werden nach dem nächsten Deployment unter `docs/screenshots/` im Repository hinterlegt.

- **Designentscheidungen:**
  - **Mobile-First:** Die App ist auf Smartphone-Layouts (max-width 480 px) optimiert und nutzt Bottom Navigation, da Lernen mobil und spontan stattfindet
  - **Bottom Navigation:** Etabliertes Muster für mobile Apps; alle Hauptbereiche mit dem Daumen erreichbar (Thumb-Zone-freundlich)
  - **Farbkonzept:** Blau (`#3A5ACC`) für primäre Aktionen und App-Header, Orange (`#FF8C00`) für Streak-Badge, Grün (`#28A745`) für Erfolg/Speichern. Pro Modul eine eigene Akzentfarbe (Prototyping = violett, ITPM = grün, Statistik = gelb, Englisch = rot).
  - **Pill-/Chip-Buttons** für Modulwahl: schnelles Antippen ohne Tastatur, auch einhändig bedienbar
  - **Gamification prominent:** Streak immer im Header sichtbar; Erfolgsmeldung nach dem Speichern als Banner auf der Detailseite
  - **Statistik-Tab:** Balkendiagramm (handgezeichnetes SVG, keine externe Lib) mit Woche/Monat/Gesamt-Filter gibt schnelle Übersicht ohne tiefe Navigation
  - **Progressive Enhancement:** Alle CRUD-Aktionen funktionieren über SvelteKit Form Actions – auch ohne JavaScript bedienbar
  - **Offene Punkte für weiteres Prototyping:** Verhalten bei fehlendem Internet (Optimistic UI), eigener Erfolgs-Screen mit Badge-Animation, Wochenziel-Konfiguration pro Modul, eigene Module anlegen können

#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:** SvelteKit 2 (Svelte 4) für Frontend & Backend; SvelteKit Form Actions mit Progressive Enhancement (`use:enhance`) für robuste CRUD-Abläufe; handgeschriebenes CSS mit CSS-Variablen für volle Designkontrolle.
- **Tooling:** Figma (Mockup & Prototyping), VS Code mit GitHub Copilot, Vite als Build-Tool, ESM-Modules.
- **Struktur & Komponenten:**

```
studystreak/
├─ src/
│  ├─ app.css              ← Globales Stylesheet (Design-Tokens als CSS-Variablen)
│  ├─ app.html             ← HTML-Shell
│  ├─ hooks.server.js      ← Server-Hook: Request-Logging
│  ├─ lib/
│  │  ├─ constants.js      ← Module, Dauer-Presets, Badge-Definitionen
│  │  ├─ server/db.js      ← MongoDB-Client (gepoolt, Singleton)
│  │  ├─ utils/
│  │  │  ├─ gamification.js  ← Streak-, Level-, Stats-Berechnung
│  │  │  └─ validation.js    ← Server-Validierung für Form-Inputs
│  │  └─ components/
│  │     ├─ BottomNav.svelte
│  │     ├─ StreakDisplay.svelte
│  │     ├─ StatBadge.svelte
│  │     ├─ SessionCard.svelte
│  │     ├─ LevelProgress.svelte
│  │     ├─ BadgeCard.svelte
│  │     └─ BarChart.svelte
│  └─ routes/
│     ├─ +layout.svelte       ← App-Header, Bottom-Nav, Slot
│     ├─ +layout.server.js    ← Globale Stats-Daten für Header
│     ├─ +page.svelte         ← Dashboard
│     ├─ +page.server.js
│     ├─ +error.svelte
│     ├─ sessions/
│     │  ├─ new/              ← Session erfassen (POST → DB → Redirect)
│     │  └─ [id]/             ← Detail + Edit + Delete
│     ├─ stats/               ← Auswertung (Woche/Monat/Gesamt)
│     ├─ badges/              ← Badge-Galerie
│     └─ reflection/          ← Tägliche Reflexion (Upsert)
└─ static/
   ├─ favicon.svg
   └─ robots.txt
```

- **Daten & Schnittstellen:**

MongoDB Atlas (Free-Tier M0). Zwei Collections:

| Collection | Felder |
|---|---|
| `sessions` | `_id`, `module` (id), `duration` (min), `date`, `topic?`, `focus? (1–5)`, `notes?`, `createdAt`, `updatedAt` |
| `reflections` | `_id`, `dateKey` (YYYY-MM-DD, unique), `mood (1–5)`, `wentWell?`, `improve?`, `date`, `createdAt`, `updatedAt` |

Reflexionen werden über einen Upsert mit `dateKey` als natürlichem Schlüssel gespeichert – damit gibt es pro Tag genau einen Eintrag.

Alle Datenbankzugriffe laufen ausschliesslich serverseitig (`+page.server.js` / Form Actions). Der MongoDB-Client wird als Singleton-Promise gehalten und in Netlify-Functions zwischen Aufrufen wiederverwendet (Cold-Start-Optimierung).

- **Validierung:** Jede Form Action validiert die Eingaben über `validateSession` / `validateReflection` (Pflichtfelder, Längenlimits, Wertebereiche, Datumsplausibilität). Fehler werden über `fail(400, { errors, values })` an die Seite zurückgegeben und dort feldweise angezeigt; die eingegebenen Werte bleiben im Formular erhalten.

- **Deployment:** Netlify mit `@sveltejs/adapter-netlify`. Konfiguration in `netlify.toml`; Build-Command `npm run build`, Publish-Verzeichnis `build`. Umgebungsvariablen werden im Netlify-Dashboard hinterlegt. **URL: https://clinquant-biscochitos-054278.netlify.app**

- **Lokale Entwicklung:**

```bash
# 1. Repo klonen
git clone https://github.com/dalipivaldrin/studystreak
cd studystreak

# 2. Abhängigkeiten installieren
npm install

# 3. .env anlegen (Vorlage: .env.example)
cp .env.example .env
# MONGODB_URI eintragen

# 4. Dev-Server starten
npm run dev
# → http://localhost:5173
```

- **Besondere Entscheidungen:**
  - Handgeschriebenes CSS mit CSS-Variablen statt Framework → volle Kontrolle über Look-and-Feel, kein Build-Overhead
  - MongoDB statt SQLite aus Deployment-Gründen (Serverless-Kompatibilität, Netlify hat kein persistentes Filesystem)
  - Form Actions statt Client-side Fetch → funktioniert auch ohne JavaScript (Progressive Enhancement) und reduziert Komplexität
  - Streak/Level/Stats werden bei jedem Request neu berechnet, nicht in der DB persistiert → eine einzige Quelle der Wahrheit (die Sessions), keine Inkonsistenzen möglich

### 3.5 Validate

**URL der getesteten Version:** https://clinquant-biscochitos-054278.netlify.app (Commit `513897b`, getestet am 14. Mai 2026)

#### Planung

**Ziel:** Überprüfen, ob der Kernworkflow „Lernsession in unter 30 Sekunden erfassen" reibungslos funktioniert und ob die App die gesetzten Usability-Ziele erfüllt.

**Testmethode:** Thinking-Aloud-Usability-Test (moderiert, remote/in person)

**Teilnehmende:** 3 ZHAW-Studierende (1.–3. Semester), die die App zuvor nicht kannten.

**Aufgaben (Tasks):**

| Task | Beschreibung | Erfolgskriterium |
|------|-------------|-----------------|
| T1 | Erfasse eine Lernsession für das Modul „Statistik" mit 45 Minuten | Session erscheint auf dem Dashboard |
| T2 | Bearbeite die eben erfasste Session und ändere die Dauer auf 60 Minuten | Geänderte Dauer wird korrekt angezeigt |
| T3 | Trage eine tägliche Reflexion mit Stimmung 4 ein | Reflexion wird in der Historie angezeigt |
| T4 | Finde heraus, wie viele Minuten du diese Woche gelernt hast | Statistik-Seite wird gefunden und korrekt gelesen |

**Messgrössen:**
- Task Completion Rate (%) – hat die Person die Aufgabe ohne Hilfe abgeschlossen?
- Time on Task (Sekunden) – wie lange hat T1 gedauert?
- Beobachtete Fehler / Stolperstellen
- SUS-Score (System Usability Scale, 10 Fragen, 0–100)

#### Durchführung

Die Tests wurden am **14. Mai 2026** durchgeführt (3 Testsitzungen à ca. 20 Minuten).

**Setup:** Smartphone-Simulation im Browser (Chrome DevTools, iPhone-Viewport 390 px). Testsession wurde per Loom aufgezeichnet. Moderator beobachtete und notierte Beobachtungen ohne einzugreifen.

**Teilnehmende:**

| ID | Semester | Erfahrung mit Habit-Apps |
|----|----------|--------------------------|
| P1 | 1. Sem. Informatik | Duolingo |
| P2 | 2. Sem. Wirtschaftsinformatik | keine |
| P3 | 3. Sem. Informatik | Habitica früher |

#### Auswertung

**Task Completion Rate:**

| Task | P1 | P2 | P3 | Ø |
|------|----|----|-----|---|
| T1 – Session erfassen | ✅ | ✅ | ✅ | 100 % |
| T2 – Session bearbeiten | ✅ | ⚠️ | ✅ | 83 % |
| T3 – Reflexion | ✅ | ✅ | ✅ | 100 % |
| T4 – Stats lesen | ✅ | ✅ | ⚠️ | 83 % |

> ⚠️ = abgeschlossen, aber mit merklicher Verzögerung oder Umweg

**Time on Task (T1 – Session erfassen):**

| P1 | P2 | P3 | Ø |
|----|----|----|---|
| 22 s | 31 s | 19 s | **24 s** |

→ Kernziel „< 30 Sekunden" wurde im Durchschnitt erreicht.

**SUS-Scores:**

| P1 | P2 | P3 | Ø |
|----|----|----|---|
| 82.5 | 72.5 | 87.5 | **80.8** |

> SUS ≥ 68 gilt als „gut", ≥ 80 als „sehr gut". Der Durchschnitt von 80.8 liegt im guten bis sehr guten Bereich.

**Wesentliche Beobachtungen:**

| # | Beobachtung | Schwere | Betroffen |
|---|-------------|---------|-----------|
| O1 | P2 suchte nach einem „Zurück"-Button nach dem Speichern, fand den Link „← Zurück" erst nach ~8 Sekunden – zu wenig sichtbar | Mittel | Session-gespeichert-Screen |
| O2 | P2 versuchte beim Bearbeiten einer Session zuerst, auf die Session-Karte auf dem Dashboard zu klicken – erwartete Direktnavigation | Mittel | Session-Karte auf Home |
| O3 | P3 wusste zunächst nicht, dass der Statistik-Tab auch Wochenziele enthält – Tab-Label „Stats" zu generisch | Gering | Bottom Nav |
| O4 | Alle 3 Testpersonen haben T1 ohne Hilfe abgeschlossen und fanden die Chip-Auswahl intuitiv | Positiv | Session-Formular |
| O5 | P1 kommentierte spontan: „Der Streak-Counter motiviert wirklich" | Positiv | Dashboard |

#### Abgeleitete Verbesserungsvorschläge

| Priorität | Massnahme | Begründung (Beobachtung) |
|-----------|-----------|--------------------------|
| Hoch | Auf dem „Session gespeichert"-Screen einen deutlicheren CTA-Button „→ Zum Dashboard" einfügen (statt nur Link „← Zurück") | O1 |
| Hoch | Session-Karte auf dem Dashboard klickbar machen → direkt zur Detail-/Bearbeitungs-Ansicht | O2 |
| Mittel | Tab-Label von „Stats" zu „Statistik" ändern und Tooltip / Subtext ergänzen | O3 |
| Gering | Wochenziel-Widget auch auf der Stats-Seite noch weiter oben platzieren | O3 |
| Gering | Optional: kurzes Onboarding-Overlay beim ersten App-Start (1–2 Screens) um neue Nutzende zu orientieren | Allgemein |

**Zusammenfassung der Resultate:** Der Kernworkflow funktioniert gut und das Ziel < 30 Sekunden wurde im Durchschnitt erreicht (Ø 24 s). Der SUS-Score von 80.8 zeigt eine gute bis sehr gute Usability. Die zwei mit „Hoch" priorisierten Beobachtungen (O1, O2) wurden direkt im Anschluss als GitHub-Issues angelegt und umgesetzt (siehe Kap. 4 und Kap. 5).

---

## 4. Erweiterungen [Optional]

Folgende Erweiterungen gehen über den geforderten Mindestumfang (1 Hauptworkflow + Übersicht + Erfassen) hinaus:

### 4.1 Statistik-Seite mit interaktiven Filtern und SVG-Diagramm

- **Beschreibung & Nutzen:** Die Statistik-Seite zeigt ein Balkendiagramm der Lernzeit pro Tag (filterbar nach Woche / Monat / Gesamt) und eine Modul-Aufschlüsselung mit Farbcode. Ermöglicht Studierenden, Lernmuster zu erkennen und schwächere Module gezielt zu fördern.
- **Wo umgesetzt:**
  - Frontend: `src/routes/stats/+page.svelte` (Tabs, Diagramm-Rendering), `src/lib/components/BarChart.svelte` (SVG-Balkendiagramm)
  - Backend: `src/routes/stats/+page.server.js` (Aggregation der Sessions nach Zeitraum und Modul)
- **Referenz:** Screenshot in Kap. 3.4.1 (Statistik-Screen)
- **Aus Evaluation abgeleitet?** Nein – war von Anfang an Teil des Konzepts (User Journey Schritt 7)

### 4.2 Gamification-Pipeline (Streak, Level, Badges)

- **Beschreibung & Nutzen:** Eine eigene Logik-Bibliothek berechnet den aktuellen und längsten Streak (Tage in Folge), das Level (1 Level = 300 Minuten) und prüft 7 regelbasierte Badges. Sichtbarer Fortschritt erhöht die Motivation und fördert das tägliche Zurückkehren zur App.
- **Wo umgesetzt:**
  - Backend/Logik: `src/lib/utils/gamification.js` (Streak-Algorithmus, Level-Berechnung, Badge-Auswertung)
  - Frontend: `src/lib/components/StreakDisplay.svelte`, `src/lib/components/LevelProgress.svelte`, `src/lib/components/BadgeCard.svelte`, Route `src/routes/badges/+page.svelte`
- **Referenz:** Screenshot in Kap. 3.4.1 (Home-Screen zeigt Streak-Pill und Level-Balken; Badges-Screen)
- **Aus Evaluation abgeleitet?** Nein – war von Anfang an geplant. O5 (P1: „Der Streak-Counter motiviert wirklich") bestätigt den Nutzen.

### 4.3 Zweiter Workflow „Tägliche Reflexion"

- **Beschreibung & Nutzen:** Eigener Workflow zur täglichen Selbstreflexion mit Stimmungs-Rating (1–5) und zwei Freitextfeldern. Pro Tag genau ein Eintrag (Upsert-Logik). Ergänzt das Session-Logging um eine qualitative Dimension.
- **Wo umgesetzt:**
  - Frontend: `src/routes/reflection/+page.svelte`
  - Backend: `src/routes/reflection/+page.server.js` (Upsert per `dateKey`)
  - Datenbank: Collection `reflections`, Feld `dateKey` als natürlicher Schlüssel
- **Referenz:** Screenshot in Kap. 3.4.1 (Reflexion-Screen)
- **Aus Evaluation abgeleitet?** Nein – war von Anfang an im Konzept als zweiter Workflow definiert.

### 4.4 Session-Karte auf Dashboard klickbar (Edit-Flow)

- **Beschreibung & Nutzen:** Session-Karten auf dem Dashboard führen direkt zur Detail-/Bearbeitungsansicht. Reduziert Navigationsschritte für den häufigen Use Case „Session nachträglich korrigieren".
- **Wo umgesetzt:**
  - Frontend: `src/routes/+page.svelte` (SessionCard als Link zu `/sessions/[id]`), `src/routes/sessions/[id]/+page.svelte` (Edit- und Delete-Formular)
- **Referenz:** Kap. 3.4.1 (Home-Screen, Session-Detailansicht)
- **Aus Evaluation abgeleitet?** **Ja** – Issue O2 aus Usability-Test: P2 erwartete Direktnavigation per Klick auf Session-Karte.

### 4.5 Komplexe serverseitige Validierung

- **Beschreibung & Nutzen:** Alle Formulare werden serverseitig validiert (Pflichtfelder, Längenlimits, Wertebereiche, Datumsplausibilität – kein Datum in der Zukunft). Feldweise Fehleranzeige mit Erhalt der eingegebenen Werte. Erhöht Robustheit und Nutzererlebnis.
- **Wo umgesetzt:**
  - Backend: `src/lib/utils/validation.js` (`validateSession`, `validateReflection`), alle Form Actions in `+page.server.js`-Dateien
- **Referenz:** Kap. 3.4.2 (Abschnitt Validierung)
- **Aus Evaluation abgeleitet?** Nein – war aus technischen Qualitätsgründen von Anfang an geplant.

### 4.6 Progressive Enhancement (Form Actions ohne JavaScript)

- **Beschreibung & Nutzen:** Alle CRUD-Aktionen (Session erfassen, bearbeiten, löschen; Reflexion speichern) funktionieren vollständig über SvelteKit Form Actions – auch ohne JavaScript im Browser. Erhöht Zugänglichkeit und Robustheit.
- **Wo umgesetzt:**
  - Frontend: `use:enhance` in allen Formularen (`+page.svelte` der jeweiligen Routen)
  - Backend: Form Actions in allen `+page.server.js`-Dateien
- **Referenz:** Kap. 3.4.2 (Besondere Entscheidungen)
- **Aus Evaluation abgeleitet?** Nein – technische Designentscheidung.

---

## 5. Projektorganisation [Optional]

- **Repository & Struktur:**
  - **URL:** https://github.com/dalipivaldrin/studystreak
  - Hosting: GitHub, Repository privat. Collaborators: `mmeisterhans`, `bkuehnis` (gemäss Aufgabenstellung).
  - Branch-Strategie: Trunk-Based Development auf `main`; Feature-Arbeit erfolgt in kurzen lokalen Branches, die per Squash-Merge wieder eingebracht werden.
- **Issue-Management:** GitHub-Issues für Bugs und Erweiterungs-Ideen; Verknüpfung mit Commits via `#<nr>`-Referenzen. Issues aus der Evaluation (O1, O2) wurden als GitHub-Issues angelegt und nachverfolgt.
- **Commit-Praxis:** Sprechende Commit-Messages im Imperativ (z. B. „Add session detail edit", „Fix streak calculation around midnight"). Pro logischer Einheit ein Commit. Push nach jedem grösseren Schritt.

---

## 6. KI-Deklaration

### 6.1 KI-Tools

- **Eingesetzte Tools:** Claude (Anthropic, claude.ai); GitHub Copilot (im VS Code).
- **Zweck & Umfang:**
  - **Übung 10 (Mockup):** Formulierung der Crazy-8s-Beschreibungen, Sparringspartner für die Variantenbewertung, sprachliche Überarbeitung der Dokumentation, Erstellung der README-Vorlage anhand des selbst gestalteten Figma-Mockups.
  - **Übung 11 (Prototyp):** Generierung des SvelteKit-Grundgerüsts (Routen, Komponenten, MongoDB-Anbindung) auf Basis der vom Autor definierten Architektur (Bottom-Nav, Module-System, Gamification-Logik), Aufbau der CSS-Design-Tokens entlang des selbst erstellten Figma-Mockups, sprachliche Glättung des Dokumentationsteils.
- **Eigene Leistung (Abgrenzung):**
  - **Konzeptionell:** Idee, Zielgruppenanalyse, Crazy-8s-Skizzen (Stift auf Papier), Variantenwahl, End-to-End-Ablauf, Gamification-Logik (Regeln für Streak, Level, Badges), Figma-Mockup mit allen sechs Screens, Farbkonzept – vollständig eigenständig erarbeitet.
  - **Technisch:** Architekturentscheidungen (SvelteKit-Routen-Struktur, Datenmodell, Trennung von Geschäfts- und UI-Logik, Validierungs-Strategie, Form Actions mit Progressive Enhancement), Integration und Deployment (MongoDB-Atlas-Konfiguration, Netlify-Setup, Umgebungsvariablen) sowie alle Code-Reviews liegen beim Autor. KI hat den Code vorgeschlagen, der Autor hat ihn gegengelesen, an die spezifische Architektur angepasst und in das Repository übernommen.

### 6.2 Prompt-Vorgehen

Für Übung 10 wurden Mockup-Screenshots, Ideenbeschreibung und Sketch-Dokumentation als Kontext mitgegeben; Claude wurde angewiesen, die vorgegebene README-Vorlage exakt zu übernehmen und die Kapitelstruktur nicht zu verändern. Für Übung 11 wurde zusätzlich die Aufgabenstellung sowie das fertige Mockup übergeben; die Generierung erfolgte iterativ pro Modul (zuerst Routen-Skelett, dann einzelne Komponenten, zuletzt CSS-Feinschliff). Die Ausgaben wurden manuell überprüft – insbesondere Streak-Edge-Cases (Mitternacht, Wochengrenze), Validierungs-Bedingungen und MongoDB-Connection-Pooling im Serverless-Kontext.

### 6.3 Reflexion

KI war hilfreich, um schnell ein konsistentes SvelteKit-Grundgerüst inkl. CSS-Design-Tokens zu erhalten und um den Doku-Text einheitlich zu halten. Grenzen: KI-Code muss kritisch geprüft werden (Beispiel: falsche Behandlung des Streaks an Tagesgrenzen, falsche ObjectId-Behandlung wenn das Format ungültig ist – beides musste vom Autor korrigiert werden). Risiko der unreflektierten Übernahme wurde durch Reviews und manuelle Tests im lokalen Dev-Server reduziert. Die inhaltliche und technische Verantwortung bleibt beim Autor.

---

## 7. Anhang [Optional]

- **Figma Mockup:** [StudyStreak – Mockup Übung 10](https://www.figma.com/design/j1DknvMCZSoX9RgQLrpkPB/StudyStreak-%E2%80%93-Mockup-%C3%9Cbung-10?node-id=0-1&t=qSqyMOvAkoSqCBtx-1)
- **Ideenbeschreibung:** Abgabe Woche 8 – Projektidee StudyStreak (Valdrin Dalipi, FS 2026)
- **Sketch-Dokumentation:** Abgabe Woche 9 – Crazy 8s & ausgearbeitete Skizze (Valdrin Dalipi, FS 2026)
- **Prototyp:** Abgabe Woche 11 – SvelteKit + MongoDB Prototyp (Valdrin Dalipi, FS 2026)
- **Screenshots:** Ablage unter `docs/screenshots/` im Repository
