import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from '../../../../environments/environments';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { User } from '../../interfaces/user.interface';
import { MaybeAsync } from '@angular/router';



@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl: string = enviroments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  /** 
   * StructureClone es una función de Js que permite realizar un clonado profundo
   * sobre un objeto, útil para encapsulamiento,
   * debido a la naturaleza de Js de envíar valores por referencia
   * 
   * También se puede usar { ...this.user }
   */
  get currentUser(): User | undefined {
    if (!this.user) return; 
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    // post.(loginUrl, { email, password })

    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(() => localStorage.setItem('token', password))
      );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> {
    const token: string | null = localStorage.getItem('token'); 

    if (!token) return of(false);

    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(() => of(false))
      );
  }
}