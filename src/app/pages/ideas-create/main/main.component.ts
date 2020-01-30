import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { IdeaService } from './../../../_services/idea.service';
import { NewIdeaDto } from './../../../_model/idea/NewIdeaDto';
import { AuthService } from './../../../_services/auth.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { Router } from '@angular/router';


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

  constructor(private ideaService: IdeaService, private router: Router, private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() { }

  submitForm() {
    // console.log(this.topForm.value);
    const model = new NewIdeaDto();
    model.Advantages = this.topForm.value.advantages;
    model.CurrentSituation = this.topForm.value.current_situation;
    model.Prerequisite = this.topForm.value.prerequisite;
    model.Steps = this.topForm.value.steps;
    model.Title = this.topForm.value.title;
    model.Username = this.authService.getUsername();
    this.ideaService.sendNewIdea(model).subscribe((data) => {
      this.alertifyService.success(data + "");
      this.router.navigateByUrl('/ideas/show');
    },
      (err) => {
        alert('مشکل');
      });
  }




}
