/* --- PAGES --- */
import { StoresPage } from './stores.page';
import { StoresEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: StoresPage
    },
    {
        path: 'editor',
        component: StoresEditorPage
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatSortModule,
        MatSortModule,
        MatIconModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        StoresPage,
        StoresEditorPage
    ]
})

export class StoresPageModule { }
