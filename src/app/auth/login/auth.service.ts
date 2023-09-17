import { Injectable } from '@angular/core';
import users from '../usersDb';
import user from 'src/app/Types/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = new Subject<boolean>();
  language = new Subject<string>();
  private user: user = null;

  constructor(private router: Router) {}

  logIn(email: string, password: string) {
    this.user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!!this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
      this.isLoggedIn.next(true);
      this.router.navigate(['/movies']);
    } else {
      this.isLoggedIn.next(false);
    }
  }

  signUpUser(userObj: user) {
    localStorage.setItem('user', JSON.stringify(userObj));
    this.isLoggedIn.next(true);
    this.router.navigate(['/movies']);
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
