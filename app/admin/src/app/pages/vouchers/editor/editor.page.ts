import { Store } from 'src/app/classes/store';
import { Voucher } from 'src/app/classes/voucher';
import { Product } from 'src/app/classes/product';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { VouchersService } from 'src/app/services/vouchers/vouchers.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'vouchers-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class VouchersEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public stores: StoresService, private router: Router, private service: VouchersService, public products: ProductsService, private buttons: ButtonsService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		code: new FormControl(null, [Validators.required]),
		file: new FormControl(null, [Validators.required]),
		storeId: new FormControl(null, [Validators.required]),
		productId: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		code: '',
		file: '',
		storeId: '',
		productId: ''
	};
	public filter: FormGroup = new FormGroup({
		store: new FormControl(null, [Validators.required]),
		product: new FormControl(null, [Validators.required])
	});
	public loading: boolean;
	public voucher: Voucher = new Voucher();
	public voucherId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'code',
				'file',
				'storeId',
				'productId'
			],
			voucherId: this.voucherId
		});

		if (response.ok) {
			this.voucher = new Voucher(response.result);
			if (this.voucher.role > 2) {
				this.form.controls.code.setValue(this.voucher.code);
				this.form.controls.file.setValue(this.voucher.file);
				this.form.controls.storeId.setValue(this.voucher.storeId);
				this.form.controls.productId.setValue(this.voucher.productId);
			} else {
				this.toast.error('Your role is not high enough to copy/edit this voucher!');
				this.router.navigate(['/vouchers']);
			}
		} else {
			this.toast.error(response.error.message);
			this.router.navigate(['/vouchers']);
		}

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const stores = await this.stores.list({
			sort: {
				file: 1
			},
			filter: [
				'storeId',
				'description'
			]
		});

		if (stores.ok) {
			this.stores.data = stores.result.map(o => new Store(o));
		} else {
			this.stores.data = [];
			this.toast.error(stores.error.message);
		}

		this.loading = false;
	}

	public async submit() {
		this.loading = true;

		let mode = this.mode;
		if (mode == 'copy') {
			mode = 'add';
			delete this.voucherId;
		}

		const response = await this.service[mode]({
			code: this.form.value.code,
			file: this.form.value.file,
			storeId: this.form.value.storeId,
			voucherId: this.voucherId,
			productId: this.form.value.productId
		});

		if (response.ok) {
			this.router.navigate(['/vouchers']);
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

		this.products.data = [];

		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.subscriptions.close = this.buttons.close.click.subscribe(event => {
			this.router.navigate(['/vouchers']);
		});

		this.subscriptions.storeId = this.form.controls.storeId.valueChanges.subscribe(async storeId => {
			for (let i = 0; i < this.stores.data.length; i++) {
				if (this.stores.data[i].storeId == storeId) {
					this.loading = true;

					const products = await this.products.list({
						sort: {
							title: 1
						},
						filter: [
							'title',
							'productId'
						],
						type: 'voucher',
						storeId
					});
			
					if (products.ok) {
						this.products.data = products.result.map(o => new Product(o));
					} else {
						this.products.data = [];
						this.toast.error(products.error.message);
					}
		
					this.loading = false;
					break;
				};
			};
		});

		const params = this.route.snapshot.queryParams;
		this.mode = params.mode;
		this.voucherId = params.voucherId;

		(async () => {
			if (this.mode != 'add') {
				await this.get();
			}
			await this.load();
		})();
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
		this.subscriptions.close.unsubscribe();
		this.subscriptions.storeId.unsubscribe();
	}

}
