import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { AuthService } from './../../../_services/auth.service';
import { ForgetPasswordDto } from './../../../_model/auth/ForgetPasswordDto';
import { AlertifyService } from './../../../_services/alertify.service';
@Component({
  selector: 'passport-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.less'],
})
export class ForgetPasswordComponent implements OnDestroy, OnInit {

  constructor(fb: FormBuilder, private router: Router, public http: _HttpClient, public msg: NzMessageService,
    private authService: AuthService, private alertifyService: AlertifyService) {
    this.form = fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      family_name: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      mail: [null, [Validators.required, Validators.email]]
    });
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      // this.alertify.error('در حال حاظر شما در حالت ورود هستید ودسترسی به این بخش ممکن نیست');
      this.router.navigateByUrl('');
    }
  }
  // #region fields
  get username() {
    return this.form.controls.username;
  }
  get name() {
    return this.form.controls.name;
  }
  get family_name() {
    return this.form.controls.family_name;
  }
  get mail() {
    return this.form.controls.mail;
  }

  form: FormGroup;
  error = '';
  type = 0;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };

  // #endregion

  // #region get captcha

  count = 0;
  interval$: any;

  static checkPassword(control: FormControl) {
    if (!control) return null;
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    } else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    } else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }
  }




  // #endregion

  submit() {
    this.error = '';
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
    if (this.form.invalid) {
      return;
    }

    let user = new ForgetPasswordDto();
    user.Email = this.mail.value;
    user.Username = this.username.value;
    user.FirstName = this.name.value;
    user.LastName = this.family_name.value;
    this.authService.forgetPassword(user).subscribe(response => {


      this.alertifyService.success(response);


    }, error => {
      console.log("er", error);
    });


  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
