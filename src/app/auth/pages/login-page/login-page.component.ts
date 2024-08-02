import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth-service/auth-service.component';
import { User } from '../../interfaces/user.interface';



@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {
    this.authService.login('sebastian@gmail.com', 'asdas$1WaJ12.ASD134914$%.$#SkksafsdDf')
      .subscribe((user: User) => {
        if (!user) return;
        this.router.navigate(['/']);
      });
  }
}
