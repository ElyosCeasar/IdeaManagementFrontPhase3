import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { ShowIdeasComponent } from './../show-ideas/show-ideas.component';
import { AlertifyService } from './../../../_services/alertify.service';
import { AuthService } from './../../../_services/auth.service';
import { Router } from '@angular/router';
import { IdeaService } from './../../../_services/idea.service';
import { IdeaForShowDto } from './../../../_model/idea/IdeaForShowDto';



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
  years: number[] = [];
  gridDataNotDecidedIdea: IdeaForShowDto[] = [];
  gridDataCurrentMontDecidedIdea: IdeaForShowDto[] = [];
  // isVisible = false;
  constructor(private ideaService: IdeaService, private router: Router, private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.fillGridNotDecidedIdea();
    this.fillGridCurrentMontDecidedIdea();
    this.fillYears();
  }
  fillGridNotDecidedIdea() {
    this.ideaService.getAllNotDecidedIdea().subscribe((data: IdeaForShowDto[]) => {

      this.gridDataNotDecidedIdea = data;
    },
      (err) => {

        alert('مشکل');
      });

  }
  fillGridCurrentMontDecidedIdea() {
    this.ideaService.getAllCurrentMontDecidedIdea().subscribe((data: IdeaForShowDto[]) => {

      this.gridDataCurrentMontDecidedIdea = data;
    },
      (err) => {

        alert('مشکل');
      });

  }

  fillYears() {
    this.ideaService.getYearsFromLastIdea().subscribe((data: number[]) => {
      this.years = data;
    },
      (err) => {
        alert('مشکل');
      });
  }


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
