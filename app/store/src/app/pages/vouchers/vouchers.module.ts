/* --- PAGES --- */
import { VouchersPage } from './vouchers.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: VouchersPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        MatRippleModule,
        MatButtonModule,
        MatContentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        VouchersPage
    ]
})

export class VouchersPageModule { }
