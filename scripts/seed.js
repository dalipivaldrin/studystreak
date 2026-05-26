/**
 * scripts/seed.js
 * Seeds the StudyStreak database with demo data.
 *
 * Usage:
 *   node scripts/seed.js
 *
 * Requires MONGODB_URI in .env (or environment variable).
 */

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config(); // load .env

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not set. Copy .env.example to .env and fill in the values.');
  process.exit(1);
}

const DB_NAME = 'studystreak';

// --- Demo data ---

const now = new Date();
const dayMs = 24 * 60 * 60 * 1000;

function daysAgo(n) {
  return new Date(now.getTime() - n * dayMs);
}

function dateKey(date) {
  return date.toISOString().split('T')[0];
}

const demoSessions = [
  // Last 14 days: varied sessions for chart data
  { module: 'statistik',   duration: 60, date: daysAgo(0),  topic: 'Verteilungen & Erwartungswert', focus: 4, notes: '' },
  { module: 'prototyping', duration: 45, date: daysAgo(1),  topic: 'SvelteKit Form Actions',        focus: 5, notes: 'Viel gelernt heute' },
  { module: 'itpm',        duration: 30, date: daysAgo(1),  topic: 'Projektplanung Grundlagen',     focus: 3, notes: '' },
  { module: 'englisch',    duration: 20, date: daysAgo(2),  topic: 'Vocabulary Unit 4',             focus: 4, notes: '' },
  { module: 'statistik',   duration: 45, date: daysAgo(2),  topic: 'Konfidenzintervalle',           focus: 3, notes: '' },
  { module: 'prototyping', duration: 60, date: daysAgo(3),  topic: 'MongoDB Datenmodell',           focus: 5, notes: 'Sehr produktiv' },
  { module: 'itpm',        duration: 45, date: daysAgo(4),  topic: 'Stakeholder-Analyse',           focus: 4, notes: '' },
  { module: 'statistik',   duration: 30, date: daysAgo(5),  topic: 'Normalverteilung',              focus: 3, notes: '' },
  { module: 'prototyping', duration: 45, date: daysAgo(6),  topic: 'Usability Testing Vorbereitung',focus: 4, notes: '' },
  { module: 'englisch',    duration: 30, date: daysAgo(7),  topic: 'Presentations & Vocabulary',   focus: 4, notes: '' },
  { module: 'statistik',   duration: 60, date: daysAgo(8),  topic: 'Hypothesentests',               focus: 5, notes: '' },
  { module: 'prototyping', duration: 30, date: daysAgo(9),  topic: 'Figma Prototyp',               focus: 4, notes: '' },
  { module: 'itpm',        duration: 45, date: daysAgo(10), topic: 'Risikoanalyse',                 focus: 3, notes: '' },
  { module: 'statistik',   duration: 30, date: daysAgo(11), topic: 'Deskriptive Statistik',        focus: 4, notes: '' },
  { module: 'prototyping', duration: 60, date: daysAgo(12), topic: 'SvelteKit Routing',            focus: 5, notes: '' },
  { module: 'englisch',    duration: 20, date: daysAgo(13), topic: 'Grammar Review',               focus: 3, notes: '' },
  { module: 'itpm',        duration: 30, date: daysAgo(14), topic: 'Agile Methoden',               focus: 4, notes: '' },
].map((s, i) => ({
  ...s,
  createdAt: daysAgo(14 - i),
  updatedAt: daysAgo(14 - i)
}));

const demoReflections = [
  {
    dateKey: dateKey(daysAgo(0)),
    mood: 4,
    wentWell: 'Statistik-Stoff hat heute gut geklappt.',
    improve: 'Morgen früher anfangen.',
    date: daysAgo(0)
  },
  {
    dateKey: dateKey(daysAgo(1)),
    mood: 5,
    wentWell: 'Sehr produktive SvelteKit-Session.',
    improve: 'Mehr Pausen einplanen.',
    date: daysAgo(1)
  },
  {
    dateKey: dateKey(daysAgo(2)),
    mood: 3,
    wentWell: 'Englisch-Vokabeln geübt.',
    improve: 'Konzentration war nicht optimal – Handy weglegen.',
    date: daysAgo(2)
  },
  {
    dateKey: dateKey(daysAgo(3)),
    mood: 5,
    wentWell: 'MongoDB sehr gut verstanden.',
    improve: 'Nichts – top Tag!',
    date: daysAgo(3)
  },
  {
    dateKey: dateKey(daysAgo(4)),
    mood: 4,
    wentWell: 'ITPM-Stoff durchgearbeitet.',
    improve: 'Mehr Beispiele suchen.',
    date: daysAgo(4)
  }
].map(r => ({
  ...r,
  createdAt: r.date,
  updatedAt: r.date
}));

// --- Seed ---

async function seed() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);

    // Clear existing demo data
    await db.collection('sessions').deleteMany({});
    await db.collection('reflections').deleteMany({});
    console.log('Cleared existing sessions and reflections');

    // Insert sessions
    const sessionsResult = await db.collection('sessions').insertMany(demoSessions);
    console.log(`Inserted ${sessionsResult.insertedCount} sessions`);

    // Insert reflections
    const reflectionsResult = await db.collection('reflections').insertMany(demoReflections);
    console.log(`Inserted ${reflectionsResult.insertedCount} reflections`);

    // Ensure unique index on reflections.dateKey
    await db.collection('reflections').createIndex({ dateKey: 1 }, { unique: true });
    console.log('Index on reflections.dateKey ensured');

    console.log('\nSeed complete! Demo data:');
    console.log(`  ${demoSessions.length} sessions (last 14 days, 4 modules)`);
    console.log(`  ${demoReflections.length} reflections`);
    console.log('\nOpen the app to see the seeded data:');
    console.log('  npm run dev  →  http://localhost:5173');

  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
