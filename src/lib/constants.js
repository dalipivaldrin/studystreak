/**
 * StudyStreak – Konstanten
 * Module und Badge-Definitionen aus dem Mockup (Übung 10).
 */

export const MODULES = [
	{ id: 'prototyping', name: 'Prototyping', color: '#8B5CF6', cssVar: '--c-mod-prototyping' },
	{ id: 'itpm',        name: 'ITPM',        color: '#10B981', cssVar: '--c-mod-itpm' },
	{ id: 'statistik',   name: 'Statistik',   color: '#F59E0B', cssVar: '--c-mod-statistik' },
	{ id: 'englisch',    name: 'Englisch',    color: '#EF4444', cssVar: '--c-mod-englisch' }
];

export const MODULE_MAP = Object.fromEntries(MODULES.map((m) => [m.id, m]));

export function getModule(id) {
	return MODULE_MAP[id] || { id, name: id, color: '#6B7280', cssVar: '--c-mod-default' };
}

export const DURATION_PRESETS = [15, 30, 45, 60];

/**
 * Badges: jeweils mit einer rule(stats) Funktion, die true/false zurückgibt.
 * stats = { totalMinutes, totalSessions, currentStreak, longestStreak, distinctDays, distinctModules }
 */
export const BADGES = [
	{
		id: 'first_session',
		name: 'Erste Session',
		description: 'Erste Lernsession dokumentiert.',
		icon: '🌱',
		rule: (s) => s.totalSessions >= 1
	},
	{
		id: 'three_day_streak',
		name: '3-Tage-Streak',
		description: 'Drei Tage in Folge gelernt.',
		icon: '🔥',
		rule: (s) => s.currentStreak >= 3 || s.longestStreak >= 3
	},
	{
		id: 'seven_day_streak',
		name: '7-Tage-Streak',
		description: 'Eine ganze Woche durchgehalten.',
		icon: '🚀',
		rule: (s) => s.currentStreak >= 7 || s.longestStreak >= 7
	},
	{
		id: 'ten_hours',
		name: '10 Stunden gelernt',
		description: '600 Minuten Gesamtlernzeit erreicht.',
		icon: '⏱️',
		rule: (s) => s.totalMinutes >= 600
	},
	{
		id: 'fifty_sessions',
		name: '50 Sessions',
		description: '50 Lernsessions dokumentiert.',
		icon: '📚',
		rule: (s) => s.totalSessions >= 50
	},
	{
		id: 'all_modules',
		name: 'Allrounder',
		description: 'In jedem der vier Module mindestens eine Session.',
		icon: '🌟',
		rule: (s) => s.distinctModules >= 4
	},
	{
		id: 'level_5',
		name: 'Level 5 erreicht',
		description: '1500 Minuten Lernzeit (= Level 5).',
		icon: '🏆',
		rule: (s) => s.totalMinutes >= 1500
	}
];

export const FOCUS_LABELS = {
	1: 'Sehr abgelenkt',
	2: 'Eher abgelenkt',
	3: 'Mittel',
	4: 'Konzentriert',
	5: 'Voll im Flow'
};

export const MOOD_LABELS = {
	1: '😞 Schwierig',
	2: '😐 Mittelmässig',
	3: '🙂 Okay',
	4: '😊 Gut',
	5: '🤩 Grossartig'
};

/** XP-Berechnung: 1 Minute = 1 XP, ein Level = 300 XP (= 5 h Lernzeit) */
export const XP_PER_LEVEL = 300;
