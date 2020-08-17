/* --- PAGES --- */
import { DepartmentsPage } from './departments.page';
import { DepartmentEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    DepartmentsPage
    },
    {
        'path':         'editor',
        'component':    DepartmentEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DepartmentsRoutingModule {}