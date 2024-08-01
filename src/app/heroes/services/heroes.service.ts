import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, of, switchMap } from 'rxjs';

import { enviroments } from '../../../environments/environments';
import { Hero } from '../interfaces/hero.interfaces';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = enviroments.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${ this.baseUrl }/heroes`)
      .pipe(delay(500));
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.httpClient
      .get<Hero>(`${ this.baseUrl }/heroes/${id}`)
      .pipe(
        catchError(() => of(undefined)),
        delay(500)
      );
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

}
