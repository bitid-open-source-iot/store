import { Voucher } from 'src/app/classes/voucher';
import { StoreService } from 'src/app/services/store/store.service';
import { VouchersService } from 'src/app/services/vouchers/vouchers.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'vouchers-page',
    styleUrls: ['./vouchers.page.scss'],
    templateUrl: './vouchers.page.html'
})

export class VouchersPage implements OnInit, OnDestroy {

    constructor(public vouchers: VouchersService, private config: StoreService, private buttons: ButtonsService) { }

    public loading: boolean;
    private subscriptions: any = {};

    private async list() {
        this.loading = true;

        const response = await this.vouchers.list({
        });

        if (response.ok) {
            this.vouchers.data = response.result.map(o => new Voucher(o));
        } else {
            this.vouchers.data = [];
        }

        this.loading = false;
    };

    ngOnInit(): void {
        this.buttons.hide('cart');
        this.buttons.hide('close');
        this.buttons.hide('search');
        this.buttons.hide('wishlist');

        this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
            if (loaded) {
                this.list();
            };
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.loaded.unsubscribe();
    }

}
