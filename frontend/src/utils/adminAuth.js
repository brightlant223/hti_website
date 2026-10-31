export class AdminAuthError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = 'AdminAuthError';
    this.status = status;
  }
}

export async function authenticateAdmin(username, password) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new AdminAuthError(
        data.detail || (
          response.status === 401
            ? 'Invalid credentials. Please verify your administrative username and security key.'
            : 'Authentication server error. Please try again.'
        ),
        response.status
      );
    }

    if (!data.token) {
      throw new AdminAuthError('Authentication server returned an invalid session.');
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new AdminAuthError('Authentication service timed out. Please try again.');
    }
    if (error instanceof AdminAuthError) throw error;
    throw new AdminAuthError('Cannot connect to authentication service. Please try again.');
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function clearAdminSession() {
  localStorage.removeItem('hti_admin_token');
  localStorage.removeItem('hti_admin_user');
  localStorage.removeItem('hti_admin_role');
}
