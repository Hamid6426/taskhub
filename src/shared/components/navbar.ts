import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="flex justify-between p-4 bg-gray-800 text-white">
      <a routerLink="/" class="font-bold">TaskHub</a>
      <div>
        <a routerLink="/tasks" class="mr-4">Tasks</a>
        <a routerLink="/login">Login</a>
      </div>
    </nav>
  `,
})
export class Navbar {
  isCollapsed = signal(false);
}
