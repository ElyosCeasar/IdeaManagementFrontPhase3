import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { ShowIdeasComponent } from './../show-ideas/show-ideas.component';
import { IdeaService } from './../../../_services/idea.service';
import { IdeaDto } from './../../../_model/idea/IdeaDto';

@Component({
  selector: 'app-accounting-document-struct',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class TopsSectionIdeasMainComponent implements OnInit {

  @ViewChild('modalShowIdea', { static: false }) showIdeasComponent: ShowIdeasComponent;
  gridDataTop10All: IdeaDto[] = [];
  gridDataTop10CurrentMonth: IdeaDto[] = [];
  gridDataTop10CurrentWeek: IdeaDto[] = [];
  constructor(private ideaService: IdeaService) { }

  ngOnInit() {
    this.fillGrid();
  }
  fillGrid() {
    this.ideaService.getIdeasTop10All().subscribe((data: IdeaDto[]) => {
      this.gridDataTop10All = data;
    },
      (err) => {
        alert('مشکل');
      });
    this.ideaService.getIdeasTop10CurrentMonth().subscribe((data: IdeaDto[]) => {
      this.gridDataTop10CurrentMonth = data;
    },
      (err) => {
        alert('مشکل');
      });
    this.ideaService.getIdeasTop10CurrentWeek().subscribe((data: IdeaDto[]) => {
      this.gridDataTop10CurrentWeek = data;
    },
      (err) => {
        alert('مشکل');
      });
  }


  changeVisibletyOfModal(id) {

    this.showIdeasComponent.changeVisiblety(id);

  }



}
