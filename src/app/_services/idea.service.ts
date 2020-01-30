import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdeaDto } from './../_model/idea/IdeaDto';
import { FilterWinnerIdeaRequestDto } from './../_model/idea/FilterWinnerIdeaRequestDto';
import { WinnerIdeaForShowDto } from './../_model/idea/WinnerIdeaForShowDto';



@Injectable({
    providedIn: 'root'
})
export class IdeaService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (environment.production) {
            this.baseUrl = environment.apiUrlserver + 'Idea/';
        } else {
            this.baseUrl = environment.apiUrl + 'Idea/';
        }
    }
    getIdeasTop10All(): Observable<IdeaDto[]> {
        return this.http.get<IdeaDto[]>(this.baseUrl + 'GetIdeasTop10All');
    }
    getIdeasTop10CurrentMonth(): Observable<IdeaDto[]> {
        return this.http.get<IdeaDto[]>(this.baseUrl + 'GetIdeasTop10CurrentMonth');
    }
    getIdeasTop10CurrentWeek(): Observable<IdeaDto[]> {
        return this.http.get<IdeaDto[]>(this.baseUrl + 'GetIdeasTop10CurrentWeek');
    }
    getAllWinnerIdea(): Observable<WinnerIdeaForShowDto[]> {
        return this.http.get<WinnerIdeaForShowDto[]>(this.baseUrl + 'GetAllWinnerIdea');
    }
    filterWinnerIdea(model: FilterWinnerIdeaRequestDto): Observable<WinnerIdeaForShowDto[]> {
        return this.http.post<WinnerIdeaForShowDto[]>(this.baseUrl + 'FilterWinnerIdea', model);
    }
    getYearsFromLastIdea(): Observable<number[]> {
        return this.http.get<number[]>(this.baseUrl + 'GetYearsFromLastIdea');
    }

}
