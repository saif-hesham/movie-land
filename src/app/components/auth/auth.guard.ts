import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export const isUserLoggedInGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = auth.checkUser();

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/auth']);
  }
};
