import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hero-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor( private heroesService: HeroesService ){}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions( value )
      .subscribe( heroes => {
        this.heroes = heroes;
        console.log(heroes); 
      });
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;

  }
}
