export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  cooperativeId: string;
  roleId: string;
  roleCode: string;
  memberId: string | null;
};

const AUTH_SESSION_STORAGE_KEY = "lumbera.auth-session";

export const saveAuthSession = (session: AuthSession) => {
  window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
};

export const getAuthSession = () => {
  const rawValue = window.localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as AuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return null;
  }
};

export const clearAuthSession = () => {
  window.localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
};
