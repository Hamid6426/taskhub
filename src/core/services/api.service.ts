import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { of, delay, throwError } from 'rxjs';
import { MOCK_TASKS } from '../../mocks/tasks.mock';
import { MOCK_USERS } from '../../mocks/users.mock';
import { wrapResponse } from '../../shared/utils/response-wrapper';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private tasks = signal<Task[]>(MOCK_TASKS);
  private users = signal<User[]>(MOCK_USERS);
  private currentUser = signal<User | null>(null);

  constructor() {
    // Load tasks from localStorage if available, else use mocks
    if (typeof window !== 'undefined') {
      // Browser-only logic
      const savedTasks = localStorage.getItem('tasks');
      this.tasks.set(savedTasks ? JSON.parse(savedTasks) : [...MOCK_TASKS]);
    }

    // Load users (mocks only, no persistence)
    this.users.set([...MOCK_USERS]);
  }

  private persistTasks() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    }
  }

  /** Get tasks based on role */
  getTasks() {
    const user = this.currentUser();
    if (!user) return throwError(() => new Error('Not logged in'));

    const allTasks = this.tasks();
    const visibleTasks =
      user.role === 'admin' ? allTasks : allTasks.filter((t) => t.assigneeId === user.id);

    return wrapResponse(of(visibleTasks).pipe(delay(Math.random() * 500 + 200)), 'Tasks retrieved');
  }

  getTask(id: number) {
    const task = this.tasks().find((t) => t.id === id);
    if (!task) return throwError(() => new Error('Task not found'));

    const user = this.currentUser();
    if (!user) return throwError(() => new Error('Not logged in'));

    if (user.role !== 'admin' && task.assigneeId !== user.id) {
      return throwError(() => new Error('Access denied'));
    }

    return wrapResponse(of(task).pipe(delay(Math.random() * 300 + 100)), 'Task retrieved');
  }

  /** Only admin can add tasks */
  addTask(task: Task) {
    const user = this.currentUser();
    if (!user || user.role !== 'admin') return throwError(() => new Error('Permission denied'));

    const current = this.tasks();
    this.tasks.set([...current, task]);
    this.persistTasks();
    return wrapResponse(of(task).pipe(delay(Math.random() * 500 + 200)), 'Task added');
  }

  /** Admin can update any task; user can update only their task status */
  updateTask(task: Task) {
    const user = this.currentUser();
    if (!user) return throwError(() => new Error('Not logged in'));

    const current = this.tasks();
    const existing = current.find((t) => t.id === task.id);
    if (!existing) return throwError(() => new Error('Task not found'));

    // User restrictions
    if (user.role !== 'admin') {
      if (existing.assigneeId !== user.id) return throwError(() => new Error('Permission denied'));

      // Users can only update status
      this.tasks.set(
        current.map((t) =>
          t.id === task.id ? { ...t, status: task.status, updatedAt: new Date() } : t
        )
      );
    } else {
      // Admin can update any field
      this.tasks.set(
        current.map((t) => (t.id === task.id ? { ...task, updatedAt: new Date() } : t))
      );
    }

    this.persistTasks();
    return wrapResponse(of(task).pipe(delay(Math.random() * 500 + 200)), 'Task updated');
  }

  /** Only admin can delete */
  deleteTask(id: number) {
    const user = this.currentUser();
    if (!user || user.role !== 'admin') return throwError(() => new Error('Permission denied'));

    const current = this.tasks().filter((t) => t.id !== id);
    this.tasks.set(current);
    this.persistTasks();
    return wrapResponse(of(null).pipe(delay(Math.random() * 500 + 200)), 'Task deleted');
  }

  /** USER METHODS */
  login(email: string, password: string) {
    const user = this.users().find((u) => u.email === email);
    if (!user) return throwError(() => new Error('User not found'));
    if (password !== 'password') return throwError(() => new Error('Invalid credentials'));

    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error saving to sessionStorage', error);
    }

    return wrapResponse(of(user).pipe(delay(500)), 'Login successful');
  }

  logout() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('currentUser');
    }
    return wrapResponse(of(true).pipe(delay(100)), 'Logout successful');
  }

  getCurrentUser() {
    return this.currentUser();
  }
}
