import { Store } from 'src/app/classes/store';
import { Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { ProductsFilterDialog } from './filter/filter.dialog';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
	selector: 'products-page',
	styleUrls: ['./products.page.scss'],
	templateUrl: './products.page.html'
})

export class ProductsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private toast: ToastService, private dialog: MatDialog, public stores: StoresService, private sheet: OptionsService, private filters: FiltersService, private confirm: ConfirmService, private router: Router, private service: ProductsService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }
	
	public filter = this.filters.get({
		storeId: []
	});
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
			],
			storeId: this.filter.storeId
		});

		if (response.ok) {
			this.products.data = response.result.map(o => new Product(o));
		} else {
			this.products.data = [];
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
		this.products.sort = this.sort;

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/products', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(ProductsFilterDialog, {
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
			this.products.filter = value;
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
