/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/* --- COMPONENETS --- */
import { FileUploadComponent } from './file-upload.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatRippleModule,
        MatProgressSpinnerModule
    ],
    exports: [
        FileUploadComponent
    ],
    declarations: [
        FileUploadComponent
    ]
})

export class FileUploadModule {}
