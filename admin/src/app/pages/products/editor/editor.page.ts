import { Store } from 'src/app/classes/store';
import { Product } from 'src/app/classes/product';
import { Supplier } from 'src/app/classes/supplier';
import { Department } from 'src/app/classes/department';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentsService } from 'src/app/services/departments/departments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'products-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class ProductsEditorPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public stores: StoresService, private router: Router, public products: ProductsService, private buttons: ButtonsService, private formerror: FormErrorService, public suppliers: SuppliersService, public departments: DepartmentsService) { }

	public form: FormGroup = new FormGroup({
		promotion: new FormGroup({
			price: new FormControl(null, [Validators.required]),
			enabled: new FormControl(null, [Validators.required])
		}),
		cost: new FormControl(0, [Validators.required]),
		info: new FormControl([], [Validators.required]),
		type: new FormControl(null, [Validators.required]),
		links: new FormControl([]),
		title: new FormControl(null, [Validators.required]),
		price: new FormControl(0, [Validators.required]),
		images: new FormControl([], [Validators.required]),
		visible: new FormControl(null, [Validators.required]),
		storeId: new FormControl(null, [Validators.required]),
		quantity: new FormControl(0, [Validators.required]),
		supplierId: new FormControl(null, [Validators.required]),
		departments: new FormControl([], [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		promotion: {
			price: '',
			enabled: ''
		},
		cost: '',
		info: '',
		type: '',
		links: '',
		title: '',
		price: '',
		images: '',
		visible: '',
		storeId: '',
		quantity: '',
		supplierId: '',
		departments: '',
		description: ''
	};
	public filter: FormGroup = new FormGroup({
		link: new FormControl(''),
		store: new FormControl(''),
		product: new FormControl(''),
		supplier: new FormControl(''),
		department: new FormControl('')
	});
	public options: MatTableDataSource<any> = new MatTableDataSource<any>();
	public product: Product = new Product();
	public loading: boolean;
	public productId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.products.get({
			filter: [
				'role',
				'cost',
				'info',
				'type',
				'links',
				'title',
				'price',
				'images',
				'visible',
				'storeId',
				'quantity',
				'promotion',
				'supplierId',
				'departments',
				'description'
			],
			productId: this.productId
		});

		if (response.ok) {
			this.product = new Product(response.result);
			if (this.product.role > 2) {
				(this.form.controls.promotion as FormGroup).controls.price.setValue(this.product.promotion.price);
				(this.form.controls.promotion as FormGroup).controls.enabled.setValue(this.product.promotion.enabled);

				this.form.controls.cost.setValue(this.product.cost);
				this.form.controls.info.setValue(this.product.info);
				this.form.controls.type.setValue(this.product.type);
				this.form.controls.links.setValue(this.product.links);
				this.form.controls.title.setValue(this.product.title);
				this.form.controls.price.setValue(this.product.price);
				this.form.controls.images.setValue(this.product.images);
				this.form.controls.visible.setValue(this.product.visible);
				this.form.controls.storeId.setValue(this.product.storeId);
				this.form.controls.quantity.setValue(this.product.quantity);
				this.form.controls.supplierId.setValue(this.product.supplierId);
				this.form.controls.departments.setValue(this.product.departments);
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

		const stores = await this.stores.list({
			sort: {
				description: 1
			},
			filter: [
				'role',
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

		const products = await this.products.list({
			filter: [
				'title',
				'storeId'
			]
		});

		if (products.ok) {
			this.products.data = products.result.map(o => new Product(o));
		} else {
			this.products.data = [];
		}

		const suppliers = await this.suppliers.list({
			sort: {
				description: 1
			},
			filter: [
				'supplierId',
				'description'
			]
		});

		if (suppliers.ok) {
			this.suppliers.data = suppliers.result.map(o => new Supplier(o));
		} else {
			this.suppliers.data = [];
			this.toast.error(suppliers.error.message);
		}

		const departments = await this.departments.list({
			sort: {
				description: 1
			},
			filter: [
				'description',
				'departmentId'
			]
		});

		if (departments.ok) {
			this.departments.data = departments.result.map(o => new Department(o));
		} else {
			this.departments.data = [];
			this.toast.error(departments.error.message);
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

		const response = await this.products[mode]({
			cost: this.form.value.cost,
			info: this.form.value.info,
			type: this.form.value.type,
			links: this.form.value.links,
			title: this.form.value.title,
			price: this.form.value.price,
			images: this.form.value.images,
			visible: this.form.value.visible,
			storeId: this.form.value.storeId,
			quantity: this.form.value.quantity,
			productId: this.productId,
			promotion: this.form.value.promotion,
			supplierId: this.form.value.supplierId,
			departments: this.form.value.departments,
			description: this.form.value.description
		});

		if (response.ok) {
			this.router.navigate(['/products']);
		} else {
			this.toast.error(response.error.message);
		}

		this.loading = false;
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
