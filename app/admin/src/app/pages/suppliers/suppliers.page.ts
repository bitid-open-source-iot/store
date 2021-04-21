import { Store } from 'src/app/classes/store';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Supplier } from 'src/app/classes/supplier';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { SuppliersFilterDialog } from './filter/filter.dialog';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'suppliers-page',
	styleUrls: ['./suppliers.page.scss'],
	templateUrl: './suppliers.page.html'
})

export class SuppliersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private dialog: MatDialog, public stores: StoresService, private filters: FiltersService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: SuppliersService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public filter = this.filters.get({
		storeId: []
	});
	public columns: string[] = ['description', 'options'];
	public loading: boolean;
	public suppliers: MatTableDataSource<Supplier> = new MatTableDataSource<Supplier>();
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'supplierId',
				'description'
			],
			storeId: this.filter.storeId
		});

		if (response.ok) {
			this.suppliers.data = response.result.map(o => new Supplier(o));
		} else {
			this.suppliers.data = [];
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

	public async options(supplier: Supplier) {
		this.sheet.show({
			role: supplier.role,
			title: supplier.description,
			options: [
				{
					icon: 'edit',
					title: 'Edit Supplier',
					handler: () => {
						this.router.navigate(['/suppliers', 'editor'], {
							queryParams: {
								mode: 'update',
								supplierId: supplier.supplierId
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
							message: 'Delete ' + supplier.description,
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									supplierId: supplier.supplierId
								});

								if (response.ok) {
									for (let i = 0; i < this.suppliers.data.length; i++) {
										if (this.suppliers.data[i].supplierId == supplier.supplierId) {
											this.suppliers.data.splice(i, 1);
											break;
										}
									}
									this.suppliers.data = this.suppliers.data.map(o => new Supplier(o));
									this.toast.success('Supplier was removed!');
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
		this.suppliers.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/suppliers', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(SuppliersFilterDialog, {
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
			this.suppliers.filter = value;
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
