import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  GuardResult,
  MaybeAsync,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

import { AuthService } from '../services/auth-service/auth-service.component';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap((isAuthenticated: boolean) => {
          if (!isAuthenticated) {
            this.router.navigate(['./auth/login'])
          }
        }),
        tap((isAuthenticated: boolean) =>
          console.log('Authenticated', isAuthenticated))
      );
  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }
}
