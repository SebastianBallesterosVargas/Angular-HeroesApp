import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  
  @Input() hero!: Hero;

  ngOnInit(): void {
    if (!this.hero) throw Error('Hero property is required');
  }
}
