import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./shared/services/user.service";
import {AuthenticationService} from "./shared/services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.autoLogin();
  }

  ngOnDestroy(): void {
  }


}
