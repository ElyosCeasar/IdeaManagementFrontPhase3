import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdeaDto } from './../_model/idea/IdeaDto';
import { FilterWinnerIdeaRequestDto } from './../_model/idea/FilterWinnerIdeaRequestDto';
import { WinnerIdeaForShowDto } from './../_model/idea/WinnerIdeaForShowDto';
import { NewIdeaDto } from './../_model/idea/NewIdeaDto';
import { IdeaForShowDto } from './../_model/idea/IdeaForShowDto';
import { FilterIdeaRequestDto } from './../_model/idea/FilterIdeaRequestDto';
import { IdeaStatusDto } from './../_model/idea/IdeaStatusDto';
import { IdeaDetailForShowDto } from './../_model/idea/IdeaDetailForShowDto';
import { FilterAllNotDecidedIdeaRequestDto } from './../_model/idea/FilterAllNotDecidedIdeaRequestDto';
import { IdeaPointDto } from './../_model/idea/IdeaPointDto';
import { ChangedIdeaDto } from './../_model/idea/ChangedIdeaDto';



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
    sendNewIdea(model: NewIdeaDto) {
        return this.http.post(this.baseUrl + 'SendNewIdea', model);
    }
    getAllIdea(): Observable<IdeaForShowDto[]> {
        return this.http.get<IdeaForShowDto[]>(this.baseUrl + 'GetAllIdea');
    }
    filterSerchingIdea(model: FilterIdeaRequestDto): Observable<IdeaForShowDto[]> {
        return this.http.post<IdeaForShowDto[]>(this.baseUrl + 'FilterSerchingIdea', model);
    }
    getAllIdeaStatus(): Observable<IdeaStatusDto[]> {
        return this.http.get<IdeaStatusDto[]>(this.baseUrl + 'GetAllIdeaStatus');
    }
    getSpecificIdea(ideaId: number): Observable<IdeaDetailForShowDto> {
        return this.http.get<IdeaDetailForShowDto>(this.baseUrl + 'GetSpecificIdea/' + ideaId);
    }

    getAllNotDecidedIdea(): Observable<IdeaForShowDto[]> {
        return this.http.get<IdeaForShowDto[]>(this.baseUrl + 'GetAllNotDecidedIdea/');
    }
    getAllCurrentMontDecidedIdea(): Observable<IdeaForShowDto[]> {
        return this.http.get<IdeaForShowDto[]>(this.baseUrl + 'GetAllCurrentMontDecidedIdea/');
    }

    filterAllNotDecidedIdea(model: FilterAllNotDecidedIdeaRequestDto): Observable<IdeaForShowDto[]> {
        return this.http.post<IdeaForShowDto[]>(this.baseUrl + 'FilterAllNotDecidedIdea', model);
    }

    voteToIdea(model: IdeaPointDto) {
        return this.http.post(this.baseUrl + 'VoteToIdea', model);
    }
    editIdea(ideaId: number, model: ChangedIdeaDto) {
        return this.http.put(this.baseUrl + 'EditIdea/' + ideaId, model);
    }
    deleteIdea(ideaId: number) {
        return this.http.delete(this.baseUrl + 'DeleteIdea/' + ideaId);
    }
}
