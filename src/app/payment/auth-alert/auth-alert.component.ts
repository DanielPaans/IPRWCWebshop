import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PaymentComponent} from "../payment.component";
import {SignupComponent} from "../../auth/signup/signup.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-alert',
  templateUrl: './auth-alert.component.html',
  styleUrls: ['./auth-alert.component.scss']
})
export class AuthAlertComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  @ViewChild(SignupComponent) signup: SignupComponent;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onClose(): void {
    this.close.emit()
  }

  public logIn(): void {
    this.router.navigate(['/login']);
  }

  public signUp(): void {
    this.router.navigate(['/signup']);
  }
}
