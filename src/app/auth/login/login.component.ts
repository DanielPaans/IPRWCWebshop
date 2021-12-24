import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public login(): void {
    let authObs: Observable<{role: string, jwt: string}>;

    authObs = this.authenticationService.authenticate(this.form.value.username, this.form.value.password);

    authObs.subscribe({
      next: () => {
        console.log('user retrieved');
        console.log(this.userService.user.value);
        if (this.userService.user.value.role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        }
      }, error: err => {
        console.log(err.error);
        //TODO: error handling
      }
    });

    this.form.reset();
  }

}
