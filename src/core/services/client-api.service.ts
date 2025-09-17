import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { of, delay, throwError } from 'rxjs';
import { MOCK_TASKS } from '../../mocks/tasks.mock';
import { MOCK_USERS } from '../../mocks/users.mock';
import { wrapResponse } from '../../shared/utils/response-wrapper';

@Injectable({ providedIn: 'root' })
export class ClientApiService {
  private tasks = signal<Task[]>(MOCK_TASKS);
  private users = signal<User[]>(MOCK_USERS);
  private currentUser = signal<User | null>(null);

  constructor() {
    this.loadTasksFromStorage();
    this.loadCurrentUserFromStorage();
  }

  private loadTasksFromStorage() {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks.set(JSON.parse(savedTasks));
      } else {
        this.tasks.set([...MOCK_TASKS]);
        this.persistTasks();
      }
    }
  }

  private persistTasks() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    }
  }

  private loadCurrentUserFromStorage() {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) this.currentUser.set(JSON.parse(savedUser));
    }
  }

  /** Get tasks based on role */
  getTasks() {
    const user = this.currentUser();
    if (!user) return throwError(() => new Error('Not logged in'));

    const visibleTasks =
      user.role === 'admin' ? this.tasks() : this.tasks().filter((t) => t.assigneeId === user.id);

    return wrapResponse(of(visibleTasks).pipe(delay(Math.random() * 500 + 200)), 'Tasks retrieved');
  }

  getTask(id: number) {
    const task = this.tasks().find((t) => t.id === id);
    if (!task) return throwError(() => new Error('Task not found'));

    const user = this.currentUser();
    if (!user) return throwError(() => new Error('Not logged in'));
    if (user.role !== 'admin' && task.assigneeId !== user.id)
      return throwError(() => new Error('Access denied'));

    return wrapResponse(of(task).pipe(delay(Math.random() * 300 + 100)), 'Task retrieved');
  }

  /** Only admin can add tasks */
  addTask(task: Task) {
    const user = this.currentUser();
    if (!user || user.role !== 'admin') return throwError(() => new Error('Permission denied'));

    const nextId = Math.max(...this.tasks().map((t) => t.id), 0) + 1;
    const newTask: Task = {
      ...task,
      id: nextId,
      status: task.status ?? 'to_do',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.set([...this.tasks(), newTask]);
    this.persistTasks();
    return wrapResponse(of(newTask).pipe(delay(Math.random() * 500 + 200)), 'Task added');
  }

  /** Admin can update any task; user can update only their task status */
  updateTask(task: Task) {
    const user = this.currentUser();
    if (!user) return throwError(() => new Error('Not logged in'));

    const existing = this.tasks().find((t) => t.id === task.id);
    if (!existing) return throwError(() => new Error('Task not found'));

    if (user.role !== 'admin' && existing.assigneeId !== user.id)
      return throwError(() => new Error('Permission denied'));

    const updatedTask: Task =
      user.role === 'admin'
        ? { ...task, updatedAt: new Date() }
        : { ...existing, status: task.status, updatedAt: new Date() };

    this.tasks.set(this.tasks().map((t) => (t.id === task.id ? updatedTask : t)));
    this.persistTasks();

    return wrapResponse(of(updatedTask).pipe(delay(Math.random() * 500 + 200)), 'Task updated');
  }

  /** Only admin can delete */
  deleteTask(id: number) {
    const user = this.currentUser();
    if (!user || user.role !== 'admin') return throwError(() => new Error('Permission denied'));

    this.tasks.set(this.tasks().filter((t) => t.id !== id));
    this.persistTasks();

    return wrapResponse(of(null).pipe(delay(Math.random() * 500 + 200)), 'Task deleted');
  }

  /** USER METHODS */
  login(email: string, password: string) {
    const user = this.users().find((u) => u.email === email);
    if (!user) return throwError(() => new Error('User not found'));
    if (password !== 'password') return throwError(() => new Error('Invalid credentials'));

    this.currentUser.set(user);
    if (typeof window !== 'undefined') localStorage.setItem('currentUser', JSON.stringify(user));

    return wrapResponse(of(user).pipe(delay(500)), 'Login successful');
  }

  logout() {
    this.currentUser.set(null);
    if (typeof window !== 'undefined') localStorage.removeItem('currentUser');

    return wrapResponse(of(true).pipe(delay(100)), 'Logout successful');
  }

  getCurrentUser() {
    return this.currentUser();
  }
}
