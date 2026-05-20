import { getDb } from '$lib/server/db.js';
import { randomBytes, createHash } from 'crypto';

export async function getUsers() {
  const db = await getDb();
  return db.collection('users');
}

export function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

export function generateToken() {
  return randomBytes(32).toString('hex');
}

export async function registerUser(name, email, password) {
  const col = await getUsers();
  const existing = await col.findOne({ email: email.toLowerCase() });
  if (existing) {
    return { success: false, error: 'E-Mail bereits registriert.' };
  }
  const hashed = hashPassword(password);
  const user = {
    name,
    email: email.toLowerCase(),
    password: hashed,
    createdAt: new Date()
  };
  const result = await col.insertOne(user);
  return { success: true, userId: result.insertedId.toString() };
}

export async function loginUser(email, password) {
  const col = await getUsers();
  const user = await col.findOne({ email: email.toLowerCase() });
  if (!user) {
    return { success: false, error: 'E-Mail oder Passwort falsch.' };
  }
  const hashed = hashPassword(password);
  if (user.password !== hashed) {
    return { success: false, error: 'E-Mail oder Passwort falsch.' };
  }
  return {
    success: true,
    user: { id: user._id.toString(), name: user.name, email: user.email }
  };
}

export async function createSession(userId, userName) {
  const db = await getDb();
  const sessions = db.collection('auth_sessions');
  const token = generateToken();
  await sessions.insertOne({
    token,
    userId,
    userName,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  });
  return token;
}

export async function validateSession(token) {
  if (!token) return null;
  const db = await getDb();
  const sessions = db.collection('auth_sessions');
  const session = await sessions.findOne({
    token,
    expiresAt: { $gt: new Date() }
  });
  if (!session) return null;
  return { userId: session.userId, userName: session.userName };
}

export async function deleteSession(token) {
  if (!token) return;
  const db = await getDb();
  const sessions = db.collection('auth_sessions');
  await sessions.deleteOne({ token });
}
