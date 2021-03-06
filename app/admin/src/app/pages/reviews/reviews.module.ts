/* --- PAGES --- */
import { ReviewsPage } from './reviews.page';
import { ReviewsFilterDialog } from './filter/filter.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { StarsModule } from 'src/app/libs/stars/stars.module';
import { CommonModule } from '@angular/common';
import { UploadModule } from 'src/app/libs/upload/upload.module';
import { OptionsModule } from 'src/app/libs/options/options.module';
import { ConfirmModule } from 'src/app/libs/confirm/confirm.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ReviewsPage
    }
];

@NgModule({
    imports: [
        FormsModule,
        StarsModule,
        CommonModule,
        UploadModule,
        ConfirmModule,
        MatSortModule,
        MatSortModule,
        OptionsModule,
        MatIconModule,
        MatTableModule,
        MatChipsModule,
        MatInputModule,
        MatRippleModule,
        MatButtonModule,
        MatSelectModule,
        MatFooterModule,
        OrderPipeModule,
        FilterPipeModule,
        MatToolbarModule,
        MatContentModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        NgxMatSelectSearchModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ReviewsPage,
        ReviewsFilterDialog
    ]
})

export class ReviewsPageModule { }
