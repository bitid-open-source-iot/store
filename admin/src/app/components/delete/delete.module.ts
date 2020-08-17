/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* --- COMPONENETS --- */
import { DeleteDialog } from './delete.dialog';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    exports: [
        DeleteDialog
    ],
    declarations: [
        DeleteDialog
    ]
})

export class DeleteModule {}