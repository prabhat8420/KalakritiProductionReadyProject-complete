import { API_BASE_URL } from '@/lib/config';

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('kalakriti_token') : null;
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers as Record<string, string>),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.detail?.message || errorData.message || `Request failed with status ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (err: any) {
    return { error: err.message || 'Network error occurred' };
  }
}

export async function uploadImage(file: File): Promise<{ url?: string; secure_url?: string; error?: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await apiClient<{ secure_url: string; url: string; public_id: string }>('/uploads/image', {
    method: 'POST',
    body: formData,
  });
  if (res.error) {
    return { error: res.error };
  }
  const url = res.data?.secure_url || res.data?.url;
  return { url, secure_url: url };
}

