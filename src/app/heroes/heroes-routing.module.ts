import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayautPageComponent } from './pages/layaut-page/layaut-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';


const childrenRoutes: Routes = [
  { path: 'list', component: ListPageComponent },
  { path: 'new-hero', component: NewPageComponent },
  { path: 'edit/:id', component: NewPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: ':id', component: HeroPageComponent },
  { path: '**', redirectTo: 'list' } // Path vacio, no coincide con :id
];

const routes: Routes = [
  {
    path: '',
    component: LayautPageComponent,
    children: childrenRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
