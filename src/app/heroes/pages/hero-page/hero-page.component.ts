import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'hero-page',
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) return this.router.navigate(['heroes/list']);

        this.hero = hero;
        return;
      });
  }

  goBack(): void {
    this.router.navigateByUrl('heroes/list');
  }
}
