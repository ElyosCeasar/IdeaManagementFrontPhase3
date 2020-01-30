import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserForShowDto } from './../_model/user/UserForShowDto';
import { UserChangeCommitteeFlagDto } from './../_model/user/UserChangeCommitteeFlagDto';
import { FilterUserRequestDto } from './../_model/user/FilterUserRequestDto';
import { UserShowingTop10Dto } from './../_model/user/UserShowingTop10Dto';



@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (environment.production) {
            this.baseUrl = environment.apiUrlserver + 'User/';
        } else {
            this.baseUrl = environment.apiUrl + 'User/';
        }
    }

    getAllUsers(): Observable<UserForShowDto[]> {
        return this.http.get<UserForShowDto[]>(this.baseUrl + 'GetAllUsers');
    }
    changeCommitteFlag(username: string, value: number) {
        const model = new UserChangeCommitteeFlagDto();
        model.Username = username;
        model.Value = value;
        return this.http.put(this.baseUrl + 'ChangeCommitteFlags', model);
    }
    FilterSerchingUsers(model: FilterUserRequestDto): Observable<UserForShowDto[]> {
        return this.http.post<UserForShowDto[]>(this.baseUrl + 'FilterSerching', model);
    }

    getTop10IdeaMaker(): Observable<UserShowingTop10Dto[]> {
        return this.http.get<UserShowingTop10Dto[]>(this.baseUrl + 'GetTop10IdeaMaker');
    }
    getTop10CommentMaker(): Observable<UserShowingTop10Dto[]> {
        return this.http.get<UserShowingTop10Dto[]>(this.baseUrl + 'GetTop10CommentMaker');
    }
}
