import { MatTabGroup } from '@angular/material/tabs';
import { Inject, Component, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'product-gallery-dialog',
    styleUrls: ['./gallery.dialog.scss'],
    templateUrl: './gallery.dialog.html'
})

export class ProductGalleryDialog {

    @ViewChild(MatTabGroup, { static: true }) private tabgroup: MatTabGroup;

    constructor(private dialog: MatDialogRef<ProductGalleryDialog>, @Inject(MAT_DIALOG_DATA) public images: string[]) { };

    public image: string = this.images[0];

    public async close() {
        this.dialog.close(false);
    };

    public async next() {
        const index = this.images.indexOf(this.image);
        if (index + 1 == this.images.length) {
            this.image = this.images[0];
            this.tabgroup.selectedIndex = 0;
        } else {
            this.image = this.images[index + 1];
            this.tabgroup.selectedIndex = index + 1;
        };
    };

    public async previous() {
        const index = this.images.indexOf(this.image);
        if (index - 1 < 0) {
            this.image = this.images[this.images.length - 1];
            this.tabgroup.selectedIndex = this.images.length - 1;
        } else {
            this.image = this.images[index - 1];
            this.tabgroup.selectedIndex = index - 1;
        };
    };

}