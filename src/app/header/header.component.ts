import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/login/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpCommincationService } from '../services/httpCommunication.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    public translate: TranslateService,
    private comService: HttpCommincationService
  ) {
    this.translate.use(localStorage.getItem('lang') || 'en');
  }
  filter: Subject<string>;
  loggedIn: boolean = null;
  loggedInSub: Subscription = null;
  curLanguage = localStorage.getItem('lang');
  languageSub: Subscription;
  ngOnInit() {
    this.isUserLoggedIn();
    this.setFilter();
    this.subscribeToLanguage();
  }
  onLogOut() {
    this.auth.logOut();
    this.loggedIn = false;
  }

  onChangeCategory(cat: string) {
    this.filter.next(cat);
  }

  isUserLoggedIn() {
    this.loggedInSub = this.auth.isLoggedIn.subscribe(
      (isLoggedIn) => (this.loggedIn = !!isLoggedIn)
    );
  }

  setFilter() {
    this.filter = this.comService.filter;
  }

  onTranslate() {
    const curLanguage = localStorage.getItem('lang');
    if (curLanguage) {
      if (curLanguage === 'en') {
        this.translate.use('ar');
        localStorage.setItem('lang', 'ar');
        this.auth.language.next('ar');
      } else {
        this.translate.use('en');
        localStorage.setItem('lang', 'en');
        this.auth.language.next('en');
      }
    } else {
      this.translate.use('ar');
      localStorage.setItem('lang', 'ar');
    }
  }

  subscribeToLanguage() {
    this.languageSub = this.auth.language.subscribe(
      (val) => (this.curLanguage = val)
    );
  }
  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
    this.languageSub.unsubscribe();
  }
}
