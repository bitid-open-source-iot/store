import { Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'products-page',
	styleUrls: ['./products.page.scss'],
	templateUrl: './products.page.html'
})

export class ProductsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private sheet: OptionsService, private confirm: ConfirmService, private router: Router, private service: ProductsService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public columns: string[] = ['image', 'title', 'price', 'options'];
	public loading: boolean;
	public products: MatTableDataSource<Product> = new MatTableDataSource<Product>();
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
				'title',
				'image',
				'price',
				'promotion',
				'productId'
			]
		});

		if (response.ok) {
			this.products.data = response.result.map(o => new Product(o));
		} else {
			this.products.data = [];
		}

		this.loading = false;
	}

	public async options(product: Product) {
		this.sheet.show({
			role: product.role,
			title: product.description,
			options: [
				{
					icon: 'edit',
					title: 'Edit Product',
					handler: () => {
						this.router.navigate(['/products', 'editor'], {
							queryParams: {
								mode: 'update',
								productId: product.productId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'content_copy',
					title: 'Copy Product',
					handler: () => {
						this.router.navigate(['/products', 'editor'], {
							queryParams: {
								mode: 'copy',
								productId: product.productId
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
							message: 'Delete ' + product.description,
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									productId: product.productId
								});

								if (response.ok) {
									for (let i = 0; i < this.products.data.length; i++) {
										if (this.products.data[i].productId == product.productId) {
											this.products.data.splice(i, 1);
											break;
										}
									}
									this.products.data = this.products.data.map(o => new Product(o));
									this.toast.success('Product was removed!');
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
		this.products.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/products', 'editor'], {
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
