import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu/menu.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-orders-page',
    styleUrls:      ['./orders.page.scss'],
    templateUrl:    './orders.page.html'
})

export class OrdersPage implements OnInit, OnDestroy {

    constructor(public menu: MenuService, public cart: CartService, public orders: OrdersService, private router: Router, public wishlist: WishlistService, private store: StoresService, private title: Title) {};

    public loading:         boolean;
    private subscriptions:  any = {};

    public action(order) {
        if (order.status == 'initialized') {
            this.router.navigate(['/checkout'], {
                'queryParams': {
                    'orderId': order.orderId
                }
            });
        } else if (order.status == 'paid') {
            this.router.navigate(['/orders', order.orderId]);
        };
    };

    private async list() {
        this.loading = true;

        const response = await this.orders.list({
            'filter': [
                'date',
                'status',
                'orderId',
                'payment',
                'products'
            ]
        });

        if (response.ok) {
            this.orders.data = response.result;
        };
        
        this.loading = false;
    };

    ngOnInit(): void {
        this.subscriptions.store = this.store.store.subscribe(store => {
            if (store) {
                this.title.setTitle([store.description, '-', 'ORDERS'].join(' '));
            };
        });

        this.list();
    };

    ngOnDestroy(): void {
        this.subscriptions.store.unsubscribe();
    };

}