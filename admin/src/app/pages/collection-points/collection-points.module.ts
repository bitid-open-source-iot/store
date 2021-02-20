/* --- PAGES --- */
import { CollectionPointsPage } from './collection-points.page';
import { CollectionPointsEditorPage } from './editor/editor.page';

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
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        MatTableModule,
        MatInputModule,
        MatRippleModule,
        MatButtonModule,
        MatSelectModule,
        MatFooterModule,
        MatContentModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CollectionPointsPage,
        CollectionPointsEditorPage
    ]
})

export class CollectionPointsPageModule { }
