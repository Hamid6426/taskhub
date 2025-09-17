import { Task, TaskPriority, TaskStatus } from '../core/models/task.model';

const now = new Date();

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Setup project',
    description: 'Initialize Angular + Bootstrap',
    priority: 'medium' as TaskPriority,
    status: 'to_do' as TaskStatus,
    assigneeId: 2, // unassigned initially
    createdById: 1, // admin user ID
    dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    title: 'Implement login',
    description: 'Email-only auth',
    priority: 'high' as TaskPriority,
    status: 'to_do' as TaskStatus,
    assigneeId: null, // unassigned
    createdById: 1, // admin user ID
    dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    title: 'Create TaskStore',
    description: 'Signals-based state',
    priority: 'urgent' as TaskPriority,
    status: 'to_do' as TaskStatus,
    assigneeId: null, // unassigned
    createdById: 1, // admin user ID
    dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    createdAt: now,
    updatedAt: now,
  },
];
