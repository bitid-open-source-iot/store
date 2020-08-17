/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* --- COMPONENETS --- */
import { SubscribersDialog } from './subscribers.dialog';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressBarModule
    ],
    exports: [
        SubscribersDialog
    ],
    declarations: [
        SubscribersDialog
    ]
})

export class SubscribersModule {}