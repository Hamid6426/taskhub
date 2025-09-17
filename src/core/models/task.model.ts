export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: number; // unique ID
  title: string; // required, unique
  description?: string; // optional
  dueDate: Date; // cannot be in the past
  priority: TaskPriority; // priority level
  completed: boolean; // status
  createdAt?: Date; // auto timestamp
  updatedAt?: Date; // auto timestamp
}
