/* --- PAGES --- */
import { CartPage } from './cart.page';
import { DownloadDialog } from './download/download.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MessageModule } from 'src/app/libs/message/message.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartRoutingModule } from './cart-routing.module';
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
        MatButtonModule,
        MatToolbarModule,
        CartRoutingModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        CartPage,
        DownloadDialog
    ]
})

export class CartModule {}