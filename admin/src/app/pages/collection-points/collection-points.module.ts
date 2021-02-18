/* --- PAGES --- */
import { CollectionPointsPage } from './collection-points.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: CollectionPointsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CollectionPointsPage
    ]
})

export class CollectionPointsPageModule { }
