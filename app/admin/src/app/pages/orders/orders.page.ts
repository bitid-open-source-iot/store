import { Store } from 'src/app/classes/store';
import { Order } from 'src/app/classes/order';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersFilterDialog } from './filter/filter.dialog';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'orders-page',
	styleUrls: ['./orders.page.scss'],
	templateUrl: './orders.page.html'
})

export class OrdersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private dialog: MatDialog, public stores: StoresService, private filters: FiltersService, private service: OrdersService, private buttons: ButtonsService) { }

	public orders: MatTableDataSource<Order> = new MatTableDataSource<Order>();
	public filter = this.filters.get({
		date: {
			to: null,
			from: null
		},
		status: [],
		storeId: []
	});
	public columns: string[] = ['orderId', 'email', 'date', 'status', 'subtotal', 'vat', 'total'];
	public loading: boolean;
	private subscriptions: any = {};

	public sum(key) {
		let result = 0;

		this.orders.data.map(order => {
			result += order[key];
		});

		return result;
	}

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			date: {
				to: this.filter.date.to,
				from: this.filter.date.from
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
			status: this.filter.status,
			storeId: this.filter.storeId
		});

		if (response.ok) {
			this.orders.data = response.result.map(o => new Order(o));
		} else {
			this.orders.data = [];
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
		if (key == 'date') {
			this.filter[key] = {
				to: null,
				from: null
			};
		} else {
			this.filter[key] = this.filter[key].filter(o => o != value);
		}
		this.filters.update(this.filter);
		this.list();
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

		this.sort.active = 'date';
		this.sort.direction = 'desc';
		this.orders.sort = this.sort;

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(OrdersFilterDialog, {
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
			this.orders.filter = value;
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
