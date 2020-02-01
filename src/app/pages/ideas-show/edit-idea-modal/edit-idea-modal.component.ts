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
import { ChangedIdeaDto } from './../../../_model/idea/ChangedIdeaDto';
import { AuthService } from './../../../_services/auth.service';
import { AlertifyService } from './../../../_services/alertify.service';
@Component({
  selector: 'app-edit-idea-modal',
  templateUrl: './edit-idea-modal.component.html',
  styleUrls: ['./edit-idea-modal.component.less']
})
export class EditIdeaModalComponent implements OnInit {


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
  that;// for calling parent methouds
  idea: IdeaDetailForShowDto = new IdeaDetailForShowDto();
  constructor(private ideaService: IdeaService, private authService: AuthService, private router: Router, private alertifyService: AlertifyService) { }



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

    this.isVisible = false;
  }

  handleSave() {
    const model = new ChangedIdeaDto();

    model.Username = this.authService.getUsername();
    model.Title = this.topForm.value.title;
    model.CurrentSituation = this.topForm.value.current_situation;
    model.Advantages = this.topForm.value.advantages;
    model.Prerequisite = this.topForm.value.prerequisite;
    model.Steps = this.topForm.value.steps;
    this.ideaService.editIdea(this.ideaId, model).subscribe((data) => {
      this.alertifyService.success(data + "");
      this.that.getIdea(this.ideaId);

      this.handleClose()
    },
      (err) => {
        alert('مشکل');
      });

  }
  changeVisiblety(id, that) {
    this.that = that;
    this.ideaId = id;
    this.getIdea(id);
    this.isVisible = !this.isVisible;

  }


}
