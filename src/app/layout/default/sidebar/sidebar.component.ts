import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { JDate, DateTime } from './index';
@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  now = DateTime.now.format('yyyy-MM-dd');

  nowJalali = JDate.toJDate(JDate.parseDate(this.now)).format('yyyy-MM-dd');
  constructor(public settings: SettingsService) { }
  checkCollapsed() {

    return this.settings.layout.collapsed;
  }
}
