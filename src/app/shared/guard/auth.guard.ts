import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,  private authenticationService: AuthenticationService) {}

    canActivate() {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}
