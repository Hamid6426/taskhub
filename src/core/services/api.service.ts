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

  getTasks() {
    return wrapResponse(
      of(this.tasks()).pipe(delay(Math.random() * 500 + 200)),
      'Tasks retrieved successfully'
    );
  }

  getTask(id: number) {
    const task = this.tasks().find((t) => t.id === id);
    return task
      ? wrapResponse(of(task).pipe(delay(Math.random() * 300 + 100)), 'Task retrieved successfully')
      : throwError(() => new Error('Task not found'));
  }

  addTask(task: Task) {
    const current = this.tasks();
    this.tasks.set([...current, task]);
    this.persistTasks();
    return wrapResponse(of(task).pipe(delay(Math.random() * 500 + 200)), 'Task added successfully');
  }

  updateTask(task: Task) {
    const current = this.tasks().map((t) => (t.id === task.id ? task : t));
    this.tasks.set(current);
    this.persistTasks();
    return wrapResponse(
      of(task).pipe(delay(Math.random() * 500 + 200)),
      'Task updated successfully'
    );
  }

  deleteTask(id: number) {
    const current = this.tasks().filter((t) => t.id !== id);
    this.tasks.set(current);
    this.persistTasks();
    return wrapResponse(
      of(null).pipe(delay(Math.random() * 500 + 200)),
      'Task deleted successfully'
    );
  }

  login(email: string, password: string) {
    const user = this.users().find((u) => u.email === email);
    if (!user) {
      return throwError(() => new Error('User not found'));
    }

    if (password !== 'password') {
      return throwError(() => new Error('Invalid credentials'));
    }

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
    sessionStorage.removeItem('currentUser');
    return wrapResponse(of(true).pipe(delay(100)), 'Logout successful');
  }
}
