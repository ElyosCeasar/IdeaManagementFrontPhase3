import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
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

  });

  constructor(private router: Router) { }

  ngOnInit() { }


  showIdeaPage(id) {
    this.router.navigateByUrl('/ideas/show/speceficIdea/' + id);
  }

  submit() {

  }


}
