/* --- PAGES --- */
import { CouriersPage } from './couriers.page';
import { CourierEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    CouriersPage
    },
    {
        'path':         'editor',
        'component':    CourierEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CouriersRoutingModule {}