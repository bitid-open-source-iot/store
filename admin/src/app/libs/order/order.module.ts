/* --- PIPES --- */
import { OrderPipe } from './order.pipe';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        OrderPipe
    ],
    declarations: [
        OrderPipe
    ]
})

export class OrderModule { }