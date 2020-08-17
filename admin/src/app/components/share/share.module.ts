/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* --- COMPONENETS --- */
import { ShareDialog } from './share.dialog';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    exports: [
        ShareDialog
    ],
    declarations: [
        ShareDialog
    ]
})

export class ShareModule {}