import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../../_services/user.service';
import { UserForShowDto } from './../../../_model/user/UserForShowDto';
import { FilterUserRequestDto } from './../../../_model/user/FilterUserRequestDto';
import { Router } from '@angular/router';
import { AuthService } from './../../../_services/auth.service';
import { AlertifyService } from './../../../_services/alertify.service';


@Component({
  selector: 'app-accounting-document-struct',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class ManageCommitteeMemberMainComponent implements OnInit {

  topForm = new FormGroup({
    full_name: new FormControl(),
    username: new FormControl(),
    position_type: new FormControl(),

  });
  gridData: UserForShowDto[] = [];

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.IsAdmin()) {
      this.router.navigateByUrl('');
    }
    this.fillGrid();
  }
  fillGrid() {
    this.userService.getAllUsers().subscribe((data: UserForShowDto[]) => {
      this.gridData = data;
    },
      (err) => {
        alert('مشکل');
      });
  }

  submit() {
    console.log(this.topForm.value);
    const model = new FilterUserRequestDto();
    model.FullName = this.topForm.value.full_name;
    model.RoleValue = this.topForm.value.position_type === null ? -1 : this.topForm.value.position_type;
    model.Username = this.topForm.value.username;
    this.userService.FilterSerchingUsers(model).subscribe((data: UserForShowDto[]) => {
      this.gridData = data;
    },
      (err) => {
        alert('مشکل');
      });

  }

  changeToCommitte(username: string) {
    this.userService.changeCommitteFlag(username, 1).subscribe((data) => {
      console.log("x76", data);
      this.fillGrid();
    },
      (err) => {
        alert('مشکل');
      }
    );
  }
  changeToMember(username: string) {
    this.userService.changeCommitteFlag(username, 0).subscribe((data) => {
      console.log("x76", data);
      this.fillGrid();
    },
      (err) => {
        alert('مشکل');
      }
    );
  }

}
