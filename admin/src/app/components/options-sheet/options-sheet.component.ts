import { Inject, Component } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-options-sheet',
    styleUrls: ['./options-sheet.component.scss'],
    templateUrl: './options-sheet.component.html'
})

export class OptionsSheetComponent {

    constructor(private sheet: MatBottomSheetRef<OptionsSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) private data: any) { };

    public items: any[] = this.data.items;
    public title: string = this.data.title;

    public select(option) {
        this.sheet.dismiss(option);
    };
}