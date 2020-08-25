/* --- PAGES --- */
import { OrderPage } from './order/order.page';
import { OrdersPage } from './orders.page';
import { DownloadDialog } from './order/download/download.dialog';

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
        OrdersRoutingModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        OrderPage,
        OrdersPage,
        DownloadDialog
    ]
})

export class OrdersModule {}