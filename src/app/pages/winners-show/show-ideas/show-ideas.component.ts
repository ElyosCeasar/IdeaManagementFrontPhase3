import { Component, OnInit, Input } from '@angular/core';
import { NzFormModule, NzInputModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@Component({
  selector: 'app-show-ideas',
  templateUrl: './show-ideas.component.html',
  styleUrls: ['./show-ideas.component.less']
})
export class ShowIdeasComponent implements OnInit {

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
