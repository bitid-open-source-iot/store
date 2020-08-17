/* --- PAGES --- */
import { CollectionPointsPage } from './collection-points.page';
import { CollectionPointEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    CollectionPointsPage
    },
    {
        'path':         'editor',
        'component':    CollectionPointEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CollectionPointsRoutingModule {}