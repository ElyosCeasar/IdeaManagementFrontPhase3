import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-idea-page',
  templateUrl: './idea-page.component.html',
  styleUrls: ['./idea-page.component.less']
})
export class IdeaPageComponent implements OnInit {
  topForm = new FormGroup({
    title: new FormControl(),
    current_situation: new FormControl(),
    prerequisite: new FormControl(),
    steps: new FormControl(),
    advantages: new FormControl(),

  });
  isVisible = false;
  showingComments = false;
  ideaId = -1;
  constructor() { }



  ngOnInit() {
  }
  showModal(id: number): void {
    this.isVisible = true;
    console.log(id);
  }



  handleClose(): void {
    console.log('Button close clicked!');
    this.isVisible = false;
  }

  handleShowComments() {
    if (this.showingComments === true) {

    } else {

    }
    this.showingComments = !this.showingComments;
  }
  changeVisiblety(id) {
    console.log(id);
    this.isVisible = !this.isVisible;

  }


}
