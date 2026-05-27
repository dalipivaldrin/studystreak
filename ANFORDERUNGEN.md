# Anforderungen – Prototyping Projekt (Übung 11)

## Erfüllungsstand

### A) Mindestumfang – max. 60 Punkte

#### Kernfunktionalität & technische Qualität (15 Punkte)

| Anforderung | Status | Nachweis |
|---|---|---|
| Klar definierter Hauptworkflow (End-to-End) | ✅ Erfüllt | Session erfassen → Stats ansehen → Reflexion eintragen |
| Mindestens eine Übersichtsseite mit DB-Daten | ✅ Erfüllt | Dashboard (/) zeigt letzte Sessions aus MongoDB |
| Mindestens eine Seite zum Erfassen/Bearbeiten | ✅ Erfüllt | /sessions/new, /sessions/[id], /reflection |
| SvelteKit mit Komponenten | ✅ Erfüllt | BottomNav.svelte, SessionCard.svelte, BarChart.svelte, BadgeCard.svelte, StreakDisplay.svelte, LevelProgress.svelte |
| Persistenz mit MongoDB | ✅ Erfüllt | MongoDB Atlas, Collections: sessions, reflections |
| Git/GitHub Versionsverwaltung | ✅ Erfüllt | Repository mit regelmässigen, sprechenden Commits |
| App ist deployed | ✅ Erfüllt | Netlify, URL: https://study-streak.netlify.app |

#### Nutzerzentrierung & Bedienbarkeit (15 Punkte)

| Anforderung | Status | Nachweis |
|---|---|---|
| Klar verständliche Bezeichnungen | ✅ Erfüllt | Deutschsprachige UI, konsistente Terminologie |
| Nachvollziehbare Navigation | ✅ Erfüllt | Bottom Navigation mit 5 Tabs (Home, Statistik, Badges, Reflexion, Prüfungen) |
| Sichtbares Feedback (Erfolg/Fehler) | ✅ Erfüllt | Feldweise Fehleranzeige, Erfolgsmeldung nach Session-Speicherung |
| Mockup als Grundlage | ✅ Erfüllt | Figma-Prototyp mit 6 verlinkten Screens (README Kap. 3.3) |
| Mobile-first Design | ✅ Erfüllt | max-width 480px, Chip-Buttons, Bottom Navigation, Thumb-Zone-optimiert |

#### Vorgehen (15 Punkte)

| Anforderung | Status | Nachweis |
|---|---|---|
| Phasenbasiertes Vorgehen | ✅ Erfüllt | README Abschnitte: Understand/Define, Sketch (Crazy 8s), Decide, Prototype, Validate |
| Qualität der Zwischenresultate (Artefakte) | ✅ Erfüllt | Proto-Persona Valdrin, 8 Varianten (Crazy 8s), Figma-Mockup, Entscheidungsdokumentation |
| Begründete Entscheide | ✅ Erfüllt | README 3.3: Variantenauswahl (Preset-Tap) mit Begründung |

#### Evaluation (10 Punkte)

| Anforderung | Status | Nachweis |
|---|---|---|
| Planung der Evaluation | ✅ Erfüllt | docs/usability-test-skript.md: 6 Aufgaben mit Erfolgskriterien definiert |
| Durchführung mit Nutzenden | ✅ Erfüllt | Moderierter Test mit Marko Vukcevic am 14. Mai 2026 (README Kap. 3.5) |
| Auswertung & Verbesserungsvorschläge | ✅ Erfüllt | Feedback-Grid, 5 priorisierte Massnahmen, 3 davon umgesetzt (README Kap. 3.5) |

#### Dokumentation & Video (5 Punkte)

| Anforderung | Status | Nachweis |
|---|---|---|
| Vollständige README-Struktur (Vorlage) | ✅ Erfüllt | Alle Pflichtkapitel vorhanden |
| Screenshots der fertigen App | ✅ Erfüllt | 6 Screenshots in README Kap. 3.4.1 (unter docs/screenshots/) |
| Video-Walkthrough (alle Workflows) | ⚠️ Ausstehend | Noch nicht erstellt |
| KI-Deklaration | ✅ Erfüllt | README Abschnitt 6: Claude + GitHub Copilot dokumentiert |

---

### B) Erweiterungen – max. 40 Punkte

#### Hohe Qualität im Mindestumfang (10 Punkte)

| Kriterium | Status | Nachweis |
|---|---|---|
| Robuste Umsetzung | ✅ Stark | Serverseitige Validierung (validateSession, validateReflection), Progressive Enhancement (Form Actions ohne JS), MongoDB Singleton-Client |
| Sehr gute Bedienbarkeit | ✅ Stark | Session in ~22 Sekunden erfassbar (Kernziel erreicht), Chip-Auswahl, farbliche Modulkennzeichnung |
| Klare Nachvollziehbarkeit (Vorgehen + Auswertung) | ✅ Stark | Vorgehen mit Crazy 8s und Figma-Mockup; Evaluation mit konkretem Feedback-Grid und umgesetzten Massnahmen |

