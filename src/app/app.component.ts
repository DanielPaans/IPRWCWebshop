import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./shared/services/user.service";
import {AuthenticationService} from "./shared/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {


  constructor(private authenticationService: AuthenticationService, private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.authenticationService.autoLogin();
    this.cd.detectChanges();
  }

}
