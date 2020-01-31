import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdeaCommentsDto } from './../_model/comment/IdeaCommentsDto';



@Injectable({
    providedIn: 'root'
})
export class CommentService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (environment.production) {
            this.baseUrl = environment.apiUrlserver + 'Comments/';
        } else {
            this.baseUrl = environment.apiUrl + 'Comments/';
        }
    }

    getSpecificIdea(ideaId: number): Observable<IdeaCommentsDto[]> {
        return this.http.get<IdeaCommentsDto[]>(this.baseUrl + 'GetAllComments/' + ideaId);
    }


}
