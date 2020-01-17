import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { ShowIdeasComponent } from './../show-ideas/show-ideas.component';

@Component({
  selector: 'app-accounting-document-struct',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class WinnersShowMainComponent implements OnInit {


  @ViewChild('modalShowIdea', { static: false }) showIdeasComponent: ShowIdeasComponent;
  topForm = new FormGroup({
    year: new FormControl(),
    month: new FormControl(),

  });

  constructor() { }

  ngOnInit() { }


  changeVisibletyOfModal(id) {

    this.showIdeasComponent.changeVisiblety(id);

  }

  submit() {

  }


}
