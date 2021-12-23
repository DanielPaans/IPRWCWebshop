import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./shared/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getStoredUser();
  }

  ngOnDestroy(): void {
  }


}
