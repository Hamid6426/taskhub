export type UserRole = 'user' | 'admin';

export interface User {
  id: number; // unique ID
  email: string; // must end with @example.com
  password?: string; // optional (mock only)
  role: UserRole; // role-based access
  createdAt?: Date; // timestamp
  updatedAt?: Date; // timestamp
}
