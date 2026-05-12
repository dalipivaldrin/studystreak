/**
 * MongoDB-Anbindung mit Connection-Caching für Serverless-Umgebungen.
 * In Netlify Functions wird die Verbindung pro Cold-Start aufgebaut und wiederverwendet.
 */

import { MongoClient, ObjectId } from 'mongodb';
import { env } from '$env/dynamic/private';

const uri = env.MONGODB_URI;
const dbName = env.MONGODB_DB || 'studystreak';

if (!uri) {
	console.warn('[db] MONGODB_URI ist nicht gesetzt. Setze die Umgebungsvariable in .env oder im Netlify-Dashboard.');
}

let clientPromise;

function getClient() {
	if (!uri) {
		throw new Error('MONGODB_URI ist nicht gesetzt. Lege eine .env-Datei mit MONGODB_URI=... an.');
	}
	if (!clientPromise) {
		const client = new MongoClient(uri, {
			maxPoolSize: 5,
			serverSelectionTimeoutMS: 5000
		});
		clientPromise = client.connect();
	}
	return clientPromise;
}

export async function getDb() {
	const client = await getClient();
	return client.db(dbName);
}

export async function getSessions() {
	const db = await getDb();
	return db.collection('sessions');
}

export async function getReflections() {
	const db = await getDb();
	return db.collection('reflections');
}

/** Robustes ObjectId-Parsing (gibt null bei ungültiger ID statt zu werfen). */
export function toObjectId(id) {
	try {
		return new ObjectId(id);
	} catch {
		return null;
	}
}

/** Serialisiert MongoDB-Docs in JSON-taugliche Plain Objects. */
export function serialize(doc) {
	if (!doc) return doc;
	if (Array.isArray(doc)) return doc.map(serialize);
	const out = { ...doc };
	if (out._id) out._id = out._id.toString();
	if (out.date instanceof Date) out.date = out.date.toISOString();
	if (out.createdAt instanceof Date) out.createdAt = out.createdAt.toISOString();
	if (out.updatedAt instanceof Date) out.updatedAt = out.updatedAt.toISOString();
	return out;
}

export { ObjectId };
