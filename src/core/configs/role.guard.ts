import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const session = inject(SessionStorageService);
  const user = session.get<{ role: string }>('currentUser');

  const allowedRoles = route.data['roles'] as string[] | undefined;
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
