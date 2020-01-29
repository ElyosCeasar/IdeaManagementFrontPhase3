import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../_services/auth.service';

@Component({
  selector: 'passport-register-result',
  templateUrl: './register-result.component.html',
})
export class UserRegisterResultComponent implements OnInit {
  params = { email: '' };
  email = '';
  constructor(route: ActivatedRoute, public msg: NzMessageService,
    private router: Router,
    private authService: AuthService, ) {
    this.params.email = this.email = route.snapshot.queryParams.email || 'ng-alain@example.com';
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('');
    }
  }
}
