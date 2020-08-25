import canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { ConvertImage } from './convert-image';
import { StoresService } from 'src/app/services/stores/stores.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Component, OnDestroy, Inject } from '@angular/core';

@Component({
    selector: 'app-download-dialog',
    styleUrls: ['./download.dialog.scss'],
    templateUrl: './download.dialog.html'
})

export class DownloadDialog implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<DownloadDialog>, @Inject(MAT_DIALOG_DATA) public order, public store: StoresService) { };

    public items: any[] = this.order.products;
    public summary: any = this.order.payment;
    public loading: boolean;
    public merchant: any;
    private subscriptions: any = {};

    public close() {
        this.dialog.close();
    };

    public download() {
        canvas(document.getElementById('invoice')).then(canvas => {
            const pdf = new jspdf();
            const image = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(image, 'JPEG', 0, 0);
            pdf.save('cart-download');
            this.dialog.close();
        });
    };

    ngOnInit(): void {
        this.loading = true;

        this.items.map(async item => {
            item.icon = await ConvertImage(item.image);
        });

        this.loading = false;

        this.subscriptions.store = this.store.store.subscribe(async store => {
            if (store) {
                this.merchant = store;
                this.merchant.logo = await ConvertImage(this.merchant.logo);
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.store.unsubscribe();
    };

}