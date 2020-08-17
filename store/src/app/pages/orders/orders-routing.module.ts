/* --- PAGES --- */
import { OrderPage } from './order/order.page';
import { OrdersPage } from './orders.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    OrdersPage
    },
    {
        'path':         ':orderId',
        'component':    OrderPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrdersRoutingModule {}