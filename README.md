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
  | **Home** | Streak, Sessions gesamt, Level und Wochenfortschrittsbalken. Liste der letzten 5 Sessions. Grosser CTA-Button „+ Lernsession erfassen" am unteren Rand. |
  | **Modul wählen** | Favoriten als farbige Pills oben, alle Module alphabetisch darunter. Option „+ Eigenes Modul". Tippen auf Modul führt direkt weiter – kein Bestätigungs-Button nötig. |
  | **Dauer & Details** | Zeitslot-Auswahl (15/30/45/60 min, aktiver Slot hervorgehoben). Freitextfeld für Thema (optional). Sternebewertung 1–5 für Fokus-Level (optional, Default leer um Ankerheuristik zu vermeiden). Grüner „Session speichern"-Button immer sichtbar. |
  | **Gespeichert** | Erfolgsmeldung („🎉 Gespeichert!"), Session-Detailkarte inkl. Modul-Farbcode, Dauer, Fokus und Notizen. Buttons für „🗑️ Löschen" und „+ Neue Session". |
  | **Statistik** | Tab-Auswahl Woche / Monat / Gesamt. Balkendiagramm der Lernzeit pro Wochentag. Gesamtlernzeit im gewählten Zeitraum. Liste der letzten Sessions mit Modul, Dauer und Datum. Modul-Balken mit Farbcode. |
  | **Badges** | Galerie aller 7 Badges, erreichte farbig, gesperrte mit reduzierter Sättigung. Zähler „X / 7 erreicht". |
  | **Reflexion** | Tägliche Reflexion mit Stimmungs-Rating (1–5) und zwei Textfeldern. Upsert pro Tag. Liste der letzten 5 Reflexionen darunter. |

- **Designentscheidungen:**
  - **Mobile-First:** Die App ist auf Smartphone-Layouts (max-width 480 px) optimiert und nutzt Bottom Navigation, da Lernen mobil und spontan stattfindet
  - **Bottom Navigation:** Etabliertes Muster für mobile Apps; alle Hauptbereiche mit dem Daumen erreichbar (Thumb-Zone-freundlich)
  - **Farbkonzept:** Blau (`#3A5ACC`) für primäre Aktionen und App-Header, Orange (`#FF8C00`) für Streak-Badge, Grün (`#28A745`) für Erfolg/Speichern. Pro Modul eine eigene Akzentfarbe (Prototyping = violett, ITPM = grün, Statistik = gelb, Englisch = rot).
  - **Pill-/Chip-Buttons** für Modulwahl: schnelles Antippen ohne Tastatur, auch einhändig bedienbar
  - **Gamification prominent:** Streak immer im Header sichtbar; Erfolgsmeldung nach dem Speichern als Banner auf der Detailseite (vereinfacht gegenüber dem Mockup-Bestätigungsscreen, lässt sich aber in einer Folge-Iteration auf einen eigenen Screen ausbauen)
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
  │  ├─ app.css                 ← Globales Stylesheet (Design-Tokens als CSS-Variablen)
  │  ├─ app.html                ← HTML-Shell
  │  ├─ hooks.server.js         ← Server-Hook: Request-Logging
  │  ├─ lib/
  │  │  ├─ constants.js         ← Module, Dauer-Presets, Badge-Definitionen
  │  │  ├─ server/db.js         ← MongoDB-Client (gepoolt, Singleton)
  │  │  ├─ utils/
  │  │  │  ├─ gamification.js   ← Streak-, Level-, Stats-Berechnung
  │  │  │  └─ validation.js     ← Server-Validierung für Form-Inputs
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

  Komponenten kapseln klar abgegrenzte UI-Bausteine (z. B. `<SessionCard>` für einen Eintrag in einer Sessions-Liste, `<BarChart>` für die Tages-Balken). Geschäftslogik (Streak, Level, Stats) ist in `$lib/utils/gamification.js` isoliert und kann unabhängig getestet werden.

- **Daten & Schnittstellen:**

  MongoDB Atlas (Free-Tier M0). Zwei Collections:

  | Collection | Felder |
  |---|---|
  | `sessions` | `_id`, `module` (id), `duration` (min), `date`, `topic?`, `focus? (1–5)`, `notes?`, `createdAt`, `updatedAt` |
  | `reflections` | `_id`, `dateKey` (YYYY-MM-DD, unique), `mood (1–5)`, `wentWell?`, `improve?`, `date`, `createdAt`, `updatedAt` |

  Reflexionen werden über einen Upsert mit `dateKey` als natürlichem Schlüssel gespeichert – damit gibt es pro Tag genau einen Eintrag.

  Alle Datenbankzugriffe laufen ausschliesslich serverseitig (`+page.server.js` / Form Actions). Der MongoDB-Client wird als Singleton-Promise gehalten und in Netlify-Functions zwischen Aufrufen wiederverwendet (Cold-Start-Optimierung).

- **Validierung:** Jede Form Action validiert die Eingaben über `validateSession` / `validateReflection` (Pflichtfelder, Längenlimits, Wertebereiche, Datumsplausibilität). Fehler werden über `fail(400, { errors, values })` an die Seite zurückgegeben und dort feldweise angezeigt; die eingegebenen Werte bleiben im Formular erhalten.

- **Deployment:** Netlify mit `@sveltejs/adapter-netlify`. Konfiguration in `netlify.toml`; Build-Command `npm run build`, Publish-Verzeichnis `build`. Umgebungsvariablen werden im Netlify-Dashboard hinterlegt. URL: _[wird nach Deployment ergänzt]_

- **Lokale Entwicklung:**

  ```bash
  # 1. Repo klonen
  git clone <REPO_URL>
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
  - Streak/Level/Stats werden bei jedem Request neu berechnet, nicht in der DB persistiert → eine einzige Quelle der Wahrheit (die Sessions), keine Inkonsistenzen möglich. Bei wachsender Datenmenge könnte später ein Cache vorgeschaltet werden.

### 3.5 Validate

- _[wird in späteren Übungen ergänzt – geplant: Usability-Test mit drei Mitstudierenden (Thinking-Aloud), Aufgaben T1–T3, SUS-Fragebogen, Verbesserungs-Backlog]_

---

## 4. Erweiterungen [Optional]

Folgende Funktionen gehen über den geforderten Mindestumfang (1 Hauptworkflow + Übersicht + Erfassen) hinaus:

- **Statistik-Seite mit interaktiven Filtern** (Woche/Monat/Gesamt) und SVG-Balkendiagramm der Lernzeit pro Tag.
- **Modul-Auswertung mit Farbcode:** Balken pro Modul zeigen die anteilige Lernzeit der letzten 7/30/365 Tage.
- **Gamification-Pipeline:** Eigene Bibliothek `gamification.js` mit Streak-Algorithmus (current + longest), Level-Berechnung (1 Level = 300 min) und Tages-/Modul-Aggregaten – als ergänzender Workflow neben der reinen CRUD-Funktion.
- **Badge-System:** 7 regelbasierte Auszeichnungen mit Erreicht-/Gesperrt-Anzeige, eigene Galerie-Route (`/badges`).
- **Zweiter Workflow „Tägliche Reflexion":** Eigene Route mit Upsert-Logik (genau ein Eintrag pro Tag) und Historie der letzten Einträge.
- **Komplexe Validierung:** Serverseitige Pflichtfeld-, Längen- und Wertebereichsprüfung, Datumsplausibilität (kein Datum in der Zukunft), feldweise Fehleranzeige mit Erhalt der eingegebenen Werte.
- **Sichtbares Feedback:** Erfolgsmeldungen via URL-Parameter (`?created=1`, `?updated=1`, `?saved=1`), kontextabhängige Begrüssung im Dashboard („Heute noch nichts gelernt …" vs. „Du warst heute fleissig"), Empty-States für leere Listen, Toast-artige Alerts.
- **Bottom-Navigation als persistente Komponente** über alle Hauptseiten hinweg – wie im Mockup definiert.
- **Modul-spezifisches Farbsystem** mit eigener CSS-Variable und Anwendung an Chips, Detail-Stripe, Statistik-Balken.
- **Edit-/Löschen-Workflow** für Sessions inkl. Confirm-Dialog vor dem Löschen.
- **Progressive Enhancement:** Alle Formulare funktionieren auch ohne JavaScript (Form Actions).

---

## 5. Projektorganisation [Optional]

- **Repository & Struktur:**
  - Hosting: GitHub _(URL siehe oben)_, Repository privat. Collaborators: `mmeisterhans`, `bkuehnis` (gemäss Aufgabenstellung).
  - Branch-Strategie: Trunk-Based Development auf `main`; Feature-Arbeit erfolgt in kurzen lokalen Branches, die per Squash-Merge wieder eingebracht werden.
- **Issue-Management:** GitHub-Issues für Bugs und Erweiterungs-Ideen; Verknüpfung mit Commits via `#<nr>`-Referenzen.
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

Für Übung 10 wurden Mockup-Screenshots, Ideenbeschreibung und Sketch-Dokumentation als Kontext mitgegeben; Claude wurde angewiesen, die vorgegebene README-Vorlage exakt zu übernehmen und die Kapitelstruktur nicht zu verändern. Für Übung 11 wurde zusätzlich die Aufgabenstellung („Prototyping mit KI-Tools") sowie das fertige Mockup übergeben; die Generierung erfolgte iterativ pro Modul (zuerst Routen-Skelett, dann einzelne Komponenten, zuletzt CSS-Feinschliff). Die Ausgaben wurden manuell überprüft – insbesondere Streak-Edge-Cases (Mitternacht, Wochengrenze), Validierungs-Bedingungen und MongoDB-Connection-Pooling im Serverless-Kontext.

### 6.3 Reflexion

KI war hilfreich, um schnell ein konsistentes SvelteKit-Grundgerüst inkl. CSS-Design-Tokens zu erhalten und um den Doku-Text einheitlich zu halten. Grenzen: KI-Code muss kritisch geprüft werden (Beispiel: falsche Behandlung des Streaks an Tagesgrenzen, falsche ObjectId-Behandlung wenn das Format ungültig ist – beides musste vom Autor korrigiert werden). Risiko der unreflektierten Übernahme wurde durch Reviews und manuelle Tests im lokalen Dev-Server reduziert. Die inhaltliche und technische Verantwortung bleibt beim Autor.

---

## 7. Anhang [Optional]

- **Figma Mockup:** [StudyStreak – Mockup Übung 10](https://www.figma.com/design/j1DknvMCZSoX9RgQLrpkPB/StudyStreak-%E2%80%93-Mockup-%C3%9Cbung-10?node-id=0-1&t=qSqyMOvAkoSqCBtx-1)
- **Ideenbeschreibung:** Abgabe Woche 8 – Projektidee StudyStreak (Valdrin Dalipi, FS 2026)
- **Sketch-Dokumentation:** Abgabe Woche 9 – Crazy 8s & ausgearbeitete Skizze (Valdrin Dalipi, FS 2026)
- **Prototyp:** Abgabe Woche 11 – SvelteKit + MongoDB Prototyp (Valdrin Dalipi, FS 2026)
