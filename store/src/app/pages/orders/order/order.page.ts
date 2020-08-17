import { Title } from '@angular/platform-browser';
import { MenuService } from 'src/app/services/menu/menu.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from 'src/app/services/history/history.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-order-page',
    styleUrls:      ['./order.page.scss'],
    templateUrl:    './order.page.html'
})

export class OrderPage implements OnInit, OnDestroy {

    constructor(public menu: MenuService, public cart: CartService, private route: ActivatedRoute, private history: HistoryService, private service: OrdersService, public wishlist: WishlistService, private store: StoresService, private title: Title) {};

    public order:           any;
    public orderId:         string;
    public loading:         boolean;
    private subscriptions:  any = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'date',
                'status',
                'payment',
                'shipping',
                'products',
                'recipient'
            ],
            'orderId': this.orderId
        });

        if (response.ok) {
            this.order = response.result;
        } else {
            // this.toast.error()
        };
        
        this.loading = false;
    };

    public async back() {
        this.history.back();
    };

    ngOnInit(): void {
        this.subscriptions.store = this.store.store.subscribe(store => {
            if (store) {
                this.title.setTitle([store.description, '-', 'VIEW ORDER'].join(' '));
            };
        });

        this.subscriptions.route = this.route.params.subscribe(params => {
            this.orderId = params.orderId;
            this.get();
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.store.unsubscribe();
        this.subscriptions.route.unsubscribe();
    };

}