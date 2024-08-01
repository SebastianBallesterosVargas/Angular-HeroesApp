import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayautPageComponent } from './pages/layaut-page/layaut-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MaterialModule } from '../material/material.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';



@NgModule({
  declarations: [
    LayautPageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    MaterialModule
  ]
})
export class AuthModule { }
