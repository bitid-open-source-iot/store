/* --- PAGES --- */
import { WishlistPage } from './wishlist.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: WishlistPage
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatContentModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        WishlistPage
    ]
})

export class WishlistPageModule { }
