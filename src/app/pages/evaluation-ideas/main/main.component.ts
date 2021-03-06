import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { ShowIdeasComponent } from './../show-ideas/show-ideas.component';
import { AlertifyService } from './../../../_services/alertify.service';
import { AuthService } from './../../../_services/auth.service';
import { Router } from '@angular/router';
import { IdeaService } from './../../../_services/idea.service';
import { IdeaForShowDto } from './../../../_model/idea/IdeaForShowDto';
import { FilterAllNotDecidedIdeaRequestDto } from './../../../_model/idea/FilterAllNotDecidedIdeaRequestDto';
import { CommitteeService } from './../../../_services/committee.service';
import { VoteDetailDto } from './../../../_model/committee/VoteDetailDto';



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
  constructor(private ideaService: IdeaService, private committeeService: CommitteeService, private router: Router, private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    if (!this.authService.IsCommitteeMember()) {
      this.router.navigateByUrl('');
    }
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
    console.log(this.topForm.value);
    const model = new FilterAllNotDecidedIdeaRequestDto();
    model.Month = this.topForm.value.month;
    model.Year = this.topForm.value.year;
    this.ideaService.filterAllNotDecidedIdea(model).subscribe((data: IdeaForShowDto[]) => {
      this.gridDataNotDecidedIdea = data;
    },
      (err) => {
        alert('مشکل');
      });
  }


  // showModal(id: number): void {
  //   this.isVisible = true;
  //   console.log(id);
  // }



  // handleClose(): void {
  //   console.log('Button close clicked!');
  //   this.isVisible = false;
  // }

  changeVisibletyOfModal(ideaId) {

    this.showIdeasComponent.changeVisiblety(ideaId);

  }
  accept(ideaId: number) {
    const model = new VoteDetailDto();
    model.Vote = 1;
    model.ProfitAmount = 8;
    model.SavingResourceAmount = 8;
    this.committeeService.VoteToIdea(ideaId, model).subscribe((data) => {
      this.alertifyService.success(data + "");
      this.fillGridNotDecidedIdea();
      this.fillGridCurrentMontDecidedIdea();
    },
      (err) => {
        alert('مشکل');
      });
  }
  reject(ideaId: number) {
    const model = new VoteDetailDto();
    model.Vote = 2;
    this.committeeService.VoteToIdea(ideaId, model).subscribe((data: IdeaForShowDto[]) => {
      this.alertifyService.success(data + "");
      this.fillGridNotDecidedIdea();
      this.fillGridCurrentMontDecidedIdea();
    },
      (err) => {
        alert('مشکل');
      });
  }
  unVote(ideaId: number) {

    this.committeeService.UnVoteIdea(ideaId).subscribe((data: IdeaForShowDto[]) => {
      this.alertifyService.success(data + "");
      this.fillGridNotDecidedIdea();
      this.fillGridCurrentMontDecidedIdea();
    },
      (err) => {
        alert('مشکل');
      });
  }
}
