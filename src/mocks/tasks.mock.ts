import { Task } from '../core/models/task.model';

const now = new Date();

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Setup project',
    description: 'Initialize Angular + Tailwind',
    priority: 'medium',
    dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    title: 'Implement login',
    description: 'Email-only auth',
    priority: 'high',
    dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    title: 'Create TaskStore',
    description: 'Signals-based state',
    priority: 'urgent',
    dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
];
