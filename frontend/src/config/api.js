const LOCAL_API_URL = 'http://127.0.0.1:8000';

function resolveApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (import.meta.env.DEV) {
    return LOCAL_API_URL;
  }

  throw new Error('VITE_API_URL must be set in production.');
}

export const API_BASE_URL = resolveApiBaseUrl();

export function apiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
