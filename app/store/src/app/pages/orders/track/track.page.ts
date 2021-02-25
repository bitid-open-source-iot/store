import { Order } from 'src/app/classes/order';
import { ToastService } from 'src/app/services/toast/toast.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
    selector: 'orders-track-page',
    styleUrls: ['./track.page.scss'],
    templateUrl: './track.page.html'
})

export class OrdersTrackPage implements OnInit, OnDestroy {

    constructor(private config: StoreService, private toast: ToastService, private route: ActivatedRoute, private router: Router, private service: OrdersService) { }

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
            this.router.navigate(['/orders']);
            this.toast.error(response.error.message);
        }

        this.loading = false;
    }

    ngOnInit(): void {
        this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
            if (loaded) {
                const params = this.route.snapshot.queryParams;
                this.orderId = params.orderId;
                this.get();
            };
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.loaded.unsubscribe();
    }

}
