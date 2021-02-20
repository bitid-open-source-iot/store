import { Store } from 'src/app/classes/store';
import { Product } from 'src/app/classes/product';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'products-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class ProductsEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public stores: StoresService, private router: Router, private service: ProductsService, private buttons: ButtonsService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		storeId: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		storeId: '',
		description: ''
	};
	public options: MatTableDataSource<any> = new MatTableDataSource<any>();
	public product: Product = new Product();
	public loading: boolean;
	public productId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'storeId',
				'description'
			],
			productId: this.productId
		});

		if (response.ok) {
			this.product = new Product(response.result);
			if (this.product.role > 2) {
				this.form.controls.storeId.setValue(this.product.storeId);
				this.form.controls.description.setValue(this.product.description);
			} else {
				this.toast.error('Your role is not high enough to copy/edit this product!');
				this.router.navigate(['/products']);
			}
		} else {
			this.toast.error(response.error.message);
			this.router.navigate(['/products']);
		}

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const response = await this.stores.list({
			sort: {
				description: 1
			},
			filter: [
				'storeId',
				'description'
			]
		});

		if (response.ok) {
			this.stores.data = response.result.map(o => new Store(o));
		} else {
			this.stores.data = [];
			this.toast.error(response.error.message);
		}

		this.loading = false;
	}

	public async submit() {
		this.loading = true;

		let mode = this.mode;
		if (mode == 'copy') {
			mode = 'add';
			delete this.productId;
		}

		const response = await this.service[mode]({
			icon: this.form.value.icon,
			phone: this.form.value.phone,
			email: this.form.value.email,
			options: this.options.data,
			storeId: this.form.value.storeId,
			account: this.form.value.account,
			productId: this.productId,
			description: this.form.value.description
		});

		if (response.ok) {
			this.router.navigate(['/products']);
		} else {
			this.toast.error(response.error.message);
		}

		this.loading = false;
	}

	public upload(key, value) {
		this.form.controls[key].setValue(value);
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.show('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.subscriptions.close = this.buttons.close.click.subscribe(event => {
			this.router.navigate(['/products']);
		});

		const params = this.route.snapshot.queryParams;
		this.mode = params.mode;
		this.productId = params.productId;

		(async () => {
			if (this.mode != 'add') {
				this.form.controls.storeId.disable();
				await this.get();
			}
			await this.load();
		})();
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
		this.subscriptions.close.unsubscribe();
	}

}
