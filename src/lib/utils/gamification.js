/**
 * Gamification-Logik: Streak, Level, Stats und Badge-Auswertung.
 * Keine externen Abhängigkeiten – reine Berechnung über die Sessions-Liste.
 */

import { BADGES, XP_PER_LEVEL } from '$lib/constants.js';

/** Tagesschlüssel YYYY-MM-DD (für Streak-Berechnung) */
function dayKey(d) {
	const date = new Date(d);
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

function todayKey() {
	return dayKey(new Date());
}

function yesterdayKey() {
	const d = new Date();
	d.setDate(d.getDate() - 1);
	return dayKey(d);
}

/**
 * Streak = Anzahl aufeinander folgender Tage mit mindestens einer Session,
 * gerechnet ab heute (oder ab gestern, falls heute noch nichts erfasst).
 */
export function calculateStreak(sessions) {
	if (!sessions || sessions.length === 0) {
		return { current: 0, longest: 0 };
	}

	const days = new Set(sessions.map((s) => dayKey(s.date)));
	const today = todayKey();
	const yesterday = yesterdayKey();

	// Current streak
	let cursor = new Date();
	if (!days.has(today)) {
		// Wenn heute leer ist, beginne Zählung ab gestern
		if (!days.has(yesterday)) {
			return { current: 0, longest: calculateLongestStreak(days) };
		}
		cursor.setDate(cursor.getDate() - 1);
	}

	let current = 0;
	while (days.has(dayKey(cursor))) {
		current++;
		cursor.setDate(cursor.getDate() - 1);
	}

	return { current, longest: Math.max(current, calculateLongestStreak(days)) };
}

function calculateLongestStreak(daysSet) {
	const sorted = Array.from(daysSet).sort();
	if (sorted.length === 0) return 0;

	let longest = 1;
	let run = 1;
	for (let i = 1; i < sorted.length; i++) {
		const prev = new Date(sorted[i - 1] + 'T00:00:00');
		const curr = new Date(sorted[i] + 'T00:00:00');
		const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
		if (diffDays === 1) {
			run++;
			longest = Math.max(longest, run);
		} else {
			run = 1;
		}
	}
	return longest;
}

/** Level: alle 300 Minuten ein Level (Level 1 = 0–299 min, Level 2 = 300–599, …) */
export function calculateLevel(totalMinutes) {
	const level = Math.floor(totalMinutes / XP_PER_LEVEL) + 1;
	const xpInLevel = totalMinutes % XP_PER_LEVEL;
	const xpToNext = XP_PER_LEVEL - xpInLevel;
	const progressPct = (xpInLevel / XP_PER_LEVEL) * 100;
	return { level, xpInLevel, xpToNext, progressPct, xpPerLevel: XP_PER_LEVEL };
}

/** Aggregiert alle Stats, die für Dashboard und Badges nötig sind. */
export function calculateStats(sessions) {
	const totalSessions = sessions.length;
	const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
	const { current: currentStreak, longest: longestStreak } = calculateStreak(sessions);
	const distinctDays = new Set(sessions.map((s) => dayKey(s.date))).size;
	const distinctModules = new Set(sessions.map((s) => s.module)).size;
	const level = calculateLevel(totalMinutes);

	// Diese Woche (ab Montag)
	const weekStart = startOfWeek(new Date());
	const weekMinutes = sessions
		.filter((s) => new Date(s.date) >= weekStart)
		.reduce((sum, s) => sum + (s.duration || 0), 0);

	return {
		totalSessions,
		totalMinutes,
		currentStreak,
		longestStreak,
		distinctDays,
		distinctModules,
		level,
		weekMinutes
	};
}

export function startOfWeek(d) {
	const date = new Date(d);
	const day = date.getDay(); // 0 = So
	const diff = day === 0 ? -6 : 1 - day; // auf Montag normalisieren
	date.setDate(date.getDate() + diff);
	date.setHours(0, 0, 0, 0);
	return date;
}

/** Liste der Badges mit erreicht-Status. */
export function evaluateBadges(stats) {
	return BADGES.map((b) => ({
		id: b.id,
		name: b.name,
		description: b.description,
		icon: b.icon,
		achieved: b.rule(stats)
	}));
}

/** Tages-Aggregate für Balkendiagramm (z.B. letzte 14 Tage). */
export function dailyMinutes(sessions, days = 14) {
	const result = [];
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	for (let i = days - 1; i >= 0; i--) {
		const d = new Date(today);
		d.setDate(today.getDate() - i);
		const key = dayKey(d);
		const minutes = sessions
			.filter((s) => dayKey(s.date) === key)
			.reduce((sum, s) => sum + (s.duration || 0), 0);
		result.push({
			date: key,
			label: d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit' }),
			minutes
		});
	}
	return result;
}

/** Minuten pro Modul über die letzten N Tage. */
export function minutesByModule(sessions, days = 30) {
	const cutoff = new Date();
	cutoff.setDate(cutoff.getDate() - days);
	cutoff.setHours(0, 0, 0, 0);

	const map = {};
	for (const s of sessions) {
		if (new Date(s.date) >= cutoff) {
			map[s.module] = (map[s.module] || 0) + (s.duration || 0);
		}
	}
	return Object.entries(map)
		.map(([module, minutes]) => ({ module, minutes }))
		.sort((a, b) => b.minutes - a.minutes);
}

/** Format-Helfer: 95 -> "1h 35 min" */
export function formatMinutes(min) {
	const m = Math.max(0, Math.round(min || 0));
	if (m < 60) return `${m} min`;
	const h = Math.floor(m / 60);
	const rest = m % 60;
	return rest === 0 ? `${h} h` : `${h} h ${rest} min`;
}
