/* --- COMPONENTS --- */
import { MatCarousel } from './carousel.component';
import { MatCarouselTile } from './carousel-tile/carousel-tile.component';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        MatCarousel,
        MatCarouselTile
    ],
    declarations: [
        MatCarousel,
        MatCarouselTile
    ]
})

export class MatCarouselModule { }