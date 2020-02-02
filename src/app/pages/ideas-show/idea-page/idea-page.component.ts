import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { IdeaService } from './../../../_services/idea.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../_services/auth.service';
import { AlertifyService } from './../../../_services/alertify.service';
import { IdeaDetailForShowDto } from './../../../_model/idea/IdeaDetailForShowDto';
import { CommentService } from './../../../_services/comment.service';
import { IdeaCommentsDto } from './../../../_model/comment/IdeaCommentsDto';
import { IdeaPointDto } from './../../../_model/idea/IdeaPointDto';
import { VoteToCommentDto } from './../../../_model/comment/VoteToCommentDto';
import { ChangedIdeaDto } from './../../../_model/idea/ChangedIdeaDto';
import { EditIdeaModalComponent } from './../edit-idea-modal/edit-idea-modal.component';
import { EditCommentModalComponent } from './../edit-comment-modal/edit-comment-modal.component';
import { SendCommentModalComponent } from './../send-comment-modal/send-comment-modal.component';


@Component({
  selector: 'app-idea-page',
  templateUrl: './idea-page.component.html',
  styleUrls: ['./idea-page.component.less']
})
export class IdeaPageComponent implements OnInit {
  @ViewChild('editIdeaModal', { static: false }) editIdeaModalComponent: EditIdeaModalComponent;
  @ViewChild('SendCommentModal', { static: false }) sendCommentModalComponent: SendCommentModalComponent;
  @ViewChild('editCommentModal', { static: false }) editCommentModalComponent: EditCommentModalComponent;
  topForm = new FormGroup({
    title: new FormControl(),
    current_situation: new FormControl(),
    prerequisite: new FormControl(),
    steps: new FormControl(),
    advantages: new FormControl(),

  });

  isVisible = false;
  showingComments = false;
  ideaId = -1;
  idea: IdeaDetailForShowDto = new IdeaDetailForShowDto();

  Comments: IdeaCommentsDto[] = [];
  constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService, private ideaService: IdeaService, private router: Router, private authService: AuthService, private alertifyService: AlertifyService) { }




  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      this.ideaId = params['id'];

      this.getIdea(this.ideaId);

      // this.getAllComments(this.ideaId);
    });
    // this.getIdea();
  }
  getIdea(ideaId: number) {
    this.ideaService.getSpecificIdea(ideaId).subscribe((data: IdeaDetailForShowDto) => {
      this.idea = data;
      this.getAllComments(this.ideaId);
    },
      (err) => {

        alert('مشکل');
      });
  }
  getAllComments(ideaId: number) {
    this.commentService.getSpecificIdea(ideaId).subscribe((data: IdeaCommentsDto[]) => {
      this.Comments = data;
      console.log(data)
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

  handleShowComments() {
    if (this.showingComments === true) {

    } else {

    }
    this.showingComments = !this.showingComments;
  }
  changeVisiblety(id) {
    console.log(id);
    this.isVisible = !this.isVisible;

  }

  checkCanDoOperation(Username: string) {

    return Username === this.authService.getUsername();
  }

  deleteIdea(id) {
    console.log(id);
  }
  deleteComment(id) {
    console.log(id);
  }
  IdeaUpvote() {
    const model = new IdeaPointDto();
    model.IdeaId = this.ideaId;
    model.Username = this.authService.getUsername();
    model.Point = 1;
    this.ideaService.voteToIdea(model).subscribe((data) => {
      this.alertifyService.success(data + "");
      this.getIdea(this.ideaId);
    },
      (err) => {
        alert('مشکل');
      });
  }
  IdeaDownvote() {
    const model = new IdeaPointDto();
    model.IdeaId = this.ideaId;
    model.Username = this.authService.getUsername();
    model.Point = -1;
    this.ideaService.voteToIdea(model).subscribe((data) => {
      this.alertifyService.success(data + "");
      this.getIdea(this.ideaId);
    },
      (err) => {
        alert('مشکل');
      });
  }
  commentUpvote(commentId: number) {
    const model = new VoteToCommentDto();
    model.CommentId = commentId;
    model.UsernameVoter = this.authService.getUsername();
    model.Point = 1;
    this.commentService.voteToComment(model).subscribe((data) => {
      this.alertifyService.success(data + "");
      this.getAllComments(this.ideaId);
    },
      (err) => {
        alert('مشکل');
      });
  }
  commentDownvote(commentId: number) {
    const model = new VoteToCommentDto();
    model.CommentId = commentId;
    model.UsernameVoter = this.authService.getUsername();
    model.Point = -1;
    this.commentService.voteToComment(model).subscribe((data) => {
      this.alertifyService.success(data + "");
      this.getAllComments(this.ideaId);
    },
      (err) => {
        alert('مشکل');
      });
  }

  editIdea() {
    this.editIdeaModalComponent.changeVisiblety(this.ideaId, this);
  }
  sendComment() {
    this.sendCommentModalComponent.changeVisiblety(this.ideaId, this);
  }

  editComment(commentId) {
    this.editCommentModalComponent.changeVisiblety(commentId, this.ideaId, this);
  }
}
