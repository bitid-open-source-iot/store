/* --- PIPES --- */
import { FilterPipe } from './filter.pipe';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        FilterPipe
    ],
    declarations: [
        FilterPipe
    ]
})

export class FilterModule { }