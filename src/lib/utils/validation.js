/**
 * Server-seitige Validierung fuer Sessions und Reflexionen.
 * Liefert { valid, errors, data } zurueck.
 * Hinweis: module wird als beliebiger String (MongoDB ObjectId) akzeptiert,
 * da Module jetzt user-spezifisch aus der DB kommen.
 */

export function validateSession(formData) {
		const errors = {};
		const data = {};

	// module (required – beliebiger nicht-leerer String, da dynamische User-Module)
	const moduleId = (formData.get('module') || '').toString().trim();
		if (!moduleId) {
					errors.module = 'Bitte ein Modul / Fach auswaehlen.';
		} else {
					data.module = moduleId;
		}

	// duration (required, 5-600 min)
	const durationRaw = (formData.get('duration') || '').toString().trim();
		const duration = Number.parseInt(durationRaw, 10);
		if (!durationRaw) {
					errors.duration = 'Bitte Dauer angeben.';
		} else if (!Number.isFinite(duration) || duration < 5 || duration > 600) {
					errors.duration = 'Dauer muss zwischen 5 und 600 Minuten liegen.';
		} else {
					data.duration = duration;
		}

	// date (optional, default today)
	const dateRaw = (formData.get('date') || '').toString().trim();
		if (dateRaw) {
					const date = new Date(dateRaw + 'T00:00:00');
					if (Number.isNaN(date.getTime())) {
									errors.date = 'Ungultiges Datum.';
					} else if (date > new Date()) {
									errors.date = 'Datum darf nicht in der Zukunft liegen.';
					} else {
									data.date = date;
					}
		} else {
					const today = new Date();
					today.setHours(0, 0, 0, 0);
					data.date = today;
		}

	// topic (optional, max 200 chars)
	const topic = (formData.get('topic') || '').toString().trim();
		if (topic.length > 200) {
					errors.topic = 'Thema darf max. 200 Zeichen lang sein.';
		} else {
					data.topic = topic;
		}

	// focus (optional, 1-5)
	const focusRaw = (formData.get('focus') || '').toString().trim();
		if (focusRaw) {
					const focus = Number.parseInt(focusRaw, 10);
					if (!Number.isFinite(focus) || focus < 1 || focus > 5) {
									errors.focus = 'Fokus muss zwischen 1 und 5 liegen.';
					} else {
									data.focus = focus;
					}
		} else {
					data.focus = null;
		}

	// notes (optional, max 1000)
	const notes = (formData.get('notes') || '').toString().trim();
		if (notes.length > 1000) {
					errors.notes = 'Notizen duerfen max. 1000 Zeichen lang sein.';
		} else {
					data.notes = notes;
		}

	return {
				valid: Object.keys(errors).length === 0,
				errors,
				data
	};
}

export function validateReflection(formData) {
		const errors = {};
		const data = {};

	const moodRaw = (formData.get('mood') || '').toString().trim();
		const mood = Number.parseInt(moodRaw, 10);
		if (!moodRaw) {
					errors.mood = 'Bitte Stimmung waehlen.';
		} else if (!Number.isFinite(mood) || mood < 1 || mood > 5) {
					errors.mood = 'Stimmung muss zwischen 1 und 5 liegen.';
		} else {
					data.mood = mood;
		}

	const wentWell = (formData.get('wentWell') || '').toString().trim();
		if (wentWell.length > 500) errors.wentWell = 'Max. 500 Zeichen.';
		else data.wentWell = wentWell;

	const improve = (formData.get('improve') || '').toString().trim();
		if (improve.length > 500) errors.improve = 'Max. 500 Zeichen.';
		else data.improve = improve;

	const dateRaw = (formData.get('date') || '').toString().trim();
		if (dateRaw) {
					const date = new Date(dateRaw + 'T00:00:00');
					if (Number.isNaN(date.getTime())) {
									errors.date = 'Ungultiges Datum.';
					} else {
									data.date = date;
					}
		} else {
					const today = new Date();
					today.setHours(0, 0, 0, 0);
					data.date = today;
		}

	return {
				valid: Object.keys(errors).length === 0,
				errors,
				data
	};
}
