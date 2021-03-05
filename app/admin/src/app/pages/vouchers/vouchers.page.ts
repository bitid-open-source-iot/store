import { Store } from 'src/app/classes/store';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Voucher } from 'src/app/classes/voucher';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { VouchersService } from 'src/app/services/vouchers/vouchers.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { VouchersFilterDialog } from './filter/filter.dialog';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'vouchers-page',
	styleUrls: ['./vouchers.page.scss'],
	templateUrl: './vouchers.page.html'
})

export class VouchersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private dialog: MatDialog, public stores: StoresService, private filters: FiltersService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: VouchersService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public filter = this.filters.get({
		storeId: []
	});
	public columns: string[] = ['description', 'code', 'status', 'options'];
	public loading: boolean;
	public vouchers: MatTableDataSource<Voucher> = new MatTableDataSource<Voucher>();
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'code',
				'status',
				'voucherId',
				'description'
			],
			storeId: this.filter.storeId
		});

		if (response.ok) {
			this.vouchers.data = response.result.map(o => new Voucher(o));
		} else {
			this.vouchers.data = [];
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

	public async options(voucher: Voucher) {
		let options = [
			{
				icon: 'edit',
				title: 'Edit Voucher',
				handler: () => {
					this.router.navigate(['/vouchers', 'editor'], {
						queryParams: {
							mode: 'update',
							voucherId: voucher.voucherId
						}
					});
				},
				disabled: [0, 1]
			},
			{
				icon: 'content_copy',
				title: 'Copy Voucher',
				handler: () => {
					this.router.navigate(['/vouchers', 'editor'], {
						queryParams: {
							mode: 'copy',
							voucherId: voucher.voucherId
						}
					});
				},
				disabled: [0, 1]
			},
			{
				icon: 'sell',
				title: 'Mark as sold',
				handler: async () => {
					voucher.loading = true;
					
					const response = await this.service.markassold({
						voucherId: voucher.voucherId
					});

					if (response.ok) {
						voucher.status = 'sold';
					} else {
						this.toast.error(response.error.message);
					};

					voucher.loading = false;
				},
				disabled: [0, 1]
			},
			{
				icon: 'delete',
				title: 'Delete',
				danger: true,
				handler: () => {
					this.confirm.show({
						message: 'Delete ' + voucher.code,
						handler: async () => {
							this.loading = true;

							const response = await this.service.delete({
								voucherId: voucher.voucherId
							});

							if (response.ok) {
								for (let i = 0; i < this.vouchers.data.length; i++) {
									if (this.vouchers.data[i].voucherId == voucher.voucherId) {
										this.vouchers.data.splice(i, 1);
										break;
									}
								}
								this.vouchers.data = this.vouchers.data.map(o => new Voucher(o));
								this.toast.success('Voucher was removed!');
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

		if (voucher.status == 'sold') {
			for (let i = 0; i < options.length; i++) {
				if (options[i].icon == 'sell') {
					options.splice(i, 1);
					break;
				};
			};
			for (let i = 0; i < options.length; i++) {
				if (options[i].icon == 'edit') {
					options.splice(i, 1);
					break;
				};
			};
			for (let i = 0; i < options.length; i++) {
				if (options[i].icon == 'delete') {
					options.splice(i, 1);
					break;
				};
			};
		};

		this.sheet.show({
			role: voucher.role,
			title: voucher.code,
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
		this.vouchers.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/vouchers', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(VouchersFilterDialog, {
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
