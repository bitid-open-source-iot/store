/* --- PAGES --- */
import { ProductPage } from './product/product.page';
import { ProductsPage } from './products.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    ProductsPage
    },
    {
        'path':         ':productId',
        'component':    ProductPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductsRoutingModule {}