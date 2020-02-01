import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from './../../../_services/auth.service';
import { IdeaService } from './../../../_services/idea.service';
import { FilterIdeaRequestDto } from './../../../_model/idea/FilterIdeaRequestDto';
import { AlertifyService } from './../../../_services/alertify.service';
import { IdeaForShowDto } from './../../../_model/idea/IdeaForShowDto';
import { IdeaStatusDto } from './../../../_model/idea/IdeaStatusDto';
import { IdeaPointDto } from './../../../_model/idea/IdeaPointDto';
@Component({
  selector: 'app-ideas-show-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class IdeasShowMainComponent implements OnInit {

  topForm = new FormGroup({
    month: new FormControl(),
    year: new FormControl(),
    full_name: new FormControl(),
    username: new FormControl(),
    title: new FormControl(),
    status_id: new FormControl(),
    only_show_my_idea: new FormControl()
  });
  gridData: IdeaForShowDto[] = [];
  years: number[] = [];
  statuses: IdeaStatusDto[] = [];
  constructor(private ideaService: IdeaService, private router: Router, private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.fillGrid();
    this.fillYears();
    this.fillStatus();
    //
  }
  fillGrid() {
    this.ideaService.getAllIdea().subscribe((data: IdeaForShowDto[]) => {

      this.gridData = data;
    },
      (err) => {

        alert('مشکل');
      });

  }
  fillStatus() {
    this.ideaService.getAllIdeaStatus().subscribe((data: IdeaStatusDto[]) => {
      // console.log("ssdata", data);
      this.statuses = data;
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

  showIdeaPage(id) {
    this.router.navigateByUrl('/ideas/show/speceficIdea/' + id);
  }

  submit() {
    const model = new FilterIdeaRequestDto();

    model.Title = this.topForm.value.title;

    model.FullName = this.topForm.value.full_name;
    model.Year = this.topForm.value.year;
    model.MyUsername = this.authService.getUsername();
    model.Username = this.topForm.value.username;
    model.OnlyshowMyIdea = this.topForm.value.only_show_my_idea === null ? false : this.topForm.value.only_show_my_idea;
    model.StatusId = this.topForm.value.status_id;
    console.log("sasd", model);
    this.ideaService.filterSerchingIdea(model).subscribe((data: IdeaForShowDto[]) => {

      this.gridData = data;
    },
      (err) => {
        alert('مشکل');
      });
  }

}
