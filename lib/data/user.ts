import type { User } from 'lucia';

export async function getCurrentUser(): Promise<User | null> {
  const response = await fetch('/api/user');
  const user = await response.json();

  return user;
}
