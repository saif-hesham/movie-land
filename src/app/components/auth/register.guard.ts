import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export const registerGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = auth.checkUser();

  if (isLoggedIn) {
    router.navigate(['/movies']);
  } else {
    return true;
  }
};
