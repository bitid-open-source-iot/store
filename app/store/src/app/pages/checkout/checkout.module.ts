/* --- PAGES --- */
import { CheckoutPage } from './checkout.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: CheckoutPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatContentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CheckoutPage
    ]
})

export class CheckoutPageModule { }
