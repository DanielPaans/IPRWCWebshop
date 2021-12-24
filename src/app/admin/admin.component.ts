import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authenticationService.logout();
  }

}
