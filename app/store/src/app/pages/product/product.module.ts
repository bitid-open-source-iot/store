/* --- PAGES --- */
import { ProductPage } from './product.page';
import { ProductReviewDialog } from './review/review.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { StarsModule } from 'src/app/libs/stars/stars.module';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ProductPage
    }
];

@NgModule({
    imports: [
        FormsModule,
        StarsModule,
        CommonModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatDialogModule,
        MatSliderModule,
        MatRippleModule,
        MatButtonModule,
        MatToolbarModule,
        MatContentModule,
        FlexLayoutModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProductPage,
        ProductReviewDialog
    ]
})

export class ProductPageModule { }
