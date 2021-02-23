/* --- PAGES --- */
import { MapPage } from './map.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MatButtonModule } from '@angular/material/button';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { Routes, RouterModule } from '@angular/router';

import { environment } from 'src/environments/environment';

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
        AgmCoreModule.forRoot({
            apiKey: environment.googleMapsApiKey,
            libraries: [
                'places'
            ]
        }),
        RouterModule.forChild(routes)
    ],
    declarations: [
        MapPage
    ]
})

export class MapPageModule { }