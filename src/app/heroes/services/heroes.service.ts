import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';

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

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${ this.baseUrl }/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero ID is required');
    return this.httpClient.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);
  }

  deleteHero(id: string): Observable<boolean> {
    if (!id) throw Error('Hero ID is required');
    return this.httpClient.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        map(() => true), // Si responde es por que elimino.
        catchError(() => of(false)), // Si hay error por lo general ya se elimino, por lo que se retorna false.
      );
  }
}
