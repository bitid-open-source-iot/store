import { Router } from '@angular/router';
import { Customer } from 'src/app/classes/customer';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'customers-page',
	styleUrls: ['./customers.page.scss'],
	templateUrl: './customers.page.html'
})

export class CustomersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: CustomersService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

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
			]
		});

		if (response.ok) {
			this.customers.data = response.result.map(o => new Customer(o));
		} else {
			this.customers.data = [];
		}

		this.loading = false;
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

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
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

		this.list();
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
	}

}
