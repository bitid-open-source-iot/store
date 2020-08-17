/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

/* --- COMPONENTS --- */
import { OptionsSheetComponent } from './options-sheet.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule
    ],
    exports: [
        OptionsSheetComponent
    ],
    declarations: [
        OptionsSheetComponent
    ]
})

export class OptionsSheetModule { }