import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { throwIfAlreadyLoaded } from '@core';

import { AlainThemeModule } from '@delon/theme';
import { DelonACLModule } from '@delon/acl';

import { PageHeaderConfig } from '@delon/abc';
import { STConfig } from '@delon/abc';
import { DelonAuthConfig } from '@delon/auth';

export function fnPageHeaderConfig(): PageHeaderConfig {
  return {
    ...new PageHeaderConfig(),
    homeI18n: 'home',
  };
}

export function fnDelonAuthConfig(): DelonAuthConfig {
  return {
    ...new DelonAuthConfig(),
    login_url: '/passport/login',
  };
}

export function fnSTConfig(): STConfig {
  return {
    ...new STConfig(),
    modal: { size: 'lg' },
  };
}

const GLOBAL_CONFIG_PROVIDES = [
  { provide: STConfig, useFactory: fnSTConfig },
  { provide: PageHeaderConfig, useFactory: fnPageHeaderConfig },
  { provide: DelonAuthConfig, useFactory: fnDelonAuthConfig },
];

@NgModule({
  imports: [AlainThemeModule.forRoot(), DelonACLModule.forRoot()],
})
export class DelonModule {
  constructor(@Optional() @SkipSelf() parentModule: DelonModule) {
    throwIfAlreadyLoaded(parentModule, 'DelonModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [...GLOBAL_CONFIG_PROVIDES],
    };
  }
}
