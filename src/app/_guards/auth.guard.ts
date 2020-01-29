import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
    providedIn: 'root'
})
// ng g  guard auth --spec=false
export class AuthGuard implements CanActivate {
    // canActivateChild(childRoute: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    //     this.canActivate();
    // }, CanActivateChild
    constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }
    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.alertify.error('ابتدا وارد شوید');
        this.router.navigate(['/passport/login']);
        return false;
    }

}
