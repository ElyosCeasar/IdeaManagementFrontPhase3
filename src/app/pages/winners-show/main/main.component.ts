import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { ShowIdeasComponent } from './../show-ideas/show-ideas.component';
import { IdeaService } from './../../../_services/idea.service';
import { WinnerIdeaForShowDto } from 'src/app/_model/idea/WinnerIdeaForShowDto';
import { FilterWinnerIdeaRequestDto } from './../../../_model/idea/FilterWinnerIdeaRequestDto';

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
  gridData: WinnerIdeaForShowDto[] = [];
  years: number[] = [];
  constructor(private ideaService: IdeaService) { }


  ngOnInit() {
    this.fillGrid();
    this.fillYears();

  }
  fillGrid() {
    this.ideaService.getAllWinnerIdea().subscribe((data: WinnerIdeaForShowDto[]) => {
      this.gridData = data;
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



  changeVisibletyOfModal(id) {

    this.showIdeasComponent.changeVisiblety(id);

  }

  submit() {
    console.log(this.topForm.value);
    const model = new FilterWinnerIdeaRequestDto();
    model.Month = this.topForm.value.month;
    model.Year = this.topForm.value.year;
    this.ideaService.filterWinnerIdea(model).subscribe((data: WinnerIdeaForShowDto[]) => {
      this.gridData = data;
    },
      (err) => {
        alert('مشکل');
      });

  }


}
