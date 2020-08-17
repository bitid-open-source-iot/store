/* --- PAGES --- */
import { StoresPage } from './stores.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreEditorPage } from './editor/editor.page';

const routes: Routes = [
    {
        'path':         '',
        'component':    StoresPage
    },
    {
        'path':         'editor',
        'component':    StoreEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StoresRoutingModule {}