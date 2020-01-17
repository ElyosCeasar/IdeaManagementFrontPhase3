import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'app-creation-audit',
  templateUrl: './creation-audit.component.html',
  styleUrls: ['./creation-audit.component.less'],
})
export class CreationAuditComponent implements OnInit {
  @Input() nameTitle = 'نام تنظیم کننده :';
  @Input() nameValue: string;
  @Input() timeTitle = 'زمان تنظیم :';
  @Input() timeValue: string;
  @Input() collapsed: boolean;

  constructor(private settings: SettingsService) {}

  ngOnInit() {}
  checkCollapsed() {
    return this.settings.layout.collapsed;
  }
}
