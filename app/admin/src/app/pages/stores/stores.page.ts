import { Store } from 'src/app/classes/store';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'stores-page',
	styleUrls: ['./stores.page.scss'],
	templateUrl: './stores.page.html'
})

export class StoresPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: StoresService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public stores: MatTableDataSource<Store> = new MatTableDataSource<Store>();
	public columns: string[] = ['logo', 'description', 'options'];
	public loading: boolean;
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'logo',
				'storeId',
				'description'
			]
		});

		if (response.ok) {
			this.stores.data = response.result.map(o => new Store(o));
		} else {
			this.stores.data = [];
		}

		this.loading = false;
	}

	public async options(store: Store) {
		this.sheet.show({
			role: store.role,
			title: store.description,
			options: [
				{
					icon: 'edit',
					title: 'Edit Store',
					handler: () => {
						this.router.navigate(['/stores', 'editor'], {
							queryParams: {
								mode: 'update',
								storeId: store.storeId
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
								id: store.storeId,
								type: 'store'
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
							message: 'Unsubscribe ' + store.description,
							handler: async () => {
								this.loading = true;

								const response = await this.service.unsubscribe({
									email: this.localstorage.get('email'),
									storeId: store.storeId
								});

								if (response.ok) {
									for (let i = 0; i < this.stores.data.length; i++) {
										if (this.stores.data[i].storeId == store.storeId) {
											this.stores.data.splice(i, 1);
											break;
										}
									}
									this.stores.data = this.stores.data.map(o => new Store(o));
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
							message: 'Delete ' + store.description,
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									storeId: store.storeId
								});

								if (response.ok) {
									for (let i = 0; i < this.stores.data.length; i++) {
										if (this.stores.data[i].storeId == store.storeId) {
											this.stores.data.splice(i, 1);
											break;
										}
									}
									this.stores.data = this.stores.data.map(o => new Store(o));
									this.toast.success('Store was removed!');
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
		this.stores.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/stores', 'editor'], {
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
