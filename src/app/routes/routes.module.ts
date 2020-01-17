import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes.routing';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { ForgetPasswordComponent } from './passport/forget-password/forget-password.component';

@NgModule({
  imports: [SharedModule, RouteRoutingModule,
  ],
  declarations: [
    // passport pages
    ForgetPasswordComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserRegisterResultComponent]
})
export class RoutesModule { }
