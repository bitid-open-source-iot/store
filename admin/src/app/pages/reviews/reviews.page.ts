import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { SearchComponent } from 'src/app/libs/search/search.component';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector: 'app-reviews-page',
    styleUrls: ['./reviews.page.scss'],
    templateUrl: './reviews.page.html'
})

export class ReviewsPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, { 'static': true }) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, public reviews: ReviewsService, private route: ActivatedRoute, private router: Router) { };

    public filter: string = '';
    public storeId: string;
    public loading: boolean;
    private subscriptions: any = {};

    private async list() {
        this.loading = true;

        const response = await this.reviews.list({
            'filter': [
                'score',
                'status',
                'storeId',
                'message',
                'reviewId',
                'productId',
                'serverDate'
            ],
            'status': 'pending approval',
            'storeId': this.storeId
        });

        if (response.ok) {
            this.reviews.data = response.result;
        } else {
            this.reviews.data = [];
        };

        this.loading = false;
    };

    ngOnInit(): void {
        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            if (typeof(params.storeId) != 'undefined' && params.storeId != null && params.storeId != '') {
                this.storeId = params.storeId;
                this.list();
            } else {
                this.router.navigate(['/stores']);
            };
        });

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.filter = filter;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.search.unsubscribe();
    };

}