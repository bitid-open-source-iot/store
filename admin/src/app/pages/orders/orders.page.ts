import { Order } from 'src/app/classes/order';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersFilterDialog } from './filter/filter.dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'orders-page',
	styleUrls: ['./orders.page.scss'],
	templateUrl: './orders.page.html'
})

export class OrdersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private dialog: MatDialog, private service: OrdersService, private buttons: ButtonsService) { }

	public orders: MatTableDataSource<Order> = new MatTableDataSource<Order>();
	public filter: FormGroup = new FormGroup({
		date: new FormGroup({
			to: new FormControl(new Date(), [Validators.required]),
			from: new FormControl(new Date(), [Validators.required])
		}),
		status: new FormControl([], [Validators.required]),
		storeId: new FormControl([], [Validators.required])
	});
	public columns: string[] = ['orderId', 'email', 'date', 'status', 'subtotal', 'vat', 'total'];
	public loading: boolean;
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const to = new Date(this.filter.value.date.to);
		to.setHours(23);
		to.setMinutes(59);
		to.setSeconds(59);
		to.setMilliseconds(999);
		const from = new Date(this.filter.value.date.from);
		from.setHours(0);
		from.setMinutes(0);
		from.setSeconds(0);
		from.setMilliseconds(0);

		const response = await this.service.list({
			date: {
				to,
				from
			},
			filter: [
				'vat',
				'date',
				'email',
				'total',
				'status',
				'orderId',
				'subtotal'
			],
			status: this.filter.value.status,
			storeId: this.filter.value.storeId
		});

		if (response.ok) {
			this.orders.data = response.result.map(o => new Order(o));
		} else {
			this.orders.data = [];
		}

		this.loading = false;
	}

	public sum(key) {
		let result = 0;

		this.orders.data.map(order => {
			result += order[key];
		});

		return result;
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.show('filter');
		this.buttons.hide('search');

		this.sort.active = 'date';
		this.sort.direction = 'desc';
		this.orders.sort = this.sort;

		const date = new Date(this.filter.value.date.from);
		date.setDate(1);
		(this.filter.controls.date as FormGroup).controls.from.setValue(date);

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(OrdersFilterDialog, {
				data: this.filter.value,
				panelClass: 'orders-filter-dialog'
			});

			await dialog.afterClosed().subscribe(result => {
				if (result) {
					(this.filter.controls.date as FormGroup).controls.to.setValue(result.date.to);
					(this.filter.controls.date as FormGroup).controls.from.setValue(result.date.from);
					this.filter.controls.status.setValue(result.status);
					this.filter.controls.storeId.setValue(result.storeId);
					this.list();
				}
			});
		});

		this.list();
	}

	ngOnDestroy(): void {
		this.subscriptions.filter.unsubscribe();
	}

}
