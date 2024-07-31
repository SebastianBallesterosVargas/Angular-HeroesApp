import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404PageComponent } from './pages/error-404-page/error-404-page.component';



@NgModule({
  declarations: [
    Error404PageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Error404PageComponent
  ]
})
export class SharedModule { }
