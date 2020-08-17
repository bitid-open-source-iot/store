/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/* --- COMPONENTS --- */
import { NgxStarRatingComponent } from './ngx-star-rating';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        NgxStarRatingComponent
    ],
    declarations: [
        NgxStarRatingComponent
    ]
})

export class NgxStarRatingModule {}