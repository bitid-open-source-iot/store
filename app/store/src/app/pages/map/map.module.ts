/* --- PAGES --- */
import { MapPage } from './map.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { StarsModule } from 'src/app/libs/stars/stars.module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatCarouselModule } from 'src/app/libs/carousel/carousel.module';
import { Routes, RouterModule } from '@angular/router';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { environment } from 'src/environments/environment';

const routes: Routes = [
    {
        path: '',
        component: MapPage
    }
];

@NgModule({
    imports: [
        StarsModule,
        CommonModule,
        MatIconModule,
        MatRippleModule,
        MatButtonModule,
        MatContentModule,
        MatCarouselModule,
        AgmJsMarkerClustererModule,
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
