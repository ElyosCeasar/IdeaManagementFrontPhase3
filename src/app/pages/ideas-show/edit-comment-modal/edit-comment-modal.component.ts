import { Component, OnInit, Input } from '@angular/core';
import { NzFormModule, NzInputModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { IdeaDetailForShowDto } from '../../../_model/idea/IdeaDetailForShowDto';
import { Router } from '@angular/router';
import { IdeaService } from '../../../_services/idea.service';
import { IdeaCommentsDto } from './../../../_model/comment/IdeaCommentsDto';
import { CommentService } from './../../../_services/comment.service';
import { AuthService } from './../../../_services/auth.service';
import { CommentDto } from './../../../_model/comment/CommentDto';
import { AlertifyService } from './../../../_services/alertify.service';
@Component({
  selector: 'app-edit-comment-modal',
  templateUrl: './edit-comment-modal.component.html',
  styleUrls: ['./edit-comment-modal.component.less']
})
export class EditCommentModalComponent implements OnInit {

  topForm = new FormGroup({

    comment: new FormControl(),

  });
  isVisible = false;
  showingComments = false;
  commentId = -1;
  ideaId = -1;
  that;// for calling parent methouds
  comment: IdeaCommentsDto = new IdeaCommentsDto();
  constructor(private commentService: CommentService, private router: Router, private authService: AuthService, private alertifyService: AlertifyService) { }



  ngOnInit() {
  }
  getComment(commentId: number) {

    this.commentService.getSpeceficComment(commentId).subscribe((data: IdeaCommentsDto) => {
      this.comment = data;
    },
      (err) => {

        alert('مشکل');
      });
  }
  showModal(id: number): void {
    this.isVisible = true;

  }



  handleClose(): void {

    this.isVisible = false;
  }

  handleSave() {
    const model = new CommentDto();

    model.Username = this.authService.getUsername();
    model.Comment = this.topForm.value.comment;
    model.IdeaId = this.ideaId;

    this.commentService.addCommentToIdea(model).subscribe((data) => {
      this.alertifyService.success(data + "");
      this.that.getAllComments(this.ideaId);

      this.handleClose()
    },
      (err) => {
        alert('مشکل');
      });

  }
  changeVisiblety(commentId, ideaId, that) {
    this.that = that;
    this.ideaId = ideaId;
    this.commentId = commentId;
    this.getComment(commentId);
    this.isVisible = !this.isVisible;

  }


}
