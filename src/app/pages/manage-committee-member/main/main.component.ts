import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-accounting-document-struct',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class ManageCommitteeMemberMainComponent implements OnInit {

  topForm = new FormGroup({
    full_name: new FormControl(),
    username: new FormControl(),
    position_type: new FormControl(),

  });

  constructor() { }

  ngOnInit() { }


  submit() {
    console.log(this.topForm);
  }



}
