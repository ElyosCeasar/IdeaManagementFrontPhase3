import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';
import { AuthService } from './../../../_services/auth.service';
import { UserForLoginDto } from './../../../_model/auth/UserForLoginDto';


@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy, OnInit {

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private authService: AuthService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }

  form: FormGroup;
  error = '';
  type = 0;

  switch(ret: any) {
    this.type = ret.index;
  }


  // #endregion
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      // this.alertify.error('در حال حاظر شما در حالت ورود هستید ودسترسی به این بخش ممکن نیست');
      this.router.navigateByUrl('');
    }
  }

  submit() {
    const tempuser = {
      key: "12345",
      token: "12345"
    }
    this.tokenService.set(tempuser);
    //

    let user = new UserForLoginDto();
    user.Password = this.password.value;
    user.Username = this.userName.value;

    this.authService.login(user).subscribe(response => {
      this.router.navigateByUrl('#/');

    }, error => {
      console.log("er", error);
    });

  }
  goToForgetPage() {
    this.router.navigateByUrl('/passport/forget-password');
  }
  ngOnDestroy(): void {

  }
}
