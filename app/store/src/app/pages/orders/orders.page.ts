import { Order } from 'src/app/classes/order';
import { StoreService } from 'src/app/services/store/store.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'orders-page',
    styleUrls: ['./orders.page.scss'],
    templateUrl: './orders.page.html'
})

export class OrdersPage implements OnInit, OnDestroy {

    constructor(public orders: OrdersService, private config: StoreService, private buttons: ButtonsService) { }

    public loading: boolean;
    private subscriptions: any = {};

    private async list() {
        this.loading = true;

        const response = await this.orders.list({});

        if (response.ok) {
            this.orders.data = response.result.map(o => new Order(o));
            debugger
        } else {
            this.orders.data = [];
        }

        this.loading = false;
    }

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
