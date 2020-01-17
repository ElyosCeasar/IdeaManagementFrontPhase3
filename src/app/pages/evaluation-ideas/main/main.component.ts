import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { ShowIdeasComponent } from './../show-ideas/show-ideas.component';



@Component({
  selector: 'app-accounting-document-struct',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class EvaluationIdeasMainComponent implements OnInit {
  @ViewChild('modalShowIdea', { static: false }) showIdeasComponent: ShowIdeasComponent;
  topForm = new FormGroup({
    year: new FormControl(),
    month: new FormControl(),

  });
  // isVisible = false;

  constructor() { }

  ngOnInit() { }


  submit() {
    console.log(this.topForm);
  }

  // showModal(id: number): void {
  //   this.isVisible = true;
  //   console.log(id);
  // }



  // handleClose(): void {
  //   console.log('Button close clicked!');
  //   this.isVisible = false;
  // }

  changeVisibletyOfModal(id) {

    this.showIdeasComponent.changeVisiblety(id);

  }

}
