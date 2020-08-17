/* --- PAGES --- */
import { ApisPage } from './apis.page';
import { ApiEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    ApisPage
    },
    {
        'path':         'editor',
        'component':    ApiEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ApisRoutingModule {}