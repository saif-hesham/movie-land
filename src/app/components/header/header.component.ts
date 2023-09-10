import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService, translate: TranslateService) {}
  loggedIn: boolean = null;
  loggedInSub = null;
  ngOnInit() {
    this.loggedInSub = this.auth.isLoggedIn.subscribe(
      (isLoggedIn) => (this.loggedIn = !!isLoggedIn)
    );
  }
  onLogOut() {
    this.auth.logOut();
    this.loggedIn = false;
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
