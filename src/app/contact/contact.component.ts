import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {KeyValue, KeyValuePipe} from "@angular/common";
import {SnackbarService} from "../shared/services/snackbar.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  constructor(private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    //Todo: send email
    this.snackbarService.affirmativeSnackbar('Email send', 'OK');
    this.form.reset();
  }
}
