/* --- PAGES --- */
import { CollectionPointsPage } from './collection-points.page';
import { CollectionPointsEditorPage } from './editor/editor.page';
import { CollectionPointsFilterDialog } from './filter/filter.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadModule } from 'src/app/libs/upload/upload.module';
import { OptionsModule } from 'src/app/libs/options/options.module';
import { ConfirmModule } from 'src/app/libs/confirm/confirm.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

const routes: Routes = [
    {
        path: '',
        component: CollectionPointsPage
    },
    {
        path: 'editor',
        component: CollectionPointsEditorPage
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        UploadModule,
        ConfirmModule,
        MatSortModule,
        MatSortModule,
        OptionsModule,
        MatIconModule,
        MatChipsModule,
        MatTableModule,
        MatInputModule,
        MatDialogModule,
        OrderPipeModule,
        MatRippleModule,
        MatButtonModule,
        MatSelectModule,
        MatFooterModule,
        MatToolbarModule,
        MatContentModule,
        FilterPipeModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        NgxMatSelectSearchModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CollectionPointsPage,
        CollectionPointsEditorPage,
        CollectionPointsFilterDialog
    ]
})

export class CollectionPointsPageModule { }
