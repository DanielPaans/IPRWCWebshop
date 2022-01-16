import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, NgForm, ValidationErrors, ValidatorFn} from "@angular/forms";
import {group} from "@angular/animations";
import {Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user";
import {SnackbarService} from "../../shared/services/snackbar.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  constructor(private router: Router, private userService: UserService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  public signIn(): void {
    const FORM = this.form.value;
    const USER = new User(undefined, undefined,
                          FORM.username, undefined, FORM.email,
                    undefined, undefined, FORM.postalCode, FORM.city);

    this.userService.addUser(USER, FORM.password).subscribe({
      next: (user: User) => {
        this.form.reset();
        this.snackbarService.affirmativeSnackbar("Welcome " + user.username, "OK");
        this.router.navigate(['/payment']);
      }, error: err => {
          console.log(err);
      }
    });
  }

  public cancel(): void {
    this.router.navigate(["/payment"])
  }

}
