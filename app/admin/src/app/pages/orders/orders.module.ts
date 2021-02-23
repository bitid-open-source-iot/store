/* --- PAGES --- */
import { OrdersPage } from './orders.page';
import { OrdersFilterDialog } from './filter/filter.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: OrdersPage
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatSortModule,
        MatSortModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        MatFooterModule,
        MatContentModule,
        MatToolbarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OrdersPage,
        OrdersFilterDialog
    ]
})

export class OrdersPageModule { }
