/* --- PAGES --- */
import { SuppliersPage } from './suppliers.page';
import { SupplierEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    SuppliersPage
    },
    {
        'path':         'editor',
        'component':    SupplierEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SuppliersRoutingModule {}