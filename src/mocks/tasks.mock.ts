import { Task } from '../core/models/task.model';

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Setup project',
    description: 'Initialize Angular + Tailwind',
    priority: 'medium',
    dueDate: new Date(),
    completed: false,
  },
  {
    id: 2,
    title: 'Implement login',
    description: 'Email-only auth',
    priority: 'high',
    dueDate: new Date(),
    completed: false,
  },
  {
    id: 3,
    title: 'Create TaskStore',
    description: 'Signals-based state',
    priority: 'urgent',
    dueDate: new Date(),
    completed: false,
  },
];
