import { Review } from 'src/app/classes/review';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/services/toast/toast.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'reviews-page',
	styleUrls: ['./reviews.page.scss'],
	templateUrl: './reviews.page.html'
})

export class ReviewsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private sheet: OptionsService, private toast: ToastService, private service: ReviewsService, private buttons: ButtonsService) { }

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
			]
		});

		if (response.ok) {
			this.reviews.data = response.result.map(o => new Review(o));
		} else {
			this.reviews.data = [];
		}

		this.loading = false;
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

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.sort.active = 'message';
		this.sort.direction = 'desc';
		this.reviews.sort = this.sort;

		this.list();
	}

	ngOnDestroy(): void { }

}
