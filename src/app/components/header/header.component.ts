import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpCommincationService } from '../catalog/httpCommunication.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    translate: TranslateService,
    private comService: HttpCommincationService
  ) {}
  filterSub: Subject<string>;
  loggedIn: boolean = null;
  loggedInSub = null;
  ngOnInit() {
    this.loggedInSub = this.auth.isLoggedIn.subscribe(
      (isLoggedIn) => (this.loggedIn = !!isLoggedIn)
    );
    this.filterSub = this.comService.filter;
  }
  onLogOut() {
    this.auth.logOut();
    this.loggedIn = false;
  }

  onChangeCategory(cat: string) {
    this.filterSub.next(cat);
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
    // this.filterSub.unsubscribe();
  }
}
