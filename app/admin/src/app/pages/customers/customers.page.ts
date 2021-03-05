import { Store } from 'src/app/classes/store';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Customer } from 'src/app/classes/customer';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { CustomersFilterDialog } from './filter/filter.dialog';

@Component({
	selector: 'customers-page',
	styleUrls: ['./customers.page.scss'],
	templateUrl: './customers.page.html'
})

export class CustomersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private dialog: MatDialog, private sheet: OptionsService, public stores: StoresService, private confirm: ConfirmService, private router: Router, private filters: FiltersService, private service: CustomersService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public filter = this.filters.get({
		storeId: []
	});
	public columns: string[] = ['email', 'status', 'options'];
	public loading: boolean;
	public customers: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'email',
				'status',
				'customerId'
			],
			storeId: this.filter.storeId
		});

		if (response.ok) {
			this.customers.data = response.result.map(o => new Customer(o));
		} else {
			this.customers.data = [];
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

	public async options(customer: Customer) {
		let options = [
			{
				icon: 'edit',
				title: 'Edit Customer',
				handler: () => {
					this.router.navigate(['/customers', 'editor'], {
						queryParams: {
							mode: 'update',
							customerId: customer.customerId
						}
					});
				},
				disabled: [0, 1]
			},
			{
				icon: 'delete',
				title: 'Delete',
				danger: true,
				handler: () => {
					this.confirm.show({
						message: 'Delete ' + customer.email,
						handler: async () => {
							this.loading = true;

							const response = await this.service.delete({
								customerId: customer.customerId
							});

							if (response.ok) {
								for (let i = 0; i < this.customers.data.length; i++) {
									if (this.customers.data[i].customerId == customer.customerId) {
										this.customers.data.splice(i, 1);
										break;
									}
								}
								this.customers.data = this.customers.data.map(o => new Customer(o));
								this.toast.success('Customer was removed!');
							} else {
								this.toast.error(response.error.message);
							}

							this.loading = false;
						}
					});
				},
				disabled: [0, 1, 2, 3, 4]
			}
		];

		if (customer.status == 'requested') {
			options.unshift({
				icon: 'done',
				title: 'Accept Customer',
				handler: async () => {
					this.loading = true;

					const response = await this.service.update({
						status: 'accepted',
						storeId: customer.storeId,
						customerId: customer.customerId
					});
			
					if (response.ok) {
						customer.status = 'accepted';
					} else {
						this.toast.error(response.error.message);
					}

					this.loading = false;
				},
				disabled: [0, 1]
			})
		}

		this.sheet.show({
			role: customer.role,
			title: customer.email,
			options
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
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.show('filter');
		this.buttons.hide('search');

		this.sort.active = 'description';
		this.sort.direction = 'desc';
		this.customers.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/customers', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(CustomersFilterDialog, {
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

		(async () => {
			await this.list();
			await this.load();
		})();
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
		this.subscriptions.filter.unsubscribe();
	}

}
