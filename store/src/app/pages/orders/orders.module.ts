/* --- PAGES --- */
import { OrderPage } from './order/order.page';
import { OrdersPage } from './orders.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'src/app/libs/message/message.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OrdersRoutingModule } from './orders-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatListModule,
        MessageModule,
        MatBadgeModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
        OrdersRoutingModule,
        ReactiveFormsModule,
        MatProgressBarModule
    ],
    declarations: [
        OrderPage,
        OrdersPage
    ]
})

export class OrdersModule {}