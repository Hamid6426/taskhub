import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { of, delay, throwError } from 'rxjs';
import { MOCK_TASKS } from '../../mocks/tasks.mock';
import { MOCK_USERS } from '../../mocks/users.mock';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private tasks = signal<Task[]>([]);
  private users = signal<User[]>([]);

  constructor() {
    // Load tasks from localStorage if available, else use mocks
    const savedTasks = localStorage.getItem('tasks');
    this.tasks.set(savedTasks ? JSON.parse(savedTasks) : [...MOCK_TASKS]);

    // Load users (mocks only, no persistence)
    this.users.set([...MOCK_USERS]);
  }

  private persistTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  getTasks() {
    return of(this.tasks()).pipe(
      delay(Math.random() * 500 + 200) // simulate network latency
    );
  }

  getTask(id: number) {
    const task = this.tasks().find((t) => t.id === id);
    return task
      ? of(task).pipe(delay(Math.random() * 300 + 100))
      : throwError(() => new Error('Task not found'));
  }

  addTask(task: Task) {
    const current = this.tasks();
    // Optimistic update
    this.tasks.set([...current, task]);
    this.persistTasks();

    // Simulate async call with possible random error
    return of(task).pipe(
      delay(Math.random() * 500 + 200)
      // Optionally simulate error
      // switchMap(() => Math.random() < 0.1 ? throwError(() => new Error('Failed to add task')) : of(task))
    );
  }

  updateTask(task: Task) {
    const current = this.tasks().map((t) => (t.id === task.id ? task : t));
    // Optimistic update
    this.tasks.set(current);
    this.persistTasks();

    return of(task).pipe(delay(Math.random() * 500 + 200));
  }

  deleteTask(id: number) {
    const current = this.tasks().filter((t) => t.id !== id);
    this.tasks.set(current);
    this.persistTasks();

    return of(null).pipe(delay(Math.random() * 500 + 200));
  }

  // Mock login (email only, no password)
  login(email: string) {
    const user = this.users().find((u) => u.email === email);
    if (!user) return throwError(() => new Error('User not found'));

    // persist current user in sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(user));

    return of(user).pipe(delay(Math.random() * 400 + 100));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    return of(true).pipe(delay(100));
  }
}
