import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserForLoginDto } from './../_model/auth/UserForLoginDto';
import { ForgetPasswordDto } from './../_model/auth/ForgetPasswordDto';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl: string;
    jwtHelper = new JwtHelperService();
    decodedToken: any;
    constructor(private http: HttpClient) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (environment.production) {
            this.baseUrl = environment.apiUrlserver + 'Auth/';
        } else {
            this.baseUrl = environment.apiUrl + 'Auth/';
        }
    }
    login(model: UserForLoginDto) {

        return this.http.post(this.baseUrl + 'login', model)
            .pipe(map((response: any) => {
                const token = response;

                if (token) {

                    localStorage.setItem('token', token);
                    // this.decodedToken = this.jwtHelper.decodeToken(token);
                    // console.log("ssdd", this.decodedToken);
                    // console.log("ssdd", token);
                    const refreshIntervalId = setInterval(() => {
                        if (this.checkIfTokenIsExpired()) {
                            this.logOut();
                        }
                    }, 10000);
                    // window.location.reload();
                }
            }));

    }
    register(model: any) {
        console.log("reg", model);
        return this.http.post(this.baseUrl + 'Registration', model);
    }
    forgetPassword(model: ForgetPasswordDto): Observable<string> {
        console.log("reg", model);
        return this.http.post<string>(this.baseUrl + 'ForgetPassword', model);
    }
    isLoggedIn() {
        const token = localStorage.getItem('token');

        return !this.jwtHelper.isTokenExpired(token);
    }
    logOut() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    getUsername(): string {
        const token = localStorage.getItem('token');
        if (this.jwtHelper.decodeToken(token)) {
            return this.jwtHelper.decodeToken(token).unique_name;
        } else {
            return '';
        }
    }

    checkIfTokenIsExpired() {
        let isExpired = false;
        const token = localStorage.getItem('token');
        let decodedToken = this.jwtHelper.decodeToken(token);
        const secondsSinceEpoch = Math.round(Date.now() / 1000);

        if (decodedToken.exp < secondsSinceEpoch) {
            isExpired = true;
        }
        return isExpired;
    }
    // getId(): string {
    //     const token = localStorage.getItem('token');
    //     if (this.jwtHelper.isTokenExpired(token)) {
    //         return '-1';
    //     }
    //     if (this.jwtHelper.decodeToken(token)) {
    //         return this.jwtHelper.decodeToken(token).nameid;
    //     } else {
    //         return '-1';
    //     }

    // }

}
