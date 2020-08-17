/* --- PAGES --- */
import { ProductsPage } from './products.page';
import { ProductEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    ProductsPage
    },
    {
        'path':         'editor',
        'component':    ProductEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductsRoutingModule {}