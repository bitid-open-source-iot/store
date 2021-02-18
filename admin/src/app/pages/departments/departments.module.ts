/* --- PAGES --- */
import { DepartmentsPage } from './departments.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: DepartmentsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DepartmentsPage
    ]
})

export class DepartmentsPageModule { }
