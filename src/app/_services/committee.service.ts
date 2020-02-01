import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoteDetailDto } from './../_model/committee/VoteDetailDto';



@Injectable({
    providedIn: 'root'
})
export class CommitteeService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (environment.production) {
            this.baseUrl = environment.apiUrlserver + 'Committee/';
        } else {
            this.baseUrl = environment.apiUrl + 'Committee/';
        }
    }
    VoteToIdea(ideaId: number, model: VoteDetailDto) {
        return this.http.post(this.baseUrl + 'VoteToIdea/' + ideaId, model);
    }
    UnVoteIdea(ideaId: number) {
        return this.http.delete(this.baseUrl + 'UnVoteIdea/' + ideaId);
    }

}
