import { Component } from '@angular/core';

@Component({
  selector: 'hero-layaut-page',
  templateUrl: './layaut-page.component.html'
})
export class LayautPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' }
  ]
}
