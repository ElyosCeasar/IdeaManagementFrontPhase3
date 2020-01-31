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


@Component({
  selector: 'app-idea-page',
  templateUrl: './idea-page.component.html',
  styleUrls: ['./idea-page.component.less']
})
export class IdeaPageComponent implements OnInit {
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
  ttContent = "sdsd"
  Comments: IdeaCommentsDto[] = [];
  constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService, private ideaService: IdeaService, private router: Router, private authService: AuthService, private alertifyService: AlertifyService) { }




  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      // tslint:disable-next-line:no-string-literal
      this.getIdea(params['id']);
      // tslint:disable-next-line:no-string-literal
      this.getAllComments(params['id']);
    });
    // this.getIdea();
  }
  getIdea(ideaId: number) {
    this.ideaService.getSpecificIdea(ideaId).subscribe((data: IdeaDetailForShowDto) => {
      this.idea = data;
    },
      (err) => {

        alert('مشکل');
      });
  }
  getAllComments(ideaId: number) {
    this.commentService.getSpecificIdea(ideaId).subscribe((data: IdeaCommentsDto[]) => {
      this.Comments = data;
    },
      (err) => {

        alert('مشکل');
      });
  }
  showModal(id: number): void {
    this.isVisible = true;
    console.log(id);
  }



  handleClose(): void {
    console.log('Button close clicked!');
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
    console.log(Username, this.authService.getUsername());
    return Username === this.authService.getUsername();
  }

  deleteIdea(id) {
    console.log(id);
  }
  deleteComment(id) {
    console.log(id);
  }
}
