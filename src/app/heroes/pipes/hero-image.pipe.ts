import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interfaces';

@Pipe({
    name: 'heroImage'
})

export class HeroImagePipe implements PipeTransform {

    private noImage = 'assets/no-image.png';

    private assetsRoute = (image: string) => `assets/heroes/${ image }.jpg`;

    transform({ id, alt_image }: Hero): string {
        if (!id && !alt_image) return this.noImage

        if (alt_image) return alt_image;

        return this.assetsRoute(id);
    }
}