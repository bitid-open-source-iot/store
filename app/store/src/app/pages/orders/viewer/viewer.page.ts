import { Order } from 'src/app/classes/order';
import { StoreService } from 'src/app/services/store/store.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'orders-viewer-page',
    styleUrls: ['./viewer.page.scss'],
    templateUrl: './viewer.page.html'
})

export class OrdersViewerPage implements OnInit, OnDestroy {

    constructor(private toast: ToastService, private route: ActivatedRoute, private config: StoreService, private router: Router, private service: OrdersService, private buttons: ButtonsService) { }

    public order: Order = new Order();
    public orderId: string;
    public loading: boolean;
    private subscriptions: any = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            orderId: this.orderId
        });

        if (response.ok) {
            this.order = new Order(response.result);
        } else {
            this.toast.error(response.error.message);
            this.router.navigate(['/orders']);
        }

        this.loading = false;
    };

    ngOnInit(): void {
        this.buttons.hide('cart');
        this.buttons.show('close');
        this.buttons.hide('search');
        this.buttons.hide('wishlist');

        this.subscriptions.close = this.buttons.close.click.subscribe(event => {
            this.router.navigate(['/orders']);
        });

        this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
            if (loaded) {
                const params = this.route.snapshot.queryParams;
                this.orderId = params.orderId;
                this.get();
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.close.unsubscribe();
        this.subscriptions.loaded.unsubscribe();
    }

}
