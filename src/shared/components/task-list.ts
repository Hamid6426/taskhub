import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCard } from './task-card';
import { Loader } from './loader';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCard, Loader],
  template: `
    <app-loader *ngIf="loading"></app-loader>
    <div *ngIf="!loading" class="row row-cols-1 row-cols-md-2 g-4">
      <app-task-card
        *ngFor="let task of tasks"
        [task]="task"
        (selectTask)="selectTask.emit($event)"
        (deleteTask)="deleteTask.emit($event)"
      ></app-task-card>
    </div>
  `,
})
export class TaskList {
  @Input() tasks: Task[] = [];
  @Input() loading = false;

  @Output() selectTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();
}
