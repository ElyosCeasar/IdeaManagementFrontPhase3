
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
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { EditCommentModalComponent } from './edit-comment-modal/edit-comment-modal.component';
import { EditIdeaModalComponent } from './edit-idea-modal/edit-idea-modal.component';
import { SendCommentModalComponent } from './send-comment-modal/send-comment-modal.component';

@NgModule({
  declarations: [IdeasShowMainComponent, IdeaPageComponent, EditCommentModalComponent, EditIdeaModalComponent, SendCommentModalComponent],
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
    NzToolTipModule,
    SharedModule,
    IdeasShowRoutingModule
  ]
})
export class IdeasShowModule { }
