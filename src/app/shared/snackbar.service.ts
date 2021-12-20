import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  affirmativeSnackbar(message: string, action: string) {
    this.snackbar.open(message, action , {
      panelClass: ["snack-affirmative", "snackbar-alert"]
    });
  }
  warningSnackbar(message: string, action: string) {
    this.snackbar.open('Warning: ' + message, action , {
      panelClass: ["snack-warning", "snackbar-alert"]
    });
  }
  errorSnackbar(message: string, action: string) {
    this.snackbar.open('Error: ' + message, action , {
      panelClass: ["snack-error", "snackbar-alert"]
    });
  }
}
