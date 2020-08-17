/* --- PAGES --- */
import { ProductPage } from './product/product.page';
import { ProductsPage } from './products.page';
import { ReviewDialog } from './product/review/review.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { OrderModule } from 'src/app/pipes/order/order.module';
import { FilterModule } from 'src/app/pipes/filter/filter.module';
import { SearchModule } from 'src/app/libs/search/search.module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxStarRatingModule } from 'src/app/libs/ngx-star-rating/ngx-star-rating.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductsRoutingModule } from './products-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        OrderModule,
        FormsModule,
        FilterModule,
        CommonModule,
        SearchModule,
        MatIconModule,
        MatBadgeModule,
        MatInputModule,
        MatSliderModule,
        MatDialogModule,
        MatButtonModule,
        MatRippleModule,
        MatToolbarModule,
        MatGridListModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        NgxStarRatingModule,
        MatProgressBarModule,
        ProductsRoutingModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        ProductPage,
        ProductsPage,
        ReviewDialog
    ]
})

export class ProductsModule {}