import { CreationAuditComponent } from './creation-audit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationAuditRoutingModule } from './creation-audit-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule, NzInputModule, NzButtonModule, NzGridModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [CreationAuditComponent],
  exports: [CreationAuditComponent],
  imports: [
    CommonModule,
    CreationAuditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
  ],
})
export class CreationAuditModule {}
