/* --- PAGES --- */
import { ApisPage } from './apis.page';
import { ApiEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApisRoutingModule } from './apis-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        ApisRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressBarModule
    ],
    declarations: [
        ApisPage,
        ApiEditorPage
    ]
})

export class ApisModule {}