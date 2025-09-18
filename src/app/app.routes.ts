import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../shared/components/layouts/dashboard-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./dashboard/task-list.component').then((m) => m.TaskListComponent),
      },
      {
        path: 'create-task',
        loadComponent: () =>
          import('./dashboard/create-task.component').then((m) => m.CreateTaskComponent),
      },
    ],
  },
  // redirected to login on 404
  {
    path: '**',
    redirectTo: 'login',
  },
];
