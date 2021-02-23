/* --- PAGES --- */
import { MapPage } from './map.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';

const routes: Routes = [
    {
        path: '',
        component: MapPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatContentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MapPage
    ]
})

export class MapPageModule { }
