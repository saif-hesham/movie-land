import { Injectable } from '@angular/core';
import users from './usersDb';
import user from 'src/app/Models/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = new Subject<boolean>();
  logInAttempt = new Subject<boolean>();
  private user: user = null;

  constructor(private router: Router) {}

  logIn(email: string, password: string) {
    this.user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!!this.user) {
      console.log('user found');
      localStorage.setItem('user', JSON.stringify(this.user));
      this.isLoggedIn.next(true);
      this.router.navigate(['/movies']);
      this.logInAttempt.next(true);
    } else {
      this.logInAttempt.next(false);
    }
  }

  checkUser() {
    if (!!localStorage.getItem('user')) {
      this.isLoggedIn.next(true);
    }
    return !!localStorage.getItem('user');
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
  }
}
