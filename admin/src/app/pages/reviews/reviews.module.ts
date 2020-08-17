/* --- PAGES --- */
import { ReviewsPage } from './reviews.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReviewsRoutingModule } from './reviews-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressBarModule,
        ReviewsRoutingModule
    ],
    declarations: [
        ReviewsPage
    ]
})

export class ReviewsModule {}