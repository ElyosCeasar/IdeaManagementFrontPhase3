import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';


@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {

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

  submit() {
    const tempuser = {
      key: "12345",
      token: "12345"
    }
    this.tokenService.set(tempuser);
    this.router.navigateByUrl('#/');
    // this.error = '';
    // if (this.type === 0) {
    //   this.userName.markAsDirty();
    //   this.userName.updateValueAndValidity();
    //   this.password.markAsDirty();
    //   this.password.updateValueAndValidity();
    //   if (this.userName.invalid || this.password.invalid) {
    //     return;
    //   }
    // } else {
    //   this.mobile.markAsDirty();
    //   this.mobile.updateValueAndValidity();
    //   this.captcha.markAsDirty();
    //   this.captcha.updateValueAndValidity();
    //   if (this.mobile.invalid || this.captcha.invalid) {
    //     return;
    //   }
    // }
    // this.http
    //   .post('/login/account?_allow_anonymous=true', {
    //     type: this.type,
    //     userName: this.userName.value,
    //     password: this.password.value,
    //   })
    //   .subscribe((res: any) => {
    //     if (res.msg !== 'ok') {
    //       this.error = res.msg;
    //       return;
    //     }

    //     this.reuseTabService.clear();

    //     this.tokenService.set(res.user);

    //     this.startupSrv.load().then(() => {
    //       let url = this.tokenService.referrer!.url || '/';
    //       if (url.includes('/passport')) {
    //         url = '/';
    //       }
    //       this.router.navigateByUrl('#/');
    //     });
    //   });
  }
  goToForgetPage() {
    this.router.navigateByUrl('/passport/forget-password');
  }
  ngOnDestroy(): void {

  }
}
