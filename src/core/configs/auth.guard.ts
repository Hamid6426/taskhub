import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const session = inject(SessionStorageService);

  const user = session.get('currentUser');
  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
