/* --- PAGES --- */
import { OrdersPage } from './orders.page';
import { OrdersViewerPage } from './viewer/viewer.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: OrdersPage
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
        MatRippleModule,
        MatButtonModule,
        MatContentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OrdersPage,
        OrdersViewerPage
    ]
})

export class OrdersPageModule { }
