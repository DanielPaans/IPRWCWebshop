import {Attribute, Directive, Input} from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidatorFn} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: PasswordValidatorDirective,
      multi: true
    }
  ]
})
export class PasswordValidatorDirective {

  public validator: ValidatorFn;

  constructor(@Attribute('appPasswordValidator') public PasswordControl: string) { }

  public validate(c: FormControl) {

    const password = c.root.get(this.PasswordControl);
    const confirmPassword = c;

    if (confirmPassword.value === null) {
      return null;
    }

    if (password) {
      const subscription: Subscription = password.valueChanges.subscribe(() => {
        confirmPassword.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }

    return password && password.value !== confirmPassword.value ? { passwordMatchError: true} : null;
  }

}
