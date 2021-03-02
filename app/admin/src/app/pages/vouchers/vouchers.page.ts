import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Voucher } from 'src/app/classes/voucher';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { VouchersService } from 'src/app/services/vouchers/vouchers.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'vouchers-page',
	styleUrls: ['./vouchers.page.scss'],
	templateUrl: './vouchers.page.html'
})

export class VouchersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: VouchersService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

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
			]
		});

		if (response.ok) {
			this.vouchers.data = response.result.map(o => new Voucher(o));
		} else {
			this.vouchers.data = [];
		}

		this.loading = false;
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

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
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

		this.subscriptions.filter = this.buttons.filter.click.subscribe(event => {
			
		});

		this.list();
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
		this.subscriptions.filter.unsubscribe();
	}

}
