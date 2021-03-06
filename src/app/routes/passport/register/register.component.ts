import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { AuthService } from './../../../_services/auth.service';
import { UserForRegistrationDto } from './../../../_model/auth/UserForRegistrationDto';

@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnDestroy, OnInit {

  constructor(fb: FormBuilder, private router: Router, public http: _HttpClient, public msg: NzMessageService,
    private authService: AuthService) {
    this.form = fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      family_name: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      mail: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.checkPassword.bind(this)]],
      confirm: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.passwordEquar]],
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
  get password() {
    return this.form.controls.password;
  }
  get confirm() {
    return this.form.controls.confirm;
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

  static passwordEquar(control: FormControl) {
    if (!control || !control.parent) {
      return null;
    }
    if (control.value !== control.parent.get('password')!.value) {
      return { equar: true };
    }
    return null;
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

    const data = this.form.value;

    let user = new UserForRegistrationDto();
    user.password = this.password.value;
    user.Username = this.username.value;
    user.Email = this.mail.value;
    user.FirstName = this.name.value;
    user.LastName = this.family_name.value;

    this.authService.register(user).subscribe(response => {

      this.router.navigateByUrl('/passport/register-result', {
        queryParams: { email: data.mail },
      });

    }, error => {
      console.log("er", error);
    });

  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
