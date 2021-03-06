import { Store } from 'src/app/classes/store';
import { Review } from 'src/app/classes/review';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { MatTableDataSource } from '@angular/material/table';
import { ReviewsFilterDialog } from './filter/filter.dialog';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'reviews-page',
	styleUrls: ['./reviews.page.scss'],
	templateUrl: './reviews.page.html'
})

export class ReviewsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private sheet: OptionsService, private dialog: MatDialog, private toast: ToastService, private stores: StoresService, private filters: FiltersService, private service: ReviewsService, private buttons: ButtonsService) { }

	public filter = this.filters.get({
		storeId: []
	});
	public columns: string[] = ['store.description', 'product.title', 'message', 'score', 'status', 'options'];
	public loading: boolean;
	public reviews: MatTableDataSource<Review> = new MatTableDataSource<Review>();
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'store',
				'score',
				'status',
				'message',
				'product',
				'reviewId'
			],
			storeId: this.filter.storeId
		});

		if (response.ok) {
			this.reviews.data = response.result.map(o => new Review(o));
		} else {
			this.reviews.data = [];
		}

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const stores = await this.stores.list({
			filter: [
				'storeId',
				'description'
			]
		});

		if (stores.ok) {
			this.stores.data = stores.result.map(o => new Store(o));
		} else {
			this.stores.data = [];
		}

		this.loading = false;
	}

    public unfilter(key, value) {
        this.filter[key] = this.filter[key].filter(o => o != value);
        this.filters.update(this.filter);
        this.list();
    }

	public async options(review: Review) {
		this.sheet.show({
			role: review.role,
			title: review.message,
			options: [
				{
					icon: 'thumb_up_alt',
					title: 'Approve Review',
					handler: async () => {
						const response = await this.service.approve({
							reviewId: review.reviewId
						});

						if (response.ok) {
							for (let i = 0; i < this.reviews.data.length; i++) {
								if (this.reviews.data[i].reviewId == review.reviewId) {
									this.reviews.data[i].status = 'approved';
									break;
								};
							};
							this.toast.success('Review was approved!');
						} else {
							this.toast.error(response.error.message);
						};
					},
					disabled: [0, 1]
				},
				{
					icon: 'thumb_down_alt',
					title: 'Reject Review',
					handler: async () => {
						const response = await this.service.reject({
							reviewId: review.reviewId
						});

						if (response.ok) {
							for (let i = 0; i < this.reviews.data.length; i++) {
								if (this.reviews.data[i].reviewId == review.reviewId) {
									this.reviews.data[i].status = 'rejected';
									break;
								};
							};
							this.toast.success('Review was rejected!');
						} else {
							this.toast.error(response.error.message);
						};
					},
					disabled: [0, 1]
				}
			]
		});
	}

    public describe(array: any[], key: string, id: string) {
        let result = '-';
        array.map(o => {
            if (o[key] == id) {
                result = o.description;
            }
        });
        return result;
    }

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.show('filter');
		this.buttons.show('search');

		this.sort.active = 'message';
		this.sort.direction = 'desc';
		this.reviews.sort = this.sort;

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(ReviewsFilterDialog, {
                data: this.filter,
                panelClass: 'filter-dialog'
            });

            await dialog.afterClosed().subscribe(async result => {
                if (result) {
                    Object.keys(result).map(key => {
                        this.filter[key] = result[key];
                    });
                    this.filters.update(this.filter);
                    this.list();
                };
            });
		});

		this.subscriptions.search = this.buttons.search.value.subscribe(value => {
			this.reviews.filter = value;
		});

		(async () => {
			await this.list();
			await this.load();
		})();
	}

	ngOnDestroy(): void {
		this.buttons.reset('search');
		this.subscriptions.filter.unsubscribe();
		this.subscriptions.search.unsubscribe();
	}

}
