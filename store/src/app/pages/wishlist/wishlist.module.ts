/* --- PAGES --- */
import { WishlistPage } from './wishlist.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MessageModule } from 'src/app/libs/message/message.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WishlistRoutingModule } from './wishlist-routing.module';
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
        ReactiveFormsModule,
        MatProgressBarModule,
        WishlistRoutingModule
    ],
    declarations: [
        WishlistPage
    ]
})

export class WishlistModule {}