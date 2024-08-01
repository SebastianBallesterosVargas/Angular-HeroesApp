import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroImagePipe } from './pipes/hero-image.pipe';

import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayautPageComponent } from './pages/layaut-page/layaut-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    HeroPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    LayautPageComponent,
    CardComponent,

    HeroImagePipe,
      ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
