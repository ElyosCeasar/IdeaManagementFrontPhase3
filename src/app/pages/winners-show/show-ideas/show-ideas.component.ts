import { Component, OnInit, Input } from '@angular/core';
import { NzFormModule, NzInputModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { IdeaDetailForShowDto } from './../../../_model/idea/IdeaDetailForShowDto';
import { Router } from '@angular/router';
import { IdeaService } from './../../../_services/idea.service';
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
  idea: IdeaDetailForShowDto = new IdeaDetailForShowDto();
  constructor(private ideaService: IdeaService, private router: Router) { }



  ngOnInit() {
  }
  getIdea(ideaId: number) {
    this.ideaService.getSpecificIdea(ideaId).subscribe((data: IdeaDetailForShowDto) => {
      this.idea = data;
    },
      (err) => {

        alert('مشکل');
      });
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
    // if (this.showingComments === true) {

    // } else {

    // }
    // this.showingComments = !this.showingComments;
    this.router.navigateByUrl('/ideas/show/speceficIdea/' + this.ideaId);
  }
  changeVisiblety(id) {

    this.ideaId = id;
    this.getIdea(id);
    this.isVisible = !this.isVisible;

  }


}
