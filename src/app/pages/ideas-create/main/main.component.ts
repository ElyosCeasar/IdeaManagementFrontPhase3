import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-accounting-document-struct',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class IdeasCreateMainComponent implements OnInit {

  topForm = new FormGroup({
    title: new FormControl(),
    current_situation: new FormControl(),
    prerequisite: new FormControl(),
    steps: new FormControl(),
    advantages: new FormControl(),

  });

  constructor() { }

  ngOnInit() { }






}
