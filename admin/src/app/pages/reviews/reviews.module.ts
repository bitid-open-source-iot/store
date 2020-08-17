/* --- PAGES --- */
import { ReviewsPage } from './reviews.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { OrderModule } from 'src/app/libs/order/order.module';
import { FilterModule } from 'src/app/libs/filter/filter.module';
import { SearchModule } from 'src/app/libs/search/search.module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { NgxStarRatingModule } from 'src/app/libs/ngx-star-rating/ngx-star-rating.module';

@NgModule({
    imports: [
        OrderModule,
        SearchModule,
        FilterModule,
        CommonModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatToolbarModule,
        NgxStarRatingModule,
        MatProgressBarModule,
        ReviewsRoutingModule
    ],
    declarations: [
        ReviewsPage
    ]
})

export class ReviewsModule {}