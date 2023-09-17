import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import user from 'src/app/Types/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  @ViewChild('password') password: NgModel;
  loginError = false;
  curLanguage = localStorage.getItem('lang');
  private logInAttemptSub: Subscription = null;
  private languageSub: Subscription;

  constructor(private auth: AuthService, public translate: TranslateService) {
    this.checkLanguage();
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  ngOnDestroy(): void {
    this.logInAttemptSub.unsubscribe();
    this.languageSub.unsubscribe();
  }

  onSubmit() {
    this.auth.logIn(this.form.value.email, this.form.value.password);
  }

  onSignUp() {
    const curUser: user = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.auth.signUpUser(curUser);
  }
  checkLoginStatus() {
    this.logInAttemptSub = this.auth.isLoggedIn.subscribe((val) => {
      this.loginError = !val;
    });
  }

  checkLanguage() {
    this.languageSub = this.auth.language.subscribe(
      (val) => (this.curLanguage = val)
    );
  }
}
