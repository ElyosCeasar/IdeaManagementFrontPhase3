import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'header-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
  host: {
    '[class.d-block]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderStorageComponent {
  constructor(private modalSrv: NzModalService, private messageSrv: NzMessageService) {}

  @HostListener('click')
  _click() {
    this.modalSrv.confirm({
      nzTitle: 'Make sure clear all local storage?',
      nzOnOk: () => {
        localStorage.clear();
        this.messageSrv.success('Clear Finished!');
      },
    });
  }
}
