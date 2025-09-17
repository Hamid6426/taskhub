import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CookieStorageService {
  set(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  get(name: string) {
    return document.cookie.split('; ').reduce((r, v) => {
      const [key, val] = v.split('=');
      return key === name ? decodeURIComponent(val) : r;
    }, '');
  }

  delete(name: string) {
    this.set(name, '', -1);
  }
}
