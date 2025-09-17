import { User } from '../core/models/user.model';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'password',  // mock password
    role: 'admin',
    createdAt: new Date('2025-01-01T09:00:00Z'),
    updatedAt: new Date('2025-01-01T09:00:00Z'),
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'password',  // mock password
    role: 'user',
    createdAt: new Date('2025-01-02T09:00:00Z'),
    updatedAt: new Date('2025-01-02T09:00:00Z'),
  },
];