#### Produkt-/Funktions-Erweiterungen (15 Punkte)

| Erweiterung | Status | Beschreibung |
|---|---|---|
| Gamification-Pipeline (Streak, Level, Badges) | ✅ Umgesetzt | Streak-Algorithmus, Level (300 min = 1 Level), 7 regelbasierte Badges; src/lib/utils/gamification.js |
| Statistik-Seite mit SVG-Diagramm & Filter | ✅ Umgesetzt | Balkendiagramm Lernzeit/Tag, Modul-Aufschlüsselung, Filter Woche/Monat/Gesamt |
| Tägliche Reflexion (zweiter Workflow) | ✅ Umgesetzt | Stimmungs-Rating 1–5, zwei Freitextfelder, Upsert-Logik (1 Eintrag/Tag) |
| CRUD für Sessions (Bearbeiten + Löschen) | ✅ Umgesetzt | /sessions/[id] mit Edit- und Delete-Formular |
| Session-Karte auf Dashboard klickbar | ✅ Umgesetzt | Direkte Navigation zur Detail-/Bearbeitungsansicht (aus Evaluation abgeleitet, Issue #2) |
| Badge-Galerie | ✅ Umgesetzt | 7 Badges; erreichte farbig, gesperrte mit Graustufen-Filter |
| Komplexe serverseitige Validierung | ✅ Umgesetzt | Pflichtfelder, Längenlimits, Wertebereiche, Datumsplausibilität, feldweise Fehleranzeige |
| Progressive Enhancement (Form Actions ohne JS) | ✅ Umgesetzt | Alle CRUD-Aktionen funktionieren ohne JavaScript |

#### Zusätzliche Methoden/Artefakte (10 Punkte)

| Erweiterung | Status | Beschreibung |
|---|---|---|
| Crazy 8s Sketch-Methode | ✅ Umgesetzt | 8 Varianten, je 1 Minute, vollständig dokumentiert in README 3.2 |
| Figma-Prototyp mit 6 Screens | ✅ Umgesetzt | Verlinkter interaktiver Prototyp als Entscheidungsgrundlage |
| Strukturiertes Usability-Testskript | ✅ Umgesetzt | docs/usability-test-skript.md mit 6 Aufgaben, Feedback-Grid und Beobachtungen |
| Issue-Management (GitHub Issues) | ✅ Umgesetzt | Issues #1, #2, #3 für Evaluations-Findings angelegt und mit Commits verknüpft |

#### Projektorganisation (5 Punkte)

| Kriterium | Status | Nachweis |
|---|---|---|
| Sprechende Commit-Nachrichten | ✅ Erfüllt | Semantische Commits im Imperativ (z.B. "Add session detail edit", "Fix streak calculation around midnight") |
| Repository-Hygiene | ✅ Erfüllt | Saubere Struktur, .env nicht committed, docs/ Ordner vorhanden |
| Issue-Management | ✅ Erfüllt | GitHub Issues #1–#3 für Evaluations-Findings angelegt und nachverfolgt |

---

## Offene Punkte (vor Abgabe zu erledigen)

- [ ] Video-Walkthrough aufnehmen (~5 Min., alle Workflows zeigen)
- [ ] GitHub-Repository URL + Zip-Datei auf Moodle einreichen
- [ ] Link zur deployed App auf Moodle einreichen
- [ ] Collaborators mmeisterhans und bkuehnis im Repository hinzufügen (falls noch nicht erledigt)

---

## Notenskala

Die Note wird linear aus den erreichten Punkten (max. 100) berechnet:

| Punkte | 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Note | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 |

**Modulendnote:** 0.5 × Prüfungsnote + 0.5 × Projektnote, gerundet auf 0.5

---

## Punkteverteilung

| Bereich | Kriterium | Max. Punkte |
|---|---|---|
| **A) Mindestumfang** | | **60** |
| | Kernfunktionalität & technische Qualität | 15 |
| | Nutzerzentrierung & Bedienbarkeit | 15 |
| | Vorgehen | 15 |
| | Evaluation | 10 |
| | Dokumentation & Video | 5 |
| **B) Erweiterungen** | | **40** |
| | Hohe Qualität im Mindestumfang | 10 |
| | Produkt-/Funktions-Erweiterungen | 15 |
| | Zusätzliche Methoden/Artefakte | 10 |
| | Projektorganisation | 5 |
| **Total** | | **100** |

---

## Mindestanforderungen (Voraussetzungen für Bestehen)

- Mindestumfang gemäss Übungen erfüllt und dokumentiert
- Online zugängliche App (https://study-streak.netlify.app)
- GitHub-Repository mit Code und Dokumentation vollständig vorhanden und für Dozierende zugänglich (mmeisterhans, bkuehnis als Collaborators)
- Durchführung einer Evaluation mit Auswertung gemäss Übungen
- Einhaltung rechtlicher Rahmenbedingungen (u.a. Urheberrecht)
- KI-Einsatz verantwortungsvoll und transparent deklariert
