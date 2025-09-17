import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    @if (loading) {
    <div class="flex justify-center items-center p-4">
      <div
        class="spinner-border animate-spin border-4 border-t-4 border-gray-500 rounded-full w-8 h-8"
      ></div>
    </div>
    }
  `,
})
export class Loader {
  @Input() loading = false;
}
