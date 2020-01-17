import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'passport-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.less'],
})
export class ForgetPasswordComponent implements OnDestroy {

  constructor(fb: FormBuilder, private router: Router, public http: _HttpClient, public msg: NzMessageService) {
    this.form = fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      family_name: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      mail: [null, [Validators.required, Validators.email]]
    });
  }

  // #region fields
  get username() {
    return this.form.controls.name;
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

    this.msg.success('عملیات ثبت نام موفقیت آمیز بود')


  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
