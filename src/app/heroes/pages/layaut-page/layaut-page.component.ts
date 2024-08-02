import { Component } from '@angular/core';

import { AuthService } from '../../../auth/services/auth-service/auth-service.component';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'hero-layaut-page',
  templateUrl: './layaut-page.component.html'
})
export class LayautPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' }
  ];

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.route.navigate(['/auth/login']);
  }
}
