import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { ForgetPasswordComponent } from './passport/forget-password/forget-password.component';
import { UserGuard } from '../_guards/user-guard';

const routes: Routes = [
  { path: 'passport/login', component: UserLoginComponent },
  { path: 'passport/register', component: UserRegisterComponent },
  { path: 'passport/register-result', component: UserRegisterResultComponent },
  { path: 'passport/forget-password', component: ForgetPasswordComponent },
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    canActivateChild: [SimpleGuard],
    children: [
      // {
      //   path: 'passport/register',
      //   loadChildren: () =>
      //     import('./applicants-registration/applicants-registration.module').then(m => m.ApplicantsRegistrationModule),
      // },
      {
        path: 'evaluation/ideas',
        loadChildren: () =>

          import('../pages/evaluation-ideas/evaluation-ideas.module').then(m => m.EvaluationIdeasModule)
        ,
        canActivate: [SimpleGuard],
        canActivateChild: [SimpleGuard],
      },
      {
        path: 'ideas/create',
        loadChildren: () =>
          import('../pages/ideas-create/ideas-create.module').then(m => m.IdeasCreateModule),
        canActivate: [SimpleGuard],
        canActivateChild: [SimpleGuard],
      },
      {
        path: 'ideas/show',
        loadChildren: () =>
          import('../pages/ideas-show/ideas-show.module').then(m => m.IdeasShowModule),
        canActivate: [SimpleGuard],
        canActivateChild: [SimpleGuard],
      },
      {
        path: 'manage-committee-member',
        loadChildren: () =>
          import('../pages/manage-committee-member/manage-committee-member.module').then(m => m.ManageCommitteeMemberModule),
        canActivate: [SimpleGuard],
        canActivateChild: [SimpleGuard],
      },
      {
        path: 'tops-section/ideas',
        loadChildren: () =>
          import('../pages/tops-section-ideas/tops-section-ideas.module').then(m => m.TopsSectionIdeasModule),
        canActivate: [SimpleGuard],
        canActivateChild: [SimpleGuard],
      },
      {
        path: 'tops-section/members',
        loadChildren: () =>
          import('../pages/tops-section-members/tops-section-members.module').then(m => m.TopsSectionMembersModule),
        canActivate: [SimpleGuard],
        canActivateChild: [SimpleGuard],
      },
      {
        path: 'winners/show',
        loadChildren: () =>
          import('../pages/winners-show/winners-show.module').then(m => m.WinnersShowModule),
        canActivate: [SimpleGuard],
        canActivateChild: [SimpleGuard],
      },

      { path: '**', redirectTo: 'exception/404' },
    ],
  },
]


@NgModule({
  imports: [


    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
