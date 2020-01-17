import { NzModalModule } from 'ng-zorro-antd/modal';
// angular components
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
// intra components
import { EvaluationIdeasMainComponent } from './main/main.component';

// added components
import { NzFormModule, NzInputModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { EvaluationIdeasRoutingModule } from './evaluation-ideas-routing.module';
import { ShowIdeasComponent } from './show-ideas/show-ideas.component';


@NgModule({
  declarations: [EvaluationIdeasMainComponent, ShowIdeasComponent],
  imports: [


    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzTableModule,
    NzCheckboxModule,
    SharedModule,
    EvaluationIdeasRoutingModule
  ]
})
export class EvaluationIdeasModule { }
