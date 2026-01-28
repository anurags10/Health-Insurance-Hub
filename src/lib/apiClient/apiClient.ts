export default async function apiClient(
  url: string,
  options: RequestInit = {}
) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
  const res = await fetch(`${baseURL}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();
  return data;
}
