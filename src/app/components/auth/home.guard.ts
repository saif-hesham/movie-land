import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export const homeGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): void => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = auth.checkUser();

  if (isLoggedIn) {
    router.navigate(['/movies']);
  } else {
    router.navigate(['/auth']);
  }
};
