import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";
import {Subscription} from "rxjs";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public loggedIn = false;

  private loginSub: Subscription;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginSub = this.authenticationService.loggedIn.subscribe({
      next: value => {
        this.loggedIn = <boolean> value;
      }, error: err => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }

}
