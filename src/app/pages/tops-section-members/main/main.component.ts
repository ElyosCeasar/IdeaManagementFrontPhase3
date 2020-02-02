import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../../_services/user.service';
import { UserShowingTop10Dto } from './../../../_model/user/UserShowingTop10Dto';


@Component({
  selector: 'app-accounting-document-struct',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class TopsSectionMembersMainComponent implements OnInit {
  gridDataTop10Idea: UserShowingTop10Dto[] = [];
  gridDataTop10Comment: UserShowingTop10Dto[] = [];

  constructor(private userService: UserService) {

  }

  ngOnInit() { this.fillGrid(); }

  fillGrid() {
    this.userService.getTop10IdeaMaker().subscribe((data: UserShowingTop10Dto[]) => {
      this.gridDataTop10Idea = data;
    },
      (err) => {
        alert('مشکل');
      });
    this.userService.getTop10CommentMaker().subscribe((data: UserShowingTop10Dto[]) => {
      this.gridDataTop10Comment = data;

    },
      (err) => {
        alert('مشکل');
      });
  }




}
