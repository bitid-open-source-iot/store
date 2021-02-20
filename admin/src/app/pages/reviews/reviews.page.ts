import { Review } from 'src/app/classes/review';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/services/toast/toast.service';
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

	constructor(private toast: ToastService, private service: ReviewsService, private buttons: ButtonsService) { }

	public columns: string[] = ['message', 'score', 'status'];
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
				'score',
				'status',
				'message',
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
