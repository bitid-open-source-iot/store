import { Router } from '@angular/router';
import { Courier } from 'src/app/classes/courier';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { CouriersService } from 'src/app/services/couriers/couriers.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'couriers-page',
	styleUrls: ['./couriers.page.scss'],
	templateUrl: './couriers.page.html'
})

export class CouriersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: CouriersService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public columns: string[] = ['description', 'options'];
	public loading: boolean;
	public couriers: MatTableDataSource<Courier> = new MatTableDataSource<Courier>();
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'courierId',
				'description'
			]
		});

		if (response.ok) {
			this.couriers.data = response.result.map(o => new Courier(o));
		} else {
			this.couriers.data = [];
		}

		this.loading = false;
	}

	public async options(courier: Courier) {
		this.sheet.show({
			role: courier.role,
			title: courier.description,
			options: [
				{
					icon: 'edit',
					title: 'Edit Courier',
					handler: () => {
						this.router.navigate(['/couriers', 'editor'], {
							queryParams: {
								mode: 'update',
								courierId: courier.courierId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'people',
					title: 'Manage Subscribers',
					handler: () => {
						this.router.navigate(['/subscribers'], {
							queryParams: {
								id: courier.courierId,
								type: 'courier'
							}
						});
					},
					disabled: [0, 1, 2, 3]
				},
				{
					icon: 'remove',
					title: 'Unubscribe',
					danger: true,
					handler: () => {
						this.confirm.show({
							message: '',
							handler: async () => {
								this.loading = true;

								const response = await this.service.unsubscribe({
									email: this.localstorage.get('email'),
									courierId: courier.courierId
								});

								if (response.ok) {
									for (let i = 0; i < this.couriers.data.length; i++) {
										if (this.couriers.data[i].courierId == courier.courierId) {
											this.couriers.data.splice(i, 1);
											break;
										}
									}
									this.couriers.data = this.couriers.data.map(o => new Courier(o));
									this.toast.success('You were unsubscribed!');
								} else {
									this.toast.error(response.error.message);
								}

								this.loading = false;
							}
						});
					},
					disabled: [0, 5]
				},
				{
					icon: 'delete',
					title: 'Delete',
					danger: true,
					handler: () => {
						this.confirm.show({
							message: '',
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									courierId: courier.courierId
								});

								if (response.ok) {
									for (let i = 0; i < this.couriers.data.length; i++) {
										if (this.couriers.data[i].courierId == courier.courierId) {
											this.couriers.data.splice(i, 1);
											break;
										}
									}
									this.couriers.data = this.couriers.data.map(o => new Courier(o));
									this.toast.success('Courier was removed!');
								} else {
									this.toast.error(response.error.message);
								}

								this.loading = false;
							}
						});
					},
					disabled: [0, 1, 2, 3, 4]
				}
			]
		});
	}

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.sort.active = 'description';
		this.sort.direction = 'desc';
		this.couriers.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/couriers', 'editor'], {
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
