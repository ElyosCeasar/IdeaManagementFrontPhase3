import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { LayoutDefaultComponent } from './default/default.component';
import { LayoutFullScreenComponent } from './fullscreen/fullscreen.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { HeaderSearchComponent } from './default/header/components/search/search.component';
import { HeaderNotifyComponent } from './default/header/components/notify/notify.component';
import { HeaderTaskComponent } from './default/header/components/task/task.component';
import { HeaderIconComponent } from './default/header/components/icon/icon.component';
import { HeaderFullScreenComponent } from './default/header/components/fullscreen/fullscreen.component';
import { HeaderI18nComponent } from './default/header/components/i18n/i18n.component';
import { HeaderStorageComponent } from './default/header/components/storage/storage.component';
import { HeaderUserComponent } from './default/header/components/user/user.component';

import { SettingDrawerComponent } from './default/setting-drawer/setting-drawer.component';
import { SettingDrawerItemComponent } from './default/setting-drawer/setting-drawer-item.component';

const SETTINGDRAWER = [SettingDrawerComponent, SettingDrawerItemComponent];
const COMPONENTS = [
  LayoutDefaultComponent,
  LayoutFullScreenComponent,
  HeaderComponent,
  SidebarComponent,
  ...SETTINGDRAWER,
];

const HEADERCOMPONENTS = [
  HeaderSearchComponent,
  HeaderNotifyComponent,
  HeaderTaskComponent,
  HeaderIconComponent,
  HeaderFullScreenComponent,
  HeaderI18nComponent,
  HeaderStorageComponent,
  HeaderUserComponent,
];

// passport
@NgModule({
  imports: [SharedModule],
  entryComponents: SETTINGDRAWER,
  declarations: [...COMPONENTS, ...HEADERCOMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutModule {}
