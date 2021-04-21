import { Store } from 'src/app/classes/store';
import { Router } from '@angular/router';
import { Courier } from 'src/app/classes/courier';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { CouriersService } from 'src/app/services/couriers/couriers.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { CouriersFilterDialog } from './filter/filter.dialog';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'couriers-page',
	styleUrls: ['./couriers.page.scss'],
	templateUrl: './couriers.page.html'
})

export class CouriersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private dialog: MatDialog, private sheet: OptionsService, public stores: StoresService, private filters: FiltersService, private confirm: ConfirmService, private router: Router, private service: CouriersService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public filter = this.filters.get({
		storeId: []
	});
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
			],
			storeId: this.filter.storeId
		});

		if (response.ok) {
			this.couriers.data = response.result.map(o => new Courier(o));
		} else {
			this.couriers.data = [];
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
					icon: 'delete',
					title: 'Delete',
					danger: true,
					handler: () => {
						this.confirm.show({
							message: 'Delete ' + courier.description,
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
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.show('filter');
		this.buttons.show('search');

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

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(CouriersFilterDialog, {
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
			this.couriers.filter = value;
		});

		(async () => {
			await this.list();
			await this.load();
		})();
	}

	ngOnDestroy(): void {
		this.buttons.reset('search');
		this.subscriptions.add.unsubscribe();
		this.subscriptions.filter.unsubscribe();
		this.subscriptions.search.unsubscribe();
	}

}
