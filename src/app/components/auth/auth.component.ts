import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  @ViewChild('password') password: NgModel;
  loginError = false;
  private logInAttemptSub: Subscription = null;

  constructor(
    private checker: AuthService,
    public translate: TranslateService
  ) {
    this.translate.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.logInAttemptSub = this.checker.logInAttempt.subscribe((val) => {
      this.loginError = !val;
    });
  }

  onTranslate(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }
  ngOnDestroy(): void {
    this.logInAttemptSub.unsubscribe();
  }

  onSubmit() {
    this.checker.logIn(this.form.value.email, this.form.value.password);
  }
}
