
// angular components
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
// intra components
import { IdeasShowMainComponent } from './main/main.component';

// added components
import { NzFormModule, NzInputModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { IdeasShowRoutingModule } from './ideas-show-routing.module';
import { IdeaPageComponent } from './idea-page/idea-page.component'
import { NzBackTopModule } from 'ng-zorro-antd/back-top';


@NgModule({
  declarations: [IdeasShowMainComponent, IdeaPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzTableModule,
    NzBackTopModule,
    NzCheckboxModule,
    SharedModule,
    IdeasShowRoutingModule
  ]
})
export class IdeasShowModule { }
