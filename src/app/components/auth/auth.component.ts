import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

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

  constructor(private checker: AuthService) {}

  ngOnInit(): void {
    this.logInAttemptSub = this.checker.logInAttempt.subscribe((val) => {
      this.loginError = !val;
      console.log(!val);
    });
  }

  ngOnDestroy(): void {
    this.logInAttemptSub.unsubscribe();
  }

  onSubmit() {
    this.checker.logIn(this.form.value.email, this.form.value.password);
  }
}
