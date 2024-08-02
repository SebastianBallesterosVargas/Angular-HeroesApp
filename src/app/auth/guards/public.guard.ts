import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth-service/auth-service.component';



@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap((isAuthenticated: boolean) => {
          if (isAuthenticated) {
            this.router.navigate(['./heroes/list'])
          }
        }),
        map((isAuthenticated => !isAuthenticated))
        // Se mapea a true para que no se bloquee la navegación al realizar el logout
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }
}
