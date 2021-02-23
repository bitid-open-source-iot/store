import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Supplier } from 'src/app/classes/supplier';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'suppliers-page',
	styleUrls: ['./suppliers.page.scss'],
	templateUrl: './suppliers.page.html'
})

export class SuppliersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: SuppliersService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

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
			]
		});

		if (response.ok) {
			this.suppliers.data = response.result.map(o => new Supplier(o));
		} else {
			this.suppliers.data = [];
		}

		this.loading = false;
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
		this.suppliers.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/suppliers', 'editor'], {
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
