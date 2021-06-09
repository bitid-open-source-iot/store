import { Order } from 'src/app/classes/order';
import { StoreService } from 'src/app/services/store/store.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'orders-page',
    styleUrls: ['./orders.page.scss'],
    templateUrl: './orders.page.html'
})

export class OrdersPage implements OnInit, OnDestroy {

    constructor(private toast: ToastService, public orders: OrdersService, private config: StoreService, private buttons: ButtonsService) { }

    public loading: boolean;
    private subscriptions: any = {};

    private async list() {
        this.loading = true;

        const response = await this.orders.list({});

        if (response.ok) {
            this.orders.data = response.result.map(o => new Order(o));
        } else {
            this.orders.data = [];
        }

        this.loading = false;
    };

    public async remove(order: Order) {
        this.loading = true;

        const response = await this.orders.delete({
            'orderId': order.orderId
        });

        if (response.ok) {
            for (let i = 0; i < this.orders.data.length; i++) {
                if (this.orders.data[i].orderId == order.orderId) {
                    this.orders.data.splice(i, 1);
                    break;
                };
            };
            this.orders.data = response.result.map(o => new Order(o));
            this.toast.success('Order was removed!');
        } else {
            this.toast.error('There was an issue deleting your order!');
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
