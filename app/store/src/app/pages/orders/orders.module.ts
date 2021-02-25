/* --- PAGES --- */
import { OrdersPage } from './orders.page';
import { OrdersTrackPage } from './track/track.page';
import { OrdersViewerPage } from './viewer/viewer.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: OrdersPage
    },
    {
        path: 'track',
        component: OrdersTrackPage
    },
    {
        path: 'viewer',
        component: OrdersViewerPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatButtonModule,
        MatContentModule,
        FlexLayoutModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OrdersPage,
        OrdersTrackPage,
        OrdersViewerPage
    ]
})

export class OrdersPageModule { }
