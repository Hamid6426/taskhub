export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'to_do' | 'in_progress' | 'done' | 'blocked';

export interface Task {
  id: number; // unique ID
  title: string; // required, unique
  description?: string; // optional
  dueDate: Date; // cannot be in the past
  priority: TaskPriority; // priority level
  status: TaskStatus; // Current status
  assigneeId: number | null; // User ID of the assignee, nullable until someone is decided.
  createdById: number; // User ID of the creator (admin)
  createdAt: Date; // auto timestamp
  updatedAt: Date; // auto timestamp
}
