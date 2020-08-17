/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/* --- COMPONENTS --- */
import { VersionComponent } from './version';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        VersionComponent
    ],
    declarations: [
        VersionComponent
    ]
})

export class VersionModule {}