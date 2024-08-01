import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HeroesService } from '../../services/heroes.service';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'hero-new-page',
  templateUrl: './new-page.component.html',
})
export class NewPageComponent implements OnInit {

  public publishers = [
    { id: Publisher.DCComics, desc: 'DC - Comics' },
    { id: Publisher.MarvelComics, desc: 'Marvel - Comics' }
  ]

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics, { nonNullable: true }),
    alter_ego:        new FormControl<string>('', { nonNullable: true }),
    first_appearance: new FormControl<string>('', { nonNullable: true }),
    characters:       new FormControl<string>('', { nonNullable: true }),
    alt_image:        new FormControl<string>('')
  });

  public titlePage?: string;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      this.titlePage = 'Crear Personaje';
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroesService.getHeroById(id))
    )
    .subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/');

      this.titlePage = `Editar héroe - ${ hero.superhero }`;

      this.heroForm.reset(hero);
      return;
    });
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit(): void {
    if (!this.heroForm.valid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackBar(`¡${ hero.superhero } actualizado!`);
      });

      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.router.navigate([`heroes/${ hero.id }`]);
      this.showSnackBar(`¡${ hero.superhero } creado!`);
    });
  }

  onConfirmDeletion() {
    if (!this.currentHero.id) throw Error('No hay un heroe para eliminar');

    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero
    });

    dialogRef.afterClosed()
      .pipe(
        // Filtra según la condición dada
        filter((result: boolean) => result),
        // Puede mapear elementos y retornar el resultado,
        // pero en este caso únicamente ejecuta y retorna el Observable
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
        // Filtra bajo la condición, en este caso el valor del Observable
        filter((wasDeleted: boolean) => wasDeleted)
      )
      // Si se cumplen las condiciones anteriores se ejecuta el Observable suscrito
      .subscribe(() => this.router.navigate([`heroes/list`]));

  }

  showSnackBar(message: string) {
    this.snackbar.open(message, 'done', {
      duration: 2500
    });
  }
}
