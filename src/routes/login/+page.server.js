import { registerUser, loginUser, createSession, deleteSession } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
  register: async ({ request, cookies }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const password = data.get('password')?.toString();
    const confirmPassword = data.get('confirmPassword')?.toString();

    if (!name || !email || !password) {
      return { success: false, error: 'Alle Felder sind erforderlich.', mode: 'register' };
    }
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwörter stimmen nicht überein.', mode: 'register' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Passwort muss mindestens 6 Zeichen haben.', mode: 'register' };
    }

    const result = await registerUser(name, email, password);
    if (!result.success) {
      return { success: false, error: result.error, mode: 'register' };
    }

    // Auto-Login nach Registrierung
    const loginResult = await loginUser(email, password);
    if (loginResult.success) {
      const token = await createSession(loginResult.user.id, loginResult.user.name);
      cookies.set('session', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30
      });
    }

    throw redirect(303, '/');
  },

  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString().trim();
    const password = data.get('password')?.toString();

    if (!email || !password) {
      return { success: false, error: 'E-Mail und Passwort erforderlich.', mode: 'login' };
    }

    const result = await loginUser(email, password);
    if (!result.success) {
      return { success: false, error: result.error, mode: 'login' };
    }

    const token = await createSession(result.user.id, result.user.name);
    cookies.set('session', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    });

    throw redirect(303, '/');
  },

  logout: async ({ cookies }) => {
    const token = cookies.get('session');
    await deleteSession(token);
    cookies.delete('session', { path: '/' });
    throw redirect(303, '/login');
  }
};
