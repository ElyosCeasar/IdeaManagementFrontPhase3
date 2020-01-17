import { Component, ChangeDetectionStrategy, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  searchToggleStatus: boolean;

  constructor(private element:ElementRef, public settings: SettingsService) {}

  ngOnInit() {
    setInterval(() => { 
      var titles = document.getElementsByTagName('title');
      var title = this.element.nativeElement.querySelector('.title');
      if(title.innerText != titles[0].innerText) title.innerText = titles[0].innerText;
     }, 250)
  }
  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }
  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
